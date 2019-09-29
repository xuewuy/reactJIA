import * as dr from 'dynamicReducer'

export function onEvent(state, eventName){
	state = dr.validate(state, 'forgetPassword')
	return dr.onEvent(state, eventName)
}

export function onFieldChange(state, path, oldValue, newValue){
	return dr.onFieldChange(state, path, oldValue, newValue)
}

export function onFieldFocus(state, path){
	state = dr.clearValidate(state, path)
	return dr.onFieldFocus(state, path)
}

export function next(state,mobile){
	let steps = dr.getterByField(state, 'steps'),
		currentStep = dr.getterByField(state, 'currentStep')
	if(mobile){
		state = dr.setterByField(state,'form.mobile', mobile)
	}
	if(currentStep == 0 && dr.getterByField(state, 'enterErrorCodeCount') == 5){
			state = dr.setterByField(state,'enterErrorCodeCount', 0)
			state = dr.setter(state, 'forgetPassword.formItems0.captcha','disabled', false)
	}

	if(steps.size -1 > currentStep){
		state = dr.setterByField(state, 'currentStep', currentStep + 1)
	}
	return state
}

export function prev(state){
	let steps = dr.getterByField(state, 'steps'),
		currentStep = dr.getterByField(state, 'currentStep')
	if(currentStep > 0){
		state = dr.setterByField(state, 'currentStep', currentStep - 1)
	}
	return state
}

export function confirmCodeTS(state,ts){
	return dr.setterByField(state,'confirmCodeTS',ts)
}

export function confirmCodeMd5Code(state,md5Code){
	return dr.setterByField(state,'confirmCodeMd5Code',md5Code)
}

export function recordErrorCodeCount(state, count){
		let enterErrorCodeCount = dr.getterByField(state, 'enterErrorCodeCount')

		if(count == 0){
				enterErrorCodeCount = count
		}else{
			  enterErrorCodeCount = parseInt(enterErrorCodeCount) + 1
		}

		return dr.setterByField(state,'enterErrorCodeCount', enterErrorCodeCount)
}

//验证码输入框置灰不可操作
export function disableConfirmCodeCtrl(state){
		state = dr.setterByField(state,'enterErrorCodeCount', 5)
		return dr.setter(state, 'forgetPassword.formItems0.captcha','disabled', true)
}

//验证码输入框置为可用
export function enableConfirmCodeCtrl(state){
		state = dr.setterByField(state,'enterErrorCodeCount', 0)
		state = dr.setterByField(state,'form.captcha', '')
		return dr.setter(state, 'forgetPassword.formItems0.captcha','disabled', false)
}

Object.assign(exports, {...dr,...exports})
