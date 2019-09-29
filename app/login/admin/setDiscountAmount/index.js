/**
 * Create by lmh on 17/7/21.
 */

import React, { Component, PropTypes } from 'react'
import DynamicComponent, { Modal } from 'dynamicComponent'
import { Menu, Dropdown, Button, Radio, Input, Card } from 'xComponent'
import './setDiscountAmount.less'

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

export default class SetDiscountAmountComponent extends Component {
    static defaultProps = {
        prefixCls: 'setDiscountAmount'
    }

    componentDidMount() {
        this.props.initView(this.props.initData)
    }

    shouldComponentUpdate(nextProps) {
        return !this.props.payload || this.props.payload !== nextProps.payload
    }
    

    render() {
        
        if (!this.props.payload || !this.props.payload.get('utils')) {
            return null
        }

        let message = this.props.payload.getIn(['global', 'message']),
            {prefixCls, ...otherProps} = this.props,
            getterByField = this.props.payload.getIn(['utils', 'getterByField']),
            isLeft = this.props.initData.isLeft,
            path = isLeft ? 'discountAmount.leftDiscountAmount': 'discountAmount.rightDiscountAmount'

        return (
            <div className={this.props.prefixCls}>
                    <DynamicComponent {...otherProps} _path={path}/>
                {Modal(message)}
            </div>
        )
    }
}