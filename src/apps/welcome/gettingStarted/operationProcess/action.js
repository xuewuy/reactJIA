import * as da from 'dynamicAction'
import  webapi from 'webapi'
import React from 'react'
import { Button } from 'xComponent'

export function initView(initData,auth,menuIds) {
    return injectFuns => {
        let context = injectFuns.getContext(),
            industry = context.currentOrg.industry,
            businessIncomeTaxMode = context.currentOrg.businessIncomeTaxMode,
            vatTaxpayer = context.currentOrg.vatTaxpayer,
            taxUrlOne,taxUrlTwo

        if(vatTaxpayer==42) {
            taxUrlOne = 'apps/fi/manageTax/declareTaxOfValueAdded'
        } else if(vatTaxpayer==41) {
            taxUrlOne = 'apps/fi/manageTax/declareTaxOfValueAddedGeneral'
        }
        if (context.appInfo.id == 1001 && !localStorage.getItem('isShowFxHelpTip') && context.isTips==1){
            da.setMessage({
                type: 'confirm',
                title: '提示',
                content: <div style={{fontSize:'16px',marginTop:'20px',height:'100px'}}>请在系统设置-企业信息-关键信息中设置行业、纳税人身份、会计准则、启用期间等信息!</div> ,
                width: 500,
                okText: '我知道了',
                hideFooter:true,
                footer:[
                    <Button key="confirm"
                        type="primary"
                        size="large"
                        onClick={() => {
                            localStorage.setItem('isShowFxHelpTip', true)
                            da.clearMessage()(injectFuns)
                        }}
                    >
                        {'知道了'}
                    </Button>
                ]
            })(injectFuns)
        }
        
    	webapi.portal.getGettingStartedInitData(injectFuns.post).then(ajaxData=>{

            if(!da.handleWebApiException(ajaxData)(injectFuns)) 
                return 
            ajaxData.appId = context.appInfo.id
            injectFuns.reduce('initView', ajaxData, da.getUtils(exports, injectFuns),taxUrlOne,taxUrlTwo,initData,auth,menuIds,industry)
        })
        
    }
}
export function openIts() {
    return injectFuns => {
        var newWindow = window.open('',"_blank")
        newWindow.document.innerHTML = '正在加载中请稍后。。。'
        da.showLoadingMask({content:'正在同步数据...'})(injectFuns)

        webapi.tax.itsSync(injectFuns.post).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) {
                newWindow.close()
                da.hideLoadingMask()(injectFuns)
                return
            }
            da.hideLoadingMask()(injectFuns)

            if(data.value) {

                if(data.value.url=='https://devits.rrtimes.com') {
                    if(window.location.href.indexOf('127')!=-1) {
                        newWindow.location.href = `http://devits.rrtimes.com/v1/authorize#authorization_code=${data.value.token}&from_url=${window.location.origin}`

                    } else {

                        newWindow.location.href = `https://devits.rrtimes.com/v1/authorize#authorization_code=${data.value.token}&from_url=${window.location.origin}`
                    }

                } else {
                    newWindow.location.href = `${data.value.url}/v1/authorize#authorization_code=${data.value.token}&from_url=${window.location.origin}`

                }
            } else {
                newWindow.close()
            }

        })
    }
}
export function close(){
	return injectFuns =>{
		webapi.portal.closeGettingStarted(injectFuns.post).then(ajaxData=>{
		 	if(!da.handleWebApiException(ajaxData)(injectFuns)) 
                return 
		})
	}
}

Object.assign(exports, {...da, ...exports})