/* ***********************集团报表  start*************************** */

/**
 * 查询条件下拉数据（时间，分组）
 * @param  {[type]} post [description]
 * @return {[type]}      [description]
 * {
 * dateType: "month", --month:月；quarter：季度；halfAYear：半年；year：年
 * queryType: 0,--0:所有；1：查询时间；2：查询分组
 * }
 */
export function getDataAndGroupList(post, list) {
    return post('/v1/groupReportService/getDataAndGroupList', list)
}


/**
 * 查询报表数据
 * @param  {[type]} post [description]
 * @return {[type]}      [description]
 * {
 * "reportType": 1, --1、资产负债；2、利润；3、现金流量
 * "periodType": 1, --1、按年查询；2、按月查询；3、按季查询；4、按半年查询
 * "type": 1, --1、分组ID类型 1：分组ID 2：企业ID
 * "groupTeamId": 1, --分组ID或者查询企业ID
 * "date": "2018.09:2018.09",
 * "isOffset": true -- 是否使用抵消表   true : 使用，false:不使用
 * }
 */
export function getData(post, list) {
    return post('/v1/groupReportService/getData', list)
}


/**
 * 重新采集数据接口
 * @param  {[type]} post [description]
 * @return {[type]}      [description]
 * {
 * "reportType": 1, --1、资产负债；2、利润；3、现金流量
 * "periodType": 1, --1、按年查询；2、按月查询；3、按季查询；4、按半年查询
 * "date": "2018.09:2018.09"
 * "type": 1, --1、分组ID类型 1：分组ID 2：企业ID
 * "groupTeamId": 1, --分组ID或者查询企业ID
 * }
 */
export function collectionData(post, list) {
    return post('/v1/groupReportService/collectionData', list)
}

/**
 * 数据穿透接口
 * @param  {[type]} post [description]
 * @return {[type]}      [description]
 * {
 * "reportType": 1, --1、资产负债；2、利润；3、现金流量
 * "periodType": 1, --1、按年查询；2、按月查询；3、按季查询；4、按半年查询
 * "type": 1, --1、分组ID类型 1：分组ID 2：企业ID
 * "groupTeamId": 1, --分组ID或者查询企业ID
 * "date": "2018.09:2018.09",
 * "isOffset": true, -- 是否使用抵消表   true : 使用，false:不使用
 * "dataXy":"bs_1_0" --资产负债表：bs_1_0，利润表：is_1_0，现金流量表：cf_1_0
 * }
 */
export function getDetail(post, list) {
    return post('/v1/groupReportService/getDetail', list)
}
/**
 * 数据穿透——导出接口
 * @param  {[type]} post [description]
 * @return {[type]}      [description]
 * {
 * "reportType": 1, --1、资产负债；2、利润；3、现金流量
 * "periodType": 1, --1、按年查询；2、按月查询；3、按季查询；4、按半年查询
 * "type": 1, --1、分组ID类型 1：分组ID 2：企业ID
 * "groupTeamId": 1, --分组ID或者查询企业ID
 * "date": "2018.09:2018.09",
 * "isOffset": true, -- 是否使用抵消表   true : 使用，false:不使用
 * "dataXy":"bs_1_0" --资产负债表：bs_1_0，利润表：is_1_0，现金流量表：cf_1_0
 * }
 */
export function exportDetail(post, list) {
    return post('/v1/groupReportService/exportDetail', list)
}

/**
 * 检查结果接口
 * @param  {[type]} post [description]
 * @return {[type]}      [description]
 * {
 * "reportType": 1, --1、资产负债；2、利润；3、现金流量
 * "periodType": 1, --1、按年查询；2、按月查询；3、按季查询；4、按半年查询
 * "type": 1, --1、分组ID类型 1：分组ID 2：企业ID
 * "groupTeamId": 1, --分组ID或者查询企业ID
 * "date": "2018.09:2018.09",
 * "checkType":1 --数据源检查结果类型 1、期末  2、年初 3、结账
 * }
 */
