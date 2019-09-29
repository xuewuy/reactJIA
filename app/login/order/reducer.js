import * as dr from 'dynamicReducer'
import Immutable, { List, Map, fromJS } from 'immutable'

export function setInitData(state, data, orgId, initData) {
	let form = {
		orderType: {
			name: '增值税普通发票',
			id: 1
		},
		orderContent: {
			name: '软件服务费',
			id: 1
		},
		companyName: data.orgName,
		isEdit: true,
		isAgree: true,
		orderTtValue: 'company',
		taxNum: data.unifiedSocialCreditCode,
		address: {provinces: "110000", citys: "110100", districts: "110101", text: ""},
		...data
	}
	form.promotionPrice = data.amount
	form.shouldPrice = data.amount!==undefined?data.amount:data.promotionPrice
	if(data.regCode) {
		form.couponCode = data.regCode.regCode
		form.shouldPrice = data.productPrice - data.regCode.discountPrice
		form.regCode = data.regCode.regCode
		state = dr.setter(state,'order.orderCouponCode.formItems.couponCode','disabled',true)
	} else {
		form.regCode = undefined
		state = dr.setter(state,'order.orderCouponCode.formItems.couponCode','disabled',false)

	}
	if(data.redPackage){
		state = dr.setterByField(state, 'redPackage', fromJS(data.redPackage))
		state = dr.setterByField(state, 'redPackageChecked', true)
		form.shouldPrice -= data.redPackage.amount
	}

	state = dr.setterByField(state, 'form', fromJS(form))
	state = dr.setterByField(state, 'appInfo', fromJS(initData.app))
	state = dr.setterByField(state, 'currentUser', initData.name)

	return state
}
//个人代账版
export function setInitSpData(state,spData,initData) {
	let form = {
		...spData,
		companyName:spData.orgName,
		orderType: {
			name: '增值税普通发票',
			id: 1
		},
		orderContent: {
			name: '软件服务费',
			id: 1
		},
		isEdit: true,
		isAgree: true,
		id:spData.orgId,
		orderTtValue: 'company',
		taxNum: spData.unifiedSocialCreditCode,
		address: {provinces: "110000", citys: "110100", districts: "110101", text: ""}
	}
	if(form.productId != '3'){//非增购时默认增购套数为0
		form.addPurchaseNum = 0
	}
	// form.promotionPrice = spData.amount
	state = dr.setterByField(state, 'form', fromJS(form))
	state = dr.setterByField(state, 'isSpOrder', true)
	state = dr.setter(state,'order.orderCouponCode.formItems','visible',false)
	if(initData){
		state = dr.setterByField(state, 'appInfo', fromJS(initData.app))
		state = dr.setterByField(state, 'currentUser', initData.name)
	}

	return state
}
export function updateForm(state,form) {
	return dr.setterByField(state,'form',fromJS(form))
}
export function redPackageChange(state,value) {
	let shouldPrice = dr.getterByField(state, 'form.shouldPrice'),
		amount = dr.getterByField(state, 'redPackage.amount')
	if(value){
		shouldPrice -= amount
	}else{
		shouldPrice += amount
	}
	state = dr.setterByField(state, 'form.shouldPrice', shouldPrice)
	state = dr.setterByField(state, 'redPackageChecked', value)
	return state
}

export function appInfo(state, value) {
	state = dr.setterByField(state, 'appInfo', value.app)
	state = dr.setterByField(state, 'currentUser', value.name)
	return state
}
export function remarksChange(state,remarks){
	return dr.setterByField(state, 'form.remarks', remarks)
}
export function removeAllTab(state) {
	state = dr.setter(state, 'portal.tabs', 'value', List([]))
	state = dr.setter(state, "portal.currentTab", 'value', null)
	return state
}
export function setIsEdit(state, value, data) {
	state = dr.setterByField(state, 'form.isEdit', value)
	if (!value) {
		let cityList = data.cityList,
			countyList = data.countyList,
			provinceList = data.provinceList,
			curAddr = dr.getterByField(state, 'form.address') || fromJS({ 'provinces': "110000", 'citys': "110100", 'districts': "110101" }),
			//addressDetail = dr.getterByField(state, 'form.addressDetail'),
			addrStr
		provinceList.map(o => {
			if (curAddr.get('provinces') == o.code) {
				addrStr = o.name + ' '
				state = dr.setterByField(state, 'form.provincesStr', o.name)
			}
		})
		cityList.map(o => {
			if (curAddr.get('citys') == o.code) {
				addrStr = addrStr + o.name + ' '
				state = dr.setterByField(state, 'form.cityStr', o.name)
			}
		})
		countyList.map(o => {
			if (curAddr.get('districts') == o.code) {
				addrStr = addrStr + o.name + ' '
				state = dr.setterByField(state, 'form.districtsStr', o.name)
			}
		})
		addrStr += curAddr.get('text') || ''
		state = dr.setterByField(state, 'form.addrStr', addrStr)
	}
	return state
}

