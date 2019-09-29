import Immutable, { Map } from 'immutable'
import * as da from 'dynamicAction'
import * as api from './api.js'
import webapi from 'webapi'
import { Lock } from 'xComponent'

const INIT_URL = 'apps/systemSetting/init'

export function initView(orgId, initTabData, cb, appParams) {
    return injectFuns => {
        let { setMessage, clearMessage, handleWebApiException, getterByField } = da,
            { reduce, post, getContext, setContext, setApiRootPath } = injectFuns,
            context = getContext(),
            currentOrg = context.currentOrg,
            currentUser = context.currentUser,
            orgs = context.orgs,
            industryVersion,
            fengXinHsqjMenu,
            currentOrgId,
            dzOrgId = undefined,
            isServiceProvider = false,
            domain = constant.onlineDomain,
            isDevelop = domain.find(e => window.location.href.indexOf(e.name) != -1) ? false : window.location.href.indexOf('?dev') != -1
        if (orgId) {
            currentOrgId = orgId
        } else {
            currentOrgId = currentOrg ? currentOrg.id : -1
        }
        ``
        if (sessionStorage.getItem('appId') == 102) {
            isServiceProvider = true
        }
        window._getContext = getContext
        if (orgs) {
            let org = orgs.filter(o => o.id == currentOrgId)[0]
            //api接口地址的前缀，后台多业务库场景使用
            setApiRootPath(org && org.apiDomain || "")
        }
        
        if (sessionStorage.getItem('dzOrgId')) {
            dzOrgId = sessionStorage.getItem('dzOrgId')
        }
        if (currentOrgId != -1) {
            sessionStorage.setItem('currentOrgId', currentOrgId)
        }
        if (sessionStorage.getItem('currentOrgId') && sessionStorage.getItem('currentOrgId') != -1 && sessionStorage.getItem('dzOrgId')) {
            currentOrgId = sessionStorage.getItem('currentOrgId')
        }
        if (initTabData && initTabData.fromDz) {
            sessionStorage.setItem('dzOrgId', currentOrg ? currentOrg.id : '')
        }
        if (initTabData && initTabData.fromZf) {
            sessionStorage.setItem('zfOrgId', currentOrg ? currentOrg.id : '')
        }
        dzOrgId = sessionStorage.getItem('dzOrgId')
        api.init(injectFuns.post, currentOrgId, isServiceProvider, dzOrgId).then(data => {
            if (!data.result && data.error) {
                setMessage({
                    type: 'error',
                    mode: 'message',
                    content: data.error.message
                })(injectFuns)
                reduce('removeOrgById', currentOrgId)
                if (cb) {
                    return cb()
                } else {
                    return getterByField('cb')(injectFuns)()
                }
            }
            if (!handleWebApiException(data)(injectFuns)) return

            if (data.value.app && data.value.app.id == 1000 && window._vds) {
                window._vds.push(['setCS1', 'user_id', data.value.user.id])
            }
            if (!data.value.roles || !data.value.roles.length || !data.value.menuIds || !data.value.menuIds.length){
                cb && cb()
            }

            let initData = api.getData()
            fengXinHsqjMenu=data.value.fengXinHsqjMenu
            industryVersion=data.value.industryVersion
            initData.disableMenus = data.value.disableMenus
            initData.appInfo = data.value.app
            initData.appId = data.value.currOrg.appId
            initData.currentOrgId = currentOrgId
            initData.currOrg = data.value.currOrg
            initData.userName = data.value.user.name
            initData.appParams = appParams

            let companyName = data.value.currOrg.name,
                mobile = data.value.user.mobile,
                userName = data.value.user.name,
                friendName = constant.APPINFO.getAppName(data.value.currOrg.appId),
                industryName = constant.INDUSTRY.getIndustryName(data.value.currOrg.industry)
            window.qimoClientId={nickName:userName,customField:{'伙伴名称':friendName,'公司名称':companyName,'手机号':mobile,'行业':industryName}}
            //menuId = 2200 = 汇算清缴
            if (data.value.currOrg.industry != 1006 
                && !(data.value.currOrg.industry == 1007 && data.value.currOrg.industryVersion == 1 /*不含税版本的幼教行业隐藏 2018-08-30 by zq*/) 
                && !(data.value.currOrg.industry == 1007 && data.value.currOrg.industryVersion == 2 && data.value.roles[0].code == '005'/*幼教行业纳税版本，业务员角色隐藏 2018-08-30 by cqs*/)
                && data.value.currOrg.industry != 1008/*律所行业隐藏 2018-08-30 by cqs*/
                && !(data.value.currOrg.appId == 1001 && industryVersion && !fengXinHsqjMenu)//蜂信隐藏汇算清缴
            ) {
                if(data.value.currOrg.orgType == 2) {
                    data.value.menuIds.push('2200')
                }
            }

            if (isDevelop) {
                //开发模式
                //开发模式使用的菜单在上线之后请在这里删除 2018-04-24 by 赵烁
                data.value.menuIds = [...data.value.menuIds]
            } 
            //餐饮业添加正在开发中的菜单
            if (data.value.currOrg.industry == 1006) {
                //industryVersion 1:餐饮流水账；2:餐饮财务账
                //9700资产管理假菜单
                if (data.value.industryVersion == 1){
                    data.value.menuIds = [...data.value.menuIds, 9800, 9600, 9500, 9700]
                }
            }
            /**
             * portal页统一删除菜单
             */
            for (let i = 0; i <= data.value.menuIds.length; i++) {
                //删除餐饮业《收入分类统计表》《支出分类统计表》报表
                if (data.value.menuIds[i] == 210002 || data.value.menuIds[i] == 210003) {
                    data.value.menuIds.splice(i, 1)
                    i--
                }
                //如果当前是小规模纳税人身份，删除《发票认证》、《待抵扣进项税额台账》菜单
                if (data.value.currOrg.vatTaxpayer == 42){
                    if (data.value.menuIds[i] == 204004 || data.value.menuIds[i] == 204005) {
                        data.value.menuIds.splice(i, 1)
                        i--
                    }
                }
                //如果不是 即征即退 删除《即征即退分摊》菜单
                if (!data.value.isLevyRetreat){
                    if (data.value.menuIds[i] == 204006) {
                        data.value.menuIds.splice(i, 1)
                        i--
                    }
                }
                
                //如果是健康美容行业 干掉 《新增凭证》菜单
                if (data.value.currOrg.industry == 1005 && data.value.menuIds[i] == 203001) {
                    data.value.menuIds.splice(i, 1)
                    i--
                }
           }
            //根据角色打开第一个也签
            addFirstTab(initData, data.value, api.getMenus(),injectFuns)
            //餐饮业不允许打开操作流程 industry = 1006 = 餐饮业
            //industryVersion 1:餐饮流水账；2:餐饮财务账
            let isShowGettingStarted = data.value.currOrg.industry == 1006 || data.value.currOrg.industry == 1009 ? data.value.industryVersion == 2 : true
            //集团版的餐饮业显示操作流程
            if(initData.appId==103 && data.value.currOrg.orgType==3){
                isShowGettingStarted = true
            }
            //appParams.target参数代表要打开单独的app，所以没有必要再打开操作流程了
            //appParams.target 是外部单独引用账无忌的某一个模块 例子：?target=/apps/login/admin
            if (!(appParams && appParams.target) && data.value.gettingStarted === true && isShowGettingStarted) {
                if (data.value.currOrg.orgType == 1) {
                    addGettingStartedTab(initData, data.value.roles, data.value.currOrg.orgType, data.value)
                } else {
                    addGettingStartedTab(initData, data.value.roles, null, data.value)
                }
            }
            //集团总分的账套进portal页
            //在这里判断当前打开操作流程还是我的桌面
            //isHistoryLogin 代表是否在本机登录过，默认false即没有登录过
            if (data.value.currOrg.orgType == 3 && data.value.app.id == 103 && localStorage.getItem('isHistoryLogin')){
                initData.currentTab = { title: "我的桌面", url: "apps/welcome" }
            }else{
                localStorage.setItem('isHistoryLogin', true)
            }

            if (data.value.currOrg.orgType == 1) {
                initData.fromDz = data.value.currOrgId
            }

            setTimeout(() => {
                webapi.dz.queryTopOne(injectFuns.post, {}).then(data => {
                    // if (!da.handleWebApiException(data)(injectFuns)) return
                    if (!data) return
                    injectFuns.reduce('showQueryTopOne', data.value)
                })
                clearInterval(window.queryQRCodeTimer)
                showQueryTopOne()(injectFuns)
                showService()(injectFuns)
            }, 100)
            if (sessionStorage.getItem('dzOrgId')) {
                initData.fromDz = sessionStorage.getItem('dzOrgId')
            }
            if (sessionStorage.getItem('zfOrgId')) {
                initData.fromZf = sessionStorage.getItem('zfOrgId')
            }
            if (data.value.roles) {
                initData.hasGettingStartedAuth = !!getGettingStartedUrl(data.value.roles)
            }
            //企业信息的大刷新
            if (initTabData && initTabData.fromOrgArchive) {
                //如果即征即退参数为否关掉已经打开的即征即退进项分摊菜单
                if (!data.value.isLevyRetreat) {
                    initTabData.tabData.map((value, index) => {
                        if (value.url === 'apps/fi/manageTax/levyRetreatShare') {
                            initTabData.tabData.splice(index, 1)
                        }
                    })
                }
                initData.tabs = initTabData.tabData
                initData.currentTab = initTabData.currentTab
            } else if (initTabData && (initTabData.fromDz || initTabData.fromZf)) {
                //从代账或者总分去账无忌时，记录当前已经打开的页签
                let This = this,
                    isPushTab = true
                initData.fromDzTabData = initTabData
                if (initTabData.openTab) {
                    initData.tabs.map((e, i) => {
                        if (e.url === initTabData.openTab.url) {
                            return isPushTab = false
                        }
                    })
                    if (isPushTab) {
                        initData.tabs.push(initTabData.openTab)
                    }
                    if(initTabData.openTab.url === 'apps/fi/manageTax/declareTaxOfValueAdded'||initTabData.openTab.url === 'apps/fi/manageTax/declareTaxOfValueAddedGeneral'){
                        initTabData.openTab.auth = data.value.auth
                        initTabData.openTab.btnStatus = [{204001:2}]
                        initTabData.openTab.pageId = 204001
                    }
                    initData.currentTab = initTabData.openTab
                }
                initData.fromDzName = initTabData ? initTabData.currentTab.title : ''
            } else if (initTabData && initTabData.companyToDz) {
                //从账无忌回到代账端或者总分，将记录的页签状态还原
                let This = this,
                    isPushTab = true
                if (da.getterByField('fromDzTabData')(injectFuns)) {
                    initData.tabs = da.getterByField('fromDzTabData.tabData')(injectFuns).toJS()
                    if (initTabData.openTab) {
                        initData.tabs.map((e, i) => {
                            if (e.url === initTabData.openTab.url) {
                                return isPushTab = false
                            }
                        })
                        if (isPushTab) {
                            initData.tabs.push(initTabData.openTab)
                        }
                        initData.currentTab = initTabData.openTab
                    } else {
                        initData.currentTab = da.getterByField('fromDzTabData.currentTab')(injectFuns).toJS()
                    }
                } else {
                    if (!da.getterByField('fromZf')(injectFuns)){
                        initData.currentTab = { title: '首页', url: 'apps/welcome', props: { homeUrl: (data && data.value && data.value.app) ? data.value.app.homeUrl : '#' } }
                    }
                }
            }

            initData.hasGettingStartedAuth = !!getGettingStartedUrl(data.value.roles)

            initData.orgs = data.value.orgs
            initData.oldOrgs = data.value.orgs
            initData.currentOrg = data.value.currOrg
            initData.sex = data.value.user.sex
            initData.auth = data.value.auth
            if (currentUser)
                initData.currentUser = currentUser
            else
                initData.currentUser = data.value.user

            let context = injectFuns.getContext()
            if (!data.value.isFictitious) {
                context.currentOrg = initData.currentOrg
                context.currentOrg.businessIncomeTaxMode = data.value.businessIncomeTaxMode
                context.currentOrg.businessIncomeTaxMode = data.value.businessIncomeTaxMode
            }
            context.upgradeStatus = {
                isUpgrade:data.value.isUpgrade,
                upgradeYear:data.value.upgradeYear,
                upgradeMonth:data.value.upgradeMonth
            }
            context.currentUser = initData.currentUser
            context.orgs = initData.orgs
            context.dataInit = data.value.dataInit
            context.creator = data.value.orgCreater
            context.currentUser.roles = data.value.roles
            initData.currentOrgType = context.currentOrg.orgType
            initData.version = data.value.version
            context.appInfo = data.value.app
            context.currOrg = data.value.currOrg
            context.userName = data.value.user.name 
            context.isLevyRetreat = data.value.isLevyRetreat
            context.roles = data.value.roles
            context.isConsultation = data.value.isConsultation
            context.isDevelop = isDevelop
            context.industryVersion = data.value.industryVersion
            context.registeredProvincial = data.value.registeredProvincial
            context.vatMode = data.value.vatMode
            context.isTips = data.value.isTips
            setContext(context)
            initData.roles = data.value.roles
            initData.showGettingStarted = localStorage['showGettingStarted'] === 'false' ? false : true
            initData.showTip = true
            initData.noTip = true
            initData.industryVersion = data.value.industryVersion
            initData.groupList = data.value.groupList
            initData.oldGroupList = data.value.groupList


            if(data.value.roles[0].code=='001'||data.value.roles[0].code=='002') {
                initData.showTaxLink = true

            } else if(data.value.roles[0].code=='003') {
                initData.showTaxLink = false

            }
            if(data.value.orgCreater==data.value.user.id) {//管理员
                initData.showTaxLink = true
            }
            //代账端转移工具菜单7月21号对特定的用户开放
            if (data.value.currOrg.orgType == 1) {
                if (data.value.user.id == 2627168851067904 || data.value.user.id == 2747262065771520 || data.value.user.id == 100000050 || data.value.user.id == 100000029 ) {
                    data.value.menuIds.push('999999')
                }
            }
            //处理律所行业的菜单，新增《业务明细》《提报费用类型》菜单，权限同基础档案一致
            //200004 基础档案菜单ID
            if (data.value.currOrg.industry == 1008){
                let basicFileMaintenanceAuth = data.value.auth.find(e => Object.keys(e) == 200004)
                if(data.value.menuIds.find(e=>e=='200004')){
                    data.value.menuIds.push(200007)
                    data.value.menuIds.push(200008)
                }
                if (basicFileMaintenanceAuth){
                    data.value.auth.push({ 200007: basicFileMaintenanceAuth[200004] })
                    data.value.auth.push({ 200008: basicFileMaintenanceAuth[200004]})
                }
            }
            
            //处理portal左侧菜单
            initData.menus = getAuthMenus(api.getMenus(), data.value.menuIds, data.value.currOrg)
            if (data.token) {
                injectFuns.setAccessToken(data.token);
                localStorage.setItem('token', data.token)
            }
            initData.fullMenus = api.getMenus()
            initData.menuIds = data.value.menuIds
            initData.identification = data.value.identification//特殊处理请会计处理的header上不显示企业列表
            initData.cb = cb//缓存回调函数，如果报错跳转至企业管理
            initData.popMessage = data.value.popMessage || []
            initData.currentMessage = data.value.popMessage.length > 0 ? data.value.popMessage[0] : null
            initData.currMessageIndex = data.value.popMessage.length > 0 ? 0 : null
            initData.qrCode = data.value.qrCode
            initData.isMax = appParams && appParams.target
            initData.isShowMaxBtn = !(appParams && appParams.target)
            
            da.initView({ meta: api.meta, data: initData }, exports)(injectFuns)

            setMenus()(injectFuns)
            if (initData.menus.length <= 0) {
                cb && cb()
                return da.setMessage({
                    type: 'error',
                    title: '成功',
                    mode: 'message',
                    content: '您没有相关权限，请通知管理员设置权限',
                    onOk: () => { da.clearMessage()(injectFuns) }
                })(injectFuns)
            }
            /**
             * 清除所有的icon信息
             * @type {NodeList}
             */
            let linkArr = document.querySelectorAll('link[rel="shortcut icon"]')
            let head = document.getElementsByTagName('head')[0],
                link = document.createElement('link'),
                appInfo = data.value.app,
                name = ''
            for (var i = 0; i < linkArr.length; i++) {
                if (linkArr[i].remove) {
                    linkArr[i].remove()
                } else if(linkArr[i].removeNode){
                    linkArr[i].removeNode()
                }else if(head.removeChild){
                    head.removeChild(linkArr[i])
                }else{
                    $(linkArr[i]).remove()
                }
            }
            /**
             * 创建icon图标标签根据接口信息显示对应的icon并插入到head标签中
             */
            link.setAttribute('rel', 'shortcut icon');
            if (appInfo) {
                name = appInfo.name || '易嘉人'
                link.setAttribute('href', appInfo.iconUrl || 'static/images/default/favicon.png')
            } else {
                name = '易嘉人'
                link.setAttribute('href', 'static/images/default/favicon.png')
            }
            document.title = `${name}_智能财税平台`
            head.appendChild(link)
        }).catch((e) => {
            debugger
            Lock.stop()
            clearInterval(window.queryQRCodeTimer)
        })


    }
}

