export const meta = {
    name: 'addPromoCode',
    component: 'Form',
    childrens: [{
        name: 'fromItems',
        component: 'FormItems',
        childrens: [{
            name:'appName',
            title:'伙伴名称：',
            bindField:'form.appName',
            component:'Select',
            type:'object',
            required: true,
            valueMember:'id',
            displayMember:'name',
            dataSource: [],
            dataSourceFetchMode: 0,
            width:200
        },{
            name:'productName',
            title:'产品名称：',
            bindField:'form.productName',
            component:'Select',
            type:'object',
            required: true,
            disabled:false,//产品名称始终都为不可修改状态
            valueMember:'id',
            displayMember:'name',
            dataSource: [],
            dataSourceFetchMode: 0,
            width:200
        },{
            name: 'saleCode',
            title: '优惠码',
            type: 'string',
            showLabel: true,
            placeholder: '请输入优惠码',
            allChange:true,
            bindField: 'form.saleCode',
            required: true,
            maxlength:6,
            validate: {
                showTooltip: false,
                rules: [{
                    required: true,
                    message: '优惠码不能为空'
                },{
                    /*
                     * 优惠码只能为6位的大小写字母和数字的组合
                     */
                    regex:/^[A-Za-z0-9]{6}$/,
                    message: '请输入6位数字或字母'
                }]
            },
            height: 45,
            width: 200
        },{
            name: 'salePrice',
            title: '伙伴销售价格',
            component: 'InputNumber',
            showLabel: true,
            placeholder: '请输入伙伴价格',
            bindField: 'form.salePrice',
            required: true,
            precision:2,
            validate: {
                showTooltip: false,
                rules: [{
                    required: true,
                    message: '伙伴价格不能为空'
                },{
                    /*
                     * 伙伴价格只能输入数字，不能为0
                     * ^(([1-9]\d*)(\.\d{1,2})?)$|(0\.0?([1-9]\d?))$
                     */
                    regex:/^(([1-9]\d*)(\.\d{1,2})?)$|(0\.0?([1-9]\d?))$/,
                    message: '伙伴价格要大于0小于官方价格，且最多支持2位小数'
                }]
            },
            height: 45,
            width: 200
        },{
            name: 'productPrice',
            title: '官方价格',
            type: 'string',
            showLabel: true,
            placeholder: '请输入官方价格',
            bindField: 'form.productPrice',
            required: true,
            disabled:true,//官方标价始终为不可修改状态
            validate: {
                showTooltip: false,
                rules: [{
                    required: true,
                    message: '官方价格不能为空'
                }]
            },
            height: 45,
            width: 200
        },{
            name: 'promotionPrice',
            title: '推广价格',
            type: 'string',
            showLabel: true,
            placeholder: '请输入推广价格',
            bindField: 'form.promotionPrice',
            required: true,
            disabled:true,//推广标价始终为不可修改状态
            validate: {
                showTooltip: false,
                rules: [{
                    required: true,
                    message: '官方价格不能为空'
                }]
            },
            height: 45,
            width: 200
        }]
    }]
}
export const data={
    form: {
        appName:null,
        productName:null,
        saleCode:'',
        salePrice:'',
        productPrice:''
    }
}
