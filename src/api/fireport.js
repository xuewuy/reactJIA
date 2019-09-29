/**
 * 获取事件下拉列表的字典数据
 * @param  {[type]} post [description]
 * @return {[type]}      [description]
 */
export function queryDateList(post,month){
    return post('/v1/fireport/querydatelist',{'type':month})
}
/**
 * 获取负债表表格数据
 * @param  {[type]} post [description]
 * @param  {[type]} date [查询的月份]
 * @return {[type]}      [description]
 */
export function getData(post,date){
    return post('/v1/fireport/balancesheet/getdata',{date:date})
}

/**
 * 获取利润表表格数据
 * @param  {[type]} post [description]
 * @param  {[type]} date [description]
 * @return {[type]}      [description]
 */
export function getIncomeStatementData(post,date){
    return post('/v1/fireport/IncomeStatement/getdata',{date:date})
}

/**
 * 现金流量表表格数据
 * @param  {[type]} post [description]
 * @param  {[type]} date [description]
 * @return {[type]}      [description]
 */
export function getCashFlowData(post,date){
    return post('/v1/fireport/cashFlow/getData',{date:date})
}

/**
 * 获取下拉列表
 * @param  {[type]} post [description]
 * @param  {[type]} date [description]
 * @return {[type]}      [description]
 */
export function cashFlowItemQuery(post,isNotContent85){
    return post('/v1/cashFlowItem/query',{'isNotContent85':isNotContent85})
}
/**
 * 现金流量明细列表数据
 * {
    beginDate        开始日期
    endDate          结束日期  
    startCode        开始凭证号
    endCode          结束凭证号
    accountCode      科目编码
    cashFlowItemId   现金流量项目id
    isAllFlag        是否查询全部现金流量项目（明细进入1，单个进入2）
}
 */
export function cashFlowDetail(post,list){
    return post('/v1/fireport/cashFlowDetail',list)
}
/**
 * 现金流量明细列表修改
 * {
    cashFlowItemId   现金流量项目id
}
 */
export function insertDetail(post,list){
    return post('/v1/fireport/insertDetail',list)
}
/**
 * 获取期初数据列表
 * @param  {[type]} post [description]
 * @param  {[type]} date [description]
 * @return {[type]}      [description]
 */
export function getBeginData(post){
    return post('/v1/fireport/CashFlow/getBeginData',{})
}

/**
 * 保存期初数据列表
 * @param  {[type]} post [description]
 * @param  {[type]} date [description]
 * @return {[type]}      [description]
 */
export function create(post,list){
    return post('/v1/fireport/CashFlow/create',list)
}

/**
 * 现金流量表 打印
 */
export function print(post,date){
    return post('/v1/fireport/CashFlow/print',{date})
}

/**
 * 资产负债表 打印
 */
export function balancesheetPrint(post,date){
    return post('/v1/fireport/balancesheet/print',{date})
}

/**
 * 利润表表 打印
 */
export function incomeStatementPrint(post,date,printtype){
    return post('/v1/fireport/IncomeStatement/print',{date,printtype})
}

/**
 * 导出财务申报数据
 */
export function export4Tax(post,date,exporttype){
    return post('/v1/fi/report/export4tax',{date,exporttype})
}

/**
 * 资产负债表 Excel导出
 */
export function balancesheetExport(post,date){
    return post('/v1/fireport/balancesheet/export',{date})
}

/**
 * 利润表Excel导出
 */
export function incomeStatementExport(post, date, printtype){
    return post('/v1/fireport/IncomeStatement/export',{ date, printtype })
}

/**
 * 现金流量表Excel导出
 */
export function cashFlowExport(post, date,printtype){
    return post('/v1/fireport/CashFlow/export', {date,printtype})
}

/**
 * 现金流量表分享
 * @param  {[type]} post [description]
 * @param  {[type]} date [description]"date": "2016.09:2016.09"
 * @return {[type]}      [description]
 */
export function cashFlowShare(post,list){
    return post('/v1/fireport/CashFlow/share',list)
}

/**
 * 现金流量表发送分享邮件
 * @param  {[type]} post [description]
 * @param  {[type]} {
    "date": "2016.09:2016.09"
}
 * @return {[type]}      [description]
 */
export function cashFlowSendShareMail(post,list){
    return post('/v1/fireport/CashFlow/sendShareMail',list)
}
/**
 * 资产负债表分享
 * @param  {[type]} post [description]
 * @param  {[type]} date [description]"date": "2016.09:2016.09"
 * @return {[type]}      [description]
 */
export function balancesheetShare(post,list){
    return post('/v1/fireport/balancesheet/share',list)
}

/**
 * 资产负债表发送分享邮件
 * @param  {[type]} post [description]
 * @param  {[type]} {
    "date": "2016.09:2016.09"
}
 * @return {[type]}      [description]
 */
export function balancesheetSendShareMail(post,list){
    return post('/v1/fireport/balancesheet/sendShareMail',list)
}
/**
 * 利润表分享
 * @param  {[type]} post [description]
 * @param  {[type]} date [description]"date": "2016.09:2016.09"，"printtype"="IRS"
 * @return {[type]}      [description]
 */
export function incomeStatementtShare(post,list){
    return post('/v1/fireport/IncomeStatement/share',list)
}

/**
 * 利润表发送分享邮件
 * @param  {[type]} post [description]
 * @param  {[type]} {
    "date": "2016.09:2016.09"，
    "printtype"="IRS"
}
 * @return {[type]}      [description]
 */
export function incomeStatementSendShareMail(post,list){
    return post('/v1/fireport/IncomeStatement/sendShareMail',list)
}

/**
 * 利润表 打印导出，获取税务类型
 */
export function getIncomeStatementExpStyle(post){
    return post('/v1/fireport/IncomeStatement/getIncomeStatementExpStyle')
}

/**
 * 利润表 打印导出，保存税务类型
 * type:1:选中第一个;2选中第二个
 */
export function updateIncomeStatementExpStyle(post,type){
    return post('/v1/fireport/IncomeStatement/updateIncomeStatementExpStyle',type)
}

/**
 * 三大报表 保存数据接口
 * {
    "reportCode": "cashflow", //"balanceSheet":"资产负债表";"incomeStatement":"利润表";"cashflow":"现金流量表";
    "startYear": 2017,
    "startPeriod": 1,
    "endYear": 2017,
    "endPeriod": 7
}
 */
export function save(post,list){
    return post('/v1/fireport/save',list)
}

/**
 * 三大报表 对比数据接口
 * {
    "reportCode": "cashflow", //"balanceSheet":"资产负债表";"incomeStatement":"利润表";"cashflow":"现金流量表";
    "startYear": 2017,
    "startPeriod": 1,
    "endYear": 2017,
    "endPeriod": 7
}
 */
export function checkReportData(post,list){
    return post('/v1/fireport/checkReportData',list)
}

/**
 * 三大报表 是否可导出申报接口
*/
export function isExportbyCity(post) {
    return post('/v1/fi/report/isExportbyCity')
}