export function WeChatPayment(state, value) {
	let getPayCode = value.split('?text=')[1]
	state = dr.setterByField(state, 'getPayCode', getPayCode)
	return state
}
export function onFieldFocus(state, path) {
	state = dr.clearValidate(state, path)
	return dr.onFieldFocus(state, path)
}

export function setShouldPrice(state, shouldPrice, newValue) {
	let redPackage = dr.getterByField(state, 'redPackage')? dr.getterByField(state, 'redPackage').toJS():null,
		redPackageChecked = dr.getterByField(state, 'redPackageChecked')
	// state = dr.setterByField(state, 'form.preferential', preferential)
	if(shouldPrice===undefined) {

		state = dr.setterByField(state, 'form.amount', undefined)
		let promotionPrice = dr.getterByField(state,'form.promotionPrice')
		if(redPackage && redPackageChecked){
			promotionPrice -= redPackage.amount
		}
		state = dr.setterByField(state, 'form.shouldPrice', promotionPrice)
	} else {
		if(redPackage && redPackageChecked){
			shouldPrice -= redPackage.amount
		}

		state = dr.setterByField(state, 'form.amount', shouldPrice)
		state = dr.setterByField(state, 'form.shouldPrice', shouldPrice)
	}
	state = dr.setterByField(state, 'form.couponCode', newValue)
	return state
}

export function onFieldChange(state, path, oldValue, newValue) {
	state = dr.onFieldChange(state, path, oldValue, newValue)
	if (path.indexOf('order.orderInfoForm.formItems.orderType') != -1) {
		state = dr.setterByField(state, 'form.orderContent', fromJS({
			name: '软件服务费',
			id: 1
		}))
		// if (newValue.get('id') == 0) {
		// 	state = dr.setter(state, 'order.orderInfoForm.formItems.orderContent', 'dataSource', fromJS([{
		// 		name: '软件使用费',
		// 		id: 1
		// 	}]))
		// 	state = dr.setterByField(state, 'form.orderContent', fromJS({
		// 		name: '软件使用费',
		// 		id: 1
		// 	}))
		// } else if (newValue.get('id') == 1) {
		// 	state = dr.setter(state, 'order.orderInfoForm.formItems.orderContent', 'dataSource', fromJS([{
		// 		name: '专业技术服务',
		// 		id: 3
		// 	}]))
		// 	state = dr.setterByField(state, 'form.orderContent', fromJS({
		// 		name: '专业技术服务',
		// 		id: 3
		// 	}))
		// }
	}
	else if (path.indexOf('order.orderCouponCode.formItems.couponCode') != -1) {
		let redPackage = dr.getterByField(state, 'redPackage')? dr.getterByField(state, 'redPackage').toJS():null,
			redPackageChecked = dr.getterByField(state, 'redPackageChecked')
		//state = dr.setterByField(state, 'form.couponCode', newValue)
		if (newValue != undefined && newValue != null && newValue.length != 6) {
			// state = dr.setterByField(state, 'form.preferential', 0)
			let promotionPrice = dr.getterByField(state,'form.promotionPrice')
			if(redPackage && redPackageChecked){
				promotionPrice -= redPackage.amount
			}
			state = dr.setterByField(state, 'form.shouldPrice', promotionPrice)
		}

	}
	return state
}

export function updatePayType(state, value) {
	state = dr.setterByField(state, 'orderPayType', value)
	return state
}

export function updateTt(state, value) {
	let bindValue = value
	if (bindValue) {
		bindValue === 'company' ? 2 : 1
	}
	state = dr.setterByField(state, 'form.orderTtValue', bindValue)
	if (value == 'person') {
		state = dr.setter(state, 'order.orderInfoFormTwo.formItems.taxNum', 'visible', false)
		state = dr.setter(state, 'order.orderInfoFormTwo.formItems.companyName', 'visible', false)
	} else if (value == 'company') {
		state = dr.setter(state, 'order.orderInfoFormTwo.formItems.taxNum', 'visible', true)
		state = dr.setter(state, 'order.orderInfoFormTwo.formItems.companyName', 'visible', true)

	}
	return state
}

export function updateCodeInfo(state, data) {
	state = dr.setterByField(state, 'payUrl', data.payCode)
	state = dr.setterByField(state, 'payOrderCode', data.orderCode)
	state = dr.setterByField(state, 'showQrCodeLayer', false)
	return state
}

export function setShowQrCodeLayer(state, value) {
	state = dr.setterByField(state, 'showQrCodeLayer', value)
	return state
}

