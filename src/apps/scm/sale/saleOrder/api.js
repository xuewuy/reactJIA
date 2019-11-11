//grid的行高
export const GRID_ROW_HEIGHT = 40
export const GRID_HEADER_HEIGHT = 38
export const GRID_FOOTER_HEIGHT = 40

export const ARROWUP    = 38
export const ARROWDOWN  = 40
export const ARROWLEFT  = 37
export const ARROWRIGHT = 39

//空的行数据
export const blankVoucherItem = {
    inventoryService: undefined, //{}
    specification: undefined,
    company:undefined, // 单位
    number:'', // 数量
    unitPriceTax:'', // 单价（含税）
    amountOfMoneyTax:'', // 金额（含税)
    unitPrice:undefined, // 单价
    amountOfMoney:undefined, // 金额
    taxRate:undefined, // 税率(%)
    tax:undefined, // 税额
    unitId:undefined // 计量单位
    
}

//空的数据
export const emptyVoucherData = {
    voucherHeader: {
        id: null,
        code: '',
        attachCount: '0',        
        voucherSource:'',
        customer:'',
        person:'',
        saleDate:''
    },
    form: {
        album: [],
        isVisible: false,
        adjunctSize: 0,  
    },
    enclosures: [],
    voucherItems: [
        blankVoucherItem,
        blankVoucherItem,
        blankVoucherItem,
        blankVoucherItem,
        blankVoucherItem
    ],
    voucherFooter:{
        settlementAmount:'',
        bankAccount:'',
        settlementMoney:0, //收款金额
        prePayment:0,//预收款，还有多少余额
        settlementAmount: undefined,  //结算金额
        newArr_z: undefined,    // 存放总金额（含税），
    }
}

