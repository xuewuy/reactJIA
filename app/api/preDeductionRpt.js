/**
 * Created by cqs on 2017/3/27.
 */

/**
 * 待抵扣进项税额台账 查询
 * @param post
 * @param params 过滤条件
         {
             "startYear":2017,
             "startMonth":1,
             "endYear":2017,
             "endMonth":6
         }
 * @returns {*}
 */
export function query(post, params) {
    return post('/v1/InputTaxDeduct/query', params)
}


/**
 * 待抵扣进项税额台账 打印
 * @param post
 * @param params 过滤条件
         {
              "startYear":2017,
              "startMonth":1,
              "endYear":2017,
              "endMonth":6
         }
 * @returns {*}
 */
 export function print(post, params) {
 return post('/v1/InputTaxDeduct/print', params)
 }

/**
 * 待抵扣进项税额台账 打印
 * @param post
 * @param params 过滤条件
 {
      "startYear":2017,
      "startMonth":1,
      "endYear":2017,
      "endMonth":6
 }
 * @returns {*}
 */
export function exportExcel(post, params) {
    return post('/v1/InputTaxDeduct/export', params)
}