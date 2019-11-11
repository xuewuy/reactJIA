import React from 'react'
import DynamicComponent ,{ Modal } from 'dynamicComponent'
import {Button, Icon, Dropdown, Menu} from 'xComponent' 
import './style.less'

export default class PuList extends React.Component {

	static defaultProps = {
		prefixCls:'puList'
	}
	constructor(props){
        super(props)
        this.endOptionColumnCreator = this.endOptionColumnCreator.bind(this)
    }
	componentDidMount(){
		this.props.initView()
	}
	//打印
	handlePrint(){
		this.props.handlePrint()
	}
	//下载
	handleDownLoad(){
		this.props.handleDownLoad()
	}
	//新增销售单
	puNewlyAdded(){
		
		this.props.onAddTab('销售单',`apps/scm/sale/saleOrder`)
	}
	//刷新
	handleRefresh(){
		this.props.handleRefresh()
	}
	//批量删除
	puDl(){
		this.props.puDl()
	}
	// 点击 审核
	puToExamine(){
		this.props.toExamine()
	}
	
	// 点击删除 图标
	deleteIcon(value){
		return () => {
			this.props.deleteIcon(value)
		}
	}
	// 点击收款 图标
	receivables(value){
		return () => {
			// this.props.receivables(value)
			let getterByField = this.props.payload.getIn(['utils', 'getterByField']),
           		index = value.rowIndex,
                puListApi = getterByField('puList').toJS(),
                initData = {
                	'customerId': puListApi[index].customerId
                	//'id': puListApi[index].id,
                }            
			this.props.onAddTab('收款单',`apps/scm/arap/arapOrder`,{initData})    //传给销售单id进行查询
		}
	}
	// 点击审核 图标
	auditPerson(value){
		return () => {
			this.props.auditPerson(value)
		}
	}
	// 反审核 图标
	backAuditPerson(value){
		return () => {
			this.props.backAuditPerson(value)
		}
	}
	// 分页
	handleEventPage(eventName,option){
        this.props.pageChange(eventName,option)
    }
	endOptionColumnCreator(ps){
		let getterByField = this.props.payload.getIn(['utils', 'getterByField'])
        let dataName = 'list'  //api.getDataName((parseInt(ps.gridPath.split('.')[2].replace('TAB',''))-1).toString())
        if(ps.payload.toJS().data_runtime.puList.length !=0){
        	let puList =  getterByField('puList').toJS() 
	        let status =  puList[ps.rowIndex].status     //status  审核状态  // 127 未审核 ,128  已审核,129  已驳回
	        let settleStatus =  puList[ps.rowIndex].settleStatus// 结算状态
	        let manualWriteOff =  puList[ps.rowIndex].manualWriteOff// 是否被手工核销
	        return(
	            <span>
	            	{status != '128' ?
	               	<Icon className={`${this.props.prefixCls}-auditPerson`}
	               		title="审核"
	               		onClick={::this.auditPerson(ps)}
	               		type="question">
	               	</Icon>
	               	:<Icon className={`${this.props.prefixCls}-auditPerson-prohibit`}
	               		title="审核"
	               		type="question"
	               		disabled>
	               	</Icon>}
	               	{status == '128' ?
	               	<Icon className={`${this.props.prefixCls}-auditPerson-out`}
	               		title="反审核"
	               		onClick={::this.backAuditPerson(ps)}
	               		type="question">
	               	</Icon>
	               	:<Icon className={`${this.props.prefixCls}-auditPerson-out-prohibit`}
	               		title="反审核"
	               		type="question"
	               		disabled>
	               	</Icon>}
	               	{settleStatus == '130' && settleStatus != '131'?
	               	<Icon className={`${this.props.prefixCls}-receivables`}
	               		title="收款"
	               		onClick={::this.receivables(ps)}
	               		type="question"
	               		>
	               	</Icon>
	               	:<Icon className={`${this.props.prefixCls}-receivables-prohibit`}
	               		title="收款"
	               		type="question"
	               		disabled 
	               		>
	               	</Icon>}

	               	{status != '128' && manualWriteOff != true?
	               	<Icon className={`${this.props.prefixCls}-deleteIcon`}
	               		title="删除"
	               		onClick={::this.deleteIcon(ps)}
	               		type="question"
	               		>
	               	</Icon>
	               	:<Icon className={`${this.props.prefixCls}-deleteIcon-prohibit`}
	               		title="删除"
	               		type="question"
	               		disabled 
	               		>
	               	</Icon>}
	            </span>
	        )
        }
	}
	handleEvent(eventName,option){
		if(eventName === 'onLinkClick') {
            let getterByField = this.props.payload.getIn(['utils', 'getterByField']),
                rowIndex = parseInt(option.path.split(',')[1]),
                {setMessage} = this.props,
                id = getterByField('puList').toJS()[rowIndex].id,
				deliveryTypeId=getterByField('puList').toJS()[rowIndex].deliveryTypeId,
                initData = {id: id,stype:''}

            if (deliveryTypeId==132) {
                this.props.onAddTab('销售单', `apps/scm/sale/saleOrder`, {initData})
            }
			else if(deliveryTypeId==133){
				initData.stype='rejected'
				this.props.onAddTab('销售退货单', `apps/scm/sale/saleOrder`, {initData})
			}
        }else{
        	this.props.onEvent(eventName, option)
        }
    }
	render(){
		let {prefixCls, ...otherProps} = this.props,
		message = this.props.payload.getIn(['global','message'])
		if (!this.props.payload || !this.props.payload.get('utils')) return null
		return(
				<div className={`${prefixCls}`}>
					<div className={`${prefixCls}-head`} >
						<div id="pickerWrapZZ">
							<DynamicComponent {...otherProps} ref='puQuery' _path="puVoucherList.puQuery" />
						</div>
						<Button onClick={::this.handleRefresh} type="primary" icon='search' className="lodaingTableOk" title="刷新">刷新</Button>
						<div>
							
						</div>
						<div className="setStyle_1">
							<Button onClick={::this.puNewlyAdded} type="ghost" type="primary" className='function-add'>新增销售单</Button>
							<Button onClick={::this.puToExamine} type="ghost" type="primary">审核</Button>
							<Button onClick={::this.puDl} type="ghost" type="primary">删除</Button>
							<Button onClick={::this.handlePrint} type='ghost'  type="primary" className="export" icon='search' title="打印">打印</Button>
	                        <Button onClick={::this.handleDownLoad} type='ghost' type="primary" className="print" icon='search' title="下载">下载</Button>
						</div>
					</div>
					<div className="contentTab">
						<DynamicComponent {...otherProps} className={`${prefixCls}-tab`} _path="puVoucherList.headTabList" />
					</div>
					<div className={`${prefixCls}-body`}>
						<DynamicComponent {...otherProps} 
							_path="puVoucherList.puList"
							onEvent={::this.handleEvent}
							scroll={{y:true,x:true}}
	                        endOptionColumnTitle='操作'
	                        endOptionColumnWidth={100}
	                        endOptionColumnCreator={this.endOptionColumnCreator.bind(this)}
	                        endOptionColumnFixed
	                        bodyStyle={{overflowY:'auto'}}
						/>
					</div>
					<div className={`${prefixCls}-foot`}></div>
					<DynamicComponent {...otherProps} _path='puVoucherList.paging' onEvent={::this.handleEventPage}  />
					{Modal(message)}
				</div>			
		)
		
	}
}































