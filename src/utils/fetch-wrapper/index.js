import * as requestHelpers from './src/request-creator-helpers.js';
import fetchWrapper from './src/fetch-wrapper.js';
import config from '../../../web.config.js'
import { isAcrobatInstalledInIE } from './checkPdfPlugin'

// base
const postReq = requestHelpers.postReq;
const getReq = requestHelpers.getReq;
const putReq = requestHelpers.putReq;
const delReq = requestHelpers.delReq;
const postAuthReq = requestHelpers.postAuthReq;
const putAuthReq = requestHelpers.putAuthReq;
const getAuthReq = requestHelpers.getAuthReq;
const delAuthReq = requestHelpers.delAuthReq;
const sendRequest = fetchWrapper;
var accessToken = ''

export function getAccessToken(){
	return sessionStorage['_accessToken']||'';
}

export function setAccessToken(token){
	sessionStorage['_accessToken'] = token;
}

export function clearAccessToken(){
	sessionStorage['_accessToken'] = ''
}

export function setApiRootPath(path){
	//path支持三种形式：abc  abc.  http://abc.com  ==>  /abc/v1/  https://abc.rrtimes.com/v1/ http://abc.com/v1/
	if(path && path[path.length-1]==".") path = "https://"+path+"rrtimes.com";
	else if(path && path.indexOf('/') != 0 && path.indexOf("http")!=0) path = "/" + path;
	sessionStorage['_apiRootPath'] = path;
}


function formatUrl(url){
	var rootPath = sessionStorage['_apiRootPath'] || config.RootPath;
	if(url.indexOf('/') == 0) {
		url = rootPath + url;
	}
	else if(url.indexOf("http") != 0){
		url = rootPath + '/' + url;
	}
	return url;
}

// utils
export const get = (url, header) => {
	url = formatUrl(url);
	return new Promise((resolve, reject) => sendRequest({
		request: getReq(url, header),
		responseType: 'json',
		onSuccess: resolve,
		onError: reject
	}));
};

export const formPost = (url, data, isFree, isOpen) => {

	data = data || {};
	var accessToken = getAccessToken();//toke in sessionStorage
	if(window.Blob && window.URL && location.href.indexOf('?file')!=-1){ 
		let header = {} 
		if(!isFree){
			header.token = accessToken
		}
		if(data){
			url+='?'+ Object.keys(data).map(k=>k+'='+encodeURI(data[k])).join('&')
		}
		return new Promise((resolve, reject) => sendRequest({
			request: postReq(url, data, header),
			responseType: 'file', 
			isOpen: isOpen,
			onError: reject
		}));
	}


	if( !!accessToken && !isFree){
		data.token = accessToken;
	}

	var postForm = document.createElement("form");//表单对象
	postForm.method="post" ;
	postForm.action = formatUrl(url) ;
	postForm.target = "_blank" ;

	var keys = Object.keys(data)

	for(var k of keys){
			var emailInput = document.createElement("input") ; //email input
			emailInput.setAttribute("name", k) ;
			emailInput.setAttribute("value", data[k]);
			postForm.appendChild(emailInput) ;
	}

	document.body.appendChild(postForm) ;
	postForm.submit() ;
	document.body.removeChild(postForm) ;
}

export const printPost = (url, data, isFree) => {
	//IE浏览器访问时，判断是否安装pdf插件，没有安装pdf插件直接弹出消息并下载。
	if(!isAcrobatInstalledInIE()) return
	return formPost(url,data,isFree,true);
}

export const post = (url, data, header, isFree) => {
	url = formatUrl(url);
	var backendserver="";
	var hash = window.location.hash;
	if(hash && hash.indexOf("server=")!=-1){
		backendserver = "http://" + hash.substr(hash.indexOf("=") + 1);
	}
	//转发本地端口
	var apiInfo = window.__dev_webapi;
	if(apiInfo && !!apiInfo.proxy && url.indexOf("/v1/")==0){
		if(apiInfo.proxy.indexOf("http://")==0){
			backendserver = apiInfo.proxy;
		}else{
			var arr = url.substr(3).split("/");
			arr.pop();arr.push("");
			var key = apiInfo.proxy+","+arr.join("/");
			if(apiInfo.projapis[key]){
				//本地的tomcat
				if(!backendserver)backendserver = "http://127.0.0.1:" + apiInfo.port  ;
				url = "/" + apiInfo.proxy + url.substr(3);
			}else{
				backendserver = "";
			}
		}
	}
	if(backendserver){
		url = backendserver + url;
	}
	accessToken = getAccessToken();//toke in sessionStorage
	if( !!accessToken && !isFree){
		header = header || {};
		if(!header.token){ //toke in header is first
			header.token = accessToken;
		}
	}
	let recordId = null;
	if(window.__record){
		recordId = window.__record(url,data);
	}else{
		console.log("__post('"+url+"',"+JSON.stringify(data)+")");//TODO:remove on release
	}
	let actionName = "";
	if(window.__log){
		if(window.event && window.event.target)actionName = window.event.target.innerText;
		window.__log(post,[{url:url,pageName:location.appName,actionName,actionTime:new Date()}])
	}
	return new Promise((resolve, reject) => sendRequest({
		request: postReq(url, data, header),
		responseType: 'json',
		onSuccess: (ajaxData)=>{
			if(window.__record)window.__record(url,data,ajaxData,recordId);
			if(window.__log && ajaxData && ajaxData.error)window.__log(post,[{url:url,pageName:location.appName,actionName,actionResult:ajaxData.error.message,actionTime:new Date()}])
			resolve && resolve.call(this,ajaxData);
		},
		onError: reject
	}));
};

window.__post = post;//注入到全局变量中，后台开发测试时使用。//TODO:remove on release

export const put = (url, data, header) => {
	//if(accessToken && !isFree)
	//	data.token = accessToken
	return new Promise((resolve, reject) => sendRequest({
		request: putReq(url, data, header),
		responseType: 'json',
		onSuccess: resolve,
		onError: reject
	}));
};

export const del = (url, header) => {
	return new Promise((resolve, reject) => sendRequest({
		request: delReq(url, header),
		responseType: 'json',
		onSuccess: resolve,
		onError: reject
	}));
};

window.getAccessToken = getAccessToken
//
// export const getAuth = (url, token, header) => {
// 	return new Promise((resolve, reject) => sendRequest({
// 		request: getAuthReq(url,token, header),
// 		responseType: 'json',
// 		onSuccess: resolve,
// 		onError: reject
// 	}));
// };
//
// export const postAuth = (url, data, token,header) => {
// 	return new Promise((resolve, reject) => sendRequest({
// 		request: postAuthReq(url, data, token,header),
// 		responseType: 'json',
// 		onSuccess: resolve,
// 		onError: reject
// 	}));
// };
//
// export const putAuth = (url, data,token, header) => {
// 	return new Promise((resolve, reject) => sendRequest({
// 		request: putAuthReq(url, data, token,header),
// 		responseType: 'json',
// 		onSuccess: resolve,
// 		onError: reject
// 	}));
// };
//
// export const delAuth = (url,token, header) => {
// 	return new Promise((resolve, reject) => sendRequest({
// 		request: delAuthReq(url, token,header),
// 		responseType: 'json',
// 		onSuccess: resolve,
// 		onError: reject
// 	}));
// };

/**
EXAMPLE USAGE

sendRequest({
  request: postReq('localhost:9009/login', {name: 'name'}), //this should be a function that returns a fetch request
  responseType: 'json'
  onSuccess: json => {},
  onError: (error) => {}
})
**/
