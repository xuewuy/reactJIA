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
        title: '订单类型',
        bindField: 'form.isPay',
        component: 'Radio',
        valueMember: 'id',
        displayMember: 'name',
        required:true,
        width: 200,
        dataSource: [{
            id: 1, name: '付费订单'
        }, {
            id: 2, name: '非付费订单'
        }]

    },{
        name:'mobile',
        title:'手机号',
        type:'string',
        component:'Input',
        maxlength: 50,
        bindField:'form.mobile',
        placeholder: '请输入手机号',
        maxlength:15,
        regex: '^([0-9]+)$',
        required:true,
        width: 200,
        validate:{
            showTooltip:false,  //提示信息浮层是否显示
            placement:'right',  //提示图层的显示位置
            showIcon:true,  //提示图层图标默认显示
            rules:[{
                required:false,
                message:'手机号不能为空'
            }]
        }
    },{
        name: 'org',
        title: '企业名称',
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
                message: '订企业名称不能为空'
            }]
        },
        width: 200
    },{
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
    },{
        name: 'beginDate',
        title: '生效日期',
        type: 'string',
        component:'DatePicker',
        showLabel: true,
        required:false,
        placeholder: '请输入生效日期',
        bindField: 'form.beginDate',
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
    },{
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

    }]
}

export let offlineOrder ={
    name: 'offlineOrder',
    component: 'FormItems',
    childrens: [{
        name: 'isPay',
        type: 'object',
        title: '订单类型',
        bindField: 'form.isPay',
        component: 'Radio',
        valueMember: 'id',
        displayMember: 'name',
        required:true,
        width: 200,
        dataSource: [{
            id: 1, name: '付费订单'
        }, {
            id: 2, name: '非付费订单'
        }]

    },{
        name:'mobile',
        title:'手机号',
        type:'string',
        component:'Input',
        maxlength: 50,
        bindField:'form.mobile',
        placeholder: '请输入手机号',
        maxlength:15,
        regex: '^([0-9]+)$',
        required:true,
        width: 200,
        validate:{
            showTooltip:false,  //提示信息浮层是否显示
            placement:'right',  //提示图层的显示位置
            showIcon:true,  //提示图层图标默认显示
            rules:[{
                required:false,
                message:'手机号不能为空'
            }]
        }
    },{
        name: 'org',
        title: '企业名称',
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
                message: '订企业名称不能为空'
            }]
        },
        width: 200
    },{
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
    },{
        name: 'beginDate',
        title: '生效日期',
        type: 'string',
        component:'DatePicker',
        showLabel: true,
        required:false,
        placeholder: '请输入生效日期',
        bindField: 'form.beginDate',
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
    },{
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

    }]
}

export let invoiceDetail  = {
    name:'invoice',
    component: 'FormItems',
    childrens:[{
      name: 'orderInfoForm',
      component: 'Form',
      childrens: [{
        name: 'formItems',
        component: 'FormItems',
        childrens: [{
          name: 'orderType',
          component: 'Select',
          title: '发票类型',
          bindField: 'form.invoice.invoiceType',
          valueMember: 'id',
          displayMember: 'name',
          width: 200,
          dataSource: [{
            name: '增值税普通发票',
            id: 1
          },{
            name: '增值税专用发票',
            id: 2
          }]
        }, {
          name: 'orderContent',
          component: 'Select',
          title: '发票内容',
          bindField: 'form.invoice.contentType',
          width: 200,
          valueMember: 'id',
          displayMember: 'name',
          dataSource: [{
            name: '软件服务费',
            id: 1
          }]
        }]
      }]
    }, {
      name: 'orderInfoFormTwo',
      component: 'Form',
      childrens: [{
        name: 'formItems',
        component: 'FormItems',
        childrens: [{
          name: 'taxNum',
          placeholder: '请输入纳税人识别号/税号',
          title: '纳税人识别号/税号',
          bindField: 'form.invoice.titleOrgCode',
          type: 'string',
          showLabel: true,
          required: true,
          maxlength: 20,
          validate: {
            showTooltip: true,
            placement: 'right',  //提示图层的显示位置
            showIcon: true,  //提示图层图标默认显示
            rules: [{
              required: true,
              message: '不能为空'
            },{
              regex:/(^[A-Za-z0-9]{15}$)|(^[A-Za-z0-9]{18}$)|(^[A-Za-z0-9]{20}$)/,
              message:'纳税人识别号一般为15位、18位、20位的数字，请正确录入'
          }]
          },
          height: 45,
          width: 200
        }, {
          name: 'companyName',
          placeholder: '请输入企业名称',
          title: '企业名称',
          bindField: 'form.invoice.titleOrgName',
          type: 'string',
          showLabel: true,
          required: true,
          maxlength: 50,
          validate: {
            showTooltip: true,
            placement: 'right',  //提示图层的显示位置
            showIcon: true,  //提示图层图标默认显示
            rules: [{
              required: true,
              message: '不能为空'
            }]
          },
          height: 45,
          width: 200
        }, {
          name: 'address',
          title: '寄送地址：',
          type: 'string',
          component: 'Address',
          showLabel: true,
          required: true,
          showDetail:false,
          // visible: false,
          placeholder: '请输入寄送地址',
          bindField: 'form.invoice.address',
          // validate: {
          //     showTooltip:true,
          //     placement:'right',  //提示图层的显示位置
          //     showIcon:true,  //提示图层图标默认显示
          //     rules: [{
          //         required: true,
          //         message: '寄送地址不能为空'
          //     }]
          // },
          className: 'w100 invoice-address',
          width: 500
        }, {
          name: 'addrDetail',
          title: '详细地址：',
          component: 'Input',
          placeholder: '请填写详细收货地址，例如街道名称、门牌号码等信息',
          bindField: 'form.invoice.addressDetail',
          type: 'textarea',
          showLabel: true,
          required: true,
          className: 'h60 address-details',
          maxlength: 200,
          validate: {
            showTooltip: true,
            placement: 'right',  //提示图层的显示位置
            showIcon: true,  //提示图层图标默认显示
            rules: [{
              required: true,
              message: '不能为空'
            }]
          },
          height: 90,
          width: 320
        },{
          name: 'curstomer',
          title: '收件人：',
          placeholder: '请输入收件人姓名',
          bindField: 'form.invoice.contact',
          type: 'string',
          showLabel: true,
          required: true,
          maxlength: 20,
          validate: {
            showTooltip: true,
            placement: 'right',  //提示图层的显示位置
            showIcon: true,  //提示图层图标默认显示
            rules: [{
              required: true,
              message: '不能为空'
            }]
          },
          height: 45,
          width: 200
        }, {
          name: 'phone',
          title: '联系方式：',
          placeholder: '请输入收件人手机号',
          bindField: 'form.invoice.mobile',
          type: 'string',
          showLabel: true,
          required: true,
          regex: '^([0-9]+)$',
          maxlength: 20,
          validate: {
            showTooltip: true,
            placement: 'right',  //提示图层的显示位置
            showIcon: true,  //提示图层图标默认显示
            rules: [{
              required: true,
              message: '不能为空'
            }, {
              fixPhoneOrMobile: true,
              message: '请输入正确格式的固定电话或手机'
            }]
          },
          height: 45,
          width: 200
        }]
      }]
    }]
}
