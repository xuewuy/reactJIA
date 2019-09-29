import * as dr from 'dynamicReducer'
import * as api from './api'
import { List, fromJS } from 'immutable'


export function initView(state, ajaxData, utils, taxUrlOne, taxUrlTwo, initData,auth,menuIds,industry){
	let meta = api.getMeta(),
		data = api.getData()
	data.person = ajaxData.value.person
	data.customer = ajaxData.value.customer
	data.vendor = ajaxData.value.vendor
	data.bank = ajaxData.value.bank
	data.account = ajaxData.value.account
	data.appId = ajaxData.appId
	data.industry = industry
	state = dr.initView(state, {meta, data}, utils)
	state = dr.setterByField(state,'taxUrlOne',taxUrlOne)
	state = dr.setterByField(state,'taxUrlTwo',taxUrlTwo)
	state = dr.setterByField(state,'initData',initData)
	state = dr.setterByField(state,'auth',auth)
	state = dr.setterByField(state,'menuIds',menuIds)
	return state
}

Object.assign(exports, {...dr,...exports})