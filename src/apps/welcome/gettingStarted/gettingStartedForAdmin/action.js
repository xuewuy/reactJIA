import * as da from 'dynamicAction'
import  webapi from 'webapi'
import React from 'react'
import { Button } from 'xComponent'

export function initView(initData,auth,menuIds) {
    return injectFuns => {
        let context = injectFuns.getContext(),
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
            injectFuns.reduce('initView', ajaxData, da.getUtils(exports, injectFuns),taxUrlOne,taxUrlTwo,initData,auth,menuIds)
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