
export const meta = {
    name: 'editOrg',
    component: 'Form',
    childrens: [{
            name: 'fromItems',
            component: 'FormItems',
            childrens: [{
                    name: 'expireTime',
                    title: '截至日期',
                    type: 'string',
                    component:'DatePicker',
                    showLabel: true,
                    required:false,
                    placeholder: '请输入截至日期',
                    bindField: 'form.expireTime',
                    disabled:true,
                    validate: {
                        showTooltip:false,
                        rules: [{
                            required: false,
                            message: '截至日期不能为空'
                        }]
                    },
                    width: 200
                },{
                    name:'version',
                    title:'版本：',
                    bindField:'form.version',
                    component:'Radio',
                    visible:false,
                    type:'object',
                    valueMember:'id',
                    displayMember:'name',
                    dataSource:[/*{
                        id:0,
                        name:'测试版'
                    },{
                        id:1,
                        name:'试用版'
                    },*/{
                        id:2,
                        name:'软件版'
                    },{
                        id:3,
                        name:'服务版'
                    }]
                },{
                    name: 'maxOrgCount',
                    title: '账套上限',
                    type: 'string',
                    showLabel: true,
                    visible:false,
                    placeholder: '请输入账套上限数',
                    bindField: 'form.maxOrgCount',
                    // regex: '^(?:[1-9]\d{0,2}|1\d{0,3}|2000)$',
                    // regex: '^([0-9]|[1-9]\d{0,2}|1\d{0,3}|2000)$',
                    regex: '^([1]{0,1}[0-9]{0,3})$',
                    required: false,
                    maxlength: 4,
                    validate: {
                        showTooltip: false,
                        rules: [{
                            required: false,
                            message: '账套上限数不能为空'
                        }]
                    },
                    height: 45,
                    width: 300
                },{
                    name:'dzList',
                    title:'所属服务商：',
                    bindField:'form.dzList',
                    component:'Select',
                    type:'object',
                    required: false,
                    visible:false,
                    valueMember:'id',
                    displayMember:'name',
                    className:'spOrg',
                    dataSource: [],
                    dataSourceFetchMode: 0,
                    after:'orgCount',
                    filterOptionExpressions: 'name',
                    showSearch: true,
                    width:200
                },{
                    name:'dzRules',
                    title:'服务商权限：',
                    bindField:'form.dzRules',
                    component:'Radio',
                    visible:true,
                    type:'object',
                    valueMember:'id',
                    displayMember:'name',
                    className:'dzRules',
                    dataSource:[{
                        id:1,
                        name:'财税托管（流水账、工资单、财务核算、税务申报、系统设置）'
                    },{
                        id:3,
                        name:'企业自助+服务（问题列表、财务核算、税务申报、基础档案、科目及期初、企业信息）'
                    }]
                },{
                    name:'clientAppId',
                    title:'伙伴管理：',
                    bindField:'form.clientAppId',
                    component:'Select',
                    type:'object',
                    required: false,
                    valueMember:'id',
                    displayMember:'name',
                    dataSource: [],
                    getPopupContainer:true,
                    dataSourceFetchMode: 0,
                    width:200
                },{
                    name: 'memo',
                    title: '备注',
                    type: 'string',
                    showLabel: true,
                    placeholder: '请输入备注信息',
                    bindField: 'form.memo',
                    required: false,
                    validate: {
                        showTooltip: false,
                        rules: [{
                            required: false,
                            message: '不能为空'
                        }]
                    },
                    height: 45,
                    width: 300
                }]
        }]
}
export const data={
    form: {
        expireTime: '',
        memo:'',
        createTime:'',
        creatorName:'',
        creatorMobile:'',
        version:'2',
        maxOrgCount:'',
        dzRules:null,
        dzList:null,
        clientAppId:null
    }
}
