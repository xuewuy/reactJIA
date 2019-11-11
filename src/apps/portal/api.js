export const meta = {
    name: 'portal',
    childrens: [{
        name: 'menus',
        bindField: 'menus'
    }, {
        name: 'tabs',
        bindField: 'tabs'
    }, {
        name: 'currentTab',
        bindField: 'currentTab'
    }]
}

export const getMenus = () => {
    return [{
        id: 10,
        name: '首页',
        imageName: 'Home',
        requestUrl: 'apps/welcome'
    },{
        id: 1010,
        name: '客户管理',
        imageName: 'CustomerManager',
        requestUrl: 'apps/dz/clientList',
        auth: true
    }, {
        id: 1060,
        name: '合同管理',
        imageName: 'HeTong',
        requestUrl: 'apps/dz/contract',
        auth: true
    }, {
        id: 1020,
        name: '账套管理',
        imageName: 'Chushihua',
        requestUrl: 'apps/dz/initialize',
        auth: true
    }, {
        id: 1030,
        name: '税款通知',
        imageName: 'ShuiKuan',
        requestUrl: 'apps/dz/taxNotice',
        auth: true
    }, {
        id: 1040,
        name: '批量封存',
        imageName: 'ShenBao',
        requestUrl: 'apps/dz/batchDeclaration',
        auth: true
    }, {
        id: 1050,
        name: '批量结账',
        imageName: 'JieZhang',
        requestUrl: 'apps/dz/batchSettleAccounts',
        auth: true
    }, {
        id: 100,
        name: '管理设置',
        imageName: 'SystemSetting',
        subMenus: [{
            id: 1000,
            name: '管理设置',
            menuItemGroup: [{
                id: 100001,
                name: '部门人员',
                imageName: 'SubMenu',
                requestUrl: 'apps/systemSetting/deptPerson/deptPerson',
                auth: true
            },{
                id: 100002,
                name: '客户分配',
                imageName: 'SubMenu',
                requestUrl: 'apps/dz/clientAuthorization',
                auth: true 
            },{
                id: 100003,
                name: '消息设置',
                imageName: 'SubMenu',
                requestUrl: 'apps/dz/messageCenter/messageSet',
                auth: true
            },{
                id: 999999,
                name: '账套转移',
                imageName: 'SubMenu',
                requestUrl: 'apps/dz/importTool'
            }]
        }]
    },
    /* {
        id: 1000,
        name: '管理设置',
        imageName: 'SystemSetting',
        subMenus: [{
            id: 100001,
            name: '部门人员',
            imageName: 'SubMenu',
            requestUrl: 'apps/systemSetting/deptPerson/deptPerson',
            auth: true
        }, {
            id: 100002,
            name: '客户分配',
            imageName: 'SubMenu',
            requestUrl: 'apps/dz/clientAuthorization',
            auth: true
        }, {
            id: 100003,
            name: '消息设置',
            imageName: 'SubMenu',
            requestUrl: 'apps/dz/messageCenter/messageSet',
            auth: true
        }, {
            id: 999999,
            name: '账套转移',
            imageName: 'SubMenu',
            requestUrl: 'apps/dz/importTool'
        }]
    },  */{
        id: 88889,
        name: '合同管理',
        imageName: 'heTong',
        requestUrl: 'apps/dz/contract',
        auth: true
    }, {
        id: 88810,
        name: '运营管理',
        imageName: 'guanLi',
        requestUrl: 'apps/dz/operation',
        auth: true
    },
    /*以下是企业端菜单*/
    //以下是新的菜单整理
    {
        id:21,
        name:'票据管理',
        imageName: 'Fapiaoguanli',
        subMenus:[{
            id:2130,
            name:'查验',
            menuItemGroup:[{
                id: 213001,
                name: '发票查验',
                requestUrl: 'apps/tools/invoiceeExamination',
                auth: true
            }]
        },{
            id:212,
            name:'采集',
            menuItemGroup: [{
                id: 213002,
                name: '票据上传',
                auth: true,
                requestUrl: 'apps/acm/ticketManage/uploadTicket'
            },{
                id: 213003,
                name: '票据导入',
                auth: true,
                requestUrl: ''
            }]
        },{
            id: 213,
            name: '整理',
            menuItemGroup:[{
                id: 213004,
                name: '票据整理',
                auth: true,
                requestUrl: 'apps/acm/ticketManage/tidyList'
            }]
        }]
    },{
        id:20,
        name:'业务管理',
        imageName: 'FinishingNote',
        subMenus:[{
            id: 201,
            name: '流水账',
            menuItemGroup: [{
                id: 201003,
                name: '新增流水',
                requestUrl: 'apps/acm/richardTicket/card',
                auth: true
            },{
                id: 201013,
                name: '银行对账单',
                requestUrl: 'apps/acm/bankStatement',
                auth: true
            },{
                id: 201001,
                name: '流水账列表',
                requestUrl: 'apps/acm/richardTicket/list',
                auth: true
            },{
                id: 201002,
                name: '收支统计表',
                requestUrl: 'apps/acm/richardTicket/report',
                auth: true
            },{
                id: 201005,
                name: '现金银行日记账',
                requestUrl: 'apps/acm/cashBankJournal',
                auth: true
            },{
                id: 201014,
                name: '导入发票',
                requestUrl: 'apps/acm/importInvoice',
                auth: true
            },{
                id: 201015,
                name: '导入实收款',
                requestUrl: 'apps/acm/importActualCollection',
                auth: true
            },{
                id: 201012,
                name: '收入汇总表',
                imageName: 'SubMenu',
                requestUrl: 'apps/fi/cateringReport?type=cateringIncomeSummary',
                auth: true
            },{
                id: 201006,
                name: '收入结构分析表',
                imageName: 'SubMenu',
                requestUrl: 'apps/fi/cateringReport?type=cateringIncome',
                auth: true
            },{
                id: 201007,
                name: '支出结构分析表',
                imageName: 'SubMenu',
                requestUrl: 'apps/fi/cateringReport?type=cateringExpenditure',
                auth: true
            },{
                id: 201008,
                name: '资金变动统计表',
                imageName: 'SubMenu',
                requestUrl: 'apps/fi/cateringReport?type=cateringCash',
                auth: true
            },{
                id: 201009,
                name: '应收账款表',
                imageName: 'SubMenu',
                requestUrl: 'apps/fi/cateringReport?type=cateringReceivable',
                auth: true
            },{
                id: 201010,
                name: '应付账款表',
                imageName: 'SubMenu',
                requestUrl: 'apps/fi/cateringReport?type=cateringPayable',
                auth: true
            },{
                id: 201011,
                name: '期末库存表',
                imageName: 'SubMenu',
                requestUrl: 'apps/fi/cateringReport?type=cateringInventory',
                auth: true
            },{
                id: 201666,
                name: '银行对账单',
                imageName: 'SubMenu',
                requestUrl: 'apps/acm/bankStatement',
                auth: true
            }]
        },{
            id: 202,
            name: '工资管理',
            menuItemGroup: [{
                id: 202001,
                name: '工资单',
                requestUrl: 'apps/gl/payRoll/payRollList',
                auth: true
            }, {
                id: 202004,
                name: '工资单期初',
                requestUrl: 'apps/gl/payRoll/payRollBeginning',
                auth: true
            },
            // ,{
            //     id: 202001,
            //     name: '生成个税报表',
            //     requestUrl: '',
            //     auth: true
            // }
            {
                id: 202002,
                name: '个税专项附加扣除汇总表',
                requestUrl: 'apps/gl/specialDeduction/specialDeductionCollect',
                auth: true
            }/*, {
                id: 202003,
                name: '个税专项附加扣除明细表',
                requestUrl: 'apps/gl/specialDeduction/specialDeductionDetails',
                auth: true
            }*/]
        },{
            id: 207,
            name: '资产管理',
            menuItemGroup: [{
                id: 207001,
                name: '资产卡片管理',
                auth: true,
                requestUrl: 'apps/fi/assetManagement/list'
            },{
                id: 207004,
                name: '折旧摊销',
                requestUrl: '',
                auth: true
            },{
                id: 207005,
                name: '处置单列表',
                requestUrl: '',
                auth: true
            },{
                id: 207002,
                name: '资产类别统计表',
                auth: true,
                requestUrl: 'apps/fi/assetManagement/categoryCount'
            }, {
                id: 207003,
                name: '资产折旧统计表',
                auth: true,
                requestUrl: 'apps/fi/assetManagement/cardDetails'
            }]
        }]
    },{
        id: 2030,
        name: '智能财务',
        imageName: 'Finance',
        subMenus:[{
            id: 20301,
            name: '凭证',
            menuItemGroup: [{
                id: 203001,
                name: '新增凭证',
                requestUrl: 'apps/fi/addVoucher',
                auth: true
            },
            {
                id: 203002,
                name: '凭证管理',
                requestUrl: 'apps/fi/voucherManagement',
                auth: true
            }
            ,
            {
                id: 203015,
                name: '定期凭证',
                requestUrl: 'apps/fi/fixedPeriod',
                auth: true
            }
        ]
        },{
            id: 20302,
            name: '账表',
            menuItemGroup:[{
                id: 203005,
                name: '科目余额表',
                requestUrl: 'apps/fi/accountBook/balances',
                auth: true
            },{
                id: 203003,
                name: '总账',
                requestUrl: 'apps/fi/accountBook/generalLedger',
                auth: true
            },{
                id: 203004,
                name: '明细账',
                requestUrl: 'apps/fi/accountBook/subsidiaryLedger',
                auth: true 
            },{
                id: 203011,
                name: '应收账款统计表',
                auth: false,
                requestUrl: 'apps/fi/accountReceivable'
            },{
                id: 203012,
                name: '应付账款统计表',
                imageName: 'SubMenu',
                auth: false,
                requestUrl: 'apps/fi/accountPayable'
            },{
                id: 203014,
                name: '账龄分析表',
                imageName: 'SubMenu',
                requestUrl: 'apps/fi/agingSchedule'
            },{
                id: 203013,
                name: '期间费用表',
                imageName: 'SubMenu',
                requestUrl: 'apps/fi/statementOfExpenses'
            }]
        },{
            id: 20303,
            name: '报表',
            menuItemGroup: [{
                id: 203006,
                name: '资产负债表',
                imageName: 'SubMenu',
                auth: true,
                requestUrl: 'apps/fi/report/balanceSheet'
            },{
                id: 203007,
                name: '利润表',
                imageName: 'SubMenu',
                auth: true,
                requestUrl: 'apps/fi/report/profitStatement'
            },{
                id: 203008,
                name: '现金流量表',
                imageName: 'SubMenu',
                auth: true,
                requestUrl: 'apps/fi/report/cashFlowStatement'
            }]
        },{
            id: 20304,
            name: '结账',
            menuItemGroup: [{
                id: 203010,
                name: '月末结账',
                imageName: 'SubMenu',
                auth: true,
                requestUrl: 'apps/fi/monthlyAccounting'
            }]
        }]
    },{
        id: 2040,
        name: '智能税务',
        imageName: 'CustomerService',
        subMenus: [{
            id: 20401,
            name: '税务填报',
            menuItemGroup: [{
                id: 204001,
                name: '增值税',
                auth: true,
                requestUrl: 'apps/fi/manageTax/declareTaxOfValueAdded'
            },{
                id: 204007,
                name: '附加税',
                imageName: 'SubMenu',
                requestUrl: 'apps/fi/manageTax/cityBuildExtraTax',
                auth: true
            },{
                id: 204002,
                name: '企业所得税',
                imageName: 'SubMenu',
                auth: true,
                requestUrl: 'apps/fi/manageTax/declareTaxOfPrepayAB'
            },{
                id: 204011,
                name: '合伙人个人经营所得税A表',
                imageName: 'SubMenu',
                auth: true,
                requestUrl: 'apps/fi/manageTax/personalIncomeTaxReturn'
            },{
                id: 204008,
                name: '印花税',
                imageName: 'SubMenu',
                auth: true,
                requestUrl: 'apps/fi/manageTax/taxReport?id=3'
            },{
                id: 204009,
                name: '房产税',
                imageName: 'SubMenu',
                auth: true,
                requestUrl: 'apps/fi/manageTax/taxReport?id=2'
            },{
                id: 204010,
                name: '工会经费',
                imageName: 'SubMenu',
                auth: true,
                requestUrl: 'apps/fi/manageTax/taxReport?id=5'
            },{
                id: 204004,
                name: '发票认证',
                imageName: 'SubMenu',
                auth: true,
                requestUrl: 'apps/fi/manageTax/invoiceAuthentication'
            },{
                id: 204006,
                name: '即征即退进项分摊',
                imageName: 'SubMenu',
                auth: true,
                requestUrl: 'apps/fi/manageTax/levyRetreatShare'
            },{
                id: 204005,
                name: '待抵扣进项税额台账',
                imageName: 'SubMenu',
                auth: true,
                requestUrl: 'apps/fi/preDeductionRpt'
            },{
                id: 2040011,
                name: '报表Demo',
                imageName: 'SubMenu',
                requestUrl: 'apps/fi/manageTax/reportDemo'
            }]
        },{
            id: 20402,
            name: '汇算清缴',
            menuItemGroup: [{
                id: 2200,
                name: '一键汇算清缴',
                requestUrl: 'apps/fi/manageTax/otherTax'
            }]
        }]
    },{
        id: 2140,
        name: '管理分析',
        imageName: 'CaiWuFenXi',
        subMenus: [{
            id: 21401,
            name: '财务分析',
            menuItemGroup: [{
                id: 214001,
                name: '资产负债情况',
                imageName: 'SubMenu',
                requestUrl: 'iframe://apps/yj-bs-analysis/index.html'
            },{
                id: 214002,
                name: '利润情况',
                imageName: 'SubMenu',
                requestUrl: 'iframe://apps/yj-pl-analysis/index.html'
            },{
                id: 214003,
                name: '现金流量情况',
                imageName: 'SubMenu',
                requestUrl: 'iframe://apps/yj-cf-analysis/index.html'
            }]
        },{
            id: 21402,
            name: '管理报表',
            menuItemGroup: [{
                id: 214004,
                name: '提报收入费用汇总表',
                imageName: 'SubMenu',
                requestUrl: 'apps/fi/lfManagementReport/incomeExpenses',
                auth: true
            },{
                id: 214005,
                name: '可提报收入汇总表',
                imageName: 'SubMenu',
                requestUrl: 'apps/fi/lfManagementReport/incomeSummary',
                auth: true
            },{
                id: 214006,
                name: '可提报收入明细表',
                imageName: 'SubMenu',
                requestUrl: 'apps/fi/lfManagementReport/incomeStatement',
                auth: true
            },{
                id: 214007,
                name: '可提报费用统计表',
                imageName: 'SubMenu',
                requestUrl: 'apps/fi/lfManagementReport/mayCostStatistics',
                auth: true
            },{
                id: 214008,
                name: '已提报费用统计表',
                imageName: 'SubMenu',
                requestUrl: 'apps/fi/lfManagementReport/costStatistics',
                auth: true
            },{
                id: 214009,
                name: '已提报费用明细表',
                imageName: 'SubMenu',
                requestUrl: 'apps/fi/lfManagementReport/costStatisticsDetails',
                auth: true
            },{
                id: 214010,
                name: '费用分摊汇总表',
                imageName: 'SubMenu',
                requestUrl: 'apps/fi/lfManagementReport/costAllocationReport',
                auth: true
            },{
                id: 214011,
                name: '费用分摊明细表',
                imageName: 'SubMenu',
                requestUrl: 'apps/fi/lfManagementReport/costAllocationDetailReport',
                auth: true  
            },{
                id: 214012,
                name: '合同归档情况表',
                imageName: 'SubMenu',
                requestUrl: 'apps/fi/lfManagementReport/contractFilingTable',
                auth: true
            }]
        }]
    },{
        id: 2120,
        name: '风险检查',
        isNew: true,
        imageName: 'FengXianJianCha',
        requestUrl: 'iframe://apps/yj-risk/index.html',
        auth: true
    },{
        id:2100,
        name:'报表',
        imageName: 'BossClient',
        subMenus: [{
            id: 21001,
            name: '报表',
            menuItemGroup: [{
                id: 210001,
                name: '收支统计表',
                requestUrl: 'apps/acm/richardTicket/report',
                auth: true
            },{
                id: 210002,
                name: '收入分类统计表',
                imageName: 'SubMenu',
                auth: true,
                requestUrl: 'apps/fi/cateringReport?type=cateringIn'
            },{
                id: 210010,
                name: '收入汇总表',
                imageName: 'SubMenu',
                auth: true,
                requestUrl: 'apps/fi/cateringReport?type=cateringIncomeSummary'
            },{
                id: 210007,
                name: '收入结构分析表',
                imageName: 'SubMenu',
                auth: true,
                requestUrl: 'apps/fi/cateringReport?type=cateringIncome'
            },{
                id: 210003,
                name: '支出分类统计表',
                imageName: 'SubMenu',
                auth: true,
                requestUrl: 'apps/fi/cateringReport?type=cateringOut'
            },{
                id: 210008,
                name: '支出结构分析表',
                imageName: 'SubMenu',
                auth: true,
                requestUrl: 'apps/fi/cateringReport?type=cateringExpenditure'
            },{
                id: 210004,
                name: '资金变动统计表',
                imageName: 'SubMenu',
                auth: true,
                requestUrl: 'apps/fi/cateringReport?type=cateringCash'
            },{
                id: 210005,
                name: '应收账款表',
                imageName: 'SubMenu',
                auth: true,
                requestUrl: 'apps/fi/cateringReport?type=cateringReceivable'
            },{
                id: 210006,
                name: '应付账款表',
                imageName: 'SubMenu',
                auth: true,
                requestUrl: 'apps/fi/cateringReport?type=cateringPayable'
            },{
                id: 210009,
                name: '期末库存表',
                imageName: 'SubMenu',
                auth: true,
                requestUrl: 'apps/fi/cateringReport?type=cateringInventory'
            }]
        }]
    },{
        id: 2000,
        name: '基础设置',
        imageName: 'SystemSetting',
        subMenus: [{
            id: 20001,
            name: '基础设置',
            menuItemGroup: [{
                id: 200001,
                name: '部门人员',
                imageName: 'SubMenu',
                auth: true,
                requestUrl: 'apps/systemSetting/deptPerson/deptPerson'
            },{
                id: 2000023,
                name: '角色权限',
                imageName: 'SubMenu',
                auth: true,
                requestUrl: '' 
            },{
                id: 200004,
                name: '基础档案',
                imageName: 'SubMenu',
                auth: true,
                requestUrl: 'apps/systemSetting/basicFileMaintenance?tab=true'
            },{
                id: 200007,
                name: '业务明细',
                imageName: 'SubMenu',
                auth: true,
                requestUrl: 'apps/systemSetting/basicFileMaintenance/businessDetail'
            },{
                id: 200008,
                name: '提报费用类型',
                imageName: 'SubMenu',
                auth: true,
                requestUrl: 'apps/systemSetting/basicFileMaintenance/expenseType'
            },{
                id: 200005,
                name: '科目及期初',
                imageName: 'SubMenu',
                auth: true,
                requestUrl: 'apps/fi/accSubjects/accSubjects' 
            },{
                id: 200002,
                name: '企业信息',
                imageName: 'SubMenu',
                requestUrl: 'apps/dz/editClient',
                auth: true,
                initData: { id: '', isDisabled: false, isRefresh: true, type: 2 } 
            },{
                id: 200006,
                name: '行业基础设置',
                imageName: 'SubMenu',
                requestUrl: 'apps/systemSetting/industrySetting'
            },{
                id: 200003,
                name: '服务商',
                imageName: 'SubMenu',
                auth: true,
                requestUrl: 'apps/systemSetting/serviceProvider'
            },{
                id: 200009,
                name: '操作日志',
                imageName: 'SubMenu',
                auth: true,
                requestUrl: 'apps/systemSetting/managementLog'
            }]
        }]
    },
    //以上是新的菜单整理内容
    /*{
        id: 2130,
        name: '票据管理',
        imageName: 'Fapiaoguanli',
        subMenus: [{
            id: 213001,
            name: '发票查验',
            requestUrl: 'apps/tools/invoiceeExamination',
            auth: true
        },{
            id: 213002,
            name: '票据上传',
            auth: true,
            requestUrl: 'apps/acm/ticketManage/uploadTicket'
        }, {
            id: 213004,
            name: '票据整理',
            auth: true,
            requestUrl: 'apps/acm/ticketManage/tidyList'
        }]
    },{ 
        id: 2010,
        name: '流水账',
        imageName: 'FinishingNote',
        subMenus: [{
            id: 201003,
            name: '新增流水',
            requestUrl: 'apps/acm/richardTicket/card',
            auth: true
        },{
            id: 201013,
            name: '银行对账单',
            requestUrl: 'apps/acm/bankStatement',
            auth: true
        }, {
            id: 201001,
            name: '流水账列表',
            requestUrl: 'apps/acm/richardTicket/list',
            auth: true
        }, {
            id: 201002,
            name: '收支统计表',
            requestUrl: 'apps/acm/richardTicket/report',
            auth: true
        },{
            id: 201005,
            name: '现金银行日记账',
            imageName: 'SubMenu',
            requestUrl: 'apps/acm/cashBankJournal',
            auth: true
        }, {
            id: 201012,
            name: '收入汇总表',
            imageName: 'SubMenu',
            requestUrl: 'apps/fi/cateringReport?type=cateringIncomeSummary',
            auth: true
        },{
            id: 201006,
            name: '收入结构分析表',
            imageName: 'SubMenu',
            requestUrl: 'apps/fi/cateringReport?type=cateringIncome',
            auth: true
        },{
            id: 201007,
            name: '支出结构分析表',
            imageName: 'SubMenu',
            requestUrl: 'apps/fi/cateringReport?type=cateringExpenditure',
            auth: true
        },{
            id: 201008,
            name: '资金变动统计表',
            imageName: 'SubMenu',
            requestUrl: 'apps/fi/cateringReport?type=cateringCash',
            auth: true
        },{
            id: 201009,
            name: '应收账款表',
            imageName: 'SubMenu',
            requestUrl: 'apps/fi/cateringReport?type=cateringReceivable',
            auth: true
        },{
            id: 201010,
            name: '应付账款表',
            imageName: 'SubMenu',
            requestUrl: 'apps/fi/cateringReport?type=cateringPayable',
            auth: true
        },{
            id: 201011,
            name: '期末库存表',
            imageName: 'SubMenu',
            requestUrl: 'apps/fi/cateringReport?type=cateringInventory',
            auth: true
        },{
            id: 201666,
            name: '银行对账单',
            imageName: 'SubMenu',
            requestUrl: 'apps/acm/bankStatement',
            auth: true
        }]
    }, {
        id: 2015,
        name: '进销存',
        imageName: 'Invoicing',
        subMenus: [{
            id: 201501,
            name: '销售单',
            imageName: 'SubMenu',
            requestUrl: 'apps/scm/sale/saleOrder'
        }, {
            id: 201502,
            name: '销售单列表',
            imageName: 'SubMenu',
            requestUrl: 'apps/scm/sale/saleList'
        },
        {
            id: 201503,
            name: '收款单',
            imageName: 'SubMenu',
            requestUrl: 'apps/scm/arap/arapOrder'
        }, {
            id: 201504,
            name: '收款单列表',
            imageName: 'SubMenu',
            requestUrl: 'apps/scm/arap/arapList'
        }]
    }, {
        id: 2020,
        name: '工资单',
        imageName: 'Payroll',
        requestUrl: 'apps/gl/payRoll/payRollList',
        auth: true
    }, {
        id: 2070,
        name: '资产管理',
        imageName: 'Assets',
        // isBeta: true,
        subMenus: [{
            id: 207001,
            name: '资产卡片管理',
            imageName: 'SubMenu',
            auth: true,
            requestUrl: 'apps/fi/assetManagement/list'
        }, {
            id: 207002,
            name: '资产类别统计表',
            imageName: 'SubMenu',
            auth: true,
            requestUrl: 'apps/fi/assetManagement/categoryCount'
        }, {
            id: 207003,
            name: '资产折旧统计表',
            imageName: 'SubMenu',
            auth: true,
            requestUrl: 'apps/fi/assetManagement/cardDetails'
        }]
    }, {
        id: 2030,
        name: '财务核算',
        imageName: 'Finance',
        subMenus: [{
            id: 203001,
            name: '新增凭证',
            imageName: 'SubMenu',
            requestUrl: 'apps/fi/addVoucher',
            auth: true
        }, {
            id: 203002,
            name: '凭证管理',
            imageName: 'SubMenu',
            requestUrl: 'apps/fi/voucherManagement',
            auth: true
        }, {
            id: 203003,
            name: '总账',
            imageName: 'SubMenu',
            requestUrl: 'apps/fi/accountBook/generalLedger',
            auth: true
        }, {
            id: 203004,
            name: '明细账',
            imageName: 'SubMenu',
            requestUrl: 'apps/fi/accountBook/subsidiaryLedger',
            auth: true
        }, {
            id: 203005,
            name: '余额表',
            imageName: 'SubMenu',
            requestUrl: 'apps/fi/accountBook/balances',
            auth: true
        }, {
            id: 203011,
            name: '应收账款统计表',
            imageName: 'SubMenu',
            auth: false,
            requestUrl: 'apps/fi/accountReceivable'
        }, {
            id: 203012,
            name: '应付账款统计表',
            imageName: 'SubMenu',
            auth: false,
            requestUrl: 'apps/fi/accountPayable'
        }, {
            id: 203014,
            name: '账龄分析表',
            imageName: 'SubMenu',
            requestUrl: 'apps/fi/agingSchedule'
        }, {
            id: 203013,
            name: '期间费用表',
            imageName: 'SubMenu',
            requestUrl: 'apps/fi/statementOfExpenses'
        }, {
            id: 203006,
            name: '资产负债表',
            imageName: 'SubMenu',
            auth: true, 
            requestUrl: 'apps/fi/report/balanceSheet'
        }, {
            id: 203007,
            name: '利润表',
            imageName: 'SubMenu',
            auth: true,
            requestUrl: 'apps/fi/report/profitStatement'
        }, {
            id: 203008,
            name: '现金流量表',
            imageName: 'SubMenu',
            auth: true,
            requestUrl: 'apps/fi/report/cashFlowStatement'
        }, {
            id: 203010,
            name: '月末结账',
            imageName: 'SubMenu',
            auth: true,
            requestUrl: 'apps/fi/monthlyAccounting'
        }]
    },{
        id: 2040,
        name: '税务申报',
        imageName: 'CustomerService',
        // isBeta: false,
        subMenus: [{
            id: 204001,
            name: '增值税申报表',
            imageName: 'SubMenu',
            // isBeta: false,
            auth: true,
            requestUrl: 'apps/fi/manageTax/declareTaxOfValueAdded'
        }, {
            id: 204007,
            name: '附加税申报表',
            imageName: 'SubMenu',
            requestUrl: 'apps/fi/manageTax/cityBuildExtraTax',
            auth: true
        }, {//企业所得税预缴
            id: 204002,
            name: '企业所得税预缴申报表',
            imageName: 'SubMenu',
            auth: true,
            requestUrl: 'apps/fi/manageTax/declareTaxOfPrepayAB'
        }, {
            id: 204003,
            name: '企业所得税汇算清缴',
            imageName: 'SubMenu',
            auth: true,
            requestUrl: 'apps/fi/manageTax/enterpriseIncomeTax'
        }, {
            id: 204008,
            name: '印花税申报表',
            imageName: 'SubMenu',
            auth: true,
            requestUrl: 'apps/fi/manageTax/taxReport?id=3'
        }, {
            id: 204009,
            name: '房产税申报表',
            imageName: 'SubMenu',
            auth: true,
            requestUrl: 'apps/fi/manageTax/taxReport?id=2'
        }, {
            id: 204010,
            name: '工会经费申报表',
            imageName: 'SubMenu',
            auth: true,
            requestUrl: 'apps/fi/manageTax/taxReport?id=5'
        }, {
            id: 204004,
            name: '发票认证',
            imageName: 'SubMenu',
            auth: true,
            requestUrl: 'apps/fi/manageTax/invoiceAuthentication'
        }, {
            id: 204006,
            name: '即征即退进项分摊',
            imageName: 'SubMenu',
            auth: true,
            requestUrl: 'apps/fi/manageTax/levyRetreatShare'
        }, {
            id: 204005,
            name: '待抵扣进项税额台账',
            imageName: 'SubMenu',
            auth: true,
            requestUrl: 'apps/fi/preDeductionRpt'
        }, {
            id: 2040011,
            name: '报表Demo',
            imageName: 'SubMenu',
            requestUrl: 'apps/fi/manageTax/reportDemo'
        }]
    },{
        id: 2200,
        name: '汇算清缴',
        imageName: 'HSQJ',
        requestUrl: 'apps/fi/manageTax/otherTax'
    },{
        id:2100,
        name: '报表',
        imageName: 'BossClient',
        subMenus:[{
            id: 210001,
            name: '收支统计表',
            requestUrl: 'apps/acm/richardTicket/report',
            auth: true
        },{
            id: 210002,
            name: '收入分类统计表',
            imageName: 'SubMenu',
            auth: true,
            requestUrl: 'apps/fi/cateringReport?type=cateringIn'
        },{
            id: 210010,
            name: '收入汇总表',
            imageName: 'SubMenu',
            auth: true,
            requestUrl: 'apps/fi/cateringReport?type=cateringIncomeSummary'
        },{
            id: 210007,
            name: '收入结构分析表',
            imageName: 'SubMenu',
            auth: true,
            requestUrl: 'apps/fi/cateringReport?type=cateringIncome'
        },{
            id: 210003,
            name: '支出分类统计表',
            imageName: 'SubMenu',
            auth: true,
            requestUrl: 'apps/fi/cateringReport?type=cateringOut'
        }, {
            id: 210008,
            name: '支出结构分析表',
            imageName: 'SubMenu',
            auth: true,
            requestUrl: 'apps/fi/cateringReport?type=cateringExpenditure'
        },{
            id: 210004,
            name: '资金变动统计表',
            imageName: 'SubMenu',
            auth: true,
            requestUrl: 'apps/fi/cateringReport?type=cateringCash'
        },{
            id: 210005,
            name: '应收账款表',
            imageName: 'SubMenu',
            auth: true,
            requestUrl: 'apps/fi/cateringReport?type=cateringReceivable'
        },{
            id: 210006,
            name: '应付账款表',
            imageName: 'SubMenu',
            auth: true,
            requestUrl: 'apps/fi/cateringReport?type=cateringPayable'
        },{
            id: 210009,
            name: '期末库存表',
            imageName: 'SubMenu',
            auth: true,
            requestUrl: 'apps/fi/cateringReport?type=cateringInventory'
        }]
    },{
        id: 2140,
        name: '财务分析',
        imageName: 'QiYeXinXi',
        subMenus:[{
            id: 214001,
            name: '资产负债表分析',
            imageName: 'SubMenu',
            requestUrl: 'iframe://apps/yj-bs-analysis/index.html'
        },{
            id: 214002,
            name: '利润表分析',
            imageName: 'SubMenu',
            requestUrl: 'iframe://apps/yj-pl-analysis/index.html'
        },{
            id: 214003,
            name: '现金流量表分析',
            imageName: 'SubMenu',
            requestUrl: 'iframe://apps/yj-cf-analysis/index.html'
        }]

    }, {
        id: 2120,
        name: '风险检查',
        isNew: true,
        imageName: 'FengXianJianCha',
        requestUrl: 'iframe://apps/yj-risk/index.html',
        auth: true
    }, {
        id: 2000,
        name: '系统设置',
        // canyin:true,
        imageName: 'SystemSetting',
        subMenus: [{
            id: 200001,
            name: '部门人员',
            imageName: 'SubMenu',
            auth: true,
            requestUrl: 'apps/systemSetting/deptPerson/deptPerson'
        }, {
            id: 200004,
            name: '基础档案',
            imageName: 'SubMenu',
            auth: true,
            requestUrl: 'apps/systemSetting/basicFileMaintenance?tab=true'
        }, {
            id: 200005,
            name: '科目及期初',
            imageName: 'SubMenu',
            auth: true,
            requestUrl: 'apps/fi/accSubjects/accSubjects'
        }, {
            id: 200002,
            name: '企业信息',
            // editClient:true,
            imageName: 'SubMenu',
            requestUrl: 'apps/dz/editClient',
            auth: true,
            initData: { id: '', isDisabled: false, isRefresh: true, type: 2 }
        }, {
            id: 200003,
            name: '服务商',
            imageName: 'SubMenu',
            auth: true,
            requestUrl: 'apps/systemSetting/serviceProvider'
        },{
            id: 200006,
            name: '行业基础设置',
            imageName: 'SubMenu',
            requestUrl: 'apps/systemSetting/industrySetting'
        }]
    }, */
    /** 一下是集团版菜单 */
    {
        id:301,
        name: '集团报表',
        imageName: 'Baobiao',
        subMenus: [{
            id: 3010,
            name: '集团报表',
            menuItemGroup: [{
                id: 301001,
                name: '资产负债表',
                imageName: 'SubMenu',
                auth: true,
                requestUrl: 'apps/fi/groupReport/balanceSheet'
            },{
                id: 301002,
                name: '利润表',
                imageName: 'SubMenu',
                auth: true,
                requestUrl: 'apps/fi/groupReport/profitStatement' 
            },{
                id: 301003,
                name: '现金流量表',
                imageName: 'SubMenu',
                auth: true,
                requestUrl: 'apps/fi/groupReport/cashFlowStatement' 
            },{
                id: 301004,
                name: '流水账收支统计表',
                imageName: 'SubMenu',
                requestUrl: 'apps/fi/groupReport/currentReport',
            }]
        }]
    },{
        id: 302,
        name: '集团抵消表',
        imageName: 'DiXiao',
        subMenus: [{
            id: 3020,
            name: '集团抵消表',
            menuItemGroup: [{
                id: 302001,
                name: '资产负债抵消表',
                auth: true,
                requestUrl: 'apps/fi/groupReport/offsetBalanceSheet',
            },{
                id: 302002,
                name: '利润抵消表',
                requestUrl: 'apps/fi/groupReport/offsetProfitStatement'
            },{
                id: 302003,
                name: '现金流量抵消表',
                requestUrl: 'apps/fi/groupReport/offsetCashFlowStatement'
            },{
                id: 302004,
                name: '抵消表列表',
                auth: true,
                requestUrl: 'apps/fi/groupReport/offsetManagement'
            }]
        }]
    },{
        id: 3030,
        name: '企业管理',
        imageName: 'MyYj',
        requestUrl: 'iframe://apps/zfjg/index.html#/zf-root/zf-company-list'
    },{
        id: 304,
        name: '基础设置',
        imageName: 'SystemSetting',
        subMenus: [{
            id: 3040,
            name: '基础设置',
            menuItemGroup: [{
                id: 304001,
                name: '集团管理人员',
                imageName: 'SubMenu',
                requestUrl: 'iframe://apps/zfjg/index.html#/zf-root/zf-person-list'
            },{
                id: 304002,
                name: '组织结构',
                imageName: 'SubMenu',
                requestUrl: 'iframe://apps/zfjg/index.html#/zf-root/zf-org-tree' 
            },{
                id: 304003,
                name: '科目管理',
                imageName: 'SubMenu',
                auth: true,
                requestUrl: 'apps/fi/accSubjects/newAccSubjects'
            },{
                id: 304004,
                name: '分组管理',
                imageName: 'SubMenu',
                requestUrl: 'iframe://apps/zfjg/index.html#/zf-root/zf-group-list'
            },{
                id: 304005,
                name: '基本信息',
                imageName: 'SubMenu',
                requestUrl: 'iframe://apps/zfjg/index.html#/zf-root/zf-base-info'
            }]
        }]
    },
    //以下是旧的集团版菜单
    /* {
        id: 3010,
        name: '集团报表',
        imageName: 'Baobiao',
        subMenus: [{
            id: 301001,
            name: '资产负债表',
            imageName: 'SubMenu',
            auth: true,
            requestUrl: 'apps/fi/groupReport/balanceSheet'
        },{
            id: 301002,
            name: '利润表',
            imageName: 'SubMenu',
            auth: true,
            requestUrl: 'apps/fi/groupReport/profitStatement'
        },{
            id: 301003,
            name: '现金流量表',
            imageName: 'SubMenu',
            auth: true,
            requestUrl: 'apps/fi/groupReport/cashFlowStatement'
        },{
            id: 301004,
            name: '流水账收支统计表',
            imageName: 'SubMenu',
            requestUrl: 'apps/fi/groupReport/currentReport',
        }]
    },{
        id: 3020,
        name: '集团抵消表',
        imageName: 'DiXiao',
        subMenus: [{
            id: 302001,
            name: '资产负债抵消表',
            imageName: 'SubMenu',
            auth: true,
            requestUrl: 'apps/fi/groupReport/offsetBalanceSheet',
        },{
            id: 302002,
            name: '利润抵消表',
            imageName: 'SubMenu',
            requestUrl: 'apps/fi/groupReport/offsetProfitStatement'
        },{
            id: 302003,
            name: '现金流量抵消表',
            imageName: 'SubMenu',
            requestUrl: 'apps/fi/groupReport/offsetCashFlowStatement'
        },{
            id: 302004,
            name: '抵消表列表',
            imageName: 'SubMenu',
            auth: true,
            requestUrl: 'apps/fi/groupReport/offsetManagement'
        }]
    },{
        id: 3030,
        name: '企业管理',
        imageName: 'MyYj',
        requestUrl: 'iframe://apps/zfjg/index.html#/zf-root/zf-company-list'
    },{
        id: 3040,
        name: '基础设置',
        imageName: 'SystemSetting',
        subMenus: [{
            id: 304001,
            name: '集团管理人员',
            imageName: 'SubMenu',
            requestUrl: 'iframe://apps/zfjg/index.html#/zf-root/zf-person-list'
        },{
            id: 304002,
            name: '组织结构',
            imageName: 'SubMenu',
            requestUrl: 'iframe://apps/zfjg/index.html#/zf-root/zf-org-tree'
        },{
            id: 304003,
            name: '科目管理',
            imageName: 'SubMenu',
            auth: true,
            requestUrl: 'apps/fi/accSubjects/newAccSubjects'
        },{
            id: 304004,
            name: '分组管理',
            imageName: 'SubMenu',
            requestUrl: 'iframe://apps/zfjg/index.html#/zf-root/zf-group-list'
        },{
            id: 304005,
            name: '基本信息',
            imageName: 'SubMenu',
            requestUrl: 'iframe://apps/zfjg/index.html#/zf-root/zf-base-info'
        }]
    }, */
    /** 集团版菜单结束 */
    {
        id: 116,
        name: '结账',
        imageName: 'SystemSetting',
        subMenus: [{
            id: 11601,
            name: '期末结转',
            imageName: 'SubMenu',
            requestUrl: ''
        }, {
            id: 11602,
            name: '月末结账',
            imageName: 'SubMenu',
            requestUrl: ''
        }]
    }, {
        id: 2090,
        name: '企业信息',
        imageName: 'QiYeXinXi',
        requestUrl: 'apps/dz/editClient',
        auth: true,
        initData: { id: '', isDisabled: true, isRefresh: false }
    },{
        id: 9800,
        name: '工资单',
        imageName: 'Payroll',
        requestUrl: 'apps/common/coding?Payroll'
    },{
        id: 9700,
        name: '资产管理',
        imageName: 'Assets',
        requestUrl: 'apps/common/coding?Assets',
    },{
        id: 9600,
        name: '财务核算',
        imageName: 'Finance',
        requestUrl: 'apps/common/coding?Finance'
    },{
        id: 9500,
        name: '税务申报',
        imageName: 'CustomerService',
        requestUrl: 'apps/common/coding?CustomerService'
    }]
}


export function getData() {
    return {
        showMenu: true,
        popMenu: true,
        menus: [],
        tabs: [],
        currentTab: { title: '我的桌面', url: 'apps/welcome' },
        orgs: [],
        currentOrg: undefined,
        orgSearchValue: '',
        disableMenus: undefined,//第三方接入时保存禁用项信息
        appInfo: undefined//第三方接入时保存第三方信息
    }
}

export function getOrgs(post) {
    return post("rap-user/org/query", {})
}


export function logout(post) {
    return post("rapuser/logout", {})
}


export function changeOrg(post, orgId) {
    return post("rapuser/org/switch", {
        id: orgId
    })
}

export function init(post, orgId, isServiceProvider, dzOrgId) {
    return post('v1/web/portal/init', {
        orgId, 'dzOrgId': dzOrgId, 'isServiceProvider': isServiceProvider
    })
}