export const initData = {
    voucherData: emptyVoucherData,
    curCellCodeAndName: undefined,
    overdraftAmount:0,//欠款累计
    prePayment:0,
    newArr_z:0,
    settlementMoney:0,
    voucherHeader:{
        invoiceType:[],
        personsList:[]
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
                            name: 'customer',
                            title: '客户',
                            type: 'string',
                            component: 'Select',
                            bindField: 'voucherData.voucherHeader.customer',
                            valueMember: 'name',
                            displayMember: 'name',
                            placeholder: '按名称\拼音搜索',
                            filterOptionExpressions:'helpCode,name,code',
                            dataSource: [],
                            dataSourceFetchMode: 2,
                            //after:'nodeAfterCustomer',
                            enableHideDropdownByClick: true,
                            allowClear: true,
                            showSearch:true,
                            width: 150,      
                            dropdownFooterName: '新增客户',
                            enableEllipsis:true
                        },{
                            name: 'person',
                            title: '销售员',
                            component:'Select',
                            valueMember: 'name',
                            displayMember: 'name',
                            dataSource: [],
                            dataSourceFetchMode:2,
                            type: 'string',
                            bindField: 'voucherData.voucherHeader.person',
                            showSearch: true,
                            allowClear: true,
                            dropdownFooterName: '',
                            dropdownFooterName: '新增',
                            enableHideDropdownByClick: true,
                            width: 120,
                            flexGrow: 1,
                        },{
                            name: 'saleDate',
                            title: '销售日期',
                            component: 'DatePicker',
                            bindField: 'voucherData.voucherHeader.saleDate',
                            format:'YYYY-MM-DD',
                            type: 'date',
                            width:120,
                        },{
                            name: 'invoiceType',
                            title: '票据类型',
                            component:'Select',
                            valueMember: 'enumItemName',
                            displayMember: 'enumItemName',
                            dataSource: [],
                            dataSourceFetchMode: 0,
                            type: 'string',
                            bindField: 'voucherData.voucherHeader.invoiceType',
                            showSearch: false,
                            dropdownFooterName: '',
                            enableHideDropdownByClick: true,
                            width: 130,
                        },{
                            name: 'code',
                            title: '单据编号',
                            type: 'string',
                            className: 'saleOrderSource',
                            bindField: 'voucherData.voucherHeader.code',
                            disabled:true,
                            width:110,
                        },{
                            name:'voucherSource',
                            title:'来源单据号',
                            className:'voucherSource',
                            component:'Button',
                            visible:false,
                            bindField:'voucherData.voucherHeader.voucherSource',
                            type:'string',
                        }
//                        , {
//                            name: 'attachCount',
//                            title: '附件数',
//							type: 'int', 
//							component: 'Link',
//                            bindField: 'voucherData.voucherHeader.attachCount',
//							width: 150,
//							after: 'uploadImage'
//                        }
                    ]
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
                allowAddColumn: true,
                allowDelColumn: true,
                enableMouseMoveEvent: true,
                childrens: [{
                    name: 'inventoryService',
                    title: '商品或服务名称',
                    bindField: 'voucherData.voucherItems.{0}.inventoryService',
                    component: 'DropDownSelect',
                    displayComponent: 'DropDownDisplay',
                    selectButtonName: '选择', 
                    dropdownFooterName: '新增商品或服务名称',
                    enableHideDropdownByClick: true,
                    dataSourceFetchMode:2,
                    valueMember: 'codeAndName',
                    displayMember: 'codeAndName',
                    combobox: false,
                    dataSource: [],
                    interceptTab:true,
                    showSearch: true,
                    dropdownMatchSelectWidth:true,
                    filterOptionExpressions:'helpCode,name,code',
                    type: 'string',
                    autoSelect: true,
                    width: 240
                },{
                    name: 'specification',
                    title: '规格型号',
                    type: 'string',
                    precision: 2,
                    textAlign: 'center',
                    bindField: 'voucherData.voucherItems.{0}.specification',
                    width:80,
                    disabled: true,

                },{
                    name: 'company',
                    title: '单位',
                    type: 'string',
                    precision: 2,
                    textAlign: 'center',
                    bindField: 'voucherData.voucherItems.{0}.company',
                    width:50,
                    disabled: true,
                },               
                {
                    name: 'number',
                    title: '数量',
                    type: 'float',
                    precision: 0,
                    enableSum: true,
                    numberOnly: true,
                    autoSelect: true,
                    textAlign: 'center',
                    //displayComponent:'Input',
                    component:'InputNumber',
                    regex: '^([0-9]+)$',
                    // regex: '^(-?[0-9]+)(?:\.[0-9]{1,2})?$',
                    bindField: 'voucherData.voucherItems.{0}.number',
                    allChange: true,
                    autoSelect: true,
                    min: 0,
                    width:90,

                },{
                    name: 'unitPriceTax',
                    title: '单价（含税）',
                    type: 'float',
                    precision: 2,
                    //displayComponent:'Input',
                    component:'InputNumber',
                    regex: '^([0-9]+)(?:\.[0-9]{1,2})?$',
                    textAlign: 'right',
                    autoSelect: true,
                    numberOnly: true,
                    bindField: 'voucherData.voucherItems.{0}.unitPriceTax',
                    //hasBorder:1,
                    allChange: true,
                    min: 0,
                    width:110,

                },{
                    name: 'amountOfMoneyTax',
                    title: '金额（含税）',
                    type: 'float',
                    precision: 2,
                    //displayComponent:'Input',
                    component:'InputNumber',
                    regex: '^([0-9]+)(?:\.[0-9]{1,2})?$',
                    textAlign: 'right',
                    enableSum: true,
                    autoSelect: true,
                    numberOnly: true,
                    bindField: 'voucherData.voucherItems.{0}.amountOfMoneyTax',
                    //hasBorder:1,
                    allChange: true,
                    min: 0,
					max:Infinity,
                    width:110,
                },
                {
                    name: 'unitPrice',
                    title: '单价',
                    type: 'string',
                    precision: 2,
                    textAlign: 'right',
                    bindField: 'voucherData.voucherItems.{0}.unitPrice',
                    width:100,
                    disabled: true,

                },{
                    name: 'amountOfMoney',
                    title: '金额',
                    type: 'float',
                    precision: 2,
                    enableSum: true,
                    textAlign: 'right',
                    bindField: 'voucherData.voucherItems.{0}.amountOfMoney',
                    width:110,
                    disabled: true,

                },{
                    name: 'taxRate',
                    title: '税率(%)',
                    type: 'float',
                    precision: 2,
                    enableSum: false,
                    textAlign: 'right',
                    bindField: 'voucherData.voucherItems.{0}.taxRate',
                    disabled: true,
                    width:80,
                },{
                    name: 'tax',
                    title: '税额',
                    type: 'float',
                    enableSum: true,
                    textAlign: 'right',
                    precision: 2,
                    bindField: 'voucherData.voucherItems.{0}.tax',
                    disabled: true,
                    flexGrow: 1,
                    width:90,

                }]
            },
            {
                name: 'voucherFooter',
                component: 'Form',
                childrens: [{
                    name: 'formItems',
                    component: 'FormItems',
                    childrens: [{
                            name: 'settlementAmount', // 结算金额
                            title: '应收金额',
                            type: 'float',
                            component: 'Input',
                            bindField: 'voucherData.voucherFooter.settlementAmount',
                            width: 150,
                            enableHideDropdownByClick: true,
                            disabled:true,
                            enableEllipsis:true,
                            after: 'labelAfterMoney',

                        },{
                            name:'bankAccount',
                            title:'收款账号',
                            type:'string',
                            component:'Select',
                            flexGrow:1,
                            bindField:'voucherData.voucherFooter.bankAccount',
                            displayMember:'name',
                            valueMember:'name',
                            dataSource:[],
                            dataSourceFetchMode: 2,
                            enableHideDropdownByClick: true,
                            width: 150,
                            showSearch: true,
                            allowClear: true,
                            dropdownFooterName: '新增账号'
                        },{
                            name: 'settlementMoney', // 收款金额
                            title: '收款金额',
                            textAlign:'right',
                            type: 'float',
                            bindField: 'voucherData.voucherFooter.settlementMoney',
                            precision: 2,
                            width: 150
                        }
                    ]
                }]
                
            }

        ]
    },
    data: initData
}
