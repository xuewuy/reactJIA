/**
 * Create by zhaoq on 16/10/8.
 */

import React, { Component, PropTypes } from 'react'
import DynamicComponent, { Modal } from 'dynamicComponent'
import { Menu, Popover, Dropdown, Button, Icon, Upload, ZIcon } from 'xComponent'
import defaultComponentFactory from 'defaultComponentFactory'
import showIcon from './component/icon'
import styles from './adjunct.less'
import { List, fromJS, Map } from 'immutable'

export default class basicFiles extends Component {
    static defaultProps = {
        prefixCls: 'adjunct'
    }

    constructor(props) {
        super(props)
        this.handleUpdateChangeOthers = this.handleUpdateChangeOthers.bind(this)
        this.handleBeforeUploadOthers = this.handleBeforeUploadOthers.bind(this)
    }

    componentDidMount() {
        defaultComponentFactory.registerComponent('showIcon', showIcon)
        this.props.initView(this.props.initData)
    }

    componentWillReceiveProps(nextProps) {
        for (var o in this.props.initData) {
            if (this.props.initData[o] != nextProps.initData[o]) {
                this.props.loadFiles(nextProps.initData)
            }
        }
    }

    componentWillUnmount() {
        $(".imageViewer").empty()
    }

    shouldComponentUpdate(nextProps) {
        for (var o in this.props) {
            if (this.props[o] != nextProps[o]) {
                return true
            }
        }
        return false
    }

    handleClickDel(ps) {
        return () => {
            let { setMessage, clearMessage } = this.props,
                getterByField = this.props.payload.getIn(['utils', 'getterByField']),
                fileList = getterByField('fileList'),
                optionFileList = {}

            optionFileList.option = 'del'
            optionFileList.delIndex = ps.rowIndex
            optionFileList.fileInfo = []
            optionFileList.fileInfo.push({
                enclosureId: fileList.get(ps.rowIndex).get('id'),
                fileType: fileList.get(ps.rowIndex).get('fileType')
            })

            setMessage({
                type: 'confirm',
                title: '警告',
                content: '您确定进行删除操作吗？',
                width: 360,
                wrapClassName: 'delAdjunctFile',
                onCancel: () => {
                    clearMessage()
                },
                onOk: () => {
                    clearMessage()
                    fileList = fileList.remove(ps.rowIndex)
                    this.props.del(ps.rowIndex, ps.gridPath)
                    if(this.props.adjunctEvent) {
                        this.props.adjunctEvent(fileList, optionFileList)
                    }
                }
            })
        }
    }

    handleDownLoad(ps,orgId) {
        return () => {
            let getterByField = this.props.payload.getIn(['utils', 'getterByField']),
                fileList = getterByField('fileList'),
                enclosureId = fileList.get(ps.rowIndex).get('enclosureId') || fileList.get(ps.rowIndex).get('id')
            this.props.downLoad(enclosureId,orgId)
            //			window.open(fileList.get(ps.rowIndex).get('src'))
        }
    }

