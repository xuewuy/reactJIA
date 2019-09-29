import React from 'react'
import {Button, Upload, Icon, Popover, ZIcon} from 'xComponent'
import { List, Map, fromJS } from 'immutable'
import ReactDOM from 'react-dom'

export default class PictureComponent extends React.Component {

   state = {
       data: Map({
           value: null,
       })
   }

    constructor(props) {
        super(props)
        this.handleUpdateChangeOthers = this.handleUpdateChangeOthers.bind(this)
        this.handleBeforeUploadOthers = this.handleBeforeUploadOthers.bind(this)
        this.state = this.calculateState(this.props)
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
            pValues = _getter(_path, ['value', 'isShow', 'hasData', 'type']),
            value = pValues.get('value') == undefined ? (pValues.get('value') || _value) : pValues.get('value'),
            isShow = pValues.get('isShow'),
            hasData = pValues.get('hasData') || false,
            type = pValues.get('type') || ''
        
        data = data.set('value', value)
        data = data.set('isShow', isShow)
        data = data.set('hasData', hasData)
        data = data.set('type', type)
        return {data}
    }

    handleShow(){
        let value = this.state.value || this.state.data.get('value'),
            name = value.newName || value.get('newName'),
            info = name.split('.')[0],
            id 
        
        if(name.split('.')[0].indexOf('/') == '-1') {
            info = info.replace(/\\/g,'/')
        } 
        
        id = 'img_' + info.split('/').join('_')
        
        this.props.onEvent && this.props.onEvent('onPicturePreview', {id:id})
    }

    render() {
        let value = this.state.data.get('value'),
            isShow = this.state.data.get('isShow'),
            hasData = this.state.data.get('hasData'),
            valueI = this.state.value,
            displayContent = '',
            optionContent,
            valueS,
            optionStyle = {paddingTop: '3px'},
            optionIcon = <ZIcon icon='add-row' title='上传' />
            
        valueS = hasData ? value : valueI
        if(isShow) {
            if(valueS) { 
                displayContent = valueS.oldName || valueS.get('oldName')
                optionIcon = <ZIcon icon='edit' title='修改' />
                optionStyle = { position: 'absolute', top: '3px', right: '0px' }
            } 

            optionContent = <Upload {...{
                    showUploadList: false,
                    action: '/v1/setEnclosure/enclosureDispose',
                    headers: { token: getAccessToken() },
                    multiple: true,
                    onChange: this.handleUpdateChangeOthers,
                    beforeUpload: this.handleBeforeUploadOthers
                }}>
                    <a style={{ marginLeft: 0 }}>
                        {optionIcon}
                    </a>
                </Upload>
        }
        
        
        return (
            <div style={{ textAlign: 'center', lineHeight: '30px', position: 'relative' }}>
                <a onClick={::this.handleShow} title={displayContent} style={{ display: 'block', maxWidth: '80px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingLeft: '8px' }}>{displayContent}</a>
                <div style={optionStyle}>{optionContent}</div>
            </div>
        )
    }

    handleUpdateChangeOthers(info) {
        let { setMessage } = this.props, 
            fileInfo
        
        if (info.file.status === 'done') {
            if (info.file.response.error && info.file.response.error.message) {
                setMessage({
                    type: 'error',
                    mode: 'message',
                    content: info.file.response.error.message
                })
                return
            }
            fileInfo = info.file.response.value.setEnclosureList[0]
            this.setState({ value: fileInfo })
            this.props.onEvent && this.props.onEvent('handleUpload', {path: this.props._path, value: fileInfo})
        }
        else if (info.file.status === 'error') {
            setMessage({
                type: 'error',
                mode: 'message',
                content: `${info.file.name} 上传失败`
            })
        }
    }

    handleBeforeUploadOthers(file) {
        let { setMessage } = this.props,
            isLargePic = file.size > 6114000, //2048000,
            isLargeOthers = file.size > 15728640
        const isImg = (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif')
        
        if(this.state.data.get('type')){
            if((this.state.data.get('type') == 'picture') && !isImg) {
                setMessage({
                    type: 'error',
                    mode: 'message',
                    content: '请上传图片格式的文件'
                })
                return false
            }
        }
        if (file.size == 0) {
            setMessage({
                type: 'error',
                mode: 'message',
                content: '文件为空，请上传其他文件'
            })
            return false
        }

        if (isImg && isLargePic) {
            setMessage({
                type: 'error',
                mode: 'message',
                content: '图片大小不能超过6M'
            })
            return false
        } else if (!isImg && isLargeOthers) {
            setMessage({
                type: 'error',
                mode: 'message',
                content: '文件过大，请选择小于15M的附件上传'
            })
            return false
        }
        return true
    } 

}
