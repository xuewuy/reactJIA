//grid的行高
export const GRID_ROW_HEIGHT = 40
export const GRID_HEADER_HEIGHT = 38
export const GRID_FOOTER_HEIGHT = 40

//空的行数据
export const blankVoucherItem = {

    
}

//模板列表
const templatesConst = []


//空的凭证数据
export const emptyVoucherData = {
    voucherHeader: {
        id: '',
        code: '',
        date: '',
        attachCount: '0',        
        voucherSource:'',
        bankAccountId:'',
        customerId:'',
        businessDate:''
    },
    adjunctInfo: {
        album: [],
        isVisible: false,
        adjunctSize: 0,  
    },
    enclosures: [],
    voucherItems: [

    ],
    voucherFooter:{
       
    },
    form: {
       isEnableSumVisible:false
    }
}

export const initData = {
    voucherData: emptyVoucherData,
    templates: templatesConst,
    voucherHeader:{

    }
}

//meta
export const voucher = {
    meta: {
        name: 'voucher',
        component: 'DynamicPage',
        childrens: [
            {
                name: 'voucherHeader',
                component: 'Form',
                childrens: [{
                    name: 'formItems',
                    component: 'FormItems',
                    childrens: [
                        {
                            name: 'customerList',
                            title: '客户',
                            type: 'string',
                            component: 'Select',
                            bindField: 'voucherData.voucherHeader.customerList',
                            valueMember: 'name',
                            displayMember: 'name',
                            placeholder: '按名称\拼音搜索',
                            dataSource: [],
                            dataSourceFetchMode: 2,
                            filterOptionExpressions:'helpCode,name,code',
                            enableHideDropdownByClick: true,
                            allowClear: true,
                            showSearch:true,
                            width: 150,      
                            dropdownFooterName: '新增客户',
                        },{
                            name: 'bankAccount',
                            title: '收款方式',
                            type: 'object',
                            bindField: 'voucherData.voucherHeader.bankAccount',
                            component: 'Select',
                            //combobox: true,
                            displayMember: 'name',
                            valueMember: 'name',
                            dataSource: [],
                            dataSourceFetchMode: 2,
                            enableHideDropdownByClick: true,
                            width: 120,
                            showSearch: true,
                            allowClear: true,
                            dropdownFooterName: '新增账号'
                        },{
                            name: 'receivePayAmount', // 收款金额
                            title: '收款金额',
                            type: 'float',
                            component: 'Input',
                            bindField: 'voucherData.voucherHeader.receivePayAmount',
                            width: 120,
                            precision:2,
                        },{
                            name: 'businessDate',
                            title: '收款日期',
                            type: 'date',
                            component: 'DatePicker',
                            width: 100,
                            format: 'YYYY-MM-dd',
                            required: false,
                            bindField: 'voucherData.voucherHeader.businessDate',
                            flexGrow: 1,
                        },{
                            name: 'code',
                            title: '单据编号',
                            type: 'string',
                            className: 'arapOrderSource',
                            bindField: 'voucherData.voucherHeader.code',
                            disabled:true,
                            width:120,
                        },{
                            name:'voucherSource',
                            title:'来源单据号',
                            className:'voucherSource',
                            component:'Button',
                            visible:false,
                            bindField:'voucherData.voucherHeader.voucherSource',
                            type:'string',
                        }]
                }]
            },
            {
                name: 'voucherBody',
                component: 'Grid',
                bindField: 'voucherData.voucherItems',
                rowHeight: GRID_ROW_HEIGHT,
                headerHeight: GRID_HEADER_HEIGHT,
                footerHeight: GRID_FOOTER_HEIGHT,
                enableSequenceColumn: true,
                enableSum: true,
                childrens: [{
                        name: 'cancelVoucherTypeId',
                        title: '核销单据类型',
                        type: 'string',
                        bindField: 'voucherData.voucherItems.{0}.cancelVoucherTypeId',
                        textAlign: 'center',
                        visible: false,
                    }, {
                        name: 'cancelVoucherId',
                        title: '核销单据',
                        type: 'string',
                        showTips: true,
                        bindField: 'voucherData.voucherItems.{0}.cancelVoucherId',
                        textAlign: 'center',
                        visible: false,
                    }, {
                        name: 'cancelVoucherCode',
                        title: '单据编码',
                        type: 'string',
                        showTips: true,
                        bindField: 'voucherData.voucherItems.{0}.cancelVoucherCode',
                        textAlign: 'center',
                        displayComponent: 'Link',
                        width: 200,
                        disabled:true
                    }, {
                        name: 'totalSettleAmount',
                        title: '应收金额',
                        type: 'float',
                        precision: 2,
                        bindField: 'voucherData.voucherItems.{0}.totalSettleAmount',
                        enableSum: true,
                        textAlign: 'right',
                        width: 180,
                        disabled:true

                    }, {
                        name: 'settledAmount',
                        title: '已结算金额',
                        type: 'float',
                        precision: 2,
                        bindField: 'voucherData.voucherItems.{0}.settledAmount',
                        enableSum: true,
                        textAlign: 'right',
                        width: 180,
                        disabled:true
                    }, {
                        name: 'notSettleAmount',
                        title: '未结算金额',
                        type: 'float',
                        precision: 2,
                        bindField: 'voucherData.voucherItems.{0}.notSettleAmount',
                        enableSum: true,
                        textAlign: 'right',
                        width: 180,
                        disabled:true
                    }, {
                        name: 'currentSettleAmount',
                        title: '本次结算',
                        type: 'float',
                        precision: 2,
                        displayComponent:'Input',
                        component:'Input',
                        allChange: true,
                        bindField: 'voucherData.voucherItems.{0}.currentSettleAmount',
                        flexGrow: 0,
                        hasBorder:1,
                        enableSum: true,
                        autoSelect: true,
                        numberOnly: true,
                        textAlign: 'right',
                        width: 180
                    }, {
                        name: 'extendProperty',
                        title: '',
                        type: 'string',
                        bindField: 'voucherData.voucherItems.{0}.extendProperty',
                        flexGrow: 1,
                        width: 20,
                        disabled:true
                    }]
            },
            {
                name: 'voucherFooter',
                component: 'Form',
                childrens: [{
                    name: 'formItems',
                    component: 'FormItems',
                    childrens: []
                }]
            },
            {
                name: 'help',
                component: 'Grid',
                bindField: 'helpItems',
                rowHeight: 30,
                headerHeight: 30,
                disabled: true,
                enableSequenceColumn: false,
                childrens: [{
                    name: 'title',
                    title: '说明',
                    type: 'string',
                    bindField: 'helpItems.{0}.title',
                    width: 50
                }, {
                    name: 'shortcut',
                    title: '快捷键',
                    bindField: 'helpItems.{0}.shortcut',
                    width: 50
                }]
            }

        ]
    },
    data: initData
}
