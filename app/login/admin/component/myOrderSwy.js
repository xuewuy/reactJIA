import React, { Component, PropTypes } from 'react'
import { Radio, Button, Input, Card, Table, Cell, Column, DatePicker,Consult} from 'xComponent'
import DynamicComponent, { Modal } from 'dynamicComponent'
import defaultComponentFactory from 'defaultComponentFactory'
// import OrderItem from './orderItem'
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


export default class MyOrderComponent extends Component {
	constructor(props) {
		super(props)
		// defaultComponentFactory.registerComponent('OrderItem',OrderItem)
	}

	handleChange(e) {
		this.props.nextLoginChange(e.target.value)
	}

	handleOk(e) {
		this.props.saveNextLoginMode()
	}
	handleSearchChange(e) {
		let value = e.target.value
		// this.props.updateSearchValue(value)
		this.props.updateMyOrderItem(value, 'search')
	}
	handleOrderTypeChange(e) {
		let value = e.target.value
		// this.props.updateOrderType(value)
		this.props.updateMyOrderItem(value, 'ordertype')
	}
	handleTypeChange(e) {
		let value = e.target.value
		// this.props.updateType(value)
		this.props.updateMyOrderItemSwy(value, 'type')
	}
    
    handleSwyPay() {
        let url = window.location.protocol + '//' + window.location.host + '/#apps/login/orderSwy'
        this.props.swyPay(url)
    }

	handlePromptChange(e) {
		let value = e.target.value

		// this.props.updatePrompt(value)
		this.props.updateMyOrderItemSwy(value, 'prompt')
	}

	handleOrderNum(props) {
		let rowIndex = props.rowIndex
		return () => {
			this.props.openNum(rowIndex)

		}
	}
	handleInfo(props) {
		let rowIndex = props.rowIndex
		return () => {
			this.props.openInfoSwy(rowIndex)

		}
	}
	handleDel(props) {
		let rowIndex = props.rowIndex,
			{ clearMessage, setMessage } = this.props,
			getterByField = this.props.payload.getIn(['utils', 'getterByField'])
		return () => {
			// this.props.delItem(rowIndex)
			setMessage({
				type: 'confirm',
				title: '删除订单',
				content: '确定删除订单吗？',
				// okText: '查看订单',
				wrapClassName: 'delorder',
				width: 410,
				// initData: {id: 'formMyYj',cb:()=>{
				// 	debugger
				// },...props},
				refName: 'delorder',
				onCancel: () => {
					clearMessage()
				},
				onOk: (cb) => {
					clearMessage()
					this.props.delOrderItemSwy(rowIndex)
				}
			})


		}
	}
	handleCancel(props) {
		let rowIndex = props.rowIndex
		return () => {
			this.props.cancelItemSwy(rowIndex)
		}
	}

	handleGoTo() {
		this.props.onRedirect('apps/login/admin?activeKey=1202', true)
	}

