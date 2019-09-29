

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
 * [query 法人网查询数据]
 * @param  {[type]} post [description]
 * @param  {[type]} obj  [description]
 * @return {[type]}      [description]
 */
export function query(post,obj){
    return post('/v1/card/query',obj)
}

/**
 * [query 根据用户id获取当前用户信息]
 * @param  {[type]} post [description]
 * @param  {[type]} obj  [description]
 * @return {[type]}      [description]
 */
export function getMobile(post,obj){
    return post('/v1/card/getMobile',obj)
}

/**
 * [query 根据会员卡ID修改电话咨询次数]
 * @param  {[type]} post [description]
 * @param  {[type]} obj  [description]
 * @return {[type]}      [description]
 */
export function updateCounselCountById(post,obj){
    return post('/v1/card/updateCounselCountById',obj)
}