export function thisYearOrMonthDiary(post,dataType,id,type){
	//month月 year年 
	return post('/v1/acmReport/thisYearOrMonthDiary/query',{dataType:dataType,id,type})
}

export function thisMonthTopFive(post,obj){
    return post('/v1/acmReport/thisMonthTopFive/query',obj)
}

/**
 * 现金流量表接口
 * @param {[type]} post     [description]
 * @param {[type]} dataType [description]
 */
export function cashInOutTopFive(post,dataType,id,type){
    return post('/v1/acmReport/CashInOutTopFive/query',{dataType:dataType,id,type})
}


export function getserverDate(post,dataType){
    return post('/v1/acmReport/getserverDate',{dataType:dataType})
}


export function queryDeskTopInitDate(post,paymentsType,dataType,id,type){
    paymentsType = paymentsType ? paymentsType : 'out'
    dataType = dataType?dataType:'month'
    return post('/v1/acmReport/queryDeskTopInitDate',{paymentstype:paymentsType,dataType:dataType,id,type})
}
//代账端初始化
export function dzhome(post,list) {
	return post('/v1/web/dz/home/getHomeInfo',list)
}
//代账端取得图表数据接口
export function getChartData(post,list) {
	return post('/v1/web/dz/home/getChartData',list)
}
//代账端按名称查询公司信息
export function getCustomerStatusList(post,list) {
	return post('/v1/web/dz/home/getCustomerStatusList',list)
}
//代账端查询报税截止日
export function getTaxEndDay(post,list) {
	return post('/v1/web/dz/home/getTaxEndDay',list)
}
//代账端查询报税截止日
export function getNoAccountOrg(post,list) {
	return post('/v1/web/dz/home/getNoAccountOrg',list)
}
//代账端建账 下拉列表
export function getEnumDetail(post,list) {
	return post('/v1/SetOrg/getEnumDetail',list)
}
//代账端建账 下拉列表
export function queryById(post,list) {
	return post('/v1/dzCustomer/queryById',list)
}

//代账端建账 建账
export function createAccounts(post,list) {
	return post('/v1/dzCustomer/createAccounts',list)
}
