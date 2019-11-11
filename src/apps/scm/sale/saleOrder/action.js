import * as da from 'dynamicAction'
import * as api from './api'
import { fromJS, List, Map, is } from 'immutable'
import webapi from 'webapi'
import React from 'react'
import { Button,Notification} from 'xComponent'
import moment from "moment";
import * as consts from '../../utils/consts'
export const STATUS_VOUCHER_NOT_AUDITED = 127      //未审核
export const STATUS_VOUCHER_AUDITED = 128          //已审核
export const STATUS_VOUCHER_WRITEOFF = 129   //已核销

export const STATUS_VOUCHER_BASESALE=132        //普通销售
export const STATUS_VOUCHER_SALEREJECTED=133    //销售退货

export const STATUS_ADD = 1        //新增
export const STATUS_VIEW = 2       //查看
export const STATUS_EDIT = 3       //编辑 (查看状态下进行了修改)


export const MAX_ATTACH_COUNT = 10000   //附件数上限

export function initView(initData) {
    return injectFuns => {
        let initVoucherData = getEmptyVoucher()(injectFuns),
            context = injectFuns.getContext()
        let currentUserLimits=null
        if(context.currentUser)
            currentUserLimits = context.currentUser.roles[0].code

        da.initView({
            meta: api.voucher.meta,
            data: {
                voucherData: initVoucherData,
                editStatus: STATUS_ADD,             //编辑状态 //初始化参数,默认为新增状态;
                currentUserLimits:currentUserLimits
            }
        }, exports)(injectFuns)

        if (!initData) {
            let voucherInitData,deliveryTypeId=STATUS_VOUCHER_BASESALE
            //if(false)deliveryTypeId=STATUS_VOUCHER_SALEREJECTED//新增销售退货，暂时没有

            webapi.pu.init(injectFuns.post,{"deliveryTypeId":deliveryTypeId}).then(data=>{
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                voucherInitData=data.value
                return webapi.receipt.getInventorys(injectFuns.post,{'status':true, 'notNeedPage':true})
            }).then(data=>{
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                injectFuns.reduce('initNewVoucher', voucherInitData, data.value)
            })
        }
        else if (initData.id) {
            webapi.pu.queryById(injectFuns.post, initData.id).then(data => {
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                let ajaxData=data.value
                if(initData.stype=='rejected'){
                    //退货(【数量及合计】为负数\【金额含税及合计】为负数【税额及合计】为负数【结算金额】为负数【收款金额】为负数)
                    // let dataList=ajaxData.details.map(o=>{
                       
                    // })
                    //应收金额为负数

                    if(ajaxData){
                        ajaxData.totalSettleAmount=-(ajaxData.totalSettleAmount)
                        if(ajaxData.settlementMoney ==null) {
                            ajaxData.settlementMoney='0.00'
                        }
                        ajaxData.settlementMoney=ajaxData.totalSettleAmount
                        ajaxData.receiveAmount=-parseFloat(ajaxData.receiveAmount).toFixed(2)
                        for (let i = 0; i < ajaxData.details.length; i++) {
                            ajaxData.details[i].quantity=-(ajaxData.details[i].quantity)
                            ajaxData.details[i].amount=-(ajaxData.details[i].amount)
                            ajaxData.details[i].amountWithTax=-(ajaxData.details[i].amountWithTax)
                            ajaxData.details[i].tax=-(ajaxData.details[i].tax)
                        }
                        ajaxData.deliveryTypeId=STATUS_VOUCHER_SALEREJECTED
                    }
                }
                if(initData.isCreateSaleReturn) {
                    ajaxData.code=''
                }
                injectFuns.reduce('initLoadVoucher', fromJS(ajaxData))
            })
        }
    }
}

//当前app的 "tab被点击" (从其他app切换到当前app)
export function onTabFocus() {
    return injectFuns => {
        webapi.receipt.getInventorys(injectFuns.post, {'status':true, 'notNeedPage':true}).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            injectFuns.reduce('initVoucherSubject', data.value)
        })
    }
}

export function setSettleReadOnly(settleReadOnly,receivePayAmount){
    return injectFuns =>{
        //预收款>本次结算时，收款方式和收款金额不可用
        injectFuns.reduce('setSettleReadOnly', settleReadOnly,receivePayAmount)
        if(receivePayAmount !='' || receivePayAmount !=null ){
            
        }
    }
}

//其他模块 "代码调用addTab" 激活该模块时, 可能需要根据initData来刷新界面数据
export function activeByAddTab(initData) {
    return injectFuns => {
        if (initData && initData.id) {
            checkEditStatusBeforeLoadNewVoucher(() => {
                webapi.pu.queryById(injectFuns.post, initData.id).then(data => {
                    if (!da.handleWebApiInfo(data)(injectFuns)) return
                    injectFuns.reduce('initLoadVoucher', fromJS(data.value))                    
                })
            })(injectFuns)
        }
    }
}

export function onFieldFocus(path) {
    return injectFuns => {
        da.onFieldFocus(path)(injectFuns)
    }
}
export function onEvent(eventName, option) {
    return (injectFuns) => {
        if (!option.path) {
            return
        }

        let {parsePath, setMessage} = da
        let parsedPath = parsePath(option.path)
        // vars = parsedPath.vars

        if (eventName === 'onDropdownFooterClick') {
            if (parsedPath.path == 'voucher.voucherBody.inventoryService') {
                showAddDoc(injectFuns,parsedPath,option)
            }
            else if(parsedPath.path == 'voucher.voucherHeader.formItems.customer'){
                showAddDoc(injectFuns,parsedPath,option)
            }
            else if(parsedPath.path == 'voucher.voucherFooter.formItems.bankAccount'){
                showAddDoc(injectFuns, parsedPath,option)
            }
            else if(parsedPath.path == 'voucher.voucherHeader.formItems.person'){
                showAddDoc(injectFuns, parsedPath,option)
            }
        }
        else if (eventName === 'onLinkClick') {
            if (parsedPath.path == 'root.body.cancelVoucherCode') {
                let rowIndex = parsePath(option.path).vars[0]
                toDetail(rowIndex)
            }
        }
        else if(eventName === 'onLinkAddColumn') {
            let lastClickInfoTime = new Date().getTime()
            setTimeout(() => {  //处理点击一次增加两行的缺陷
                let addTime = new Date().getTime()
                if(lastClickInfoTime && (addTime - lastClickInfoTime <= 10)) {
                    injectFuns.reduce('insertRow', parsedPath.vars[0])
                }
            },0)
        }
        else if(eventName === 'onLinkDelColumn') {
            let lastClickInfoTime = new Date().getTime()
            setTimeout(() => {  //处理点击一次删除两行的缺陷
                let delTime = new Date().getTime()
                if(lastClickInfoTime && (delTime - lastClickInfoTime <= 10)) {
                    injectFuns.reduce('delRow', parsedPath.vars[0])
                    injectFuns.reduce('calcSettlementAmount','')
                }
            },0)
        }
        //点击了商品输入框内的"参照"按钮
        else if (eventName === 'onInputButtonClick') {
            if (parsedPath.path == 'voucher.voucherBody.inventoryService') {
                selectAccountingSubject(option.path)(injectFuns)
            }
        }
        else {
            //重写dynamicAction的事件后,需要再手工执行一下父类事件
            da.onEvent(eventName, option)(injectFuns)
        }
    }
}

