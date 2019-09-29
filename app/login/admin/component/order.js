import React,{ Component,PropTypes } from 'react'
import DynamicComponent, {Modal} from 'dynamicComponent'
import {HCFLayout,Button, Tabs, Radio, Table, Column, Cell, Card,ZIcon} from 'xComponent'
import CreateOrgForm from './createOrg'

export default class OrderComponent extends Component {
	handleWeChatPay(){
		return ()=> {
            let {clearMessage, setMessage} = this.props,
                getterByField = this.props.payload.getIn(['utils', 'getterByField'])
            setMessage({
                type: 'app',
                title: '微信支付',
                content: 'app:apps/login/admin/component/weChatPay',
                okText: '更换其他支付方式',
                wrapClassName:'weChatPay',
                width: 360,
                refName: 'weChatPay',
                onCancel: ()=> {
                    clearMessage()
                },
                onOk: (cb)=> {
                	clearMessage()
                }
            })

        }
	}
	handlePaySuccess(){
		return ()=> {
            let {clearMessage, setMessage} = this.props,
                getterByField = this.props.payload.getIn(['utils', 'getterByField'])
            setMessage({
                type: 'app',
                title: '微信支付',
                content: 'app:apps/login/admin/component/paySuccess',
                okText: '查看订单',
                wrapClassName:'paySuccess',
                width: 410,
                refName: 'paySuccess',
                onCancel: ()=> {
                    clearMessage()
                },
                onOk: (cb)=> {
                	clearMessage()
                }
            })

        }
	}
	handleBackMyOrder() {
		this.props.saveActiveKey('12')
	}
	handleNowPay() {
		let {clearMessage, setMessage} = this.props,
            getterByField = this.props.payload.getIn(['utils', 'getterByField']),
			id = getterByField('order.id')
        this.props.onRedirect('apps/login/order?step=2&id='+id,true)
	}
	handleRePurchase(){
		let {clearMessage, setMessage} = this.props,
            getterByField = this.props.payload.getIn(['utils', 'getterByField'])
        this.props.onRedirect('apps/login/order',true)
	}

