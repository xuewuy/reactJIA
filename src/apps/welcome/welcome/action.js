/**
 * Created by shenxy on 16/8/26.
 */
import * as da from 'dynamicAction'
import * as api from './api'
import { List, fromJS } from 'immutable'
import webapi from 'webapi'
import moment from 'moment'
import { decorators } from 'dynamicComponent'
const _auth = { ...decorators.AuthDecorator.actionCreator() }
export function initView(This) {
    return async injectFuns => {
        let data = api.getData(),
            { handleWebApiInfo } = da, { post, reduce } = injectFuns,
            date = new Date(),
            year = date.getFullYear(),
            month = date.getMonth(),
            context = injectFuns.getContext(),
            appId = context.currentOrg.appId,
            orgType = context.currentOrg.orgType,
            roles = context.roles
        data.data.proxyData.rightDate = {
            lastDate: 0,
            currentYear: year,
            currentMonth: month
        }


        data.data.orgType = injectFuns.getContext().currentOrg.orgType
        if(data.data.orgType==1) {//代账端
            if(roles) {//是一个数组
                 if(roles.length==1) {
                    data.data.curRole = roles[0].code
                } else if(roles.length>1) {
                    //目前数据两种 肯定是会计和理票员 取理票员权限（大权限） ，后期需要改在具体做
                    let minNum
                    for(let i=0;i<roles.length;i++) {
                        if(minNum) {
                            if(minNum>Number(roles[i].code)) {
                                minNum=Number(roles[i].code)
                            }
                        } else {
                            minNum = Number(roles[i].code)
                        }
                    }
                    // data.data.curRole = '002'
                    data.data.curRole = '00'+ minNum
                 } else {
                     //异常不做操作
                     data.data.curRole = undefined
                 }
            } else {
                //异常不做操偶做
                data.data.curRole = undefined
            }

            if(data.data.curRole == '001') {
                da.setMetaProperty(data.meta, 'report.proxyFirstList.dunStatus.visible',true)
            } else if(data.data.curRole == '002'||data.data.curRole == '003')  {
                da.setMetaProperty(data.meta, 'report.proxyFirstList.dunStatus.visible',false)
            }
        } else {
            data.data.curRole = undefined
        }
        if (appId == 103 && orgType == 3) {
            let groupTeamRes = await webapi.org.listMapGroupTeam(injectFuns.post)
            if (!da.handleWebApiInfo(groupTeamRes)(injectFuns)) return
            da.setMetaProperty(data.meta, 'report.groupList.dataSource', groupTeamRes.value)
            data.data.currGroupTeam = groupTeamRes.value[0] || []
        }

        data = _auth.initAuthView(This, { data: data })
        da.initView(data, exports)(injectFuns)
        if(injectFuns.getContext().currentOrg.orgType==1) {
            setProxyInitViewData()(injectFuns)
        } else {
            setInitViewData(null,true)(injectFuns)
        }
    }
}
export function getContext(cb) {
    return injectFuns => cb(injectFuns.getContext())
}
//代账端初始化数据
export function setProxyInitViewData() {
    return injectFuns => {
        let { handleWebApiInfo } = da, { post, reduce } = injectFuns,
            ajaxData,
            context = injectFuns.getContext(),
            currentOrg = context.currentOrg,
            org = {
                id:currentOrg.id,
                name:currentOrg.name
            },
            currentUserRoles = context.currentUser.roles,
            findAdminCode = currentUserRoles.find(o=>o.code == '001' || o.code == '002')
        webapi.acmReport.dzhome(injectFuns.post,{page:{pageSize: 15,currentPage: 1}}).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            ajaxData = data.value
            return webapi.acmReport.getNoAccountOrg(injectFuns.post,{
                page:{pageSize: 15, currentPage: 1}
            })
        }).then(data => {
            if(data) {

                if (!da.handleWebApiInfo(data)(injectFuns)) return
                reduce('setProxyInitViewData',ajaxData,data.value,org,findAdminCode)
            }
        })
    }
}

/**
 * [setInitViewData 加载页面初始化数据]
 */
