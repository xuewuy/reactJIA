import * as da from 'dynamicAction'
import * as api from './api'
import * as consts from './consts'
import moment from 'moment'
import webapi from 'webapi'

export function initView(initData){
	return injectFuns =>{
        let {getterByField} = da,
            meta = api.getMeta(),
            data = api.getData(),
            onlineOrder = api.onlineOrder,
            offlineOrder = api.offlineOrder,
            orderSource

        if(initData){
            orderSource = initData.orderSource
        }
//        if(orderSource == 1){
//            setOnLineInit(initData)(injectFuns)
            // meta.childrens.push(onlineOrder)
            // da.initView( {meta:meta,data:data},exports)(injectFuns)
//        }else{
            setOffLineInit(initData)(injectFuns)
//        }
	}
}

export function setOffLineInit(initData) {
    return injectFuns => {
        let {getterByField} = da,
            meta = api.getMeta(),
            data = api.getData(),
            onlineOrder = api.onlineOrder,
            offlineOrder = api.offlineOrder,
            isCreate = initData.isCreate,
            orderSource
        if(initData){
            orderSource = initData.orderSource
        }
        meta.childrens.push(offlineOrder)

        data.isCreate = initData.isCreate
        data.orderSource = initData.orderSource
        data.isSee = initData.isSee
        data.form.ts = initData.ts
        data.isYj = initData.isYj
        data.isOperators = initData.isOperators
        data.appInfo = initData.appInfo

        if(initData.isSee) {//查看 两种可能 线上 线下
            meta.childrens[0].childrens = meta.childrens[0].childrens.map( o => {
                o.disabled = true
                return o
            })
            data.form.mobile = initData.mobile
        } else {//编辑 和 创建
            if(!initData.isCreate) {// 编辑 两种可能 线上 线下
                meta.childrens[0].childrens = meta.childrens[0].childrens.map( o => {
                    if(initData.orderSource == 1) {
                        if( o.name == 'invoiceStatus') {
                            o.disabled = false
                        } else {
                            o.disabled = true
                        }
                    } else {
                        if(o.name == 'endDate' || o.name == 'payAmount' || o.name == 'invoiceStatus') {
                            o.disabled = false
                        } else {
                            o.disabled = true
                        }
                    }
                    return o
                })
                data.form.mobile = initData.mobile
            } else {// 创建 线下
                data.form.mobile = initData.mobile     
                data.form.org = initData.org                
                data.form.isPay = consts.orderType.xx             
                data.form.payType = consts.payType.xx             
                data.form.invoiceStatus = consts.invoiceStatus.wxfp           
                meta.childrens[0].childrens = meta.childrens[0].childrens.map( o => {
                    if(o.name == 'isPay') {
                        o.disabled = true
                    } else {
                        o.disabled = false
                    }
                    return o
                })
            }
        }
        da.initView( {meta:meta,data:data},exports)(injectFuns)
        if(!initData.isCreate){
            setInitData(initData,isCreate, orderSource)(injectFuns)
        }
    }
}

export function setOnLineInit(initData) {
    return injectFuns => {
        let {getterByField} = da,
            meta = api.getMeta(),
            data = api.getData(),
            onlineOrder = api.onlineOrder,
            offlineOrder = api.offlineOrder,
            isCreate = initData.isCreate,
            orderSource
        if(initData){
            orderSource = initData.orderSource
        }
        meta.childrens.push(onlineOrder)

        data.isCreate = initData.isCreate
        data.orderSource = initData.orderSource
        data.isSee = initData.isSee
        data.form.ts = initData.ts
        data.isYj = initData.isYj
        data.isOperators = initData.isOperators
        data.appInfo = initData.appInfo

        if(initData.isSee) {//查看 两种可能 线上 线下
            meta.childrens[0].childrens = meta.childrens[0].childrens.map( o => {
                o.disabled = true
                return o
            })
            data.form.mobile = initData.mobile
        } else {//编辑 和 创建
            if(!initData.isCreate) {// 编辑 两种可能 线上 线下
                meta.childrens[0].childrens = meta.childrens[0].childrens.map( o => {
                    if(o.name == 'isPay' || o.name == 'mobile' || o.name == 'org' || o.name == 'beginDate' || o.name == 'endDate' || o.name == 'payAmount' || o.name == 'payType') {
                        o.disabled = true
                    } else {
                        o.disabled = false
                    }
                    return o
                })
                data.form.mobile = initData.mobile
            } else {// 创建 线下
                // data.form.mobile = initData.mobile     
                // data.form.org = initData.org                
                 meta.childrens[0].childrens = meta.childrens[0].childrens.map( o => {
                     o.disabled = false
                     return o
                 })
            }
        }
        da.initView( {meta:meta,data:data},exports)(injectFuns)
        setInitOnLineData(initData,isCreate, orderSource)(injectFuns)
    }
}