/**
 * 显示新增账号档案界面
 * @param  {[type]} injectFuns [description]
 * @param  {[type]}        [description]
 * @return {[type]}            [description]
 */
export function showAddDoc(injectFuns, parsePath,click) {
    let { clearMessage, setMessage } = da,
        width = 360,
        appPath, appTitle = '新增', initData,onOk,path=parsePath.path
    if (path.indexOf('bankAccount') != -1) {
        var settlement, settlementId, accountType
        settlement = da.getterByField('voucherData.voucherFooter.bankAccount')(injectFuns)
        settlementId = (settlement ? settlement.get('id') : -1)
        appTitle = '新增账号'
        switch (settlementId) {
            case consts.settlementType.yh.id:
                accountType = 99
                break
            case consts.settlementType.wx.id:
                accountType = 100
                break
            case consts.settlementType.zfb.id:
                accountType = 101
                break
            case consts.settlementType.xj.id:
                accountType=1
                break
            case consts.settlementType.zbzf.id:
                accountType=6
                break
            default:
                accountType = 99
                break
        }

        initData = { judgeTabsContent: 'bankAccount', addOrModify: 'add', accountType }
        appPath = 'app:apps/systemSetting/basicFileMaintenance/basicFiles'

        setMessage({
            type: 'app',
            title: appTitle,
            content: appPath,
            okText: '保存',
            refName: 'showAddDocModal',
            width: width,
            initData: initData,
            onCancel: () => { clearMessage()(injectFuns) },
            onOk: (result) => {
                clearMessage()(injectFuns)
            }
        })(injectFuns)
        return
    }
    else if(path.indexOf('person') !=-1){
        let appTitle = '新增销售员',
        initData,
        appPath = 'app:apps/systemSetting/deptPerson/personCard',
        judgeBasicFiles,
        width=700,
        path='voucherData.voucherHeader.person'
        
        onOk = (result)=>{
            let person = result.person
            if(person){

                injectFuns.reduce('selectAddedItem', path, fromJS({
                    id:person.id, 
                    name:person.name + 
                        (person.mobile ? (`(${person.mobile.substring(0,3)}****${person.mobile.substring(person.mobile.length-3,4)})`): ''),
                    department:{id:person.departmentId,name:person.deptName}
                }))
            }
        }


        setMessage({
            type: 'app',
            title: appTitle,
            content: appPath,
            okText: '保存',
            refName: 'showAddDocModal',
            width: width,
            initData: initData,
            onCancel: () => {
                clearMessage()(injectFuns)
            },
            onOk: (result) => {
                clearMessage()(injectFuns)
                onOk(result)
            }
        })(injectFuns)
       
    }
    else if(path.indexOf('customer') !=-1){
        let appTitle = '新增客户',
        initData = { judgeTabsContent: 'customerArchive', addOrModify: 'add', judgeTabsValue: '0' },
        appPath = 'app:apps/systemSetting/basicFileMaintenance/basicFiles',
        judgeBasicFiles,
        path='voucherData.voucherHeader.customer'


        onOk = (result)=>{
            let cust = result.judgeBasicFiles && result.judgeBasicFiles.list
            if(cust){
                injectFuns.reduce('selectAddedItem', path, fromJS({
                    id:cust.id, 
                    code:cust.code,
                    name:cust.name
                }))
            }
        }

        setMessage({
            type: 'app',
            title: appTitle,
            content: appPath,
            okText: '保存',
            refName: 'showAddDocModal',
            width: 360,
            initData: initData,
            onCancel: () => {
                clearMessage()(injectFuns)
            },
            onOk: (result) => {
                clearMessage()(injectFuns)
                onOk(result)
            }
        })(injectFuns)
       
    }
    else if(path.indexOf('inventoryService') !=-1){
        appTitle = '新增商品'
        initData = { judgeTabsContent: 'inventory', addOrModify: 'add', judgeTabsValue: '2', isSaleOrder: true }
        appPath = 'app:apps/systemSetting/basicFileMaintenance/basicFiles/inventoryCard'
        let bizTypeCode = null
        onOk = (result)=>{
            let goods = result.judgeBasicFiles && result.judgeBasicFiles.list
            if(goods){
                injectFuns.reduce('setValueByPath', parsePath, fromJS({
                    id:goods.id,
                    code:goods.code,
                    name:goods.name,
                    codeAndName:goods.name,
                    company : goods.unitName, // 单位
                    taxRate : ( goods.propertyRate / 100  ), //税率(%)
                    specification : goods.specification,
                    index:parseInt(parsePath.vars[0]),
                    sale:goods.sale,
                    sellingPrice:goods.sellingPrice,
                    purchase:goods.purchase,
                    purchasePrice:goods.purchasePrice
                }))
            }
        }

        webapi.basicFiles.inventoryProperty(injectFuns.post,{businessCode:bizTypeCode}).then(ajaxData=>{
            if (!da.handleWebApiException(ajaxData)(injectFuns)) return
            initData.propertys = ajaxData.value
            setMessage({
                type: 'app',
                title: appTitle,
                content: appPath,
                okText: '保存',
                refName: 'showAddDocModal',
                width: 700,
                initData: initData,
                onCancel: () => { 
                    clearMessage()(injectFuns) 
                },
                onOk: (result) => {
                    clearMessage()(injectFuns)
                    onOk(result)
                }
            })(injectFuns)

        
        })
        return
    }
}
//点击grid中的cell时,会调用该方法,获取下拉菜单的数据
export function getterByAjax(path, property, onSuccess) {
    return injectFuns=> {
        if (!path) return
        let {parsePath} = da
        let parsedPath = parsePath(path)
           
        //点击 客户 发起请求 
        if (parsedPath.path === 'voucher.voucherHeader.formItems.customer' && property === 'dataSource') {
            let list = {
                "isContentEmpty": false,
                "status": true,
                "notNeedPage": true,
                "page": {
                    "currentPage": 1,
                    "pageSize": 50
                }
            }
            webapi.basicFiles.consumerQuery(injectFuns.post, list).then(data => {
                if (!da.handleWebApiInfo(data)(injectFuns)) return

                onSuccess(fromJS(data.value.dataList))
            })
        }
        else if (parsedPath.path === 'voucher.voucherHeader.formItems.person' && property === 'dataSource') {
            webapi.person.getPersonDeptList(injectFuns.post).then(data => {
                if (!da.handleWebApiInfo(data)(injectFuns)) return

                onSuccess(fromJS(data.value.dataList == null ?data.value:data.value.dataList))
            })
        }
        else if (parsedPath.path === 'voucher.voucherFooter.formItems.bankAccount' && property === 'dataSource') {
            let bankAccountTypeIds =[98,99,101,100,152]
            webapi.receipt.queryBankAccountByType(injectFuns.post,bankAccountTypeIds).then(data=>{
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                
                onSuccess(fromJS(data.value).filter(o=>{
                    return o.get('code') !='CJYSK'//过滤掉预收款
                }))
            })
        }
        else if(parsedPath.path === 'voucher.voucherBody.inventoryService' && property === 'dataSource'){
            webapi.receipt.getInventorys(injectFuns.post,{'status':true, 'notNeedPage':true}).then(data => {
                if (!da.handleWebApiInfo(data)(injectFuns)) return

                onSuccess(fromJS(data.value.dataList == null ?data.value:data.value.dataList))
            })
        }

    }
}

