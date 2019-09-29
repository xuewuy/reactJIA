import * as dr from 'dynamicReducer'
import { fromJS, Map, List } from 'immutable'
export function setView(state,data,initData,dataList,defaultExpandedKeys){
    state = dr.setterByField(state, 'subjectsClassified', fromJS(data))
    state = dr.setterByField(state, 'checkable', initData.checkable || false)
    state = dr.setterByField(state, 'isEndNode', initData.isEndNode)
    state = dr.setterByField(state, 'industry', initData.industry)
    state = dr.setterByField(state, 'subjects', dataList)
    state = dr.setter(state,'subjectsMenuTree.menuTree','checkable',initData.checkable)
    if(defaultExpandedKeys){
        state = dr.setterByField(state, 'deptExpandedKeys',fromJS([defaultExpandedKeys]) )
        state = dr.setterByField(state, 'deptSelectedKeys',fromJS([defaultExpandedKeys]) )
        debugger
    }
    return state
}

export function onEvent(state, eventName, option) {
    if(eventName === 'onTreeCheck' && option.path){
        //多选的事件处理
        let values = dr.getter(state, option.path),
            checkedKeysPath = values.get('checkedKeysPath'),
            codeAndName = []
        option.e.checkedNodes.map((element,index)=>{
            codeAndName.push(element.props.title)
        })
        state = dr.setterByField(state, checkedKeysPath, fromJS(option.checkedKeys))
        state = dr.setterByField(state, 'checkCodeAndName', fromJS(codeAndName))
    }
    else if(eventName === 'onTreeSelect' && option.path){
        //单选的事件处理
        let values = dr.getter(state, option.path),
            selectedKeysPath = values.get('selectedKeysPath')
        if (isNaN(option.selectedKeys[0])) { //如果选中分组
            state = dr.setterByField(state, 'deptExpandedKeys', fromJS(option.selectedKeys))
        }else{
            state = dr.setterByField(state, 'selectedCodeAndName', fromJS(option.e.selectedNodes[0].props.title))
        }
        state = dr.setterByField(state, selectedKeysPath, fromJS(option.selectedKeys))
    }else if(eventName == 'onTreeExpand'){
        let values = dr.getter(state, option.path),
            selectedKeysPath = values.get('selectedKeysPath'),
            ExpandedKeys = option.expandKeys.length > 0 ? option.expandKeys[0] : []
            if(option.expandKeys.length > 0){
                option.expandKeys.map((element,index)=>{
                    if(element){
                        return ExpandedKeys = element
                    }
                })
            }else{
                ExpandedKeys = ''
            }
        state = dr.setterByField(state, 'deptExpandedKeys', fromJS([ExpandedKeys]))
        if(ExpandedKeys){
            state = dr.setterByField(state, selectedKeysPath, fromJS(ExpandedKeys))
        }else{
            state = dr.setterByField(state, selectedKeysPath, [] )
        }
    }
    return dr.onEvent(state, eventName, option)
}

Object.assign(exports, {...dr,...exports})
