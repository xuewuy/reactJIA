/* ***********************公共  start*************************** */
/**
 * @api {POST} lfReport/manualAmount/insertOrUpdate insertOrUpdate
 * @apiDescription 律所报表手工录入金额
 * @apiParamExample {json} 请求示例
 *     {
 *     	 "id":1 , -- 传id为更新本条信息
 *       "reportType":1, --报表类型：1：可提报收入汇总表，2：可提报费用统计表，3：已提报费用统计表, 4:费用分摊汇总表'
 *       "personId":1,  -- 人员id
 *       "projectId":1,  --项目id
 *       "businessDetailId":1, --业务明细id
 *       "amount":100    --金额
 *     }
 */
export function costAllInsertOrUpdate(post, list) {
    return post('/v1/lfReport/manualAmount/insertOrUpdate', list)
}
/**
 * @api {POST} lfReport/getSearchParam insertOrUpdate
 * @apiDescription 律所的律师案号的列表数据
 * @apiParamExample {json} 请求示例
 *     {}
 */
export function getSearchParam(post, list) {
    return post('/v1/lfReport/getSearchParam', list)
}
/**
 * @api {POST} manageForLF/printOrDownload printOrDownload
 * @apiDescription 律所报表的打印导出
 * @apiParamExample {json} 请求示例
 *     {"beginDate" : , --开始日期  "endDate": , --结束日期   "lawyerId": , --律师id   "projectId": , --案号id "formType": , --1可提报收入汇总 2可提报收入明细 3可提报费用统计 4已提报费用统计 5 已提报费用明细 6费用分摊汇总 7 费用分摊明细 8 合同归档情况 9提报收入费用汇总 "printType":--1导出2打印}
 */
export function printOrDownload(post, list) {
    return post('/v1/manageForLF/printOrDownload', list)
}
/**
 * @api {POST} /manageForLF/share share
 * @apiDescription 律所报表的二维码分享
 * @apiParamExample {json} 请求示例
 *     {"beginDate" : , --开始日期  "endDate": , --结束日期   "lawyerId": , --律师id   "projectId": , --案号id "formType": , --1可提报收入汇总 2可提报收入明细 3可提报费用统计 4已提报费用统计 5 已提报费用明细 6费用分摊汇总 7 费用分摊明细 8 合同归档情况 9提报收入费用汇总}
 */
export function share(post, list) {
    return post('/v1/manageForLF/share', list)
}
/**
 * @api {POST} /manageForLF/shareEmail shareEmail
 * @apiDescription 律所报表的邮件分享
 * @apiParamExample {json} 请求示例
 *     {"beginDate" : , --开始日期  "endDate": , --结束日期   "lawyerId": , --律师id   "projectId": , --案号id "formType": , --1可提报收入汇总 2可提报收入明细 3可提报费用统计 4已提报费用统计 5 已提报费用明细 6费用分摊汇总 7 费用分摊明细 8 合同归档情况 9提报收入费用汇总}
 */
export function shareEmail(post, list) {
    return post('/v1/manageForLF/shareEmail', list)
}

/* ***********************公共  end*************************** */




/* ***********************已提报费用明细表  start*************************** */

/**
 * @api {POST} lfReport/queryReportingFeeDetail queryReportingFeeDetail
 * @apiDescription 查询已提报费用明细表
 * @apiParamExample {json} 请求示例
 *     {"beginDate":"2018-01-02", --查询开始日期   "endDate":"2018-01-31",--查询结束日期   "personList":[1,2] ,--律师    "projectList":[1,2] --案号
 *     }
 * @apiSuccessExample {json} 成功返回数据示例
 *     {
 *       "result": true,
 *       "value": { 
 *          "dataList":[
 *             {
 *             "personId":1,
 *             "personName":"1", --律师
 *             "personCode":"001",  --员工编码
 *             "tbFeeId":100, --归属提报费用Id
 *             "tbFeeName":"aa", --归属提报费用name
 *             "projectId":100, --案号id
 *             "projectName":"1", --案号
 *             "receiptCode":"001", --流水号
 *             "businessName":"", --流水业务名称
 *             "amount":100, --费用金额
 *             "settleName":"", --结算方式
 *             "jouCode":1, --凭证号
 *             "accountName":1 --会计科目
 *             }
 *             
 *             ]
 *       }
 *     }
 */
export function queryReportingFeeDetail(post, list) {
    return post('/v1/lfReport/queryReportingFeeDetail', list)
}

