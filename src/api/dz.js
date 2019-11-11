export function getCustomerList(post,obj){
    return post('/v1/web/dz/grantAuthor/getCustomerList',obj)
}
export function getRolePerson(post,id,customerId){
    return post('/v1/web/dz/grantAuthor/getRolePerson',{"roleId":id,customerId:customerId})
}
export function getOrgRolePerson(post,id,roleId){
    return post('/v1/web/dz/grantAuthor/getOrgRolePerson',{id:id,roleId:roleId})
}
export function save(post,obj){
    return post('/v1/web/dz/grantAuthor/save',obj)
}
export function getRole(post){
    return post('/v1/web/dz/grantAuthor/getRole',{})
}

export function query(post,obj){
    return post('/v1/dzCustomer/query',obj)
}
export function getEnumDetail(post,obj){
    return post('/v1/SetOrg/getEnumDetail',obj)
}

export function insert(post,obj){
    return post('/v1/dzCustomer/insert',obj)
}

export function isJudgeData(post,obj){
    return post('/v1/dzCustomer/isJudgeData',obj)
}
/**
 * [updateCheckName 编辑客户信息账套名称唯一校验]
 * @param  {[type]} post [description]
 * @param  {[type]} obj  [description]
 * @return {[type]}      [description]
 */
export function updateCheckName(post,obj){
    return post('/v1/dzCustomer/updateCheckName',obj)
}
/**
 * [checkCustomerName 新增客户名称唯一校验]
 * @param  {[type]} post [description]
 * @param  {[type]} obj  [description]
 * @return {[type]}      [description]
 */
export function checkCustomerName(post,obj){
    return post('/v1/dzCustomer/checkCustomerName',obj)
}
/**
 * 代账端和企业端公用的查询接口
 * @param post
 * @param obj
 * @returns {*}
 */
export function queryInformation(post, obj){
    return post('/v1/dzCustomer/queryInformation', obj)
}
/**
 * 代账端和企业端公用的更新接口
 * @param post
 * @param obj
 * @returns {*}
 */
export function updateInformation(post,obj){
    return post('/v1/dzCustomer/updateInformation',obj)
}

export function clientDelete(post,obj){
    return post('/v1/dzCustomer/delete',obj)
}

export function enableAndDisable(post,obj){
    return post('/v1/dzCustomer/enableAndDisable',obj)
}
export function queryById(post,obj){
    return post('/v1/dzCustomer/queryById',obj)
}
export function update(post,obj){
    return post('/v1/dzCustomer/update',obj)
}
/**
 * [spQuery 运营平台服务商信息查询]
 * @param  {[type]} post [description]
 * @param  {[type]} obj  [description]
 * @return {[type]}      [description]
 */
export function spQuery(post,obj){
    return post('/v1/spOrg/query',obj)
}
/**
 * [updateManageInfo 运营平台服务商管理保存]
 * @param  {[type]} post [description]
 * @param  {[type]} obj  [description]
 * @return {[type]}      [description]
 */
export function updateManageInfo(post,obj){
    return post('/v1/spOrg/updateManageInfo',obj)
}

//代账税务通知接口
//取客户列表
//{
// "year":2017,
// "month":1,
//  "name":"人", （公司名称）可选
// "status":3  （通知状态 0：全部，1：未开始，2：进行中，3：已完成 ）
// }
export function getCustomerListTn(post,list) {
    return post('/v1/web/dz/taxNotice/getCustomerList',list)
}

//取税种通知列表
// {
// "customerOrgId":100024, （客户组织ID）
// "year":2017,
// "month":1
// }
export function getTaxNoticeListTn(post,list) {
    return post('/v1/web/dz/taxNotice/getTaxNoticeList',list)
}

//取客户信息
//{
// "customerOrgId":100024,
// "year":2017,
// "month":1
// }
// {"result":true,"value":{"taxationPersonnel":"李明","taxationPersonnelTel":"13500001111","vatTaxpayer":42,"status":2}}   （通知状态 0：全部，1：未开始，2：进行中，3：已完成 ）
export function getCustomerInfo(post,list) {
    return post('/v1/web/dz/taxNotice/getCustomerInfo',list)
}

//计算税款
//{
// "customerOrgId":100024, （客户组织ID）
// "year":2017,
// "month":2,
// "taxType":1,  （税种类型 1：增值税，2：所得税）
// "ts":"2017-04-21 10:47:43"
// }
// {"result":true,"value":{"result":true,"taxAmount":0.0,"ts":"2017-04-21 11:29:46"}}
export function calTaxAmountTn(post,list) {
    return post('/v1/web/dz/taxNotice/calTaxAmount',list)
}

//批量发送通知
//{
// "customerOrgId":100024, （客户组织ID）
// "year":2017,
// "month":2,
// "taxTypes":[1,2] （税种类型 1：增值税，2：所得税）
// }
export function batchSendNotice(post,list) {
    return post('/v1/web/dz/taxNotice/batchSendNotice',list)
}