export function setStepSecond(state, value, payData) {
	let form = dr.getterByField(state, 'form').toJS()
	form.orderCode = value.code
	form.orderId = value.id
	form.shouldPrice = value.amount.toFixed(2)
	form.productName = value.productName
	form.ts = value.ts
	state = dr.setterByField(state, 'form', fromJS(form))
	state = dr.setterByField(state, 'orderCode', value.code)
	state = dr.setterByField(state, 'orderId', value.id)
	state = dr.setterByField(state, 'orderStep', 2)
	state = dr.setterByField(state, 'payUrl', payData.payCode)
	state = dr.setterByField(state, 'payOrderCode', payData.orderCode)
	state = dr.setterByField(state, 'showQrCodeLayer', false)
	return state

}
export function initStepSecondSp(state, value, initData, qrCodeData) {
	state = dr.setterByField(state, 'form.orderCode', value.code)
	state = dr.setterByField(state, 'form.orderId', value.id)
	state = dr.setterByField(state, 'form.shouldPrice', value.amount.toFixed(2))
	state = dr.setterByField(state, 'form.productName', value.productName)
	state = dr.setterByField(state, 'form.ts', value.ts)
	state = dr.setterByField(state, 'form.orgName', value.orgName)
	state = dr.setterByField(state, 'form.beginDate', value.beginDate)
	state = dr.setterByField(state, 'form.endDate', value.endDate)
	state = dr.setterByField(state, 'form.createTime', value.createTime.split(' ')[0])
	state = dr.setterByField(state, 'orderCode', value.code)
	state = dr.setterByField(state, 'orderId', value.id)
	state = dr.setterByField(state, 'orderStep', 2)
	state = dr.setterByField(state, 'form.addPurchaseNum', value.addPurchaseNum)
	state = dr.setterByField(state, 'form.purchaseNum', value.purchaseNum)
	state = dr.setterByField(state, 'showQrCodeLayer', false)
	if (value.payType !== undefined) {
		if (value.payType == 3) {
			state = dr.setterByField(state, 'orderPayType', 'zfb')
		} else if (value.payType == 2) {
			state = dr.setterByField(state, 'orderPayType', 'wx')
		}
	}
	state = dr.setterByField(state, 'appInfo', fromJS(initData.app))
	state = dr.setterByField(state, 'isSpOrder', true)
	state = dr.setterByField(state, 'currentUser', initData.name)
	state = dr.setterByField(state, 'payUrl', qrCodeData.payCode)
	state = dr.setterByField(state, 'payOrderCode', qrCodeData.orderCode)
	return state
}
export function initStepSecond(state, value, initData, qrCodeData) {
	// let form = {
	// 	orderCode: value.code,
	// 	orderId: value.id,
	// 	shouldPrice: value.amount.toFixed(2),
	// 	productName: value.productName,
	// 	ts: value.ts
	// }
	state = dr.setterByField(state, 'form.orderCode', value.code)
	state = dr.setterByField(state, 'form.orderId', value.id)
	state = dr.setterByField(state, 'form.shouldPrice', value.amount.toFixed(2))
	state = dr.setterByField(state, 'form.productName', value.productName)
	state = dr.setterByField(state, 'form.ts', value.ts)
	state = dr.setterByField(state, 'form.orgName', value.orgName)
	state = dr.setterByField(state, 'form.beginDate', value.beginDate)
	state = dr.setterByField(state, 'form.endDate', value.endDate)
	state = dr.setterByField(state, 'form.createTime', value.createTime.split(' ')[0])
	// state = dr.setterByField(state,'form.orderCode',value.code)
	// state = dr.setterByField(state,'form.companyNameStr',value.orgName)
	// state = dr.setterByField(state,'form.productName',value.productName)
	// state = dr.setterByField(state,'form.orderId',value.id)
	// state = dr.setterByField(state,'form.ts',value.ts)
	// state = dr.setterByField(state,'form.shouldPrice',value.amount.toFixed(2))
	// state = dr.setterByField(state,'form',fromJS(form))
	state = dr.setterByField(state, 'orderCode', value.code)
	state = dr.setterByField(state, 'orderId', value.id)
	state = dr.setterByField(state, 'orderStep', 2)
	state = dr.setterByField(state, 'showQrCodeLayer', false)
	if (value.payType !== undefined) {
		if (value.payType == 3) {
			state = dr.setterByField(state, 'orderPayType', 'zfb')
		} else if (value.payType == 2) {
			state = dr.setterByField(state, 'orderPayType', 'wx')
		}
	}
	state = dr.setterByField(state, 'appInfo', fromJS(initData.app))
	state = dr.setterByField(state, 'currentUser', initData.name)
	state = dr.setterByField(state, 'payUrl', qrCodeData.payCode)
	state = dr.setterByField(state, 'payOrderCode', qrCodeData.orderCode)
	return state
}
export function setOrderStep(state, value) {
	state = dr.setterByField(state, 'orderStep', value)
	return state
}
export function setIsAgree(state, value) {
	state = dr.setterByField(state, 'form.isAgree', value)
	return state
}
export function setTimespan(state,value) {
	return dr.setterByField(state, 'form.timespan', value)
}
export function setAddPurchaseNum(state,value) {
	return dr.setterByField(state, 'form.addPurchaseNum', value)
}
Object.assign(exports, { ...dr, ...exports })
