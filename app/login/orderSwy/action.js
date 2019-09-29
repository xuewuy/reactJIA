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
export function initView(This, getQrCode, expert) {
    return injectFuns => {
        let { initView, setMessage, clearMessage } = da,
            { reduce, post } = injectFuns,
            token = sessionStorage.getItem('_accessToken')?sessionStorage.getItem('_accessToken'):localStorage.getItem('token'),
            step = This.props.appParams.step,
            id = This.props.appParams.id,
            orgId = This.props.appParams.orgId,
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
            initStepSecond(id, getQrCode, onRedirect)(injectFuns)
        } else {

            setInitData(orgId, expert)(injectFuns)
        }
        // api.init(injectFuns.post).then(data=>{
        //     injectFuns.reduce('appInfo',data.value)
        // })

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
            // injectFuns.reduce('WeChatPayment',data.value)
            let getPayCode = data.value.content.split('?text=')[1],
                confirmCode = data.value.confirmCode
            da.setMessage({
                type: 'app',
                title: '微信支付',
                content: 'app:apps/login/orderSwy/weChatPay',
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
export function initStepSecond(id, getQrCode, onRedirect) {
    return injectFuns => {
        let secondData, initData
        // webapi.order.queryOnlineOrderList(injectFuns.post, {page:{pageSize:100,currentPage:1}}).then(data => {
        webapi.order.queryOnlineOrderDetailSwy(injectFuns.post, { 'id': id }).then(data => {
            
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            // let list = data.value.list
            // if(list&&list.length) {
            //     for(let i=0;i<list.length;i++) {
            //         if(list[i].id==id) {
            //             secondData = list[i]
            //             return api.init(injectFuns.post)

            //         }
            //     }

            // }
            secondData = data.value
            return api.init(injectFuns.post)

        }).then(data => {
            if (data) {
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                // injectFuns.reduce('initStepSecond',secondData,data.value), 'memo': window.location.origin 
                initData = data.value
                // return webapi.order.queryOnlineOrderList(injectFuns.post, {page:{pageSize:100,currentPage:1}})
                return webapi.order.getWeixinPayCodeSwy(injectFuns.post, { 'id': id, 'memo': window.location.origin})

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
export function setInitData(curOrgId, expert) {
    return injectFuns => {
        let { initView, setMessage, clearMessage } = da,
            { reduce, post } = injectFuns,
            list = {},
            onlineData, productId = 1
        
        if(expert == 'high') {
            productId = 2
        }
        webapi.order.onlineBuySwy(post, { productId: productId }).then(data => {
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
            // reduce('setInitData',data.value,curOrgId)
            return api.init(injectFuns.post)
        }).then(data => {
            if (data) {
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                // injectFuns.reduce('appInfo',data.value)
                if (curOrgId) {
                    webapi.order.existsUnpaidOrderSwy(injectFuns.post).then(data2 => {
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
                                    let orderUrl = location.protocol + '//' + host + '/#apps/login/admin?activeKey=1202'
                                    window.location.href = orderUrl
                                }, 3000)
                                return
                            }
                        }
                    })
                }
                reduce('setInitData', onlineData, curOrgId, data.value, expert)
            }
        })
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

export function updatePayType(value, This, onRedirect) {
    return injectFuns => {
        let { reduce, post } = injectFuns
        if (value == 'wx') {
            updateQrCode(This.getQrCode, onRedirect)(injectFuns)
        } else if (value == 'zfb') {
            setZfbQrCode(This.getZfbQrCode, onRedirect)(injectFuns)
        }
        else if (value == 'openzfb') {

            setZfbQrCode(This.getZfbQrCode, onRedirect, true)(injectFuns)
        }
        reduce('updatePayType', value)
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

export function updateQrCode(getQrCode, onRedirect, e) {
    return injectFuns => {
        let list = {
            id: da.getterByField('orderId')(injectFuns),
            memo: window.location.origin
        }
        webapi.order.getWeixinPayCodeSwy(injectFuns.post, list).then(data => {
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

export function setZfbQrCode(getZfbQrCode, onRedirect, isOpen) {
    return injectFuns => {
        let list = {
            id: da.getterByField('orderId')(injectFuns),
            memo: window.location.origin,
            isPay: isOpen == true ? null : 1
        }
        // injectFuns.reduce('updateCodeInfo',data.value)
        webapi.order.getAlipayPayCodeSwy(injectFuns.post, list).then(data => {
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

export function openPaySuccess(onRedirect) {
    return injectFuns => {
        da.setMessage({
            type: 'app',
            title: '支付成功',
            content: 'app:apps/login/orderSwy/paySuccess',
            okText: '查看订单',
            wrapClassName: 'paySuccess',
            initData: { 'onRedirect': onRedirect, 'clearMessage': da.clearMessage },
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
                onRedirect('apps/login/admin?activeKey=1202', true)
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

export function updateExpert(value) {
    return injectFuns => {
        let { reduce, post } = injectFuns
        
        setInitData(undefined, value)(injectFuns)
//        reduce('updateExpert', value)
    }
}

export function submitOrder(getQrCode, onRedirect) {
    return injectFuns => {
        let { initView, setMessage, clearMessage } = da,
            { reduce, post } = injectFuns,
            form = da.getterByField('form')(injectFuns).toJS(),
            redPackage = da.getterByField('redPackage')(injectFuns) ?da.getterByField('redPackage')(injectFuns).toJS():null,
            redPackageChecked = da.getterByField('redPackageChecked'),
            list = {},
            list2 = {},
            orderInfo

        list.productId = form.productId
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
        list.productId = form.productId

        if(redPackageChecked && redPackage){
            list.redPackage = {
                id:redPackage.id
            }
        }
        webapi.order.createOnlineOrderSwy(post, list).then(data => {
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

export function getPayStatus(code, onRedirect) {
    return injectFuns => {
        let payTypeStr = da.getterByField('orderPayType')(injectFuns),
            payType
        if (payTypeStr == 'wx') {
            payType = 2
        } else if (payTypeStr == 'zfb') {
            payType = 3
        }
        webapi.order.queryPayStatusSwy(injectFuns.post, { 'code': code, 'payType': payType }).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            if (data.value == 1) {
                openPaySuccess(onRedirect)(injectFuns)
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
                webapi.order.cancelOnlineOrderSwy(post, { 'id': orderId, 'ts': ts }).then(data => {
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
                        webapi.order.queryOnlineOrderDetailSwy(injectFuns.post, { 'id': orderId }).then(data2 => {
                            if (!da.handleWebApiInfo(data2)(injectFuns)) return
                            if (data2.result) {
                                if (data2.value && data2.value.payStatus == 2) {
                                    da.setMessage({
                                        type: 'warning',
                                        content: '此订单已支付',
                                        mode: 'message'
                                    })(injectFuns)
                                    window.setTimeout(function () {
                                        onRedirect('apps/login/admin?activeKey=1202', true)
                                    }, 3000)
                                    return
                                }
                            }
                        })
                    }
                    onRedirect('apps/login/admin?activeKey=1202', true)
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
            // initData: da.getterByField('appInfo')(injectFuns),
            closable: false,
            onOk: function () {
                clearMessage()(injectFuns)
                // injectFuns.reduce('agree')
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
                    // if (data.value >= amount) {
                    //     //优惠金额不能大于等于支付金额
                    //     da.setMessage({
                    //         type: 'warning',
                    //         content: '请录入有效的优惠码',
                    //         mode: 'message'
                    //     })(injectFuns)
                    //     return
                    // }
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
            onRedirect('apps/login/admin?activeKey=1202', true)
        })
    }
}


export function handleRePay(orderId, cb, onRedirect) {
    return injectFuns => {
        if (orderId) {
            webapi.order.queryOnlineOrderDetailSwy(injectFuns.post, { 'id': orderId }).then(data2 => {
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
                            let orderUrl = location.protocol + '//' + host + '/#apps/login/admin?activeKey=1202'
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

Object.assign(exports, { ...da, ...exports })
