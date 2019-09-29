/**
 *     currency币种接口
 *
 * 币种的新增
 * @param  {[type]} post       [description]
 * @param  {[type]} list:{'orgId','code','name','exchangeRate','status'} [description]
 * @return {[type]}            [description]
 */
export function currencyCreate(post,list){
	return post("v1/currency/create", list)
}

export function checkDate(post,list){
	return post("v1/bankAccount/checkDate", list)
}
/**
 * 币种的删除
 * @param  {[type]} post       [description]
 * @param  {[type]} list:{'orgId','id'} [description]
 * @return {[type]}            [description]
 */
export function currencyDelete(post,list){
	return post("v1/currency/delete", list)
}
/**
 * 轮询接口
 * @param  {[type]} post       [description]
 * @param  {[type]} list:{'orgId','id'} [description]
 * @return {[type]}            [description]
 */
export function queryPayStatus(post,list){
	return post("v1/order/queryPayStatus", list)
}

/**
 * 取得支付二维码接口
 * @param  {[type]} post       [description]
 * @param  {[type]} list:{'orgId','id','name'} [description]
 * @return {[type]}            [description]
 */
export function getPayCode(post,list){
	return post("v1/order/getPayCode", list)
}
/**
 * 币种的修改
 * @param  {[type]} post       [description]
 * @param  {[type]} list:{'orgId','id','code','name','exchangeRate','status'} [description]
 * @return {[type]}            [description]
 */
export function currencyUpdate(post,list){
	return post("v1/currency/update", list)
}

/**
 * 币种的列表查询
 * @param  {[type]} post       [description]
 * @param  {[type]} list [description]
 * @return {[type]}            [description]
 */
export function currencyQuery(post,list){
	return post("v1/currency/query", list)
}

/**
 * 币种的单条记录查询
 * @param  {[type]} post       [description]
 * @param  {[type]} list [description]
 * @return {[type]}            [description]
 */
export function currencyGetById(post,list){
	return post("v1/currency/getById",list)
}

/**
 *     summary  摘要接口
 *
 * 摘要的新增
 * @param  {[type]} post       [description]
 * @param  {[type]} list:{'orgId','code','name'} [description]
 * @return {[type]}            [description]
 */
export function summaryCreate(post,list){
	return post("v1/summary/create", list)
}

/**
 * 摘要的删除
 * @param  {[type]} post       [description]
 * @param  {[type]} list:{'orgId','id'} [description]
 * @return {[type]}            [description]
 */
export function summaryDelete(post,list){
	return post("v1/summary/delete", list)
}

/**
 * 摘要的修改
 * @param  {[type]} post       [description]
 * @param  {[type]} list:{'orgId','id','name'} [description]
 * @return {[type]}            [description]
 */
export function summaryUpdate(post,list){
	return post("v1/summary/update", list)
}

/**
 * 摘要的列表查询
 * @param  {[type]} post       [description]
 * @param  {[type]} list [description]
 * @return {[type]}            [description]
 */
export function summaryQuery(post,list){
	return post("v1/summary/query", list)
}

/**
 * 摘要的单条记录查询
 * @param  {[type]} post       [description]
 * @param  {[type]} list [description]
 * @return {[type]}            [description]
 */
export function summaryGetById(post,list){
	return post("v1/summary/getById",list)
}

/**
 *     unit  计量单位接口
 *
 * 计量单位的新增
 * @param  {[type]} post       [description]
 * @param  {[type]} list:{'orgId','code','name'} [description]
 * @return {[type]}            [description]
 */
export function unitCreate(post,list){
	return post("v1/unit/create", list)
}

/**
 * 计量单位的删除
 * @param  {[type]} post       [description]
 * @param  {[type]} list:{'orgId','id'} [description]
 * @return {[type]}            [description]
 */
export function unitDelete(post,list){
	return post("v1/unit/delete", list)
}

/**
 * 计量单位的修改
 * @param  {[type]} post       [description]
 * @param  {[type]} list:{'orgId','id','code','name'} [description]
 * @return {[type]}            [description]
 */
export function unitUpdate(post,list){
	return post("v1/unit/update", list)
}

/**
 * 计量单位的列表查询
 * @param  {[type]} post       [description]
 * @param  {[type]} list:{'orgId'} [description]
 * @return {[type]}            [description]
 */
export function unitQuery(post,list){
	return post("v1/unit/query", list)
}

/**
 * 辅助核算动态列表查询
 * @param  {[type]} post       [description]
 * @param  {[type]} list [description]
 * @return {[type]}            [description]
 */
export function auxDictQuery(post,list){
	return post("v1/account/queryAuxDict", list)
}

