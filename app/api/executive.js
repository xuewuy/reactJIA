// 定期凭证查询接口
export function query(post, list){
	return post('/v1/fiJournalTimer/query', list)
}

// 定期凭证批量删除接口
export function deleteBatch(post, list){
	return post('/v1/fiJournalTimer/deleteBatch', list)
}

// 定期凭证 单条定期凭证删除接口
export function deleteById(post, list){
	return post('/v1/fiJournalTimer/deleteById', list)
}

//定期凭证 删除某条分录接口
export function deleteDetailById(post, list){
	return post('/v1/fiJournalTimer/deleteDetailById', list)
}

//定期凭证 删除多条分录接口
export function deleteDetailBatch(post, list){
	return post('/v1/fiJournalTimer/deleteDetailBatch', list)
}

// 定期凭证批量 立即执行
export function execBatch(post, list){
	return post('/v1/fiJournalTimer/execBatch', list)
}

// 定期凭证一条 立即执行
export function exec(post, list){
	return post('/v1/fiJournalTimer/exec', list)
}

// 新增定期凭证
export function insert(post, list){
	return post('/v1/fiJournalTimer/insert', list)
}

// 修改编辑 定期凭证
export function update(post, list){
	return post('/v1/fiJournalTimer/update', list)
}

/**
* 查询科目
* @param  orgId 组织机构id
* @param  accountTypeId   科目类型id(可选)
* @returns {*} /v1/baseArchive/query
*/
export function accountQuery(post, orgId, isEndNode, status){
	return post('/v1/account/queryForAux', {orgId:orgId, isEndNode, status})
 }

 export function accountQueryByAux(post, orgId, isEndNode, status,isAuxAccDepartment,
	isAuxAccPerson,isAuxAccCustomer,isAuxAccSupplier,isAuxAccInventory,isAuxAccProject,isAuxAccBankAccount,
	isAuxAccLevyAndRetreat,isAuxAccInputTax,isAuxAccBusiness,isAuxAccLawyer,isAuxAccTbFee){
	return post('/v1/account/queryByAux', {orgId:orgId, isEndNode, status,isAuxAccDepartment,
		isAuxAccPerson,isAuxAccCustomer,isAuxAccSupplier,isAuxAccInventory,isAuxAccProject,isAuxAccBankAccount,
		isAuxAccLevyAndRetreat,isAuxAccInputTax,isAuxAccBusiness,isAuxAccLawyer,isAuxAccTbFee})
 }

 // 查询所有辅助项接口
export function baseArchiveQuery(post, list){
	return post('/v1/baseArchive/query', list)
}

 // 查询所有辅助项接口
 export function queryById(post, list){
	return post('/v1/fiJournalTimer/queryById', list)
}