export function checkDataSource(post, list) {
    return post('/v1/groupReportService/checkDataSource', list)
}
/**
 * 检查结果——导出接口
 * @param  {[type]} post [description]
 * @return {[type]}      [description]
 * {
 * "reportType": 1, --1、资产负债；2、利润；3、现金流量
 * "periodType": 1, --1、按年查询；2、按月查询；3、按季查询；4、按半年查询
 * "type": 1, --1、分组ID类型 1：分组ID 2：企业ID
 * "groupTeamId": 1, --分组ID或者查询企业ID
 * "date": "2018.09:2018.09",
 * "checkType":1 --数据源检查结果类型 1、期末  2、年初 3、结账
 * }
 */
export function exportCheckDataSource(post, list) {
    return post('/v1/groupReportService/exportCheckDataSource', list)
}
/**
流水收支统计表检查接口
*/
export function check(post, list) {
    return post('/v1/groupAcmReport/InOutDiary/check', list)
}
/**
流水收支统计表——导出检查接口
*/
export function exportCheckData(post, list) {
    return post('/v1/groupAcmReport/InOutDiary/exportCheckData', list)
}
/**
流水收支统计表查询分组列表
*/
export function teamQueryList(post, list) {
    return post('/v1/groupTeam/queryList', list)
}
/**
流水收支统计表数据
*/
export function queryInOutDiary(post, list) {
    return post('/v1/groupAcmReport/inOutDiary/query', list)
}

/**
 * 自定义分组查询分公司接口
 * @param  {[type]} post [description]
 * @return {[type]}      [description]
 * {}
 */
export function queryExistOrgGroup(post, {}) {
    return post('/v1/orgGroup/queryExistOrgGroup', {})
}

/**
 * 新增自定义分组接口
 * @param  {[type]} post [description]
 * @return {[type]}      [description]
 * {"name":"2342342","orgIds":[1111,2222,333]}
 */
export function insertGroup(post, list) {
    return post('/v1/groupTeam/insert', list)
}

/**
 * 集团三大报表打印接口
 * @param  {[type]} post [description]
 * @return {[type]}      [description]
 * {"date":"2018.09:2018.09","reportType":2,"type":2,"groupTeamId":5294401794900992,"isOffset":false,"periodType":1,"printtype":1 --仅利润表加此字段}
 */
export function reportPrint(post, list) {
    return post('/v1/groupReportService/print', list)
}

/**
 * 集团三大报表导出接口
 * @param  {[type]} post [description]
 * @return {[type]}      [description]
 * {"date":"2018.09:2018.09","reportType":2,"type":2,"groupTeamId":5294401794900992,"isOffset":false,"periodType":1,"printtype":1 --仅利润表加此字段}
 */
export function reportExport(post, list) {
    return post('/v1/groupReportService/export', list)
}

/**
 * 集团三大报表分享接口
 * @param  {[type]} post [description]
 * @return {[type]}      [description]
 * {"date":"2018.09:2018.09","reportType":2,"type":2,"groupTeamId":5294401794900992,"isOffset":false,"periodType":1,"printtype":1 --仅利润表加此字段}
 */
export function reportShare(post, list) {
    return post('/v1/groupReportService/share', list)
}

/**
 * 集团三大报表发送邮件接口
 * @param  {[type]} post [description]
 * @return {[type]}      [description]
 * {"date":"2018.09:2018.09",
 * "reportType":2,
 * "type":2,
 * "groupTeamId":5294401794900992,
 * "isOffset":false,
 * "periodType":1,
 * "printtype":2, --仅利润表加此字段
 * "recipient":"232",
 * "sender":"24334",
 * "subject":"354235",
 * "content":"4235325"}
 */
export function reportSendShareMail(post, list) {
    return post('/v1/groupReportService/sendShareMail', list)
}

/*
流水收支统计表分享 acmReport_share
url /v1/acmReport/InOutDiary/share
params = {//流水账query过滤条件
    "begindate": "2016-10-01",
    "enddate": "2016-12-01",
    "topnum": 200,
    "groupstr": "department,employee,project",
    "wherestr": ""
}
 */
