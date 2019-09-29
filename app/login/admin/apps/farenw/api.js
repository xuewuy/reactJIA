

export function getMeta() {
    return { 
        name:'farenwEdit',
        component:'Form',
        childrens:[{    
            name:'farenwEditList',
            component:'FormItems',
            childrens:[
            { type: 'string',component: 'Text',name:'id',title:'会员卡号', bindField: 'form.code' },
			{ type: 'string',name:'mobile',component: 'Text',title:'绑定易嘉账号', bindField: 'form.mobile' },
            {
                name: 'counselCount',
                title: '剩余咨询次数',
                bindField: 'form.counselCount',
                component: 'Input'
            }]    
        }]	  
    }
}

export function getData() {
    return {
        form: {}
    }
}



// export function getMeta() {
//     return { 
//         name:'operationAdd',
//         component:'form',
//         childrens:[{
//             name:'operationAddList',
//             component:'FormItems',
//             childrens:[{
//                 name: 'phone',
//                 title: '手机号',
//                 type: 'string',
//                 showLabel: true,
//                 disabled:false,
//                 placeholder: '请输入手机号',
//                 bindField: 'form.phone',
//                 required: true,
//                 validate: {
//                     showTooltip:false,
//                     rules: [{
//                         required: true,
//                         message: '手机不能为空'
//                     },{
//                       mobile:true,
//                       message:'请输入正确格式的手机号码'
//                     }]
//                 },
//                 height: 45,
//                 width: 200
//             },{
//                 name: 'role',
//                 title: '运营角色',
//                 type: 'object',
//                 bindField: 'form.role',
//                 component: 'Select',
//                 required: true,
//                 valueMember: 'id',
//                 displayMember: 'name',
//                 validate: {
//                     showTooltip:false,
//                     placement:'right', 
//                     showIcon:true,
//                     rules: [{
//                         required: true,
//                         message: '运营角色不能为空'
//                     }]
//                 },
//                 width: 200
//             }]
//         }]	    
//     }
// }

// export function getData() {
//     return {
//     }
// }