export function onFieldChange(path, oldValue, newValue) {
    return (injectFuns) => {
        let {parsePath,handleWebApiException} = da
        let parsedPath = parsePath(path),
            rowIndex =parseInt(path.split(',')[1])
        if (da.getterByField('editStatus')(injectFuns) == STATUS_VIEW
            && da.getterByField('voucherData.voucherHeader.state' != STATUS_VOUCHER_AUDITED)
            && oldValue != newValue) {
            injectFuns.reduce('changeStatus', STATUS_EDIT, STATUS_VOUCHER_NOT_AUDITED)
        }
        //选中商品??后期用immutable update重构一下
        if(parsedPath.path ==='voucher.voucherBody.inventoryService'){

            let invobj = typeof(newValue) !='string' ? newValue.toJS() : {},
                invValue = {
                    company : invobj.unitName, // 单位
                    taxRate : ( invobj.propertyRate / 100  ), //税率(%)
                    specification : invobj.specification,
                    index:rowIndex,
                    sale:invobj.sale,
                    sellingPrice:invobj.sellingPrice || '',
                    purchase:invobj.purchase,
                    purchasePrice:invobj.purchasePrice || '',
                    name:invobj.name,
                    id:invobj.id,
                    helpCode:invobj.helpCode,
                    code:invobj.code
                }
            injectFuns.reduce('InventoryProp',invValue,true)
        }
        else if(parsedPath.path ==='voucher.voucherHeader.formItems.customer'){
            let requestData = {
                "customerId": newValue.toJS().id, // 客户id
                "orgId": newValue.toJS(). orgId // 客户组织号
            }
            webapi.pu.queryByCustomer(injectFuns.post,requestData).then(ajaxData => {
                if (!handleWebApiException(ajaxData)(injectFuns)) return
                // "preReceivePayAmount":100.0, --预收款，还有多少余额
                // "overdraftAmount":1000.0 --客户欠款，
                injectFuns.reduce('customerSettleMoney',ajaxData.value)
            })
        }
        else if(parsedPath.path ==='voucher.voucherFooter.formItems.bankAccount'){
            //如果选择暂不支付，表示收款金额为0，不允许修改
           injectFuns.reduce('bankAccountStatus',newValue)
        }
        else if(parsedPath.path ==='voucher.voucherHeader.formItems.person'){
            injectFuns.reduce('personStatus',newValue)
        }
        else if(parsedPath.path === 'voucher.voucherBody.unitPriceTax'){ // 修改单价含税
            let detailsAll = da.getterByField('voucherData.voucherItems')(injectFuns).toJS()[rowIndex], // 这行的 全部数据
                newValueChange = newValue == '' ? 0 : newValue,          // 拿到 数量 准备计算
                jsonData = {
                    unitPriceTax : newValueChange,                       // 单价含税
                    number : detailsAll.number,                          // 数量
                    amountOfMoneyTax : detailsAll.amountOfMoneyTax,      // 金额含税
                    taxRate : detailsAll.taxRate,                        // 税率
                    amountOfMoney:detailsAll.amountOfMoney,              // 金额
                },
                currentAmountOfMoneyTax =  fnAmountOfMoneyTax(jsonData), // 设置当前金额含税
                data_tax = {
                    amountOfMoneyTax : currentAmountOfMoneyTax.amountOfMoneyTax,
                    taxRate : detailsAll.taxRate,                        // 税率
                },                
                currentAmountOfMoney = fnAmountOfMoney(data_tax),  // 设置当前金额,金额 = 金额（含税）/(1+税率)
                data_amount = {
                    amountOfMoneyTax : currentAmountOfMoneyTax.amountOfMoneyTax,
                    amountOfMoney:currentAmountOfMoney.amountOfMoney, //金额
                },
                currentTax = fnTax(data_amount),                    // 设置当前税额方法  // 税额 = 金额（含税）－金额
                data_price = {
                    amountOfMoney : data_amount.amountOfMoney,     // 最新金额 
                    number : detailsAll.number, //  数量
                },
                currentUnitPrice = fnUnitPrice(data_price), //设置当前单价方法//单价 = 金额 / 数量
                setData = {
                    currentAmountOfMoneyTax:currentAmountOfMoneyTax,
                    currentAmountOfMoney:currentAmountOfMoney,
                    currentTax:currentTax,
                    currentUnitPrice:currentUnitPrice
                }
                injectFuns.reduce('amountOfMoneyTax',setData,rowIndex)
        }
        else if(parsedPath.path === 'voucher.voucherBody.number'){
            //修改数量
                let newAmountOfMoney = da.getterByField('voucherData.voucherItems')(injectFuns).toJS()[rowIndex],
                newValueChange_z = newValue == '' ? 0 : newValue,
                jsonData_z = {
                    amountOfMoneyTax : newAmountOfMoney.amountOfMoneyTax, // 金额（含税）
                    number : newValueChange_z, // 数量
                    unitPriceTax : newAmountOfMoney.unitPriceTax,          // 单价含税
                    amountOfMoney : newAmountOfMoney.amountOfMoney,        // 金额
                },
                currentAmountOfMoneyTax = fnAmountOfMoneyTax(jsonData_z),  //设置当前  金额含税 方法
                // 我要 知道  金额 怎么算
                jsonData_z_two = {
                    amountOfMoneyTax : currentAmountOfMoneyTax.amountOfMoneyTax, // 得出来的 金额（含税）
                    number : newValueChange_z, // 数量

                },
                currentUnitPriceTax = fnUnitPriceTax(jsonData_z_two),      //设置当前单价含税方法 ，在这里保存的 //单价(含税) = 金额（含税）/ 数量
                
                jsonData_z_three = {
                    amountOfMoneyTax : jsonData_z_two.amountOfMoneyTax,
                    taxRate : newAmountOfMoney.taxRate,                    //税率
                },
                currentAmountOfMoney = fnAmountOfMoney(jsonData_z_three),  //设置当前  金额 方法  // 金额 = 金额（含税）/(1+税率)
                jsonData_z_four = {
                    amountOfMoney : currentAmountOfMoney.amountOfMoney,    // 最新的 金额
                    number : newValueChange_z, // 数量
                },
                currentUnitPrice = fnUnitPrice(jsonData_z_four),           //设置当前  单价 方法  // 单价 = 金额 / 数量
                jsonData_z_five = {
                    amountOfMoneyTax : jsonData_z_two.amountOfMoneyTax,    //最新的  金额（含税）
                    amountOfMoney : jsonData_z_four.amountOfMoney,         //最新的  金额
                },
                currentTax = fnTax(jsonData_z_five),           //设置当前 税额 方法  // 税额 = 金额（含税）－金额

                setData= {
                    currentAmountOfMoneyTax : currentAmountOfMoneyTax, 
                    currentUnitPriceTax : currentUnitPriceTax,
                    currentUnitPrice : currentUnitPrice,
                    currentAmountOfMoney : currentAmountOfMoney,
                    currentTax : currentTax
                }
                injectFuns.reduce('newUnitPrice',setData,rowIndex)
        }
        else if(parsedPath.path === 'voucher.voucherBody.amountOfMoneyTax'){
            //金额（含税）
            let detailsAllAmount = da.getterByField('voucherData.voucherItems')(injectFuns).toJS()[rowIndex],
                newValueChange_za = newValue == '' ? 0 : newValue,
                jsonData_za = { 
                    //设置当前单价 (含税) 方法 ,要用的
                    amountOfMoneyTax : newValueChange_za,               // 金额（含税）
                    number : detailsAllAmount.number,                   // 数量
                    taxRate : detailsAllAmount.taxRate,                 // 税率
                    amountOfMoney : detailsAllAmount.amountOfMoney      // 金额
                },  
                currentUP = fnUnitPriceTax(jsonData_za),                // 设置当前 单价 (含税) 方法 ，在这里 保存
                currentAOM = fnAmountOfMoney(jsonData_za),              // 设置当前 金额 方法  
               
                jsonData_za_two = {
                    unitPriceTax : currentUP.unitPriceTax,          //最新的 单价 （含税）
                    number : detailsAllAmount.number,   //数量
                },
                //金额（含税） = 单价含税*数量
                currentUnitPriceTax = fnAmountOfMoneyTax(jsonData_za_two),        //专门求  金额（含税） = 单价含税*数量
                jsonData_za_three = {
                    amountOfMoneyTax : currentUnitPriceTax.amountOfMoneyTax,  //最新的 金额（含税）
                    amountOfMoney : currentAOM.amountOfMoney,        // 最新的 金额
                },
                currentTax = fnTax(jsonData_za_three),                         //设置当前  税额 方法  // 税额 = 金额（含税）－金额
                jsonData_za_four = {
                    amountOfMoney : jsonData_za_three.amountOfMoney, // 最新的 金额
                    number : jsonData_za_two.number,          // 数量
                },
                currentUnitPrice = fnUnitPrice(jsonData_za_four),               //设置当前  单价 方法  // 单价 = 金额 / 数量
                setData = {
                    currentUP : currentUP,
                    currentAOM : currentAOM, 
                    currentTax : currentTax,
                    currentUnitPrice : currentUnitPrice
                    // currentAOfMTax : currentAOfMTax

                }
                injectFuns.reduce('amountOfTaxAndAmountOfMoney',setData,rowIndex)
        }
        else if (parsedPath.path === 'voucher.voucherHeader.formItems.date') {
            let oldDate = moment(oldValue),
                newDate = moment(newValue)

            if (oldDate.year() != newDate.year() || oldDate.month() != newDate.month()) {
                webapi.voucher.getNewCode(injectFuns.post, newDate.year(), newDate.month() + 1).then(data => {
                    if (!da.handleWebApiInfo(data)(injectFuns)) return

                    injectFuns.reduce('initVoucherCode', data.value && data.value.code)
                })
            }
        }
        //附件数,上限限制为1W
        else if (parsedPath.path === 'voucher.voucherHeader.formItems.attachCount') {
            if (isNaN(newValue) || parseInt(newValue) > MAX_ATTACH_COUNT) {
                da.setMessage({type: 'warning', mode: 'message', content: '附件数最大为' + MAX_ATTACH_COUNT})(injectFuns)

                setTimeout(() => {
                    da.onFieldChange(path, newValue, MAX_ATTACH_COUNT)(injectFuns)
                }, 16)
            }
        }
        da.onFieldChange(path, oldValue, newValue)(injectFuns)
    }
}