export function onMax(){
    return injectFuns=>{
        injectFuns.reduce('onMax')
    }
}
export function isShowGuide(isShow){
    return injectFuns=>{
        injectFuns.reduce('isShowGuide',isShow)
    }
}
export function isClosePortalGuiderImg(){
    return injectFuns=>{
        injectFuns.reduce('isClosePortalGuiderImg')
    }
}
export function openGuideWarning(){
    return injectFuns=>{
        da.setMessage({
            type: 'warning',
            content: '需要跟着手势操作哦',
            mode: 'message'
        })(injectFuns)
    }
}
export function isLsAppCnIgnore(){
    return injectFuns => {
        let isLsAppCnIgnore = localStorage['isLsAppCnIgnore'] || '',
            currentOrgId = sessionStorage['currentOrgId']

        if (!isLsAppCnIgnore || (isLsAppCnIgnore && isLsAppCnIgnore.indexOf(currentOrgId) == '-1')) {
            localStorage['isLsAppCnIgnore'] += currentOrgId + ',';
        }

        injectFuns.reduce('isLsAppCnIgnore')
    }
}
export function isLsHelpIgnore(){
    return injectFuns => {
        let isLsHelpIgnore = localStorage['isLsHelpIgnore'] || '',
            currentOrgId = sessionStorage['currentOrgId']

        if (!isLsHelpIgnore || (isLsHelpIgnore && isLsHelpIgnore.indexOf(currentOrgId) == '-1')) {
            localStorage['isLsHelpIgnore'] += currentOrgId + ',';
        }

        injectFuns.reduce('isLsHelpIgnore')
    }
}
export function openIts() {
    return injectFuns => {
        var newWindow = window.open('',"_blank")
        newWindow.document.innerHTML = '正在加载中请稍后。。。'
        da.showLoadingMask({content:'正在同步数据...'})(injectFuns)

        webapi.tax.itsSync(injectFuns.post).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) {
                newWindow.close()
                da.hideLoadingMask()(injectFuns)
                return
            }
            da.hideLoadingMask()(injectFuns)

            if(data.value) {

                if(data.value.url=='https://devits.rrtimes.com') {
                    if(window.location.href.indexOf('127')!=-1) {
                        // newWindow.location.href = `http://devits.rrtimes.com/v1/authorize#authorization_code=${data.value.token}&from_url=${window.location.origin}`
                        newWindow.location.href = `http://127.0.0.1:8084/v1/authorize#authorization_code=${data.value.token}&from_url=${window.location.origin}`

                    } else {

                        newWindow.location.href = `https://devits.rrtimes.com/v1/authorize#authorization_code=${data.value.token}&from_url=${window.location.origin}`
                    }

                } else {
                    newWindow.location.href = `${data.value.url}/v1/authorize#authorization_code=${data.value.token}&from_url=${window.location.origin}`

                }
            } else {
                newWindow.close()
            }

        })
    }
}

