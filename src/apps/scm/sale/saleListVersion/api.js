import * as consts from './consts'

export function getMeta() {
    return {
        name: 'root',
        component: 'Layout',
        className: 'x-tab x-list richardTicket-list',
        childrens: [
            getAddOneMeta(),
            getHeaderMeta(),
            getContentMeta(),
            getFooterMeta(),

        ]
    }
}

export function getHeaderMeta() {
    return {
        name: 'header',
        component: 'Layout',
        className: 'x-list-header',
        childrens: [
            getHeaderLeftMeta(),
            getHeaderRightMeta()
        ]
    }
}

export const puQuery = {
    meta: {
        name: 'puQuery',
        component: 'Form',
        childrens: [{
            name: 'formItems',
            component: 'FormItems',
            childrens: [
                {
                    name: 'dateRangePicker',
                    component: 'RangePicker',
                    componentName: 'DatePicker',
                    title: '日期',
                    containerId: '',
                    showLabel: true,
                    className: 'DateRangePicker',
                    style: { width: '139px' },
                    format: 'YYYY-MM-DD',
                    bindField: 'from.dateRangePicker'
                }, {
                    name: 'customer',
                    title: '客户',
                    type: 'string',
                    component: 'Select',
                    selectButtonName: '...',
                    bindField: 'from.customer',
                    width: 150,
                    combobox: false,
                    getPopupContainer: true,  // 为了 点击下拉，不让弹窗消失
                    showSearch: true,
                    allowClear: true,
                    valueMember: 'name',
                    displayMember: 'name',
                    required: false,
                    dataSource: [],
                    dataSourceFetchMode: 2
                }, {
                    name: 'salesperson',
                    title: '销售员',
                    type: 'string',
                    component: 'Select',
                    selectButtonName: '...',
                    bindField: 'from.salesperson',
                    width: 150,
                    combobox: false,
                    allowClear: true,
                    showSearch: true,
                    valueMember: 'name',
                    displayMember: 'name',
                    required: false,
                    getPopupContainer: true,
                    dataSource: [],
                    dataSourceFetchMode: 2,
                    validate: {
                        showTooltip: false,
                        placement: 'topRight',
                        rules: [{
                            required: true,
                            message: '不能为空'
                        }]
                    },
                    dropdownFooterName: '',
                    enableHideDropdownByClick: false,


                }, {
                    name: 'currencyName',
                    title: '发票类型',
                    type: 'string',
                    component: 'Select',
                    selectButtonName: '...',
                    bindField: 'from.currencyName',
                    width: 150,
                    combobox: false,
                    allowClear: true, // 可以直接删掉  x
                    showSearch: true,
                    valueMember: 'enumItemId',
                    displayMember: 'enumItemName',
                    required: false,
                    getPopupContainer: true,
                    dataSource: [],
                    // dataSourceFetchMode: 2,
                    //after:'nodeAfterCustomer',



                }/*,{
                            name: 'currencyList',
                            component: 'FormItems',
                            childrens: [{
                                name: 'currencyName',
                                title: '发票类型',
                                component: 'Select',
                                getPopupContainer: true,
                                type: 'object',
                                className:'currencyList',
                                valueMember: 'id',
                                displayMember: 'name',
                                // dataSourceFetchMode:2,
                                bindField: 'from.currencyName',
                                width:240,
                                dataSource: []
                            }]

                        }*/]
        }]
    },
    data: {

        from: {
            // dateRangePicker: [currentTime,currentTime], // 它要的结构是 数组
            dateRangePicker: {

            }, // 它要的结构是 数组
            currency: {
                id: 1,
                name: '人民币2',
            },

            isShow: true,/*'1'*/
            currencyName: {

            },
            customer: {},
            salesperson: {

            }

        },
        defaultDiplayText: ''

    }

}

