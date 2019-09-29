/**
 * Created by shenxy on 16/8/26.
 */
import * as dr from 'dynamicReducer'
import { List, fromJS } from 'immutable'
import moment from 'moment'
/**
 * 设置初始化页面数据
 * @param {[type]} state     [description]
 * @param {[type]} dataValue [description]
 */
export function setInitData(state,list,data,initData) {
    let form = dr.getterByField(state,'form').toJS(),
        accountingStandardsList = list.accountingStandardsList,
        checkModeList = list.checkModeList,
        industryList = list.industryList,
        businessIncomeTaxModeList = [ list.businessIncomeTaxModeList[0] ],
        vatTaxpayerList = list.vatTaxpayerList,
        customer = data.customer,
        currentDate = new Date(),
        currentYear = currentDate.getFullYear(),
        currentTime = currentYear+1+'-12'
        //代账端在建帐的时候不允许创建餐饮业
        industryList = industryList.filter(item => item.id != 1006)

        state = dr.setter(state,'form.formItems.vatTaxpayer','dataSource',fromJS(vatTaxpayerList))
        state = dr.setter(state,'form.formItems.industry','dataSource',fromJS(industryList))
        state = dr.setter(state,'form.formItems.accountingStandards','dataSource',fromJS(accountingStandardsList))
        state = dr.setter(state,'form.formItems.businessIncomeTaxMode','dataSource',fromJS(businessIncomeTaxModeList))
        state = dr.setter(state,'form.formItems.checkMode','dataSource',fromJS(checkModeList))


        state = dr.setter(state,'form.formItems.enabledDate','max',currentTime)
        //名称
        if(customer&&customer.name) {
            form.name = customer.name
        } else {
            form.name = initData.name
        }
        form.id = initData.id
        //行业
        if(customer&&customer.industry) {
            let currentIndustry
            for(let i=0;i<industryList.length;i++) {
                if(customer.industry == industryList[i].id) {
                    currentIndustry = industryList[i]
                    break
                }
            }
            form.industry = currentIndustry
        } else {
            form.industry = industryList[0]
        }
        //增值税纳税人身份
        if(customer&&customer.vatTaxpayer) {
            let currentVatTaxpayer
            for(let i=0;i<vatTaxpayerList.length;i++) {
                if(customer.vatTaxpayer == vatTaxpayerList[i].id) {
                    currentVatTaxpayer = vatTaxpayerList[i]
                    break
                }
            }
            form.vatTaxpayer = currentVatTaxpayer
        } else {
            form.vatTaxpayer = vatTaxpayerList[0]
        }
        //征收方式
        if(customer&&customer.vatMode) {
            let currentVatMode
            if(customer.vatMode==1) {
                currentVatMode = businessIncomeTaxModeList[0]
            } else {

                for(let i=0;i<businessIncomeTaxModeList.length;i++) {
                    if(customer.vatMode == businessIncomeTaxModeList[i].id) {
                        currentVatMode = businessIncomeTaxModeList[i]
                        break
                    }
                }
            }
            form.businessIncomeTaxMode = currentVatMode
        } else {
            form.businessIncomeTaxMode = businessIncomeTaxModeList[0]
        }
        if(form.businessIncomeTaxMode.id == 36) {
            state = dr.setter(state,'form.formItems.checkMode','disabled',true)
        } else {
            state = dr.setter(state,'form.formItems.checkMode','disabled',false)
        }
        //is
        // if(customer&&customer.isTaxControlUser) {
        //     if(customer.isTaxControlUser==0) {
        //         form.isSmallOrg = {id: '0', name: '是'}
        //     } else {
        //         form.isSmallOrg = {id: 1, name: '否'}
        //     }
        // } else {
        //     form.isSmallOrg = {id: '0', name: '是'}

        // }
        //准则
        if(customer&&customer.accountingStandards) {
            let currentAccountingStandards
            for(let i=0;i<accountingStandardsList.length;i++) {
                if(customer.accountingStandards == accountingStandardsList[i].id) {
                    currentAccountingStandards = accountingStandardsList[i]
                    break
                }
            }
            form.accountingStandards = currentAccountingStandards
        } else {
            form.accountingStandards = {id:19,name: '小企业会计准则2013'}
        }
        //核定checkModeList
        if(customer&&customer.checkMode) {
            let currentCheckMode
            for(let i=0;i<checkModeList.length;i++) {
                if(customer.checkMode == checkModeList[i].id) {
                    currentCheckMode = checkModeList[i]
                    break
                }
            }
            form.checkMode = currentCheckMode
        } else {
            form.checkMode = checkModeList[0]
        }
        //日期
        if(customer&& customer.enabledYear&&customer.enabledMonth) {
            let enabledMonth = customer.enabledMonth,
                enabledYear = customer.enabledYear
            if(enabledMonth-0<10) {
                enabledMonth = '0'+(enabledMonth-0)
            }
            form.enabledDate = enabledYear+'-'+enabledMonth
        } else {
            let date = new Date()
            form.enabledDate = date.getFullYear()+'-01'
        }
        state = dr.setterByField(state,'form',fromJS(form))
        let industry = dr.getterByField(state,'form.industry')
        if(industry.get('id') == '1005'){
            state = dr.setterByField(state,'form.accountingStandards',fromJS({id:19}))
            state = dr.setter(state,'form.formItems.accountingStandards','disabled',true)
        }
    return state
}
export function setAccountingStandards(state,isDisabled){
    state = dr.setter(state,'form.formItems.accountingStandards','disabled',isDisabled)
    if(isDisabled){
        state = dr.setterByField(state,'form.accountingStandards',fromJS({id:19}))
    }
    return state
}

export function onFieldChange(state,path,oldValue,newValue) {
    if(path.indexOf('businessIncomeTaxMode')!=-1) {
        if(newValue.get('id') ==43) {
            state = dr.setter(state,'form.formItems.checkMode','disabled',true)
            state = dr.setterByField(state,'form.checkMode',fromJS({code: "0001", name: "按收入总额核定", id: 350000000000001}))
        } else {
            state = dr.setter(state,'form.formItems.checkMode','disabled',false)
        }
        state = dr.onFieldChange(state,path,oldValue,newValue)
        return state
    } else {
        return  dr.onFieldChange(state, path, oldValue, newValue)

    }
}

export function onFieldFocus(state, path){
    state = dr.clearValidate(state, path)
    return dr.onFieldFocus(state, path)
}

export function isShow(state, visible) {
    state = dr.setter(state, 'form.formItems.fileImg', 'isShow', visible)
    return state
}

export function upload(state,fileList){
    state = dr.setterByField(state, 'form.fileImg', fileList)
    return state
}

Object.assign(exports, {...dr,...exports})
