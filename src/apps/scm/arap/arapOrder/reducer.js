import * as dr from 'dynamicReducer'
import { fromJS, Map, List } from 'immutable'
import * as api from './api'
import * as action from './action'

export function initView(state, payload, utils) {
    state = dr.initView(state, payload, utils)
    state = checkMetaDisable(state, payload.data.editStatus)

    return state
}

export function customerSelectChange(state,value){
    if(!value) return state
    if(value.bankAccountId){
        state = dr.setter(state, 'voucher.voucherHeader.formItems.bankAccount','value',fromJS({id:value.bankAccountId,name:value.bankAccountName}))
        let currentReceiveAmount=parseFloat(value.preReceivePayAmount).toFixed(2) || '0.00'
        state = dr.setterByField(state, 'voucherData.voucherHeader.preReceivePayAmount',currentReceiveAmount)
    }
    if(value.customerId){
        let isEnableSumVisible = dr.getter(state, 'voucher.voucherBody', 'enableSum'),
            currentCustomerValue=dr.getterByField(state,'voucherData.voucherHeader.customerList')
        state = dr.setterByField(state, 'voucherData.form.isEnableSumVisible', isEnableSumVisible)
        if(!currentCustomerValue){
            state = dr.setter(state, 'voucher.voucherHeader.formItems.customerList','value',fromJS({id:value.customerId,name:value.customerName}))
        }
    }

    let dataList=value.details
    if(dataList){
        state = dr.setterByField(state, 'voucherData.voucherItems',fromJS(dataList))
    }
    else{
        state = dr.setterByField(state, 'voucherData.voucherItems',fromJS({}))
    }
    let currentBusinessDate=dr.getterByField(state, 'voucherData.voucherHeader.businessDate')
    if(!currentBusinessDate){
        state = dr.setterByField(state, 'voucherData.voucherHeader.businessDate',value.businessDate)
    }
    
    state = dr.setterByField(state, 'voucherData.voucherHeader.receivePayAmount',parseFloat(value.totalNotSettleAmount).toFixed(2) || '0.00')
    state = dr.setterByField(state, 'voucherData.voucherHeader.preReceivePayAmount',parseFloat(value.preReceivePayAmount).toFixed(2) || '0.00')

    if(dataList && dataList.length>0){
        state=setTotalRowVisible(state,true)
    }
    else{
        state=setTotalRowVisible(state,false)
    }
    state = dr.setterByField(state, 'showStatus', false)
    return state

}

export function setTotalRowVisible(state,value){
    state = dr.setter(state,'voucher.voucherBody','enableSum',value)
    state = dr.setterByField(state, 'voucherData.form.isEnableSumVisible', value)
    state = dr.setter(state,'voucher.voucherBody.settledAmount','enableSum',value)
    state = dr.setter(state,'voucher.voucherBody.notSettleAmount','enableSum',value)
    state = dr.setter(state,'voucher.voucherBody.totalSettleAmount','enableSum',value)    
    state = dr.setter(state,'voucher.voucherBody.currentSettleAmount','enableSum',value)
    if(!value){
        //state=dr.setterByField(state, 'voucherData.voucherItems', 'enableSum',value)
    }
    return state
}

export function setValueByPath(state, path, data){
    let index=data.get('index')
    state =dr.setterByField(state,`voucherData.voucherItems.${index}.inventoryService`,data)
    state=InventoryProp(state,data.toJS())
    return state
}

export function onFieldChange(state, path, oldValue, newValue) {
    if (path.indexOf('voucher.voucherBody') != -1) {
        let meta = dr.getter(state, path.split(',')[0]),
            editStatus = dr.getterByField(state,'editStatus')
        if (meta.get('enableSum') && typeof(newValue) == 'object') {
            newValue = newValue.get(meta.get('valueMember'))
        }
    }

    return dr.onFieldChange(state, path, oldValue, newValue)
}
export function bankAccountStatus(state,value){
    state = dr.setterByField(state,'voucher.voucherHeader.bankAccount',value)
    return state
}

