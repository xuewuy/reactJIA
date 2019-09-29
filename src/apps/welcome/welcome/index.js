import React from 'react'
import { Row, Col, Card, ReactEcharts, Button, MovablePanel, Popover, ZIcon, Input } from 'xComponent'
import { Calendar, Select } from 'antd'
import defaultComponentFactory from 'defaultComponentFactory'
import topPng from './img/top.png'
import bottomLeftPng from './img/bottom-left.png'
import bottomRightPng from './img/bottom-right.png'
import leftPng from './img/left.png'
import rightTopPng from './img/right-top.png'
import rightMidPng from './img/right-mid.png'
import rightBottom from './img/right-bottom.png'
import DynamicComponent, { Modal } from 'dynamicComponent'
import CellIcon from './cellIcon/index'
import ReactDOM from 'react-dom'
import moment from 'moment'
import './welcome.less'
import * as api from './api'
const Option = Select.Option;
export const ORGTYPE_CUSTOMER = 2
export const ORGTYPE_PROXY = 1

export default class WelcomeComponent extends React.Component {
    static defaultProps = {
        prefixCls: 'welcome'
    }
    constructor(props) {
        super(props)
        this.onResize = this.onResize.bind(this)
        this.update = this.update.bind(this)
        defaultComponentFactory.registerComponent('CellIcon', CellIcon)
        this.endOptionColumnCreator = this.endOptionColumnCreator.bind(this)

    }


    componentDidMount() {
        this.props.initView(this)
        var win = window
        if (win.addEventListener) {
            win.addEventListener('resize', this.onResize)
        } else if (win.attachEvent) {
            win.attachEvent('onresize', this.onResize)
        } else {
            win.onresize = this.onResize
        }
        this.props.addEventListener('onTabFocus', ::this.onTabFocus)
    }

    shouldComponentUpdate(nextProps) {
        for (var o in this.props) {
            if (this.props[o] != nextProps[o]) {
                return true
            }
        }
        return false
    }

    componentWillUnmount() {
        var win = window
        if (win.removeEventListener) {
            win.removeEventListener('resize', this.onResize, false)
        } else if (win.detachEvent) {
            win.detachEvent('onresize', this.onResize)
        } else {
            win.onresize = undefined
        }
        this.props.removeEventListener('onTabFocus')
    }


    onTabFocus() {
        this.props.refresh()
    }

    // getCustomerOptionLine(){
    //     return api.getCustomerOptionLine()
    // }
    /**
     * 代账公司进入桌面时展示的图表
     * @return {[type]} [description]
     */
    getProxyTopOptionLine() {
        return api.getProxyTopOptionLine()
    }
    /**
     * 代账公司进入桌面时展示的图表
     * @return {[type]} [description]
     */
    getProxyBottomLeftOptionBar() {
        return api.getProxyBottomLeftOptionBar()
    }
    /**
     * 代账公司进入桌面时展示的图表
     * @return {[type]} [description]
     */
    getProxyBottomRightOptionPie() {
        return api.getProxyBottomRightOptionPie()
    }

