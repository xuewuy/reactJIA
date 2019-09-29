import * as da from 'dynamicAction'
import Immutable, { Map } from 'immutable'
import * as api from './api'
import md5 from 'md5'
import moment from 'moment'
import iconLogo from './img/iconLogo.png'
import webapi from 'webapi'



/**
 * [初始化视图]
 * @return {[type]} [无返回值]
 */
export function initView(user,auto,cb) {
    return injectFuns => {
        let data = api.data

        if(!localStorage['pwdLength']){
            localStorage['loginPassword'] = ''
        }
        if(localStorage['loginUser']){
            data.user = localStorage['loginUser']
        }
        else{
            data.user = ''
        }
        if(!!sessionStorage['authorization_code']){
              return autoLogin(cb)(injectFuns)
        }
        if(localStorage['loginPassword'] && localStorage['pwdLength']){
            data.localStorageLoginPwd = localStorage['loginPassword']
        }
        else{
            data.password = ''
            data.localStorageLoginPwd = ''
        }

        if(user){
            data.user = user
        }
        data.loginCallback = cb
        data.zhwuji.isShowWxCode = localStorage['loginType'] == 'qrCode' ? true : false
        let domain = da.getDomain()(injectFuns)
        webapi.app.queryByHostname(injectFuns.post,domain).then(ajaxData=>{
            data.appInfo = ajaxData.result ? ajaxData.value : null
            if(ajaxData.result) {
                if(ajaxData.value) {
                    data.appId = ajaxData.value.id
                } else {
                    data.appId = null

                }
            }
            // if(ajaxData.value&&ajaxData.value.appUrl&&window.location.search.indexOf('h=dz')!=-1) {//&&ajaxData.value.appUrl.split('://')[1]!=window.location.host
            if(ajaxData.value&&ajaxData.value.appUrl&&window.location.search.indexOf('h=')!=-1) {//&&ajaxData.value.appUrl.split('://')[1]!=window.location.host
                window.location.href = ajaxData.value.appUrl+window.location.hash
            }
            da.initView({ meta:api.meta, data }, exports)(injectFuns)
        })
        if(auto !== 'false'){
            autoLogin(cb)(injectFuns)
        }
        if(auto && auto == 'false'){
            localStorage["remember"] = false
            localStorage["pwdLength"] = ''
            localStorage["loginPassword"] = ''
            localStorage["autoLogin"] = ''
        }else{
            autoLogin(cb)(injectFuns)
        }
    }
}

export function zhwujiInitView(){
    return injectFuns=>{
        if(localStorage['loginType'] == 'qrCode'){
            webapi.user.getConfirmCode(injectFuns.post).then(data=>{
                if(!da.handleWebApiException(data)(injectFuns)) return
                injectFuns.reduce('updateConfirmCode',data.value)
                console.log(data.value)
            })
        }
    }
}

export function setContinueBrowsing(){
    return injectFuns=>{
        injectFuns.reduce('setContinueBrowsing')
    }
}

export function autoLogin(cb){
    return injectFuns=>{
        if(localStorage['remember'] === 'true' && localStorage['autoLogin']
          &&moment().isBetween(moment(localStorage['autoLogin']).subtract(5,'days'), moment(localStorage['autoLogin']), null, '[)')
          ||!!sessionStorage['authorization_code']
          ){
            let user = localStorage["loginUser"],
                pwd = localStorage['loginPassword'],
                code = sessionStorage['authorization_code']
            if(!user && !pwd && !code) return
            if(!!code)sessionStorage['authorization_code'] = ''


            // let url = window.location.host
            // if(url.indexOf('dz')!=-1) {
            //     //代账端
            // } else {
            //     //企业端
            // }
            // url = url.split(':')[0]
            let domain
            domain = da.getDomain()(injectFuns)
            //ajax调用登录
            api.login(injectFuns.post,user,pwd,code,domain).then(data =>{

                if(!da.handleWebApiException(data)(injectFuns)) return

                if(!data.value) return

                //设置token

                injectFuns.setAccessToken(data.token)
                let entrance = data.value.sysUser.entrance,
                    currentOrg = data.value.sysUser.sysOrg,
                    currentUser = data.value.sysUser,
                    version = data.value.version,
                    appId = da.getterByField('appId')(injectFuns)
                localStorage["currentUserName"] = currentUser.name
                injectFuns.setContext({currentUser, currentOrg, version,appId})
                sessionStorage.setItem('token',data.token)
                //版本号
                window.localStorage["version"] = version
                window.sessionStorage["appId"] = appId
                window.rrUser && window.rrUser.setToken(data.token)
                //api接口地址的前缀，后台多业务库场景使用
                if(currentOrg && currentOrg.apiDomain) injectFuns.setApiRootPath(currentOrg.apiDomain);
                //回调
                cb({result:true, entrance, currentOrg, currentUser})
            }).catch( err => {
                debugger
            })
        }else{
            localStorage['remember'] = false
            localStorage['autoLogin'] = ''
        }
    }
}

/**
 * [switchLoginType 切换登录方式]
 * @return {[type]} [description]
 */
