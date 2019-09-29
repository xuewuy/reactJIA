import React, { Component,PropTypes } from 'react'
import {Radio, Button, Input, Card, Table, Cell, Column,DatePicker,ZIcon, Pagination } from 'xComponent'
import {Select} from 'antd'
import moment from 'moment'
import DynamicComponent, { Modal } from 'dynamicComponent'
import defaultComponentFactory from 'defaultComponentFactory'
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;



export default class OrderManageComponent extends Component {
	constructor(props){
        super(props)
    }

 	handleChange(e){
 		this.props.nextLoginChange(e.target.value)
 	}

 	handleOk(e){
 		this.props.saveNextLoginMode()
 	}
 	handleBeginDateChange(e){
 		let year = e._d.getFullYear(),
 			month = e._d.getMonth()+1<10?"0"+(e._d.getMonth()+1):e._d.getMonth()+1,
            day = e._d.getDate()<10?"0"+e._d.getDate():e._d.getDate(),
            date = year+"-"+month+"-"+day
 		this.props.updateBeginDateValue(date)
 	}
 	handleEndDateChange(e){
 		let year = e._d.getFullYear(),
 			month = e._d.getMonth()+1<10?"0"+(e._d.getMonth()+1):e._d.getMonth()+1,
            day = e._d.getDate()<10?"0"+e._d.getDate():e._d.getDate(),
            date = year+"-"+month+"-"+day
 		this.props.updateEndDateValue(date)
 	}
 	handleNameChange(e) {
 		let value = e.target.value
 		this.props.updateNameValue(value)
 	}
 	handlePhoneChange(e) {
		 let value = e.target.value
		 value = value.replace(/\D+/g,'').substr(0,11)
 		this.props.updatePhoneValue(value)
 	}
 	handleSearchOrgClick(){
 		this.props.updateOrderManageItem()
 	}
 	handlePayTypeManageChange(e) {
		 // let value = e.target.value
 		let value = e

 		this.props.updateOrderManageItem(value,'paytype')
 	}
 	handleTypeManageChange(e) {
 		// let value = e.target.value
 		let value = e
 		this.props.updateOrderManageItem(value,'type')
 	}

 	handlePromptManageChange(e) {
 		let value = e.target.value

 		this.props.updateOrderManageItem(value,'prompt')
 	}
 	handleTheirFriendChange(e){
 		// let value = e.target.value
 		let value = e
 		this.props.updateOrderManageItem(value,'friend')
	 }
	handleOrderTypeManageChange(e) {
		let value = e.target.value
		this.props.updateOrderManageItem(value,'ordertype')
	}
	handleOrderSourceChange(e) {
		// let value = e.target.value
 		let value = e
		 this.props.updateOrderManageItem(value,'ordersource')
	}

 	handleOrderNum(props) {
 		let rowIndex = props.rowIndex
 		return () => {
 			this.props.openManageNum(rowIndex)
 		}
 	}
 	handleInfo(props) {
 		let rowIndex = props.rowIndex
 		return () => {
 			this.props.openInfo(rowIndex)
 		}
 	}
 	handleDel(props) {
 		let rowIndex = props.rowIndex
 		return () => {
 			this.props.delItem(rowIndex)
 		}
 	}

 	handleSee(props) {
 		let rowIndex = props.rowIndex,
 			{clearMessage, setMessage} = this.props,
            getterByField = this.props.payload.getIn(['utils', 'getterByField']),
            id = getterByField('orderManageList.'+rowIndex+'.id'),
            orderSource = getterByField('orderManageList.'+rowIndex+'.orderSource'),
            payStatus = getterByField('orderManageList.'+rowIndex+'.orderSource'),
            isOperators = getterByField('isOperators'),
            mobile = getterByField('orderManageList.'+rowIndex+'.mobile'),
            appInfo = getterByField('appInfo')?getterByField('appInfo').toJS():undefined,
            title = '查看订单',
            isYj
        if(isOperators && (!appInfo||appInfo.id==100)){//如果是易嘉人的运营人员进来
            isYj = true
        }else if(isOperators && appInfo){
            isYj = false
        }
 		return () => {
 			setMessage({
	 			type: 'app',
	            title: title,
	            content: 'app:apps/login/admin/manageItem',
	            wrapClassName:'manageItemWrap',
				width: 780,
				height: 620,
	            initData: {'id':id,'orderSource':orderSource,'isCreate':false,isSee:true,'mobile': mobile,'isYj':isYj,'isOperators':isOperators,'appInfo':appInfo},
	            refName: 'manageItem',
	            onCancel: ()=> {
	                clearMessage()
	            },
	            onOk: (cb)=> {
	            	clearMessage()
					// this.props.updateOrderManage()
					this.props.updateOrderManageItem()


	            }
	 		})
 		}
 	}