export function setInitData(initData,isCreate,orderSource) {
    return injectFuns => {
        let {initView, setMessage, clearMessage} = da,
            {reduce, post} = injectFuns,
            list = {},
            orgListInfo,
            partnerList,
            appInfo = da.getterByField('appInfo')(injectFuns),
            mobile = da.getterByField('form.mobile')(injectFuns),
            createInfo,updateInfo,step,mobileInfo,serverList
        
        webapi.order.queryOrderDetailSwy(post,{id: initData.id}).then(data => {
            if(data) {
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                reduce('setInitData', data.value)
            }
        })
    }
}

export function setInitOnLineData(initData,isCreate,orderSource) {
    return injectFuns => {
        let {initView, setMessage, clearMessage} = da,
            {reduce, post} = injectFuns,
            list = {},
            orgListInfo,
            partnerList,
            appInfo = da.getterByField('appInfo')(injectFuns),
            mobile = da.getterByField('form.mobile')(injectFuns),
            createInfo,updateInfo,step,mobileInfo,serverList
        webapi.order.queryOnlineOrderDetailSwy(post,{id: initData.id}).then(data => {
            if(data) {
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                reduce('setInitOnLineData', data.value)
            }
        })
    }
}

export function onFieldChange(path, oldValue, newValue) {
    return injectFuns => {
        let {initView, setMessage, clearMessage} = da,
            {reduce, post} = injectFuns
        if(path.indexOf('orderManageForm.offlineOrder.mobile')!=-1) {
            da.onFieldChange(path, oldValue, newValue)(injectFuns)
            if (!da.validate('orderManageForm.offlineOrder.mobile')(injectFuns)) return
            if(newValue=='') {
                reduce('setMobile',newValue)
                return 
            }
            webapi.order.getUserIdByMobile(post,{mobile:(newValue?newValue:'')}).then(data => {
                if(!data.result) {
                    da.setMessage({
                        type: 'warning',
                        content: data.value,
                        mode: 'message'
                    })(injectFuns)
                    reduce('setMobile',newValue)
                    return 
                }  else if(data.result && !data.value) {
                    da.setMessage({
                        type: 'warning',
                        content: '手机号未注册!',
                        mode: 'message'
                    })(injectFuns)
                    reduce('setMobile',newValue)
                    return 
                }
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                reduce('setMobile',newValue,data.value)
            })
        } else if(path.indexOf('orderManageForm.offlineOrder.product')!=-1) {
            webapi.order.productGetById(post,{id: newValue.toJS().id}).then(data => {
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                reduce('setProductInfo',newValue,data.value)
            })
        } else if(path.indexOf('orderManageForm.offlineOrder.app')!=-1) {
            let list = {}
            webapi.order.getSPListByApp(post,{}).then(data => {
                if(!data.result) {
                    return da.setMessage({
                        type: 'warning',
                        content: data.value,
                        mode: 'message'
                    })(injectFuns)
                }
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                reduce('setServiceProvider',newValue,data.value)
            })
        } else if(path.indexOf('orderManageForm.offlineOrder.org')!=-1) {
            
            webapi.order.onlineBuySwy(post,{productId: newValue ? newValue.get('id') : ''}).then(data => {
                if(!data.result) {
                    return da.setMessage({
                        type: 'warning',
                        content: data.value,
                        mode: 'message'
                    })(injectFuns)
                }
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                reduce('setOrgAboutData', newValue, data.value)
            })
        } else if(path.indexOf('orderManageForm.offlineOrder.serviceProvider')!=-1) {
            if(newValue===undefined) {
                return 
            }
            if(newValue.get('totalOrg')==0) {
                da.setMessage({
                    type:'warning',
                    content: '当前服务商剩余账套数为0，请及时跟进',
                    mode: 'message'
                })(injectFuns)
            }
            da.onFieldChange(path, oldValue, newValue)(injectFuns)
        } else {
            da.onFieldChange(path, oldValue, newValue)(injectFuns)
        }
    }
}