export function receivePayAmountChange(state,value){
    let preSettleAmount=parseFloat(value),index=0
    state = dr.setterByField(state, 'voucherData.voucherHeader.receivePayAmount',value)
    let voucherItems = dr.getterByField(state, 'voucherData.voucherItems'),
        _lastRestMoney=1
    for (let item of voucherItems) {
        let restMoney=preSettleAmount-parseFloat(item.get('notSettleAmount'))
         if(restMoney>=0 && _lastRestMoney>0){
            voucherItems = voucherItems.update(index, item => item.set('currentSettleAmount', parseFloat(item.get('notSettleAmount')).toFixed(2)))
            preSettleAmount=restMoney
        }
        else{            
            voucherItems = voucherItems.update(index, item => item.set('currentSettleAmount', parseFloat(preSettleAmount).toFixed(2)))
            preSettleAmount=0
            _lastRestMoney=0
            
        }
        index++
        // if(item.get('notSettleAmount')==item.get('currentSettleAmount')){
        //     //如果未结算等 于本次结算
        //     //currentSettleAmount(本次结算)notSettleAmount(未结算)settledAmount(已结算金额)totalSettleAmount(应收金额)
        //     continue
        // }
        
        

    }
    return dr.setterByField(state, 'voucherData.voucherItems', voucherItems)
}

export function currentSettleAmountChange(state,value,rowIndex){
    state = dr.setterByField(state,`voucherData.voucherItems.${rowIndex}.currentSettleAmount`,value)
    return state
}

//当一个单元格编辑结束,焦点自动定位到下一个可编辑cell
export function onEvent(state, eventName, option) {
    if ((eventName === 'onEndEdit' || eventName === 'onBlur')) {
        if (option.path.indexOf('voucher.voucherBody.inventoryService') != -1) {
            let voucherItems = dr.getterByField(state, 'voucherData.voucherItems'),
                index = parseInt(option.path.split(',')[1]),
                voucherItem = voucherItems.get(index),
                accountSubject = voucherItem.get('inventoryService')

            //如果输入以后,没有在下拉中匹配到内容,则清空填写
            if (typeof accountSubject != 'object') {
                state = clearCell(state, 'inventoryService', index)
            }

            if(eventName === 'onBlur'){
                let curCellAuxAccountSubjects = dr.getterByField(state, 'curCellAuxAccountSubjects'),
                    curCellCodeAndName = dr.getterByField(state, 'curCellCodeAndName')

                if(curCellAuxAccountSubjects && curCellCodeAndName){
                    voucherItems = voucherItems.update(index, item => item.setIn(['inventoryService', 'auxAccountSubjects'], curCellAuxAccountSubjects))
                    voucherItems = voucherItems.update(index, item => item.setIn(['inventoryService', 'name'], curCellCodeAndName))

                    state = dr.setterByField(state, 'voucherData.voucherItems', voucherItems)

                    voucherItem = voucherItems.get(index),
                    accountSubject = voucherItem.get('inventoryService')
                }
            }
        }
    }
    //键盘点击了快捷键
    else if (eventName === 'onShortcutKey') {
    }
    return dr.onEvent(state, eventName, option)
}
//定位下一个焦点cell
function getNextFocusCellPath(state, path) {
    if (path.indexOf('voucher.voucherBody') == -1 || path.indexOf(',') == -1) {
        return path
    }
    let index = path.split(',')[1],
        bodyMeta = dr.getter(state, 'voucher.voucherBody', 'childrens')

    let currentFieldPath = path.split(',')[0].split('.'),
        currentFieldName = currentFieldPath[currentFieldPath.length - 1]

    let nextFiledName = undefined,
        nextIndex = undefined
    for (let i = 0; i < bodyMeta.size; i++) {
        if (bodyMeta.get(i).get('name') === currentFieldName) {
            //填写了借方金额 或 在贷方金额cell里,则切换到下一行
            if (i == bodyMeta.size - 1 || (currentFieldName == 'debitAmount' && dr.getter(state, path, 'value'))) {
                nextFiledName = bodyMeta.get(0).get('name')
                nextIndex = parseInt(index) + 1
            }
            else {
                for (let j = i + 1; j < bodyMeta.size; j++){
                    if (!bodyMeta.get(j).get('disabled')) {
                        nextFiledName = bodyMeta.get(j).get('name')
                        break
                    }
                }

                nextIndex = index
            }

            break
        }
    }

    if (nextFiledName && nextIndex) {
        return path.split(',')[0].replace(currentFieldName, nextFiledName) + ',' + nextIndex
    }
    else {
        return path
    }
}

