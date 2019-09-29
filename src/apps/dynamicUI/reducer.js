import Immutable,{ Map, List } from 'immutable'
import * as util from './util'
import * as validate from './validate'

export function initView(state, payload, utils) {
    let meta = Immutable.fromJS(payload.meta),
        data = Immutable.fromJS(payload.data)

    return initViewByImmutable(state, {...payload, meta, data}, utils)
}
                
export function initViewByImmutable(state, payload, utils) {
    let meta = payload.meta,
        data = payload.data,
        event = payload.event
    
    utils = Immutable.fromJS(utils)
    let keys = []
    state.mapKeys(key=> {
        if(key.indexOf('@@') === -1  && key.indexOf('=') == -1) 
            keys.push(key)
    })

    keys.forEach(key=>{
        state = state.remove(key)
    })

    state = state
        .set('meta', meta)
        .set('meta_runtime', meta)
        .set('data', data)
        .set('data_runtime', data)
        .set('event', event)
        .set('utils', utils)
        .set('parsedMeta', util.parseMeta(meta))
        .remove('global')

    if(payload.config){
        state = state.set('config', Immutable.fromJS(payload.config))
    }
    return state
}

export function loadData(state, path, data){
    if(!path){
        state = state.set('data', data).set('data_runtime', data).remove('global')
    }
    else{
        state = state.update('data', x => x.set(path, Immutable.fromJS(data)))
            .update('data_runtime', x => x.set(path,Immutable.fromJS(data)))
    }
    return state
}

export function reload(state, data){
    return state.set('data_runtime', data).remove('global')
}

export function onFieldChange(state, path, oldValue, newValue) {
    return  util.setter(state, path, 'value', newValue)
}

export function dataLoader(state, path, runtimePropertyName, data) {
    return state.setIn((`data.${path}_runtime.${runtimePropertyName}`).split('.'), data)
}

export function onFieldFocus(state, path) {
    return focus(state, path) //通过路径设置焦点
}

export function onEvent(state, eventName, option) {
    if(eventName === 'onGridSelectAll'){
        //选中所有行
        state = util.selectAllRows(state, option.path, option.selected)
    }

    return state
    // return focus(state, '') //取消焦点
}


export function getMessage(state){
    return state.getIn(['global','message'])
}

export function setMessage(state, message){//type, title, content, onOk, onCancel) {
    state = clearMessage(state)
    return state.setIn(['global','message'], Map(message))
}

export function clearMessage(state) {
    return state.setIn(['global','message'], undefined)
}

export function focus(state, path){
    return util.setter(state, 'meta', 'focusField', path) 
}