//批量确认税款金额
//{
// "customerOrgId":100024, （客户组织ID）
// "year":2017,
// "month":2,
// "taxTypes":[1,2] （税种类型 1：增值税，2：所得税）
// }
export function batchConfirmTaxAmount(post,list) {
    return post('/v1/web/dz/taxNotice/batchConfirmTaxAmount',list)
}

//取消确认税款金额
//{
// "customerOrgId":100024, （客户组织ID）
// "year":2017,
// "month":2,
// "taxTypes":1,2（税种类型 1：增值税，2：所得税）
// }
export function resetConfirmTaxAmount(post,list) {
    return post('/v1/web/dz/taxNotice/resetConfirmTaxAmount',list)
}

//通知详情查询
//{
// "id
// }
export function getFeedBackLog(post,list) {
    return post('/v1/web/dz/taxNotice/getFeedBackLog',list)
}

//保存备注
//{
// "customerOrgId":100024, （客户组织ID）
// "year":2017,
// "month":2,
// "remark":"备注", （税种类型 1：增值税，2：所得税）
// "ts":"2017-04-21 10:47:43"
// }
// {"result":true,"value":{"result":true,"ts":"2017-04-21 11:15:06"}}
export function saveRemark(post,list) {
    return post('/v1/web/dz/taxNotice/saveRemark',list)
}

//更新客户反馈状态
// {
// "customerOrgId":100024, （客户组织ID）
// "year":2017,
// "month":2,
// "taxType":1, （税种类型 1：增值税，2：所得税）
// "status":1 （客户反馈状态(1:已通知,2:有疑问,3:已确认)）
// }
// {"result":true,"value":{"result":true,"ts":"2017-04-21 11:15:06"}}
export function updateFeedbackStatus(post,list) {
    return post('/v1/web/dz/feedBack/updateFeedbackStatus',list)
}

//查询状态
// {
// "customerOrgId":100024, （客户组织ID）
// "year":2017,
// "month":2,
// "status":1 （客户反馈状态(1:已通知,2:有疑问,3:已确认)）
// }
// {"result":true,"value":{"result":true,"ts":"2017-04-21 11:15:06"}}
export function queryFeedbackStatus(post,list) {
    return post('/v1/web/dz/taxNotice/queryFeedbackStatus',list)
}

//重置状态
// {
// "customerOrgId":100024, （客户组织ID）
// "year":2017,
// "month":2,
// "status":1 （客户反馈状态(1:已通知,2:有疑问,3:已确认)）
// }
// {"result":true,"value":{"result":true,"ts":"2017-04-21 11:15:06"}}
export function resetFeedbackStatus(post,list) {
    return post('/v1/web/dz/taxNotice/resetFeedbackStatus',list)
}

//工具初始化
export function queryUser(post) {
    return post('/v1/dzAuthSetCustomer/queryUser',{})
}
//工具查询列表
export function queryOrg(post,list) {
    return post('/v1/dzAuthSetCustomer/queryOrg',list)
}
//工具保存
export function authSet(post,list) {
    return post('/v1/dzAuthSetCustomer/authSet',list)
}

//取得最新一条消息
export function queryTopOne(post,list){
    return post('/v1/message/queryTopOne',list)
}
//消息查询列表
export function queryList(post,list){
    return post('v1/message/list',list)
}
//修改消息为已读
export function upReadDate(post,list){
    return post('v1/message/updateStatus',list)
}
//消息批量删除
export function batchDelete(post,list){
    return post('v1/message/batchDelete',list)
}
//消息单条删除
export function deleteOne(post,list){
    return post('v1/message/delete',list)
}
//查询消息设置
export function messageSetList(post,list){
    return post('v1/message/set/list',list)
}
//新增批量设置为已经读接口
export function updateBatchStatus(post,list){
    return post('v1/message/updateBatchStatus',list)
}
//更新消息设置
// [
//         {
//             "id":3057723883783168,
//             "countDownDay":8,
//             "ts":"2017-08-22 11:16:09"
//         },
//             {
//             "id":3057723883979776,
//             "countDownDay":8,
//             "ts":"2017-08-22 11:16:09"
//         }
// ]
export function messageSetUpdate(post,list){
    return post('v1/message/set/update',list)
}

//
export function messageCreate(post,list) {
    return post('v1/message/create',list)
}

