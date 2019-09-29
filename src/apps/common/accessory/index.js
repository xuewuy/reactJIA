/**
 * Create by zhaoq on 16/10/8.
 */

import React,{ Component,PropTypes } from 'react'
import DynamicComponent,{Modal} from 'dynamicComponent'
import {Menu, Dropdown, Button, Icon, Upload} from 'xComponent'
import defaultComponentFactory from 'defaultComponentFactory'
import Picture from './component/picture'
import styles from './accessory.less'

export default class basicFiles extends Component {
	static defaultProps = {
		prefixCls:'accessory'
	}

    constructor(props) {
        super(props)
        this.handleUpdateChangeOthers = this.handleUpdateChangeOthers.bind(this)
        this.handleBeforeUploadOthers = this.handleBeforeUploadOthers.bind(this)
    }

	componentDidMount(){
        defaultComponentFactory.registerComponent('Picture', Picture)
		this.props.initView(this.props.initData)
	}

	componentWillUnmount() {
        $(".imageViewer").empty()
    }


    shouldComponentUpdate(nextProps){
        for(var o in this.props){
            if(this.props[o] != nextProps[o]){
                return true
            }
        }
        return false
    }

    handleUpdateChangeOthers(info) {
        let {setMessage} = this.props,
			otherFiles = true
        if (info.file.status === 'done') {
            if (info.file.response.error && info.file.response.error.message) {
                setMessage({
                    type: 'error',
                    mode: 'message',
                    content: info.file.response.error.message
                })
                return
            }
			if(info.file.response.value.setEnclosureList[0].elType == '340000000000001'){
				otherFiles = false
			}
            this.props.upload(info.file.response.value.setEnclosureList[0], otherFiles)
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
		
        let isLarge = file.size > 1500000
        if (isLarge) {
            setMessage({
                type: 'error',
                mode: 'message',
                content: '文件过大，请选择小于1.5M的附件上传'
            })
            return false
        }

        return true
    }

	getComponentInstances() {
		if(!this.props.initData.isEdit) {
			return {uploadImage:<div></div>}
		}else {
			return {  //在api里面写after生效
				uploadImage: <Upload {...{
					showUploadList: false,
					action: '/v1/setEnclosure/enclosureDispose',
					headers: {token:getAccessToken()},
					multiple: true,
					onChange: this.handleUpdateChangeOthers,
					beforeUpload: this.handleBeforeUploadOthers
				}}>
				<a style={{marginLeft: 0}}>继续上传</a>
				</Upload>
			}
		}
	}

    handleClickDel(ps) {
        return ()=> {
            this.props.del(ps.rowIndex,ps.gridPath)
        }
    }
	
	handleDownLoad(ps) {
		return () => {
			let getterByField = this.props.payload.getIn(['utils', 'getterByField']),
				fileList = getterByField('otherFiles')
			window.open(fileList.get(ps.rowIndex).get('src'))
		}
	}

	handleEvent(eventName, option){
		if(eventName == 'onPicturePreview'){
			debugger
			setTimeout(()=>{
				let picDom = $('#' + option.id),
				picsDom = $('.imageViewer')
				picsDom.viewer('destroy').viewer()
				picDom.click()	
			}, 0)
			
			//debugger
		}else{
			this.props.onEvent(eventName, option)
		}
		
	}
	
	endOptionColumnCreatorOthers(props){
		if(!this.props.payload || !this.props.payload.get('utils') )
           return null
		if(!this.props.initData.isEdit) {
			return (<span className={'spanOpt'} onClick={::this.handleDownLoad(props)}><Icon className={'downLoad'} 		title='下载' type='question' /></span>)
		}else {
			return (<div><span className={'spanOpt'} onClick={::this.handleDownLoad(props)}><Icon className={'downLoad'} 		title='下载' type='question' /></span>
					<span className={'spanOpt'} onClick={::this.handleClickDel(props)}><Icon className={'delete'} title='删除' type='question' /></span></div>)
		}

	}


	render(){
		if(!this.props.payload || !this.props.payload.get('utils') ) {
           return null
		}

		let message = this.props.payload.getIn(['global', 'message']),
		    {prefixCls, ...otherProps} = this.props,
		    getterByField = this.props.payload.getIn(['utils', 'getterByField'])
		return (
			<div className={this.props.prefixCls}>
                <div className={`${prefixCls}-picture`}>
                    <span>图片文件：</span>
                    <DynamicComponent {...otherProps}  _path="accessory.picture" onEvent = {::this.handleEvent} />
                </div>
                <div className={`${prefixCls}-otherFiles`}>
                    <DynamicComponent {...otherProps}  _path="accessory.otherFiles"
						 endOptionColumnTitle=''
						 endOptionColumnWidth={150}
						 endOptionColumnCreator={::this.endOptionColumnCreatorOthers}
						 componentInstances={this.getComponentInstances()}
                        />
                </div>
                {this.renderImagesForPreview(getterByField)}
				{Modal(message)}
			</div>
		)
	}

	renderImagesForPreview(getterByField){
		let pics = getterByField('picture')
		 $(".imageViewer").empty();
		if(!pics || pics.size == 0) return null
		pics.forEach(o=>{
			o.forEach(o1=>{
				let name = o1.get('name'),
					suffix = o1.get('suffix'),
					src = o1.get('src'),
					id
				if(name)
					id = name.split('.')[0]

				if(src){
					$('.imageViewer').append(`<img id='img_${id}' src='${src}' style='width:0px;height:0px;'></img>`)	
				}
			})
			
		})
		return null
	}
}
