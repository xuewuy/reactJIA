export function auth (logined = true){
	/*
	Reduce函数是AppMiddleware中间件注入的
	执行reduce(‘reducer function name’, …args)会返回一个Action行为
	然后redux Dispatch接管调用到reducer
	*/
	return ({reduce})=>reduce('auth',logined)
}


export function setCurrentAppPath(currentAppPath, props){
	window._hmt && _hmt.push && _hmt.push(['_trackPageview', '/' + currentAppPath]) //百度统计单页应用接口。 
	return ({reduce})=>reduce('setCurrentAppPath', currentAppPath, props)
}

export function clearAccessToken(){
	return ({clearAccessToken})=>clearAccessToken()
}
