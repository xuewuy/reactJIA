import Immutable, { Map, List, fromJS } from 'immutable'
import React,{ Component,PropTypes } from 'react'
import {modal as Modal } from './modal'
import {LoadingMask, Message, ZModal } from 'xComponent'
import { AppLoader } from 'appLoader'

import * as util from './util'

/**
 * [初始化视图]
 * @param  {[type]} payload [description]
 * @param  {[type]} exps    [description]
 * @return {[type]}         [description]
 */
export function initView(payload, exps) {
    return (injectFuns) => {
        injectFuns.reduce('initView', payload,  getUtils(exps, injectFuns))
    }
}

export function initViewByImmutable(payload, exps) {
    return (injectFuns) => {
        injectFuns.reduce('initViewByImmutable', payload, getUtils(exps, injectFuns))
    }
}

export function getUtils(exps, injectFuns) {
    return {
        getter: (path, propertys) => {
            return exps.getter(path, propertys)(injectFuns)
        },
        getterByField: (fieldPath) => {
            return exps.getterByField(fieldPath)(injectFuns)
        },
        getterByAjax:(path, property, onSuccess)=>{
            return exps.getterByAjax(path, postData, onSuccess)(injectFuns)
        },
        actions: exps
    }
}


/**
 * [通过控件路径获取元数据或者值]
 * @param  {[type]} path      [路径]
 * @param  {[type]} propertys [要获取哪些哪些属性值]
 * @return {[type]}           [如果获取的是多个属性返回类型immutable map]
 */
export function getter(path, propertys) {
    return ({ getState }) => {
        return util.getter(getState(), path, propertys)
    }
}

/**
 * [通过字段路径获取值]
 * @param  {[type]} fieldPath [字段路径]
 * @return {[type]}           [值]
 */
export function getterByField(fieldPath) {
    return ({ getState }) => {
        return util.getterByField(getState(), fieldPath)
    }
}

export function getterByAjax(path, property, onSuccess){
    return injectFuns=>{
        throw '没实现getterByAjax'
    }
}

/**
 * [字段录入修改事件]
 * @param  {[type]} path     [路径]
 * @param  {[type]} oldValue [旧值]
 * @param  {[type]} newValue [新值]
 * @return {[type]}          [无]
 */
export function onFieldChange(path, oldValue, newValue) {
    //console.log(path + '-' + oldValue + '-' + newValue)
    return ({ reduce }) => {
        reduce('onFieldChange', path, oldValue, newValue)
    }
}

/**
 * [字段焦点发生变化事件]
 * @param  {[type]} path [路径]
 * @return {[type]}      [无]
 */
export function onFieldFocus(path) {
    return ({ reduce }) => {
        reduce('onFieldFocus', path)
    }
}


/**
 * [手动触发校验]
 * @param  {[type]} path [校验路径]
 * @return {[type]}      [description]
 */
export function validate(path) {
    return (injectFuns) => {
        let { reduce, getState } = injectFuns
        clearValidate(path)(injectFuns)
        let oldState = getState()
        reduce('validate', path)
        let newState = getState()
        return oldState === newState
    }
}

/**
 * [设置消息]
 * @param {[type]} type     [description]
 * @param {[type]} title    [description]
 * @param {[type]} content  [description]
 * @param {[type]} onOk     [description]
 * @param {[type]} onCancel [description]
 */
export function setMessage(message){//title, content, onOk, onCancel) {
    return ({ reduce }) => {

        if(message.mode == 'message' || message.type == 'confirm'){
            Modal(fromJS(message))
            return
        }
        message.mode =="app" && window._hmt && _hmt.push && _hmt.push(['_trackPageview', '/' + message.content.substr(4)]) //百度统计单页应用接口。
        reduce('setMessage', message)

        /*
        if (message.mode == 'message') {
            setTimeout(()=>{
                reduce('clearMessage')
            }, 10)
        }*/
    }
}

export function modal(option){
    return async injectFuns=>{
        if(option.app){
            option.children = (
                <AppLoader 
                    path={option.app} 
                    initData={option.initData} 
                    store ={option.store}
                    footer={option.footer} 
                />
            )
        }

        let ok = await ZModal.show(option) 
        return Promise.resolve(ok)
    }
}

export function toast(content, type = 'error', mode = 'message' ){
    return injectFuns=>{
        setMessage({
            type,
            mode,
            content
        })(injectFuns)
    }
}

export function confirm(title, content){
    return injectFuns=>{
        return new Promise((resolve, reject)=>{
            setMessage({
                type :'confirm',
                mode:'message',
                title,
                content,
                onOk:()=>resolve(true),
                onCancel:()=>resolve(false)
            })(injectFuns)    
        })
    }
}

/**
 * [设置校验信息]
 * @param {[type]} path    [description]
 * @param {[type]} message [description]
 */
export function setValidate(path, message) {
    return ({ reduce }) => {
        reduce('setValidate', path, message)
    }
}