	render(){
		let message = this.props.payload.getIn(['global', 'message']),
			utils = this.props.payload.get('utils') ,
			getterByField = utils.get('getterByField'),
			{prefixCls} = this.props,
			order = getterByField('order').toJS(),
			OrderID = order.OrderID,
			creatorName = order.creatorName,
			createTime = order.createTime,
			orgName = order.orgName,
			productName = order.productName,
			productPrice = order.productPrice,
			amount = order.amount,
			amountPaid,
			payStatus = order.payStatus,
			title,colorStyle,color,icon,payNow,
			orderType = order.orderType,
			type = orderType == 1 ? '新购' : '续购',
			payType = order.payType,
			payment,invoiceContent,
			invoiceType = order.invoice?order.invoice.invoiceType:undefined,
			invoice = order.invoice,
			orderStr = invoice ? 'orderShow' : 'orderNone',
			taxInvoice,
			content = order.invoice?order.invoice.contentType:undefined,
			invoiceTitle = order.title,
			address = order.address,
			orderInfoHeight = (document.body.clientHeight-$('.admin-header').height()-$('.ant-tabs-bar').height()-$('.admin-order-header-content').height()-20)+'px'

			if(order.orderStatus == 1){
				title = '待支付'
				colorStyle = 'NotPaid'
				color = 'NotPaid'
				icon = 'modal-warn'
				payNow = 'blockPayNow'
				amountPaid = '--'
			}else if(order.orderStatus == 4){
				title = '交易完成'
				colorStyle = 'mint'
				color = 'mint'
				icon = 'modal-success'
				payNow = 'hidden'
				amountPaid = '￥'+ amount
			}else if(order.orderStatus == 5){
				title = '取消订单'
				colorStyle = 'cancel'
				color = 'cancel'
				icon = 'modal-error'
				// payNow = 'cancelOrder'
				payNow = 'hidden'
				amountPaid = '--'
			}

			if(payType == 1){
				payment = '线下支付'
			}else if(payType == 2){
				payment = '微信'
			}else if(payType == 3){
				payment = '支付宝'
			}else if(payType === undefined){
				payment = '--'
			}

			if(content == 1){
				invoiceContent = '软件使用费'
			}

			if(invoiceType == 1){
				taxInvoice = '增值税普通发票'
			}else if(invoiceType == 2){
				taxInvoice = '增值税专用发票'
			}


		return(
			<div  className={`${prefixCls}-order`}>
				<div className={`${prefixCls}-order-header`}>
					<div className={`${prefixCls}-order-header-content`}>
						<span>订单详情</span>
						<div>
							<button className={payNow} onClick={::this.handleNowPay}>立即支付</button>
							<button className='hidden' onClick={::this.handleRePurchase}>重新购买</button>
							<button className='backMyOrder' onClick={::this.handleBackMyOrder}>返回我的订单</button>
						</div>

					</div>
				</div>
				<div className={`${prefixCls}-order-body`} style={{overflowY:'scroll',height:orderInfoHeight}}>
					<div style={{height: '422px'}}>
						<div className={`${prefixCls}-order-body-header`}>
							<div>订单号：{order.code}</div>
							<div className={color}><ZIcon
								icon={icon}
								colorStyle = {colorStyle}
								title=''
								/>订单状态：{title}</div>
						</div>
						<div className={`${prefixCls}-${orderStr}-info`}>
							<div className={`${prefixCls}-order-info-order`}>
								<div className={`${prefixCls}-order-info-order-first`}>
									<p className={`${prefixCls}-order-info-order-first-title`}>订单信息</p>
									<p className={`${prefixCls}-order-info-order-first-type`}><span>订单类型：</span><span>{order.orderType == 1 ? '新购' : '续购'}订单</span></p>
									<p className={`${prefixCls}-order-info-order-first-person`}><span>下单人    ：</span><span>{order.creatorName}</span></p>
									<p className={`${prefixCls}-order-info-order-first-time`}><span>下单时间：</span><span>{order.createTime}</span></p>
									<p className={`${prefixCls}-order-info-order-first-org`}><span>企业名称：</span><span>{order.orgName}</span></p>
								</div>
								<div className={`${prefixCls}-order-info-order-second`}>
									<p className={`${prefixCls}-order-info-order-second-product`}><span>产品名称：</span><span>{order.productName}</span></p>
									<p className={`${prefixCls}-order-info-order-second-time`}><span>起止时间：</span><span>{order.beginDate}~{order.endDate}</span></p>
								</div>
								<div className={`${prefixCls}-order-info-order-third`}>
									<p className={`${prefixCls}-order-info-order-third-type`}><span>支付方式：</span><span>{payment}</span></p>
									<p className={`${prefixCls}-order-info-order-third-sum`}><span>订单总额：</span><span>￥{order.productPrice===undefined?'0.00':order.productPrice.toFixed(2)}</span></p>
									<p className={`${prefixCls}-order-info-order-third-sum`}><span>优惠金额：</span><span>-￥{order.saleAmount===undefined?'0.00':order.saleAmount.toFixed(2)}</span></p>
									<p className={`${prefixCls}-order-info-order-third-amount`}><span>应付金额：</span><span>￥{order.amount===undefined?'0.00':order.amount.toFixed(2)}</span></p>

								</div>
							</div>
							{order.invoice?<div className={`${prefixCls}-order-info-invoice`}>
								<p className={`${prefixCls}-order-info-invoice-title`}>发票信息</p>
								<p className={`${prefixCls}-order-info-invoice-type`}><span className={'invoice-item-name'}>发票类型：</span><span className={'invoice-item-info'}>{taxInvoice}</span></p>
								<p className={`${prefixCls}-order-info-invoice-content`}><span className={'invoice-item-name'}>发票内容：</span><span className={'invoice-item-info'}>{invoiceContent}</span></p>
								<p className={`${prefixCls}-order-info-invoice-header`}><span className={'invoice-item-name'}>发票抬头：</span><span className={'invoice-item-info'}>{order.invoice?(order.invoice.titleType == 1 ? '个人': order.invoice.titleOrgName):''}</span></p>
								{(!order.invoice||order.invoice.titleType == 1)?'':<p className={`${prefixCls}-order-info-invoice-header`}><span className={'invoice-item-name'}>纳税人识别号/税号：</span><span className={'invoice-item-info'}>{order.invoice?(order.invoice.titleType == 2 ? order.invoice.titleOrgCode: ''):''}</span></p>}
								<p className={`${prefixCls}-order-info-invoice-add`}><span className={'invoice-item-name'}>邮寄地址：</span><span className={'invoice-item-info'}>{order.addrStr}</span></p>
							</div>:''}
						</div>
					</div>
				</div>
				{Modal(message)}
			</div>
		)

	}
}
