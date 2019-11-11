
//获取图片验证码MD5串
export function checkCaptchaCode(post,code,r){
	return post('/v1/web/pub/checkCaptchaCode',{'code':code,'r':r})
}

//发送验证码
export function sendConfirmCode(post,emailOrPhone,codeType,domain){
	// codeType:1-注册 2-找回密码 3-绑定手机或邮箱
	return post('/v1/web/pub/sendConfirmCode',{'account':emailOrPhone,'codeType':codeType,'domain':domain})
}

// 校验验证码是否正确
export function isRightConfirmCode(post,codeValue,ts,account,md5Code){
	return post('/v1/web/pub/isRightConfirmCode',{'confirmCode':codeValue,'ts':ts,'account':account,'md5Code':md5Code})
}

// 我的易嘉人初始化数据
export function init(post){
	return post('/v1/web/myyj/init')
}
//客户账套创建
export function orginit(post,id){
	return post('/v1/web/acmorg/init',{'id':id})
}

//获取版本更新的列表数据
export function getVersionList(post){
    return post('/v1/web/portal/getVersionList')
}

// 设置最新的推送版本信息为已读
export function setVersion(post,obj){
    return post('/v1/web/portal/setVersion',obj)
}

//版本查询接口
export function versionQuery(post, list) {
	return post('/v1/version/query',list)
}

//版本新增接口
export function versionInsert(post, list) {
	return post('/v1/version/insert',list)
}

//版本修改接口
export function versionUpdate(post, list) {
	return post('/v1/version/update',list)
}

//版本删除接口
export function versionDelete(post, list) {
	return post('/v1/version/delete',list)
}

//查询直播
export function queryEnumById(post, list) {
	return post('/v1/version/queryEnumById',list)
}

//更新初始化
export function queryById(post, list) {
	return post('/v1/version/queryById',list)
}

//刷新直播
export function updateEnumById(post, list) {
	return post('/v1/version/updateEnumById',list)
}
//企业列表
export function findOrgBySP(post, list) {
	return post('/v1/spOrg/findOrgBySP',list)
}
//咨询专家的弹框
export function serviceCreate(post, list) {
	return post('/v1/operateLog/create',list)
}

//查询邀请码信息列表
export function queryRegCodeList(post, list) {
	return post('/v1/regCode/queryRegCodeList',list)
}

//导出邀请码信息列表
export function regCodeExportData(post, list) {
	return post('/v1/regCode/exportData',list)
}

//批量导入生成客户资料
export function regCodeBatchImport(post, list) {
	return post('/v1/regCode/batchImport',list)
}
//导出客户导入信息模板
export function regCodeExportTemplate(post, list) {
	return post('/v1/regCode/exportTemplate',list)
}
//修改邀请码信息
export function regCodeUpdate(post, list) {
	return post('/v1/regCode/update',list)
}
//删除邀请码信息、用户和组织信息
export function regCodeDelete(post, list) {
	return post('/v1/regCode/delete',list)
}
//根据id查询邀请码信息
export function regCodeQueryById(post, list) {
	return post('/v1/regCode/queryById',list)
}

//修改登录密码
export function updatePassword(post, list) {
	return post('/v1/user/updatePassword',list)
}

//根据parentId、两个金额、一个名字 添加子级伙伴
//{"parentId":100,"name":"易嘉人09","smallPrice":66,"commonlyPrice":55.5}
export function addAppSon(post, list) {
	return post('/v1/app/addAppSon',list)
}

//根据id,两个金额修改子级小伙伴的金额
//{"id":"1999998","smallPrice":666,"commonlyPrice":555.5}
export function updateAppPrice(post, list) {
	return post('/v1/app/updateAppPrice',list)
}

//根据id删除  （删除时考虑已激活、已购买的不能删）
//{"id":"1999998"}
export function deleteAppSon(post, list) {
	return post('/v1/app/deleteAppSon',list)
}

//查询全部，拿到list
export function queryAll(post, list) {
	return post('/v1/app/queryAll',list)
}

//发送短信
export function sendSMSList(post, list) {
	return post('/v1/regCode/sendSMSList',list)
}

//反馈意见
export function sendFeedback(post,Feedback){
	return post('v1/setOpinion/insertOpinion',Feedback)
}
//反馈意见列表
export function queryFeedback(post,Feedback){
	return post('/v1/setOpinion/selectOpinion',Feedback)
}
/**
 * 查询餐饮存货与业务关系
 * @param {*} post 
 * @param {*} obj 
 */
export function queryBusinessMaintain(post,obj){
	return post('/v1/inventoryBusiness/queryBusinessMaintain',obj)
}
/**
 * 获取流水业务
 * @param {*} post 
 */
export function findBusiness(post){
	return post('/v1/inventoryBusiness/findBusiness',{})
}
/**
 * 批量设置业务关系
 * @param {*} post 
 * @param {*} params 
 */
export function updateBusiness(post, params) {
	return post('/v1/inventoryBusiness/updateBusiness', params)	
}

/**
 * 考试相关的接口
 */
//获取考试场地列表
export function getExamList(post, params){
	return post('/v1/onlineExam/getExamList', params)
}
//查询分数
export function getAchievement(post, params){
	return post('/v1/onlineExam/getAchievement', params)
}
//检查是否已经考过
export function examCheck(post, params){
	return post('/v1/onlineExam/check', params)
}
//删除场次
export function deleteExam(post,params){
	return post('/v1/onlineExam/deleteExam', params)
}
//添加场次
export function addExam(post,params){
	return post('/v1/onlineExam/addExam',params)
}
//修改场次
export function updateExam(post,params){
	return post('/v1/onlineExam/updateExam',params)
}
//获取考试成绩
export function getOnlineExamList(post, params){
	return post('/v1/onlineExam/getOnlineExamList',params)
}
//发送短信
export function sendMS(post, params){
	return post('/v1/onlineExam/SMS', params)
}
//获取错误详情
export function getOnlineExamDetail(post, params){
	return post('/v1/onlineExam/getOnlineExamDetail', params)
}
//获取出纳考试成绩
export function getCashierAchievement(post,params){
	return post('/v1/onlineExam/getCashierAchievement',params)
}
//拿张无忌的token去换its的token
export function itsSync(post, orgId) {
	return post('/v1/itsSync', { orgId })
}