export function onOk(cb) {
    return injectFuns=> {
        let {getterByField} = da,
            orderSource = getterByField('orderSource')(injectFuns),
            isCreate = getterByField('isCreate')(injectFuns),
            avaliableMobile = getterByField('other.avaliableMobile')(injectFuns)
        if(isCreate) {
            if (!da.validate('orderManageForm.offlineOrder.mobile')(injectFuns)) return
            if(!avaliableMobile) {
                da.setMessage({
                    type: 'warning',
                    content: '手机号未注册!',
                    mode: 'message'
                })(injectFuns)
                return             
            }
        }
        //先校验
        injectFuns.reduce('onFieldFocus', '') //清空焦点
        if(orderSource==1) {//线上
            onOkOnline(cb)(injectFuns)
        } else {//线下
            onOkOffline(cb)(injectFuns)
        }
    }
}
export function onOkOffline(cb) {
    return injectFuns => {
        let {getterByField} = da,
            initData = getterByField('initData')(injectFuns),
            form = getterByField('form')(injectFuns).toJS(),
            isCreate = getterByField('isCreate')(injectFuns),
            isSee = getterByField('isSee')(injectFuns),
            isYj = getterByField('isYj')(injectFuns),
            appInfo = getterByField('appInfo')(injectFuns),
            orderSource = getterByField('orderSource')(injectFuns),
            offline = initData ? initData.offline : '',
            list

        if (!da.validate('orderManageForm')(injectFuns)) return
        let checkResult = checkFormData(form,isYj)(injectFuns)
        if(!checkResult) {
            return
        }
        if(isSee) {
            cb({result: true})
        } else {
            if(isCreate) {
                list = {
                    owner: form.mobileCode,
                    productId: form.org.id,
                    beginDate: form.beginDate,
                    endDate: form.endDate,
                    isPay: form.isPay?form.isPay.id:undefined,//"1:付费,2:非付费"
                    orderSource: 2,//"1线上，2线下",
                    payType: form.payType?form.payType.id:undefined,//"0支付宝，1微信",
                    appId: form.app!==undefined?form.app.id:undefined,//1,所属伙伴
                    serviceProviderId: form.serviceProvider?form.serviceProvider.id:undefined,//1,所属服务商ID
                    invoiceStatus: form.invoiceStatus?form.invoiceStatus.id:undefined,//"null不开发票，0 待开，1已开，2已邮寄"
                    amount: form.payAmount?form.payAmount:0,
                    memo: form.memo
                }
                if(!isYj) {
                    list.appId = appInfo.get('id')
                }
                da.showLoadingMask({content:'正在创建订单...'})(injectFuns)
                webapi.order.createSwy(injectFuns.post,list).then(data=> {
                    da.hideLoadingMask()(injectFuns)
                    if(!data.result) {
                        da.setMessage({
                            type: 'warning',
                            content: data.value,
                            mode: 'message'
                        })(injectFuns)
                        cb({result:true})
                        return
                    }
                    if (!da.handleWebApiInfo(data)(injectFuns)) return
                    da.setMessage({
                        type:'success',
                        content: '订单创建成功',
                        mode:'message'
                    })(injectFuns)
                    cb({result:true})
                })
            } else {
                list = {
                    id: form.id,
                    invoiceStatus: form.invoiceStatus?form.invoiceStatus.id:undefined,
//                    endDate: form.endDate,
                    amount: form.payAmount?form.payAmount:0,
                    ts: form.ts,
                    memo: form.memo
                }
                webapi.order.updateOrderSwy(injectFuns.post,list).then(data=> {
                    if (!da.handleWebApiInfo(data)(injectFuns)) return
                    da.setMessage({
                        type:'success',
                        content: '订单编辑成功',
                        mode:'message'
                    })(injectFuns)
                    cb({result:true})
                })
            }
        }
    }
}
export function onOkOnline(cb) {
    return injectFuns => {
        let {getterByField} = da,
            initData = getterByField('initData')(injectFuns),
            form = getterByField('form')(injectFuns).toJS(),
            isCreate = getterByField('isCreate')(injectFuns),
            isSee = getterByField('isSee')(injectFuns),
            isYj = getterByField('isYj')(injectFuns),
            appInfo = getterByField('appInfo')(injectFuns),
            orderSource = getterByField('orderSource')(injectFuns),
            offline = initData ? initData.offline : '',
            list

        if (!da.validate('orderManageForm')(injectFuns)) return
        let checkResult = checkOnLineFormData(form,isYj)(injectFuns)
        if(!checkResult) {
            return
        }
        if(isSee) {
            cb({result: true})
        } else {
            if(isCreate) {
                list = {
                    orgId: form.org.id,
                    productId: form.product.id,
                    beginDate: form.beginDate,
                    endDate: form.endDate,
                    isPay: form.isPay?form.isPay.id:undefined,//"1:付费,2:非付费"
                    orderSource: 1,//"1线上，2线下",
                    payType: form.payType?form.payType.id:undefined,//"0支付宝，1微信",
                    appId: form.app!==undefined?form.app.id:undefined,//1,所属伙伴
                    // serviceProviderId: form.serviceProvider?form.serviceProvider.id:undefined,//1,所属服务商ID
                    invoiceStatus: form.invoiceStatus?form.invoiceStatus.id:undefined,//"null不开发票，0 待开，1已开，2已邮寄"
                    amount: form.payAmount,
                    memo: form.memo
                }
                if(!isYj) {
                    list.appId = appInfo.get('id')
                }
                da.showLoadingMask({content:'正在创建订单...'})(injectFuns)
                webapi.order.createSwy(injectFuns.post,list).then(data=> {
                    da.hideLoadingMask()(injectFuns)
                    if(!data.result) {
                        da.setMessage({
                            type: 'warning',
                            content: data.value,
                            mode: 'message'
                        })(injectFuns)
                        cb({result:true})
                        return
                    }
                    if (!da.handleWebApiInfo(data)(injectFuns)) return
                    da.setMessage({
                        type:'success',
                        content: '订单创建成功',
                        mode:'message'
                    })(injectFuns)
                    cb({result:true})
                })
            } else {
                list = {
                    id: form.id,
                    invoiceStatus: form.invoiceStatus?form.invoiceStatus.id:undefined,
                    ts: form.ts,
                    memo: form.memo
                }
                webapi.order.updateOrderSwy(injectFuns.post,list).then(data=> {
                    if (!da.handleWebApiInfo(data)(injectFuns)) return
                    da.setMessage({
                        type:'success',
                        content: '订单编辑成功',
                        mode:'message'
                    })(injectFuns)
                    cb({result:true})
                })
            }
        }
    }
}

