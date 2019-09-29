import React from 'react'
import {Button, Upload, Icon} from 'xComponent'
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
        this.state = this.calculateState(this.props)
        this.onResize = this.onResize.bind(this)
        this.update = this.update.bind(this)
        this.handleUpdateChange = this.handleUpdateChange.bind(this)
        this.handleBeforeUpload = this.handleBeforeUpload.bind(this)
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
            pValues = _getter(_path, ['value', 'displayMember']),
//            displayMember = pValues.get('displayMember') || '',
            value = pValues.get('value') == undefined ? (pValues.get('value') || _value) : pValues.get('value')
            
//        if(!value) {
//            value = 0
//        }
//        if(value && typeof value == 'object') {
//            try {
//                value = value.get('displayMember')
//            }catch(error) {
//                console.log(error)
//                }
//        }
       data = data.set('value', value)
       return {data}
    }
    
    handleShow(e) {
        e.preventDefault()
		this.props.onEvent('showPic', {path: this.props._path})
    }

    handleShowNew(id){
        let that = this
        return ()=>{
            this.props.onEvent && this.props.onEvent('onPicturePreview', {id:id})

            
            //$('#' + id).viewer({zoom:-1,width: 800, height:500})
        }
    }
	
	handleDel(e) {
		e.preventDefault()
		this.props.onEvent('delPic', {path: this.props._path})
	}
	
	handleUpdateChange(info) {
		
        let {setMessage} = this.props
		console.log(info.file)
		// console.log(info.file.response)
        if (info.file.status === 'done') {
			console.log(info.file.name)
            if (info.file.response.error && info.file.response.error.message) {
                setMessage({
                    type: 'error',
                    mode: 'message',
                    content: info.file.response.error.message
                })
                return
            }
            // setTimeout( ()=>{
                this.saveUploadResult(info.file.response.value.setEnclosureList[0])
				// this.props.onEvent('addPic', );
				// console.log(info.file.response.value.setEnclosureList[0])
			// }, 88)
        }
        else if (info.file.status === 'error') {
            setMessage({
                type: 'error',
                mode: 'message',
                content: `${info.file.name} 上传失败`
            })
        }
    }

    saveUploadResult(picInfo) {
        if (!this.cachedList) {
            this.cachedList = new List()
        }
        this.cachedList = this.cachedList.push(picInfo)
        this.lastInfoTimestamp = new Date().getTime()

        setTimeout( ()=>{
            let timestamp = new Date().getTime()
            // console.log("try to addpic:"+(timestamp - this.lastInfoTimestamp))
            if (this.lastInfoTimestamp && (timestamp - this.lastInfoTimestamp) >= 100 && this.cachedList) {
                console.log("addpic")
                this.cachedList.forEach(item => {
                    this.props.onEvent('addPic', item);
                })

                this.cachedList = undefined
            }
        }, 100)
    }

    handleBeforeUpload(file) {
		
        let {setMessage} = this.props
        let isLarge = file.size > 500000
        const isImg = (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif')
        if (!isImg) {
            setMessage({
                type: 'error',
                mode: 'message',
                content: '只支持上传图片文件(jpg、png、gif)'
            })
            return false
        }
        if (isLarge) {
            setMessage({
                type: 'error',
                mode: 'message',
                content: '图片大小不能超过500k'
            })
            return false
        }

        return true
    }
    
    render() {
        let picSrc = this.state.data.get('value') ? this.state.data.get('value').get('src') : '',
            name = this.state.data.get('value') ? this.state.data.get('value').get('name'):'',
			picOpt = this.state.data.get('value') ? this.state.data.get('value').get('addBtn') : '',
			isEdit = this.state.data.get('value') ? this.state.data.get('value').get('isEdit') : '',
			option

        if(name){
            name = name.split('.')[0]
        }
	   if(picSrc && isEdit) {
		   option = <div className='picCell'>
                <div onClick={::this.handleShowNew('img_'+ name)}><img id={'img_'+ name} src={picSrc}></img></div>
				<span onClick={::this.handleDel}><Icon className='delPic' type='question' title='删除' /></span>
            </div>
	   }else if(picSrc && !isEdit) {
		   option = <div className='picCell'>
                <div onClick={::this.handleShow}><img src={picSrc}></img></div>
            </div>
	   }
	   if(picOpt) {
		   option = <span className={'addPics'}><Upload {...{
                showUploadList: false,
                action: '/v1/setEnclosure/enclosureDispose',
                multiple: true,
				headers: {token:getAccessToken()},
                onChange: this.handleUpdateChange,
                beforeUpload: this.handleBeforeUpload,
				accept:'.jpg,.png,.gif'
            }}><Icon className='addPic' type='question' title='添加' /></Upload></span>
	   }
	   return (<div>{option}</div>)
    }
}
              