/**
 * Create by lmh on 17/7/21.
 */

import React, { Component, PropTypes } from 'react'
import DynamicComponent, { Modal } from 'dynamicComponent'
import { Menu, Dropdown, Button, Radio, Input, Card, Popover } from 'xComponent'
import './manageItem.less'

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

export default class manageItemComponent extends Component {
    static defaultProps = {
        prefixCls: 'manageItem'
    }

    componentDidMount() {
        this.props.initView(this.props.initData)
    }

    shouldComponentUpdate(nextProps) {
        return !this.props.payload || this.props.payload !== nextProps.payload
    }
    handlePayTypeChange(e) {
        this.props.updatePayType(e.target.value)

    }
    handleOrderPromptChange(e) {
        this.props.updateOrderPrompt(e.target.value)
        
    }
    handleMemoChange(e) {
        let value = e.target.value
        this.props.updateMemo(value)
    }

    render() {
        
        if (!this.props.payload || !this.props.payload.get('utils')) {
            return null
        }

        let message = this.props.payload.getIn(['global', 'message']),
            {prefixCls, ...otherProps} = this.props,
            getterByField = this.props.payload.getIn(['utils', 'getterByField']),
            form = getterByField('form').toJS(),
            payTypeValue = getterByField('payTypeValue'),
            orderPromptValue = getterByField('orderPromptValue'),
            orderSource = getterByField('orderSource'),
            memoValue = getterByField('form.memo'),
            isSee = getterByField('isSee')

        return (
            <div className={this.props.prefixCls}>
                <div className={`${prefixCls}-sure-item-date`}>
                    <DynamicComponent {...otherProps} _path="orderManageForm"/>
                    <div className="remarkBox">
                        <span className="remarkTitle">备注 :</span><Input type='textarea' className={'remarkInput'} placeholder='其他说明' disabled={isSee} onChange={::this.handleMemoChange} value={memoValue} maxLength={200}/>
                    </div>
                    {
                        (form.invoice)?<div className='invoice-info-btn'><Popover placement="right" content={::this.setInvoiceInfo(form.invoice)} title="" >
                            <div className={`attachment`}><span>发票信息</span></div>
                        </Popover></div>:null
                    }
                </div>
                {Modal(message)}
            </div>
        )
    }
    

    setInvoiceInfo(data) {
        return (
            <div className='invoice-info-box'>
                <p><span className="invoice-title">发票类型：</span><span className="invoice-value">{data.invoiceType==1?'增值税普通发票':'增值税专用发票'}</span></p>
                <p><span className="invoice-title">发票内容：</span><span className="invoice-value">{data.contentType==1?'软件服务费':'软件服务费'}</span></p>
                <p><span className="invoice-title">发票抬头：</span><span className="invoice-value">{data.titleType==2?'企业':'个人'}</span></p>
                <p><span className="invoice-title">纳税人识别号/税号：</span><span className="invoice-value">{data.titleOrgCode}</span></p>
                {
                    data.titleType==2?<p><span className="invoice-title">企业名称：</span><span className="invoice-value">{data.titleOrgName}</span></p>:''
                }
                <p><span className="invoice-title">寄送地址：</span><span className="invoice-value">{data.address.replace('false','') + data.addressDetail}</span></p>
                <p><span className="invoice-title">收件人：</span><span className="invoice-value">{data.contact}</span></p>
                <p><span className="invoice-title">联系方式：</span><span className="invoice-value">{data.mobile}</span></p>
            </div>

        )
    }
}