import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {HCFLayout, Button, MobileCaptcha, Icon, CountDownButton} from 'xComponent'
import DynamicComponent, {Link} from 'dynamicComponent'
import styles from "./login.less"
import qrcode from '../../common/qrCode/qrcode.js'


export default class LoginNewComponent extends Component {
    static defaultProps = {
        prefixCls: 'login'

    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        console.log(this.props.user);
        this.props.initView(this.props.user, this.props.appParams['fromAction'], data => {
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
                    localStorage["currentUserName"] = data.currentUser.name
                    this.props.onLoginSuccess('apps/portal', true)
            }
        })
    }

    handleRegisterClick() {
        let {prefixCls, ...otherProps} = this.props,
            getterByField = this.props.payload.getIn(['utils', 'getterByField'])
    }

    handleForgetClick() {
        let getterByField = this.props.payload.getIn(['utils', 'getterByField'])
        let user = getterByField('user')
        if(user){
            user = "?user=" + user
        }
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
        console.log(this.props.payload)
        console.log(this.props.payload.getIn(['global', 'message']))
        if (!this.props.payload || !this.props.payload.get('utils'))
            return (<div style={{width:'100%',lineHeight: '100px',textAlign: 'center',fontSize: '20px'}}>抱歉，没有获取到数据</div>)

        let {prefixCls, ...otherProps} = this.props,
            getterByField = this.props.payload.getIn(['utils', 'getterByField']),
            userAgent = window.navigator.userAgent
        //  let sContinueBrowsing = getterByField('isContinueBrowsing')
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
            <div className={prefixCls}>
                {/* <img src={require('./img/bg1.jpg')} className={prefixCls + 'Img'} /> */}
                <div className={prefixCls + '-content'}>
                    <h2 className={`${prefixCls}-header`}>登录</h2>
                    <DynamicComponent
                        componentInstances={this.getComponentInstances()}
                        className={`${prefixCls}-form`}
                        _path='login'
                        {...otherProps}
                    ></DynamicComponent>
                    <Button
                        ref='loginBtn'
                        type="primary"
                        className={`${prefixCls}-btn`}
                        onClick={::this.handleLoginClick}>
                        登录
                    </Button>
                    <p>薛武英制作</p>
                </div>
            </div>
        )
    }
}
