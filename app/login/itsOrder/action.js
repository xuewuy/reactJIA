import * as da from 'dynamicAction'
import Immutable, { Map, fromJS } from 'immutable'
import * as api from './api.js'
import webapi from 'webapi'
import moment from 'moment'
import qrcode from './qrcode'

/**
 * [初始化视图]
 * @return {[type]} [无返回值]
 */
export function initView(This, getQrCode) {
    return injectFuns => {
        let { initView, setMessage, clearMessage } = da,
            { reduce, post } = injectFuns,
            token = sessionStorage.getItem('_accessToken') ?
            sessionStorage.getItem('_accessToken') :
            localStorage.getItem('token'),
            {step,id,orgId,productId} = This.props.appParams,
            onRedirect = This.props.onRedirect
        if (token) {
            injectFuns.setAccessToken(token)
        }
        if(step) {//进入页面就可以跳转到相应得页面，优化
            api.data.orderStep = step
        } else {
            api.data.orderStep = 1
        }
        da.initView({ meta: api.meta, data: api.data }, exports)(injectFuns)
        if (step && step == 2) {
            initStepSecond(id, getQrCode, onRedirect,productId)(injectFuns)
        } else {
            setInitData(orgId,productId)(injectFuns)
        }
    }
}

export function redPackageChange(value){
    return injectFuns =>{
        injectFuns.reduce('redPackageChange',value)
    }
}

