export const statusType = {
	normal:{value:2, label:'未审核'},
	audit:{value:3, label:'已审核'},
	draft:{value:1, label:'暂存'},
	reject:{value:4, label:'驳回'},
}

export const sourceVoucherType = {
	lsz:{id:109, name:'流水账'},
	gzd_gz_jt:{id:100001, name:'工资单-工资-计提'},
	gzd_sb_jt:{id:100002, name:'工资单-社保-计提'},
	gzd_zfgjj_jt:{id:100003, name:'工资单-住房公积金-计提'},
	gzd_gz_ff:{id:100004, name:'工资单-工资-发放'},
	gzd_sb_jn:{id:100005, name:'工资单-社保-缴纳'},
	gzd_zfgjj_jn:{id:100006, name:'工资单-住房公积金-缴纳'},
	gzd_gs_jn:{id:100007, name:'工资单-个税-缴纳'},
}

export const sortTypes ={
	default:{id:0, name:'默认'},
	bizDateDesc:{id:1, name:'业务日期从大到小'},
	bizDateAsc:{id:2, name:'业务日期从小到大'},
	amountDesc:{id:3, name:'金额从大到小'},
	amountAsc:{id:4,name:'金额从小到大'}
}

export function getOrderString(sortTypeId){
	if(sortTypeId == sortTypes.default.id)
		return ''
	
	if(sortTypeId == sortTypes.bizDateDesc.id)
		return 'inAccountDate desc'

	if(sortTypeId == sortTypes.bizDateAsc.id)
		return 'inAccountDate'

	if(sortTypeId == sortTypes.amountDesc.id)
		return 'taxInclusiveAmount desc'

	if(sortTypeId == sortTypes.amountAsc.id)
		return 'taxInclusiveAmount'
}
