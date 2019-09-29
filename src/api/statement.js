//账户列表查询  银行对账单导入
export function getAccountList(post, bankAccountTypeId) {
	let data = {
		"isContentCash": true,
		"status":true,
		"notNeedPage": true
	}
	
	if(bankAccountTypeId) data.bankAccountTypeId = bankAccountTypeId
	
	return post('/v1/bankAccount/query', data)
}
//账户列表查询   现金银行日记帐
export function getAccountList1(post) {
	return post('/v1/bankAccount/selectCashByOrgId')
}

//对账单列表查询
export function queryList(post, data) {
	return post('/v1/acmBankReconciliatio/queryList', data)
}

//导入发票
export function invoiceLawList(post, data) {
	return post('/v1/web/invoiceLaw/list', data)
}

//导入实收款
export function actuallyReceivedLawList(post, data) {
	return post('/v1/web/actuallyReceivedLaw/list', data)
}

//对账单导入
export function imports(post, data) {
	return post('/v1/brImport/import', data)
}

//下载通用模版
export function exportTemplate(post) {
	return post('/v1/brImport/downloadTemplate')
}

//打印
export function printList(post, data) {
	return post('/v1/acmBankReconciliatio/printList', data)
}

//导出
export function exportList(post, data) {
	return post('/v1/acmBankReconciliatio/exportList', data)
}

//导入发票 导出模板
export function downloadLawTemplate(post) {
	return post('/v1/web/downloadLawTemplate', {})
}

//导入实收款 导出模板
export function downloadActuallyReceivedLawTemplate(post) {
	return post('/v1/web/downloadActuallyReceivedLawTemplate', {})
}

//导入发票 导入第一步选择文件
export function upload(post) {
	return post('/v1/web/receipt/upload', {})
}
//导入发票 导入第二步导入
export function invoiceLawImport(post, data) {
	return post('/v1/web/invoiceLaw/import', data)
}

//导入导入实收款 导入第二步导入
export function actuallyReceivedLawImport(post, data) {
	return post('/v1/web/actuallyReceivedLaw/import', data)
}
//删除
export function batchDelete(post, data) {
	return post('/v1/acmBankReconciliatio/batchDelete', data)
}


