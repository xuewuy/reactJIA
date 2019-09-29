import {Map , List} from 'immutable'
import * as util from './util'

export function validate(state, path){
	let meta = util.getter(state, path),
		value = util.getter(state, path, 'value')
	state =  validateByMeta(state, path, meta, value)
	return state
}

export function setValidate(state, path, message){
	let result = util.getter(state, path, 'validate.result')
	if(!result)
		return util.setter(state, path, 'validate.result', List([message]))

	if(result.findIndex(x=>x === message) !== -1){
		return state
	}

	return util.setter(state, path, 'validate.result', List([message]).concat(result))
}

export function clearValidate(state, path){
	if(!path)
		return state
	let meta = util.getter(state, path),
		value = util.getter(state, path, 'value')
	
	return  clearValidateByMeta(state, path, meta, value)
}

function validateByMeta(state, path, meta, value){
	//不显示不参与校验
	if(meta.get('visible') !== undefined && meta.get('visible') === false)
		return state

	//获取校验规则元数据
	let rules = meta.getIn(['validate','rules'])

	//校验当前路径
	state = validateByRules(state, path, rules, value)

	//校验当前路径下childrens
	let childrens = meta.get('childrens')
	if(childrens){
		childrens.forEach((children, index) =>{

			if( value instanceof List ){
				value.forEach((v,i)=>{
					let currentPath = path + '.' + children.get('name') + ',' + i,
						currentValue = util.getter(state, currentPath, 'value')
					if(v.get('_status') && v.get('_status') != -1){
						 state = validateByMeta(state, currentPath, children, currentValue)
					}
				})
			}
			else{
				let currentPath = path + '.' + children.get('name'),
					currentValue = util.getter(state, currentPath,'value')

				state = validateByMeta(state, currentPath, children, currentValue)
			}
		})
	}
	return state
}


function validateByRules(state, path, rules, value){
    if(!rules || rules.size === 0) 
    	return state

    rules.forEach(rule=>{
    	state = validateByRule(state, path, rule, value)
    })
	return state
}

function validateByRule(state, path, rule, value){
    let required = rule.get('required'),
    	email = rule.get('email'),
    	mobile = rule.get('mobile'),
    	message = rule.get('message'),
    	emailOrMobile = rule.get('emailOrMobile'),
    	regex = rule.get('regex'),
    	fixPhoneOrMobile = rule.get('fixPhoneOrMobile')

	if (required || value) {
		if (required)
			state = validateRequied(state, path, value, message)

		if (email)
			state = validateEmail(state, path, value, message)

		if (mobile)
			state = validateMobile(state, path, value, message)

		if (emailOrMobile)
			state = validateEmailOrMobile(state, path, value, message)

		if (regex)
			state = validateRegex(state, path, value, message, regex)

		if(fixPhoneOrMobile){
			state = validateFixPhoneOrMobile(state, path, value, message)
		}
	}
    return state

}

function validateFixPhoneOrMobile(state, path, value, message){
	if(!value){
		return setValidate(state, path, message)
	}
	let b = false
 	if ( /^[1][0-9][0-9]{9}$/.test(value) ){
 		b = true
 	}

 	if ( /^0\d{2,3}-\d{7,8}(-\d{1,6})?$/.test(value) ){
		b = true
 	} 
	if(!b){
		return setValidate(state, path, message)
	}
	return state
}

function validateRequied(state, path, value, message){
	if(!value || /^[ ]+$/.test(value))
		return setValidate(state, path, message)
	return state
}

function validateEmail(state, path, value, message){
	if(!value) 
		return setValidate(state, path, message)

 	if ( !/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(value) ) 
		return setValidate(state, path, message)

	return state
}


function validateMobile(state, path, value, message){
	if(!value) 
		return setValidate(state, path, message)
 	if ( !/^[1][0-9][0-9]{9}$/.test(value) ) 
		return setValidate(state, path, message)

	return state
}

function validateEmailOrMobile(state, path, value, message){
	if(!value) 
		return setValidate(state, path, message)

	let b = false
 	if ( /^[1][0-9][0-9]{9}$/.test(value) ) 
 		b = true

 	if ( /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(value) ) 
		b = true
	if(!b)
		return setValidate(state, path, message)

	return state
}

function validateRegex(state, path, value, message, regexText){
	if( !(new RegExp(regexText).test(value)))
		return setValidate(state, path, message)

	return state
}



function clearValidateByMeta(state, path, meta, value){
	let rules = meta.getIn(['validate','rules'])

	state = clearValidateByRules(state, path, rules, value)

	let childrens = meta.get('childrens')
	if(childrens){
		childrens.forEach((children, index) =>{
			if( value instanceof List ){
				value.forEach((v,i)=>{
					let currentPath = path + '.' + children.get('name') + ',' + i,
						currentValue = util.getter(state, currentPath, 'value')
					state = clearValidateByMeta(state, currentPath, children, currentValue)
				})
			}
			else{
				let currentPath = path + '.' + children.get('name'),
					currentValue = util.getter(state, currentPath,'value')

				state = clearValidateByMeta(state, currentPath, children, currentValue)
			}
		})
	}

	return state
}

function clearValidateByRules(state, path, rules, value){
    if(!rules || rules.size === 0) 
    	return state
     return util.setter(state, path, 'validate.result', undefined)
}

