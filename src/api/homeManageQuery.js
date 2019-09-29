/*
 *官网管理
*/

//首页消息管理-查询
export function homeInfoQuery(post, list) {
	return post('/v1/rollMessage/query', list)
}
//首页消息管理-删除列表项
export function deleteList(post, list) {
	return post('/v1/rollMessage/delete', list)
}
//首页消息管理-编辑查询
export function getById(post, list) {
	return post('/v1/rollMessage/queryDetail', list)
}
//首页消息管理-保存、保存并发布
export function saveNews(post, list) {
	return post('/v1/rollMessage/insert', list)
}
//首页消息管理-列表发布
export function releaseNews(post, list) {
	return post('/v1/rollMessage/release', list)
}

/*
 *头条管理
*/

//头条管理-查询
export function bigNewsQuery(post, list) {
	return post('/v1/headline/query', list)
}
//头条管理-删除列表项
export function BigNewsDelete(post, list) {
	return post('/v1/headline/delete', list)
}
//头条管理-保存、保存并发布
export function saveBigsNews(post, list) {
	return post('/v1/headline/insert', list)
}
//头条管理-列表发布
export function releaseBigNews(post, list) {
	return post('/v1/headline/release', list)
}
//头条管理-列表取消发布
export function cancelReleaseBigNews(post, list) {
	return post('/v1/headline/cancelRelease', list)
}

/*
 *伙伴计划管理
*/

//头条管理-init查询
export function partnerPlanInit(post) {
	return post('/v1/partner/init')
}
//头条管理-查询
export function partnerPlanQuery(post, list) {
	return post('/v1/partner/query', list)
}
//伙伴计划管理-删除列表项
export function partnerPlanDelete(post, list) {
	return post('/v1/partner/delete', list)
}
//伙伴计划管理-保存、转为签约伙伴
export function savePartnerPlan(post, list) {
	return post('/v1/partner/insert', list)
}
//伙伴计划管理-取消签约
export function cancelSavePartnerPlan(post, list) {
	return post('/v1/partner/cancelSign', list)
}
//伙伴计划管理-获取地区数据
export function getCityMap(post, list) {
	return post('/v1/partner/getCityMap', list)
}
