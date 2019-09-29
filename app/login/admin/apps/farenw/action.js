import * as da from 'dynamicAction'
import * as api from './api'
import webapi from 'webapi'
import moment from 'moment'


export function onOk(cb){
    return injectFuns => {
        let { post } = injectFuns,{ validate,getterByField} = da
        let obj=da.getterByField('form')(injectFuns)
		
		webapi.farenw.updateCounselCountById(injectFuns.post,obj).then(data =>{
	            if (!da.handleWebApiException(data)(injectFuns)) return
	            cb( {result:true} )
	    }) 

		
    }
}


export function initView(initData) {
    return injectFuns => {	
    	let { getterByField,handleWebApiException } = da,
    		{ reduct, post, getContext } = injectFuns	
    	da.initView({meta:api.getMeta(), data:api.getData()}, exports)(injectFuns)

    	if(initData){
    		injectFuns.reduce('setData',initData)
    	} 	
    }
}
// export function onOk(cb){
//     return injectFuns => {
//         let { post } = injectFuns,{ validate,getterByField} = da
//         if (!validate('operationAdd.operationAddList')(injectFuns)) {
//             cb({result: false})
//             return
//         }
//         let list={},
//         	mobile=da.getterByField('form.phone')(injectFuns),
//         	roleId=da.getterByField('form.role')(injectFuns).get('id'),
//         	initData=da.getterByField('initData')(injectFuns)       
//         list.roleId = roleId
//         if(initData){
//         	list.id = initData.id
//         	webapi.operate.roleUpdate(injectFuns.post,list).then(data =>{
// 	            if (!da.handleWebApiException(data)(injectFuns)) return
// 	            cb( {result:true} )
// 	        }) 
//         }else{
//         	list.mobile = mobile
//         	webapi.operate.insertRole(injectFuns.post,list).then(data =>{
// 	            if (!da.handleWebApiException(data)(injectFuns)) return
// 	            cb( {result:true} )
// 	        }) 
//         }    	
//     }
// }
Object.assign(exports,{...da,...exports})