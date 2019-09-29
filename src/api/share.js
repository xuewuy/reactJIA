//分享相关接口

/*
流水账分享 acmReport_share
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
	return post('/v1/acmReport/InOutDiary/share', params)
}

/*
获取分享数据 getShareData
url /v1/acmReport/InOutDiary/getShareData
params 	= {"shareFileToken": "XXXX"} 
*/
export function getShareData(post,params){
	return post('/v1/acmReport/InOutDiary/getShareData',params)
}

//邮件分享
export function sendShareMail(post,params){
	return post('/v1/acmReport/InOutDiary/sendShareMail',params)
}
//微信签名
export function getJsSignInfo(post,  url){
	return post('/v1/mobile/getJsSignInfo',{url})
}