//合同管理新增
// {
// "id":2951519717295104,
// "customerId":1,
// "projectId":1,
// "beginDate":"2017-01-01 1:1:1",
// "endDate":"2017-12-12 1:1:1",
// "chargeMode":2,
// "amount":3600,
// "receiveAmount":2400,
// "salesConsultant":"李越",
// "signDate":"2017-07-12 1:1:1",
// "contractStatus":1,
// "memo":"新用户",
// "ts":"2017-08-03 17:07:01"
// }
export function contractAdd(post,list){
    return post('v1/web/dz/contract/add',list)
}
//合同管理查询
// {
// "contractCode":"一"   参数可选
// }
export function contractQuery(post,list){
    return post('v1/web/dz/contract/query',list)
}
//合同管理删除
//{
// "id":2951034955236352,
// "ts":"2017-08-03 15:03:44"
// }
export function contractDelete(post,list){
    return post('v1/web/dz/contract/delete',list)
}
// 合同管理修改
// {
// "id":2951519717295104,
// "customerId":1,
// "projectId":1,
// "beginDate":"2017-01-01 1:1:1",
// "endDate":"2017-12-12 1:1:1",
// "chargeMode":2,
// "amount":3600,
// "receiveAmount":2400,
// "salesConsultant":"李越",
// "signDate":"2017-07-12 1:1:1",
// "contractStatus":1,
// "memo":"新用户",
// "ts":"2017-08-03 17:07:01"
// }
export function contractUpdate(post,list){
    return post('v1/web/dz/contract/update',list)
}
// 合同管理取得管理详情
// {
// "id":2951034955236352
// }
export function contractQueryById(post,list){
    return post('v1/web/dz/contract/queryById',list)
}


//合同项目新增
//{
// "projectName":"测试项目一",          字数限制50个
// "projectType":"测试项目类型一",      字数限制50个
// "chargeMode":2,
// "amount":5000,
// "memo":"代账、记账"                  字数限制200个
// }
export function projectAdd(post,list){
    return post('v1/web/dz/project/add',list)
}
//合同项目修改
//{
// "id":2951034955236352,
// "projectName":"测试项目一",            字数限制50个
// "projectType":"测试项目类型一",        字数限制50个
// "chargeMode":2,
// "amount":5000,
// "memo":"代账、记账",                   字数限制200个
// "ts":"2017-08-03 15:03:44"
// }
export function projectUpdate(post,list){
    return post('v1/web/dz/project/update',list)
}
//合同项目删除
//{
// "id":2951034955236352,
// "ts":"2017-08-03 15:03:44"
// }
export function projectDelete(post,list){
    return post('v1/web/dz/project/delete',list)
}
//合同项目取得详情
//{
// "id":2951034955236352
// }
export function projectQueryById(post,list){
    return post('v1/web/dz/project/queryById',list)
}
//合同项目查询
//{
// "projectName":"一"   参数可选
// }
export function projectQuery(post,list){
    return post('v1/web/dz/project/query',list)
}
//合同项目和合同管理查询所有类型
export function getAllType(post,list){
    return post('v1/web/dz/project/getAllType')
}
//根据客户名称查询客户列表
export function queryByName(post,list){
    return post('/v1/dzCustomer/queryByName',list)
}
//根据类型查询项目列表
export function getProjectByType(post,list){
    return post('v1/web/dz/project/getProjectByType',list)
}

export function queryIndustryByName(post,name){
    return post('/v1/dzCustomer/queryIndustryByName',{name:name})
}
// 更新附件
// {
// "id":2956364395512832,
// "dzArrachmentLIst":[
//         {"setEnclosureId":2956364395512832},
//         {"setEnclosureId":2956364395512832}
//     ]
// }
export function updateAttachment(post,list){
    return post('v1/web/dz/contract/updateAttachment',list)
}
// 检验合同号是否存在
// {
// "contractCode":"HT001"
// }
export function checkCodeExists(post,list){
    return post('v1/web/dz/contract/checkCodeExists',list)
}
// 催款
// {
// "id":2956364395512832,
// "ts":"2017-08-04 13:43:43",
// "dzDunInfoDto":{
//     "dunText":"我也是催款信息！",
//     "dunType":1,
//     "debtorAccount":"15235644125",
//     "debtorName":"张明"
//     }
// }
export function contractDun(post,list){
    return post('v1/web/dz/contract/dun',list)
}
// 查询附件列表
// {
// "contractId":2973879592354816
// }
export function queryAttachment(post,list){
    return post('v1/web/dz/contract/queryAttachment',list)
}

// 服务商导出
// {
// "contractId":2973879592354816
// }
export function queryExport(formPost,list){
    return formPost('/v1/org/export',list)
}
// 服务商信息账套列表导出
// {
// "contractId":2973879592354816
// }
export function queryOrgListExport(formPost,list){
    return formPost('/v1/spOrg/orgListExport',list)
}

export function modCustomerMemo(post,id,memo,dzOrgId){
    return post('v1/web/dz/home/modCustomerMemo',{id:id,memo:memo,orgId:dzOrgId})
}

export function upgradeQuery(post){
    return post('/v1/SetOrg/upgradeQuery',{})
}