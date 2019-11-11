//流水账收支报表数据请求
//url: /v1/acmReport/InOutDiary/query
//params:{
//     "begindate": "2016-10-01",
//     "enddate": "2016-12-01",
//     "topnum": 200,
//     "groupstr": "department,employee,project",
//     "wherestr": ""
// }
export function queryInOutDiary(post,json){
	let params = json? json:{
	    "begindate": "2016-10-01",
	    "enddate": "2016-12-01",
	    "topnum": 200,
	    "groupstr": "employee,project",
	    "wherestr": ""
	}
	return post('/v1/acmReport/InOutDiary/query',params)
}

//查询条件项目类型的请求
// url /v1/acmReport/getUsedAuxitem
export function getUsedAuxitem(post){
	return post('/v1/acmReport/getUsedAuxitem')
}

export function printPdf(post,params){
	return post('/v1/acmReport/InOutDiary/print',params)
}
export function exportExcel(post,params){
	return post('/v1/acmReport/InOutDiary/export',params)
}