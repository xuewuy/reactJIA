import * as da from 'dynamicAction'
import * as api from './api'
import webapi from 'webapi'

export function initView(orgInfo){
	return injectFuns =>{
        api.data.orgInfo = orgInfo
        da.initView({ meta: api.meta, data: api.data }, exports)(injectFuns)
	}
}

export function onOk(callback) {
    return injectFuns=> {
        let orgInfo = da.getterByField('orgInfo')(injectFuns),
            status = da.getterByField('status')(injectFuns),
            orgId = orgInfo.get('id')
        webapi.org.examine(injectFuns.post,{id:orgId,status:status}).then(data=>{
            callback(data)
            if (!da.handleWebApiInfo(data)(injectFuns)) return
        })
        
    }
}

export function radioChange(status) {
    return injectFuns => {
        injectFuns.reduce('radioChange',status)
    }
}

Object.assign(exports, {...da, ...exports})
