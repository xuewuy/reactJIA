import * as dr from 'dynamicReducer'
import { Map,fromJS,List } from 'immutable'

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

export function setIndustryVersionChange(state,visible){
	let defaultIndustryVersion = visible ? 2 : null,
		vatMode = defaultIndustryVersion == 2 ? 36 : null 
	state = dr.setterByField(state, 'form.industryVersion', defaultIndustryVersion)
	state = dr.setterByField(state, 'industryVersionVisible', visible)
	state = dr.setterByField(state, 'vatModeVisible', defaultIndustryVersion == 2)
	state = dr.setterByField(state, 'vatMode', vatMode)
	return state
}

export function setVatMode(state,value){
	state = dr.setterByField(state,'vatMode',value)
	return state
}

export function setIndustryVersion(state, industryVersion){
	state = dr.setterByField(state, 'form.industryVersion', industryVersion)
	state = dr.setterByField(state, 'vatMode', industryVersion == 2 ? 36 : null)
	state = dr.setterByField(state, 'vatModeVisible', industryVersion == 2)
	return state
}

export function clickFasle(state){
	return dr.setterByField(state,'disabledClick',false)
}

export function clickTrue(state){
	return dr.setterByField(state,'disabledClick',true)
}

export function setIndustry(state,ajaxData){
	let industry = ajaxData.industry || 1
	state = dr.setterByField(state,'form.industry',fromJS({id:industry}))
	state = dr.setterByField(state, 'form.enabledYear', `${ajaxData.enabledYear}-${ajaxData.enabledMonth}`)
    return state
}

export function setBeautyIndustryOption(state,industry){
	const disabled = industry == 1005 ? true : false
	state = dr.setter(state,'register.registerTwo.statusOfTaxpayer','disabled',disabled)
	if(disabled){
		state = dr.setterByField(state,'form.statusOfTaxpayer',fromJS({id:42}))
	}
	return state
}

export function setShowCompoent(state,showCompoent){
	return dr.setterByField(state,showCompoent,true)
}
export function showSuccessInfo(state,path){
	if(path == 'register.registerTwo.enabledYear'){
		state = dr.setterByField(state,'isShowEnabledYearSuccessInfo',true)
	}else{
		state = dr.setterByField(state,'isShowAccountingStandardsSuccessInfo',true)
	}
	return state
}

export function next(state,createOrg,fromBuySwy){
	let currentStep = dr.getterByField(state, 'currentStep')
	if(currentStep == 0){
			state = dr.setterByField(state,'enterErrorCodeCount', 0)
			state = dr.setter(state, 'register.registerOne.verify','disabled', false)
	}
	currentStep += 1
	state = dr.setterByField(state,'currentStep',currentStep%3)
	if(createOrg && createOrg.orgId){
		state = dr.setterByField(state,'createOrgId',createOrg.orgId)
		state = dr.setterByField(state,'fromBuySwy',fromBuySwy)
	}
	return state
}

export function prev(state){
	let currentStep = dr.getterByField(state, 'currentStep')
	currentStep -= 1
	return dr.setterByField(state,'currentStep',currentStep%3)
}

export function agree(state){
	let agree = dr.getterByField(state, 'agree')
	agree = true
	return dr.setterByField(state,'agree',agree)
}

// export function confirmCodeTS(state,ts){
// 	return dr.setterByField(state,'confirmCodeTS',ts)
// }

// export function confirmCodeMd5Code(state,md5Code){
// 	return dr.setterByField(state,'confirmCodeMd5Code',md5Code)
// }

export function setConfirmInfo(state,data){
	state = dr.setterByField(state,'confirmCodeTS',data.ts)
	state = dr.setterByField(state,'confirmCodeMd5Code',data.md5Code)
	return state
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
		return dr.setter(state, 'register.registerOne.verify','disabled', true)
}

//验证码输入框置为可用
export function enableConfirmCodeCtrl(state){
		state = dr.setterByField(state,'enterErrorCodeCount', 0)
		state = dr.setterByField(state,'verify', '')
		return dr.setter(state, 'register.registerOne.verify','disabled', false)
}

Object.assign(exports, {...dr,...exports})
