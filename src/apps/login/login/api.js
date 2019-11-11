import md5 from 'md5'

export const meta = {
    name: 'login',
    component: 'Form',
    childrens: [{
        name: 'formItems',
        component: 'FormItems',
        childrens: [{
            name: 'user',
            title: '用户名',
            autocomplete:'off',
            type: 'string',
            showLabel: false,
            placeholder: '请输入手机号',
            fontSize:'small',
            bindField: 'user',
            validate: {
                rules: [{
                    required: true,
                    message: '手机号码不能为空'
                },{
                  emailOrMobile:true,
                  message:'请输入正确格式的手机号'
                }]
            },
            height: 45
        }, {
            name: 'password',
            title: '密码',
            autocomplete:'off',
            type: 'string',
            component: 'Input',
            showLabel: false,
            placeholder: '请输入密码/邀请码',
            bindField: 'password',
            validate: {
                rules: [{
                    required: true,
                    message: '不能为空'
                }]
            },
            height: 45
        },{
            name: 'remember',
            title: '5天内自动登录',
            showLabel: false,
            type: 'bool',
            bindField: 'remember'
        }]
    }]
}

export const data = {
    user: '',
    password: '',
    localStorageLoginPwd:'',
    forgetPassword:'找回密码',
    register:'快速注册',
    isContinueBrowsing:false,
    zhwuji:{
        currentStep:0,
        isShowWxCode:false,
        random:null,
        isBtndisabled:false
    }
}

export function login(post, user, pwd, code,domain) {
    var data = {
        account: user,
        password: pwd,
        'domain':domain
    }
    if(code)data.authorization_code = code
    return post('/v1/user/login', data, null, true)
}

export const loginTestData = {
    "result": true,
    "value": true,
    "token": "AAAA"
}

