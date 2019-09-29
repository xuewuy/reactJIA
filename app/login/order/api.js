import moment from 'moment'
export const meta = {
  name: 'order',
  childrens: [{
    component: 'Select',
    name: 'selectCompany',
    title: '',
    type: 'string',
    showLabel: true,
    // placeholder: '请输入组织名称',
    bindField: 'form.company',
    valueMember: 'id',
    displayMember: 'name',
    dataSource: [{
      name: 'rrsd',
      id: 1
    }],
    height: 45,
    width: 200
  }, {

    name: 'isOrder',
    title: '',
    component: 'Checkbox',
    // type: 'string',
    showLabel: true,
    className: 'isorder',
    // placeholder: '请输入组织名称',
    bindField: 'form.isOrder',
    // required: false,
    // maxlength:100,
    // validate: {
    //     showTooltip: false,
    //     rules: [{
    //         required: true,
    //         message: '不能为空'
    //     }]
    // },
    height: 45,
    width: 25

  }, {
    name: 'orderInfoForm',
    component: 'Form',
    childrens: [{
      name: 'formItems',
      component: 'FormItems',
      childrens: [{
        name: 'orderType',
        component: 'Select',
        title: '发票类型',
        bindField: 'form.orderType',
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
        bindField: 'form.orderContent',
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
        bindField: 'form.taxNum',
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
        bindField: 'form.companyName',
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
        bindField: 'form.address',
        // validate: {
        //     showTooltip:true,
        //     placement:'right',  //提示图层的显示位置
        //     showIcon:true,  //提示图层图标默认显示
        //     rules: [{
        //         required: true,
        //         message: '寄送地址不能为空'
        //     }]
        // },
        className: 'w100',
        width: 500
      }, {
        name: 'addressDetail',
        title: '详细地址：',
        component: 'Input',
        placeholder: '请填写详细收货地址，例如街道名称、门牌号码等信息',
        bindField: 'form.addressDetail',
        type: 'textarea',
        showLabel: true,
        required: true,
        className: 'h60',
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
        width: 385
      },{
        name: 'curstomer',
        title: '收件人：',
        placeholder: '请输入收件人姓名',
        bindField: 'form.curstomer',
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
        bindField: 'form.phone',
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
  }, {
    name: 'orderCouponCode',
    component: 'Form',
    childrens: [{
      name: 'formItems',
      component: 'FormItems',
      visible:true,
      childrens: [{
        name: 'couponCode',
        placeholder: '请输入优惠码或邀请码',
        className: 'orangeStyle',
        title: '优惠码或邀请码',
        bindField: 'form.couponCode',
        type: 'string',
        showLabel: true,
        allChange:true,
        // required: true,
        maxlength: 6,
        regex: '^[a-zA-Z0-9]+$',
        height: 45,
        width: 213
      }]
    }]
  }, {

    name: 'isAgree',
    title: 'tongyi',
    type: 'bool',
    showLabel: true,
    className: 'isAgree',
    bindField: 'form.isAgree',
    height: 45,
    width: 25

  }]
}
export const data = {
  orderStep: 1,
  orderPayType: 'wx',
  form: {
    orderTtValue: 'company',
    isOrder: false,
    isAgree: true,
    isEdit: true
  }
}

// 我的易嘉人初始化数据
export function init(post) {
  return post('/v1/web/myyj/init')
}