    getProxyFirstPei() {
        let getterByField = this.props.payload.getIn(['utils', 'getterByField']),
            firstPei = getterByField('proxyData.firstPei').toJS()
        return firstPei
    }
    getProxySecondPei() {
        let getterByField = this.props.payload.getIn(['utils', 'getterByField']),
            secondPei = getterByField('proxyData.secondPei').toJS()
        return secondPei
    }
    getProxyThirdPei() {
        let getterByField = this.props.payload.getIn(['utils', 'getterByField']),
            thirdPei = getterByField('proxyData.thirdPei').toJS()
        return thirdPei
    }
    getProxyFourthPei() {
        let getterByField = this.props.payload.getIn(['utils', 'getterByField']),
            fourthPei = getterByField('proxyData.fourthPei').toJS()
        return fourthPei
    }
    onPanelChange(value, mode) {
        this.props.changeRightDate(value)
    }
    getListData(value) {
        let arr = [4, 5, 6],
            arrlen = arr.length
        for (let i = 0; i < arrlen; i++) {
            if (arr[i] == value.date(2)) {
                return true
            }
        }
        return false
    }
    handleClickTime(time) {
        return ()=> {
            console.log(time)
        }
    }
    dateCellRender(value) {
        let getterByField = this.props.payload.getIn(['utils', 'getterByField']),
            liveParam = getterByField('proxyData.liveParam')?getterByField('proxyData.liveParam').toJS():{},
            currentDate = liveParam.today? new Date(liveParam.today):new Date(),
            rightDate = getterByField('proxyData.rightDate').toJS(),
            currentYear = rightDate.currentYear,
            currentMonth = rightDate.currentMonth,
            daySum,
            firstDate,
            lastDate,
            selectLastDate = rightDate.lastDate,
            // liveTime = getCurTime(currentDate, 2, 22, true, false, undefined ,undefined ,getVacation( moment(liveParam.today).format('YYYY-MM-DD'), []))
            liveTime = getCurTime(liveParam)

        if (currentMonth == 1) {
            firstDate = (currentYear - 1) + '-12-31'
            lastDate = currentYear + '-02-28'
        } else if (currentMonth == 12) {
            firstDate = currentYear + '-11-30'
            lastDate = (currentYear + 1) + '-01-01'
        } else {
            if (currentMonth - 1 < 10 && currentMonth + 1 < 10) {
                firstDate = currentYear + '-0' + (currentMonth - 1) + '-01'
                lastDate = currentYear + '-0' + (currentMonth + 1) + '-01'
            } else if (currentMonth - 1 < 10 && currentMonth + 1 >= 10) {
                firstDate = currentYear + '-0' + (currentMonth - 1) + '-01'
                lastDate = currentYear + '-' + (currentMonth + 1) + '-01'
            } else {

                firstDate = currentYear + '-' + (currentMonth - 1) + '-01'
                lastDate = currentYear + '-' + (currentMonth + 1) + '-01'
            }
        }
        //moment中的方法，不兼容ie和safari
        if (value.isBetween(firstDate, lastDate, 'month')) {
            let currentDay = new Date(currentDate)
            if(liveTime&&value.isSame(liveTime, 'day')) {
                // return (
                //     <div><p className='text-live'><img src={require('./img/live.png')} alt="" /></p></div>
                // )

                if (value.isBefore(selectLastDate, 'day')) {

                    return (
                        <div className='bgorange'><p className='text-live'><img src={require('./img/live.png')} alt="" /></p></div>
                    )
                } else {
                    return (
                        <div><p className='text-live'><img src={require('./img/live.png')} alt="" /></p></div>
                    )
                }
            } else if (value.isSame(currentDay, 'day')) {
                if (value.isBefore(selectLastDate, 'day')) {

                    return (
                        <div className='bgorange'><p className='text-today'>今</p></div>
                    )
                } else {
                    return (
                        <div><p className='text-today'>今</p></div>
                    )
                }
            } else if (value.isBefore(selectLastDate, 'day')) {
                return (
                    <div className='bgorange'><p className='text-white'>{value.date()}</p></div>
                )
            } else {
                return (
                    <div><p className='text-black'>{value.date()}</p></div>
                )
            }
        } else {
            if(liveTime&&value.isSame(liveTime, 'day')) {
                return (
                    <div><p className='text-live'><img src={require('./img/live.png')} alt="" /></p></div>
                )
            } else {
                return (
                    <div><p className='text-gray'>{value.date()}</p></div>
                )
            }
        }
    }
    monthCellRender(value) {
        console.log(value)

    }
    onSelect(value) {
        let getterByField = this.props.payload.getIn(['utils', 'getterByField']),
            liveParam = getterByField('proxyData.liveParam')?getterByField('proxyData.liveParam').toJS():{},
            liveTime = getCurTime(liveParam),
            homeUrl = this.props.homeUrl || "/",
            mainUrl = homeUrl.split('default')[0],
            endChars = mainUrl.charAt(mainUrl.length-1),
            calssroomUrl = endChars=='/'?mainUrl+'classroom.html':mainUrl+'/classroom.html'
        if(homeUrl=='#'||homeUrl=='https://www.zhwuji.com/'){
            calssroomUrl = 'https://www.rrtimes.com/classroom.html'
        }

        if(value.isSame(liveTime,'date')) {
            window.open(calssroomUrl);
        }


    }

    onResize() {
        clearTimeout(this._updateTimer)
        this._updateTimer = setTimeout(this.update, 16)
    }

    update() {
        this.setState({ time: new Date().getTime() })
    }
    /**
     * 进入列表Click
     * @return {[type]} [description]
     */
    handleIntoListClick() {
        let getterByField = this.props.payload.getIn(['utils', 'getterByField']),
            { ...otherProps } = this.props,
            queryDate = getterByField('queryDate'),
            popQuery = getterByField('popQuery'),
            switchTime = getterByField('switchTime'),
            orgType = getterByField('orgType'),
            date = ''
        if (switchTime != 2) {
            date = queryDate
        } else {
            date = { begindate: popQuery.get('beginDate'), enddate: popQuery.get('endDate') }
        }
        if (orgType == 3) {
            this.props.onAddTab('流水账收支统计表', 'apps/fi/groupReport/currentReport', { queryPeriod: date })
        } else {
            this.props.onAddTab('收支统计表', 'apps/acm/richardTicket/report', { queryPeriod: date })
        }
    }

    get(propertyName) {
        if (!propertyName || propertyName === '') {
            return this.state.data
        }
        return this.state.data.getIn(propertyName.split('.'))
    }

    handleReportOptionLineRefresh(type) {
        return () => {
            if (type == 0 || type == 1) {
                this.props.switchMonthOrYear(type)
            } else if (type == 3 || type == 4) {
                this.props.switchPrevMonthOrYear(type)
            } else {
                this.props.popQueryOk()
            }
        }
    }
    /**
     * [handleSwitchCashFlowToTableClick 现金流量切换为表格]
     * @return {[type]} [description]
     */
    handleSwitchCashFlowToTableClick() {
        this.props.switchCashFlowToTable()
    }
    /**
     * [handleSwitchCashFlowToBarClick 现金流量切换为饼图]
     * @return {[type]} [description]
     */
    handleSwitchCashFlowToBarClick() {
        this.props.switchCashFlowToBar()
    }
    /**
     * [收入支出切换为饼图]
     * @return {[type]} [description]
     */
    handleSwitchInOutToPieClick() {
        this.props.switchInOutToPie()
    }
    /**
     * [收入支出切换为表格]
     * @return {[type]} [description]
     */
    handleSwitchInOutToTableClick() {
        this.props.switchInOutToTable()
    }
    /**
     * [handleSwitchInOutClick 切换为收入]
     * @return {[type]} [description]
     */
    handleSwitchInClick() {
        this.props.switchInOut('in')
    }
    /**
     * [handleSwitchOutClick 切换为支出]
     * @return {[type]} [description]
     */
    handleSwitchOutClick() {
        this.props.switchInOut('out')
    }
    /**
     * [收入支出的刷新点击事件]
     * @return {[type]} [description]
     */
    handleUpdateInOutDataClick() {
        this.props.updateInOutData()
    }
    /**
     * [现金流量TOP5刷新点击事件]
     * @return {[type]} [description]
     */
    handleUpdateCashInOutTopFiveClick() {
        this.props.updateCashInOutTopFive()
    }