 	handleCancel(props) {
 		let rowIndex = props.rowIndex
 		return () => {
 			this.props.cancelItem(rowIndex)
 		}
 	}

 	handlePay(props) {
 		let rowIndex = props.rowIndex
 		return () => {
 			this.props.payItem(rowIndex)
 		}
 	}

 	handleManageClick(props) {
 		let rowIndex = props.rowIndex
 		return () => {
 		}
 	}

 	handleCreateOrderClick(props){
		let {clearMessage, setMessage} = this.props,
            getterByField = this.props.payload.getIn(['utils', 'getterByField']),
			isOperators = getterByField('isOperators'),
    		appInfo = getterByField('appInfo'),
    		isYj
        // if(isOperators && !appInfo){//如果是易嘉人的运营人员进来
        if(isOperators && (!appInfo||appInfo.get('id')==100)){//如果是易嘉人的运营人员进来
            isYj = true
        }else if(isOperators && appInfo){
            isYj = false
        }
		setMessage({
 			type: 'app',
            title: '创建订单',
            content: 'app:apps/login/admin/manageItem',
            // okText: '查看订单',
            wrapClassName:'manageItemWrap',
            width: 780,
            initData: {isCreate: true,orderSource:2,'isYj':isYj,'isOperators':isOperators,'appInfo':appInfo},
            refName: 'manageItems',
            onCancel: ()=> {
                clearMessage()
            },
            onOk: (cb)=> {
            	clearMessage()
				// this.props.updateOrderManage()

				// this.props.getOrderManageList( this.props.updateOrderManageItem(undefined,'export') )
				this.props.updateOrderManageItem()

            }
 		})
 	}

 	handleManage(props) {
 		let rowIndex = props.rowIndex,
 			{clearMessage, setMessage} = this.props,
            getterByField = this.props.payload.getIn(['utils', 'getterByField']),
            id = getterByField('orderManageList.'+rowIndex+'.id'),
            orderSource = getterByField('orderManageList.'+rowIndex+'.orderSource'),
            ts = getterByField('orderManageList.'+rowIndex+'.ts'),
            mobile = getterByField('orderManageList.'+rowIndex+'.mobile'),
            isOperators = getterByField('isOperators'),
            appInfo = getterByField('appInfo')?getterByField('appInfo').toJS():undefined,
            title = '编辑订单',
            isYj

        // if(isOperators && !appInfo){//如果是易嘉人的运营人员进来
        if(isOperators && (!appInfo||appInfo.id==100)){//如果是易嘉人的运营人员进来
            isYj = true
        }else if(isOperators && appInfo){
            isYj = false
        }
 		return () => {
 			setMessage({
	 			type: 'app',
	            title: title,
	            content: 'app:apps/login/admin/manageItem',
	            wrapClassName:'manageItemWrap',
	            width: 780,
	            initData: {'id':id,'orderSource':orderSource,'isCreate':false,'ts':ts,'isYj':isYj,'isOperators':isOperators,'appInfo':appInfo,'mobile': mobile},
	            refName: 'manageItem',
	            onCancel: ()=> {
	                clearMessage()
	            },
	            onOk: (cb)=> {
	            	clearMessage()
					// this.props.updateOrderManage()
					// this.props.getOrderManageList( this.props.updateOrderManageItem(undefined,'export') )
					this.props.updateOrderManageItem()

	            }
	 		})
 		}
 	}

