import moment from 'moment'
//新代账端结束
export function getData() {
    return {
        meta: {
            name: 'form',
            component: 'Form',
            childrens: [{
                name: 'formItems',
                component: 'FormItems',
                bindField: 'inAmountTableData',
                rowHeight: 'auto',
                headerHeight: 30,
                disabled: true,
                width:true,
                childrens: [
                {
                    name:'group1',//基本信息
                    component:'Text',
                    className:'group1',
                    width:600,
                    bindField:'form.group1'
                },{
                    name: 'name',
                    title: '账套名称',
                    type: 'string',
                    // disabled: true,
                    component: 'Input',
                    bindField: 'form.name',
                    maxlength:50,
                    required: true,
                    validate: {
                        showTooltip:true,
                        placement:'right',  //提示图层的显示位置
                        showIcon:true,  //提示图层图标默认显示
                        rules: [{
                            required: true,
                            placement:'right',  //提示图层的显示位置
                            message: '账套名称不能为空'
                        }]
                    },
                    width:200
                },{
                    name:'vatTaxpayer',
                    title:'纳税人身份',
                    bindField:'form.vatTaxpayer',
                    component:'Select',
                    type:'object',
                    required: false,
                    valueMember:'id',
                    // disabled:true,
                    displayMember:'name',
                    dataSource: [],
                    dataSourceFetchMode: 0,
                    required: true,
                    width:200
                },{
                    name:'industry',
                    title:'所属行业',
                    component:'Select',
                    type:'object',
                    maxlength:20,
                    showLabel: true,
                    className:'w550',
                    required: false,
                    valueMember:'id',
                    dataSource: [],
                    dataSourceFetchMode: 0,
                    displayMember:'name',
                    // disabled:true,
                    bindField: 'form.industry',
                    required: true,
                    width:200
                },{
                    name:'enabledDate',
                    title:'启用期间',
                    component:'MonthPicker',
                    className:'w550',
                    type: 'string',
                    showLabel: true,
                    placeholder: '',
                    bindField: 'form.enabledDate',
                    required: true,
                    width:200
                },{
                    name:'accountingStandards',
                    title:'企业会计准则',
                    component:'Select',
                    type:'object',
                    maxlength:20,
                    showLabel: true,
                    className:'w550',
                    required: false,
                    valueMember:'id',
                    dataSource: [],
                    dataSourceFetchMode: 0,
                    displayMember:'name',
                    // disabled:true,
                    bindField: 'form.accountingStandards',
                    required: true,
                    width:200
                },{
                    name:'group2',//企业所得税
                    component:'Text',
                    className:'group2',
                    width:600,
                    bindField:'form.group2'
                },{
                    name:'businessIncomeTaxMode',
                    title:'征收方式',
                    bindField:'form.businessIncomeTaxMode',
                    component:'Select',
                    type:'object',
                    valueMember:'id',
                    displayMember:'name',
                    dataSource: [],
                    dataSourceFetchMode: 0,
                    required: true,
                    width:200
                }/*,{
                    name:'isSmallOrg',
                    title:'是否小微企业',
                    bindField:'form.isSmallOrg',
                    component:'Select',
                    type:'object',
                    valueMember:'id',
                    displayMember:'name',
                    dataSource: [{
                        id: '0', name: '是'
                    }, {
                        id: 1, name: '否'
                    }],
                    dataSourceFetchMode: 0,
                    required: true,
                    width:200
                }*/,{
                    name:'checkMode',
                    title:'核定方式',
                    bindField:'form.checkMode',
                    component:'Select',
                    type:'object',
                    valueMember:'id',
                    disabled:false,
                    visible: false,
                    displayMember:'name',
                    dataSource: [],
                    dataSourceFetchMode: 0,
                    required: true,
                    width:200
                },{
                    name: 'fileImg',
                    title: '营业执照',
                    component: 'Attachment',
                    isShow:false,
                    onlyOne:true,
                    showText:'上传',
                    webapiPath:'/v1/accountsIdentity/uplode?orgId=null',
                    containerId:'addAccount',
                    bindField: 'form.fileImg'
                }]
            }]
        },
        data: {
            form: {
                group1: '基本信息',
                group2: '企业所得税',
                fileImg:null
            }
        }
    }
}