export function setInitViewData(switchTime,switchInOut){
    return async injectFuns=>{
        let accountsChartData = null,//收支图数据
            displayTime = '',//显示时间
            expenseData = null,//支出数据
            cashFlowDate = null,//现金流量数据
            context = injectFuns.getContext(),//获取当前上下文中的信息
            switchTimeId = switchTime,
            enabledMonth = context.currentOrg.enabledMonth || '',
            enabledYear = context.currentOrg.enabledYear || '',
            isLf = context.currentOrg.industry || '',
            enabledTime = '',
            paymentsType = '',
            dataType = '',
            currGroupTeamId = da.getterByField('currGroupTeam.groupTeamId')(injectFuns),
            currGroupTeamType = da.getterByField('currGroupTeam.type')(injectFuns),
            popQuery = da.getterByField('popQuery')(injectFuns).toJS()
            if(enabledMonth && enabledYear){
                enabledTime = enabledYear + '-'+ enabledMonth + '-01'
            }
            if(switchTime == 0){
                dataType = 'year'
            }else if(switchTime == 1){
                dataType = 'month'
            }else if(switchTime == 2){
                dataType = popQuery.beginDate + ',' + popQuery.endDate
            }else if(switchTime == 3){
                dataType = 'lastYear'
            }else if(switchTime == 4){
                dataType = 'lastMonth'
            }else{
                dataType = 'month'
            }
		if(!switchInOut) {
			switchInOut = da.getterByField('switchInOut')(injectFuns)
        }
        paymentsType = switchInOut ? 'out' : 'in'
        let queryDeskTopInitDate = await webapi.acmReport.queryDeskTopInitDate(injectFuns.post, paymentsType, dataType, currGroupTeamId, currGroupTeamType)
        if (!da.handleWebApiInfo(queryDeskTopInitDate)(injectFuns)) return
        let groupTeamRes = await webapi.org.listMapGroupTeam(injectFuns.post)
        if (!da.handleWebApiInfo(groupTeamRes)(injectFuns)) return
        if(queryDeskTopInitDate.value.enddate=='2017-02-31')queryDeskTopInitDate.value.enddate='2017-02-28'
        // 收支图的数据
        accountsChartData = { barData: getReportData(queryDeskTopInitDate.value.diaryForYearMonthData, dataType)(injectFuns), tableData: queryDeskTopInitDate.value.diaryForYearMonthData}
        // 现金流量的数据
        cashFlowDate = { barData: getCashInOutTopFive(queryDeskTopInitDate.value.cashInOutTopFive)(injectFuns), tableData: queryDeskTopInitDate.value.cashInOutTopFive}
        // 支出TOP5
        let barData = switchInOut ? getOutReportData(queryDeskTopInitDate.value.topFiveData)(injectFuns) : getInReportData(queryDeskTopInitDate.value.topFiveData)(injectFuns)
        expenseData = { barData: barData, tableData: queryDeskTopInitDate.value.topFiveData}
        displayTime = { enddate: queryDeskTopInitDate.value.enddate, begindate: queryDeskTopInitDate.value.begindate}
        injectFuns.reduce('setInitViewData', { accountsChartData, expenseData, displayTime, cashFlowDate, enabledTime: enabledTime, switchTimeId, groupTeamList:groupTeamRes.value.queryList, isLf})
    }
}





//改变日历日期
export function changeRightDate(value) {
    return injectFuns => {
        let { handleWebApiInfo } = da, { post, reduce } = injectFuns,
            list = {
            year: value.year(),
            month: value.month()+1
        }
        webapi.acmReport.getTaxEndDay(post,list).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            reduce('updateRightDate',data.value,list)
        })
    }
}

/**
 * [refresh 整个页面所有的数据刷新]
 * @return {[type]} [description]
 */
export function refresh(){
    return injectFuns=>{
        if(injectFuns.getContext().currentOrg.orgType==1) {
            // setProxyInitViewData()(injectFuns)
            updateProxyInitViewData()(injectFuns)
        } else {
            setInitViewData()(injectFuns)
        }
    }
}

export function updateProxyInitViewData() {
    return injectFuns => {
        let { handleWebApiInfo } = da, { post, reduce } = injectFuns,
            ajaxData,
            context = injectFuns.getContext(),
            currentOrg = context.currentOrg,
            org = {
                id:currentOrg.id,
                name:currentOrg.name
            },
            enabledYear = currentOrg.enabledYear||'',
            enabledMonth = currentOrg.enabledMonth||'',
            list1 = {},
            list2 = {},
            list3 = {},
            userId = da.getterByField('proxyData.userId')(injectFuns),
            personType=da.getterByField('proxyData.peiData.personType')(injectFuns),
            userId2=da.getterByField('proxyData.leftListTitle.searchValue')(injectFuns),
            peiDate=da.getterByField('proxyData.peiData.peiDate')(injectFuns),
            searchType = da.getterByField('proxyData.leftListTitle.searchType')(injectFuns),
            rightSearchValue = da.getterByField('proxyData.rightSearchValue')(injectFuns),
            oldSearchValue = da.getterByField('proxyData.leftListTitle.searchValue')(injectFuns),
            oldAccountSchedule = da.getterByField('proxyData.leftListTitle.accountSchedule')(injectFuns),
            oldTaxSchedule = da.getterByField('proxyData.leftListTitle.taxSchedule')(injectFuns),
            leftPage = da.getterByField('proxyData.leftPage')(injectFuns).toJS()
        if(userId) {
            list1.userId = userId
        }
        if(peiDate) {
            list1.year = peiDate.split('-')[0]-0
            list1.month = peiDate.split('-')[1]-0
            list2.year = peiDate.split('-')[0]-0
            list2.month = peiDate.split('-')[1]-0
        }
        list1.page
        if(personType) {
            userId2 = personType.get('userId')
        }
        list2.userId = userId2
        list1.page= {
            currentPage: 1,
            pageSize: da.getterByField('proxyData.leftPage.pageSize')(injectFuns)
        }
        list2.page= {
            currentPage: 1,
            pageSize: da.getterByField('proxyData.leftPage.pageSize')(injectFuns)
        }

        webapi.acmReport.getChartData(post,list1).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            reduce('updateLeftHalf',data.value)
            if(searchType&&searchType.get('id')==0) {
                list2.orgName = oldSearchValue
                webapi.acmReport.getCustomerStatusList(injectFuns.post, list2).then(data2 => {
                    if (!handleWebApiInfo(data2)(injectFuns)) return
                    reduce('updateFormItems',data2.value,list2.orgName)
                    getRightData()(injectFuns)
                    // list3.orgName = rightSearchValue
                    // list3.page = {pageSize: 15, currentPage: 1}
                    // webapi.acmReport.getNoAccountOrg(injectFuns.post,list3).then(data3 => {
                    //     if (!handleWebApiInfo(data3)(injectFuns)) return
                    //     reduce('updateRightList',data3.value,rightSearchValue)
                    // })
                })
            } else if(searchType&&searchType.get('id')==1) {
                list2.accountStatus = oldAccountSchedule.get('id')
                webapi.acmReport.getCustomerStatusList(injectFuns.post, list2).then(data2 => {
                    if (!handleWebApiInfo(data2)(injectFuns)) return
                    reduce('updateFormItems',data2.value,oldAccountSchedule)
                    getRightData()(injectFuns)
                    // list3.orgName = rightSearchValue
                    // list3.page = {pageSize: 15, currentPage: 1}
                    // webapi.acmReport.getNoAccountOrg(injectFuns.post,list3).then(data3 => {
                    //     if (!handleWebApiInfo(data3)(injectFuns)) return
                    //     reduce('updateRightList',data3.value,rightSearchValue)
                    // })
                })

            } else if(searchType&&searchType.get('id')==2) {
                list2.taxStatus = oldTaxSchedule.get('id')
                webapi.acmReport.getCustomerStatusList(injectFuns.post, list2).then(data2 => {
                    if (!handleWebApiInfo(data2)(injectFuns)) return
                    reduce('updateFormItems',data2.value,oldTaxSchedule)
                    getRightData()(injectFuns)
                    // list3.orgName = rightSearchValue
                    // list3.page = {pageSize: 15, currentPage: 1}
                    // webapi.acmReport.getNoAccountOrg(injectFuns.post,list3).then(data3 => {
                    //     if (!handleWebApiInfo(data3)(injectFuns)) return
                    //     reduce('updateRightList',data3.value,rightSearchValue)
                    // })
                })

            }
        })


        // list3.orgName = rightSearchValue
        // list3.page = {pageSize: 200, currentPage: 1}
        // webapi.acmReport.getNoAccountOrg(injectFuns.post,list3).then(data => {
        //     if (!handleWebApiInfo(data)(injectFuns)) return
        //     reduce('updateRightList',data.value,rightSearchValue)
        // })
        // webapi.acmReport.getCustomerStatusList(injectFuns.post, list2).then(data => {
        //     if (!handleWebApiInfo(data)(injectFuns)) return
        //     reduce('updateFormItems',data.value,name,searchType.get('id'))
        // })
        // webapi.acmReport.dzhome(injectFuns.post).then(data => {
        //     if (!da.handleWebApiInfo(data)(injectFuns)) return
        //     ajaxData = data.value
        //     return webapi.acmReport.getNoAccountOrg(injectFuns.post,{
        //         page:{pageSize: 200, currentPage: 1}
        //     })
        // }).then(data => {
        //     if (!da.handleWebApiInfo(data)(injectFuns)) return
        //     reduce('setProxyInitViewData',ajaxData,data.value,org)
        // })
    }
}
/**
 * [柱状图自定义查询时间的显示隐藏]
 * @param  {[type]} e [显示或者隐藏true/false]
 * @return {[type]}   [description]
 */
