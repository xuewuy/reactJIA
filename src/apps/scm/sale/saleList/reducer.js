import * as dr from 'dynamicReducer'
import * as api from './api'
import {fromJS,Map, List} from 'immutable'


export function tabEvent(state,list){
	state = dr.setterByField(state,'form.list',fromJS(list))
	return state
}
export function queryEvent(state,toolbar){
	
	state = dr.setterByField(state,'toolbar',toolbar)
	return state
}
// 内容复选框 选中
export function checkboxed(state, value){
	
	state = dr.setterByField(state,'batchAuditArr',fromJS(value))
	return state
}
// 删除 批量审核的内容
export function checkboxOut(state, value){
	state = dr.setterByField(state,'batchAuditArr',fromJS(value))
	return state 
}

// 改变当前 审核状态
export function toExaminePuListCurrent(state,value){

	state = dr.setterByField(state,`puList.${value.index}`,Map(value.thisData))


	return state
}



// 删除
export function deleteIcon(state,defaultQuery){
	
	state = dr.setterByField(state,'puList',fromJS(defaultQuery))
	
	return state
}
// 公共的
export function handleRefresh(state,value){
	
	state = dr.setterByField(state,'puList',fromJS(value.ajaxData.dataList))
	state = defaultQuery(state,value)
	return state
}
// 设置时间
export function setTime(state,value){ 
	state = dr.setterByField(state,'puQuery.data.defaultDiplayText',value)
	return state
}
//查询
// onEventReduce
export function onEventReduce(state,value){
	
	state = dr.setterByField(state,'puList',fromJS(value.ajaxData.dataList))
	state = defaultQuery(state,value)
	return state
}
export function defaultQuery(state,value){
	state = dr.setterByField(state,'defaultQuery',fromJS(value.defaultQuery))
	state = setData(state, value)
	state = setPageSize(state, value.ajaxData)
	return state
}
// 设置 审核，和 位审核
export function setData(state,value){
	state = value.pendingNumber == 0 ? dr.setter(state, 'puVoucherList.headTabList.puList.tabs.TAB2', 'title','待审') : dr.setter(state, 'puVoucherList.headTabList.puList.tabs.TAB2', 'title',`待审 ( ${value.pendingNumber} )`)
	state = value.unclearedNumber == 0 ? dr.setter(state, 'puVoucherList.headTabList.puList.tabs.TAB3', 'title','未结清') : dr.setter(state, 'puVoucherList.headTabList.puList.tabs.TAB3', 'title',`未结清 ( ${value.unclearedNumber} )`)

	return state
}
export function selectAddedItem(state, archiveName, value) {
    return dr.setterByField(state, 'root.' + archiveName, value)
}
// 分页显现控制
export function setPageSize(state,value){
	state = dr.setterByField(state, 'paging.current', value.page.currentPage)// 现在 在 那一页
	state = dr.setterByField(state, 'paging.total', value.page.sumCloum) 	// 一共多少 条
	state = dr.setterByField(state, 'paging.pageSize', value.page.pageSize) // 每页多少个
	return state
}
Object.assign(exports, {...dr,...exports})




