export function logout(cb) {
    return injectFuns => {
        let { initView, setMessage, clearMessage, handleWebApiException } = da,
            { reduce, post, getContext } = injectFuns

        webapi.user.logout(post).then(data => {
            if (!data.result) {
                return
            }
            cb()
        })
    }
}
export function removeAllTab() {
    return ({ reduce }) => {
        reduce('removeAllTab')
    }
}
export function remarksChange(remarks){
    return ({reduce}) =>{
        reduce('remarksChange',remarks)
    }
}
export function WeChatPayment(onRedirect) {
    return injectFuns => {
        let list = {},
            shouldPrice = da.getterByField('form.shouldPrice')(injectFuns),
            orderCode = da.getterByField('form.orderCode')(injectFuns),
            form = da.getterByField('form')(injectFuns).toJS(),
            orgId = form.orderId
        list.amount = shouldPrice.split('.')[0]
        list.code = orderCode
        webapi.basicFiles.getPayCode(injectFuns.post, list).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            let getPayCode = data.value.content.split('?text=')[1],
                confirmCode = data.value.confirmCode
            da.setMessage({
                type: 'app',
                title: '微信支付',
                content: 'app:apps/login/order/weChatPay',
                okText: '更换其他支付方式',
                wrapClassName: 'weChatPay',
                width: 360,
                initData: { url: getPayCode, amount: 1000, shouldPrice: shouldPrice, confirmCode: confirmCode, orgId: orgId, onRedirect: onRedirect },
                refName: 'weChatPay',
                onCancel: () => {
                    da.clearMessage()(injectFuns)
                },
                onOk: (cb) => {
                    da.clearMessage()(injectFuns)
                    onRedirect('apps/login/admin', true)
                }
            })(injectFuns)
        })
    }
}
export function initStepSecond(id, getQrCode, onRedirect,productId) {
    return injectFuns => {
        let secondData, initData,
        isSpOrder = da.getterByField('isSpOrder')(injectFuns)
        if(productId){//个人代账  fsk
            webapi.order.queryOnlineSpOrderDetail(injectFuns.post, { 'id': id }).then(data => {
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                secondData = data.value
                return api.init(injectFuns.post)
            }).then(data => {
                if (data) {
                    if (!da.handleWebApiInfo(data)(injectFuns)) return
                    initData = data.value
                    return webapi.order.getWeixinPayCodeSp(injectFuns.post, { 'id': id, 'memo': window.location.origin })
                }
            }).then(data => {
                if (data) {
                    if(!data.result&&data.value) {
                        return da.setMessage({
                            type: 'warning',
                            title: '提示',
                            content: data.value,
                            okText: '关闭',
                            onOk: () => {
                                da.clearMessage()(injectFuns)
                                window.close()
                            }
                        })(injectFuns)
                    }
                    if (!da.handleWebApiInfo(data)(injectFuns)) return
                    injectFuns.reduce('initStepSecondSp', secondData, initData, data.value)
                    setTimeout(function () {
                        getQrCode(data.value.payCode)
                        clearInterval(window.loopQRCodeTimer)
                        window.loopQRCodeTimer = setInterval(() => {
                            getPayStatus(data.value.orderCode, onRedirect,true)(injectFuns)
                        }, 2000)
                    }, 200)
                }
            })
        }else{
            webapi.order.queryOnlineOrderDetail(injectFuns.post, { 'id': id }).then(data => {
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                secondData = data.value
                return api.init(injectFuns.post)
            }).then(data => {
                if (data) {
                    if (!da.handleWebApiInfo(data)(injectFuns)) return
                    initData = data.value
                    return webapi.order.getWeixinPayCode(injectFuns.post, { 'id': id, 'memo': window.location.origin })
                }
            }).then(data => {
                if (data) {
                    if(!data.result&&data.value) {
                        return da.setMessage({
                            type: 'warning',
                            title: '提示',
                            content: data.value,
                            okText: '关闭',
                            onOk: () => {
                                da.clearMessage()(injectFuns)
                                window.close()
                            }
                        })(injectFuns)
                    }
                    if (!da.handleWebApiInfo(data)(injectFuns)) return
                    injectFuns.reduce('initStepSecond', secondData, initData, data.value)

                    setTimeout(function () {
                        getQrCode(data.value.payCode)

                        clearInterval(window.loopQRCodeTimer)
                        window.loopQRCodeTimer = setInterval(() => {
                            getPayStatus(data.value.orderCode, onRedirect)(injectFuns)
                        }, 2000)
                    }, 200)
                }
            })
        }
    }
}
export function setInitData(curOrgId,productId) {
    return injectFuns => {
        let { initView, setMessage, clearMessage } = da,
            { reduce, post } = injectFuns,
            list = {},
            onlineData,
            spSnlineData
        if(productId){// 个人代账
            webapi.order.onlineBuySp(post,{orgId: curOrgId,productId}).then(data=>{
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                spSnlineData = data.value
                return api.init(injectFuns.post)
            }).then(data=>{
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                return reduce('setInitSpData',spSnlineData, data.value)
            })
        }else{
            webapi.itsOrder.onlineBuy(post, { orgId: curOrgId }).then(data => {
                if(!data.result&&data.value) {
                    return da.setMessage({
                        type: 'warning',
                        title: '提示',
                        content: data.value,
                        okText: '关闭',
                        onOk: () => {
                            da.clearMessage()(injectFuns)
                            window.close()
                        }
                    })(injectFuns)
                }
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                onlineData = data.value
                return api.init(injectFuns.post)
            }).then(data => {
                if (data) {
                    if (!da.handleWebApiInfo(data)(injectFuns)) return
                    if (curOrgId) {
                        webapi.itsOrder.existsUnpaidOrder(injectFuns.post, { 'orgId': curOrgId }).then(data2 => {
                            if (!da.handleWebApiInfo(data2)(injectFuns)) return
                            if (data2.result) {
                                if (data2.value && data2.value == true) {
                                    da.setMessage({
                                        type: 'warning',
                                        content: '存在未支付的订单!',
                                        mode: 'message'
                                    })(injectFuns)

                                    window.setTimeout(function () {
                                        let host = window.location.host
                                        let orderUrl = location.protocol + '//' + host + '/?h=its#apps/login/admin?activeKey=104'
                                        window.location.href = orderUrl
                                    }, 3000)
                                    return
                                }
                            }
                        })
                    }
                    reduce('setInitData', onlineData, curOrgId, data.value)
                }
            })
        }

    }
}
export function save() {
    return injectFuns => {
        let { reduce, post } = injectFuns,
            addr = da.getterByField('form.address')(injectFuns)
        if (addr) {
            addr = addr.toJS()
        } else {
            // da.setMessage({
            //     type: 'warning',
            //     content: '请填写寄送地址',
            //     mode: 'message'
            // })(injectFuns)

            addr = { 'provinces': "110000", 'citys': "110100", 'districts': "110101" }
        }

        reduce('onFieldFocus', '') //清空焦点
        if (!da.validate('order.orderInfoFormTwo.formItems')(injectFuns)) return
        webapi.org.getCityMap(post, { code: addr.citys }).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            reduce('setIsEdit', false, data.value)
        })
    }
}
export function edit() {
    return injectFuns => {
        let { reduce, post } = injectFuns
        reduce('setIsEdit', true)
    }
}

