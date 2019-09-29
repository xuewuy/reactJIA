import moment from 'moment'

export const btnHiddenList = {
    'INCOMEEXPENSES':[1],              //提报收入费用汇总表
    'INCOMESUMMARY':[1],               //可提报收入汇总表
    'COSTSTATISTICS':[1],              //已提报费用汇总表
    'COSTALLOCATIONREPORT':[1],        //费用分摊汇总表
    'CONTRACTFILINGTABLE':[1],         //合同归档情况表
    'MAYCOSTSTATISTICS':[1],           //可提报费用统计表
    'INCOMESTATEMENT':[1],             //可提报收入明细表
    'COSTSTATISTICSDETAILS':[1],       //已提报费用明细表
    'COSTALLOCATIONDETAILREPORT':[1],  //费用分摊明细表
}

export function getOutAmountPie() { //支出饼图
    return {
        tooltip: {
            trigger: 'item',
            confine: true,
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            left: '7',
            top: '10',
            data: []
        },
        animation: false,//动画开关
        series: [{
            name: '',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: true,
            label: {
                normal: {
                    show: false,
                    formatter: '{b}:{c}({d}%)',
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '16',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: []
        }]
    }
}
export function getInAmountPie() { //收入饼图
    return {
        tooltip: {
            trigger: 'item',
            confine: true,
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        animation: false,//动画开关
        legend: {
            orient: 'vertical',
            x: 'left',
            left: '7',
            top: '10',
            data: []
        },
        series: [{
            name: '',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: true,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '16',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: []
        }]
    }
}
export function getReportOptionLine() { //收支柱状图
    return {
        title: {
            text: '',
            x: '0',
            y: '0',
            textStyle: {
                fontSize: 14,
                fontWeight: 'normal',
                color: '#333' // 主标题文字颜色
            }
        },
        animation: false,//动画开关
        tooltip: {
            trigger: 'axis', //是否显示提示浮层
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'line' // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: (params) => {
                let outValue = null,
                    inValue = null
                if (params[2].data && parseInt(params[2].data.originalValue) == 0) {
                    outValue = 0
                } else {
                    if (params[2].data && params[2].data.originalValue != undefined) {
                        let _outValue = parseFloat(params[2].data.originalValue)
                        if (_outValue < 0) {
                            outValue = parseFloat(params[2].data.originalValue).toFixed(2).slice(1)
                        }
                        else {
                            outValue = parseFloat(params[2].data.originalValue).toFixed(2)
                        }
                    }
                    else {
                        outValue = params[2].data && parseFloat(params[2].data.originalValue).toFixed(2).slice(1)
                    }
                }
                if (params[1].data && parseInt(params[1].data.originalValue) == 0) {
                    inValue = 0
                } else {
                    inValue = params[1].data && parseFloat(params[1].data.originalValue).toFixed(2)
                }
                return (
                    `<div style="padding:0 10px">
                        <p>
                            ${params[0].name}
                        </p>
                        <p>
                            <a style="display: inline-block; width: 10px; height: 10px; background:${params[0].color}; border-radius: 50%;" href="javascript:;"></a>
                            <span>${params[0].seriesName}:</span>
                            <span>${params[0].value}</span>
                        </p>
                        <p>
                            <a style="display: inline-block; width: 10px; height: 10px; background:${params[1].color}; border-radius: 50%;" href="javascript:;"></a>
                            <span>${params[1].seriesName}:</span>
                            <span>${inValue}</span>
                        </p>
                        <p>
                            <a style="display: inline-block; width: 10px; height: 10px; background:${params[2].color}; border-radius: 50%;" href="javascript:;"></a>
                            <span>${params[2].seriesName}:</span>
                            <span>${outValue}</span>
                        </p>
                    </div>`
                )
            }
        },
        legend: {
            data: [],
            right: '40',
            y: '55'
        },
        grid: {
            left: 40,
            right: '2%',
            top: '5%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            data: []
        }],
        yAxis: [{
            type: 'value'
        }],
        series: [{
            name: '收支差额',
            type: 'line',
            data: [],
            itemStyle: {
                normal: {
                    color: '#FEE75A'
                }
            }
        }, {
            name: '收入',
            type: 'bar',
            stack: 'group',
            barMaxWidth: '50px',
            // barMinHeight:10,
            data: []
        }, {
            name: '支出',
            type: 'bar',
            stack: 'group',
            barMaxWidth: '50px',
            // barMinHeight:10,
            data: []
        }]
    }
}


export function getCashInOutTopFive() {
    return {
        backgroundColor: '#fff',
        animation: false,//动画开关
        tooltip: {
            formatter: (params) => {
                let value = null
                if (!parseFloat(params.value)) {
                    value = 0
                } else {
                    if (params.value < 0) {
                        value = (params.value + '').slice(1)
                    } else {
                        value = params.value
                    }
                }
                return (
                    `<div style="padding:0 10px">
                        <p>
                            <p>${params.seriesName}</p>
                            <a style="display: inline-block; width: 10px; height: 10px; background:${params.color}; border-radius: 50%;" href="javascript:;"></a>
                            <span>${parseFloat(value).toFixed(2)}</span>
                        </p>
                    </div>`
                )
            }
        },
        xAxis: {
            data: []
        },
        yAxis: {
            inverse: false,
            splitArea: { show: false }
        },
        grid: {
            left: 50,
            right: 30,
            top: 30,
            bottom: 30,
            containLabel: true
        },
        series: []
    }
}

///新代账端
export function getProxyFirstPei() {
    return {
        title: {
            text: '',
            x: 'left'
        },
        text: '0',
        tooltip: {
            trigger: 'item',
            formatter: "{b}({d}%)"
        },
        legend: {
            x: 'center',
            orient: 'vertical',
            bottom: 20,
            selectedMode: false,
            data: ['已完成:0', '进行中:0', '未开始:0']
        },
        animation: false,//动画开关
        series: [
            {
                type: 'pie',
                radius: ['59%', '72%'],
                center: ['50%', '35%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            fontSize: '16',
                            fontWeight: 'bold'
                        }
                    }
                },
                data: [
                    { value: 0, name: '已完成:0', itemStyle: { normal: { color: '#B5DEB3' } } },
                    { value: 0, name: '进行中:0', itemStyle: { normal: { color: '#F6A6A6' } } },
                    { value: 0, name: '未开始:0', itemStyle: { normal: { color: '#B9C1EB' } } }
                ]
            }
        ]
    }
}
export function getProxySecondPei() {
    return {
        title: {
            text: '',
            x: 'left'
        },
        animation: false,//动画开关
        text: '0',
        tooltip: {
            trigger: 'item',
            formatter: "{b}({d}%)"
        },
        legend: {
            x: 'center',
            orient: 'vertical',
            bottom: 20,
            selectedMode: false,
            data: ['已完成:0', '进行中:0', '未开始:0']
        },
        series: [

            {
                type: 'pie',
                radius: ['59%', '72%'],
                center: ['50%', '35%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            fontSize: '16',
                            fontWeight: 'bold'
                        }
                    }
                },
                data: [
                    { value: 0, name: '已完成:0', itemStyle: { normal: { color: '#B5DEB3' } } },
                    { value: 0, name: '进行中:0', itemStyle: { normal: { color: '#F6A6A6' } } },
                    { value: 0, name: '未开始:0', itemStyle: { normal: { color: '#B9C1EB' } } }
                ]
            }
        ]
    }
}
export function getProxyThirdPei() {
    return {
        title: {
            text: '',
            x: 'left'
        },
        animation: false,//动画开关
        text: '0',
        tooltip: {
            trigger: 'item',
            formatter: "{b}({d}%)"
        },
        legend: {
            x: 'center',
            orient: 'vertical',
            bottom: 20,
            selectedMode: false,
            data: ['已完成:0', '进行中:0', '未开始:0']
        },
        series: [

            {
                type: 'pie',
                radius: ['59%', '72%'],
                center: ['50%', '35%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            fontSize: '16',
                            fontWeight: 'bold'
                        }
                    }
                },

                data: [
                    // { value: 0, name: '无需申报:0', itemStyle: { normal: { color: '#FFB500' } } },
                    { value: 0, name: '已完成:0', itemStyle: { normal: { color: '#B5DEB3' } } },
                    { value: 0, name: '进行中:0', itemStyle: { normal: { color: '#F6A6A6' } } },
                    { value: 0, name: '未开始:0', itemStyle: { normal: { color: '#B9C1EB' } } }
                ]
            }
        ]
    }
}