//弹出选择商品的界面
export function selectAccountingSubject(path,value) {
    return injectFuns => {
        let handleAddAndSelect = () => {
            da.clearMessage()(injectFuns)
        }
        let bizTypeCode = null,initData2
        webapi.basicFiles.inventoryProperty(injectFuns.post,{businessCode:bizTypeCode}).then(ajaxData=>{
            if (!da.handleWebApiException(ajaxData)(injectFuns)) return
                initData2 = ajaxData.value
                da.setMessage({
                type: 'app',
                title: '商品或服务名称',
                content: 'app:apps/systemSetting/basicFileMaintenance/inventory',
                okText: '确定',
                refName:'refInventoryModal',
                wrapClassName:'specialFooter',
                width: 700,
                footerLeft:<Button type="ghost" size="large" style={{float: 'left'}} onClick={handleAddAndSelect}>连续选择</Button>,
                initData: initData2,
                onCancel: ()=>{
                    da.clearMessage()(injectFuns)
                } ,
                onOk: (data)=>{
                    da.clearMessage()(injectFuns)
                    if(data.result) {
                        let isAddMore = true
                        injectFuns.reduce('loadVoucher', data.list, da.getterByField('editStatus')(injectFuns), isAddMore)
                    }
                }
            })(injectFuns)    
        })        
    }
}

function getEmptyVoucher() {
    return injectFuns => {
        let voucher = api.emptyVoucherData
        voucher.voucherHeader.code = ''
        voucher.voucherHeader.saleDate = moment().format('YYYY-MM-DD')
        voucher.voucherHeader.maker = injectFuns.getContext().currentUser && injectFuns.getContext().currentUser.name
        voucher.voucherHeader.makerId = injectFuns.getContext().currentUser && injectFuns.getContext().currentUser.id
        return voucher
    }
}

export function loadPrivVoucher() {
    return injectFuns=> {
        checkEditStatusBeforeLoadNewVoucher(() => {
            let code = da.getterByField('voucherData.voucherHeader.code')(injectFuns)

            webapi.pu.prev(injectFuns.post, code).then(data => {
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                injectFuns.reduce('loadVoucher', fromJS(data.value), STATUS_VIEW)
            })
        })(injectFuns)
    }
}

export function loadNextVoucher() {
    return injectFuns=> {
        checkEditStatusBeforeLoadNewVoucher(() => {
            let code = da.getterByField('voucherData.voucherHeader.code')(injectFuns)

            webapi.pu.next(injectFuns.post, code).then(data => {
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                injectFuns.reduce('loadVoucher', fromJS(data.value), STATUS_VIEW)
            })
        })(injectFuns)
    }
}

