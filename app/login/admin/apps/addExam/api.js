import moment from 'moment'
export const meta = {
	name: 'addExam',
	component: 'Form',
	childrens: [{
		name: 'formItems',
		component: 'FormItems',
		childrens: [{
			name: 'examName',
			title: '场次名称',
			type: 'string',
			showLabel: true,
			required: true,
			placeholder: '请输入场次名称',
			bindField: 'from.examName',
			validate: {
				showTooltip: false,
				rules: [{
					required: true,
					message: '场次名称不能为空'
				}]
			},
			width: 130
		},{
			title: '地区',
			name: 'registeredProvincial',
			bindField: 'from.registeredProvincial',
			component: 'Select',
			valueMember: 'code',
			displayMember: 'name',
			dataSource: [],
			width: 130
		},{
			name: 'state',
			title: '状态',
			type: 'string',
			bindField: 'from.state',
			component: 'Select',
			valueMember: 'id',
			displayMember: 'name',
			dataSource: [{
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
		from:{
			examName:'',
			registeredProvincial:null,
			state:{id:1}
		}
	}
}