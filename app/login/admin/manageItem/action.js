import * as da from 'dynamicAction'
import * as api from './api'
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
        if(orderSource == 1){
            setOnLineInit(initData)(injectFuns)
            // meta.childrens.push(onlineOrder)
            // da.initView( {meta:meta,data:data},exports)(injectFuns)
        }else{
            setOffLineInit(initData)(injectFuns)
        }
	}
}

export function setOffLineInit(initData) {
    return injectFuns => {
        let {getterByField} = da,
            meta = api.getMeta(),
            data = api.getData(),
            onlineOrder = api.onlineOrder,
			offlineOrder = api.offlineOrder,
            invoiceDetail = api.invoiceDetail,
            isCreate = initData.isCreate,
            orderSource
        if(initData){
            orderSource = initData.orderSource
        }
		meta.childrens.push(offlineOrder)
        meta.childrens.push(invoiceDetail)

        data.isCreate = initData.isCreate
        data.orderSource = initData.orderSource
        data.isSee = initData.isSee
        data.form.ts = initData.ts
        data.isYj = initData.isYj
        data.isOperators = initData.isOperators
        data.appInfo = initData.appInfo
		data.invoiceCheckedDisabled = false

		da.setMetaProperty(meta, 'orderManageForm.invoice.orderInfoForm.formItems.orderType.disabled',false)
		da.setMetaProperty(meta, 'orderManageForm.invoice.orderInfoForm.formItems.orderContent.disabled',false)

		da.setMetaProperty(meta, 'orderManageForm.invoice.orderInfoFormTwo.formItems.taxNum.disabled',false)
		da.setMetaProperty(meta, 'orderManageForm.invoice.orderInfoFormTwo.formItems.companyName.disabled',false)
		da.setMetaProperty(meta, 'orderManageForm.invoice.orderInfoFormTwo.formItems.address.disabled',false)
		da.setMetaProperty(meta, 'orderManageForm.invoice.orderInfoFormTwo.formItems.addrDetail.disabled',false)
		da.setMetaProperty(meta, 'orderManageForm.invoice.orderInfoFormTwo.formItems.curstomer.disabled',false)
		da.setMetaProperty(meta, 'orderManageForm.invoice.orderInfoFormTwo.formItems.phone.disabled',false)

        if(initData.isSee) {// 查看 两种可能 线上 线下
            if(initData.orderSource==1) {//线上
            } else { //线下
                meta.childrens[0].childrens = meta.childrens[0].childrens.map( o => {
                    o.disabled = true
                    return o
                })

				da.setMetaProperty(meta, 'orderManageForm.invoice.orderInfoForm.formItems.orderType.disabled',true)
				da.setMetaProperty(meta, 'orderManageForm.invoice.orderInfoForm.formItems.orderContent.disabled',true)

				da.setMetaProperty(meta, 'orderManageForm.invoice.orderInfoFormTwo.formItems.taxNum.disabled',true)
				da.setMetaProperty(meta, 'orderManageForm.invoice.orderInfoFormTwo.formItems.companyName.disabled',true)
				da.setMetaProperty(meta, 'orderManageForm.invoice.orderInfoFormTwo.formItems.address.disabled',true)
				da.setMetaProperty(meta, 'orderManageForm.invoice.orderInfoFormTwo.formItems.addrDetail.disabled',true)
				da.setMetaProperty(meta, 'orderManageForm.invoice.orderInfoFormTwo.formItems.curstomer.disabled',true)
				da.setMetaProperty(meta, 'orderManageForm.invoice.orderInfoFormTwo.formItems.phone.disabled',true)
				data.invoiceCheckedDisabled = true



                if(initData.mobile) {
                    meta.childrens[0].childrens[1].disabled = true
                    meta.childrens[0].childrens[2].disabled = true
                    data.form.mobile = initData.mobile
                    data.form.org = initData.org
                }
            }
        } else {//编辑 和 创建
            if(!initData.isCreate) {// 编辑 两种可能 线上 线下
                if(initData.orderSource==2) {//线下
                    meta.childrens[0].childrens = meta.childrens[0].childrens.map( o => {
                        if(o.name=='isPay'||o.name=='mobile'||o.name=='org'||o.name=='product'||o.name=='beginDate'||o.name=='payType'||o.name=='app'||o.name=='serviceProvider') {
                            o.disabled = true
                        } else {
                            o.disabled = false
                        }
                        return o
                    })
                } else {//线上
                }
                if(initData.mobile) {
                    meta.childrens[0].childrens[1].disabled = true
                    meta.childrens[0].childrens[2].disabled = true
                    data.form.mobile = initData.mobile
                    data.form.org = initData.org
                }
            } else {// 创建 线下
                data.form.mobile = initData.mobile
                data.form.org = initData.org
                meta.childrens[0].childrens = meta.childrens[0].childrens.map( o => {
                    o.disabled = false
                    return o
                })
            }
        }
        if(initData.orderSource==2) {
            if(initData.isYj) {
                meta.childrens[0].childrens[9].visible = true
                meta.childrens[0].childrens[9].required = true
            } else {
                meta.childrens[0].childrens[9].visible = false
                meta.childrens[0].childrens[9].required = false
            }
        }
        da.initView( {meta:meta,data:data},exports)(injectFuns)
        setInitData(initData,isCreate, orderSource)(injectFuns)
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
            data.form.org = initData.org
            // if(initData.orderSource==1) {//线上
            // } else { //线下
            //     meta.childrens[0].childrens = meta.childrens[0].childrens.map( o => {
            //         o.disabled = true
            //         return o
            //     })
            //     if(initData.mobile) {
            //         meta.childrens[0].childrens[1].disabled = true
            //         meta.childrens[0].childrens[2].disabled = true
            //         data.form.mobile = initData.mobile
            //         data.form.org = initData.org
            //     }
            // }
        } else {//编辑 和 创建
            if(!initData.isCreate) {// 编辑 两种可能 线上 线下
                meta.childrens[0].childrens = meta.childrens[0].childrens.map( o => {
                    if(o.name=='isPay'||o.name=='mobile'||o.name=='org'||o.name=='product'||o.name=='beginDate'||o.name=='endDate'||o.name=='payAmount'||o.name=='payType'||o.name=='app'||o.name=='serviceProvider') {
                        o.disabled = true
                    } else {
                        o.disabled = false
                    }
                    return o
                })
                if(initData.mobile) {
                    meta.childrens[0].childrens[1].disabled = true
                    meta.childrens[0].childrens[2].disabled = true
                    data.form.mobile = initData.mobile
                    data.form.org = initData.org
                }
            } else {// 创建 线下
                // data.form.mobile = initData.mobile
                // data.form.org = initData.org
                // meta.childrens[0].childrens = meta.childrens[0].childrens.map( o => {
                //     o.disabled = false
                //     return o
                // })
            }
        }
        if(initData.orderSource==2) {
            if(initData.isYj) {
                meta.childrens[0].childrens[9].visible = true
                meta.childrens[0].childrens[9].required = true
            } else {
                meta.childrens[0].childrens[9].visible = false
                meta.childrens[0].childrens[9].required = false
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

        webapi.order.orderInit(post,{}).then(data => {
            if(!data.result) {
                return da.setMessage({
                    type: 'warning',
                    content: data.value,
                    mode: 'message'
                })(injectFuns)
            }
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            partnerList = data.value
            return webapi.order.getSPListByApp(post,{})
        }).then(data => {
            if(data) {
                if(!data.result) {
                    return da.setMessage({
                        type: 'warning',
                        content: data.value,
                        mode: 'message'
                    })(injectFuns)
                }
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                if(!mobile) {
                    createInfo = data.value
                    reduce('setInitData',partnerList,undefined,data.value)
                } else {
                    createInfo = data.value
                    return webapi.order.queryOrgListByMobile(post,{'mobile':(mobile?mobile:'')})
                }
            }
        }).then(data => {
            if(data) {
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                mobileInfo = data.value
                if(isCreate) {
                    partnerList.vatTaxpayer = initData.vatTaxpayer
                    reduce('setInitData',partnerList,undefined,createInfo,mobileInfo)
                    return
                } else {
                    return webapi.order.queryOrderDetail(injectFuns.post,{id:initData.id})
                }

            }
        }).then(data => {
            if(data) {
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                reduce('setInitData',partnerList,data.value,createInfo,mobileInfo)
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
        webapi.order.orderInit(post,{}).then(data => {
            if(!data.result) {
                return da.setMessage({
                    type: 'warning',
                    content: data.value,
                    mode: 'message'
                })(injectFuns)
            }
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            partnerList = data.value
            return webapi.order.getSPListByApp(post,{})
        }).then(data => {
            if(data) {
                if(!data.result) {
                    return da.setMessage({
                        type: 'warning',
                        content: data.value,
                        mode: 'message'
                    })(injectFuns)
                }
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                createInfo = data.value
                return webapi.order.queryOrgListByMobile(post,{'mobile':(mobile?mobile:'')})
            }
        }).then(data => {
            if(data) {
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                mobileInfo = data.value
                return webapi.order.queryOrderDetail(injectFuns.post,{id:initData.id})
            }
        }).then(data => {
            if(data) {
                if (!da.handleWebApiInfo(data)(injectFuns)) return
				if(data.value.invoice && data.value.invoice.invoiceType ){
                    data.value.invoice.invoiceType = {
                        id:data.value.invoice.invoiceType,
                        name: data.value.invoice.invoiceType==1?'增值税普通发票':'增值税专用发票'
                    }
                }
                if(data.value.invoice && data.value.invoice.contentType){
                    data.value.invoice.contentType = {
                        id:data.value.invoice.contentType ,
                        name:data.value.invoice.contentType==1?'软件服务费':'软件服务费'
                    }
                }
				
                reduce('setInitOnLineData',partnerList,data.value,createInfo,mobileInfo)
            }
        })
    }
}

export function onFieldChange(path, oldValue, newValue) {
    return injectFuns => {
        let {initView, setMessage, clearMessage} = da,
            {reduce, post} = injectFuns
        if(path.indexOf('orderManageForm.offlineOrder.mobile')!=-1) {
            if(newValue=='') {
                reduce('setMobile',newValue,null)
                return
            }
            webapi.order.queryOrgListByMobile(post,{mobile:(newValue?newValue:'')}).then(data => {
                if(!data.result) {
                    da.setMessage({
                        type: 'warning',
                        content: data.value,
                        mode: 'message'
                    })(injectFuns)
                    reduce('setMobile',newValue,[])
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
            let curProduct = da.getterByField('form.product')(injectFuns),
                appList = da.getter('orderManageForm.offlineOrder.app','dataSource')(injectFuns).toJS(),
                curApp,
                list = {}
            appList.map(o=> {
                if(newValue.toJS().appId==o.id) {
                    curApp = o
                }
            })
            list.appId = curApp.id
            webapi.order.getSPListByApp(post,{}).then(data => {
                if(!data.result) {
                    return da.setMessage({
                        type: 'warning',
                        content: data.value,
                        mode: 'message'
                    })(injectFuns)
                }
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                reduce('setOrgAboutData',newValue,curApp,data.value)
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
            orderSource = getterByField('orderSource')(injectFuns)

        //先校验
        injectFuns.reduce('onFieldFocus', '') //清空焦点
        if(orderSource==1) {//线上
            onOkOnline(cb)(injectFuns)
        } else if(orderSource==2) {//线下
            onOkOffline(cb)(injectFuns)
        }
    }
}

export function lookCon(lookConurl) {
    return injectFuns=> {
        let fromData = {
            "contractNo": lookConurl,
            "open": true
        }
        webapi.order.conDownload(injectFuns.formPost, fromData).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            
            console.log(data)
            if(data){
                window.open(window.location.origin + '/v1/contract/sign?id=' + data.value)
            }
           
        })

        
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
            invoiceChecked = getterByField('invoiceChecked')(injectFuns),
            offline = initData ? initData.offline : '',
			tempInvoice =form.invoice? Object.create(form.invoice) :{} ,
            list

		if(invoiceChecked){
			if(form.invoice.titleType == '2' && !form.invoice.titleOrgCode){
				da.setMessage({
	                type: 'warning',
	                content: '纳税人识别号不能为空',
	                mode: 'message'
	            })(injectFuns)
	            return false
			}
			if(form.invoice.titleType == '2' && !form.invoice.titleOrgName){
				da.setMessage({
	                type: 'warning',
	                content: '企业名称不能为空',
	                mode: 'message'
	            })(injectFuns)
	            return false
			}
			if(!form.invoice.address){
				da.setMessage({
	                type: 'warning',
	                content: '寄送地址不能为空',
	                mode: 'message'
	            })(injectFuns)
	            return false
			}
			if(!form.invoice.addressDetail){
				da.setMessage({
	                type: 'warning',
	                content: '详细地址不能为空',
	                mode: 'message'
	            })(injectFuns)
	            return false
			}
			if(!form.invoice.contact){
				da.setMessage({
	                type: 'warning',
	                content: '收件人不能为空',
	                mode: 'message'
	            })(injectFuns)
	            return false
			}
			if(!form.invoice.mobile){
				da.setMessage({
	                type: 'warning',
	                content: '联系方式不能为空',
	                mode: 'message'
	            })(injectFuns)
	            return false
			}

			// 处理invoice
			form.invoice.contentType = tempInvoice.contentType.id
			form.invoice.invoiceType = tempInvoice.invoiceType.id
			form.invoice.addressCity = form.invoice.address.citys
			form.invoice.addressCounty = form.invoice.address.districts
			form.invoice.addressProvincial = form.invoice.address.provinces
			delete(form.invoice.address)
		}else{
			delete(form.invoice)
		}
        let checkResult = checkFormData(form,isYj)(injectFuns)
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
                    orderSource: 2,//"1线上，2线下",
                    payType: form.payType?form.payType.id:undefined,//"0支付宝，1微信",
                    appId: form.app!==undefined?form.app.id:undefined,//1,所属伙伴
                    serviceProviderId: form.serviceProvider?form.serviceProvider.id:undefined,//1,所属服务商ID
                    invoiceStatus: form.invoiceStatus?form.invoiceStatus.id:undefined,//"null不开发票，0 待开，1已开，2已邮寄"
                    amount: form.payAmount?form.payAmount:0,
                    memo: form.memo
                }
				if(invoiceChecked){
					list.invoice = form.invoice
				}
                if(!isYj) {
                    list.appId = appInfo.get('id')
                }
                da.showLoadingMask({content:'正在创建订单...'})(injectFuns)
                webapi.order.create(injectFuns.post,list).then(data=> {
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
                let orderStatusVisible = da.getter('orderManageForm.offlineOrder.orderStatus','visible')(injectFuns)
                list = {
                    id: form.id,
                    invoiceStatus: form.invoiceStatus?form.invoiceStatus.id:undefined,
                    endDate: form.endDate,
                    amount: form.payAmount?form.payAmount:0,
                    ts: form.ts,
                    memo: form.memo
                }
				if(form.invoice){
					list.invoice = form.invoice
				}
                if(orderStatusVisible) {
                    list.orderStatus = da.getterByField('form.orderStatus.id')(injectFuns)
                }
                webapi.order.updateOrder(injectFuns.post,list).then(data=> {
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

        if (!da.validate('orderManageForm.onlineOrder')(injectFuns)) return
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
                webapi.order.create(injectFuns.post,list).then(data=> {
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
                webapi.order.updateOrder(injectFuns.post,list).then(data=> {
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
        let {getterByField} = da,
			{invoice} = form

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
                content: '企业名称不能为空',
                mode: 'message'
            })(injectFuns)
            return false
        }
        if(!form.product) {
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
        if(isYj&&!form.app) {
            da.setMessage({
                type: 'warning',
                content: '所属伙伴不能为空',
                mode: 'message'
            })(injectFuns)
            return false
        }
        if(da.getter('orderManageForm.offlineOrder.serviceProvider','required')(injectFuns)&&!form.serviceProvider) {
            da.setMessage({
                type: 'warning',
                content: '所属服务商不能为空',
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
                content: '企业名称不能为空',
                mode: 'message'
            })(injectFuns)
            return false
        }
        if(!form.product) {
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
        if(isYj&&!form.app) {
            da.setMessage({
                type: 'warning',
                content: '所属伙伴不能为空',
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
export function setInvoiceChecked(checked) {
	return injectFuns=>{
		injectFuns.reduce('setInvoiceChecked',checked)
	}
}
export function setTitleType(titleType) {
	return injectFuns=>{
		injectFuns.reduce('setTitleType',titleType)
	}
}
Object.assign(exports, {...da, ...exports})
