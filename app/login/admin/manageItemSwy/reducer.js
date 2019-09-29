import * as dr from 'dynamicReducer'
import Immutable, {List,Map,fromJS} from 'immutable'
import moment from 'moment'
import * as consts from './consts'

export function updateMemo(state, value) {
	state = dr.setterByField(state,'form.memo',value)
	return state
}
export function setFirmData(state,value,initData){
	let orgList = value.orgList
	state = dr.setterByField(state,'initData',fromJS(initData))
	state = dr.setter(state,'orderManageForm.offlineOrder.companyName','dataSource',fromJS(orgList))
	state = dr.setterByField(state,'form.offlineOrder.companyName',fromJS(orgList[0]))
	return state
}
export function getAllFriend(state,value){
	let orgList = value
	state = dr.setter(state,'orderManageForm.offlineOrder.theirFiend','dataSource',fromJS(orgList))
	return state
}

export function updatePayType(state, value) {
	state = dr.setterByField(state,'payTypeValue',value)
	return state
}

export function updateOrderPrompt(state, value) {
	state = dr.setterByField(state,'orderPromptValue',value)
	return state
}

export function onFieldChange(state,path,oldValue,newValue) {
	if(path.indexOf('orderManageForm.offlineOrder.beginDate')!=-1) {	
		state = dr.setterByField(state,'form.beginDate',newValue)
		state = dr.setterByField(state,'form.endDate',fromJS(moment(newValue).add('month', 12).add('days', -1).format('YYYY-MM-DD')))
		state = dr.setter(state,'orderManageForm.offlineOrder.endDate','disabledDate',fromJS({minDisabledDate:newValue}))
	}else if(path.indexOf('orderManageForm.offlineOrder.endDate')!=-1) {
		state = dr.setterByField(state,'form.endDate',newValue)
		state = dr.setter(state,'orderManageForm.offlineOrder.beginDate','disabledDate',fromJS({maxDisabledDate:newValue}))
	} else {
		state = dr.onFieldChange(state,path,oldValue,newValue)
	}
	return state
}

export function setOrgAboutData(state, newValue, data) {
	state = dr.setterByField(state,'form.org',fromJS(newValue))
	state = dr.setterByField(state,'form.beginDate', data.beginDate)
	state = dr.setterByField(state,'form.endDate', data.endDate)
	state = dr.setterByField(state,'form.payAmount', data.amount)

	return state
}

//2017.7.13新创建线下订单
export function setMobile(state, mobile, data) {//修改手机号，改变企业名称下拉项

    state = dr.setterByField(state,'form.mobile',mobile)
    state = dr.setterByField(state,'form.mobileCode',data ? data : '')
    state = dr.setterByField(state, 'other.avaliableMobile', data ? true : false)
	return state
}

export function setProductInfo(state, product, data) {//修改手机号，改变企业名称下拉项
	let curDate = moment(dr.getterByField(state,'form.beginDate')),
		curYear = curDate.year(),
		curMonth = curDate.month()+1<10?'0'+(curDate.month()+1):curDate.month()+1,
		curDay = curDate.date()<10?'0'+curDate.date():curDate.date(),
		beginDate = curYear+'-'+curMonth+'-'+curDay,
		isPay = dr.getterByField(state,'form.isPay'),
		curOrg = dr.getterByField(state,'form.org')
	if(isPay) {
		isPay=isPay.toJS()
		if(isPay.id!=2) {
			state = dr.setterByField(state,'form.payAmount',data.price)
		}
	} else {
		state = dr.setterByField(state,'form.payAmount',data.price)
	}
	state = dr.setterByField(state,'form.product',product)
	if(curOrg) {
		let startDate = moment(curOrg.get('expireTime')),
			beginDateObj = startDate.add(1,'days').format('YYYY-MM-DD'),
			endDateObj = startDate.add(data.timespan,'months').subtract(1,'days').format('YYYY-MM-DD')
		state = dr.setter(state,'orderManageForm.offlineOrder.beginDate','disabledDate',fromJS({maxDisabledDate:endDateObj}))
		state = dr.setter(state,'orderManageForm.offlineOrder.endDate','disabledDate',fromJS({minDisabledDate:beginDateObj}))
		state = dr.setterByField(state,'form.beginDate',beginDateObj)
		state = dr.setterByField(state,'form.endDate',endDateObj)
	}
	if(product.get('versionType')==2) {
		state = dr.setter(state,'orderManageForm.offlineOrder.serviceProvider','visible',true)
		state = dr.setter(state,'orderManageForm.offlineOrder.serviceProvider','required',true)
		state = dr.setter(state,'orderManageForm.offlineOrder.serviceProvider','validate',fromJS({
            showTooltip:false,
            rules: [{
                required: false,
                message: '所属服务商不能为空'
            }]
        }))
	} else {
		state = dr.setter(state,'orderManageForm.offlineOrder.serviceProvider','visible',false)
		state = dr.setter(state,'orderManageForm.offlineOrder.serviceProvider','required',false)
		state = dr.setter(state,'orderManageForm.offlineOrder.serviceProvider','validate',undefined)
		state = dr.setterByField(state,'form.serviceProvider',undefined)

	}
	return state
}
export function setServiceProvider(state, app, data) {//修改手机号，改变企业名称下拉项
	state = dr.setterByField(state,'form.app',app)
	state = dr.setter(state,'orderManageForm.offlineOrder.serviceProvider','dataSource',fromJS(data))
	state = dr.setterByField(state,'form.serviceProvider',undefined)//清空原来企业名称
	return state
}