    getColumns(prefixCls,orderManageList){
        // 版本类型  1专业版
        //           2普及版
        // 注册类型  1代账公司
        //           2企业用户

        //           3个人代账
        let utils = this.props.payload.get('utils') ,
            getterByField = utils.get('getterByField')
    	return [
			<Column
    			key='first'
    			flexGrow={1}
    			header={(<Cell>第一大列</Cell>)}
    			width={570}
    			cell={props=>(
    				<Cell>
						<div className="order-item-first order-list-item">
							<div className="order-item-first-top bg-first">
								<p  className="item-order-num">
									订单号：<a href="javascript:;" onClick={::this.handleSee(props)}  disabled={this.props.auth!=2}>{orderManageList.getIn([props.rowIndex, 'code'])}</a>
								</p>
								<p  className="item-pay-time">
									下单时间：{orderManageList.getIn([props.rowIndex, 'createTime'])}
								</p>
								<p  className="item-order-type">
									订单类型：{orderManageList.getIn([props.rowIndex, 'isPay'])==1?'付费用户':'非付费用户'}
								</p>
								<p title={orderManageList.getIn([props.rowIndex, 'remarks'])}  className="item-order-type item-order-remarks">
									客户留言：{orderManageList.getIn([props.rowIndex, 'remarks'])||" "}
								</p>
							</div>
							<div className="order-item-first-bottom bg-second">
								<div className="btn-manage-box">
									<Button
										type="dashed"
										onClick={::this.handleManage(props)}
										disabled={this.props.auth!=2||(orderManageList.getIn([props.rowIndex, 'orderStatus'])==6)}
										>
										<ZIcon icon="edit" title='编辑'/>
									</Button>
									<Button
										type="dashed"
										onClick={::this.handleSee(props)}
										disabled={this.props.auth!=2}
										>
										<ZIcon icon="see" title='查看'/>
									</Button>
									<Button
										type="dashed"
										onClick={::this.handleDel(props)}
										disabled={(orderManageList.getIn([props.rowIndex, 'orderSource'])==1)||this.props.auth!=2||(orderManageList.getIn([props.rowIndex, 'orderStatus'])==6)}
										>
										<ZIcon icon="remove" title='删除' className={(orderManageList.getIn([props.rowIndex, 'orderSource'])==1)?'disable-gray-icon':''}/>
									</Button>
								</div>
								<p className="item-company-name">{orderManageList.getIn([props.rowIndex, 'orgName'])}</p>
								<p className="item-mobile-number"><span className="order-item-product-info-phone">{orderManageList.getIn([props.rowIndex, 'mobile'])||'尚未绑定手机号'}</span></p>
	    						<p  className="item-order-type">{orderManageList.getIn([props.rowIndex, 'orderSource'])==1?'在线':'线下'}</p>
								<p className="item-order-type">{orderManageList.getIn([props.rowIndex, 'orderType'])==1?'新购':'续购'}</p>

							</div>
						</div>

    				</Cell>
    			)}
    		/>,
            <Column
                key='submitPerson'
                header={(<Cell>提交人</Cell>)}
                width={92}
                cell={props=>(
                    <Cell>
    					<div className="order-item-pay order-list-item">
	    					<div className="order-item-pay-no bg-first">
	    					</div>
	    					<div className="order-item-pay-type bg-second">
	    						<p>{orderManageList.getIn([props.rowIndex, 'creatorName'])}</p>
	    					</div>
    					</div>
                    </Cell>)
                }
            />,
            <Column
                key='appName'
                header={(<Cell>所属伙伴</Cell>)}
                width={92}
                cell={props=>(
                    <Cell>
    					<div className="order-item-pay order-list-item">
	    					<div className="order-item-pay-no bg-first">
	    					</div>
	    					<div className="order-item-pay-type bg-second">
	    						<p>{orderManageList.getIn([props.rowIndex, 'appName'])===undefined?'易嘉人':orderManageList.getIn([props.rowIndex, 'appName'])}</p>
	    					</div>
    					</div>
                    </Cell>)
                }
            />,
    		<Column
                key='pay'
                header={(<Cell>支付方式</Cell>)}
                width={92}
                cell={props=>(
                    <Cell>
    					<div className="order-item-pay order-list-item">
	    					<div className="order-item-pay-no bg-first">
	    					</div>
	    					<div className="order-item-pay-type bg-second">
	    						<p>{orderManageList.getIn([props.rowIndex, 'payType'])===undefined?'— —':(orderManageList.getIn([props.rowIndex, 'payType'])==1?'线下支付':(orderManageList.getIn([props.rowIndex, 'payType'])==2?'微信支付':'支付宝'))}</p>
	    					</div>
    					</div>
                    </Cell>)
                }
            />,
            <Column
                key='money'
                header={(<Cell>支付金额</Cell>)}
                width={92}
                cell={props=>(
                    <Cell>
    					<div className="order-item-pay order-list-item">
	    					<div className="order-item-pay-no bg-first">
	    					</div>
	    					<div className="order-item-pay-type order-item-pay-type-right bg-second">
								{/*<p>{orderManageList.getIn([props.rowIndex, 'payStatus'])==1?orderManageList.getIn([props.rowIndex, 'amount']):'— —'}</p>*/}
								<p>{orderManageList.getIn([props.rowIndex, 'amount'])!==undefined?orderManageList.getIn([props.rowIndex, 'amount']).toFixed(2):'— —'}</p>
	    					</div>
    					</div>
                    </Cell>)
                }
            />,
            <Column
                key='jy'
                header={(<Cell>订单状态</Cell>)}
                width={92}
                cell={props=>(
                    <Cell>
                        <div className="order-item-buy order-list-item">
	    					<div className="order-item-buy-no bg-first">
	    					</div>
	    					<div className="order-item-buy-prompt bg-second">
	    						<p className={orderManageList.getIn([props.rowIndex, 'orderStatusClass'])}>{orderManageList.getIn([props.rowIndex, 'orderStatusStr'])}</p>
	    					</div>
    					</div>
                    </Cell>)
                }
            />,
			<Column
				key='gz'
				header={(<Cell>发票跟踪</Cell>)}
				width={92}
				cell={props=>(
					<Cell>
				<div className="order-item-gz order-list-item">
					<div className="order-item-gz-no bg-first">
					</div>
					<div className="order-item-gz-prompt bg-second">
					<p>{orderManageList.getIn([props.rowIndex, 'invoiceStatus'])===undefined?'— —':(orderManageList.getIn([props.rowIndex, 'invoiceStatus'])==1?'无需发票':(orderManageList.getIn([props.rowIndex, 'invoiceStatus'])==3?'已开具':'未开具'))}</p >
					</div>
					</div>
					</Cell>)
				}
            />,
           	<Column
				key='zz'
				header={(<Cell>合同追踪</Cell>)}
				width={92}
				cell={props=>(
				   	<Cell>
						<div className="order-item-gz order-list-item">
	    					<div className="order-item-gz-no bg-first">
	    					</div>
	    					<div className="order-item-gz-prompt bg-second">
	    						<p>{orderManageList.getIn([props.rowIndex, 'contractStatus'])? '已签署' : '未签署' }</p>
	    					</div>
    					</div>
				   	</Cell>)
				}
           	/>
    	]
    }
    getChildren(){
    	let  getterByField = this.props.payload.getIn(['utils','getterByField']),
    		 partnerList = getterByField('partnerList')?getterByField('partnerList'):[]
			//  {/* <RadioButton value={partnerItemId}>{partnerItemName}</RadioButton> */}
    	return partnerList.map(o=> {
    		let partnerItemId = o.get('id'),
				partnerItemName = o.get('name')

    		return (
    				<Option value={partnerItemId} title={partnerItemName}>{partnerItemName}</Option>
    			)
    	})
    }
    handlePartnerChange(e) {
    	let value = e.target.value

 		this.props.updatePartnerValue(value)
    }

