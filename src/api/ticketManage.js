/*
    票据上传查询列表接口
*/
export function query(post, params){
	return post("/v1/invoice/query", params)
}

/*
    票据上传新建接口
*/
export function insert(post, params){
	return post("/v1/invoice/insert", params)
}

/*
    票据上传单条废弃接口
*/
export function discard(post, params){
	return post("/v1/invoice/discard", params)
}

/*
    票据上传明细删除接口
*/
export function removeListDetail(post, params){
	return post("/v1/invoice/removeListDetail", params)
}


/*
    票据上传批次删除接口
*/
export function removeList(post, params){
	return post("/v1/invoice/removeList", params)
}

/*
    票据上传单条查询接口
*/
export function queryDetail(post, params){
	return post("/v1/invoice/queryDetail", params)
}

/*
    票据审核列表查询接口
*/
export function queryAudit(post, params){
	return post("/v1/invoice/queryAudit", params)
}

/*
    票据审核单条查询接口
*/
export function queryAuditDetail(post, params){
	return post("/v1/invoice/queryAuditDetail", params)
}

/*
    票据审核通过接口
*/
export function passAudit(post, params){
	return post("/v1/invoice/passAudit", params)
}

/*
    票据审核批次通过接口
*/
export function passAuditList(post, params){
	return post("/v1/invoice/passAuditList", params)
}

/*
    票据审核批次previous接口
*/
export function previousAudit(post, params){
	return post("/v1/invoice/previousAudit", params)
}


/*
    票据审核批次next接口
*/
export function nextAudit(post, params){
	return post("/v1/invoice/nextAudit", params)
}

/*
    票据整理列表查询接口
*/
export function querySort(post, params){
	return post("/v1/invoice/querySort", params)
}

/*
    票据整理单条查询接口
*/
export function querySortDetail(post, params){
	return post("/v1/invoice/querySortDetail", params)
}

/*
    票据整理通过接口
*/
export function passSort(post, params){
	return post("/v1/invoice/passSort", params)
}

/*
    票据整理批次通过接口
*/
export function passSortList(post, params){
	return post("/v1/invoice/passSortList", params)
}

/*
    票据整理批次取消通过接口
*/
export function cancelPassSortList(post, params){
	return post("/v1/invoice/cancelPassSortList", params)
}

/*
    票据整理批次previous接口
*/
export function previousSort(post, params){
	return post("/v1/invoice/previousSort", params)
}


/*
    票据整理批次next接口
*/
export function nextSort(post, params){
	return post("/v1/invoice/nextSort", params)
}

/*
    票据驳回接口
*/
export function rejectAudit(post, params){
	return post("/v1/invoice/rejectAudit", params)
}

/*
    票据驳回接口 审核
*/
export function rejectDetailAudit(post, params){
	return post("/v1/invoice/rejectDetailAudit", params)
}

/*

/*
    票据驳回接口 整理
*/
export function rejectDetailSort(post, params){
	return post("/v1/invoice/rejectDetailSort", params)
}

/*
    票据查询认证接口
*/
export function queryQualification(post, params){
	return post("/v1/invoice/queryQualification", params)
}

/*
    票据查询结算接口
*/
export function querySettle(post, params){
	return post("/v1/invoice/querySettle", params)
}

/*
    票据认证操作接口
*/
export function setQualification(post, params){
	return post("/v1/invoice/setQualification", params)
}

/*
    票据结算操作接口
*/
export function setSettle(post, params){
	return post("/v1/invoice/setSettle", params)
}

/*
    票据生成流水接口
*/
export function generateReceipt(post, params){
	return post("/v1/invoice/generateReceipt", params)
}

/*
    业务类型模糊搜索
*/
export function queryBusinessType(post, params){
	return post("/v1/invoice/queryBusinessType", params)
}
