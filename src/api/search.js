/**
 * 关键字列表调用接口
 * @param  {[type]} post       [description]
 * @param  {[type]} params [description]
 * @return {[type]}            [description]
 */
export function getAllManualKeys(post,params){
	return post("v1/search/manualKey/getAllManualKeys", params)
}

/**
 * 关键字编辑接口
 * @param  {[type]} post       [description]
 * @param  {[type]} params [description]
 * @return {[type]}            [description]
 */
export function update(post,params){
	return post("v1/search/manualKey/update", params)
}

/**
 * 关键字刷新接口
 * @param  {[type]} post       [description]
 * @param  {[type]} params [description]
 * @return {[type]}            [description]
 */
export function refresh(post,params){
	return post("v1/search/manualKey/refresh", params)
}

/**
 * 关键字查询接口
 * @param  {[type]} post       [description]
 * @param  {[type]} params [description]
 * @return {[type]}            [description]
 */
export function searchBusiness(post,key){
	return post("v1/search/searchBusiness", {key})
}
/**
 * 推荐关键字清空接口
 * @param  {[type]} post       [description]
 * @param  {[type]} params [description]
 * @return {[type]}            [description]
 */
export function clearExtKeys(post,params){
	return post("v1/search/manualKey/clearExtKeys", params)
}
