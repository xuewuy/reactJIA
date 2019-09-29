import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import { Map } from 'immutable'
import Grid2 from './grid2'

export default class GirdWrapperComponent extends React.Component {
    static defaultProps = {
        prefixCls: 'z-grid'
    }

    state = {
        data: Map({
            height: 0,
            width: 0,
        })
    }

    constructor(props) {
        super(props)
        this.onResize = this.onResize.bind(this)
        this.update = this.update.bind(this)
    }

    get(propertyName) {
        if (!propertyName || propertyName === '') {
            return this.state.data
        }
        return this.state.data.getIn(propertyName.split('.'))
    }

    set(propertyName, value) {
        let data = this.state.data
        if (!propertyName || propertyName === '') {
            return data.mergeDeep(value)
        }
        if (typeof value === 'object') {
            return data.mergeDeepIn(propertyName.split('.'), value)
        } else {
            return data.setIn(propertyName.split('.'), value)
        }
    }

    componentWillReceiveProps(){
         this.setState({
            data: this.set(null, {
                isUpdateDom : false
            })
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true
    }

    componentDidUpdate(prevProps, prevState){
        let dom = ReactDOM.findDOMNode(this),
            height = dom.offsetHeight,
            width = dom.offsetWidth
            
        if(height != this.get('height') || width != this.get('width')){
          
            this.setState({
                data: this.set(null, {
                    height: height,
                    width: width,
                    isUpdateDom : true
                })
            })
        }
    }

    componentDidMount() {
        this.refreshSize()

        var win = window
        if (win.addEventListener) {
            win.addEventListener('resize', this.onResize, false)
        } else if (win.attachEvent) {
            win.attachEvent('onresize', this.onResize)
        } else {
            win.onresize = this.onResize
        }
    }

    componentWillUnmount() {
        var win = window
        if (win.removeEventListener) {
            win.removeEventListener('resize', this.onResize, false)
        } else if (win.detachEvent) {
            win.detachEvent('onresize', this.onResize)
        } else {
            win.onresize = undefined
        }
    }

    onResize() {
        this.refreshSize()
    }

    refreshSize(){
        this.setState({
            data: this.set(null, {
                height: 0,
                width: 0,
                isUpdateDom : false
            })
        })
    }

    update() {
        let dom = ReactDOM.findDOMNode(this),
            height = dom.clientHeight,
            width = dom.clientWidth

        this.setState({
            data: this.set(null, {
                height: height,
                width: width
            })
        })
    }

    render() {
        let height = this.get('height'),
            width = this.get('width'),
            style = { height, width },
            { prefixCls, ...otherProps } = this.props,
			allowAddOrDelColumn = this.props._getter(this.props._path,['allowAddColumn', 'allowDelColumn']),
			allowAddColumn = allowAddOrDelColumn.get('allowAddColumn'),
			allowDelColumn = allowAddOrDelColumn.get('allowDelColumn'),
			className = classNames({
				 [this.props.prefixCls]: true,
				 ['allowAddColumn']: !!allowAddColumn,
				 ['allowDelColumn']: !!allowDelColumn,
			})

        return ( 
            <div className = {className} style={{overflow:'hidden'}}> 
                <Grid2 
                    style = { style }
                    prefixCls = { prefixCls } {...otherProps }
                /> 
            </div> 
        )
    }
}
