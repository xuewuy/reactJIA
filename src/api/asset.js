/**
 * Created by Administrator on 2016/11/9.
 */
/**
 *    资产管理接口
 */

/**
 *资产管理查询：
 *@param  type post
 *@param  url  /v1/fiAsset/findAssetList
 *@param  json
 * */
export function getdata(post, json) {
    return post('/v1/fiAsset/findAssetList', json)
}

/**
 *资产管理查询条件初始化：
 *@param  type post
 *@param  url  /v1/fiAsset/findAssetListQueryInit
 *@param  json
 */
export function getQueryList(post, json) {
    return post('/v1/fiAsset/findAssetListQueryInit', json)
}


/**
 *资产管理新增初始化：
 *@param  type post
 *@param  url  /v1/fiAsset/init
 *@param  json {
"assetType":"200001"//assetType [资产类别 ]: 固定资产:200001;无形资产:200002;生产性生物资产:200003;长期待摊费用:200004
 }*/
export function addInit(post, json) {
    return post('/v1/fiAsset/init', json)
}

/**
 *资产管理新增切换资产类型：
 *@param  type post
 *@param  url  /v1/fiAsset/assetTypeChange
 *@param  json {
"assetType":"200001"//assetType [资产类别 ]: 固定资产:200001;无形资产:200002;生产性生物资产:200003;长期待摊费用:200004
 }*/
export function changeAssetType(post, json) {
    return post('/v1/fiAsset/assetTypeChange', json)
}


/**
 *获取开始折旧期间：
 *@param  type post
 *@param  url  /v1/fiAsset/getBeginPeriod
 *@param  json { }*/
export function getBeginPeriod(post, json) {
    return post('/v1/fiAsset/getBeginPeriod', json)
}

/**
 *资产管理根据id获取固定资产进行修改：
 *@param  type post
 *@param  url  /v1/fiAsset/getById
 *@param  json {
    "id": 2000577846708224
}*/
export function getById(post, json) {
    return post('/v1/fiAsset/getById', json)
}

/**
 *资产管理修改接口：
 *@param  type post
 *@param  url  /v1/fiAsset/update
 *@param  json
 * */
export function update(post, json) {
    return post('/v1/fiAsset/update', json)
}

/**
 *资产管理删除数据接口：
 *@param  type post
 *@param  url  /v1/fiAsset/delete
 *@param  json [{"id": 1998490740525056, "ts": 2017-02-16 13:10:02 }]*/
export function dataDelete(post, json) {
    return post('/v1/fiAsset/delete', json)
}

/**
 *固定资产新增：
 *@param  type post
 *@param  url  /v1/fiAsset/create
 *@param  json*/
export function assetCreate(post, json) {
    return post('/v1/fiAsset/create', json)
}

/**
 *固定资产变更：
 *@param  type post
 *@param  url  /v1/fiAsset/changeFiAsset
 *@param  json{
        "code": "01001",//编码
        "name": "生产机器A301",//资产名称
		"assetClassId":1,//资产分类 id
        "specification": "规格一",//规格型号
		"assetTypeId":1,//资产类别id
		"beginPeriod":"2017-02",//开始使用期间
		"depreciationYear":"2017",//预计折旧年
		"depreciationMonth":"02",//预计折旧月
		"salvageRate":"5",//净残值率(%)
		"depreciationFunctionId":11,//折旧方法id
		"origValue":3000,//原值
		"deductionTypeId":22,//抵扣方式
		"taxDeductible":200,//进项税额
		"buyDate":"2016-02-13",//购置日期
		"inventoryId":2,//存货id
		"quantity":1,//数量
		"unitId":1,//计量单位id
		"departmentId":22,//使用部门id
		"projectId":20,//核算项目id
		"personId":3,//保管人id
		"addTypeId":2,//增加方式id
		"memo":"aaa",//备注
		"totleDepreciation":1,//已提折旧
		"useScopeId":22,//使用范围
        "produceRatio": 1//生产所占比重
  }*/
