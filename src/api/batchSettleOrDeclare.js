/**
 *     batchSettleAccounts 批量结账接口
 *
 * 列表查询
 * @param  {[type]} post       [description]
 * @param  {[type]} list [description]
 * @return {[type]}            [description]
 */
export function queryList(post,list){
	return post("v1/web/dz/settle/queryList", list)
}

/**
 * 结账
 * @param  {[type]} post       [description]
 * @param  {[type]} list [description]
 * @return {[type]}            [description]
 */
export function batchSettleAccounts(post,list){
	return post("v1/web/dz/settle/batchSettleAccounts", list)
}

/**
 * 反结账
 * @param  {[type]} post       [description]
 * @param  {[type]} list [description]
 * @return {[type]}            [description]
 */
export function antiSettlement(post,list){
	return post("v1/web/dz/settle/antiSettlement", list)
}

/**
 * 批量反结账
 * @param  {[type]} post       [description]
 * @param  {[type]} list [description]
 * @return {[type]}            [description]
 */
export function batchAntiSettlement(post,list){
	return post("v1/web/dz/settle/batchAntiSettlement", list)
}

/**
 * 查询初始化客户列表
 * @param  {[type]} post       [description]
 * @param  {[type]} list [description]
 * @return {[type]}            [description]
 */
export function queryInitList(post,list){
	return post("v1/web/dz/init/queryInitList", list)
}

/**
 * 下载易嘉人期初余额通用模板
 * @param  {[type]} post       [description]
 * @param  {[type]} list [description]
 * @return {[type]}            [description]
 */
export function exportTemplate(post,list){
	return post("v1/web/dz/init/exportTemplate", list)
}
/**
 *     batchDeclaration 批量申报接口
 *
 * 列表查询
 * @param  {[type]} post       [description]
 * @param  {[type]} list [description]
 * @return {[type]}            [description]
 */
export function getCustomerList(post, list){
	return post("v1/web/dz/batchDeclaration/getCustomerList", list)
}

/**
 * 批量申报
 * @param  {[type]} post       [description]
 * @param  {[type]} list [description]
 * @return {[type]}            [description]
 */
export function declaration(post,list){
	return post("v1/web/dz/batchDeclaration/declaration", list)
}

/**
 * 批量申报重新计算
 * @param  {[type]} post       [description]
 * @param  {[type]} list [description]
 * @return {[type]}            [description]
 */
export function resetConfirmTaxAmount(post,list){
	return post("v1/web/dz/taxNotice/resetConfirmTaxAmount", list)
}

/**
 * 查询税种
 * @param  {[type]} post       [description]
 * @param  {[type]} list [description]
 * @return {[type]}            [description]
 */
export function findTaxCategory(post,list){
	return post("v1/web/dz/batchDeclaration/findTaxCategory",list)
}