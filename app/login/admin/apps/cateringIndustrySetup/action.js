import * as da from 'dynamicAction'
import webapi from 'webapi'
import * as api from './api'

export function initView(){
	return injectFuns =>{
		da.initView({meta: api.meta, data:api.data},exports)(injectFuns)
		query()(injectFuns)
	}
}
/**
 * 查询最新的数据
 */
export function query(currentPage,pageSize){
	return injectFuns=>{
		let params = getParams()(injectFuns),
			treeList = []
		/**
		 * 只有当页码或者每页显示数量发生变化才会传递currentPage和pageSize
		 * 当没有传递参数时默认查询第一页的内容
		 */
		params.page.pageSize = pageSize ? pageSize : params.page.pageSize
		params.page.currentPage = currentPage ? currentPage : 1
		//请求业务树的接口
		webapi.web.findBusiness(injectFuns.post).then(data => {
			if (!da.handleWebApiInfo(data)(injectFuns)) return
			treeList = data.value
			//请求业务关系数据
			return webapi.web.queryBusinessMaintain(injectFuns.post, params)
		}).then(ajaxData=>{
			if (!da.handleWebApiInfo(ajaxData)(injectFuns)) return
			injectFuns.reduce('setAjaxData', ajaxData.value, treeList)
		})
	}
}
/**
 * 组织查询的参数
 */
export function getParams(){
	return injectFuns=>{
		let filters = da.getterByField('filters')(injectFuns),
			pagination = da.getterByField('pagination')(injectFuns),
			params = {
				inventoryName: filters.get('inventoryName'),
				type: filters.get('type').get('id') == -1 ? null : filters.get('type').get('id'),
				page:{
					pageSize: pagination.get('pageSize'),
					currentPage: pagination.get('current')
				}
			}
		return params
	}
}
/**
 * 控制批量设置业务类型的弹窗显示隐藏
 * @param {*} visible 
 */
export function popoverVisibleChange(visible){
	return injectFuns=>{
		injectFuns.reduce('popoverVisibleChange', visible)
	}
}

export function onFieldChange(path, oldValue, newValue){
	return injectFuns=>{
		da.onFieldChange(path, oldValue, newValue)(injectFuns)
		//当存货名称和对照类型发生改变时重新查询业务关系数据
		if (path === 'cateringIndustrySetup.filters.inventoryName' || path === 'cateringIndustrySetup.filters.type'){
			query()(injectFuns)
		} else if (path === 'cateringIndustrySetup.popoverContent.name'){
			let treeList = da.getterByField('treeList')(injectFuns).toJS(),
				cacheBusinessTree = da.getterByField('cacheBusinessTree')(injectFuns).toJS(),
				filterNode = newValue ? treeList.filter(item => item.name.indexOf(newValue) != -1 && item.treeCode.length >= 10) : cacheBusinessTree
			injectFuns.reduce('filterTreeNode', filterNode)
		}
	}
}
/**
 * 批量设置业务类型
 * @param {*} selectedKeys 
 */
export function updateBusiness(selectedKeys){
	return injectFuns=>{
		let selectRows = da.getSelectedRows('cateringIndustrySetup.grid.select')(injectFuns),
			selectedCode = selectedKeys[0],
			treeList = da.getterByField('treeList')(injectFuns).toJS(),
			selectedItemData = treeList.find(e => e.code == selectedCode),
			params = getUpdateBusinessParams(selectRows, selectedItemData)(injectFuns)
		if (selectedCode.length != 10) return
		
		webapi.web.updateBusiness(injectFuns.post, params).then(data=>{
			if (!da.handleWebApiInfo(data)(injectFuns)) return
			da.setMessage({ type: 'success', title: '成功', mode: 'message', content: '批量设置成功'})(injectFuns)
			query()(injectFuns)
		})
	}
}
/**
 * 获取批量设置业务类型的参数
 * @param {*} selectRows 
 * @param {*} selectedItemData 
 */
export function getUpdateBusinessParams(selectRows, selectedItemData){
	return injectFuns=>{
		let params = []
		if (selectRows.size <= 0 || !selectedItemData.code) return []
		selectRows.map(item=>{
			let paramsItem = {
				10:{
					id: item.get('id'),
					inventoryName: item.get('inventoryName'),
					incomeCode: selectedItemData.code
				},
				20:{
					id: item.get('id'),
					inventoryName: item.get('inventoryName'),
					expenditureCode: selectedItemData.code
				}
			}
			params.push(paramsItem[selectedItemData.payCode])
		})
		return params
	}
}

export function onEvent(eventName, option) {
	return (injectFuns) => {
		//重写dynamicAction的事件后,需要再手工执行一下父类事件
		da.onEvent(eventName, option)(injectFuns)
		//切换了分页的当前页
		if (eventName === 'onGridPageChanged' && option.path) {
			query(option.current, option.pageSize)(injectFuns)
		}
		//更改了每页条数
		else if (eventName === 'onGridPageSizeChanged' && option.path) {
			query(1, option.pageSize)(injectFuns)
		}
		//选择了某个节点
		else if (eventName === 'onTreeSelect' && option.path) {
			let selectRows = da.getSelectedRows('cateringIndustrySetup.grid.select')(injectFuns)
			if (option.selectedKeys[0].length == 10){
				if (selectRows.size <= 0) {
					return da.setMessage({ type: 'error', mode: 'message', content: '请选择批量设置的存货' })(injectFuns)
				}
				updateBusiness(option.selectedKeys)(injectFuns)
			}
			injectFuns.reduce('saveSelectedKeys', option.selectedKeys)
			
		}
		//当前展开的节点
		else if (eventName === 'onTreeExpand' && option.path){
			injectFuns.reduce('saveExpandKeys', option.expandKeys)
		}
	}
}

Object.assign(exports, {...da, ...exports})