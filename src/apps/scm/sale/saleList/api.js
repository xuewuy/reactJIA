
import * as consts from './consts'
import moment from 'moment'
// let currentTime = moment().get('year') + '-' + (moment().get('month')+1)+'-'+ moment().get('day')
let currentTime = moment().format('YYYY-MM-DD')

let currentYear = moment().get('year'),
    currentMonth = moment().get('month')+1,
    defaultValue = {rangeStart:moment().startOf('month').format("YYYY-MM"),rangeEnd:moment().endOf('month').format("YYYY-MM")}





export const puQuery={
    meta:{
        name:'puQuery',
        component:'Form',
        childrens:[{
            name:'formItems',
            component:'FormItems',
            childrens:[




            /*{
                name: 'dateRangePicker',
                title: '期间',
                containerId: 'pickerWrapZZ',
                // component: 'DateRangePicker',
                component: 'RangePicker',
                className: 'MonthRangePicker',
                componentName: 'MonthPicker',
                calendarContainerId: 'pickerWrapZZ',
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
            },{
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
                            //after:'nodeAfterCustomer',
                            // validate: {
                            //     showTooltip: false,
                            //     placement: 'topRight',
                            //     rules: [{
                            //         required: true,
                            //         message: '不能为空'
                            //     }]
                            // },
                            // // enableHideDropdownByClick: true,
                            // dropdownFooterName: '新增客户',
                            // enableHideDropdownByClick: true,
                            

                        },{
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
                            //after:'nodeAfterCustomer',
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
                           

                        },{
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
    data:{
        
        from: {
            // dateRangePicker: [currentTime,currentTime], // 它要的结构是 数组
            dateRangePicker: {
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
            salesperson:{

            }

        },
        defaultDiplayText: ''

    }

}

const initData = {
    filters: {
        startYear: currentYear,            //期间起始年
        startPeriod: currentMonth,             //期间起始月
        endYear: currentYear,              //期间终止年
        endPeriod: currentMonth,              //期间终止年
        startCode: null,            //起始凭证号
        endCode: null,             //终止凭证号
        accountId: null,               //科目ID
        summary:null,
        docIds:null,    //idList
        page:{
           currentPage:1, 
           pageSize:5
        }
    },
    puList: [],
    isCheckedAll:false,
    auditIsDisabled:true,
    puQuery:puQuery,
    defaultQuery:'',
    paging:{
        current:1,   // 现在 在 那一页
        pageSize:20, // 每页多少个
        total:12    // 一共多少 条
    },
    batchAuditArr:[], //批量审核数组
    BokAudit:false,
    thisIndexS:0
}



export const puVoucherList={
    meta:{
        name:'puVoucherList',
        component:'DynamicPage',
        childrens: [{
            name: 'puList',
            component: 'Grid',
            bindField: 'puList',
            //rowClassName: 'voucherItemRow',
            // disabled: false,
            // width: false, //填写数字表示控件宽度; 填写true,表示根据列宽的合计计算总宽度,可滚动; 不填或false,表示不可滚动(最大宽度充满全屏)
            // height: true,
            rowHeight: 32,
            headerHeight: 32,
            disabled: true,
            enableSum: false,
            enableSequenceColumn: true,
            flexGrow:1,

            childrens: [{
                name: 'select',
                title: '选',
                type: 'bool',
                isSelectColumn: true,
                bindField: 'puList.{0}.select',
                width: 30,
                flexGrow:1,

            }, {
                name: 'code',
                title: '单据编号',
                bindField: 'puList.{0}.code',
                type: 'string',
                displayComponent: 'Link',
                textAlign:'center',
                width: 120
            },{
                name: 'customer',
                title: '客户',
                bindField: 'puList.{0}.customerName',
                type: 'date',
                textAlign:'center',
                flexGrow:1,
            }, {
                name: 'date',
                title: '销售日期',
                type: 'date',
                format: 'yyyy-MM-dd',
                bindField: 'puList.{0}.businessDate',
                width: 90,
                textAlign:'center'
            },{
                name: 'amountTax',
                title: '金额（含税）',
                type: 'float',
                bindField: 'puList.{0}.totalAmountWithTax',
                columnGroup: true,
                enableSum: true,
                precision: 2,
                textAlign:'center',
                flexGrow:1,
            },{
                name: 'amountAfterDiscount',
                title: '应收金额',
                type: 'float',
                bindField: 'puList.{0}.totalSettleAmount',
                enableSum: true,
                precision: 2,
                flexGrow:1,
                enableEllipsis: true,
                textAlign:'center',
                columnGroup: true
            }, {
                name: 'amountNotCarried',
                title: '未结金额',
                type: 'float',
                bindField: 'puList.{0}.unpaidAmount',
                enableSum: true,
                precision: 2,
                flexGrow:1,
                textAlign:'center',
                columnGroup: true
            },{
                name: 'auditStatus',
                title: '审核状态',
                flexGrow:1,
                type: 'string',
                bindField: 'puList.{0}.statusName',
                showTips: true,
                enableEllipsis: true,
                width:60,
                textAlign:'center'
            },{
                name: 'settlementStatus',
                title: '结算状态',
                type: 'string',
                bindField: 'puList.{0}.settleStatusName',
                showTips: true,
                width:60,
                textAlign:'center'
            },{
                name: 'documentType',
                title: '单据类型',
                bindField: 'puList.{0}.deliveryTypeName',
                type: 'string',
                // displayComponent: 'Link', // 跳转的方法
                width:70,
                columnGroup: true,
                textAlign:'center',
            }, {
                name: 'noteType',
                title: '票据类型',
                type: 'string',
                bindField: 'puList.{0}.invoiceTypeName',
                // width: 120,
                showTips: true,
                textAlign:'center',
                flexGrow:1
            },{
                name: 'salesperson',
                title: '销售员',
                type: 'int',
                bindField: 'puList.{0}.salesPersonName',
                // width: 88,
                showTips: true,
                columnGroup: true,
                textAlign:'center',
                flexGrow:1
            }
            ]
        },
        {
            name:'puQuery',
            title:'puQuery',
            className:'puQuery',
            appPath:'apps/common/retrieve',
            placement:'bottomLeft',
            component:'Retrieve',
            bindField:'puQuery',
            refName:'puQuery'
        },{
            name: 'headTabList',
            component: 'FormItems',
            childrens:[
                {
                    name:'puList',
                    component: 'Form',
                    bindField: 'data',
                    childrens:[{
                          name:'tabs',//TAB切换开始#########################################
                          component: 'Tabs',
                          activeKeyPath:'activeKey',
                          childrens:[{
                              name: 'TAB1',
                              title: '全部单据',
                              component:'FormItems',
                              childrens:[]
                            },{
                              name: 'TAB2',
                              title: '待审',
                              component:'FormItems',
                              childrens:[]
                            },{
                              name: 'TAB3',
                              title: '未结清',
                              component:'FormItems',
                              childrens:[]
                            }]
                    }]
                }


            ]
        },{
            name: 'paging',
            component: 'Pagination',
            bindField: 'paging',
            pageSizeOptions: ['20','50','100','200']
        }]
    },
    data:initData
}


   


export function init(post){
	return post('/v1/sa/delivery/queryInitList',{
    "startTime": '',
    "endTime": '',
    "page": {
        "currentPage": 1,
        "pageSize": 20
    }
})
}