export function getHeaderLeftMeta() {
    return {
        name: 'headerLeft',
        component: 'Layout',
        className: 'x-list-header-left',
        childrens: [{
            name: 'puQuery',
            title: 'puQuery',
            className: 'puQuery',
            appPath: 'apps/common/retrieve',
            placement: 'bottomLeft',
            component: 'Retrieve',
            bindField: 'puQuery',
            refName: 'puQuery'
        }, {
            name: 'yearMonth',
            component: 'MonthPicker',
            bindField: 'filter.yearMonth',
            width: 150,
        }, {
            name: 'sort',
            component: 'Dropdown',
            overlay: consts.sortTypes,
            zIcon: 'sort',
            width: 50,
            title: '排序',
        },
        {
            name: 'refresh',
            component: 'Button',
            zIcon: 'refresh',
            title: '刷新',
            colorStyle: 'orange',
            width: 50,
        }]
    }
}

export function getHeaderRightMeta() {
    return {
        name: 'headerRight',
        component: 'Layout',
        className: 'x-list-header-right',
        childrens: [{
            name: 'add',
            component: 'Button',
            type: 'primary',
            text: '记一笔',
            colorStyle: 'orange',
        }, {
            name: 'audit',
            component: 'Button',
            type: 'primary',
            text: '审核',
        }, {
            name: 'del',
            component: 'Button',
            type: 'primary',
            text: '删除'
        }, {
            name: 'import',
            component: 'Button',
            type: 'primary',
            text: '发票导入'
        }, {
            name: 'print',
            component: 'Button',
            zIcon: 'print',
            title: '打印',
            width: 50,
        }, {
            name: 'upload',
            component: 'Button',
            zIcon: 'upload',
            title: '导出Excel',
            width: 50,
        }]
    }
}