    render() {
        if (this.props._isCurrentTab === false) return null
        if (!this.props.payload || !this.props.payload.get('utils')) return null
        let message = this.props.payload.getIn(['global', 'message']),
            { prefixCls, ...otherProps } = this.props,
            getterByField = this.props.payload.getIn(['utils', 'getterByField'])
        let orgType = getterByField('orgType'),
            height = window.innerHeight,
            width = window.innerWidth

        if (orgType === ORGTYPE_PROXY) {
            return this.renderProxy(prefixCls, message);//代账机构用户
        }
        else {
            return this.renderCust(prefixCls, message);//企业用户
        }
    }
    //记一笔
    handleAddJournalAccount() {
        let getterByField = this.props.payload.getIn(['utils', 'getterByField'])
        this.props.onAddTab('流水账', `apps/acm/richardTicket/card`)
    }
    getTooltipContainer() {
        return ReactDOM.findDOMNode(this)
    }
    //自定义查询change事件
    handleVisibleChange(e) {
        this.props.popVisibleChange(e)
    }
    //自定义查询隐藏
    handleVisibleFalse() {
        this.props.popVisibleChange(false)
    }
    // 自定义查询确定按钮点击事件
    handlePopQueryOk() {
        this.props.popQueryOk()
    }
    /*切换查询时间*/
    handleSwitchQueryTime(switchTime, switchInOut) {
        return () => {
            /*switchTime说明
            0代表本年 year
            1代表本月 month
            2代表自定义
            3代表上一年 lastYear
            4代表上一月 lastMonth
            switchInOut//true为outfalse为in
            */
            this.props.setInitViewData(switchTime, switchInOut)
        }
    }
    handleSearchChange(e) {
        let { setMessage } = this.props
        if (e.target.value && e.target.value.length > 50) {

            setMessage({
                type: 'warning',
                content: '输入内容过长',
                mode: 'message'
            })
        } else {
            this.props.search(e)
        }
    }
    handleRightSearchChange(e) {
        if (e.target.value && e.target.value.length > 50) {
            setMessage({
                type: 'warning',
                content: '输入内容过长',
                mode: 'message'
            })
        } else {
            this.props.searchRight(e)
        }
    }
    handleRefresh(e) {
        this.props.setProxyInitViewData()
    }

    handleHideLoading(hideFun) {
        this.hideFun = hideFun
    }

    handleEvent(eventName, option) {
        if (eventName === 'onLinkClick') {
            let { setMessage } = this.props,
                getterByField = this.props.payload.getIn(['utils', 'getterByField']),
                org = getterByField('proxyData.org').toJS(),
                rowIndex = option.path.split(',')[1],
                path = option.path.split(',')[0]
            org.name = '返回首页'
            if (path.indexOf('report.proxyFirstList.operation') != -1) {
                let orgId = getterByField('proxyData.proxyFirstList.' + rowIndex + '.orgId'),
                    status = getterByField('proxyData.proxyFirstList.' + rowIndex + '.status')
                if (status) {
                    this.props.onToggleOrg(orgId, { fromDz: true })
                } else {
                    setMessage({
                        type: 'warning',
                        content: '该企业未授权，无权限进入账簿查看',
                        mode: 'message'
                    })
                }
            } else if ((path.indexOf('report.proxyRightList.operation') != -1)) {
                this.props.account(rowIndex, this.props.onToggleOrg)
            }
        } else {
            this.props.onEvent(eventName, option)
        }
    }

    endOptionColumnCreator(ps) {
        let getterByField = this.props.payload.getIn(['utils', 'getterByField']),
            orgId = getterByField('proxyData.proxyFirstList.' + ps.rowIndex + '.orgId'),
            context

        this.props.getContext((ctx) => {
            context = ctx
        })

        let isShowHSQJ = this.getShowHSQJ(context.roles)
        // if(window.location.href.indexOf('?hs') > -1) {
            return <span className={`${this.props.prefixCls}-details-option`}>
                <a href="javascript:;" onClick={::this.handleOpen(ps)} style={{"display":"inline-block",height:"30px","lineHeight":"30px",width:"73px","textAlign":"center"}}>进入账簿</a>
                { !!isShowHSQJ ? <a href="javascript:;" onClick={::this.handleOpenTax(ps)}  style={{"display":"inline-block",height:"30px","lineHeight":"30px",width:"82px","textAlign":"center"}}>进入汇算清缴</a> : null}
            </span>
        // } else {
        //     return <span className={`${this.props.prefixCls}-details-option`}>
        //         <a href="javascript:;" onClick={::this.handleOpen(ps)} style={{"display":"inline-block",height:"30px","lineHeight":"30px",width:"100%","textAlign":"center"}}>进入账簿</a>
        //     </span>
        // }
    }
    getShowHSQJ(roles) {
        let haveLimits = roles.filter(item=>{
            return item.code != '003'
        }),
            noLimits = roles.filter(item => {
                return item.code == '003'
            })
    
        if (roles.length == 1 && !!noLimits[0]){
            return false
        }else{
            return true
        }
    }