export function onFieldFocus(state, path) {
    //已审核状态不可编辑
    if (dr.getterByField(state, 'voucherData.voucherHeader.state') == action.STATUS_VOUCHER_AUDITED
        || dr.getter(state, 'voucher.voucherBody', 'disabled') == true) {
        return state
    }
    if (path.indexOf('voucher.voucherBody.inventoryService') != -1) {
        let index = path.split(',')[1],
            voucherItems = dr.getterByField(state, 'voucherData.voucherItems')

        if (voucherItems.get(index).get('inventoryService')) {


        }
    }

    state = checkRowState(state, path)
    state = dr.clearValidate(state, path)

    return dr.onFieldFocus(state, path)
}

//检查当前单元格, 如果最后一行,则新增空行
function checkRowState(state, path) {
    let index = parseInt(path.split(',')[1]),
        fieldPath = path.split(',')[0],
        data = dr.getterByField(state, 'voucherData.voucherItems'),
        isChanged = false

    //已审核状态不可编辑
    if (dr.getterByField(state, 'voucherData.voucherHeader.state') == action.STATUS_VOUCHER_AUDITED
        || dr.getter(state, 'voucher.voucherBody', 'disabled') == true) {
        return state
    }

    //如果已经到最后一行,则新增一个空行
//    if (index == data.size - 1) {
//        data = data.push(Map(api.blankVoucherItem))
//        state = dr.setterByField(state, 'voucherData.voucherItems', data)
//        // state = refreshGridHeight(state)
//        isChanged = true
//    }
    //如果切换到了"摘要"(新的一行)
    if (fieldPath === 'voucher.voucherBody.id' && index > 0) {
        //如果没有摘要,则填写摘要
        let lastItem = data.get(index - 1)
        if (!data.get(index).get('summary') && lastItem.get('summary')) {
            data = data.update(index, item => item.set('summary', lastItem.get('summary')))
            state = dr.setterByField(state, 'voucherData.voucherItems', data)
            isChanged = true
        }
    }

    if (isChanged && dr.getterByField(state, 'editStatus') == action.STATUS_VIEW) {
        state = changeStatus(state, action.STATUS_EDIT)
    }

    return state
}

//点击删除按钮时, 1) 记录被删除的分录id,以备上传服务端  2) 删除该行(把下面的行上移), 3) 如果不够最少行则补空行  4) 设置为编辑状态
export function delRow(state, rowIndex) {
    if (dr.getter(state, 'voucher.voucherBody', 'disabled')) {  //disabled状态下不可清除行
        return state
    }
    let voucherItems = dr.getterByField(state, 'voucherData.voucherItems'),
        deletedVoucherItems = dr.getterByField(state, 'deletedVoucherItems')

    if (voucherItems.get(rowIndex).get('id')) {
        if (!deletedVoucherItems) {
            deletedVoucherItems = List()
        }
        deletedVoucherItems = deletedVoucherItems.push(voucherItems.get(rowIndex))
        state = dr.setterByField(state, 'deletedVoucherItems', deletedVoucherItems)
    }

    voucherItems = voucherItems.delete(rowIndex)

    if (voucherItems.size < api.emptyVoucherData.voucherItems.length) {
        voucherItems = voucherItems.push(Map(api.blankVoucherItem))
    }

    let newEditStatus = dr.getterByField(state, 'editStatus') == action.STATUS_ADD ? action.STATUS_ADD : action.STATUS_EDIT
    state = changeStatus(state, newEditStatus, action.STATUS_VOUCHER_NOT_AUDITED)
    // state = refreshGridHeight(state)
    return dr.setterByField(state, 'voucherData.voucherItems', voucherItems)
}