//在加载新单据(空单据)前, 检查并提示保存修改
function checkEditStatusBeforeLoadNewVoucher(callBack) {
    return injectFuns => {
        let needSave = false        //是否需要提示保存: 编辑状态 || 新增状态并填写了分录
        if (da.getterByField('editStatus')(injectFuns) == STATUS_EDIT) {
            needSave = true
        }
        else if (da.getterByField('editStatus')(injectFuns) == STATUS_ADD) {
            let voucherItems = da.getterByField('voucherData')(injectFuns).get('voucherItems')
            if (voucherItems) {
                let emptyItem = Map(api.blankVoucherItem)
                for (let item of voucherItems) {
                    if (item && !is(item, emptyItem)) {
                        needSave = true
                        break
                    }
                }
            }
        }

        if (needSave) {
            let handleNegative = () => {
                    da.clearMessage()(injectFuns)
                    callBack()
                },
                handleOk = () => {
                    da.clearMessage()(injectFuns)

                    save(() => {
                        callBack()
                    })(injectFuns)
                }


            da.setMessage({
                type: 'modal',
                title: '保存修改',
                content: <div style={{textAlign: 'center'}}>您的单据尚未保存，是否要保存?</div>,
                refName: 'voucherSaveModal',
                hideFooter: true,
                footer: [
                        <Button key="back" type="ghost"onClick={handleNegative}>否</Button>,
                        <Button key="submit" type="primary"onClick={handleOk}>是</Button>
                    ],
                width: 360,
                onCancel: ()=>{
                    da.clearMessage()(injectFuns)
                }
            })(injectFuns)
        }
        else {
            callBack()
        }
    }
}

//保存前的数据校验
function checkVoucherDataBeforeSave(voucherData) {
    return injectFuns => {
        //明细行
        let errorMsg = {},
            errorMsgList=List()
        // 余额 + 收款金额 不能 大于 结算金额，否则提示“收款金额超出应结算金额X元，请核实”
        let prePayment =Number(da.getterByField('voucher.voucherFooter.formItems.prePayment')(injectFuns)),
            stype=voucherData.voucherHeader.deliveryTypeId,
            overdraftAmount=Number(da.getterByField('voucher.voucherFooter.formItems.overdraftAmount')(injectFuns)),
            settleType=voucherData.voucherFooter.bankAccount.id,
            //parseFloat(voucherData.voucherFooter.prePayment),// 余额
            settlementMoney = parseFloat(voucherData.voucherFooter.settlementMoney)//收款金额
        let PrePaymentAndSettlementMoney = parseFloat(prePayment + settlementMoney),
            settlementAmount = parseFloat(voucherData.voucherFooter.settlementAmount)//应结算金额
        let tips={
            title:'',
            modalDialog:false,
            canSave:true
        }
        
        if(settleType !=6){
            //现结
            if(voucherData.voucherHeader.deliveryTypeId==STATUS_VOUCHER_SALEREJECTED){
                if(voucherData.voucherFooter.settlementMoney >=parseFloat(0)){
                    tips.title='销售退货的收款金额不能大于0元！'
                    tips.canSave=false
                    tips.modalDialog=false
                    return tips
                }
            }
            else{
                if(settlementMoney<=0){
                    tips.title='收款金额不能小于等于0元！'
                    tips.canSave=false
                    return tips
                }
            }
            if(settlementMoney+prePayment>settlementAmount+overdraftAmount){
                let v=parseFloat(settlementMoney+prePayment-settlementAmount-overdraftAmount)
                tips.title='收款金额超出应结算金额¥'+v.toFixed(2)+'元，请核实！'
                tips.canSave=false
                return tips
            }
            else if(settlementMoney+prePayment <settlementAmount+overdraftAmount){
                let v=parseFloat(settlementAmount+overdraftAmount-settlementMoney-prePayment)
                tips.title='本次交易欠款¥'+Math.abs(v).toFixed(2)+'元。'
                if(prePayment>0){
                    tips.title+='使用余额¥'+prePayment.toFixed(2)+'元用于本次折扣！'
                }
                tips.canSave=true
                tips.modalDialog=true
                return tips
            }
           
        }
        else{
            if(settlementMoney>0){
                tips.title='收款账号为暂不支付，收款金额不能大于0元！'
                tips.canSave=false
                return tips
            }
            if(prePayment >= settlementAmount){
                if(settlementAmount<0){
                    //退货
                    tips.canSave=true
                    return tips
                }
                else{
                    tips.title='本次交易使用¥'+settlementAmount.toFixed(2)+'元用于本次折扣！'
                    tips.canSave=true
                    return tips
                }
            }
            else{
                let v=parseFloat(settlementAmount-prePayment)
                tips.title='本次交易欠款¥'+v.toFixed(2)+'元'
                if(prePayment>0){
                    tips.title+=',使用余额¥'+prePayment.toFixed(2)+'元用于本次折扣！'
                }
                tips.canSave=true
                tips.modalDialog=true
                return tips
            }
        }

        
        return tips
    }
}


//基于元数据校验
export function saveBeforeCheck() {
    return injectFuns => {
        let errorMsg=List(),
            allItemEmpty=true

        let { validate, getterByField, setMessage, clearMessage, handleWebApiException } = da
        //表头表尾验证
        if (!validate('voucher.voucherHeader')(injectFuns)) {
            //setMessage({ type: 'error', mode: 'message', content: '请检查必录项！' })(injectFuns)
            return false
        }
        let voucherData= da.getterByField('voucherData')(injectFuns).toJS()  
        if (!voucherData.voucherHeader.customer) {
            //da.setMessage({ type: 'error', mode: 'message', content: '请填写客户！' })(injectFuns)
            errorMsg = errorMsg.push("请填写客户！")
            //return false
        }
        if (!voucherData.voucherFooter.bankAccount) {
            //da.setMessage({ type: 'error', mode: 'message', content: '请填写收款帐号！' })(injectFuns)
            //return false
            errorMsg = errorMsg.push("请填写收款帐号！")
        }
        if (!voucherData.voucherHeader.invoiceType) {
            //da.setMessage({ type: 'error', mode: 'message', content: '请填写票据类型！' })(injectFuns)
            //return false
            errorMsg = errorMsg.push("请填写票据类型！")
        }
        //明细验证
        let voucherItems =fromJS(voucherData.voucherItems)
        for (let i = 0; i < voucherItems.size; i++) {
            let item = voucherItems.get(i)            
             //商品为空，为空行
            if(item.toJS().inventoryService == undefined || !item.toJS().inventoryService.id){
                continue
            }
            allItemEmpty = false
            
            let emptyItemNames = List()
            if (!item.get('inventoryService')) {
                emptyItemNames = emptyItemNames.push("商品或服务名称" )
            }
            if (!item.get('number')) {
                emptyItemNames = emptyItemNames.push("数量" )
            }
            if (!item.get('unitPriceTax')) {
                emptyItemNames = emptyItemNames.push("单价(含税)" )
            }
            if(!item.get('unitPriceTax')){
                emptyItemNames = emptyItemNames.push("金额(含税)" )
            }

            if (emptyItemNames.size > 0) {
                let rowError
                if (emptyItemNames.size > 3) {
                    rowError = "商品或服务名称、数量、单价(含税)和金额(含税)"
                }
                else if(emptyItemNames.size == 3) {
                    rowError = emptyItemNames.get(0) + '和' + emptyItemNames.get(1)+ '和' + emptyItemNames.get(2)
                }
                else if(emptyItemNames.size == 2) {
                    rowError = emptyItemNames.get(0) + '和' + emptyItemNames.get(1)
                }
                else {
                    rowError = emptyItemNames.get(0)
                }

                errorMsg = errorMsg.push("第" + (i + 1) + "行，请填写" + rowError)
                continue
            }

        }
       
        if (allItemEmpty) {
            errorMsg = errorMsg.push("请填写销售明细！")
        }
        //errorMsg = checkVoucherDataBeforeSave(voucherData)(injectFuns)
        
        return errorMsg
    }
}