/**
 * [清空校验信息]
 * @param  {[type]} path [description]
 * @return {[type]}      [description]
 */
export function clearValidate(path) {
    return ({ reduce }) => {
        reduce('clearValidate', path)
    }
}

/**
 * [清空消息]
 * @return {[type]} [description]
 */
export function clearMessage() {
    return ({ reduce }) => {
        reduce('clearMessage')
    }
}

/**
 * [懒加载]
 * @param  {[type]} path     [路径]
 * @param  {[type]} property [属性]
 * @return {[type]}          [description]
 */
export function lazyLoad(path, property) {
    return ({ reduce }) => {
        //reduce('setter', path, property, List())
    }
}

/**
 * [获取state toJson]
 * @param  {[type]} path [路径]
 * @return {[type]}      [json]
 */
export function getJson(path) {
    return ({ getState }) => {
        return util.getJson(getState(), path)
    }
}

/**
 * [增孙表行]
 * @param {[type]} path    [description]
 * @param {[type]} rowData [description]
 */
export function addChildRow(path, rowData) {
    return ({ reduce }) => {
        reduce('addChildRow', path, rowData)
    }
}

/**
 * [删孙表行]
 * @param {[type]} path    [description]
 * @param {[type]} rowData [description]
 */
export function delChildRow(path) {
    return ({ reduce }) => {
        reduce('delChildRow', path)
    }
}



/**
 * [增行]
 * @param {[type]} path    [description]
 * @param {[type]} rowData [description]
 */
export function addRow(path, rowData) {
    return ({ reduce }) => {
        reduce('addRow', path, rowData)
    }
}

/**
 * [插入行]
 * @param  {[type]} path    [description]
 * @param  {[type]} rowData [description]
 * @return {[type]}         [description]
 */
export function insertRow(path, rowData) {
    return ({ reduce }) => {
        reduce('insertRow', path, rowData)
    }
}

/**
 * [删除行]
 * @param  {[type]} path [description]
 * @return {[type]}      [description]
 */
export function delRow(path) {
    return ({ reduce }) => {
        reduce('delRow', path)
    }
}

/**
 * [删除所有行]
 * @param  {[type]} path [description]
 * @return {[type]}      [description]
 */
export function delAllRow(path) {
    return ({ reduce }) => {
        reduce('delAllRow', path)
    }
}

/**
 * [删除选中行]
 * @param  {[type]} path [description]
 * @return {[type]}      [description]
 */
export function delSelectedRow(path) {
    return ({ reduce }) => {
        reduce('delSelectedRow', path)
    }
}

/**
 * [获取选中行]
 * @param  {[type]} path [description]
 * @return {[type]}      [description]
 */
export function getSelectedRows(path) {
    return ({ getState }) => {
        return util.getSelectedRows(getState(), path)
    }
}

export function getSelectedRowIndexs(path) {
    return ({ getState }) => {
        return util.getSelectedRowIndexs(getState(), path)
    }
}

export function onEvent(eventName, option) {
    return (injectFuns) => {
        let { reduce } = injectFuns

        if (eventName === "onDelRow") {
            delRow(option.path)(injectFuns) //删行，path:voucherDemo.form.tabs.details,0
        } else if (eventName === 'onAddRow') {
            addRow(option.path, getter(option.path, 'emptyRow')(injectFuns))(injectFuns) //增行
        } else if (eventName === 'onAddTenRow') {
            let emptyRow = getter(option.path, 'emptyRow')(injectFuns)
            for (let i = 0; i < 10; i++)
                addRow(option.path, emptyRow)(injectFuns) //增加行，path:voucherDemo.form.tabs.details
        } else if (eventName === 'onInsertRow') {
            insertRow(option.path, da.getter(option.path, 'emptyRow')(injectFuns))(injectFuns) //插入行，path:voucherDemo.form.tabs.details,1
        } else if (eventName === 'onDelAllRow') {

            delAllRow(option.path)(injectFuns) //删除所有行，path:voucherDemo.form.tabs.details
        } else if (eventName === 'onDelSelectedRow') {

            delSelectedRow(option.path)(injectFuns) //删除选中行，path:voucherDemo.form.tabs.details
        } else if (eventName === 'save') {
            alert(eventName)
                //da.validate(injectFuns,'sa03.form')
        } else if(eventName === 'onGridFilterChange'){
            if(!option.path) return
            let filterMeta = getter(option.path, 'filter')(injectFuns),
                valuePath = filterMeta.get('valuePath')

            reduce('setterByField', valuePath, option.value)

        }else if(eventName === 'onGridFilterReset'){
            if(!option.path) return
            let filterMeta = getter(option.path, 'filter')(injectFuns),
                valuePath = filterMeta.get('valuePath')

            reduce('setterByField', valuePath, undefined)
        }
        else {
             reduce('onEvent', eventName, option)
        }
    }
}

