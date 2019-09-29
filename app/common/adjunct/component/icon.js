import React from 'react'
import {Button, Upload, Icon, Popover} from 'xComponent'
import { List, Map, fromJS } from 'immutable'
import ReactDOM from 'react-dom'

export default class PictureComponent extends React.Component {

   state = {
       data: Map({
           value: null,
           isOEM:false
       })
   }

    constructor(props) {
        super(props)
        this.state = this.calculateState(this.props)
        this.onResize = this.onResize.bind(this)
        this.update = this.update.bind(this)
        this.handlePopShowPic = this.handlePopShowPic.bind(this)
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
        if(typeof value === 'object'){
            return data.mergeDeepIn(propertyName.split('.'), value)
        }
        else{
            return data.setIn(propertyName.split('.'), value)
        }
    }

	componentDidMount() {
        this.update()
        var win = window
        if (win.addEventListener) {
            win.addEventListener('resize', this.onResize, false)
        } else if (win.attachEvent) {
            win.attachEvent('onresize', this.onResize)
        } else {
            win.onresize = this.onResize
        }
    }

    componentWillUnmount(){
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
        clearTimeout(this._updateTimer)
        this._updateTimer = setTimeout(this.update, 16)
    }

    update() {
        let dom = ReactDOM.findDOMNode(this),
            height = dom.offsetHeight > window.innerHeight ? 0 :dom.offsetHeight
        //todo
        this.setState({data:this.set(null,{offsetHeight:height , offsetWidth:dom.offsetWidth})})
    }

    componentWillReceiveProps(nextProps) {   //把props转成state，render的时候会刷新成新state
       this.setState(this.calculateState(nextProps))
    }

	shouldComponentUpdate(nextProps, nextState) {
        return true
    }

    calculateState(props) {

		let {data} = this.state,
			{_getter, _getterByField, _path, _value} = this.props,
            pValues = _getter(_path, ['value', 'displayMember', 'isOEM']),
            value = pValues.get('value') == undefined ? (pValues.get('value') || _value) : pValues.get('value'),
            isOEM = pValues.get('isOEM') || false
       data = data.set('value', value)
       data = data.set('isOEM', isOEM)
        //data = this.set(null,{path: _path, value, isOEM})
       return {data}
    }

    handleShowNew(id){
        let that = this
        return ()=>{
            this.props.onEvent && this.props.onEvent('onPicturePreview', {id:id})
        }
    }

    render() {
        let displayFile,
            isOEM = this.state.data.get('isOEM')

        if(this.state.data.get('value').get('isLoading')) {

            displayFile = isOEM == true ?
                <div style={{textAlign: 'center'}}><img src={require('./img/loadingOEM.gif')} style={{height: '40px', marginLeft: '55px'}}/>
                </div>
                :
                <div style={{textAlign: 'center'}}><img src={require('./img/loading.gif')} style={{height: '40px', marginLeft: '55px'}}/>
                </div>
        }else {


        let value = this.state.data.get('value'),
            fileType = value.get('fileType'),
            name = value.get('name') || '',
            className = 'unknown',
            content = this.getContent(value),
            id
//            displayFile

        if(fileType == '340000000000001') {
            className = 'picture'
        }else if (fileType == '340000000000002') {
            className = 'word'
        }else if (fileType == '340000000000003') {
            className = 'pdf'
        }else if (fileType == '340000000000007') {
            className = 'compress'
        }else if (fileType == '340000000000006') {
            className = 'ppt'
        }else if (fileType == '340000000000004') {
            className = 'exel'
        }

        if(name) {
            let info = name.split('.')[0]
            if(name.split('.')[0].indexOf('/') == '-1') {
                info = info.replace(/\\/g,'/')
            }
            id = 'img_' + info.split('/').join('_')
        }
        if(fileType == '340000000000001') {
            displayFile = <Popover placement="left" overlayClassName={'attachmentIcon'} content={content} trigger="hover"><span title={value.get('displayName')} className={className} onClick={::this.handleShowNew(id)}><i>{value.get('displayName')}</i></span></Popover>
        }else {
            displayFile = <span title={value.get('displayName')} className={className}><i>{value.get('displayName')}</i></span>
        }
        }
        return (displayFile)
    }

    //填写附件管理的界面
    getContent(value) {
        let name = value.get('name'),
            info = name.split('.')[0],
            src
        
        if(name) {
            if(name.split('.')[0].indexOf('/') == '-1') {
                info = info.replace(/\\/g,'/')
            }
            src = '/v1/img/' + info + '.' + name.split('.')[1]
        }
        
        return (
            <div onClick={::this.handlePopShowPic('img_'+ info.split('/').join('_'))} style={{maxWidth: '200px',textAlign: 'center'}}><img style={{maxWidth:'200px',maxHeight:'200px'}} src={src}></img></div>
        )
    }

    handlePopShowPic(id) {
        return () => {
            this.props.onEvent && this.props.onEvent('onPicturePreview', {id:id})
        }
    }
}
