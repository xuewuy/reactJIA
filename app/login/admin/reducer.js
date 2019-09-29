import * as dr from 'dynamicReducer'
import Immutable, {List,Map,fromJS} from 'immutable'
import moment from 'moment'

export function nextLoginChange(state, nextLogin) {
	return  dr.setterByField(state, 'nextLogin', nextLogin)
}

export function setIndustryVersionVisible(state, id){
	let industryVersion = id == '1006' ? 2 : null,
		selectVersion = dr.getterByField(state, 'enterprise.selectVersion') ? dr.getterByField(state, 'enterprise.selectVersion').get('id') : undefined,
		vatMode = id == '1006' ? 36 : null
	state = dr.setterByField(state, 'enterprise.industryVersionVisible', id == '1006')
	state = dr.setterByField(state, 'enterprise.industryVersion', industryVersion)
	state = dr.setterByField(state, 'enterprise.vatMode', vatMode)
	state = dr.setterByField(state, 'enterprise.vatModeVisible', id == '1006')
	state = dr.setter(state, 'admin.enterprise.formItems.selectVersion', 'visible', id == '1007')
	state = dr.setter(state, 'admin.enterprise.formItems.statusOfTaxpayer', 'visible', !(id == '1007') || (id == '1007' && selectVersion == 2))
	return state
}

export function switchOrgList(state,status){
	state = dr.setterByField(state,'myYjTableTitle',status)
	state = dr.setterByField(state,'organizationalInfo.sortActive','o.expireTime DESC')
	return state
}

export function setVatMode(state,value){
	state = dr.setterByField(state,'enterprise.vatMode',value)
	return state
}

export function setIndustryVersion(state, industryVersion){
	state = dr.setterByField(state, 'enterprise.industryVersion', industryVersion)
	state = dr.setterByField(state, 'enterprise.vatModeVisible', industryVersion == 2)
	return state
}
export function saveActiveKey(state,key,orgs){
	let tabs = dr.getterByField(state,'getMenus').toJS(),
		currentTab = tabs.find(ment=>ment.key == key)
	if(key == '50'){
		currentTab.initData = orgs
	}
	state =  dr.setterByField(state,'activeKey',key)
	state =  dr.setterByField(state,'currentTab',currentTab)
		if(key!=11) {
		state = dr.setterByField(state,'showOrder',false)
	}
	if(key!=20) {
		state = dr.setterByField(state,'showOrderSwy',false)
	}
	return state
}
export function setSelect(state,industry,statusStr){
	let name
	if(industry==''){
		industry='-1'
	}
	if(statusStr==''){
		statusStr='-1'
	}
	if(industry){
		if(industry=='0'){
			name="行业"
		}else if(industry=='1'){
			name="工业"
		}else if(industry=='2'){
			name="商贸"
		}else if(industry=='3'){
			name="服务"
		}else if(industry=='4'){
			name="信息技术"
		}else if(industry=='1005'){
			name="健康美容业"
		}else if(industry=='1006'){
			name="餐饮业"
		}else if(industry=='1007'){
			name="幼教"
		}
		let filter={}
		filter = dr.getter(state,'admin.invitateCodeGrid.industryName','filter').toJS()
		filter.selectValue = industry
		state = dr.setter(state,'admin.invitateCodeGrid.industryName','filter',fromJS(filter))
	}
	if(statusStr){
		if(statusStr=='-1'){
			name="邀请码状态"
		}else if(statusStr=='0'){
			name="未激活"
		}else if(statusStr=='1'){
			name="已激活"
		}else if(statusStr=='2'){
			name="已购买"
		}
		let filter1={}
		filter1 = dr.getter(state,'admin.invitateCodeGrid.statusStr','filter').toJS()
		filter1.selectValue = statusStr
		state = dr.setter(state,'admin.invitateCodeGrid.statusStr','filter',fromJS(filter1))
	}
	return state
}
export function setAuthenticationView(state,key,orgs){
	if(key == '50'){
		state =  dr.setterByField(state,'isShowAuthentication',true)
	}else{
		state =  dr.setterByField(state,'isShowAuthentication',false)
	}
	return state
}
export function setOrderCity(state,provinceSource) {
	return dr.setterByField(state,'orderManage.provinceSource',fromJS(provinceSource))
}
export function cityChange(state,province) {
	return dr.setterByField(state,'orderManage.province',province)
}
export function saveOrderActiveKey(state, key, orgs) {
    state = dr.setterByField(state, 'orderActiveKey', key)
    return state
}

export function setDisabledSdate(state,disabledSdate){
	return dr.setterByField(state,'createOrg.isDisabled',disabledSdate)
}

export function editDzOrgName(state, rowIndex){
	let orgs = dr.getterByField(state,'orgs').toJS()
	orgs[rowIndex].updateNameStatus = true
	orgs[rowIndex].oldName = orgs[rowIndex].name
	state = dr.setterByField(state, 'orgs', fromJS(orgs))
	return state
}

