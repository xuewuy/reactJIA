import md5 from 'md5'

export const meta = {
    name: 'mailForm',
    component: 'Form',
    childrens: [{
        name: 'formItems',
        component: 'FormItems',
        childrens:[{
            name:'addressee',
            title:'收件人:',
            component:'Input',
            placeholder: '若发送多个邮箱请用逗号","或";"隔开',
            disabled:false,
            componentName:'addressee',
            bindField:'addressee',
            style:{width:'109px'},
            validate: {
                showTooltip:false,
                rules: [{
                    required: true,
                    message: '邮箱不能为空'
                },{
                    regex: '^(([a-z0-9_\\.-]+)@([0-9\\da-z\.-]+)\.([a-z\\.]{2,6}[,;]))*([a-z0-9_\\.-]+)@([0-9\\da-z\\.-]+)\\.([a-z\\.]{2,6})$',
                    message:'请输入正确格式的邮箱'
                }]
            }
        },{
            name:'copyTo',
            title:'抄 送:',
            component:'Input',
            disabled:false,
            componentName:'copyTo',
            bindField:'copyTo',
            placeholder: '若抄送多个邮箱请用逗号","或";"隔开',
            style:{width:'109px'},
            validate: {
                showTooltip:false,
                rules: [{
                    regex: '^(([a-z0-9_\\.-]+)@([0-9\\da-z\.-]+)\.([a-z\\.]{2,6}[,;]))*([a-z0-9_\\.-]+)@([0-9\\da-z\\.-]+)\\.([a-z\\.]{2,6})$',
                    // email:true,
                    message:'请输入正确格式的邮箱'
                }]
            }
        },{
            name:'subject',
            title:'主 题:', 
            component:'Input',
            disabled:false,
            componentName:'subject',
            bindField:'subject',
            style:{width:'109px'},
            placeholder: '邮件主题，不能省略',
            validate: {
                showTooltip:false,
                rules: [{
                    required: true,
                    message: '主题不能为空'
                }]
            }
        }]
    }]
}

export const data = {
    addressee:undefined,
    copyTo:undefined,
    subject:undefined
}
