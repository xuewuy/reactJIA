/**
 *	账簿接口
 */

export function init(post){
	return post('/v1/fisumaccountrpt/init',{})
}

/**
 *科目总账：
 *@param  type post
 *@param  url  /v1/fisumaccountrpt/query
 *@param  json {"begindate": "2016-09","enddate": "2016-10","accountcode","1001"}
 */
export function getdata(post, json){
    return post('/v1/fisumaccountrpt/query', json)
}

/*
*	获取会计启用年月
	@param　type post
	@param  url /v1/fisumaccountrpt/getenableddate
	@param  json{}
*/
export function getenableddate(post){
	return post('/v1/fisumaccountrpt/getenableddate',{})
}
/*
	获取全币种
	@param　type post
	@param  url /v1/currency/query
	@param  json{
		"page": {
	        "currentPage": 1,
	        "pageSize": 50
	    }
	}//默认

*/
export function getCurrencyQuery(post,json){
	let params = json ? json : {
		"page": {
	        "currentPage": 1,
	        "pageSize": 50
	    }
	}
	return post('/v1/currency/query',params)
}
/*
	辅助总账张表数据获取
	@param　type post
	@param  url /v1/fiauxglsumrpt/query
	@param  json{
		"begindate": "2016-09",
		"enddate": "2016-10",
		"accountcode": "2201",
		"groupstr": "departmentId,
			personId",
			//选中哪些 辅助项 ，则传哪些：部门
			//departmentId；
			//职员personId；
			//客户 customerId；
			//供应商 supplierId；
			//项目 projectId；
			//存货 inventoryId；
			//账号 bankAccountId
		"wherestr": "departmentId:1398622904452096,1398622904452098,1398622904452097;personId:1398622158128128,1398635554145280,1398642671223808"
	}
		// 如果在部门中选中了 id是1和2的部门，人员表里面选中了人员id是1的人员，那么就如事例穿过来
	}//默认

*/
export function queryDataList(post,params){
	return post('/v1/fiauxglsumrpt/query',params)
}

//总账科目筛选
//url /v1/account/queryForRpt
//params {
//	 "currencyId": 0,
//   "isBaseCurrency": false
//}
export function accountQueryForRpt(post,params){
	return post('/v1/account/queryForRpt',params)
}
//辅助总账科目筛选
//url /v1/account/queryForAuxRpt
//params:{"groupStr": "departmentId,personId"}
export function queryForAuxRpt(post,params){
	return post('/v1/account/queryForAuxRpt',params)
}
//总账打印
///v1/fisumaccountrpt/print
export function fisumPrint(post,params){
	return post('v1/fisumaccountrpt/print',params)
}
//总账导出
///v1/fisumaccountrpt/export
export function fisumExport(post,params){
	return post('v1/fisumaccountrpt/export',params)
}
//辅助总账打印
///v1/fiauxglsumrpt/print
export function fiauxPrint(post,params){
	return post('v1/fiauxglsumrpt/print',params)
}
//辅助总账导出
///v1/fiauxglsumrpt/export
export function fiauxExport(post,params){
	return post('v1/fiauxglsumrpt/export',params)
}
//总账分享
///v1/fisumaccountrpt/share
export function share(post,params){
	return post('v1/fisumaccountrpt/share',params)
}
//总账发送分享邮件
///v1/fisumaccountrpt/sendShareMail
export function sendShareMail(post,params){
	return post('v1/fisumaccountrpt/sendShareMail',params)
}
/*
	辅助总账-进项税额转出-查询
	@param　type post
	@param  url /v1/fiauxglsumrpt/InputTaxQuery
	@param  json{
		"begindate":"2017-10",
		"enddate":"2017-10",
		"groupstr":"inputTaxId",
		"wherestr":"",
		"accountcode":"",
		"currentPage":1,
		"rowsPerPage":100}
	}//默认
*/
export function InputTaxQuery(post,params){
	return post('/v1/fiauxglsumrpt/InputTaxQuery',params)
}
/*
	辅助总账-进项税额转出-打印
	@param　type post
	@param  url /v1/fiauxglsumrpt/inputTaxPrint
	@param  json{
		"begindate":"2017-10",
		"enddate":"2017-10",
		"accountcode":"",
		"groupstr":"inputTaxId",
		"wherestr":""}//默认
*/
export function inputTaxPrint(post,params){
	return post('/v1/fiauxglsumrpt/inputTaxPrint',params)
}
/*
	辅助总账-进项税额转出-导出
	@param　type post
	@param  url /v1/fiauxglsumrpt/inputTaxExport
	@param  json{
		"begindate":"2017-10",
		"enddate":"2017-10",
		"accountcode":"",
		"groupstr":"inputTaxId",
		"wherestr":""}//默认
*/
export function inputTaxExport(post,params){
	return post('/v1/fiauxglsumrpt/inputTaxExport',params)
}