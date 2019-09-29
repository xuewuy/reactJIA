/**
 * 会计科目api接口
 */

/**
* 新增科目
* @param  {[type]} post [description]
* @param  {[type]} data 科目信息
* @returns {*}
*/
export function add(post, data){
   return post('/v1/account/create', data)
}

/**
* 修改科目
* @param  {[type]} post [description]
* @param  {[type]} data 科目信息
* @returns {*}
*/
export function update(post, data){
   return post('/v1/account/update', data)
}

/**
* 删除科目
* @param	orgId	组织机构id
* @param	id	  科目id
* @returns {*}
*/
export function del(post, id,ts){
   return post('/v1/account/delete', {id:id,ts:ts})
}

/**
* 查询科目
* @param  orgId 组织机构id
* @param  accountTypeId   科目类型id(可选)
* @returns {*}
*/
export function query(post, orgId, accountTypeId, isEndNode, status, code, name){
   return post('/v1/account/query', {orgId:orgId, accountTypeId:accountTypeId, isEndNode, status, code, name})
}
/**
* 查询科目
* @param	orgId	组织机构id
* @param	accountTypeId	  科目类型id(可选)
* @returns {*}
*/
export function queryM(post, orgId, accountTypeId, isEndNode, status, code, name){
   return post('/v1/account/queryForJournalManage', {orgId:orgId, accountTypeId:accountTypeId, isEndNode, status, code, name})
}

/**
* 按照组织id、科目id查询科目
* @param	orgId	组织机构id
* @param	objAccount	科目对象
* @returns {*}
*/
export function findById(post, objAccount){
   return post('/v1/account/getById', objAccount)
}

/**
* 科目是否已被使用
* @param	id	  科目id
* @returns {*}
*/
export function isUsed(post, id){
   return post('/v1/account/isUsed', {id:id})
}

/**
* 获取最小的凭证日期
* @param 无
* @returns {*}
*/
export function getMinDocVoucherDate(post){
   return post('/v1/journal/getMinDocVoucherDate')
}

/**
* 判断组织有无凭证
* @param 无
* @returns {*}
*/
export function haveDoc(post){
   return post('/v1/journal/haveDoc')
}

/**
* 根据会计准则+行业重新预置科目档案，需要先清除组织的科目期初（高恩接口）和科目档案
* @param 无
* @returns {*}
*/
export function reset(post,accountingStandardsId,industryId){
   return post('/v1/account/reset',{accountingStandardsId:accountingStandardsId,industryId:industryId})
}

/**
* 根据会计准则+行业，提供预置科目预览
* @param 无
* @returns {*}
*/
export function preview(post,accountingStandardsId,industryId){
   return post('/v1/account/preview',{accountingStandardsId:accountingStandardsId,industryId:industryId})
}

/**
* 返回当前服务器时间的年度
* @param 无
* @returns {*}
*/
export function curYear(post){
   return post('/v1/account/curYear',{})
}

/**
* 返回当前科目是否有启用了即征即退核算的科目
* @param 无
* @returns {*}
*/
export function hasLevyRetreat(post){
   return post('/v1/account/hasLevyRetreat',{})
}

/**
* 返回特定现金类型的科目
* @param 现金类型Id
* @returns {*}
*/
export function findByCashTypeId(post, cashTypeId){
   return post('/v1/account/find', { cashTypeId: cashTypeId })
}

/**
* 更新科目属性为水利建设基金的科目名称
* @param 现金类型Id
* @returns {*}
*/
export function updateNameByCashTypeId(post, name){
   return post('v1/account/updateNameByCashTypeId', { name: name })
}

/**
 * 财务补充报表查询接口
 * @param {*} post 
 * @param {*} obj 
 */
export function ysyfQuery(post,obj){
    return post('/v1/ysyf/query',obj)
}
/**
 * 财务补充报表的打印接口
 * @param {*} post 
 * @param {*} obj 
 */
export function ysyfPrint(post,obj){
    return post('/v1/ysyf/print',obj)
}
/**
 * 财务补充报表获取下拉数据接口
 * @param {*} post 
 * @param {*} obj 
 */
export function ysyfQueryList(post,obj){
    return post('/v1/ysyf/queryList',obj)
}
/**
 * 财务补充报表导出接口
 * @param {*} post 
 * @param {*} obj 
 */
export function ysyfExport(post,obj){
    return post('/v1/ysyf/export',obj)
}
/**
 * 财务补充报表微信分享接口
 * @param {*} post 
 * @param {*} obj 
 */
export function ysyfShare(post,obj){
    return post('/v1/ysyf/share',obj)
}
/**
 * 财务补充报表发送邮件接口
 * @param {*} post 
 * @param {*} obj 
 */
export function ysyfSendEmail(post,obj){
    return post('/v1/ysyf/shareEmail',obj)
}

/**
 * 补充数量报表查询接口
 * @param {*} post 
 * @param {*} obj 
 */
export function supplementQuantityQuery(post, obj) {
    return post('/v1/fiQuantityAux/query', obj)
}

/**
 * 补充数量报表修改接口
 * @param {*} post 
 * @param {*} obj 
 */
export function supplementQuantityUpdate(post, obj) {
    return post('/v1/fiQuantityAux/update', obj)
}

/**
 * 补充数量 期初结转接口接口
 * @param {*} post 
 * @param {*} obj 
 */
export function carryForwardPeriodBegin(post, {}) {
    return post('/v1/fiQuantityAux/carryForwardPeriodBegin', {})
}