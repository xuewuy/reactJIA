import * as da from 'dynamicAction'
import * as api from './api'
import webapi from 'webapi'
import moment from 'moment'



export function initView(initData) {
    return injectFuns => {
    	let { handleWebApiException } = da,
    		{ reduct, post, getContext } = injectFuns,
            data = api.getData()
    	da.initView({meta:api.getMeta(), data:data}, exports)(injectFuns)
    }
}
export function onOk(cb){
    return injectFuns =>{
      return cb({result:true})
    } 
}

Object.assign(exports,{...da,...exports})