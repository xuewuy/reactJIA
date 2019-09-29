/**
 * Created by Administrator on 2016/11/9.
 */
/**
 *	账簿接口
 */

/**
 *科目余额表：
 *@param  type post
 *@param  url  /v1/fisumaccountrpt/query
 *@param  json {"beginYear": 2015,"beginPeriod": 1,"endYear": 2016,"endPeriod": 12,"beginAccountCode": "1001","endAccountCode": "1002","beginAccountGrade": 1,
    "endAcoountGrade": 3,"onlyShowEndAccount": false,"showZero": false}
 */
export function getdata(post, json){
    return post('/v1/fireport/balancesumrpt/query', json)
}

/*
 辅助-科目余额表：
 @param　type post
 @param  url /v1/fireport/balanceauxrpt/query
 @param  json{"beginYear": 2015, "beginPeriod": 1, "endYear": 2016, "endPeriod": 12, "accountCodeList":["1002"]", beginAccountGrade": 1, "endAccountGrade": 3, "auxInfo": ["bankAccountId:1"], "showZero": true, "searchType": 0, "includeSum": true}
  auxInfo辅助核算项，选中哪辅助项 ，则传哪些：
     部门departmentId；
     职员personId；
     客户 customerId；
     供应商 supplierId；
     项目 projectId；
     存货 inventoryId；
     银行账号 bankAccountId
 */
export function queryDataList(post,params){
    return post('/v1/fireport/balanceauxrpt/query',params)
}

/**
 * 余额表
 * 根据查询条件打印
 * @param  {[type]} post   [description]
 * @param  {[type]} list   [description]
 */
export function print(post, list){
    return post('/v1/fireport/balancesumrpt/print', list)
}

/**
 * 余额表
 * 根据查询条件导出
 * @param  {[type]} post   [description]
 * @param  {[type]} list   [description]
 */
export function exportExcel(post, list){
    return post('/v1/fireport/balancesumrpt/export', list)
}



/**
 * 辅助余额表余额表
 * 根据查询条件打印
 * @param  {[type]} post   [description]
 * @param  {[type]} list   [description]
 */
export function auxBalancesPrint(post, list){
    return post('/v1/fireport/balanceauxrpt/print', list)
}

/**
 * 辅助余额表
 * 根据查询条件导出
 * @param  {[type]} post   [description]
 * @param  {[type]} list   [description]
 */
export function auxBalancesExport(post, list){
    return post('/v1/fireport/balanceauxrpt/export', list)
}

/**
 * 余额表 
 * 分享
 * @param  {[type]} post   [description]
 * @param  {[type]} list   {
            "beginYear" = "2015",
            "beginPeriod"= "1",
            "endYear"= "2016",
            "endPeriod" = "12",
            "beginAccountCode"= "1001",
            "endAccountCode"= "1002",
            "accountCodeList"="1001"&accountCodeList="1002"
            "currencyId": "0",
            "beginAccountGrade"= "1",
            "endAccountGrade"= "3",
            "auxInfo"="departmentId:1563866424739841"&auxInfo="personId:1000001"
            "showZero": "true",
            "searchType": "0",
            "printType":"4"
            "includeSum": "true"
     }
 */
export function share(post, list){
    return post('/v1/fireport/balancesumrpt/share', list)
}
/**
 * 余额表 
 * 发送分享邮件
 * @param  {[type]} post   [description]
 * @param  {[type]} list   {
            "beginYear" = "2015",
            "beginPeriod"= "1",
            "endYear"= "2016",
            "endPeriod" = "12",
            "beginAccountCode"= "1001",
            "endAccountCode"= "1002",
            "accountCodeList"="1001"&accountCodeList="1002"
            "currencyId": "0",
            "beginAccountGrade"= "1",
            "endAccountGrade"= "3",
            "auxInfo"="departmentId:1563866424739841"&auxInfo="personId:1000001"
            "showZero": "true",
            "searchType": "0",
            "printType":"4"
            "includeSum": "true"
     }
 */
export function sendShareMail(post, list){
    return post('/v1/fireport/balancesumrpt/sendShareMail', list)
}

