
/**
 * 校验组织是否存在
 * @param  {[type]}  post [description]
 * @param  {[type]}  name [description]
 * @return {Boolean}      [description]
 */
export function isNotExist(post,name){
	return post("/v1/org/isNotExist",{'orgName':name})
}

/**
 * 创建组织
 * @param  {[type]} post [description]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
export function create(post, obj){
	return post("/v1/org/create", obj)
}

/**
 * 检测企业是否加入集团
 * @param {*} post 
 * @param {*} id 
 */
export function isHaveOrgGroupByEntOrgId(post,id){
	return post('/v1/orgGroup/isHaveOrgGroupByEntOrgId', { entOrgId:id})
}

/**
 * [queryOrgList 刷新左上角组织列表]
 * @param  {[type]} post [description]
 * @return {[type]}      [description]
 */
export function queryOrgList(post,obj){
	return post('/v1/org/queryOrgList',obj)
}

/**
 * [querySubscription 查询服务商权限]
 * @param  {[type]} post  [description]
 * @param  {[type]} orgId [description]
 * @return {[type]}       [description]
 */
export function querySubscription(post,orgId){
	return post('/v1/dzCustomer/querySubscription',{orgId:orgId})
}

/**
 * [queryServiceProvider 查询服务商列表]
 * @param  {[type]} post [description]
 * @return {[type]}      [description]
 */
export function queryServiceProvider(post,id){
	return post('/v1/org/queryServiceProvider',{id:id})
}

/**
 * 通过id获取组织信息
 * @param  {[type]} post [description]
 * @param  {[type]} id   [description]
 * @return {[type]}      [description]
 */
export function getById(post, id){
	return post("/v1/org/getById", {id})
}

/**
 * 获取所有组织列表
 * @param  {[type]} post [description]
 * @return {[type]}      [description]
 */
export function query(post,obj){
	return post("/v1/org/query",obj)
}

/**
 * 查询集团帐套列表接口
 * @param  {[type]} post [description]
 * @return {[type]}      [description]
 */
export function groupQuery(post,param){
	return post('/v1/org/groupQuery',param)
}
/**
 * 加入集团
 * @param  {[type]} post [description]
 * @return {[type]}      [description]
 */
export function confirmInvite(post,param){
	return post('/v1/web/inviteOrg/confirmInvite',param)
}
/**
 * 拒绝加入集团
 * @param  {[type]} post [description]
 * @return {[type]}      [description]
 */
export function refuseInvite(post,param){
	return post('/v1/web/inviteOrg/refuseInvite',param)
}
/**
 * 总分机构查询企业汇总列表
 * @param {*} post 
 * @param {*} param 
 */
export function groupTeam(post,param){
	return post('/v1/groupTeam/queryList',{})
}

export function listMapGroupTeam(post,params){
	return post('/v1/groupTeam/listMapGroupTeam',{})
}

//删除组织
export function deleteOrg(post,id){
	return post('/v1/org/delete',{id})
}
// 获取用户组织档案信息
export function getOrg(post,obj){
	return post('/v1/SetOrg/getOrg',obj)
}
// 保存更新组织档案
export function update(post,obj){
	return post('/v1/SetOrg/update',obj)
}

//检测系统设置中组织档案下信用代码和计算机代码是否为空
export function isExist(post,str,code){
	//code : CreditCode 信用代码   ComputerCode 计算机码
	let identificationCode = str +'_'+ code
	return post('/v1/SetOrg/isExist',identificationCode)
}

//更新组织启用年月
export function updateEnabledYearAndMonth(post, enabledYear, enabledMonth){
	return post('/v1/SetOrg/updateEnabledYearAndMonth',{enabledYear: enabledYear, enabledMonth: enabledMonth})
}

//更新组织截至日期
export function updateExpireTime(post,obj){
	return post('/v1/org/updateExpireTime',obj)
}

//导出组织列表
export function exportExcel(formPost,obj){
	return formPost('/v1/org/export', obj)
}
//新增组织统计查询
export function analyze(post,obj){
	return post('/v1/org/analyze',obj)
}
//新增组织统计导出
export function analyzeExport(formPost,obj){
	return formPost('/v1/org/analyzeExport',obj)
}
/**
 * [updateManageInfo 修改立即体验页面的启用期间和会计准则]
 * @param  {[type]} post [description]
 * @param  {[type]} obj  [description]
 * @return {[type]}      [description]
 */
export function updateManageInfo(post,obj){
	return post('/v1/org/updateManageInfo',obj)
}
/**
 * 运营平台-企业信息中认证审核
 * @param {*} post 
 * @param {*} obj 
 */
export function examine(post,obj){
	return post('/v1/org/examine',obj)
}

export function getCityMap(post,obj){
	return post('/v1/SetOrg/getCityMap',obj)
}

/**
 * 更新服务商名称
 * @param {*} post 
 * @param {*} obj 
 */
export function updateName(post,obj){
	return post('/v1/org/updateName',obj)
}

export function tiaozhuan(post) {
	// body...
	return post('/v1/serviceProvider/tiaozhuan',{orgId:'100050'})
}

export function updateByOrgId(post,obj){
	return post('/v1/person/authorize/updateByOrgId',obj)
}

//汇算清缴用户统计查询
export function itsStats(post,obj){
	return post('/v1/taxIncomeSettlement/itsStats',obj)
}

//汇算清缴用户统计查询
export function itsStatsDetail(post,obj){
	return post('/v1/taxIncomeSettlement/itsStatsDetail',obj)
}