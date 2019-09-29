// 客户合同列表查询接口
export function query(post,id,current,pageSize){
	return post('/v1/contract/query',{'id':id,'currentPage':current,'pageSize':pageSize})
}

// 客户合同详情查询接口
export function getByID(post,id){
	return post('/v1/contract/getByID',{'id':id})
}

//客户合同新增接口
export function create(post,list){
	return post('/v1/contract/create',list)
}

// 1.1.12   客户合同修改
export function update(post,list){
	return post('/v1/contract/update',list)
}

// 1.1.13   客户合同删除
export function Delete(post,id,customerId,ts){
	return post('/v1/contract/delete',{'id':id,'customerId':customerId,'ts':ts})
}

// 1.1.14   客户合同终止
export function stop(post,id,customerId,ts){
	return post('/v1/contract/stop',{'id':id,'customerId':customerId,'ts':ts})
}

// 1.1.XX   支付详情接口
export function getByDetailId(post,contractDetailId){
    return post('/v1/contract/getByDetailId',{'contractDetailId':contractDetailId})
}