    handleOpen(ps) {
        return () => {
            let { setMessage } = this.props,
                getterByField = this.props.payload.getIn(['utils', 'getterByField']),
                org = getterByField('proxyData.org').toJS(),
                rowIndex = ps.rowIndex
            org.name = '返回首页'
            let orgId = getterByField('proxyData.proxyFirstList.' + rowIndex + '.orgId'),
                status = getterByField('proxyData.proxyFirstList.' + rowIndex + '.status'),
                industry = getterByField('proxyData.proxyFirstList.' + rowIndex + '.industry'),
                identityStatus = getterByField('proxyData.proxyFirstList.' + rowIndex + '.identityStatus')
            if (industry > 1000){//特殊行业
                if (status && identityStatus == 1){
                    this.props.onToggleOrg(orgId, { fromDz: true })
                }else{
                    setMessage({
                        type: 'warning',
                        content: '该企业未实名认证，无权限进入账簿查看',
                        mode: 'message'
                    })
                }
            }else{//普通行业
                if (status) {
                    this.props.onToggleOrg(orgId, { fromDz: true })
                } else {
                    setMessage({
                        type: 'warning',
                        content: '该企业未授权，无权限进入账簿查看',
                        mode: 'message'
                    })
                }
            }
        }
    }

    handleOpenTax(ps) {
        return () => {
            let { setMessage } = this.props,
                getterByField = this.props.payload.getIn(['utils', 'getterByField']),
                rowIndex = ps.rowIndex
            let orgId = getterByField('proxyData.proxyFirstList.' + rowIndex + '.orgId')
            this.props.openTax(orgId)
        }
    }

    handleGroupTeamChange(value, option){
        this.props.groupChange(value)
    }
    handleGroupListChange(e){
        this.props.GroupListChange(e)
    }
    tableSelectClick(tableId){
        return () =>{
            let { setMessage } = this.props,
                getterByField = this.props.payload.getIn(['utils', 'getterByField']),
                btnHidden = getterByField('btnHidden')?getterByField('btnHidden').toJS():{},
                btnHiddenList = getterByField('btnHiddenList')?getterByField('btnHiddenList').toJS():{},
                This = this

            if(tableId == 'table1'){
                this.props.onCheckMenuBtn('214004', 'INCOMEEXPENSES', btnHiddenList, () => {
                    This.props.onAddTab('提报收入费用汇总表', `apps/fi/lfManagementReport/incomeExpenses`, {})
                })
            }else if(tableId == 'table2'){
                this.props.onCheckMenuBtn('214005', 'INCOMESUMMARY', btnHiddenList, () => {
                    This.props.onAddTab('可提报收入汇总表', `apps/fi/lfManagementReport/incomeSummary`, {})
                })
            }else if(tableId == 'table3'){
                this.props.onCheckMenuBtn('214008', 'COSTSTATISTICS', btnHiddenList, () => {
                    This.props.onAddTab('已提报费用统计表', `apps/fi/lfManagementReport/costStatistics`, {})
                })
            }else if(tableId == 'table4'){
                this.props.onCheckMenuBtn('214010', 'COSTALLOCATIONREPORT', btnHiddenList, () => {
                    This.props.onAddTab('费用分摊汇总表', `apps/fi/lfManagementReport/costAllocationReport`, {})
                })
            }else if(tableId == 'table5'){
                this.props.onCheckMenuBtn('214012', 'CONTRACTFILINGTABLE', btnHiddenList, () => {
                    This.props.onAddTab('合同归档情况表', `apps/fi/lfManagementReport/contractFilingTable`, {})
                })
            }else if(tableId == 'table6'){
                this.props.onCheckMenuBtn('214007', 'MAYCOSTSTATISTICS', btnHiddenList, () => {
                    This.props.onAddTab('可提报费用统计表', `apps/fi/lfManagementReport/mayCostStatistics`, {})
                })
            }else if(tableId == 'table7'){
                this.props.onCheckMenuBtn('214006', 'INCOMESTATEMENT', btnHiddenList, () => {
                    This.props.onAddTab('可提报收入明细表', `apps/fi/lfManagementReport/incomeStatement`, {})
                })
            }else if(tableId == 'table8'){
                this.props.onCheckMenuBtn('214009', 'COSTSTATISTICSDETAILS', btnHiddenList, () => {
                    This.props.onAddTab('已提报费用明细表', `apps/fi/lfManagementReport/costStatisticsDetails`, {})
                })
            }else if(tableId == 'table9'){
                this.props.onCheckMenuBtn('214011', 'COSTALLOCATIONDETAILREPORT', btnHiddenList, () => {
                    This.props.onAddTab('费用分摊明细表', `apps/fi/lfManagementReport/costAllocationDetailReport`, {})
                })
            }
        }
    }