export function updatePayType(value, This, onRedirect,isSpOrder) {
    return injectFuns => {
        let { reduce, post } = injectFuns
        if (value == 'wx') {
            updateQrCode(This.getQrCode, onRedirect,isSpOrder)(injectFuns)
        } else if (value == 'zfb') {
            setZfbQrCode(This.getZfbQrCode, onRedirect,false,isSpOrder)(injectFuns)
        }
        else if (value == 'openzfb') {
            setZfbQrCode(This.getZfbQrCode, onRedirect, true,isSpOrder)(injectFuns)
        }
        reduce('updatePayType', value,isSpOrder)
        // da.setMessage({
        //     type: 'app',
        //     title: '支付成功',
        //     content: 'app:apps/login/order/paySuccess',
        //     okText: '查看订单',
        //     wrapClassName:'paySuccess',
        //     initData: {onRedirect: onRedirect,clearMessage: da.clearMessage},
        //     width: 410,
        //     // initData: {id: cardId},
        //     refName: 'paySuccess',
        //     onCancel: (cb)=> {
        //         clearTimeout(window.openMyOrder)
        //         da.clearMessage()(injectFuns)
        //     },
        //     onOk: (cb)=> {
        //         da.clearMessage()(injectFuns)
        //         // this.props.removeAllTab()
        //         clearTimeout(window.openMyOrder)
        //         onRedirect('apps/login/admin?activeKey=12',true)
        //     }
        // })(injectFuns)
    }
}

export function updateQrCode(getQrCode, onRedirect, isSpOrder) {
    return injectFuns => {
        let list = {
            id: da.getterByField('orderId')(injectFuns),
            memo: window.location.origin
        },
        payCodeApi =  isSpOrder? 'getWeixinPayCodeSp' :'getWeixinPayCode'
        webapi.order[payCodeApi](injectFuns.post, list).then(data => {
            if (data) {
                if(!data.result&&data.value) {
                    return da.setMessage({
                        type: 'warning',
                        title: '提示',
                        content: data.value,
                        okText: '关闭',
                        onOk: () => {
                            da.clearMessage()(injectFuns)
                            window.close()
                        }
                    })(injectFuns)
                }
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                injectFuns.reduce('updateCodeInfo', data.value)
                setTimeout(function () {
                    getQrCode(data.value.payCode)

                    clearInterval(window.loopQRCodeTimer)
                    window.loopQRCodeTimer = setInterval(() => {
                        getPayStatus(data.value.orderCode, onRedirect)(injectFuns)//刷新二维码和轮询 code
                    }, 2000)
                }, 200)
            }
        })
    }
}

