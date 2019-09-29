import * as da from 'dynamicAction'
import Immutable, { Map } from 'immutable'
import md5 from 'md5'
import webapi from 'webapi'

/**
 * [初始化视图]
 * @return {[type]} [无返回值]
 */
export function initView() {
    return injectFuns => {
        let meta = {
            name: 'register',
            component: 'Form',
            childrens: [{
                name: 'registerOne',
                component: 'FormItems',
                childrens: [{
                    name: 'user',
                    title: '姓名',
                    type: 'string',
                    showLabel: false,
                    placeholder: '请输入邮箱或手机号，用于发送激活码',
                    bindField: 'registerOneUser',
                    validate: {
                        rules: [{
                            required: true,
                            message: '邮箱或手机号不能为空'
                        },{
                          emailOrMobile:true,
                          message:'请输入正确格式的邮箱或者手机'
                        }]

                    },
                    height: 45
                }, {
                    name: 'email',
                    title: '邮箱',
                    type: 'string',
                    showLabel: false,
                    placeholder: '请输入识别码，点击图像可修改',
                    bindField: 'registerOneVerify',
                    validate: {
                        rules: [{
                            required: true,
                            message: '识别码不能为空'
                        }]
                    },
                    height: 45,
                    after:'countDownButton'
                }, {
                    name: 'agree',
                    title: '认真阅读并同意',
                    type: 'bool',
                    showLabel: false,
                    bindField: 'agree',
                    visible: false
                }]
            },{
                name:'registerTwo',
                component:'FormItems',
                childrens:[{
                    name:'registerTwoVerify',
                    title:'请输入验证码',
                    placeholder: '请输入验证码',
                    type:'string',
                    showLabel: false,
                    bindField: 'registerTwoVerify',
                    maxlength:6,
                    validate: {
                        rules: [{
                            required: true,
                            message: '验证码不能为空'
                        }]
                    },
                    height: 45,
                    after:'countDownButton'
                }]
            },{
                name:'registerThree',
                component:'FormItems',
                childrens:[{
                    name:'registerThreeTissue',
                    title:'请输入企业名称',
                    placeholder: '请输入企业名称',
                    type:'string',
                    showLabel: false,
                    bindField: 'registerThreeTissue',
                    validate: {
                        rules: [{
                            required: true,
                            message: '企业名称不能为空'
                        }]
                    },
                    height: 45,
                },{
                    name:'registerThreeName',
                    title:'请输入真实姓名',
                    placeholder: '请输入真实姓名',
                    type:'string',
                    showLabel: false,
                    bindField: 'registerThreeName',
                    validate: {
                        rules: [{
                            required: true,
                            message: '姓名不能为空'
                        }]
                    },
                    height: 45,
                },{
                    name:'registerThreePwd',
                    title:'请输入密码',
                    placeholder: '请输入密码（6—20位，至少包含一个字母和一个数字）',
                    type:'string',
                    component: 'Password',
                    showLabel: false,
                    bindField: 'registerThreePwd',
                    validate: {
                        rules: [{
                            regex: '(?=^.{6,20}$)((?=.*[a-zA-Z]){1})((?=.*[0-9]){1})',
                            message: '请输入密码（6—20位，至少包含一个字母和一个数字）'
                        },{
                            required: true,
                            message: '请输入密码'
                        }]
                    },
                    height: 45,
                },{
                    name:'registerThreePwdReconfirm',
                    title:'请再次确认密码',
                    placeholder: '请再次确认密码',
                    type:'string',
                    component: 'Password',
                    showLabel: false,
                    bindField: 'registerThreePwdReconfirm',
                    validate: {
                        rules: [{
                            required: true,
                            message: '请再次确认密码'
                        }]
                    },
                    height: 45,
                }]
            }]

        }

        let data = {
            form: {
                registerOneUser: '',//用户注册的手机或者邮箱，后续需要判断
                registerOneVerify: '',//图片识别码
                registerTwoVerify:'',//手机或者邮箱接收的验证码
                registerThreeTissue:'',//企业名称
                registerThreeName:'',//真实姓名
                registerThreePwd:'',//密码
                registerThreePwdReconfirm:'',//确认密码
                checkCaptchaCode:''
            },
            currentStep: 0,
            agree: true,
            imgSrc:'/v1/web/pub/captcha?r=' + Math.random(),
            disabledClick:false

        }
        da.initView({ meta, data }, exports)(injectFuns)
    }
}

/**
 * [注册处理函数]
 * @param  {Function} callback [成功回掉函数]
 * @return {[type]}            [description]
 */