export function getFeedback(){
    return injectFuns=>{
        //debugger
    }
}
export function feedbackVisibleCtr(feedbackVisible,val,cb){
    return injectFuns=>{
        injectFuns.reduce('feedbackVisibleCtr',feedbackVisible)
        if(val){
            webapi.web.sendFeedback(injectFuns.post,{content:val}).then(ajaxData=>{
                if (!da.handleWebApiInfo(ajaxData)(injectFuns)) return
                cb && cb();
                da.setMessage({
                    type: 'success',
                    mode: 'message',
                    content: `反馈成功！`
                })(injectFuns)
            })
        }
    }
}

export function experience() {
    return injectFuns=> {
        if(window.location.href.indexOf('test')!=-1) {
            window.open('https://demoits.rrtimes.com/v1/authorize#authorization_code=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJbNDAwMjg5MzgxNTE1MzY2NCw0MDI1NzY5NzYwMDYzNTc4LC0xLDEwMCwwXSIsImV4cCI6MTUxOTQzODk5MSwiaWF0IjoxNTE4MTQyOTkxfQ.PC3k_cN-GFHL9uwZOj_8BblyioEsIV8lJ74ZkudteXMpk4pwyRUSL19AeKHqCoWvKW3uzcAVen_ofQb-i4HsKQ','_blank')
        } else {
            window.open('https://devits.rrtimes.com/v1/authorize#authorization_code=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJbMzk0Nzg0NDk5MjIzODU5MiwzOTQ3ODQ0OTkyNTY2MjcyLC0xLDEwMCwwXSIsImV4cCI6MTUxOTQzNzY1NiwiaWF0IjoxNTE4MTQxNjU2fQ.R1k5adj5Vgt1oGOVqsH09s42kNhsy07WJg2O56jcFf7nEP7UvcsrDNp_RHpZQP8jJeiIAD29g5lyVSFnIj5VnQ','_blank')

        }

    }
}

