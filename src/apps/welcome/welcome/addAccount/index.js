import React from 'react'
import { Select, DatePicker, Input,Form,FormItems, Text} from 'xComponent'
import { Calendar } from 'antd'
import defaultComponentFactory from 'defaultComponentFactory'
import DynamicComponent,{Modal} from 'dynamicComponent'
import ReactDOM from 'react-dom'
import moment from 'moment'
import './addAccount.less'
import * as api from './api'

export default class AddAccountComponent extends React.Component {
    static defaultProps = {
        prefixCls: 'addAccount'
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
            getterByField = this.props.payload.getIn(['utils','getterByField']),
            contentText = getterByField('form.contentText')
        return (
            <div className={`${prefixCls}`} id='addAccount'>
                <DynamicComponent {...otherProps}
                                    _path="form.formItems"/>
                {Modal(message)}
            </div>
        )
    }
}
