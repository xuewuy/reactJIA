import * as da from 'dynamicAction'
import * as api from './api'
import webapi from 'webapi'

export function initView(client){
	return injectFuns =>{
        let data = api.data,
            org = client.client
        data.form.createTime = org.createTime && org.createTime.split(' ')[0]
        data.form.creatorName = org.creatorName
        data.form.creatorMobile = org.creatorMobile
        data.form.expireTime = org.expireTime && org.expireTime.split(' ')[0]
        data.form.id = org.id
        data.form.memo = org.memo
        data.form.maxOrgCount = org.maxOrgCount
        data.form.version = {id:org.version}
        data.oldVersion = data.form.version
        data.isDz = client.isDz
        data.currOrgCount = 0
        data.appId = org.appId
        data.client = org
        data.form.clientAppId = org.appId == 100 ? {id:100} : {id:org.appId}
        da.setMetaProperty(api.meta, 'editOrg.fromItems.maxOrgCount.visible', !!client.isDz)
        da.setMetaProperty(api.meta, 'editOrg.fromItems.version.visible', !client.isDz)
        if(org.version == 3 && data.appId == 100){
            da.setMetaProperty(api.meta,'editOrg.fromItems.dzList.visible',true)
            da.setMetaProperty(api.meta,'editOrg.fromItems.dzRules.visible',false)
        }else{
            da.setMetaProperty(api.meta,'editOrg.fromItems.dzList.visible',false)
            da.setMetaProperty(api.meta,'editOrg.fromItems.dzRules.visible',false)
        }
        if(client.isDz){
            da.setMetaProperty(api.meta,'editOrg.fromItems.clientAppId.visible',false)
            // da.setMetaProperty(api.meta,'editOrg.fromItems.expireTime.disabled',false)
        }else{
            // if(client.client.source && client.client.source == 1){
            //     da.setMetaProperty(api.meta,'editOrg.fromItems.expireTime.disabled',false)
            // }else{
            //     da.setMetaProperty(api.meta,'editOrg.fromItems.expireTime.disabled',true)
            // }
            // da.setMetaProperty(api.meta,'editOrg.fromItems.expireTime.disabled',true)
            da.setMetaProperty(api.meta,'editOrg.fromItems.clientAppId.visible',true)
            let dataSource = client.appList && client.appList.size >1 ? client.appList.toJS().slice(1) :client.appList.toJS() 
            da.setMetaProperty(api.meta, 'editOrg.fromItems.clientAppId.dataSource', dataSource || [{id:1,name:'111'},{id:2,name:'222'}])
        }
        /**
         * [获取服务商列表]
         * @param  {[type]} ajaxData [description]
         * @return {[type]}          [description]
         */
        webapi.org.queryServiceProvider(injectFuns.post,org.id).then(ajaxData=>{
            if (!da.handleWebApiInfo(ajaxData)(injectFuns)) return
            da.setMetaProperty(api.meta, 'editOrg.fromItems.dzList.dataSource', ajaxData.value.spOrgList)
            
            /*如果接口返回当前选中的所属服务商就用接口给的如果没有返回直接用服务商列表的第一个*/
            data.form.dzList = ajaxData.value.spOrg ? {id:ajaxData.value.spOrg} : ajaxData.value.spOrgList[0]
            /*根据当前选中的服务商从服务商列表中查找到该服务商所剩余的账套数*/
            let currOrgArr = ajaxData.value.spOrg ? ajaxData.value.spOrgList.filter(o=>o.id == ajaxData.value.spOrg) : []
            data.currOrgCount = currOrgArr.length > 0 ? currOrgArr[0].availableOrgCount : data.form.dzList ? data.form.dzList.availableOrgCount : null
            /*缓存页面加载时所属服务商信息，以后点击保存时用*/
            data.oldSpOrg = data.form.dzList
            /**
             * 获取服务商权限
             */
            return webapi.org.querySubscription(injectFuns.post,org.id)   
        }).then(ajaxData=>{
            if(ajaxData){
                data.form.dzRules = {id:ajaxData.value || 1}
                da.initView( {meta:api.meta,data:data},exports)(injectFuns)
            }else{
                data.form.dzRules = {id:1}
                da.initView( {meta:api.meta,data:data},exports)(injectFuns)
            }
            
        })
	}
}

export function onOk(callback) {
    return injectFuns=> {
        let {getterByField} = da,
            form = getterByField('form')(injectFuns),
            isDz = getterByField('isDz')(injectFuns),
            oldSpOrg = getterByField('oldSpOrg')(injectFuns),
            currOrgCount = getterByField('currOrgCount')(injectFuns),
            oldVersion = getterByField('oldVersion')(injectFuns),
            appId = getterByField('appId')(injectFuns),
            client = getterByField('client')(injectFuns),
            formList = {},
            // domain = window.location.host.split(':')[0]
            domain = da.getDomain()(injectFuns)
        if(isDz){//服务商管理
            formList = {
                id:form.get('id'),
                expireTime:form.get('expireTime') + ' 23:59:59',
                memo:form.get('memo')===null?'':form.get('memo'),
                maxOrgCount:form.get('maxOrgCount')-0,
                orgType:1,
                source:1,
                'domain':domain
            }

            webapi.dz.updateManageInfo(injectFuns.post,formList).then(data=>{
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                callback(data)
            })
        }else{//企业管理
            formList = {
                id:form.get('id'),
                expireTime:form.get('expireTime') + ' 23:59:59',
                memo:form.get('memo'),
                version:form.get('version').get('id'),
                appId:form.get('clientAppId') == 100 ? 100 : form.get('clientAppId').get('id')
            }
            if( formList.version == 3 && appId!=1000){//如果选中服务版并且必须是易嘉人（账无忌不处理）检测下当前选中的服务商中所剩的账套数，如果小于1不让保存
                if(form.get('dzList') && form.get('dzList').get('id') != oldSpOrg.get('id') && currOrgCount < 1){
                    return da.setMessage({type:'error' , mode:'message' , content:'该服务商剩余账套数为0'})(injectFuns)
                }
            }
            if(client.get('source') && client.get('source') == 1){
                formList.source = client.get('source')
            }
            if(oldVersion.get('id') != formList.version && formList.version == 3 && appId != 1000){
                if(currOrgCount < 1) return da.setMessage({type:'error' , mode:'message' , content:'该服务商剩余账套数为0'})(injectFuns)
            }
            webapi.org.updateExpireTime(injectFuns.post,formList).then(data=>{
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                let postObj = {orgId:form.get('id'),version:formList.version}
                if(formList.version == 3 && appId != 1000){/*对账无忌特殊处理暂时不处理*/
                    postObj.spOrgId = form.get('dzList') && form.get('dzList').get('id')
                    postObj.auth = form.get('dzRules') && form.get('dzRules').get('id')
                }
                return webapi.org.updateByOrgId(injectFuns.post,postObj)
            }).then(data=>{
                if(!data) return
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                callback(data)
            })
        }
    }
}

export function onFieldChange(path, oldValue, newValue) {
    return injectFuns => {
        da.onFieldChange(path, oldValue, newValue)(injectFuns)
        if(path === 'editOrg.fromItems.version'){
            let appId = da.getterByField('appId')(injectFuns)
            if(newValue.get('id') == 3 && appId == 100){
                injectFuns.reduce('setDzList',true)
            }else{
                injectFuns.reduce('setDzList',false)
            }
        }
        if(path == 'editOrg.fromItems.dzList'){
            injectFuns.reduce('setCurrOrgCunt')
        }
    }
}

Object.assign(exports, {...da, ...exports})
