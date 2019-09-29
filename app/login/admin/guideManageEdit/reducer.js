import * as dr from 'dynamicReducer'
import Immutable, {List,Map,fromJS} from 'immutable'

export function changeValue(state, e) {
	state = dr.setterByField(state, 'form.keyWords', e.target.value)
	return state
}
export function setCheckBoxValue(state,values){
	return dr.setterByField(state,'form.CheckBoxValue',fromJS(values))
}

export function clearExtValue(state) {
	state = dr.setterByField(state, 'form.editExtValue', '')
	state = dr.setterByField(state, 'form.editExtValue1', true)
	return state
}

Object.assign(exports,{...dr, ...exports})