export function changeFiAsset(post, json) {
    return post('/v1/fiAsset/changeFiAsset', json)
}

/**
 *固定资产获取附件信息：
 *@param  type post
 *@param  url  /v1/fiAsset/getEnclosure
 *@param  json{"cardId": 1}*/
export function getEnclosure(post, json) {
    return post('/v1/fiAsset/getEnclosure', json)
}

/**
 *固定资产附件删除、新增：
 *@param  type post
 *@param  url  /v1/fiAsset/updateEnclosure
 *@param  json{{
    "cardId":1,//固定资产卡片id
    "id": 2038147104966656,//
    "enclosureId": 2038147104966656,
    "operateStatus": 3,//3：删除；1：增加
    "ts": "2017-02-23 09:45:44"
}*/
export function updateEnclosure(post, json) {
    return post('/v1/fiAsset/updateEnclosure', json)
}


/**
 *待处置的资产列表：
 *@param  type post
 *@param  url  /v1/fiAsset/findDisposeList
 *@param  json {
"assetType":"200001"//assetType [资产类别 ]: 固定资产:200001;无形资产:200002;生产性生物资产:200003;长期待摊费用:200004
 }*/
export function assetList(post, json) {
    return post('/v1/fiAsset/findDisposeList', json)
}

/**
 *固定资产处置
 *@param  type post
 *@param  url  /v1/fiAsset/assetDispose
 *@param  json [
 {
     "id": 1998490740525056,
     "assetReduceTypeid": 600001,
     "memo": "aaa"
 }
 ]*/
export function assetDispose(post, json) {
    return post('/v1/fiAsset/assetDispose', json)
}
/**
 *历史列表
 *@param  type post
 *@param  url  /v1/fiAsset/findHistoryList
 *@param  json [
 {
     "id": 1998490740525056,
     "assetReduceTypeid": 600001,
     "memo": "aaa"
 }
 ]*/
export function assetHistory(post, json) {
    return post('/v1/fiAsset/findHistoryList', json)
}

/**
 *资产处置清单查询
 *@param  type post
 *@param  url  /v1/fiAsset/findDisposeListQueryInit
 *@param  json {}*/
export function findDisposeListQueryInit(post, json) {
    return post('/v1/fiAsset/findDisposeListQueryInit', json)
}

/**
 *固定资产计提折旧
 *@param  type post
 *@param  url  /v1/fiAsset/depreciation
 *@param  json { 
"period":"2017-02"  //期间 
}*/
export function depreciation(post, json) {
    return post('/v1/fiAsset/depreciation', json)
}

/**
 *固定资产计提折旧列表
 *@param  type post
 *@param  url  /v1/fiAsset/depreciationList
 *@param  json { 
"period":"2017-02"  //期间 
}*/
export function depreciationList(post, json) {
    return post('/v1/fiAsset/depreciationList', json)
}

/**
 *资产明细报表 初始化
 *@param  type post
 *@param  url  /v1/assetDetailRpt/init
 *@param  json { }*/
export function assetDetailRptInit(post, json) {
    return post('/v1/assetDetailRpt/init', json)
}

/**
 *资产明细报表 查询
 *@param  type post
 *@param  url  /v1/assetDetailRpt/query
 *@param  json { }*/
export function assetDetailRptQuery(post, json) {
    return post('/v1/assetDetailRpt/query', json)
}

/**
 *资产类别统计表 初始化
 *@param  type post
 *@param  url  /v1/assetClassSumRpt/init
 *@param  json { }*/
export function assetClassSumRptInit(post, json) {
    return post('/v1/assetClassSumRpt/init', json)
}

/**
 *资产类别统计表 查询
 *@param  type post
 *@param  url  /v1/assetClassSumRpt/query
 *@param  json {
    "startYear": 2017,
    "startMonth": 1,
    "endYear": 2017,
    "endMonth": 2,
    "assetTypeId": 100001,
    "assetClassId": 100001
}*/
export function assetClassSumRptQuery(post, json) {
    return post('/v1/assetClassSumRpt/query', json)
}

