import * as da from 'dynamicAction'
import Immutable, { Map } from 'immutable'
import * as api from './api'
import webapi from 'webapi'
import md5 from 'md5'
import constant from 'constant'

/**
 * [初始化视图]
 * @return {[type]} [无返回值]
 */
export function initView() {
    return injectFuns => {
        let domain = da.getDomain()(injectFuns)
        // let appDomain = window.location.host
        // appDomain = appDomain.split(':')[0]
        webapi.app.queryByHostname(injectFuns.post,domain).then(ajaxData=>{
            api.data.appInfo = ajaxData.result ? ajaxData.value : null
            if(ajaxData.result) {
                if(ajaxData.value) {
                    api.data.appId = ajaxData.value.id
                } else {
                    api.data.appId = null
                }
            }
            // if(ajaxData.value&&ajaxData.value.appUrl&&window.location.search.indexOf('h=dz')!=-1) {
            if(ajaxData.value&&ajaxData.value.appUrl&&window.location.search.indexOf('h=')!=-1) {
                window.location.href = ajaxData.value.appUrl+window.location.hash
            }
            if(window.location.hash.indexOf("user=")!=-1){
                api.data.form.mobile = window.location.hash.split('user=')[1]
            }else{
                api.data.form.mobile = ''
            }
            da.initView({ meta: api.meta, data:api.data }, exports)(injectFuns)
        })
    }
}

export function showHelp(){
    return injectFuns =>{
        let { setMessage, clearMessage } = da
        setMessage({
            type: 'app',
            title: '帮助',
            content: 'app:apps/login/help',
            initData: da.getterByField('appInfo')(injectFuns),
            width:800,
            bodyStyle:{height:300},
            closable:false,
            onOk: function() {
                clearMessage()(injectFuns)
            }
        })(injectFuns)
    }
}


export function onFieldChange(path, oldValue, newValue) {
    return injectFuns => {
        let { getterByField, setterByField, setValidate, validate,clearValidate } = da, { post, reduce } = injectFuns
        da.onFieldChange(path, oldValue, newValue)(injectFuns)
        if (path === 'forgetPassword.formItems0.mobile') {
            if( !validate(path)(injectFuns) ) return
			let user = {account: newValue, password: 'checklength'}
            webapi.user.isExist(injectFuns.post, user, null, true).then(data => {
                if (data.result && !data.value){
                    clearValidate(path)(injectFuns)
                    setValidate(path, '该用户不存在')(injectFuns)
                }
            })
        }
    }
}


/**
 * [下一步]
 * @param  {Function} cb [description]
 * @return {Function}    [description]
 */