export function popVisibleChange(e){
    return injectFuns=>{
        injectFuns.reduce('popVisibleChange',e)
    }
}
/**
 * [自定义查询确定查询事件]
 * @return {[type]} [description]
 */
export function popQueryOk(){
    return injectFuns=>{
        let {getterByField} = da,
            {reduce,post} = injectFuns,
            queryForm = getterByField('popQuery')(injectFuns).toJS(),
            dataType = queryForm.beginDate + ',' + queryForm.endDate,
            currGroupTeam = da.getterByField('currGroupTeam.id')(injectFuns)
            webapi.acmReport.thisYearOrMonthDiary(injectFuns.post, dataType, currGroupTeam == 888 ? null : currGroupTeam).then(data=>{
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            injectFuns.reduce('switchMonthOrYear',getReportData(data.value,2)(injectFuns),data.value,2,data.result)
        })
    }
}
/*切换为上年上月刷新数据*/
export function switchPrevMonthOrYear(type){
    return injectFuns=>{
        /*type说明
            0代表本年
            1代表本月
            2代表自定义
            3代表上一年
            4代表上一月
        */
        let {getterByField} = da,
            {reduce,post} = injectFuns,
            queryDate = getterByField('oldQueryDate')(injectFuns),
            currGroupTeam = da.getterByField('currGroupTeam.id')(injectFuns),
            beginDate = '',
            endDate = '',
            dataType = ''
            if(type == 4){
                dataType = 'lastMonth'
            }else if(type == 3){
                dataType = 'lastYear'
            }
            webapi.acmReport.thisYearOrMonthDiary(injectFuns.post, dataType, currGroupTeam == 888 ? null : currGroupTeam).then(data=>{
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                injectFuns.reduce('switchMonthOrYear',getReportData(data.value,dataType)(injectFuns),data.value,type,null,{beginDate:data.value.sDate,endDate:data.value.eDate})
            })
    }
}

/**
 * 切换为本年和本月刷新数据
 * @param  {[type]} dataType [description]
 * @return {[type]}          [description]
 */
export function switchMonthOrYear(type){
    return (injectFuns)=>{
        let dataType = '',
            queryDate = '',
            currGroupTeamId = da.getterByField('currGroupTeam.groupTeamId')(injectFuns),
            currGroupTeamType = da.getterByField('currGroupTeam.type')(injectFuns)
        if(type == 0){
            dataType = 'year'
        }else if(type == 1){
            dataType = 'month'
        }else{
            return false
        }
        webapi.acmReport.getserverDate(injectFuns.post,dataType).then(data=>{
            if (!da.handleWebApiInfo(data)(injectFuns)) return
                queryDate = data.value
                return webapi.acmReport.thisYearOrMonthDiary(injectFuns.post, dataType, currGroupTeamId, currGroupTeamType)
        }).then(data=>{
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            injectFuns.reduce('switchMonthOrYear',getReportData(data.value,dataType)(injectFuns),data.value,type,null,queryDate)
        })
    }
}

