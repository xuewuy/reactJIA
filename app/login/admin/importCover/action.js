import * as da from 'dynamicAction'
import * as api from './api'
import moment from 'moment'
import webapi from 'webapi'
import React from 'react'

export function initView(initData){
	return injectFuns =>{
        let {getterByField} = da,
            meta = api.getMeta(),
            data = api.getData()
        
        da.initView( {meta:meta,data:data},exports)(injectFuns)
        setInitData()(injectFuns)
	}
}

export function setInitData() {
    return injectFuns => {
        let {initView, setMessage, clearMessage} = da,
            {reduce, post} = injectFuns
        webapi.dz.queryUser(post).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            reduce('setInitData',data.value)
        })
    }
}

export function onFieldChange(path, oldValue, newValue) {
    return injectFuns => {
        let {reduce, post, getContext, setContext} = injectFuns

        if(path.indexOf('importCover.fromItems.businessUser')!=-1) {
            webapi.dz.queryOrg(post,{userId:newValue.get('id'),dzOrgId:1}).then(data => {
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                reduce('setBookList',data.value,newValue,path)

            })
        } else if (path.indexOf('importCover.fromItems.businessItem')!=-1) {
            da.onFieldChange(path, oldValue, newValue)(injectFuns)
            
        } else {
            da.onFieldChange(path, oldValue, newValue)(injectFuns)

        }
    }
}

export function importReturn(data) {
    return injectFuns => {
        if (!da.handleWebApiInfo(data)(injectFuns)) return
        if(data.value&&data.value.errorList&&data.value.errorList.length) {
            da.setMessage({
                type: 'warning',
                content: getDisplayErrorMSg(data.value.errorList),
                mode: 'message'
            })(injectFuns)
        } else {

            da.setMessage({
                type: 'success',
                content: '导入成功',
                mode: 'message'
            })(injectFuns)
        }
        injectFuns.reduce('emptyData')
    }
}
function getDisplayErrorMSg(errorMsg) {
	return <div style={{ display: 'inline-table' }}>
		{
			errorMsg.map(item => <div>{item.errorMsg}<br /></div>)
		}
	</div>
}
export function importReturnFirst(data) {
    return injectFuns => {
        if (!da.handleWebApiInfo(data)(injectFuns)) return
        da.setMessage({
            type: 'success',
            content: '导入成功',
            mode: 'message'
        })(injectFuns)
        // injectFuns.reduce('emptyData')
    }
}

Object.assign(exports, {...da, ...exports})