function getTabMeta() {
    return {
        name: 'headTabList',
        component: 'FormItems',
        childrens: [
            {
                name: 'puList',
                component: 'Form',
                bindField: 'data',
                childrens: [{
                    name: 'tabs',
                    component: 'Tabs',
                    activeKeyPath: 'activeKey',
                    childrens: [{
                        name: 'TAB1',
                        title: '全部单据',
                        component: 'FormItems',
                        childrens: []
                    }, {
                        name: 'TAB2',
                        title: '待审',
                        component: 'FormItems',
                        childrens: []
                    }, {
                        name: 'TAB3',
                        title: '未结清',
                        component: 'FormItems',
                        childrens: []
                    }]
                }]
            }


        ]
    }
}
export function getContentMeta() {
    return {
        name: 'content',
        component: 'Layout',
        className: 'x-list-content',
        childrens: [getTabMeta(), {
            name: 'list',
            component: 'Grid',
            bindField: 'list',
            rowHeight: 32,
            headerHeight: 32,
            disabled: true,
            enableSum: false,
            enableSequenceColumn: true,

            childrens: [{
                name: 'select',
                title: '选',
                type: 'bool',
                isSelectColumn: true,
                bindField: 'list.{0}.select',
                width: 30
            }, {
                name: 'code',
                title: '流水账号',
                bindField: 'list.{0}.code',
                type: 'string',
                displayComponent: 'Link',
                textAlign: 'center',
                width: 120
            }, {
                name: 'date',
                title: '流水时间',
                bindField: 'list.{0}.date',
                type: 'date',
                /*
                                filter: {
                                    type: 'rangePicker',
                                    valuePath: 'form.filter.date'
                                },*/
                width: 150,
                textAlign: 'center',
                visible: false
            }, {
                name: 'incomeDate',
                title: '业务日期',
                type: 'date',
                bindField: 'list.{0}.incomeDate',
                width: 100,
                textAlign: 'center'
            }, {
                name: 'incomeType',
                title: '收支分类',
                type: 'string',
                bindField: 'list.{0}.incomeType',
                width: 90,
                //textAlign:'center',
                enableEllipsis: true
            }, {
                name: 'bizType',
                title: '业务类型',
                type: 'string',
                bindField: 'list.{0}.bizType',
                flexGrow: 1,
                width: 100,
                enableEllipsis: true
            }, {
                name: 'amount',
                title: '金额',
                type: 'float',
                bindField: 'list.{0}.amount',
                enableSum: true,
                precision: 2,
                width: 100,
                textAlign: 'right',
                format: 'thousand'
            }, {
                name: 'invoiceNo',
                title: '票据编码',
                bindField: 'list.{0}.invoiceNo',
                type: 'string',
                enableEllipsis: true,
                width: 120
            }, {
                name: 'settleStyleName',
                title: '结算方式',
                type: 'string',
                bindField: 'list.{0}.settleStyleName',
                width: 90,
                enableEllipsis: true,
                visible: false
            }, {
                name: 'memo',
                title: '备注',
                type: 'string',
                bindField: 'list.{0}.memo',
                width: 150,
                enableEllipsis: true,
                flexGrow: 1,
            }, {
                name: 'workStatus',
                title: '审核状态',
                type: 'string',
                bindField: 'list.{0}.workStatus',
                width: 80,
                enableEllipsis: true,
                filter: {
                    type: 'checkbox',
                    valuePath: 'filter.workStatus',
                    dataSource: [
                        consts.statusType.normal,
                        consts.statusType.audit,
                        consts.statusType.draft,
                        consts.statusType.reject
                    ]
                }
            }, {
                name: 'docCode',
                title: '凭证号',
                bindField: 'list.{0}.docCode',
                type: 'string',
                displayComponent: 'Link',
                width: 80,
                textAlign: 'center'
            }, {
                name: 'creator',
                title: '记账员',
                type: 'int',
                bindField: 'list.{0}.creator',
                width: 70,
                enableEllipsis: true
            }, {
                name: 'auditorName',
                title: '审核人',
                type: 'int',
                bindField: 'list.{0}.auditorName',
                width: 70,
                enableEllipsis: true
            }, {
                name: 'department',
                title: '部门',
                type: 'string',
                bindField: 'list.{0}.department',
                flexGrow: 1,
                width: 100,
                enableEllipsis: true,
                visible: false
            }, {
                name: 'imageNumber',
                title: '图片数',
                type: 'int',
                displayComponent: 'Link',
                bindField: 'list.{0}.imageNumber',
                width: 100,
                textAlign: 'center',
                visible: false
            }, {
                name: 'operate',
                title: '操作',
                isFixed: true,
                width: 70,
                childrens: [{
                    name: 'audit',
                    title: '审核',
                    component: 'ZIcon',
                    zIcon: 'audit',
                    bindField: 'list.{0}.audit',
                }, {
                    name: 'reject',
                    title: '反审核',
                    component: 'ZIcon',
                    zIcon: 'reject',
                    bindField: 'list.{0}.reject',
                }, {
                    name: 'del',
                    title: '删除',
                    component: 'ZIcon',
                    colorStyle: 'orange',
                    zIcon: 'remove',
                    bindField: 'list.{0}.del',
                }]

            }],
        }]
    }
}

export function getFooterMeta() {
    return {
        name: 'footer',
        component: 'Layout',
        className: 'x-list-footer',
        childrens: [{
            name: 'pagination',
            component: 'Pagination',
            bindField: 'pagination'
        }]
    }
}

export function getAddOneMeta() {
    return {
        name: 'addOne',
        className: 'movablePanel',
        component: 'MovablePanel',
        title: '记一笔',
        showLabel: false
    }

}


export function init(post, page, filter) {
    let year = filter.year,
        month = filter.month,
        sortTypeId = filter.sortTypeId

    let data = {
        page: { currentPage: page.current, pageSize: page.pageSize }
    }

    if (year != -1 && month != -1) {
        data.sortMonth = parseInt(month)
        data.sortYear = year
    }

    if (filter) {
        if (filter.date) {
            data.beginTime = filter.date.from
            data.endTime = filter.date.to
        }

        if (filter.workStatus) {
            data.sts = filter.workStatus
        }
    }

    if (sortTypeId) {
        let orderString = consts.getOrderString(sortTypeId)
        if (orderString)
            data.order = [orderString]
    }

    return post('/v1/web/receipt/list', data)

    /*
    return {
        then: (cb) => {
            cb({ result: true, value: data })
        }
    }*/
}
