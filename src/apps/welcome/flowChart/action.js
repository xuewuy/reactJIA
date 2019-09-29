import * as da from 'dynamicAction'
import * as api from './api'
import webapi from 'webapi'

export function initView() {
    return injectFuns => {
        let context = injectFuns.getContext(),
            roles = context.roles[0]
        api.data.roles = roles
        api.data.from.status = roles.code || '001'
        da.initView({ meta: api.meta, data: api.data }, exports)(injectFuns)
    }
}
export function btnClick(type){
    return injectFuns=>{
        injectFuns.reduce('btnClick',type)
    }
}
Object.assign(exports, {...da, ...exports})