export function setZfbQrCode(getZfbQrCode, onRedirect, isOpen,isSpOrder) {
    return injectFuns => {
        let list = {
            id: da.getterByField('orderId')(injectFuns),
            memo: window.location.origin,
            isPay: isOpen == true ? null : 1
        },
        alipayPayCode = isSpOrder? 'getAlipayPayCodeSp' :'getAlipayPayCode'
        // injectFuns.reduce('updateCodeInfo',data.value)
        webapi.order[alipayPayCode](injectFuns.post, list).then(data => {
            if(!data.result&&data.value) {
                return da.setMessage({
                    type: 'warning',
                    title: '提示',
                    content: data.value,
                    okText: '关闭',
                    onOk: () => {
                        da.clearMessage()(injectFuns)
                        window.close()
                    }
                    // mode: 'message'
                })(injectFuns)
            }
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            setTimeout(function () {
                let token = localStorage.getItem('token')
                if (token) {
                    injectFuns.setAccessToken(token)
                }
                getZfbQrCode(data.value.payCode)
                clearInterval(window.loopQRCodeTimer)
                window.loopQRCodeTimer = setInterval(() => {
                    getPayStatus(data.value.orderCode, onRedirect)(injectFuns)//刷新二维码和轮询 code
                }, 2000)
            }, 10)
        })
        // getZfbQrCode()

    }
}
export function openPaySuccess(onRedirect,isSpOrder) {
    return injectFuns => {
        da.setMessage({
            type: 'app',
            title: '支付成功',
            content: 'app:apps/login/order/paySuccess',
            okText: isSpOrder? "确定":'查看订单',
            wrapClassName: 'paySuccess',
            initData: { 'onRedirect': onRedirect, 'clearMessage': da.clearMessage,isSpOrder},
            width: 410,
            // initData: {id: cardId},
            refName: 'paySuccess',
            onCancel: (cb) => {
                clearTimeout(window.openMyOrder)
                da.clearMessage()(injectFuns)
            },
            onOk: (cb) => {
                da.clearMessage()(injectFuns)
                // this.props.removeAllTab()
                clearTimeout(window.openMyOrder)
                if(isSpOrder){
                    onRedirect('apps/login/admin', true)
                }else{
                    onRedirect('apps/login/admin?activeKey=12', true)
                }
            }
        })(injectFuns)
        clearInterval(window.loopQRCodeTimer)
        window.loopQRCodeTimer = ''
    }
}