export function updateTimeAndStatus(state, value, payStatus,path) {
	state = dr.setterByField(state,'form.payStatus',payStatus)
	state = dr.setterByField(state,'form.endDate',value.endTime.split(' ')[0])
	return state
}

export function onFieldFocus(state, path){
	state = dr.clearValidate(state, path)
	return dr.onFieldFocus(state, path)
}

export function setInitData(state, orderInfo) {
    let orderSource = consts.orderType.xx,
        payType = {}, invoiceStatus = {}
    if(orderInfo.orderSource) {
        orderSource = consts.selectInfo(consts.orderTypeArr, orderInfo.orderSource)
    }
    payType = consts.selectInfo(consts.payTypeArr, orderInfo.payType)
    invoiceStatus = consts.selectInfo(consts.invoiceStatusArr, orderInfo.invoiceStatus)
    state =  dr.setterByField(state, 'form.id', orderInfo.id)
    state =  dr.setterByField(state, 'form.memo', orderInfo.memo)
    state =  dr.setterByField(state, 'form.isPay', fromJS(orderSource))
    state =  dr.setterByField(state, 'form.mobile', orderInfo.mobile)
    state =  dr.setterByField(state, 'form.org', orderInfo.productName)
    state =  dr.setterByField(state, 'form.beginDate', orderInfo.beginDate)
    state =  dr.setterByField(state, 'form.endDate', orderInfo.endDate)
    state =  dr.setterByField(state, 'form.payAmount', orderInfo.amount)
    state =  dr.setterByField(state, 'form.payType', fromJS(payType))
    state =  dr.setterByField(state, 'form.invoiceStatus',fromJS(invoiceStatus))
    state =  dr.setterByField(state, 'form.invoice', orderInfo.invoice)
	return state
}

export function setProductSource(state,productList,vatTaxpayer) {
	let productSource
	state = dr.setterByField(state,'productList',fromJS(productList))
	if(vatTaxpayer) {
		productSource = productList.filter(o=> {
			return (o.vatTaxpayer==vatTaxpayer||!o.vatTaxpayer)
		})
		state = dr.setter(state,'orderManageForm.offlineOrder.product','dataSource',fromJS(productSource))
	} else {
		state = dr.setter(state,'orderManageForm.offlineOrder.product','dataSource',fromJS(productList))		
	}
	return state
}

export function setInitOnLineData(state, orderInfo) {
    let orderSource = consts.orderType.xs,
        payType = {}, invoiceStatus = {}
    if(orderInfo.orderSource) {
        orderSource = consts.selectInfo(consts.orderTypeArr, orderInfo.orderSource)
    }
    payType = consts.selectInfo(consts.payTypeArr, orderInfo.payType)
    invoiceStatus = consts.selectInfo(consts.invoiceStatusArr, orderInfo.invoiceStatus)
    state =  dr.setterByField(state, 'form.id', orderInfo.id)
    state =  dr.setterByField(state, 'form.memo', orderInfo.memo)
    state =  dr.setterByField(state, 'form.isPay', fromJS(orderSource))
    state =  dr.setterByField(state, 'form.mobile', orderInfo.mobile)
    state =  dr.setterByField(state, 'form.org', orderInfo.productName)
    state =  dr.setterByField(state, 'form.beginDate', orderInfo.beginDate)
    state =  dr.setterByField(state, 'form.endDate', orderInfo.endDate)
    state =  dr.setterByField(state, 'form.payAmount', orderInfo.amount)
    state =  dr.setterByField(state, 'form.payType', fromJS(payType))
    state =  dr.setterByField(state, 'form.invoiceStatus',fromJS(invoiceStatus))
    state =  dr.setterByField(state, 'form.invoice', orderInfo.invoice)
	return state
}

Object.assign(exports,{...dr, ...exports})