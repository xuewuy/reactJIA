import React,{ Component } from 'react'
import ReactDOM from 'react-dom'
import { HCFLayout, Button } from 'xComponent'
import DynamicComponent from 'dynamicComponent'
import styles from "../login.less"
import qrcode from '../../../common/qrCode/qrcode.js'

export default class zhwujiLogin extends Component {
    componentDidMount() {
        // this.props.zhwujiInitView()
    }
    componentWillUnmount(){
        clearInterval(window.queryQRCodeTimer)
    }

    getComponentInstances() {
        return {
            forgetPassword: <a className={`${this.props.prefixCls}-forget`}
                               onClick={::this.handleForgetClick}>忘记密码?</a>,
            register: <span className={`${this.props.prefixCls}-register-span`}>没有账号<a
                className={`${this.props.prefixCls}-register-a`} onClick={::this.handleRegisterClick}>立即注册</a></span>
        }
    }

    handleRegisterClick() {
        this.props.onRedirect('app/login/clientRegister', true)
    }

    handleForgetClick() {
        this.props.onRedirect('app/login/forgetPassword', true)
    }

    handleLoginClick(e) {
        let message = this.props.payload.getIn(['global', 'message'])
        if (message) return
        this.props.login(data => {
            if (data.result) {
                localStorage["currentUserName"] = data.currentUser.name
                if (!!data.currentOrg && data.entrance === 2) {
                    this.props.onLoginSuccess('app/portal', true)
                }
                else
                    this.props.onLoginSuccess('app/login/admin', true)
            }
        })
    }

    componentDidUpdate(){
        let getterByField = this.props.payload.getIn(['utils', 'getterByField']),
            isShowWxCode = getterByField('zhwuji.isShowWxCode'),
            currentStep = getterByField('zhwuji.currentStep'),
            random = getterByField('zhwuji.random'),
            url = getterByField('zhwuji.url'),
            isBtndisabled = getterByField('zhwuji.isBtndisabled')
        if(currentStep == 0 && isShowWxCode){//如果当前是二维码登录并且是第一步的时候
            $('.login-zhwuji img').map((index,element)=>{
                if($(element).attr('alt') === 'Scan me!'){
                    $(element).remove()
                }
            })
            this.getQrCode(random,url)
            if(localStorage["loginType"] == 'qrCode'){
                if(isBtndisabled){
                    this.props.getQueryQRCode()
                }else{
                    clearInterval(window.queryQRCodeTimer)
                }
            }else{
                this.props.getQueryQRCode()
            }
        }else{
            $('.login-zhwuji img').map((index,element)=>{
                if($(element).attr('alt') === 'Scan me!'){
                    $(element).remove()
                }
            })
        }  
        
      
    }

    getQrCode(random,url){
        if(localStorage["loginType"]) return
        let qr2 = new qrcode(this.refs.qrcode,{width: 215,height: 215})
        qr2.clear()
        qr2.makeCode(url + '?t=' + random)
    }
    
    render(){
        let {prefixCls,...otherProps} = this.props,
            message = this.props.payload.getIn(['global', 'message']),
            getterByField = this.props.payload.getIn(['utils', 'getterByField']),
            isShowWxCode = getterByField('zhwuji.isShowWxCode')
        return (
            <div className={prefixCls}>
                <div className={`${prefixCls}-zhwuji`}>
                    <div className={`${prefixCls}-zhwuji-wrap`}>
                        <div className={`${prefixCls}-zhwuji-header`}>
                            <div>
                                <img onClick={::this.handleSwitchLoginType}
                                     src={isShowWxCode ? require('../img/pc.png') : require('../img/wx.png')}/>
                            </div>
                        </div>
                        {!isShowWxCode ? <div className={`${prefixCls}-content ${prefixCls}-zhwuji-content`}>
                            <div className={`${prefixCls}-zhwuji-content-tips`}>e税客APP扫描登录</div>
                            <h2 className={`${prefixCls}-header`}>登录</h2>
                            <DynamicComponent
                                componentInstances={this.getComponentInstances()}
                                className={`${prefixCls}-form`}
                                _path='login'
                                {...otherProps}
                            ></DynamicComponent>
                            <Button
                                isDefaultEnterButton={!message}
                                ref='loginBtn'
                                type="primary"
                                className={`${prefixCls}-btn`}
                                onClick={::this.handleLoginClick}>
                                登录
                            </Button>
                        </div> : this.getWxCodeDom()}
                    </div>
                </div>
            </div>
        )
    }

    /**
     * [handleZhwujiNext 模拟扫描成功]
     * @return {[type]} [description]
     */
    handleZhwujiNext(){
        this.props.zhwujiNext()
    }

    /**
     * [handleResetWxCode 重新获取二维码]
     * @return {[type]} [description]
     */
    handleResetWxCode(){
        this.props.reSetWxCode()
    }

