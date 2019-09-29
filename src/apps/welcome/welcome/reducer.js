/**
 * Created by shenxy on 16/8/26.
 */
import * as dr from 'dynamicReducer'
import { List, fromJS } from 'immutable'
import moment from 'moment'
/**
 * 设置初始化页面数据
 * @param {[type]} state     [description]
 * @param {[type]} dataValue [description]
 */
export function setInitViewData(state,dataValue){
    // 收支表
    state = dr.setterByField(state,'inAmount',dataValue.accountsChartData.tableData.total.inAmount)
    state = dr.setterByField(state,'outAmount',dataValue.accountsChartData.tableData.total.outAmount)
    state = dr.setterByField(state,'profits',dataValue.accountsChartData.tableData.total.profits)
    state = dr.setterByField(state,'tax',dataValue.accountsChartData.tableData.total.tax)
    state = dr.setterByField(state,'reportOptionLine',fromJS(dataValue.accountsChartData.barData))
    
    // 支出
    if(!dr.getterByField(state,'switchInOut')){
        state = dr.setterByField(state,'inAmountTableData',fromJS(dataValue.expenseData.tableData))
        state = dr.setterByField(state,'inAmountPie',fromJS(dataValue.expenseData.barData))
    }else{
        state = dr.setterByField(state,'outAmountTableData',fromJS(dataValue.expenseData.tableData))
        state = dr.setterByField(state,'outAmountPie',fromJS(dataValue.expenseData.barData))
    }
    state = dr.setterByField(state,'queryDate',dataValue.displayTime)
    state = dr.setterByField(state,'oldQueryDate',dataValue.displayTime)
    let switchTime = dataValue.switchTimeId,
        reportText = dr.getterByField(state,'reportText')
        /*switchTime说明
        0代表本年 year
        1代表本月 month
        2代表自定义
        3代表上一年 lastYear
        4代表上一月 lastMonth
        switchInOut//true为outfalse为in
    */
    if(switchTime == 0){
        reportText = '本年'
    }else if(switchTime == 1){
        reportText = '本月'
    }else if(switchTime == 2){
        reportText = ''
    }else if(switchTime == 3){
        reportText = '上年'
    }else if( switchTime == 4){
        reportText = '上月'
    }else{
        reportText = '本月'
        switchTime = 1
    } 
    state = dr.setterByField(state,'reportText',reportText)
    state = dr.setterByField(state,'switchTime',switchTime)
    state = dr.setterByField(state,'popVisible',false)
    if(dataValue.enabledTime){
        state = dr.setter(state,'report.popQuery.startTime','disabledDate',{minDisabledDate:dataValue.enabledTime})
        state = dr.setter(state,'report.popQuery.endTime','disabledDate',{minDisabledDate:dataValue.enabledTime})
    }
    // 现金流量
    state = dr.setterByField(state,'cashInOutTopFive',fromJS(dataValue.cashFlowDate.barData))
    state = dr.setterByField(state,'cashInOutTableData',fromJS(dataValue.cashFlowDate.tableData))
    if (dataValue.groupTeamList){
        state = dr.setterByField(state, 'groupTeamList', fromJS(dataValue.groupTeamList))
    }
    state = dr.setterByField(state,'isLf',dataValue.isLf)
    return state
}

export function setGroupList (state,ajaxValue,newId){
    state = dr.setterByField(state, 'groupTeamList', fromJS(ajaxValue))
    state = dr.setterByField(state, 'currGroupTeam', fromJS(ajaxValue.filter(e => e.groupTeamId == newId)[0]))
    return state
}

/**
 * 切换企业汇总
 * @param {*} state 
 * @param {*} teamId 
 */
export function groupChange(state, newValue){
    state = dr.setterByField(state, 'currGroupTeam', newValue)
    return state
}

