import React from 'react'
import { List, Map } from 'immutable'
import Header from './component/header'
import Left from './component/left'
import Main from './component/main'
import GettingStarted from './component/gettingStarted'
import styles from "./portal.less"
import { Modal } from 'dynamicComponent'
import PopMessage from './component/popMessage'
import {
  Lock,
  MovablePanel,
  ZIcon,
  Popover,
  Button
} from "xComponent";
let kaiguan=1
export default class PortalComponent extends React.Component {

	static defaultProps = {
		prefixCls: 'portal'
	}

	constructor(props) {
		super(props)
		this.state = {
            isLsHelpIgnore:false
        }
    }
    
    onMessage = (e) => {
        var data = e.data
        try {
            data = JSON.parse(data)
            if (data.opt === 'addTab') {
                this.props.addTab(data.title, data.url, {})
			}
			if (data.type === 'TOGGLEORG') {
                this.props.toggleOrg(data.args.orgId, data.args.initTabData)(injectFuns)
			}
			if (data.type === 'OPENTAB') {
				this.props.addTab(data.args.tabName,data.args.tabUrl,data.args.tabProps)(injectFuns)
			}
			if(data.type === 'LOADMASK'){
				this.props.loadMask(data.args)
			}
			if(data.type === 'modifyCreator'){
				this.props.modifyCreator(data.args.creator)
			}
        }
        catch (e) {
        }
    }

	componentDidMount() {
        let This = this
        
        var win = window
        if (win.addEventListener) {
            win.addEventListener('message', this.onMessage, false)
        } else if (win.attachEvent) {
            win.attachEvent('onmessage', this.onMessage)
        } else {
            win.onmessage = this.onMessage
        }

		this.props.initView(null, null, () => {
			This.props.onRedirect('apps/login/admin', true)
		}, this.props.appParams)
		this.preventWindowDefault()
	}
	componentWillUnmount() {
        var win = window
        if (win.removeEventListener) {
            win.removeEventListener('message', this.onMessage, false)
        } else if (win.detachEvent) {
            win.detachEvent('onmessage', this.onMessage)
        } else {
            win.onmessage = undefined
        }

		sessionStorage.setItem('currentOrgId', '')
		sessionStorage.setItem('dzOrgId', '')
		sessionStorage.setItem('serviceProviderOrgId', '')
		this.preventWindowDefault = null
		clearInterval(window.queryQRCodeTimer)
		Lock.stop()
	}

	handleMenuClick(name, href) {
		if (href == "apps/logout") {
			this.props.onLogoutSucess()
			return
		}
		this.props.addTab(name, href)
	}

	handleSelectTab(name, href) {
		this.props.selectTab(href)
	}
	preventWindowDefault() {
		return;
	}

	handleCloseTab(name, href) {
		this.props.removeTab(href)
	}

