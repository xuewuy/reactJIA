import React from 'react'
import context from '../../../../../context/index.js'

export default class topComponent extends React.Component {
	constructor(props){
		super(props)
		this.handleImportTicket = this.handleImportTicket.bind(this)

		this.functions = [{
			code:'importTicket',
			name:'发票导入',
			url:'',
			btnStatus:{menuId:201001,auth:2},
			onClick:this.handleImportTicket
		},{
			code:'statement',
			name:'银行对账单导入',
			tabName:'银行对账单',
			url:'apps/acm/bankStatement',
			btnStatus:{menuId:201003,auth:1}
		},{
			code:'importPayroll',
			name:'工资单导入',
			tabName:'工资单',
			url:'apps/gl/payRoll/payRollList',
			btnStatus:{menuId:2020,auth:1}
		},{
			code:'addWater',
			name:'手工新增流水',
			tabName:'流水账',
			url:'apps/acm/richardTicket/card',
			btnStatus:{menuId:201003,auth:1}
		},{
			code:'water',
			name:'流水账',
			tabName:'流水账列表',
			url:'apps/acm/richardTicket/list',
			btnStatus:{menuId:201003,auth:1}
		},{
			code:'waterReport',
			name:'收支统计表',
			tabName:'收支统计表',
			url:'apps/acm/richardTicket/report',
			btnStatus:{menuId:201002,auth:1}
		},{
			code:'accSubjects',
			name:'科目及期初',
			tabName:'科目及期初',
			url:'apps/fi/accSubjects/accSubjects',
			btnStatus:{menuId:200005,auth:1}
		},{
			code:'addVoucher',
			name:'手工录入凭证',
			tabName:'新增凭证',
			url:'apps/fi/addVoucher',
			btnStatus:{menuId:203001,auth:1}
		},{
			code:'voucher',
			name:'凭证',
			tabName:'凭证管理',
			url:'apps/fi/voucherManagement',
			btnStatus:{menuId:203002,auth:1}
		},{
			code:'accountBook',
			name:'账簿',
			tabName:'余额表',
			url:'apps/fi/accountBook/balances',
			btnStatus:{menuId:203005,auth:1}
		},{
			code:'fiReport',
			name:'财务报表',
			tabName:'资产负债表',
			url:'apps/fi/report/balanceSheet',
			btnStatus:{menuId:203006,auth:1}
		},{
			code:'zzssbb',
			name:'增值税申报表',
			tabName:'增值税申报',
			url:this.props.taxUrlOne,
			btnStatus:{menuId:204001,auth:1}
		},{
			code:'qysdsyj',
			name:'企业所得税预缴',
			tabName:'企业所得税预缴辅助计算表',
			url:'apps/fi/manageTax/declareTaxOfPrepayAB',
			btnStatus:{menuId:204002,auth:1}
		}]
	}
	
	handleImportTicket(){
        let {clearMessage, setMessage} = this.props
        setMessage({
            type: 'app',
            title: '发票导入',
            content: 'app:apps/acm/richardTicket/importNew',
            okText: '下一步',
            wrapClassName: 'richardTicketImportNewModal',
            refName:'richardTicketImportNewModal',
            onCancel: ()=>{ clearMessage() } ,
            onOk: (data)=>{
				if(data && data.result) {
					clearMessage()
//					let form = data.value
//					setMessage({
//						type: 'app',
//						title: '发票导入',
//						content: 'app:apps/acm/richardTicket/importNew/import',
//						okText: '生成流水账',
//						initData: {form},
//						wrapClassName: 'importNewModal',
//						refName:'importNewModal',
//						onCancel: ()=>{ clearMessage() } ,
//						onOk: (data)=>{
//							if(data && data.result) {
//								clearMessage()
//							}
//						},
//						width:1100,
//						bodyStyle:{height:500},
//					})
				}
            },
            width:640,
			height:320,
            bodyStyle:{padding:10},
        })
    }

	handleClick(f){
		return ()=>{
			if(f.onClick)
				f.onClick()
			else
			 this.props.onAddTab(f.tabName, f.url)
//             this.props.onAddTab(f.tabName, f.url, {initData: f.btnStatus.menuId})
		}
	}


	hasAuth(menu){
		let getterByField = this.props.payload.getIn(['utils', 'getterByField']),
			menuIds = this.props.tab.get('menuIds') ? this.props.tab.get('menuIds').toJS() : getterByField('menuIds'),
			auth = this.props.tab.get('auth') ? this.props.tab.get('auth').toJS() : getterByField('auth'),
			isDisable = false
		if(!menuIds) return isDisable
		menuIds.map(id=>{
			if(isDisable)return
			if(id == menu.btnStatus.menuId){
				// 有权限，但是需要判断一下当前的权限
				let currMenuAuth = auth.find(a=> Object.keys(a)== id)
				if(currMenuAuth[id] == 2){
					return isDisable = true
				}else if(currMenuAuth[id] == 1 && id != 201001){
					return isDisable = true
				}else{
					return isDisable = false
				}
			}else{
				// 没有权限直接至灰
				isDisable = false
			}
		})
		return isDisable
	}

	render(){
		let {prefixCls} = this.props
		return (
			<div className={`${prefixCls}-top`}>
				<img src={require("../img/flow.png")} />
				{
					this.functions.map(f=>
						<div className={`${prefixCls}-top-link ${prefixCls}-top-${f.code}`}>
							{this.hasAuth(f) ?
								 <a onClick={::this.handleClick(f)}>{f.name}</a> :
								 <span>{f.name}</span>
							}
						</div>
					)
				}

			</div>
		)
	}
}
