//收款单、列表相关接口
export function getDataByCustomer(post, customerId) {
	return post('/v1/arap/receive/getdatabycustomer', { 'customerId': customerId })
}

/**
 * 创建收款单
 * @param  {[type]} post [description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export function create(post, data) {
	return post("/v1/arap/receive/create", data)
}
/**
 * 删除收款单
 * @param  {[type]} post [description]
 * @param  {[type]} id   [description]
 * @param  {[type]} ts   [description]
 * @return {[type]}      [description]
 */
export function del(post, id, ts) {
	return post("/v1/arap/receive/delete", { 'id': id, 'ts': ts })
}
/**
 * 审核收款单
 * @param  {[type]} post [description]
 * @param  {[type]} id   [description]
 * @param  {[type]} ts   [description]
 * @return {[type]}      [description]
 */
export function audit(post,id,ts){
	return post("/v1/arap/receive/audit", { 'id': id, 'ts': ts })
}
/**
 * 收款单打印
 */
export function print(post, id) {
	return post('/v1/arap/receive/print', {id})
}
/**
 * 收款查询接口
 * @param {[type]} id
 * @param {[type]} orgId
 * @param {[type]} code
 */

export function query(post, id, orgId, code) {
	return post('/v1/arap/receive/query', { 'id': id, 'orgId': orgId, 'code': code })
}

/**
 * 收款查询列表
 * @param {[type]} beginDate
 * @param {[type]} endDate
 * @param {[type]} customerId
 * @param {[type]} page
 */

export function list(post, params) {
	return post('/v1/arap/receive/list', params)
}
// init
export function init(post) {
	return post('/v1/arap/receive/list/init')
}


/**
* 收款单列表打印
*/
export function listprint(post, json) {
	return post('/v1/arap/receive/list/print', json)
}

/**
* 收款单列表导出
*/
export function listexport(post, json) {
	return post('/v1/arap/receive/list/export', json)
}

/**
 * 通过id获取收款单
 * @param  {[type]} post [description]
 * @param  {[type]} id   [description]
 * @return {[type]}      [description]
 */
export function queryById(post, id) {
	return post("/v1/arap/receive/query/id", {id})
}


/**
 * 上一页
 * @param  {[type]}
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
export function prev(post,code){
	return post('v1/arap/receive/previous',{code})
}

/**
 * 下一页
 * @param  {[type]}
 * @param  {[type]}
 * @param  {[type]}
 * @return {Function}
 */
export function next(post, code){
	return post('v1/arap/receive/next',{code})
}


// 反审核
export function unaudit(post, id, ts){
	return post('/v1/arap/receive/unaudit',{id,ts})
}

// 批量审核
export function auditbatch(post, obj){
	return post('/v1/arap/receive/auditbatch',obj)
}
// 批量删除
export function deletebatch(post, obj){
	return post('/v1/arap/receive/deletebatch',obj)
}



