export function save(callback) {
    return injectFuns=> { 
        let { validate, getterByField, setMessage, clearMessage, handleWebApiException } = da

        let voucherData= da.getterByField('voucherData')(injectFuns).toJS()  
        
        let errorMsg=saveBeforeCheck()(injectFuns)
        if (errorMsg && errorMsg.size > 0) {
            da.setMessage({type: 'warning', mode: 'message', content: getDisplayErrorMSg(errorMsg)})(injectFuns)
            return
        }
        //业务验证

        let businessMsg=checkVoucherDataBeforeSave(voucherData)(injectFuns)
        if(!businessMsg.canSave){
            da.setMessage({type: 'warning', mode: 'message', content: businessMsg.title})(injectFuns)
            return
        }
        else if(businessMsg.modalDialog){
            da.setMessage({
                type: 'confirm',
                title:'提示',
                content: businessMsg.title,
                width:360,
                onCancel: ()=>{ 
                    da.clearMessage()(injectFuns)
                    return
                },
                onOk: ()=>{ 
                    da.clearMessage()(injectFuns)
                    let data = getVoucherData(voucherData)(injectFuns)
                    if (da.getterByField('editStatus')(injectFuns) == STATUS_ADD || !voucherData.voucherHeader.id) {
                        webapi.pu.create(injectFuns.post, data).then(ajaxData => {

                            if (!da.handleWebApiInfo(ajaxData)(injectFuns)) return
                            businessMsg.title==''?'':'提示：'+businessMsg.title
                            da.setMessage({type: 'success', mode: 'message', content: '保存成功!'+businessMsg.title})(injectFuns)
                            // injectFuns.reduce('changeStatus', STATUS_VIEW, STATUS_VOUCHER_NOT_AUDITED)
                            injectFuns.reduce('loadVoucher', fromJS(ajaxData.value), STATUS_VIEW)

                            if (callback) {
                                callback()
                            }
                        })
                    }
                    else {
                        webapi.pu.update(injectFuns.post, data).then(ajaxData => {
                            if (!da.handleWebApiInfo(ajaxData)(injectFuns)) return
                            businessMsg.title==''?'':'提示：'+businessMsg.title
                            da.setMessage({type: 'success', mode: 'message', content: '更新成功!'+businessMsg.title})(injectFuns)
                            // injectFuns.reduce('changeStatus', STATUS_VIEW, STATUS_VOUCHER_NOT_AUDITED)
                            injectFuns.reduce('loadVoucher', fromJS(ajaxData.value), STATUS_VIEW)

                            if (callback) {
                                callback()
                            }
                        })
                    }
                },

            })(injectFuns)
        }
        else{
            let data = getVoucherData(voucherData)(injectFuns)
            if (da.getterByField('editStatus')(injectFuns) == STATUS_ADD || !voucherData.voucherHeader.id) {
                webapi.pu.create(injectFuns.post, data).then(ajaxData => {

                    if (!da.handleWebApiInfo(ajaxData)(injectFuns)) return
                    businessMsg.title==''?'':'提示：'+businessMsg.title
                    da.setMessage({type: 'success', mode: 'message', content: '保存成功!'+businessMsg.title})(injectFuns)
                    // injectFuns.reduce('changeStatus', STATUS_VIEW, STATUS_VOUCHER_NOT_AUDITED)
                    injectFuns.reduce('loadVoucher', fromJS(ajaxData.value), STATUS_VIEW)

                    if (callback) {
                        callback()
                    }
                })
            }
            else {
                webapi.pu.update(injectFuns.post, data).then(ajaxData => {
                    if (!da.handleWebApiInfo(ajaxData)(injectFuns)) return
                    businessMsg.title==''?'':'提示：'+businessMsg.title
                    da.setMessage({type: 'success', mode: 'message', content: '更新成功!'+businessMsg.title})(injectFuns)
                    // injectFuns.reduce('changeStatus', STATUS_VIEW, STATUS_VOUCHER_NOT_AUDITED)
                    injectFuns.reduce('loadVoucher', fromJS(ajaxData.value), STATUS_VIEW)

                    if (callback) {
                        callback()
                    }
                })
            }
        }
    }
}

function getDisplayErrorMSg(errorMsg) {
    return <div style={{display: 'inline-table'}}>
        {
            errorMsg.map(item => <div>{item}<br/></div>)
        }
    </div>
}

export function saveAndNew() {
    return injectFuns=> {
        if (!da.validate('voucher.voucherHeader')(injectFuns)) {
            return
        }
        let voucherData= da.getterByField('voucherData')(injectFuns).toJS()
        let errorMsg=saveBeforeCheck()(injectFuns)
        if (errorMsg && errorMsg.size > 0) {
            da.setMessage({type: 'warning', mode: 'message', content: getDisplayErrorMSg(errorMsg)})(injectFuns)
            return
        }
        let businessMsg=checkVoucherDataBeforeSave(voucherData)(injectFuns)
        if(!businessMsg.canSave){
            da.setMessage({type: 'warning', mode: 'message', content: businessMsg.title})(injectFuns)
            return
        }
       
        let data2 = getVoucherData(voucherData)(injectFuns)

        //新增
        if (da.getterByField('editStatus')(injectFuns) == STATUS_ADD || !voucherData.docId) {
            webapi.pu.create(injectFuns.post, data2).then(data => {

                if (!da.handleWebApiInfo(data)(injectFuns)) return
                da.setMessage({type: 'success', mode: 'message', content: '保存成功!'})(injectFuns)

                webapi.pu.init(injectFuns.post,{"deliveryTypeId":132}).then(data3 => {
                    if (!da.handleWebApiInfo(data)(injectFuns)) return
                    return data3
                }).then(data => {
                    if(data == undefined) return
                    if (!da.handleWebApiInfo(data)(injectFuns)) return
                    // injectFuns.reduce('clearAndNewVoucher', {code: data.value && data.value.code, voucherDate: voucherData.voucherDate})
                    injectFuns.reduce('clearAndNewVoucher', data.value)
                })
            })
        }
        //更新
        else {
            webapi.pu.update(injectFuns.post, data2).then(data => {
                if (!da.handleWebApiInfo(data)(injectFuns)) return

                da.setMessage({type: 'success', mode: 'message', content: '更新成功!'})(injectFuns)
                let voucherMoment = moment(voucherData.get('voucherHeader').get('date'))
                return webapi.voucher.getNewCode(injectFuns.post, voucherMoment.year(), voucherMoment.month() + 1)
            }).then(data => {
                if (!da.handleWebApiInfo(data)(injectFuns)) return

                injectFuns.reduce('clearAndNewVoucher', {code: data.value && data.value.code, voucherDate: voucherData.voucherDate})
            })
        }
    }
}
export function verify() {
    return injectFuns=> {
        let id = da.getterByField('voucherData.voucherHeader.id')(injectFuns),
            ts = da.getterByField('voucherData.voucherHeader.ts')(injectFuns),
            state = da.getterByField('voucherData.voucherHeader.state')(injectFuns)

        if (!id || !ts) {
            da.setMessage({type: 'success', mode: 'message', content: '请先保存单据！'})(injectFuns)
            return
        }
        if (state == STATUS_VOUCHER_AUDITED) {
            da.setMessage({type: 'success', mode: 'message', content: '该单据已经审核！'})(injectFuns)
            return
        }
        let params={
            'id':id,
            'ts':typeof(ts)=='object'?ts.ts:ts
        }
        webapi.pu.audit(injectFuns.post,params).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return

            da.setMessage({type: 'success', mode: 'message', content: '单据审核成功！'})(injectFuns)
            if(typeof(data.value)=='object'){
                data.value=data.value.ts//?
            }
            injectFuns.reduce('changeAuditStatus', STATUS_VOUCHER_AUDITED, injectFuns.getContext().currentUser, data.value)
        })
    }
}