export function setGroupTeamList(state,list){
    state = dr.setter(state, 'report.groupList', 'dataSource', fromJS(list))
    return state
}
export function setProxyInitViewData(state,dataValue,rightListValue,org,findAdminCode) {
    let proxyData = dr.getterByField(state,'proxyData').toJS(),
        proxyFirstList = proxyData.proxyFirstList,
        firstPei = proxyData.firstPei,
        secondPei = proxyData.secondPei,
        thirdPei = proxyData.thirdPei,
        fourthPei = proxyData.fourthPei,
        peiData = proxyData.peiData,
        taxEndDate = dataValue.taxEndDate,
        leftData = countLeftData(state, dataValue),
        customerList = countRightList(state,rightListValue),
        currentUserId = dataValue.userId,
        currentUser,
        personList = [{name:'全部',userId:'0'}],
        peiDataSource,
        list = {
            year: dataValue.year,
            month: dataValue.month
        },
        rightDate
        if(dataValue.month==12) {
            rightDate = countRightDate(state, dataValue.taxEndDate,{year:dataValue.year,month:dataValue.month})
        } else {
            rightDate = countRightDate(state, dataValue.taxEndDate,{year:dataValue.year,month:dataValue.month+1})

        }
        //日历选中日期
    //日期
    let maxTime
    if(list.month+1<10) {
        maxTime = list.year+'-0'+(list.month+1)
    } else if(list.month+1>12) {
        maxTime = (list.year+1)+'-01'
    } else {
        maxTime = list.year+'-'+(list.month+1)
    }
    if(list.month<10) {
        list.month = '0'+list.month
    }
    peiData.peiDate = list.year+'-'+list.month
    state = dr.setter(state,'report.peiFormItems.peiDate','max',maxTime)

    //饼图的下拉列表
    if(dataValue.personList instanceof Array) {
        dataValue.personList.map(o=> {
            if(o.userId == currentUserId) {
                currentUser = o
                return 
            }
        })
        personList = personList.concat(dataValue.personList)
    } else {
        currentUser = dataValue.personList
        personList.push(dataValue.personList)
    }
    state = dr.setter(state,'report.peiFormItems.personType','dataSource',fromJS(personList))
    //左下表
 
    //饼图
    proxyData.proxyFirstList = leftData.proxyFirstList
    proxyData.firstPei = leftData.firstPei
    proxyData.secondPei = leftData.secondPei
    proxyData.thirdPei = leftData.thirdPei
    proxyData.fourthPei = leftData.fourthPei
    proxyData.rightDate = rightDate
    proxyData.peiData = peiData
    proxyData.proxyRightList = customerList
    proxyData.peiData.personType = currentUser
    proxyData.userId = dataValue.userId
    proxyData.org = org
    proxyData.liveParam = rightListValue.liveParam
    if(dataValue.page) {

        proxyData.leftPage = {
            current: dataValue.page.currentPage,
            total: dataValue.page.sumCloum,
            pageSize: dataValue.page.pageSize
        }
    }
    if(rightListValue.page) {
        proxyData.rightPage = {
            current: rightListValue.page.currentPage,
            total: rightListValue.page.sumCloum,
            pageSize: rightListValue.page.pageSize
        }
    }
    if(dataValue.isAdmin) {
        state = dr.setter(state,'report.peiFormItems.personType','visible',true)
    } else {
        state = dr.setter(state,'report.peiFormItems.personType','visible',false)

    }
    state = dr.setterByField(state,'proxyData',fromJS(proxyData))
    proxyData.proxyRightList.map((e,i)=>{
        state = dr.setter(state,`report.proxyRightList.operation,${i}`,'disabled',!!!findAdminCode)
    })
    return state
}
//
export function updateRightList(state,dataValue,name,findAdminCode) {
    let rightList = countRightList(state,dataValue)
    state = dr.setterByField(state,'proxyData.proxyRightList',fromJS(rightList))
    state = dr.setterByField(state,'proxyData.rightSearchValue',name)
    state = dr.setterByField(state,'proxyData.liveParam',fromJS(dataValue.liveParam))
    
    state = dr.setterByField(state,'proxyData.rightPage',fromJS({
        current: dataValue.page.currentPage,
        total: dataValue.page.sumCloum,
        pageSize: dataValue.page.pageSize
    }))
    rightList.map((e,i)=>{
        state = dr.setter(state,`report.proxyRightList.operation,${i}`,'disabled',!!!findAdminCode)
    })
    return state
}
export function countRightList(state,dataValue) {
    let customerList = dataValue.customerList
    customerList = customerList.map(o=> {
        return {
            name:o.name,
            id: o.id,
            operation: '建账'
        }
    })

    return customerList
}
//整理左侧数据类型，初始化，和更改左上角都用到了
export function countLeftData(state,dataValue,newValue) {
    let chartData = dataValue.chartData[0],
        customeStatusList = dataValue.customeStatusList,
        acountCount1 = chartData.acountCount1?chartData.acountCount1:0,
        acountCount2 = chartData.acountCount2?chartData.acountCount2:0,
        acountCount3 = chartData.acountCount3?chartData.acountCount3:0,
        acountSum = acountCount1+acountCount2+acountCount3,
        receiptCount1 = chartData.receiptCount1?chartData.receiptCount1:0,
        receiptCount2 = chartData.receiptCount2?chartData.receiptCount2:0,
        receiptCount3 = chartData.receiptCount3?chartData.receiptCount3:0,
        receiptSum = receiptCount1+receiptCount2+receiptCount3,
        taxCount1 = chartData.taxCount1?chartData.taxCount1:0,
        taxCount2 = chartData.taxCount2?chartData.taxCount2:0,
        taxCount3 = chartData.taxCount3?chartData.taxCount3:0,
        // taxCount4 = chartData.taxCount4?chartData.taxCount4:0,
        taxSum = taxCount1+taxCount2+taxCount3,
        dunCount1 = chartData.dunCount1?chartData.dunCount1:0,
        dunCount2 = chartData.dunCount2?chartData.dunCount2:0,
        dunCount3 = chartData.dunCount3?chartData.dunCount3:0,
        dunSum = dunCount1+dunCount2+dunCount3,
        proxyData = dr.getterByField(state,'proxyData').toJS(),
        proxyFirstList = proxyData.proxyFirstList,
        firstPei = proxyData.firstPei,
        secondPei = proxyData.secondPei,
        thirdPei = proxyData.thirdPei,
        fourthPei = proxyData.fourthPei,
        peiData = proxyData.peiData,
        curRole = dr.getterByField(state,'curRole'),
        obj = {}
    //左下表
    proxyFirstList = customeStatusList.map(o => {
        //proxyFirstList新增字段dunStatusNum，将后端传来的催款状态dunStatus变成前端显示时需要的状态dunStatusNum
        let dunStatusNum,receiptStatus,accountStatus,taxStatus

        if(o.dunStatus==2) {//未催款
            dunStatusNum = 1
        } else if(o.dunStatus==3) {//已催款
            dunStatusNum = 3
        } else if(o.dunStatus==1) {//无需催款
            dunStatusNum = 5       
        }
        if(curRole==='003') {
            accountStatus = undefined
            taxStatus = undefined
        } else {
            accountStatus = o.accountStatus
            taxStatus = o.taxStatus
        }
        //还得加入权限
        return {
            operation: '进入账簿',
            orgId: o.orgId,
            orgName: o.orgName,
            accountDate: o.accountDate,
            receiptStatus: o.receiptStatus,
            'accountStatus': accountStatus,
            status: o.status,
            'taxStatus': taxStatus,
            dunStatus: o.dunStatus,            
            'dunStatusNum': dunStatusNum,
            'identityStatus': o.identityStatus,
            'industry': o.industry
        }
    })
    //饼图
    firstPei.text=receiptSum
    if(receiptSum) {
        firstPei.series[0].data=[
            { value: receiptCount3, name: '已完成:'+receiptCount3,itemStyle:{normal:{color:'#B5DEB3'}} },
            { value: receiptCount2, name: '进行中:'+receiptCount2,itemStyle:{normal:{color:'#F6A6A6'}} },
            { value: receiptCount1, name: '未开始:'+receiptCount1,itemStyle:{normal:{color:'#B9C1EB'}} }
        ]
        firstPei.legend.data = ['已完成:'+receiptCount3,'进行中:'+receiptCount2,'未开始:'+receiptCount1]
    } else {
        firstPei.series[0].data=[
            { value: 0, name: '已完成:0',itemStyle:{normal:{color:'#B5DEB3'}} },
            { value: 0, name: '进行中:0',itemStyle:{normal:{color:'#F6A6A6'}} },
            { value: 0, name: '未开始:0',itemStyle:{normal:{color:'#B9C1EB'}} }
        ]
        firstPei.legend.data = ['已完成:0','进行中:0','未开始:0']

    }

    secondPei.text=acountSum
    // acount
    if(acountSum) {
        secondPei.series[0].data=[
            { value: acountCount3, name: '已完成:'+acountCount3,itemStyle:{normal:{color:'#B5DEB3'}} },
            { value: acountCount2, name: '进行中:'+acountCount2,itemStyle:{normal:{color:'#F6A6A6'}} },
            { value: acountCount1, name: '未开始:'+acountCount1,itemStyle:{normal:{color:'#B9C1EB'}} }
        ]
        secondPei.legend.data = ['已完成:'+acountCount3,'进行中:'+acountCount2,'未开始:'+acountCount1]
    } else {
        secondPei.series[0].data=[
            { value: 0, name: '已完成:0',itemStyle:{normal:{color:'#B5DEB3'}} },
            { value: 0, name: '进行中:0',itemStyle:{normal:{color:'#F6A6A6'}} },
            { value: 0, name: '未开始:0',itemStyle:{normal:{color:'#B9C1EB'}} }
        ]
        secondPei.legend.data = ['已完成:0','进行中:0','未开始:0']
    }
    thirdPei.text=taxSum
    if(taxSum) {
        thirdPei.series[0].data=[
            // { value: taxCount4, name: '无需申报:'+taxCount4,itemStyle:{normal:{color:'#FFB500'}} },
            { value: taxCount3, name: '已完成:'+taxCount3,itemStyle:{normal:{color:'#B5DEB3'}} },
            { value: taxCount2, name: '进行中:'+taxCount2,itemStyle:{normal:{color:'#F6A6A6'}} },
            { value: taxCount1, name: '未开始:'+taxCount1,itemStyle:{normal:{color:'#B9C1EB'}} }
        ]
        thirdPei.legend.data = ['已完成:'+taxCount3,'进行中:'+taxCount2,'未开始:'+taxCount1]
    } else {
        thirdPei.series[0].data=[
            // { value: 0, name: '无需申报:0',itemStyle:{normal:{color:'#FFB500'}} },
            { value: 0, name: '已完成:0',itemStyle:{normal:{color:'#B5DEB3'}} },
            { value: 0, name: '进行中:0',itemStyle:{normal:{color:'#F6A6A6'}} },
            { value: 0, name: '未开始:0',itemStyle:{normal:{color:'#B9C1EB'}} }
        ]
        thirdPei.legend.data = ['已完成:0','进行中:0','未开始:0']
    }
    fourthPei.text=dunSum
    if(dunSum) {
        fourthPei.series[0].data=[
            { value: dunCount1, name: '无需催款:'+dunCount1,itemStyle:{normal:{color:'#F6A6A6'}} },
            { value: dunCount3, name: '已完成:'+dunCount3,itemStyle:{normal:{color:'#B5DEB3'}} },
            { value: dunCount2, name: '未开始:'+dunCount2,itemStyle:{normal:{color:'#B9C1EB'}} }
        ]
        fourthPei.legend.data = ['已完成:'+dunCount3,'未开始:'+dunCount2,'无需催款:'+dunCount1]
    } else {
        fourthPei.series[0].data=[
            { value: 0, name: '无需催款:0',itemStyle:{normal:{color:'#F6A6A6'}} },
            { value: 0, name: '已完成:0',itemStyle:{normal:{color:'#B5DEB3'}} },
            { value: 0, name: '未开始:0',itemStyle:{normal:{color:'#B9C1EB'}} }
        ]
        fourthPei.legend.data = ['已完成:0','未开始:0','无需催款:0']
    }

    if(curRole=='003') {
        secondPei.text=''
        // acount
        secondPei.series[0].data=[
            { value: '', name: '已完成:',itemStyle:{normal:{color:'#dedede'},emphasis:{color:'#dedede'}} },
            { value: '', name: '进行中:',itemStyle:{normal:{color:'#dedede'},emphasis:{color:'#dedede'}} },
            { value: '', name: '未开始:',itemStyle:{normal:{color:'#dedede'},emphasis:{color:'#dedede'}} }
        ]
        secondPei.legend.data = ['已完成:','进行中:','未开始:']
        thirdPei.text=''
        thirdPei.series[0].data=[
            { value: '', name: '已完成:',itemStyle:{normal:{color:'#dedede'},emphasis:{color:'#dedede'}} },
            { value: '', name: '进行中:',itemStyle:{normal:{color:'#dedede'},emphasis:{color:'#dedede'}} },
            { value: '', name: '未开始:',itemStyle:{normal:{color:'#dedede'},emphasis:{color:'#dedede'}} }
        ]
        thirdPei.legend.data = ['已完成:','进行中:','未开始:']

        secondPei.tooltip = {
            trigger: 'item',
            formatter: "亲，您没有权限哦~"
        }
        thirdPei.tooltip = {
            trigger: 'item',
            formatter: "亲，您没有权限哦~"
        }
        secondPei.legend.selectedMode = false
        thirdPei.legend.selectedMode = false
       
    } else {
        secondPei.tooltip = {
            trigger: 'item',
            formatter: "{b}({d}%)"
        }
        thirdPei.tooltip = {
            trigger: 'item',
            formatter: "{b}({d}%)"
        }
        secondPei.legend.selectedMode = false
        thirdPei.legend.selectedMode = false
    }
    
    obj = {
        'proxyFirstList': proxyFirstList,
        'firstPei': firstPei,
        'secondPei': secondPei,
        'thirdPei': thirdPei,
        'fourthPei': fourthPei
    }

    
    return obj
}
export function updateLeftHalf(state,dataValue,path,newValue) {
    let proxyData = dr.getterByField(state,'proxyData').toJS(),
        leftData = countLeftData(state, dataValue),
        peiData = proxyData.peiData
    proxyData.proxyFirstList = leftData.proxyFirstList
    proxyData.firstPei = leftData.firstPei
    proxyData.secondPei = leftData.secondPei
    proxyData.thirdPei = leftData.thirdPei
    proxyData.fourthPei = leftData.fourthPei
    proxyData.leftPage = {
        current: dataValue.page.currentPage,
        total: dataValue.page.sumCloum,
        pageSize: dataValue.page.pageSize
    }
    if(path=='report.peiFormItems.personType') {
        peiData.personType = newValue.toJS()
        proxyData.peiData = peiData
        state = dr.setterByField(state,'proxyData',fromJS(proxyData))

        state= dr.setter(state,'report.leftListTitle.accountSchedule','visible',false)
        state= dr.setter(state,'report.leftListTitle.taxSchedule','visible',false)
        state = dr.setterByField(state,'proxyData.leftListTitle.searchValue','')
        state = dr.setterByField(state,'proxyData.leftListTitle.searchType',fromJS({
                        name: '企业名称',
                        id: '0'
                    }))

    } else if(path=='report.peiFormItems.peiDate') {
        peiData.peiDate = newValue
        proxyData.peiData = peiData
        state = dr.setterByField(state,'proxyData',fromJS(proxyData))
        state= dr.setter(state,'report.leftListTitle.accountSchedule','visible',false)
        state= dr.setter(state,'report.leftListTitle.taxSchedule','visible',false)
        state = dr.setterByField(state,'proxyData.leftListTitle.searchValue','')
        state = dr.setterByField(state,'proxyData.leftListTitle.searchType',fromJS({
                        name: '企业名称',
                        id: '0'
                    }))
    } else {
        state = dr.setterByField(state,'proxyData',fromJS(proxyData))
    }

    return state
}

