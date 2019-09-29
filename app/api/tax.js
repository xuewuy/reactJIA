// 报税管理列表查询接口
export function getOrgInfoList(post){
	return post('/v1/web/tax/getOrgInfoList')
}

// 增值税申报获取年份列表，当前年月接口
export function getYears(post){
	return post('/v1/web/tax/getYears', { vatHistory:''})
}

// 增值税申报获取年份列表，当前年月接口
export function TaxGetYears(post){
	return post('/v1/web/tax/getYears', { surHistory:true})
}

// 增值税申报列表按年月查询接口
export function init(post,formYear,quarter){
	return post('/v1/web/tax/init',{'formYear':formYear,'quarter':quarter})
}

// 计算申报表接口
export function calForm(post,formYear,quarter,type, isReCalc){
	return post('/v1/web/tax/calForm',{'year':formYear,'quarter':quarter,'type':type, 'isReCalc': isReCalc})
}

// 小规模初始化接口
export function calFormForInit(post, formYear, quarter, isReCalc){
	return post('/v1/web/tax/calFormForInit',{'year':formYear, 'quarter':quarter, 'isReCalc':isReCalc})
}

// 初始数据界面查询数据接口
export function getOrgInitData(post){
	return post('/v1/web/tax/getOrgInitData')
}

// 初始化税设备抵扣接口
export function initTaxDeductibleEquipment(post, formYear,quarter){
	return post('/v1/web/tax/initTaxDeductibleEquipment',{'formYear':formYear,'quarter':quarter})
}

// 更新本期结转余额接口
export function updateCurrentBalance(post, formYear,quarter,currentBalance){
	return post('/v1/web/tax/initTaxDeductibleEquipment',{'formYear':formYear,'quarter':quarter,'currentBalance':currentBalance})
}

// 取未开票数据接口
export function getNoInvoiceLedger(post, formYear,quarter){
	return post('/v1/web/tax/getNoInvoiceLedger',{'formYear':formYear,'quarter':quarter})
}

// 更新未开票数据接口
export function updateNoInvoiceLedger(post, formYear,quarter,goodsUuRevenue,serviceUuRevenue,a1,a2){
	return post('/v1/web/tax/updateNoInvoiceLedger',{'formYear':formYear,'quarter':quarter,'goodsUuRevenue':goodsUuRevenue,'serviceUuRevenue':serviceUuRevenue,'a1':a1,'a2':a2})
}

// 计算申报表接口
export function calIncomeTaxPreAForm(post, formYear,quarter,type){
	return post('/v1/web/tax/calIncomeTaxPreAForm',{'formYear':formYear,'quarter':quarter,'type':type})
}

// 计算申报表接口B
export function calIncomeTaxPreBForm(post, formYear,quarter){
	return post('/v1/web/tax/calIncomeTaxPreBForm',{'formYear':formYear,'quarter':quarter})
}

// 修改A类表附表值传给后台接口
export function updateIncomeTaxPreAFormField(post, year, quarter, type, name, value){
	return post('/v1/web/tax/updateIncomeTaxPreAFormField',{'year':year,'quarter':quarter,'type':type,'name':name,'value':value})
}

// 修改A类表附表值传给后台接口
export function updateIncomeTaxPreBFormField(post, year, quarter, type, name, value){
	return post('/v1/web/tax/updateIncomeTaxPreBFormField',{'year':year,'quarter':quarter,'type':type,'name':name,'value':value})
}

// 修改增值税申报表附表期初最后一行给后台接口
export function currentBalance(post,list){
	return post('/v1/web/tax/currentBalance',list)
}

// 修改增值税申报表给后台接口
export function insertCalForm(post,list){
	return post('/v1/web/tax/insertCalForm',list)
}

// 修改增值税申报表给后台接口 修改后
export function updateVatSmallFormField(post,list){
	return post('/v1/web/tax/updateVatSmallFormField',list)
}

// zengzhishui download
export function download(post,formYear,quarter){
	return post('/v1/web/tax/download',{formYear,quarter})
}
// 小规模增值税申报表 打印
export function print(post,formYear,quarter){
	return post('/v1/web/tax/print',{formYear,quarter})
}
// A类表 打印
export function printIncomeTaxPreAForm(post,formYear,quarter){
	return post('/v1/web/tax/printIncomeTaxPreAForm',{formYear,quarter})
}
// B类表 打印
export function printIncomeTaxPreBForm(post,formYear,quarter){
	return post('/v1/web/tax/printIncomeTaxPreBForm',{formYear,quarter})
}

