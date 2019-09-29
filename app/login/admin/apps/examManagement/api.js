import moment from 'moment'
export const meta = {
	name: 'examManagement',
	component: 'Form',
	childrens: [{
		name: 'tabs',
		component: 'Tabs',
		activeKeyPath: 'activeKey',
		defaultActiveKey: '0',
		childrens: [{
			name: 'fieldManage',
			component: 'Grid',
			title: '场次管理',
			bindField: 'fieldList',
			rowHeight: 32,
			headerHeight: 32,
			disabled: true,
			enableSum: false,
			enableSequenceColumn: true,
			startSequence: 0,
			childrens: [{
				name: 'examName',
				title: '考试场次',
				bindField: 'fieldList.{0}.examName',
				displayComponent: 'Link',
				showTips: true,
				flexGrow: 1,
			},{
				name: 'createTime',
				title: '添加时间',
				bindField: 'fieldList.{0}.createTime',
				type: 'string',
				showTips: true,
				width: 150,
				textAlign: 'center'
			},{
				name: 'state',
				title: '状态',
				bindField: 'fieldList.{0}.state',
				type: 'string',
				showTips: true,
				width: 100,
				textAlign: 'center'
			}]
		},{
			name: 'achievementManage',
			component: 'Grid',
			title: '成绩管理',
			bindField: 'achievementList',
			rowHeight: 32,
			headerHeight: 32,
			disabled: true,
			enableSum: false,
			isSelectColumn: true,
			enableSequenceColumn: true,
			startSequence: 0,
			childrens: [{
				name: 'select',
				title: '选',
				type: 'bool',
				isSelectColumn: true,
				bindField: 'achievementList.{0}.select',
				width: 30
			}, {
				name: 'examName',
				title: '考试场次',
				bindField: 'achievementList.{0}.examName',
				type: 'string',
				showTips: true,
				textAlign: 'center',
				flexGrow: 1,
			},{
				name: 'mobile',
				title: '用户手机号',
				bindField: 'achievementList.{0}.mobile',
				type: 'string',
				showTips: true,
				textAlign: 'center',
				flexGrow: 1,
			},{
				name: 'userName',
				title: '姓名',
				bindField: 'achievementList.{0}.userName',
				type: 'string',
				showTips: true,
				textAlign: 'center',
				flexGrow: 1,
			},{
				name: 'orgName',
				title: '企业名称',
				bindField: 'achievementList.{0}.orgName',
				type: 'string',
				showTips: true,
				textAlign: 'center',
				flexGrow: 1,
			},{
				name: 'areaName',
				title: '账套地区',
				bindField: 'achievementList.{0}.areaName',
				type: 'string',
				showTips: true,
				textAlign: 'center',
				flexGrow: 1,
			},{
				name: 'examTime',
				title: '考试时间',
				bindField: 'achievementList.{0}.examTime',
				type: 'string',
				showTips: true,
				textAlign: 'center',
				flexGrow: 1,
			},{
				name: 'achievement',
				title: '实操考试分数',
				bindField: 'achievementList.{0}.achievement',
				type: 'string',
				showTips: true,
				textAlign: 'center',
				flexGrow: 1,
			},{
				name: 'isQualified',
				title: '实操成绩状态',
				bindField: 'achievementList.{0}.isQualified',
				type: 'string',
				textAlign: 'center',
				showTips: true,
				flexGrow: 1,
			}, {
				name: 'cashierAchievement',
				title: '专业考试分数',
				bindField: 'achievementList.{0}.cashierAchievement',
				type: 'string',
				showTips: true,
				textAlign: 'center',
				flexGrow: 1,
			}, {
				name: 'isCashierQualified',
				title: '专业成绩状态',
				bindField: 'achievementList.{0}.isCashierQualified',
				type: 'string',
				textAlign: 'center',
				showTips: true,
				flexGrow: 1,
			}]
		}]
	},{
		name: 'filters',
		component: 'FormItems',
		childrens: [{
			name: 'examList',
			title: '考试场次',
			bindField: 'filters.examList',
			component: 'Select',
			valueMember: 'examId',
			displayMember: 'examName',
			dataSource: [],
			width: 130
		},{
			name: 'details',
			title: '考试试卷',
			bindField: 'filters.details',
			component: 'Select',
			valueMember: 'id',
			displayMember: 'name',
			dataSource: [{
				id:0,
				name:'全部查询'
			},{
				id: '1',
				name:'系统实操考试'
			},{
				id:'2',
				name:'财税基础知识考试'
			}],
			width: 130
		},{
			name: 'beginDate',
			title: '考试开始日期',
			type: 'string',
			component: 'DatePicker',
			showLabel: true,
			required: false,
			allowClear:true,
			placeholder: '请输入注册日期',
			bindField: 'filters.beginDate',
			width: 130
		},{
			name: 'endDate',
			title: '考试结束时间',
			type: 'string',
			component: 'DatePicker',
			showLabel: true,
			required: false,
			allowClear: true,
			placeholder: '请输入注册日期',
			bindField: 'filters.endDate',
			width: 130
		},{
			name: 'mobile',
			title: '手机号',
			type: 'string',
			showLabel: true,
			placeholder: '请输入手机号',
			maxlength: 11,
			bindField: 'filters.mobile'
		},{
			title: '地区',
			name: 'registeredProvincial',
			bindField: 'filters.registeredProvincial',
			component: 'Select',
			valueMember: 'code',
			displayMember: 'name',
			dataSource: [],
			width: 130
		},{
			name: 'achievement',
			title: '成绩排序',
			type: 'string',
			bindField: 'filters.achievement',
			component: 'Select',
			valueMember: 'id',
			displayMember: 'name',
			dataSource: [{
				id: 0, name:'默认排序'
			},{
				id: 1, name: '实操考试分数排序'
			}, {
				id: 2, name: '基础专业考试分数排序'
			}],
			width: 130
		}]
	},{
		name:'search',
		component:'FormItems',
		childrens:[{
			name: 'examName',
			title: '场次名称',
			type: 'string',
			showLabel: true,
			required: false,
			placeholder: '请输入场次名称',
			bindField: 'search.examName',
			validate: {
				showTooltip: false,
				rules: [{
					required: true,
					message: '场次名称不能为空'
				}]
			},
			width: 130
		},{
			title: '场次状态',
			name: 'state',
			type: 'string',
			bindField: 'search.state',
			component: 'Select',
			valueMember: 'id',
			displayMember: 'name',
			dataSource: [{
				id:'all',
				name:'全部'
			},{
				id: 1, name: '正常'
			}, {
				id: 0, name: '关闭'
			}],
			width: 130
		}]
	}]
}

export const getData = ()=>{
	return {
		activeKey:0,
		filters:{
			examList: { examId: 0, examName: '全部' },
			beginDate:null,
			endDate:null,
			registeredProvincial: { code: 0, name: '全部' },
			achievement:{id:0},
			details:{id:0}
		},
		search:{
			examName:'',
			state:{id:'all',name:'全部'}
		}
	}
}