//计算右侧日历数据，初始化，和更改日期时间都用到了
export function countRightDate(state,taxEndDate,list) {
    let rightDate = {}
    if(taxEndDate) {
        if(list.month==12) {
            if(taxEndDate==31) {
                rightDate = {
                    lastDate: (list.year-0+1)+'-'+'01-01'
                }
            } else {
                rightDate = {
                    lastDate: list.year+'-'+'12-'+(taxEndDate+1)
                }
            }
        } else {
            let currentMonth = list.month
            if(list.month==1||list.month==3||list.month==5||list.month==7||list.month==8||list.month==10) {

                if(taxEndDate==31) {
                    if(list.month-0+1<10) {
                        currentMonth = '0'+(list.month-0+1)
                    }
                    rightDate = {
                        lastDate: list.year+'-'+currentMonth+'-01'
                    }
                } else {
                    if(list.month-0<10) {
                        currentMonth = '0'+list.month
                    }
                    rightDate = {
                        lastDate: list.year+'-'+currentMonth+'-'+(taxEndDate+1)
                    }
                }
            } else if(list.month==2) {
                let isRun
                if (
                    (((list.year-0) % 4)==0)&&
                    (((list.year-0) % 100)!=0)|| 
                    (((list.year-0) % 400)==0)
                ) {
                    isRun =true
                } else { 
                    isRun =false
                }
                if((isRun&&taxEndDate==29)||(!isRun&&taxEndDate==28)) {
                    rightDate = {
                        lastDate: list.year+'-03-01'
                    }
                } else {
                    rightDate = {
                        lastDate: list.year+'-02-'+(taxEndDate+1)
                    }
                }
            } else {
                if(taxEndDate==30) {
                    if(list.month-0+1<10) {
                        currentMonth = '0'+(list.month-0+1)
                    }
                    rightDate = {
                        lastDate: list.year+'-'+currentMonth+'-01'
                    }
                } else {
                    if(list.month-0<10) {
                        currentMonth = '0'+(list.month-0)
                    }
                    rightDate = {
                        lastDate: list.year+'-'+currentMonth+'-'+(taxEndDate+1)
                    }
                }
            }

        }
    } else {
        let currentMonth = list.month
        if(list.month-0<10) {
            currentMonth = '0'+currentMonth
        }
        rightDate = {
            lastDate: list.year+'-'+currentMonth+'-'+'01',
        }
    }
    rightDate.currentYear = list.year
    rightDate.currentMonth = list.month
    return rightDate
}
//左下表的选择条件框的展示
export function updateFormItems(state,dataValue,newValue,inputType) {
    let customeStatusList = dataValue.customeStatusList,
        curRole = dr.getterByField(state,'curRole')
    if(inputType==1) {
        state = dr.setterByField(state,'proxyData.leftListTitle.searchValue',newValue)
        state = dr.setterByField(state,'proxyData.leftListTitle.accountSchedule',fromJS({name:'全部',id:'0'}))
        state = dr.setterByField(state,'proxyData.leftListTitle.taxSchedule',fromJS({name:'全部',id:'0'}))
    } else if(inputType==2) {
        state = dr.setterByField(state,'proxyData.leftListTitle.searchValue','')
        state = dr.setterByField(state,'proxyData.leftListTitle.accountSchedule',newValue)
        state = dr.setterByField(state,'proxyData.leftListTitle.taxSchedule',fromJS({name:'全部',id:'0'}))
    } else if(inputType==3) {
        state = dr.setterByField(state,'proxyData.leftListTitle.searchValue','')
        state = dr.setterByField(state,'proxyData.leftListTitle.accountSchedule',fromJS({name:'全部',id:'0'}))
        state = dr.setterByField(state,'proxyData.leftListTitle.taxSchedule',newValue)
    } else if(inputType===0) {
        state = dr.setterByField(state,'proxyData.leftListTitle.searchType',newValue)
        state = dr.setterByField(state,'proxyData.leftListTitle.searchValue','')
        state = dr.setterByField(state,'proxyData.leftListTitle.accountSchedule',fromJS({name:'全部',id:'0'}))
        state = dr.setterByField(state,'proxyData.leftListTitle.taxSchedule',fromJS({name:'全部',id:'0'}))
        if(newValue.get('id')=='0') {
            state= dr.setter(state,'report.leftListTitle.accountSchedule','visible',false)
            state= dr.setter(state,'report.leftListTitle.taxSchedule','visible',false)
        } else if(newValue.get('id')==1) {
            state= dr.setter(state,'report.leftListTitle.accountSchedule','visible',true)
            state= dr.setter(state,'report.leftListTitle.taxSchedule','visible',false)
        } else if(newValue.get('id')==2) {
            state= dr.setter(state,'report.leftListTitle.accountSchedule','visible',false)
            state= dr.setter(state,'report.leftListTitle.taxSchedule','visible',true)
        }
    }
    //  else {
    //     state = dr.setterByField(state,'proxyData.leftListTitle.searchValue',newValue)

    // }

    customeStatusList = customeStatusList.map(o => {
        let dunStatusNum,receiptStatus,accountStatus,taxStatus
        
        if(o.dunStatus==2) {//未催款
            dunStatusNum = 1
        } else if(o.dunStatus==3) {//已催款
            dunStatusNum = 3
        } else if(o.dunStatus==1) {//无需催款
            dunStatusNum = 5       
        }
        if(curRole==='003') {
            accountStatus = undefined
            taxStatus = undefined
        } else {
            accountStatus = o.accountStatus
            taxStatus = o.taxStatus
        }
        return {
            operation: '进入账簿',
            orgId: o.orgId,
            orgName: o.orgName,
            accountDate: o.accountDate,
            receiptStatus: o.receiptStatus,
            'accountStatus': accountStatus,
            status: o.status,
            'taxStatus': taxStatus,
            'dunStatusNum': dunStatusNum,
            dunStatus: o.dunStatus
        }
    })
    state = dr.setterByField(state,'proxyData.proxyFirstList',fromJS(customeStatusList))
    state = dr.setterByField(state,'proxyData.leftPage',fromJS({
        current: dataValue.page.currentPage,
        total: dataValue.page.sumCloum,
        pageSize: dataValue.page.pageSize
    }))
    return state
}
export function updateRightDate(state,dataValue,list) {
    let rightDate = countRightDate(state, dataValue.taxEndDate,list)
    state = dr.setterByField(state,'proxyData.rightDate',fromJS(rightDate))
    return state
}
export function setPopQueryEndTime(state,time){
    return dr.setter(state,'report.popQuery.endTime','disabledDate',{minDisabledDate:time})
}

