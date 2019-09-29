import React, { Component, PropTypes } from 'react'
import { HCFLayout, Header, Menu, Icon, Button, Tabs, Radio, Table, Column, Cell, Card, Checkbox, ZIcon ,Consult} from 'xComponent'
import DynamicComponent, { FormItem, Modal } from 'dynamicComponent'
import "./order.less"
const CheckboxGroup = Checkbox.Group
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import qrcode from './qrcode'
import { post, setAccessToken, clearAccessToken } from '../../../utils/fetch-wrapper'

export default class OrderComponent extends Component {
    static defaultProps = {
        prefixCls: 'order'
    }
    componentDidMount() {
        let expert
        if(location.hash.indexOf('middle') != -1) {
            expert = 'middle'
        } else if(location.hash.indexOf('high') != -1) {
            expert = 'high'
        }
        this.props.initView(this, this.getQrCode, expert)
        // if (this.props.path.indexOf('step=2') > -1) {
        //     this.openPayWarning(this.props.onRedirect)
        // }

    }

    componentWillUnmount() {
        // clearInterval(window.loopQRCodeTimer)
        // window.loopQRCodeTimer = undefined
    }

    handleSave() {
        this.props.save()
    }

    handleEdit() {
        this.props.edit()
    }

    handleRePay() {
        let orderId = this.getParam('id')
        this.props.handleRePay(orderId, function () {
            window.location.reload()
        }, this.props.onRedirect)
    }

    openPayWarning() {
        let { clearMessage, setMessage } = this.props
        clearMessage()
        //clearTimeout(window.openWarning)

        let zfbDiv = document.getElementById('zfbContainer')
        if (zfbDiv) {
            zfbDiv.style.display = 'none'
        }

        let wxDiv = document.getElementById('wxContainer')
        if (wxDiv) {
            wxDiv.style.display = 'none'
        }

        let _warningPayDiv = document.getElementById('warningPayDiv')
        if (_warningPayDiv) {
            return
        }

        let warningPayDiv = document.createElement('div')
        warningPayDiv.id = 'warningPayDiv'
        warningPayDiv.name = 'warningPayDiv'
        warningPayDiv.style.display = 'none'
        document.body.appendChild(warningPayDiv)

        let tipsTxt = '亲，很抱歉~',
            details = '支付操作已超时，请您根据需要重新选择'
        setMessage({
            type: 'warning',
            content: <div id='warningPay'><div style={{ paddingLeft: '0', textIndent: '30px', lineHeight: '18px', color: '#454545' }}><span style={{ fontSize: '18px', fontWeight: 'bold' }}>{tipsTxt}</span></div><br /><span style={{ color: '#666666', fontSize: '12px', paddingLeft: '30px', lineHeight: '20px', letterSpacing: 0 }}>{details}</span></div>,
            width: 410,
            refName: 'alreadyWarnOver',
            wrapClassName: 'alreadyWarnOver',
            highZIndex: true,
            hideFooter: true,
            okCancel: true,
            okText: '重新支付',
            cancelText: '暂不支付',
            onOk: () => {
                this.handleRePay()
                clearMessage()

                //this.props.onRedirect('apps/login/admin?activeKey=12', true)
            },
            onCancel: () => {
                // this.props.onRedirect('apps/login/admin?activeKey=12', true)
                clearMessage()
                window.close()
            }
        })
    }

    handlePayChange(e) {
        let payType = e.target.value
        if (!payType) payType = 'openzfb'
        this.props.updatePayType(payType, this, this.props.onRedirect)
        let zfbDiv = document.getElementById('zfbContainer')
        if (zfbDiv) {
            zfbDiv.style.display = ''
        }

        let wxDiv = document.getElementById('wxContainer')
        if (wxDiv) {
            wxDiv.style.display = ''
        }
        if (e.target.value == 'zfb' && false) {

            let orderId = this.getParam('id')
            let host = window.location.host
            let alipayURL = location.protocol + '//' + host + '/v1/swypay/toAlipayPay?id=' + orderId
            alipayURL = alipayURL + "&url=" + encodeURIComponent(alipayURL)
            //window.open(alipayURL)
            window.location.href = alipayURL
            //this.props.onRedirect(alipayURL, true)
        }
    }