// zengzhishui qichu download
export function template(post){
	return post('/v1/web/tax/template')
}

// A lei download
export function downloadIncomeTaxPreAForm(post,formYear,quarter){
	return post('/v1/web/tax/downloadIncomeTaxPreAForm',{formYear,quarter})
}
// B lei download
export function downloadIncomeTaxPreBForm(post,formYear,quarter){
	return post('/v1/web/tax/downloadIncomeTaxPreBForm',{formYear,quarter})
}

// 存档接口
export function saveVatSmall(post, formYear,quarter){
	return post('/v1/web/tax/saveVatSmall',{'year':formYear,'quarter':quarter})
}
// 取消存档接口
export function cacelSaveVatSmall(post, formYear,quarter){
	return post('/v1/web/tax/cacelSaveVatSmall',{'year':formYear,'quarter':quarter})
}

// 小规模纳税人 批量计算
export function batchUpdateVatSmallFormField(post,list){
	return post('/v1/web/tax/batchUpdateVatSmallFormField',list)
}
// 批量更新A表接口 批量计算
export function batchUpdateIncomeTaxPreAFormField(post,list){
	return post('/v1/web/tax/batchUpdateIncomeTaxPreAFormField',list)
}
// 批量更新B表接口 批量计算
export function batchUpdateIncomeTaxPreBFormField(post,list){
	return post('/v1/web/tax/batchUpdateIncomeTaxPreBFormField',list)
}

//小规模分享 生成字符串
// export function share(post,list) {
// 	return post('/v1/web/tax/taxDeclaration/share',list)
// }
export function share(post,list) {
	return post('/v1/web/tax/taxDeclaration/share',list)
}
//小规模分享 获得增值税申报分享数据
export function getShareData(post,list) {
	// return post('/v1/web/tax/taxDeclaration/getShareData',list)
	return post('/v1/web/tax/taxDeclaration/getShareData',{})
}
//小规模分享 发送分享邮件
export function sendShareMail(post,list) {
	return post('/v1/web/tax/taxDeclaration/sendShareMail',list)
}
//小规模分享 分享图片
export function getPicture(post,list) {
	return post('/v1/web/tax/getPicture',{})
}
//2017.3.10
// A类 存档接口
export function saveIncomeTaxPreA(post, formYear,quarter){
	return post('/v1/web/tax/saveIncomeTaxPreA',{'year':formYear,'quarter':quarter})
}
// A类 取消存档接口
export function cacelIncomeTaxPreA(post, formYear,quarter){
	return post('/v1/web/tax/cacelIncomeTaxPreA',{'year':formYear,'quarter':quarter})
}
// B类 存档接口
export function saveIncomeTaxPreB(post, formYear,quarter){
	return post('/v1/web/tax/saveIncomeTaxPreB',{'year':formYear,'quarter':quarter})
}
// B类 取消存档接口
export function cacelIncomeTaxPreB(post, formYear,quarter){
	return post('/v1/web/tax/cacelIncomeTaxPreB',{'year':formYear,'quarter':quarter})
}
// 小规模取得减免代码接口，包括减税、免税项目代码
export function getVatRPCode(post){
	return post('/v1/web/tax/getVatRPCode',{})
}
// 小规模取得减免代码接口，减税、免税代码分列为不同的对象
export function getVatRPCodeWithType(post){
	return post('/v1/web/tax/getVatRPCodeWithType', {})
}

//*****************一般纳税人增值税申报表接口START*********************
// 一般纳税人申报表初始化接口
export function initGeneral(post){
	return post('/v1/web/tax/vat/general/init')
}

// 一般纳税人增值税申报表单个表获取数据
// isReduce: 是否减税（减:1，免:0）
export function general(post, formYear, period, type, isYearMonChange){
	return post('/v1/web/tax/vat/general/calForm',{'year': formYear,'period': period,'type': type, 'isYearMonChange': isYearMonChange ? isYearMonChange : false})
}

// 批量更新一般纳税人增值税申报表
export function batchUpdateField(post, list){
	return post('/v1/web/tax/vat/general/batchUpdateField', list)
}

// 一般纳税人增值税申报表已申报接口
export function generalDeclare(post, taxForm){
	return post('/v1/web/tax/vat/general/declare', taxForm)
}

// 一般纳税人增值税申报表取消申报接口
export function generalCancelDeclare(post, taxForm){
	return post('/v1/web/tax/vat/general/cancelDeclare', taxForm)
}