export function checkFormData(form,isYj) {
    return injectFuns => {
        let {getterByField} = da

        if(!form.isPay) {
            da.setMessage({
                type: 'warning',
                content: '订单类型不能为空',
                mode: 'message'
            })(injectFuns)
            return false
        }
        if(!form.org) {
            da.setMessage({
                type: 'warning',
                content: '产品名称不能为空',
                mode: 'message'
            })(injectFuns)
            return false
        }
        if(!form.endDate) {
            da.setMessage({
                type: 'warning',
                content: '截至日期不能为空',
                mode: 'message'
            })(injectFuns)
            return false
        }
        if(moment(form.beginDate).valueOf>moment(form.endDate)) {
            da.setMessage({
                type: 'warning',
                content: '购买日期不能大于截止日期',
                mode: 'message'
            })(injectFuns)
            return false
        }
        return true
    }
}

export function checkOnLineFormData(form,isYj) {
    return injectFuns => {
        let {getterByField} = da

        if(!form.isPay) {
            da.setMessage({
                type: 'warning',
                content: '订单类型不能为空',
                mode: 'message'
            })(injectFuns)
            return false
        }
        if(!form.org) {
            da.setMessage({
                type: 'warning',
                content: '产品名称不能为空',
                mode: 'message'
            })(injectFuns)
            return false
        }
        if(!form.endDate) {
            da.setMessage({
                type: 'warning',
                content: '截至日期不能为空',
                mode: 'message'
            })(injectFuns)
            return false
        }
        if(moment(form.beginDate).valueOf>moment(form.endDate)) {
            da.setMessage({
                type: 'warning',
                content: '购买日期不能大于截止日期',
                mode: 'message'
            })(injectFuns)
            return false
        }
        return true
    }
}

export function updateMemo(value) {
    return injectFuns => {
        injectFuns.reduce('updateMemo',value)
    }
}

export function updatePayType(value) {
    return injectFuns => {
        injectFuns.reduce('updatePayType',value)
    }
}

export function updateOrderPrompt(value) {
    return injectFuns => {
        injectFuns.reduce('updateOrderPrompt',value)
    }
}

Object.assign(exports, {...da, ...exports})
