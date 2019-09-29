import React, { Component, PropTypes } from 'react'
import { Radio, Button, Input, Card, Table, Cell, Column, DatePicker, Consult } from 'xComponent'
import DynamicComponent, { Modal } from 'dynamicComponent'
import defaultComponentFactory from 'defaultComponentFactory'
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


export default class MyOrderComponent extends Component {
	constructor(props) {
		super(props)
    }

	handleChange(e) {
		this.props.nextLoginChange(e.target.value)
	}

	handleOk(e) {
		this.props.saveNextLoginMode()
	}
	handleSearchChange(e) {
		let value = e.target.value
		this.props.updateMyOrderItem(value, 'search')
	}
	handleOrderTypeChange(e) {
		let value = e.target.value
		this.props.updateMyOrderItem(value, 'ordertype')
	}
	handleTypeChange(e) {
		let value = e.target.value
		this.props.updateMyOrderItem(value, 'type')
	}

	handlePromptChange(e) {
		let value = e.target.value
		this.props.updateMyOrderItem(value, 'prompt')
	}

	handleOrderNum(props) {
		let rowIndex = props.rowIndex
		return () => this.props.openNum(rowIndex)
    }
    
	handleInfo(props) {
		let rowIndex = props.rowIndex
		return () => this.props.openInfo(rowIndex)
    }
    
	handleDel(props) {
		let rowIndex = props.rowIndex,
			{ clearMessage, setMessage } = this.props,
			getterByField = this.props.payload.getIn(['utils', 'getterByField'])
		return () => {
			setMessage({
				type: 'confirm',
				title: '删除订单',
				content: '确定删除订单吗？',
				wrapClassName: 'delorder',
				width: 410,
				refName: 'delorder',
				onCancel: () => {
					clearMessage()
				},
				onOk: (cb) => {
					clearMessage()
					this.props.delOrderItem(rowIndex)
				}
			})
		}
    }
    
	handleCancel(props) {
		let rowIndex = props.rowIndex
		return () => this.props.cancelItem(rowIndex)
	}

	handleGoTo() {
		this.props.onRedirect('apps/login/admin?activeKey=12', true)
	}

