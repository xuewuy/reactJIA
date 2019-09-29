import * as dr from 'dynamicReducer'
import Immutable, {List,Map,fromJS} from 'immutable'
import moment from 'moment'

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
	if(path.indexOf('orderManageForm.offlineOrder.isPay')!=-1) {
		if(newValue.get('id')==2) {
			state = dr.setter(state,'orderManageForm.offlineOrder.payAmount','disabled',true)
			state = dr.setter(state,'orderManageForm.offlineOrder.payType','disabled',true)
			state = dr.setter(state,'orderManageForm.offlineOrder.invoiceStatus','disabled',true)
			state = dr.setterByField(state,'form.payAmount',undefined)
			state = dr.setterByField(state,'form.payType',undefined)
			state = dr.setterByField(state,'form.invoiceStatus',undefined)
			state = dr.setterByField(state,'form.isPay',newValue)
		} else {
			state = dr.setter(state,'orderManageForm.offlineOrder.payAmount','disabled',false)
			state = dr.setter(state,'orderManageForm.offlineOrder.payType','disabled',false)
			state = dr.setter(state,'orderManageForm.offlineOrder.invoiceStatus','disabled',false)
			state = dr.setterByField(state,'form.isPay',newValue)
			state = dr.setterByField(state,'form.payType',fromJS({
	            id: 1, name: '线下支付'
	        }))
	        state =dr.setterByField(state,'form.invoiceStatus',fromJS({
	            id: 2, name: '未开具'
	        }))
		}
	}else if(path.indexOf('orderManageForm.offlineOrder.beginDate')!=-1) {
		state = dr.setterByField(state,'form.beginDate',newValue)
		state = dr.setter(state,'orderManageForm.offlineOrder.endDate','disabledDate',fromJS({minDisabledDate:newValue}))
	}else if(path.indexOf('orderManageForm.offlineOrder.endDate')!=-1) {
		state = dr.setterByField(state,'form.endDate',newValue)
		state = dr.setter(state,'orderManageForm.offlineOrder.beginDate','disabledDate',fromJS({maxDisabledDate:newValue}))
	}else if(path.indexOf('orderManageForm.invoice.orderInfoForm.formItems.orderType') != -1){
		state = dr.setterByField(state,'form.invoice.invoiceType',newValue)
	}else if(path.indexOf('orderManageForm.invoice.orderInfoForm.formItems.orderContent') != -1){
		state = dr.setterByField(state,'form.invoice.contentType',newValue)
	}else if(path.indexOf('orderManageForm.invoice.orderInfoFormTwo.formItems.taxNum') != -1){
		state = dr.setterByField(state,'form.invoice.titleOrgCode',newValue)
	}else if(path.indexOf('orderManageForm.invoice.orderInfoFormTwo.formItems.companyName') != -1){
		state = dr.setterByField(state,'form.invoice.titleOrgName',newValue)
	}else if(path.indexOf('orderManageForm.invoice.orderInfoFormTwo.formItems.address') != -1){
		state = dr.setterByField(state,'form.invoice.addressProvincial',newValue.get('provinces')||'110000')
		state = dr.setterByField(state,'form.invoice.addressCity',newValue.get('citys')||'110100')
		state = dr.setterByField(state,'form.invoice.addressCounty',newValue.get('districts')||'110101')
		state = dr.setterByField(state,'form.invoice.address',newValue)

	}else if(path.indexOf('orderManageForm.invoice.orderInfoFormTwo.formItems.curstomer') != -1){
		state = dr.setterByField(state,'form.invoice.contact',newValue)
	}else if(path.indexOf('orderManageForm.invoice.orderInfoFormTwo.formItems.phone') != -1){
		state = dr.setterByField(state,'form.invoice.mobile',newValue)
	}else if(path.indexOf('orderManageForm.invoice.orderInfoFormTwo.formItems.addrDetail') != -1){
		state = dr.setterByField(state,'form.invoice.addressDetail',newValue)
	}

	else {
		state = dr.onFieldChange(state,path,oldValue,newValue)
	}
	return state
}

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