export function getProxyFourthPei() {
    return {
        title: {
            text: '',
            x: 'left'
        },
        animation: false,//动画开关
        text: '0',
        tooltip: {
            trigger: 'item',
            formatter: "{b}({d}%)"
        },
        legend: {
            x: 'center',
            orient: 'vertical',
            bottom: 20,
            selectedMode: false,
            data: ['已完成:0', '未开始:0', '无需催款:0']
        },
        series: [

            {
                type: 'pie',
                radius: ['59%', '72%'],
                center: ['50%', '35%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            fontSize: '16',
                            fontWeight: 'bold'
                        }
                    }
                },

                data: [
                    { value: 0, name: '已完成:0', itemStyle: { normal: { color: '#B5DEB3' } } },
                    { value: 0, name: '未开始:0', itemStyle: { normal: { color: '#B9C1EB' } } },
                    { value: 0, name: '无需催款:0', itemStyle: { normal: { color: '#F6A6A6' } } }
                ]
            }
        ]
    }
}
//新代账端结束
export function getData() {
    return {
        meta: {
            name: 'report',
            component: 'Form',
            childrens: [{
                name:'groupList',
                title: '',
                type: 'string',
                bindField: 'currGroupTeam',
                component: 'Select',
                valueMember: 'groupTeamId',
                displayMember: 'name',
                dropdownFooterName: '自定义汇总',
                dataSource: [],
                width: 200
            },{
                name: 'inAmount',
                component: 'AntGrid',
                bindField: 'inAmountTableData',
                rowHeight: 'auto',
                headerHeight: 30,
                disabled: true,
                width: true,
                childrens: [{
                    name: 'type',
                    title: '收入类型',
                    type: 'string',
                    disabled: true,
                    bindField: 'inAmountTableData.{0}.businessItem'
                }, {
                    name: 'ratio',
                    title: '比例',
                    type: 'string',
                    disabled: true,
                    bindField: 'inAmountTableData.{0}.proportion'
                }, {
                    name: 'money',
                    title: '金额',
                    type: 'string',
                    disabled: true,
                    bindField: 'inAmountTableData.{0}.amount'
                }]
            }, {
                name: 'outAmount',
                component: 'AntGrid',
                bindField: 'outAmountTableData',
                rowHeight: 'auto',
                headerHeight: 30,
                disabled: true,
                childrens: [{
                    name: 'type',
                    title: '支出类型',
                    type: 'string',
                    disabled: true,
                    bindField: 'outAmountTableData.{0}.businessItem',
                }, {
                    name: 'ratio',
                    title: '比例',
                    type: 'string',
                    disabled: true,
					textAlign: 'right',
                    bindField: 'outAmountTableData.{0}.proportion',
                }, {
                    name: 'money',
                    title: '金额',
                    type: 'string',
                    disabled: true,
					textAlign: 'right',
                    bindField: 'outAmountTableData.{0}.amount',
                }]
            }, {
                name: 'cashInOut',
                component: 'AntGrid',
                bindField: 'cashInOutTableData',
                rowHeight: 'auto',
                headerHeight: 30,
                disabled: true,
                childrens: [{
                    name: 'type',
                    title: '收支类型',
                    type: 'string',
                    disabled: true,
                    bindField: 'cashInOutTableData.{0}.name',
                }, {
                    name: 'inamount',
                    title: '流入金额',
                    type: 'string',
                    disabled: true,
					textAlign: 'right',
                    bindField: 'cashInOutTableData.{0}.inamount',
                }, {
                    name: 'outamount',
                    title: '流出金额',
                    type: 'string',
                    disabled: true,
					textAlign: 'right',
                    bindField: 'cashInOutTableData.{0}.outamount',
                }, {
                    name: 'amount',
                    title: '净现金流',
                    type: 'string',
                    disabled: true,
					textAlign: 'right',
                    bindField: 'cashInOutTableData.{0}.amount',
                }]
            }, {
                name: 'popQuery',
                component: 'FormItems',
                childrens: [{
                    name: 'startTime',
                    title: '开始时间',
                    component: 'DatePicker',
                    showLabel: true,
                    disabledDate: {},
                    bindField: 'popQuery.beginDate',
                    height: 45,
                    width: 130
                }, {
                    name: 'endTime',
                    title: '结束时间',
                    component: 'DatePicker',
                    showLabel: true,
                    disabledDate: {},
                    bindField: 'popQuery.endDate',
                    height: 45,
                    width: 130
                }]
            }, {
                name: 'proxyFirstList',
                component: 'Grid',
                bindField: 'proxyData.proxyFirstList',
                rowHeight: 30,
                headerHeight: 0,
                disabled: true,
                // titleComponent: 'proxyFirstListHeader',
                // ideHeader: true,
                // rowHeight: 30,
                // disabled: false,
                // width: true, //填写数字表示控件宽度; 填写true,表示根据列宽的合计计算总宽度,可滚动; 不填或false,表示不可滚动(最大宽度充满全屏)
                // height: true,
                childrens: [/*{
                    name:'headerLine',
                    type: 'stirng',
                    title: '序号',
                    // displayComponent:'ListTr',
                    flexGrow:1,
                    bindField: 'proxyFirstList.{0}.headerLine'
                },*/{
                        name: 'operation',
                        displayComponent: 'Link',
                        type: 'stirng',
                        textAlign: 'center',
                        title: '操作',
                        width: 165,
                        visible: false,
                        // flexGrow: 1,
                        bindField: 'proxyData.proxyFirstList.{0}.operation'
                    }, {
                        name: 'orgName',
                        type: 'stirng',
                        title: '企业名称',
                        textAlign: 'left',
                        width: 230,
                        bindField: 'proxyData.proxyFirstList.{0}.orgName'
                    }, {
                        name: 'accountDate',
                        type: 'stirng',
                        title: '当前账期',
                        textAlign: 'center',
                        flexGrow: 1,
                        bindField: 'proxyData.proxyFirstList.{0}.accountDate'
                    }, {
                        name: 'receiptStatus',
                        displayComponent: 'CellIcon',
                        type: 'stirng',
                        title: '理票',
                        flexGrow: 1,
                        bindField: 'proxyData.proxyFirstList.{0}.receiptStatus'
                    }, {
                        name: 'accountStatus',
                        displayComponent: 'CellIcon',
                        type: 'stirng',
                        title: '记账',
                        flexGrow: 1,
                        bindField: 'proxyData.proxyFirstList.{0}.accountStatus'
                    }, {
                        name: 'taxStatus',
                        displayComponent: 'CellIcon',
                        type: 'stirng',
                        title: '报税',
                        flexGrow: 1,
                        bindField: 'proxyData.proxyFirstList.{0}.taxStatus'
                    }, {
                        name: 'dunStatus',
                        displayComponent: 'CellIcon',
                        type: 'stirng',
                        title: '催款',
                        flexGrow: 1,
                        bindField: 'proxyData.proxyFirstList.{0}.dunStatusNum'
                    }]
            }, {
                name: 'peiFormItems',
                component: 'FormItems',
                childrens: [{
                    name: 'personType',
                    bindField: 'proxyData.peiData.personType',
                    width: 200,
                    component: 'Select',
                    type: 'object',
                    // dataSourceFetchMode: 0,
                    valueMember: 'userId',
                    displayMember: 'name',
                    showSearch: true,
                    filterOptionExpressions: 'userId,name',
                    dataSource: []
                }, {
                    name: 'peiDate',
                    component: 'MonthPicker',
                    bindField: 'proxyData.peiData.peiDate'
                }]
            }, {
                name: 'leftListTitle',
                component: 'FormItems',
                childrens: [{
                    name: 'searchType',
                    bindField: 'proxyData.leftListTitle.searchType',
                    width: 200,
                    component: 'Select',
                    type: 'object',
                    // dataSourceFetchMode: 0,
                    valueMember: 'id',
                    displayMember: 'name',
                    // showSearch: true,
                    // filterOptionExpressions: 'id,name',
                    dataSource: [{
                        name: '企业名称',
                        id: '0'
                    }, {
                        name: '账务进度',
                        id: 1
                    }, {
                        name: '报税进度',
                        id: 2
                    }]
                }/*,{
                    name: 'searchValue',
                    component: 'Input',
                    bindField: 'proxyData.leftListTitle.searchValue'
                }*/, {
                    name: 'accountSchedule',
                    bindField: 'proxyData.leftListTitle.accountSchedule',
                    width: 200,
                    component: 'Select',
                    type: 'object',
                    // dataSourceFetchMode: 0,
                    valueMember: 'id',
                    displayMember: 'name',
                    visible: false,
                    // showSearch: true,
                    // filterOptionExpressions: 'id,name',
                    dataSource: [{
                        name: '全部',
                        id: '0'
                    }, {
                        name: '未开始',
                        id: 1
                    }, {
                        name: '进行中',
                        id: 2
                    }, {
                        name: '已完成',
                        id: 3
                    }]
                }, {
                    name: 'taxSchedule',
                    bindField: 'proxyData.leftListTitle.taxSchedule',
                    width: 200,
                    component: 'Select',
                    type: 'object',
                    // dataSourceFetchMode: 0,
                    valueMember: 'id',
                    displayMember: 'name',
                    visible: false,
                    // showSearch: true,
                    // filterOptionExpressions: 'id,name',
                    dataSource: [{
                        name: '全部',
                        id: '0'
                    }, {
                        name: '未开始',
                        id: 1
                    }, {
                        name: '进行中',
                        id: 2
                    }, {
                        name: '已完成',
                        id: 3
                    }, {
                        name: '无需申报',
                        id: 4
                    }]
                }]
            }, {
                name: 'proxyRightList',
                component: 'Grid',
                bindField: 'proxyData.proxyRightList',
                rowHeight: 30,
                headerHeight: 30,
                disabled: true,
                // titleComponent: 'proxyFirstListHeader',
                // ideHeader: true,
                // rowHeight: 30,
                // disabled: false,
                // width: true, //填写数字表示控件宽度; 填写true,表示根据列宽的合计计算总宽度,可滚动; 不填或false,表示不可滚动(最大宽度充满全屏)
                // height: true,
                childrens: [{
                    name: 'operation',
                    type: 'stirng',
                    title: '操作',
                    textAlign: 'center',
                    displayComponent: 'Link',
                    width: 50,
                    bindField: 'proxyData.proxyRightList.{0}.operation'
                }, {
                    name: 'name',
                    type: 'stirng',
                    title: '企业名称',
                    textAlign: 'left',
                    flexGrow: 1,
                    bindField: 'proxyData.proxyRightList.{0}.name'
                }]
            }, {
                name: 'leftPage',
                component: 'Pagination',
                bindField: 'proxyData.leftPage',
                pageSizeOptions: ['15']
            }, {
                name: 'rightPage',
                component: 'Pagination',
                bindField: 'proxyData.rightPage',
                pageSizeOptions: ['15']
            }]
        },
        data: {
            reportOptionLine: getReportOptionLine(), //报表柱状图
            outAmountPie: getOutAmountPie(), //支出柱状图
            inAmountPie: getInAmountPie(), //收入柱状图
            cashInOutTopFive: getCashInOutTopFive(),//现金流量柱状图
            switchTime: 1,
            reportText: '本月',
            inAmount: '', //收入金额
            outAmount: '', //支出金额
            profits: '', //利润金额
            switchCashFlowState: true,
            switchInOut: true,
            expensesState: true,
            queryDate: '',
            orgType: 1,////////////////新增属性，到时传到线上前删掉
            popQuery: {
                beginDate: moment().startOf('month').format("YYYY-MM-DD"),
                endDate: moment().endOf('month').format("YYYY-MM-DD")
            },
            proxyData: {

                proxyFirstList: getProxyFirstList(),
                peiData: {
                    personType: undefined,
                    peiDate: undefined
                },
                rightDate: {
                    firstDate: undefined,
                    lastDate: undefined
                },
                leftListTitle: {
                    searchType: {
                        name: '企业编码或名称',
                        id: '0'
                    },
                    searchValue: undefined,
                    accountSchedule: {
                        name: '全部',
                        id: '0'
                    },
                    taxSchedule: {
                        name: '全部',
                        id: '0'
                    }
                },
                proxyRightList: [],
                firstPei: getProxyFirstPei(),
                secondPei: getProxySecondPei(),
                thirdPei: getProxyThirdPei(),
                fourthPei: getProxyFourthPei(),
                leftPage: {
                    pageSize: 15

                },
                rightPage: {
                    pageSize: 15
                }
            },
            // proxySecondList: getProxySecondList(),
            popVisible: false,
            cashInOutTableData: [],//现金流表格数据
            inAmountTableData: [],//收入表格数据
            outAmountTableData: []//支出表格数据
        },
        btnHiddenList: btnHiddenList,
    }
}
export function getProxyFirstList() {
    return []
}