/**
 * 计量单位的单条记录查询
 * @param  {[type]} post       [description]
 * @param  {[type]} list [description]
 * @return {[type]}            [description]
 */
export function unitGetById(post,list){
	return post("v1/unit/getById",list)
}

/**
 *     customerArchive  客户接口
 *
 * 客户的新增
 * @param  {[type]} post       [description]
 * @param  {[type]} list:{'code','name','status'} [description]
 * @return {[type]}            [description]
 */
export function consumerCreate(post,list){
	return post("v1/customerArchive/create", list)
}

/**
 * 客户的删除
 * @param  {[type]} post       [description]
 * @param  {[type]} list:{'id'} [description]
 * @return {[type]}            [description]
 */
export function consumerDelete(post,list){
	return post("v1/customerArchive/delete", list)
}

/**
 * 客户的修改
 * @param  {[type]} post       [description]
 * @param  {[type]} list:{'id','code','name','status'} [description]
 * @return {[type]}            [description]
 */
export function consumerUpdate(post,list){
	return post("v1/customerArchive/update", list)
}

/**
 * 客户的列表查询
 * @param  {[type]} post       [description]
 * @param  {[type]} list [description]
 * @return {[type]}            [description]
 */
export function consumerQuery(post,list){
	return post("v1/customerArchive/query", list)
}

/**
 * 客户的单条记录查询
 * @param  {[type]} post       [description]
 * @param  {[type]} list:{'id'} [description]
 * @return {[type]}            [description]
 */
export function consumerGetById(post,list){
	return post("v1/customerArchive/getById",list)
}

/**
 *     vendor  供应商接口
 *
 * 供应商的新增
 * @param  {[type]} post       [description]
 * @param  {[type]} list:{'code','name','status'} [description]
 * @return {[type]}            [description]
 */
export function vendorCreate(post,list){
	return post("v1/vendor/create", list)
}

/**
 * 供应商的删除
 * @param  {[type]} post       [description]
 * @param  {[type]} list:{'id'} [description]
 * @return {[type]}            [description]
 */
export function vendorDelete(post,list){
	return post("v1/vendor/delete", list)
}

/**
 * 供应商的修改
 * @param  {[type]} post       [description]
 * @param  {[type]} list:{'id','code','name','status'} [description]
 * @return {[type]}            [description]
 */
export function vendorUpdate(post,list){
	return post("v1/vendor/update", list)
}

/**
 * 供应商的列表查询
 * @param  {[type]} post       [description]
 * @param  {[type]} list [description]
 * @return {[type]}            [description]
 */
export function vendorQuery(post,list){
	return post("v1/vendor/query", list)
}

/**
 * 供应商的单条记录查询
 * @param  {[type]} post       [description]
 * @param  {[type]} list:{'id'} [description]
 * @return {[type]}            [description]
 */
export function vendorGetById(post,list){
	return post("v1/vendor/getById",list)
}

/**
 *     inventory  存货接口
 *
 * 存货的新增
 * @param  {[type]} post       [description]
 * @param  {[type]} list:{'code','name','specification','unitId','status'} [description]
 * @return {[type]}            [description]
 */
export function inventoryCreate(post,list){
	return post("v1/inventory/create", list)
}

/**
 * 存货的删除
 * @param  {[type]} post       [description]
 * @param  {[type]} list:{'id'} [description]
 * @return {[type]}            [description]
 */
export function inventoryDelete(post,list){
	return post("v1/inventory/delete", list)
}

/**
 * 存货的修改
 * @param  {[type]} post       [description]
 * @param  {[type]} list:{'id','code','name','specification','unitId','status'} [description]
 * @return {[type]}            [description]
 */
export function inventoryUpdate(post,list){
	return post("v1/inventory/update", list)
}

/**
 * 存货的列表查询
 * @param  {[type]} post       [description]
 * @param  {[type]} list [description]
 * @return {[type]}            [description]
 */
export function inventoryProperty(post,list){
	return post("v1/inventoryProperty/query", list)
}

/**
 * 存货的属性查询
 * @param  {[type]} post       [description]
 * @param  {[type]} list [description]
 * @return {[type]}            [description]
 */
export function inventoryQuery(post,list){
	return post("v1/inventory/query", list)
}

/**
 * 存货的单条记录查询
 * @param  {[type]} post       [description]
 * @param  {[type]} list:{'id'} [description]
 * @return {[type]}            [description]
 */
export function inventoryGetById(post,list){
	return post("v1/inventory/getById",list)
}

/**
 *     project  项目接口
 *
 * 项目的新增
 * @param  {[type]} post       [description]
 * @param  {[type]} list:{'code','name','status'} [description]
 * @return {[type]}            [description]
 */
