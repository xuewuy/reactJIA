import * as dr from 'dynamicReducer'
import { fromJS, Map, List } from 'immutable'
import * as api from './api'
import * as action from './action'

export function initView(state, payload, utils) {
    state = dr.initView(state, payload, utils)
    state = checkMetaDisable(state, payload.data.editStatus)

    return state
}
//计算结算金额
export function calcSettlementAmount(state,value){
    //含税金额
    let bodyMeta = dr.getterByField(state, 'voucherData.voucherItems'),
        amountOfMoneyValue=0
    for (let i = 0; i < bodyMeta.size; i++) {
        let _total=bodyMeta.get(i).get('amountOfMoneyTax') ? parseFloat(bodyMeta.get(i).get('amountOfMoneyTax')).toFixed(2) : 0
        amountOfMoneyValue =parseFloat(_total)+amountOfMoneyValue     
    }
    return dr.setter(state, 'voucher.voucherFooter.formItems.settlementAmount', 'value',isNaN(amountOfMoneyValue) ? 0 : parseFloat(amountOfMoneyValue).toFixed(2))
}
// 商品或服务名称
export function InventoryProp(state, value, notAdd){
    if(value.name) {
        let invSubjectList = dr.getter(state, 'voucher.voucherBody.inventoryService', 'dataSource')
        invSubjectList = invSubjectList.push(fromJS(value))
        if(!notAdd) {
            state = dr.setter(state, 'voucher.voucherBody.inventoryService', 'dataSource', invSubjectList)
        }
    }
	state = dr.setterByField(state,`voucherData.voucherItems.${value.index}.company`,value.company)// 单位
	state = dr.setterByField(state,`voucherData.voucherItems.${value.index}.taxRate`,value.taxRate)//税率(%)
    state = dr.setterByField(state,`voucherData.voucherItems.${value.index}.specification`,value.specification)//规格型号
   
    if(value.sale){
         state = dr.setterByField(state,`voucherData.voucherItems.${value.index}.unitPriceTax`,isNaN(value.sellingPrice) ? '' : parseFloat(value.sellingPrice).toFixed(2))//销售价
    }
    //如果数量为空，给个默认值
    let currentQuantity=dr.getterByField(state,`voucherData.voucherItems.${value.index}.number`),
        unitPriceTax=dr.getterByField(state,`voucherData.voucherItems.${value.index}.unitPriceTax`)
    // && (!unitPriceTax || unitPriceTax =='NaN')
    if(!unitPriceTax || unitPriceTax =='NaN'){
        unitPriceTax=0
        state = dr.setterByField(state,`voucherData.voucherItems.${value.index}.unitPriceTax`,0)//含税单价
    }
    if(!currentQuantity || currentQuantity ==1) {
        state=refComputeAmount(state,unitPriceTax,value.taxRate,value.index)
    }
    //state = dr.focus(state, `voucherData.voucherItems.${value.index}.number`)
	return state
}

//参照后自动计算金额

export function refComputeAmount(state,unitPriceTax,taxRate,rowIndex){
    state = dr.setterByField(state,`voucherData.voucherItems.${rowIndex}.number`,1)
    state = dr.setterByField(state,`voucherData.voucherItems.${rowIndex}.amountOfMoneyTax`,parseFloat(1*unitPriceTax).toFixed(2))//含税金额
    let _amount=parseFloat((1*unitPriceTax)/(1+(isNaN(taxRate)?'':taxRate))).toFixed(2)
    state = dr.setterByField(state,`voucherData.voucherItems.${rowIndex}.amountOfMoney`,_amount)//金额=含税金额/1+税率
    state = dr.setterByField(state,`voucherData.voucherItems.${rowIndex}.unitPrice`,parseFloat(_amount/1).toFixed(2))//单价
    state = dr.setterByField(state,`voucherData.voucherItems.${rowIndex}.tax`,parseFloat(1*unitPriceTax)-_amount)
    state=calcSettlementAmount(state,null)
    return state
}
// 点击 客户某一项，判断是否 使用预收款 结果
export function customerSettleMoney(state,value){
	let prePayment = value.preReceivePayAmount == null ? 0 : value.preReceivePayAmount
	state = dr.setterByField(state, 'voucher.voucherFooter.formItems.prePayment',prePayment)
	state = dr.setterByField(state, 'voucher.voucherFooter.formItems.overdraftAmount',value.overdraftAmount) //客户欠款

    //带出默认账号

    if(value && value.lastBankAccountId){
        state = dr.setter(state, 'voucher.voucherFooter.formItems.bankAccount','value',fromJS({id:value.lastBankAccountId,name:value.lastBankAccountName}))
        
    }
    else{
        state = dr.setter(state, 'voucher.voucherFooter.formItems.bankAccount','value',fromJS({id:4,code:'XJ',name:'现金'}))
    }
    if(value && value.lastBankAccountId==6){
        //暂不支付时，收款金额只读
        state = dr.setter(state, 'voucher.voucherFooter.formItems.bankAccount','disabled',false)
        state=dr.setter(state,'voucher.voucherFooter.formItems.settlementMoney','component','Input')
        state = dr.setter(state, 'voucher.voucherFooter.formItems.settlementMoney','value','0.00')
        state = dr.setter(state, 'voucher.voucherFooter.formItems.settlementMoney','disabled',true)
    }
    else{
        state=dr.setter(state,'voucher.voucherFooter.formItems.settlementMoney','component','InputNumber')
        state = dr.setter(state, 'voucher.voucherFooter.formItems.settlementMoney','disabled',false)
    }

	return state
}
// 修改单价（含税）
export function amountOfMoneyTax(state,value,rowIndex){
    state = dr.setterByField(state,`voucherData.voucherItems.${rowIndex}.amountOfMoneyTax`,isNaN(value.currentAmountOfMoneyTax.amountOfMoneyTax)?'':parseFloat(value.currentAmountOfMoneyTax.amountOfMoneyTax).toFixed(2))
	state = dr.setterByField(state,`voucherData.voucherItems.${rowIndex}.unitPriceTax`,isNaN(value.currentAmountOfMoneyTax.unitPriceTax) ? '' : parseFloat(value.currentAmountOfMoneyTax.unitPriceTax).toFixed(2)) // 单价（含税） 当前状态保存项
    state = dr.setterByField(state,`voucherData.voucherItems.${rowIndex}.amountOfMoney`,isNaN(value.currentAmountOfMoney.amountOfMoney)?'':value.currentAmountOfMoney.amountOfMoney)
	state = dr.setterByField(state,`voucherData.voucherItems.${rowIndex}.tax`,isNaN(value.currentTax.tax)?'':value.currentTax.tax)
	state = dr.setterByField(state,`voucherData.voucherItems.${rowIndex}.unitPrice`,value.currentUnitPrice.unitPrice) // 单价
    state=calcSettlementAmount(state,value)
	return state
}
// 修改数量
export function newUnitPrice(state,value,rowIndex){
    let number=value.currentUnitPriceTax.number
    state = dr.setterByField(state,`voucherData.voucherItems.${rowIndex}.number`,number)
    if(number !=0 && !isNaN(number)){
        //数量为0时，不清空含税单价
	    state = dr.setterByField(state,`voucherData.voucherItems.${rowIndex}.unitPriceTax`,isNaN(value.currentUnitPriceTax.unitPriceTax) ? '' : parseFloat(value.currentUnitPriceTax.unitPriceTax).toFixed(2))
    }
    state = dr.setterByField(state,`voucherData.voucherItems.${rowIndex}.amountOfMoneyTax`,isNaN(value.currentAmountOfMoneyTax.amountOfMoneyTax)?'':parseFloat(value.currentAmountOfMoneyTax.amountOfMoneyTax).toFixed(2))
	state = dr.setterByField(state,`voucherData.voucherItems.${rowIndex}.unitPrice`,value.currentUnitPrice.unitPrice)
	state = dr.setterByField(state,`voucherData.voucherItems.${rowIndex}.amountOfMoney`,isNaN(value.currentAmountOfMoney.amountOfMoney)?'':value.currentAmountOfMoney.amountOfMoney)
	state = dr.setterByField(state,`voucherData.voucherItems.${rowIndex}.tax`,isNaN(value.currentTax.tax)?'':value.currentTax.tax)
    //含税金额
	state=calcSettlementAmount(state,value)
	return state
}