// 一般纳税人增值税申报表重新计算接口
export function reCalcFormGeneral(post, year, period, type){
	return post('/v1/web/tax/vat/general/reCalcForm', { year, period, type })
}

// 一般纳税人增值税申报表打印
export function generalPrint(post, formYear, period){
	return post('/v1/web/tax/vat/general/print',{ formYear, period })
}

// 一般纳税人增值税申报表导出
export function generalDownload(post, formYear, period){
	return post('/v1/web/tax/vat/general/download',{ formYear, period })
}

// 一般纳税人增值税申报表获取期初数据
export function getInitData(post){
	return post('/v1/web/tax/vat/general/getInitData', {})
}

// 一般纳税人增值税申报表保存期初数据
export function saveInitData(post, list){
	return post('/v1/web/tax/vat/general/saveInitData', list)
}

// 一般纳税人增值税申报表期初录入模板下载
export function downloadTemplate(post){
	return post('/v1/web/tax/vat/general/downloadTemplate', {})
}

// 一般纳税人税负分析表获取相应项目代码的期初余额
export function getBeginBalance(post, formYear, period, value){
	return post('/v1/web/tax/vat/general/getBeginBalance', { 'year': formYear, 'period': period, 'value': value })
}

// 一般纳税人申报表分享功能
export function generalShare(post, year, period){
	return post('/v1/web/tax/vat/general/share', { year, period })
}

//小规模分享 发送分享邮件
export function generalSendShareMail(post, shareData) {
	return post('/v1/web/tax/vat/general/sendShareMail', shareData)
}
//*****************一般纳税人增值税申报表接口END***********************


/**
 * 保存数据接口
 * {
    "reportTypeId": 1, -- 小规模增值税 1；所得税A类预缴 2；一般纳税人增值税 3
    "yearBegin": 2017,
    "periodBegin": 1,
    "yearEnd": 2017,
    "periodEnd": 7
}
 */
export function saveReportData(post,list){
    return post('/v1/web/tax/saveReportData',list)
}

/**
 * 对比数据接口
 * {
    "reportTypeId": 1, -- 小规模增值税 1；所得税A类预缴 2；一般纳税人增值税 3
    "yearBegin": 2017,
    "periodBegin": 1,
    "yearEnd": 2017,
    "periodEnd": 7
}
 */
export function checkReportData(post,list){
    return post('/v1/web/tax/checkReportData',list)
}

//*****************城建等附加税申报表接口START***********************
//城建等附加税页面初始化接口
export function extraTaxInit(post,obj) {
	let paramObj = obj.history ? obj : {}
	return post('/v1/web/surtax/init', paramObj)
}

//城建等附加税查询接口
export function extraTaxQuery(post, year, period, isHistory) {
	let paramObj = isHistory ? { year, period, history: !!isHistory } : { year, period }
	return post('/v1/web/surtax/calFormForPeriod', paramObj)
}

//城建等附加税保存接口
export function extraTaxSave(post, list) {
	return post('/v1/web/surtax/batchUpdateField', list)
}

//城建等附加税分享接口
export function extraTaxShare(post, year, period, isHistory) {
	let paramObj = isHistory ? { year, period, history: !!isHistory } : { year, period }
	return post('/v1/web/surtax/share', paramObj)
}

//城建等附加税打印接口
export function extraTaxPrint(post, year, period, isHistory) {
	let paramObj = { year, period, history: !!isHistory }
	return post('/v1/web/surtax/print', paramObj)
}

//城建等附加税导出接口
export function extraTaxDownload(post, year, period, isHistory) {
	let paramObj = { year, period, history: !!isHistory }
	return post('/v1/web/surtax/download', paramObj)
}

//城建等附加税发送分享邮件接口
export function extraTaxSendShareMail(post, shareData) {
	return post('/v1/web/surtax/sendShareMail', shareData)
}


//新版附加税打印导出接口
/**
 * @api {POST} smallTax/printOrDownload printOrDownload
 * @apiVersion 1.0.0
 * @apiDescription 打印导出税表
 * @apiParam {Object} json json 
 * @apiParamExample {json} 请求示例
 * {
 *    "typeId":1,  --表类型id
 *    "tableId":1,  -- 表明细id
 *    "year":2017,
 *    "month":1,
 *    "quarter":1,
 *    "isPrint":0,  --  0:打印,1 : 导出
 *    "taxType":3  --打印税种类型    0印花税1工会经费2房产税 3附加税
 *    }
*/
export function newExtraTaxPrintAndDownload(post, list) {
    return post('/v1/smallTax/printOrDownload', list)
}

