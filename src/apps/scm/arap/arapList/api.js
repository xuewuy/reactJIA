import moment from 'moment'
import * as consts from '../../utils/consts'
let currentTime = moment().format('YYYY-MM-DD')
// let currentTime = moment().startOf('month').format("YYYY-MM-DD")
                  
export const accountQuery = {
    meta: {
        name: 'accountQuery',
        component: 'Form',
        childrens: [{
            name: 'formItems',
            component: 'FormItems',
            childrens: [
            /*{
                name: 'dateRangePicker',
                title: '期间',
                containerId: 'pickerWrap',
                component: 'DateRangePicker',
                className: 'MonthRangePicker',
                componentName: 'MonthPicker',
                calendarContainerId: 'pickerWrap',
                format: 'YYYY-MM-DD',
                startDate: '',
                bindField: 'from.dateRangePicker',
                style: { width: '109px' }
            }*/{
                name:'dateRangePicker',
                component:'RangePicker',
                componentName:'DatePicker',
                title:'日期',
                containerId:'',
                showLabel:true,
                className:'DateRangePicker',
                // componentName:'MonthPicker',
                style:{width:'139px'},
                format:'YYYY-MM-DD',
                bindField:'from.dateRangePicker'
            },
            {
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
                dataSource: []
                // dataSourceFetchMode: 2, // getByAjax()
                //after:'nodeAfterCustomer',
                
                            
            }]
        }]
    },
    data:{
        
        from: {
            dateRangePicker:  {
                rangeStart:currentTime,
                rangeEnd:currentTime,
            }, // 它要的结构是 数组
            currency: {
                id: 1,
                name: '人民币2',
            },
            
            isShow: true,/*'1'*/
            currencyName:{
                 
            },
            customer:{},
            

        },
        defaultDiplayText:''

    }
}


export function getMeta() {
    return {
        name: 'root',
        component: 'DynamicPage',
        childrens: [{
            name: 'accountQuery',
            title: 'accountQuery',
            appPath: 'apps/common/retrieve',
            placement: 'bottomLeft',
            component: 'Retrieve',
            refName: 'accountQuery',
            btnTextAlign: 'right',
            bindField: 'accountQuery'
        }, {
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
                title: '单据编码',
                bindField: 'list.{0}.code',
                type: 'string',
                displayComponent: 'Link',
                textAlign: 'center',
                width: 130
            },{
                name: 'customerId',
                title: 'customerId',
                type: 'string',
                bindField: 'list.{0}.customerId',
                width: 150,
                visible:false,
            },
            {
                name: 'customerName',
                title: '客户',
                type: 'string',
                bindField: 'list.{0}.customerName',
                width: 160,
                enableEllipsis: true
            }, {
                name: 'date',
                title: '收款日期',
                bindField: 'list.{0}.date',
                type: 'date',
                width: 100,
                textAlign: 'center',
                visible: false
            }, {
                name: 'businessDate',
                title: '收款日期',
                type: 'date',
                bindField: 'list.{0}.businessDate',
                width: 120,
                textAlign: 'center',
            }, {
                name: 'receivePayAmount',
                title: '收款金额',
                type: 'float',
                bindField: 'list.{0}.receivePayAmount',
                enableSum: true,
                precision: 2,
                width: 130,
                textAlign: 'center'
            },  {
                name: 'bankAccountId',
                title: 'bankAccountId',
                type: 'string',
                bindField: 'list.{0}.bankAccountId',
                width: 150,
                visible:false,
                flexGrow:1

            },{
                name: 'bankAccountName',
                title: '收款方式',
                type: 'string',
                bindField: 'list.{0}.bankAccountName',
                width: 120,
                enableEllipsis: true,
                flexGrow:1
            },{
                name: 'creatorName',
                title: '制单人',
                type: 'string',
                bindField: 'list.{0}.creatorName',
                width: 130,
                enableEllipsis: true
            },
            {
                name: 'auditorName',
                title: '审核人',
                type: 'string',
                bindField: 'list.{0}.auditorName',
                width: 130,
                enableEllipsis: true
            },{
                name: 'statusName',
                title: '审核状态',
                type: 'string',
                bindField: 'list.{0}.statusName',
                width: 100,
                enableEllipsis: true,
                filter: {
                    type: 'checkbox',
                    valuePath: 'filter.auditStatus',
                    dataSource: [
                        consts.auditStatus.normal,
                        consts.auditStatus.audit,
                        consts.auditStatus.reject
                    ]
                }
            }/*, {
                name: 'voucherType',
                title: '单据类型',
                bindField: 'list.{0}.voucherType',
                type: 'string',
                enableEllipsis: true,
                width: 100,
                textAlign: 'center'
                /*filter: {
                    type: 'checkbox',
                    valuePath: 'filter.voucherType',
                    dataSource: [
                        consts.voucherType.sale,
                        consts.voucherType.unsale
                    ]
                }
            }*/]
        }, {
            name: 'paging',
            component: 'Pagination',
            bindField: 'paging',
            pageSizeOptions: ['20','50','100','200']
        }]
    }
}

export function getData() {
    return {
        batchAuditArr:[], //批量审核数组
        daterangePicker:[moment().startOf('month').format("YYYY-MM-DD HH:mm:ss"),moment().endOf('month').format("YYYY-MM-DD HH:mm:ss")],
        queryPrams: {
            "beginDate":'',
            "endDate":'',
            "customerIds": [],
            "page": {
                "currentPage": 1,
                "pageSize": 20
            }
        },
        list: {
            id:undefined,
            code:undefined,
            status:1,
            ts:''
        },
        paging: {
            current: 1,
            pageSize: 20,
            total: ''
        },
        accountQuery: accountQuery
    }
}

export function init() {
    return {
        then: (cb) => {
            cb({
                result: true,
                value: true
            })
        }
    }
}
