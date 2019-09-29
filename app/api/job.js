/**
 * Created by shenxy on 16/8/10.
 */

/**
 * 查询待派工列表
 * @param post
 * @param name
 * @param industry
 * @param status
 * @param productIds
 * @param currentPage
 * @param pageSize
 * @returns {*}
 */
export function query(post, name, industry, productIds, status, currentPage, pageSize) {
    let data = {}

    if (name) data.name = name
    if (industry && industry != '0') data.industry = industry.toString()
    if (productIds && productIds.length > 0) data.pids = productIds
    if (status && status.length > 0) data.sts = status
    data.page = {currentPage: currentPage, pageSize: pageSize}

    return post('/v1/assign/query', data)
}

/**
 * 派工到部门
 * @param post
 * @param deptId
 * @param jobIds
 * @returns {*}
 */
export function assignToDept(post, deptId, jobs) {
    let data = []
    jobs.forEach(job => {
        data.push({departmentId: deptId,
            assignId: job.get('id'),
            customerOrgId: job.get('customerOrgId'),
            serviceId: job.get('serviceId')})
    })
    return post('/v1/assign/toDept', data)
}

/**
 * 获取具有某一角色的所有人
 * @param post
 * @param roleId
 * @returns {*}
 */
export function personsOfRole(post, roleId) {
    return post('/v1/assign/getRoleOfPerson', {id: String(roleId)})
}


/**
 * 根据人员id,查询人员的部门及工作量信息
 * @param post
 * @param personId
 * @returns {*}
 */
export function personWorkDetail(post, personId) {
    return post('/v1/assign/personDetail', {id: String(personId)})
}


/**
 * 派工到人员
 * @param post
 * @param rolePerons
 * @param jobIds
 */
export function assignToPerson(post, rolePerons, jobs) {
    let data = []
    jobs.forEach(job => {
        rolePerons.forEach(rolePerson => {
            data.push({
                assignId: String(job.get('id')),
                departmentId: String(rolePerson.get('deptId')),
                roleId: String(rolePerson.get('roleId')),
                personId: String(rolePerson.get('person').get('id')),
                customerOrgId: job.get('customerOrgId'),
                serviceId: job.get('serviceId')})
        })
    })
    return post('/v1/assign/toPerson', data)
}

/**
 * 查询派工历史
 * @param post
 * @param jobId
 * @returns {*}
 */
export function history(post, jobId) {
    return post('/v1/assign/history', {id: jobId})
}

/**
 * 按部门汇总查询工作量
 * @param post
 * @param deptId
 * @returns {*}
 */
export function workloadOfDept(post, deptId) {
    return post('/v1/assign/deptQuota', {id: deptId || 0})
}

/**
 * 查询某部门下所有人的工作量
 * @param post
 * @param deptId
 * @returns {*}
 */
export function workloadOfDeptPerson(post, deptId) {
    return post('/v1/assign/deptPersonQuota', {id: deptId})
}

/**
 * 查询特定人员的工作量
 * @param post
 * @param personName
 * @returns {*}
 */
export function workloadOfPerson(post, personName) {
    return post('/v1/assign/personQuota', {name: personName})
}

/**
 * 查询人员的任务详情
 * @param post
 * @param personId
 * @returns {*}
 */
export function workloadPersonDetail(post, personId) {
    return post('/v1/assign/personTask', {id: personId})
}

/**
 * 根据派工id,查询相关人员及角色
 * @param post
 * @param jobId
 * @returns {*}
 */
export function rolePersonOfJob(post, jobId) {
    return post('/v1/assign/assignDetail', {id: jobId})
}

/**
 * 交接
 * @param post
 * @param handoverItems  交接项和被交接人的对应关系对象的数组
 * @returns {*}
 */
export function handover(post, handoverItems) {
    return post('/v1/assign/taskRealy', handoverItems)
}


/*
获取行业和业务类别数据展现在下拉列表
 */
export function getDictionaryData(post){
    return post('/v1/assign/getDictionaryData')
}