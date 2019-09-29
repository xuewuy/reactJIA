import * as da from 'dynamicAction'
import Immutable, { Map } from 'immutable'
import md5 from 'md5'
import webapi from 'webapi'
import constant from 'constant'

/**
 * [初始化视图]
 * @return {[type]} [无返回值]
 */
export function initView(isDevelop,This) {
    let date = new Date(),
        defaultCurrentMonth = date.getFullYear() + '-' + (date.getMonth() + 1),
        location = window.location.search.substr(1),
        mobile = ''
        if(-1 != location.indexOf('mobile')){
            let str = location.split('mobile')[1].substr(1)
            if(str.indexOf('&') != -1){
                mobile = str.split('&')[0]
            }else{
                mobile = str
            }
        }

    return injectFuns => {
        let meta = {
            name: 'register',
            component: 'Form',
            childrens: [{
                name: 'registerOne',//第一步创建账户
                component: 'FormItems',
                childrens: [{
                    name: 'orgName',
                    title: '公司名称',
                    type: 'string',
                    showLabel: false,
                    required: true,
                    placeholder: '请输入公司名称',
                    bindField: 'form.orgName',
                    maxlength: 50,
                    validate: {
                        rules: [{
                            required: true,
                            message: '公司名称不能为空'
                        }]
                    },
                    height: 45,
                },{
                    name: 'name',
                    title: '联系人',
                    type: 'string',
                    showLabel: false,
                    required: true,
                    placeholder: '请输入联系人名称',
                    bindField: 'form.name',
                    maxlength: 10,
                    validate: {
                        rules: [{
                            required: true,
                            message: '联系人不能为空'
                        }]

                    },
                    height: 45
                },{
                    name: 'email',
                    title: '邮箱',
                    type: 'string',
                    showLabel: false,
                    required: true,
                    placeholder: '请输入联系人邮箱',
                    bindField: 'form.email',
                    validate: {
                        rules: [{
                            required: true,
                            message: '联系人邮箱不能为空'
                        },{
                            email:true,
                            message:'请输入正确的电子邮箱地址'
                        }]
                    },
                    height: 45,
                },{
                    name: 'account',
                    title: '手机',
                    type: 'string',
                    showLabel: false,
                    placeholder: '请输入手机号',
                    required: false,
                    bindField: 'form.account',
                    validate: {
                        rules: [{
                            required: true,
                            message: '手机号不能为空'
                        },{
                          mobile:true,
                          message:'请输入正确格式的手机'
                        }]

                    },
                    height: 45
                }, {
                    name: 'verify',
                    title: '验证码',
                    type: 'string',
                    showLabel: false,
                    required: false,
                    placeholder: '请输入验证码',
                    bindField: 'verify',
                    validate: {
                        rules: [{
                            required: true,
                            message: '验证码不能为空'
                        }]
                    },
                    height: 45,
                    after:'countDownButton'
                },{
                    name:'password',
                    title:'请输入密码',
                    placeholder: '请输入密码（6—20位，至少包含一个字母和一个数字）',
                    type:'string',
                    component: 'Password',
                    showLabel: false,
                    required: false,
                    bindField: 'form.password',
                    validate: {
                        rules: [{
                            required: true,
                            message: '密码不能为空'
                        },{
                            regex: '(?=^.{6,20}$)((?=.*[a-zA-Z]){1})((?=.*[0-9]){1})',
                            message: '请输入密码（6—20位，至少包含一个字母和一个数字）'
                        }]
                    },
                    height: 45,
                },{
                    name: 'agree',
                    title: '认真阅读并同意',
                    type: 'bool',
                    showLabel: false,
                    bindField: 'agree',
                    visible: false
                }]
            },{
                name:'registerTwo',//第二步创建企业
                component:'FormItems',
                childrens:[{
                    name:'requiredOrgCount',
                    title:'账套数量',
                    bindField:'form.requiredOrgCount',
                    component:'Select',
                    showLabel: false,
                    required: true,
                    type:'object',
                    placeholder: '请选择账套数量',
                    valueMember:'id',
                    displayMember:'name',
                    dataSource: [{
                        id:-1,
                        name:"0～10账套",
                        code:"0001"
                    },{
                        id:1,
                        name:"0～19账套",
                        code:"0002"
                    },{
                        id:2,
                        name:"0～29账套",
                        code:"0002"
                    },{
                        id:3,
                        name:"0～50账套",
                        code:"0003"
                    }],
                    dataSourceFetchMode: 0,
                    height:45,
                    width:387
                },{
                    name:'industry',
                    title:'所属行业',
                    component:'Select',
                    type:'object',
                    required: false,
                    showLabel: false,
                    bindField: 'form.industry',
                    valueMember:'id',
                    displayMember:'name',
                    placeholder: '请选择行业',
                    dataSource:[
                        {code: "0001", name: "工业", id: 1},
                        {code: "0002", name: "商贸", id: 2},
                        {code: "0003", name: "服务", id: 3},
                        {code: "0004", name: "信息技术", id: 4},
                        {code: "1005", name: "健康美容业", id: 1005},
                        {code: "1006", name: "餐饮业", id: 1006}
                    ],
                    dataSourceFetchMode: 0,
                    validate: {
                        rules: [{
                            required: true,
                            message: '请选择行业'
                        }]
                    }
                },{
                    name:'registeredAddress',
                    title:'请选择所属地区',
                    component:'Select',
                    type:'object',
                    required: false,
                    showLabel: false,
                    placeholder: '请选择所属地区',
                    bindField: 'form.registeredAddress',
                    valueMember:'code',
                    displayMember:'name',
                    dataSource:[],
                    dataSourceFetchMode: 0,
                    width: 388
                },{
                    name:'accountingStandards',
                    title:'企业会计准则',
                    component:'Select',
                    type:'object',
                    required: false,
                    showLabel: false,
                    bindField: 'form.accountingStandards',
                    visible:true,
                    disabled:true,
                    valueMember:'id',
                    displayMember:'name',
                    dataSource: [],
                    dataSourceFetchMode: 0,
                    validate: {
                        rules: [{
                            required: true,
                            message: '请输入企业名称'
                        }]
                    },
                    width: 388
                }]
            }]
        }

        let data = {
            form: {
                account: mobile,//用户注册的手机或者邮箱，后续需要判断
                industry: null,//所属行业
                accountingStandards:{id:19,name:'小企业会计准则2013'},//企业会计准则
                orgName:'',//企业名称
                password:'',//密码
                statusOfTaxpayer:{id:42}, //纳税人身份
                enabledYear:defaultCurrentMonth,//会计启用年
                enabledMonth:'',//会计启用月
                industryVersion:null,//餐饮业启用模块
                registeredAddress:{}//注册地址
            },
            This:This,
            currentStep: 0,
            enterErrorCodeCount: 0,
            isConfirmCodeCtrlDisabled: false,
            agree: true,
            verify:'',//验证码
            imgSrc:'/v1/web/pub/captcha',
            disabledClick:false,
            isShowEnabledYearComponent:false,
            isShowEnabledYearSuccessInfo:false,
            isShowAccountingStandardsComponent:false,
            isShowAccountingStandardsSuccessInfo:false
        }
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
            if(ajaxData.value&&ajaxData.value.appUrl&&window.location.search.indexOf('h=')!=-1) {
                window.location.href = ajaxData.value.appUrl+window.location.hash
            }
            return webapi.customer.getEnumDetail(injectFuns.post,['accountingStandards','vatTaxpayer','industry'])
        }).then(datalist=>{
            if(!datalist){
                return da.initView({ meta, data }, exports)(injectFuns)
            }
            if (!da.handleWebApiInfo(datalist)(injectFuns)) return
            // da.setMetaProperty(meta, 'register.registerTwo.industry.dataSource', datalist.value.industryList)
            da.setMetaProperty(meta, 'register.registerTwo.accountingStandards.dataSource', datalist.value.accountingStandardsList)
            da.setMetaProperty(meta, 'register.registerTwo.statusOfTaxpayer.dataSource', datalist.value.vatTaxpayerList)
            return webapi.org.getCityMap(injectFuns.post, {})
        }).then(mapList=>{
            if (!mapList) {
                return da.initView({ meta, data }, exports)(injectFuns)
            }
            if (!da.handleWebApiInfo(mapList)(injectFuns)) return
            da.setMetaProperty(meta, 'register.registerTwo.registeredAddress.dataSource', mapList.value.provinceList)
            data.form.registeredAddress = mapList.value.provinceList[0]
            da.initView({ meta, data }, exports)(injectFuns)
        })
    }
}

