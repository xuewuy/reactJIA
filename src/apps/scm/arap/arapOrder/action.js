import * as da from 'dynamicAction'
import * as api from './api'
import { fromJS, List, Map, is } from 'immutable'
import webapi from 'webapi'
import React from 'react'
import { Button } from 'xComponent'
import moment from "moment";
import * as consts from '../../utils/consts'
export const STATUS_VOUCHER_NOT_AUDITED = 127      //未审核
export const STATUS_VOUCHER_AUDITED = 128           //已审核

export const STATUS_ADD = 1        //新增
export const STATUS_VIEW = 2       //查看
export const STATUS_EDIT = 3       //编辑 (查看状态下进行了修改)
export const MAX_ATTACH_COUNT = 10000   //附件数上限

export function initView(initData) {
    return injectFuns => {
        let initVoucherData = getEmptyVoucher()(injectFuns),
            context = injectFuns.getContext(),
            {handleWebApiException} = da
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
            let voucherInitData={}
            voucherInitData.businessDate=moment().format('YYYY-MM-DD')
            injectFuns.reduce('initNewVoucher', voucherInitData)
        }
        else if (initData.id) {
            webapi.arap.queryById(injectFuns.post,initData.id).then(ajaxData => {
                if (!handleWebApiException(ajaxData)(injectFuns)) return
                if(initData.showStatus) {
                    injectFuns.reduce('loadVoucher', fromJS(ajaxData.value), STATUS_VIEW, initData.showStatus)
                } else {
                    injectFuns.reduce('loadVoucher', fromJS(ajaxData.value), STATUS_VIEW)
                }
                // injectFuns.reduce('loadVoucher', fromJS(ajaxData.value), STATUS_VIEW)
            })
        }
        else if (initData.customerId) {
            webapi.arap.getDataByCustomer(injectFuns.post,initData.customerId).then(ajaxData => {
                if (!handleWebApiException(ajaxData)(injectFuns)) return
                let data=ajaxData.value
                data.businessDate=moment().format('YYYY-MM-DD')
                injectFuns.reduce('customerSelectChange',data)
                return
            })
        }
    }
}

//当前app的 "tab被点击" (从其他app切换到当前app)
export function onTabFocus() {
    return injectFuns => {
       
    }
}

export function setTotalRowVisible(value){
     return injectFuns => {
       injectFuns.reduce('setTotalRowVisible',value)
    }
}

