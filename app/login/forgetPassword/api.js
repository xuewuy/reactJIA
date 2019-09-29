import md5 from 'md5'
export const meta = {
    name: 'forgetPassword',
    component: 'Form',
    childrens: [{
        name: 'formItems0',
        component: 'FormItems',
        visible: false,
        childrens: [{
            name: 'mobile',
            title: '手机',
            type: 'string',
            showLabel: false,
            placeholder: '请输入绑定的手机号或邮箱',
            bindField: 'form.mobile',
            validate: {
                rules: [{
                    required: true,
                    message: '不能为空'
                }, {
                  emailOrMobile:true,
                  message:'请输入正确格式的手机号或邮箱'
                }]
            },
            height: 45
        }, {
            name: 'captcha',
            title: '验证码',
            type: 'string',
            showLabel: false,
            placeholder: '请输入验证码',
            bindField: 'form.captcha',
            className:'getCaptcha',
            maxlength:6,
            validate: {
                rules: [{
                    required: true,
                    message: '验证码不能为空'
                }]
            },
            after: 'countDownButton',
            height: 45
        }]
    }, {
        name: 'formItems1',
        component: 'FormItems',
        visible: false,
        childrens: [{
            name: 'password',
            title: '新密码',
            type: 'string',
            component: 'Password',
            showLabel: false,
            placeholder: '新密码（6-20位至少包含一个字母和一个数字）',
            bindField: 'form.password',
            validate: {
                rules: [{
                    required: true,
                    message: '不能为空'
                },{
                    regex:'(?=^.{6,20}$)((?=.*[a-zA-Z]){1})((?=.*[0-9]){1})',
                    message: '6-20位至少包含一个字母和一个数字'
                }]
            },
            height: 45
        }, {
            name: 'confirmPassword',
            title: '确认密码',
            type: 'string',
            component: 'Password',
            showLabel: false,
            placeholder: '确认密码',
            bindField: 'form.confirmPassword',
            validate: {
                rules: [{
                    required: true,
                    message: '不能为空'
                }]
            },
            height: 45
        }]
    }]
}

export const data = {
    form: {
        mobile: '',
        captcha: '',
        password: '',
        confirmPassword: ''
    },
    steps: [{
        status: 'one',
        title: '步骤一',
        description: '安全验证'
    }, {
        status: 'two',
        title: '步骤二',
        description: '重新设置密码'
    }, {
        status: 'three',
        title: '步骤三',
        description: '完成'
    }],
    currentStep: 0,
    enterErrorCodeCount: 0,
    isConfirmCodeCtrlDisabled: false
}

export function isExists(post, user) {
    return post("user/checkNotExist", {
        account: user
    })
}


export function getCaptcha(post, user) {
    return post('user/getCode', {
        account: user,
        codeType:2
    })
}

export function isCorrectCaptcha(post, code) {
    return post('user/checkCode', {
        code
    })
}

export function modifyPassword(post, user, pwd) {
    return post('user/resetPassword', {
        account: user,
        password: md5(pwd+"yiJia9*")
    })
}

export function login(post, user, pwd) {
    var data = {
        account: user,
        password: md5(pwd+"yiJia9*")
    }
    return post('user/login', data, null, true)
}