/**
 * 切换收入和支出TOP5
 * @return {[type]} [description]
 */
export function switchInOut(type){
    return injectFuns=>{
            /*switchTime说明
            0代表本年 year
            1代表本月 month
            2代表自定义
            3代表上一年 lastYear
            4代表上一月 lastMonth
            switchInOut//true为outfalse为in
        */
        let switchTime = da.getterByField('switchTime')(injectFuns),
            dataType = '',
            popQuery = da.getterByField('popQuery')(injectFuns).toJS(),
            currGroupTeamId = da.getterByField('currGroupTeam.groupTeamId')(injectFuns),
            currGroupTeamType = da.getterByField('currGroupTeam.type')(injectFuns)

       if(switchTime == 0){
           dataType = 'year'
       }else if(switchTime == 1){
           dataType = 'month'
       }else if(switchTime == 2){
           dataType = popQuery.beginDate + ',' + popQuery.endDate
       }else if(switchTime == 3){
           dataType = 'lastYear'
       }else if(switchTime == 4){
           dataType = 'lastMonth'
       }else{
           dataType = 'month'
       }
       webapi.acmReport.thisMonthTopFive(injectFuns.post, { paymentstype: type, dataType: dataType, id: currGroupTeamId, type: currGroupTeamType}).then(data=>{
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            let barData = type == 'in' ? getInReportData(data.value)(injectFuns) : getOutReportData(data.value)(injectFuns)
            injectFuns.reduce('switchInOut',{type,barData:barData,tableData:data.value})
        })
    }
}

/**
 * 刷新收入支出TOP5的数据
 * @return {[type]} [description]
 */
export function updateInOutData(){
    return injectFuns=>{
        let switchInOutState = da.getterByField('switchInOut')(injectFuns)
        if(switchInOutState){
            switchInOut('out')(injectFuns)
        }else{
            switchInOut('in')(injectFuns)
        }
    }
}

/**
 * 刷新现金流量TOP5的数据
 * @return {[type]} [description]
 */
export function updateCashInOutTopFive(){
    return injectFuns=>{
         let switchTime = da.getterByField('switchTime')(injectFuns),
             dataType = '',
             popQuery = da.getterByField('popQuery')(injectFuns).toJS(),
             currGroupTeamId = da.getterByField('currGroupTeam.groupTeamId')(injectFuns),
             currGroupTeamType = da.getterByField('currGroupTeam.type')(injectFuns)

        if(switchTime == 0){
            dataType = 'year'
        }else if(switchTime == 1){
            dataType = 'month'
        }else if(switchTime == 2){
            dataType = popQuery.beginDate + ',' + popQuery.endDate
        }else if(switchTime == 3){
            dataType = 'lastYear'
        }else if(switchTime == 4){
            dataType = 'lastMonth'
        }else{
            dataType = 'month'
        }
        webapi.acmReport.cashInOutTopFive(injectFuns.post, dataType, currGroupTeamId, currGroupTeamType).then(data=>{
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            injectFuns.reduce('updateCashInOutTopFive',{barData:getCashInOutTopFive(data.value)(injectFuns),tableData:data.value})
        })
    }
}

export function onFieldChange(path, oldValue, newValue) {
    return injectFuns => {
        let {reduce, post, getContext, setContext} = injectFuns,
            { handleWebApiInfo } = da,
            context = getContext(),
            currentOrg = context.currentOrg,
            enabledYear = currentOrg.enabledYear||'',
            enabledMonth = currentOrg.enabledMonth||'',
            list = {}
        if(path == 'report.popQuery.startTime'){
            da.onFieldChange(path, oldValue, newValue)(injectFuns)
            injectFuns.reduce('setPopQueryEndTime',newValue)
        } else if (path == 'report.peiFormItems.personType') {
            if(da.getterByField('proxyData.leftListTitle.searchValue')(injectFuns)) {
                list.userId=da.getterByField('proxyData.leftListTitle.searchValue')(injectFuns)
            }
            list.userId=newValue.get('userId')
            list.year=da.getterByField('proxyData.peiData.peiDate')(injectFuns).split('-')[0]-0
            list.month=da.getterByField('proxyData.peiData.peiDate')(injectFuns).split('-')[1]-0
            list.page= {
                currentPage: 1,
                pageSize: da.getterByField('proxyData.leftPage.pageSize')(injectFuns)
            }
            webapi.acmReport.getChartData(post,list).then(data => {
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                reduce('updateLeftHalf',data.value,path,newValue)
            })

        } else if (path == 'report.peiFormItems.peiDate') {
            if(da.getterByField('proxyData.peiData')(injectFuns)) {
                list.userId=da.getterByField('proxyData.peiData.personType')(injectFuns).get('userId')
            }
            list.year=newValue.split('-')[0]-0
            list.month=newValue.split('-')[1]-0
            list.page= {
                currentPage: 1,
                pageSize: da.getterByField('proxyData.leftPage.pageSize')(injectFuns)
            }
            webapi.acmReport.getChartData(post,list).then(data => {
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                reduce('updateLeftHalf',data.value,path,newValue)
            })
        } else if (path == 'report.leftListTitle.searchType') {
            list = getLeftData(newValue,'changeSearchType')(injectFuns)
            webapi.acmReport.getCustomerStatusList(post,list).then(data => {
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                reduce('updateFormItems',data.value,newValue,0)
            })
        } else if (path == 'report.leftListTitle.accountSchedule') {
            list = getLeftData(newValue,'changeAccountSchedule')(injectFuns)
            webapi.acmReport.getCustomerStatusList(injectFuns.post, list).then(data => {
                if (!handleWebApiInfo(data)(injectFuns)) return
                reduce('updateFormItems',data.value,newValue,2)
            })
        } else if (path == 'report.leftListTitle.taxSchedule') {
            list = getLeftData(newValue,'changeTaxSchedule')(injectFuns)
            webapi.acmReport.getCustomerStatusList(injectFuns.post, list).then(data => {
                if (!handleWebApiInfo(data)(injectFuns)) return
                reduce('updateFormItems',data.value,newValue,3)
            })
        } else if (path == 'report.groupList'){
            let switchTime = da.getterByField('switchTime')(injectFuns)
            injectFuns.reduce('groupChange', newValue)
            setInitViewData(switchTime)(injectFuns)
        }else {
            da.onFieldChange(path, oldValue, newValue)(injectFuns)
        }
    }
}