//其他模块 "代码调用addTab" 激活该模块时, 可能需要根据initData来刷新界面数据
export function activeByAddTab(initData) {
    return injectFuns => {
        if (initData && initData.id) {

            checkEditStatusBeforeLoadNewVoucher(() => {
                webapi.arap.queryById(injectFuns.post, initData.id).then(data => {
                    if (!da.handleWebApiInfo(data)(injectFuns)) return
                    if(initData.showStatus) {
                        injectFuns.reduce('initLoadVoucher', fromJS(data.value),initData.showStatus)
                    } else {
                        injectFuns.reduce('initLoadVoucher', fromJS(data.value))
                    }
                    // injectFuns.reduce('initLoadVoucher', fromJS(data.value))
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
            else if(parsedPath.path == 'voucher.voucherHeader.formItems.customerList'){
                showAddDoc(injectFuns,parsedPath,option)
            }
            else if(parsedPath.path == 'voucher.voucherHeader.formItems.bankAccount'){
                showAddDoc(injectFuns, parsedPath,option)
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
    if(path.indexOf('customerList') !=-1){
        let appTitle = '新增客户',
        initData = { judgeTabsContent: 'customerArchive', addOrModify: 'add', judgeTabsValue: '0' },
        appPath = 'app:apps/systemSetting/basicFileMaintenance/basicFiles',
        judgeBasicFiles,
        path='voucherData.voucherHeader.customerList'


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
    else if (path.indexOf('bankAccount') != -1) {
        var settlement, settlementId, accountType
        settlement = da.getterByField('voucherData.voucherHeader.bankAccount')(injectFuns)
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
}
//点击grid中的cell时,会调用该方法,获取下拉菜单的数据
export function getterByAjax(path, property, onSuccess) {
    return injectFuns=> {
        if (!path) return
        let {parsePath} = da
        let parsedPath = parsePath(path)
           
        //点击 客户 发起请求 
        if (parsedPath.path === 'voucher.voucherHeader.formItems.customerList' && property === 'dataSource') {
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
        else if (parsedPath.path === 'voucher.voucherHeader.formItems.bankAccount' && property === 'dataSource') {
            let bankAccountTypeIds =[98,99,101,100]
            webapi.receipt.queryBankAccountByType(injectFuns.post,bankAccountTypeIds).then(data=>{
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                onSuccess(fromJS(data.value))
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
        else if(parsedPath.path ==='voucher.voucherHeader.formItems.customerList'){
            if(newValue){
                let customerId = newValue.get('id')
                webapi.arap.getDataByCustomer(injectFuns.post,customerId).then(ajaxData => {
                    if (!handleWebApiException(ajaxData)(injectFuns)) return
                    injectFuns.reduce('customerSelectChange',ajaxData.value)
                })
            }
        }       
        else if(parsedPath.path ==='voucher.voucherHeader.formItems.bankAccount'){
            //如果选择暂不支付，表示收款金额为0，不允许修改
           injectFuns.reduce('bankAccountStatus',newValue)
        }
        else if(parsedPath.path ==='voucher.voucherHeader.formItems.receivePayAmount'){
           injectFuns.reduce('receivePayAmountChange',newValue)
        }
        else if(parsedPath.path.indexOf('voucher.voucherBody.currentSettleAmount')> -1){
           injectFuns.reduce('currentSettleAmountChange',newValue,rowIndex)
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


        // let arrFormDataList = da.getterByField('voucher')(injectFuns).toJS().details
        // let numberClose = 0
        // arrFormDataList.pop()
        // let newArr_z = arrFormDataList.map( (item,index) => {
        //     numberClose = parseFloat(item.amountOfMoneyTax) + parseFloat(numberClose)
        //     return numberClose
        // })
        // injectFuns.reduce('computeTotalMoney',newArr_z[newArr_z.length-1]) // 总额 金额（含税）
        //重写dynamicAction的事件后,需要再手工执行一下父类事件
        da.onFieldChange(path, oldValue, newValue)(injectFuns)
    }
}
function getEmptyVoucher() {
    return injectFuns => {
        let voucher = api.emptyVoucherData
        voucher.voucherHeader.code = ''
        voucher.voucherHeader.maker = injectFuns.getContext().currentUser && injectFuns.getContext().currentUser.name
        voucher.voucherHeader.makerId = injectFuns.getContext().currentUser && injectFuns.getContext().currentUser.id

        return voucher
    }
}

export function loadPrivVoucher() {
    return injectFuns=> {
        checkEditStatusBeforeLoadNewVoucher(() => {
            let code = da.getterByField('voucherData.voucherHeader.code')(injectFuns)

            webapi.arap.prev(injectFuns.post, code).then(data => {
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                injectFuns.reduce('loadVoucher', fromJS(data.value), STATUS_VIEW, true)
            })
        })(injectFuns)

    }
}

export function loadNextVoucher() {
    return injectFuns=> {
        checkEditStatusBeforeLoadNewVoucher(() => {
            let code = da.getterByField('voucherData.voucherHeader.code')(injectFuns)

            webapi.arap.next(injectFuns.post, code).then(data => {
                if (!da.handleWebApiInfo(data)(injectFuns)) return

                injectFuns.reduce('loadVoucher', fromJS(data.value), STATUS_VIEW, true)
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
        let voucherItems =fromJS(voucherData.voucherItems),
            errorMsg = {},
            allItemEmpty = true,
            errorMsgList=List()

        let currentSettleAmount=0,notSettleAmount=0
        for (let i = 0; i < voucherItems.size; i++) {
            let item = voucherItems.get(i)
            //跳过空行
            currentSettleAmount+=parseFloat(item.get('currentSettleAmount')) || 0
            notSettleAmount+=parseFloat(item.get('notSettleAmount')) || 0
            //2) 本次结算不可以为负数、本次结算不可以大于未结算金额
            let emptyItemNames = List(),
                compareItemNames = List()

            if (item.get('currentSettleAmount') === '') {
                emptyItemNames = emptyItemNames.push('本次结算')
            }
            else if (item.get('currentSettleAmount') > item.get('notSettleAmount')) {
                compareItemNames = emptyItemNames.push('本次结算大于未结算金额')
            }
            if (emptyItemNames.size > 0) {
                let rowError = emptyItemNames.get(0)
                errorMsgList = errorMsgList.push("第" + (i + 1) + "行，请填写" + rowError)
                continue
            }
            if (compareItemNames.size > 0) {
                let rowError = compareItemNames.get(0)
                errorMsgList = errorMsgList.push("第" + (i + 1) + "行，" + rowError)
                continue
            }
        }

        errorMsg.errorMsgList=errorMsgList
        
        let _receivePayAmount=parseFloat(da.getterByField('voucherData.voucherHeader.receivePayAmount')(injectFuns)) || 0
        if(!isNaN(_receivePayAmount)){
            
            let tipsInfo={
                title:'',
                canSave:true
            }
            if(_receivePayAmount>currentSettleAmount){
                if(currentSettleAmount<notSettleAmount){
                    tipsInfo.title= "请结算完所有交易！"
                    tipsInfo.canSave=false
                }
                else{
                    //应收金额大于本次结算转为预收
                    let compute=(_receivePayAmount-currentSettleAmount).toFixed(2)
                    tipsInfo.title= "收款金额"+compute+"元将转为预收款！"
                }
                
            }
            else if(_receivePayAmount==currentSettleAmount){
                if(currentSettleAmount==notSettleAmount){
                    //应收金额等于本次结算
                    tipsInfo.title='该客户欠款已结清！'
                }
                else if(notSettleAmount>currentSettleAmount){
                    let compute=(notSettleAmount-currentSettleAmount).toFixed(2)
                    tipsInfo.title='该客户还欠款'+compute+'元！'
                }
            }
            else if(_receivePayAmount<currentSettleAmount){
                //应收金额小于本次结算
                if(currentSettleAmount<notSettleAmount){
                   tipsInfo.title='请核销完收款！'
                   tipsInfo.issystem=false
                }
            }
            errorMsg.busMessage=tipsInfo

        }
        return errorMsg
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
        if(!saveBeforeCheck()(injectFuns)) {
            return
        }
        let errorMsg = checkVoucherDataBeforeSave(voucherData)(injectFuns)
        if (errorMsg && errorMsg.size > 0) {
            da.setMessage({type: 'warning', mode: 'message', content: getDisplayErrorMSg(errorMsg)})(injectFuns)
            return
        }

        //新增
        // if (da.getterByField('editStatus')(injectFuns) == STATUS_ADD || !voucherData.docId) {
        //     webapi.pu.create(injectFuns.post, voucherData).then(data => {

        //         if (!da.handleWebApiInfo(data)(injectFuns)) return
        //         da.setMessage({type: 'success', mode: 'message', content: '保存成功!'})(injectFuns)

        //     }).then(data => {
        //         if(data == undefined) return
        //         if (!da.handleWebApiInfo(data)(injectFuns)) return

        //         injectFuns.reduce('clearAndNewVoucher', {code: data.value && data.value.code, voucherDate: voucherData.voucherDate})
        //     })
        // }
        let data2 = getVoucherData(voucherData)(injectFuns)

        if (da.getterByField('editStatus')(injectFuns) == STATUS_ADD || !voucherData.docId) {
            // webapi.pu.create(injectFuns.post, voucherData).then(data => {
            webapi.arap.create(injectFuns.post, data2).then(data => {

                if (!da.handleWebApiInfo(data)(injectFuns)) return
                da.setMessage({type: 'success', mode: 'message', content: '保存成功!'})(injectFuns)
                return true
            }).then(data => {
                if(data == undefined) return
                // if (!da.handleWebApiInfo(data)(injectFuns)) return

                // injectFuns.reduce('clearAndNewVoucher', {code: data.value && data.value.code, voucherDate: voucherData.voucherDate})
                injectFuns.reduce('clearAndNewVoucher',{code: '', voucherDate:moment().format('YYYY-MM-DD') })
            })
        }
    }
}

//基于元数据校验
export function saveBeforeCheck() {
    return injectFuns => {
        let { validate, getterByField, setMessage, clearMessage, handleWebApiException } = da
        if (!validate('voucher.voucherHeader')(injectFuns)) {
            setMessage({ type: 'error', mode: 'message', content: '请检查必录项！' })(injectFuns)
            return false
        }
        let voucherData= da.getterByField('voucherData')(injectFuns).toJS()
         if (!voucherData.voucherHeader.customerList) {
            da.setMessage({ type: 'error', mode: 'message', content: '请填写客户！' })(injectFuns)
            return false
        }
        if (!voucherData.voucherHeader.bankAccount) {
            da.setMessage({ type: 'error', mode: 'message', content: '请填写收款帐号！' })(injectFuns)
            return false
        }

        if (!voucherData.voucherHeader.receivePayAmount) {
            da.setMessage({ type: 'error', mode: 'message', content: '请填写收款金额！' })(injectFuns)
            return false
        }
        if (voucherData.voucherHeader.receivePayAmount<=0) {
            da.setMessage({ type: 'error', mode: 'message', content: '收款金额不允许小于等于0！' })(injectFuns)
            return false
        }


        let errorMsg = checkVoucherDataBeforeSave(voucherData)(injectFuns)
        if (errorMsg && errorMsg.errorMsgList && errorMsg.errorMsgList.size > 0) {
            da.setMessage({ type: 'warning', mode: 'message', content: getDisplayErrorMSg(errorMsg.errorMsgList) })(injectFuns)
            return false
        }
        if(!errorMsg.busMessage.canSave){
            da.setMessage({ type: 'warning', mode: 'message', content: errorMsg.busMessage.title})(injectFuns)
            return false
        }
        return true
    }
}

export function save(callback) {
    return injectFuns=> { 
        let { validate, getterByField, setMessage, clearMessage, handleWebApiException } = da
        let voucherData= da.getterByField('voucherData')(injectFuns).toJS()
        if(!saveBeforeCheck()(injectFuns)) {
            return
        }
        let errorMsg = checkVoucherDataBeforeSave(voucherData)(injectFuns)
        if(errorMsg && errorMsg.busMessage.canSave){
            da.setMessage({
                type: 'confirm',
                title:'提示',
                content: errorMsg.busMessage.title,
                width:360,
                onCancel: ()=>{ 
                    da.clearMessage()(injectFuns)
                    return
                } ,
                onOk: ()=>{ 
                    da.clearMessage()(injectFuns)
                    let data = getVoucherData(voucherData)(injectFuns)
                    //新增
                    if (da.getterByField('editStatus')(injectFuns) == STATUS_ADD || !data.code) {
                        webapi.arap.create(injectFuns.post, data).then(ajaxData => {

                            if (!da.handleWebApiInfo(ajaxData)(injectFuns)) return

                            da.setMessage({ type: 'success', mode: 'message', content: '保存成功!' })(injectFuns)
                            injectFuns.reduce('loadVoucher', fromJS(ajaxData.value), STATUS_VIEW)

                            //let ret=transAjaxDataToView(injectFuns,ajaxData)
                            //injectFuns.reduce('initView',fromJS(ret), da.getUtils(exports, injectFuns), STATUS_VIEW)
                            if (callback) {
                                callback()
                            }
                        })
                    }
                }
            })(injectFuns)
        }
    }
}

/**
 * 后台返回界面数据转换成state所需结构
 * @param  {[type]} injectFuns [description]
 * @param  {[type]} taskId     [description]
 * @param  {[type]} ajaxData   [description]
 * @return {[type]}            [description]
 */
function transAjaxDataToView(injectFuns,ajaxData){
    let v = api.voucher,
        { getContext } = injectFuns,
        context = getContext(),
        data=ajaxData.value
    if(JSON.stringify(ajaxData)=="[]")return v
    v.voucherHeader.formItems.id=data.id
    v.voucherHeader.formItems.code=data.code
    v.voucherHeader.formItems.totalNotSettleAmount=data.totalNotSettleAmount?data.totalNotSettleAmount.toFixed(2):0.00
    v.voucherHeader.formItems.businessDate=moment(data.businessDate).format('YYYY-MM-DD')
    v.voucherHeader.formItems.preReceivePayAmount=data.preReceivePayAmount?data.preReceivePayAmount.toFixed(2):0.00
    v.voucherHeader.formItems.receivePayAmount=data.receivePayAmount?data.receivePayAmount.toFixed(2):0.00
    v.voucherHeader.formItems.ts=data.ts
    v.voucherHeader.formItems.createTime=moment(data.createTime).format('YYYY-MM-DD')
    
    v.voucherHeader.formItems.bankAccountId=data.bankAccountId
    v.voucherHeader.formItems.cancelStatus=data.cancelStatus
    v.voucherHeader.formItems.status=data.status
    v.voucherHeader.formItems.customer={
        id:data.customerId,
        name:data.customerName
    }

    v.voucherHeader.formItems.bankAccount={
        id:data.bankAccountId,
        name:data.bankAccountName
    }

    v.voucherHeader.formItems.voucherTypeId=data.voucherTypeId
    v.voucherBody.details=data.details.map(o=>{
        return{
            id:o.id,
            cancelVoucherCode:o.cancelVoucherCode,
            cancelVoucherId:o.cancelVoucherId,
            cancelVoucherTs:o.cancelVoucherTs,
            cancelVoucherTypeId:o.cancelVoucherTypeId,
            createTime:o.createTime,
            currentSettleAmount:o.currentSettleAmount?o.currentSettleAmount.toFixed(2):0.00,
            settledAmount:o.settledAmount?o.settledAmount.toFixed(2):0.00,
            totalSettleAmount:o.totalSettleAmount?o.totalSettleAmount.toFixed(2):0.00,
            notSettleAmount:o.notSettleAmount?o.notSettleAmount.toFixed(2):0.00,
            voucherId:o.voucherId
        }
    })
    return v
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
        ts=typeof(ts)=='object'?ts.ts:ts
        webapi.arap.audit(injectFuns.post,id,ts).then(data => {
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
        ts=typeof(ts)=='object'?ts.ts:ts
        webapi.arap.unaudit(injectFuns.post, id,ts).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return

            da.setMessage({type: 'success', mode: 'message', content: '单据反审核成功！'})(injectFuns)
            injectFuns.reduce('changeAuditStatus', STATUS_VOUCHER_NOT_AUDITED, injectFuns.getContext().currentUser, data.value)
        })
    }
}

export function print() {
    return injectFuns=>{

        let printVoucherId = da.getterByField('voucherData.voucherHeader.id')(injectFuns)
        if(!printVoucherId)return
        webapi.arap.print(injectFuns.formPost,printVoucherId)
    }
}

export function attachmentManage() {
    return injectFuns=> {
        //TODO 附件管理暂不处理
        da.setMessage({type: 'success', mode: 'message', content: '附件管理！'})(injectFuns)
    }
}

export function newVoucher() {
    return injectFuns=> {
        checkEditStatusBeforeLoadNewVoucher(() => {
              injectFuns.reduce('clearAndNewVoucher',{code: '', voucherDate:moment().format('YYYY-MM-DD') },false)
        })(injectFuns)
    }
}

export function del(delTabCallback) {
    return injectFuns=> {
        let {clearMessage, setMessage} = da,
            id = da.getterByField('voucherData.voucherHeader.id')(injectFuns),
            ts = da.getterByField('voucherData.voucherHeader.ts')(injectFuns),
            delText,delSuccessText
        delText = '确定删除该单据?'
        delSuccessText = '删除'
        if (!id || !ts) {
            da.setMessage({type: 'success', mode: 'message', content: '请先保存单据！'})(injectFuns)
            return
        }
        ts=typeof(ts)=='object'?ts.ts:ts
        setMessage({
            type: 'confirm',
            title: delSuccessText + '单据',
            content:delText,
            refName: 'voucher',
            width: 360,
            onCancel: ()=>{ clearMessage()(injectFuns) } ,
            onOk: ()=>{
                clearMessage()(injectFuns)
                  webapi.arap.del(injectFuns.post, id,ts).then(data => {
                    if (!da.handleWebApiInfo(data)(injectFuns)) return
                    da.setMessage({type: 'success', mode: 'message', content: '成功' + delSuccessText + '单据！'})(injectFuns)
                    if(data){
                        injectFuns.reduce('loadVoucher', fromJS(data.value), STATUS_ADD)
                    }else{
                        newVoucher()(injectFuns)
                    }
                })
            }
        })(injectFuns)
    }
}


/**
 * 上传成功事件处理
 * @param  {[type]} imgName [description]
 * @return {[type]}         [description]
 */
export function upload(filesList) {
    return injectFuns => {
        injectFuns.reduce('upload', filesList)
    }
}

//  附件列表的显示隐藏
export function visibleChange (visible) {
	return injectFuns => {
		injectFuns.reduce('visibleChange', visible)
	}
}

//grid失去焦点, 清空grid的焦点
export function handleGridBlur() {
    return injectFuns => {
        injectFuns.reduce('clearGridFocus')
    }
}

//组装当前界面的数据,供新增接口
function getVoucherData(data) {
    return injectFuns => {
        if(!data)return
        let arapData = {},
            customer = data.voucherHeader.customerList || {},
            bankAccount = data.voucherHeader.bankAccount || {}
        arapData.customerId = customer.id || null
        arapData.bankAccountId = bankAccount.id || null
        arapData.creatorName = ''
        arapData.businessDate = moment(data.voucherHeader.businessDate).format('YYYY-MM-DD hh:mm:ss')
        arapData.preReceivePayAmount =parseFloat(data.voucherHeader.preReceivePayAmount)
        arapData.receivePayAmount =parseFloat(data.voucherHeader.receivePayAmount),
        arapData.enclosures = data.enclosures
        let details = [],
            voucherItems = fromJS(data.voucherItems)
        for (let item of voucherItems) {
            let entry = translateVoucherItem(item, true)

            if (entry) {
                details.push(entry)
            }
        }
        arapData.details = details

        return arapData
    }
}

export function showDetailsVoucher(onAddTab,rowIndex){
    return injectFuns=>{
        let rowData = da.getterByField('voucherData.voucherItems')(injectFuns).get(rowIndex),
            initData={
                'id':rowData.get('cancelVoucherId')

            }
        if(onAddTab){
            onAddTab('销售单', 'apps/scm/sale/saleOrder',{initData})
        }
    }

}

export function translateVoucherItem(item, isForUpdate) {
    if (!item) {
        return undefined
    }
    let details = {
        cancelVoucherTypeId:item.get('cancelVoucherTypeId'),
        cancelVoucherId:item.get('cancelVoucherId'),
        cancelVoucherCode:item.get('cancelVoucherCode'),
        cancelVoucherTs:item.get('cancelVoucherTs'),
        totalSettleAmount:item.get('totalSettleAmount'),//--单据金额
        settledAmount:item.get('settledAmount'),//--已结金额
        notSettleAmount:item.get('notSettleAmount'),//--已结金额
        currentSettleAmount:item.get('currentSettleAmount'),//--已结金额
    }

    return details
}


Object.assign(exports, {...da, ...exports})
