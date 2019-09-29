/**
 * 餐饮业报表通用查询接口
 * @param {*} post
 * @param {*} list
 */
export function cateringQuery(post, list){
    return post('v1/acmCyReport/query', list)
}

export function acmCyReport(post, list){
    return post('v1/acmCyReport/query', list)
}
/**
 * 餐饮业报表通用导出接口
 * @param {*} post
 * @param {*} list
 */
export function cateringExport(post, list){
    return post('v1/acmCyReportPES/export', list)
}
/**
 * 餐饮业报表通用打印接口
 * @param {*} post
 * @param {*} list
 */
export function cateringPrint(post,list){
    return post('v1/acmCyReportPES/print',list)
}
/**
 * 餐饮业通用报表微信分享接口
 * @param {*} post
 * @param {*} obj
 */
export function cateringShare(post,obj){
    return post('v1/acmCyReportPES/share',obj)
}
/**
 * 餐饮业通用报表邮件分享接口
 * @param {*} post
 * @param {String} recipient
 * @param {String} sender
 * @param {String} subject
 * @param {String} content
 */
export function cateringShareEmail(post,obj){
    return post('v1/acmCyReportPES/shareEmail',obj)
}