    renderCust(prefixCls, message) {
        let getterByField = this.props.payload.getIn(['utils', 'getterByField']),
            { ...otherProps } = this.props,
            reportOptionLine = getterByField('reportOptionLine').toJS(),//报表柱状图
            outAmountPie = getterByField('outAmountPie').toJS(),//支出饼图
            inAmountPie = getterByField('inAmountPie').toJS(),//收入饼图
            cashInOutTopFive = getterByField('cashInOutTopFive').toJS(),//现金流量柱状图
            switchTime = getterByField('switchTime'),
            reportText = getterByField('reportText'),
            switchCashFlowState = getterByField('switchCashFlowState'),
            expensesState = getterByField('expensesState'),
            switchInOut = getterByField('switchInOut'),//true为outfalse为in
            popQuery = getterByField('popQuery').toJS(),
            queryDate = getterByField('queryDate') && getterByField('queryDate').begindate.split('-'),
            displayDateText = '',
            prevYearOrMonthText = getterByField('prevYearOrMonthText'),
            popVisible = getterByField('popVisible'),
            isLf = getterByField('isLf'),
            context
        this.props.getContext((ctx)=>{
            context = ctx
        })

            //industry != 1006
        let btnHidden = true,
            currentOrg = context && context.currentOrg,
            industry = currentOrg && currentOrg.industry
        if (this.props.btnStatus) {
            this.props.btnStatus.toJS().map(x => {
                if (x[201001] != undefined && x[201001] != null) {
                    btnHidden = x[201001] === 0 ? false : true
                    return false
                }
            })
        }

        if (switchTime == 1 || switchTime == 4) {
            displayDateText = queryDate && queryDate[0] + '.' + queryDate[1]
        } else if (switchTime == 0 || switchTime == 3) {
            displayDateText = queryDate && queryDate[0]
        } else if (switchTime == 2) {
            displayDateText = popQuery.beginDate + '至' + popQuery.endDate
        } else {
            debugger
        }
        let getCashInOutTopFive = () => {
            if (switchCashFlowState) {
                return (<ReactEcharts
                    echartOption={cashInOutTopFive}
                    refName={'cashFlowEcharts'}
                    style={{ height: '100%', width: '100%', position: 'absolute' }}
                    theme='shine' />)
            } else {
                return (<div className={`${prefixCls}-cust-table`}>
                    <DynamicComponent {...otherProps} _path="report.cashInOut" scroll={{ y: true, x: true }} bodyStyle={{ overflowY: 'auto' }} />
                </div>)
            }
        }
        let expensesView = () => {
            if (expensesState) {
                return (<ReactEcharts
                    echartOption={switchInOut ? outAmountPie : inAmountPie}
                    refName={'expensesEcharts'}
                    style={{ height: '100%', width: '100%', position: 'absolute' }}
                    theme='shine' />)
            } else {
                return (<div className={`${prefixCls}-cust-table`}>
                    <DynamicComponent {...otherProps} _path={switchInOut ? "report.outAmount" : "report.inAmount"} scroll={{ y: true, x: true }} bodyStyle={{ overflowY: 'auto' }} />
                </div>)
            }
        }
        let customQueryContent = (
            <div className={`${prefixCls}-customQueryContent`}>
                <DynamicComponent {...otherProps} _path='report.popQuery' />
                <div style={{ textAlign: 'center', paddingTop: '10px' }}>
                    <Button onClick={::this.handleVisibleFalse} className={`${prefixCls}-customQueryContent-cancel`} style={{ marginRight: '8px' }}>取消</Button>
                <Button onClick={::this.handleSwitchQueryTime(2,switchInOut)} className={`${prefixCls}-customQueryContent-ok`} type="primary">确定</Button>
                </div>
            </div>
        )
        return (
            <div className={`${prefixCls}-cust`}>
                {/*context.currOrg.orgType == 3 && context.appInfo.id == 103  代表是集团版*/}
                {!btnHidden || (context.currOrg.orgType == 3 && context.appInfo.id == 103)? '' :
                    <MovablePanel
                        className={`${prefixCls}-btn-add`}
                        onClick={::this.handleAddJournalAccount}
                    style = {{
                    top: 30,
                    right: 250,
                    width: 70,
                    height: 70,
                }}
                >
                    记一笔
                </MovablePanel>}
            <div className={`${prefixCls}-cust-left-half`}>
            <Card>
                <div className={`${prefixCls}-cust-header`}>
                    <div className='header-switch'>
                        <div className='header-switch-left'>
                            {/*type说明 0代表本年 1代表本月 2代表自定义 3代表上一年 4代表上一月 */}
                            <Button onClick={::this.handleSwitchQueryTime(0,switchInOut)} type={switchTime == 0 ? 'primary' : 'ghost'}>本年</Button>
                            <Button onClick={::this.handleSwitchQueryTime(3,switchInOut)} type={switchTime == 3 ? 'primary' : 'ghost'}>上年</Button>
                            <Button onClick={::this.handleSwitchQueryTime(1,switchInOut)} type={switchTime == 1 ? 'primary' : 'ghost'}>本月</Button>
                            <Button onClick={::this.handleSwitchQueryTime(4,switchInOut)} type={switchTime == 4 ? 'primary' : 'ghost'}>上月</Button>
                            <Popover
                                placement="bottom"
                                getTooltipContainer={::this.getTooltipContainer}
                                content={customQueryContent}
                                trigger="click"
                                visible={popVisible}
                                onVisibleChange={::this.handleVisibleChange}
                                placement="bottomLeft"
                                title="自定义查询"
                            >
                                <Button type={switchTime == 2 ? 'primary' : 'ghost'}>自定义</Button>
                            </Popover>
                            { context.currOrg.orgType == 3 && context.appInfo.id == 103 ? <div style={{ paddingLeft: '8px' }}><DynamicComponent {...otherProps} _path='report.groupList' onFocus={::this.handleGroupListChange} /></div> : null}
                        </div>
                        <h1>{reportText}({displayDateText})收支图</h1>
                    <div className='header-switch-right'>
                    <Button type="primary" onClick={::this.handleIntoListClick}>收支统计表</Button>
                    <a title='刷新' className={`header-switch-right-Refresh icon`} style={{ marginLeft: '8px', width: '26px', borderRadius: '2px' }} onClick={::this.handleReportOptionLineRefresh(switchTime, switchInOut)} href = "javascript:;" ></a>
                </div>
    </div>
    <div className='intoList'>
        <div className='intoList-left'>
            <span>单位：元</span>
            <i></i>
        </div>
        <div className='intoList-center'>
            <div>{reportText}收入：<span>{getterByField('inAmount')}</span></div>
            <div>{reportText}支出：<span>{getterByField('outAmount')}</span></div>
            <div>{reportText}{industry == 1006 ? "收支结余":"收支差额"}：<span>{getterByField('profits')}</span></div>
            {
                industry == 1006 && context.industryVersion == 1 ?
                null : <div>{reportText}应交税额：<span>{getterByField('tax')}</span></div>
            }
        </div>
        <div className='intoList-right'>
            <div><i></i>收入</div>
            <div><i></i>支出</div>
            <div><i></i>{industry == 1006 ? "收支结余":"收支差额"}</div>
        </div>
    </div>
    </div>
    <div style={{ position: 'relative', flex: '1', height: '80%' }}>
        <ReactEcharts
            echartOption={reportOptionLine}
            style={{ height: '100%', width: '100%', position: 'absolute' }}
            theme='shine' />
    </div>
    </Card>
</div>
    
    {
        isLf && isLf == '1008'
    ? 
    <div  className={`${prefixCls}-cust-footer2`}>
        <div className='footer-left'>管理报表</div>
        <div className='footer-rights'>
            <div className='footer-right'>
                <div className='selectDiv1' onClick={::this.tableSelectClick('table1')}>提报收入费用汇总表</div>
                <div className='selectDiv2' onClick={::this.tableSelectClick('table2')}>可提报收入汇总表</div>
                <div className='selectDiv3' onClick={::this.tableSelectClick('table3')}>已提报费用统计表</div>
                <div className='selectDiv4' onClick={::this.tableSelectClick('table4')}>费用分摊汇总表</div>
                <div className='selectDiv5' onClick={::this.tableSelectClick('table5')}>合同归档情况表</div>
                <div className='selectDiv1' onClick={::this.tableSelectClick('table6')}>可提报费用统计表</div>
                <div className='selectDiv2' onClick={::this.tableSelectClick('table7')}>可提报收入明细表</div>
                <div className='selectDiv3' onClick={::this.tableSelectClick('table8')}>已提报费用明细表</div>
                <div className='selectDiv4' onClick={::this.tableSelectClick('table9')}>费用分摊明细表</div>
            </div>
        </div>
    </div>
    :
    <div className={`${prefixCls}-cust-footer`}>
        <Card>
            <div className='footer-title'>
                <div className='left minwidth'>
                    <Button onClick={::this.handleSwitchOutClick} type={switchInOut ? 'primary' : 'ghost'}>支出</Button>
                <Button onClick={::this.handleSwitchInClick} type={switchInOut ? 'ghost' : 'primary'}>收入</Button>
                            </div>
        <h1>{reportText}({displayDateText}){switchInOut ? '支出' : '收入'}TOP5</h1>
        <div className='right'>
            <a title='图表' onClick={::this.handleSwitchInOutToPieClick} href="javascript:;"><i className={expensesState ? 'footer-title-iconpie active icon' : 'footer-title-iconpie icon'}></i></a>
        <a title='表格' style={{ marginLeft: '-1px' }} onClick={::this.handleSwitchInOutToTableClick} href="javascript:;"><i className={expensesState ? 'footer-title-iconlist icon' : 'footer-title-iconlist active icon'}></i></a>
    <a title='刷新' className={`${prefixCls}-Refresh icon`} style={{ marginLeft: '8px', width: '26px', borderRadius: '2px' }} onClick={::this.handleUpdateInOutDataClick} href="javascript:;"></a>

                            </div>
                        </div>
    <div style={{ position: 'relative', flex: 1, height: '80%' }}>
        {expensesView()}
    </div>
                    </Card>
    <Card>
        <div className='footer-title'>
            <div className='left'></div>
            <h1 style={{ paddingLeft: '80px' }}>{reportText}({displayDateText})现金流量TOP5</h1>
            <div className='right'>
                                <a title='图表' onClick={::this.handleSwitchCashFlowToBarClick} href="javascript:;"><i className={switchCashFlowState ? 'footer-title-iconbar active icon' : 'footer-title-iconbar icon'}></i></a>
            <a title='表格' style={{ marginLeft: '-1px' }} onClick={::this.handleSwitchCashFlowToTableClick} href="javascript:;"><i className={switchCashFlowState ? 'footer-title-iconlist icon' : 'footer-title-iconlist active icon'}></i></a>
        <a title='刷新' className={`${prefixCls}-Refresh icon`} style={{ marginLeft: '8px', width: '26px', borderRadius: '2px' }} onClick={::this.handleUpdateCashInOutTopFiveClick} href="javascript:;"></a>
                            </div>
                        </div>
    <div style={{ position: 'relative', flex: 1, height: '80%' }}>
        {getCashInOutTopFive()}
    </div>
                    </Card>
                </div>
    }

   



    { Modal(message) }
            </div>
        )
    }