export function switchLoginType(){
    return injectFuns=>{
        localStorage['loginType'] = ''
        let isShowWxCode = da.getterByField('zhwuji.isShowWxCode')(injectFuns)
        if(isShowWxCode){
            clearInterval(window.queryQRCodeTimer)
        }
        webapi.user.getConfirmCode(injectFuns.post).then(data=>{
            if(!da.handleWebApiException(data)(injectFuns)) return
            injectFuns.reduce('switchLoginType',data.value)
            console.log(data.value)
        })
    }
}

/**
 * [reSetWxCode 重新获取二维码]
 * @return {[type]} [description]
 */
export function reSetWxCode(){
    return injectFuns=>{
        webapi.user.getConfirmCode(injectFuns.post).then(data=>{
            if(!da.handleWebApiException(data)(injectFuns)) return
            injectFuns.reduce('reSetWxCode',data.value)
            console.log(data.value)
        })
    }
}

export function sendQRCode(){
    return injectFuns=>{
        injectFuns.reduce('setStartQuery',true)
        let random = ''
        webapi.user.getConfirmCode(injectFuns.post).then(data=>{
            if(!da.handleWebApiException(data)(injectFuns)){
                return injectFuns.reduce('setStartQuery',false)
            }
            random = data.value.confirmCode
            return webapi.user.sendQRCode(injectFuns.post,{mobile:localStorage['loginUser'],confirmCode:data.value.confirmCode})
        }).then(data=>{
            if(!da.handleWebApiException(data)(injectFuns)){
                return injectFuns.reduce('setStartQuery',false)
            }
            injectFuns.reduce('setConfirmCode',random)
        })
    }
}

/**
 * [zhwujiNext 模拟扫描成功]
 * @return {[type]} [description]
 */
export function zhwujiNext(){
    return injectFuns=>{
        injectFuns.reduce('zhwujiNext')
    }
}

export function getQueryQRCode(){
    return injectFuns=>{
        window.queryQRCodeTimer = ''
        let callback = da.getterByField('loginCallback')(injectFuns)
        clearInterval(window.queryQRCodeTimer)
        if(!da.getterByField('zhwuji.random')(injectFuns)) return
        queryQRCodeTimer = setInterval(()=>{
            let random = da.getterByField('zhwuji.random')(injectFuns)
            webapi.user.queryQRCode(injectFuns.post,{confirmCode:random}).then(data=>{
                if(data.result && data.value == 0){//已经扫描成功
                    injectFuns.reduce('zhwujiNext')
                }else if(data.result && data.value == -1){//二维码失效
                    clearInterval(window.queryQRCodeTimer)
                    if(localStorage['loginType'] == 'qrCode'){
                        injectFuns.reduce('setDisabledFalse')
                    }else{
                        injectFuns.reduce('ExpiredClick')
                    }
                }else if(data.result && data.value == 2){//取消
                    clearInterval(window.queryQRCodeTimer)
                    if(localStorage['loginType'] == 'qrCode'){
                        injectFuns.reduce('setDisabledFalse')
                        zhwujiInitView()(injectFuns)
                    }else{
                        zhwujiPrev()(injectFuns)
                    }
                }else if(data.result && data.value ==1  && data.token){//确认登录
                    clearInterval(window.queryQRCodeTimer)
                    return zhwujiLogin(data.token)(injectFuns)
                }
            })
        },2000)
    }
}


export function zhwujiLogin(token){
    return injectFuns=>{
        let callback = da.getterByField('loginCallback')(injectFuns),
            random = da.getterByField('zhwuji.random')(injectFuns)
        webapi.user.zhwujiLogin(injectFuns.post,token).then(data=>{
            if(!da.handleWebApiException(data)(injectFuns)) return
            if(!data.value) return
            //设置token
            injectFuns.setAccessToken(data.token)
            let entrance = data.value.sysUser.entrance,
                currentOrg = data.value.sysUser.sysOrg,
                currentUser = data.value.sysUser,
                version = data.value.version
            localStorage["currentUserName"] = currentUser.name
            localStorage["loginUser"] = currentUser.mobile
            localStorage["loginType"] = 'qrCode'
            injectFuns.setContext({currentUser, currentOrg, version})
            //版本号
            window.localStorage["version"] = version
            //api接口地址的前缀，后台多业务库场景使用
            if(currentOrg && currentOrg.apiDomain) injectFuns.setApiRootPath(currentOrg.apiDomain);
            //回调
            callback({result:true, entrance, currentOrg, currentUser})
        })
    }
}

/**
 * [zhwujiPrev 返回二维码登录会刷新二维码]
 * @return {[type]} [description]
 */
export function zhwujiPrev(){
    return injectFuns=>{
        webapi.user.getConfirmCode(injectFuns.post).then(data=>{
            if(!da.handleWebApiException(data)(injectFuns)) return
            injectFuns.reduce('zhwujiPrev',data.value)
            console.log(data.value)
        })
    }
}

/**
 * [ExpiredClick 模拟二维码过期]
 */
export function ExpiredClick(){
    return injectFuns=>{
        injectFuns.reduce('ExpiredClick')
    }
}

