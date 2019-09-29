import * as da from 'dynamicAction'
import Immutable, { Map } from 'immutable'
import * as api from './api'
import webapi from 'webapi'


/**
 * [初始化视图]
 * @return {[type]} [无返回值]
 */
export function initView(initData) {
    return injectFuns => {
        let meta = api.meta,
            data = api.data,
            { handleWebApiInfo,getterByField } = da, { post, reduce, getContext } = injectFuns
        //data.orgName = getContext().currentOrg.name
        let newData = initData
        data.subject = newData.subject
        data.queryParams = newData.queryParams
        da.initView({ meta, data }, exports)(injectFuns)



    }
}

export function onOk(cb) {
    return injectFuns => {
        let { handleWebApiInfo,getterByField,validate } = da,
        data = da.getterByField()(injectFuns).toJS()
        if (!validate('mailForm.formItems.addressee')(injectFuns)) return
        if (!validate('mailForm.formItems.subject')(injectFuns)) return
        if (!validate('mailForm.formItems.copyTo')(injectFuns)) return
        let retData = {
            "account":data.addressee,
            "subject":data.subject,
            "ccAccount":data.copyTo,
            "content":document.querySelector('.mail-content').innerHTML
        }
        cb({ result: true, value: retData })
    }
}
export function onFieldChange(path,oldValue,newValue){
    return injectFuns =>{
        let { handleWebApiInfo,getterByField,validate } = da,
        { post, reduce, getContext } = injectFuns
        da.onFieldChange(path, oldValue, newValue)(injectFuns)
        if(path === 'mailForm.formItems.addressee'){
            if (!validate('mailForm.formItems.addressee')(injectFuns)) return
            reduce('setAddressee',newValue)
        }else if(path ===  'mailForm.formItems.copyTo'){
            if (!validate('mailForm.formItems.copyTo')(injectFuns)) return
            reduce('setCopyTo',newValue)
        }else if(path ===  'mailForm.formItems.subject'){
            reduce('setSubject',newValue)
        }
    }
}
/*export function print(){
    return injectFuns=>{
        let url = '/v1/acmReport/InOutDiary/print',
            queryParams = da.getterByField('queryParams')(injectFuns).toJS()
        queryParams.filename = '收支统计表.pdf'
        webapi.currentReport.printPdf(injectFuns.formPost,queryParams)
    }
}*/
Object.assign(exports, {...da, ...exports })