export function nextPopMessage(){
    return injectFuns=>{
        let currentMessage = da.getterByField('currentMessage')(injectFuns)
        webapi.dz.upReadDate(injectFuns.post,{id:currentMessage.get('id'),msgStatus:2}).then(data=>{
            if (!da.handleWebApiException(data)(injectFuns)) return
            injectFuns.reduce('nextPopMessage')
        })

    }
}

export function redEnvelope(){
    return injectFuns=>{
        let context = injectFuns.getContext(),
            currentOrg = context.currentOrg,
            orgId = currentOrg.id,
            url = window.location.protocol + '//' + window.location.host + '/#apps/login/order?orgId=' + orgId
        window.open(url)
    }
}

export function movableWidth(width) {
    return injectFuns => {
        if (width == 1) {
            injectFuns.reduce('movableWidth', 1)
        } else {
            injectFuns.reduce('movableWidth', 2)
        }
    }
}
export function showService(){
    return injectFuns => {
        let {reduce, post, getContext} = injectFuns,
            context = getContext(),
            isConsultation = context.isConsultation
        setTimeout(() => {
            injectFuns.reduce('showService',isConsultation)
            let list = {},
                currentOrgType = da.getterByField('currentOrgType')(injectFuns)
            if(isConsultation){
                list.operateName = 'isConsultation'
                list.orgType = currentOrgType
                webapi.web.serviceCreate(injectFuns.post,list).then(data => {
                    if (!da.handleWebApiException(data)(injectFuns)) return
                })
            }
        }, 900000)
    }
}
export function showQueryTopOne() {
    return injectFuns => {
        window.queryQRCodeTimer = ''
        clearInterval(window.queryQRCodeTimer)
        window.queryQRCodeTimer = setInterval(() => {
            let oldMessageId = da.getterByField('newMessageId')(injectFuns)
            webapi.dz.queryTopOne(injectFuns.post, {}).then(data => {
                // if (!da.handleWebApiException(data)(injectFuns)) return
                if (!data) return
                injectFuns.reduce('showQueryTopOne', data.value)
                if (data && data.value) {
                    let newMessageId = da.getterByField('newMessageId')(injectFuns)
                    if (newMessageId != oldMessageId) {
                        injectFuns.reduce('messagePopup')
                    }
                }
            })
        }, 60000)
    }
}


export function showCloseMessageContent() {
    return injectFuns => {
        let newMessageId = da.getterByField('newMessageId')(injectFuns),
            list = {},
            param = {}
        list.msgType = 1
        list.msgStatus = 1
        webapi.dz.queryList(injectFuns.post, list).then(data => {
            if (!da.handleWebApiException(data)(injectFuns)) return
            let unReadMessageList = data.value.list ? data.value.list : []
            unReadMessageList.map(o => {
                param.id = o.id
                param.msgStatus = 2
                webapi.dz.upReadDate(injectFuns.post, param).then(data => {
                    if (!da.handleWebApiException(data)(injectFuns)) return
                    injectFuns.reduce('showOpenAccountManage')
                })
            })
        })
    }
}
export function closeVersionTips() {
    return injectFuns => {
        let version = da.getterByField('version')(injectFuns),
            isShow = da.getterByField('version.isShow')(injectFuns),
            versionId = da.getterByField('version.sysVersion.id')(injectFuns)
        if (isShow) {
            webapi.web.setVersion(injectFuns.post, { isShow: isShow, versionId: versionId }).then(data => {
                if (!da.handleWebApiException(data)(injectFuns)) return
                injectFuns.reduce('closeVersionTips', true)
            })
        }
        // 根据需求点击叉号设置为消息已读
        // injectFuns.reduce('closeVersionTips')
    }
}

