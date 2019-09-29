import * as da from 'dynamicAction'
import * as api from './api'
import webapi from 'webapi'

export function initView(initData){
    return injectFuns =>{
           let appList = null,productList = null,
               initialData = api.data
               initialData.form.orderId = initData  ? initData.id : ''
               initialData.form.orgName = initData  ? initData.orgName : ''
           
           webapi.order.getByOrgName(injectFuns.post, {'orgName' : initData.orgName}).then(data => {
             if(data){
               initialData.form.orgName = data.value.orgName 
               initialData.form.orgContacts = data.value.orgContacts
               initialData.form.orgContactTel = data.value.orgContactTel 
               initialData.form.orgContactsIdentityNo = data.value.orgContactsIdentityNo
               initialData.form.orgCode =  data.value.orgCode 
               initialData.form.orgAddress = data.value.orgAddress 
             }
           })
           da.initView( {meta:api.meta,data:initialData},exports)(injectFuns)   
    }
   }

   export function onOk(cb) {
    return injectFuns => {
        if (!da.validate('contarctSiging')(injectFuns)) return
        let fromData = da.getterByField('form')(injectFuns).toJS()

        fromData.hostname = window.location.origin
        fromData.orgContactsIdentityNo = '' + fromData.orgContactsIdentityNo

        webapi.order.contractSave(injectFuns.formPost, fromData)
        cb({result: true})
       
    }
}



Object.assign(exports, {...da, ...exports})
