import * as dr from '../dynamicUI/reducer'
import { Map, List, fromJS } from 'immutable'

var listeners = Map()
export function showQueryTopOne(state,value){
	if(value!=null){
		let newMessageId = value.id
		state = dr.setterByField(state,'newMessageId',newMessageId)
	}
	state = dr.setterByField(state,'severalMessages',value)
	return state
}
export function showService(state,isConsultation){
	state = dr.setterByField(state,'showService',isConsultation)
	return state
}
export function isShowGuide(state,isShow){
	state = dr.setterByField(state,'guideClass',isShow)
	return state
}
export function isClosePortalGuiderImg(state){
	state = dr.setterByField(state,'portalGuiderImgIsShow','portalGuiderImg portalGuiderImgIsHide')
	return state
}
export function isLsAppCnIgnore(state) {
    return dr.setterByField(state, 'isLsAppCnIgnore', true)
}
export function isLsHelpIgnore(state) {
    return dr.setterByField(state, 'isLsHelpIgnore', true)
}
export function nextPopMessage(state){
	let currMessageIndex = dr.getterByField(state,'currMessageIndex'),
		popMessage = dr.getterByField(state,'popMessage')
	state = dr.setterByField(state,'currMessageIndex',currMessageIndex+1)
	state = dr.setterByField(state,'currentMessage',popMessage.get(currMessageIndex+1))
	return state
}

export function messagePopup(state){
	state = dr.setterByField(state,'showOpenAccountManage','2')
	return state
}
export function showOpenAccountManage(state){
	state = dr.setterByField(state,'showOpenAccountManage','1')
	return state
}
export function movableWidth(state,value){
	if(value==1){
		state = dr.setterByField(state,'movableWidth','1')
	}else{
		state = dr.setterByField(state,'movableWidth','2')
	}

	return state
}

export function setMenus(state, menus) {
	return state.set('menus', menus)
}

export function setMessages(state, messages) {
	return state.set('messages', messages)
}

export function setTodos(state, todos) {
	return state.set('todos', todos)
}

export function setAlarms(state, alarms) {
	return state.set('alarms', alarms)
}
export function closeVersionTips(state, isClear) {
	state = dr.setterByField(state, 'version.sysVersion.isTips', 0)
	if (isClear) {
		state = dr.setterByField(state, 'version.isShow', false)
		state = dr.setterByField(state, 'version.sysVersion.id', false)
	}
	return state
}
export function setMenuText(state, val) {
	let orgs = dr.getterByField(state, 'orgs'),
		oldOrgs = dr.getterByField(state, 'oldOrgs'),
		newOrgs = List()
	if (!val) {
		newOrgs = orgs
	} else {
		orgs.map((e, i) => {
			if (e.get('name').indexOf(val) != -1) {
				newOrgs = newOrgs.push(e)
			}
		})
	}
	state = dr.setterByField(state, 'orgSearchValue', val)
	state = dr.setterByField(state, 'oldOrgs', newOrgs)
	return state
}

export function updateCurrentUser(state, user) {
	state = dr.setterByField(state, 'currentUser', fromJS(user))
	state = dr.setterByField(state, 'safetyInformation', 1)
	return state
}

export function addTab(state, title, url, props) {
	let tabs = dr.getter(state, "portal.tabs", 'value') //通过控件path
	//let tabs = dr.getterByField(state,['tabs']) //通过field path
	let index = tabs.findIndex(t => t.get('url') === url || t.get('title') === title)

	//PubSub.publish(`onTabAdd_${url}`,{path:'apps/login/login',version:result.error.data})

	//let listener = state.getIn(['listeners', `onTabAdd_${url}`])
	let listener = listeners.get(`onTabAdd_${url}`)

	if (index >= 0) {
		tabs = tabs.update(index, tab => {
			tab = tab.set('url', url)
			return tab.set('props', fromJS(props))
		})
		state = dr.setter(state, "portal.tabs", 'value', tabs) //通过控件path


		if (listener)
			setTimeout(() => listener(props), 16)


		//state = dr.setter(state, "tabs", 'value', tabs) //通过field path
		return dr.setter(state, "portal.currentTab", 'value', tabs.get(index))
	}

	let tab = Map({ title, url, props: fromJS(props) })
	state = dr.addRow(state, "portal.tabs", tab)


	// if(listener)
	// 	setTimeout( ()=>listener(props), 16)

	return dr.setter(state, "portal.currentTab", 'value', tab)
}

export function renameTab(state, url, title) {
	let tabs = dr.getter(state, "portal.tabs", 'value') //通过控件path
	let index = tabs.findIndex(t => t.get('url') === url)

	if (index >= 0) {
		tabs = tabs.update(index, tab => {
			return tab.set('title', title)
		})
		return dr.setter(state, "portal.tabs", 'value', tabs) //通过控件path
	}
}

export function selectTab(state, url,selectMenuInfo) {
	let currentTab = dr.getter(state, "portal.tabs", 'value').find(tab => tab.get('url') === url),
		menuId = selectMenuInfo && `${selectMenuInfo.get('id')}`,
		selectedKeys = menuId ? menuId.length > 4 ? [menuId, menuId.slice(0,4)] : [menuId] : []

	//let listener  = state.getIn(['listeners', `onTabFocus_${url}`])
	let listener = listeners.get(`onTabFocus_${url}`)
	if(url == "apps/dz/messageCenter"){
		state = dr.setterByField(state,'showOpenAccountManage','1')
	}
	if (listener){
		setTimeout(listener, 16)
	}
	
	state = dr.setter(state, "portal.currentTab", 'value', currentTab)
	state = dr.setterByField(state, 'menuSelectedKeys', fromJS(selectedKeys))
	return state
}