    getParam(paras) {
        var url = this.props.path || location.href
        if (url) {
            var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&")
            var paraObj = {}, j
            for (let i = 0; j = paraString[i]; i++)
                paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length)
            var returnValue = paraObj[paras.toLowerCase()]
            if (typeof returnValue == "undefined") return ""
            else return returnValue
        }
    }

    handleTtChange(e) {
        this.props.updateTt(e.target.value)
    }

    handleExpertChange(e) {
        this.props.updateExpert(e.target.value)
    }

    getQrCode(url) {
        if (document.getElementById('wxPay')) {
            document.getElementById('wxPay').innerHTML = ''
        }
        if (document.getElementById('zfbPay')) {
            document.getElementById('zfbPay').innerHTML = ''
        }
        let currentPayObject = document.getElementById('wxPay')

        var qr2 = new qrcode(currentPayObject, {
            width: 144,
            height: 144,
        })
        qr2.makeCode(url)
        return null

    }



    getZfbQrCode(formData) {
        if (document.getElementById('zfbPay')) {
            document.getElementById('zfbPay').innerHTML = ''
        }
        /*let orderId = payMap.get('orderCode')
        let host = window.location.host
        let shareUrl = location.protocol + '//' + host + '/v1/pay/toAlipayPay?id=' + orderId
        shareUrl = shareUrl + "&memo=" + encodeURI(shareUrl)*/

        let token = getAccessToken()
        if (token && window.localStorage) {
            if (!localStorage["token"]) {
                localStorage["token"] = token
                setAccessToken(token)
            }
        }

        let iframeDom = document.createElement('iframe')
        iframeDom.name = 'frmAlipay'
        iframeDom.id = 'frmAlipay'
        iframeDom.style.border = '0px'
        iframeDom.marginheight = '0'
        iframeDom.marginwidth = '0'
        iframeDom.scrolling = 'no'
        iframeDom.style.margin = '0'
        iframeDom.style.width = '150px'
        iframeDom.style.height = '150px'
        iframeDom.style.overflow = 'hidden'
        document.getElementById('zfbPay').appendChild(iframeDom)


        let iframedocument = document.getElementById("frmAlipay").contentDocument

        if (!iframedocument) {
            iframedocument = document.getElementById("frmAlipay").document
        }

        if (iframedocument) {
            iframedocument.open()
            iframedocument.write(formData)
            iframedocument.close()
        }

        return null
    }

    handleSubmitOrder() {
        let { clearMessage, setMessage } = this.props,
            getterByField = this.props.payload.getIn(['utils', 'getterByField'])
        this.props.submitOrder(this.getQrCode, this.props.onRedirect)
    }

    handlePaySuccess() {
        let { clearMessage, setMessage } = this.props,
            getterByField = this.props.payload.getIn(['utils', 'getterByField'])
        setMessage({
            type: 'app',
            title: '支付成功',
            content: 'app:apps/login/orderSwy/paySuccess',
            okText: '查看订单',
            wrapClassName: 'paySuccess',
            initData: { onRedirect: this.props.onRedirect, clearMessage: clearMessage },
            width: 410,
            refName: 'paySuccess',
            onCancel: () => {
                clearMessage()
            },
            onOk: (cb) => {
                clearMessage()
                this.props.onRedirect('apps/login/admin?activeKey=1202', true)
            }
        })
    }

    handleCancelOrder() {
        clearInterval(window.loopQRCodeTimer)
        this.props.cancelOrder(this.props.onRedirect,this)
    }
    handleSurePay() {
        let { clearMessage, setMessage } = this.props,
            getterByField = this.props.payload.getIn(['utils', 'getterByField']),
            shouldPrice = getterByField('form.shouldPrice'),
            getPayCode = getterByField('getPayCode')
        this.props.WeChatPayment(this.props.onRedirect)
    }

    handleAgreementClick() {
        let { clearMessage, setMessage } = this.props,
            getterByField = this.props.payload.getIn(['utils', 'getterByField'])
        this.props.agreementClick()
    }

    handleFinish() {
        this.props.finishPay(this.props.onRedirect)
    }

    render() {
        if (this.props._isCurrentTab === false) return null //加上这句话
        if (!this.props.payload || !this.props.payload.get('utils'))
            return (<div></div>)

        let { prefixCls, ...otherProps } = this.props,
            { payload } = this.props,
            message = this.props.payload.getIn(['global', 'message']),
            getter = payload.getIn(['utils', 'getter']),
            getterByField = payload.getIn(['utils', 'getterByField'])
        return <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Consult />
            <Header {...otherProps} />
            {this.renderMain()}
            {Modal(message)}
        </div>
    }

    renderHeader() {
        let { prefixCls, ...otherProps } = this.props
        return (
            <div className={`${prefixCls}-header`}>
                {true ? <img src={require(`../../../static/images/default/defaultUser.png`)} alt="" /> : ''}
            </div>
        )
    }

    renderMain() {
        let { prefixCls, ...otherProps } = this.props,
            { payload } = this.props,
            getterByField = payload.getIn(['utils', 'getterByField']),
            orderStep = getterByField('orderStep'),
            optionsRemark = [{name: 'qqq', id: '1'}, {name: 'www', id: '2'}]

        if (orderStep == 1) {
            return (<div className={`${prefixCls}`}>
                <div className='order-step'>
                    <div className='order-step-box step-pre'>
                        <p className='step-num'><span>1</span></p>
                        <p className='step-name'>填写与核对</p>
                    </div>
                    <div className='order-step-box step-will'>
                        <p className='step-num'><span>2</span></p>
                        <p className='step-name'>支付</p>
                    </div>
                    <div className='order-step-box step-will'>
                        <p className='step-num'><span>3</span></p>
                        <p className='step-name'>交易完成</p>
                    </div>
                </div>

                {this.buyInfo()}
            </div>)
        }
        else if (orderStep == 2) {
            return (<div className={`${prefixCls}`}>
                {this.payInfo()}
            </div>)
        }
    }

    handleUpdateQrCode() {
        this.props.updateQrCode(this.getQrCode, this.props.onRedirect, this)
    }

    buyInfo() {
        let { prefixCls, ...otherProps } = this.props,
            utils = this.props.payload.get('utils'),
            message = this.props.payload.getIn(['global', 'message']),
            getterByField = utils.get('getterByField'),
            isOrder = getterByField('form.isOrder'),
            isEdit = getterByField('form.isEdit'),
            orderTtValue = getterByField('form.orderTtValue'),
            orderExpertValue = getterByField('form.orderExpertValue'),
            isAgree = getterByField('form.isAgree'),
            form = getterByField('form').toJS(),
            productPrice = form.productPrice === undefined ? '0.00' : (form.productPrice - 0).toFixed(2),
            preferential = form.shouldPrice === undefined ? '0.00' : ((form.productPrice - 0)-(form.shouldPrice - 0)).toFixed(2),
            shouldPrice = form.shouldPrice === undefined ?'0.00':(form.shouldPrice - 0).toFixed(2),
            addstr = form.address ? form.provincesStr + ' ' + form.cityStr + ' ' + form.districtsStr + ' ' + form.address.text : '',
            redPackage = getterByField('redPackage')? getterByField('redPackage').toJS():null,
            expertInfo = [1,2,3]

        return (<div className={`${prefixCls}-main ${prefixCls}-js`}>
            <Card className={`${prefixCls}-js-first`}>
                <div className={`${prefixCls}-select-product`} style={{ display: 'none' }}>
                    <h4 className={`${prefixCls}-form-title`}>选择商品</h4>
                    <Card className={`product-card`}>
                        <strong>{form.productName}</strong>
                        <p>{form.productInfo}</p>
                        <p>购买期限：{form.timespan}个月</p>
                        <p>纳税人身份：{form.vatTaxpayerStr}</p>
                    </Card>
                </div>
                <div className={`${prefixCls}-select-org`} style={{ display: 'none' }}>
                    <h4 className={`${prefixCls}-form-title`}>选择组织</h4>
                    <DynamicComponent _path='order.selectCompany' {...otherProps} />
                </div>
                <div className={`${prefixCls}-select-org`}>
                    <h4 className={`${prefixCls}-form-title`}>服务名称</h4>
                    <RadioGroup value={orderExpertValue} size="large" onChange={::this.handleExpertChange} className='tt-radios'>
                        <RadioButton value='middle'>中级顾问</RadioButton>
                        <RadioButton value='high'>高级顾问</RadioButton>
                    </RadioGroup>
                </div>
                <div className={`${prefixCls}-select-order`}>
                    <h4 className={`${prefixCls}-form-title`}>选择发票信息</h4>
                    <div className={`${prefixCls}-form-kjfp`}>

                        <DynamicComponent _path='order.isOrder' {...otherProps} />
                        开具发票
                    </div>
                    {isOrder ? (isEdit ? <div className={`${prefixCls}-select-order-info`}>
                        <DynamicComponent _path='order.orderInfoForm'  {...otherProps} />
                        <div>
                            <span className='order-fptt'>发票抬头:</span>
                            <RadioGroup value={orderTtValue} size="large" onChange={::this.handleTtChange} className='tt-radios'>
                                <RadioButton value="company">企业</RadioButton>
                            <RadioButton value="person">个人</RadioButton>
                            </RadioGroup>
                    </div>
                        <DynamicComponent _path='order.orderInfoFormTwo'  {...otherProps} />
                        <Button className='save-btn' type='primary' onClick={::this.handleSave}>保存发票信息</Button>
                    </div>:<div className={`${prefixCls}-select-order-list`}>
                <p className='order-select-list-item'><span className='order-select-list-item-name'>发票类型:</span><span className='order-select-list-item-value'>{form.orderType ? form.orderType.name : ''}</span></p>
                <p className='order-select-list-item'><span className='order-select-list-item-name'>发票内容:</span><span className='order-select-list-item-value'>{form.orderContent ? form.orderContent.name : ''}</span></p>
                <p className='order-select-list-item'><span className='order-select-list-item-name red-before'>发票抬头:</span><span className='order-select-list-item-value'>{form.orderTtValue == 'person' ? '个人' : '企业'}</span></p>
                {orderTtValue == 'company' ? <p className='order-select-list-item'><span className='order-select-list-item-name red-before'>纳税人识别号/税号:</span><span className='order-select-list-item-value'>{form.taxNum}</span></p> : ''}
                {orderTtValue == 'company' ? <p className='order-select-list-item'><span className='order-select-list-item-name red-before'>企业名称:</span><span className='order-select-list-item-value' title={form.companyName}>{form.companyName}</span></p> : ''}
                <p className='order-select-list-item'><span className='order-select-list-item-name red-before'>寄送地址:</span><span className='order-select-list-item-value'>{form.addrStr}</span></p>
                <p className='order-select-list-item'><span className='order-select-list-item-name red-before'>详细地址:</span><span className='order-select-list-item-value' title={form.addressDetail}>{form.addressDetail}</span></p>
                <p className='order-select-list-item'><span className='order-select-list-item-name red-before'>收件人:</span><span className='order-select-list-item-value'>{form.curstomer}</span></p>
                <p className='order-select-list-item'><span className='order-select-list-item-name red-before'>联系方式:</span><span className='order-select-list-item-value'>{form.phone}</span></p>
                <Button className='edit-btn' type='primary' onClick={::this.handleEdit}>修改发票信息</Button>

        </div>):''
    }
                </div>

            </Card>
    <div className={`${prefixCls}-js-second`}>
        <Card>
            <div className={`${prefixCls}-buy`}>
               <div className={`${prefixCls}-select-org`}>
                    <h4 className={`${prefixCls}-form-title`}>购买清单</h4>
                </div>
                <p className={`${prefixCls}-form-item`}><span className={`${prefixCls}-form-item-name`}>服务名称：</span><span className={`${prefixCls}-form-item-value`}>{form.serveName}</span></p>
                <p className={`${prefixCls}-form-item`}><span className={`${prefixCls}-form-item-name`}>订购年限：</span><span className={`${prefixCls}-form-item-value`}>1年</span></p>
                <p className={`${prefixCls}-form-item`}><span className={`${prefixCls}-form-item-name`}>开始时间：</span><span className={`${prefixCls}-form-item-value`}>{form.beginDate}</span></p>
                <p className={`${prefixCls}-form-item`}><span className={`${prefixCls}-form-item-name`}>结束时间：</span><span className={`${prefixCls}-form-item-value`}>{form.endDate}</span></p>
            </div>
            <div className={`${prefixCls}-buy`}>
               <div className={`${prefixCls}-select-org`}>
                    <h4 className={`${prefixCls}-form-title`}>支付信息</h4>
                </div>
                <p className={`${prefixCls}-form-item`}><span className={`${prefixCls}-form-item-name`}>订单金额：</span><span className={`${prefixCls}-form-item-value`}>{form.orderAmount}</span></p>
                <p className={`${prefixCls}-form-item`}><span className={`${prefixCls}-form-item-name`}>优惠金额：</span><span className={`${prefixCls}-form-item-value`}>-￥0.00</span></p>
                <p className={`${prefixCls}-form-item`}><span className={`${prefixCls}-form-item-name`}>应付金额：</span><span className={`${prefixCls}-form-item-value`}>{form.payAmount}</span></p>
            </div>
            <Button className={`${prefixCls}-submit-btn`} type='primary' onClick={::this.handleSubmitOrder} disabled={!isAgree}>提交订单</Button>
        <DynamicComponent _path='order.isAgree' {...otherProps} />同意
            <a onClick={::this.handleAgreementClick} href='javascript:;'  className="agreementText">《易嘉人产品租赁协议》</a>

                </Card>
    <button className='backBtn hidden' title={'上一步'}><ZIcon icon={'revoke'} />上一步</button>
            </div>
        </div>)
}
redPackageChange(e){
    let { prefixCls, ...otherProps } = this.props,
        utils = this.props.payload.get('utils'),
        message = this.props.payload.getIn(['global', 'message']),
        getterByField = utils.get('getterByField')
    this.props.redPackageChange(e.target.checked)
}
payInfo() {
    let { prefixCls, ...otherProps } = this.props,
        utils = this.props.payload.get('utils'),
        message = this.props.payload.getIn(['global', 'message']),
        getterByField = utils.get('getterByField'),
        orderPayType = getterByField('orderPayType'),
        form = getterByField('form').toJS(),
        showQrCodeLayer = getterByField('showQrCodeLayer'),
        companyName
    if (form.company) {
        companyName = form.company.name
    } else {
        companyName = form.companyNameStr
    }

    return (<div className={`${prefixCls}-main ${prefixCls}-pay`}>
        <div className='order-step'>
            <div className='order-step-box step-pre'>
                <p className='step-num'><span>1</span></p>
                <p className='step-name'>填写与核对</p>
            </div>
            <div className='order-step-box step-now'>
                <p className='step-num'><span>2</span></p>
                <p className='step-name'>支付</p>
            </div>
            <div className='order-step-box step-will'>
                <p className='step-num'><span>3</span></p>
                <p className='step-name'>交易完成</p>
            </div>
        </div>
        <Card className={`${prefixCls}-pay-main`}>
            <div className={`${prefixCls}-pay-main-title`}>
                <div className={`${prefixCls}-pay-main-title-box`}>
                    <h4>订单提交成功，请您尽快付款！订单号：{form.orderCode}<span>应付金额：<strong>￥{form.shouldPrice}</strong></span></h4>
                    <p>请您在提交订单后<span className='order-hour'>24小时</span>内完成支付，否则订单会自动取消。<Button onClick={::this.handleCancelOrder}>取消订单</Button></p>
            </div>
                </div>
        <div className={`${prefixCls}-pay-main-info`}>
            {
                form.orgName ?
                <p className=''><span className='order-pay-main-info-name'>购买企业：</span>
                <span className='order-pay-main-info-value'>{form.orgName}</span></p>:null
            }
            <p className=''><span className='order-pay-main-info-name'>购买产品：</span><span className='order-pay-main-info-value'>软件产品</span></p>
            <p className=''><span className='order-pay-main-info-name'>购买期限：</span><span className='order-pay-main-info-value'>{form.beginDate}至{form.endDate}</span></p>
            <p className=''><span className='order-pay-main-info-name'>销售方名称：</span><span className='order-pay-main-info-value'>北京人人时代科技有限公司</span></p>
            <p className=''><span className='order-pay-main-info-name'>联系电话：</span><span className='order-pay-main-info-value'>400-6060-386</span></p>
        </div>
        <div className={`${prefixCls}-pay-main-type`}>
            <h4 className={`${prefixCls}-form-title ${prefixCls}-pay-main-type-title`}>请选择支付方式</h4>
            <RadioGroup size="large" value={orderPayType} onChange={::this.handlePayChange}>
                        <RadioButton value="wx" className='wx-pay'><img src={require('./img/wxpay.png')} /></RadioButton>
            <RadioButton value="zfb" className='down-pay'><img src={require('./img/zfbpay.png')} /></RadioButton>
                    </RadioGroup>
    </div>
        <div id='wxContainer' className={orderPayType == 'wx' ? 'sure-pay-box' : 'sure-pay-box hidden'}>
            <div className={orderPayType == 'wx' ? 'sure-pay-wx' : ''} id='wxPay'></div>
            {showQrCodeLayer && this.props.path.indexOf('step=2') > -1 ? (document.getElementById('warningPay') ? null : this.openPayWarning()) : null}
            <div className='sure-pay-note'>
            </div>
        </div >

        <div id='zfbContainer' className={orderPayType == 'zfb' ? 'sure-pay-box-zfb' : 'sure-pay-box-zfb hidden'}>
            <div className={orderPayType == 'zfb' ? 'sure-pay-zfb' : ''} id='zfbPay' style={{ overflow: 'hidden' }}>
            </div>
            <div className='sure-pay-note-zfb'>
            </div>
            <div className='sure-pay-a-zfb' onClick={::this.handlePayChange}>去支付宝进行支付>></div>
        </div >
            </Card >
        <Card className={`${prefixCls}-pay-footer hidden`}>
            <div className={`${prefixCls}-pay-footer-prompt`}>
                <p className={`${prefixCls}-pay-footer-text`}><ZIcon icon='modal-warn' />如在线支付遇到问题，请转账到以下银行账号</p>
            </div>
            <div className={`${prefixCls}-pay-footer-info`}>
                <div className={`${prefixCls}-pay-footer-img`}>
                    <img src={require('./img/hxbank.png')} />
                </div>
                <div className={`${prefixCls}-pay-footer-info-box`}>
                    <p>银行账号：200000000000000000000000000000</p>
                    <p>账户名称：北京人人时代科技有限公司</p>
                    <p>开户行：北京银行中关村支行</p>
                </div>
                <div className={`${prefixCls}-pay-footer-info-box`}>
                    <p>温馨提示：</p>
                    <p>1、转账时请将订单号备注在转账信息中</p>
                    <p>2、转账成功后，请及时联系客服</p>
                </div>
                <div className={`${prefixCls}-pay-footer-info-last`}>
                    <p>客服电话：</p>
                    <p className={`${prefixCls}-pay-footer-info-phone`}>173 1916 2004</p>
                </div>

            </div>
        </Card>
        </div >)
}
}