export function antiVerify() {
    return injectFuns=> {
        let id = da.getterByField('voucherData.voucherHeader.id')(injectFuns),
            ts = da.getterByField('voucherData.voucherHeader.ts')(injectFuns),
            state = da.getterByField('voucherData.voucherHeader.state')(injectFuns)

        if (!id || !ts) {
            da.setMessage({type: 'success', mode: 'message', content: '请先保存单据！'})(injectFuns)
            return
        }
        if (state == STATUS_VOUCHER_NOT_AUDITED) {
            da.setMessage({type: 'success', mode: 'message', content: '单据尚未审核！'})(injectFuns)
            return
        }

        let params={
            'id':id,
            'ts':typeof(ts)=='object'?ts.ts:ts
        }

        webapi.pu.unAudit(injectFuns.post, params).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return

            da.setMessage({type: 'success', mode: 'message', content: '单据反审核成功！'})(injectFuns)
            injectFuns.reduce('changeAuditStatus', STATUS_VOUCHER_NOT_AUDITED, injectFuns.getContext().currentUser, data.value)
        })
    }
}
export function generateVoucher(onAddTab){
    return injectFuns=>{
        let voucherId = da.getterByField('voucherData.voucherHeader.id')(injectFuns),
            initData={
                'id':voucherId,
                'isCreateSaleReturn': true,
                'stype':'rejected'
            }
        if(onAddTab){
            onAddTab('销售退货单', 'apps/scm/sale/saleOrder?type=0&id='+voucherId,{initData})
        }
    }

}
export function print() {
    return injectFuns=>{

        let printVoucherId = da.getterByField('voucherData.voucherHeader.id')(injectFuns)
        let printId = {
            "id": printVoucherId
        }
        webapi.pu.print(injectFuns.formPost,printId)
    }
}

export function attachmentManage() {
    return injectFuns=> {
        //TODO 附件管理暂不处理
        da.setMessage({type: 'success', mode: 'message', content: '附件管理！'})(injectFuns)
    }
}

export function showAccessory() {
    return injectFuns => {
         let { setMessage, clearMessage, handleWebApiException } = da,
             id = da.getterByField('voucherData.voucherHeader.sourceVoucherId')(injectFuns),
             accessoryNum = da.getterByField('voucherData.voucherHeader.attachCount')(injectFuns)
         //新增状态下永远是没有附件的
//        if(da.getterByField('editStatus')(injectFuns) == STATUS_ADD) return setMessage({type:'error', mode:'message', content:'没有附件！'})(injectFuns)
        if(!id || !accessoryNum || accessoryNum == 0) return setMessage({type:'error', mode:'message', content:'没有附件！'})(injectFuns)

         webapi.receipt.getImages(injectFuns.post, id, undefined).then(data => {
             if (!handleWebApiException(data)(injectFuns)) return

             if(data.value.asrImgList.length == 0) return setMessage({type:'error', mode:'message', content:'没有附件！'})(injectFuns)

             let initData = { isEdit: false }
             initData.album = data.value.asrImgList.map(o => {
                 return {
                     id: o.name,
                     fileUrl: '/v1/img/' + o.name
                 }
             })

             setMessage({
                 type: 'app',
                 title: '图片',
                 content: 'app:apps/acm/richardTicket/viewAlbum',
                 refName: 'richardTicketViewAlbumModal',
                 width: 900,
                 bodyStyle: { height: 500 },
                 footer: ' ',
                 wrapClassName: 'richardTicketViewAlbumModal',
                 initData: initData,
                 onCancel: function() {
                     clearMessage()(injectFuns)
                 }
             })(injectFuns)
         })
    }
}


/**
 * 上传成功事件处理
 * @param  {[type]} imgName [description]
 * @return {[type]}         [description]
 */
export function upload(filesList, addFileList) {
    return injectFuns => {
        injectFuns.reduce('upload', filesList)
        if(addFileList.length > 0) {
            webapi.pu.enclosurecreatebatch(injectFuns.post, addFileList).then(data => {
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                da.setMessage({type: 'success', mode: 'message', content: '增加附件成功！'})(injectFuns)
            })
        }
    }
}

//  附件列表的显示隐藏
export function visibleChange (visible) {
	return injectFuns => {
		injectFuns.reduce('visibleChange', visible)
	}
}

export function newVoucher() {
    return injectFuns=> {
        checkEditStatusBeforeLoadNewVoucher(() => {
              webapi.pu.init(injectFuns.post,{"deliveryTypeId":132}).then(data => {
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                injectFuns.reduce('clearAndNewVoucher', data.value)
            })
        })(injectFuns)
    }
}

