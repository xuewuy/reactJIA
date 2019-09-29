import moment from 'moment'
import OrderManagement from './component/orderManagement'
import PartnerManage from './component/partnerManage'
import VersionManage from './component/versionManage'
import OrganizationalAdministration from './component/organizationalAdministration'
import OrganizationalInfo from './component/organizationalInfo'
import UserInfo from './component/userInfo'
import OrgAnalyze from './component/orgAnalyze'
import UserAnalyze from './component/userAnalyze'
import DzAdministration from './component/dzAdministration'
import DzInfo from './component/dzInfo'
import Farenw from './component/farenw'
import TemplatManagement from './component/templatManagement'
import styles from "./admin.less"
import PromoCode from './component/promoCode'
import InvitationCodeAdministration from './component/invitationCodeAdministration'
import Operation from './component/operation'
import InviteCodeAdministrationComponent from './component/inviteCodeAdministration'
import AuthenticationComponent from './component/authentication'
import HomeManage from './component/homeManage.js'
import FeedbackManage from './component/feedbackManage.js'
import TaxManage from './component/taxManage.js'

//我的订单

export const meta = {
    name: 'admin',
    childrens: [{
        name: 'createOrg',
        component: 'Form',
        childrens: [{
            name: 'formItems',
            component: 'FormItems',
            childrens: [{
                name: 'orgName',
                title: '服务商名称',
                type: 'string',
                showLabel: true,
                placeholder: '请输入服务商名称',
                bindField: 'createOrg.orgName',
                required: true,
                maxlength:100,
                validate: {
                    showTooltip: false,
                    rules: [{
                        required: true,
                        message: '不能为空'
                    }]
                },
                height: 45,
                width: 200
            },{
              name:'requiredOrgCount',
              title:'申请账套数',
              bindField:'createOrg.requiredOrgCount',
              component:'Select',
              showLabel: true,
              required: true,
              type:'object',
              valueMember:'id',
              displayMember:'name',
              dataSource: [{
                  id:-1,
                  name:"0~29账套",
                  code:"0001"
              },{
                  id:1,
                  name:"30~99账套",
                  code:"0002"
              },{
                  id:2,
                  name:"100~199账套",
                  code:"0002"
              },{
                  id:3,
                  name:"200~499账套",
                  code:"0003"
              },{
                  id:4,
                  name:"500~999账套",
                  code:"0004"
              },{
                  id:5,
                  name:"1000及以上",
                  code:"0005"
              }],
              dataSourceFetchMode: 0,
              height:45,
              width: 200
          }]
        }]
    },{
        name: 'createPartner',
        component: 'Form',
        childrens: [{
            name: 'formItems',
            component: 'FormItems',
            childrens: [{
                name: 'name',
                title: '企业名称',
                type: 'string',
                showLabel: true,
                placeholder: '请输入企业名称',
                bindField: 'createPartner.name',
                required: true,
                maxlength:100,
                validate: {
                    showTooltip: false,
                    rules: [{
                        required: true,
                        message: '不能为空'
                    }]
                },
                height: 45,
                width: 200
            },{
                name: 'appServiceTel',
                title: '手机号',
                type: 'string',
                // type: 'float',
                // showLabel: true,
                displayComponent: 'Input',
                placeholder: '请输入手机号',
                bindField: 'createPartner.appServiceTel',
                // required: true,
                maxlength:15,
                regex: '^([0-9]+)$',
                height: 45,
                width: 200
            },{
                name: 'parentPartner',
                title: '上级伙伴',
                type: 'object',
                component: 'Select',
                bindField: 'createPartner.parentPartner',
                valueMember:'id',
                displayMember:'name',
                visible: false,
                dataSource: [],
                width: 200
            }]
        }]
    },{
        name: 'createVersion',
        component: 'Form',
        childrens: [{
            name: 'formItems',
            component: 'FormItems',
            childrens: [{
                name: 'mtype',
                title: '版本类型',
                type: 'object',
                // showLabel: true,
                component: 'Radio',
                bindField: 'createVersion.mtype',
                valueMember: 'id',
                displayMember: 'name',
                required: true,
                dataSource: [{
                  name: '代账端',
                  id: 1
                },{
                  name: '企业端',
                  id: 2
                }],
                height: 45,
                width: 300
            },{
                name: 'versionNum',
                title: '版本号',
                type: 'string',
                displayComponent: 'Input',
                placeholder: '请输入版本号',
                bindField: 'createVersion.versionNum',
                required: true,
                maxlength:20,
                // regex: '^([0-9|a-z|/.]+)$',
                height: 45,
                width: 300
            },{
                name: 'updateTime',
                title: '版本升级日期',
                type: 'string',
                showLabel: true,
                component: 'DatePicker',
                placeholder: '请输入版本升级日期',
                bindField: 'createVersion.updateTime',
                required: true,
                height: 45,
                width: 300
            },{
                name: 'app',
                title: '所属伙伴',
                type: 'textarea',
                component: 'Select',
                bindField: 'createVersion.app',
                valueMember:'id',
                multiple: true,
                disabled: true,
                required: true,
                displayMember:'name',
                dataSource: [{
                    id: 100,
                    name:'易嘉人'
                }],
                width: 300
            },{
                name: 'isTips',
                title: '是否显示弹框',
                type: 'object',
                component: 'Radio',
                bindField: 'createVersion.isTips',
                valueMember: 'id',
                displayMember: 'name',
                required: true,
                dataSource: [{
                  name: '不显示',
                  id: 0
                },{
                  name: '显示',
                  id: 1
                }],
                height: 45,
                width: 300
            },{
                name: 'versionTitle',
                title: '版本重要提示',
                component: 'Input',
                visible: true,
                type: 'textarea',
                required: true,
                bindField: 'createVersion.versionTitle',
                maxlength: 500,
                width: 300
            }/*,{
                name: 'versionContent',
                title: '版本更新说明',
                type: 'textarea',
                component: 'Input',
                bindField: 'createVersion.versionContent',
                valueMember:'id',
                displayMember:'name',
                required: true,
                maxlength: 1000,
                dataSource: [],
                width: 300
            }*//*,{
                name: 'versionContent',
                title: '版本更新说明',
                // type: 'Grid',
                component: 'Grid',
                enableMouseMoveEvent: true,
                disabled:false,
                enableSequenceColumn:false,
                bindField: 'createVersion.versionContentList',
                rowHeight:30,
                headerHeight:0,
                // valueMember:'id',
                // displayMember:'name',
                required: true,
                // maxlength: 1000,
                // dataSource: [],
                width: 300,
                childrens: [{
                  name:'amount',
                  title: '详细信息',
                  component:'Input',
                  bindField: 'createVersion.versionContentList.{0}.item',
                  flexGrow:1,
                  maxlength: 200
                }]
            }*/]
        }]
    },{
        name: 'classEdit',
        component: 'Form',
        childrens: [{
            name: 'formItems',
            component: 'FormItems',
            childrens: [{
                name: 'imgName',
                title: 'banner图',
                type: 'object',
                component: 'Radio',
                bindField: 'classEdit.imgName',
                valueMember: 'id',
                displayMember: 'name',
                required: true,
                dataSource: [{
                  name: 'banner-zeng',
                  id: 0
                },{
                  name: 'banner-xiaoFang',
                  id: 1
                }],
                height: 45,
                width: 300
            },{
                name: 'classDate',
                title: '开课时间',
                type: 'string',
                showLabel: true,
                component: 'DatePicker',
                placeholder: '请输入开课时间',
                bindField: 'classEdit.classDate',
                allowClear: true,
                required: true,
                height: 45,
                width: 300
            },{
                name: 'teacherName',
                title: '讲师名字',
                type: 'string',
                displayComponent: 'Input',
                placeholder: '请输入讲师名字',
                bindField: 'classEdit.teacherName',
                required: true,
                height: 45,
                width: 300
            },{
                name: 'teacherIntruduce',
                title: '讲师简介',
                component: 'Input',
                type: 'string',
                className: 'description',
                type: 'textarea',
                width: 300,
                height: 60,
                placeholder: '请在此输入讲师简介......',
                required: true,
                bindField: 'classEdit.teacherIntruduce',
                calendarContainerId: ''
            },{
                name: 'title',
                title: '标题',
                type: 'string',
                displayComponent: 'Input',
                placeholder: '请输入标题',
                bindField: 'classEdit.title',
                required: true,
                // regex: '^([0-9|a-z|/.]+)$',
                height: 45,
                width: 300
            },{
                name: 'content',
                title: '课题大纲',
                component: 'Input',
                type: 'string',
                className: 'description',
                type: 'textarea',
                width: 300,
                height: 60,
                placeholder: '请在此输入课题大纲......',
                required: true,
                bindField: 'classEdit.content',
                calendarContainerId: ''
            },{
                name: 'enrollUrl',
                title: '马上报名',
                type: 'string',
                displayComponent: 'Input',
                placeholder: '请输入马上报名链接地址',
                bindField: 'classEdit.enrollUrl',
                required: true,
                // regex: '^([0-9|a-z|/.]+)$',
                height: 45,
                width: 300
            }]
        }]
    },{
        name: 'liveInfo',
        component: 'Form',
        childrens: [{
            name: 'formItems',
            component: 'FormItems',
            childrens: [{
                name: 'isLive',
                title: '是否直播',
                type: 'object',
                component: 'Radio',
                bindField: 'liveInfo.isLiveObj',
                valueMember: 'id',
                displayMember: 'name',
                // required: true,
                dataSource: [{
                  name: '不直播',
                  id: 0
                },{
                  name: '直播',
                  id: 1
                }],
                height: 45,
                width: 300
            },{
                name: 'publishTime',
                title: '发布日期',
                type: 'string',
                showLabel: true,
                component: 'DatePicker',
                placeholder: '请输入版本发布日期',
                bindField: 'liveInfo.publishTime',
                allowClear: true,
                // required: true,
                height: 45,
                width: 300
            },{
                name: 'liveTime',
                title: '直播日期',
                type: 'string',
                showLabel: true,
                component: 'DatePicker',
                placeholder: '请输入版本直播日期',
                bindField: 'liveInfo.liveTime',
                allowClear: true,
                // required: true,
                height: 45,
                width: 300
            }]
        }]
    },{
        name: 'versionContent',
        title: '版本更新说明',
        // type: 'Grid',
        component: 'Grid',
        enableMouseMoveEvent: true,
        disabled:false,
        enableSequenceColumn:false,
        bindField: 'createVersion.versionContentList',
        rowHeight:30,
        headerHeight:0,
        // valueMember:'id',
        // displayMember:'name',
        required: true,
        // maxlength: 1000,
        // dataSource: [],
        width: 300,
        childrens: [{
            name:'item',
            title: '详细信息',
            component:'Input',
            displayComponent:'Input',
            regex: '^[\s\S]{0,80}$',
            bindField: 'createVersion.versionContentList.{0}.item',
            flexGrow:1,
            maxLength: 80
        }]
    },{
        name: 'searchOrg',
        component: 'Form',
        childrens: [{
            name: 'formItems',
            component: 'FormItems',
            childrens: [{
                name: 'orgName',
                title: '企业名称',
                type: 'string',
                showLabel: false,
                placeholder: '请输入企业名称查询',
                bindField: 'searchOrg.orgName',
                required: false,
                allChange:true,
                maxlength:100,
                validate: {
                    showTooltip: false,
                    rules: [{
                        required: true,
                        message: '不能为空'
                    }]
                },
                height: 45,
                after:'search',
                width: 200
            }]
        }]
    },{
        name:'Create',
            title:'性别：',
            bindField:'Create',
            component:'Radio',
            type:'object',
            valueMember:'id',
            displayMember:'name',
            dataSource:[{
                id:0,
                name:'创建企业'
            },{
                id:1,
                name:'创建代账机构'
            }]
    },{
        name:'createGroup',
        component: 'Form',
        childrens: [{
            name: 'formItems',
            component: 'FormItems',
            childrens: [{
                name: 'orgName',
                title: '集团名称',
                type: 'string',
                showLabel: true,
                placeholder: '请输入集团名称',
                bindField: 'createGroup.orgName',
                required: true,
                allChange:true,
                maxlength:100,
                validate: {
                    showTooltip: false,
                    rules: [{
                        required: true,
                        message: '不能为空'
                    }]
                },
                height: 45,
                width: 200
            },{
                name:'requiredOrgCount',
                title:'账套数量',
                bindField:'createGroup.requiredOrgCount',
                component:'Select',
                showLabel: true,
                required: true,
                type:'object',
                placeholder: '请选择',
                valueMember:'id',
                displayMember:'name',
                dataSource: [{
                    id:-1,
                    name:"0～10账套",
                    code:"0001"
                },{
                    id:1,
                    name:"0～19账套",
                    code:"0002"
                },{
                    id:2,
                    name:"0～29账套",
                    code:"0002"
                },{
                    id:3,
                    name:"0～50账套",
                    code:"0003"
                }],
                validate: {
                    rules: [{
                        required: true,
                        message: '请选择账套数量'
                    }]
                },
                dataSourceFetchMode: 0,
                height:45,
                width:200
            },{
                name:'industry',
                title:'所属行业',
                component:'Select',
                type:'object',
                required: true,
                showLabel: true,
                bindField: 'createGroup.industry',
                valueMember:'id',
                displayMember:'name',
                placeholder: '请选择',
                dataSource:[
                    {code: "0001", name: "工业", id: 1},
                    {code: "0002", name: "商贸", id: 2},
                    {code: "0003", name: "服务", id: 3},
                    {code: "0004", name: "信息技术", id: 4},
                    {code: "1005", name: "健康美容业", id: 1005},
                    {code: "1006", name: "餐饮业", id: 1006}
                ],
                dataSourceFetchMode: 0,
                validate: {
                    rules: [{
                        required: true,
                        message: '请选择行业'
                    }]
                },
                height:45,
                width:200
            },{
                name:'accountingStandards',
                title:'会计准则',
                component:'Select',
                type:'object',
                required: true,
                showLabel: true,
                bindField: 'createGroup.accountingStandards',
                visible:true,
                disabled:true,
                valueMember:'id',
                displayMember:'name',
                dataSource: [],
                dataSourceFetchMode: 0,
                validate: {
                    rules: [{
                        required: true,
                        message: '请输入企业名称'
                    }]
                },
                height:45,
                width:200
            },{
                name:'registeredAddress',
                title:'注册地址',
                component:'Select',
                type:'object',
                required: true,
                showLabel: true,
                placeholder: '请选择',
                bindField: 'createGroup.registeredAddress',
                valueMember:'code',
                displayMember:'name',
                dataSource:[],
                dataSourceFetchMode: 0,
                validate: {
                    rules: [{
                        required: true,
                        message: '请选择注册地址'
                    }]
                },
                height:45,
                width:200
            }]
        }]
    },{
        name:'enterprise',
        component: 'Form',
        childrens: [{
            name: 'formItems',
            component: 'FormItems',
            childrens: [{
                name: 'orgName',
                title: '企业名称',
                type: 'string',
                showLabel: true,
                placeholder: '请输入企业名称',
                bindField: 'enterprise.orgName',
                required: true,
                allChange:true,
                maxlength:100,
                validate: {
                    showTooltip: false,
                    rules: [{
                        required: true,
                        message: '不能为空'
                    }]
                },
                height: 45,
                width: 200
            },{
                name:'industry',
                title:'所属行业：',
                bindField:'enterprise.industry',
                component:'Select',
                type:'object',
                required: true,
                valueMember:'id',
                displayMember:'name',
                dataSource: [/*{
                        id:1,
                        name:'工业'
                    },{
                        id:2,
                        name:'商贸'
                    }
                    ,{
                        id:3,
                        name:'服务'
                    }
                    ,{
                        id:4,
                        name:'信息技术'
                    }*/
                    ],
                validate: {
                    showTooltip: false,
                    rules: [{
                        required: true,
                        message: '请选择您的所属行业'
                    }]
                },
                dataSourceFetchMode: 0,
                width:200
            },{
                name: 'registeredAddress',
                title: '注册地址',
                bindField: 'enterprise.registeredAddress',
                component: 'Select',
                type: 'object',
                width: 200,
                required: true,
                valueMember: 'code',
                displayMember: 'name',
                dataSource: {},
                dataSourceFetchMode: 0
            }, {
                name: 'selectVersion',  //幼教行业新增
                title: '选择版本',
                bindField: 'enterprise.selectVersion',
                component: 'Radio',
                required: true,
                displayMember: 'name',
                valueMember: 'id',
                visible: false,
                dataSource: [{
                    id: 1,
                    name: '不纳税'
                }, {
                    id: 2,
                    name: '纳税'
                }]
            }, {
                name:'statusOfTaxpayer',
                title:'纳税人身份',
                required:true,
                component:'Radio',
                className:'taxpayer',
                displayMember:'name',
                valueMember:'id',
                type:'object',
                bindField:'enterprise.statusOfTaxpayer',
                dataSource:[/*{
                    id:42,
                    name:'小规模纳税人'
                },{
                    id:41,
                    name:'一般纳税人'
                }*/]
            },{
                name:'enabledYear',
                title:'会计启用期间',
                type:'string',
                component:'DatePicker',
                format:"YYYY-MM",
                bindField:'enterprise.enabledYear',
                required:true,
                visible:false,
                validate: {
                    showTooltip:false,
                    rules: [{
                        required: true,
                        message: '会计启用期间不能为空'
                    }]
                },
                width:200
            }]
        }]
    },{
        name:'operationPlatform',
        component: 'Form',
        childrens: [{
            name: 'formItems',
            component: 'FormItems',
            childrens: [{
                name: 'orgName',
                title: '企业名称',
                type: 'string',
                showLabel: true,
                placeholder: '请输入企业名称',
                bindField: 'operationPlatform.orgName',
                // required: true,
                maxlength:100,
                validate: {
                    showTooltip: false,
                    rules: [{
                        required: true,
                        message: '企业名称不能为空'
                    }]
                },
                height: 45,
                width: 200
            },{
                name: 'phone',
                title: '手机号',
                type: 'string',
                showLabel: true,
                placeholder: '请输入手机号',
                bindField: 'operationPlatform.phone',
                maxlength:13,
                validate: {
                    showTooltip: false,
                    rules: [{
                        required: true,
                        message: '手机号不能为空'
                    },{
                      mobile:true,
                      message:'请输入正确格式的手机'
                    }]

                },
                height: 45,
                width: 200
            }]
        }]
    },{
        name:'dzAdministration',
        component: 'Form',
        childrens: [{
            name: 'formItems',
            component: 'FormItems',
            childrens: [{
                name: 'orgName',
                title: '企业名称',
                type: 'string',
                showLabel: true,
                placeholder: '请输入企业名称',
                bindField: 'dzAdministration.orgName',
                // required: true,
                maxlength:100,
                validate: {
                    showTooltip: false,
                    rules: [{
                        required: true,
                        message: '企业名称不能为空'
                    }]
                },
                height: 45,
                width: 200
            },{
                name: 'phone',
                title: '手机号',
                type: 'string',
                showLabel: true,
                placeholder: '请输入手机号',
                bindField: 'dzAdministration.phone',
                maxlength:13,
                validate: {
                    showTooltip: false,
                    rules: [{
                        required: true,
                        message: '手机号不能为空'
                    },{
                      mobile:true,
                      message:'请输入正确格式的手机'
                    }]

                },
                height: 45,
                width: 200
            }]
        }]
    },{
        name:'userInfo',
        component: 'Form',
        childrens: [{
            name: 'formItems',
            component: 'FormItems',
            childrens: [{
                name: 'startTime',
                title: '开始时间',
                component: 'DatePicker',
                showLabel: true,
                bindField: 'userInfo.from.beginDate',
                height: 45,
                width: 110
            },{
                name: 'endTime',
                title: '结束时间',
                component: 'DatePicker',
                showLabel: true,
                // disabledDate:{
                //     minDisabledDate:moment().format('YYYY-MM-DD')
                // },
                bindField: 'userInfo.from.endDate',
                height: 45,
                width: 110
            },{
                name: 'orgName',
                title: '企业名称',
                type: 'string',
                showLabel: true,
                placeholder: '请输入企业名称',
                bindField: 'userInfo.from.orgName',
                maxlength:20,
                validate: {
                    showTooltip: false,
                    rules: [{
                        required: true,
                        message: '企业名称不能为空'
                    }]
                },
                height: 45,
                width: 150
            },{
                name: 'phone',
                title: '手机号',
                type: 'string',
                showLabel: true,
                maxlength:13,
                placeholder: '请输入手机号',
                bindField: 'userInfo.from.mobile',
                validate: {
                    showTooltip: false,
                    rules: [{
                        required: true,
                        message: '手机号不能为空'
                    },{
                      mobile:true,
                      message:'请输入正确格式的手机'
                    }]

                },
                height: 45,
                width: 100
            },{
              name: 'appId',
              title: '伙伴',
              component:'Select',
              type:'object',
              required: false,
              valueMember:'id',
              displayMember:'name',
              dataSource: [],
              bindField:'userInfo.from.appId',
              dataSourceFetchMode: 0,
              width:120,
              height:26
            }]
        }]
    },{
        name:'orgAnalyze',
        component: 'Form',
        childrens:[{
            name: 'formItems',
            component: 'FormItems',
            childrens:[{
                name: 'startTime',
                title: '开始时间',
                component: 'DatePicker',
                showLabel: true,
                bindField: 'orgAnalyze.from.beginDate',
                height: 45,
                width: 110
            },{
                name: 'endTime',
                title: '结束时间',
                component: 'DatePicker',
                showLabel: true,
                bindField: 'orgAnalyze.from.endDate',
                height: 45,
                width: 110
            },{
              name: 'appId',
              title: '伙伴',
              component:'Select',
              type:'object',
              required: false,
              valueMember:'id',
              displayMember:'name',
              dataSource: [],
              bindField:'orgAnalyze.from.appId',
              dataSourceFetchMode: 0,
              width:150,
              height:26
            }/*,{
                name: 'userFrom',
                title: '用户来源',
                component:'Select',
                type:'object',
                required: false,
                valueMember:'id',
                displayMember:'name',
                dataSource: [{
                    id: 1,
                    name: '代账版'
                },{
                    id: 2,
                    name: '企业版'
                }],
                bindField:'orgAnalyze.from.userFrom',
                dataSourceFetchMode: 0,
                width:150,
                height:26
              }*/]
        }]
    },{
        name:'userAnalyze',
        component: 'Form',
        childrens:[{
            name: 'formItems',
            component: 'FormItems',
            childrens:[{
                name: 'startTime',
                title: '开始时间',
                component: 'DatePicker',
                showLabel: true,
                bindField: 'userAnalyze.from.beginDate',
                height: 45,
                width: 110
            },{
                name: 'endTime',
                title: '结束时间',
                component: 'DatePicker',
                showLabel: true,
                bindField: 'userAnalyze.from.endDate',
                height: 45,
                width: 110
            },{
              name: 'appId',
              title: '伙伴',
              component:'Select',
              type:'object',
              required: false,
              valueMember:'id',
              displayMember:'name',
              dataSource: [],
              bindField:'userAnalyze.from.appId',
              dataSourceFetchMode: 0,
              width:150,
              height:26
            }/*,{
                name: 'userFrom',
                title: '企业来源',
                component:'Select',
                type:'object',
                required: false,
                valueMember:'id',
                displayMember:'name',
                dataSource: [{
                    id: 1,
                    name: '代账版'
                },{
                    id: 2,
                    name: '企业版'
                }],
                bindField:'userAnalyze.from.userFrom',
                dataSourceFetchMode: 0,
                width:150,
                height:26
              }*/]
        }]
    },{
        name:'userTaxManage',
        component: 'Form',
        childrens:[{
            name: 'formItems',
            component: 'FormItems',
            childrens:[{
                name: 'startTime',
                title: '开始时间',
                component: 'DatePicker',
                showLabel: true,
                bindField: 'userTaxManage.from.beginDate',
                height: 45,
                width: 110
            },{
                name: 'endTime',
                title: '结束时间',
                component: 'DatePicker',
                showLabel: true,
                bindField: 'userTaxManage.from.endDate',
                height: 45,
                width: 110
            },{
              name: 'appId',
              title: '伙伴',
              component:'Select',
              type:'object',
              required: false,
              valueMember:'id',
              displayMember:'name',
              dataSource: [],
              bindField:'userTaxManage.from.appId',
              dataSourceFetchMode: 0,
              width:150,
              height:26
            }]
        }]
    },{
        name:'orgTaxManage',
        component: 'Form',
        childrens:[{
            name: 'formItems',
            component: 'FormItems',
            childrens:[{
                name: 'startTime',
                title: '开始时间',
                component: 'DatePicker',
                showLabel: true,
                bindField: 'orgTaxManage.from.beginDate',
                height: 45,
                width: 110
            },{
                name: 'endTime',
                title: '结束时间',
                component: 'DatePicker',
                showLabel: true,
                bindField: 'orgTaxManage.from.endDate',
                height: 45,
                width: 110
            },{
              name: 'appId',
              title: '伙伴',
              component:'Select',
              type:'object',
              required: false,
              valueMember:'id',
              displayMember:'name',
              dataSource: [],
              bindField:'orgTaxManage.from.appId',
              dataSourceFetchMode: 0,
              width:150,
              height:26
            }]
        }]
    },{
        name: 'createHomeInfo',
        title: '消息管理',
        bindField: 'createHomeInfo.createHomeInfoData',
        component: 'MatrixEditor',
        rowHeight: 30,
        enableSum: true,
        enableSequenceColumn: true,
        childrens: [{
            name: 'title',
            title: '标题',
            type: 'string',
            showLabel: false,
            width: 240,
            flexGrow: 1,
            placeholder:'标题',
            maxlength: 100,
            bindField: 'createHomeInfo.createHomeInfoData.{0}.title'
        },{
            name: 'address',
            title: '链接地址',
            type: 'string',
            showLabel: false,
            width: 240,
            flexGrow: 1,
            placeholder: '链接地址',
            maxlength: 150,
            bindField: 'createHomeInfo.createHomeInfoData.{0}.address'
        }]
    },{
        name:'createBigNews',
        component: 'Form',
        childrens:[{
            name: 'formItems',
            component: 'FormItems',
            childrens:[{
                name: 'title',
                title: '标题',
                type: 'string',
                showLabel: true,
                required: true,
                width: 300,
                maxlength: 100,
                placeholder:'请在这里输入标题',
                bindField: 'createBigNews.createBigNewsData.title'
            },{
                name: 'author',
                title: '作者',
                type: 'string',
                showLabel: true,
                width: 300,
                placeholder: '作者',
                required: true,
                maxlength: 30,
                bindField: 'createBigNews.createBigNewsData.author'
            },{
                name: 'type',
                type: 'object',
                title: '类型',
                bindField: 'createBigNews.createBigNewsData.type',
                component: 'Radio',
                showLabel: true,
                required: true,
                valueMember: 'id',
                displayMember: 'name',
                className:'typeRadio',
                dataSource: [{
                    id: 1, name: '财税头条'
                }, {
                    id: 2, name: '财政解读'
                }]
            },{
                name: 'digest',
                title: '摘要',
                component: 'Input',
                type: 'string',
                className: 'description',
                type: 'textarea',
                showLabel: true,
                required: true,
                width: 300,
                height: 60,
                maxlength: 200,
                placeholder: '请编辑文章摘要',
                bindField: 'createBigNews.createBigNewsData.digest',
                calendarContainerId: ''
            },{
                name: 'address',
                title: '文章链接',
                type: 'string',
                displayComponent: 'Input',
                placeholder: '文章链接',
                showLabel: true,
                required: true,
                maxlength: 150,
                bindField: 'createBigNews.createBigNewsData.address',
                width: 300
            }]
        }]
    },{
        name:'createPartnerPlan',
        component: 'Form',
        childrens:[{
            name: 'formItems',
            component: 'FormItems',
            childrens:[{
                name: 'createTime',
                title: '签约日期',
                component: 'DatePicker',
                showLabel: true,
                //required: true,
                bindField: 'partnerPlan.createPartnerData.createTime',
                width: 240
            },{
                name: 'name',
                title: '姓名',
                type: 'string',
                width: 240,
                showLabel: true,
                required: true,
                placeholder:'姓名',
                maxlength: 20,
                bindField: 'partnerPlan.createPartnerData.name'
            },{
                name: 'phoneNumber',
                title: '联系电话',
                type: 'string',
                showLabel: true ,
                required: true,
                width: 240,
                placeholder: '联系电话',
                maxlength: 11,
                bindField: 'partnerPlan.createPartnerData.phoneNumber'
            },{
                name: 'email',
                title: '联系邮箱',
                type: 'string',
                showLabel: true ,
                required: true,
                width: 240,
                placeholder: '联系邮箱',
                maxlength: 50,
                bindField: 'partnerPlan.createPartnerData.email'
            },{
                name: 'companyName',
                title: '公司全称',
                type: 'string',
                displayComponent: 'Input',
                placeholder: '公司全称',
                showLabel: true,
                required: true,
                maxlength: 100,
                bindField: 'partnerPlan.createPartnerData.companyName',
                width: 560
            },{
                name: 'province',
                title: '所在地区',
                component: 'Select',
                type:'object',
                valueMember:'code',
                displayMember:'name',
                dataSource: [],
                showLabel: true,
                className: 'province',
                required: true,
                bindField: 'partnerPlan.createPartnerData.province',
                dataSourceFetchMode: 0,
                width: 110
            },{
                name: 'city',
                title: '市',
                component: 'Select',
                type:'object',
                valueMember:'code',
                displayMember:'name',
                required: true,
                dataSource: [],
                showLabel: false,
                className: 'city',
                bindField: 'partnerPlan.createPartnerData.city',
                dataSourceFetchMode: 0,
                width: 125
            },{
                name: 'address',
                title: '详细地址',
                type: 'string',
                displayComponent: 'Input',
                placeholder: '详细地址',
                showLabel: false,
                //required: true,
                maxlength: 100,
                className: 'address',
                bindField: 'partnerPlan.createPartnerData.address',
                width: 315
            },{
                name: 'employeeNum',
                title: '员工人数',
                component: 'Select',
                type:'object',
                valueMember:'id',
                displayMember:'name',
                //required: true,
                dataSource: [],
                showLabel: true,
                bindField: 'partnerPlan.createPartnerData.employeeNum',
                dataSourceFetchMode: 0,
                width: 240
            },{
                name: 'type',
                title: '伙伴类型',
                component: 'Select',
                type:'object',
                valueMember:'id',
                displayMember:'name',
                //required: true,
                dataSource: [],
                showLabel: true,
                bindField: 'partnerPlan.createPartnerData.type',
                dataSourceFetchMode: 0,
                width: 240
            },{
                name: 'serviceContent',
                title: '服务内容',
                type: 'string',
                displayComponent: 'Input',
                placeholder: '服务内容',
                showLabel: true,
                required: true,
                maxlength: 200,
                bindField: 'partnerPlan.createPartnerData.serviceContent',
                width: 240
            },{
                name: 'serviceScope',
                title: '服务领域',
                type: 'string',
                displayComponent: 'Input',
                placeholder: '服务领域',
                showLabel: true,
                required: true,
                maxlength: 200,
                bindField: 'partnerPlan.createPartnerData.serviceScope',
                width: 240
            },{
                name: 'businessIntroduction',
                title: '业务介绍',
                component: 'Input',
                type: 'string',
                type: 'textarea',
                showLabel: true,
                required: true,
                width: 240,
                className:'businessIntroduction',
                placeholder: '业务介绍',
                maxlength: 1000,
                bindField: 'partnerPlan.createPartnerData.businessIntroduction',
                calendarContainerId: ''
            },{
                name: 'comment',
                title: '跟踪信息',
                component: 'Input',
                type: 'string',
                type: 'textarea',
                showLabel: true,
                width: 240,
                className:'businessIntroduction',
                placeholder: '请编辑跟踪信息',
                maxlength: 1000,
                bindField: 'partnerPlan.createPartnerData.comment',
                calendarContainerId: ''
            }]
        }]
    },{
        name:'partnerPlan',
        component: 'Form',
        childrens:[{
            name: 'formItems',
            component: 'FormItems',
            childrens:[{
                name: 'partnerPlanStatus',
                title: '状态',
                component: 'Select',
                type:'object',
                valueMember:'id',
                displayMember:'name',
                dataSource: [
                    {id:'0',name:'全部'},
                    {id:'1',name:'已签约'},
                    {id:'2',name:'待跟踪'},
                ],
                showLabel: true,
                bindField: 'partnerPlan.from.partnerPlanStatus',
                dataSourceFetchMode: 0,
                height: 26,
                width: 150
            }]
        }]
    },{
       name:'organizationalInfo',
       childrens:[{
         component: 'Form',
         name:'top',
         childrens: [{
             name: 'formItems',
             component: 'FormItems',
             childrens: [{
                 name: 'beginExpireTime',
                 title: '开始截止日期',
                 component: 'DatePicker',
                 showLabel: true,
                 bindField: 'organizationalInfo.from.beginExpireTime',
                 height: 45,
                 width: 110
             },{
                name: 'endExpireTime',
                title: '结束截止日期',
                component: 'DatePicker',
                showLabel: true,
                bindField: 'organizationalInfo.from.endExpireTime',
                height: 45,
                width: 110
            },{
                 name: 'startTime',
                 title: '开始时间',
                 component: 'DatePicker',
                 showLabel: true,
                 bindField: 'organizationalInfo.from.beginDate',
                 height: 45,
                 width: 110
             },{
                 name: 'endTime',
                 title: '结束时间',
                 component: 'DatePicker',
                 showLabel: true,
                 // disabledDate:{},
                 bindField: 'organizationalInfo.from.endDate',
                 height: 45,
                 width: 110
             },{
                 name: 'orgName',
                 title: '企业名称',
                 type: 'string',
                 showLabel: true,
                 placeholder: '请输入企业名称',
                 bindField: 'organizationalInfo.from.orgName',
                 maxlength:100,
                 validate: {
                     showTooltip: false,
                     rules: [{
                         required: true,
                         message: '企业名称不能为空'
                     }]
                 },
                 height: 45,
                 width: 200
             }]
         }]
       },{
         component: 'Form',
         name:'bottom',
         childrens: [{
             name: 'formItems',
             component: 'FormItems',
             childrens: [{
                name: 'phone',
                title: '手机号',
                type: 'string',
                showLabel: true,
                maxlength:13,
                placeholder: '请输入手机号',
                bindField: 'organizationalInfo.from.mobile',
                validate: {
                    showTooltip: false,
                    rules: [{
                        required: true,
                        message: '手机号不能为空'
                    },{
                      mobile:true,
                      message:'请输入正确格式的手机'
                    }]
    
                },
                height: 45,
                width: 100
            },{
               name: 'vatTaxpayer',
               title: '纳税人身份',
               component:'Select',
               type:'object',
               required: false,
               valueMember:'id',
               displayMember:'name',
               dataSource: [{
                   id:'-1',
                   name:'全部'
               },{
                   id:42,
                   name:'小规模纳税人'
               },{
                   id:41,
                   name:'一般纳税人'
               }],
               bindField:'organizationalInfo.from.vatTaxpayer',
               dataSourceFetchMode: 0,
               width:110,
               height:26
           },{
                name: 'source',
                title: '企业来源',
                component:'Select',
                type:'object',
                required: false,
                valueMember:'id',
                displayMember:'name',
                dataSource: [{
                    id:-1,
                    name:'全部'
                },{
                    id:1,
                    name:'代账端'
                },{
                    id:2,
                    name:'企业端'
                }],
                bindField:'organizationalInfo.source',
                dataSourceFetchMode: 0,
                width: 100,
                height:26
             },{
                name: 'registeredAddress',
                title: '地区',
                component: 'Select',
                type: 'object',
                required: false,
                valueMember: 'code',
                displayMember: 'name',
                dataSource: [],
                bindField: 'organizationalInfo.from.registeredAddress',
                dataSourceFetchMode: 0,
                width: 100,
                height: 26
             },{
                name: 'appId',
                title: '伙伴',
                component:'Select',
                type:'object',
                required: false,
                valueMember:'id',
                displayMember:'name',
                dataSource: [],
                className:'organizationalInfo-appId',
                bindField:'organizationalInfo.appId',
                dataSourceFetchMode: 0,
                width: 100,
                height:26
             },{
              name: 'version',
              title: '版本',
              component:'Select',
              type:'object',
              className:'version',
              required: false,
              valueMember:'id',
              displayMember:'name',
              dataSource: [{
                id:8888,
                name:'全部'
              },
              /*{
                  id:0,
                  name:'测试版'
              },{
                  id:1,
                  name:'试用版'
              },*/
              {
                  id:2,
                  name:'软件版'
              },{
                  id:3,
                  name:'服务版'
              }],
              bindField:'organizationalInfo.from.version',
              dataSourceFetchMode: 0,
              width: 80,
              height:26
             }]
         }]
       },{
        component: 'Form',
        name:'end',
        childrens: [{
            name: 'formItems',
            component: 'FormItems',
            childrens: [{
               name: 'orgStatus',
               title: '状态',
               component:'Select',
               type:'object',
               className:'version',
               required: false,
               valueMember:'id',
               displayMember:'name',
               dataSource: [{
                   id: -1,
                   name: '全部'
               }, {
                   id: 1,
                   name: '试用'
               }, {
                   id: 2,
                   name: '正式'
               }, {
                   id: 3,
                   name: '过期'
               }, {
                   id: 4,
                   name: '认证已通过待购买'
               }, {
                   id: 5,
                   name: '认证审核中'
               }, {
                   id: 6,
                   name: '认证未通过'
               }, {
                   id: 7,
                   name: '待认证'
               }],
               bindField:'organizationalInfo.from.orgStatus',
               dataSourceFetchMode: 0,
               width:100,
               height:26
              },{
                    name: 'industry',
                    title: '所属行业',
                    component: 'Select',
                    type: 'object',
                    maxlength: 20,
                    showLabel: true,
                    required: false,
                    valueMember: 'id',
                    dataSource: [{
                        id:-1,
                        name:'全部'
                    },{
                       id:1,
                       name:'工业'
                    },{
                       id: 2,
                       name: '商贸'
                   }, {
                       id: 3,
                       name: '服务'
                    }, {
                        id: 4,
                        name: '信息技术'
                    },{
                        id:1005,
                        name:'健康美容业'
                    },{
                        id:1006,
                        name:'餐饮业'
                    }, {
                       id: 1007,
                       name: '幼教'
                    },{
                       id: 1008,
                       name: '侓师事务所'
                    },{
                       id: 1009,
                       name: '房地产'
                    }],
                    dataSourceFetchMode: 0,
                    displayMember: 'name',
                    disabled: false,
                    bindField: 'organizationalInfo.from.industry',
                    width: 130,
              }]
            }]
        }]
    },{
      name:'dzInfo',
      component: 'Form',
      childrens: [{
           name: 'formItems',
           component: 'FormItems',
           childrens: [{
               name: 'startTime',
               title: '开始时间',
               component: 'DatePicker',
               showLabel: true,
               bindField: 'dzInfo.from.beginDate',
               height: 45,
               width: 110
           },{
               name: 'endTime',
               title: '结束时间',
               component: 'DatePicker',
               showLabel: true,
               // disabledDate:{},
               bindField: 'dzInfo.from.endDate',
               height: 45,
               width: 110
           },{
               name: 'orgName',
               title: '服务商名称',
               type: 'string',
               showLabel: true,
               placeholder: '请输入服务商名称',
               bindField: 'dzInfo.from.orgName',
               maxlength:100,
               validate: {
                   showTooltip: false,
                   rules: [{
                       required: true,
                       message: '服务商名称不能为空'
                   }]
               },
               height: 45,
               width: 200
           },{
               name: 'phone',
               title: '手机号',
               type: 'string',
               showLabel: true,
               maxlength:13,
               placeholder: '请输入手机号',
               bindField: 'dzInfo.from.mobile',
               validate: {
                   showTooltip: false,
                   rules: [{
                       required: true,
                       message: '手机号不能为空'
                   },{
                     mobile:true,
                     message:'请输入正确格式的手机'
                   }]

               },
               height: 45,
               width: 100
           },{
            name: 'status',
            title: '审核状态',
            component:'Select',
            type:'object',
            className:'version',
            required: false,
            valueMember:'id',
            displayMember:'name',
            dataSource: [{
              id:'-1',
              name:'全部'
            },
            {
                id:'0',
                name:'待审核'
            },{
                id:'1',
                name:'已通过'
            }],
            bindField:'dzInfo.from.status',
            dataSourceFetchMode: 0,
            width:70,
            height:26
           }]
       }]
    },{
      name:'farenw',
      component: 'Form',
      childrens: [{
           name: 'formItems',
           component: 'FormItems',
           childrens: [{
               name: 'code',
               placeholder:'会员账号',
               component: 'Input',
               showLabel: true,
               bindField: 'farenw.from.code',
               height: 45,
               width: 150
           },{
               name: 'mobile',
               placeholder:'绑定易嘉账号',
               component: 'Input',
               showLabel: true,
               // disabledDate:{},
               bindField: 'farenw.from.mobile',
               height: 45,
               width: 150
           },{
            name: 'status',
            title: '绑定状态',
            component:'Select',
            type:'object',
            className:'version',
            required: false,
            valueMember:'id',
            displayMember:'name',
            dataSource: [{
              id:0,
              name:'全部'
            },
            {
                id:1,
                name:'未绑定'
            },{
                id:2,
                name:'已绑定'
            }],
            bindField:'farenw.from.status',
            dataSourceFetchMode: 0,
            width:120,
            height:26
           }]
       }]
    }, {
      name: 'orderList',
      component: 'Grid',
      bindField: 'myorder.orderList',
      disabled: false,
      childrens: [{
          name: 'orderItem',
          title: '贷方金额',
          type: 'string',
          className:'orderItemCell',
          // displayComponent: 'OrderItem',
          // component: 'OrderItem',
          disabled: true,
          bindField: 'myorder.orderList.{0}.orderItem'
      }]
    },{
      name: 'orderManageList',
      component: 'Grid',
      rowHeight:30,
      headerHeight:30,
      disabled:true,
      enableSum: false,
      enableSequenceColumn: false,
      bindField: 'orderManageList',
      childrens: [{
          name: 'orgName',
          title:'组织名称',
          width: 150,
          type: 'string',
          // displayComponent:'',
          textAlign:'center',
          bindField: 'orderManageList.{0}.orgName'
      },{
          name:'name',
          title:'手机号',
          textAlign:'center',
          type: 'string',
          // displayComponent:'',
          flexGrow:1,
          bindField: 'orderManageList.{0}.phone'
      }]
    },{
        name:'invitationCodeAdministration',
        component: 'Form',
        childrens:[{
            name: 'formItems',
            component: 'FormItems',
            childrens:[{
                name: 'beginTime',
                title: '开始时间',
                component: 'DatePicker',
                showLabel: true,
                bindField: 'invitationCodeAdministration.from.beginTime',
                height: 45,
                width: 110
            },{
                name: 'endTime',
                title: '结束时间',
                component: 'DatePicker',
                showLabel: true,
                bindField: 'invitationCodeAdministration.from.endTime',
                height: 45,
                width: 110
            },{
                name: 'status',
                title: '邀请码状态',
                component:'Select',
                type:'object',
                required: false,
                valueMember:'id',
                displayMember:'name',
                dataSource: [{
                    id: '2',
                    name: '全部'
                },{
                    id: '1',
                    name: '已激活'
                },{
                    id: '0',
                    name: '未激活'
                }],
                bindField:'invitationCodeAdministration.from.status',
                dataSourceFetchMode: 0,
                width:100,
                height:26
            }]
        }]
    },{
        name:'lastCreate',
        component: 'Form',
        childrens:[{
            name: 'formItems',
            component: 'FormItems',
            childrens:[{
                name:'accountingStandards',
                title:'企业会计准则',
                bindField:'lastCreate.accountingStandards',
                type: 'object',
                component: 'Radio',
                valueMember: 'id',
                displayMember: 'name',
                className: 'w550',
                required: false,
                dataSource: [],
                height: 45,
                width: 150
                /* component:'Select',
                type:'object',
                className:'w550',
                width:200,
                required: true,
                visible:false,
                valueMember:'id',
                displayMember:'name',
                dataSource: [],
                validate: {
                    showTooltip: false,
                    rules: [{
                        required: true,
                        message: '请选择您的企业会计准则'
                    }]
                },
                dataSourceFetchMode: 0 */
            },{
                name:'enabledYear',
                title:'会计启用期间',
                type:'string',
                component:'MonthPicker',
                format:"YYYY-MM",
                bindField:'lastCreate.enabledYear',
                required:true,
                visible:false,
                validate: {
                    showTooltip:false,
                    rules: [{
                        required: true,
                        message: '会计启用期间不能为空'
                    }]
                },
                width:200
            }]
        }]
    },{
        name: 'operationList',
        component: 'Grid',
        bindField: 'operationList',
        rowHeight: 32,
        headerHeight: 32,
        disabled: true,
        enableSum: false,
        enableSequenceColumn: false,
        className: 'operationGrid',
        childrens: [{
           name: 'select',
           title: '选',
           type: 'bool',
           isSelectColumn: true,
           disabled: false,
           bindField: 'operationList.{0}.select',
           width: 30
        },{
           name: 'phone',
           title: '手机号',
           bindField: 'operationList.{0}.phone',
           type: 'string',
           textAlign: 'left',
           flexGrow: 1
        },{
           name: 'user',
           title: '用户名称',
           bindField: 'operationList.{0}.user',
           type: 'string',
           // className:'contract',
           textAlign: 'left',
           flexGrow: 1
        },{
            name: 'friend',
            title: '伙伴名称',
            bindField: 'operationList.{0}.friend',
            type: 'string',
            textAlign: 'right',
            flexGrow: 1
        },{
          name: 'role',
          title: '角色',
          bindField: 'operationList.{0}.role',
          type: 'string',
          textAlign: 'right',
          flexGrow: 1
        }]
    },{
       name: 'paging',
       component: 'Pagination',
       bindField: 'paging',
       pageSizeOptions: ['20', '50', '100', '200']
    },{
        name:'updatePassword',
        component:'Form',
        childrens:[{
            name:'formItems',
            component:'FormItems',
            childrens:[
            {
            	name:'oldPassword',
            	title:'',
            	type:'string',
            	component:'Password',
                placeholder:'请输入旧密码',
            	bindField:'updatePasswordForm.form.oldPassword',
                className: 'passwordItem',
            	validate:{
            		showTooltip:true,  //提示信息浮层是否显示
            		placement:'right',  //提示图层的显示位置
            		showIcon:true,  //提示图层图标默认显示
            		rules:[{
            			required:true,
            			message:'密码不能为空'
            		}]
            	},
            	width:236
            },{
                name:'newPassWord',
                title:'',
                type:'string',
                component:'Password',
                bindField:'updatePasswordForm.form.newPassword',
                placeholder:'请输入密码(6-20位至少包含一个字母和一个数字)',
                // after:'passwordDegree',
                className: 'passwordItem',
                validate:{
                    showTooltip:true,
                    placement:'right',
                    showIcon:true,
                    rules:[{
                        required:true,
                        message:'密码不能为空'
                    },{
                        regex:'(?=^.{6,20}$)((?=.*[a-zA-Z]){1})((?=.*[0-9]){1})',
                        message: '6-20位至少包含一个字母和一个数字'
                    }]
                },
                width:236
            },{
                name:'againNewPassword',
                title:'',
                type:'string',
                component:'Password',
                placeholder:'请再次输入密码',
                bindField:'updatePasswordForm.form.againNewPassword',
                className: 'passwordItem',
                validate:{
                    showTooltip:true,
                    placement:'right',
                    showIcon:true,
                    rules:[{
                        required:true,
                        message:'密码不能为空'
                    }]
                },
                width:236
            }]
        }]

    },{
        name: 'leftTree',
        component: 'Tree',
        bindField: 'leftTree',
        checkedKeysPath: 'deptCheckedKeys',
        selectedKeysPath: 'deptSelectedKeys',
        expandedKeysPath:'deptExpandedKeys',
        displayMember: 'name',
        valueMember: 'id',
        childrenMember: 'subDepts',
        checkable: false,
        showLine: true,
        defaultExpandAll: true
    },{
        name: 'invitateCodeGrid',
        component: 'Grid',
        bindField: 'inviteCode.ajaxData',
        enableSequenceColumn: false,
        childrens: [
            {
                name: 'select',
                title:'',
                width: 30,
                type: 'bool',
                // displayComponent:'',
                textAlign:'center',
                isSelectColumn: true,
                bindField: 'inviteCode.ajaxData.{0}.select'
            },{
                name: 'rindex',
                title:'序号',
                width: 50,
                type: 'string',
                // displayComponent:'',
                textAlign:'center',
                disabled: true,
                bindField: 'inviteCode.ajaxData.{0}.rindex'
            },{
                name: 'operate',
                title:'操作',
                // disabled: true,
                width: 150,
                type: 'string',
                displayComponent:'Link',
                textAlign:'center',
                bindField: 'inviteCode.ajaxData.{0}.operate'
            },{
                name: 'regCode',
                title:'邀请码',
                disabled: true,
                width: 150,
                type: 'string',
                // displayComponent:'',
                enableEllipsis: true,
                textAlign:'left',
                bindField: 'inviteCode.ajaxData.{0}.regCode'
            },{
                name: 'createTime',
                title:'导入客户日期',
                disabled: true,
                width: 150,
                type: 'string',
                // displayComponent:'',
                textAlign:'center',
                enableEllipsis: true,
                bindField: 'inviteCode.ajaxData.{0}.createTime'
            },{
                name: 'mobile',
                title:'激活手机号',
                disabled: true,
                width: 150,
                type: 'string',
                // displayComponent:'',
                textAlign:'center',
                enableEllipsis: true,
                bindField: 'inviteCode.ajaxData.{0}.mobile'
            },{
                name: 'discountPrice',
                title:'优惠金额',
                disabled: true,
                width: 150,
                type: 'string',
                // displayComponent:'',
                textAlign:'right',
                enableEllipsis: true,
                bindField: 'inviteCode.ajaxData.{0}.discountPrice'
            },{
                name: 'orgName',
                title:'企业名称',
                disabled: true,
                width: 150,
                type: 'string',
                // displayComponent:'',
                textAlign:'left',
                enableEllipsis: true,
                bindField: 'inviteCode.ajaxData.{0}.orgName'
            },{
                name: 'responsibleAccountant',
                title:'管理会计',
                disabled: true,
                width: 150,
                type: 'string',
                // displayComponent:'',
                textAlign:'left',
                enableEllipsis: true,
                bindField: 'inviteCode.ajaxData.{0}.responsibleAccountant'
            },{
                name: 'yjrAccountant',
                title:'易嘉人会计',
                disabled: true,
                width: 150,
                type: 'string',
                // displayComponent:'',
                textAlign:'left',
                enableEllipsis: true,
                bindField: 'inviteCode.ajaxData.{0}.yjrAccountant'
            },{
                name: 'industryName',
                title:'行业',
                disabled: true,
                width: 150,
                type: 'string',
                filter:{
                      type:'select',
                      style:{width:'182px'},
                      valuePath:'form.services',
                      className:"industry",
                      selectValue:'-1',
                      dataSource:
                        [{
                            id: '-1',
                            name: '行业'
                        },{
                            id: '1',
                            name: '工业'
                        },{
                            id: '2',
                            name: '商贸'
                        },{
                            id: '3',
                            name: '服务'
                        },{
                            id: '4',
                            name: '信息技术'
                        },{
                            id: '1005',
                            name: '健康美容业'
                        },{
                            id: '1006',
                            name: '餐饮业'
                        }, {
                            id: '1007',
                            name: '幼教'
                        }]
                },
                textAlign:'left',
                showTips: true,
                flexGrow: 2,
                bindField: 'inviteCode.ajaxData.{0}.industryName'
            },{
                name:'registeredAddress',
                title:'地区',
                width:150,
                type:'string',
                textAlign:'left',
                enableEllipsis: true,
                bindField:'inviteCode.ajaxData.{0}.registeredAddress'
            },{
                name: 'enableDuring',
                title:'启用期间',
                disabled: true,
                width: 150,
                type: 'string',
                // displayComponent:'',
                textAlign:'center',
                enableEllipsis: true,
                bindField: 'inviteCode.ajaxData.{0}.enableDuring'
            },{
                name: 'useTime',
                title:'激活时间',
                width: 150,
                disabled: true,
                type: 'string',
                // displayComponent:'',
                textAlign:'center',
                enableEllipsis: true,
                bindField: 'inviteCode.ajaxData.{0}.useTime'
            },{
                name: 'statusStr',
                title:'邀请码状态',
                width: 150,
                disabled: true,
                type: 'string',
                filter:{
                      type:'select',
                      style:{width:'182px'},
                      valuePath:'form.services',
                      className:'statusStr',
                      selectValue:'-1',
                      dataSource:
                        [{
                            id: '-1',
                            name: '邀请码状态'
                        },{
                            id: '0',
                            name: '未激活'
                        },{
                            id: '1',
                            name: '已激活'
                        },{
                            id: '2',
                            name: '已购买'
                        }]
                },
                textAlign:'left',
                showTips: true,
                flexGrow: 2,
                bindField: 'inviteCode.ajaxData.{0}.statusStr'
            },{
                name: 'expireTime',
                title:'账套到期日期',
                width: 150,
                disabled: true,
                type: 'string',
                // displayComponent:'',
                textAlign:'center',
                enableEllipsis: true,
                bindField: 'inviteCode.ajaxData.{0}.expireTime'
            },{
                name: 'lastLoginTime',
                title:'最后登录时间',
                width: 150,
                disabled: true,
                type: 'string',
                // displayComponent:'',
                textAlign:'center',
                enableEllipsis: true,
                bindField: 'inviteCode.ajaxData.{0}.lastLoginTime'
            },{
                name: 'totalReceipt',
                title:'流水账数',
                width: 150,
                type: 'string',
                // displayComponent:'',
                disabled: true,
                textAlign:'center',
                enableEllipsis: true,
                bindField: 'inviteCode.ajaxData.{0}.totalReceipt'
            },{
                name: 'totalJournal',
                title:'凭证数',
                width: 150,
                type: 'string',
                // displayComponent:'',
                disabled: true,
                textAlign:'center',
                enableEllipsis: true,
                bindField: 'inviteCode.ajaxData.{0}.totalJournal'
            }
        ]
    },{

        name:'invitateCodeForm',
        component:'Form',
        childrens:[{
            name:'formItems',
            component:'FormItems',
            childrens:[

            {
                name: 'startTime',
                title: '开始时间',
                component: 'DatePicker',
                showLabel: true,
                bindField: 'inviteCode.from.beginTime',
                height: 45,
                width: 110
            },{
                name: 'endTime',
                title: '结束时间',
                component: 'DatePicker',
                showLabel: true,
                // disabledDate:{
                //     minDisabledDate:moment().format('YYYY-MM-DD')
                // },
                bindField: 'inviteCode.from.endTime',
                height: 45,
                width: 110
            },{
                name: 'orgName',
                title: '企业名称',
                type: 'string',
                showLabel: true,
                placeholder: '请输入企业名称',
                bindField: 'inviteCode.from.orgName',
                maxlength:20,
                validate: {
                    showTooltip: false,
                    rules: [{
                        required: true,
                        message: '企业名称不能为空'
                    }]
                },
                height: 45,
                width: 120
            },{
                name: 'mobile',
                title: '手机号',
                type: 'string',
                showLabel: true,
                placeholder: '请输入手机号',
                bindField: 'inviteCode.from.mobile',
                maxlength:13,
                validate: {
                    showTooltip: false,
                    rules: [{
                        required: true,
                        message: '手机号不能为空'
                    },{
                      mobile:true,
                      message:'请输入正确格式的手机'
                    }]

                },
                height: 45,
                width: 100
            }]
        }]
    },{
        name:'leftDiscountAmount',
        component:'Form',
        childrens:[{
            name:'formItems',
            component:'FormItems',
            childrens:[

            {
                name: 'smallDiscountAmount',
                title: '小规模纳税人优惠金额',
                type: 'string',
                showLabel: true,
                // placeholder: '请输入企业名称',
                bindField: 'leftDiscountAmount.smallDiscountAmount',
                maxlength:20,
                validate: {
                    showTooltip: false,
                    rules: [{
                        required: true,
                        message: '小规模纳税人优惠金额不能为空'
                    }]
                },
                height: 45,
                width: 150
            },{
                name: 'generalDiscountAmount',
                title: '一般纳税人优惠金额',
                type: 'string',
                showLabel: true,
                // placeholder: '请输入企业名称',
                bindField: 'leftDiscountAmount.generalDiscountAmount',
                maxlength:20,
                validate: {
                    showTooltip: false,
                    rules: [{
                        required: true,
                        message: '一般纳税人优惠金额不能为空'
                    }]
                },
                height: 45,
                width: 150
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
                name: 'discountAmount',
                title: '优惠金额',
                type: 'string',
                showLabel: true,
                // placeholder: '请输入企业名称',
                bindField: 'rightDiscountAmount.discountAmount',
                maxlength:20,
                validate: {
                    showTooltip: false,
                    rules: [{
                        required: true,
                        message: '优惠金额不能为空'
                    }]
                },
                height: 45,
                width: 150
            }]
        }]
    }]
}
//空的版本说明
export const emptyVersionItem = {
    item:undefined
}
export const emptyVersionList = [
    emptyVersionItem
]

