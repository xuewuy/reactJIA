import * as dr from 'dynamicReducer'

export function onEvent(state, eventName){
	state = dr.validate(state, 'login')
	return dr.onEvent(state, eventName)
}

export function onFieldChange(state, path, oldValue, newValue){
	return dr.onFieldChange(state, path, oldValue, newValue)
}
export function setContinueBrowsing(state){
    return dr.setterByField(state,'isContinueBrowsing',true)
}

export function onFieldFocus(state, path){
	state = dr.clearValidate(state, path)
	return dr.onFieldFocus(state, path)
}


export function setStartQuery(state,isDisabled){
    state = dr.setterByField(state,'zhwuji.isBtndisabled',isDisabled)
    return state
}

export function setDisabledFalse(state){
    state = dr.setterByField(state,'zhwuji.isBtndisabled',false)
    return state
}

Object.assign(exports, {...dr,...exports})