//2017.7.13新创建线下订单
export function setMobile(state, mobile, data) {//修改手机号，改变企业名称下拉项
	if(data==null&&mobile=='') {
		state = dr.setterByField(state,'form.mobile',mobile)
		state = dr.setter(state,'orderManageForm.offlineOrder.org','dataSource',fromJS([]))
		state = dr.setterByField(state,'form.org',undefined)//清空原来企业名称
		state = dr.setterByField(state,'form.app',undefined)
	} else {

		state = dr.setterByField(state,'form.mobile',mobile)
		state = dr.setter(state,'orderManageForm.offlineOrder.org','dataSource',fromJS(data))
		state = dr.setterByField(state,'form.org',undefined)//清空原来企业名称
		state = dr.setterByField(state,'form.app',undefined)
	}
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
			form.contractNo = orderInfo.contractNo
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
			if(orderInfo.invoice){
				form.invoice = parseInvoiceData(orderInfo.invoice)
				state = dr.setter(state,'orderManageForm.invoice.orderInfoFormTwo.formItems.taxNum','visible',orderInfo.invoice.titleType=='2')
				state = dr.setter(state,'orderManageForm.invoice.orderInfoFormTwo.formItems.companyName','visible',orderInfo.invoice.titleType == '2')
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
function parseInvoiceData(invoiceData){
	invoiceData.contentType={
		id:invoiceData.contentType,
		name:invoiceData.contentType==1? '软件服务费':'软件服务费'
	}
	invoiceData.invoiceType = {
		id:invoiceData.invoiceType,
		name:invoiceData.invoiceType==1?'增值税普通发票':'增值税专用发票'
	}
	invoiceData.addressTxt = invoiceData.addres
	invoiceData.address ={
			provinces:invoiceData.addressProvincial,
			citys:invoiceData.addressCity,
			districts:invoiceData.addressCounty
	}
	return invoiceData
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

export function setInitOnLineData(state, lists, orderInfo,serviceProviderList,mobileInfo) {
	let orderSource = lists.orderSource,
		appList = lists.appList,
		productList = lists.productList,
		defaultProduct = lists.defaultProduct,
		isOperators = dr.getterByField(state,'isOperators'),
        appInfo = dr.getterByField(state,'appInfo')

	state = dr.setter(state,'orderManageForm.onlineOrder.app','dataSource',fromJS(appList))
	state = dr.setter(state,'orderManageForm.onlineOrder.serviceProvider','dataSource',fromJS([]))
	state = dr.setter(state,'orderManageForm.onlineOrder.product','dataSource',fromJS(productList))
	state = dr.setter(state,'orderManageForm.onlineOrder.org','dataSource',fromJS([]))
	state = dr.setterByField(state,'form.product',fromJS(productList[0]))
	state = dr.setterByField(state,'form.payAmount',defaultProduct.price)
	if(orderInfo) {
		let form = {},
			isPayList = dr.getter(state,'orderManageForm.onlineOrder.isPay','dataSource')?dr.getter(state,'orderManageForm.onlineOrder.isPay','dataSource').toJS():[],curIsPay,
			payTypeList = dr.getter(state,'orderManageForm.onlineOrder.payType','dataSource')?dr.getter(state,'orderManageForm.onlineOrder.payType','dataSource').toJS():[],curPayType,
			invoiceStatusList = dr.getter(state,'orderManageForm.onlineOrder.invoiceStatus','dataSource')?dr.getter(state,'orderManageForm.onlineOrder.invoiceStatus','dataSource').toJS():[],curInvoiceStatus,
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
		form.contractNo = orderInfo.contractNo
		form.org = curOrg
		form.product = curProduct
		form.payAmount = orderInfo.amount
		form.mobile = orderInfo.mobile
		form.invoice = orderInfo.invoice

		if(!isSee&&!isCreate&&orderInfo.orderStatus==3) {
			// state = dr.setter(state,'orderManageForm.onlineOrder.orderStatus','visible',true)
			form.orderStatus = {id:3,name:'处理失败'}
		} else {
			// state = dr.setter(state,'orderManageForm.onlineOrder.orderStatus','visible',false)
			form.orderStatus = undefined
		}
		// if(isCreate) {
		// 	if(curIsPay.id==2) {
		// 		state = dr.setter(state,'orderManageForm.onlineOrder.payAmount','disabled',true)
		// 		state = dr.setter(state,'orderManageForm.onlineOrder.payType','disabled',true)
		// 		state = dr.setter(state,'orderManageForm.onlineOrder.invoiceStatus','disabled',true)
		// 	} else {
		// 		state = dr.setter(state,'orderManageForm.onlineOrder.payAmount','disabled',false)
		// 		state = dr.setter(state,'orderManageForm.onlineOrder.payType','disabled',false)
		// 		state = dr.setter(state,'orderManageForm.onlineOrder.invoiceStatus','disabled',false)
		// 	}
		// } else if(!isSee) {
		// 	if(curIsPay.id==2) {
		// 		state = dr.setter(state,'orderManageForm.onlineOrder.payAmount','disabled',true)
		// 		state = dr.setter(state,'orderManageForm.onlineOrder.invoiceStatus','disabled',true)
		// 	} else {
		// 		state = dr.setter(state,'orderManageForm.onlineOrder.payAmount','disabled',false)
		// 		state = dr.setter(state,'orderManageForm.onlineOrder.invoiceStatus','disabled',false)
		// 	}
		// }
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
	return state
}
export function setInvoiceChecked(state,checked){
	let invoice = dr.getterByField(state,'form.invoice')

	if(checked && !invoice){//初始化invoice
		invoice = {
			invoiceType:{
              	name: '增值税普通发票',
              	id: 1
		  	},
			contentType:{
              	name: '软件服务费',
              	id: 1
            },
			address:{
				provinces:"110000",
				citys:"110100",
				districts:"110101"
			},
			titleType:"2"
		}
		state = dr.setterByField(state,'form.invoice',fromJS(invoice))
	}

	state = dr.setterByField(state,'invoiceChecked',checked)
	return state
}

export function setTitleType(state,titleType) {
	state = dr.setterByField(state,'form.invoice.titleType',titleType)
	state = dr.setter(state,'orderManageForm.invoice.orderInfoFormTwo.formItems.taxNum','visible',titleType=='2')
	state = dr.setter(state,'orderManageForm.invoice.orderInfoFormTwo.formItems.companyName','visible',titleType == '2')
	return state
}
Object.assign(exports,{...dr, ...exports})