export function selectAddedItem(state,path,newValue){
    state =dr.setterByField(state,path,newValue)
    return state
}
//使用新单据号,初始化空界面
export function initNewVoucher(state, voucherInitData) {
    state=setTotalRowVisible(state,false)
    //初始化单据时，隐藏制单人，审核人
    return dr.setterByField(state, 'voucherData.voucherHeader.businessDate', voucherInitData.businessDate)


    // let invoiceTypeMap=fromJS(voucherInitData.invoiceType.enumDetail)
    // state =dr.setter(state, 'voucher.voucherHeader.formItems.invoiceType', 'dataSource',invoiceTypeMap)
    // if(invoiceTypeMap.size>0){
    //     let selectedInvoiceType = { enumItemId: voucherInitData.invoiceType.enumDetail[0].enumItemId, enumItemName: voucherInitData.invoiceType.enumDetail[0].enumItemName }
    //     state =dr.setterByField(state, 'voucherData.voucherHeader.invoiceType', fromJS(selectedInvoiceType))
    // }
}

//使用单据,初始化界面
export function initLoadVoucher(state, voucherData,showStatus) {
    state = loadVoucher(state, voucherData)
    if(showStatus) {
        state = dr.setterByField(state, 'showStatus', showStatus)
    }
    if(voucherData.get('status') == action.STATUS_VOUCHER_AUDITED){
        state = changeStatus(state, action.STATUS_VIEW, action.STATUS_VOUCHER_AUDITED)
    }else{
        state = changeStatus(state, action.STATUS_VIEW, action.STATUS_VOUCHER_NOT_AUDITED)
    }
    return state
}

//加载新数据, 或者服务端获取的数据
export function loadVoucher(state, voucherData, editStatus, showStatus) {
    if(!voucherData)return
    let voucherHeader = fromJS({
        id: voucherData.get('id'),
        code: voucherData.get('code'),
        ts: voucherData.get('ts'),
        businessDate: voucherData.get('businessDate'),
        createTime: voucherData.get('createTime'),
        customerList:{
            id:voucherData.get('customerId'),
            name:voucherData.get('customerName')
        },
        bankAccount:{
            id: voucherData.get('bankAccountId'),
            name: voucherData.get('bankAccountName')
        },
        preReceivePayAmount:(parseFloat(voucherData.get('preReceivePayAmount'))+parseFloat(voucherData.get('receivePayAmount'))).toFixed(2),
        receivePayAmount:parseFloat(voucherData.get('receivePayAmount')).toFixed(2),
        attachCount: voucherData.get('attachedVoucherNum'),
        makerId: voucherData.get('creator'),
        maker: voucherData.get('creatorName'),
        auditorId: voucherData.get('auditorId'),
        auditor: voucherData.get('auditorName'),
        state: voucherData.get('status')        
    })

    let voucherItems = List()
    for (let entry of voucherData.get('details')) {
        let voucherItem = getVoucherItemFromEntry(state, entry)
        voucherItems = voucherItems.push(voucherItem)     
    }
    
    state = dr.setterByField(state, 'voucherData.adjunctInfo.album', fromJS(voucherData.get('enclosures')))
    state = dr.setterByField(state, 'voucherData.adjunctInfo.adjunctSize', voucherData.get('enclosures') ?voucherData.get('enclosures').size: 0)
    state = dr.setterByField(state, 'voucherData.voucherHeader', voucherHeader)
    state = dr.setterByField(state, 'voucherData.voucherItems', voucherItems)
    state = dr.setterByField(state, 'showStatus', showStatus)
    state = clearGridFocus(state)  //切换单据(翻页)时,清空焦点

    return changeStatus(state, editStatus, voucherHeader.get('state'))
}
function getVoucherItemFromEntry(state, entry) {
    let voucherItem = fromJS({
        id: entry.get('id'),
        cancelVoucherId: entry.get('cancelVoucherId'),
        cancelVoucherCode: entry.get('cancelVoucherCode'),
        totalSettleAmount: entry.get('totalSettleAmount'),
        settledAmount: entry.get('settledAmount'),
        notSettleAmount: entry.get('notSettleAmount'),
        currentSettleAmount:entry.get('currentSettleAmount')
    })
    return voucherItem
}

