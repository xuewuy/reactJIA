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

    handleLoginClick(){
        alert(111)
    }

    componentDidMount() {

        this.props.initView(this.props.user, this.props.appParams['fromAction'], data => {
            if (data.result) {

                    this.props.onLoginSuccess('apps/login/admin', true)
            }
        })
    }

    shouldComponentUpdate(nextProps) {
        return !this.props.payload || this.props.payload !== nextProps.payload
    }


    render() {

        if (this.props._isCurrentTab === false) return null //加上这句话
        if (!this.props.payload || !this.props.payload.get('utils'))
            return (<div></div>)

        let {prefixCls, ...otherProps} = this.props,
            getterByField = this.props.payload.getIn(['utils', 'getterByField'])

        return (
            <HCFLayout
                main={this.renderYj(prefixCls, otherProps)}
                {...otherProps}
            />
        )
    }


    renderYj(prefixCls, otherProps) {
        let message = this.props.payload.getIn(['global', 'message']),
            getterByField = this.props.payload.getIn(['utils', 'getterByField'])
        return (
            <div className={prefixCls}>
                <div className={prefixCls + '-content'}>
                    <h2 className={`${prefixCls}-header`}>登录</h2>
                    <DynamicComponent
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
                    <p>薛武英</p>
                </div>
            </div>

        )
    }

}
