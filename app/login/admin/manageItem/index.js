/**
 * Create by lmh on 17/7/21.
 */

import React, { Component, PropTypes } from 'react'
import DynamicComponent, { Modal } from 'dynamicComponent'
import { Menu, Dropdown, Button, Radio, Input, Card, Popover ,Checkbox} from 'xComponent'
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
    lookCon(lookCon) {
        this.props.lookCon(lookCon)
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
            contractNo = getterByField('form.contractNo'),
            isSee = getterByField('isSee'),
            invoiceChecked = getterByField('invoiceChecked'),
            invoiceCheckedDisabled = getterByField('invoiceCheckedDisabled'),
            path = orderSource == 1? "orderManageForm.onlineOrder":"orderManageForm.offlineOrder"

            // console.log(form.invoice && form.invoice.titleType+'' || "2")

        return (
            <div className={this.props.prefixCls}>
                <div className={`${prefixCls}-sure-item-date`}>
                    <DynamicComponent {...otherProps} _path={path}/>
                    <div className="remarkBox">
                        <span className="remarkTitle">备注 :</span><Input type='textarea' className={'remarkInput'} placeholder='其他说明' disabled={isSee} onChange={::this.handleMemoChange} value={memoValue} maxLength={200}/>
                      
                    </div>
                    <div className="remarkBox">
                        <span className="remarkTitles">订单状态 :</span>{
                                contractNo ?
                                    <a onClick={() => {this.lookCon(contractNo)}}>查看合同</a>
                                            :
                                    <span>未签署</span>
                            }
                    </div>
                    {
                        orderSource == 1 ? null :
                        <div  className='invoice-btn'>
                            <Checkbox
                                onChange = {::this.invoiceChecked}
                                checked = {invoiceChecked}>发票信息</Checkbox>
                        </div>
                    }
                    {
                        invoiceChecked ? <div className={`${prefixCls}-select-invoice-info`}>
                            <DynamicComponent _path='orderManageForm.invoice.orderInfoForm'  {...otherProps} />
                            <div className="invoice-title">
                                <span className='order-fptt'>发票抬头:</span>
                                <RadioGroup disabled={invoiceCheckedDisabled} value={form.invoice && form.invoice.titleType+'' || "2"} size="large" onChange={::this.handleTtChange} className='tt-radios'>
                                    <RadioButton value="2">企业</RadioButton>
                                <RadioButton value="1">个人</RadioButton>
                                </RadioGroup>
                        </div>
                            <DynamicComponent _path='orderManageForm.invoice.orderInfoFormTwo'  {...otherProps} />
                        </div>:null
                    }
                    {
                        (form.invoice && orderSource == 1 )?<div className='invoice-info-btn'><Popover placement="right" content={::this.setInvoiceInfo(form.invoice)} title="" >
                            <div className={`attachment`}><span>发票信息</span></div>
                        </Popover></div>:null
                    }
                </div>
                {Modal(message)}
            </div>
        )
    }
    handleSave(){
        debugger
    }
    handleTtChange(e){
        this.props.setTitleType(e.target.value)
    }
    invoiceChecked(e){
        this.props.setInvoiceChecked(e.target.checked)
    }
    setInvoiceInfo(data) {
        // console.log(data)
        return (
            <div className='invoice-info-box'>
                <p><span className="invoice-title">发票类型：</span><span className="invoice-value">{data.invoiceType.name}</span></p>
                <p><span className="invoice-title">发票内容：</span><span className="invoice-value">{data.contentType.name}</span></p>
                <p><span className="invoice-title">发票抬头：</span><span className="invoice-value">{data.titleType==2?'企业':'个人'}</span></p>
                <p><span className="invoice-title">纳税人识别号/税号：</span><span className="invoice-value">{data.titleOrgCode}</span></p>
                {
                    data.titleType==2?<p><span className="invoice-title">企业名称：</span><span className="invoice-value">{data.titleOrgName}</span></p>:''
                }
                <p><span className="invoice-title">寄送地址：</span><span className="invoice-value">{data.addressTxt?data.addressTxt.replace('false',''):data.address.replace('false','') + data.addressDetail}</span></p>
                <p><span className="invoice-title">收件人：</span><span className="invoice-value">{data.contact}</span></p>
                <p><span className="invoice-title">联系方式：</span><span className="invoice-value">{data.mobile}</span></p>
            </div>

        )
    }
}
