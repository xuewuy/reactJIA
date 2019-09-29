import * as da from 'dynamicAction'
import * as api from './api'
import webapi from 'webapi'

export function initView(id) {
    return injectFuns => {
        webapi.web.getVersionList(injectFuns.post).then(data=>{
            let value = data.value,
                initData = {
                    form:value,
                    activeVersionId:id
                }
            da.initView({meta:api.meta,data:initData}, exports)(injectFuns)
        })
    }
}

export function moreClick(id){
    return injectFuns=>{
        injectFuns.reduce('moreClick',id)
    }
}

Object.assign(exports, {...da, ...exports})