export function updateTt(value) {
    return injectFuns => {
        let { reduce, post } = injectFuns
        reduce('updateTt', value)
    }
}
export function submitOrder(getQrCode, onRedirect) {
    return injectFuns => {
        let { initView, setMessage, clearMessage } = da,
            { reduce, post } = injectFuns,
            form = da.getterByField('form')(injectFuns).toJS(),
            redPackage = da.getterByField('redPackage')(injectFuns) ?da.getterByField('redPackage')(injectFuns).toJS():null,
            redPackageChecked = da.getterByField('redPackageChecked')(injectFuns),
            list = {},
            list2 = {},
            orderInfo

        list.productId = form.productId
        if (form.isOrder) {
            if (form.isEdit) {
                return setMessage({
                    type: 'warning',
                    content: '请保存发票信息',
                    mode: 'message'
                })(injectFuns)
            } else {
                list.invoice = {
                    invoiceType: form.orderType.id,//发票类型
                    contentType: form.orderContent.id,//发票内容
                    contact: form.curstomer,//收件人
                    mobile: form.phone//联系方式
                }
                if (form.orderTtValue == 'company') {
                    list.invoice.titleType = 2
                    list.invoice.titleOrgName = form.companyName
                    list.invoice.titleOrgCode = form.taxNum
                } else if (form.orderTtValue == 'person') {
                    list.invoice.titleType = 1
                }

                list.invoice.addressProvincial = form.address ? form.address.provinces : '110000'
                list.invoice.addressCity = form.address ? form.address.citys : '110100'
                list.invoice.addressCounty = form.address ? form.address.districts : '110101'
                list.invoice.addressDetail = form.addressDetail
                list.invoiceStatus = 2
            }
        } else {
            list.invoiceStatus = 1
        }
        list.orgId = form.id
        list.productId = form.productId
        if(da.getterByField('form.regCode')(injectFuns)) {
            list.regCodeStr = da.getterByField('form.regCode')(injectFuns)

        } else {

            list.couponCode = form.couponCode ? form.couponCode : null
        }
        list.beginDate = form.beginDate
        list.endDate = form.endDate
        if(redPackageChecked && redPackage){
            list.redPackage = {
                id:redPackage.id
            }
        }
        if(form.remarks){
            list.remarks = form.remarks
        }
        webapi.itsOrder.createOnlineOrder(post, list).then(data => {
            if (!data.result) {
                return da.setMessage({
                    type: 'warning',
                    content: data.value,
                    mode: 'message'
                })(injectFuns)
            }
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            orderInfo = data.value
            list2.id = data.value.id
            list2.memo = window.location.origin
            window.location.hash =window.location.hash.split('?')[0] + "?step=2&id=" + data.value.id
        })
    }
}
export function submitSpOrder(getQrCode, onRedirect,getParam) {
    return injectFuns=>{
        let { initView, setMessage, clearMessage } = da,
            { reduce, post } = injectFuns,
            form = da.getterByField('form')(injectFuns).toJS(),
            list = {}
        // list.orderSource = 1
        if (form.isOrder) {
            if (form.isEdit) {
                return setMessage({
                    type: 'warning',
                    content: '请保存发票信息',
                    mode: 'message'
                })(injectFuns)
            } else {
                list.invoice = {
                    invoiceType: form.orderType.id,//发票类型
                    contentType: form.orderContent.id,//发票内容
                    contact: form.curstomer,//收件人
                    mobile: form.phone//联系方式
                }
                if (form.orderTtValue == 'company') {
                    list.invoice.titleType = 2
                    list.invoice.titleOrgName = form.companyName
                    list.invoice.titleOrgCode = form.taxNum
                } else if (form.orderTtValue == 'person') {
                    list.invoice.titleType = 1
                }

                list.invoice.addressProvincial = form.address ? form.address.provinces : '110000'
                list.invoice.addressCity = form.address ? form.address.citys : '110100'
                list.invoice.addressCounty = form.address ? form.address.districts : '110101'
                list.invoice.addressDetail = form.addressDetail
                list.invoiceStatus = 2
            }
        } else {
            list.invoiceStatus = 1
        }
        list.orgId = form.id
        list.productId = form.productId
        list.beginDate = form.beginDate
        list.endDate = form.endDate
        list.productPrice = form.productPrice
        list.amount = form.amount
        list.saleAmount = form.saleAmount
        list.timespan = form.timespan
        list.purchaseNum = form.purchaseNum
        list.addPurchaseNum = form.addPurchaseNum

        if(getParam('test')){//测试用 0.01元 上线务必要关闭
            list.amount = 0.01
        }
        if(form.remarks){
            list.remarks = form.remarks
        }

        webapi.order.createOnlineSpOrder(post, list).then(data => {
            if (!data.result) {
                return da.setMessage({
                    type: 'warning',
                    content: data.value,
                    mode: 'message'
                })(injectFuns)
            }
            if (!da.handleWebApiInfo(data)(injectFuns)) return

            window.location.hash =window.location.hash.split('?')[0] + "?productId="+form.productId+"&step=2&id=" + data.value.id
        })
    }
}
export function getPayStatus(code, onRedirect,isSpOrder) {
    return injectFuns => {
        let payTypeStr = da.getterByField('orderPayType')(injectFuns),
            isSpOrder =isSpOrder|| da.getterByField('isSpOrder')(injectFuns),
            payType
        if (payTypeStr == 'wx') {
            payType = 2
        } else if (payTypeStr == 'zfb') {
            payType = 3
        }
        let payStatusApi = isSpOrder? 'queryPayStatusSp':'queryPayStatus'
        webapi.order[payStatusApi](injectFuns.post, { 'code': code, 'payType': payType }).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            if (data.value == 1) {
                openPaySuccess(onRedirect,isSpOrder)(injectFuns)
            } else if (data.value == -1) {
                injectFuns.reduce('setShowQrCodeLayer', true)
                clearInterval(window.loopQRCodeTimer)
                window.loopQRCodeTimer = ''
            }
        })
    }
}