    getGridHeader(curRole) {
        if(curRole=='001') {
            return (<div className='welcome-dz-grid-header'>
                <p className='welcome-dz-grid-col welcome-dz-grid-col-id'>序号</p>
                <p className='welcome-dz-grid-col welcome-dz-grid-col-operation'>操作</p>
                <p className='welcome-dz-grid-col welcome-dz-grid-col-name'>企业名称</p>
                <p className='welcome-dz-grid-col welcome-dz-grid-col-date'>当前账期</p>
                <p className='welcome-dz-grid-col welcome-dz-grid-col-receipt'>理票</p>
                <p className='welcome-dz-grid-col welcome-dz-grid-col-account'>记账</p>
                <p className='welcome-dz-grid-col welcome-dz-grid-col-tax'>报税</p>
                <p className='welcome-dz-grid-col welcome-dz-grid-col-dun welcome-dz-grid-col-last'>催款</p>
            </div>)
        } else if(curRole=='002') {
            return (<div className='welcome-dz-grid-header'>
                <p className='welcome-dz-grid-col welcome-dz-grid-col-id'>序号</p>
                <p className='welcome-dz-grid-col welcome-dz-grid-col-operation'>操作</p>
                <p className='welcome-dz-grid-col welcome-dz-grid-col-name'>企业名称</p>
                <p className='welcome-dz-grid-col welcome-dz-grid-col-date'>当前账期</p>
                <p className='welcome-dz-grid-col welcome-dz-grid-col-receipt'>理票</p>
                <p className='welcome-dz-grid-col welcome-dz-grid-col-account'>记账</p>
                <p className='welcome-dz-grid-col welcome-dz-grid-col-tax welcome-dz-grid-col-last'>报税</p>
            </div>)
        } else if(curRole=='003') {
            return (<div className='welcome-dz-grid-header'>
                <p className='welcome-dz-grid-col welcome-dz-grid-col-id'>序号</p>
                <p className='welcome-dz-grid-col welcome-dz-grid-col-operation'>操作</p>
                <p className='welcome-dz-grid-col welcome-dz-grid-col-name'>企业名称</p>
                <p className='welcome-dz-grid-col welcome-dz-grid-col-date'>当前账期</p>
                <p className='welcome-dz-grid-col welcome-dz-grid-col-receipt'>理票</p>
                <p className='welcome-dz-grid-col welcome-dz-grid-col-account'>
                    <Popover placement="bottom" content={'亲，您没有权限哦~'}>
                        <Button>记账</Button>
                    </Popover>
                </p>
                <p className='welcome-dz-grid-col welcome-dz-grid-col-tax welcome-dz-grid-col-last'>
                    <Popover placement="bottom" content={'亲，您没有权限哦~'}>
                        <Button>报税</Button>
                    </Popover>
                </p>
            </div>)
        }
    }

renderProxy(prefixCls1, message) {
    let { prefixCls, ...otherProps } = this.props
    let getterByField = this.props.payload.getIn(['utils', 'getterByField']),
        curRole = getterByField('curRole'),
        firstSum = getterByField('proxyData.firstPei.text'),
        secondSum = getterByField('proxyData.secondPei.text'),
        thirdSum = getterByField('proxyData.thirdPei.text'),
        fourthSum = getterByField('proxyData.fourthPei.text'),
        rightDate = getterByField('proxyData.rightDate'),
        searchType = getterByField('proxyData.leftListTitle.searchType').get('id'),
        currentMonth = rightDate.get('currentMonth'),
        searchValue = getterByField('proxyData.leftListTitle.searchValue'),
        rightSearchValue = getterByField('proxyData.rightSearchValue'),
        calendarValue,
        peiCardBodyClass = 'hidden-last'
    if(curRole==='001') {
        peiCardBodyClass = 'show-last'
    }
    if (currentMonth < 10) {
        currentMonth = '0' + currentMonth
    }
    calendarValue = moment(rightDate.get('currentYear') + '-' + currentMonth)
    return (
        <div className={`${prefixCls}-proxy`}>
            <div className={`${prefixCls}-proxy-box`}>
                <div className={`${prefixCls}-proxy-box-top`}>
                    <div className={`${prefixCls}-proxy-left`}>
                        <div className={`${prefixCls}-proxy-left-top`}>
                            <div className={`${prefixCls}-proxy-left-top-title`}>
                                进度统计
                                <Button title='刷新'
                                style={{ padding: '1px', float: 'right', position: 'relative', top: '5px', marginRight: '10px', 'textIndent': '0' }}
                                onClick={::this.handleRefresh}
                                    >
                                    <ZIcon icon='refresh' />
                                </Button>
                                <DynamicComponent {...otherProps}
                                _path="report.peiFormItems" className={`${prefixCls}-proxy-left-top-title-right`} />
                            </div>
                            <div className={`${prefixCls}-proxy-left-top-body`}>
                                <Card className={peiCardBodyClass}>
                                    <div className={`${prefixCls}-proxy-left-pei-card`}>
                                        <div className={`${prefixCls}-proxy-left-pei-box`}>
                                            <p className='peititle'>理票总数:</p>
                                            <p className='peiNum'>{firstSum}</p>
                                            <ReactEcharts
                                                echartOption={::this.getProxyFirstPei()}
                                                        style={{ height: '249px', width: '181px', position: 'absolute' }}
                                            />
                                        </div>
                                    </div>
                                    <div className={`${prefixCls}-proxy-left-pei-card`}>
                                        <div className={`${prefixCls}-proxy-left-pei-box`}>
                                            <p className='peititle'>记账总数:</p>
                                            <p className='peiNum'>{secondSum}</p>
                                            <ReactEcharts
                                                echartOption={::this.getProxySecondPei()}
                                                        style={{ height: '249px', width: '181px', position: 'absolute' }}
                                            />
                                        </div>
                                    </div>
                                    <div className={`${prefixCls}-proxy-left-pei-card`}>
                                        <div className={`${prefixCls}-proxy-left-pei-box`}>
                                            <p className='peititle'>报税总数:</p>
                                            <p className='peiNum'>{thirdSum}</p>
                                            <ReactEcharts
                                                echartOption={::this.getProxyThirdPei()}
                                                        style={{ height: '249px', width: '181px', position: 'absolute' }}
                                            />
                                        </div>
                                    </div>
                                    <div className={`${prefixCls}-proxy-left-pei-card`}>
                                        <div className={`${prefixCls}-proxy-left-pei-box`}>
                                            <p className='peititle'>催款总数:</p>
                                            <p className='peiNum'>{fourthSum}</p>
                                            <ReactEcharts
                                                echartOption={::this.getProxyFourthPei()}
                                                        style={{ height: '249px', width: '181px', position: 'absolute' }}
                                            />
                                        </div>
                                    </div>
                                </Card>

                            </div>
                        </div>

                    </div>
                    <div className={`${prefixCls}-proxy-right`}>
                        <div className={`${prefixCls}-proxy-right-top`}>
                            <Card className={`${prefixCls}-proxy-right-top-body`}>
                                <p className={`${prefixCls}-proxy-right-top-title`}>
                                    报税日历
                                </p>
                                <Calendar
                                    fullscreen={false}
                                    onPanelChange={::this.onPanelChange}
                                    dateCellRender={::this.dateCellRender}
                                    monthCellRender={::this.monthCellRender}
                                    onSelect={::this.onSelect}
                                    value = {calendarValue}
                                />
                            </Card>
                        </div>
                    </div>
                </div>
                <div className={`${prefixCls}-proxy-box-bottom`}>
                    <div className={`${prefixCls}-proxy-left-bottom`}>
                        <Card>
                            <div className={`${prefixCls}-proxy-left-bottom-title`}>
                                <DynamicComponent {...otherProps}
                                    _path="report.leftListTitle"
                                />
                                {
                                    searchType!=='0' ? '' : <div style={{ float: 'left', width: '200px', marginTop: '8px' }} className='leftSearch'>
                                        <Input placeholder='请输入企业名称查询' onChange={::this.handleSearchChange}/>
                                                <ZIcon icon='query' colorStyle='gray' />
                                    </div>
                                }
                                <div className="icons">
                                    <ZIcon icon='message-success' /><span>已完成</span>
                                    <ZIcon icon='jinhangzhong' colorStyle='orange' /><span>进行中</span>
                                    <ZIcon icon='weikaishi' colorStyle='gray' /><span>未开始</span>
                                </div>
                            </div>
                            <div className={`${prefixCls}-proxy-left-bottom-body`}>

                                {::this.getGridHeader(curRole)}

                                <DynamicComponent {...otherProps}
                                    _path="report.proxyFirstList"
                                    scroll={{ y: true, x: true }}
                                    bodyStyle={{ overflowY: 'auto' }}
                                    onEvent={::this.handleEvent}
                                    endOptionColumnTitle='操作'
                                    endOptionColumnWidth={165}
                                    endOptionColumnCreator={this.endOptionColumnCreator.bind(this)}
                                    endOptionColumnFixed
                                />
                                <DynamicComponent {...otherProps}
                                    _path="report.leftPage"
                                />
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
            {Modal(message) }
        </div>
        )
    }
}