/* ***********************已提报费用明细表  end*************************** */





/* ***********************费用分摊汇总表  start*************************** */

/**
 * @api {POST} expenseAllocation/querySummary querySummary
 * @apiDescription 查询分摊汇总表
 * @apiParamExample {json} 请求示例
 *     {"beginDate":"2018-01", --查询开始日期   "endDate":"2018-01",--查询结束日期   "personList":[1,2] --律师    "projectList":[1,2] --案号}
 * @apiSuccessExample {json} 成功返回数据示例
 *     {
 *       "result": true,
 *       "value": { 
 *         "titleList":[ {"title":"tbName001", "name":"办公费"},{"title":"tbName002", "name":"律师经费"}],
 *          "dataList":[
 *             {
 *             "personId":1,
 *             "personName":"1", --律师
 *             "personCode":"001",  --员工编码
 *             "tbName001":100, --办公费
 *             "tbName002":1, --"律师经费"
 *             "otherExpenseAmount":100, --其他费用
 *             "otherExpenseId":1, --其他费用id
 *             "reportedExpenseAmount":1 --本期已提报费用
 *             }
 *          ]
 *       }
 *     }
 */
export function costAllQuerySummary(post, list) {
    return post('/v1/expenseAllocation/querySummary', list)
}


/* ***********************费用分摊汇总表  end***************************** */


/* ***********************费用分摊明细表  start*************************** */

/**
   * @api {POST} expenseAllocation/init init
   * @apiDescription 查询分摊明细表初始化数据
   * @apiParamExample {json} 请求示例
   *     {}
   * @apiUse SuccessResult
   * @apiSuccess (Success) {Object} value 工资单详细信息
   * @apiSuccessExample {json} 成功返回数据示例
   *     {
   *       "result": true,
   *       "value": { 
   *             "enabledYear":"2018",  --启用年
   *             "enabledMonth":"1", --启用月
   *             "list":[   --业务类型
   *             	{"id":1687,   "code":"201000",  "name":"招待费"}
   *             ]
   *       }
   *     }
   */

export function costDetailInit(post, list) {
    return post('/v1/expenseAllocation/init', list)
}

/**
 * @api {POST} expenseAllocation/query query
 * @apiDescription 查询分摊明细表
 * @apiParamExample {json} 请求示例
 *     {"year": 2018,   "month" : 9,   "businessId":1, --被分配费用业务类型   "personList":[1,2] --律师   "projectList":[1,2] --案号}
 * @apiUse SuccessResult
 * @apiSuccessExample {json} 成功返回数据示例
 *     {
 *       "result": true,
 *       "value": { 
 *             "personId":1,
 *             "personName":"1", --律师
 *             "personCode":"001",  --员工编码
 *             "allocatedTotal":1, --分摊依据总量
 *             "personalAllocation":1, --个人实际使用量
 *             "partitionCoefficient":1, --分配系数
 *             "allocatedAmount":1, --分配金额
 *             "tbFeeId":1, --归属提报费用Id
 *             "tbFeeName":1, --归属提报费用类别
 *             "projectId":1,  --案号id
 *             "projectName":1 --案号
 *       }
 *     }
 */
export function costDetailquery(post, list) {
    return post('/v1/expenseAllocation/query', list)
}

/**
 * @api {POST} expenseAllocation/downloadTemplate downloadTemplate
 * @apiDescription 费用分摊明细表模板下载
 * @apiParamExample {json} 请求示例
 *     {
 *       "businessId":1 --被分配费用业务类型
 *       "month":1,
 *       "year":2019
 *     }
 * @apiPermission anyone
*/
export function costDetailDownloadTemplate(post, list) {
    return post('/v1/expenseAllocation/downloadTemplate', list)
}

/**
 * @api {POST} expenseAllocation/import import
 * @apiName import
 * @apiGroup expenseAllocation
 * @apiVersion 1.0.0
 * @apiDescription 导入费用分摊明细表
 * @apiParamExample {json} 请求示例
 *     {
 *       "year": 2018,
 *       "month" : 9,
 *       "isRepeatImport":false, --是否覆盖导入，当点击弹框确认后传true
 *       "fileName":""
 *     }
 */
export function costDetailImportTemplate(post, list) {
    return post('/v1/expenseAllocation/import', list)
}
/* ***********************费用分摊明细表  end***************************** */



/* ***********************合同归档情况表  start*************************** */