export function getProxyTopOptionLine() {
    return {
        title: {
            text: '收费回款统计',
            x: '4',
            textStyle: {
                fontSize: 14,
                fontWeight: 'normal',
                color: '#333' // 主标题文字颜色
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: ['本期营业收入', '一般纳税人', '小规模纳税人'],
            // right : '45',
            y: '4',
            // x:'right',
            right: '4',
            itemWidth: 10, // 图例图形宽度
            itemHeight: 10,
        },
        toolbox: {
            // feature: {
            //     // dataZoom: {
            //     //     yAxisIndex: 'none'
            //     // },
            //     dataView: {readOnly: false},
            //     magicType: {type: ['line', 'bar']},
            //     restore: {},
            //     saveAsImage: {}
            // }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            // boundaryGap : false,
            data: ['财务托管', '财税梳理', '财税咨询', '上市服务', '方案筹划', '汇算清缴', '财产损失', '政府沟通']
        }],
        yAxis: [{
            type: 'value'
        }],
        series: [{
            name: '本期营业收入',
            type: 'bar',
            stack: '总量',
            areaStyle: { normal: {} },
            barWidth: '50',
            itemStyle: {
                normal: {
                    color: '#9BA7C4'
                }
            },
            data: [14000000, 5000000, 9000000, 17000000, 7000000, 11600000, 3500000, 8800000]
        }, {
            name: '一般纳税人',
            type: 'bar',
            stack: '总量',
            areaStyle: { normal: {} },
            barWidth: '50',
            itemStyle: {
                normal: {
                    color: '#D1917B'
                }
            },
            data: [9000000, 3000000, 6000000, 11000000, 4800000, 6800000, 2000000, 5300000]
        }, {
            name: '小规模纳税人',
            type: 'bar',
            stack: '总量',
            areaStyle: { normal: {} },
            barWidth: '50',
            itemStyle: {
                normal: {
                    color: '#9DC6B3'
                }
            },
            data: [5000000, 2000000, 3000000, 6000000, 2200000, 4800000, 1500000, 3500000]
        }]
    }
}