//城建等附加税申报接口
export function extraTaxDeclare(post, taxForm) {
	return post('/v1/web/surtax/declare', taxForm)
}

//城建等附加税取消申报接口
export function extraTaxCancelDeclare(post, taxForm) {
	return post('/v1/web/surtax/cancelDeclare', taxForm)
}

//*****************城建等附加税申报表接口END***********************

//*****************报表管理接口START***********************
/**
* @api {POST} taxTemplateJson/queryList queryList
* @apiParam {Object} json json 
* @apiParamExample {json} 请求示例
* {"typeName":"增值税纳税申报表","name":"主表1"}
* @apiSuccessExample {json} 返回结果
{
"result": true,
"value": { 
"list":[
   "id":1, --表id
   "name":"主表1", --表名称
   "description":"", --描述
   "dataJson":"{}", --json数据
   "tableTypeId":1, --表类型id
   "typeName":"增值税纳税申报表" --表类型名称
]}}*/
export function reportQueryList(post,list) {
	return post('/v1/taxTemplateJson/queryList',list)
}

/**
* @api {POST} taxTemplateJson/create create
* @apiParam {Object} json json 
* @apiParamExample {json} 请求示例
* {"typeName":"增值税纳税申报表","name":"主表1","dataJson":"{}"}
* @apiSuccessExample {json} 返回结果
{"result": true,"value": {}
*/
export function createReport(post, list) {
	return post('/v1/taxTemplateJson/create', list)
}

/**
* @api {POST} taxTemplateJson/update update
* @apiParam {Object} json json 
* @apiParamExample {json} 请求示例
* {
*    "id":1, --表id
*    "name":"主表1", --表名称
*    "dataJson":"{}", --表数据
*    "typeName":"增值税纳税申报表" --表类型名称
* }
*/
export function updateReport(post, list) {
	return post('/v1/taxTemplateJson/update', list)
}

/**
* @api {POST} taxTemplateJson/delete delete
* @apiParam {Object} json json 
* @apiParamExample {json} 请求示例
* {"id":1, --表id}
* @apiSuccessExample {json} 返回结果
*{"result": true,"value": true}
*/
export function deleteReport(post, list) {
	return post('/v1/taxTemplateJson/delete', list)
}

/**
* @api {POST} taxTemplateJson/queryTableNameAndData queryTableNameAndData
* @apiParam {Object} json json 
* @apiParamExample {json} 请求示例
* * {
*    "typeName":"增值税纳税申报表"
*    "name":"主表1"
*    }
* @apiSuccessExample {json} 返回结果
*{"result": true,"value": true}
*/

export function queryTableNameAndData(post, list) {
	return post('/v1/taxTemplateJson/queryTableNameAndData', list)
}

export function itsSync(post,list) {
	return post('/v1/taxIncomeSettlement/itsSync',list)
}
//*****************报表管理接口接口END***********************

//*****************全税种接口START***********************
/**
* @api {POST}  taxIncomeSettlement/calTaxIstForm
* @apiParam {Object} json json 
* @apiParamExample {json} 请求示例
* {
*    "typeId":1,  --表类型id
*    "tableId":1  -- 表明细id
*    }
* @apiSuccessExample {json} 返回结果
* {
	"result": true,
	"value": { 
		"tableDetail":{ --表明细
	    	"id":1, --表id
	    	"name":"主表1", --表名称
	    	"dataJson":""
		},
		"taxForm":{
	    	"formMap":{
	       		"r01c01":13.00,
	        	"r01c02":15.00
	    	}
	}
}*/
export function queryCalTaxIstForm(post, list) {
	return post('/v1/smallTax/calTaxIstForm', list)
}
//通用报表修改数据接口
export function batchUpdateFormField (post, list) {
	return post('/v1/smallTax/batchUpdateFormField', list)
}
//打印、导出
/*{"typeId":1,  --表类型id  "tableId":1,  -- 表明细id   "year":2017  --年度   "isPrint": 0为打印 1为导出 –打印or导出标志}*/
export function printOrDownload (post, list) {
	return post('/v1/smallTax/printOrDownload', list)
}

//分享
/*{"typeId":1,  --表类型id  "tableId":1,  -- 表明细id   "year":2017  --年度*/
export function shareReport (post, list) {
	return post('/v1/smallTax/share', list)
}

