import * as dr from 'dynamicReducer'
import Immutable, {List,Map,fromJS} from 'immutable'

export function changeValue(state, e) {
	let newValue = []
	newValue.push(e.target.value)
	state = dr.setterByField(state, 'form.editValue', fromJS(newValue))
	return state
}

export function clearExtValue(state) {
	state = dr.setterByField(state, 'form.editExtValue', '')
	state = dr.setterByField(state, 'form.editExtValue1', true)
	return state
}

Object.assign(exports,{...dr, ...exports})