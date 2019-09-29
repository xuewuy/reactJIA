//账龄分析表查询
export function agingQueryList(post,obj){
    return post('/v1/agingAnalysis/queryList',obj)
}
//账龄分析表分享 
export function agingShare(post,obj){
    return post('/v1/agingAnalysis/share',obj)
}
//账龄分析表邮件分享 
export function agingShareEmail(post,obj){
    return post('/v1/agingAnalysis/shareEmail',obj)
}
//账龄分析表导出
export function agingExportList(post,params){
    return post('/v1/agingAnalysis/exportList',params)
}
//账龄分析表打印
export function agingPrintList(post,params){
    return post('/v1/agingAnalysis/printList',params)
}
//*****************期间费用明细表接口START***********************
//查询
//请求参数:{"queryYear":"2017","queryMonth":"3","5601":"unfold","5602":"unfold","isView":"true"}
export function cpQuery(post,list){
    return post('/v1/costPeriod/cpQuery',list)
}
//打印
//请求参数:{"queryYear":"2017","queryMonth":"3","5601":"unfold","5602":"unfold","isView":"true"}
export function cpPrint(post,list){
    return post('/v1/costPeriod/cpPrint',list)
}
//导出
//请求参数:{"queryYear":"2017","queryMonth":"3","5601":"unfold","5602":"unfold","isView":"true"}
export function cpExport(post,list){
    return post('/v1/costPeriod/cpExport',list)
}
//二维码分享
//请求参数:{"queryYear":"2017","queryMonth":"3","5601":"unfold","5602":"unfold","isView":"true"}
export function cpShare(post,list){
    return post('/v1/costPeriod/cpShare',list)
}
//邮件分享
//请求参数:{"queryYear":"2017","queryMonth":"3","5601":"unfold","5602":"unfold","isView":"true"}
export function cpShareEmail(post,list){
    return post('/v1/costPeriod/cpShareEmail',list)
}

//*****************期间费用明细表接口END***********************