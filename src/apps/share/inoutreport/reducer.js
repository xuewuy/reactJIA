import * as dr from 'dynamicReducer'
import {fromJS,Map, List} from 'immutable'

export function setQueryParams(state,queryParams){
	return dr.setterByField(state,'queryParams',fromJS(queryParams))
}
export function initQueryDate(state,newDate){
	state = dr.setter(state,'root.reportQuery','defaultDiplayText',newDate)
	return state
}
export function doShare(state,shareData){
	state = dr.setterByField(state,'shareData',fromJS(shareData))
	return state
}

Object.assign(exports, {...dr,...exports})