import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {HCFLayout, Button, MobileCaptcha, Icon, CountDownButton} from 'xComponent'
import DynamicComponent, {Link} from 'dynamicComponent'
import styles from "./login.less"
import qrcode from '../../common/qrCode/qrcode.js'
import Zhwuji from './component/zhwujiLogin'


export default class LoginNewComponent extends Component {
    static defaultProps = {
        prefixCls: 'login'

    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {

        this.props.initView(this.props.user, this.props.appParams['fromAction'], data => {
            if (data.result) {
                if(location.hash.indexOf('middle=true') != -1) {
                    this.props.onLoginSuccess('apps/login/orderSwy?middle=true', true)
                }else if(location.hash.indexOf('high=true') != -1) {
                    this.props.onLoginSuccess('apps/login/orderSwy?high=true', true)
                } else if (!!data.currentOrg && data.entrance === 2) {
                    this.props.onLoginSuccess('apps/portal', true)
                }
                else
                    this.props.onLoginSuccess('apps/login/admin', true)
            }
        })
    }

    shouldComponentUpdate(nextProps) {
        return !this.props.payload || this.props.payload !== nextProps.payload
    }

    handleLoginClick(e) {
        let message = this.props.payload.getIn(['global', 'message'])
        if (message) return
        this.props.login(data => {
            if (data.result) {
                let gw='?gw',
                    taste='?taste'
                if(window.location.href.indexOf('fxhtopSY')!=-1){
                    window.location.href='https://www.fxhtop.com/';
                }else if(window.location.href.indexOf('fxhtopQB')!=-1){
                    window.location.href='http://www.fxhtop.com/third/yjrqb';
                }else if(window.location.href.indexOf('fxhtopDK')!=-1){
                    window.location.href='http://www.fxhtop.com/third/yjrdk';
                }else
 
                if(window.location.href.indexOf('farenw')!=-1){
                    let utils = this.props.payload.get('utils'),
                        getterByField = utils.get('getterByField'),
                        appInfo = getterByField('appInfo'),
                        homeUrl = window.location.origin,
                        // helpUrl = homeUrl+'/help/help.html'
                        // homeUrl = appInfo && appInfo.get('homeUrl') || "/",
                        mainUrl = homeUrl.split('farenw')[0],
                        endChars = mainUrl.charAt(mainUrl.length-1),
                        gwUrl = endChars=='/'?mainUrl+'farenw.html':mainUrl+'/farenw.html'

                    if(homeUrl){
                        //window.location.href.indexOf('www.rrtimes.com')==-1?'/v1/card/getMobile':'https://yj.rrtimes.com/v1/card/getMobile';
                        gwUrl = window.location.protocol+'//'+window.location.host+'/farenw.html'
						window.name = '_accessToken=' + sessionStorage['_accessToken']
                    }
                    window.location.href=gwUrl;
                } else

                if(location.hash.indexOf('middle=true') != -1) {
                    this.props.onLoginSuccess('apps/login/orderSwy?middle=true', true)
                }else if(location.hash.indexOf('high=true') != -1) {
                    this.props.onLoginSuccess('apps/login/orderSwy?high=true', true)
                }else{
                    localStorage["currentUserName"] = data.currentUser.name
                    if (!!data.currentOrg && data.entrance === 2) {
                        this.props.onLoginSuccess('apps/portal', true)
                    }else{
                        this.props.onLoginSuccess('apps/login/admin', true)
                    }
                }
            }
        })
    }

    handleRegisterClick() {
        let {prefixCls, ...otherProps} = this.props,
            getterByField = this.props.payload.getIn(['utils', 'getterByField'])
        if(getterByField('appId')==102) {
            //代账端
            if(location.hash.indexOf('?appDz') != -1){
                this.props.onRedirect('apps/dz/register?appDz', true)
            }else{
                this.props.onRedirect('apps/dz/register', true)
            }
        } else if (getterByField('appId')==103){
            // 集团总分注册
            this.props.onRedirect('apps/login/groupRegister', true)
        }else {
            //企业端
            if(location.hash.indexOf('middle=true') != -1) {
                this.props.onRedirect('apps/login/clientRegister?fromBuySwy=middle', true)
            }else if(location.hash.indexOf('high=true') != -1) {
                this.props.onRedirect('apps/login/clientRegister?fromBuySwy=high', true)
            }else if(location.hash.indexOf('?tasteBuy') != -1){
                this.props.onRedirect('apps/login/clientRegister?tasteBuy', true)
            }else if(location.hash.indexOf('fxhtopSY') != -1){//判断是否从官网峰享会进来的
                this.props.onRedirect('apps/login/clientRegister?fxhtopSY', true)
            }else if(location.hash.indexOf('fxhtopQB') != -1){//判断是否从官网峰享会进来的
                this.props.onRedirect('apps/login/clientRegister?fxhtopQB', true)
            }else if(location.hash.indexOf('fxhtopDK') != -1){//判断是否从官网峰享会进来的
                this.props.onRedirect('apps/login/clientRegister?fxhtopDK', true)
            }else {
                this.props.onRedirect('apps/login/clientRegister', true)
            }
        }
        // this.props.onRedirect('apps/login/clientRegister', true)
    }

    handleForgetClick() {
        let getterByField = this.props.payload.getIn(['utils', 'getterByField'])
        let user = getterByField('user')
        if(user){
            user = "?user=" + user
        }
        this.props.onRedirect('apps/login/forgetPassword' + user, true)
    }

    getComponentInstances() {
        return {
            forgetPassword: <a className={`${this.props.prefixCls}-forget`}
                               onClick={::this.handleForgetClick}>忘记密码?</a>,
            register: <span className={`${this.props.prefixCls}-register-span`}>没有账号<a
                className={`${this.props.prefixCls}-register-a`} onClick={::this.handleRegisterClick}>立即注册</a></span>
        }
    }
    setContinueBrowsing(){
        this.props.setContinueBrowsing()
    }

    render() {
        if (this.props._isCurrentTab === false) return null //加上这句话
        if (!this.props.payload || !this.props.payload.get('utils'))
            return (<div></div>)

        let {prefixCls, ...otherProps} = this.props,
            getterByField = this.props.payload.getIn(['utils', 'getterByField']),
            appInfo = getterByField('appInfo'),
            isZhwuji = appInfo && appInfo.get('id') == 1000,
            userAgent = window.navigator.userAgent,
            isContinueBrowsing = getterByField('isContinueBrowsing')
        if(userAgent.match(/AppleWebKit.*Mobile.*/) && window.outerWidth < 768 && !isContinueBrowsing){
            return (
                <div style={{display:'flex',flexDirection: 'column',alignItems: 'center',justifyContent: 'center',height: '100%'}}>
                    <img style={{width:'80%'}} src={require('./img/error.png')} />
                    <Button
                        style={{marginTop:'40px'}}
                        type="primary"
                        onClick={::this.setContinueBrowsing}>
                        继续手机浏览
                    </Button>
                </div>
            )
        }
        return (
            <HCFLayout
                main={isZhwuji ? <Zhwuji {...this.props} /> : this.renderYj(prefixCls, otherProps)}
                {...otherProps}
            />
        )
    }
    getLoginTitle(appInfo){
        if(!appInfo) return '企业登录'
        if(appInfo.get('id') == 102){
            return location.href.indexOf('personal') != -1?'个人代账登录':'服务商登录'
        }else if( appInfo.get('id') == 103){
            return '集团登录'
        }else{
            return '企业登录'
        }
    }
    getServicePhone(appInfo){
        if(appInfo.get('id')==1010){
            return appInfo.get('appServiceTel')
        }
       return  '400-6060386'
    }

    renderYj(prefixCls, otherProps) {
        let message = this.props.payload.getIn(['global', 'message']),
            getterByField = this.props.payload.getIn(['utils', 'getterByField']),
            appInfo = getterByField('appInfo'),
            loginTitle = this.getLoginTitle(appInfo)
        return (
            <div className={prefixCls}>
                <div className={prefixCls + '-content'}>
                    <h2 className={`${prefixCls}-header`}>{loginTitle}</h2>
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
                    <p>客户服务咨询：{this.getServicePhone(appInfo)}</p>
                </div>
            </div>

        )
    }

}
