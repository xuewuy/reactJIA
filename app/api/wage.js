// 工资单列表查询接口
export function querydetail(post, orgId, year, month){
	return post('/v1/wage/querydetail',{'orgId':orgId,'year':year,'month':month})
}
// 工资单管理列表查询接口
export function querylist(post, orgId, year, month, currentPage, pageSize){
	return post('/v1/wage/querylist',{'orgId':orgId,'year':year,'month':month,'page':{'pageSize':pageSize,'currentPage':currentPage}})
}
// 生成凭证接口
export function generateDoc(post, id){
	return post('/v1/wage/doc/generate',{'id':id})
}
// // 工资单模板excel导出接口
// export function exportTemplate(post,orgId,fileName){
// 	return post('/v1/wage/excel/exporttemplate',{'orgId':orgId,'fileName':fileName})
// }
// // 工资单导出个税申报模板接口
// export function exportIncomeTax(post,wage,download){
// 	return post('/v1/wage/excel/exportincometax',{'wage':wage,'download':download})
// }

// 计提生成凭证接口
export function accrued(post,id,year,month){
	return post('/v1/wage/doc/accrued',{'id':id,'year':year,'month':month})
}

// 计提生成凭证接口
export function query(post,id,year,month){
	return post('/v1/wage/doc/query',{'id':id,'year':year,'month':month})
}

// 生成缴纳公积金凭证接口
export function payhousingfund(post,id,year,month,payHousingFundAccount,payAccountTypeId){
	return post('/v1/wage/doc/payhousingfund',{'id':id,'year':year,'month':month,'payHousingFundAccount':payHousingFundAccount,'payAccountTypeId':payAccountTypeId})
}

// 生成缴纳个税凭证接口
export function payincometax(post,id,year,month,payIncomeTaxAccount,payAccountTypeId){
	return post('/v1/wage/doc/payincometax',{'id':id,'year':year,'month':month,'payIncomeTaxAccount':payIncomeTaxAccount,'payAccountTypeId':payAccountTypeId})
}

// 生成缴纳社保凭证接口
export function payinsurance(post,id,year,month,payInsuranceAccount,payAccountTypeId){
	return post('/v1/wage/doc/payinsurance',{'id':id,'year':year,'month':month,'payInsuranceAccount':payInsuranceAccount,'payAccountTypeId':payAccountTypeId})
}

// 生成发放工资凭证接口
export function paywage(post,id,year,month,details){
	return post('/v1/wage/doc/paywage',{'id':id,'year':year,'month':month,'details':details})
}

// 根据上一个界面的wageId获取工资单列表
export function queryWageDetail(post,id,orgid){
	return post('/v1/wage/queryWageDetail',{'id':id,'orgId':orgid})
}
// 导出模板接口
export function exporttemplate(post,year,month,filename){
	return post('/v1/wage/excel/exporttemplate',{year,month,filename})
}
// 导出工资接口 19年新政策需新加两个字段：wageOption，wageOptionDto
export function exportWage(post, list){
    return post('/v1/wage/excel/exportWage', list)
}
// 查询导出复选框情况的接口
/**
 * @api {GET} wage/selectExportWageOption selectExportWageOption
 * @apiDescription 查询导出工资单选项
 * @apiPermission anyone
* @apiParamExample {json} 请求示例
* { }
* 正确返回示例 result：{“wageOption”：“243434”}
* 没有返回值示例 result：{“wageOption”：null}
*/
export function selectExportWageOption(post, {}) {
    return post('/v1/wage/selectExportWageOption', {})
}

// xia zai ge shui 模板接口
export function exportincometax(post, wageId, download, filename, type){
    return post('/v1/wage/excel/exportincometax', { wageId, download, filename, type})
}

// 导入模板出错下载文件接口
export function excelDownload(post,filename,newfilename){
	return post('/v1/wage/excel/download',{filename,newfilename})
}

/**
 * 基础档案 客户导入错误，从新下载模板
 * @param {*} post 
 * @param {*} obj 
 */
export function customerArchiveDownloadTemplate(post,filename,newfilename){
	return post('/v1/customerArchive/excel/download',{filename,newfilename})
}

/**
 * 基础档案 供应商导入错误，从新下载模板
 * @param {*} post 
 * @param {*} obj 
 */
