
export const listDemo = {
    meta: {
        name: 'listDemo',
        component: 'FormItems',
        childrens: [{
            name: 'filter',
            title: '过滤',
            component: 'Address',
            bindField: 'address',
            validate: {
                // showIcon: true,
                // showTooltip: true,
                placement:'right',
                rules: [{
                    required: true,
                    message: '不能为空'
                }, {
                  emailOrMobile:true,
                  message:'请输入正确格式的邮箱或者手机'
                }]
            }
        }]
    },
    data: {
        address:{provinces:'110000',citys:'110100',districts:'110101',text:'东直门大街'}
    }
}