export function handleNext(cb) {
    return (injectFuns) => {
        let { getterByField, validate, setValidate, handleWebApiException } = da, { reduce, post } = injectFuns,
            currentStep = getterByField('currentStep')(injectFuns),
            mobile = getterByField('form.mobile')(injectFuns)
        if (currentStep === 0) {
            if(!validate('forgetPassword.formItems0.mobile')(injectFuns))return

            //当验证码输入错误5次后，验证码输入框置灰不可操作，必须等时间秒数倒计时结束才能恢复操作，重新获取验证码；
            let enterErrorCodeCount = getterByField('enterErrorCodeCount')(injectFuns)
            if(enterErrorCodeCount == 5){
                return
            }

            if(!validate('forgetPassword.formItems0.captcha')(injectFuns))return

            let captcha = getterByField('form.captcha')(injectFuns)
            let mobile = getterByField('form.mobile')(injectFuns)
            //请求服务，判断验证码是否正确
            webapi.user.isExist(post, mobile, null, true).then(data => {
                if (data.result && !data.value){
                    return setValidate('forgetPassword.formItems0.mobile', '该用户不存在')(injectFuns)
                }

                let ts = getterByField('confirmCodeTS')(injectFuns)
                let md5Code = getterByField('confirmCodeMd5Code')(injectFuns)
                return webapi.web.isRightConfirmCode(post,captcha,ts,mobile,md5Code)
            }).then(data => {
                //处理异常，如果存在异常，给状态加入异常消息

                if(!data.result){
                    if(enterErrorCodeCount == 4){
                        //验证码输入框置灰不可操作
                        reduce('disableConfirmCodeCtrl')
                    }else{
                        //记录验证码输入错误次数
                        reduce('recordErrorCodeCount')
                    }
                    return setValidate('forgetPassword.formItems0.captcha', data.error.message)(injectFuns)
                }
                //进入下一步
                reduce('next')
            })
        } else if (currentStep === 1) {
            if (!validate('forgetPassword.formItems1.password')(injectFuns))return
            if (!validate('forgetPassword.formItems1.confirmPassword')(injectFuns))return
            let password = getterByField('form.password')(injectFuns),
                confirmPassword = getterByField('form.confirmPassword')(injectFuns),
                passwordStrength = '',
                appId = da.getterByField('appId')(injectFuns)

            if (password !== confirmPassword) {
                return setValidate('forgetPassword.formItems1.confirmPassword', '两次录入密码必须一致')(injectFuns)
            }

            // 密码强度 密码强度(0:弱1：中2：强)
            if(password.length<6||/^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+)$/.test(password)){
                passwordStrength = 0
            }else if(password.length<12||/^((?![a-zA-Z]+$)(?![@#$%^&]+$)[a-zA-Z@#$%^&]+)$|((?!\d+$)(?![a-zA-Z]+$)[a-zA-Z\d]+)$/.test(password)){
                passwordStrength = 1
            }else if(password.length>=12||/^(?!\d+$)(?![a-zA-Z]+$)(?![@#$%^&]+$)[\da-zA-Z@#$%^&]+$/.test(password)){
                passwordStrength = 2
            }

            let captcha = getterByField('form.captcha')(injectFuns) + ',' + getterByField('confirmCodeTS')(injectFuns) + ',' + getterByField('confirmCodeMd5Code')(injectFuns)
            webapi.user.resetPassword(post,captcha,getterByField('form.mobile')(injectFuns),md5(password+"yiJia9*"),passwordStrength,appId).then(data =>{
                if (!handleWebApiException(data)(injectFuns)) return
                reduce('next',data.value)
            })
        } else {
            cb(mobile)
        }

    }
}

/**
 * [上一步]
 * @return {[type]} [description]
 */
export function prev() {
    return ({ reduce }) => {
        reduce('prev')
    }
}


function findElem(arrayToSearch, attr, val) {
    for (var i = 0; i < arrayToSearch.length; i++) {
        if (arrayToSearch[i][attr] == val) {
            return i;
        }
    }
    return -1;
}
/**
 * 获取验证码按钮点击
 * @param  {Function} cb [description]
 * @return {[type]}      [description]
 */
export function getCaptcha(cb) {
    return injectFuns => {
        let { getterByField, handleWebApiException, validate,setValidate,clearValidate} = da,
        { post, reduce} = injectFuns,
            user = getterByField('form.mobile')(injectFuns),
            enterErrorCodeCount = getterByField('enterErrorCodeCount')(injectFuns),
            url = document.location.hostname,
            company = constant.COMPANY.getCurrent()

        if(enterErrorCodeCount == 5){
            reduce('enableConfirmCodeCtrl')
        }

        //校验手机或者邮箱是否已经输入，
        if (!validate('forgetPassword.formItems0.mobile')(injectFuns)) {
            cb() //如果出错重置倒计时按钮
            return
        }
        // 检测用户是否存在 
        user = {account: user, password: 'checklength'}
        webapi.user.isExist(post, user, null, true).then(data => {
            if (data.result && !data.value){
                clearValidate('forgetPassword.formItems0.mobile')(injectFuns)
                setValidate('forgetPassword.formItems0.mobile', '账户不存在')(injectFuns)
                cb() //如果用户不存在重置倒计时按钮
                return false
            }
            //请求服务，发送验证码
            let appId = company && company.id || null,
                domain = da.getDomain()(injectFuns)
            //     domain = window.location.host
            // domain = domain.split(':')[0]
            return webapi.web.sendConfirmCode(post,user.account,2,domain).then(data=>{
                if (!handleWebApiException(data)(injectFuns)){
                    return cb() //如果出错重置倒计时按钮
                }
                reduce('confirmCodeTS',data.value.ts)
                reduce('confirmCodeMd5Code',data.value.md5Code)
                return data
            });
        }).then(data =>{
            if(!data) return
            if (!handleWebApiException(data)(injectFuns)){
                cb() //如果出错重置倒计时按钮
            }
        })
    }
}

export function login(callback){
    return injectFuns=>{
        let { validate, getter, getterByField, setMessage, clearMessage, handleWebApiException } = da,
            { post, reduce, setAccessToken } = injectFuns,
            user = getterByField('form.mobile')(injectFuns), //获取用户
            password = getterByField('form.password')(injectFuns), //获取密码
            domain = da.getDomain()(injectFuns)
        //     domain = window.location.host
        // domain = domain.split(':')[0]
        webapi.user.login(post,user,md5(password+"yiJia9*"),undefined,domain).then(data =>{
            data = data
            if(!handleWebApiException(data)(injectFuns)) return
            if(!data.value) return
            injectFuns.setAccessToken(data.token)
            let entrance = data.value.sysUser.entrance,
                currentOrg = data.value.sysUser.sysOrg,
                currentUser = data.value.sysUser,
                version = data.value.version,
                appId = da.getterByField('appId')(injectFuns)
            localStorage["currentUserName"] = currentUser.name
            injectFuns.setContext({currentUser, currentOrg, version,appId})
            localStorage['loginUser'] = user
            window.sessionStorage["appId"] = da.getterByField('appId')(injectFuns)
            //回调
            callback({result:true, entrance, currentOrg})
        }).catch( err => {

        })
    }
}
Object.assign(exports, {...da, ...exports })