export function updateDzOrgNameChange(state,name,rowIndex){
	let orgs = dr.getterByField(state, 'orgs').toJS()
	orgs[rowIndex].name = name.replace(/([#0-9]\u20E3)|[\xA9\xAE\u203C\u2047-\u2049\u2122\u2139\u3030\u303D\u3297\u3299][\uFE00-\uFEFF]?|[\u2190-\u21FF][\uFE00-\uFEFF]?|[\u2300-\u23FF][\uFE00-\uFEFF]?|[\u2460-\u24FF][\uFE00-\uFEFF]?|[\u25A0-\u25FF][\uFE00-\uFEFF]?|[\u2600-\u27BF][\uFE00-\uFEFF]?|[\u2900-\u297F][\uFE00-\uFEFF]?|[\u2B00-\u2BF0][\uFE00-\uFEFF]?|(?:\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDEFF])[\uFE00-\uFEFF]?/g, '')
	state = dr.setterByField(state, 'orgs', fromJS(orgs))
	return state
}

export function updateDzOrgNameSuccess(state,rowIndex){
	let orgs = dr.getterByField(state, 'orgs').toJS()
	orgs[rowIndex].updateNameStatus = false
	orgs[rowIndex].oldName = orgs[rowIndex].name
	state = dr.setterByField(state, 'orgs', fromJS(orgs))
	return state
}

export function closeUpdateDzOrgName(state,rowIndex){
	let orgs = dr.getterByField(state, 'orgs').toJS()
	orgs[rowIndex].name = orgs[rowIndex].oldName
	orgs[rowIndex].updateNameStatus = false
	state = dr.setterByField(state, 'orgs', fromJS(orgs))
	return state
}

export function initAuthentication(state,dataObj){
	/*
	    busLicensePath:营业执照的图片地址
	    qrCode:生成二维码的code
	    inviteCount:邀请人数量
     */
    state = dr.setterByField(state,'authentication.imgPath',dataObj.busLicensePath)
    state = dr.setterByField(state,'authentication.qrCode',dataObj.qrCode)
    state = dr.setterByField(state,'authentication.inviteCount',dataObj.inviteCount)
	return state
}

export function uploadImg(state,imgPath){
	state = dr.setterByField(state,'authentication.imgPath',imgPath)
	return state
}

/**
 * [setBeautyIndustryOption 美容行业的参数设置]
 * @param {[type]} state    [description]
 * @param {[type]} industry [当前选中的行业]
 */
export function setBeautyIndustryOption(state,industry){
	let disabled = industry == 1005 ? true : false
	state = dr.setter(state,'admin.enterprise.formItems.statusOfTaxpayer','disabled',disabled)
	if(disabled){
		state = dr.setterByField(state,'enterprise.statusOfTaxpayer',fromJS({id:42}))
		state = dr.setterByField(state,'enterprise.accountingStandards',fromJS({id:19}))
	}
	return state
}
export function setClassEdit(state,value){
	state = dr.setterByField(state,'isShowClassEdit',value)
	return state
}
export function hideClassEdit(state){
	state = dr.setterByField(state,'isShowClassEdit',false)
	return state
}
export function initClassEdit(state,value){
	let classEdit = {}
	if(value.setImageInfoDto){
		classEdit.classDate = value.setImageInfoDto.classDate
		classEdit.enrollUrl = value.setImageInfoDto.enrollUrl
		classEdit.imgName = value.setImageInfoDto.imgName=='banner-zeng'?{name:'banner-zeng',id:0}:{name:'banner-xiaoFang',id:1}
		classEdit.teacherName = value.setImageInfoDto.teacherName
		classEdit.teacherIntruduce = value.setImageInfoDto.teacherIntruduce.join('\n')
		classEdit.content = value.setImageInfoDto.content.join('\n')
		classEdit.title = value.setImageInfoDto.title
		state = dr.setterByField(state,'classEdit',fromJS(classEdit))
	}
	return state
}
/*伙伴价格管理开始*/
/**
 * [promoCodeInitView 伙伴价格管理初始化]
 * @param  {[type]} state     [description]
 * @param  {[type]} ajaxData  [description]
 * @param  {[type]} maxHeight [description]
 * @return {[type]}           [description]
 */
export function promoCodeInitView(state,ajaxData,maxHeight){
	state = dr.setterByField(state,'promoCode.maxHeight',maxHeight)
	state = dr.setterByField(state,'promoCode.ajaxData',fromJS(ajaxData.list))
	state = dr.setterByField(state,'promoCode.page',fromJS(ajaxData.page))
	return state
}
/*伙伴价格管理结束*/

export function updateOrgList(state,orgs,sortType){
	let myYjTableTitle = dr.getterByField(state,'myYjTableTitle'),
		orgsPath = myYjTableTitle == 'group' ? 'groupList' : 'orgs',
		oldOrgsPath = myYjTableTitle == 'group' ? 'oldGroupList' : 'oldOrgs',
		oloOrgsListPath = myYjTableTitle == 'group' ? 'oldGroupList' : 'oldOrgList'
	if(orgs.size){
		state = dr.setterByField(state,orgsPath,orgs)
		state = dr.setterByField(state, oldOrgsPath, orgs)
		state = dr.setterByField(state, oloOrgsListPath,orgs)
	}else{
		state = dr.setterByField(state,orgsPath,Immutable.fromJS(orgs))
		state = dr.setterByField(state, oldOrgsPath,Immutable.fromJS(orgs))
		state = dr.setterByField(state, oloOrgsListPath, Immutable.fromJS(orgs))
	}
	if(sortType){
		state = dr.setterByField(state,'sortActive',sortType)
	}
	return state
}

/**
 * [initCreateOrg 创建企业初始化]
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
export function initCreateOrg(state, provinceList){
	let isOrg = dr.getterByField(state,'isOrg'),
		appId = dr.getterByField(state,'appInfo.id'),
		myYjTableTitle = dr.getterByField(state,'myYjTableTitle'),
		createGroup = dr.getterByField(state, 'createGroup').toJS()
	//集团处理
	if (myYjTableTitle == 'group'){
		state = dr.setter(state, 'admin.createGroup.formItems.registeredAddress', 'dataSource', fromJS(provinceList))
		// state = dr.setterByField(state, 'createGroup.registeredAddress', fromJS(provinceList[0]))
		createGroup.accountingStandards = { code: "0002", name: "小企业会计准则2013", id: 19 }
		// state = dr.setterByField(state, 'createGroup.accountingStandards', fromJS({code: "0002", name: "小企业会计准则2013", id: 19}))
		createGroup.orgName = ''
		createGroup.requiredOrgCount = null
		createGroup.industry = null
		createGroup.registeredAddress = null
		state = dr.setterByField(state, 'createGroup',fromJS(createGroup))
	}
	if(isOrg){
		state = dr.setterByField(state,'enterprise.orgName',fromJS(''))
		state = dr.setterByField(state,'enterprise.industry',fromJS({id:''}))
		state = dr.setterByField(state, 'enterprise.statusOfTaxpayer', fromJS({ id: '' }))
		state = dr.setterByField(state, 'enterprise.selectVersion', fromJS({ id: 1 }))
		state = dr.setterByField(state, 'enterprise.registeredAddress', fromJS(provinceList[0]))
		state = dr.setterByField(state,'createOrg.isDisabled',true)
		state = dr.setter(state, 'admin.enterprise.formItems.statusOfTaxpayer', 'disabled', false)
		state = dr.setter(state, 'admin.enterprise.formItems.selectVersion', 'visible', false)
		state = dr.setter(state, 'admin.enterprise.formItems.registeredAddress', 'dataSource', fromJS(provinceList))
	}else{
		state = dr.setterByField(state,'admin.createOrg.formItems.orgName',fromJS(''))
	}
	state = dr.setterByField(state, 'enterprise.industryVersionVisible', false)
	return state
}

/**
 * [setShowCompoent 设置创建企业成功之后显示修改启用期间和会计准则的组件]
 * @param {[type]} state        [description]
 * @param {[type]} showCompoent [显示哪个组件]
 */
export function setShowCompoent(state,showCompoent){
	state = dr.setterByField(state,`lastCreate.${showCompoent}`,true)
	return state
}

export function showSuccessInfo(state,path){
	if(path === 'admin.lastCreate.formItems.enabledYear'){
		state = dr.setterByField(state,'lastCreate.isShowEnabledYearSuccessInfo',true)
	}else{
		state = dr.setterByField(state,'lastCreate.isShowAccountingStandardsSuccessInfo',true)
	}
	return state
}

export function setIndustry(state,ajaxData){
	state = dr.setterByField(state,'enterprise.industry',fromJS({id:ajaxData.industry}))
	state = dr.setterByField(state,'createOrg.isDisabled',false)
	return state
}

export function initCreatePartner(state){
	// let isOrg = dr.getterByField(state,'isOrg')
	// path_ = isOrg ? 'admin.enterprise' : 'admin.createOrg'
	// if(isOrg){
	// 	state = dr.setterByField(state,'enterprise.orgName',fromJS(''))
	// 	state = dr.setterByField(state,'enterprise.industry',fromJS({id:1}))
	// 	state = dr.setterByField(state,'enterprise.statusOfTaxpayer',fromJS({id:42}))
	// }else{
	// }
	// state = dr.setterByField(state,'createPartner',fromJS({}))
	return state
}
export function initCreateVersion(state) {
	return state
}

export function onFieldFocus(state, path){
	state = dr.clearValidate(state, path)
	return dr.onFieldFocus(state, path)
}

export function setIsTipsAndVersionTitle(state,value) {
	if(value.get('id')==0) {
		state = dr.setterByField(state,'createVersion.isTips',value)
		state = dr.setter(state,'admin.createVersion.formItems.versionTitle','visible',false)
	} else {
		state = dr.setterByField(state,'createVersion.isTips',value)
		state = dr.setter(state,'admin.createVersion.formItems.versionTitle','visible',true)

	}
	return state
}

// 服务商信
export function setDzInfoData(state,data,maxHeight){
	let dzInfo = dr.getterByField(state,'dzInfo.from').toJS()
	dzInfo.page.currentPage = data.page.currentPage
	dzInfo.page.pageSize = data.page.pageSize
	state = dr.setterByField(state,'dzInfo.from',fromJS(dzInfo))
	state = dr.setterByField(state,'dzInfo.ajaxData',fromJS(data.orgList))
	state = dr.setterByField(state,'dzInfo.total',data.page.sumCloum)
	state = dr.setterByField(state,'dzInfo.maxHeight',maxHeight)
	state = dr.setterByField(state,'organizetionalListInfo.maxHeight',maxHeight)
	state = dr.setterByField(state,'isOrganizationalList',false)

	return state
}
/*export function setDzInfoCurrent(state,current){
	return dr.setterByField(state,'dzInfo.from.page.currentPage',current)
}*/
//服务商信息页码
export function setDzInfoCurrent(state,current){
	return dr.setterByField(state,'dzInfo.from.page.currentPage',current)
}
//服务商信息每页显示多少条
export function setDzInfoPageSize(state,pageSize){
	state = dr.setterByField(state,'dzInfo.from.page.pageSize',pageSize)
	state = dr.setterByField(state,'dzInfo.from.page.currentPage',1)
	return state
}

//法人网
export function setFarenwData(state,data,maxHeight){
	let farenw = dr.getterByField(state,'farenw.from').toJS()
	farenw.page.currentPage = data.page.currentPage
	farenw.page.pageSize = data.page.pageSize
	state = dr.setterByField(state,'farenw.from',fromJS(farenw))
	state = dr.setterByField(state,'farenw.ajaxData',fromJS(data.list))
	state = dr.setterByField(state,'farenw.total',data.page.sumCloum)
	state = dr.setterByField(state,'farenw.maxHeight',maxHeight)

	return state
}
/*export function setFarenwCurrent(state,current){
	return dr.setterByField(state,'farenw.from.page.currentPage',current)
}*/
//法人网信息页码
export function setFarenwCurrent(state,current){
	return dr.setterByField(state,'farenw.from.page.currentPage',current)
}
//法人网信息每页显示多少条
export function setFarenwPageSize(state,pageSize){
	state = dr.setterByField(state,'farenw.from.page.pageSize',pageSize)
	state = dr.setterByField(state,'farenw.from.page.currentPage',1)
	return state
}


// 服务商管理
export function setDzAdministrationData(state,data){
	return dr.setterByField(state,'dzAdministrationList',List(data.orgList))
}

//用户信息页码
export function setUserInfoCurrent(state,current){
	return dr.setterByField(state,'userInfo.from.page.currentPage',current)
}
//用户信息每页显示多少条
export function setUserInfoPageSize(state,pageSize){
	state = dr.setterByField(state,'userInfo.from.page.pageSize',pageSize)
	state = dr.setterByField(state,'userInfo.from.page.currentPage',1)
	return state
}
export function setUserInfoEndTime(state,time){
	return dr.setter(state,'admin.userInfo.formItems.endTime','disabledDate',{minDisabledDate:time})
}
export function setUserInfoData(state,data,maxHeight){
	let userInfoFrom = dr.getterByField(state,'userInfo.from').toJS(),
		appInfo = dr.getterByField(state,'appInfo'),
		appList = data.appList ? data.appList : [{id:-1,name:'全部'},{id:1,name:'易嘉人'},{id:1000,name:'账无忌'}]
	userInfoFrom.page.currentPage = data.page.currentPage
	userInfoFrom.page.pageSize = data.page.pageSize
	state = dr.setter(state,'admin.userInfo.formItems.appId','visible',appInfo.get('id') == 100)
	state = dr.setter(state,'admin.userInfo.formItems.appId','dataSource',fromJS(appList))
	if(!userInfoFrom.appId){
		userInfoFrom.appId = appList[0]
	}
	state = dr.setterByField(state,'userInfo.from',fromJS(userInfoFrom))
	state = dr.setterByField(state,'userInfo.ajaxData',fromJS(data.userList))
	state = dr.setterByField(state,'userInfo.total',data.page.sumCloum)
	state = dr.setterByField(state,'userInfo.maxHeight',maxHeight)
	return state
}

//新增企业统计
export function setOrgAnalyzeData(state,data,maxHeight){
	let orgAnalyzeFrom = dr.getterByField(state,'orgAnalyze.from').toJS(),
		appList = data.appList ? data.appList : [{id:-1,name:'全部'},{id:-1,name:'易嘉人'},{id:1000,name:'账无忌'}]
	orgAnalyzeFrom.page.currentPage = data.page.currentPage
	orgAnalyzeFrom.page.pageSize = data.page.pageSize
	state =  dr.setter(state,'admin.orgAnalyze.formItems.appId','dataSource',fromJS(appList))
	if(!orgAnalyzeFrom.appId){
		orgAnalyzeFrom.appId = appList[0]
	}
	//如果是张无忌的运营人员进来不显示来源检索
	state =  dr.setter(state,'admin.orgAnalyze.formItems.appId','visible',dr.getterByField(state,'appInfo.id') == 100)
	state = dr.setterByField(state,'orgAnalyze.from',fromJS(orgAnalyzeFrom))
	state = dr.setterByField(state,'orgAnalyze.ajaxData',fromJS(data.orgList))
	state = dr.setterByField(state,'orgAnalyze.total',data.page.sumCloum)
	state = dr.setterByField(state,'orgAnalyze.maxHeight',maxHeight)
	return state
}
export function setOrgAnalyzeCurrent(state,current){
	return dr.setterByField(state,'orgAnalyze.from.page.currentPage',current)
}
export function setOrgAnalyzePageSize(state,pageSize){
	state = dr.setterByField(state,'orgAnalyze.from.page.pageSize',pageSize)
	state = dr.setterByField(state,'orgAnalyze.from.page.currentPage',1)
	return state
}

//新增用户信息统计
export function setUserAnalyzeData(state,data,maxHeight){
	let userAnalyzeFrom = dr.getterByField(state,'userAnalyze.from').toJS(),
		appList = data.appList ? data.appList : [{id:-1,name:'全部'},{id:100,name:'易嘉人'},{id:1000,name:'账无忌'}]
	userAnalyzeFrom.page.currentPage = data.page.currentPage
	userAnalyzeFrom.page.pageSize = data.page.pageSize
	state =  dr.setter(state,'admin.userAnalyze.formItems.appId','dataSource',fromJS(appList))
	if(!userAnalyzeFrom.appId){
		userAnalyzeFrom.appId = appList[0]
	}
	//如果是张无忌的运营人员进来不显示来源检索
	state =  dr.setter(state,'admin.userAnalyze.formItems.appId','visible',dr.getterByField(state,'appInfo.id') == 100)
	state = dr.setterByField(state,'userAnalyze.from',fromJS(userAnalyzeFrom))
	state = dr.setterByField(state,'userAnalyze.ajaxData',fromJS(data.userList))
	state = dr.setterByField(state,'userAnalyze.total',data.page.sumCloum)
	state = dr.setterByField(state,'userAnalyze.maxHeight',maxHeight)
	state = dr.setterByField(state,'userManageType',1)

	return state
}

//汇算清缴
export function setOrgTaxManageData(state, data, maxHeight, appId) {
	let orgTaxManageFrom = dr.getterByField(state,'orgTaxManage.from').toJS(),
		appList = data.appList ? data.appList : [{id:-1,name:'全部'},{id:100,name:'账无忌'},{id:1006,name:'云代账'}]
	if(!orgTaxManageFrom.appId){
		orgTaxManageFrom.appId = appList[0]
	}
	state = dr.setter(state,'admin.orgTaxManage.formItems.appId','dataSource',fromJS(appList))
	state = dr.setterByField(state,'orgTaxManage.from',fromJS(orgTaxManageFrom))
	state = dr.setterByField(state,'orgTaxManage.maxHeight',maxHeight)
	state = dr.setterByField(state,'orgTaxManage.ajaxData',fromJS(data.statList))
	state = dr.setterByField(state,'orgTaxManage.orgTaxAppId',appId)
	state = dr.setterByField(state,'taxManageType','1')
	return state
}

export function setOrgTaxInfo(state, data) {
	state = dr.setterByField(state,'orgTaxList',fromJS(data.orgList))
	state = dr.setterByField(state,'taxListType',1)
	return state
}

export function setUserTaxInfo(state, data) {
	state = dr.setterByField(state,'userTaxList',fromJS(data.orgList))
	state = dr.setterByField(state,'taxListType',2)
	return state
}

export function setUserTaxManageData(state, data, maxHeight,appId) {
	let userTaxManageFrom = dr.getterByField(state,'userTaxManage.from').toJS(),
		appList = data.appList ? data.appList : [{id:-1,name:'全部'},{id:100,name:'账无忌'},{id:1006,name:'云代账'}]
	if(!userTaxManageFrom.appId){
		userTaxManageFrom.appId = appList[0]
	}
	state = dr.setter(state,'admin.userTaxManage.formItems.appId','dataSource',fromJS(appList))
	state = dr.setterByField(state,'userTaxManage.from',fromJS(userTaxManageFrom))
	state = dr.setterByField(state,'userTaxManage.maxHeight',maxHeight)
	state = dr.setterByField(state,'userTaxManage.ajaxData',fromJS(data.statList))
	state = dr.setterByField(state,'userTaxManage.userTaxAppId',appId)

	state = dr.setterByField(state,'taxManageType','2')
	return state
}

export function backTaxPage(state, taxListType, taxManageType) {
	state = dr.setterByField(state, 'taxListType', taxListType)
	return state
}

export function setUserAnalyzeCurrent(state,current){
	return dr.setterByField(state,'userAnalyze.from.page.currentPage',current)
}
export function setUserAnalyzeInfoPageSize(state,pageSize){
	state = dr.setterByField(state,'userAnalyze.from.page.pageSize',pageSize)
	state = dr.setterByField(state,'userAnalyze.from.page.currentPage',1)
	return state
}

//企业信息页面
export function setOrganizationalInfoData(state, data, maxHeight, provinceList){
	let organizationalInfo = dr.getterByField(state,'organizationalInfo.from').toJS()
	organizationalInfo.page.currentPage = data.page ? data.page.currentPage : 1
	organizationalInfo.page.pageSize = data.page ? data.page.pageSize : 40
	let appList = data.appList ? data.appList : [{id:-1,name:'全部'},{id:100,name:'易嘉人'},{id:1000,name:'账无忌'}]
	state = dr.setterByField(state,'organizationalInfo.from',fromJS(organizationalInfo))
	data.orgList.map((o,i)=>{
		o.registeredAddress = o.registeredAddress ? provinceList.find(e => e.code == o.registeredAddress).name : ''
	})
	state = dr.setterByField(state,'organizationalInfo.ajaxData',fromJS(data.orgList))
	state = dr.setterByField(state,'organizationalInfo.total',data.page ? data.page.sumCloum : 0)
	state = dr.setterByField(state,'organizationalInfo.maxHeight',maxHeight)
	state = dr.setter(state,'admin.organizationalInfo.bottom.formItems.appId','dataSource',fromJS(appList))
	if(!dr.getterByField(state,'organizationalInfo.appId')){
		state = dr.setterByField(state,'organizationalInfo.appId',fromJS(appList[0]))
	}
	if (provinceList){
		state = dr.setterByField(state, 'organizationalInfo.provinceList', fromJS(provinceList))
		provinceList = [{ code: '-1', name: '全部' }, ...provinceList]
		state = dr.setter(state, 'admin.organizationalInfo.bottom.formItems.registeredAddress', 'dataSource', fromJS(provinceList))
	}
	state = dr.setter(state,'admin.organizationalInfo.bottom.formItems.appId','disabled',dr.getterByField(state,'appInfo.id') == 1000)
	return state
}

export function searchOrgSort(state,key){
	return dr.setterByField(state,'organizationalInfo.sortActive',key)
}
export function setOrganizationalInfoCurrent(state,current){
	return dr.setterByField(state,'organizationalInfo.from.page.currentPage',current)
}
//企业信息每一页显示多少条
export function setOrganizationalInfoPageSize(state,pageSize){
	state = dr.setterByField(state,'organizationalInfo.from.page.pageSize',pageSize)
	state = dr.setterByField(state,'organizationalInfo.from.page.currentPage',1)
	return state
}
export function setOrganizationalInfoEndTime(state,time){
	return dr.setter(state,'admin.organizationalInfo.formItems.endTime','disabledDate',{minDisabledDate:time})
}

export function setIsShowCreateOrg(state){
	let enterprise = dr.getterByField(state,'enterprise').toJS()
	enterprise.industry = {id:1}
	enterprise.statusOfTaxpayer = {id:42}
	state = dr.setterByField(state,'isShowCreateOrg',true)
	state = dr.setterByField(state,'enterprise',fromJS(enterprise))
	return state
}

export function createGenerationAccount(state,isPersonal) {
	let enterprise = dr.getterByField(state,'enterprise').toJS()
	enterprise.industry = {id:1}
	enterprise.statusOfTaxpayer = {id:42}
	state = dr.setterByField(state,'isShowCreateOrg',true)
	state = dr.setterByField(state,'enterprise',fromJS(enterprise))

	// if(isPersonal){
	// 	state = dr.setterByField(state,'isPersonal',true)
	// 	state = dr.setterByField(state,'createOrg.requiredOrgCount',fromJS({
	// 		id:-1,
	// 		name:"0~29账套",
	// 		code:"0001"
	// 	}))
	// 	state = dr.setter(state,'admin.createOrg.formItems.requiredOrgCount','dataSource',fromJS([{
	// 		id:-1,
	// 		name:"0~29账套",
	// 		code:"0001"
	// 	}]))
	// }else{
		state = dr.setterByField(state,'isPersonal',false)
		state = dr.setterByField(state,'createOrg.requiredOrgCount',fromJS({
			id:-1,
			name:"0~29账套",
			code:"0001"
		}))
		state = dr.setter(state,'admin.createOrg.formItems.requiredOrgCount','dataSource',fromJS([{
			id:-1,
			name:"0~29账套",
			code:"0001"
		},{
			id:1,
			name:"30~99账套",
			code:"0002"
		},{
			id:2,
			name:"100~199账套",
			code:"0002"
		},{
			id:3,
			name:"200~499账套",
			code:"0003"
		},{
			id:4,
			name:"500~999账套",
			code:"0004"
		},{
			id:5,
			name:"1000及以上",
			code:"0005"
		}]))
	// }

	state = dr.setterByField(state,'isOrg',false)
	return state
}

export function createOrg(state) {
	let enterprise = dr.getterByField(state,'enterprise').toJS()
	enterprise.industry = {id:1}
	enterprise.statusOfTaxpayer = {id:42}
	state = dr.setterByField(state,'isShowCreateOrg',true)
	state = dr.setterByField(state,'enterprise',fromJS(enterprise))
	state = dr.setterByField(state,'isOrg',true)
	return state
}
export function setCreatePartner(state,value) {
	state = dr.setterByField(state,'isShowCreatePartner',value)
	state = dr.setter(state,'admin.createPartner.formItems.name','disabled',false)
	return state
}
export function setCreateVersion(state,value,list) {
	state = dr.setterByField(state,'isShowCreateVersion',value)
	list.unshift({id:-1,name:'全部'})

	// state = dr.setter(state,'admin.createVersion.formItems.app','dataSource',fromJS(list))
	// state = dr.setter(state,'admin.createVersion.formItems.app','dataSource',fromJS([{id:100,name:'全部'}]))
	state = dr.setter(state,'admin.createVersion.formItems.app','dataSource',fromJS([{id:100,name:'易嘉人'}]))
	state = dr.setter(state,'admin.createVersion.formItems.versionTitle','visible',false)
	state = dr.setter(state,'admin.createVersion.formItems.app','multiple',true)
	state = dr.setterByField(state,'createVersion',fromJS({
		mtype: {
          name: '企业端',
          id: 2
        },
        isTips: {
          name: '不显示',
          id: 0
		},
		app:[{name:'易嘉人'}],
        updateDate: moment(new Date()).format('YYYY-MM-DD'),
        versionContentList: [{item:undefined}]
	}))
	return state
}
const emptyVersionItem = {
	item: undefined
}
export function setLiveInfo(state,value,info) {
	state = dr.setterByField(state,'isShowLive',value)
	if(info) {
		info.isLiveObj  = info.isLive==='1'?{id: 1,name: '直播'}:{id: 0,name: '不直播'}//'1'位直播，‘0’为不直播
	} else {
		info = {
			isLiveObj: {id: 1,name: '直播'}
		}
	}
	state = dr.setterByField(state,'liveInfo',fromJS(info))
	return state

}
export function addCreateVersionItem(state) {
    let versionContentList = dr.getterByField(state,'createVersion.versionContentList').toJS()
    versionContentList.push(emptyVersionItem)
    state = dr.setterByField(state,'createVersion.versionContentList',fromJS(versionContentList))
    return state
}

export function versionItemDelete(state,rowIndex) {
    let versionContentList = dr.getterByField(state,'createVersion.versionContentList').toJS()
    versionContentList.splice(rowIndex,1)
    if(versionContentList.length==0) {
    	versionContentList.push(emptyVersionItem)
    }
	state = dr.setterByField(state,'createVersion.versionContentList',fromJS(versionContentList))
	return state
}

export function hideCreatePartner(state) {
	state = dr.setterByField(state,'isShowCreatePartner',false)
	state = dr.setterByField(state,'createPartner',fromJS({}))
	return state
}
export function hideCreateVersion(state) {
	state = dr.setterByField(state,'isShowCreateVersion',false)
	state = dr.setterByField(state,'createVersion',fromJS({}))
	return state
}
export function hideChangeLive(state) {
	state = dr.setterByField(state,'isShowLive',false)
	state = dr.setterByField(state,'liveInfo',fromJS({
		isLive: 1,
		isLiveObj: {
			id: 1,
			name: '直播'
		}
	}))
	return state
}
export function addPartner(state,value) {
	let partnerList = dr.getterByField(state,'partnerList').toJS()
	value.headerLine = partnerList.length
	partnerList.push(value)
	state = dr.setterByField(state,'createPartner',fromJS({}))
	state = dr.setterByField(state,'partnerList',fromJS(partnerList))
	state = dr.setterByField(state,'isShowCreatePartner',false)
	return state

}
export function partnerDelete(state, partnerId) {
	let partnerList = dr.getterByField(state,'partnerList').toJS()

	partnerList = partnerList.filter(o=> {
		return o.id!=partnerId
	})
	state = dr.setterByField(state,'partnerList',fromJS(partnerList))

	return state
}


export function afterCreateOrg(state, orgs, createOrgId, accountingStandardsList){
	/**
	 * 2018年8月31号添加appInfo，用于获取当前的appId，此处这个从sessionStorage里获取的appId不知道是谁添加的（感觉不靠谱，在当前页面浏览器大刷新之后sessionStorage会空）
	 * add by shuoer
	 */
	let appId = sessionStorage.getItem('appId')!='undefined'?sessionStorage.getItem('appId'):dr.getterByField(state,'appId'),
		appInfo = dr.getterByField(state,'appInfo'),
		myYjTableTitle = dr.getterByField(state, 'myYjTableTitle')
	if (myYjTableTitle == 'group'){
		state = dr.setterByField(state, 'groupList', Immutable.fromJS(orgs.groupList))
		state = dr.setterByField(state, 'oldGroupList', Immutable.fromJS(orgs.groupList))
	}else{
		state = dr.setterByField(state, 'orgs', Immutable.fromJS(orgs.orgList))
		state = dr.setterByField(state, 'oldOrgs', Immutable.fromJS(orgs.orgList))
	}
	state = dr.setterByField(state, 'enterprise', Immutable.fromJS({
			orgName:'',
			industry:'',
			accountingStandards:'',
			enabledYear:''
		}) )
	state = hideCreateOrg(state)
	if(appId==102) {
    	state = dr.setterByField(state, 'currentStep', 0)
	} else {
    	state = dr.setterByField(state, 'currentStep', 1)
	}
	if (appInfo.get('id') == 103 && myYjTableTitle == 'group'){
		state = dr.setterByField(state, 'currentStep', 0)
	}
	state = dr.setterByField(state,'alreadyClick',false)
	state = dr.setterByField(state,'createOrgId',createOrgId)
	state = dr.setterByField(state,'accountingStandardsList',accountingStandardsList)
	state = dr.setter(state, 'admin.enterprise.formItems.selectVersion', 'visible', false)
	state = dr.setter(state,'admin.lastCreate.formItems.accountingStandards','dataSource',fromJS(accountingStandardsList))
	orgs = myYjTableTitle == 'group' ? orgs.groupList : orgs.orgList
	let createOrgInfo = orgs.find(org=>org.id==createOrgId)
	state = dr.setterByField(state,'lastCreate.accountingStandards',fromJS(accountingStandardsList.find(data=>data.id == createOrgInfo.accountingStandards)))
	createOrgInfo.enabledMonth = createOrgInfo.enabledMonth < 10 ? '0'+createOrgInfo.enabledMonth : createOrgInfo.enabledMonth
	let enabledYear = createOrgInfo.enabledYear + '-' +createOrgInfo.enabledMonth
	state = dr.setterByField(state,'lastCreate.enabledYear',enabledYear)
	//当创建完成之后判断是否显示企业搜索
	/*if(orgs.length > 7){
		state = dr.setterByField(state,'isShowSearch',true)
	}else{
		state = dr.setterByField(state,'isShowSearch',false)
	}*/
	return state
}

export function setExamModalVisible(state,visible){
	state = dr.setterByField(state,'examModalVisible', visible)
	return state
}

export function createOrgAfter(state){
	return dr.setterByField(state, 'createOrgAfter', true )
}
export function createOrgAfterClose(state){
	return dr.setterByField(state, 'createOrgAfter', false )
}
export function hideCreateOrg(state){
	state = dr.clearValidate(state, 'admin.createOrg')
	state = dr.setterByField(state, 'isShowCreateOrg', false )
	state = dr.setterByField(state, 'createOrg.orgName', '' )
	return state
}

export function prev(state){
	state = dr.setterByField(state, 'currentStep', 0)
	state = dr.setterByField(state,'lastCreate.isShowAccountingStandardsSuccessInfo',false)
    return state
}

export function setAlreadyClick(state) {
	state = dr.setterByField(state,'alreadyClick',true)
	return state
}

export function setNotClick(state) {
	state = dr.setterByField(state,'alreadyClick',false)
	return state
}

export function setOrgType(state,orgType) {
	state = dr.setterByField(state,'orgType',orgType)
	return state
}

export function setOrgExpireTimeList(state,ajaxData){
	state = dr.setterByField(state,'orgExpireTimeList',List(ajaxData.orgList))
	state = dr.setterByField(state,'appList',List(ajaxData.appList))
	return state
}
////我的订单
export function updateOrderType(state,value) {
	state = dr.setterByField(state,'myorder.typeOrderValue',value)
	return state
}
export function updateType(state,value) {
	state = dr.setterByField(state,'myorder.typeValue',value)
	return state
}
export function updatePrompt(state,value) {
	state = dr.setterByField(state,'myorder.promptValue',value)
	return state
}
//我的订单2017.7.11 新增 查询选项
export function updateMyPhoneValue(state,value) {
	state = dr.setterByField(state,'myorder.searchMyPhoneValue',value)
	return state
}
export function updateMyNameValue(state,value) {
	state = dr.setterByField(state,'myorder.searchMyNameValue',value)
	return state
}
export function myBeginDateChange(state,value) {
	state = dr.setterByField(state,'myorder.myBeginDateValue',value)
	return state
}
export function myEndDateChange(state,value) {
	state = dr.setterByField(state,'myorder.myEndDateValue',value)
	return state
}
// export function updateBeginDateValue(state,value) {
// 	state = dr.setterByField(state,'orderManage.beginDate',value)
// 	return state
// }
// export function updateEndDateValue(state,value) {
// 	state = dr.setterByField(state,'orderManage.endDate',value)
// 	return state
// }

// export function updatePhoneValue(state,value) {
// 	state = dr.setterByField(state,'myorder.searchPhoneValue',value)
// 	return state
// }

// export function updateTypeManageValue(state,value) {
// 	state = dr.setterByField(state,'myorder.typeManageValue',value)
// 	return state
// }

// export function updatePromptManageValue(state,value) {
// 	state = dr.setterByField(state,'myorder.promptManageValue',value)
// 	return state
// }

// export function updateSearchValue(state,value) {
// 	state = dr.setterByField(state,'myorder.searchValue',value)
// 	return state
// }

export function setShowOrder(state,value) {
	state = dr.setterByField(state,'showOrder',value)
	if(value) {
		state = dr.setterByField(state,'activeKey','11')
	}
	return state
}
//its订单-暂时屏蔽
/* export function initItsOrder(state,value) {
	debugger
	state = dr.setterByField(state,'activeKey','104')
	state = dr.setterByField(state,'itsOrder.typeValue','all')
	state = dr.setterByField(state,'itsOrder.promptValue','all')
	state = dr.setterByField(state,'itsOrder.orderList',fromJS(value.list))
	return state
} */

export function initMyOrder(state,value) {
	state = dr.setterByField(state,'showOrder',false)
	state = dr.setterByField(state,'showOrderSwy',false)
	state = dr.setterByField(state,'activeKey','12')
	state = dr.setterByField(state,'orderActiveKey','1')
	state = dr.setterByField(state,'myorder.typeValue','all')
	state = dr.setterByField(state,'myorder.promptValue','all')
	state = dr.setterByField(state,'myorder.orderList',fromJS(value.list))
	return state
}

export function initMyOrderSwy(state,value) {
	state = dr.setterByField(state,'showOrder',false)
	state = dr.setterByField(state,'showOrderSwy',false)
	state = dr.setterByField(state,'activeKey','12')
	state = dr.setterByField(state,'orderActiveKey','2')
	state = dr.setterByField(state,'myorder.typeValue','all')
	state = dr.setterByField(state,'myorder.promptValue','all')
	state = dr.setterByField(state,'myorderSwy.orderListSwy',fromJS(value.list))
	return state
}
export function initMyOrderManageSwy(state,value, time) {
	value.list = value.list.map(o => {
		if(o.orderStatus==1) {
			o.orderStatusStr = '待支付'
			o.orderStatusClass = 'color-orange'
		}  else if(o.orderStatus==2) {
			o.orderStatusStr = '交易完成'
			o.orderStatusClass = 'color-green'

		} else if(o.orderStatus==3) {
			o.orderStatusStr = '已取消'
			o.orderStatusClass = 'color-gray'

		} else if(o.orderStatus==4) {
			o.orderStatusStr = '已删除'
			o.orderStatusClass = 'color-gray'

		} else {
			o.orderStatusStr = ''
			o.orderStatusClass = 'color-green'

		}
		return o
	})
	state = dr.setterByField(state,'orderManageListSwy',fromJS(value.list))
	state = dr.setterByField(state,'orderManageSwy.beginDate',time.beginDate.split(' ')[0])
	state = dr.setterByField(state,'orderManageSwy.endDate',time.endDate.split(' ')[0])
	state = dr.setterByField(state,'orderManageListPageSwy',fromJS({
		pageSize: value.page.pageSize,
		current: value.page.currentPage,
		total: value.page.sumCloum
	}))
	state = dr.setterByField(state,'activeKey','13')

	return state
}
export function initOrderManage(state,value,partnerData,time) {
	value.list = value.list.map(o => {
		if(o.orderStatus==1) {
			o.orderStatusStr = '待支付'
			o.orderStatusClass = 'color-orange'
		} else if(o.orderStatus==2) {
			o.orderStatusStr = '待处理'
			o.orderStatusClass = 'color-orange'

		} else if(o.orderStatus==3) {
			o.orderStatusStr = '处理失败'
			o.orderStatusClass = 'color-orange'

		} else if(o.orderStatus==4) {
			o.orderStatusStr = '交易完成'
			o.orderStatusClass = 'color-green'

		} else if(o.orderStatus==5) {
			o.orderStatusStr = '已取消'
			o.orderStatusClass = 'color-gray'

		} else if(o.orderStatus==6) {
			o.orderStatusStr = '已删除'
			o.orderStatusClass = 'color-gray'

		} else {
			o.orderStatusStr = ''
			o.orderStatusClass = 'color-green'

		}
		return o
	})
	state = dr.setterByField(state,'orderManageList',fromJS(value.list))
	state = dr.setterByField(state,'orderManageListPage',fromJS({
		pageSize: value.page.pageSize,
		current: value.page.currentPage,
		total: value.page.sumCloum
	}))
	state = dr.setterByField(state,'activeKey','13')

	let i = 0
	partnerData = partnerData.map(o => {
		o.headerLine = i
		i++
		return o
	})
	state =  dr.setterByField(state,'partnerList',fromJS(partnerData))
	state = dr.setterByField(state,'orderManage.beginDate',time.beginDate.split(' ')[0])
	state = dr.setterByField(state,'orderManage.endDate',time.endDate.split(' ')[0])
	return state
}
export function initParnterManage(state,value){
	let i = 0,parentList
	value = value.map(o => {
		o.headerLine = i
		i++
		return o
	})
	state =  dr.setterByField(state,'partnerList',fromJS(value))
	value.unshift({name:'无',id:-1})
	state = dr.setter(state,'admin.createPartner.formItems.parentPartner','dataSource',fromJS(value))
	state = dr.setterByField(state,'activeKey','14')
	state = dr.setterByField(state,'isShowCreatePartner',false)
	state = dr.setterByField(state,'currentPartnerIndex',undefined)
	state = dr.setterByField(state,'createPartner',fromJS({}))
	return state
}

export function initVersionManage(state,value){
	let i = 0,
		versionList = value.list.map(o => {
			o.headerLine = i
			o.versionContentStr = o.versionContent.replace(/ν/g,' ')
			i++
			return o
		})
	state = dr.setterByField(state,'versionList',fromJS(versionList))
	state = dr.setterByField(state,'versionPage',fromJS({
		pageSize: value.page.pageSize,
		current: value.page.currentPage,
		total: value.page.sumCloum
	}))

	// value.unshift({name:'无',id:-1})
	// state = dr.setter(state,'admin.createPartner.formItems.parentPartner','dataSource',fromJS(value))
	state = dr.setterByField(state,'activeKey','16')
	// state = dr.setterByField(state,'isShowCreatePartner',false)
	state = dr.setterByField(state,'currentVersionIndex',undefined)
	state = dr.setterByField(state,'isShowCreateVersion',false)
	state = dr.setterByField(state,'createVersion',fromJS({}))
	return state
}

export function initAllManualKeys(state, value, maxHeight) {
	state = dr.setterByField(state,'activeKey','15')
	state = dr.setterByField(state,'sTSManage.maxHeight', maxHeight)
	state = dr.setterByField(state, 'sTSManage.allManualKeys', fromJS(value))
	state = dr.setterByField(state, 'sTSManage.list', fromJS(value))
	return state
}

export function initGuideKeys(state, value, maxHeight) {
	state = dr.setterByField(state, 'guideManageInitView.Id',value.list[0].logo)
	state = dr.setterByField(state,'activeKey','15')
	state = dr.setterByField(state,'guideManage.maxHeight', maxHeight)
	state = dr.setterByField(state, 'guideManage.guideKeys', fromJS(value.list))
	return state
}

export function searchKeys(state, value) {
	state = dr.setterByField(state, 'sTSManage.allManualKeys', value)
	return state
}

export function guidesearchKeys(state, value) {
	state = dr.setterByField(state, 'guideManage.guideKeys', value)
	return state
}

export function clearExtKeys(state) {
	state = dr.setterByField(state, 'form.clearExtKeys', true)
	return state
}

export function updataExtKeys(state, index, clearExtKeys) {
	if(clearExtKeys) {
		let allManualKeys = dr.getterByField(state, 'sTSManage.allManualKeys'),
			newValue = allManualKeys.get(index).set('extKeys', '')
		allManualKeys = allManualKeys.set(index, newValue)
		state = dr.setterByField(state, 'sTSManage.allManualKeys', allManualKeys)
		state = dr.setterByField(state, 'form.clearExtKeys', false)
	}
	state = dr.setterByField(state, 'form.clearExtKeys', false)

	return state
}

export function updataExtKeys1(state, index) {
	state = dr.setterByField(state, 'form.clearExtKeys', false)

	return state
}


export function updateManualKeys(state, index, keys, editExtValue1) {
	let allManualKeys = dr.getterByField(state, 'sTSManage.allManualKeys'),
		newValue = allManualKeys.get(index).set('keys', fromJS(keys))
	if(editExtValue1) {
		newValue = allManualKeys.get(index).set('extKeys', '')
	}
	allManualKeys = allManualKeys.set(index, newValue)
	state = dr.setterByField(state, 'sTSManage.allManualKeys', allManualKeys)
	state = dr.setterByField(state, 'form.clearExtKeys', false)
	state = dr.setterByField(state, 'sTSManage.list', allManualKeys)
	return state
}

export function updateManualKeys1(state, index, newKeys) {
	let guideKeys = dr.getterByField(state, 'guideManage.guideKeys'),
			newValue = guideKeys.get(index).set('keyWords', newKeys)
	guideKeys = guideKeys.set(index, newValue)
	state = dr.setterByField(state, 'guideManage.guideKeys', guideKeys)
	return state
}

export function updateMyOrder(state,data,type,value) {
	if(type=='search') {
		state = dr.setterByField(state,'myorder.searchValue',value)

	} else if(type=='type') {
		state =dr.setterByField(state,'myorder.typeValue',value)
	} else if(type=='ordertype') {
		state =dr.setterByField(state,'myorder.orderTypeValue',value)
	} else if(type=='prompt') {
		state =dr.setterByField(state,'myorder.promptValue',value)
	}

	state = dr.setterByField(state,'myorder.orderList',fromJS(data.list))
	return state
}
export function updateMyOrderSwy(state,data,type,value) {
	if(type=='search') {
		state = dr.setterByField(state,'myorderSwy.searchValue',value)

	} else if(type=='type') {
		state =dr.setterByField(state,'myorder.typeValue',value)
	} else if(type=='ordertype') {
		state =dr.setterByField(state,'myorderSwy.orderTypeValue',value)
	} else if(type=='prompt') {
		state =dr.setterByField(state,'myorder.promptValue',value)
	}

	state = dr.setterByField(state,'myorderSwy.orderListSwy',fromJS(data.list))
	return state
}

export function updateVersionItem(state, rowIndex, value) {
	// let versionContentList = dr.getterByField(state,'createVersion.versionContentList').toJS()
 //    versionContentList.splice(rowIndex,0,value)
	state = dr.setterByField(state,'createVersion.versionContentList.'+rowIndex+'.item',value)
	return state
}

export function updateSearchOrgValue(state,type,value) {
	// if(type=='name') {
	// 	state = dr.setterByField(state,'myorder.searchNameValue',value)
	// } else if(type=='phone') {
	// 	state =dr.setterByField(state,'myorder.searchPhoneValue',value)
	// } else if(type=='beginDate') {
	// 	state = dr.setterByField(state,'orderManage.beginDate',value)
	// } else if(type=='endDate') {
	// 	state = dr.setterByField(state,'orderManage.endDate',value)
	// }
	if(type=='name') {
		state = dr.setterByField(state,'orderManage.searchNameValue',value)
	} else if(type=='phone') {
		// value = value.replace(/\s+/g, '')
		state =dr.setterByField(state,'orderManage.searchPhoneValue',value)
	} else if(type=='beginDate') {
		state = dr.setterByField(state,'orderManage.beginDate',value)
	} else if(type=='endDate') {
		state = dr.setterByField(state,'orderManage.endDate',value)
	} else if(type=='partner') {
		state = dr.setterByField(state,'orderManage.partnerValue',value)
	} else if(type=='orderType') {
		state = dr.setterByField(state,'orderManage.orderType',value-0)
	}
	return state
}

export function updateSearchOrgValueSwy(state,type,value) {
	if(type=='name') {
		state = dr.setterByField(state,'orderManageSwy.searchNameValue',value)
	} else if(type=='phone') {
		// value = value.replace(/\s+/g, '')
		state =dr.setterByField(state,'orderManageSwy.searchPhoneValue',value)
	} else if(type=='beginDate') {
		state = dr.setterByField(state,'orderManageSwy.beginDate',value)
	} else if(type=='endDate') {
		state = dr.setterByField(state,'orderManageSwy.endDate',value)
	} else if(type=='partner') {
		state = dr.setterByField(state,'orderManageSwy.partnerValue',value)
	} else if(type=='orderType') {
		state = dr.setterByField(state,'orderManageSwy.orderType',value-0)
	}
	return state
}

export function partnerUpdate(state,rowIndex,currentPartner,partnerList,curId) {
	state = dr.setterByField(state,'isShowCreatePartner',true)
	// let currentPartner = dr.getterByField(state,'partnerList.'+rowIndex)
	state = dr.setterByField(state,'currentPartnerIndex',rowIndex)
	if(currentPartner) {
		let curParent
		state = dr.setterByField(state,'createPartner.name',currentPartner.name)
		state = dr.setterByField(state,'createPartner.appServiceTel',currentPartner.appServiceTel)
		state = dr.setterByField(state,'createPartner.id',curId)
		if(currentPartner.parentId) {
			partnerList.map(o=> {
				if(o.id == currentPartner.parentId) {
					curParent = o
				}
			})
			state = dr.setterByField(state,'createPartner.parentPartner',fromJS(curParent))
		}

	}
	state = dr.setter(state,'admin.createPartner.formItems.name','disabled',true)
	state = dr.setter(state,'','dataSource',fromJS(partnerList.unshift({name:'无',id:-1})))
	return state
}

export function versionUpdate(state,rowIndex,list,versionUpdate) {
	let curVersion = dr.getterByField(state,'versionList.'+rowIndex).toJS(),
		form,contentItem
	contentItem = versionUpdate.contents.map(o => {
		let obj = {}
		obj.item = o
		return obj
	})
	contentItem.push({
		item: undefined
	})
	form={
		mtype: versionUpdate.mtype==1?{
                  name: '代账端',
                  id: 1
                }:{
                  name: '企业端',
                  id: 2
                },
		versionNum: versionUpdate.versionNum,
		updateTime: versionUpdate.updateTime.split(' ')[0],
		versionTitle: versionUpdate.versionTitle.replace(/\ν/g,'\n'),
		isTips: versionUpdate.isTips==0?{
                  name: '不显示',
                  id: 0
                }:{
                  name: '显示',
                  id: 1
                },
		versionContentList: contentItem
	}
	list.map(o=> {
		if(o.id ==curVersion.appId) {
			form.app = o
		}
	})
	form.app = {id:100,name:'易嘉人'}
	if(curVersion.isTips==0) {
		state = dr.setter(state,'admin.createVersion.formItems.versionTitle','visible',false)
	} else {
		state = dr.setter(state,'admin.createVersion.formItems.versionTitle','visible',true)
	}

	state = dr.setter(state,'admin.createVersion.formItems.app','dataSource',fromJS(list))
	state = dr.setter(state,'admin.createVersion.formItems.app','multiple',false)
	state = dr.setterByField(state,'createVersion',fromJS(form))
	state = dr.setterByField(state,'isShowCreateVersion',true)
	// let currentPartner = dr.getterByField(state,'partnerList.'+rowIndex)
	state = dr.setterByField(state,'currentVersionIndex',rowIndex)

	return state
}


export function updateOrderManage(state,data,type,value) {

	if(type=='type') {
		state =dr.setterByField(state,'orderManage.typeManageValue',value)
	} else if(type=='ordertype') {
		state =dr.setterByField(state,'orderManage.orderTypeManageValue',value)
	} else if(type=='prompt') {
		state =dr.setterByField(state,'orderManage.promptManageValue',value)
	} else if(type=='friend') {
		state =dr.setterByField(state,'orderManage.theirFriendValue',value)
	} else if(type=='paytype') {
		state = dr.setterByField(state,'orderManage.payTypeValue',value)
	} else if(type=='ordersource') {
		state = dr.setterByField(state,'orderManage.orderSourceValue',value)
	}

	data.list = data.list.map(o => {
		if(o.orderStatus==1) {
			o.orderStatusStr = '待支付'
			o.orderStatusClass = 'color-orange'
		} else if(o.orderStatus==2) {
			o.orderStatusStr = '待处理'
			o.orderStatusClass = 'color-orange'

		} else if(o.orderStatus==3) {
			o.orderStatusStr = '处理失败'
			o.orderStatusClass = 'color-orange'

		} else if(o.orderStatus==4) {
			o.orderStatusStr = '交易完成'
			o.orderStatusClass = 'color-green'

		} else if(o.orderStatus==5) {
			o.orderStatusStr = '已取消'
			o.orderStatusClass = 'color-gray'

		} else if(o.orderStatus==6) {
			o.orderStatusStr = '已删除'
			o.orderStatusClass = 'color-gray'

		} else {
			o.orderStatusStr = ''
			o.orderStatusClass = 'color-green'

		}
		return o
	})

	state = dr.setterByField(state,'orderManageList',fromJS(data.list))
	state = dr.setterByField(state,'orderManageListPage',fromJS({
		pageSize: data.page.pageSize,
		current: data.page.currentPage,
		total: data.page.sumCloum
	}))
	return state
}
export function updateOrderManageSwy(state,data,type,value) {

	if(type=='type') {
		state =dr.setterByField(state,'orderManageSwy.typeManageValue',value)
	} else if(type=='ordertype') {
		state =dr.setterByField(state,'orderManageSwy.orderTypeManageValue',value)
	} else if(type=='prompt') {
		state =dr.setterByField(state,'orderManageSwy.promptManageValue',value)
	} else if(type=='friend') {
		state =dr.setterByField(state,'orderManageSwy.theirFriendValue',value)
	} else if(type=='paytype') {
		state = dr.setterByField(state,'orderManageSwy.payTypeValue',value)
	} else if(type=='ordersource') {
		state = dr.setterByField(state,'orderManageSwy.orderSourceValue',value)
	}

	data.list = data.list.map(o => {
		if(o.orderStatus==1) {
			o.orderStatusStr = '待支付'
			o.orderStatusClass = 'color-orange'
		}  else if(o.orderStatus==2) {
			o.orderStatusStr = '交易完成'
			o.orderStatusClass = 'color-green'

		} else if(o.orderStatus==3) {
			o.orderStatusStr = '已取消'
			o.orderStatusClass = 'color-gray'

		} else if(o.orderStatus==4) {
			o.orderStatusStr = '已删除'
			o.orderStatusClass = 'color-gray'

		} else {
			o.orderStatusStr = ''
			o.orderStatusClass = 'color-green'

		}
		return o
	})

	state = dr.setterByField(state,'orderManageListSwy',fromJS(data.list))
	state = dr.setterByField(state,'orderManageListPageSwy',fromJS({
		pageSize: data.page.pageSize,
		current: data.page.currentPage,
		total: data.page.sumCloum
	}))
	return state
}

export function updateOrderTypeManage(state,value) {
	state = dr.setterByField(state,'orderManage.orderType',value)
	return state
}

export function updateVatTaxpayerManage(state, value) {
	state = dr.setterByField(state,'orderManage.vatTaxpayer',value)
	return state
}

export function updatePayTypeManage(state,value) {
	state = dr.setterByField(state,'orderManage.payType',value)
	return state
}

export function setMainList(state,value,tab,list){
	let order = {},
		invoiceType,content,title,address
	order = value
	// order.invoice = value.invoice
	// order.code = value.code
	// order.userName = value.userName
	// order.createTime = value.createTime.split(' ')[0]
	// order.orgName = value.orgName
	// order.productName = value.productName
	// order.productPrice = value.productPrice
	// order.amount = value.amount
	// order.payStatus = value.payStatus
	// order.orderType = value.orderType
	// order.payType = value.payType
		if(order.invoice){
			order.invoiceType = order.invoice.invoiceType
			order.content = order.invoice.content
			order.title = order.invoice.title
			order.address = order.invoice.address
		}
		// order.id = value.id
	if(value.invoice&&list) {
			let cityList = list.cityList,
				countyList = list.countyList,
				provinceList = list.provinceList,
				// curAddr = dr.getterByField(state,'form.address'),
				addrStr
			provinceList.map(o=> {
				if(value.invoice.addressProvincial==o.code) {
					addrStr = o.name+' '
					// state= dr.setterByField(state,'form.provincesStr',o.name)
				}
			})
			cityList.map(o=> {
				if(value.invoice.addressCity==o.code) {
					addrStr = addrStr + o.name+' '
					// state= dr.setterByField(state,'form.cityStr',o.name)
				}
			})
			countyList.map(o=> {
				if(value.invoice.addressCounty==o.code) {
					addrStr = addrStr + o.name+' '
					// state= dr.setterByField(state,'form.districtsStr',o.name)
				}
			})
			addrStr +=value.invoice.addressDetail
			order.addrStr = addrStr
	}
	state = dr.setterByField(state,'order',fromJS(order))
	state = dr.setterByField(state,'showOrder',tab)
	// state = dr.setterByField(state, 'OrderID', code)
	// state = dr.setterByField(state, 'id', value.id)
	// state = dr.setterByField(state, 'userName', userName)
	// state = dr.setterByField(state,'createTime',createTime)
	// state = dr.setterByField(state,'orgName',orgName)
	// state = dr.setterByField(state,'productName',productName)
	// state = dr.setterByField(state,'productPrice',productPrice)
	// state = dr.setterByField(state,'amount',amount)
	// state = dr.setterByField(state,'payStatus',payStatus)
	// state = dr.setterByField(state,'orderType',orderType)
	// state = dr.setterByField(state,'invoice',invoice)
	// state = dr.setterByField(state,'payType',payType)
	// state = dr.setterByField(state,'invoiceType',invoiceType)
	// state = dr.setterByField(state,'content',content)
	// state = dr.setterByField(state,'title',title)
	// state = dr.setterByField(state,'address',address)

	state = dr.setterByField(state,'activeKey','11')
	return state
}

export function setMainListSwy(state,value,tab,list){
	let order = {},
		invoiceType,content,title,address
	order = value

    if(order.invoice){
        order.invoiceType = order.invoice.invoiceType
        order.content = order.invoice.content
        order.title = order.invoice.title
        order.address = order.invoice.address
    }
	if(value.invoice&&list) {
			let cityList = list.cityList,
				countyList = list.countyList,
				provinceList = list.provinceList,
				// curAddr = dr.getterByField(state,'form.address'),
				addrStr
			provinceList.map(o=> {
				if(value.invoice.addressProvincial==o.code) {
					addrStr = o.name+' '
					// state= dr.setterByField(state,'form.provincesStr',o.name)
				}
			})
			cityList.map(o=> {
				if(value.invoice.addressCity==o.code) {
					addrStr = addrStr + o.name+' '
					// state= dr.setterByField(state,'form.cityStr',o.name)
				}
			})
			countyList.map(o=> {
				if(value.invoice.addressCounty==o.code) {
					addrStr = addrStr + o.name+' '
					// state= dr.setterByField(state,'form.districtsStr',o.name)
				}
			})
			addrStr +=value.invoice.addressDetail
			order.addrStr = addrStr
	}
	state = dr.setterByField(state,'orderSwy',fromJS(order))
	state = dr.setterByField(state,'showOrderSwy',tab)

	state = dr.setterByField(state,'activeKey','20')
	return state
}

//邀请码管理
export function setInvitationCodeAdministrationData(state,data,maxHeight,maxWidth){
	let invitationCodeAdministrationFrom = dr.getterByField(state,'invitationCodeAdministration.from').toJS()
		// appList = data.appList ? data.appList : [{id:-1,name:'全部'},{id:-1,name:'易嘉人'},{id:1000,name:'账无忌'}]
	invitationCodeAdministrationFrom.page.currentPage = data.page.currentPage
	invitationCodeAdministrationFrom.page.pageSize = data.page.pageSize
	// state =  dr.setter(state,'admin.invitationCodeAdministration.formItems.appId','dataSource',fromJS(appList))
	// if(!invitationCodeAdministrationFrom.appId){
	// 	invitationCodeAdministrationFrom.appId = appList[0]
	// }
	//如果是张无忌的运营人员进来不显示来源检索
	// state =  dr.setter(state,'admin.invitationCodeAdministration.formItems.appId','visible',dr.getterByField(state,'appInfo.id') == 100)
	state = dr.setterByField(state,'invitationCodeAdministration.from',fromJS(invitationCodeAdministrationFrom))
	state = dr.setterByField(state,'invitationCodeAdministration.ajaxData',fromJS(data.list))
	state = dr.setterByField(state,'invitationCodeAdministration.total',data.page.sumCloum)
	if(maxHeight!==undefined) {
		state = dr.setterByField(state,'invitationCodeAdministration.maxHeight',maxHeight)
	}
	if(maxWidth!==undefined) {
		state = dr.setterByField(state,'invitationCodeAdministration.maxWidth',maxWidth)
	}
	state = dr.setterByField(state,'invitationCodeAdministration.reqCodeDisabled',false)
	return state
}

//服务商信息页码
export function setInvitationCodeAdministrationCurrent(state,current){
	return dr.setterByField(state,'invitationCodeAdministration.from.page.currentPage',current)
}
//服务商信息每页显示多少条
export function setInvitationCodeAdministrationPageSize(state,pageSize){
	state = dr.setterByField(state,'invitationCodeAdministration.from.page.pageSize',pageSize)
	state = dr.setterByField(state,'invitationCodeAdministration.from.page.currentPage',1)
	return state
}
//运营管理
export function showOperateAuthList(state,value){
	let operationList = [],
		page = value.page,
		paging={}

	paging.currentPage = page.currentPage
	paging.pageSize = page.pageSize
	paging.total = page.sumCloum

	value.list.map((element,index)=>{
		operationList.push({
			phone:element.mobile,
			user:element.userName,
			friend:element.appName,
			role:element.roleName,
			roleId:element.roleId,
			id:element.id
		})
	})
	state = dr.setterByField(state,'paging',fromJS(paging))
	state = dr.setterByField(state,'activeKey','38')
	state = dr.setterByField(state,'operationList',fromJS(operationList))
	return state
}
export function setOperationCurrent(state,current){
	return dr.setterByField(state,'operation.from.page.currentPage',current)
}
export function setOperationPageSize(state,pageSize){
	state = dr.setterByField(state,'operation.from.page.pageSize',pageSize)
	state = dr.setterByField(state,'operation.from.page.currentPage',1)
	return state
}
export function backDzInfo(state,isOrganizationalList) {
	// if(isOrganizationalList) {
	// 	state = dr.setterByField(state, 'activeKey', 10)
	// } else {
	// 	state = dr.setterByField(state, 'activeKey', 18)

	// }
	state = dr.setterByField(state,'isOrganizationalList',isOrganizationalList)
	return state
}

export function setOrganizetionalList(state,value,list) {
	let organizetionalListInfo = dr.getterByField(state,'organizetionalListInfo').toJS()
	state = dr.setterByField(state,'organizetionalList',fromJS(value.list))
	organizetionalListInfo.page = {
		pageSize: value.page.pageSize,
		currentPage: value.page.currentPage,
		total: value.page.sumCloum
	}
	organizetionalListInfo.vatTaxpayer = list.vatTaxpayer
	organizetionalListInfo.dzOrgId = list.dzOrgId
	state = dr.setterByField(state,'organizetionalListInfo',fromJS(organizetionalListInfo))
	state = dr.setterByField(state,'isOrganizationalList',true)

	return state
}

//新邀请码管理
export function setinviteCodeAdministrationData(state,data,maxHeight,maxWidth,transTree,curItem,auth) {
	let inviteCode = dr.getterByField(state,'inviteCode.from').toJS(),
		leftTree = dr.getterByField(state,'leftTree').toJS(),
		i=1,list
		// inviteCode.page.currentPage = data.page.currentPage
		// inviteCode.page.pageSize = data.page.pageSize
	if(auth === undefined) {
		auth = dr.getterByField(state,'inviteCodeAuth')
	}
	state = dr.setterByField(state,'inviteCodeAuth',auth)
	//如果是张无忌的运营人员进来不显示来源检索
	// state = dr.setterByField(state,'leftTree',fromJS(leftTree))
	state = dr.setterByField(state,'leftTree',fromJS(transTree))
	// if(transTree.length) {
	// 	state = dr.setterByField(state, 'deptSelectedKeys',fromJS([transTree[0].id+'']))
	// 	state = dr.setterByField(state,'curLevel',1)
	// 	state = dr.setterByField(state,'curId',transTree[0].id)
	// 	state = dr.setterByField(state,'parentId',undefined)
	// }
	if(curItem) {
		if(curItem.parentId) {
			state = dr.setterByField(state, 'deptSelectedKeys',fromJS([curItem.id+'']))
			state = dr.setterByField(state,'curLevel',2)
			state = dr.setterByField(state,'curId',curItem.id)
			state = dr.setterByField(state,'parentId',curItem.parentId)
		} else {
			state = dr.setterByField(state, 'deptSelectedKeys',fromJS([curItem.id+'']))
			state = dr.setterByField(state,'curLevel',1)
			state = dr.setterByField(state,'curId',curItem.id)
			state = dr.setterByField(state,'parentId',undefined)
		}
	} else {
		state = dr.setterByField(state, 'deptSelectedKeys',fromJS([]))
		state = dr.setterByField(state,'curLevel',undefined)
		state = dr.setterByField(state,'curId',undefined)
		state = dr.setterByField(state,'parentId',undefined)
	}
	// state = dr.setterByField(state,'inviteCode.from',fromJS(inviteCode))

	state = setInviteCodeList(state,data,inviteCode)
	// list = data.list.map(o => {
	// 	o.select = false
	// 	o.operate = '编辑优惠金额'
	// 	o.intex = (inviteCode.page.currentPage-1)*inviteCode.page.pageSize+i
	// 	i++
	// 	return o
	// })

	// state = dr.setterByField(state,'inviteCode.ajaxData',fromJS(list))
	// state = dr.setterByField(state,'inviteCode.total',data.page.sumCloum)
	if(maxHeight!==undefined) {
		state = dr.setterByField(state,'inviteCode.maxHeight',maxHeight)
	}
	if(maxWidth!==undefined) {
		state = dr.setterByField(state,'inviteCode.maxWidth',maxWidth)
	}
	state = dr.setterByField(state,'inviteCode.reqCodeDisabled',false)
	if(auth!=2) {
		state = dr.setter(state,`admin.invitateCodeGrid.operate`,'disabled',true)
	} else {
		state = dr.setter(state,`admin.invitateCodeGrid.operate`,'disabled',false)
	}
	return state
}

export function setInviteCodeList(state,data,inviteCode,curId, curLevel, parentId,params) {
	let i=1,list
	let auth = dr.getterByField(state,'inviteCodeAuth')
	inviteCode.page.currentPage = data.page.currentPage
	inviteCode.page.pageSize = data.page.pageSize
	if(curId) {
		state = dr.setterByField(state,'curLevel',curLevel)
		state = dr.setterByField(state,'curId',curId)
		state = dr.setterByField(state,'parentId',parentId)
		state = dr.setterByField(state,'deptSelectedKeys',fromJS([curId+'']))
	}

	state = dr.setterByField(state,'inviteCode.from',fromJS(inviteCode))
	list = data.list.map(o => {
		o.select = false
		o.operate = '编辑优惠金额'
		o.enableDuring = o.enabledYear+'-'+o.enabledMonth
		o.rindex = (inviteCode.page.currentPage-1)*inviteCode.page.pageSize+i
		o.createTime = o.createTime?o.createTime.split(' ')[0]:''
		o.expireTime = o.expireTime?o.expireTime.split(' ')[0]:''
		i++
		if(o.status==0) {
			o.statusStr = '未激活'

		} else if(o.status==1) {
			o.statusStr = '已激活'

		} else if(o.status==2) {
			o.statusStr = '已购买'

		}
		return o
	})
	state = dr.setterByField(state,'params',params)
	state = dr.setterByField(state,'inviteCode.ajaxData',fromJS(list))
	state = dr.setterByField(state,'inviteCode.total',data.page.sumCloum)
	state = dr.setterByField(state,'inviteCode.errorList',fromJS([]))
	state = dr.setterByField(state,'inviteCode.isImportCustomerError',false)

	list.map((element,index)=>{
		if(auth==2) {

			if(element.status==0) {//0 wjh 1 yjh 2 ygm
				state = dr.setter(state,`admin.invitateCodeGrid.select,${index}`,'disabled',false)
				state = dr.setter(state,`admin.invitateCodeGrid.operate,${index}`,'disabled',false)
				state = dr.setter(state,`admin.invitateCodeGrid.select,${index}`,'displayComponent','')
			} else if(element.status==1) {//0 wjh 1 yjh 2 ygm
				state = dr.setter(state,`admin.invitateCodeGrid.select,${index}`,'disabled',true)
				state = dr.setter(state,`admin.invitateCodeGrid.operate,${index}`,'disabled',false)
				state = dr.setter(state,`admin.invitateCodeGrid.select,${index}`,'displayComponent','')
			} else if(element.status==2) {
				state = dr.setter(state,`admin.invitateCodeGrid.select,${index}`,'disabled',true)
				state = dr.setter(state,`admin.invitateCodeGrid.operate,${index}`,'disabled',true)
				state = dr.setter(state,`admin.invitateCodeGrid.select,${index}`,'displayComponent','')
			}
		} else {
			state = dr.setter(state,`admin.invitateCodeGrid.operate,${index}`,'disabled',true)

		}
	})

	list = list.map(o => {
		if(o.status==0) {
			o.statusStr = '未激活'

		} else if(o.status==1) {
			o.statusStr = '已激活'

		} else if(o.status==2) {
			o.statusStr = '已购买'

		}else if(o.status==-1) {
			o.statusStr = '邀请码状态'

		}
		return o
	})

	return state
}

export function onEvent(state,eventName, option) {
	state = dr.onEvent(state,eventName, option)
	if(eventName === 'onGridSelectAll') {
		if(option.path=='admin.invitateCodeGrid.select') {
			let list = dr.getterByField(state,'inviteCode.ajaxData').toJS()
			list = list.map(o => {
				if(o.status==1||o.status==2) {
					o.select = false

				}
				return o
			})
			state = dr.setterByField(state, 'inviteCode.ajaxData',fromJS(list))
		}
	}else if (eventName === 'onMatrixEditorAddRow') {//新增一行消息
		let createHomeInfoData = dr.getterByField(state, 'createHomeInfo.createHomeInfoData').toJS()

        createHomeInfoData.push({title:'',address:''})

        state = dr.setterByField(state,'createHomeInfo.createHomeInfoData',fromJS(createHomeInfoData))
    }else if (eventName === 'onMatrixEditorDelRow') {//删除一行消息
		let createHomeInfoData = dr.getterByField(state, 'createHomeInfo.createHomeInfoData').toJS(),
			rowIndex = option.rowIndex

		createHomeInfoData.splice(rowIndex, 1)

		if(createHomeInfoData.length<3){
			for(let i=createHomeInfoData.length;i<3;i++){
				createHomeInfoData.push({title:'',address:''})
			}
		}

		state = dr.setterByField(state,'createHomeInfo.createHomeInfoData',fromJS(createHomeInfoData))
	}
	return state
}

export function setImportErrorData(state, data) {
	state = dr.setterByField(state,'inviteCode.errorList',fromJS(data))
	state = dr.setterByField(state,'inviteCode.isImportCustomerError',true)
}
export function setinviteCodeAdministrationCurrent(state,current) {
	state = dr.setterByField(state,'inviteCode.from.page.currentPage',current)

	return state
}
export function setinviteCodeAdministrationPageSize(state,pageSize) {

	state = dr.setterByField(state,'inviteCode.from.page.pageSize',pageSize)
	state = dr.setterByField(state,'inviteCode.from.page.currentPage',1)
	return state
}

export function onFieldChange(state,path,oldValue, newValue) {
	if (path.indexOf('updatePassword.formItems.newPassWord')!=-1){
		if (newValue != '') {
			state = dr.setterByField(state,'isShow',true)
		}else{
			state = dr.setterByField(state,'isShow',false)
		}
		let pattern = /^\S+$/gi;   //含有非空字符的校验
		if (pattern.test(newValue)) {
			state = dr.setterByField(state,'judgeBlank',true)
			if(newValue.length == 6||/^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+)$/.test(newValue)){
				state =  dr.setterByField(state,'level',0)
			}else if(newValue.length<8||/^((?![a-zA-Z]+$)(?![@#$%^&]+$)[a-zA-Z@#$%^&]+)$|((?!\d+$)(?![a-zA-Z]+$)[a-zA-Z\d]+)$/.test(newValue)){
				state =  dr.setterByField(state,'level',1)
			}else if(newValue.length>=8||/^(?!\d+$)(?![a-zA-Z]+$)(?![@#$%^&]+$)[\da-zA-Z@#$%^&]+$/.test(newValue)){
				state =  dr.setterByField(state,'level',2)
			}
		}else{
			state = dr.setterByField(state,'judgeBlank',false)
		}
	} else if(path.indexOf('admin.enterprise.formItems.selectVersion') != -1) {
		state = dr.setter(state, 'admin.enterprise.formItems.statusOfTaxpayer', 'visible', newValue.get('id') == '2')
	}
	return  dr.onFieldChange(state, path, oldValue, newValue)

}

export function updateSuccess(state) {
	state = dr.setterByField(state,'isShowUpdatePassword',false)
	return state
}

export function saveCurrentDept(state, deptId) {
    return dr.setterByField(state, 'currentDeptId', deptId)
}

export function updateInviteCode(state, curLevel, curId, parentId) {
	state = dr.setterByField(state,'curLevel',curLevel)
	state = dr.setterByField(state,'curId',curId)
	state = dr.setterByField(state,'parentId',parentId)
	state = dr.setterByField(state,'deptSelectedKeys',fromJS([curId+'']))
	return state
}

export function setIsShowUpdatePassword(state, data) {
	state = dr.setterByField(state, 'regCodeStatus',data)
	return state
}

export function importImportInviceCodeError(state, data) {
	state = dr.setterByField(state, 'inviteCode.isImportCustomerError',true)
	state = dr.setterByField(state,'inviteCode.isImportCustomerError',true)

	state = dr.setterByField(state, 'inviteCode.errorList',fromJS(data.list))
	return state
}

//官网管理
//首页消息滚动
export function initHomeInfoManage(state,value){
	let homeInfoList = !!value.list[0] ? value.list : [],
		page = {
            pageSize: value.page.pageSize,
            current: value.page.currentPage,
            total: value.page.sumCloum
        }


	state =  dr.setterByField(state,'homeType','1')
	state =  dr.setterByField(state,'homeInfoList',fromJS(homeInfoList))
	state =  dr.setterByField(state,'homeInfoManageListPage',fromJS(page))
	state = dr.setterByField(state,'isShowCreateHomeInfo',false)
	state = dr.setterByField(state,'activeKey','21')
	return state
}
//设置弹窗显示
export function setAddShow(state,status,value) {
	if(status == 'homeInfo'){
        let createHomeInfoData = [
                        {title:'',address:''},
                        {title:'',address:''},
                        {title:'',address:''}
                    ]
		state = dr.setterByField(state,'isShowCreateHomeInfo',value)
		state = dr.setterByField(state,'createHomeInfo.homeInfoId',undefined)
		state = dr.setterByField(state,'createHomeInfo.homeInfoTs',undefined)
		state = dr.setterByField(state,'createHomeInfo.createHomeInfoData',fromJS(createHomeInfoData))
    }else if(status == 'bigNews'){
        let createBigNewsData = {
						title:'',
						author:'',
						digest:'',
						address:'',
						type: {
							id: 1,
							name: '财税头条'
						}
					}

		state = dr.setterByField(state,'isShowCreateBigNews',value)
		state = dr.setterByField(state,'createBigNews.createBigNewsData',fromJS(createBigNewsData))
		state = dr.setterByField(state,'createBigNews.enclosureAddress',undefined)
    }
	return state
}

export function setHomeInfoUpdate(state,value,id,ts,data) {
	let createHomeInfoData = data

	if(createHomeInfoData.length<3){
		for(let i=createHomeInfoData.length;i<3;i++){
			createHomeInfoData.push({title:'',address:''})
		}
	}
	state = dr.setterByField(state,'createHomeInfo.createHomeInfoData',fromJS(createHomeInfoData))
	state = dr.setterByField(state,'createHomeInfo.homeInfoId',id)
	state = dr.setterByField(state,'createHomeInfo.homeInfoTs',ts)
	state = dr.setterByField(state,'isShowCreateHomeInfo',value)

	return state
}

export function hideCreateHomeInfoCancel(state) {
	state = dr.setterByField(state,'isShowCreateHomeInfo',false)
	return state
}

//头条管理
export function initBigNewsManage(state,value){
	let bigNewsList = !!value.list[0] ? value.list : [],
		page = {
            pageSize: value.page.pageSize,
            current: value.page.currentPage,
            total: value.page.sumCloum
        }

	state = dr.setterByField(state,'bigNewsList',fromJS(bigNewsList))
	state = dr.setterByField(state,'bigNewsManageListPage',fromJS(page))
	state = dr.setterByField(state,'isShowCreateBigNews',false)
	state = dr.setterByField(state,'createBigNews.enclosureAddress',undefined)
	state = dr.setterByField(state,'homeType','2')
	return state
}

//头条编辑
export function setBigNewsUpdate(state,value,bigNews) {
	if(bigNews.type) {
		if(bigNews.type==2) {
			bigNews.type = {
				id: 2, name: '财政解读'
			}
		} else {
			bigNews.type = {
				id: 1, name: '财税头条'
			}
		}
	} else {
		bigNews.type = {
			id: 1, name: '财税头条'
		}
	}
	state = dr.setterByField(state,'createBigNews.createBigNewsData',fromJS(bigNews))
	state = dr.setterByField(state,'createBigNews.enclosureAddress',bigNews.enclosureAddress)
	state = dr.setterByField(state,'isShowCreateBigNews',value)

	return state
}

//头条保存、保存并发布
export function setBigNewsRelease(state,value,status) {
	if(status == 0){
		let createBigNewsData = {
			title:'',
			author:'',
			digest:'',
			address:'',
			type: {
				id: 1,
				name: '财税头条'
			}
		}
		state = dr.setterByField(state,'createBigNews.createBigNewsData',fromJS(createBigNewsData))
	}

	state = dr.setterByField(state,'createBigNews.enclosureAddress',undefined)
	state = dr.setterByField(state,'isShowCreateBigNews',value)

	return state
}

export function setEnclosureAddress(state,enclosureAddress,status) {
	if(status == 'isBigNews'){
		state = dr.setterByField(state,'createBigNews.enclosureAddress',enclosureAddress)
	}else if(status == 'isPartnerPlan'){
		state = dr.setterByField(state,'partnerPlan.enclosureAddress',enclosureAddress)
	}
	return state
}

//伙伴计划管理
export function initPartnerPlanManage(state, value, status, initData){
	let partnerPlanManageList = !!value.list[0] ? value.list : [],
		page = {
            pageSize: value.page.pageSize,
            current: value.page.currentPage,
            total: value.page.sumCloum
        }
    if(!!initData){
    	state = dr.setter(state,'admin.createPartnerPlan.formItems.employeeNum','dataSource',fromJS(initData.employeeNum))
    	state = dr.setter(state,'admin.createPartnerPlan.formItems.type','dataSource',fromJS(initData.partnerType))
    	state = dr.setterByField(state,'partnerPlanInitData',initData)
    }

	state = dr.setterByField(state,'partnerPlanManageList',fromJS(partnerPlanManageList))
	state = dr.setterByField(state,'partnerPlanManageListPage',fromJS(page))
	state = dr.setterByField(state,'partnerPlan.from.partnerPlanStatus',fromJS(status))
	state = dr.setterByField(state,'isShowCreatePartnerPlan',false)
	state = dr.setterByField(state,'isShowAdd',undefined)
	state = dr.setterByField(state,'homeType','3')
	state = dr.setterByField(state,'partnerPlan.enclosureAddress',undefined)
	return state
}
export function hidePartnerPlanCancel(state) {
	state = dr.setterByField(state,'isShowCreatePartnerPlan',false)
	return state
}
//伙伴计划编辑-设置弹窗数据
export function setCreatePartnerPlan(state,value,partnerPlanList,cityData,status) {
	let provinceList = cityData.provinceList,
		cityList = cityData.cityList

	state = dr.setter(state,'admin.createPartnerPlan.formItems.province','dataSource', fromJS(provinceList))
	state = dr.setter(state,'admin.createPartnerPlan.formItems.city','dataSource', fromJS(cityList))
	state = dr.setterByField(state,'isShowCreatePartnerPlan',value)

	if(!!status){//onfieldchang 修改省
		state = dr.setterByField(state,'partnerPlan.createPartnerData.city',fromJS(cityList[0]))
	}

	if(!!partnerPlanList){
		let employeeNumDataSource = dr.getter(state,'admin.createPartnerPlan.formItems.employeeNum').toJS().dataSource,
			TypeDataSource = dr.getter(state,'admin.createPartnerPlan.formItems.type').toJS().dataSource

		partnerPlanList.employeeNum = employeeNumDataSource.filter(item=>{
			return partnerPlanList.employeeNum == item.id
		})[0]
		partnerPlanList.type = TypeDataSource.filter(item=>{
			return partnerPlanList.type == item.id
		})[0]

		partnerPlanList.province = provinceList.filter(item=>{
			return partnerPlanList.province == item.code
		})[0]
		partnerPlanList.city = cityList.filter(item=>{
			return partnerPlanList.city == item.code
		})[0]

		state = dr.setterByField(state,'partnerPlan.createPartnerData',fromJS(partnerPlanList))
		state = dr.setterByField(state,'isShowAdd',partnerPlanList.status)
		state = dr.setterByField(state,'partnerPlan.enclosureAddress',partnerPlanList.enclosureAddress)
	}else if(!partnerPlanList && !status){//status不存在时是点击新增
		let createPartnerData = {
						createTime:'',
						name:'',
						phoneNumber:'',
						email:'',
						companyName:'',
						province:{},
						city:{},
						address:'',
						employeeNum:{},
						type:{},
						serviceContent:'',
						serviceScope:'',
						businessIntroduction:'',
						comment:''
					}

		state = dr.setterByField(state,'isShowAdd','isShowAdd')
		state = dr.setterByField(state,'partnerPlan.createPartnerData',fromJS(createPartnerData))
		state = dr.setterByField(state,'partnerPlan.enclosureAddress',undefined)
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
export function setFeedbackData(state,value){
	return dr.setterByField(state,'feedbackData',fromJS(value))
}
export function feedbackVisibleCtr(state,feedbackVisible){
	return dr.setterByField(state, 'feedbackVisible', feedbackVisible)
}

Object.assign(exports, {...dr,...exports})