export function GroupListChange(path){
    return async injectFuns=>{
        let groupTeamRes = await webapi.org.listMapGroupTeam(injectFuns.post)
        if (!da.handleWebApiInfo(groupTeamRes)(injectFuns)) return
        injectFuns.reduce('setGroupTeamList', groupTeamRes.value)
    }
}

export function onEvent(eventName,option) {
    return injectFuns => {
        let { getterByField, handleWebApiInfo } = da,
        { reduce, post } = injectFuns
        if (eventName === 'onGridPageSizeChanged' || eventName === 'onGridPageChanged') {
            if(option.path.indexOf('report.leftPage')!=-1) {
                let leftPage = da.getterByField('proxyData.leftPage')(injectFuns).toJS()
                if(leftPage.total<option.pageSize*(option.current-1)) {
                    option.current = 1
                }
                let list = getLeftData(option,'changePage')(injectFuns)
                webapi.acmReport.getCustomerStatusList(injectFuns.post, list).then(data => {
                    if (!handleWebApiInfo(data)(injectFuns)) return
                    reduce('updateFormItems',data.value)
                })
                let rightPage = da.getterByField('proxyData.rightPage')(injectFuns).toJS()
                if(rightPage.total<option.pageSize*(option.current-1)) {
                    option.current = 1
                }
                getRightData(option,'changePage')(injectFuns)
            }
        } else if (eventName === 'onDropdownFooterClick') {
            if (option.path == 'report.groupList') {//自定义汇总
                let closeMsg = () => { da.clearMessage()(injectFuns) }
                webapi.groupReport.queryExistOrgGroup(post, {}).then(data => {
                    if (!handleWebApiInfo(data)(injectFuns)) return
                    da.setMessage({
                        type: 'app',
                        title: '自定义分组管理',
                        content: 'app:apps/fi/groupReport/userDefinedCollect',
                        okText: '创建分组并汇总',
                        refName: 'toUserDefinedCollect',
                        wrapClassName: 'toUserDefinedCollect',
                        initData: { isFrom: "balanceSheet", closeMsg },
                        onCancel: () => {
                            da.clearMessage()(injectFuns)
                        },
                        onOk: (cb) => {
                            if(cb && cb.dto){
                                webapi.org.listMapGroupTeam(injectFuns.post).then(data => {
                                    if (!da.handleWebApiInfo(data)(injectFuns)) return
                                    injectFuns.reduce('setGroupList', data.value, cb.dto.id)
                                    da.clearMessage()(injectFuns)
                                    let switchTime = da.getterByField('switchTime')(injectFuns)
                                    setInitViewData(switchTime)(injectFuns)
                                })
                            }
                        },
                        width: 1200
                    })(injectFuns)
                })
            }
        } else {
            da.onEvent(eventName, option)(injectFuns)
        }
    }
}

export function openTax(orgId) {
    return injectFuns => {
        var newWindow = window.open('',"_blank")
        newWindow.document.innerHTML = '正在加载中请稍后。。。'
        let list = {
            'spOrgId':orgId
        }
        webapi.tax.itsSync(injectFuns.post,list).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) {
                newWindow.close()
                return
            } 
            if(data.value) {

                if(data.value.url=='https://devits.rrtimes.com') {
                    if(window.location.href.indexOf('127')!=-1) {
                        newWindow.location.href = "http://devits.rrtimes.com/v1/authorize#authorization_code="+data.value.token

                    } else {

                        newWindow.location.href = "https://devits.rrtimes.com/v1/authorize#authorization_code="+data.value.token
                    }
                    
                } else {
                    newWindow.location.href = data.value.url +"/v1/authorize#authorization_code="+data.value.token
                    
                }
                console.log(newWindow.location.href)
            } else {
                newWindow.close()
            }

        })
        
    }
}