export function register(callback,currentStep) {
    return injectFuns => {
        let { validate, getter, getterByField, setMessage, clearMessage, setValidate } = da,
            { post, reduce,setContext,setAccessToken} = injectFuns
        reduce('onFieldFocus', '') //清空焦点
        if(getterByField('currentStep')(injectFuns) == 0){
            //第一步校验
            let actions = [userIsNotExist,checkCaptchaCode]
            actions.shift(0)(actions)(injectFuns)
        }else if(getterByField('currentStep')(injectFuns) == 1){
            // 第二步校验
            isRightConfirmCode(()=>{
                injectFuns.reduce('next')
            })(injectFuns)
        }else{
            // 第三步创建成功
            if (!validate('register.registerThree')(injectFuns)) return
            // 首先把button的点击事件干掉
            reduce('disabledClickTrue')
            let actions = [isPwdMatch,createUser]
            actions.shift(0)(actions,callback)(injectFuns)
        }
    }
}


export function onLogoClick(onRedirect){
    return injectFuns =>{
        //onRedirect('apps/root')
        location = "/"
    }
}


/**
 * 检测账户是否存在
 * @param  {[type]} nextActons [description]
 * @return {[type]}            [description]
 */
export function userIsNotExist(nextActons){
    return injectFuns => {
        let { validate, getterByField, setValidate } = da,
            { post } = injectFuns
        if (!validate('register.registerOne.user')(injectFuns)) return
        webapi.user.isExist(post,getterByField('registerOneUser')(injectFuns)).then(data => {
            if(data.result && data.value){
                return setValidate('register.registerOne.user', '该用户已经存在请重新输入')(injectFuns)
            }else{
                if(!nextActons) return
                nextActons.shift(0)(data,nextActons.length <= 0 ? 0 : nextActons)(injectFuns)
            }
        }).catch( err => {
            debugger
        })
    }
}

/**
 * 检测企业是否存在
 * @param  {[type]}   post     [description]
 * @param  {[type]}   orgName  [description]
 * @param  {[type]}   orgPath  [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
export function orgIsNotExist(nextActons,callback){
    return injectFuns =>{
        let { validate, getterByField, setValidate } = da,
            { post,reduce } = injectFuns
        if (!validate('register.registerThree.registerThreeTissue')(injectFuns)) return
        webapi.org.isNotExist(post,getterByField('registerThreeTissue')(injectFuns)).then(data => {
            if(data.result && !data.value){
                return setValidate('register.registerThree.registerThreeTissue','该企业已经存在请重新输入')(injectFuns)
            }else{
                //让点击按钮变成可点击的状态
                reduce('disabledClickFasle')//更改状态
                if(!nextActons) return
                nextActons.shift(0)(data,nextActons.length <= 0 ? 0 : nextActons,callback)(injectFuns)
            }
        }).catch( err => {
            debugger
        })
    }
}

/**
 * 检测图片验证码是否正确
 * @param  {[type]} data       [description]
 * @param  {[type]} nextActons [description]
 * @return {[type]}            [description]
 */
export function checkCaptchaCode(data,nextActons){
    return injectFuns =>{
        let { validate, getterByField, setValidate } = da,
            { post, reduce} = injectFuns
        if(!data.result ) return
        if (!validate('register.registerOne.email')(injectFuns)) return
        let verifyCode = getterByField('registerOneVerify')(injectFuns)
        let randomCode = getterByField('imgSrc')(injectFuns)
        randomCode = randomCode.substr(randomCode.indexOf("=") + 1);
        webapi.web.checkCaptchaCode(post,verifyCode,randomCode).then(data => {
             if(!data.result){
                 return setValidate('register.registerOne.email', data.error.message)(injectFuns)
             }else{
                  injectFuns.reduce('next')
                  if(!nextActons) return
                  nextActons.shift(0)(data,nextActons.length <= 0 ? 0 : nextActons)(injectFuns)
             }
        }).catch( err => {
            debugger
        })
    }
}

/**
 * 判断短信验证码是否正确
 * @param  {Function} callback [description]
 * @return {Boolean}           [description]
 */
export function isRightConfirmCode(callback){
    return injectFuns =>{
        let { validate, getterByField, setValidate } = da,
            { post, reduce} = injectFuns
        if (!validate('register.registerTwo')(injectFuns)) return

        let ts = getterByField('confirmCodeTS')(injectFuns)
        let md5Code = getterByField('confirmCodeMd5Code')(injectFuns)
        let account = getterByField('registerOneUser')(injectFuns)
        let code = getterByField('registerTwoVerify')(injectFuns)
        return webapi.web.isRightConfirmCode(post,code,ts,account,md5Code).then(data => {
            if(!data.result){
                return setValidate('register.registerTwo.registerTwoVerify', data.error.message)(injectFuns)
            }else{
                return callback && callback()
            }
        }).catch( err => {
            debugger
        })
    }
}