export function showSyatemUpdate() {
    return injectFuns => {
        let version = da.getterByField('version')(injectFuns),
            isShow = da.getterByField('version.isShow')(injectFuns),
            versionId = da.getterByField('version.sysVersion.id')(injectFuns)
        if (isShow) {
            webapi.web.setVersion(injectFuns.post, { isShow: isShow, versionId: versionId }).then(data => {
                if (!da.handleWebApiException(data)(injectFuns)) return
                injectFuns.reduce('closeVersionTips', true)
            })
        }
        addTab('产品更新', 'apps/welcome/systemUpdate', { versionId: versionId })(injectFuns)
    }
}
export function showMessageCenter() {
    return injectFuns => {
        let roles = da.getterByField('roles')(injectFuns),
            currentOrgType = da.getterByField('currentOrgType')(injectFuns),
            appInfo = da.getterByField('appInfo')(injectFuns) ? da.getterByField('appInfo')(injectFuns).toJS() : undefined,
            auth = da.getterByField('auth')(injectFuns),
            menuIds = da.getterByField('menuIds')(injectFuns)

        injectFuns.reduce('addTab', '消息中心','apps/dz/messageCenter', { initData: appInfo, auth: auth, menuIds: menuIds })
        injectFuns.reduce('showOpenAccountManage')
        closeVersionTips()(injectFuns)
    }
}
export function showTabHost() {
    return injectFuns => {
        injectFuns.reduce('showOpenAccountManage')
    }
}
export function searchMenuTextChange(val) {
    return injectFuns => {
        injectFuns.reduce('setMenuText', val)
    }
}

export function setShowGettingStarted(option) {
    return injectFuns => {
        let roles = da.getterByField('roles')(injectFuns),
            currentOrgType = da.getterByField('currentOrgType')(injectFuns),
            appInfo = da.getterByField('appInfo')(injectFuns) ? da.getterByField('appInfo')(injectFuns).toJS() : undefined,
            auth = da.getterByField('auth')(injectFuns),
            menuIds = da.getterByField('menuIds')(injectFuns),
            isFromMenu = option && option.isFlowChart ? false : true,
            appName = isFromMenu ? '操作流程' : '流程图'
        if (roles) {
            let gettingStartedUrl = getGettingStartedUrl(roles.toJS(), isFromMenu, null, currentOrgType)
            if (gettingStartedUrl)
                injectFuns.reduce('addTab', appName, gettingStartedUrl, { initData: appInfo, auth: auth, menuIds: menuIds })
        }

        //injectFuns.reduce('setShowGettingStarted')
    }
}

/**
 * [addGettingStartedTab 根据角色是否打开操作流程]
 * @param {[type]} data           [description]
 * @param {[type]} roles          [description]
 * @param {[type]} currentOrgType [description]
 */
function addGettingStartedTab(data, roles, currentOrgType, ajaxData) {
    let gettingStartedUrl = getGettingStartedUrl(roles, false, data, currentOrgType),
        appName = '操作流程'
    if (window.location.href.indexOf('?edu') != -1 || location.host.indexOf("edu") == 0 || location.host.indexOf("jx") == 0) {
        appName = '流程图'
    }
    if (gettingStartedUrl) {
        let tab = { title: appName, url: gettingStartedUrl, props: {initData: data.appInfo} }
        if (ajaxData) {
            tab.auth = ajaxData.auth
            tab.menuIds = ajaxData.menuIds
        }
        data.tabs.push(tab)
        data.currentTab = tab
        return data
    }
    return data
}

/**
 * [addFirstTab 根绝权限打开第一个页签]
 * @param {[type]} data  [description]
 * @param {[type]} data2 [description]
 */