	startPay(props) {
		return () => {
			let rowIndex = props.rowIndex,
				{ clearMessage, setMessage } = this.props,
				getterByField = this.props.payload.getIn(['utils', 'getterByField']),
				id = getterByField('myorderSwy.orderListSwy').toJS()[rowIndex].id

			let tipsTxt = '请您在新打开的页面上完成付款',
				details = '付款完成前请不要关闭此窗口',
				tipsDetails = '付款完成后请点击【确定】刷新页面'

			setMessage({
				type: 'warning',
				content: <div><div style={{ paddingLeft: '0', textIndent: '0px', lineHeight: '18px', color: '#454545' }}><span style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: '-6px' }}>{tipsTxt}</span></div><br /><span style={{ color: '#666666', fontSize: '12px', paddingLeft: '0px', lineHeight: '20px', letterSpacing: 0, marginLeft: '-6px' }}>{details}</span><br /><span style={{ color: '#666666', lineHeight: '20px', letterSpacing: 0, fontSize: '12px', paddingLeft: '0px', marginLeft: '-6px' }}>{tipsDetails}</span></div>,
				width: 410,
				hideFooter: true,
				refName: 'alreadyWarnOver',
				wrapClassName: 'alreadyWarnOver',
				highZIndex: true,
				okText: '确定',
				footer: [
					<Button key="submit" type="primary">确定</Button>
				],
				onOk: () => {
					clearMessage()
					window.location.reload()
					//this.props.onRedirect('apps/login/admin?activeKey=12', true)
				}
			})
			let url = window.location.protocol + '//' + window.location.host + '/#apps/login/order?step=2&id=' + id
			this.props.payItem(rowIndex)
			window.open(url)
		}
	}
	handlePay(props) {
		return () => {
			let rowIndex = props.rowIndex,
				{ clearMessage, setMessage } = this.props,
				getterByField = this.props.payload.getIn(['utils', 'getterByField']),
				id = getterByField('myorderSwy.orderListSwy').toJS()[rowIndex].id

			this.props.queryOnlineOrderDetailSwy(rowIndex, id, this.startPay(props),this.props.onRedirect,props)
		}

	}
	handleAgain(props) {
		return () => {
			let rowIndex = props.rowIndex,
				{ clearMessage, setMessage } = this.props,
				getterByField = this.props.payload.getIn(['utils', 'getterByField']),
				orgId = getterByField('myorder.orderList').toJS()[rowIndex].orgId

			this.props.onRedirect('apps/login/order?orgId=' + orgId, true)
			this.props.againItem(rowIndex)
		}
	}

	getBodyComponentInstances() {
		let getterByField = this.props.payload.getIn(['utils', 'getterByField'])
		// bCheck = getterByField('isCheckedAll')
		return {
			orderManagementHeader: <div className="orderManagementHeader">
				{/*<div className="checked">
                    {bCheck ?
                        <Checkbox
                        checked={true}
                        onChange={::this.onSelectAllChange}/>
                    :
                       <Checkbox
                       checked={false}
                        onChange={::this.onSelectAllChange}/>
                    }

                </div>*/}
				<div className="summary">
					<span>摘要</span>
				</div>
				<div className="accountingSubject">
					<span>科目</span>
				</div>
				<div className="debitAmount">
					<span>借方金额</span>
				</div>
				<div className="creditAmount">
					<span>贷方金额</span>
				</div>
			</div>
		}
	}

	getColumns(prefixCls, orderListSwy) {
		// 版本类型  1专业版
		//           2普及版
		// 注册类型  1代账公司
		//           2企业用户

		//           3个人代账
		let utils = this.props.payload.get('utils'),
			getterByField = utils.get('getterByField')
		// var userId = getterByField('userId')
		return [
			<Column
				key='name'
				header={(<Cell>服务名称</Cell>)}
				width={120}
				cell={props => (
					<Cell>
						<div className="order-item-myorg order-list-item">
                            <div className="order-item-org-name bg-second">
                                <p>{orderListSwy.getIn([props.rowIndex, 'productName'])}</p>
                            </div>
    					</div>
    				</Cell>
				)}
    		/>,
            <Column
				key='name'
				header={(<Cell>订单号</Cell>)}
				width={190}
				cell={props => (
					<Cell>
						<div className="order-item-org-name bg-second">
							<p>{orderListSwy.getIn([props.rowIndex, 'code'])}</p>
						</div>
    				</Cell>
				)}
    		/>,
            <Column
				key='name'
				header={(<Cell>下单时间</Cell>)}
				width={100}
				cell={props => (
					<Cell>
						<div className="order-item-org-name bg-second">
							<p>{orderListSwy.getIn([props.rowIndex, 'createTime'])}</p>
                        </div>
    				</Cell>
				)}
    		/>,
            <Column
					key='pay'
					header={(<Cell>支付方式</Cell>)}
					width={100}
					cell={props => (
						<Cell>
							<div className="order-item-pay order-list-item">
								<div className="order-item-pay-type bg-second">
									<p>{orderListSwy.getIn([props.rowIndex, 'payType']) === undefined ? ' ' : (orderListSwy.getIn([props.rowIndex, 'payType']) == 2 ? '微信支付' : (orderListSwy.getIn([props.rowIndex, 'payType']) == 3 ? '支付宝' : '线下支付'))}</p>
								</div>
							</div>
						</Cell>)
					}
				/>,
            <Column
					key='jy'
					header={(<Cell>交易状态</Cell>)}
					width={145}
					cell={props => (
						<Cell>
							<div className="order-item-buy order-list-item">
								<div className="order-item-buy-prompt bg-second">
									{orderListSwy.getIn([props.rowIndex, 'orderStatus']) == 2 ? <p className='color-green'>交易完成</p> : (orderListSwy.getIn([props.rowIndex, 'orderStatus']) == 1 ? <p className='color-orange'>待支付</p> : (orderListSwy.getIn([props.rowIndex, 'orderStatus']) == 3 ? <p className='color-gray'>交易取消</p> : ''))}
								</div>
							</div>
						</Cell>)
					}
				/>,
           	<Column
					key='gz'
					header={(<Cell>发票跟踪</Cell>)}
					// width={100}//先隐藏这一列
					width={145}
					cell={props => (
						<Cell>
							<div className="order-item-mygz order-list-item">
								<div className="order-item-gz-prompt bg-second">
									{orderListSwy.getIn([props.rowIndex, 'invoiceStatus']) == 1 ? <p>不开发票</p> :
										(orderListSwy.getIn([props.rowIndex, 'invoiceStatus']) == 2 ? <p>待开</p> :
											(orderListSwy.getIn([props.rowIndex, 'invoiceStatus']) == 3 ? <p>已开</p> :
												(orderListSwy.getIn([props.rowIndex, 'invoiceStatus']) == 4 ? <p>已邮寄</p> : '')))}
								</div>
							</div>
						</Cell>)
					}
				/>,
    		<Column
					key='cz'
					flexGrow={1}
					header={(<Cell>操作</Cell>)}
					width={180}
					cell={props => (
						<Cell>

							<div className="order-item-mycz order-list-item">
								{orderListSwy.getIn([props.rowIndex, 'orderStatus']) == 1 ?
									<div className="order-item-cz-btn bg-second">
										<div className="btn-box">
											<Button
												type="dashed"
												onClick={::this.handlePay(props)}
				    						>
				    						立即支付 
				    					</Button>
		    					
										<Button
											type="dashed"
											onClick={::this.handleCancel(props)}
				    						>
				    						取消订单
				    					</Button>
		    						</div>
		    					</div>
							:(orderListSwy.getIn([props.rowIndex, 'orderStatus'])==2?<div className="order-item-cz-btn bg-second">
								<div className="btn-box">
									<Button
										type="dashed"
										onClick={::this.handleInfo(props)}
				    						>
				    						订单详情
				    					</Button>
								<Button
									type="dashed" 
									style={{display: 'none'}}
									onClick={::this.handleAgain(props)}
				    						>
				    						续购订单
				    					</Button>
		    						</div>
		    					</div>:(orderListSwy.getIn([props.rowIndex, 'orderStatus'])==3?<div className="order-item-cz-btn bg-second">
					<div className="btn-box">
						<Button
							type="dashed"
							onClick={::this.handleInfo(props)}
				    						>
				    						查看详情
				    					</Button>
					<Button
						type="dashed"
						onClick={::this.handleDel(props)}
				    						>
				    						删除订单
				    					</Button>
		    						</div>
		    					</div >:<div className="order-item-cz-btn bg-second"></div>))
	    						}
    					</div>
    				</Cell>
    			)}
/>

    	]
    }