export function getShareToken(post,params){
	return post('/v1/groupAcmReport/InOutDiary/share', params)
}

//流水收支统计表邮件分享
export function sendShareMail(post,params){
	return post('/v1/groupAcmReport/InOutDiary/sendShareMail',params)
}
//流水收支统计表打印
export function printPdf(post,params){
	return post('/v1/groupAcmReport/InOutDiary/print',params)
}
//流水收支统计表导出
export function exportExcel(post,params){
	return post('/v1/groupAcmReport/InOutDiary/export',params)
}
/* ***********************集团报表 end*************************** */




/* ***********************集团抵消表  start*************************** */
/**
 * 抵消报表查询数据
 * @param  {[type]} post [description]
 * @return {[type]}      [description]
 * {
    teamId：  分组id
	reportType：   报表类型 1 资产负债表，2 利润表，3 现金流量表
	dateType： 查询类型 1月 2季 3半年 4年
	date ：  日期
 * }
 */
export function getOffsetData(post, list) {
    return post('/v1/groupOffset/getOffsetData', list)
}
/**
 * 集团抵消表打印接口
 * @param  {[type]} post [description]
 * @return {[type]}      [description]
 * {"date":"2018.09:2018.09","reportType":3,"dateType":1,"teamId":5323644506598400,"printtype":"manage" --仅利润表加此字段}
 */
export function groupOffsetPrint(post, list) {
    return post('/v1/groupOffset/print', list)
}

/**
 * 集团抵消表导出接口
 * @param  {[type]} post [description]
 * @return {[type]}      [description]
 * {"date":"2018.09:2018.09","reportType":2,"dateType":1,"teamId":5323644506598400,"printtype":"manage"}
 */
export function groupOffsetExport(post, list) {
    return post('/v1/groupOffset/export', list)
}

/**
 * 集团抵消表分享接口
 * @param  {[type]} post [description]
 * @return {[type]}      [description]
 * {"date":"2018.09:2018.09","reportType":3,"dateType":1,"teamId":5323644506598400,"printtype":"manage" --仅利润表加此字段}
 */
export function groupOffsetShare(post, list) {
    return post('/v1/groupOffset/share', list)
}

/**
 * 集团抵消表发送邮件接口
 * @param  {[type]} post [description]
 * @return {[type]}      [description]
 * {
 * "date":"2018.09:2018.09",
 * "reportType":3,
 * "dateType":1,
 * "teamId":5323644506598400
 * "printtype":manage, --仅利润表加此字段
 * "account":"232",
 * "ccAccount":"24334",
 * "subject":"354235",
 * "content":"4235325"}
 */
export function groupOffsetSendShareMail(post, list) {
    return post('/v1/groupOffset/sendShareMail', list)
}
/**
 * 抵消表——手工调整查询数据
 * @param  {[type]} post [description]
 * @return {[type]}      [description]
 * {
    teamId：  分组id
	reportType：   报表类型 1 资产负债表，2 利润表，3 现金流量表
	dateType： 查询类型 1月 2季 3半年 4年
	date ：  日期
 * }
 */
export function getOffsetAdjustData(post, list) {
    return post('/v1/groupOffset/getData', list)
}

/**
 * 抵消表——手工调整——保存
 * @param  {[type]} post [description]
 * @return {[type]}      [description]
 * {
    teamId：  分组id
	reportType：   报表类型 1 资产负债表，2 利润表，3 现金流量表
	dateType： 查询类型 1月 2季 3半年 4年
	cellName：  单元格key（保存时传）
	cellValue ：  单元格value （保存时传）
	date ：  日期
 * }
 */
export function insertAdjustData(post, list) {
    return post('/v1/groupOffset/insertData', list)
}
/**
抵消表列表
*/
export function getOffsetDataList(post, list) {
    return post('/v1/groupOffset/getOffsetDataList', list)
}
/* ***********************集团抵消表  end*************************** */
