/**
 *     fiDetailAccountRpt明细账账表接口
 *     
 * 账表的查询
 * @param  {[type]} post       [description]
 * @param  {[type]} list:{'beginDate','endDate','accountCode','currencyId','noDataNoDisplay'} [description]
 * @return {[type]}            [description]
 */
/*export function query(post,list){
	return post("v1/fiDetailAccountRpt/query", list)
}*/
/**
 *     科目明细账接口
 *     页面加载调用：currency/queryForDetailRpt，返回三个对象，分别是币种、科目、明细账数据集合 参数只传时间
 */
export function queryForDetailRpt(post,list){

	return post("v1/fiDetailAccountRpt/queryForCurrency", list)
}


/**
 *     科目明细账接口
 *     选择币种调用：account/queryForDetailRpt，返回两个对象，分别是科目、明细账数据集合 查询时使用
 */
export function accountQueryForDetailRpt(post,list){

	return post("v1/fiDetailAccountRpt/queryForAccount", list)
}
/**
 *     科目明细账接口
 *     选择科目调用：fiDetailAccountRpt/query，返回一个对象，是明细账数据集合  刷新也调用
 */
export function fiDetailAccountRptQuery(post,list){
	return post("v1/fiDetailAccountRpt/query", list)
}


/**
 * 科目明细账
 * 根据查询条件打印
 * @param  {[type]} post   [description]
 * @param  {[type]} list   [description]
 */
export function print(post, list){
	return post('/v1/fiDetailAccountRpt/print', list)
}

/**
 * 科目明细账
 * 根据查询条件导出
 * @param  {[type]} post   [description]
 * @param  {[type]} list   [description]
 */
export function exportExcel(post, list){
	return post('/v1/fiDetailAccountRpt/export', list)
}

/**
 * 明细账 分享
 * 根据查询条件导出
 * @param  {[type]} post   [description]
 * @param  {[type]} list   {
    "beginDate": "2016-09",
    "endDate": "2016-10",
    "accountCode": "1001",
    "currencyId": "1",
    "noDataNoDisplay": "1",
    "isQuantityCalc": true,
    "isMultiCalc": false
}
 */
export function share(post, list){
	return post('/v1/fiDetailAccountRpt/share', list)
}

/**
 * 明细账 发送分享邮件
 * 根据查询条件导出
 * @param  {[type]} post   [description]
 * @param  {[type]} list   {
    "beginDate": "2016-09",
    "endDate": "2016-10",
    "accountCode": "1001",
    "currencyId": "1",
    "noDataNoDisplay": "1",
    "isQuantityCalc": true,
    "isMultiCalc": false
}
 */
export function sendShareMail(post, list){
	return post('/v1/fiDetailAccountRpt/sendShareMail', list)
}

