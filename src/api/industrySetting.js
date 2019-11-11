export function query(post, params){
    return post('/v1/industrySetting/queryBankSettlement', params)
}

export function insert(post,name){
    return post('/v1/industrySetting/insert', { settlementName:name})
}

export function checkName(post,name){
    return post('/v1/industrySetting/checkSettlementName', { settlementName: name})
}

export function del(post,list){
    return post('/v1/industrySetting/delete',list)
}

export function update(post, params){
    return post('/v1/industrySetting/update', params)
}

/**
 * 供应商默认结算方式查询
 * @param {*} post 
 * @param {*} params 
 */
export function vendorBankQuery(post,params){
    return post('/v1/vendorBank/query',params)
}
/**
 * 供应商默认结算方式新增
 * @param {*} post 
 * @param {*} params 
 */
export function vendorBankInsert(post,params){
    return post('/v1/vendorBank/insert',params)
}
/**
 * 供应商默认结算方式修改
 * @param {*} post 
 * @param {*} params 
 */
export function vendorBankUpdate(post,params){
    return post('/v1/vendorBank/update',params)
}
/**
 * 供应商默认结算方式删除
 * @param {*} post 
 * @param {*} params 
 */
export function vendorBankDelete(post,params){
    return post('/v1/vendorBank/delete',params)
}
/**
 * 供应商默认结算方式获取单个值
 * @param {*} post 
 * @param {*} params 
 */
export function vendorBankFindById(post,params){
    return post('/v1/vendorBank/findById',params)
}