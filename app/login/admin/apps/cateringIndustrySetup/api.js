import moment from 'moment'
export const meta = {
	name:'cateringIndustrySetup',
	component:'Form',
	childrens:[{
		name: 'filters',
		component: 'FormItems',
		childrens:[{
			name: 'inventoryName',
			title: '存货名称',
			type: 'string',
			showLabel: true,
			placeholder: '请输入存货名称',
			bindField: 'filters.inventoryName',
			required: false,
			allChange:true,
			height: 45,
			width: 200
		},{
			name:'type',
			title:'选择对照类型',
			bindField:'filters.type',
			component:'Select',
			type:'object',
			showLabel: true,
			valueMember:'id',
			displayMember:'name',
			width:100,
			dataSource:[{
				id:-1,
				name:'全部'
			},{
				id:1,
				name:'已对照'
			},{
				id:0,
				name:'未对照'
			}]
		}]
	},{
		name: 'grid',
		component: 'Grid',
		bindField: 'dataList',
		rowHeight: 32,
		headerHeight: 32,
		disabled: true,
		enableSum: false,
		isSelectColumn: true,
		enableSequenceColumn: true,
		childrens: [{
			name: 'select',
			title: '选',
			type: 'bool',
			isSelectColumn: true,
			bindField: 'dataList.{0}.select',
			width: 30
		}, {
			name: 'inventoryName',
			title: '存货名称',
			bindField: 'dataList.{0}.inventoryName',
			type: 'string',
			flexGrow: 1,
			textAlign: 'center',
			showTips: true
		}, {
			name: 'incomeName',
			title: '收入业务类型名称',
			bindField: 'dataList.{0}.incomeName',
			type: 'string',
			showTips: true,
			width: 200,
			textAlign: 'center'
		}, {
			name: 'incomeCode',
			title: '收入业务类型编码',
			bindField: 'dataList.{0}.incomeCode',
			type: 'string',
			showTips: true,
			width: 200,
			textAlign: 'left'
		}, {
			name: 'expenditureName',
			title: '支出业务类型名称',
			bindField: 'dataList.{0}.expenditureName',
			type: 'string',
			showTips: true,
			width: 200,
			textAlign: 'center'
		}, {
			name: 'expenditureCode',
			title: '支出业务类型编码',
			type: 'string',
			showTips: true,
			width: 200,
			bindField: 'dataList.{0}.expenditureCode',
		}, {
			name: 'type',
			title: '对照类型',
			type: 'string',
			showTips: true,
			width: 200,
			bindField: 'dataList.{0}.typeName',
			textAlign: 'center'
		}]
	},{
		name: 'pagination',
		component: 'Pagination',
		bindField: 'pagination',
		pageSizeOptions:['50','100','200','300']
	},{
		name: 'popoverContent',
		component: 'FormItems',
		childrens: [{
			name: 'name',
			title: '业务名称',
			type: 'string',
			showLabel: false,
			placeholder: '请输入业务名称',
			bindField: 'popoverContent.name',
			allChange: true,
			height: 45,
			width: 200
		},{
			name: 'businessTree',
			component: 'Tree',
			bindField: 'businessTree',
			checkedKeysPath: 'checkedKeys',
			selectedKeysPath: 'selectedKeys',
			expandedKeysPath:'expandedKeys',
			enableToggle:true,
			displayMember: 'name',
			valueMember: 'code',
			childrenMember: 'children',
			checkable: false,
			showLine: true,
			defaultExpandAll: false
		}]
	}]
}

export const data = {
	filters:{
		inventoryName:'',
		type:{id:-1}
	},
	popoverVisible:false,
	checkedKeys:[],
	selectedKeys:[],
	expandedKeys:[],
	businessTree:[],
	pagination: {
		current: 1,	//当前页码
		total: 0,   //数据的总条数而不是总页数
		pageSize: 50//每页显示多少条
	},
	dataList:[]
}