/**
 * @api {POST} expenseAllocation/downloadTemplate downloadTemplate
 * @apiDescription 合同归档情况表查询
 * @apiParamExample {json} 请求示例
 *     {year: 2019, month: 01, status: true,归档情况 lawyerId: [], projectId: []}
 * @apiPermission anyone
*/
export function contractFilingQuery(post, list) {
    return post('/v1/lfContract/query', list)
}


/**
 * @api {POST} expenseAllocation/downloadTemplate downloadTemplate
 * @apiDescription 合同归档情况表模板下载
 * @apiParamExample {json} 请求示例
 *     {}
 * @apiPermission anyone
*/
export function contractFilingDownloadTemplate(post, list) {
    return post('/v1/lfContract/download', list)
}


/* ***********************合同归档情况表  end***************************** */



/* ***********************可提报收入汇总表  start*************************** */

/**
 * @api {POST} lfReport/allowExtract
 * @apiDescription 可提报收入汇总表查询
 * @apiParamExample {json} 请求示例
 *     {"orgId": , --组织  "beginDate" : , --开始日期  "endDate": , --结束日期   "lawyerId": , --律师id   "projectId": , --案号id}
 * @apiPermission anyone
*/
export function allowExtract(post, list) {
    return post('/v1/lfReport/allowExtract', list)
}


/* ***********************可提报收入汇总表  end***************************** */

/* ***********************可提报收入明细表  start*************************** */

/**
 * @api {POST} lfReport/allowExtractDetail
 * @apiDescription 可提报收入明细表查询
 * @apiParamExample {json} 请求示例
 *     {"orgId": , --组织  "beginDate" : , --开始日期  "endDate": , --结束日期   "lawyerId": , --律师id   "projectId": , --案号id}
 * @apiPermission anyone
*/
export function allowExtractDetail(post, list) {
    return post('/v1/lfReport/allowExtractDetail', list)
}


/* ***********************可提报收入明细表  end***************************** */

/* ***********************提报收入费用汇总表  start*************************** */

/**
 * @api {POST} lfReport/costMatrix
 * @apiDescription 提报收入费用汇总表
 * @apiParamExample {json} 请求示例
 *     {"beginDate" : , --开始日期  "endDate": , --结束日期   "lawyerId": , --律师id   "projectId": , --案号id}
 * @apiPermission anyone
*/
export function costMatrix(post, list) {
    return post('/v1/lfReport/costMatrix', list)
}


/* ***********************提报收入费用汇总表  end***************************** */

/* ***********************已提报费用统计表  start*************************** */

/**
 * @api {POST} lfReport/queryReportingFeeSummary
 * @apiDescription 可提报费用统计表查询
 * @apiParamExample {json} 请求示例
 *      {"beginDate":"2018-01", --查询开始日期
 *      "endDate":"2018-01",--查询结束日期
 *      "isProject":false,--是否显示案号
 *      "personList":[1,2], --律师
 *      "projectList":[1,2] --案号}

 * @apiPermission anyone
*/
export function queryReportingFeeSummary(post, list) {
    return post('/v1/lfReport/queryReportingFeeSummary', list)
}


/* ***********************已提报费用统计表  end***************************** */

/* ***********************可提报费用统计表  start*************************** */

/**
 * @api {POST} lfReport/queryReportingFeeSummary
 * @apiDescription 可提报费用统计表查询
 * @apiParamExample {json} 请求示例
 *      {"beginDate":"2018-01", --查询开始日期
 *      "endDate":"2018-01",--查询结束日期
 *      "isProject":false,--是否显示案号
 *      "personList":[1,2], --律师
 *      "projectList":[1,2] --案号}

 * @apiPermission anyone
*/
export function allowExtractCost(post, list) {
    return post('/v1/lfReport/allowExtractCost', list)
}


/* ***********************可提报费用统计表  end***************************** */

/* ***********************费用分摊明细表  end***************************** */
/**
 * @api {POST} lfReport/queryReportingFeeSummary
 * @apiDescription 费用分摊明细表删除
 * @apiParamExample {json} 请求示例
 *      {"id":"2018-01", --查询开始日期
 *      "endDate":"2018-01",--查询结束日期
 *      "isProject":false,--是否显示案号
 *      "personList":[1,2], --律师
 *      "projectList":[1,2] --案号}

 * @apiPermission anyone
*/
export function costAllocaDel(post, list) {
    return post('/v1/expenseAllocation/costAllocaDel', list)
}
