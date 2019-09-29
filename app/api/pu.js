// 销售单 -------------
//  初始化  传一个 销售类型 的json 对象
export function init(post,params){
	return post("/v1/sa/delivery/init", params)
}

export function queryById(post,id){
	return post("/v1/sa/delivery/queryById", {id})
}




// 查询客户欠款、预收款及客户名下商品及服务, 传  （ 客户id 、客户组织号 ）
export function queryByCustomer(post,params){
	return post("/v1/sa/delivery/queryByCustomer", params)
}

// 商品或服务名称 点击发送请求 ，传   （ json 里面 4个对象 ）
export function CommodityAndServiceQuery(post,list){
	return post("/v1/inventory/query", list)
}

//销售单列表 -----------------------------------------
/**
 * 通过日期获取销售单 列表,初始化数据
 * @param  {[type]} post [description]
 * @param  {[type]} date [description]
 * @return {[type]}      [description]
 */
export function getSaleInitData(post, list) {
	return post("/v1/sa/delivery/queryList", list)
}

// 销售单 查询按钮，发送 开始 和 结束时间
export function puListEvent(post, list) {
	return post("/v1/sa/delivery/queryList", list)
}
// 保存 
export function create(post, list) {
	return post("/v1/sa/delivery/create", list)
}

export function update(post, list) {
	return post("/v1/sa/delivery/update", list)
}
// 更多 （删除）
export function del(post, params){
	return post("/v1/sa/delivery/delete",params)
}
// 审核
export function audit(post, params){
	return post("/v1/sa/delivery/auditDelivery",params)
}


// 打印
export function print(post,list){
    return post('/v1/sa/delivery/printDelivery',list)
}
//销售单 下一张
export function next(post,code){
	return post('/v1/sa/delivery/nextDelivery',{code})
}
//销售单 上一张
export function prev(post,code){
	return post('/v1/sa/delivery/previousDelivery',{code})
}


// 销售单列表-================
// 批量审核
export function deliveryAuditBatch(post, list){
	return post('/v1/sa/delivery/auditBatch',list)
}
// 打印
export function deliveryPrintDeliveryList(post, list){
	return post('/v1/sa/delivery/printDeliveryList',list)
}
// 导出
export function puListExportDeliveryList(post, list){
	return post('/v1/sa/delivery/exportDeliveryList',list)
}
// 反审核
export function unAudit(post,params){
	return post('/v1/sa/delivery/unAudit',params)
}

// 批量删除
export function deleteBatch(post,params){
	return post('/v1/sa/delivery/deleteBatch',params)
}

// 附件在销售单保存但未审核的状态下的新增和删除接口
export function enclosurecreatebatch(post, idList) {
	return post('/v1/sa/delivery/enclosurecreatebatch', idList)
}
export function enclosuredeletebatch(post, idList) {
	return post('/v1/sa/delivery/enclosuredeletebatch', idList)
}





















