/**
 * Created by shenxy on 16/8/1.
 */

/**
 * 查询部门
 * @param post
 * @param orgId
 * @returns {*}
 */
export function query(post, orgId){
    return post('/v1/department/query', {orgId: orgId})
}

/**
 * 新增部门
 * @param post
 * @param code
 * @param name
 * @returns {*}
 */
export function add(post, orgId, parentId, code, name, memo, property){
    return post('/v1/department/create', {orgId: orgId, parentId: parentId, code: code, name: name, property: property})
}

/**
 * 修改部门
 * @param post
 * @param code
 * @param name
 * @returns {*}
 */
export function update(post, id, orgId, parentId, code, name, memo, ts, property){
    return post('/v1/department/update', {id: id, orgId: orgId, parentId: parentId, code: code, name: name, ts: ts, property: property})
}

/**
 * 删除部门
 * @param post
 * @param id
 */
export function del(post, id, ts, parentId){
    return post('/v1/department/delete', {id: id, ts: ts, parentId: parentId})
}


/**
 * 通过组织Id获取末级部门
 * @param  {[type]} post  [description]
 * @param  {[type]} orgId [description]
 * @return {[type]}       [description]
 */
export function getEndNodeDepartByOrgId(post, orgId){
	return  post('v1/department/getEndNodeDepartByOrgId', {orgId})
}

export function checkDepName(post,name,parentId,deptId){
    return post('v1/department/checkDepName',{name:name,parentId:parentId,id:deptId})
}