export function getProxyBottomLeftOptionBar() {
    return {
        title: {
            text: '各部门工作量排行榜',
            x: '4',
            textStyle: {
                fontSize: 14,
                fontWeight: 'normal',
                color: '#333' // 主标题文字颜色
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: ['散户数', '一般纳税人', '小规模纳税人'],
            right: '4',
            // x:'right',
            y: '4',
            itemWidth: 10, // 图例图形宽度
            itemHeight: 10,
        },
        toolbox: {
            // feature: {
            //     // dataZoom: {
            //     //     yAxisIndex: 'none'
            //     // },
            //     dataView: {readOnly: false},
            //     magicType: {type: ['line', 'bar']},
            //     restore: {},
            //     saveAsImage: {}
            // }
        },
        grid: {
            left: '3%',
            right: '5%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: ['业务五部', '业务三部', '业务二部', '业务一部', '业务四部']
        }],
        yAxis: [{
            type: 'value'
        }],
        series: [{
            name: '散户数',
            type: 'line',
            data: [200, 190, 300, 440, 600]
        }, {
            name: '一般纳税人',
            type: 'line',
            // stack: '广告',
            data: [130, 180, 260, 390, 540]
        }, {
            name: '小规模纳税人',
            type: 'line',
            itemStyle: {
                normal: {
                    color: '#FFB980'
                }
            },
            // stack: '广告',
            data: [180, 130, 160, 210, 140]
        }]
    }
}

