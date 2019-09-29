import * as dr from 'dynamicReducer'
import {fromJS} from 'immutable'
import moment from 'moment'

/**
 * 设置查询的最新数据
 * @param {*} state 
 * @param {*} data 
 */
export function setAjaxData(state, data, treeList) {
    let pagination = dr.getterByField(state,'pagination').toJS(),
        businessTree = transformDataType(treeList)
    pagination.current = data.page.currentPage
    pagination.pageSize = data.page.pageSize
    pagination.total = data.page.sumCloum
    state = dr.setterByField(state, 'pagination', fromJS(pagination))
    state = dr.setterByField(state, 'dataList', fromJS(data.dataList))
    state = dr.setter(state, 'cateringIndustrySetup.grid', 'startSequence', (data.page.currentPage - 1) * data.page.pageSize)
    state = dr.setterByField(state, 'treeList', fromJS(treeList))
    state = dr.setterByField(state, 'businessTree', businessTree)
    state = dr.setterByField(state, 'cacheBusinessTree', businessTree)
    state = dr.setterByField(state, 'popoverVisible', false)
    state = dr.setterByField(state, 'checkedKeys', fromJS([]))
    state = dr.setterByField(state, 'selectedKeys', fromJS([]))
    state = dr.setterByField(state, 'expandedKeys', fromJS([]))
    return state
}
export function filterTreeNode(state,filterNode){
    state = dr.setterByField(state, 'businessTree', fromJS(filterNode))
    return state
}

function transformDataType(treeList){
    let dataArray = [{
        code:10,
        name:'收入',
        code:10
    },{
        code:20,
        name:'支出',
        code:20
    }]
    treeList.map(item=>{
        let type = item.payCode == '10' ? dataArray[0] : dataArray[1]
        if (item.code.length == 6) {//二级菜单
            if (type.children && !type.children.find(e=>e.code == item.code)){
                type.children.push(item)
            }else{
                type.children = [item]
            }
        } else {//三级菜单
            let parentNode = type.children && type.children.find(e => e.code == item.code.substr(0, 6))
            if (parentNode.children){
                parentNode.children.push(item)
            }else{
                parentNode.children = [item]
            }
        }
    })
    return fromJS(dataArray)
}
/**
 * 当前选中的父节点
 * @param {*} state 
 * @param {*} selectedKeys 
 */
export function saveSelectedKeys(state,selectedKeys){
    state = dr.setterByField(state, 'selectedKeys', fromJS(selectedKeys))
    return state
}
/**
 * 当前展开的节点
 * @param {*} state 
 * @param {*} expandKeys 
 */
export function saveExpandKeys(state, expandKeys){
    state = dr.setterByField(state, 'expandedKeys', fromJS(expandKeys))
    return state
}
/**
 * 控制批量设置业务类型的弹窗显示隐藏
 * @param {*} state 
 * @param {*} visible 
 */
export function popoverVisibleChange(state, visible){
    let cacheBusinessTree = dr.getterByField(state,'cacheBusinessTree')
    if(!visible){
        state = dr.setterByField(state, 'checkedKeys', fromJS([]))
        state = dr.setterByField(state, 'selectedKeys', fromJS([]))
        state = dr.setterByField(state, 'expandedKeys', fromJS([]))
        state = dr.setterByField(state,'popoverContent.name','')
        state = dr.setterByField(state, 'businessTree', cacheBusinessTree)
    }
    state = dr.setterByField(state, 'popoverVisible', visible)
    return state
}

Object.assign(exports,{...dr, ...exports})