function addFirstTab(data, data2, allMenus,injectFuns) {
    let roles = data2.roles,
        orgType = data2.currOrg.orgType,
        currMenu = '',
        currOrg = data2.currOrg,
        industry = currOrg.industry
    
    //集团账户进来打开我的桌面 ==》 流水账收支统计表
    if (currOrg.appId == 103 && orgType == 3){
        let welcomeBtnStatus = []
        data2.auth.map(menu => {
            if (Object.keys(menu) == 301004 ) {
                welcomeBtnStatus.push(menu)
            }
        })
        let tab = { title: '我的桌面', url: 'apps/welcome',btnStatus: welcomeBtnStatus, pageId: 301004 }
        data.tabs.push(tab)
        data.currentTab = tab
        return data
    }


    if (data.appParams && data.appParams.target){
        allMenus.map(menu=>{

            if (menu.requestUrl == data.appParams.target){
                currMenu = menu
                return
            }
            menu.subMenus && menu.subMenus.map(item=>{
                if (item.requestUrl == data.appParams.target){
                    currMenu = item
                    return
                }
                if (item.menuItemGroup) {
                    item.menuItemGroup.map(e => {
                        if (e.requestUrl == data.appParams.target) {
                            currMenu = e
                            return
                        }
                    })
                }
            })
        })
        if(data.appParams.target == 'apps/systemSetting/safetyInformation'){
            currMenu = {
                name:'个人设置',
                requestUrl:'apps/systemSetting/safetyInformation'

            }
        }
        let tab = { title: currMenu.name, url: currMenu.requestUrl, btnStatus: [data2.auth.find(e=>Object.keys(e)==currMenu.id)], pageId: currMenu.id }
        data.tabs.push(tab)
        data.currentTab = tab
        if(!currMenu){
            return da.setMessage({
                type: 'error',
                title: '成功',
                mode: 'message',
                content: '您没有相关权限，请通知管理员设置权限',
                onOk: () => { da.clearMessage()(injectFuns) }
            })(injectFuns)
        }
        return data
    }

    let r = data2.menuIds.find(id => {
        if (id == 10) return true
        if (id == 20) {
            // 正常收支统计表的菜单ID是201002，但是餐饮业的收支统计表的ID是210001
            if (data2.menuIds.find(id => id == 201002 || id == 210001)) return true
        }
        return false
    })
    //没有收支统计权限，不允许查看我的桌面
    if (r) {
        let tab, btnStatus = data2.auth.find(menu => menu[r])
        if (orgType == 1) {
            tab = { title: '首页', url: 'apps/welcome', btnStatus: [btnStatus], pageId: r ,props:{homeUrl:data2.app.homeUrl}}
        } else {
            let welcomeBtnStatus = []
            data2.auth.map(menu => {
                if (Object.keys(menu) == 20 || Object.keys(menu) == 201002 || Object.keys(menu) == 201001 || Object.keys(menu) == 201003) {
                    welcomeBtnStatus.push(menu)
                }
            })
            tab = { title: '我的桌面', url: 'apps/welcome', btnStatus: welcomeBtnStatus, pageId: r }
        }
        data.tabs.push(tab)
        data.currentTab = tab
        return data
    } else {
        let findMenu = null
        data2.menuIds.map(id => {
            if (findMenu) return
            allMenus.map(menu => {
                if (id == menu.id && menu.requestUrl) {
                    return findMenu = menu
                } else {
                    if (menu.subMenus) {
                        menu.subMenus.map(subMenu=>{
                            if (subMenu.menuItemGroup && subMenu.menuItemGroup.find(m => m.id == id && m.requestUrl)){
                                /**
                                 * 针对房地产行业的特殊控制
                                 * 默认打开《凭证管理》菜单 --> 当《凭证管理》菜单不存在打开《余额表》
                                 */
                                if(industry == 1009){
                                    if(data2.menuIds.find(e => e == 203002)){
                                        return findMenu = {
                                            id: 203002,
                                            name: '凭证管理',
                                            requestUrl: 'apps/fi/voucherManagement',
                                            auth: true
                                        }
                                    }else{
                                        return findMenu = {
                                            id: 203005,
                                            name: '科目余额表',
                                            requestUrl: 'apps/fi/accountBook/balances',
                                            auth: true
                                        }
                                    }
                                }
                                return findMenu = subMenu.menuItemGroup.find(m => m.id == id && m.requestUrl)
                            }
                        })
                    }
                }
            })
        })

        if (findMenu) {
            let btnStatus = null
            if (findMenu.id === 2020) {//对工资单做特殊的处理
                btnStatus = [data2.auth.find(menu => Object.keys(menu) == 2020), data2.auth.find(menu => Object.keys(menu) == 203001)]
            } else if (findMenu.id == 203001 || findMenu.id == 203002) {
                btnStatus = [data2.auth.find(menu => Object.keys(menu) == findMenu.id), data2.auth.find(menu => Object.keys(menu) == 2020), data2.auth.find(menu => Object.keys(menu) == 201001), data2.auth.find(menu => Object.keys(menu) == 201003)]
            } else {
                btnStatus = data2.auth
            }
            data.currentTab = { title: findMenu.name, url: findMenu.requestUrl, btnStatus: btnStatus, pageId: findMenu.id }
            if(data.currentTab.title=='首页') {
                data.currentTab.props ={homeUrl: data2.app.homeUrl}
            }
            data.tabs.push(data.currentTab)
            return data
        }
    }
    //001 系统管理
    //002 记账员
    //003 会计
    //004 税务会计
    //005 老板
    r = roles.find(o => o.code === '003')//会计角色
    if (r) {
        let tab = {}
        if (orgType == 2) {
            tab = { title: '新增凭证', url: 'apps/fi/addVoucher',props:{homeUrl:data2.app.homeUrl} }
        } else {
            tab = { title: '首页', url: 'apps/welcome' }
        }
        data.tabs.push(tab)
        data.currentTab = tab
        return data
    }

    r = roles.find(o => o.code === '004')
    if (r && orgType == 2) {
        let tab
        if (data2.orgs[0].vatTaxpayer == 41) {//一般纳税人
            tab = { title: '增值税', url: 'apps/fi/manageTax/declareTaxOfValueAddedGeneral' }
        } else if (data2.orgs[0].vatTaxpayer == 42) {//小规模
            tab = { title: '增值税', url: 'apps/fi/manageTax/declareTaxOfValueAdded' }

        }
        data.tabs.push(tab)
        data.currentTab = tab
        return data
    }

    r = roles.find(o => o.code === '9999')
    if (r) {
        let tab = { title: '问题列表', url: 'apps/acm/enterpriseList/enterpriseJobs/list' }
        data.tabs.push(tab)
        data.currentTab = tab
        return data
    }
}


/**
 * [getGettingStartedUrl 根据角色设置操作流程的app地址]
 * @param  {[type]}  roles          [description]
 * @param  {Boolean} isFromMenu     [description]
 * @param  {[type]}  data           [description]
 * @param  {[type]}  currentOrgType [description]
 * @return {[type]}                 [description]
 */
function getGettingStartedUrl(roles, isFromMenu, data, currentOrgType) {
    //001 系统管理
    //002 记账员
    //003 会计
    //004 税务会计
    //005 老板
    

    let roleString = roles.map(o => o.code).join(','), url
    if (currentOrgType == 1) {
        if (data) {
            if (data.appInfo) {
                url = `apps/dz/beginnerGuidance?role=${roleString}&videoUrlAcm=${data.appInfo.videoUrlAcm}&videoUrlInit=${data.appInfo.videoUrlInit}`
            } else {
                url = `apps/dz/beginnerGuidance?role=${roleString}`
            }
        } else {
            url = `apps/dz/beginnerGuidance?role=${roleString}`
        }
    } else {
        let urlStr = 'apps/welcome/gettingStarted/operationProcess'
        //判断当前是否是教学版
        if ((window.location.href.indexOf('?edu') != -1 || location.host.indexOf("edu") == 0 || location.host.indexOf("jx") == 0) && !isFromMenu) {
            urlStr = 'apps/welcome/flowChart'
        }
        if (data) {
            let urlStr = ''
            //集团总分的处理！打开新的操作流程页面
            if (data.currOrg.appId == 103 && data.currOrg.orgType == 3){
                urlStr = 'apps/welcome/gettingStarted/zfGettingStartedForAdmin'
            }else{
                urlStr = 'apps/welcome/gettingStarted/operationProcess'
            }
            
            if (data.appInfo) {
                url = `${urlStr}?role=${roleString}&videoUrlAcm=${data.appInfo.videoUrlAcm}&videoUrlInit=${data.appInfo.videoUrlInit}`
            } else {
                url = `${urlStr}?role=${roleString}`
            }
        } else {
            if (currentOrgType == 3){
                urlStr = 'apps/welcome/gettingStarted/zfGettingStartedForAdmin'
            }
            url = `${urlStr}?role=${roleString}`
        }
    }

    url += (isFromMenu ? '&isFromMenu=true' : '')
    return url
}

/**
 * [setMenus 设置当前用户可用的菜单]
 */