	handlelink() {
		let getterByField = this.props.payload.getIn(['utils', 'getterByField']),
			appInfo = getterByField('appInfo'),
			currOrg = getterByField('currOrg').toJS(),
			userName = getterByField('userName'),
			tagName = event.target.tagName,
			className = event.target.className,
			industry = currOrg.industry,industryName,
			companyName = currOrg.name,
			appId = currOrg.appId,friendName,
			iTop = (window.screen.availHeight - 30 - 450) / 2,
			iLeft = (window.screen.availWidth - 10 - 590) / 2
		if(tagName=="BUTTON"||className=="closeService"){
			return
		}else{
			// if (appInfo && appInfo.get('id') == 1000) {
			// 	window.open('http://kefu.rongkecloud.com/RKServiceClientWeb/service?ek=b5c1f88e152a5d985e0bacda416e6fb3e6d853b9&bg=4&gd=231&ad=0&searchengine=&keywords=&intype=2&rk_userparams=&isinvite=0&qd=zwj', "_blank", "toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=590, height=450,top=" + iTop + ",left=" + iLeft + "")
			// } else {
			// 	window.open("http://kefu.rongkecloud.com/RKServiceClientWeb/service?ek=b5c1f88e152a5d985e0bacda416e6fb3e6d853b9&bg=4&gd=231&ad=0&searchengine=&keywords=&intype=2&rk_userparams=&isinvite=0&qd=yj", "_blank", "toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=590, height=450,top=" + iTop + ",left=" + iLeft + "")
			// }
			// window.qimoClientId={nickName:userName,customField:{'伙伴名称':friendName,'公司名称':companyName,'手机号':'','行业':industryName}}
			qimoChatClick()
		}	
	}
	handleMouseOver(){
		if(kaiguan==1){
			setTimeout(()=>{
				let portalCode = document.querySelector('.portal-code'),
					portalBtn = document.querySelector('.portal-btn'),
					portalBtnTop = portalBtn.style.top==''?'515px':parseInt(portalBtn.style.top)+25+'px'
				if(portalCode){
					portalCode.style.top=portalBtnTop
					kaiguan=0				
				}					
			},130)	
		}else{
			return
		}						
	}
	handleServiceHide(){
		let portalService = document.querySelector('.portal-service ')
		if(portalService){
			portalService.classList.add("serviceHide")
		}		
	}
	handleCurrentGuideHide(){
		let portalCurrentGuide = document.querySelector('.portal-currentGuide ')
		if(portalCurrentGuide){
			portalCurrentGuide.classList.add("currentGuideHide")
		}
	}
	handleTaxClick() {
        // window.open('https://devits.rrtimes.com/')
        this.props.openIts()
        // localStorage['zwjId'] = getAccessToken()
        // if(window.location.href.indexOf('its')!=-1) {
        //     window.open('http://its.rrtimes.com/')
        
        // } else {

        //     window.open('http://127.0.0.1:8084')
        // }
    }
    handleTaxIntroduceClick() {
		// window.open('https://www.rrtimes.com/finalSettlement.html')
		this.props.experience()
    }
    isShowGuide(){
    	this.handleCurrentGuideHide()
    	this.props.isShowGuide('guideShow')
    	let aElements = document.getElementsByClassName('ant-menu-submenu-title'),
			aEle
		for(var i=0;i<aElements.length;i++){
	        if(aElements[i].getAttribute('aria-owns')=='2010$Menu')
	            aEle = aElements[i]
	    }
	    let aEleLeft = aEle.getBoundingClientRect().left,
	    	aEleTop = aEle.getBoundingClientRect().top,
	    	portalGuiderImg = document.getElementsByClassName('portalGuiderImg')[0],
	    	openRichardticket = document.getElementsByClassName('openRichardticket')[0]
	    portalGuiderImg.style.top=aEleTop-10+'px'
	    portalGuiderImg.style.left=aEleLeft
	    openRichardticket.style.top=aEleTop-10+'px'
	    this.props.isLsHelpIgnore()   
    }
    handleCurrentGuideEverHide(){
    	this.props.isLsHelpIgnore() 
    }
    isCloseGuide(event){
    	this.props.isShowGuide('guideHide')
    	event.stopPropagation()
    }
    openRichardticket(event){
    	this.props.addTab('新增流水', `apps/acm/richardTicket/card`,{openGuide:true})
    	this.isCloseGuide(event)
    	event.stopPropagation()
    }
    isClosePortalGuiderImg(){
    	this.props.isClosePortalGuiderImg()
    }
    openGuideWarning(){
    	this.props.openGuideWarning()
    }
    // localLsHelpIgnore(){
    //     this.props.isLsHelpIgnore()
    // }
	render() {
		if (!this.props.payload) return null
		let message = this.props.payload.getIn(['global', 'message']),
			{ prefixCls } = this.props
		if (!this.props.payload.get('utils')) {
			if (message)
				return (<div>{Modal(message)}</div>)
			return null
		}
		let getterByField = this.props.payload.getIn(['utils', 'getterByField']),
			showGettingStarted = getterByField('showGettingStarted'),
			movableWidth = getterByField('movableWidth'),
			BtnWidth = movableWidth==1?62:30,
			currOrg = getterByField('currOrg').toJS(),
			appId = currOrg.appId,
			currentUser = getterByField('currentUser'),
			currentName =  currentUser?currentUser.get('name'): '',
			wxercode = '/static/images/default/wxercode.png',//portal页header微信二维码
			appInfo = getterByField('appInfo'),
			showService = getterByField('showService'),
			serviceClass,
			guideClass =getterByField('guideClass')?getterByField('guideClass')+' lsGuide':'lsGuide',
			content,
			fromDz,
			industryVersion = getterByField('industryVersion'),
			portalGuiderImg = getterByField('portalGuiderImgIsShow')?getterByField('portalGuiderImgIsShow'):'portalGuiderImg',
			showTaxLink = getterByField('showTaxLink') && this.props.isDevelop,//location.href.indexOf("?dev")!=-1,			
			popMessage = getterByField('popMessage'),
			isMax = getterByField('isMax'),
			currentOrgId = sessionStorage['currentOrgId'],
			isLsHelpIgnore = (
                (localStorage['isLsHelpIgnore'] &&
                    localStorage['isLsHelpIgnore'].indexOf(currentOrgId) != -1) ||
                getterByField('isLsHelpIgnore')
			),
			groupList = getterByField('groupList') && getterByField('groupList').size ? getterByField('groupList').toJS() : getterByField('groupList'),
			orgList = getterByField('orgs') && getterByField('orgs').size ? getterByField('orgs').toJS() : getterByField('orgs')
		if (appInfo && appInfo.size > 0) {
            // 这块后期可以统一从接口返回的图片中替换先暂时写死
            wxercode = appInfo.get('qrCodeWx') || wxercode//portal页微信公众号的二维码
            content = (<div><img src={wxercode}/><span>扫一扫 关注公众号</span></div>)
        }
		if (sessionStorage.getItem('dzOrgId')) {
			fromDz = {
				id: sessionStorage.getItem('dzOrgId')
			}
		} else {
			fromDz = undefined
		}
		if(showService){
			serviceClass = prefixCls + '-service'
			let showServiceHide = getterByField('showServiceHide')
			if(showServiceHide){
				serviceClass = prefixCls + '-service' + ' serviceHide'
			}else{
				setTimeout(() => {
		            this.handleServiceHide()
		        }, 15000)
			}			
		}else{
			serviceClass = prefixCls + '-service' + ' serviceHide'
		}
		setTimeout(() => {
			let aElements = document.getElementsByClassName('ant-menu-submenu-title'),
				aEle
			for(var i=0;i<aElements.length;i++){
		        if(aElements[i].getAttribute('aria-owns')=='2010$Menu')
		            aEle = aElements[i]
		    }
			let portalCurrentGuide = document.querySelector('.portal-currentGuide')
			if(portalCurrentGuide && aEle){
				portalCurrentGuide.classList.add("currentGuideShow")
			}else if(portalCurrentGuide && !aEle){
				portalCurrentGuide.classList.remove("currentGuideShow")
			}	
		},4000)
		let portalCurrentGuide = document.querySelector('.portal-currentGuide')
	   	if(portalCurrentGuide){	   		
			portalCurrentGuide.classList.remove("currentGuideShow")
		}
		groupList = groupList || []//集团企业列表
		orgList = orgList || []//企业列表
		//从集团企业列表和企业列表中查找当前企业是否存在，不存在表示当前企业不可用
		let findOrg = [...orgList,...groupList].find(e => e.id == currOrg.id),
			//排除张无忌-100、代账-102、集团-103、新华99-1010的企业
			isShowMask = !(currOrg.appId == 100 || currOrg.appId == 102 || currOrg.appId == 103 || currOrg.appId == 1010) ? !findOrg : false
		return (
			<div className={this.props.prefixCls}>
				<div className={serviceClass} onClick={::this.handlelink}>
					<div className='closeService' onClick={::this.handleServiceHide}></div>
				</div>
				{/* findOrg有值表示当前企业可用 */}
				{ !isShowMask ? null : (
					<div className={`${this.props.prefixCls}-mask`}>
						<p>尊敬的用户您好，您的产品使用已到期，如有需要请联系客服人员。</p>
						<Button>客服电话：400-6060-386</Button>
					</div>
				)}
				{
					appId==102 || industryVersion==1 || isLsHelpIgnore ? null:<div className={`${prefixCls}-currentGuide`}>
						<i onClick={::this.handleCurrentGuideEverHide}>×</i>
						<h5>Hi，{currentName}，欢迎来到账无忌！</h5>
						<p>您想尝试记一笔流水吗？</p>
						<img src={require("./img/currentGuide.png")} alt=""/>
						<button onClick={::this.isShowGuide}>记一笔</button>
						<span onClick={::this.handleCurrentGuideHide}>下次再说</span>
					</div>
				}				
				{
					!(this.props.appParams && this.props.appParams.target) ? 
					<MovablePanel
						onClick={::this.handlelink}
						className = { prefixCls + '-btn' }
						isStopX = { true}
						style = {{
						top: 472,
						right: 0,
						width:BtnWidth,
						height: 82
						}}
					>
						<div className={`${prefixCls}-wrapper`}>
							<div className={`${prefixCls}-big`}>
								<ZIcon
									icon='consultant-expert'
									colorStyle='white'
									title=''
								/>
								<span>咨询专家</span>
								<a></a>
							</div>
							<div className={prefixCls + '-little'}>咨询专家</div>
						</div>
						<Popover content={content} placement="left" overlayClassName={`${prefixCls}-code`}>
							<button className={`${prefixCls}-smallCode`} onMouseOver={::this.handleMouseOver}></button>
						</Popover>
					</MovablePanel>
					: null
				}
				{/*如果是放大模式不显示header区域*/}	
				{ !isMax ? <Header  {...this.props} /> : null}	
				<main>
					{/*如果是放大模式不显示左侧菜单区域*/}	
					{!isMax ? <Left  {...this.props} /> : null}
					<Main  {...this.props} isMax={isMax} />
				</main>
				{popMessage.size > 0 ? <PopMessage {...this.props}/> : null}
				{ Modal(message) }
				<div className={guideClass} onClick={::this.openGuideWarning}>
					<div className='portalGuiderImg'></div>
					<div className="openRichardticket" onClick={::this.openRichardticket}></div>
					<div className='lsClose' onClick={::this.isCloseGuide}>关闭指引</div>
				</div>
        	</div>
		)
	}
}