    handleOrderTypeChange(value) {
    	this.props.updateOrderTypeManage(value)
	}
	cityChange(val){
		this.props.cityChange(val)
	}
	handleVatTaxpayerChange(value) {
    	this.props.updateVatTaxpayerManage(value)
	}

    handlePageChange(current) {
        this.props.updateOrderManageItem(current,'current')
    }

    handlePageSizeChange(current, size) {
        this.props.orderManagePageChange(current, size,'pageSize')
    }

    beginDisableDate(current) {
    	let utils = this.props.payload.get('utils') ,
			getterByField = utils.get('getterByField'),
			endDate = getterByField('orderManage.endDate')
		return current && current.valueOf() > moment(endDate).valueOf();
    }

    endDisableDate(current) {
    	let utils = this.props.payload.get('utils') ,
			getterByField = utils.get('getterByField'),
			beginDate = getterByField('orderManage.beginDate')
		return current && current.valueOf() < moment(beginDate).valueOf();
	}

	handleExportClick() {
        this.props.exportExcelOrderManage('export')
	}
	handleSurePageSize() {
		let utils = this.props.payload.get('utils') ,
			getterByField = utils.get('getterByField'),
			orderManageListPage = getterByField('orderManageListPage').toJS(),
			currentPage = $('.admin-my-order-main .ant-pagination-options-quick-jumper input').attr('value'),
            current = parseInt(currentPage),
            totalPage =Math.ceil(orderManageListPage.total / orderManageListPage.pageSize)

        if( current > totalPage) {
            current = totalPage
        } else if (current == 0 || current < 0) {
            current = 1
		} else if(isNaN(current)) {
            current = 1
		}
		this.props.updateOrderManageItem(current,'current')
    }
	componentDidMount(){
		this.props.getCityMap()
	}
	getCityOptions(provinceSource){
		if(!provinceSource) return <Option value='0'>全部</Option>

		let OptionData =  provinceSource.toJS(),
			options = OptionData.map(o=>{
				return <Option value={o.code}>{o.name}</Option>
			})
			options.unshift(<Option value='0'>全部</Option>)


		return options
	}
	render(){
		let utils = this.props.payload.get('utils') ,
			getterByField = utils.get('getterByField'),
			nextLogin = getterByField('nextLogin') === "2" ? "2" : "1" ,
			{prefixCls,otherProps} = this.props,
			searchNameValue = getterByField('orderManage.searchNameValue'),
			searchPhoneValue = getterByField('orderManage.searchPhoneValue'),
			theirFriendValue = getterByField('orderManage.theirFriendValue'),
			typeManageValue = getterByField('orderManage.typeManageValue'),
			promptManageValue = getterByField('orderManage.promptManageValue'),
			searchPartnerValue = getterByField('orderManage.partnerValue'),
			payTypeManageValue = getterByField('orderManage.payTypeValue'),
			orderSourceValue = getterByField('orderManage.orderSourceValue'),
			orderManageList = getterByField('orderManageList'),
			// orderType = getterByField('orderManage.orderType'),
			startDate = getterByField('orderManage.beginDate'),
			endDate = getterByField('orderManage.endDate'),
			orderManageListPage = getterByField('orderManageListPage').toJS(),
			clientHeight = document.body.clientHeight,
			tableHeight = clientHeight-348,
            appInfo = getterByField('appInfo'),
			isOperators = getterByField('isOperators'),
			orderType = getterByField('orderManage.orderType')+'',
			vatTaxpayer = getterByField('orderManage.vatTaxpayer')+'',
            notYj = true,
			province = getterByField('orderManage.province') || '0',
			provinceSource = getterByField('orderManage.provinceSource')
		
        if(isOperators && (!appInfo||appInfo.get('id')==100)) {
            notYj = false
        }
		return(
			<div className={`${prefixCls}-my-order`}>
				<Card>
					<div className={`${prefixCls}-my-order-select`}>
						<div  className={`${prefixCls}-my-order-select-type`}>
							<span>订单状态：</span>
							<RadioGroup size="large" onChange={::this.handlePromptManageChange} value={promptManageValue}>
	                            <RadioButton value="all">全部</RadioButton>
	                            <RadioButton value="will">待支付</RadioButton>
                                <RadioButton value="pending">待处理</RadioButton>
                                <RadioButton value="fail">处理失败</RadioButton>
                                <RadioButton value="already">已完成</RadioButton>
                                <RadioButton value="cancel">已取消</RadioButton>
                                <RadioButton value="del">已删除</RadioButton>
	                        </RadioGroup>
							<Button
                            title='Excel导出'
                            className={`exportBtn`}
                            icon='search'
							disabled={this.props.auth!=2}
                            onClick={::this.handleExportClick} />
	                        <Button className='create-order-button' onClick={::this.handleCreateOrderClick} disabled={this.props.auth!=2}>创建订单</Button>
						</div>
					</div>
					<div className={`${prefixCls}-my-order-header`}>
						<div className={`${prefixCls}-my-order-header-box`} style={{width: '1214px'}}>
							<span className='myorder-title-phone beginDate'>开始时间：</span><DatePicker placeholder=""
                         onChange={::this.handleBeginDateChange} format="YYYY-MM-DD" style={{width: '120px'}} value={moment(startDate)} disabledDate={::this.beginDisableDate}></DatePicker>
							<span className='myorder-title-phone'>结束时间：</span><DatePicker placeholder=""
                         onChange={::this.handleEndDateChange} format="YYYY-MM-DD" style={{width: '120px'}} value={moment(endDate)} disabledDate={::this.endDisableDate}></DatePicker>
							<span className='myorder-title-name'>订单类型：</span>
							<Select style={{ width: 120 }} onChange={::this.handleOrderTypeChange} value={orderType}>
						      <Option value='0'>全部</Option>
						      <Option value='1'>付费订单</Option>
						      <Option value='2'>非付费订单</Option>
						    </Select>
							<span className='myorder-title-name'>纳税人身份：</span>
							<Select style={{ width: 120 }} onChange={::this.handleVatTaxpayerChange} value={vatTaxpayer}>
						      <Option value='0'>全部</Option>
						      <Option value='42'>小规模纳税人</Option>
						      <Option value='41'>一般纳税人</Option>
						    </Select>
							<span className='myorder-title-name'>客户名称：</span><Input placeholder='客户名称' onChange={::this.handleNameChange} value={searchNameValue} style={{width: '120px'}}/>
							<span className='myorder-title-phone'>手机号：</span><Input placeholder='手机号' onChange={::this.handlePhoneChange} value={searchPhoneValue} style={{width: '120px'}} regExp={'/^[1][0-9][0-9]{9}$/'}/>
							<br/>
							<span className='myorder-title-name'>地区：</span>
							<Select style={{ width: 120 }} onChange={::this.cityChange} value={province}>
						      {this.getCityOptions(provinceSource)}

						    </Select>
							<Button className='search' onClick={::this.handleSearchOrgClick}>搜索</Button>
						</div>
					</div>
					<div className={`${prefixCls}-my-order-main my-order-fc`}>
						<div className={`${prefixCls}-manage-list-header`}>
							<span className={`${prefixCls}-manage-list-header-cz`}>操作</span>
							<span className={`${prefixCls}-manage-list-header-company`}>企业名称</span>
							<span className={`${prefixCls}-manage-list-header-phone`}>手机号</span>
							<span className={`${prefixCls}-manage-list-header-origin`}><Select style={{ width: 92 }} onChange={::this.handleOrderSourceChange} value={orderSourceValue}>
							  <Option value="all" title={'订单来源'}>订单来源</Option>
							  <Option value="online" title={'在线'}>在线</Option>
							  <Option value="offline" title={'线下'}>线下</Option>
						    </Select></span>
							<span className={`${prefixCls}-manage-list-header-origin`}><Select style={{ width: 92 }} onChange={::this.handlePayTypeManageChange} value={payTypeManageValue}>
							  <Option value="all" title={'订购类型'}>订购类型</Option>
							  <Option value="new" title={'新购'}>新购</Option>
							  <Option value="again" title={'续购'}>续购</Option>
						    </Select></span>
							<span className={`${prefixCls}-manage-list-header-product`}>提交人</span>
							<span className={`${prefixCls}-manage-list-header-from`}>{notYj?'所属伙伴':<Select style={{ width: 92 }} onChange={::this.handleTheirFriendChange} value={theirFriendValue}>
							  <Option value="all" title={'所属伙伴'}>所属伙伴</Option>
							  {this.getChildren()}
						    </Select>}</span>
							<span className={`${prefixCls}-manage-list-header-pay`}><Select style={{ width: 92 }} onChange={::this.handleTypeManageChange} value={typeManageValue}>
							  <Option value="all" title={'支付方式'}>支付方式</Option>
							  <Option value="wx" title={'微信支付'}>微信支付</Option>
							  <Option value="zfb" title={'支付宝'}>支付宝</Option>
							  <Option value="down" title={'线下支付'}>线下支付</Option>
						    </Select></span>
							<span className={`${prefixCls}-manage-list-header-money`}>支付金额</span>
							<span className={`${prefixCls}-manage-list-header-buy`}>订单状态</span>
							<span className={`${prefixCls}-manage-list-header-gz`}>发票跟踪</span>
							<span className={`${prefixCls}-manage-list-header-zz`}>合同追踪</span>
						</div>
						<Table
			                rowsCount={orderManageList.size}
							rowHeight={110}
			                headerHeight={0}
							height ={tableHeight}
			    			width={1306}>
			    		    {this.getColumns(prefixCls,orderManageList)}
						</Table>
						<div style ={{padding : '0 0 10px 0'}}>
							<Button onClick={::this.handleSurePageSize} className={'order-page-sure'} type='default'>确定</Button>
							<Pagination
								current={orderManageListPage.current}
								total={orderManageListPage.total}
								pageSize={orderManageListPage.pageSize}
								onChange={::this.handlePageChange}
								onShowSizeChange = {::this.handlePageSizeChange}
								showSizeChanger
								showQuickJumper
							/>
						</div>
					</div>
				</Card>
			</div>
    	)
	}
}


