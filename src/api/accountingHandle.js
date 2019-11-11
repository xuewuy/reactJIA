/*
	初始化会计处理问题
*/
export function init(post){
	return post("/v1/web/accountingProcess/init")
}
/*
	获取是否有请会计处理问题新增权限
*/
export function hasAddAuth(post){
	return post("/v1/accountingProcess/hasAddAuth")
}
/*
	创建待处理问题
*/
export function create(post, params) {
	return post("/v1/accountingProcess/create", params)
}
/*
	删除会计处理问题
*/
export function del(post, params){
	return post("/v1/accountingProcess/delete", params)
}

/*
	批量删除会计处理问题
*/
export function deleteBatch(post, params){
	return post("/v1/accountingProcess/deleteBatch", params)
}
/*
	获取会计处理问题列表
*/
export function queryList(post, params) {
	return post("/v1/accountingProcess/queryList", params)
}
/*
	更新会计处理问题
*/
export function update(post,params){
	return post("/v1/accountingProcess/update", params)
}
/*
	根据问题ID获取会计处理问题对象
*/
export function queryById(post,params){
	return post("/v1/accountingProcess/queryById", params)
}
/*
	会计开始处理，更新问题状态
*/
export function process(post,params){
	return post("/v1/accountingProcess/process", params)
}
/*
	填写会计处理意见完成处理请会计处理问题
*/
export function processWithSuggestion(post,params){
	return post("/v1/accountingProcess/processWithSuggestion", params)
}
/*
	填制凭证、流水明细信息完成处理请会计处理问题
*/
export function processWithDoc(post,params){
	return post("/v1/accountingProcess/processWithDoc", params)
}
/*
*代账会计在代账公司，请会计处理问题列表查询@author gaoxue
*/
export function queryList4Acting(post, list) {
	return post("/v1/accountingProcess/queryList4Acting", list)
}
/*
	提交请会计处理问题
*/
export function submit(post,params){
	return post("/v1/accountingProcess/submit",params)
}
/*
	批量新增请会计处理问题附件信息 @author gaoxue
*/
export function enclosurecreatebatch(post,list){
	return post("/v1/accountingProcess/enclosurecreatebatch",list)
}
/*
	批量删除请会计处理问题附件信息 @author gaoxue
*/
export function enclosuredeletebatch(post,list){
	return post("/v1/accountingProcess/enclosuredeletebatch",list)
}