export function setMenus() {
    return injectFuns => {
        let { initView, handleWebApiInfo, setMessage, getterByField } = da,
            context = injectFuns.getContext(),
            vatTaxpayer = context.currentOrg.vatTaxpayer,
            data = getterByField('menus')(injectFuns).toJS(),
            taxUrl
        if (vatTaxpayer == 42) {
            taxUrl = 'apps/fi/manageTax/declareTaxOfValueAdded'
        } else if (vatTaxpayer == 41) {
            taxUrl = 'apps/fi/manageTax/declareTaxOfValueAddedGeneral'
        } else {
            taxUrl = 'apps/fi/manageTax/declareTaxOfValueAdded'
        }
        injectFuns.reduce('setLeftMenus', taxUrl)
    }
}

export function setMenuSelectedKeys(menuId){
    return injectFuns=>{
        let keys = [menuId]
        if (menuId.length > 4){
            keys.push(menuId.slice(0, 4))
        }
        injectFuns.reduce('setMenuSelectedKeys', keys)
    }
}

/**
 * [getAuthMenus 获取需要打开时校验当前用户点击权限的菜单]
 * @param  {[type]} menus       [description]
 * @param  {[type]} authMenuIds [description]
 * @return {[type]}             [description]
 */
function getAuthMenus(menus, authMenuIds, currOrg) {
    let authMenus = []
    menus.forEach(menu => {
        if (menu.subMenus && menu.subMenus.length > 0) {
            let subAuthMenus = getAuthMenus(menu.subMenus, authMenuIds, currOrg)
            if (subAuthMenus.length > 0) {
                authMenus.push({ ...menu, subMenus: subAuthMenus })
            }
        } else if (menu.menuItemGroup && menu.menuItemGroup.length > 0){
            let menuItemGroup = getAuthMenus(menu.menuItemGroup, authMenuIds, currOrg)
            if (menuItemGroup.length > 0) {
                authMenus.push({ ...menu, menuItemGroup: menuItemGroup })
            }
        }
        else {

            if (authMenuIds.filter(o => o == menu.id).length > 0) {
                /*
                如果当前登录的账套纳税人身份为一般纳税人的时候给 税务申报->增值税申报 菜单添加beta图标
                 */
                if (menu.id == 204001 && currOrg.vatTaxpayer == 41) {
                    // menu.isBeta = true//2018-07-03 赵烁 注释
                }
                authMenus.push(menu)
            }
        }
    })
    return authMenus
}

/**
 * [addTab 打开一个页签]
 * @param {[type]} title [description]
 * @param {[type]} url   [description]
 * @param {[type]} props [description]
 */
export function addTab(title, url, props) {
    return (injectFuns) => {
        if (!url) return
        let m = findMenu(da.getterByField('fullMenus')(injectFuns), url)(injectFuns),
            pageId = m ? m.get('id') : undefined,
            auth = da.getterByField('auth')(injectFuns).toJS(),
            btnStatus = null,
            appInfo = injectFuns.getContext().appInfo,
            appId = appInfo.id
        //蜂网打开凭证拦截         
        if (appId == 1006 && props && url == 'apps/fi/addVoucher'){
            return ESM({ type: "journal", id: props.initData && props.initData.id })(injectFuns)
        }
        
        if (m && m.get('auth') === true) {
            btnStatus = auth
            if (props) {
                props.btnStatus = btnStatus
                props.pageId = pageId
                injectFuns.reduce('addTab', title, url, props)
            } else {
                injectFuns.reduce('addTab', title, url, { btnStatus: btnStatus, pageId: pageId })
            }
        }
        else {
            injectFuns.reduce('addTab', title, url, props)
        }
        webapi.user.log(injectFuns.post, [{ url: url, pageName: title, actionTime: new Date() }])
        location.host != "www.rrtimes.com" && window._hmt && _hmt.push && _hmt.push(['_trackPageview', '/' + url]) //百度统计单页应用接口。
    }
}

/**
 * [addTab 点击按钮校验权限]
 * @param {[type]} id [description] 页签id
 * @param {[type]} name   [description] 按钮name
 * @param {[type]} list [description] 隐藏按钮权限列表
 * @param {[type]} callback [description] 回调函数
 */
export function checkMenuBtn(id, name, list, callback) {
    return injectFuns => {
        let hiddenList = list,
            auth = da.getterByField('auth')(injectFuns).toJS(),
            btnStatus = null,
            noPower = true
        if (list.size) {
            hiddenList = list.toJS()
        }
        if (!id) return
        auth.map(authId => {
            if (Object.keys(authId)[0] == id) {
                btnStatus = authId[Object.keys(authId)[0]]
            }
        })
        if (!btnStatus) {
            noPower = false
        }
        else {
            if (hiddenList[name]) {
                hiddenList[name].map(o => {
                    if (o == btnStatus) {
                        noPower = false
                    }
                })
            }
            else if (hiddenList[name] === undefined || hiddenList[name].length == 0) {
                auth.map(authId => {
                    if (Object.keys(authId)[0] == id) {
                        noPower = authId[Object.keys(authId)[0]] === 0 ? false : true
                        return false
                    }
                })
            }
            else {
                noPower = true
            }
        }
        /**
         * 餐饮业灰度上线菜单权限设置 2018-04-24 by 赵烁
         */
        /* if (window.location.href.indexOf('?cy') > -1){
            noPower = true
        } */
        if (!noPower) {
            da.setMessage({
                type: 'warning',
                content: '您当前无权限操作！',
                mode: 'message'
            })(injectFuns)
        } else {
            callback()
        }
        /*webapi.role.checkMenu(injectFuns.post, id).then(ajaxData => {
            if (!da.handleWebApiException(ajaxData)(injectFuns))
                return
            let noPower = true
            if (ajaxData.value[Object.keys(ajaxData.value)] === 0) {//当前处于无权限状态
                noPower = false
            } else if (hiddenList[name].length == 0 || hiddenList[name] === undefined) {//当前处于无限制状态
                noPower = true
            } else {
                hiddenList[name].map(o => {
                    if (o == ajaxData.value[Object.keys(ajaxData.value)]) {
                        noPower = false
                    }
                })
            }
            if (!noPower) {
                da.setMessage({
                    type: 'warning',
                    content: '您当前无权限操作！',
                    mode: 'message'
                })(injectFuns)

            } else {
                callback()
            }
        })*/
    }
}

/**
 * [findMenu 查找菜单]
 * @param  {[type]} menus [description]
 * @param  {[type]} url   [description]
 * @return {[type]}       [description]
 */
