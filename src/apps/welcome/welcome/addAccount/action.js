/**
 * Created by shenxy on 16/8/26.
 */
import * as da from 'dynamicAction'
import * as api from './api'
import { List, fromJS } from 'immutable'
import webapi from 'webapi'
import moment from 'moment'

export function initView(initData) {
    return injectFuns => {
        let data = api.getData(),
            { handleWebApiInfo } = da, { post, reduce } = injectFuns
        /* if (window.location.href.indexOf('?dev') == -1){
            data.meta.childrens[0].childrens.splice(9, 1)
        } */
        da.initView(data, exports)(injectFuns)
        setInitData(initData)(injectFuns)
    }
}
export function setInitData(initData) {
    return injectFuns => {
        let { handleWebApiInfo } = da, { post, reduce } = injectFuns,
            list,
            qaram = {id: initData.id}
        // webapi.acmReport.getEnumDetail(post,['vatTaxpayer','industry','accountingStandards','businessIncomeTaxMode','checkMode']).then(data => {
        //     if (!da.handleWebApiInfo(data)(injectFuns)) return
        //     list = data.value
        //     return webapi.acmReport.queryById(post,qaram)
        // }).then(data => {
        //     if (!da.handleWebApiInfo(data)(injectFuns)) return
        //     reduce('setInitData',list,data.value,initData)
        // })
        reduce('setInitData',initData.formList,initData.formInfo,initData.obj)

    }
}

export function onFieldChange(path, oldValue, newValue) {
    return injectFuns => {
        let {reduce, post, getContext, setContext} = injectFuns,
            { handleWebApiInfo } = da,
            context = getContext(),
            currentOrg = context.currentOrg,
            enabledYear = currentOrg.enabledYear||'',
            enabledMonth = currentOrg.enabledMonth||'',
            list = {}
        reduce('onFieldFocus', '') //清空焦点
        da.onFieldChange(path, oldValue, newValue)(injectFuns)
        if( path === 'form.formItems.name'){
            webapi.dz.updateCheckName(injectFuns.post,{id:null,orgName:newValue}).then(data=>{
                if(!data.result && data.error){
                    da.setValidate(path, '账套名称已经存在！')(injectFuns)
                }
            })
        } else if(path === 'form.formItems.industry'){
            if(newValue.get('id') == '1005'){
                injectFuns.reduce('setAccountingStandards',true)
            }else{
                injectFuns.reduce('setAccountingStandards',false)
            }
        }
    }
}

export function onOk(cb){
    return injectFuns =>{

        let {initView,validate, setMessage, clearMessage, getterByField,setterByField,setValidate} = da,
            {post} = injectFuns
        // da.showLoadingMask({content:'正在建账...'})(injectFuns)
        // da.showLoadingMask({content:'正在建账...'})
        // if (!da.validate('form.formItems.name')(injectFuns)) {
        //     da.hideLoadingMask()
        //     return
        // }
        injectFuns.reduce('onFieldFocus', '') //清空焦点

        let form = da.getterByField('form')(injectFuns).toJS(),
            list = {
                id : form.id,
                industry : form.industry.id,
                name : form.name,
                // isSmallOrg : form.isSmallOrg.id,
                checkMode: form.checkMode.id,
                vatMode: form.businessIncomeTaxMode.id,
                vatTaxpayer: form.vatTaxpayer.id,
                enabledYear: form.enabledDate.split('-')[0]-0,
                enabledMonth: form.enabledDate.split('-')[1]-0,
                accountingStandards: form.accountingStandards.id,
                busLicensePath: form.fileImg && form.fileImg[0].src.replace('/v1/img/','')
            }
        webapi.dz.updateCheckName(injectFuns.post,{id:form.id,name:form.name}).then(data=>{
            if(!data.result && data.error){
                da.setValidate('form.formItems.name', '账套名称已经存在！')(injectFuns)
            } else {
                da.showLoadingMask({content:'正在建账...'})(injectFuns)
                return webapi.acmReport.createAccounts(post,list)
            }
        }).then(data=>{
            if (!da.handleWebApiInfo(data)(injectFuns)){
                cb({result:true,error:data.error})
                return da.hideLoadingMask()(injectFuns)
            }
            da.hideLoadingMask()(injectFuns)
            cb({result: true,orgId:data.value.orgId})
        })
    }
}

export function onCancel(cb){
    return injectFuns=>{
        let fileImg = da.getterByField('form.fileImg')(injectFuns)
        if (fileImg && fileImg.get(0) && fileImg.get(0).get('src')){
            webapi.identity.deleteImg(injectFuns.post, fileImg.get(0).get('name')).then(data=>{
                cb(data)
            })
        }else{
            cb({result:true,value:true})
        }
    }
}

export function onEvent(eventName, option) {
    return injectFuns => {
        if (eventName === 'attachementVisible' && option.path) {
            injectFuns.reduce('isShow', option.visible)
        } else if (eventName === 'attachementChange' && option.path) {
            // debugger
            injectFuns.reduce('upload', option.value.fileList)
        }else{
            da.onEvent(eventName, option)(injectFuns)
        }
    }
}

Object.assign(exports, {...da, ...exports})