/**
 * 切换为本年或者本月刷新数据
 * @param  {[type]} state            [description]
 * @param  {[type]} reportOptionLine [图表的data数据]
 * @param  {[type]} dataValue        [图表背后表格的数据]
 * @param  {[type]} dataType         [年或者月]
 * @return {[type]}                  [description]
 */
export function switchMonthOrYear(state,reportOptionLine,dataValue,dataType,visible,queryDate){
    /*type说明
            0代表本年
            1代表本月
            2代表自定义
            3代表上一年
            4代表上一月
        */
    let reportText = null,
        switchTime = null
    if(dataType == 1){
        reportText = '本月'
    }else if(dataType == 0){
        reportText = '本年'
    }else if(dataType == 3){
        reportText = '上年'
    }else if(dataType == 4){
        reportText = '上月'
    }else if(dataType == 2){
        reportText = ''
    }else{
        reportText = '上月'
    }
    switchTime = dataType
    if(dataType == 0 || dataType == 1){
        state = dr.setterByField(state,'queryDate',queryDate)
    }
    if(dataType == 3 || dataType == 4){
        state = dr.setterByField(state,'popQuery',fromJS(queryDate))
    }
    state = dr.setterByField(state,'switchTime',switchTime)
    state = dr.setterByField(state,'reportText',reportText)
    state = dr.setterByField(state,'inAmount',dataValue.total.inAmount)
    state = dr.setterByField(state,'outAmount',dataValue.total.outAmount)
    state = dr.setterByField(state,'profits',dataValue.total.profits)
    state = dr.setterByField(state,'tax',dataValue.total.tax)
    state = dr.setterByField(state,'reportOptionLine',fromJS(reportOptionLine))
    if(visible){
        state = dr.setterByField(state,'popVisible',!visible)
    }
    if(queryDate){
        state = dr.setterByField(state,'prevYearOrMonthText',fromJS(queryDate))
    }
    return state
}
/**
 * [柱状图自定义查询的显示和隐藏]
 * @param  {[type]} state   [description]
 * @param  {[type]} visible [description]
 * @return {[type]}         [description]
 */