//清空当前单据状态,并进入新建状态(重建一个getEmptyVoucher)
export function clearAndNewVoucher(state, newVoucherData,showStatus) {
    state = dr.setterByField(state, 'voucherData', fromJS(api.emptyVoucherData))
    state = changeStatus(state, action.STATUS_ADD, action.STATUS_VOUCHER_NOT_AUDITED)
    state = dr.setter(state,'voucher.voucherHeader.formItems.voucherSource','visible',false)
    //state = initVoucherCode(state, newVoucherData.code)
    state = dr.setterByField(state, 'showStatus', showStatus)
    state = initVoucherDate(state, newVoucherData.voucherDate)
    // state = refreshGridHeight(state)

    state = clearGridFocus(state)  //清空焦点
    return state
}

//修改单据状态
export function changeStatus(state, editStatus, voucherStatus, sourceVoucherCode) {

    state = checkMetaDisable(state, editStatus, voucherStatus, sourceVoucherCode)
    state = dr.setterByField(state, 'editStatus', editStatus || action.STATUS_ADD)
    state = dr.setterByField(state, 'voucherData.voucherHeader.state', voucherStatus || action.STATUS_VOUCHER_NOT_AUDITED)
    return state
}

/**
 * 对将要变成的状态设置控件的可用性(设置meta中的元素为disabled)
 * @param state
 * @param editStatus    将变成的单据编辑状态
 * @param voucherStatus 将变成的审核状态,可不传,不传时认为不做变更
 * @returns {*}
 */
function checkMetaDisable(state, editStatus, voucherStatus, sourceVoucherCode) {
    let currentUserLimits = dr.getterByField(state,'currentUserLimits')
    if (!voucherStatus) {
        voucherStatus = dr.getterByField(state, 'voucherData.voucherHeader.state') //审核状态
    }
	
    // if (editStatus == action.STATUS_VIEW && action.STATUS_VIEW != dr.getterByField(state, 'editStatus')) {
    if (editStatus == action.STATUS_VIEW) {
        let metaHeaderItems = dr.getter(state, 'voucher.voucherHeader.formItems', 'childrens')
        for (let i = 0; i < metaHeaderItems.size; i++) {
            metaHeaderItems = metaHeaderItems.set(i, metaHeaderItems.get(i).set('disabled', true))
        }
        state = dr.setter(state, 'voucher.voucherHeader.formItems', 'childrens', metaHeaderItems)
        state = dr.setter(state, 'voucher.voucherBody', 'disabled', true)
        /*将所有INPUT边框隐藏,设置只读*/

        state=dr.setter(state, 'voucher.voucherBody.currentSettleAmount','disabled',true)

    }
    else {
       
        let metaHeaderItems = dr.getter(state, 'voucher.voucherHeader.formItems', 'childrens')
        for (let i = 0; i < metaHeaderItems.size; i++) {
            if(metaHeaderItems.get(i).get('name')=='code')continue
            //保存后的客户只读
            metaHeaderItems = metaHeaderItems.set(i, metaHeaderItems.get(i).set('disabled', false))
        }

        state = dr.setter(state, 'voucher.voucherHeader.formItems', 'childrens', metaHeaderItems)
        state = dr.setter(state, 'voucher.voucherBody', 'disabled', false)


        /*将所有INPUT边框隐藏,设置只读*/
        state=dr.setter(state, 'voucher.voucherBody.currentSettleAmount','disabled',false)
    }
    return state
}