// 修改金额（含税）
export function amountOfTaxAndAmountOfMoney(state,value,rowIndex){
	state = dr.setterByField(state,`voucherData.voucherItems.${rowIndex}.unitPriceTax`,isNaN(value.currentUP.unitPriceTax) ? '' : parseFloat(value.currentUP.unitPriceTax).toFixed(2))
    state = dr.setterByField(state,`voucherData.voucherItems.${rowIndex}.amountOfMoney`,isNaN(value.currentAOM.amountOfMoney)?'':value.currentAOM.amountOfMoney)
	state = dr.setterByField(state,`voucherData.voucherItems.${rowIndex}.tax`,isNaN(value.currentTax.tax)?'':value.currentTax.tax)
	state = dr.setterByField(state,`voucherData.voucherItems.${rowIndex}.amountOfMoneyTax`,isNaN(value.currentUP.amountOfMoneyTax)?'':parseFloat(value.currentUP.amountOfMoneyTax).toFixed(2)) //金额（含税） 保存项
	state = dr.setterByField(state,`voucherData.voucherItems.${rowIndex}.unitPrice`,value.currentUnitPrice.unitPrice) //单价
    //含税金额
	state=calcSettlementAmount(state,value)

	return state
}

export function setValueByPath(state, path, data){
    
    let index=data.get('index')
    state =dr.setterByField(state,`voucherData.voucherItems.${index}.inventoryService`,data)
    state=InventoryProp(state,data.toJS())
    return state
}

export function computeTotalMoney(state,value){
	state = dr.setterByField(state, 'newArr_z',value) // 总和 金额（含税）
	state = dr.setterByField(state, 'settlementMoney',parseFloat(value).toFixed(2)) // 收款金额
	return state 
}

export function bankAccountStatus(state,value){
    state = dr.setterByField(state,'voucher.voucherFooter.bankAccount',value)
    if(Map.isMap(value)){
        if(value.get('code')=='ZBZF'){
            state=dr.setter(state,'voucher.voucherFooter.formItems.settlementMoney','disabled',true)
            state=dr.setter(state,'voucher.voucherFooter.formItems.settlementMoney','value','0.00')
            state=dr.setter(state,'voucher.voucherFooter.formItems.settlementMoney','component','Input')
        }
        else{
            state=dr.setter(state,'voucher.voucherFooter.formItems.settlementMoney','component','InputNumber')
            state=dr.setter(state,'voucher.voucherFooter.formItems.settlementMoney','disabled',false)
        }
    }
    return state
}