export function handleWebApiException(data){
    return injectFuns=>{

        return handleWebApiInfo(data)(injectFuns)
        /*
        if(!data.result){
            if(!data.error)
                return false

            setMessage({
                type: 'error',
                title: '错误',
                content: data.error.message,
                onOk: () => { clearMessage()(injectFuns) }
            })(injectFuns)

            return false
        }
        return true*/
    }
}

export function handleWebApiInfo(data, ignoreNullValue){
    return injectFuns=>{
        if (!data) {
            setMessage({
                type: 'error',
                mode: 'message',
                content: '网络异常~'
            })(injectFuns)

            return false
        }

        if(!data.result){
            if(!data.error)
                return false
            let duration = null,
                friendlyMsg = data.error.message,
                errorCode = data.error.code,
                errorType = data.error.type || 'error'
            if (errorCode && (errorCode == 400 || errorCode == 403 || errorCode == 404 ||
                errorCode == 500 || errorCode == 501 || errorCode == 502 || errorCode == 503)) {
                friendlyMsg = "服务器异常，请稍后再试!"
            }
            else if (errorCode >= 40000) {
                //服务端代码的异常, 使用服务端返回的message即可
            }
            //如果有调用堆栈信息，则显示最底层的易嘉人类名，增加显示时间为9秒。
            let exception = data.error.exception
            if(exception && exception.stackTrace && exception.stackTrace.length>0){
              let stack = exception.stackTrace.find(item=>item.className && item.className.indexOf("rrtimes")!=-1) || exception.stackTrace[0]
              duration = 9
              friendlyMsg += stack.className + '.' + stack.methodName+ ' 行号：' +  stack.lineNumber
            }

            setMessage({
                type: errorType,
                mode: 'message',
                duration: duration,
                content: friendlyMsg
            })(injectFuns)

            return false
        }

        if (!data.value && data.value !== '' && data.value !== false && data.value !== 0 && !ignoreNullValue) {
            setMessage({
                type: 'error',
                mode: 'message',
                content: '没有返回值~'
            })(injectFuns)

            return false
        }

        return true
    }
}

export function showLoadingMask(props){
    return injectFuns=>{
        LoadingMask.show(props)
    }
}

export function hideLoadingMask(){
    return injectFuns=>{
        LoadingMask.hide()
    }
}

export function getDomain(){
    return injectFuns=>{
        let location = window.location,
            search = location.search,
            host = location.host,
            hash = location.hash,
            domain
        if(search.indexOf('h=')!=-1) {
            domain = search.split('h=')[1]
            if(domain.indexOf('&')!=-1) {
                domain = domain.split('&')[0]
            }
        }
        // if(hash.indexOf('h=farenw')!=-1){
        //     domain = 'farenw'
        // }
        //  else if(hash.indexOf('h=')!=-1) {
        //     domain = hash.split('h=')[1]
        //     if(domain.indexOf('&')!=-1) {
        //         domain = domain.split('&')[0]
        //     }
        // }
        else {
            domain = location.host.split(':')[0]
        }
        return domain
    }
}

//新税款表格，改值触发
export function onTableFieldChange(value, key, column, type, path, transData, tableIndex, tableData, oldValue) {
    return ({ reduce }) => {
        
        reduce('onTableFieldChange', value, key, column, type, path, transData, tableIndex, tableData, oldValue)
    }
}

//
export function onItemFieldChange(value,item,type) {
    return ({ reduce }) => {
        
        reduce('onItemFieldChange', value,item,type)
    } 
}

Object.assign(exports, { match: util.match, parsePath: util.parsePath, setMetaProperty: util.setMetaProperty, ...exports })


/*
function getChangeset(getState, path){
	let v = getState().getIn(['data','saleDelivery']),
		status = getState().getIn(['data','saleDelivery_runtime', 'status'])
	if(isChanged(status)){
		let result = getChangesetJson( v, status)
		alert(JSON.stringify(result))
	}
	else{
		alert('没更改')
	}

}

function getChangesetJson(value, status){
	if(value instanceof Map){
		let result = {id: value.get('id'), status}
		value.keySeq().forEach(k => {
			let rv = value.get(k+"_runtime"),
				s = calcStatus(status, rv? rv.get('status') : null),
				c = isChanged(s),
				v = rv? (rv.get('value')||value.get(k)) : null
			if(c) {
				result[k] = getChangesetJson(v, s)
			}
		})
		return result
	}
	else if(value instanceof List){
		let result = []
		value.forEach(v=>{
			let rv = v.get('_runtime'),
				s = calcStatus(status, rv ? rv.get('status') : null),
				c = isChanged(s)
			if(c){
				result.push(getChangesetJson(v, s))
			}
		})
		return result
	}
	else{
		return value
	}
}

function calcStatus(oldStatus, newStatus){
	if(oldStatus === 'deleted' || oldStatus === 'added') return oldStatus
	return newStatus
}

function isChanged(status){
	return !(!status || status === 'nochanged' || status === 'empty')
}

*/

