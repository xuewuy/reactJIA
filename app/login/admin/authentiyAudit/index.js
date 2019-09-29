import React, { Component, PropTypes } from 'react'
import DynamicComponent, { Modal } from 'dynamicComponent'
import { Radio } from 'antd';
const RadioGroup = Radio.Group;
import './authentiyAudit.less'

export default class editOrgComponent extends Component {
    static defaultProps = {
        prefixCls: 'authentiyAudit'
    }

    componentDidMount() {
        this.props.initView(this.props.initData)
    }

    shouldComponentUpdate(nextProps) {
        return !this.props.payload || this.props.payload !== nextProps.payload
    }

    handleRadioChange(e){
        this.props.radioChange(e.target.value)
    }

    render() {
        if (!this.props.payload || !this.props.payload.get('utils')) {
            return null
        }

        let message = this.props.payload.getIn(['global', 'message']),
            {prefixCls, ...otherProps} = this.props,
            getterByField = this.props.payload.getIn(['utils', 'getterByField']),
            status = getterByField('status')
            
        return (
            <div className={this.props.prefixCls}>
                <RadioGroup onChange={::this.handleRadioChange} value={status}>
                    <Radio value={1}>通过</Radio>
                    <Radio value={3}>未通过</Radio>
                </RadioGroup>
            </div>
        )
    }
}