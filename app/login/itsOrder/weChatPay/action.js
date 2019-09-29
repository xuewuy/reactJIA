import * as da from 'dynamicAction'
import * as api from './api'
import webapi from 'webapi'
import moment from 'moment'

export function initView(initData) {
    return injectFuns => {
        let { setMessage, clearMessage, handleWebApiException, getterByField} = da,
    		{ reduct, post, getContext } = injectFuns,
            data = api.getData()
            window.queryQRCodeTimer = ''
            clearInterval(window.queryQRCodeTimer)                       
            window.queryQRCodeTimer = setInterval(()=>{
            webapi.basicFiles.queryPayStatus(injectFuns.post,{confirmCode:initData.confirmCode,orgId:initData.orgId}).then(data =>{
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                if(data.value == 0){
                    
                }
                if(data.value == 1){
                    // clearInterval(window.window.queryQRCodeTimer)
                    // da.clearMessage()(injectFuns)
                    da.setMessage({
                        type: 'app',
                        title: '支付成功',
                        content: 'app:apps/login/order/paySuccess',
                        okText: '查看订单',
                        wrapClassName:'paySuccess',
                        initData: {onRedirect: initData.onRedirect},
                        width: 410,
                        // initData: {id: cardId},
                        refName: 'paySuccess',
                        onCancel: (cb)=> {
                            da.clearMessage()(injectFuns)
                        },
                        onOk: (cb)=> {          
                            da.clearMessage()(injectFuns)
                            // this.props.removeAllTab()
                            initData.onRedirect('apps/login/admin',true)
                        }
                    })(injectFuns)
                }
                if(data.value == -1){
                   clearInterval(window.queryQRCodeTimer)                         
                }
                injectFuns.reduce('currentStep',data.value)
            })
        },2000)
    	da.initView({meta:api.getMeta(), data:data}, exports)(injectFuns)
    }
}

export function onOk(cb){
    return injectFuns =>{
    } 
}
export function onCancel(cb){
    return injectFuns =>{
        clearInterval(window.queryQRCodeTimer)
        cb({result: true})
    } 
}

Object.assign(exports,{...da,...exports})