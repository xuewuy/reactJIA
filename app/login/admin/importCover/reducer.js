import * as dr from 'dynamicReducer'
import Immutable, {List,Map,fromJS} from 'immutable'
import moment from 'moment'



export function setInitData(state, data) {
	let businessUser = data.user
	businessUser = businessUser.map(o => {
		let showStr,
			obj = o
		if(o.mobile) {
			obj.showStr = o.mobile+'('+o.name+')'
		} else {
			obj.showStr = o.email+'('+o.name+')'
			
		}
		return obj
	})
	state = dr.setter(state,'importCover.fromItems.businessUser','dataSource',fromJS(businessUser))
	return state
}

export function setBookList(state,data,newValue,path) {

	state = dr.setterByField(state,'businessUser',newValue)
	state = dr.setterByField(state,'businessItem',null)
    state = dr.setter(state,'importCover.fromItems.businessItem','dataSource',fromJS(data))
    
    return state
}

export function emptyData(state) {
	state = dr.setterByField(state,'businessItem',null)
	return state
}

Object.assign(exports,{...dr, ...exports})