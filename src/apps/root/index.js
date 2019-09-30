import React from 'react'
import {AppLoader} from '../../appLoader'

export default class RootComponent extends React.Component{

	constructor(props){
		super(props)

		this.handleRedirect =this.handleRedirect.bind(this)
		let appPath = document.location.hash.replace("#","") || document.location.pathname || ""
debugger
		if(appPath.indexOf("app/")==0){
			if(appPath[appPath.length-1]=="/") appPath = appPath.substring(0,appPath.length-1)
			this.props.setCurrentAppPath(appPath, {})
		}else{
			if(sessionStorage["root/logined"]=="1"){
				this.handleLoginSuccess('app/portal', true);
			}else{
				this.props.setCurrentAppPath('app/login/login', {}) //转登录页
			}
		}

		let that = this
		PubSub.subscribe('redirect',function(msg, data){
			if(data.path=="app/login/login"){
				that.handleLogoutSucess()
				if(data.version){
					window.localStorage["version"] = data.version;
				}
			}
			that.handleRedirect(location.hash.split('?')[1] ? (data.path + '?' + location.hash.split('?')[1]) : data.path,true)
		})

		window.onhashchange = function(){
			let hash = document.location.hash || ''
			if(hash.indexOf("app/")==-1)return;
			if(hash.indexOf('fromAction') == -1){
				that.props.setCurrentAppPath(hash.substr(1), {})
			}else{
				that.props.setCurrentAppPath(hash.substr(1), {})
			}
		}
	}


	handleLoginSuccess(redirectAppPath, appProps){
		//Action Export的方法已经被注入到component,可以this.props.action(…args)直接调用
		//this.props.auth(true)
		sessionStorage["root/logined"] = "1";
		sessionStorage["root/loginedAppProps"] = appProps;
		this.handleRedirect(redirectAppPath, appProps)
	}

	handleLogoutSucess(onlineServiceUrl){
		//this.props.auth(false)
		sessionStorage["root/logined"] = "0";
		sessionStorage["root/loginedAppProps"] = null;
		localStorage["currentUserName"] = null;
		window.rrUser && window.rrUser.clearToken();
		this.props.clearAccessToken();
        if(onlineServiceUrl) return location=onlineServiceUrl

        let path ='app/login/login?fromAction=false'
        if(location.hash.split('?')[1]) {
           path += '&' + location.hash.split('?')[1]
        }
        this.handleRedirect(path, true)
	}

	handleRedirect(appPath, props){
		if(props===true){
			location.hash = appPath
			let version = window.localStorage["version"];
			if(version && location.search.indexOf(version)==-1){
				// location.search = "?v=" + version
				// if(location.search.indexOf('h=dz')!=-1) {//为了防止服务商跳转注册时将地址参数h=dz去掉
				/*
				
				//应用302技术将main.js转到最新的main.xxxx.js上去，而不再用?v=xxxx的方式跳过浏览器缓存 lsg

				if(location.search.indexOf('h=')!=-1) {//为了防止服务商跳转注册时将地址参数h=dz去掉
					location.search = location.search + "&v=" + version					
				} else {
					location.search = "?v=" + version					
				}
				*/
			}
		}else{
			this.props.setCurrentAppPath(appPath, props)
		}
	}

	render(){


		//App按path隔离的state在this.props.payload中获取
		let currentAppPath = this.props.payload.get('currentAppPath') || 'apps/login/landing',
			currentAppProps = this.props.payload.get('currentAppProps') || {}
			debugger
		// apps/portal
		// ref={currentAppPath}
		// path={currentAppPath}
		return (
			<AppLoader
				ref={currentAppPath}
			 	path={currentAppPath}
				onLogoutSucess = {::this.handleLogoutSucess }
				onLoginSuccess= {::this.handleLoginSuccess }
				onRedirect={::this.handleRedirect}
				{...currentAppProps}
			/>
		)
		/*
		//从root应用状态中获取是否登录标志
		let isLogined = this.props.payload.get('isLogined') || false
		//已经登录加载portal应用，未登录显示登录应用
		return (isLogined ?
			<AppLoader path='apps/portal'
				onLogoutSucess = { ::this.handleLogoutSucess }
			/>:
			<AppLoader path='apps/login'
				ref='login'
				version='pro'
				onLoginSuccess= { ::this.handleLoginSuccess }
			/>
	 	)*/
	}
}
