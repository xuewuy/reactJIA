//grid的行高
export const GRID_ROW_HEIGHT = 40
export const GRID_HEADER_HEIGHT = 38
export const GRID_FOOTER_HEIGHT = 40

export const ARROWUP = 38
export const ARROWDOWN = 40
export const ARROWLEFT = 37
export const ARROWRIGHT = 39

//空的行数据
export const blankVoucherItem = {


}

//空的数据
export const emptyVoucherData = {
    voucherHeader: {

    },
    form: {

    },
    enclosures: [],
    voucherItems: [
        blankVoucherItem,
        blankVoucherItem,
        blankVoucherItem,
        blankVoucherItem,
        blankVoucherItem
    ],
    voucherFooter: {

    }
}

export const initData = {
    voucherData: emptyVoucherData,
    curCellCodeAndName: undefined,
    overdraftAmount: 0,//欠款累计
    prePayment: 0,
    newArr_z: 0,
    settlementMoney: 0,
    voucherHeader: {
        invoiceType: [],
        personsList: []
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
                            name: 'add',
                            title: '新增',
                            showLabel: false,
                            component: 'Button',
                            type: 'primary',
                            width: 150,
                            text: '新增'
                        }, {
                            name: 'sort',
                            component: 'Dropdown',
                            trigger: 'hover',
                            overlay: [{
                                id: 1,
                                title: '默认'
                            }, {
                                id: 2,
                                title: '业务日期从大到小'
                            }, {
                                id: 3,
                                title: '业务日期从小到大'
                            }, {
                                id: 4,
                                title: '金额从大到小'
                            }, {
                                id: 5,
                                title: '金额从小到大'
                            }],
                            icon: 'search',
                            type: 'primary',
                            width: 50,
                        },
                        {
                            name: 'refresh',
                            component: 'Button',
                            icon: 'search',
                            type: 'primary',
                            width: 50,
                        }
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
                    name: 'number',
                    title: '数量',
                    type: 'float',
                    precision: 0,
                    enableSum: true,
                    numberOnly: true,
                    autoSelect: true,
                    textAlign: 'center',
                    //displayComponent:'Input',
                    component: 'InputNumber',
                    regex: '^([0-9]+)$',
                    // regex: '^(-?[0-9]+)(?:\.[0-9]{1,2})?$',
                    bindField: 'voucherData.voucherItems.{0}.number',
                    allChange: true,
                    autoSelect: true,
                    min: 0,
                    width: 90,
                },
                {
                    name: 'unitPrice',
                    title: '单价',
                    type: 'string',
                    precision: 2,
                    textAlign: 'right',
                    bindField: 'voucherData.voucherItems.{0}.unitPrice',
                    width: 100,
                    disabled: true,

                }, {
                    name: 'amountOfMoney',
                    title: '金额',
                    type: 'float',
                    precision: 2,
                    enableSum: true,
                    textAlign: 'right',
                    bindField: 'voucherData.voucherItems.{0}.amountOfMoney',
                    width: 110,
                    disabled: true,

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
                        disabled: true,
                        enableEllipsis: true,
                        after: 'labelAfterMoney',

                    }
                    ]
                }]

            }

        ]
    },
    data: initData
}