export function onTableFieldChange(state, value, key, column, type, path, transData, tableIndex, tableData, oldValue) {
    let stateApi = state.toJS().data_runtime,
        stateContent = stateApi.taxTable.tableDetail.dataJson.content,
        stateOldApi = state.toJS().data,
        stateData,// = stateApi.taxTable.tableDetail.dataJson.content.data,
        stateOldData,// = stateOldApi.taxTable.tableDetail.dataJson.content.data,
        changeDatas,// = stateApi.taxTable.tableDetail.dataJson.content,//.changeDatas,
        dynamicData,// = stateApi.taxTable.tableDetail.dataJson.content,//.dynamicData,
        changeName,//oldValue,
        formStringDataMap

    if(stateContent.length===undefined){//单表
        stateData = stateContent.data
        stateData = !!tableData ? tableData.data : stateData
        changeDatas = stateContent.changeDatas
        dynamicData = stateContent.dynamicData
    }else{
        for(let i=0;i<stateContent.length;i++){
            let item = stateContent[i],
                tempTransData = item.transData,
                status = tempTransData.filter(o=>{
                    return column == o.key
                })

            if(!!status){
                stateData = item.data
                changeDatas = item.changeDatas
                dynamicData = item.dynamicData
                break
            }
        }
    }

    if(!stateOldApi.taxTable.tableDetail){
        stateOldData = undefined
    }else{
        let oldContent = stateOldApi.taxTable.tableDetail.dataJson.content

        if(oldContent.length===undefined){//单表
            stateOldData = oldContent.data
        }else{
            for(let i=0;i<oldContent.length;i++){
                let item = oldContent[i],
                    tempTransData = item.transData,
                    status = tempTransData.filter(o=>{
                        return column == o.key
                    })

                if(!!status){
                    stateOldData = item.data
                    break
                }
            }
        }
    }

    if(!changeDatas) {
        changeDatas = {}
    }
    if(type) {
        let curValue = stateData[key][column],
            // newValue = value?value.format("YYYY-MM"):undefined
            newValue = value
        if(type=='start') {
            if(!curValue) {
                curValue = newValue +'~'
            } else {
                curValue = newValue +'~'+curValue.split('~')[1]
            }
        } else if(type=='end') {
            if(!curValue) {
                curValue = '~' + newValue 
            } else {
                curValue = curValue.split('~')[0] +'~'+ newValue
            }
        } else if(type=='date') {
            // curValue = value?value.format("YYYY-MM-DD"):undefined
            curValue = value
            
        } else if(type=='month') {
            // curValue = value?value.format("YYYY-MM"):undefined
            curValue = value
            
        } else if(type=='radio') {
            curValue = value.target.value
        } else if (type == 'Radioinput'){
            curValue = {
                value : newValue,
                memo:''
            }
        } else if (type == 'radioInput' || type == 'doubleInputMemo') {
            formStringDataMap = stateContent.formStringDataMap
            curValue.memo = newValue
        } else if (type == 'doubleInputValue') {
            !!curValue ? curValue.value = newValue : curValue = {value: newValue,memo: ''}
        } else{
            curValue = newValue
        }
        stateData[key][column] = curValue
        //oldValue = stateOldData ? stateOldData[key][column] : undefined
        transData.map(o => {
            if(o.key == column) {
                let rowStr = (key-0+1)<10?'0'+(key-0+1):(key-0+1)+''
                changeName = 'r'+rowStr+'c'+o.indexStr
            }
        })
        if (!!formStringDataMap){
            stateApi.taxTable.tableDetail.dataJson.content.formStringDataMap[changeName] = curValue.memo
        }
        changeDatas[changeName] = curValue
        dynamicData[changeName] = typeof (curValue) == 'object' ? curValue.value : curValue
    } else {

        // stateData[key][column]=(typeof value=='string')?value:value.target.value
        stateData[key][column]=value
        //oldValue = stateOldData ? stateOldData[key][column] : undefined
        //将修改过的数据存储起来
        transData.map(o => {
            if(o.key == column) {
                let rowStr = (key-0+1)<10?'0'+(key-0+1):(key-0+1)+''
                changeName = 'r'+rowStr+'c'+o.indexStr
            }
        })
        // changeDatas[changeName] = (typeof value=='string')?value:value.target.value
        // dynamicData[changeName] = (typeof value=='string')?value:value.target.value
        changeDatas[changeName] = value
        dynamicData[changeName] = value
    }

    if(stateContent.length===undefined){
        stateApi.taxTable.tableDetail.dataJson.content.changeDatas = changeDatas
        stateApi.taxTable.tableDetail.dataJson.content.dynamicData = dynamicData
        stateApi.taxTable.tableDetail.dataJson.content.data = stateData
    }else{
        for(let i=0;i<stateContent.length;i++){
            let item = stateContent[i],
                tempTransData = item.transData,
                status = tempTransData.filter(o=>{
                    return column == o.key
                })

            if(!!status){
                item.changeDatas = changeDatas
                item.dynamicData = dynamicData
                item.data = stateData
                break
            }
        }
        stateApi.taxTable.tableDetail.dataJson.content = stateContent
    }

    state = state.setIn([`data_runtime`], Immutable.fromJS(stateApi) )

    return state
}

export function onItemFieldChange(state, value, item,type) {
    let stateApi = state.toJS().data_runtime,
        stateOldApi = state.toJS().data,
        stateParamsData = stateApi.taxTable.tableDetail.dataJson.paramsData,
        stateOldParamsData = stateOldApi.taxTable.tableDetail.dataJson.paramsData,
        changeName,oldValue

    if(item.component=="MonthRangePicker") {
        let curValue = stateParamsData[item.bindField],
            newValue = value
        if(type=='start') {
            if(!curValue) {
                curValue = newValue +'~'
            } else {
                curValue = newValue +'~'+curValue.split('~')[1]
            }
        } else if(type=='end') {
            if(!curValue) {
                curValue = '~' + newValue 
            } else {
                curValue = curValue.split('~')[0] +'~'+ newValue
            }
        }
        stateParamsData[item.bindField] = curValue
        
    } else {
        stateParamsData[item.bindField] = value
    }
    stateApi.taxTable.tableDetail.dataJson.paramsData = stateParamsData
    state = state.setIn([`data_runtime`], Immutable.fromJS(stateApi) )
    return state
}

Object.assign(exports, {...util, ...validate, ...exports })