function findMenu(menus, url) {
    return injectFuns => {
        let orgType = da.getterByField('currentOrgType')(injectFuns)
        for (let o of menus) {
            let rUrl = o.get('requestUrl')

            if (o.get('subMenus')) {
                let r = findMenu(o.get('subMenus'), url)(injectFuns)
                if (r)
                    return r
            }
            if (o.get('menuItemGroup')) {
                let r = findMenu(o.get('menuItemGroup'), url)(injectFuns)
                if (r)
                    return r
            }
            if (!rUrl)
                continue
            if (url.indexOf(rUrl) != -1 && orgType == o.get('id').toString().substring(0, 1)) {
                return o
            }
        }
        return
    }
}
//Express Short Message 
export function ESM(message){
    return injectFuns=>{
        // window.parent.postMessage(JSON.stringify({ type: "OPENTAB", args: { type: "journal", id: 1000000000 } }), "*")
        window.parent.postMessage(JSON.stringify({ type: "OPENTAB", args: message }), "*")
    }
}

export function selectTab(url) {
    return injectFuns => {
        let menus = da.getterByField('menus')(injectFuns),
            selectMenu = findMenu(menus, url)(injectFuns)
        injectFuns.reduce('selectTab', url, selectMenu)
    }
}

export function refreshCurrentTab() {
    return ({ reduce }) => {
        reduce('refreshCurrentTab')
    }
}

export function delTab(url, isForceDel = false, isNotifyDel = true) {
    return (injectFuns) => {
        //判断是否不能关闭("初始化")
        if (!isForceDel) {
            let tabs = da.getterByField('tabs')(injectFuns)
            if (tabs && tabs.size > 0) {
                for (let tab of tabs) {
                    if (tab.get('url') === url && tab.get('props') && tab.get('props').get('undeletable')) {
                        return
                    }
                }
            }
        }
        injectFuns.reduce('delTab', url, isNotifyDel)
    }
}

export function removeAllTab() {
    return ({ reduce }) => {
        reduce('removeAllTab')
    }
}

export function loadMask(args){
    return injectFuns=>{
        if (args.target == 'open'){
            da.showLoadingMask()(injectFuns)
        }
        if(args.target == 'hide'){
            da.hideLoadingMask()(injectFuns)
        }
    }
}


export function loadPortalData() {
    return ({ reduce, post }) => {
        api.LoadPortalData(post).then(result => {
            var menuitems = api.getMenus().concat(result.value.GetMenuTable);
            reduce('setMenus', Immutable.fromJS(menuitems));
        });
    }
}

export function toggleMenuVisible() {
    return injectFuns => {
        injectFuns.reduce('setterByField', 'showMenu', !da.getterByField('showMenu')(injectFuns))
    }
}

export function toggleMenuStyle() {
    return injectFuns => {
        injectFuns.reduce('setterByField', 'popMenu', !da.getterByField('popMenu')(injectFuns))
    }
}

/**
 * [toggleOrg 切换账套]
 * @param  {[type]}  orgId          [进入账套的orgID]
 * @param  {Boolean} isInitToPerson [description]
 * @param  {[type]}  initTabData    [description]
 * @return {[type]}                 [description]
 */
export function toggleOrg(orgId, initTabData) {//isList 判断是不是通过点击左上角列表 进入此函数，对调用init接口的dzOrgId的传递做控制
    return injectFuns => {
        let { getterByField } = da,
            tabs = getterByField('tabs')(injectFuns).toJS(),
            tabData = null,
            currentTab = getterByField('currentTab')(injectFuns)
        if (initTabData) {
            tabData = { tabData: tabs, ...initTabData, currentTab: currentTab && currentTab.toJS() }
        }
        removeAllTab()(injectFuns)
        initView(orgId, tabData, undefined)(injectFuns)
    }

}

/**
 * [modifyCreator 集团版权限移交]
 * @param  {[type]}  orgId          [转移权限给的账套的orgID]
 */
export function modifyCreator(orgId) {
    return injectFuns => { 
        let { getterByField } = da,
            { reduce, post, getContext, setContext, setApiRootPath } = injectFuns,
            Context = getContext()

            Context.creator = orgId
            setContext(Context)
            initView()(injectFuns)
        }
    }

export function logout(cb) {
    return injectFuns => {
        let { initView, setMessage, clearMessage, handleWebApiException } = da,
            { reduce, post, getContext } = injectFuns

        webapi.user.logout(post).then(data => {
            if (!data.result) {
                return
            }
            cb()
        })
    }
}

/**
 * [updateOrg 刷新portal页左上角的企业名称]
 * @return {[type]} [description]
 */
export function updateOrg() {
    return injectFuns => {
        webapi.org.queryOrgList(injectFuns.post, { dzOrgId: sessionStorage.getItem('dzOrgId') }).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            let context = injectFuns.getContext(),
                name = ''
            data.value.orgList.map((element, index) => {
                if (element.id == context.currentOrg.id) {
                    name = element.name
                }
            })
            context.currentOrg.name = name
            context.roles = data.value.roles
            injectFuns.setContext(context)
            injectFuns.reduce('setOrgList', data.value.orgList, injectFuns.getContext().currentOrg.id)
        })
    }
}

/**
 * [updateCurrentUser 刷新portal页右上角的用户昵称]
 * @return {[type]} [description]
 */
export function updateCurrentUser() {
    return injectFuns => {
        api.init(injectFuns.post, injectFuns.getContext().currentOrg.id).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            let context = injectFuns.getContext()
            context.currentUser.name = data.value.user.name
            context.currentUser.id = data.value.user.id
            context.roles = data.value.roles
            injectFuns.setContext(context)
            injectFuns.reduce('updateCurrentUser', data.value.user)
        })
    }
}



export function addEventListener(url, eventName, handler) {
    return injectFuns => {
        injectFuns.reduce('addEventListener', url, eventName, handler)
    }
}

export function removeEventListener(url, eventName) {
    return injectFuns => {
        injectFuns.reduce('removeEventListener', url, eventName)
    }
}

export function renameTab(url, title) {
    return injectFuns => {
        injectFuns.reduce('renameTab', url, title)
    }
}

export function showHelp() {
    return injectFuns => {
        let { setMessage, clearMessage } = da

        setMessage({
            type: 'app',
            title: '关于',
            content: 'app:apps/systemSetting/about',
            width: 800,
            bodyStyle: { height: 300 },
            closable: false,
            onOk: function () {
                clearMessage()(injectFuns)
            }
        })(injectFuns)
    }
}

export function noTip(checked) {
    return injectFuns => {
        injectFuns.reduce('noTip', checked)
    }
}

/**
 * 知道了
 * @return {[type]} [description]
 */
export function know() {
    return injectFuns => {
        injectFuns.reduce('know')
    }
}


Object.assign(exports, { ...da, ...exports })
