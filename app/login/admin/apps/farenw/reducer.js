import * as dr from 'dynamicReducer'
import {fromJS} from 'immutable'


export function setData(state,value){
	state = dr.setterByField(state,'form.counselCount',value.counselCount?value.counselCount:0)
	state = dr.setterByField(state,'form.id',value.id)
	state = dr.setterByField(state,'form.code',value.code)
	state = dr.setterByField(state,'form.mobile',value.mobile)
	return state
}

Object.assign(exports, {...dr,...exports})
