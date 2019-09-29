import * as dr from 'dynamicReducer'
import Immutable, {List,Map,fromJS} from 'immutable'
import moment from 'moment'

export function setOrgAboutData(state,newValue,curApp,data) {
	let curProduct = dr.getterByField(state,'form.product'),
		productList = dr.getterByField(state,'productList').toJS()
	state = dr.setterByField(state,'form.app',fromJS(curApp))//设置伙伴
	state = dr.setter(state,'orderManageForm.offlineOrder.serviceProvider','dataSource',fromJS(data))
	state = dr.setterByField(state,'form.serviceProvider',undefined)
	state = dr.setterByField(state,'form.org',newValue)
	//筛选版本名称
	
	// productList = productList.filter(o=> {
	// 	return o.vatTaxpayer==newValue.get('vatTaxpayer')
	// })
	// state = dr.setter(state,'orderManageForm.offlineOrder.product','dataSource',fromJS(productList))
	state = setProductSource(state,productList,newValue.get('vatTaxpayer'))
	state = dr.setterByField(state,'form.product',undefined)
	state = dr.setterByField(state,'form.beginDate',undefined)
	state = dr.setterByField(state,'form.endDate',undefined)
	// if(curProduct) {
	// 	let startDate = moment(newValue.get('expireTime')),
	// 		beginDateObj = startDate.add(1,'days').format('YYYY-MM-DD'),
	// 		endDateObj = startDate.add(curProduct.get('timespan'),'months').subtract(1,'days').format('YYYY-MM-DD')
	// 		state = dr.setter(state,'orderManageForm.offlineOrder.beginDate','disabledDate',fromJS({maxDisabledDate:endDateObj}))
	// 	state = dr.setter(state,'orderManageForm.offlineOrder.endDate','disabledDate',fromJS({minDisabledDate:beginDateObj}))
	// 	state = dr.setterByField(state,'form.beginDate',beginDateObj)
	// 	state = dr.setterByField(state,'form.endDate',endDateObj)
	// }
	return state
}


export function onFieldFocus(state, path){
	state = dr.clearValidate(state, path)
	return dr.onFieldFocus(state, path)
}

