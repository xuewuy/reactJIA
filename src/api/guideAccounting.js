/**
 * 导账api接口
 */

/**
* 科目匹配查询接口
* @param  {[type]} post [description]
* @param  {[type]} data 科目信息
* @returns {*}
*/
export function listMatch(post, data) {
    return post('/v1/fiImport/ListMatch', data)
}

/**
* 科目匹配 科目对应接口
* @param  {[type]} post [description]
* @param  {[type]} data 科目信息
* @returns {*}
*/
export function match(post, data) {
    return post('/v1/fiImport/match', data)
}

export function queryDate(post, data) {
    return post('/v1/fiImport/queryDate', data)
}

/**
* 根据日期删除外部凭证的方法
*/
export function deleteExJournalByDate(post, data) {
    return post('/v1/fiImport2/deleteExJournalByDate', data)
}

/**
* 科目匹配 取消科目对应接口
* @param  {[type]} post [description]
* @param  {[type]} data 科目信息
* @returns {*}
*/
export function cancel(post, data) {
    return post('/v1/fiImport/cancel', data)
}

/**
* 科目匹配 删除导账信息
* @param  {[type]} post [description]
* @param  {[type]} data 科目信息
* @returns {*}
*/
export function guideDelete(post, data) {
    return post('/v1/fiImport/delete', data)
}

/**
* 科目匹配 确认导入接口
* @param  {[type]} post [description]
* @param  {[type]} data 科目信息
* @returns {*}
*/
export function Import(post, data) {
    return post('/v1/fiImport/Import', data)
}

/**
* 科目匹配 点击取消 接口
* @param  {[type]} post [description]
* @param  {[type]} data 科目信息
* @returns {*}
*/
export function deleteAccount(post, data) {
    return post('/v1/fiImport/delete', data)
}

/**
* 科目关键字搜索init接口
* @param  {[type]} post [description]
* @param  {[type]} data 科目信息
* @returns {*}
*/
export function keywordsList(post, data) {
    return post('/v1/fiImport/keywordsList', data)
}

/**
* 修改关键字接口
* @param  {[type]} post [description]
* @param  {[type]} data 科目信息
* @returns {*}
*/
export function keywordsUpdate(post, data) {
    return post('/v1/fiImport/keywordsUpdate', data)
}

/**
* 导账业务类型搜索-导出接口
*/
export function daoZhangExport(post, data) {
    return post('/v1/fiImport2/daoZhangExport', data)
}
