import React,{ Component,PropTypes } from 'react'
import { CountDownButton} from 'xComponent'
import {Input } from 'antd'

export default class MobileCaptchaComponent extends Component {
    static defaultProps = {
        prefixCls: 'mobileCaptcha'
    }


    render() {
        return (
            <span>
                <Input  />
                <CountDownButton text='获取验证码' count={60} style={{width:110}} />
            </span>
        )
    }
}
