import React from 'react'
import { Select, DatePicker, Input,Form,FormItems, Text, ZIcon} from 'xComponent'
import { Calendar } from 'antd'
import defaultComponentFactory from 'defaultComponentFactory'
import DynamicComponent,{Modal} from 'dynamicComponent'
import ReactDOM from 'react-dom'
import moment from 'moment'
import './accountFull.less'
import * as api from './api'

export default class AccountFullComponent extends React.Component {
    static defaultProps = {
        prefixCls: 'accountFull'
    }

    componentDidMount() {
        this.props.initView(this.props.initData)
    }

    shouldComponentUpdate(nextProps){
        return !this.props.payload  || this.props.payload !== nextProps.payload
    }

    render() {
        if(this.props._isCurrentTab === false) return null
        if (!this.props.payload || !this.props.payload.get('utils'))  return null

        let message = this.props.payload.getIn(['global', 'message']),
            {prefixCls, ...otherProps} = this.props,
            getterByField = this.props.payload.getIn(['utils','getterByField'])
        return (
            <div className={`${prefixCls}`}>
                <ZIcon icon='modal-warn' /><p className={`${prefixCls}-orange`}>您当前可用账套数量为 0。</p>
                <p className={`${prefixCls}-black`}>如有需要请联系我们的工作人员购买账套！</p>
                <p className={`${prefixCls}-black`}>服务热线：4006060386</p>
            </div>
        )
    }
}