export function refreshCurrentTab(state) {
	let currentTab = dr.get(state, 'portal.currentTab', 'value')
	if (!currentTab) return state

	currentTab = currentTab.set('timestamp', new Date().getTime())
	return dr.set(state, "portal.currentTab", 'value', currentTab)
}

export function delTab(state, url, isNotifyDel) {
	//let listener  = state.getIn(['listeners', `onTabClose_${url}`])
	let listener = listeners.get(`onTabClose_${url}`)

	if (isNotifyDel && listener && !listener(url)) {
		return state
	}

	let currentTab = dr.getter(state, "portal.currentTab", 'value')
	if (currentTab.get('url') === url)
		state = dr.setter(state, "portal.currentTab", 'value', undefined)

	state = dr.delRow(state, "portal.tabs", (v) => v.get('url') === url)

	currentTab = dr.getter(state, 'portal.tabs', 'value').last()
	url = currentTab ? currentTab.get('url') : ''
	if (!url)
		return state

	//listener  = state.getIn(['listeners', `onTabFocus_${url}`])
	listener = listeners.get(`onTabFocus_${url}`)
	if (listener)
		setTimeout(listener, 16)

	state = dr.setter(state, "portal.currentTab", 'value', currentTab)
	return state
}


export function removeAllTab(state) {
	state = dr.setter(state, 'portal.tabs', 'value', List([]))
	state = dr.setter(state, "portal.currentTab", 'value', null)
	return state
}


export function toggleOrg(state, orgId) {
	let orgs = dr.getterByField(state, 'orgs'),
		currentOrg = orgs.find(o => o.get('id').toString() === orgId)
	return dr.setterByField(state, 'currentOrg', currentOrg)
}



export function setOrgList(state, orgList, orgId) {
	let org = '',
		orgs = []
	orgList.map((element, index) => {
		if (!element.expired) {
			orgs.push(element)
		}
		if (element.id == orgId) {
			org = element
		}
	})
	state = dr.setterByField(state, 'orgs', fromJS(orgs))
	state = dr.setterByField(state, 'oldOrgs', fromJS(orgs))
	state = dr.setterByField(state, 'currentOrg', fromJS(org))
	return state
}

export function setMenuSelectedKeys(state,keys){
	state = dr.setterByField(state, 'menuSelectedKeys', fromJS(keys))
	return state
}

export function removeOrgById(state, orgId) {
	let orgs = dr.getterByField(state, 'orgs')
	if (!orgs) return state
	let findIndex = -1
	findIndex = orgs.findIndex(o => o.get('id') == orgId)
	if (findIndex == -1) return state

	return dr.setterByField(state, 'orgs', orgs.remove(findIndex))
}

export function addEventListener(state, url, eventName, handler) {
	//let listeners  =  state.get('listeners') || Map()
	eventName = eventName + '_' + url
	if (!listeners.get(eventName)) {
		listeners = listeners.set(eventName, handler)
	}
	//state = state.set('listeners', listeners)
	//return state
	return state
}

export function removeEventListener(state, url, eventName) {
	//let listeners  = state.get('listeners')
	//if(!listeners) return state

	eventName = eventName + '_' + url
	if (!listeners.get(eventName)) {
		return state
	}

	listeners = listeners.remove(eventName)
	//state = state.set('listeners', listeners)
	//return state
	return state
}

export function onMax(state){
	let isMax = dr.getterByField(state,'isMax')
	state = dr.setterByField(state,'isMax',!isMax)
	return state
}

export function setLeftMenus(state, taxUrl) {
	let taxManageChildrens = [],
		x, y,
		urls = dr.getterByField(state, 'menus').toJS()
	if (urls.length <= 0) return state//如果当前左侧菜单没有任何东西直接退出
	urls.map(e=>{
		if(e.id == 2040){
			e.subMenus[0].menuItemGroup.map(item=>{
				if(item.id == 204001){
					item.requestUrl = taxUrl
				}
			})
		}
	})
	/* for (let i = 0; i < urls.length; i++) {
		if (urls[i].id == 2040) {//税务申报的菜单
			taxManageChildrens = urls[i].subMenus
			x = i
		}
	}
	for (let j = 0; j < taxManageChildrens.length; j++) {
		if (taxManageChildrens[j].name == '增值税') {
			y = j
			urls[x].subMenus[y].requestUrl = taxUrl
		}
	} */
	state = dr.setterByField(state, 'menus', fromJS(urls))
	return state
}

export function noTip(state, checked) {
	return dr.setterByField(state, 'noTip', checked)
}

export function know(state) {
	let noTip = dr.getterByField(state, 'noTip')
	if (noTip)
		localStorage['showGettingStarted'] = false

	return dr.setterByField(state, 'showGettingStarted', false)
}

export function setShowGettingStarted(state) {
	state = dr.setterByField(state, 'showGettingStarted', true)
	state = dr.setterByField(state, 'showTip', false)
	return state
}
export function feedbackVisibleCtr(state,feedbackVisible){
	return dr.setterByField(state, 'feedbackVisible', feedbackVisible)
}


Object.assign(exports, { ...dr, ...exports })