export function getProxyBottomRightOptionPie() {
    return {
        title: {
            text: '销售签约榜',
            x: '4',
            textStyle: {
                fontSize: 14,
                fontWeight: 'normal',
                color: '#333' // 主标题文字颜色
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            // x : 'right',
            y: '4',
            right: '4',
            itemWidth: 10, // 图例图形宽度
            itemHeight: 10,
            data: ['业务二部(王二)', '业务六部(钱五)', '业务七部(刘八)', '业务一部(张一)', '业务三部(李三)', '业务四部(赵四)']
        },
        toolbox: {
            // show : true,
            // feature : {
            //     mark : {show: true},
            //     dataView : {show: true, readOnly: false},
            //     magicType : {
            //         show: true,
            //         type: ['pie', 'funnel'],
            //         option: {
            //             funnel: {
            //                 x: '25%',
            //                 width: '50%',
            //                 funnelAlign: 'center',
            //                 max: 1548
            //             }
            //         }
            //     },
            //     restore : {show: true},
            //     saveAsImage : {show: true}
            // }
        },
        calculable: true,
        series: [{
            name: '签约总额',
            type: 'pie',
            radius: ['40%', '60%'],
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    }
                },
                emphasis: {
                    label: {
                        show: true,
                        position: 'center',
                        textStyle: {
                            fontSize: '14',
                            fontWeight: 'bold'
                        }
                    }
                }
            },
            data: [
                { value: 40000, name: '业务二部(王二)' },
                { value: 32000, name: '业务六部(钱五)' },
                { value: 15000, name: '业务七部(刘八)' },
                { value: 50000, name: '业务一部(张一)' },
                { value: 40000, name: '业务三部(李三)' },
                { value: 30000, name: '业务四部(赵四)' }
            ]
        }]
    }
}