export function setIndustryVersion(industryVersion){
    return injectFuns=>{
        injectFuns.reduce('setIndustryVersion', industryVersion)
    }
}

/**
 * [setShowCompoent 设置创建企业成功之后显示修改启用期间和会计准则的组件]
 * @param {[type]} showCompoent [显示哪个组件]
 */
export function setShowCompoent(showCompoent){
    return injectFuns=>{
        injectFuns.reduce('setShowCompoent',showCompoent)
    }
}

/**
 * [注册处理函数]
 * @param  {Function} callback [成功回掉函数]
 * @return {[type]}            [description]
 */
export function register(callback,currentStep, fromBuySwy) {
    return injectFuns => {
        let { validate, getter, getterByField, setMessage, clearMessage, setValidate } = da, 
            { post, reduce,setContext, setAccessToken} = injectFuns,
            This = getterByField('This')(injectFuns)
        reduce('onFieldFocus', '') //清空焦点
        //校验某个路径数据
        
        if(getterByField('currentStep')(injectFuns) == 0){
            // 第一步校验
            if (!validate('register.registerOne')(injectFuns)) return
            webapi.user.isExist(post,getterByField('form.account')(injectFuns)).then(data => {
                if(!data) return
                if(data.result && data.value){
                    return setValidate('register.registerOne.account', '该手机号已经注册了账号请登录')(injectFuns)
                }
                window._hmt && _hmt.push && _hmt.push(['_trackPageview', '/apps/login/clientRegister/2']) //百度统计单页应用接口。
                let ts = getterByField('confirmCodeTS')(injectFuns)
                let md5Code = getterByField('confirmCodeMd5Code')(injectFuns)
                let account = getterByField('form.account')(injectFuns)
                let code = getterByField('verify')(injectFuns)
                if(!md5Code || !ts){
                    return setValidate('register.registerOne.verify', '请先获取验证码')(injectFuns)
                }else{
                    return webapi.web.isRightConfirmCode(post,code,ts,account,md5Code)
                }
            }).then(data => {
                if(data){
                    if(!data.result){
                        return setValidate('register.registerOne.verify', data.error.message)(injectFuns)
                    }
                    
                    if(fromBuySwy&&fromBuySwy!='tasteBuy') {
                        let datas = registData()(injectFuns)
                        datas.appId = 1004
                        webapi.user.inviteReg(post,datas).then(data => {
                            if(!data) return
                            if(data.result && !data.value){
                                return setMessage({
                                    type:'error',
                                    title:'创建失败',
                                    content:data.error.message,
                                    onOk:() => { clearMessage()(injectFuns)}
                                })(injectFuns)
                            }
                            let url = window.location.protocol + '//' + window.location.host
                            if(fromBuySwy == 'middle') {
                                url += '/#apps/login/orderSwy?middle=true'
                            } else if(fromBuySwy == 'high') {
                                url += '/#apps/login/orderSwy?high=true'
                            } else if(fromBuySwy == 'fxhtop') {
                                url = 'https://www.fxhtop.com/fxh_account/yjr/yjrv'
                            } else {
                                url += '/#apps/portal'
                            }
                            setAccessToken(data.value.access_token)
                            window.location.href = url
                        }).catch( err => {
                            debugger
                        })
                    } 
                    else {
                        injectFuns.reduce('next')//更改状态
                    }
                }
            }).catch( err => {
                debugger
            })
        }else if(getterByField('currentStep')(injectFuns) == 1){
            //先把button的点击事件干掉
            injectFuns.reduce('clickTrue')//更改状态
            // 第二步校验
            if (!validate('register.registerTwo')(injectFuns)) return
            let industryVersion = da.getterByField('form.industryVersion')(injectFuns)
            let datas = {
                'account':getterByField('form.account')(injectFuns),
                'email':getterByField('form.email')(injectFuns),//用户邮箱
                'mobile':'',//用户手机号码
                'name':getterByField('form.name')(injectFuns),//姓名
                'orgName':getterByField('form.orgName')(injectFuns),//企业名称
                'password':md5(getterByField('form.password')(injectFuns)+ "yiJia9*"),//用户密码
                'registeredWay':'',//注册类型手机AND邮箱
                'authenticateEmail':'',//认证邮箱
                'authenticateMobile':'',//认证手机
                'passwordStrength':'',//密码强度
                // 'appId': getterByField('appId')(injectFuns),
                // 'domain': window.location.host.split(':')[0],
                'domain': da.getDomain()(injectFuns),
                'industry':getterByField('form.industry')(injectFuns).get('id'),//行业ID
                'industryVersion': industryVersion ,//启用模块
                'accountingStandards':getterByField('form.accountingStandards')(injectFuns).get('id'),//会计启用准则
                // 'vatTaxpayer':getterByField('form.statusOfTaxpayer')(injectFuns).get('id'),//纳税人身份
                // 'enabledYear':getterByField('form.enabledYear')(injectFuns).split('-')[0],//会计启用年
                // 'enabledMonth':getterByField('form.enabledYear')(injectFuns).split('-')[1],//会计启用月
                'confirmCode':getterByField('verify')(injectFuns)+','+getterByField('confirmCodeTS')(injectFuns)+','+getterByField('confirmCodeMd5Code')(injectFuns),
                'registeredAddress': getterByField('form.registeredAddress')(injectFuns).get('code'),
                'px': window.location.href.indexOf('?px') != -1 || location.host.indexOf("px")==0 ? true : '',
                'requiredOrgCount':getterByField('form.requiredOrgCount')(injectFuns).get('name'),
                'orgType':3/*,2017-10-30根据海涛要求屏蔽邀请码
                'regCode':getterByField('form.invitationCode')(injectFuns)*/
            }
            // 判断用户注册的是邮箱还是手机号码
            if(getterByField('form.account')(injectFuns).indexOf('@') >= 0){
                // 如果是邮箱
                datas.email = getterByField('form.account')(injectFuns)
                datas.registeredWay = 0
                datas.authenticateEmail = getterByField('form.account')(injectFuns)
            }else{
                // 如果是手机
                datas.mobile = getterByField('form.account')(injectFuns)
                datas.registeredWay = 1
                datas.authenticateMobile = getterByField('form.account')(injectFuns)
            }
             // 密码强度 密码强度(0:弱1：中2：强)
            if(getterByField('form.password')(injectFuns).length<6||/^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+)$/.test(getterByField('form.password')(injectFuns))){
                datas.passwordStrength = 0
            }else if(getterByField('form.password')(injectFuns).length<12||/^((?![a-zA-Z]+$)(?![@#$%^&]+$)[a-zA-Z@#$%^&]+)$|((?!\d+$)(?![a-zA-Z]+$)[a-zA-Z\d]+)$/.test(getterByField('form.password')(injectFuns))){
                datas.passwordStrength = 1
            }else if(getterByField('form.password')(injectFuns).length>=12||/^(?!\d+$)(?![a-zA-Z]+$)(?![@#$%^&]+$)[\da-zA-Z@#$%^&]+$/.test(getterByField('form.password')(injectFuns))){
                datas.passwordStrength = 2
            }
            //需求变更：允许企业重名
            // webapi.org.isNotExist(post,datas.orgName).then(data => {
                // if(data.result && !data.value){
                //     //恢复button的点击事件
                //     injectFuns.reduce('clickFasle')//更改状态
                //     return setValidate('register.registerTwo.orgName', '该企业已经存在请重新输入')(injectFuns)
                // }else{
                    // return webapi.user.create(post,datas)
                // }
                // injectFuns.reduce('next')//更改状态
            // })
            webapi.user.create(post,datas).then(data => {
                if(!data) return
                if(data.result && !data.value){
                    return setMessage({
                        type:'error',
                        title:'创建失败',
                        content:data.error.message,
                        onOk:() => { clearMessage()(injectFuns)}
                    })(injectFuns)
                }
                let context = injectFuns.getContext()
                context.createOrgId = data.value.orgId
                injectFuns.setContext(context)
                //恢复button的点击事件
                injectFuns.reduce('clickFasle')//更改状态
                injectFuns.reduce('next',data.value,fromBuySwy)//更改状态
                //账户创建成功之后自动登陆
                This.handleLClick()
                window._hmt && _hmt.push && _hmt.push(['_trackPageview', '/apps/login/clientRegister/3']) //百度统计单页应用接口。
            }).catch( err => {
                debugger
            })

        }
    }

}

export function login(callback){
    return injectFuns => {
       let { validate, getter, getterByField, setMessage, clearMessage, setValidate } = da,
               { post, reduce,setContext,setAccessToken} = injectFuns,
               domain = da.getDomain()(injectFuns)
        //        domain = window.location.host
        // domain = domain.split(':')[0]
       webapi.user.login(post,getterByField('form.account')(injectFuns),md5(getterByField('form.password')(injectFuns) + "yiJia9*"),undefined,domain).then(data => {
           if(!data.result){
               //如果注册用户登录失败弹出的信息
               return setMessage({
                   type:'error',
                   title:'登录失败',
                   content:data.error.message,
                   onOk:() => { clearMessage()(injectFuns)}
               })(injectFuns)
           }
           let context =  injectFuns.getContext()
            context.entrance = data.value.sysUser.entrance,
            context.currentOrg = data.value.sysUser.sysOrg,
            context.currentUser = data.value.sysUser
            setAccessToken(data.token)
           //设置登录之后的上下文
            setContext(context)
           // 清空localStorage中保存的账号密码
           localStorage['loginUser'] = getterByField('form.account')(injectFuns)
           localStorage['loginPassword'] = ''
           //回调函数跳转至
           callback({ result: true, entrance: context.entrance, currentOrg: context.currentOrg, currentUser:context.currentUser})
       })
    }
}


export function onFieldChange(path, oldValue, newValue) {
    return injectFuns => {
        let { getterByField, setterByField, setValidate, validate } = da, { post, reduce } = injectFuns

        da.onFieldChange(path, oldValue, newValue)(injectFuns)

        if (path === 'register.registerOne.account') {
            if (!validate('register.registerOne.account')(injectFuns)) return

            webapi.user.isExist(post,newValue).then(data => {
                if(data.result && data.value){
                    return setValidate('register.registerOne.account', '该手机号已经注册了账号请登录')(injectFuns)
                }
            }).catch( err => {
                debugger
            })
        }else if(path === 'register.registerOne.verify'){
            let enterErrorCodeCount = getterByField('enterErrorCodeCount')(injectFuns)
            if(enterErrorCodeCount == 5){
                return
            }
            if (!validate('register.registerOne.account')(injectFuns)){
                return setValidate('register.registerOne.verify','请输入手机用于获取验证码')(injectFuns)
            }
            if (!validate('register.registerOne.verify')(injectFuns)) return
            let ts = getterByField('confirmCodeTS')(injectFuns)
            let md5Code = getterByField('confirmCodeMd5Code')(injectFuns)
            let account = getterByField('form.account')(injectFuns)
            if(!ts || !md5Code){
                return setValidate('register.registerOne.verify','请先获取验证码')(injectFuns)
            }
            webapi.web.isRightConfirmCode(post,newValue,ts,account,md5Code).then(data => {
                if(!data.result){
                    if(enterErrorCodeCount == 4){
                        //验证码输入框置灰不可操作
                        reduce('disableConfirmCodeCtrl')
                    }else{
                        //记录验证码输入错误次数
                        reduce('recordErrorCodeCount')
                    }
                    setValidate('register.registerOne.verify', data.error.message)(injectFuns)
                    return
                }
            }).catch( err => {
                debugger
            })
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
            initData: da.getterByField('appInfo')(injectFuns),
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
            initData:da.getterByField('appInfo')(injectFuns),
            width:800,
            bodyStyle:{height:300,overflowY:'auto'},
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

export function getVerify(cb){
    return injectFuns => {
        let { validate, getter, getterByField, setMessage, clearMessage, setValidate, clearValidate} = da,
            { post, reduce } = injectFuns,
            enterErrorCodeCount = getterByField('enterErrorCodeCount')(injectFuns),
            company = constant.COMPANY.getCurrent()

        if(enterErrorCodeCount == 5){
            reduce('enableConfirmCodeCtrl')
        }

        if (!validate('register.registerOne.account')(injectFuns)){
            cb()
            return
        }


        // 判断用户名是否存在
        webapi.user.isExist(post,getterByField('form.account')(injectFuns)).then(data => {
            if(data.result && data.value){
                clearValidate('register.registerOne.account')(injectFuns)
                setValidate('register.registerOne.account', '该手机号已经注册了账号请登录')(injectFuns)
                cb()
                return false
            }
            // 发送验证码
            let appId = company && company.id || null,
                domain = da.getDomain()(injectFuns)
            //     domain = window.location.host
            // domain = domain.split(':')[0]
            webapi.web.sendConfirmCode(post,getterByField('form.account')(injectFuns),1,domain).then(data=>{
              // reduce('confirmCodeTS',data.value.ts)
              // reduce('confirmCodeMd5Code',data.value.md5Code)
              reduce('setConfirmInfo',data.value)
            });
        }).then(data =>{
            if(!data) return
            if(!data.result){
                return setValidate('register.registerTwo.account', data.error.message)(injectFuns)
            }
        }).catch( err => {
            debugger
        })
    }
}

export function registData() {
    return injectFuns => {
        let industryVersion = da.getterByField('form.industryVersion')(injectFuns)
        let datas = {
            'account':da.getterByField('form.account')(injectFuns),
            'email':'',//用户邮箱
            'mobile':'',//用户手机号码
            // 'name':getterByField('form.name')(injectFuns),//姓名
            'orgName':da.getterByField('form.orgName')(injectFuns),//企业名称
            'password':md5(da.getterByField('form.password')(injectFuns)+ "yiJia9*"),//用户密码
            'registeredWay':'',//注册类型手机AND邮箱
            'authenticateEmail':'',//认证邮箱
            'authenticateMobile':'',//认证手机
            'passwordStrength':'',//密码强度
            // 'appId': getterByField('appId')(injectFuns),
            // 'domain': window.location.host.split(':')[0],
            'domain': da.getDomain()(injectFuns),
            'industryVersion': industryVersion ,//启用模块
            'industry':da.getterByField('form.industry')(injectFuns).get('id'),//行业ID
            // 'accountingStandards':getterByField('form.accountingStandards')(injectFuns).get('id'),//会计启用准则
            'vatTaxpayer':da.getterByField('form.statusOfTaxpayer')(injectFuns).get('id'),//纳税人身份
            // 'enabledYear':getterByField('form.enabledYear')(injectFuns).split('-')[0],//会计启用年
            // 'enabledMonth':getterByField('form.enabledYear')(injectFuns).split('-')[1],//会计启用月
            'confirmCode':da.getterByField('verify')(injectFuns)+','+da.getterByField('confirmCodeTS')(injectFuns)+','+da.getterByField('confirmCodeMd5Code')(injectFuns),
            'orgType':2/*,2017-10-30根据海涛要求屏蔽邀请码
            'regCode':getterByField('form.invitationCode')(injectFuns)*/
        }
        // 判断用户注册的是邮箱还是手机号码
        if(da.getterByField('form.account')(injectFuns).indexOf('@') >= 0){
            // 如果是邮箱
            datas.email = da.getterByField('form.account')(injectFuns)
            datas.registeredWay = 0
            datas.authenticateEmail = da.getterByField('form.account')(injectFuns)
        }else{
            // 如果是手机
            datas.mobile = da.getterByField('form.account')(injectFuns)
            datas.registeredWay = 1
            datas.authenticateMobile = da.getterByField('form.account')(injectFuns)
        }
         // 密码强度 密码强度(0:弱1：中2：强)
        if(da.getterByField('form.password')(injectFuns).length<6||/^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+)$/.test(da.getterByField('form.password')(injectFuns))){
            datas.passwordStrength = 0
        }else if(da.getterByField('form.password')(injectFuns).length<12||/^((?![a-zA-Z]+$)(?![@#$%^&]+$)[a-zA-Z@#$%^&]+)$|((?!\d+$)(?![a-zA-Z]+$)[a-zA-Z\d]+)$/.test(da.getterByField('form.password')(injectFuns))){
            datas.passwordStrength = 1
        }else if(da.getterByField('form.password')(injectFuns).length>=12||/^(?!\d+$)(?![a-zA-Z]+$)(?![@#$%^&]+$)[\da-zA-Z@#$%^&]+$/.test(da.getterByField('form.password')(injectFuns))){
            datas.passwordStrength = 2
        }
        return datas
    }
}


Object.assign(exports, {...da, ...exports })
