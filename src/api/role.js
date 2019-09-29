/**
 * 创建角色
 * @param  {[type]} post [description]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
export function create(post, name,memo) {
    return post("/v1/role/create", { name: name ,memo: memo})
}

/**
 * 更新角色名称
 * @param  {[type]} post [description]
 * @param  {[type]} id   [description]
 * @param  {[type]} name [description]
 * @param  {[type]} ts   [description]
 * @return {[type]}      [description]
 */
export function update(post, id, name, memo, ts) {
    return post("v1/role/update", { id: id, name: name, memo: memo, ts: ts })
}

/**
 * 删除角色
 * @param  {[type]} post [description]
 * @param  {[type]} id   [description]
 * @param  {[type]} ts   [description]
 * @return {[type]}      [description]
 */
export function del(post, id, ts) {
    return post("v1/role/delete", { id, ts })
}

/**
 * 合并角色
 * @param  {[type]} post       [description]
 * @param  {[type]} combineIds [description]
 * @param  {[type]} targetName [description]
 * @return {[type]}            [description]
 */
export function combine(post, combineIds, targetName) {
    return post("v1/role/combine", { fromIds: combineIds, toName: targetName })
}

export function getAllRole(post) {
    return post('v1/role/getAllRole', {})
}
export function getRoleAuth(post, id) {
    return post('/v1/role/getRoleAuth', { id: id })
}
export function updateMenuAuth(post, obj) {
    return post('/v1/role/updateMenuAuth', obj)
}


/**
 * 查询角色
 * @param  {[type]} post  [description]
 * @param  {[type]} orgId [description]
 * @return {[type]}       [description]
 */
export function query(post, orgId) {
    return post("v1/role/query", { orgID: orgId })
}

export function checkMenu(post, menuIds) {
    if (sessionStorage.getItem('dzOrgId')) {
        return post("v1/role/checkMenu", { menuIds, sign: 1 })
    }
    return post("v1/role/checkMenu", {menuIds})
}

export function getRoles(post, orgId) {
    return post('/v1/role/getRoles', { orgId: orgId })
}

export function updatePersonRole(post, personIds, roles) {
    return post('/v1/role/updatePersonRole', { pIds: personIds, rIds: roles })
}