export function popVisibleChange(state,visible){
    return dr.setterByField(state,'popVisible',visible)
}

/**
 * [switchInOut 切换收入和支出]
 * @param  {[type]} state     [description]
 * @param  {[type]} dataValue [description]
 * @return {[type]}           [description]
 */
export function switchInOut(state,dataValue){
    if(dataValue.type == 'in'){
        state = dr.setterByField(state,'inAmountTableData',fromJS(dataValue.tableData))
        state = dr.setterByField(state,'inAmountPie',fromJS(dataValue.barData))
        state = dr.setterByField(state,'switchInOut',false)
    }else{
        state = dr.setterByField(state,'outAmountTableData',fromJS(dataValue.tableData))
        state = dr.setterByField(state,'switchInOut',true)
        state = dr.setterByField(state,'outAmountPie',fromJS(dataValue.barData))
    }
    return state
}

/**
 * [updateCashInOutTopFive 刷新现金流量表]
 * @param  {[type]} state     [description]
 * @param  {[type]} dataValue [description]
 * @return {[type]}           [description]
 */
export function updateCashInOutTopFive(state,dataValue){
    state = dr.setterByField(state,'cashInOutTopFive',fromJS(dataValue.barData))
    state = dr.setterByField(state,'cashInOutTableData',fromJS(dataValue.tableData))
    return state
}

/**
 * [switchCashFlow 现金流量TOP5饼图和表格之间切换]
 * @param  {[type]} state     [description]
 * @param  {[type]} dataValue [description]
 * @return {[type]}           [description]
 */
export function switchCashFlow(state,dataValue){
    return dr.setterByField(state,'switchCashFlowState',dataValue)
}

/**
 * 收入支出表格饼图之间切换
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
export function switchInOutOrBar(state,dataValue){
    return dr.setterByField(state,'expensesState',dataValue)
}

Object.assign(exports, {...dr,...exports})