export function getLeftData(value, type) {
    return injectFuns => {
        let {reduce, post, getContext, setContext} = injectFuns,
            { handleWebApiInfo } = da,
            oldLeftPage = da.getterByField('proxyData.leftPage')(injectFuns).toJS(),
            oldLeftSearch = da.getterByField('proxyData.leftSearchValue')(injectFuns),
            searchType = da.getterByField('proxyData.leftListTitle.searchType')(injectFuns).toJS().id,
            params = {
                year:da.getterByField('proxyData.peiData.peiDate')(injectFuns).split('-')[0]-0,
                month:da.getterByField('proxyData.peiData.peiDate')(injectFuns).split('-')[1]-0,
                // orgName: oldLeftSearch,
                page: {
                    currentPage: 1,
                    pageSize: oldLeftPage.pageSize
                }
            }
        if(type != 'changePage'&&type != 'changeSearch'&&type != 'changeSearchType') {
            let userId = da.getterByField('proxyData.userId')(injectFuns),
                personType=da.getterByField('proxyData.peiData.personType')(injectFuns)
            if(personType) {
                userId = personType.get('userId')
            }
            params.userId = userId
        }

        if(type == 'changePage') {
            if(searchType = 0) {
                params.orgName= oldLeftSearch

            } else if(searchType = 1) {
                let userId = da.getterByField('proxyData.userId')(injectFuns),
                    personType=da.getterByField('proxyData.peiData.personType')(injectFuns)
                if(personType) {
                    userId = personType.get('userId')
                }
                params.userId = userId
                params.accountStatus = da.getterByField('proxyData.leftListTitle.accountSchedule')(injectFuns).get('id')
            } else if(searchType = 2) {
                let userId = da.getterByField('proxyData.userId')(injectFuns),
                    personType=da.getterByField('proxyData.peiData.personType')(injectFuns)
                if(personType) {
                    userId = personType.get('userId')
                }
                params.userId = userId
                params.taxStatus = da.getterByField('proxyData.leftListTitle.taxSchedule')(injectFuns).get('id')
            }
            params.page = {
                currentPage: value.current,
                pageSize: value.pageSize
            }
        } else if(type == 'changeSearch') {
            params.orgName= value.target.value

        } else if(type == 'changeSearchType') {
            if(value.get('id')==1) {
                params.accountStatus = 0
            } else if(value.get('id')==2) {
                params.taxStatus = 0
            }
            params.userId = da.getterByField('proxyData.userId')(injectFuns)
        } else if(type == 'changeAccountSchedule') {
            params.accountStatus = value.get('id')

        } else if(type == 'changeTaxSchedule') {
            params.taxStatus = value.get('id')

        }
        return params
        // if(searchType = 0) {

        // } else if(searchType = 1) {

        // } else if(searchType = 2) {

        // }
    }
}
export function getRightData(value, type) {
    return injectFuns => {
        let oldRightPage = da.getterByField('proxyData.rightPage')(injectFuns).toJS(),
            oldRightSearch = da.getterByField('proxyData.rightSearchValue')(injectFuns),
            params = {
                orgName: oldRightSearch,
                page: {
                    currentPage: 1,
                    pageSize: oldRightPage.pageSize
                }
            }
        if(type == 'changePage') {
            params.page = {
                currentPage: value.current,
                pageSize: value.pageSize
            }
        } else if(type == 'changeSearch') {
            params.orgName= value.target.value
        }
        queryRightList(params)(injectFuns)
    }
}
export function queryRightList(params) {
    return injectFuns => {
        let {reduce, post, getContext, setContext} = injectFuns,
            { handleWebApiInfo } = da,
            currentUserRoles = getContext().currentUser.roles,
            findAdminCode = currentUserRoles.find(o=>o.code == '001' || o.code == '002')
        webapi.acmReport.getNoAccountOrg(injectFuns.post,params).then(data => {
            if (!handleWebApiInfo(data)(injectFuns)) return
            reduce('updateRightList',data.value,params.orgName,findAdminCode)
        })
    }
}

export function search(e) { //搜索功能
    return injectFuns => {
        let {reduce, post, getContext, setContext} = injectFuns,
            { handleWebApiInfo } = da,
            list = getLeftData(e,'changeSearch')(injectFuns)

        //     list = {
        //         year:da.getterByField('proxyData.peiData.peiDate')(injectFuns).split('-')[0]-0,
        //         month:da.getterByField('proxyData.peiData.peiDate')(injectFuns).split('-')[1]-0
        //     }
        // let name = e.target.value
        // list.orgName = name

        webapi.acmReport.getCustomerStatusList(injectFuns.post, list).then(data => {
            if (!handleWebApiInfo(data)(injectFuns)) return
            reduce('updateFormItems',data.value,list.orgName,1)
        })

    }
}
export function searchRight(e) { //搜索功能
    return injectFuns => {
        let {reduce, post, getContext, setContext} = injectFuns,
            { handleWebApiInfo } = da,
            list = {}
        // let name = e.target.value
        // list.orgName = name
        // list.page = {pageSize: 15, currentPage: 1}
        getRightData(e, 'changeSearch')(injectFuns)
        // webapi.acmReport.getNoAccountOrg(injectFuns.post,list).then(data => {
        //     if (!handleWebApiInfo(data)(injectFuns)) return
        //     reduce('updateRightList',data.value,name)
        // })
    }
}

