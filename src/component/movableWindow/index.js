import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { ZIcon } from 'xComponent'
import classNames from 'classnames'
import './movableWindow.less'


export default class movableWindow extends Component {

    static defaultProps = {
        prefixCls: 'c-moveableWindow'
    }

    state = {
        pos: { x: 0, y: 0 },
        startMove: false,
        isMoving: false,
        isMoved: false,
        visible: false,
        rel: null
    }

    constructor(props) {
        super(props)
        this.handleMouseDown = this.handleMouseDown.bind(this)
        this.handleMouseMove = this.handleMouseMove.bind(this)
        this.handleMouseUp = this.handleMouseUp.bind(this)
        this.handleCloseClick = this.handleCloseClick.bind(this)
    }

    shouldComponentUpdate(){
        return true
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ visible: nextProps.visible})
    }

    handleMouseDown(e) {
        if (e.button !== 0) return

        var pos = ReactDOM.findDOMNode(this.refs.internal).getBoundingClientRect()
        var parentPos = ReactDOM.findDOMNode(this.refs.internal).parentElement.getBoundingClientRect()
        this.setState({
            startMove: true,
            rel: {
                x: pos.left - parentPos.left,
                y: pos.top - parentPos.top,
                oldPageX: e.pageX,
                oldPageY: e.pageY,
                maxX: parentPos.width - pos.width,
                maxY: parentPos.height - pos.height
            },
            pos: {
                x: pos.left - parentPos.left,
                y: pos.top - parentPos.top
            }
        })

        document.addEventListener('mousemove', this.handleMouseMove)
        document.addEventListener('mouseup', this.handleMouseUp)

        e.stopPropagation()
        e.preventDefault()
    }

    handleMouseMove(e) {
        if (!this.state.startMove) return

        let x = e.pageX - this.state.rel.oldPageX + this.state.rel.x,
            y = e.pageY - this.state.rel.oldPageY + this.state.rel.y

        if (x < 0)
            x = 0

        if (x > this.state.rel.maxX)
            x = this.state.rel.maxX

        if (y < 0)
            y = 0

        if (y > this.state.rel.maxY)
            y = this.state.rel.maxY


        this.setState({
            pos: { x, y },
            isMoving: true,
            isMoved: true
        })
        e.stopPropagation()
        e.preventDefault()
    }

    handleMouseUp(e) {
        let w = Math.abs(this.state.pos.x - this.state.rel.x),
            h = Math.abs(this.state.pos.y - this.state.rel.y)

        const validOffset = (w < 5 && h < 5)
        if ((validOffset || !this.state.isMoving) && this.props.onClick)
            this.props.onClick()
        this.setState({ isMoving: false, startMove: false })
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);
        e.stopPropagation()
        e.preventDefault()
    }

    handleClick(e) {
        e.stopPropagation()
        e.preventDefault()
    }

    handleCloseClick(e){
        this.setState({ visible:false})
        this.props.onCloseWindow && this.props.onCloseWindow(false)
        e.stopPropagation()
        e.preventDefault()
    }

    render() {
        /*
            <MovableWindow
                visible={true}
                style={{ top: 200, left: 300 }}//可用于设置初始化加载的位置
                onColseWindow={::this.onColseWindow}//当窗口关闭时触发
                title='票据编号001'//默认的文本为‘可拖拽窗口’
            >
                测试拖拽窗口//可有可无
            </MovableWindow>
        */

        let className = classNames({
            [this.props.prefixCls]: true,
            [this.props.className]: !!this.props.className,
        }), style,
            title = this.props.title || '可拖拽窗口'

        if (!this.state.isMoved) {
            style = this.props.style || {}
            style.position = 'absolute'
            style.width = style.width || 400
            style.height = style.height || 300
        } else {
            style = this.props.style || {}
            style = {
                position: 'absolute',
                left: this.props.isStopX ? this.state.rel.x : this.state.pos.x,
                top: this.props.isStopY ? this.state.rel.y : this.state.pos.y,
                width: style.width || 400,
                height: style.height || 300
            }
        }
        if (this.props.visible) {
            return (
                <div
                    ref='internal'
                    className={className}
                    {...this.props}
                    style={style}
                >
                    <div className={`${className}-header`}
                        onMouseDown={::this.handleMouseDown}
                        onClick = {::this.handleClick}
                    >
                        <div>
                            {title}
                        </div>
                        <div onClick={this.handleCloseClick}>
                            <ZIcon icon='error' />
                        </div>
                    </div>
                    <div className={`${className}-content`}>
                        {this.props.children}
                    </div>
                </div>
            )
        }
        return (
            <div id='MovableWindow' ref='internal'></div>
        )
    }

}
