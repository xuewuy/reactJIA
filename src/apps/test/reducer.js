import * as dr from 'dynamicReducer'
import {fromJS} from 'immutable'
import * as api from './api'

export function initView(state, payload, utils){
	state = dr.initView(state, {meta:api.getMeta(), data:{}}, utils)
	return state
}


Object.assign(exports, {...dr, ...exports })