export function del(delTabCallback) {
    return injectFuns=> {
        let {clearMessage, setMessage} = da,
            id = da.getterByField('voucherData.voucherHeader.id')(injectFuns),
            ts = da.getterByField('voucherData.voucherHeader.ts')(injectFuns),
            voucherSource = da.getterByField('voucherData.voucherHeader.voucherSource')(injectFuns) || '',
            delText,delSuccessText
        if(voucherSource){
            delText = '单据：' + voucherSource + '将被驳回到业务，当前凭证会被删除。请确认要驳回吗？'
            delSuccessText = '驳回'
        }else{
            delText = '确定删除该单据?'
            delSuccessText = '删除'
        }
        if (!id || !ts) {
            da.setMessage({type: 'success', mode: 'message', content: '请先保存单据！'})(injectFuns)
            return
        }

        setMessage({
            type: 'confirm',
            title: delSuccessText + '单据',
            content:delText,
            refName: 'voucher',
            width: 360,
            onCancel: ()=>{ clearMessage()(injectFuns) } ,
            onOk: ()=>{
                clearMessage()(injectFuns)     
                let params={
                    'id':id,
                    'ts':typeof(ts)=='object'?ts.ts:ts
                }
                webapi.pu.del(injectFuns.post, params).then(data => {
                    if (!da.handleWebApiInfo(data)(injectFuns)) return
                    da.setMessage({type: 'success', mode: 'message', content: '成功' + delSuccessText + '单据！'})(injectFuns)
                    if(data){
                        injectFuns.reduce('loadVoucher', fromJS(data.value), STATUS_VIEW)
                    }else{
                        newVoucher()(injectFuns)
                    }
                })
            }
        })(injectFuns)
    }
}

//grid失去焦点, 清空grid的焦点
export function handleGridBlur() {
    return injectFuns => {
        injectFuns.reduce('clearGridFocus')
    }
}

function transTableRowStatus(keys,row){
    if(!row.id){
        keys.operateStatus=1
    }
    else{
        keys.operateStatus=2
        keys.id=row.id
    }
    return keys
}

//组装当前界面的数据,供新增接口
function getVoucherData(data) {
    return injectFuns => {
        let voucherData = data,tableDetail = []
        voucherData.voucherItems.map(item => {
            if(!item.inventoryService) return false
            let keys = {
                "code": item.code, 
                "warehouseId": '', 
                "inventoryId": item.inventoryService.id,
                "unitId": item.inventoryService.unitId,
                "quantity": item.number,
                "price": item.unitPrice,
                "priceWithTax": item.unitPriceTax,
                "taxRate": item.taxRate,
                "tax": item.tax,
                "amount": item.amountOfMoney,
                "amountWithTax": item.amountOfMoneyTax,
            }
            if(da.getterByField('editStatus')(injectFuns) == STATUS_EDIT) {
                keys=transTableRowStatus(keys,item)
                 //明细数据的操作状态：0，未改变；1，新增；2，修改；3，删除
            }
            tableDetail.push(keys)
        })

        //考虑修改的情况: 删除row
        let deletedVoucherItems = da.getterByField('deletedVoucherItems')(injectFuns)
        if (deletedVoucherItems && deletedVoucherItems.size > 0) {
            for (let delItem of deletedVoucherItems) {
                tableDetail.push({id: delItem.get('id'), operateStatus: 3, ts: delItem.get('ts')})
            }
        }

        let dataList = {
            "id":voucherData.voucherHeader.id,
            "ts":voucherData.voucherHeader.ts,
            "businessDate": moment(voucherData.voucherHeader.saleDate).format('YYYY-MM-DD HH:mm:ss'),
            "customerId": voucherData.voucherHeader.customer.id,
            "salesPersonId": voucherData.voucherHeader.person ?voucherData.voucherHeader.person.id:'',
            "deliveryTypeId": voucherData.voucherHeader.deliveryTypeId?voucherData.voucherHeader.deliveryTypeId:STATUS_VOUCHER_BASESALE,
            "invoiceTypeId":voucherData.voucherHeader.invoiceType.enumItemId,
            "totalSettleAmount": Number(voucherData.voucherFooter.settlementAmount),
            "preReceiveAmount": Number(da.getterByField('voucher.voucherFooter.formItems.prePayment')(injectFuns)),
            "bankAccountId": voucherData.voucherFooter.bankAccount.id,
            "receiveAmount":  Number(voucherData.voucherFooter.settlementMoney),
            "details": tableDetail,
            "enclosures":voucherData.enclosures
        }       
        return dataList
    }
}

// 设置单价方法
function fnUnitPrice(jsonData){
    // 单价 = 金额 / 数量
    let unitPrice,
        direction = true// 
    let newAmountOfMoney = jsonData.amountOfMoney  == '' ? 0 : jsonData.amountOfMoney
    let newNumber = jsonData.number == '' ? 0 : jsonData.number
    if(newAmountOfMoney / newNumber == 'Infinity'){
        direction = 0
    }else if(isNaN(newAmountOfMoney / newNumber)){
        direction = 0
    }else{
        direction = true
    }
    unitPrice = direction ? (newAmountOfMoney / newNumber) : 0 
    let value = {
        unitPrice : unitPrice.toFixed(2),
        number : newNumber
    }
    return value
}
//设置税额方法  
function fnTax(jsonData){
    //税额 = 金额（含税）－金额
    let v = {
        tax:jsonData.amountOfMoneyTax - jsonData.amountOfMoney,//税额
    }
    return v
}
//设置金额方法 
function fnAmountOfMoney(jsonData){
    //金额 = 金额（含税）/(1+税率)
    if(jsonData){
        jsonData.amountOfMoneyTax == '' ?0:jsonData.amountOfMoneyTax
        if(!jsonData.taxRate)jsonData.taxRate=0
        let amountOfMoney = jsonData.amountOfMoneyTax / (1+jsonData.taxRate),
            value = {
                amountOfMoney:amountOfMoney,
                taxRate:jsonData.taxRate,
                amountOfMoneyTax:jsonData.amountOfMoneyTax
            }
        return value
    }
}
//设置单价(含税) 方法
function fnUnitPriceTax(jsonData){
    //单价(含税) = 金额（含税）/ 数量
    let unitPriceTax=0
    jsonData.number == '' ? 0 : jsonData.number
    if( isNaN(jsonData.amountOfMoneyTax / jsonData.number) ){
        unitPriceTax = 0
    }else if( jsonData.amountOfMoneyTax / jsonData.number == 'Infinity' ){
        unitPriceTax = 0
    }else{
        unitPriceTax = jsonData.amountOfMoneyTax / jsonData.number
    }
    let value = {
        unitPriceTax:unitPriceTax,
        amountOfMoneyTax:jsonData.amountOfMoneyTax,
        number:jsonData.number == '' ? 0 : jsonData.number
    }
    return value
}
//设置金额(含税) 方法
function fnAmountOfMoneyTax(jsonData){
    //金额（含税） = 单价含税* 数量 
    if(jsonData.unitPriceTax == undefined)jsonData.unitPriceTax=0
    let amountOfMoneyTax = jsonData.unitPriceTax * (jsonData.number == '' ? 0 : jsonData.number),
    value = { 
        amountOfMoneyTax:amountOfMoneyTax,
        unitPriceTax:jsonData.unitPriceTax,
        number:jsonData.number
    }
    return value
}

export function toTargetCell(arrowDirection, isSwitchFocus){
    return injectFuns => {
        injectFuns.reduce('toTargetCell', arrowDirection, isSwitchFocus)
    }
}
export function getFocusField(){
    return injectFuns => {
        let focusField = da.getter(null, 'focusField')(injectFuns)

        return { focusField: focusField }
    }
}

Object.assign(exports, {...da, ...exports})
