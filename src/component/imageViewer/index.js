import React, { Component, PropTypes } from 'react'
import { MovableWindow } from 'xComponent'
import './imageViewer.less'

export default class ImageViewerComponent extends Component {

    static defaultProps = {
        prefixCls: 'mk-image-viewer'
    }

    state = {
        visible:false,
        title:'票据编号001',
        imageUrl:null
    }

    constructor(props) {
        super(props)
        this.handleVisibleWindow = this.handleVisibleWindow.bind(this)
    }

    shouldComponentUpdate(nextProps) {
        for (let e in this.props.value){
             if (this.props.value[e] != nextProps.value[e]){
                 return true
             }
         }
         return false
    }

    componentDidMount() {
        setTimeout(() => {
            $('#MovableWindowImageViewer').viewer('destroy')
            $('#MovableWindowImageViewer').viewer({ button: false, inline: true, navbar: false, title: false, loading:false, fullscreen: false }).viewer()
        }, 200)
    }
    componentDidUpdate(){
        if (this.props.value.visible){
            setTimeout(() => {
                $('#MovableWindowImageViewer').viewer('destroy')
                $('#MovableWindowImageViewer').viewer({ button: false, inline: true, navbar: false, title: false, loading: false, fullscreen: false }).viewer()
            }, 200)
        }
    }
    componentWillUnmount() {
        $('#MovableWindowImageViewer').viewer('destroy')
    }
    handleVisibleWindow(visible){
        $('#MovableWindowImageViewer').viewer('destroy')
        this.props.onCloseWindow && this.props.onCloseWindow(visible)
    }

    render() {
        let value = this.props.value
        return (
            <MovableWindow
                visible={value.visible}
                title={value.title}
                style={this.props.style}
                onCloseWindow={this.handleVisibleWindow}
            >
                <div id='MovableWindowImageViewer'>
                    {!value.imageUrl ? <div>没有可用的图片资源</div> : <img style={{display:'none'}} src={value.imageUrl}></img>}
                </div>
            </MovableWindow>
		)
    }
}


