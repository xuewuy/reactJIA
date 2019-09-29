import * as da from 'dynamicAction'
import webapi from 'webapi'
import * as api from './api'

export function initView(){
	return async injectFuns =>{
		let examList = await webapi.web.getExamList(injectFuns.post),
			provinceList = await webapi.org.getCityMap(injectFuns.post, {}),
			data = api.getData()
		if (!da.handleWebApiInfo(provinceList)(injectFuns) || !da.handleWebApiInfo(examList)(injectFuns)){
			return da.initView({ meta: api.meta, data: api.getData() }, exports)(injectFuns)
		}
		let examListDataSource = [{ examId: 0, examName: '全部' }, ...examList.value.examList]
		provinceList.value.provinceList = [{ code: 0, name: '全部' }, ...provinceList.value.provinceList]
		da.setMetaProperty(api.meta, 'examManagement.filters.examList.dataSource', examListDataSource)
		da.setMetaProperty(api.meta, 'examManagement.filters.registeredProvincial.dataSource', provinceList.value.provinceList)
		examList.value.examList.map(item=>{
			item.state = item.state ? '正常' : '关闭' 
		})
		data.fieldList = examList.value.examList
		da.initView({meta: api.meta, data:data},exports)(injectFuns)
	}
}

export function getExamList(){
	return async injectFuns=>{
		let params = {
				examName: da.getterByField('search.examName')(injectFuns) || null,
				state: da.getterByField('search.state.id')(injectFuns) == 'all' ? null : da.getterByField('search.state.id')(injectFuns)
			}
		let examList = await webapi.web.getExamList(injectFuns.post, params)
		if (!da.handleWebApiInfo(examList)(injectFuns)) return 
		injectFuns.reduce('setExamList', examList.value.examList)
	}
}
export function getAchievementList(){
	return async injectFuns=>{
		let filters = getParams()(injectFuns),
			res = await webapi.web.getOnlineExamList(injectFuns.post, filters)
		if (!da.handleWebApiInfo(res)(injectFuns)) return 
		injectFuns.reduce('setAchievementList', res.value.onlineExamList)
	}
}

export function getParams(){
	return injectFuns=>{
		let filters = da.getterByField('filters')(injectFuns).toJS(),
			params = {
				examId: (filters.examList && filters.examList.examId) || null,
				beginDate: filters.beginDate,
				endDate: filters.endDate,
				registeredProvincial: (filters.registeredProvincial && filters.registeredProvincial.code) || null,
				achievement: filters.achievement.id,
				mobile: filters.mobile,
				details: !filters.details.id ? null : filters.details.id
			}
		return params
	}
}

export function sendMS(type){
	return async injectFuns=>{
		let selectedRows = da.getSelectedRows('examManagement.tabs.achievementManage.select')(injectFuns),
			list = []
		if (selectedRows.size <= 0){
			return da.setMessage({
				type: 'error',
				title: '错误',
				mode: 'message',
				content: '请选择您要发短信的成绩单'
			})(injectFuns)
		}
		selectedRows.map(item=>{
			list.push(item.get('id'))
		})
		let res = await webapi.web.sendMS(injectFuns.post, { list, isCashier: type})
		if (!da.handleWebApiInfo(res)(injectFuns)) return 
		da.setMessage({
			type: 'success',
			title: '成功',
			mode: 'message',
			content: '发送短信成功'
		})(injectFuns)
		getAchievementList()(injectFuns)
	}
}

export function exportExcel(){
	return injectFuns=>{
		let selectedRows = da.getSelectedRows('examManagement.tabs.achievementManage.select')(injectFuns),
			list = []
		if (selectedRows.size <= 0) {
			return da.setMessage({
				type: 'error',
				title: '错误',
				mode: 'message',
				content: '请选择您要导出的成绩单'
			})(injectFuns)
		}
		selectedRows.map(item => {
			list.push(item.get('id'))
		})
		injectFuns.formPost('/v1/onlineExam/export', {list})
		getAchievementList()(injectFuns)
	}
}


export function switchModule(activeKey){
	return injectFuns=>{
		if(activeKey == 0){
			//场次查询
			getExamList()(injectFuns)
		}else{
			//成绩查询
			getAchievementList()(injectFuns)
		}
		injectFuns.reduce('switchModule', activeKey)
	}
}

export function addExam(row){
	return injectFuns=>{
		let rowInfo = row ? row.toJS() : null
		da.setMessage({
			type: 'app',
			title: row ? '修改场次' : '新增场次',
			content: 'app:apps/login/admin/apps/addExam',
			initData: rowInfo ? { ...rowInfo} : null,
			width: 400,
			refName: 'addExam',
			onCancel: () => { da.clearMessage()(injectFuns) },
			onOk: (data) => {
				if (data.result) {
					da.setMessage({
						type: 'success',
						title: '成功',
						mode: 'message',
						content: row ? '修改场次成功' : '新增场次成功'
					})(injectFuns)
					da.clearMessage()(injectFuns)
					getExamList()(injectFuns)
				}
			}
		})(injectFuns)
	}
}

export function remove(row){
	return injectFuns=>{
		da.setMessage({
			type: 'confirm',
			title: '警告',
			content: '您确定要删除 ' + row.get('examName') + ' ？',
			width: 410,
			onCancel: () => {
				da.clearMessage()(injectFuns)
			},
			onOk: () => {
				da.clearMessage()(injectFuns)
				webapi.web.deleteExam(injectFuns.post, { examId: row.get('examId')}).then(data=>{
					if (!da.handleWebApiInfo(data)(injectFuns)) return
					da.setMessage({
						type: 'success',
						title: '成功',
						mode: 'message',
						content: '删除成功'
					})(injectFuns)
					getExamList()(injectFuns)
				})
			}
		})(injectFuns)
	}
}


export function onFieldChange(path, oldValue, newValue){
	return injectFuns=>{
		da.onFieldChange(path, oldValue, newValue)(injectFuns)
	}
}

export function onEvent(eventName, option) {
	return (injectFuns) => {
		//重写dynamicAction的事件后,需要再手工执行一下父类事件
		da.onEvent(eventName, option)(injectFuns)
		if (eventName === 'onLinkClick') {
			let index = option.path.split(',')[1],
				fieldList = da.getterByField('fieldList')(injectFuns),
				row = fieldList.get(index)
			addExam(row)(injectFuns)
		}
	}
}

Object.assign(exports, {...da, ...exports})