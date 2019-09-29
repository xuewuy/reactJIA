/**
 * Created by shenxy on 16/8/1.
 */

/**
 * 查询人员,按企业
 * @param post
 * @param orgId
 * @param deptId
 * @returns {*}
 */
export function queryByOrg(post, orgId, pageSize, offset, roleFilter){
    return post('/v1/person/getByOrgId', {orgId: orgId, pageSize: pageSize, offset: offset, roleId: roleFilter})
}

export function exportPersonData(post){
    return post('/v1/person/exportPersonData')
}
/**
 * [enterpriseTransfer 企业转移]
 * @param  {[type]} post [description]
 * @param  {[type]} obj  [description]
 * @return {[type]}      [description]
 */
export function transfer(post,obj){
    return post('/v1/person/enterpriseTransfer',obj)
}

/**
 * 查询人员,按部门
 * @param post
 * @param deptId
 * @returns {*}
 */
export function queryByDept(post, deptId, pageSize, offset, roleFilter){
    return post('/v1/person/getByDepId', {departmentId: deptId, pageSize: pageSize, offset: offset, roleId: roleFilter})
}

/**
 * 查询人员,客户人员
 * @param post
 * @param orgId
 */
export function queryCustomerPerson(post, orgId, pageSize, offset, roleFilter) {
    return post('/v1/person/getCustomerPByOrgId', {orgId: orgId, pageSize: pageSize, offset: offset, roleId: roleFilter})
}

/**
 * 查询人员,按id单查
 * @param post
 * @param personId
 */
export function queryById(post, personId) {
    return post('/v1/person/getById', {id: personId})
}
/**
 * 新增人员
 * @param post
 * @param person
 */
export function add(post, person) {
    return post('/v1/person/create', person)
}
/**
 * 修改人员
 * @param post
 * @param person
 * @returns {*}
 */
export function update(post, person) {
    return post('/v1/person/update', person)
}
/**
 * 批量删除人员
 * @param post
 * @param personIds
 * @returns {*}
 */
export function del(post, personIds) {
    return post('/v1/person/delete', personIds)
}

/**
 * 批量禁用人员
 * @param post
 * @param personIds
 * @returns {*}
 */
export function prohibit(post, personIds) {
    return post('/v1/person/disableuser', personIds)
}

/**
 * 设置数据权限
 * @param post
 * @param selectedIds
 * @param type
 * @param detail
 * @returns {*}
 */
export function setDataRight(post, personIds, typeCode, detailDepts) {
    return post('/v1/person/authorize/update', {pIds: personIds, type: typeCode, depIds: detailDepts} )
}

/**
 * 邀请人员加入企业
 * @param orgId
 * @param personList
 */
export function invite(post, orgId, personList) {
    return post('/v1/person/invite', personList)
}

/**
 * 获取人的数据权限, 根据personId
 * @param post
 * @param personId
 */
export function getDataRight(post, personId) {
    return post('/v1/person/authorize/getById', {id: personId} )
}

/**
 * 通过组织Id获取人员列表
 * @param  {[type]} post  [description]
 * @param  {[type]} orgId [description]
 * @return {[type]}       [description]
 */
export  function getListByOrgId(post, orgId){
    return post('/v1/person/getListByOrgId',{orgId})
}

export function getUserListByOrgId(post, orgId){
    return post('/v1/person/getUserListByOrgId',{orgId})
}

/**
 * 批量重新启用人员
 * @param post
 * @param personIds
 * @returns {*}
 */
export function reEnable(post, personIds) {
    return post('/v1/person/restart', personIds)
}

/**
 * 检测注册手机号是否可用
 * @param  {[type]} post   [description]
 * @param  {[type]} mobile [description]
 * @return {[type]}        [description]
 */
export function findPhoneIsHave(post,mobile,id){
    return post('/v1/person/findPhoneIsHave',{mobile:mobile,id:id})
}

/**
 * [checkPersonName 检测当前的人员名称是否重复]
 * @param  {[type]} post [description]
 * @param  {[type]} name [description]
 * @param  {[type]} id   [description]
 * @return {[type]}      [description]
 */
export function checkPersonName(post,name,id){
    return post('/v1/person/checkPersonName',{name,id})
}

/**
 * 获取人员部门列表
 * @param  {[type]} post   [description]
 * @param  {[type]} deptId [description]
 * @return {[type]}        [description]
 */
export function getPersonDeptList(post,deptId){
    let param = {}
    if(deptId)
        param = {departmentId: deptId}
    
    return post('/v1/person/getPersonDeptList', param)
}

/**
 * 获取人员所在部门
 * @param  {[type]} post   [description]
 * @param  {[type]} 根据人员ID查询人员信息 [description]
 * @return {[type]}        [description]
 */
export function queryPerson(post,id){
    return post('/v1/person/queryPerson', {id})
}

export function checkStatus(post,obj){
    return post('/v1/person/checkStatus',obj)
}
/**
 * 获取人员code
 * @param {*} post 
 */
export function getAutoCode(post){
    return post('/v1/person/getAutoCode',{})
}