import React,{ Component,PropTypes } from 'react'
import DynamicComponent from 'dynamicComponent'
import {Button,ZIcon,Upload,Consult} from 'xComponent'
import qrcode from '../../../../utils/qrcode.js'

export default class AuthenticationComponent extends Component {
    componentDidMount(){
        // 在这里给后台接口一个orgID，后台根据这个ID给我返回所有我需要的信息
        let orgId = this.props.initData.size ? this.props.initData.get('id') : this.props.initData.id
        orgId && this.props.initAuthentication(orgId,()=>{
            this.getQrCode()
        })
    }
    handleReturnMyyj(){
        this.props.saveActiveKey('1')
    }

    handleUploadCheange(info){
        this.props.uploadAuthenticationImg(info,this.props.hideLoadingMask)
    }

    handleBeforeUpload(info){
        return new Promise((resolve, reject) => {
            let {setMessage,clearMessage} = this.props,
                fileStrArr = info.name.split('.'),
                fileType =fileStrArr[fileStrArr.length-1].toUpperCase()
            if(fileType=='JPG'||fileType=='GIF'|| fileType=='PNG' ) {
                resolve()
                this.props.showLoadingMask({content:'正在上传...'})
            } else {
                reject()
                setMessage ({
                    type: 'warning',
                    content: '文件格式错误，请上传文件格式为 JPG 、GIF、PNG文件！',
                    mode: 'message'
                })
            }
        })
    }
    getQrCode(){
        let qr2 = new qrcode(document.getElementById('qrCode'),{
            width: 120,
            height: 120
        })
        let utils = this.props.payload.get('utils'),
            getterByField = utils.get('getterByField'),
            imgPath = getterByField('authentication.imgPath'),
            uri = 'http://192.168.20.196:8088/activity.html#activity?memo=',
            qrCode = getterByField('authentication.qrCode'),
            protocol = window.location.protocol
            if(window.location.href.indexOf('dev') != -1){
                uri = protocol+'//dev.rrtimes.com/mobile/activity.html#activity?memo='
            }else if(window.location.href.indexOf('test') != -1){
                uri = protocol+'//mtest.rrtimes.com/activity.html#activity?memo='
            }else{
                uri = protocol+'//m.rrtimes.com/activity.html#activity?memo='
            }
            if(qrCode){
                qr2.makeCode(uri+qrCode)
            }

    }

    handleEnlargeClick(imgUrl){
        return ()=>{
            this.props.seeAuthenticationImg(imgUrl)
        }
    }

    render(){
        let {prefixCls, ...otherProps} = this.props
        let utils = this.props.payload.get('utils'),
            getterByField = utils.get('getterByField'),
            imgPath = getterByField('authentication.imgPath'),
            qrCode = getterByField('authentication.qrCode'),
            iconImgPath = imgPath ? require('../img/Authentication-active.png') : require('../img/Authentication-default.png'),
            authenticationImgPath = imgPath ? `/v1/img/${imgPath}` : require('../img/upload.png'),
            inviteCount = getterByField('authentication.inviteCount'),
            wxIconImg = inviteCount > 0 ? require('../img/wx-active.png') : require('../img/wx-default.png'),
            orgInfo = this.props.initData && this.props.initData.size ? this.props.initData.toJS() : this.props.initData,
            orgId = orgInfo.id,
            industry = orgInfo.industry,
            status = orgInfo.status
        return (
            <div className={`${prefixCls}-authentication`}>
                <Consult />
                <div className={`${prefixCls}-authentication-header`}>
                    <div>
                        <span>实名认证</span>
                        {industry > 1000 ? null : <span>{imgPath ? '微信扫一扫，邀请你的好友一起体验吧！成功邀请好友，将获得50元红包。' : '实名认证或者微信成功邀请好友注册，试用期均可延长至30天。'}</span>}
                    </div>
                    <div>
                        <Button type="primary" onClick={::this.handleReturnMyyj}>返回企业列表</Button>
                    </div>
                </div>
                <div className={`${prefixCls}-authentication-line`}></div>
                <div className={`${prefixCls}-authentication-upload`}>
                    <div>
                        <div>
                            <img src={iconImgPath} alt="实名认证logo"/>
                            {industry > 1000 ? <p>上传营业执照后，我们将在24小时之内审核完成，如有疑问欢迎致电：400-6060-386</p> : <p>上传营业执照进行实名认证后试用期会延长至 < span > 30天</span></p>}
                        </div>
                        <div>
                            {!(status == 1 || status == 2) ? <Upload
                                action={`v1/identity/upload?orgId=${orgId}`}
                                headers={{ token: getAccessToken() }}
                                multiple='false'
                                type="primary"
                                onChange={::this.handleUploadCheange}
                                    beforeUpload={::this.handleBeforeUpload}
                                    showUploadList={false}
                            >
                                <Button type="primary">{imgPath ? '重新上传' : '立即上传'}</Button>
                            </Upload> : null}
                        </div>
                    </div>
                    <div className={`${prefixCls}-authentication-upload-img`}>
                        <div className={`${prefixCls}-authentication-upload-img-warp`}>
                            {imgPath ? <div style={{width:'100%',height:'100%'}}>
                                <img className={`${prefixCls}-authentication-upload-img-warp-yes`} src={authenticationImgPath} alt="营业执照"/>
                                <div className='enlarge' onClick={::this.handleEnlargeClick(authenticationImgPath)}>
                                    <ZIcon icon='fangda'/>
                                </div>
                            </div>
                             : <div>
                                 <img className={`${prefixCls}-authentication-upload-img-warp-no`} src={require('../img/upload.png')} alt="营业执照"/>
                                <Upload
                                    action={`v1/identity/upload?orgId=${orgId}`}
                                    headers= {{token:getAccessToken()}}
                                    multiple='false'
                                    type="primary"
                                    className='uploadCompoent'
                                    onChange={::this.handleUploadCheange}
                                    beforeUpload={::this.handleBeforeUpload}
                                    showUploadList={false}
                                >
                                    <p>+选择你要上传的执照</p>
                                </Upload>
                             </div>
                            }
                        </div>
                        <p>{imgPath ? '已上传营业执照' : '支持JPG、GIF、PNG格式且大小不超过7Mb的图片'}</p>
                    </div>
                </div>
                <div className={`${prefixCls}-authentication-wx`}>
                    <div>
                        <img src={wxIconImg} alt="微信分享logo"/>
                        {(()=>{
                            if(industry > 1000){
                                return (
                                    <span>微信扫一扫，邀请你的好友一起体验吧！成功邀请好友，将获得<span>50元红包</span></span>
                                )
                            }else{
                                return imgPath ? <span>微信扫一扫，邀请你的好友一起体验吧！成功邀请好友，将获得<span>50元红包</span></span> : <span>微信扫一扫，邀请你的好友一起体验吧！成功邀请好友后试用期将延长至<span>30天</span></span>
                            }
                        })()}
                        {inviteCount > 0 ? <p><span>您已经邀请{inviteCount}位好友注册，感谢您的支持！</span></p> : null }
                    </div>
                    <div id='qrCode'>
                        <img src={require('../img/wxlogo.png')} width='30' height='30' alt="二维码logo"/>
                    </div>
                </div>
            </div>
        )
    }
}