//邮件分享
/*{"typeId":1,  --表类型id  "tableId":1,  -- 表明细id   "year":2017  --年度  "recipient":"271496@qq.com"   --收件人   "sender":"1001@qq.com" --抄送人
 "content":"您好XXXXXXX"      --内容        "subject":"Test1801181410 2018.01-2018.01明细账"   --主题
*/
export function shareEmail (post, list) {
	return post('/v1/smallTax/shareEmail', list)
}
/**
 * 增值税查看小规模历史数据时获取凭证信息的接口
 */
export function findJournal(post,obj){
	return post('/v1/taxVatSmall/findJournal',obj)
}

//设置申报类型
/*{"declareType":1}
*/
export function setDeclareType (post, list) {
	return post('/v1/smallTax/setDeclareType', list)
}

//封存
/*{"typeId":1,  --表类型id  "tableId":1,  -- 表明细id   "year":2017  --年度*/
export function taxReportDeclare (post, list) {
	return post('/v1/smallTax/declare', list)
}

//取消封存
/*{"typeId":1,  --表类型id  "tableId":1,  -- 表明细id   "year":2017  --年度*/
export function taxReportCancelDeclare (post, list) {
	return post('/v1/smallTax/cancelDeclare', list)
}

//工会经费参数查询
export function queryInformation(post, list) {
	return post('/v1/smallTax/queryInformation', list )
}

//工会经费参数修改
export function updateInformation(post, list) {
	return post('/v1/smallTax/updateInformation', list )
}
//*****************全税种接口END***********************

//*****************所得税预缴2018新表接口START***********************
//查询接口
export function taxIncomeSettlementQuery(post, list) {
    // return post('/v1/taxIncomeSettlement/calTaxIstForm', list)
    return post('/v1/smallTax/corporateIncomeTax', list)
}
//保存接口
export function updateTaxIncomeSettlement(post, list) {
	return post('/v1/taxIncomeSettlement/batchUpdateFormField', list)
}

//初始化数据查询接口
export function initIncomeQuery(post, {}) {
	return post('/v1/taxIncomeSettlement/initIncomeQuery', {})
}
//初始化数据保存接口
export function initIncomeSave(post, list) {
	return post('/v1/taxIncomeSettlement/initIncomeSave', list)
}

//打印导出接口
export function taxIncomePrintOrDownload(post, list) {
	return post('/v1/income/printOrDownload', list)
}
//分享接口
export function taxIncomeShare(post, list) {
	return post('/v1/income/share', list)
}
//邮件分享接口
export function taxIncomeShareEmail(post, list) {
	return post('/v1/income/shareEmail', list)
}

//*****************所得税预缴2018新表接口END***********************

//*****************合伙人税表接口***********************
/**
 * 合伙人查询接口名称
 * @param post
 * @returns {*}
 */
export function getPartnerList(post, option){
    return post('/v1/lfTax/getPartnerList', option)
}

/**
 * 个税列表数据查询
 * @param post
 * @param tableId{1}
 * @param typeId{14}
 * @param year
 * @param beginMonth
 * @param endMonth
 * @param partnerId
 * @returns {*}
 */
export function getCalTaxIstForm(post, option){
    return post('/v1/taxIncomeSettlement/calTaxIstForm', option)
}

/**
 * 合伙人打印导出接口
 * @param post
 * @returns {*}
 */
export function lfTaxDownload(post, option){
    return post('/v1/lfTax/printOrDownload', option)
}

/**
 * 邮件分享
 * @param post
 * @returns {*}
 */
export function lfTaxShareEmail(post, option){
    return post('/v1/lfTax/shareEmail', option)
}

/**
 * 二维码分享
 * @param post
 * @returns {*}
 */
export function lfTaxShare(post, option){
    return post('/v1/lfTax/share', option)
}

/**
 * 检查是否封存接口
 * @param post
 * @returns {*}
 */
export function lfCheckFormIsSave(post, option){
    return post('/v1/lfTax/checkFormIsSave', option)
}

/**
 * 封存（申报）接口
 * @param post
 * @returns {*}
 */
export function lfSaveForm(post, option){
    return post('/v1/lfTax/saveForm', option)
}
/**
 * 取消（申报）接口
 * @param post
 * @returns {*}
 */
export function lfCacelSaveForm(post, option){
    return post('/v1/lfTax/cacelSaveForm', option)
}

/**
 * 个税保存接口
 * @param post
 * @returns {*}
 */
export function lfUpdate(post, option){
    return post('/v1/taxIncomeSettlement/batchUpdateFormField', option)
}