export function setInitData(state, lists, orderInfo,serviceProviderList,mobileInfo) {
	let orderSource = lists.orderSource,
		appList = lists.appList,
		productList = lists.productList,
		defaultProduct = lists.defaultProduct,
		vatTaxpayer = lists.vatTaxpayer,
		isOperators = dr.getterByField(state,'isOperators'),
		appInfo = dr.getterByField(state,'appInfo'),
		curProductItem

	if(orderSource==1) {//线上
	} else {//线下
		state = dr.setter(state,'orderManageForm.offlineOrder.app','dataSource',fromJS(appList))
		state = dr.setter(state,'orderManageForm.offlineOrder.serviceProvider','dataSource',fromJS([]))
		state = dr.setter(state,'orderManageForm.offlineOrder.product','dataSource',fromJS(productList))
		state = dr.setter(state,'orderManageForm.offlineOrder.org','dataSource',fromJS([]))
		// state = dr.setterByField(state,'productList',fromJS(productList))
		state = setProductSource(state,productList,vatTaxpayer)
	
		//
		productList = dr.getter(state,'orderManageForm.offlineOrder.product','dataSource').toJS()
		for(let i=0;i<productList.length;i++) {
			if(productList[i].versionType==1) {
				curProductItem = productList[i]
				break;
			}
		}
		if(curProductItem) {
			
			state = dr.setter(state,'orderManageForm.offlineOrder.serviceProvider','visible',false)
			state = dr.setter(state,'orderManageForm.offlineOrder.serviceProvider','required',false)
			state = dr.setter(state,'orderManageForm.offlineOrder.serviceProvider','validate',undefined)
		} else {
			state = dr.setter(state,'orderManageForm.offlineOrder.serviceProvider','visible',true)
			state = dr.setter(state,'orderManageForm.offlineOrder.serviceProvider','required',true)
			state = dr.setter(state,'orderManageForm.offlineOrder.serviceProvider','validate',fromJS({
				showTooltip:false,
				rules: [{
					required: false,
					message: '所属服务商不能为空'
				}]
			}))
			curProductItem = productList[0]
		}
		state = dr.setterByField(state,'form.product',fromJS(curProductItem))
		// state = dr.setterByField(state,'form.product',fromJS(productList[0]))
		state = dr.setterByField(state,'form.payAmount',defaultProduct.price)
		if(orderInfo) {
			let form = {},
				isPayList = dr.getter(state,'orderManageForm.offlineOrder.isPay','dataSource')?dr.getter(state,'orderManageForm.offlineOrder.isPay','dataSource').toJS():[],curIsPay,
				payTypeList = dr.getter(state,'orderManageForm.offlineOrder.payType','dataSource')?dr.getter(state,'orderManageForm.offlineOrder.payType','dataSource').toJS():[],curPayType,
				invoiceStatusList = dr.getter(state,'orderManageForm.offlineOrder.invoiceStatus','dataSource')?dr.getter(state,'orderManageForm.offlineOrder.invoiceStatus','dataSource').toJS():[],curInvoiceStatus,
				isSee = dr.getterByField(state,'isSee'),
				isCreate = dr.getterByField(state,'isCreate'),
				curOrg,curProduct
			
			if(orderInfo.isPay) {
				isPayList.map(o=> {
					if(orderInfo.isPay == o.id) {
						curIsPay = o
					}
				})
			}
			if(orderInfo.payType) {
				payTypeList.map(o=> {
					if(orderInfo.payType == o.id) {
						curPayType = o
					}
				})
			}
			if(orderInfo.invoiceStatus) {
				invoiceStatusList.map(o=> {
					if(orderInfo.invoiceStatus == o.id) {
						curInvoiceStatus = o
					}
				})
			}
			if(orderInfo.orgId) {
				curOrg = {
					id: orderInfo.orgId,
					name: orderInfo.orgName
				}
			}
			if(orderInfo.productId) {
				productList.map(o => {
					if(orderInfo.productId == o.id) {
						curProduct = o
						if(o.versionType==2) {
							state = dr.setter(state,'orderManageForm.offlineOrder.serviceProvider','visible',true)
							state = dr.setter(state,'orderManageForm.offlineOrder.serviceProvider','required',true)
							state = dr.setter(state,'orderManageForm.offlineOrder.serviceProvider','validate',fromJS({
					            showTooltip:false,
					            rules: [{
					                required: false,
					                message: '所属服务商不能为空'
					            }]
					        }))
					        form.serviceProvider= {
					        	id: orderInfo.serviceProviderId,
					        	name: orderInfo.serviceProviderName
					        }
						} else {
							state = dr.setter(state,'orderManageForm.offlineOrder.serviceProvider','visible',false)
							state = dr.setter(state,'orderManageForm.offlineOrder.serviceProvider','required',false)
							state = dr.setter(state,'orderManageForm.offlineOrder.serviceProvider','validate',undefined)
						}
					}
				})
			}
			let curApp
			if(orderInfo.appId===undefined) {
			} else {
		        appList.map(o => {
		        	if(o.id==orderInfo.appId) {
		        		curApp = o
		        	}
		        })
			}
	        form.ts = dr.getterByField(state,'form.ts')
	        form.id = orderInfo.id
	        form.app = curApp
			form.beginDate = orderInfo.beginDate?orderInfo.beginDate.split(' ')[0]:undefined
			form.endDate = orderInfo.endDate?orderInfo.endDate.split(' ')[0]:undefined
			form.payAmount = orderInfo.productPrice
			form.memo = orderInfo.memo
			form.isPay = curIsPay
			form.payType = curPayType
			form.invoiceStatus = curInvoiceStatus
			form.org = curOrg
			form.product = curProduct
			form.payAmount = orderInfo.amount
			form.mobile = orderInfo.mobile
			if(!isSee&&!isCreate&&orderInfo.orderStatus==3) {
				state = dr.setter(state,'orderManageForm.offlineOrder.orderStatus','visible',true)
				form.orderStatus = {id:3,name:'处理失败'}
			} else {
				state = dr.setter(state,'orderManageForm.offlineOrder.orderStatus','visible',false)
				form.orderStatus = undefined
			}
			if(isCreate) {
				if(curIsPay.id==2) {
					state = dr.setter(state,'orderManageForm.offlineOrder.payAmount','disabled',true)
					state = dr.setter(state,'orderManageForm.offlineOrder.payType','disabled',true)
					state = dr.setter(state,'orderManageForm.offlineOrder.invoiceStatus','disabled',true)
				} else {
					state = dr.setter(state,'orderManageForm.offlineOrder.payAmount','disabled',false)
					state = dr.setter(state,'orderManageForm.offlineOrder.payType','disabled',false)
					state = dr.setter(state,'orderManageForm.offlineOrder.invoiceStatus','disabled',false)
				}
			} else if(!isSee) {
				if(curIsPay.id==2) {
					state = dr.setter(state,'orderManageForm.offlineOrder.payAmount','disabled',true)
					state = dr.setter(state,'orderManageForm.offlineOrder.invoiceStatus','disabled',true)
				} else {
					state = dr.setter(state,'orderManageForm.offlineOrder.payAmount','disabled',false)
					state = dr.setter(state,'orderManageForm.offlineOrder.invoiceStatus','disabled',false)
				}
			}
			state = dr.setterByField(state,'form',fromJS(form))
		} else {
			let form = dr.getterByField(state,'form').toJS()
			form.isPay = {
	            id: 1, name: '付费订单'
	        }
	        form.payType = {
	            id: 1, name: '线下支付'
	        }
	        form.invoiceStatus = {
	            id: 2, name: '未开具'
	        }
	        if(mobileInfo&&mobileInfo.length) {
				let orgId = dr.getterByField(state,'form.org.id'),
					curOrg
				mobileInfo.map(o => {
					if(orgId==o.id) {
						curOrg = o
						form.beginDate = moment(o.expireTime).add(1,'days').format('YYYY-MM-DD')
						form.endDate = moment(o.expireTime).add(productList[0].timespan,'months').format('YYYY-MM-DD')
					}
				})
				if(curOrg) {
					appList.map(o => {
						if(o.id==curOrg.appId) {
							form.app = o
						}
					})
				}
				state = dr.setter(state,'orderManageForm.offlineOrder.org','dataSource',fromJS(mobileInfo))
				// state = dr.setter(state,'orderManageForm.offlineOrder.serviceProvider','dataSource',fromJS(serviceProviderList2))
			}
			if(form.org) {
				form.beginDate = moment(form.org.expireTime).add(1,'days').format('YYYY-MM-DD')
				form.endDate = moment(form.org.expireTime).add(productList[0].timespan,'months').format('YYYY-MM-DD')
			}
	        state = dr.setterByField(state,'form',fromJS(form))
		}
		if(serviceProviderList) {
			state = dr.setter(state,'orderManageForm.offlineOrder.serviceProvider','dataSource',fromJS(serviceProviderList))
		}
	}
	return state
}



Object.assign(exports,{...dr, ...exports})