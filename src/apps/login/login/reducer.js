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

/**
 * [switchLoginType 切换登录方式]
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
export function switchLoginType(state,ajaxDataCode){
    let isShowWxCode = dr.getterByField(state,'zhwuji.isShowWxCode')
    state = dr.setterByField(state,'zhwuji.isShowWxCode',!isShowWxCode)
    state = dr.setterByField(state,'zhwuji.random',ajaxDataCode.confirmCode)
    state = dr.setterByField(state,'zhwuji.url',ajaxDataCode.url)
    return state
}

export function setConfirmCode(state,code){
    return dr.setterByField(state,'zhwuji.random',code)
}

/**
 * [updateConfirmCode 更新扫码登录的code]
 * @param  {[type]} state    [description]
 * @param  {[type]} ajaxData [description]
 * @return {[type]}          [description]
 */
export function updateConfirmCode(state,ajaxData){
    state = dr.setterByField(state,'zhwuji.random',ajaxData.confirmCode)
    state = dr.setterByField(state,'zhwuji.url',ajaxData.url)
    return state
}

/**
 * [reSetWxCode 刷新二维码]
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
export function reSetWxCode(state,ajaxDataCode){
    state = dr.setterByField(state,'zhwuji.currentStep',0)
    state = dr.setterByField(state,'zhwuji.random',ajaxDataCode.confirmCode)
    state = dr.setterByField(state,'zhwuji.url',ajaxDataCode.url)
    return state
}

/**
 * [zhwujiNext 模拟扫描成功]
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
export function zhwujiNext(state){
    let currentStep = dr.getterByField(state,'zhwuji.currentStep')
    state = dr.setterByField(state,'zhwuji.currentStep',2)
    return state
}
/**
 * [zhwujiPrev 返回二维码登录（会刷新二维码）]
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
export function zhwujiPrev(state,ajaxDataCode){
    let currentStep = dr.getterByField(state,'zhwuji.currentStep')
    state = dr.setterByField(state,'zhwuji.random',ajaxDataCode.confirmCode)
    state = dr.setterByField(state,'zhwuji.url',ajaxDataCode.url)
    state = dr.setterByField(state,'zhwuji.currentStep',0)
    return state
}

export function setStartQuery(state,isDisabled){
    state = dr.setterByField(state,'zhwuji.isBtndisabled',isDisabled)
    return state
}

export function setDisabledFalse(state){
    state = dr.setterByField(state,'zhwuji.isBtndisabled',false)
    return state
}

/**
 * [ExpiredClick 模拟过期]
 * @param {[type]} state [description]
 */
export function ExpiredClick(state){
    state = dr.setterByField(state,'zhwuji.currentStep',1)
    return state
}

Object.assign(exports, {...dr,...exports})