export function vendorDownloadTemplate(post,filename,newfilename){
	return post('/v1/vendor/excel/download',{filename,newfilename})
}

/**
 * 基础档案 存货导入错误，从新下载模板
 * @param {*} post 
 * @param {*} obj 
 */
export function inventoryDownloadTemplate(post,filename,newfilename){
	return post('/v1/inventory/excel/download',{filename,newfilename})
}


/**
 * 基础档案 案件导入错误，从新下载模板
 * @param {*} post 
 * @param {*} obj 
 */
export function projectDownloadTemplate(post,filename,newfilename){
	return post('/v1/project/excel/download',{filename,newfilename})
}

/**
 * 导入发票 跟导入实收款 的导入错误模板，从新下载模板
 * @param {*} post 
 * @param {*} obj 
 */
export function lawloadTemplate(post,filename,newfilename){
	return post('/v1/wage/excel/download',{filename,newfilename})
}



// 导入模板出错下载文件接口
export function wageDelete(post,year,month){
	return post('/v1/wage/delete',{'year':year,'month':month})
}

// 导入工资单接口
/*
*
*list:{year:'2017',month:'01',orgId:'1111111'}
*
*
*/
export function importExcel(post,list){
	return post('/v1/wage/excel/import',list)
}

//发工资条数据查询
/* {
* "month": 11, --查询月份
* "year": 2018
* } 
*/
export function queryPayWageByPerson(post, list) {
    return post('/v1/payWage/queryPayWageByPerson', list)
}
//发工资条保存邮箱
/*  {
*    "id":1,
*    "email":"":"1@rrtimes.com"
*  } */
export function updateById(post, list) {
    return post('/v1/person/updateById', list)
}
//发工资条邮件
/* {
*    "list": [{"id": 1,"account": "": "1@rrtimes.com", - ", ---发送人  "subject": "1", --邮件主题   "content": "1" --内容}]
*  } */
export function shareEmail(post, list) {
    return post('/v1/payWage/shareEmail', list)
}

/* ***********************个税专项附加扣除汇总表  start*************************** */
/**
 * @api {POST} individualTax/queryList queryList
 * @apiDescription 个税专项附加扣除汇总表列表
 * @apiParamExample {json} 请求示例
 *      {
		  "year": 2018, 
		  "month": 1, 
	      "basicIdList": [1,1,1,1],
          "page":{
	        "pageSize":"50",
	        "offset":"1"
	      }
		}
 * @apiSuccessExample {json} 成功返回数据示例
 *     
 */
export function individualTaxQueryList(post, list) {
    return post('/v1/individualTax/queryList', list)
}
/**
 * @api {POST} individualTax/queryBasicList queryBasicList
 * @apiDescription 个税专项附加扣除人员列表
 * @apiParamExample {json} 请求示例
 *      {}
 * @apiSuccessExample {json} 成功返回数据示例
 *     
 */
 export function queryBasicList(post, list) {
    return post('/v1/individualTax/queryBasicList', list)
}
/**
 * @api {POST} individualTax/notificationState notificationState
 * @apiDescription 个税专项附加扣除汇总表通知状态
 * @apiParamExample {json} 请求示例
 *      {}
 * @apiSuccessExample {json} 成功返回数据示例
 *     
 */
 export function notificationState(post, list) {
    return post('/v1/individualTax/notificationState', list)
}
/**
 * @api {POST} individualTax/exportTemplate exportTemplate
 * @apiDescription 导出模板的接口
 * @apiParamExample {json} 请求示例
 *      {}
 * @apiSuccessExample {json} 成功返回数据示例
 *     
 */
 export function taxExportTemplate(post, list) {
    return post('/v1/individualTax/exportTemplate', list)
}
/**
 * @api {POST} individualTax/exportData exportData
 * @apiDescription 导出专项附加扣除信息
 * @apiParamExample {json} 请求示例
 *      {}
 * @apiSuccessExample {json} 成功返回数据示例
 *     
 */
 export function exportData(post, list) {
    return post('/v1/individualTax/exportData', list)
}

/**
 * @api {POST} individualTax/importFromExcel importFromExcel
 * @apiDescription 个税专项附加扣除汇总表的导入
 * @apiParamExample {json} 请求示例
 *      {}
 * @apiSuccessExample {json} 成功返回数据示例
 *     
 */
