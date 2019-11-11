// 客户列表查询接口
export function query(post,current,pageSize,name){
	return post('/v1/customer/query',{'currentPage':current,'pageSize':pageSize,'name':name})
}

// 客户档案新增接口
export function create(post,list){
	return post('/v1/customer/create',list)
}


// 客户档案修改接口
export function update(post,list){
	return post('/v1/customer/update',list)
}

// 客户档案详情查询接口
export function getById(post,id){
	return post('/v1/customer/getById',{'id':id})
}

// 客户档案删除接口
export function Delete(post,id,ts,phoneOremail,customerOrgId){
	return post('/v1/customer/delete',{'id':id,'ts':ts,'phoneOremail':phoneOremail,'customerOrgId':customerOrgId})
}

//客户账套创建接口
export function account(post,id){
	return post('/v1/web/customer/account',{'id':id})
}

// 客户导入模板下载接口
export function downloadTemplet(post,id){
	return post('/v1/customer/downloadTemplet',{'id':id})
}
// 客户档案导入接口
export function importCst(post,filePath){
	return post('/v1/customer/importCst',{"filePath":filePath})
}

// 客户合同修改接口
export function createAccount(post,id){
	return post('/v1/customer/createAccount',{'id':id})
}

/**
 * 查询组织下所有客户,用于"人员->客户人员->新建人员"
 * @param post
 * @param orgId
 * @returns {*}
 */
export function getByOrgId(post, orgId){
	return post('/v1/customer/getByOrgID',{orgId: orgId.toString()})
}

//获取页面中所有的下拉框数据
export function getEnum(post){
	return post('/v1/customer/getEnum',{})
}
//获取单个字典数据
export function getEnumDetail(post,arr){
	return post('/v1/SetOrg/getEnumDetail',arr)
}

//发送后台一个id跳转到合同新增页面后用来接收公司名称
export function getByCusID(post,id){
	return post('v1/customer/getByCusID',{'id':id})
}

/**
 * 邀请管理员的接口
 * @param post
 * @param obj
 * @returns {*}
 */
export function invite(post,obj){
	return post('v1/customer/invite',obj)
}

export function reInitialization(post){
	return post('v1/SetOrg/reInitialization',{})
}