{/* <Column
    			key='cz'
    			flexGrow={1}
    			header={(<Cell>操作</Cell>)}
    			width={216}
    			cell={props=>(
    				<Cell>
    					<div className="order-item-cz order-list-item">
	    					<div className="order-item-cz-no bg-first">
	    					 	<p>订单号：<a href="javascript:;" onClick={::this.handleSee(props)}  disabled={this.props.auth!=2}>{orderManageList.getIn([props.rowIndex, 'code'])}</a></p>
	    					</div>
    						<div className="order-item-cz-btn bg-second">
	    						<div className="btn-manage-box">
	    							<Button
			    						type="dashed"
			    						onClick={::this.handleManage(props)}
										disabled={this.props.auth!=2||(orderManageList.getIn([props.rowIndex, 'orderStatus'])==6)}
			    						>
			    						<ZIcon icon="edit" title='编辑'/>
			    					</Button>
			    					<Button
			    						type="dashed"
			    						onClick={::this.handleSee(props)}
										disabled={this.props.auth!=2}
			    						>
			    						<ZIcon icon="see" title='查看'/>
			    					</Button>
			    					<Button
			    						type="dashed"
										onClick={::this.handleDel(props)}
										disabled={(orderManageList.getIn([props.rowIndex, 'orderSource'])==1)||this.props.auth!=2||(orderManageList.getIn([props.rowIndex, 'orderStatus'])==6)}
			    						>
			    						<ZIcon icon="remove" title='删除' className={(orderManageList.getIn([props.rowIndex, 'orderSource'])==1)?'disable-gray-icon':''}/>
			    					</Button>
	    						</div>
	    					</div>
    					</div>
    				</Cell>
    			)}
    		/>,
    		<Column
    			key='name'
    			header={(<Cell>企业名称</Cell>)}
    			width={192}
    			cell={props=>(
    				<Cell>
    					<div className="order-item-org order-list-item">
	    					<div className="order-item-org-num bg-first">
	    						<p>下单时间：{orderManageList.getIn([props.rowIndex, 'createTime'])}</p>
	    					</div>
	    					<div className="order-item-org-name bg-second">
	    						<p>{orderManageList.getIn([props.rowIndex, 'orgName'])}</p>
	    					</div>
    					</div>
    				</Cell>
    			)}
    		/>,
    		<Column
    			key='product'
    			header={(<Cell>手机号</Cell>)}
    			width={162}
    			cell={props=>(
    				<Cell>
    					<div className="order-item-product order-list-item">
	    					<div className="order-item-product-type bg-first">
	    						<p>订单类型：{orderManageList.getIn([props.rowIndex, 'isPay'])==1?'付费用户':'非付费用户'}</p>
	    					</div>
	    					<div className="order-item-product-info bg-second">
	    						<p><span className="order-item-product-info-phone">{orderManageList.getIn([props.rowIndex, 'mobile'])}</span></p>
	    					</div>
    					</div>

    				</Cell>)
    			}
    		/>, */}