/**
 * 检测两次密码是否一致
 * @param  {[type]}  data       [description]
 * @param  {[type]}  nextActons [description]
 * @return {Boolean}            [description]
 */
export function isPwdMatch(nextActons,callback){
    return injectFuns =>{
        let { validate, getterByField, setValidate } = da,
            { post, reduce} = injectFuns
        // if(!data.result) return
        if(getterByField('registerThreePwd')(injectFuns) !== getterByField('registerThreePwdReconfirm')(injectFuns)){
            //如果两次密码不一致给出提示
            setValidate('register.registerThree.registerThreePwdReconfirm', '两次密码输入不正确请重新输入')(injectFuns)
            //让点击按钮变成可点击的状态
            reduce('disabledClickFasle')//更改状态
            return
        }
        if(!nextActons) return
        nextActons.shift(0)(nextActons.length <= 0 ? 0 : nextActons,callback)(injectFuns)
    }
}

/**
 * 新建账户
 * @param  {[type]}   data       [description]
 * @param  {[type]}   nextActons [description]
 * @param  {Function} callback   [description]
 * @return {[type]}              [description]
 */
export function createUser(nextActons,callback){
    return injectFuns =>{
        let { validate, getterByField, setValidate,setMessage,clearMessage} = da,
            { post, reduce} = injectFuns
        // if(!data.result) return
        let datas = {
            'account':getterByField('registerOneUser')(injectFuns),
            'email':'',//用户邮箱
            'mobile':'',//用户手机号码
            'name':getterByField('registerThreeName')(injectFuns),//姓名
            'orgName':getterByField('registerThreeTissue')(injectFuns),//企业名称
            'password':md5(getterByField('registerThreePwd')(injectFuns)+"yiJia9*"),//用户密码
            'registeredWay':'',//注册类型手机AND邮箱
            'authenticateEmail':'',//认证邮箱
            'authenticateMobile':'',//认证手机
            'confirmCode':getterByField('registerTwoVerify')(injectFuns)+','+getterByField('confirmCodeTS')(injectFuns)+','+getterByField('confirmCodeMd5Code')(injectFuns),
            'passwordStrength':'',
            'orgType':1,
            'isServiceProvider':true
        }
        if(getterByField('registerOneUser')(injectFuns).indexOf('@') >= 0){
            // 如果是邮箱
            datas.email = getterByField('registerOneUser')(injectFuns)
            datas.registeredWay = 0
            datas.authenticateEmail = getterByField('registerOneUser')(injectFuns)
        }else{
            // 如果是手机
            datas.mobile = getterByField('registerOneUser')(injectFuns)
            datas.registeredWay = 1
            datas.authenticateMobile = getterByField('registerOneUser')(injectFuns)
        }
        // 密码强度 密码强度(0:弱1：中2：强)
        if(getterByField('registerThreePwd')(injectFuns).length<6||/^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+)$/.test(getterByField('registerThreePwd')(injectFuns))){
            datas.passwordStrength = 0
        }else if(getterByField('registerThreePwd')(injectFuns).length<12||/^((?![a-zA-Z]+$)(?![@#$%^&]+$)[a-zA-Z@#$%^&]+)$|((?!\d+$)(?![a-zA-Z]+$)[a-zA-Z\d]+)$/.test(getterByField('registerThreePwd')(injectFuns))){
            datas.passwordStrength = 1
        }else if(getterByField('registerThreePwd')(injectFuns).length>=12||/^(?!\d+$)(?![a-zA-Z]+$)(?![@#$%^&]+$)[\da-zA-Z@#$%^&]+$/.test(getterByField('registerThreePwd')(injectFuns))){
            datas.passwordStrength = 2
        }
        webapi.user.create(post,datas).then((data)=>{
            if(!data.result && !data.value){
                //创建失败给出提示并改变按钮的状态为可点击
                reduce('disabledClickFasle')
                return setMessage({
                    type:'error',
                    title:'创建失败',
                    content:data.error.message,
                    onOk:() => { clearMessage()(injectFuns)}
                })(injectFuns)
            }else{
                injectFuns.reduce('next')
            }
        })
    }
}


/**
 * 用新建的账户登录
 * @param  {[type]}   data       [description]
 * @param  {[type]}   nextActons [description]
 * @param  {Function} callback   [description]
 * @return {[type]}              [description]
 */
// export function login(data,nextActons,callback){
//     debugger
//     return injectFuns =>{
//         let { validate, getterByField, setValidate,setMessage,clearMessage} = da,
//             { post, reduce,setContext,setAccessToken} = injectFuns
//         if(!data.result) return
//         webapi.user.login(post,getterByField('registerOneUser')(injectFuns),md5(getterByField('registerThreePwd')(injectFuns)+"yiJia9*")).then(data => {
//             if(!data.result){
//                 return setMessage({
//                     type:'error',
//                     title:'登录失败',
//                     content:data.error.message,
//                     onOk:() => { clearMessage()(injectFuns)}
//                 })(injectFuns)
//             }
//             let entrance = data.value.sysUser.entrance,
//                 currentOrg = data.value.sysUser.sysOrg,
//                 currentUser = data.value.sysUser
//             setAccessToken(data.token)
//             //设置登录之后的上下文
//             setContext({currentUser, currentOrg})
//             // 清空localStorage中保存的账号密码
//             localStorage['loginUser'] = ''
//             localStorage['loginPassword'] = ''
//             //更改点击按钮的状态为可点击状态
//             reduce('disabledClickFasle')
//             //回调函数跳转至
//             callback({result:true, entrance:entrance, currentOrg, currentUser})
//         })
//     }
// }

export function login2(callback){
    return injectFuns =>{
        let { validate, getterByField, setValidate,setMessage,clearMessage} = da,
            { post, reduce,setContext,setAccessToken} = injectFuns
        webapi.user.login(post,getterByField('registerOneUser')(injectFuns),md5(getterByField('registerThreePwd')(injectFuns)+"yiJia9*")).then(data => {
            if(!data.result){
                return setMessage({
                    type:'error',
                    title:'登录失败',
                    content:data.error.message,
                    onOk:() => { clearMessage()(injectFuns)}
                })(injectFuns)
            }
            let entrance = data.value.sysUser.entrance,
                currentOrg = data.value.sysUser.sysOrg,
                currentUser = data.value.sysUser
            setAccessToken(data.token)
            //设置登录之后的上下文
            setContext({currentUser, currentOrg})
            // 清空localStorage中保存的账号密码
            localStorage['loginUser'] = ''
            localStorage['loginPassword'] = ''
            //更改点击按钮的状态为可点击状态
            reduce('disabledClickFasle')
            //回调函数跳转至
            callback({result:true, entrance:entrance, currentOrg, currentUser})
        })
    }
}



export function onFieldChange(path, oldValue, newValue) {
    return injectFuns => {
        da.onFieldChange(path, oldValue, newValue)(injectFuns)
        if (path === 'register.registerOne.user') {
            userIsNotExist(false)(injectFuns)
        }else if(path === 'register.registerThree.registerThreeTissue'){
            //需求变更：允许企业重名
            //orgIsNotExist(0)(injectFuns)
        }
    }
}


export function showAgreement() {
    return injectFuns => {
        let { setMessage, clearMessage } = da
        setMessage({
            type: 'app',
            title: '用户协议',
            content: 'app:apps/login/agreement',
            width:800,
            bodyStyle:{height:300, overflowY:'scroll'},
            closable:false,
            onOk: function() {
                clearMessage()(injectFuns)
                injectFuns.reduce('agree')
            }
        })(injectFuns)
    }
}
export function showHelp(){
    return injectFuns =>{
        let { setMessage, clearMessage } = da
        setMessage({
            type: 'app',
            title: '帮助',
            content: 'app:apps/login/help',
            width:800,
            bodyStyle:{height:300},
            closable:false,
            onOk: function() {
                clearMessage()(injectFuns)
            }
        })(injectFuns)
    }
}

export function prev() {
    return injectFuns => {
        let { validate, getter, getterByField, setMessage, clearMessage, setValidate } = da,
            { post, reduce } = injectFuns
        injectFuns.reduce('prev')//更改状态
    }
}

/**
 * 获取图片验证
 * @return {[type]} [description]
 */
export function getImage(){
    return injectFuns => {
        injectFuns.reduce('getImage')
    }
}

/**
 * 发送短信验证码
 * @param  {Function} cb [description]
 * @return {[type]}      [description]
 */
export function getVerify(cb){
    return injectFuns => {
        let { validate, getter, getterByField, setMessage, clearMessage, setValidate } = da,
            { post, reduce } = injectFuns
            // 发送验证码
        webapi.web.sendConfirmCode(post,getterByField('registerOneUser')(injectFuns),1).then(data => {
            reduce('confirmCodeTS',data.value.ts)
            reduce('confirmCodeMd5Code',data.value.md5Code)
            if(!data.result){
                setValidate('register.registerTwo.registerTwoVerify', data.error.message)(injectFuns)
                cb()
                return
            }
        })
    }
}


Object.assign(exports, {...da, ...exports })