export function cancelOrder(onRedirect,This) {
    return injectFuns => {
        let { initView, setMessage, clearMessage } = da,
            { reduce, post } = injectFuns,
            orderId = da.getterByField('form.orderId')(injectFuns),
            ts = da.getterByField('form.ts')(injectFuns)
        da.setMessage({
            type: 'confirm',
            title: '提示',
            content: '是否确定取消订单？',
            onCancel: () => {
                updatePayType(da.getterByField('orderPayType')(injectFuns), This, onRedirect)(injectFuns)
                da.clearMessage()(injectFuns)
            },
            onOk: () => {
                da.clearMessage()(injectFuns)
                webapi.order.cancelOnlineOrder(post, { 'id': orderId, 'ts': ts }).then(data => {
                    if(!data.result&&data.value) {
                        return da.setMessage({
                            type: 'warning',
                            title: '提示',
                            content: data.value,
                            okText: '关闭',
                            onOk: () => {
                                da.clearMessage()(injectFuns)
                                window.close()
                            }
                        })(injectFuns)
                    }
                    if (!da.handleWebApiInfo(data)(injectFuns)) return
                    if (data.result) {
                        webapi.order.queryOnlineOrderDetail(injectFuns.post, { 'id': orderId }).then(data2 => {
                            if (!da.handleWebApiInfo(data2)(injectFuns)) return
                            if (data2.result) {
                                if (data2.value && data2.value.payStatus == 2) {
                                    da.setMessage({
                                        type: 'warning',
                                        content: '此订单已支付',
                                        mode: 'message'
                                    })(injectFuns)
                                    window.setTimeout(function () {
                                        onRedirect('apps/login/admin?activeKey=12', true)
                                    }, 3000)
                                    return
                                }
                            }
                        })
                    }
                    onRedirect('apps/login/admin?activeKey=12', true)
                })
            }
        })(injectFuns)
    }
}
export function cancelSpOrder(onRedirect,This) {
    return injectFuns => {
        let { initView, setMessage, clearMessage } = da,
            { reduce, post } = injectFuns,
            orderId = da.getterByField('form.orderId')(injectFuns),
            ts = da.getterByField('form.ts')(injectFuns)
        da.setMessage({
            type: 'confirm',
            title: '提示',
            content: '是否确定取消订单？',
            onCancel: () => {
                da.clearMessage()(injectFuns)
            },
            onOk: () => {
                da.clearMessage()(injectFuns)
                webapi.order.cancelOnlineOrderSp(post, { 'id': orderId, 'ts': ts }).then(data => {
                    if(!data.result&&data.value) {
                        return da.setMessage({
                            type: 'warning',
                            title: '提示',
                            content: data.value,
                            okText: '关闭',
                            onOk: () => {
                                da.clearMessage()(injectFuns)
                                window.close()
                            }
                        })(injectFuns)
                    }
                    if (!da.handleWebApiInfo(data)(injectFuns)) return
                    if (data.result) {
                        webapi.order.queryOnlineSpOrderDetail(injectFuns.post, { 'id': orderId }).then(data2 => {
                            if (!da.handleWebApiInfo(data2)(injectFuns)) return
                            if (data2.result) {
                                if (data2.value && data2.value.payStatus == 2) {
                                    da.setMessage({
                                        type: 'warning',
                                        content: '此订单已支付',
                                        mode: 'message'
                                    })(injectFuns)
                                    window.setTimeout(function () {
                                        onRedirect('apps/login/admin', true)
                                    }, 3000)
                                    return
                                }
                            }
                        })
                    }
                    onRedirect('apps/login/admin', true)
                })
            }
        })(injectFuns)
    }
}
export function setIsAgree(value) {
    return injectFuns => {
        injectFuns.reduce('setIsAgree', value)
    }
}

export function agreementClick() {
    return injectFuns => {
        let { setMessage, clearMessage } = da
        setMessage({
            type: 'app',
            title: '用户协议',
            content: 'app:apps/login/agreement',
            width: 800,
            bodyStyle: { height: 300, overflowY: 'scroll' },
            closable: false,
            onOk: function () {
                clearMessage()(injectFuns)
                injectFuns.reduce('setIsAgree', true)

            }
        })(injectFuns)
    }
}