export function account(rowIndex,onToggleOrg) {
    return injectFuns => {
        let {reduce, post, getContext, setContext} = injectFuns,
            { handleWebApiInfo, setMessage, clearMessage } = da,
            obj = da.getterByField('proxyData.proxyRightList.'+rowIndex)(injectFuns).toJS(),
            org = da.getterByField('proxyData.org')(injectFuns).toJS()
        org.name = '返回首页'
        let qaram = {id:obj.id},
            contentText,
            formList,
            formInfo

        webapi.acmReport.getEnumDetail(post,['vatTaxpayer','industry','accountingStandards','businessIncomeTaxMode','checkMode']).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            formList = data.value
            return webapi.acmReport.queryById(post,qaram)
        }).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            formInfo = data.value
            if(data.value.num<=0) {
                return setMessage({
                    type: 'app',
                    title:'提醒',
                    content:'app:apps/welcome/accountFull',
                    width:400,
                    height: 212,
                    wrapClassName:'accountFullMessage',
                    okText: '关闭',
                    onCancel:() => { refresh()(injectFuns);clearMessage()(injectFuns)},
                    onOk:(data) => { refresh()(injectFuns);clearMessage()(injectFuns)}
                })(injectFuns)
            } else {
                let currentUserRoles = getContext().currentUser.roles,
                    findAdminCode = currentUserRoles.find(o=>o.code == '001' || o.code == '002')
                if(findAdminCode){//有建账权限
                    setMessage({
                        type:'app',
                        title:'新建账套',
                        content:'app:apps/welcome/addAccount',
                        initData: {
                            formList: formList,
                            formInfo: formInfo,
                            obj: obj
                        },
                        width:800,
                        refName:'setDate',
                        wrapClassName:'add',
                        closable:true,
                        onCancel:() => {clearMessage()(injectFuns)},
                        onOk:(data) => {
                            if(data.error&&data.error.code==70911) {
                                // clearMessage()(injectFuns)

                            } else {
                                setMessage({
                                    type:'success',
                                    content:'建账成功',
                                    mode: 'message'
                                })(injectFuns)
                            }
                            clearMessage()(injectFuns)
                            setProxyInitViewData()(injectFuns)
                            // setMessage({
                            //     type:'success',
                            //     content:'建账成功',
                            //     mode: 'message'
                            // })(injectFuns)

                            // da.showLoadingMask({content:'正在建账...'})(injectFuns)
                            // addZT(data.list, onToggleOrg,org)(injectFuns)
                        }
                    })(injectFuns)
                }else{//没有建账权限
                    setMessage({
                        type: 'warning',
                        content: '您没有建账权限，请联系管理员帮您建账！',
                        mode: 'message'
                    })(injectFuns)
                }
            }
        })
    }
}

export function addZT(list,onToggleOrg,org) {
    return injectFuns => {
        let {reduce, post, getContext, setContext} = injectFuns,
            { handleWebApiInfo, setMessage, clearMessage } = da
        webapi.acmReport.createAccounts(post,list).then(data=>{
            da.hideLoadingMask()(injectFuns)
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            if(data.value.orgId) {
                onToggleOrg(data.value.orgId,{fromDz:true})
            } else {
                setMessage({
                    type: 'warning',
                    content: '建账失败',
                    mode: 'message'
                })(injectFuns)
                setProxyInitViewData()(injectFuns)
            }

        })
    }
}

/**
 * 现金流量TOP5切换为表格
 * @return {[type]} [description]
 */
export function switchCashFlowToTable(){
    return injectFuns=>{
        injectFuns.reduce('switchCashFlow',false)
    }
}

/**
 * 现金流量TOP5切换为饼图
 * @return {[type]} [description]
 */
export function switchCashFlowToBar(){
    return injectFuns=>{
        injectFuns.reduce('switchCashFlow',true)
    }
}

/**
 * 收入支出TOP5切换为表格
 * @return {[type]} [description]
 */
export function switchInOutToTable(){
    return injectFuns=>{
        injectFuns.reduce('switchInOutOrBar',false)
    }
}

/**
 * 收入支出TOP5切换为饼图
 * @return {[type]} [description]
 */
export function switchInOutToPie(){
    return injectFuns=>{
        injectFuns.reduce('switchInOutOrBar',true)
    }
}

/**
 * 获取收入TOP5的数据
 * @param  {[type]} paymentstype [description]
 * @param  {[type]} dataType     [description]
 * @return {[type]}              [description]
 */
export function getInReportData(dataValye){
    return injectFuns=>{
        let inPieData = [],
            colorArray = ['#b9c1eb','#f6a6a6','#eca7d4','#b5deb3','#f2dfa5','#a7d0f4','#FBC8AD'],
            title=[],
            InAmountPieData = da.getterByField('inAmountPie')(injectFuns).toJS()
        dataValye.map((element,index)=>{
            if(index != dataValye.length-1){
                inPieData.push({value:element.amount.split(',').join(''), name:element.businessItem,itemStyle:{
                    normal:{color:colorArray[index]}
                }})
                title.push(element.businessItem)
            }
        })
        if(inPieData.length <= 0){
            inPieData.push({value:0, name:'没有数据',itemStyle:{
                normal:{color:colorArray[0]}
            }})
            title.push('没有数据')
        }
        InAmountPieData.legend.formatter = (name)=>{
            return name.split('（')[0]
        }
        InAmountPieData.series[0].data = inPieData
        InAmountPieData.legend.data = title
        return InAmountPieData
    }
}

/**
 * 获取现金流量TOP5的数据
 * @param  {[type]} dataType [description]
 * @return {[type]}          [description]
 */
