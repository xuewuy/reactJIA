
//检测帐户是否存在
export function isExist(post,user){
	if(typeof user != 'object'){
		user = {'account':user}
	}
	return post('/v1/user/isExist',user)
}

// 用户注册
export function create(post,data){
	return post('/v1/user/create',data,null,true) //不能带token，
}
// 用户注册   Swy
export function inviteReg(post,data){
	return post('/v1/user/inviteReg',data,null,true) //不能带token，
}

// 我的易嘉人设置
export function updateEntrance(post,code){
	return post('/v1/user/updateEntrance',{'entrance':code})
}

// 用户找回密码提交新密码信息
export function resetPassword(post,confirm,account,password,passwordStrength,appId){

	return post('/v1/user/resetPassword',{"confirmCode":confirm,"account":account,"password":password,'passwordStrength':passwordStrength,'appId':appId})
}
//校验登录密码
export function checkPassword(post,obj){
	return post('/v1/user/checkPassword',obj)
}

//用户登录
export function login(post,user,pwd,orgId,domain){
	let obj = orgId ? {"account":user, "password":pwd,"orgId":orgId,"domain":domain} : {"account":user, "password":pwd,"domain":domain}
	return post('/v1/user/login',obj)
}

//账无忌二维码登录
export function zhwujiLogin(post,code){
	return post('/v1/user/login',{authorization_code:code})
}

//退出登录
export function logout(post){
	return post('/v1/user/logout',{})
}

//检验手机或邮箱是否已经被绑定
export function isExistBind(post,user){ 
	return post('/v1/user/isExistBind',{'account':user})
}

//绑定手机或邮箱
export function bindAcount(post,user){
	console.log(user)
	return post('/v1/user/bindAcount',{'account':user})
}
//修改手机或邮箱
export function updateBindAcount(post,user,pwd){
	console.log(user)
	return post('/v1/user/updateBindAcount',{'account':user,'password':pwd})
}

//修改绑定前校验密码
export function validatePassword(post,pwd){
	return post('/v1/user/validatePassword',{'password':pwd})
}

//获取用户信息
export function getById(post){
	return post('/v1/user/getById')
}

//创建企业用户
export function companyCreate(post,list){
	return post('/v1/user/companyCreate',list)
}

//更新个人基础信息
export function update(post,list){
	return post('/v1/user/update',list)
}

export function query(post,obj){
	return post('/v1/user/query',obj)
}

//用户信息导出
export function queryExport(formPost,list) {
	return formPost('/v1/user/queryExport',list)
}
//新增用户信息统计查询
export function analyze(post,obj){
	return post('/v1/user/analyze',obj)
}
//新增用户统计导出
export function analyzeExport(formPost,obj){
	return formPost('/v1/user/analyzeExport',obj)
}
//新增用户统计导出
let LOG_OPERATIONS = []
let LOG_LASTTIME = new Date()
let LOG_TIMER = null
export function log(post, operations, forcePost){
	const deviceId = localStorage["deviceid"]
	if(operations){
		if(operations[0] &&operations[0].url &&operations[0].url == "/v1/user/log" )return;
		operations.map(v=>{
			v.deviceId = deviceId 
			v.actionTime = Date2String(v.actionTime) 
			v.source = (location && location.href && location.href.indexOf('source=fxhtop') != -1) ? 'fxhtop' : undefined //与清源金科金融平台合作,生成统计链接 add by zq 2018-08-15
			LOG_OPERATIONS.push(v)
		})
	}
	if(!LOG_TIMER){
		LOG_TIMER = window.setInterval(() => log(post),20000);
		window.addEventListener && window.addEventListener("beforeunload", function( event ) {
			 //log(post, null, true);
			 if(LOG_OPERATIONS.length > 0 && window.$ && $.ajax){
				 $.ajax({
					 type: "post", url: "/v1/user/log", async: false, contentType: "application/json", data: JSON.stringify(LOG_OPERATIONS),
				 })
			 }
		});
	}
	let postTimeSpan = ((new Date()).getTime() - LOG_LASTTIME.getTime())/1000;
	if(LOG_OPERATIONS.length>0 && (deviceId == null || LOG_OPERATIONS.length>10 || postTimeSpan > 60 || forcePost === true)){
		let postOperation = LOG_OPERATIONS
		LOG_OPERATIONS = []
		LOG_LASTTIME = new Date()
		return post('/v1/user/log', postOperation).then((r)=>{
			if(r && r.result){
				localStorage["deviceid"] = r.value
			}
		})
	}
}
function Date2String(d){
	if(!d || !d.getHours) return d  
		
	d.setHours(d.getHours() - d.getTimezoneOffset()/60)  
	let str = JSON.stringify(d)
	str = str.replace(/\"/g,'').replace('T',' ').replace('Z','')
	return str
}
if(location.search.indexOf("nolog")==-1){
	window.__log = log;
}

// 获取最新的账无忌二维码和code
export function getConfirmCode(post){
    return post('/v1/user/getConfirmCode')
}

/**
 * [checkRegCode 企业注册时校验邀请码]
 * @param  {[type]} post [description]
 * @param  {[type]} code [description]
 * @return {[type]}      [description]
 */
export function checkRegCode(post,code){
	return post('/v1/regCode/checkRegCode',{reqCode:code})
}

//账无忌扫码登录接口
export function queryQRCode(post,obj){
	return post('/v1/user/queryQRCode',obj)
}
//账无忌设向指定手机号发送确认登录请求{"mobile": "18000000000","confirmCode": "ad121sdf1313"}
export function sendQRCode(post,obj){
	return post('/v1/user/sendQRCode',obj)
}