function getCurTime(liveParam) {//当前时间，正常直播时间，周几，几点（开始发布），是否更改，更改后的直播时间,更改后的发布时间,节假日数组
    let isLive = liveParam.isLive,
        isChange = liveParam.isChange,
        publishDay = 2,
        publishHour =22,
        today = liveParam.today?liveParam.today:moment().format('YYYY-MM-DD'),
        momentCurDate = moment(today),
        curDay = momentCurDate.get('day'),
        moment1 = moment(momentCurDate.format('YYYY-MM-DD')),
        moment2 =  moment(momentCurDate.format('YYYY-MM-DD')),
        changePublishTime = liveParam.publishTime?liveParam.publishTime:moment1.add(2-curDay,'days').format('YYYY-MM-DD'),
        liveTime = moment2.add(4-curDay,'days'),
        changeTime = liveParam.liveTime?moment(liveParam.liveTime).format('YYYY-MM-DD'):liveTime.format('YYYY-MM-DD'),
        curMonth = momentCurDate.get('month'),
        curDate = momentCurDate.get('date'),
        curHour = momentCurDate.get('hour')

    if(!isLive) {//如果不直播，直接返回false
        return false
    }
    if(isChange) {//如果改变了，不走算法，按后台返回数据走
        if( (momentCurDate.isSame(changePublishTime,'day') &&curHour>=publishHour)||(momentCurDate.isAfter(changePublishTime,'day') && (momentCurDate.isBefore(changeTime,'day')||momentCurDate.isSame(changeTime,'day'))  ) ) {//每周二定点，到周四显示
            return changeTime
        } else {
            return false
        }
    }
    if( (curDay==publishDay &&curHour>=publishHour)||(curDay>publishDay &&curDay<=4) ) {//每周二定点，到周四显示
        let isVacation = false
        if(isVacation) {
            return false
        }
        return liveTime.format('YYYY-MM-DD')
    } else {
        return false
    }
}