export function getCashInOutTopFive(ajaxData){
    return injectFuns=>{
        let cashInOutTopFive = da.getterByField('cashInOutTopFive')(injectFuns).toJS(),
            inamount = [],
            outamount =[]
        ajaxData.map((element,index)=>{
            if(parseInt(element.inamount)){
                inamount.push({data:element.inamount.split(',').join(''),name:element.name})
            }
            if(parseInt(element.outamount)){
                outamount.push({data:element.outamount.split(',').join(''),name:element.name})
            }
        })
        cashInOutTopFive.series.length = 0
        for(let i = 0; i < 7; i++){
            if(inamount[i] && i < inamount.length -1){
                cashInOutTopFive.series.push(
                     {
                         name: [inamount[i].name],
                         type: 'bar',
                         stack: 'bar'+i,
                         barMinHeight:5,
                         barMaxWidth:'50px',
                         label: {
                             normal: {
                                 show: true,
                                 position: 'outside',
                                 formatter: ''
                             }
                         },
                         itemStyle: {
                             normal: {
                                color:'#FBC8AD'
                             },
                             emphasis: {}
                         },
                         data: [inamount[i].data]
                     }
                )
            }
            if(outamount[i] && i < outamount.length -1){
                cashInOutTopFive.series.push(
                     {
                         name: [outamount[i].name],
                         type: 'bar',
                         stack: 'bar'+i,
                         barMinHeight:5,
                         barMaxWidth:'50px',
                         label: {
                             normal: {
                                 show: true,
                                 position: 'outside',
                                 formatter: ''
                             }
                         },
                         itemStyle: {
                             normal: {
                                color:'#B5DEB3'
                             },
                             emphasis: {}
                         },
                         data: [-outamount[i].data]
                     }
                )
            }
        }
        return cashInOutTopFive
    }
}

/**
 * 获取支出TOP5的数据
 * @param  {[type]} paymentstype [description]
 * @param  {[type]} dataType     [description]
 * @return {[type]}              [description]
 */
export function getOutReportData(ajaxData){
    return injectFuns=>{
        let outPieData = [],
            colorArray = ['#b9c1eb','#f6a6a6','#eca7d4','#b5deb3','#f2dfa5','#a7d0f4','#FBC8AD'],
            title=[],
            outAmountPieData = da.getterByField('outAmountPie')(injectFuns).toJS()
        ajaxData.map((element,index)=>{
            if(index != ajaxData.length-1){
                outPieData.push({value:element.amount.split(',').join(''), name:element.businessItem,itemStyle:{
                    normal:{color:colorArray[index]}
                }})
                title.push(element.businessItem)
            }
        })
        if(outPieData.length <= 0){
            outPieData.push({value:0, name:'没有数据',itemStyle:{
                normal:{color:colorArray[0]}
            }})
            title.push('没有数据')
        }
        outAmountPieData.series[0].data = outPieData
        outAmountPieData.legend.data = title

        outAmountPieData.legend.formatter = (name)=>{
            return name.split('（')[0]
        }
        return outAmountPieData
    }
}

/**
 * 获取收入支出的柱状图数据
 * @param  {[type]} data     [description]
 * @param  {[type]} dataType [description]
 * @return {[type]}          [description]
 */
export function getReportData(data,dataType){
    return injectFuns=>{
        let { getterByField } = da,
            reportOptionLine = getterByField('reportOptionLine')(injectFuns).toJS(),
            xAxisArray=[],
            inAmountArray = [],
            outAmountArray=[],
            profitsArrsy=[],
            type = dataType == 'month' || dataType == 'lastMonth' ? '号': dataType == 'year' || dataType == 'lastYear' ?'月':'',
            inAmountMin = [],
            outAmountMin = [],
            mix = null
        //获取整个收入和支出的数组
        data.detail.map((element,index)=>{
            inAmountMin.push(parseFloat(element.inAmount.split(',').join('')))
            outAmountMin.push(parseFloat(element.outAmount.split(',').join('')))
        })
        //计算出最小的高度值
        inAmountMin = inAmountMin.sort((v1,v2)=>{return v2-v1})[0]*0.05
        outAmountMin = outAmountMin.sort((v1,v2)=>{return v2-v1})[0]*0.05
        mix = inAmountMin > outAmountMin ? inAmountMin : outAmountMin
        data.detail.map((element,index)=>{
            xAxisArray.push(element.currData+type)
            let inAmountValue = '',
                inAmountOriginalValue = '',
                outAmountValue = '',
                outAmountOriginalValue = ''
                //在非0的时候判断当前值是否小于最小值
                if(parseFloat(element.inAmount.split(',').join('')) == 0){
                    inAmountValue = 0
                    inAmountOriginalValue = 0
                }else{
                   inAmountValue = parseFloat(element.inAmount.split(',').join('')) < mix ?(mix + parseFloat(element.inAmount.split(',').join(''))):parseFloat(element.inAmount.split(',').join(''))
                   inAmountOriginalValue = parseFloat(element.inAmount.split(',').join(''))
                }
            inAmountArray.push({
                value:inAmountValue,
                itemStyle:{
                    normal:{color:'#fbc8ad'}
                },
                originalValue:inAmountOriginalValue
            })
            //在非0的时候判断当前值是否小于最小值
            if(element.outAmount.split(',').join('') == 0){
                outAmountValue = 0
                outAmountOriginalValue = 0
            }else{
                outAmountValue = parseFloat(element.outAmount.split(',').join('')) < mix ?(mix + parseFloat(element.outAmount.split(',').join(''))):parseFloat(element.outAmount.split(',').join(''))
                outAmountOriginalValue = parseFloat(element.outAmount.split(',').join(''))
            }
            outAmountArray.push({
                value:-outAmountValue,
                itemStyle:{
                    normal:{color:'#b5deb3'}
                },
                originalValue:-outAmountOriginalValue
            })
            profitsArrsy.push(
                element.profits.split(',').join('')
            )
        })
        reportOptionLine.xAxis[0].data = xAxisArray
        reportOptionLine.series[1].data = inAmountArray
        reportOptionLine.series[2].data = outAmountArray
        reportOptionLine.series[0].data = profitsArrsy
        return reportOptionLine
    }
}

Object.assign(exports, {...da, ...exports})