export function onFieldChange(path, oldValue, newValue) {
    return injectFuns => {
        let { validate, setMessage, clearMessage, getterByField } = da,
            productId = da.getterByField('form.productId')(injectFuns)
        injectFuns.reduce('onFieldFocus', '')
        if (path.indexOf('order.orderCouponCode.formItems.couponCode') != -1) {
            if (typeof (newValue) != 'undefined' && newValue.length == 6) {
                webapi.order.getPriceByCode(injectFuns.post, { saleCode: newValue.toUpperCase(),'productId':productId }).then(data => {
                    if (data.result && (data.value === null || data.value === 0)) {
                        injectFuns.reduce('setShouldPrice', undefined, '')
                        da.setMessage({
                            type: 'warning',
                            content: '请录入有效的优惠码',
                            mode: 'message'
                        })(injectFuns)
                        return
                    }
                    if (!da.handleWebApiInfo(data)(injectFuns)) return
                    let amount = da.getterByField('form.amount')(injectFuns)
                    injectFuns.reduce('setShouldPrice', data.value, newValue)
                })
            }
            else {
                da.onFieldChange(path, oldValue, newValue)(injectFuns)
            }
        } else {
            da.onFieldChange(path, oldValue, newValue)(injectFuns)
        }
    }
}

export function finishPay(onRedirect) {
    return injectFuns => {
        let { initView, setMessage, clearMessage } = da,
            { reduce, post } = injectFuns,
            orderId = da.getterByField('form.orderId')(injectFuns),
            ts = da.getterByField('form.ts')(injectFuns),
            list = {
                id: orderId,
                payStatus: '0',
                ts: ts
            },
            payType = da.getterByField('orderPayType')(injectFuns),
            payTypeNum
        if (payType == 'wx') {
            list.payType = 1
        } else if (payType == 'zfb') {
            list.payType = 3
        }
        webapi.order.pay(post, list).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            onRedirect('apps/login/admin?activeKey=12', true)
        })
    }
}


export function handleRePay(orderId, cb, onRedirect) {
    return injectFuns => {
        if (orderId) {
            webapi.order.queryOnlineOrderDetail(injectFuns.post, { 'id': orderId }).then(data2 => {
                if (!da.handleWebApiInfo(data2)(injectFuns)) return
                if (data2.result) {
                    if (data2.value && data2.value.payStatus == 2) {
                        da.setMessage({
                            type: 'warning',
                            content: '此订单已支付!',
                            mode: 'message'
                        })(injectFuns)
                        window.setTimeout(function () {
                            let host = window.location.host
                            let orderUrl = location.protocol + '//' + host + '/?h=its#apps/login/admin?activeKey=104'
                            window.location.href = orderUrl
                        }, 3000)
                        return
                    }
                }
                if (cb) {
                    cb()
                }
            })
        }
    }
}

export function timespanChange (timespan){
    return injectFuns=>{
        let { setMessage, clearMessage, getterByField } = da,
            form = getterByField('form')(injectFuns).toJS(),

            params = {
                "orgId":form.orgId,
    	        "productId":form.productId,
    	        "timespan":timespan,
    	        "purchaseNum":form.purchaseNum,
    	        "addPurchaseNum":form.addPurchaseNum
            }
        webapi.order.countPrice(injectFuns.post,params).then(data=>{
            form.timespan = data.value.timespan
            form.saleAmount = data.value.saleAmount
            form.productPrice = data.value.productPrice
            form.amount = data.value.amount
            form.endDate = moment(form.beginDate).add(timespan,'year').add(-1,'days').format('YYYY-MM-DD')
            return injectFuns.reduce('updateForm',form)
        })
    }
}
export function addPurchaseNumChange (addPurchaseNum){
    return injectFuns=>{
        let { setMessage, clearMessage, getterByField } = da,
            form = getterByField('form')(injectFuns).toJS(),

            params = {
                "orgId":form.orgId,
    	        "productId":form.productId,
    	        "timespan":form.timespan,
    	        "purchaseNum":form.purchaseNum,
    	        "addPurchaseNum":form.productId==1? (addPurchaseNum-form.purchaseNum):addPurchaseNum
            }
        webapi.order.countPrice(injectFuns.post,params).then(data=>{
            form.addPurchaseNum = data.value.addPurchaseNum
            form.saleAmount = data.value.saleAmount
            form.productPrice = data.value.productPrice
            form.amount = data.value.amount
            return injectFuns.reduce('updateForm',form)
        })
        injectFuns.reduce('updateForm',form)
    }
}
Object.assign(exports, { ...da, ...exports })