export function personStatus(state,value){
    state = dr.setterByField(state,'voucher.voucherHeader.person',value)
    return state
}
export function onFieldChange(state, path, oldValue, newValue) {
    if (path.indexOf('voucher.voucherBody') != -1) {
        let meta = dr.getter(state, path.split(',')[0]),
            editStatus = dr.getterByField(state,'editStatus')
        if (meta.get('enableSum') && typeof(newValue) == 'object') {
            newValue = newValue.get(meta.get('valueMember'))
        }
        else if (path.indexOf('voucher.voucherBody.inventoryService') != -1) {
            if (typeof newValue == 'object') {
                state = setChangedValue(state, path, newValue)
            }
            if (oldValue != newValue) {
                if(editStatus == 3){
                    state = changeStatus(state, action.STATUS_EDIT)
                }
            }
        }
    }

    return dr.onFieldChange(state, path, oldValue, newValue)
}

export function toTargetCell(state, arrowDirection, isSwitchFocus){
    let nextPath,focusCellPath
    try {
        focusCellPath = dr.getter(state, null, 'focusField')
    } catch (e) {
        return
    }
    if(focusCellPath){
        let retData = getNextFocusCellForDirArrow(state, focusCellPath, arrowDirection, nextPath)
        state = retData.state
        nextPath = retData.nextPath

        if(focusCellPath != nextPath){
            state = dr.setter(state, focusCellPath, 'focusField', nextPath)
        }
        if(nextPath){
            state = checkRowState(state, nextPath)
        }
    }

    return state
}

//上下左右键切换焦点Cell
function getNextFocusCellForDirArrow(state, path, arrowDirection, nextPath) {
    if (path.indexOf('voucher.voucherBody') == -1 || path.indexOf(',') == -1) {
        return path
    }
    let index = path.split(',')[1],
        bodyMeta = dr.getter(state, 'voucher.voucherBody', 'childrens')

    let currentFieldPath = path.split(',')[0].split('.'),
        currentFieldName = currentFieldPath[currentFieldPath.length - 1]
    let option = {}

    option.path = path
    option.arrowDirection = arrowDirection


    let nextFiledName = undefined,
        nextIndex = undefined
    for (let i = 0; i < bodyMeta.size; i++) {
        if (bodyMeta.get(i).get('name') === currentFieldName) {
            //填写了可编辑单元格,则切换到下一行
            if (i == bodyMeta.size - 1 || currentFieldName == 'amountOfMoneyTax') {
                switch (arrowDirection) {
                  case api.ARROWUP:
                    if(index > 0){
                        nextFiledName = currentFieldName
                        nextIndex = parseInt(index) - 1
                    }
                    break;
                  case api.ARROWDOWN:
                    nextFiledName = currentFieldName
                    nextIndex = parseInt(index) + 1
                    break;
                  case api.ARROWLEFT:
                    nextFiledName = 'number'
                    nextIndex = index
                    break;
                  case api.ARROWRIGHT:
                    nextFiledName = bodyMeta.get(0).get('name')
                    nextIndex = parseInt(index) + 1
                    break;
                  default:

                }
            }
            else {
                switch (arrowDirection) {
                  case api.ARROWUP:

                    if(index == 0 ||
                       (currentFieldName == 'inventoryService' && !dr.getter(state, path, 'value'))){
                           nextFiledName = currentFieldName
                           nextIndex = index
                    }else{
                        nextFiledName = currentFieldName
                        nextIndex = parseInt(index) - 1
                    }
                    break;
                  case api.ARROWDOWN:
                    if(currentFieldName == 'inventoryService' && !dr.getter(state, path, 'value')){
                           nextFiledName = currentFieldName
                           nextIndex = index
                    }else{
                        nextFiledName = currentFieldName
                        nextIndex = parseInt(index) + 1
                    }
                    break;
                  case api.ARROWLEFT:
                    nextFiledName = currentFieldName
                    nextIndex = index
                    for (let j = i-1; j >= 0; j--){
                        if (!bodyMeta.get(j).get('disabled')) {
                            nextFiledName = bodyMeta.get(j).get('name')
                            break
                        }
                    }
                    break
                  case api.ARROWRIGHT:
                    for (let j = i + 1; j < bodyMeta.size; j++){
                        if (!bodyMeta.get(j).get('disabled')) {
                            nextFiledName = bodyMeta.get(j).get('name')
                            break
                        }
                    }
                    nextIndex = index
                    break;
                  default:

                }
            }
            break
        }
    }

    if (nextFiledName && nextIndex != undefined) {
        nextPath = path.split(',')[0].replace(currentFieldName, nextFiledName) + ',' + nextIndex
    }
    else {
        nextPath = path
    }

    return { state: state, nextPath: nextPath }
}

//当一个单元格编辑结束,焦点自动定位到下一个可编辑cell
export function onEvent(state, eventName, option) {
    if ((eventName === 'onEndEdit' || eventName === 'onBlur')) {
        if (option.path.indexOf('voucher.voucherBody.inventoryService') != -1) {
            let voucherItems = dr.getterByField(state, 'voucherData.voucherItems'),
                index = parseFloat(option.path.split(',')[1]),
                voucherItem = voucherItems.get(index),
                inventorySubject = voucherItem.get('inventoryService')

            //如果输入以后,没有在下拉中匹配到内容,则清空填写
            if (typeof inventorySubject != 'object') {
                state = clearCell(state, 'inventoryService', index)
            }

            if(eventName === 'onBlur' && Map.isMap(inventorySubject)){
                let curCellCodeAndName = inventorySubject.get('name')
                if(curCellCodeAndName){
                    voucherItems = voucherItems.update(index, item => item.setIn(['inventoryService', 'codeAndName'], curCellCodeAndName))
                    state = dr.setterByField(state, 'voucherData.voucherItems', voucherItems)
                }
            }
        }
        if (eventName === 'onEndEdit' && option.path) {
            let path = option.path,
                nextPath= getNextFocusCellPath(state, path)
            if (nextPath != option.path) {
                state = dr.setter(state, option.path, 'focusField', nextPath)
            }
            state = checkRowState(state, nextPath)  //如果自动切换到最后一行,则新增一行
        }

    }
    //键盘点击了快捷键
    else if (eventName === 'onShortcutKey') {
    }
    //鼠标移入/移出某行, 显示删除(清空)行的按钮
    else if (eventName === 'rowMouseEnter' ) {
        state = mouseHoverRow(state, option)
    }

    return dr.onEvent(state, eventName, option)
}

