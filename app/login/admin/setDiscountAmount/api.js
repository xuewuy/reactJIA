
export function getMeta() {
    return {
        name: 'discountAmount',
        childrens: [
            {
                name:'leftDiscountAmount',
                component:'Form',
                childrens:[{
                    name:'formItems',
                    component:'FormItems',
                    childrens:[
                        
                    {
                        name: 'name',
                        title: '名称',
                        type: 'string',
                        showLabel: true,
                        placeholder: '请输入名称',
                        bindField: 'leftDiscountAmount.name',
                        maxlength:20,
                        required: true,                        
                        validate: {
                            showTooltip: true,
                            placement:'right',
                            showIcon:true,
                            rules: [{
                                required: true,
                                message: '名称不能为空'
                            }]
                        },
                        height: 45,
                        width: 150
                    },{
                        name: 'smallPrice',
                        title: '小规模纳税人优惠金额',
                        type: 'string',
                        showLabel: true,
                        placeholder: '请输入小规模纳税人优惠金额',
                        bindField: 'leftDiscountAmount.smallPrice',
                        maxlength:20,
                        regex: '^([0-9]+)(?:\.[0-9]{1,2})?$',
                        required: true,                        
                        validate: {
                            showTooltip: true,
                            placement:'right',
                            showIcon:true,
                            rules: [{
                                required: true,
                                message: '小规模纳税人优惠金额不能为空'
                            }]
                        },
                        height: 45,
                        width: 150
                    },{
                        name: 'commonlyPrice',
                        title: '一般纳税人优惠金额',
                        type: 'string',
                        showLabel: true,
                        placeholder: '请输入一般纳税人优惠金额',
                        bindField: 'leftDiscountAmount.commonlyPrice',
                        maxlength:20,
                        regex: '^([0-9]+)(?:\.[0-9]{1,2})?$',
                        required: true,                        
                        validate: {
                            showTooltip: true,
                            placement:'right',
                            showIcon:true,
                            rules: [{
                                required: true,
                                message: '一般纳税人优惠金额不能为空'
                            }]
                        },
                        height: 45,
                        width: 150
                    },{
                        name: 'expireTime',
                        title: '到期日期',
                        component: 'DatePicker',
                        showLabel: true,
                        required: true,
                        bindField: 'leftDiscountAmount.expireTime',
                        validate: {
                            showTooltip: true,
                            placement:'right',
                            showIcon:true,
                            rules: [{
                                required: true,
                                message: '到期日期不能为空'
                            }]
                        },
                        height: 45,
                        width: 100
                    }]
                }]
            },{
                name:'rightDiscountAmount',
                component:'Form',
                childrens:[{
                    name:'formItems',
                    component:'FormItems',
                    childrens:[
                        
                    {
                        name: 'discountPrice',
                        title: '优惠金额',
                        type: 'string',
                        showLabel: true,
                        placeholder: '请输入优惠金额',
                        bindField: 'rightDiscountAmount.discountPrice',
                        maxlength:8,                
                        regex: '^([0-9]+)(?:\.[0-9]{1,2})?$',
                        required: true,                        
                        validate: {
                            showTooltip: true,
                            placement:'right',
                            showIcon:true,
                            rules: [{
                                required: true,
                                message: '优惠金额不能为空'
                            }]
                        },
                        height: 45,
                        width: 150
                    }]
                }]
            }
        ]
    }
}
export function getData() {
    return {
        leftDiscountAmount: {},
        rightDiscountAmount: {}
    }

}