    handleUpdateChangeOthers(info) {
        let { setMessage } = this.props,
            getterByField = this.props.payload.getIn(['utils', 'getterByField']),
            onlyOne = getterByField('other.onlyOne'),
            fileList = getterByField('fileList'),
            picList,
            optionFileList = {}
        
        if(onlyOne) {
            fileList = List()
        }

        optionFileList.option = 'add'
        if (info.file.status === 'done') {
            if (info.file.response.error && info.file.response.error.message) {
                setMessage({
                    type: 'error',
                    mode: 'message',
                    content: info.file.response.error.message
                })
                return
            }
            fileList = fileList.filter((element, index) => {
                if (element.get('isLoading')) {
                    return false
                }
                return true
            })
            if (fileList.size != 0) {
                picList = fileList.filter((element, index) => {
                    if (element.get('fileType') == '340000000000001') {
                        return true
                    } else {
                        return false
                    }
                })
                if (picList.size >= 10 && info.file.response.value.setEnclosureList[0].elType == '340000000000001') {
                    this.props.upload(null)
                    return setMessage({ type: 'error', mode: 'message', content: '最多上传10张图片' })
                } else if (fileList.size - picList.size >= 10 && info.file.response.value.setEnclosureList[0].elType != '340000000000001') {
                    this.props.upload(null)
                    return setMessage({ type: 'error', mode: 'message', content: '最多上传10个非图片格式附件' })
                }
            }
            let fileInfo = info.file.response.value.setEnclosureList[0]
            fileList = fileList.push(fromJS({
                src: '/v1/img/' + fileInfo.newName,
                name: fileInfo.newName,
                id: fileInfo.id,
                displayName: fileInfo.oldName,
                fileSize: parseInt(fileInfo.elSize),
                suffix: fileInfo.elSuffix,
                fileType: fileInfo.elType ? fileInfo.elType.toString() : '',
                ts: fileInfo.tslong
            }))

            optionFileList.fileInfo = []
            optionFileList.fileInfo.push({
                enclosureId: fileInfo.id,
                fileType: fileInfo.elType,
                // fileSize:fileInfo.elSize,
                // displayName:fileInfo.oldName,
                // name:fileInfo.newName,
                // suffix:fileInfo.elSuffix
            })

            this.props.upload(info.file.response.value.setEnclosureList[0])
            if(this.props.adjunctEvent) {
                this.props.adjunctEvent(fileList, optionFileList)
            }
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
        this.props.loading(true)
        return true
    }

    getComponentInstances() {
        let isUploading = false,
            getterByField = this.props.payload.getIn(['utils', 'getterByField']),
            fileList = getterByField('fileList'),
            isNone = <a></a>,
            action = '/v1/setEnclosure/enclosureDispose'
        
        if(this.props.initData && this.props.initData.meta) {
            if(this.props.initData.meta.name == 'ticketInfo') {
                action = '/v1/invoice/upload?type=1'
            }
        }

        if(!(fileList && fileList.size) && this.props.status != 2) {
            isNone = <b>"上传"</b>
        }

        if (this.props.status == 2) {
            isUploading = true
        }
        if(this.props.initData && this.props.initData.info && this.props.initData.info.comeFrom == 'uploadTicket_loadTicket' && this.props.initData.info.disabled) {
            isUploading = true
        }
        return {  //在api里面写after生效
            uploadImage: isUploading ? <div></div> : <Upload {...{
                showUploadList: false,
                action: action,
                headers: { token: getAccessToken() },
                multiple: true,
                onChange: this.handleUpdateChangeOthers,
                beforeUpload: this.handleBeforeUploadOthers
            }}>
                <a style={{ marginLeft: 0 }}>
                    <ZIcon
                        icon='add-row'
                        title=''
                    />
                    {isNone}
					<a>继续上传</a>
                </a>
            </Upload>
        }
    }

    handleEvent(eventName, option) {
        if (eventName == 'onPicturePreview') {
            setTimeout(() => {
                let picDom = $('#' + option.id),
                    picsDom = $('.imageViewer')
                picsDom.viewer('destroy').viewer()
                picDom.click()
            }, 0)

        } else {
            this.props.onEvent(eventName, option)
        }

    }

    showOnePic(name) {
        return () => {
            if(name) {
                let info = name.split('.')[0], id
                if(name.split('.')[0].indexOf('/') == '-1') {
                    info = info.replace(/\\/g,'/')
                }
                id = 'img_' + info.split('/').join('_')
                
                setTimeout(() => {
                    let picDom = $('#' + id),
                        picsDom = $('.imageViewer')
                    picsDom.viewer('destroy').viewer()
                    picDom.click()
                }, 0)
            }
        }
    } 

    endOptionColumnCreatorOthers(props) {
        if (!this.props.payload || !this.props.payload.get('utils'))
            return null
        let isUploading = false

        if (this.props.status == 2) {
            isUploading = true
        }
        let orgId=this.props.appParams && this.props.appParams.orgId

        return (isUploading ? <div><span className={'spanOpt'} onClick={::this.handleDownLoad(props,orgId)}><Icon className={'downLoad'} title='下载' type='question' /></span></div > : <div><span className={'spanOpt'} onClick={::this.handleDownLoad(props,orgId)}><Icon className={'downLoad'} title='下载' type='question' /></span><span className={'spanOpt'} onClick={::this.handleClickDel(props)
    }><Icon className={'delete'} title='删除' type='question' /></span ></div >)
	}

render(){
    if (!this.props.payload || !this.props.payload.get('utils')) {
        return null
    }

    let message = this.props.payload.getIn(['global', 'message']),
        { prefixCls, ...otherProps } = this.props,
        getterByField = this.props.payload.getIn(['utils', 'getterByField']),
        isReadonly = this.props.initData.richardTicket ? this.props.initData.richardTicket.isReadonly : false,
        fileList = getterByField('fileList'),
        className = `${prefixCls}`,
        isNone = <a></a>,
        onlyOne = getterByField('other.onlyOne'),
        unReload = getterByField('other.unReload'),
        webapiPath = getterByField('other.webapiPath') || `/v1/accountsIdentity/uplode?orgId=${null}`,
        onlyOneClass = 'onlyOneUpload'
    //处理上传营业执照的地址
    if (webapiPath.indexOf('oldName') == -1){
        webapiPath += '&oldName=null'
    }
    let uploadElement = <Upload {...{
                        showUploadList: false,
                        action: webapiPath,
                        headers: { token: getAccessToken()},
                        multiple: true,
                        onChange: this.handleUpdateChangeOthers,
                        beforeUpload: this.handleBeforeUploadOthers
                    }}>
                        <a className={onlyOneClass}>
                            <ZIcon
                                icon='add-row'
                                title=''
                            />
                            <a>{(fileList.get(0) && fileList.get(0).get('newName')) ? '重新上传' : '上传'}</a>
                        </a>
                    </Upload>

    if(!(fileList && fileList.size) && this.props.status != 2) {
        isNone = <div className={`${prefixCls}-isNone`}><img src={require('./component/img/none.png')} /><span>亲,还没有文件,赶快<i></i>哟~</span></div>
    }

    if (isReadonly) {
        className = `${prefixCls} ${prefixCls}-isReadonly`
    }
    
    if(fileList.get(0) && fileList.get(0).get('id')) {
        onlyOneClass = 'onlyOneUpload reUpload'
    }
    if(!!unReload) {
        uploadElement = <div></div>
    }
    if(onlyOne) {
        if (fileList.size > 1 && fileList.get(0) && fileList.get(0).get('src')){
            this.props.updateWebapiPath(fileList.get(0))
        }
        return (
            <div className={className}>
               <div className={`${prefixCls}-onlyOne`}>
                    <div className={`${prefixCls}-img`}>
                        <img width='250' onClick={::this.showOnePic(fileList.get(0) ? fileList.get(0).get('name') : '')} src={fileList.get(0) ? fileList.get(0).get('src') : ''} />
                    </div>
                    {uploadElement}
                    {this.renderImagesForPreview(getterByField)}
                    {Modal(message)}
               </div>
            </div>
        )
    }
    return (
        <div className={className}>
            {isNone}
            <DynamicComponent
                {...otherProps}
                _path="adjunct.adjunctList"
                endOptionColumnTitle=''
                endOptionColumnWidth={60}
                endOptionColumnCreator={::this.endOptionColumnCreatorOthers}
                     componentInstances={this.getComponentInstances()}
            onEvent = {::this.handleEvent}
                />
                {this.renderImagesForPreview(getterByField)}
            {Modal(message)}
        </div>
    )
}

renderImagesForPreview(getterByField){
    let fileList = getterByField('fileList')
    let pics = fileList.filter((element, index) => {
        if (element.get('fileType') == "340000000000001") {
            return true
        } else return false
    })
    $(".imageViewer").empty();
    if (!pics || pics.size == 0) return null
    pics.forEach(o => {
        let name = o.get('name'),
            suffix = o.get('suffix'),
            src = o.get('src'),
            id
        if (name)
            id = name.split('.')[0].split('/').join('_')

        if (src) {
            $('.imageViewer').append(`<img id='img_${id}' src='${src}' style='width:0px;height:0px;'></img>`)
        }
    })
    return null
}
}