handleEmptyPay() {
    let getterByField = this.props.payload.getIn(['utils', 'getterByField']),
        appInfo = getterByField('appInfo')
    if(this.props.onLogoClick){
        this.props.onLogoClick(this.props.onRedirect)
    }else{
        let homeUrl = appInfo && appInfo.get('homeUrl') || ""
        if(homeUrl){
            homeUrl = homeUrl.replace('default', 'shwuy')
        }
        if(document.location.hostname=='yj.rrtimes.com'){
            homeUrl="https://www.rrtimes.com/shwuy.html"
        }
        location = homeUrl
    }
}


render(){

	let utils = this.props.payload.get('utils'),
		getterByField = utils.get('getterByField'),
		nextLogin = getterByField('nextLogin') === "2" ? "2" : "1",
		{ prefixCls, otherProps } = this.props,
		instances = this.getBodyComponentInstances(),
		typeValue = getterByField('myorder.typeValue'),
		promptValue = getterByField('myorder.promptValue'),
		orderListSwy = getterByField('myorderSwy.orderListSwy'),
		clientHeight = document.body.clientHeight,
		tableHeight = clientHeight - 297 - $('.select-width-small').height()

	return (
		<div className={`${prefixCls}-my-order`}>
			<Consult />
			{(!orderListSwy || (orderListSwy && orderListSwy.size == 0 && typeValue == 'all' && promptValue == 'all')) ? <Card>
				<div className='my-order-empty'>
					<img src={require("../../../../static/img/nodatabg1.png")} style={{ width: '170px', height: '150px' }} alt="" />
					<p>亲，您还没有订单记录，快快<a href="javascript:;" onClick={::this.handleEmptyPay}>订购体验</a>吧~</p>
					</div>
				</Card>:<Card>
				<div className={`${prefixCls}-my-order-header admin-my-order-myheader`}>
					<div className={`${prefixCls}-my-order-header-box select-width-small`}>
						<span className='myorder-title'>我的订单</span>
					</div>
				</div>
				<div className={`${prefixCls}-my-order-select select-width-small`}>
				    <div style={{display: 'none'}} className={`${prefixCls}-my-order-search`}>
				        <span>我的订单：</span><Input></Input><Button type='primary'>搜索</Button>{/*<Button onClick={::this.handleSwyPay}>购买</Button>*/}
				    </div>
					<div className={`${prefixCls}-my-order-select-type`}>
						<span>支付方式：</span>
						<RadioGroup size="large" onChange={::this.handleTypeChange} value={typeValue}>
	                        <RadioButton value="all">全部</RadioButton>
							<RadioButton value="wx">微信支付</RadioButton>
							<RadioButton value="zfb">支付宝</RadioButton>
	                    </RadioGroup>
				</div>
				<div className={`${prefixCls}-my-order-select-type`}>
					<span>订单状态：</span>
					<RadioGroup size="large" onChange={::this.handlePromptChange} value={promptValue}>
	                            <RadioButton value="all">全部</RadioButton>
					<RadioButton value="already">已完成</RadioButton>
					<RadioButton value="will">待支付</RadioButton>
					<RadioButton value="cancel">已取消</RadioButton>
	                        </RadioGroup>
						</div>
		</div>
		<div className={`${prefixCls}-my-orderSwy-main`} style={{ width: '980px' }}>
			<Table
				rowsCount={orderListSwy.size}
				rowHeight={80}
				headerHeight={30}
				height={tableHeight}
				width={980}>
				{this.getColumns(prefixCls, orderListSwy)}
			</Table>
		</div>
				</Card >}
			</div >
    	)
	}

}