	startPay(props) {
		return () => {
			let rowIndex = props.rowIndex,
				{ clearMessage, setMessage } = this.props,
				getterByField = this.props.payload.getIn(['utils', 'getterByField']),
				id = getterByField('myorder.orderList').toJS()[rowIndex].id,
			    tipsTxt = '请您在新打开的页面上完成付款',
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
				id = getterByField('myorder.orderList').toJS()[rowIndex].id
			this.props.queryOnlineOrderDetail(rowIndex, id, this.startPay(props),this.props.onRedirect,props)
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
		return {
			orderManagementHeader: <div className="orderManagementHeader">
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

	handleAddClientClick(id){
		return () => this.props.contarctSiging(id)
	}

	conDownload(conId){
		return () => this.props.conDownload(conId)
	}
    
    /**
     * 
     * @param {]} prefixCls 
     * @param {*} orderList 
     * // 版本类型  1专业版
		//           2普及版
		// 注册类型  1代账公司
		//           2企业用户
		//           3个人代账
     */
	getColumns(prefixCls, orderList) {
		let utils = this.props.payload.get('utils'),
            getterByField = utils.get('getterByField')
            
		return [
			<Column
				key='name'
				header={(<Cell>企业名称</Cell>)}
				width={295}
				cell={props => (
					<Cell>
						<div className="order-item-myorg order-list-item">
							<div className="order-item-org-num bg-first">
                                <p>
                                    订单号：
                                    <a href="javascript:;" onClick={::this.handleOrderNum(props)}>
                                        {orderList.getIn([props.rowIndex, 'code'])}
                                    </a> 
                                </p>
                            </div>
                            <div className="order-item-org-name bg-second">
                                <p>{orderList.getIn([props.rowIndex, 'orgName'])}</p>
                            </div>
    					</div>
    				</Cell>
				)}
    		/>,
            <Column
                key='pay'
                header={(<Cell>支付方式</Cell>)}
                width={210}
                cell={props => (
                    <Cell>
                        <div className="order-item-pay order-list-item">
                            <div className="order-item-pay-no bg-first">
                                <p>
                                    <span style={{ transform: 'translateX(20px)' }}>
                                        下单时间：{orderList.getIn([props.rowIndex, 'createTime'])} 
                                    </span>
                                </p>
                            </div>
                            <div className="order-item-pay-type bg-second">
                                <p>
                                    {orderList.getIn([props.rowIndex, 'payType']) === undefined ? ' ' : (orderList.getIn([props.rowIndex, 'payType']) == 2 ? '微信支付' : (orderList.getIn([props.rowIndex, 'payType']) == 3 ? '支付宝' : '线下支付'))}
                                </p>
                            </div>
                        </div>
                    </Cell>
                )}
            />,
            <Column
                key='jy'
                header={(<Cell>交易状态</Cell>)}
                width={145}
                cell={props => (
                    <Cell>
                        <div className="order-item-buy order-list-item">
                            <div className="order-item-buy-no bg-first"></div>
                            <div className="order-item-buy-prompt bg-second">
                                {orderList.getIn([props.rowIndex, 'orderStatus']) == 4 ? <p className='color-green'>交易完成</p> : (orderList.getIn([props.rowIndex, 'orderStatus']) == 1 ? <p className='color-orange'>待支付</p> : (orderList.getIn([props.rowIndex, 'orderStatus']) == 5 ? <p className='color-gray'>交易取消</p> : ''))}
                            </div>
                        </div>
                    </Cell>
                )}
            />,
           	<Column
                key='gz'
                header={(<Cell>发票跟踪</Cell>)}
                width={145}
                cell={props => (
                    <Cell>
                        <div className="order-item-mygz order-list-item">
                            <div className="order-item-gz-no bg-first"></div>
                            <div className="order-item-gz-prompt bg-second">
                                {orderList.getIn([props.rowIndex, 'invoiceStatus']) == 1 ? <p>不开发票</p> :
                                    (orderList.getIn([props.rowIndex, 'invoiceStatus']) == 2 ? <p>待开</p> :
                                        (orderList.getIn([props.rowIndex, 'invoiceStatus']) == 3 ? <p>已开</p> :
                                            (orderList.getIn([props.rowIndex, 'invoiceStatus']) == 4 ? <p>已邮寄</p> : '')))}
                            </div>
                        </div>
                    </Cell>
                )}
            />,
			<Column
                key='hz'
                header={(<Cell>合同跟踪</Cell>)}
                width={145}
                cell={props => (
                    <Cell>
                        <div className="order-item-mygz order-list-item">
                            <div className="order-item-gz-no bg-first"></div>
                            <div className="order-item-gz-prompt bg-second">
                                { 
                                    orderList.getIn([props.rowIndex, 'orderStatus']) == 4 
                                    ?
                                    ( !!orderList.getIn([props.rowIndex, 'contractStatus']) 
                                        ?
                                        <a target='_blank'   onClick={::this.conDownload(orderList.getIn([props.rowIndex, 'contractNo']))} >合同下载</a>
                                        :
                                        <button className="order-item-gz-prompt bg-span" 	onClick={::this.handleAddClientClick(orderList.getIn([props.rowIndex, 'id']))}>立即签署</button>
                                    )
                                    :
                                    null
                                }
                            </div>
                        </div>
                    </Cell>
                )}
            />,
    		<Column
                key='cz'
                flexGrow={1}
                header={(<Cell>操作</Cell>)}
                width={180}
                cell={props => (
                    <Cell>
                        <div className="order-item-mycz order-list-item">
                            <div className="order-item-cz-no bg-first"></div>
                            {orderList.getIn([props.rowIndex, 'orderStatus']) == 1 ?
                                <div className="order-item-cz-btn bg-second">
                                    <div className="btn-box">
                                        <Button type="dashed" onClick={::this.handlePay(props)}>立即支付</Button>
                                        <Button type="dashed" onClick={::this.handleCancel(props)}>取消订单</Button>
                                    </div>
                                </div>
                            :
                            (orderList.getIn([props.rowIndex, 'orderStatus'])==4?
                                <div className="order-item-cz-btn bg-second">
                                    <div className="btn-box">
                                        <Button type="dashed" onClick={::this.handleInfo(props)}>订单详情</Button>
                                        <Button type="dashed" onClick={::this.handleAgain(props)}>续购订单</Button>
                                    </div>
                                </div>
                            :(orderList.getIn([props.rowIndex, 'orderStatus'])==5?
                                <div className="order-item-cz-btn bg-second">
                                    <div className="btn-box">
                                        <Button type="dashed" onClick={::this.handleInfo(props)}>查看详情</Button>
                                        <Button type="dashed" onClick={::this.handleDel(props)}>删除订单</Button>
                                    </div>
                                </div>
                            :<div className="order-item-cz-btn bg-second"></div>
                            ))}
    					</div>
    				</Cell>
    			)}
            />
    	]
    }

    handleEmptyPay() {
        this.props.saveActiveKey(1)
    }

    render(){
        let utils = this.props.payload.get('utils'),
            getterByField = utils.get('getterByField'),
            { prefixCls, otherProps } = this.props,
            typeValue = getterByField('itsOrder.typeValue'),
            promptValue = getterByField('itsOrder.promptValue'),
            orderList = getterByField('itsOrder.orderList'),
            clientHeight = document.body.clientHeight,
            tableHeight = clientHeight - 297 - $('.select-width-small').height()
            debugger
        if(!orderList || (orderList && orderList.size == 0 && typeValue == 'all' && promptValue == 'all')){
            return (
                <div className={`${prefixCls}-my-order`}>
                    <Consult />
                    <Card>
                        <div className='my-order-empty'>
                            <img src={require("../../../../static/img/nodatabg1.png")} style={{ width: '170px', height: '150px' }} alt="" />
                            <p>亲，您还没有订单记录，快快<a href="javascript:;" onClick={::this.handleEmptyPay}>订购体验</a>吧~</p>
                        </div>
                    </Card>
                </div>
            )
        }
        return (
            <div className={`${prefixCls}-my-order`}>
                <Consult />
                <Card>
                    <div className={`${prefixCls}-my-order-header admin-my-order-myheader`}>
                        <div className={`${prefixCls}-my-order-header-box select-width-small`}>
                            <span className='myorder-title'>我的订单</span>
                        </div>
                    </div>
                    <div className={`${prefixCls}-my-order-select select-width-small`}>
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
                    <div className={`${prefixCls}-my-order-main my-order-fr my-order-head-left`} >
                        <Table
                            rowsCount={orderList.size}
                            rowHeight={110}
                            headerHeight={30}
                            height={tableHeight}
                            width={1125}>
                            {this.getColumns(prefixCls, orderList)}
                        </Table>
                    </div>
                </Card>
            </div>
        )
    }
}