//清空单元格
export function clearCell(state, fieldName, index) {
    let voucherItems = dr.getterByField(state, 'voucherData.voucherItems')
    voucherItems = voucherItems.set(index, voucherItems.get(index).set(fieldName, ''))
    return dr.setterByField(state, 'voucherData.voucherItems', voucherItems)
}


//设置单据号
export function initVoucherCode(state, newCode) {
    state = dr.setterByField(state, 'voucherData.voucherHeader.initVoucherCode', newCode)
    return dr.setterByField(state, 'voucherData.voucherHeader.code', newCode)
}

//设置单据日期
export function initVoucherDate(state, newVoucherDate) {
    return dr.setterByField(state, 'voucherData.voucherHeader.businessDate', newVoucherDate)
}

//开始输入辅助核算: 表格不可编辑 + 清空焦点
export function startEditAuxAccount(state) {
    state = dr.setter(state, 'voucher.voucherBody', 'disabled', true)
    state = dr.setter(state, 'voucher.voucherBody.quantityAndForeignCurrency', 'hidePopover', true)
    return dr.focus(state, '')
}

//保存审核状态: 修改审核人信息 + 单据状态
export function changeAuditStatus(state, auditStatus, user, ts) {
    if (auditStatus == action.STATUS_VOUCHER_AUDITED) {
        state = dr.setterByField(state, 'voucherData.voucherHeader.auditor', user.name)
        state = dr.setterByField(state, 'voucherData.voucherHeader.auditorId', user.id)
        state = dr.setterByField(state, 'voucherData.voucherHeader.ts', ts)
    }
    else {
        state = dr.setterByField(state, 'voucherData.voucherHeader.auditor', '')
        state = dr.setterByField(state, 'voucherData.voucherHeader.auditorId', '')
        state = dr.setterByField(state, 'voucherData.voucherHeader.ts', ts)
    }
    state = clearGridFocus(state)  //审核/反审核时,清空焦点
    return changeStatus(state, action.STATUS_VIEW, auditStatus)
}

//清空grid的焦点
export function clearGridFocus(state) {
    return dr.focus(state, '')
}

//新增并选中
export function addAndSelectAccountSubject(state, path, accountSubject) {
    if (accountSubject) {
        let accountSubjectList = dr.getter(state, 'voucher.voucherBody.inventoryService', 'dataSource')
        accountSubjectList = accountSubjectList.push(accountSubject)
        state = dr.setter(state, 'voucher.voucherBody.inventoryService', 'dataSource', accountSubjectList)
    }

    state = onFieldChange(state, path, '', accountSubject)

    state = dr.focus(state, path)
    return dr.setter(state, path, 'value', accountSubject)
}

//填充附件数的最大值
export function fillMaxAttachCount(state) {
    return dr.setterByField(state, 'voucherData.voucherHeader.attachCount', action.MAX_ATTACH_COUNT)
}


/**
 * 上传成功更新状态
 * @param  {[type]} state     [description]
 * @param  {[type]} imageName [description]
 * @return {[type]}           [description]
 */
export function upload(state, filesList){
	let {getterByField, setterByField} = dr,
        enclosures = dr.getterByField(state, 'voucherData.enclosures')
    filesList.map((element, index) => {
        enclosures = enclosures.push(fromJS({
            enclosureId: element.get('id')
        }))
    })
	state = setterByField(state, 'voucherData.adjunctInfo.album', filesList)
	state = setterByField(state, 'voucherData.adjunctInfo.adjunctSize', filesList.size )
	state = setterByField(state, 'voucherData.enclosures', enclosures)
	return state
}

export function visibleChange(state, visible) {
	state = dr.setterByField(state, 'voucherData.adjunctInfo.isVisible', visible)
	return state
}

Object.assign(exports, {...dr, ...exports})