export function projectCreate(post,list){
	return post("v1/project/create", list)
}

/**
 * 项目的删除
 * @param  {[type]} post       [description]
 * @param  {[type]} list:{'id'} [description]
 * @return {[type]}            [description]
 */
export function projectDelete(post,list){
	return post("v1/project/delete", list)
}

/**
 * 项目的修改
 * @param  {[type]} post       [description]
 * @param  {[type]} list:{'id','code','name','status'} [description]
 * @return {[type]}            [description]
 */
export function projectUpdate(post,list){
	return post("v1/project/update", list)
}

/**
 * 项目的列表查询
 * @param  {[type]} post       [description]
 * @param  {[type]} list [description]
 * @return {[type]}            [description]
 */
export function projectQuery(post,list){
	return post("v1/project/query", list)
}

/**
 * 案件 主办律师查询
 * @param  {[type]} post       [description]
 * @param  {[type]} list [description]
 * @return {[type]}            [description]
 */
export function getLawyeSetPersons(post){
	return post("v1/person/getLawyeSetPersons", {})
}

/**
 * 项目的单条记录查询
 * @param  {[type]} post       [description]
 * @param  {[type]} list:{'id'} [description]
 * @return {[type]}            [description]
 */
export function projectGetById(post,list){
	return post("v1/project/getById",list)
}

/**
 *     bankAccount  账号接口
 *
 * 账号的新增
 * @param  {[type]} post       [description]
 * @param  {[type]} list:{'code',name','bankAccountTypeId','bankName','isDefault','status'} [description]
 * @return {[type]}            [description]
 */
export function bankAccountCreate(post,list){
	return post("v1/bankAccount/create", list)
}

/**
 * 账号的删除
 * @param  {[type]} post       [description]
 * @param  {[type]} list:{'orgId','id'} [description]
 * @return {[type]}            [description]
 */
export function bankAccountDelete(post,list){
	return post("v1/bankAccount/delete", list)
}

/**
 * 账号的修改
 * @param  {[type]} post       [description]
 * @param  {[type]} list:{'id','code','name','bankAccountTypeId','bankName','isDefault','status'} [description]
 * @return {[type]}            [description]
 */
export function bankAccountUpdate(post,list){
	return post("v1/bankAccount/update", list)
}

/**
 * 账号的列表查询
 * @param  {[type]} post       [description]
 * @param  {[type]} list [description]
 * @return {[type]}            [description]
 */
export function bankAccountQuery(post,list){
	return post("v1/bankAccount/query", list)
}

/**
 * 餐饮业行业基础设置 账号的列表查询
 * @param  {[type]} post       [description]
 * @param  {[type]} list [description]
 * @return {[type]}            [description]
 */
export function queryBankAccountByType(post,list){
	return post("v1/bankAccount/queryBankAccountByType", list)
}

/**
 * 账号的单条记录查询
 * @param  {[type]} post       [description]
 * @param  {[type]} list [description]
 * @return {[type]}            [description]
 */
export function bankAccountGetById(post,list){
	return post("v1/bankAccount/getById",list)
}

/**
 * 基础档案查询
 * 部门、人员、客户、供应商、存货、项目、银行账号、币种
 * @param  {[type]} post       [description]
 * @param  {[type]} list [description]
 * @return {[type]}            [description]
 */
export function baseArchiveQuery(post, objParam){
	return post("/v1/baseArchive/query", objParam)
}
/**
 * 查询财务辅助账查询基础档案
 * 部门、人员、客户、供应商、存货、项目、银行账号、币种
 * @param  {[type]} post       [description]
 * @param  {[type]} list:{'isContentEmpty','notNeedPage','status','isContentCash'} [description]
 * "isContentEmpty": false,  -- 是否包含预置的空数据，在查询账表、凭证中使用时应设置为true
 * "notNeedPage": true,  -- 不需要分页，如需分页则可以不传或给false
 * "status": true,  -- 状态：1启用/0停用
 * "isContentCash": true,  -- 是否包含现金：默认不包含，如需要则传参并赋值为true
 * @return {[type]}            [description]
 */
export function queryFiBaseArchives(post, objParam){
	return post("/v1/baseArchive/queryFiBaseArchives", objParam)
}
/**
 * 基础档案自动创建编码
 * 部门、人员、客户、供应商、存货、项目、银行账号、币种
 * @param  {[type]} post       [description]
 * @param  {[type]} customer/supplier/project/inventory/bankAccount/unit/currency 请注意不是对象，只是一个字符串  [description]
 * @return {[type]}            [description]
 */
