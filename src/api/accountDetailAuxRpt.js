/**
 *     辅助明细账接口
 *     点击明细账查询调用：account/queryForDetailAuxRpt，返回两个对象，分别是科目下拉、辅助明细账具体集合
 */
export function accountQueryForDetailAuxRpt(post,list){
	return post("v1/fiDetailAccountAuxRpt/queryForAccount", list)
}

/**
 *     辅助明细账接口
 *     点击明细账科目下拉调用：fiDetailAccountAuxRpt/query，返回一个个对象，辅助明细账具体集合
 */
export function fiDetailAccountAuxRptQuery(post,list){
	return post("v1/fiDetailAccountAuxRpt/query", list)
}

/**
 * 辅助明细账
 * 根据查询条件打印
 * @param  {[type]} post   [description]
 * @param  {[type]} list   [description]
 */
export function print(post, list){
	return post('/v1/fiDetailAccountAuxRpt/print', list)
}
/**
 * 辅助明细账
 * 根据查询条件打印
 * @param  {[type]} post   [description]
 * @param  {[type]} list   [description]
 */
export function printAux(post, list){
	return post('v1/fiPrint/fzmxPrint', list)
}
/**
 * 辅助明细账
 * 根据查询条件导出
 * @param  {[type]} post   [description]
 * @param  {[type]} list   [description]
 */
export function exportExcel(post, list){
	return post('/v1/fiDetailAccountAuxRpt/export', list)
}

/*
	辅助明细账-进项税额转出-查询
	@param　type post
	@param  url /v1/fiDetailAccountAuxRpt/inputTaxQuery
	@param  json{
		"beginDate":"2017-10",
		"endDate":"2017-10",
		"groupStr":"inputTaxId",
		"whereStr":"",
		"page":{"currentPage":1,"pageSize":100},
		"accountCode":""}//默认
*/
export function InputTaxQuery(post,params){
	return post('/v1/fiDetailAccountAuxRpt/inputTaxQuery',params)
}
/*
	辅助明细账-进项税额转出-打印
	@param　type post
	@param  url /v1/fiDetailAccountAuxRpt/inputTaxPrint
	@param  json{
		"beginDate":"2017-10",
		"endDate":"2017-10",
		"accountCode":"",
		"groupStr":"inputTaxId",
		"whereStr":""}//默认
*/
export function inputTaxPrint(post,params){
	return post('/v1/fiDetailAccountAuxRpt/inputTaxPrint',params)
}
/*
	辅助明细账-进项税额转出-导出
	@param　type post
	@param  url /v1/fiDetailAccountAuxRpt/inputTaxExport
	@param  json{
		"beginDate":"2017-10",
		"endDate":"2017-10",
		"accountCode":"",
		"codeAndName":"",
		"groupStr":"inputTaxId",
		"whereStr":""}//默认
*/
export function inputTaxExport(post,params){
	return post('/v1/fiDetailAccountAuxRpt/inputTaxExport',params)
}
