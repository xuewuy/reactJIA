import * as dr from 'dynamicReducer'

export function onEvent(state, eventName){
	state = dr.validate(state, 'register')
	return dr.onEvent(state, eventName)
}

export function onFieldChange(state, path, oldValue, newValue){
	return dr.onFieldChange(state, path, oldValue, newValue)
}

export function onFieldFocus(state, path){
	state = dr.clearValidate(state, path)
	return dr.onFieldFocus(state, path)
}

export function disabledClickFasle(state){
	return dr.setterByField(state,'disabledClick',false)
}

export function disabledClickTrue(state){
	return dr.setterByField(state,'disabledClick',true)
}


export function next(state){
	let currentStep = dr.getterByField(state, 'currentStep')
	currentStep += 1
	// return dr.setterByField(state,'currentStep',currentStep%3)
	return dr.setterByField(state,'currentStep',currentStep%4)
}

export function prev(state){
	let currentStep = dr.getterByField(state, 'currentStep')
	currentStep -= 1
	// return dr.setterByField(state,'currentStep',currentStep%3)
	return dr.setterByField(state,'currentStep',currentStep%4)
}

export function agree(state){
	let agree = dr.getterByField(state, 'agree')
	agree = true
	return dr.setterByField(state,'agree',agree)
}

export function getImage(state){
	let imgSrc = dr.getterByField(state, 'imgSrc'),
		random = Math.random()
	imgSrc = '/v1/web/pub/captcha?r=' + random
	return dr.setterByField(state,'imgSrc',imgSrc)
}


export function confirmCodeTS(state,ts){
	return dr.setterByField(state,'confirmCodeTS',ts)
}

export function confirmCodeMd5Code(state,md5Code){
	return dr.setterByField(state,'confirmCodeMd5Code',md5Code)
}

Object.assign(exports, {...dr,...exports})