export function getAutoCode(post, string){
	return post("/v1/baseArchive/getAutoCode", string)
}
/*校验投资人*/
export function checkInvestorCode(post,list){
	return post("/v1/inventory/checkInvestorCode", list)
}
/*投资人和被投资人自动创建编码*/
export function getInvestorCode(post,list){
	return post("/v1/inventory/getInvestorCode", list)
}
/*流水帐创建投资人*/
export function createByInvestor(post,list){
	return post("/v1/account/createByInvestor", list)
}
/*查询投资人列表*/
export function investorQuery(post,option={mtype:1}) {
	return post('/v1/inventory/queryInvestorCode',option)
}
/*查询投资人或被投资人信息*/
export function queryInvestor(post,list) {
	return post('/v1/inventory/queryInvestor',list)
}
/*查询投资人或被投资人信息*/
export function queryInvestorCodeList(post,list) {
	return post('/v1/inventory/queryInvestorCodeList',list)
}
export function findUseableInvestors(post, option) {
	return post('/v1/account/findUseableInvestors', option)
}
/*
inventoryBusiness/queryBusiness 查询所有的流水业务 餐饮业
*/
export function queryBusiness(post) {
	return post('/v1/inventoryBusiness/queryBusiness')
}

/*
inventoryBusiness/queryBusiness 查询所有的流水业务 餐饮业
*/
export function queryCode(post,name) {
	return post('/v1/inventoryBusiness/queryCode',name)
}

/**
 * 收入支持业务明细档案-查询
 * @param {*} post 
 * @param {*} obj 
 */
export function businessDetailQuery(post,obj){
	return post('/v1/businessDetail/query',obj)
}
/**
 * 收入支持业务明细档案-新增
 * @param {*} post 
 * @param {*} obj 
 */
export function businessDetailInsert(post, obj) {
	return post('/v1/businessDetail/insert', obj)
}
/**
 * 收入支持业务明细档案-修改
 * @param {*} post 
 * @param {*} obj 
 */
export function businessDetailUpdate(post, obj) {
	return post('/v1/businessDetail/update', obj)
}
/**
 * 收入支持业务明细档案-删除
 * @param {*} post 
 * @param {*} obj 
 */
export function businessDetailDelete(post, obj) {
	return post('/v1/businessDetail/delete', obj)
}
/**
 * 收入支持业务明细档案-所属业务分类下拉数据查询
 * @param {*} post 
 */
export function queryBusinessType(post){
	return post('/v1/businessDetail/queryBusinessType',{})
}
/**
 * 提报费用档案-查询
 * @param {*} post 
 * @param {*} obj 
 */
export function tbFeeQuery(post,obj){
	return post('/v1/tbFee/query',obj)
}
/**
 * 提报费用档案-新增
 * @param {*} post 
 * @param {*} obj 
 */
export function tbFeeInsert(post,obj){
	return post('/v1/tbFee/insert',obj)
}
/**
 * 提报费用档案-更新
 * @param {*} post 
 * @param {*} obj 
 */
export function tbFeeUpdate(post,obj){
	return post('/v1/tbFee/update',obj)
}
/**
 * 提报费用档案-删除
 * @param {*} post 
 * @param {*} obj 
 */
export function tbFeeDelete(post,obj){
	return post('/v1/tbFee/delete',obj)
}


/**
 * 基础档案 客户导出模板
 * @param {*} post 
 * @param {*} obj 
 */
export function exportTemplateExcel(post){
	return post('/v1/customerArchive/exportTemplateExcel',{})
}

/**
 * 基础档案 供应商导出模板
 * @param {*} post 
 * @param {*} obj 
 */
export function vendorExportTemplateExcel(post){
	return post('/v1/vendor/exportTemplateExcel',{})
}

/**
 * 基础档案 存货导出模板
 * @param {*} post 
 * @param {*} obj 
 */
export function inventoryExportTemplateExcel(post){
	return post('/v1/inventory/exportTemplateExcel',{})
}

/**
 * 基础档案 案件导出模板
 * @param {*} post 
 * @param {*} obj 
 */
export function projectExportTemplateExcel(post){
	return post('/v1/project/exportCaseTemplateExcel',{})
}

/**
 * 基础档案 项目导出模板
 * @param {*} post 
 * @param {*} obj 
 */
export function projectExportProjectTemplateExcel(post){
	return post('/v1/project/exportProjectTemplateExcel',{})
}

/**
 * 基础档案 供应商导入
 * @param {*} post 
 * @param {*} obj 
 */
export function importVendorDataFile(post){
	return post('/v1/vendor/importVendorDataFile',{})
}

/**
 * 基础档案 客户导入
 * @param {*} post 
 * @param {*} obj 
 */
export function importCustomerDataFile(post){
	return post('/v1/customerArchive/importCustomerDataFile',{})
}