/**
 *固定资产计提折旧提交
 *@param  type post
 *@param  url  /v1/fiAsset/depreciationToDoc
 *@param  json { }*/
export function depreciationToDoc(post, json) {
    return post('/v1/fiAsset/depreciationToDoc', json)
}

/**
 *处置的资产提交
 *@param  type post
 *@param  url  /v1/fiAsset/disposeSubmit
 *@param  json {
    "ids": "1,2,3"
}*/
export function disposeSubmit(post, json) {
    return post('/v1/fiAsset/disposeSubmit', json)
}

/**
 *取消处置
 *@param  type post
 *@param  url  /v1/fiAsset/disposeCancel
 *@param  json {
    "ids": "1,2,3"
}*/
export function disposeCancel(post, json) {
    return post('/v1/fiAsset/disposeCancel', json)
}

/**
 *资产处置清单
 *@param  type post
 *@param  url  /v1/fiAsset/disposeDetaileList
 *@param  json {
    "id": 2,
    "assetTypeId": 400001,
    "beginDate": "2017-02-01 00:00:00",
    "endDate": "2017-02-09 00:00:00",
    "assetReduceTypeid": 600001
}*/
export function disposeDetaileList(post, json) {
    return post('/v1/fiAsset/disposeDetaileList', json)
}

/**
 *资产卡片导入模板 下载
 *@param  type post
 *@param  url  /v1/fiAsset/exporttemplate
 *@param  json*/
export function exporttemplate(post) {
    return post('/v1/fiAsset/exporttemplate', {})
}

export function assetDetailRptPrint(post,list){
    return post('/v1/assetDetailRpt/print',list)
}
export function assetDetailRptExport(post,list){
    return post('/v1/assetDetailRpt/export',list)
}
export function assetClassSumRptPrint(post, assetTypeId,startYear,startMonth,endYear,endMonth,containNoDepreciation){
    return post('/v1/assetClassSumRpt/print', {assetTypeId,startYear,startMonth,endYear,endMonth,containNoDepreciation})
}
export function assetClassSumRptExport(post, assetTypeId,startYear,startMonth,endYear,endMonth,containNoDepreciation){
    return post('/v1/assetClassSumRpt/export', {assetTypeId,startYear,startMonth,endYear,endMonth,containNoDepreciation})
}
export function exportAssetList(post, assetTypeId, addTypeId, depreciationFunctionId, beginDate, endDate, hasDisposalAsset,id) {
    return post('/v1/fiAsset/exportAssetList',{assetTypeId, addTypeId, depreciationFunctionId, beginDate, endDate, hasDisposalAsset,id})
}
export function printAssetList(post, assetTypeId, addTypeId, depreciationFunctionId, beginDate, endDate, hasDisposalAsset,id) {
    return post('/v1/fiAsset/printAssetList',{assetTypeId, addTypeId, depreciationFunctionId, beginDate, endDate, hasDisposalAsset,id})
}

export function exportDepreciationList(post, period) {
    return post('/v1/fiAsset/exportDepreciationList',{period})
}
export function exportDisposeDetaileList(post, list) {
    return post('/v1/fiAsset/exportDisposeDetaileList',list)
}
export function printDepreciationList(post, period) {
    return post('/v1/fiAsset/printDepreciationList',{period})
}
export function pirntDisposeDetaileList(post, list) {
    return post('/v1/fiAsset/pirntDisposeDetaileList',list)
}
//资产处置，处置方式初始化，获取下拉项
export function AssetDisposeInit(post) {
    return post('/v1/fiAsset/AssetDisposeInit',{})
}
//已处置清单 查看 收入费用
export function assetDisposeDetaile(post,list) {
    return post('/v1/fiAsset/assetDisposeDetaile',list)
}
//凭证跳转已处置清单 转换id
export function journalDisposeDetail(post, list) {
    return post('/v1/fiAsset/journalDisposeDetail', list)
}