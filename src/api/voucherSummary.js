/**
 * Created by cqs on 2017/3/27.
 */

/**
 * 凭证汇总查询
 * @param post
 * @param params{ year : '年',month : '月'} 过滤条件
 * @returns {*}
 */
export function query(post, params) {
    return post('/v1/journal/summaryTable', params)
}


/**
 * 凭证汇总打印导出
 * @param post
 * @param params{ year : '年',month : '月'，type : '类型 (0是导出1是打印)'} 过滤条件
 * @returns {*}
 */
export function printAndExport(post, params) {
    return post('/v1/journal/printJournalSummary', params)
   /* if(params.type == 0){
        return post('/v1/journal/exportJournalSummary', params)
    }else{
        return post('/v1/journal/printJournalSummary', params)
    }*/
}