/**
 * [登录处理函数]
 * @param  {Function} callback [成功回掉函数]
 * @return {[type]}            [description]
 */
export function login(callback) {
    return injectFuns => {
        let { validate, getter, getterByField, setMessage, clearMessage, handleWebApiException } = da,
            { post, reduce, setAccessToken,setContext } = injectFuns

        let user = getter('login.formItems.user', 'value')(injectFuns), //获取用户
            password = getter('login.formItems.password', 'value')(injectFuns), //获取密码
            remember = getterByField('remember')(injectFuns),
            localStorageLoginPwd = getterByField('localStorageLoginPwd')(injectFuns),
            pwdLength = password.length,
            appId = da.getterByField('appId')(injectFuns)

        sessionStorage['isTipsIgnore']='';//fsk 2018.2.28 新增凭证提示信息，重新登录要显示
        //清空焦点
        reduce('onFieldFocus', '')

        //校验输入项
        if (!validate('login')(injectFuns)) return

        if(user.indexOf('@') != -1){
            if(user.split('@')[1] != 'rrtimes.com'){
                return da.setValidate('login.formItems.user','请输入正确格式的手机号')(injectFuns)
            }
        }
        //'yiJia9*'加密字符串
        let plength = parseInt(localStorage['pwdLength'])

        if(localStorageLoginPwd){
            //有登录记录
            if(password.length == plength && password == localStorageLoginPwd.slice(0,plength)){//如果密码没有更改过
                password = localStorageLoginPwd
            }else{
                password = md5(password+'yiJia9*')
            }
        }else{
            //没有登录记录
            password = md5(password+'yiJia9*')
        }
        let domain
        domain = da.getDomain()(injectFuns)
        // let url = window.location.host
        // url = url.split(':')[0]
        //ajax调用登录
        api.login(post, user, password,undefined,domain).then(data =>{
            if(!handleWebApiException(data)(injectFuns)) return

            if(!data.value) return

            console.log(data);

            //设置token
            if (data.token) {  //写进localstorage
                injectFuns.setAccessToken(data.token);
                localStorage.setItem('token', data.token)
            }

            localStorage['loginUser'] = data.value.sysUser.mobile || data.value.sysUser.email
            if(remember){
                localStorage['loginPassword'] = password
                localStorage['pwdLength'] = pwdLength
                localStorage['remember'] = true
                localStorage['autoLogin'] = moment().add(5,"days")
            }
            else{
                localStorage['loginPassword'] = ''
                localStorage['pwdLength'] = ''
                localStorage['remember'] = ''
                localStorage['autoLogin'] = ''
            }
            localStorage["loginType"] = ''

            let entrance = data.value.sysUser.entrance,
                currentOrg = data.value.sysUser.sysOrg,
                currentUser = data.value.sysUser,
                version = data.value.version
            sessionStorage.setItem('token',data.token)
            setContext({currentUser, currentOrg, version, appId})
            //版本号
            window.localStorage["version"] = version
            window.sessionStorage["appId"] = da.getterByField('appId')(injectFuns)
            //api接口地址的前缀，后台多业务库场景使用
            if(currentOrg && currentOrg.apiDomain) injectFuns.setApiRootPath(currentOrg.apiDomain);
             //添加用户导操作日志
             let obj={
                operateType:1,
                source:1,
                module:'登录',
                logExplain:'登录默认页面'
            }
            webapi.operateLog.createLogger(injectFuns.post,obj)
            if (window.location.href.indexOf('?h=its') != -1 && currentOrg && entrance === 2){
                webapi.web.itsSync(post).then(data=>{
                    // if(!data.value.url || data.value.url == 'https://devits.rrtimes.com'){
                    //     data.value.url = 'http://devits.rrtimes.com:8084'
                    // }
                    window.location.href = `${data.value.url}/v1/authorize#authorization_code=${data.value.token}&from_url=${window.location.origin}`
                })
            }else{
                //回调
                callback({ result: true, entrance, currentOrg, currentUser })
            }
        }).catch( err => {
            debugger
        })
    }
}

/**
 * [重写getter]
 * @param  {[type]} path     [description]
 * @param  {[type]} property [description]
 * @return {[type]}          [description]
 */
export function getter(path, property) {
    return (injectFuns) => {
        return da.getter(path, property)(injectFuns)
    }
}

/**
 * [重写字段变化事件]
 * @param  {[type]} path     [路径]
 * @param  {[type]} oldValue [旧值]
 * @param  {[type]} newValue [新值]
 * @return {[type]}          [description]
 */
export function onFieldChange(path, oldValue, newValue) {
    return injectFuns => {

        if(path === 'login.formItems.user'){
            da.onFieldChange(path, oldValue, newValue.replace(/(^\s+)|(\s+$)/g,""))(injectFuns)
            if(da.validate(path)(injectFuns)){
                if(newValue.indexOf('@') != -1){
                    if(newValue.split('@')[1] != 'rrtimes.com'){
                        da.setValidate(path,'请输入正确格式的手机号')(injectFuns)
                    }
                }
            }
        }else{
            da.onFieldChange(path, oldValue, newValue)(injectFuns)
        }

    }
}

Object.assign(exports, {...da, ...exports })
