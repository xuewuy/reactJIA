export const meta = {
    name: 'contarctSiging',
    component: 'Form',
    childrens: [{
        name: 'formItems',
        component: 'FormItems',
        childrens: [{
            name:'qiyename',
            title:'企业名称：',
            bindField:'form.orgName',
            type:'string',
            required: true,
            validate: {
                showTooltip: false,
                rules: [{
                    required: true,
                    message: '企业名称不能为空'
                }]
            },
            maxlength: 50,
            width:200,
        },{
            name:'appName',
            title:'法定代表人(或授权代表)姓名：',
            bindField:'form.orgContacts',
            type:'string',
            required: true,
            validate: {
                showTooltip: false,
                rules: [{
                    required: true,
                    message: '姓名不能为空'
                }]
            },
            maxlength: 20,
            width:200,
        },{
            name: 'people',
            title: '联系电话：',
            component: 'InputNumber',
            showLabel: true,
            bindField: 'form.orgContactTel',
            required: true,
            validate: {
                showTooltip: false,
                rules: [{
                    required: true,
                    message: '联系电话不能为空'
                },{
                    regex:/^[1][3,4,5,7,8][0-9]{9}$/,
                    message: '请输入正确的手机号'
                }]
            },
            width: 200
        },{
            name: 'promotionPrice',
            title: '法定代表人(或授权代表)身份证号：',
            component: 'Input',
            showLabel: true,
            bindField: 'form.orgContactsIdentityNo',
            required: true,
            validate: {
                showTooltip: false,
                rules: [{
                    required: true,
                    message: '身份证号不能为空'
                },{
                    regex:/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/,
                    message: '请输入正确的身份证号'
                }]
            },
            width: 200
        },{
            name:'orgCode',
            title:'企业机构代码：',
            bindField:'form.orgCode',
            type:'string',
            required: true,
            maxlength: 18,
            width:200,
        },{
            name:'emaile',
            title:'企业注册地址：',
            bindField:'form.orgAddress',
            type:'string',
            required: true,
            width:200,
        }]
    }]
}
export const data={
    form: {
        "orderId":'',
        "orgName":"",
        "orgCode": "",
        "orgAddress": "",
        "orgContacts": "",
        "orgContactsIdentityNo": "",
        "orgContactTel": ""
    }
}
