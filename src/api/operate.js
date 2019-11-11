
//邀请码查询
export function queryRegCodeList(post,list){
	return post('/v1/regCode/queryRegCodeList',list)
}

//邀请码导出
export function exportData(formPost,list){
	return formPost('/v1/regCode/exportData',list)
}

//批量生成邀请码
export function makeReqCodes(formPost,list){
	return formPost('/v1/regCode/makeReqCodes',list)
}

// 查询运营人员角色信息列表
export function queryOperateAuthList(post,list){
	return post('/v1/operateAuth/queryOperateAuthList',list)
}
// 获取所有运营角色
export function getAllRole(post,list){
	return post('/v1/operateAuth/getAllRole ',list)
}
// 新增运营人员的运营角色
export function insertRole(post,list){
	return post('/v1/operateAuth/insert',list)
}
// 查询运营人员的运营角色
export function roleById(post,list){
	return post('/v1/operateAuth/queryById',list)
}
// 修改运营人员的运营角色
export function roleUpdate(post,list){
	return post('/v1/operateAuth/update',list)
}
// 删除运营人员的运营角色
export function roleDelete(post,list){
	return post('/v1/operateAuth/delete',list)
}
//更改直播内容
export function SetFileSaveInsert(post,list){
	return post('/v1/liveInfo/saveLive',list)
}
//查询直播内容
export function SetFileSaveSearch(post,list){
	return post('/v1/liveInfo/queryLive',list)
}

 