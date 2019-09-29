import * as consts from './consts'

export function init() {
    return {
        then: (cb)=> {
            cb({
                result: true,
                value: true
            })
        }
    }
}
export function getMeta() {
    return {
        name: 'orderManageForm',
        component: 'Form',
        childrens: [

        ]
    }
}
export function getData() {
    return {
        form: {
            
        }
    }

}

export let onlineOrder ={
    name: 'onlineOrder',
    component: 'FormItems',
    childrens: [{            
        name: 'isPay',
        type: 'object',
        title: '订单来源',
        bindField: 'form.isPay',
        component: 'Radio',
        valueMember: 'id',
        displayMember: 'name',
        required:true,
        disabled: true,
        width: 200,
        dataSource: [{
            id: 1, name: '线上订单'
        }, {
            id: 2, name: '线下订单'
        }]
        
    },{
        name:'mobile',
        title:'手机号',
        component:'Input',
        bindField:'form.mobile',
        placeholder: '请输入手机号',
        maxlength:15,
//        regex: '^([0-9]+)$',
        width: 200,
        validate:{
            rules: [{
                required: true,
                message: '手机号不能为空'
            },{
              mobile:true,
              message:'请输入正确格式的手机'
            }]
        }
    },{
        name: 'org',
        title: '产品名称',
        type: 'object',
        bindField: 'form.org',
        component: 'Select',
        valueMember: 'id',
        displayMember: 'name',
        required:true,
        dataSource:[],
        validate: {
            showTooltip:false,
            rules: [{
                required: false,
                message: '产品名称不能为空'
            }]
        },
        width: 200
    },/*{
        name: 'product',
        title: '版本名称',
        type: 'object',
        showLabel: true,
        bindField: 'form.product',
        component: 'Select',
        valueMember: 'id',
        displayMember: 'name',
        required: true,
        dataSource:[],
        width: 200
    },*/{
        name: 'beginDate',
        title: '生效日期',
        type: 'string',
        component:'DatePicker',
        showLabel: true,
        required:true,
        placeholder: '请输入生效日期',
        bindField: 'form.beginDate',
        validate: {
            showTooltip:false,
            rules: [{
                required: false,
                message: '生效日期不能为空'
            }]
        },
        width: 200
    },{
        name: 'endDate',
        title: '截至日期',
        type: 'string',
        component:'DatePicker',
        showLabel: true,
        placeholder: '请输入截至日期',
        bindField: 'form.endDate',
        required:true,
        validate: {
            showTooltip:false,
            rules: [{
                required: false,
                message: '截至日期不能为空'
            }]
        },
        width: 200
    },{
        name:'payAmount',
        title:'支付金额',
        type:'string',
        component:'Input',
        maxlength: 50,
        regex: '^([0-9]+)(?:\.[0-9]{1,2})?$',
        bindField:'form.payAmount',
        required:false,
        width: 200
    },{            
        name: 'payType',
        type: 'object',
        title: '支付方式',
        bindField: 'form.payType',
        component: 'Radio',
        valueMember: 'id',
        displayMember: 'name',
        // width: 200,
        dataSource: [{
            id: 3, name: '支付宝'
        }, {
            id: 2, name: '微信支付'
        }, {
            id: 1, name: '线下支付'
        }]
    },{            
        name: 'invoiceStatus',
        type: 'object',
        title: '发票状态',
        bindField: 'form.invoiceStatus',
        component: 'Radio',
        valueMember: 'id',
        displayMember: 'name',
        dataSource: [{
            id: 2, name: '未开具'
        }, {
            id: 3, name: '已开具'
        }, {
            id: 1, name: '无需发票'
        }]
    }/*,{
        name: 'app',
        title: '所属伙伴',
        type: 'string',
        showLabel: true,
        bindField: 'form.app',
        component: 'Select',
        valueMember: 'id',
        required: true,
        displayMember: 'name',
        dataSource:[],
        validate: {
            showTooltip:false,
            rules: [{
                required: false,
                message: '所属伙伴不能为空'
            }]
        },
        width: 200
    },{
        name: 'serviceProvider',
        title: '所属服务商',
        type: 'string',
        showLabel: true,
        bindField: 'form.serviceProvider',
        component: 'Select',
        valueMember: 'id',
        displayMember: 'name',
        visible: false,
        dataSource:[],
        width: 200
    },{            
        name: 'orderStatus',
        type: 'object',
        title: '订单状态',
        bindField: 'form.orderStatus',
        component: 'Radio',
        valueMember: 'id',
        displayMember: 'name',
        width: 200,
        visible: false,
        dataSource: [{
            id: 3, name: '处理失败'
        }, {
            id: 4, name: '已完成'
        }]
        
    }*/]    
}
export let offlineOrder ={
    name: 'offlineOrder',
    component: 'FormItems',
    childrens: [{            
        name: 'isPay',
        type: 'object',
        title: '订单来源',
        bindField: 'form.isPay',
        component: 'Radio',
        valueMember: 'id',
        displayMember: 'name',
        required:true,
        disabled: true,
        width: 200,
        dataSource: [{
            id: 1, name: '线上订单'
        }, {
            id: 2, name: '线下订单'
        }]
        
    },{
        name:'mobile',
        title:'手机号',
        component:'Input',
        bindField:'form.mobile',
        placeholder: '请输入手机号',
        maxlength:15,
//        regex: '^([0-9]+)$',
        required:true,
        width: 200,
        validate: {
            rules: [{
                required: true,
                message: '手机号不能为空'
            },{
              mobile:true,
              message:'请输入正确格式的手机'
            }]

        }
    },{
        name: 'org',
        title: '产品名称',
        type: 'object',
        bindField: 'form.org',
        component: 'Select',
        valueMember: 'id',
        displayMember: 'name',
        required:true,
        dataSource:[
            consts.productName.zjzj,
            consts.productName.gjzj,
        ],
        validate: {
            showTooltip:false,
            rules: [{
                required: false,
                message: '产品名称不能为空'
            }]
        },
        width: 200
    }/*,{
        name: 'product',
        title: '版本名称',
        type: 'object',
        showLabel: true,
        bindField: 'form.product',
        component: 'Select',
        valueMember: 'id',
        displayMember: 'name',
        required: true,
        dataSource:[],
        width: 200
    }*/,{
        name: 'beginDate',
        title: '生效日期',
        type: 'string',
        component:'DatePicker',
        showLabel: true,
        required: true,
        placeholder: '请输入生效日期',
        bindField: 'form.beginDate',
        validate: {
            showTooltip:false,
            rules: [{
                required: false,
                message: '生效日期不能为空'
            }]
        },
        width: 200
    },{
        name: 'endDate',
        title: '截至日期',
        type: 'string',
        component:'DatePicker',
        showLabel: true,
        required:false,
        placeholder: '请输入截至日期',
        bindField: 'form.endDate',
        required:true,
        validate: {
            showTooltip:false,
            rules: [{
                required: false,
                message: '截至日期不能为空'
            }]
        },
        width: 200
    },{
        name:'payAmount',
        title:'支付金额',
        type:'string',
        component:'Input',
        maxlength: 50,
        regex: '^([0-9]+)(?:\.[0-9]{1,2})?$',
        bindField:'form.payAmount',
        required:false,
        width: 200
    },{            
        name: 'payType',
        type: 'object',
        title: '支付方式',
        bindField: 'form.payType',
        component: 'Radio',
        valueMember: 'id',
        displayMember: 'name',
        // width: 200,
        dataSource: [{
            id: 3, name: '支付宝'
        }, {
            id: 2, name: '微信支付'
        }, {
            id: 1, name: '线下支付'
        }]
    },{            
        name: 'invoiceStatus',
        type: 'object',
        title: '发票状态',
        bindField: 'form.invoiceStatus',
        component: 'Radio',
        valueMember: 'id',
        displayMember: 'name',
        dataSource: [{
            id: 2, name: '未开具'
        }, {
            id: 3, name: '已开具'
        }, {
            id: 1, name: '无需发票'
        }]
    }/*,{
        name: 'app',
        title: '所属伙伴',
        type: 'string',
        showLabel: true,
        bindField: 'form.app',
        component: 'Select',
        valueMember: 'id',
        required: true,
        displayMember: 'name',
        dataSource:[],
        validate: {
            showTooltip:false,
            rules: [{
                required: false,
                message: '所属伙伴不能为空'
            }]
        },
        width: 200
    },{
        name: 'serviceProvider',
        title: '所属服务商',
        type: 'string',
        showLabel: true,
        bindField: 'form.serviceProvider',
        component: 'Select',
        valueMember: 'id',
        displayMember: 'name',
        visible: false,
        dataSource:[],
        filterOptionExpressions: 'name',
        showSearch: true,
        width: 200
    },{            
        name: 'orderStatus',
        type: 'object',
        title: '订单状态',
        bindField: 'form.orderStatus',
        component: 'Radio',
        valueMember: 'id',
        displayMember: 'name',
        width: 200,
        visible: false,
        dataSource: [{
            id: 3, name: '处理失败'
        }, {
            id: 4, name: '已完成'
        }]
        
    }*/]    
}