//设置商品默认数据
function setChangedValue(state, path, newValue) {
    let index = path.split(',')[1],
        voucherItems = dr.getterByField(state, 'voucherData.voucherItems')

    state = dr.setterByField(state, 'voucherData.voucherItems', voucherItems)
    return state
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
            if (i == bodyMeta.size - 1 || (currentFieldName == 'amountOfMoneyTax' && dr.getter(state, path, 'value'))) {
                nextFiledName = bodyMeta.get(0).get('name')
                nextIndex = parseFloat(index) + 1
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
    let oldPath = dr.getterByField(state, 'oldPath', path)
    if(oldPath && oldPath != path && oldPath.indexOf('voucher.voucherBody.unitPriceTax') != -1) {
        //取失去焦点的cell的值
        let oldValuePrice = dr.getterByField(state,`voucherData.voucherItems.${oldPath.split(',')[1]}.unitPriceTax`)
        //格式化
        let formatedPrice = oldValuePrice ? parseFloat(oldValuePrice).toFixed(2) : ''
        //存回去
        state = dr.setterByField(state,`voucherData.voucherItems.${oldPath.split(',')[1]}.unitPriceTax`, formatedPrice)
    }else if(oldPath && oldPath != path && path.indexOf('voucher.voucherBody.amountOfMoneyTax') != -1) {
        //取失去焦点的cell的值
        let oldValueMoney = dr.getterByField(state,`voucherData.voucherItems.${oldPath.split(',')[1]}.amountOfMoneyTax`)
        //格式化
        let formatedMoney = oldValueMoney ? parseFloat(oldValueMoney).toFixed(2) : ''
        //存回去
        state = dr.setterByField(state,`voucherData.voucherItems.${oldPath.split(',')[1]}.amountOfMoneyTax`, formatedMoney)
    }
    //把当前path，存为oldPath
    state = dr.setterByField(state, 'oldPath', path)

    //已审核状态不可编辑
    if (dr.getterByField(state, 'voucherData.voucherHeader.state') == action.STATUS_VOUCHER_AUDITED
        || dr.getter(state, 'voucher.voucherBody', 'disabled') == true) {
        return state
    }
    if (path.indexOf('voucher.voucherBody.inventoryService') != -1) {
        let index = path.split(',')[1],
            voucherItems = dr.getterByField(state, 'voucherData.voucherItems')

        if (voucherItems.get(index).get('inventoryService')) {

            let curCellInventory = voucherItems.get(index).get('inventoryService'),
                curCellCodeAndName =voucherItems.get(index).get('inventoryService').get('codeAndName')

            state = dr.setterByField(state, 'curCellInventory', curCellInventory)
            state = dr.setterByField(state, 'curCellCodeAndName', curCellCodeAndName)
            //voucherItems = voucherItems.update(index, item => item.setIn(['inventoryService', 'auxinventorySubjects'], undefined))
            state = dr.setterByField(state, 'voucherData.voucherItems', voucherItems)
        }
    }

    state = checkRowState(state, path)
    state = dr.clearValidate(state, path)
    return dr.onFieldFocus(state, path)
}

//检查当前单元格, 如果最后一行,则新增空行
function checkRowState(state, path) {
    let index = parseFloat(path.split(',')[1]),
        fieldPath = path.split(',')[0],
        data = dr.getterByField(state, 'voucherData.voucherItems'),
        isChanged = false

    //已审核状态不可编辑
    if (dr.getterByField(state, 'voucherData.voucherHeader.state') == action.STATUS_VOUCHER_AUDITED
        || dr.getter(state, 'voucher.voucherBody', 'disabled') == true) {
        return state
    }

    //如果已经到最后一行,则新增一个空行
    if (index == data.size - 1) {
        data = data.push(Map(api.blankVoucherItem))
        state = dr.setterByField(state, 'voucherData.voucherItems', data)
        // state = refreshGridHeight(state)
        isChanged = true
    }

    //如果切换到了'存货'

    if (fieldPath === 'voucher.voucherBody.inventoryService' && index > 0) {
        let lastItem = data.get(index - 1)
        if (!data.get(index).get('inventoryService') && lastItem.get('inventoryService')) {
            //data = data.update(index, item => item.set('inventoryService', lastItem.get('inventoryService')))
            //state = dr.setterByField(state, 'voucherData.voucherItems', data)
            //isChanged = true
        }
    }
    else if (fieldPath === 'voucher.voucherBody.number' && index > 0) {
        if (!data.get(index).get('number') && !data.get(index).get('number')) {
            isChanged = true
        }
    }
    else if (fieldPath === 'voucher.voucherBody.unitPriceTax' && index > 0) {
        if (!data.get(index).get('unitPriceTax') && !data.get(index).get('unitPriceTax')) {
            isChanged = true
        }
    }

    if (isChanged && dr.getterByField(state, 'editStatus') == action.STATUS_VIEW) {
        state = changeStatus(state, action.STATUS_EDIT)
    }

    return state

}
//鼠标当前悬停的行信息
export function mouseHoverRow(state, option) {
    return dr.setterByField(state, 'mouseHoverRow', option ? Map(option) : undefined)
}

export function setSettleReadOnly(state,settleReadOnly,receivePayAmount){
    if (dr.getterByField(state, 'voucherData.voucherHeader.state') == action.STATUS_VOUCHER_AUDITED || dr.getter(state, 'voucher.voucherBody', 'disabled') == true) {
        return state
    }
    if(settleReadOnly){
        state=dr.setter(state,'voucher.voucherFooter.formItems.bankAccount','disabled',true)
        state=dr.setter(state,'voucher.voucherFooter.formItems.settlementMoney','disabled',true)
        //如果为空，将收款账号更改为'暂不支付'
        if (!dr.getter(state,'voucher.voucherFooter.formItems.bankAccount','value') || dr.getter(state,'voucher.voucherFooter.formItems.bankAccount','value').get('code') !='ZBZF') {  //disabled状态下不可清除行
            state = dr.setter(state,'voucher.voucherFooter.formItems.bankAccount','value',fromJS({'id': 6,'code': 'ZBZF','name': '暂不支付'}))
        }       
        state=dr.setter(state,'voucher.voucherFooter.formItems.settlementMoney','component','Input')
        state = dr.setter(state, 'voucher.voucherFooter.formItems.settlementMoney','value','0.00')
    }
    else{

        //
        if(dr.getter(state,'voucher.voucherFooter.formItems.bankAccount','value').get('code') =='ZBZF'){
            state=dr.setter(state,'voucher.voucherFooter.formItems.bankAccount','disabled',false)
            state=dr.setter(state,'voucher.voucherFooter.formItems.settlementMoney','component','Input')
            state=dr.setter(state,'voucher.voucherFooter.formItems.settlementMoney','disabled',true)
            state = dr.setter(state, 'voucher.voucherFooter.formItems.settlementMoney','value','0.00')
        }
        else{
            state=dr.setter(state,'voucher.voucherFooter.formItems.settlementMoney','component','InputNumber')
            state=dr.setter(state,'voucher.voucherFooter.formItems.bankAccount','disabled',false)
            state=dr.setter(state,'voucher.voucherFooter.formItems.settlementMoney','disabled',false)
        }
    }

    //dr.setter(state,'voucher.voucherFooter.formItems.prePayment','value',receivePayAmount)
    dr.setterByField(state, 'voucher.voucherFooter.formItems.prePayment',receivePayAmount)
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

//点击插入按钮时,在当前行的下一行,插入一个空行
export function insertRow(state, rowIndex) {
    if (dr.getter(state, 'voucher.voucherBody', 'disabled')) {  //disabled状态下不可清除行
        return state
    }
    let voucherItems = dr.getterByField(state, 'voucherData.voucherItems')
    voucherItems = voucherItems.insert(rowIndex, Map(api.blankVoucherItem))

    let newEditStatus = dr.getterByField(state, 'editStatus') == action.STATUS_ADD ? action.STATUS_ADD : action.STATUS_EDIT
    state = changeStatus(state, newEditStatus, action.STATUS_VOUCHER_NOT_AUDITED)
    // state = refreshGridHeight(state)
    return dr.setterByField(state, 'voucherData.voucherItems', voucherItems)
}
export function selectAddedItem(state,path,newValue){
    state =dr.setterByField(state,path,newValue)
    //新增客户后，将收款方式改为现金
    state = dr.setter(state, 'voucher.voucherFooter.formItems.bankAccount','value',fromJS({id:4,code:'XJ',name:'现金'}))
    return state
}
//使用新单据号,初始化空界面
export function initNewVoucher(state, voucherInitData, inventorySubjects) {
    state = initVoucherSubject(state, inventorySubjects)
    state = initVoucherData(state, voucherInitData)
	state = dr.setter(state, 'voucher.voucherBody.number', 'min', 0)
	state = dr.setter(state, 'voucher.voucherBody.number', 'max','Infinity')
    // state = refreshGridHeight(state)
    return state
}

//使用单据,初始化界面
export function initLoadVoucher(state, voucherData) {
    state = loadVoucher(state, voucherData)
    let voucherType=voucherData.get('deliveryTypeId')
    if(voucherType==action.STATUS_VOUCHER_SALEREJECTED){
        //销售退货单
        state = changeStatus(state, action.STATUS_ADD, action.STATUS_VOUCHER_NOT_AUDITED)
        state = dr.setterByField(state, 'voucher.voucherFooter.formItems.prePayment',0)
        state = dr.setterByField(state, 'voucher.voucherFooter.formItems.settlementMoney',voucherData.get('settlementMoney'))
        return state
    }
    if(voucherData.get('status') == action.STATUS_VOUCHER_AUDITED){
        state = changeStatus(state, action.STATUS_VIEW, action.STATUS_VOUCHER_AUDITED)
        // state = changeStatus(state, action.STATUS_VIEW, action.STATUS_VOUCHER_AUDITED, voucherData.get('sourceVoucherCode'))
    }else{
        state = changeStatus(state, action.STATUS_VIEW, action.STATUS_VOUCHER_NOT_AUDITED)
        // state = changeStatus(state, action.STATUS_VIEW, action.STATUS_VOUCHER_NOT_AUDITED, voucherData.get('sourceVoucherCode'))  放弃有单据来源的凭证不允许修改得控制
    }
   
    return state
}

//加载新数据, 或者服务端获取的数据
export function loadVoucher(state, voucherData, editStatus, isAddMore) {
    let voucherHeader = fromJS({
        id: voucherData.get('id'),
        code: voucherData.get('code'),
        ts: voucherData.get('ts'),
        saleDate: voucherData.get('businessDate'),
        createTime: voucherData.get('createTime'),
        deliveryTypeId:voucherData.get('deliveryTypeId'),
        customer:{
            id:voucherData.get('customerId'),
            name:voucherData.get('customerName')
        },
        person:{
            id:voucherData.get('salesPersonId'),
            name:voucherData.get('salesPersonName')
        },
        invoiceType:{
            enumItemId:voucherData.get('invoiceTypeId'),
            enumItemName:voucherData.get('invoiceTypeName')
        },
        attachCount: voucherData.get('attachedVoucherNum') || '0',
        //preReceiveAmount:voucherData.get('preReceiveAmount') || '0',
        makerId: voucherData.get('creator'),
        maker: voucherData.get('creatorName'),
        auditorId: voucherData.get('auditorId'),
        auditor: voucherData.get('auditorName'),
        state: voucherData.get('status')        
    })
    let voucherFooter=fromJS({
        settlementAmount:isNaN(voucherData.get('totalSettleAmount')) ? 0 : parseFloat(voucherData.get('totalSettleAmount')).toFixed(2),//结算金额
        settlementMoney:isNaN(voucherData.get('receiveAmount')) ? 0 : parseFloat(voucherData.get('receiveAmount')).toFixed(2),//收款金额
        bankAccount:{
            id: voucherData.get('bankAccountId'),
            name: voucherData.get('bankAccountName'),
        }
    })
    let voucherItems= List()
    if(isAddMore) {  //  在存货管理界面选择存货后增加到销售单而不是替换销售单的内容的操作  addBy zq 2017/1/19
        voucherItems = dr.getterByField(state, 'voucherData.voucherItems').filter((element, index) => {
            if(!element.get('amountOfMoney') && !element.get('amountOfMoneyTax') && !element.get('company') && !element.get('inventoryService') && !element.get('number') && !element.get('specification') && !element.get('tax') && !element.get('taxRate') && !element.get('unitId') && !element.get('unitPrice') && !element.get('unitPriceTax')){
                return false
            }else {
                return true
            }
        })
    }
    for (let entry of voucherData.get('details')) {
        let voucherItem = getVoucherItemFromEntry(state, entry,isAddMore)
        voucherItems = voucherItems.push(voucherItem)     
    }

    let blankVoucherItemCount = api.emptyVoucherData.voucherItems.length - voucherItems.size
    if (blankVoucherItemCount > 0) {
        for (let i = 0; i < blankVoucherItemCount; i++) {
            voucherItems = voucherItems.push(fromJS(api.blankVoucherItem))
        }
    }
    state = dr.setterByField(state, 'voucherData.form.album', fromJS(voucherData.get('enclosures')))
    state = dr.setterByField(state, 'voucherData.form.adjunctSize', voucherData.get('enclosures') ?voucherData.get('enclosures').size: 0)
    //state = dr.setterByField(state, 'voucherData.voucherHeader', voucherHeader)
    state = dr.setterByField(state, 'voucherData.voucherItems', voucherItems)
    state = clearGridFocus(state)  //切换单据(翻页)时,清空焦点
    state = clearDeletedVoucherItems(state)

    //state=loadTableInfo(state,voucherItems,editStatus,isAddMore)
    if(isAddMore){
        let index=0
        for(let entry of voucherItems){
            if(entry.get('inventoryService')){
                state=refComputeAmount(state,entry.get('unitPriceTax'),entry.get('taxRate'),index)
                index++
            }
        }
    }
    else{
        //参照商品后，不刷新表头表尾state
        state = dr.setterByField(state, 'voucherData.voucherHeader', voucherHeader)
        state = dr.setterByField(state, 'voucherData.voucherFooter', voucherFooter)
    }

    state = changeStatus(state, editStatus, voucherHeader.get('state'))
    if(voucherData.get('bankAccountId')==6){
        //收款帐号是暂不支付时，收款金额只读
        state=dr.setter(state,'voucher.voucherFooter.formItems.settlementMoney','disabled',true)
        state=dr.setter(state,'voucher.voucherFooter.formItems.settlementMoney','component','Input')
        state=dr.setter(state,'voucher.voucherFooter.formItems.settlementMoney','value','0.00')

    }
    if(!!voucherData.get('manualWriteOff')){
        state = checkMetaDisable(state,action.STATUS_VIEW,action.STATUS_VOUCHER_AUDITED)
        //禁用删除按钮
        state = dr.setterByField(state, 'voucherData.voucherHeader.state', action.STATUS_VOUCHER_WRITEOFF)
    }

    if(!!voucherData.get('preReceiveAmount')){
        state = dr.setterByField(state, 'voucher.voucherFooter.formItems.prePayment',voucherData.get('preReceiveAmount'))
    }
	if(voucherData.get('deliveryTypeId') == action.STATUS_VOUCHER_SALEREJECTED) {
        state = dr.setter(state, 'voucher.voucherBody.number', 'min', '-' + 'Infinity')
        state = dr.setter(state, 'voucher.voucherBody.number', 'max', 0)
	}else {
        state = dr.setter(state, 'voucher.voucherBody.number', 'min', 0)
        state = dr.setter(state, 'voucher.voucherBody.number', 'max', 'Infinity')
	}
    
    return state
}
function loadTableInfo(state){

}
function clearDeletedVoucherItems(state){
    let deletedVoucherItems = dr.getterByField(state, 'deletedVoucherItems')

    if(deletedVoucherItems){
        state = dr.setterByField(state, 'deletedVoucherItems', undefined)
    }
    return state
}

function getVoucherItemFromEntry(state, entry,isAddMore) {
    let voucherItem = fromJS({
        id: entry.get('id'),
        code: entry.get('code'),
        ts: entry.get('ts'),
        inventoryService: {
            name:entry.get('inventoryName') || entry.get('name'),
            id:entry.get('inventoryId') || entry.get('id'),
            specification:entry.get('specification'),
            company:entry.get('unitName') || entry.get('unitOfMeasurement'),
            codeAndName:entry.get('inventoryName') || entry.get('name')
        },
        specification:entry.get('specification'),
        company:entry.get('unitName') || entry.get('unitOfMeasurement'),
        amountOfMoney:entry.get('amount') || 0,
        amountOfMoneyTax:isNaN(entry.get('amountWithTax')) ? '' : parseFloat(entry.get('amountWithTax')).toFixed(2),//含税金额
        unitPrice:entry.get('price'),//单价
        unitPriceTax:isNaN(entry.get('priceWithTax') || entry.get('sellPrice')) ? '' : parseFloat(entry.get('priceWithTax') || entry.get('sellPrice')).toFixed(2),//含税单价
        number:isAddMore?1:entry.get('quantity'),
        tax:entry.get('tax'),//税额
        taxRate:isAddMore?(entry.get('taxRate')/100 || entry.get('rate')/100):(entry.get('taxRate') || entry.get('rate')),//税率
        voucherId:entry.get('voucherId')
    })
    return voucherItem
}

//清空当前单据状态,并进入新建状态(重建一个getEmptyVoucher)
export function clearAndNewVoucher(state, newVoucherData) {
    state=dr.setter(state,'voucher.voucherFooter.formItems.settlementMoney','component','InputNumber')
    state = dr.setterByField(state, 'voucherData', fromJS(api.emptyVoucherData))
    state = changeStatus(state, action.STATUS_ADD, action.STATUS_VOUCHER_NOT_AUDITED)
    state = dr.setter(state,'voucher.voucherHeader.formItems.voucherSource','visible',false)
    //state = initVoucherCode(state, newVoucherData.code)
    state = initVoucherData(state, newVoucherData)
	state = dr.setter(state, 'voucher.voucherBody.number', 'min', 0)
	state = dr.setter(state, 'voucher.voucherBody.number', 'max','Infinity')
    // state = refreshGridHeight(state)

    state = clearGridFocus(state)  //清空焦点
    return state
}

//修改单据状态
export function changeStatus(state, editStatus, voucherStatus, sourceVoucherCode) {

    state = checkMetaDisable(state, editStatus, voucherStatus, sourceVoucherCode)
    state = dr.setterByField(state, 'editStatus', editStatus || action.STATUS_ADD)
    state = dr.setterByField(state, 'voucherData.voucherHeader.state', voucherStatus || action.STATUS_VOUCHER_NOT_AUDITED)
    state = dr.setterByField(state, 'voucherData.voucherFooter.state', voucherStatus || action.STATUS_VOUCHER_NOT_AUDITED)

    if (editStatus != action.STATUS_ADD) {
        state = mouseHoverRow(state, undefined) //切换到非新增状态,不出现"插入"/"删除"按钮
    }
    return state
}

//原设计在查看状态不可编辑, 现改为只要没审核就可以编辑
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
    if (editStatus == action.STATUS_VIEW && voucherStatus == action.STATUS_VOUCHER_AUDITED) {
        let metaHeaderItems = dr.getter(state, 'voucher.voucherHeader.formItems', 'childrens'),
            metaFooterItems = dr.getter(state, 'voucher.voucherFooter.formItems', 'childrens')
        for (let i = 0; i < metaHeaderItems.size; i++) {
            metaHeaderItems = metaHeaderItems.set(i, metaHeaderItems.get(i).set('disabled', true))
        }
        for (let i = 0; i < metaFooterItems.size; i++) {
            metaFooterItems = metaFooterItems.set(i, metaFooterItems.get(i).set('disabled', true))
        }

        state = dr.setter(state, 'voucher.voucherHeader.formItems', 'childrens', metaHeaderItems)
        state = dr.setter(state, 'voucher.voucherFooter.formItems', 'childrens', metaFooterItems)
        state = dr.setter(state, 'voucher.voucherBody', 'disabled', true)
        //state = dr.setter(state, 'voucher.voucherBody.number', 'component', '')  //解决审核状态下鼠标滑过数量金额列背景色的问题  addBy zq 2017/1/20
        //state = dr.setter(state, 'voucher.voucherBody.number', 'displayComponent', '')
        //state = dr.setter(state, 'voucher.voucherBody.unitPriceTax', 'component', '')
        //state = dr.setter(state, 'voucher.voucherBody.unitPriceTax', 'displayComponent', '')
        //state = dr.setter(state, 'voucher.voucherBody.amountOfMoneyTax', 'component', '')
        //state = dr.setter(state, 'voucher.voucherBody.amountOfMoneyTax', 'displayComponent', '')
        /*将所有INPUT边框隐藏,设置只读*/
        state=dr.setter(state, 'voucher.voucherBody.number','disabled',true)
        state=dr.setter(state, 'voucher.voucherBody.unitPriceTax','disabled',true)
        state=dr.setter(state, 'voucher.voucherBody.amountOfMoneyTax','disabled',true)

        // let metaBodyItems = dr.getter(state, 'voucher.voucherBody', 'childrens')
        // for (let j = 0; j < metaBodyItems.size; j++) {
        //     if(metaBodyItems.get(j).get('name')=='number' || metaBodyItems.get(j).get('name')=='unitPriceTax' || metaBodyItems.get(j).get('name')=='amountOfMoneyTax'){
        //         metaBodyItems = metaBodyItems.set(j, metaBodyItems.get(j).set('disabled', true))
        //     }            
        // }

        // state = dr.setter(state, 'voucher.voucherBody', 'childrens', metaBodyItems)
    }
    else {
       
        let metaHeaderItems = dr.getter(state, 'voucher.voucherHeader.formItems', 'childrens'),
            metaFooterItems = dr.getter(state, 'voucher.voucherFooter.formItems', 'childrens')
        for (let i = 0; i < metaHeaderItems.size; i++) {
            if(metaHeaderItems.get(i).get('name')=='code')continue
            
            //保存后的客户只读
            metaHeaderItems = metaHeaderItems.set(i, metaHeaderItems.get(i).set('disabled', false))
        }
        for (let i = 0; i < metaFooterItems.size; i++) {
            if(metaFooterItems.get(i).get('name')=='settlementAmount')continue

            // if(voucherData.get('bankAccountId')==6){
            //     //收款帐号是暂不支付时，收款金额只读
            //     state=dr.setter(state,'voucher.voucherFooter.formItems.settlementMoney','disabled',true)
            //     state=dr.setter(state,'voucher.voucherFooter.formItems.settlementMoney','value',0)
            // }
            metaFooterItems = metaFooterItems.set(i, metaFooterItems.get(i).set('disabled', false))
        }

        state = dr.setter(state, 'voucher.voucherHeader.formItems', 'childrens', metaHeaderItems)
        state = dr.setter(state, 'voucher.voucherFooter.formItems', 'childrens', metaFooterItems)
        state = dr.setter(state, 'voucher.voucherBody', 'disabled', false)
        
        //state = dr.setter(state, 'voucher.voucherBody.number', 'component', 'Input') //解决审核状态下鼠标滑过数量金额列背景色的问题  addBy zq 2017/1/20
        //state = dr.setter(state, 'voucher.voucherBody.number', 'displayComponent', 'Input')
        //state = dr.setter(state, 'voucher.voucherBody.unitPriceTax', 'component', 'Input')
        //state = dr.setter(state, 'voucher.voucherBody.unitPriceTax', 'displayComponent', 'Input')
        //state = dr.setter(state, 'voucher.voucherBody.amountOfMoneyTax', 'component', 'Input')
        //state = dr.setter(state, 'voucher.voucherBody.amountOfMoneyTax', 'displayComponent', 'Input')
        state=dr.setter(state, 'voucher.voucherBody.number','disabled',false)
        /*将所有INPUT边框隐藏,设置只读*/
        state=dr.setter(state, 'voucher.voucherBody.unitPriceTax','disabled',false)
        state=dr.setter(state, 'voucher.voucherBody.amountOfMoneyTax','disabled',false)
        if (editStatus == action.STATUS_VIEW || editStatus ==action.STATUS_EDIT){
            state=dr.setter(state, 'voucher.voucherHeader.formItems.customer','disabled',true)
        }

    }
    return state
}

//清空单元格
export function clearCell(state, fieldName, index) {
    let voucherItems = dr.getterByField(state, 'voucherData.voucherItems')
    voucherItems = voucherItems.set(index, voucherItems.get(index).set(fieldName, ''))
    return dr.setterByField(state, 'voucherData.voucherItems', voucherItems)
}

//初始化商品服务
export function initVoucherSubject(state, inventorySubjects) {
    return dr.setter(state, 'voucher.voucherBody.inventoryService', 'dataSource', fromJS(inventorySubjects.dataList))
}

//设置单据号
export function initVoucherCode(state, newCode) {
    state = dr.setterByField(state, 'voucherData.voucherHeader.initVoucherCode', newCode)
    return dr.setterByField(state, 'voucherData.voucherHeader.code', newCode)
}


export function initVoucherData(state, voucherInitData) {    
    let invoiceTypeMap=fromJS(voucherInitData.invoiceType.enumDetail)
    state =dr.setter(state, 'voucher.voucherHeader.formItems.invoiceType', 'dataSource',invoiceTypeMap)
    if(invoiceTypeMap.size>0){
        let selectedInvoiceType = { enumItemId: voucherInitData.invoiceType.enumDetail[0].enumItemId, enumItemName: voucherInitData.invoiceType.enumDetail[0].enumItemName }
        state =dr.setterByField(state, 'voucherData.voucherHeader.invoiceType', fromJS(selectedInvoiceType))
    }
    let personMap=fromJS(voucherInitData.personList)
    state=dr.setter(state, 'voucher.voucherHeader.formItems.person', 'dataSource',personMap)
    if(personMap.size>0){
        let selectPerson = { id: voucherInitData.personList[0].id, name: voucherInitData.personList[0].name}
        state =dr.setterByField(state, 'voucherData.voucherHeader.person', fromJS(selectPerson))
    }
    state = dr.setterByField(state, 'voucherData.voucherHeader.date', voucherInitData.newVoucherDate)
    return state
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
export function addAndSelectAccountSubject(state, path, inventorySubject) {
    if (inventorySubject) {
        let invSubjectList = dr.getter(state, 'voucher.voucherBody.inventoryService', 'dataSource')
        invSubjectList = invSubjectList.push(inventorySubject)
        state = dr.setter(state, 'voucher.voucherBody.inventoryService', 'dataSource', invSubjectList)
    }

    state = onFieldChange(state, path, '', inventorySubject)

    state = dr.focus(state, path)
    return dr.setter(state, path, 'value', inventorySubject)
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
        enclosures = List() 
    filesList.map((element, index) => {
        enclosures = enclosures.push(fromJS({
            enclosureId: element.get('id')
        }))
    })
	state = setterByField(state, 'voucherData.form.album', filesList)
	state = setterByField(state, 'voucherData.form.adjunctSize', filesList.size )
	state = setterByField(state, 'voucherData.enclosures', enclosures)
	return state
}

export function visibleChange(state, visible) {
	state = dr.setterByField(state, 'voucherData.form.isVisible', visible)
	return state
}

Object.assign(exports, {...dr, ...exports})