    /**
     * [handleZhwujiPrev 返回二维码登录会刷新二维码]
     * @return {[type]} [description]
     */
    handleZhwujiPrev(){
        clearInterval(window.queryQRCodeTimer)
        this.props.zhwujiPrev()
    }

    /**
     * [handleSwitchLoginType 切换登录方式]
     * @return {[type]} [description]
     */
    handleSwitchLoginType() {
        this.props.switchLoginType()
    }

    /**
     * [handleExpiredClick 模拟二维码过期]
     * @return {[type]} [description]
     */
    handleExpiredClick(){
        this.props.ExpiredClick()
    }

    handleSendQRCode(){
        this.props.sendQRCode()
    }

    getWxCodeDom(){
        let {prefixCls} = this.props,
            getterByField = this.props.payload.getIn(['utils', 'getterByField']),
            currentStep = getterByField('zhwuji.currentStep'),
            isBtndisabled = getterByField('zhwuji.isBtndisabled')
        if(localStorage["loginType"] == 'qrCode'){
            return (
                <div className={`${prefixCls}-content ${prefixCls}-zhwuji-content`}>
                    <h3>检测到e税客APP已登录的账号</h3>
                    <div className={`${prefixCls}-zhwuji-content-userInfo`}>
                        <div className={`${prefixCls}-zhwuji-content-user`}><img src={require('../img/defaultUser.png')}/></div>
                        <div className={`${prefixCls}-zhwuji-content-userInfo-mobile`}>{localStorage["loginUser"]}</div>
                        <div style={{marginBottom:'24px'}}>
                            <Button
                                type="primary"
                                style={{cursor: 'pointer'}}
                                disabled={isBtndisabled}
                                onClick={::this.handleSendQRCode}>
                            通过手机安全登录
                            </Button>
                        </div>
                    </div>
                    <div className={`${prefixCls}-zhwuji-footer`}>
                        <span onClick={::this.handleForgetClick} style={{cursor: 'pointer'}}>忘记密码？</span>
                        <span>没有账号 <a onClick={::this.handleRegisterClick} href="javascript:;">立即注册</a></span>
                    </div>
                </div>
            )
        }
        if(currentStep == 0){
            return (
                <div className={`${prefixCls}-content ${prefixCls}-zhwuji-content`}>
                    <div className={`${prefixCls}-zhwuji-content-tips`}>账号密码登录</div>
                    <h3>请使用 e税客APP 扫描登录</h3>
                    <div ref='qrcode'></div>
                    <div className={`${prefixCls}-zhwuji-footer`}>
                        <span onClick={::this.handleForgetClick} style={{cursor: 'pointer'}}>忘记密码？</span>
                        <span>没有账号 <a onClick={::this.handleRegisterClick} href="javascript:;">立即注册</a></span>
                    </div>
                </div>
            )
        }else if(currentStep == 1){
            return (
                <div className={`${prefixCls}-content ${prefixCls}-zhwuji-content`}>
                    <h3>请使用 e税客APP 扫描登录</h3>
                    <div className={`${prefixCls}-zhwuji-content-codeExpired`}>
                        <div>二维码已失效</div>
                        <div>
                            <Button
                                type="primary"
                                style={{cursor: 'pointer'}}
                                onClick={::this.handleResetWxCode}>
                            重新获取二维码
                            </Button>
                        </div>
                    </div>
                    <div className={`${prefixCls}-zhwuji-footer`}>
                        <span onClick={::this.handleForgetClick} style={{cursor: 'pointer'}}>忘记密码？</span>
                        <span>没有账号 <a onClick={::this.handleRegisterClick} href="javascript:;">立即注册</a></span>
                    </div>
                </div>
            )
        }else{
            return (
                <div className={`${prefixCls}-content ${prefixCls}-zhwuji-content`}>
                    <h3>请使用 e税客APP 扫描登录</h3>
                    <div className={`${prefixCls}-zhwuji-content-phone`}><img src={require('../img/phone.png')}/></div>
                    <div style={{fontSize:'12px',marginTop:'7px'}}>扫码成功</div>
                    <div style={{margin:'10px auto'}}>请在手机上确认登录</div>
                    <div style={{cursor: 'pointer',fontSize:'12px',color:'#f00',marginBottom:'20px'}} onClick={::this.handleZhwujiPrev}>返回二维码登录</div>
                    <div className={`${prefixCls}-zhwuji-footer`}>
                        <span onClick={::this.handleForgetClick} style={{cursor: 'pointer'}}>忘记密码？</span>
                        <span>没有账号 <a onClick={::this.handleRegisterClick} href="javascript:;">立即注册</a></span>
                    </div>
                </div>
            )
        }
    }
}