//  export function importFromExcel(post, list) {
//     return post('/v1/individualTax/importFromExcel', list)
// }

/* ***********************个税专项附加扣除汇总表  end***************************** */



/* ***********************工资单期初  start***************************** */

/**
 * @api {POST} wagePerideBegin/init init
 * @apiDescription 工资单期初初始化
 * @apiParamExample {json} 请求示例
 *     {}
 */
export function wagePerideBeginInit(post, {}) {
    return post('/v1/wagePerideBegin/init', {})
}

/**
 * @api {POST} wagePerideBegin/query query
 * @apiDescription 工资单期初列表查询
 * @apiParamExample {json} 请求示例
 *     {"year":2019}
 * @apiUse SuccessResult
 * @apiSuccess (Success) {Object} value 工资单详细信息
 * @apiSuccessExample {json} 成功返回数据示例
 *     {
 *       "result": true,
 *       "value": {
 *       	"list":{
 *       	"departmentName" :"部门",
 *      	"personName" :"姓名",
 *      	"documentNumber" :"3254545",
 *      	"totalIncomeAmount":0, --累计收入额
 *      	"totalbaseDeductionAmount":0, --累计减除费用
 *      	"totalSpecialDeductionAmount":0, --累计专项扣除
 *      	"childEducationAmount":0, --子女教育
 *      	"continuingEducationAmount":0,	--继续教育
 *      	"majorIllnessAmount":0, -- 大病医疗
 *      	"housingLoanInterestAmount":0, -- 住房贷款利息
 *      	"housingRentAmount":0, -- 住房租金
 *      	"supportingElderlyAmount":0, -- 赡养老人
 *      	"totalOtherDeductionAmount":0, -- 累计其他扣除
 *      	"taxRate":0, -- 减按计税比例
 *      	"totalDeductionDonationAmount":0, -- 准予扣除的捐赠额
 *      	"totalDeductionTaxAmount":0, -- 减免税额
 *      	"taxesWithheldAmount":0 -- 已扣缴税额
 *       }
 *       }
 *     }
 */
export function wagePerideBeginQuery(post, list) {
    return post('/v1/wagePerideBegin/query', list)
}
 

/**
 * @api {POST} wagePerideBegin/downloadTemplate downloadTemplate
 * @apiDescription 工资单期初模板下载
 * @apiParamExample {json} 请求示例
 *     {}
 */
export function downloadTemplateBegin(post, {}) {
    return post('/v1/wagePerideBegin/downloadTemplate', {})
}

/**
 * @api {POST} wagePerideBegin/import import
 * @apiDescription 工资单期初模板导入
 * @apiParamExample {json} 请求示例
 *     {"year": 2018,"fileName":"", "isRepeat":false --是否覆盖导入}
*/

export function importBegin(post, list) {
    return post('/v1/wagePerideBegin/import', list)
}

/**
 * @api {POST} wagePerideBegin/queryLog queryLog
 * @apiDescription 工资单期初日志
 * @apiParamExample {json} 请求示例
 *     {"year":2019}
 * @apiUse SuccessResult
 * @apiSuccess (Success) {Object} value 工资单详细信息
 * @apiSuccessExample {json} 成功返回数据示例
 *     {
 *       "result": true,
 *       "value": {
 *       	"list":{
 *       	"createTime" :"2018",--操作时间
 *      	"name" :"姓名", --操作员
 *      	"fileName" :"3254545", -- 文件名
 *      	"action":"导入",--行为
 *      	"versionNum":234 --版本号
 *       
 *       }
 *       }
 *     }
 */
export function queryLogBegin(post, list) {
    return post('/v1/wagePerideBegin/queryLog', list)
}

/**
 * @api {POST} wagePerideBegin/downloadLog downloadLog
 * @apiName downloadLog
 * @apiGroup wagePerideBegin
 * @apiVersion 1.0.0
 * @apiDescription 日志下载
 * @apiParamExample {json} 请求示例
 *     {"fileName" :"3254545", -- 文件名 "versionNum":234 --版本号}
 */
export function downloadLogBegin(post, list) {
    return post('/v1/wagePerideBegin/downloadLog', list)
}

/* ***********************工资单期初  end***************************** */