export const getMenus = [{
        menuId:3000,
        menuName:'企业管理',
        component:OrganizationalAdministration,
        key:4
    },{
        menuId:3010,
        menuName:'企业信息',
        component:OrganizationalInfo,
        key:5
    },{
        menuId:3020,
        menuName:'用户信息',
        component:UserInfo,
        key:6
    },{
        menuId:3030,
        menuName:'新增企业统计',
        component:OrgAnalyze,
        key:7
    },{
        menuId:3040,
        menuName:'新增用户统计',
        component:UserAnalyze,
        key:8
    },{
        menuId:3050,
        menuName:'服务商管理',
        component:DzAdministration,
        key:9
    },{
        menuId:3060,
        menuName:'服务商信息',
        component:DzInfo,
        key:10
    }
    // ,{
    //     menuId:3060,
    //     menuName:'企业列表',
    //     component:OrganizationalList,
    //     key:18
    // }
    ,{
        menuId:3070,
        menuName:'伙伴管理',
        component:PartnerManage,
        key:14
    },{
        menuId:3080,
        menuName:'伙伴价格管理',
        component:PromoCode,
        key:17
    },{
        menuId:3090,
        menuName:'订单管理',
        component:OrderManagement,
        key:13
    },{
        menuId:3100,
        menuName:'业务模版管理',
        component:TemplatManagement,
        key:15
    },{
        menuId:3110,
        menuName:'版本更新',
        component:VersionManage,
        key:16
    },{
        menuId: 3120,
        menuName: '运营人员管理',
        component: Operation,
        key: 38
    },{
        menuId: 3095,
        menuName: '批量导客',
        component: InviteCodeAdministrationComponent,
        key: 19
    },{
        menuId: 8888,
        menuName: '实名认证',
        component: AuthenticationComponent,
        key: 50
    },{
        menuId: 3500,
        menuName: '官网管理',
        component: HomeManage,
        key: 21
    },{
        menuId: 3130,
        menuName: '汇算清缴统计',
        component: TaxManage,
        key: 22
    },{
        menuId: 3600,
        menuName: '意见收集管理',
        component: FeedbackManage,
        key: 23
    },{
        menuId: 3700,
        menuName: '在线考试管理',
        appPath:'apps/login/admin/apps/examManagement',
        key: 24
    },{
        menuId:3800,
        menuName:'法人网',
        component:Farenw,
        key:51
    }]



/*
{"result":true,"value":{"orgList":[{"id":130,"oname":"zljtest","version":null,"orgType":null,"baseCurrency":null,"enabledYear":0,"enabledMonth":0,"ts":1468563938000}]}}
*/
/*
export function getData(post){
  	return post("rapuser/user/getById", {})
}

export function getOrgs(post){
	return post("org/list", {})
}


export const saveNextLoginModeTestData = {
	result:true,
	value:true
}
export function saveNextLoginMode(post, mode){
	return post("user/setNextWay", {
		entrance: parseInt(mode)
	})
}

export const createOrgTestData = {
	result:true,
	value:true
}
export function createOrg(post, orgName){
	return post("org/create", {
		name: orgName
	})
}


export const checkOrgTestData = {
	result:true,
	value:true
}
/*
export function checkOrg(post, orgName){
	return post("/acm/org/checkOrg", {
		ogname: orgName
	})
}*/

/*
export function deleteOrg(post, orgId){
	return post("", {
		orgId
	})
}

/*
export function changeOrg(post, orgId){
	return post("org/switch",{
		id:orgId
	})
}
/*/

// 我的易嘉人初始化数据
export function init(post){
	return post('/v1/web/myyj/init')
}
