import * as da from 'dynamicAction'
import Immutable, { Map, List, fromJS } from 'immutable'
import * as api from './api.js'
import webapi from 'webapi'
import moment from 'moment'
import React, { Component, PropTypes } from 'react'
import { Radio, Button, Input, Card, Table, Cell, Column, DatePicker } from 'xComponent'
import md5 from 'md5'

/**
 * [初始化视图]
 * @return {[type]} [无返回值]
 */
export function initView(initData, cb, activeKey, from) {
    return injectFuns => {
        let { initView, setMessage, clearMessage } = da,
            { reduce, post, getContext } = injectFuns,
            initData,
            industryList = null
           
        webapi.customer.getEnumDetail(injectFuns.post, ['industry', 'vatTaxpayer', 'accountingStandards']).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            industryList = data.value.industryList
            da.setMetaProperty(api.meta, 'admin.enterprise.formItems.statusOfTaxpayer.dataSource', data.value.vatTaxpayerList)//纳税人身份字典数据
            da.setMetaProperty(api.meta, 'admin.enterprise.formItems.accountingStandards.dataSource', data.value.accountingStandardsList)//企业会计准则字典数据
            da.setMetaProperty(api.meta, 'admin.createGroup.formItems.accountingStandards.dataSource', data.value.accountingStandardsList)//企业会计准则字典数据
            return api.init(post)
        }).then(data => {
            if (!data) return
            if (!data.result && data.error) {
                return da.setMessage({ type: 'error', mode: 'message', content: data.error.message })(injectFuns)
            }
            if (data.value.app && data.value.app.id == 102){
                data.value.orgList.map(item=>{
                    item.updateNameStatus = false
                })
            }
            // 汇算清缴 屏蔽特殊行业的创建
            if (data.value.app.id == 104) {
                industryList = industryList.filter(item => item.id < 1000)
            }
            da.setMetaProperty(api.meta, 'admin.enterprise.formItems.industry.dataSource', industryList)//所属行业字典数据
            let appId = data.value.app.id ||  sessionStorage.getItem('appId')
            let initData = {
                regCodeStatus: data.value.regCodeStatus,
                disableMenus: data.value.disableMenus,
                appInfo: data.value.app,
                orgs: data.value.orgList,
                oldOrgs: data.value.orgList,
                sex: data.value.sex,
                oldOrgList: data.value.orgList,
                groupList:data.value.groupList,
                oldGroupList : data.value.groupList,
                isServiceProvider: data.value.isServiceProvider,
                nextLogin: data.value.entrance.toString(),
                appId: appId,
                operateAuth:data.value.operateAuth,
                examModalVisible:false,
                createOrg: {
                    orgName: '',
                    isDisabled:true
                },
                createPartner: {

                },
                createVersion: {
                    // versionContentList: api.emptyVersionList
                    versionContentList: [{ item: undefined }]
                },
                authentication:{
                    imgPath:'',
                    qrCode:'',
                    inviteCount:''
                },
                getMenus:api.getMenus,
                isShowAuthentication:false,
                currentServerTime: data.value.today,
                isShowSearch: data.value.orgList.length > 7 ? true : false,
                isShowCreateOrg: false,
                Create: { id: 0 },
                userId: data.value.id,
                activeKey: '1',
                currentStep: 0,
                orgExpireTimeList: [],
                isOperators: data.value.isOperators && data.value.isOperators,
                // isOperationMaster: data.value.isOperationMaster && data.value.isOperationMaster,// 判断是否可以管理企业的过期日期。2018-6-5注释 by 赵烁 2018-8-5如果没影响直接删除
                sortActive: 'o.expireTime DESC',
                myYjTableTitle:data.value.app.id == 103 ? 'group' : 'org',
                enterprise: {
                    orgName: '',
                    industry: { id: 1 },
                    statusOfTaxpayer: { id: 42 },
                    industryVersion:null,
                    selectVersion: {id: 1},
                    vatMode:null
                },
                searchOrg: {
                    orgName: ''
                },
                currentUserName: data.value.name,
                operationPlatform: {
                    orgName: '',
                    phone: ''
                },
                userInfo: {
                    from: {
                        orgName: '',
                        endDate: moment().format('YYYY-MM-DD'),
                        beginDate: moment().subtract(1, 'M').format('YYYY-MM-DD'),
                        mobile: '',
                        appId: {
                            name: '全部',
                            id: -1
                        },
                        page: {
                            "currentPage": 1,
                            "pageSize": 20
                        }
                    },
                    ajaxData: {},
                    total: ''
                },
                orgAnalyze: {
                    from: {
                        endDate: moment().format('YYYY-MM-DD'),
                        beginDate: moment().subtract(1, 'M').format('YYYY-MM-DD'),
                        page: {
                            "currentPage": 1,
                            "pageSize": 20
                        },
                        appId: null
                    },
                    ajaxData: {},
                    total: ''
                },
                userAnalyze: {
                    from: {
                        endDate: moment().format('YYYY-MM-DD'),
                        beginDate: moment().subtract(1, 'M').format('YYYY-MM-DD'),
                        page: {
                            "currentPage": 1,
                            "pageSize": 20
                        },
                        appId: null
                    },
                    ajaxData: {},
                    total: ''
                },
                orgTaxManage: {
                    from: {
                        endDate: moment().format('YYYY-MM-DD'),
                        beginDate: moment().subtract(1, 'M').format('YYYY-MM-DD'),
                        appId: null
                    },
                    ajaxData: {}
                },
                userTaxManage: {
                    from: {
                        endDate: moment().format('YYYY-MM-DD'),
                        beginDate: moment().subtract(1, 'M').format('YYYY-MM-DD'),
                        appId: null
                    },
                    ajaxData: {},
                },
                createHomeInfo: {
                    createHomeInfoData:[]
                },
                createBigNews: {
                    createBigNewsData:{
                        type: {
                            id: 1,
                            name: '财税头条'
                        }
                    }
                },
                partnerPlan: {
                    from: {
                        partnerPlanStatus: {id:'0',name:'全部'}
                    },
                    createPartnerData: {}
                },
                organizationalInfo: {
                    from: {
                        orgName: '',
                        endDate: moment().format('YYYY-MM-DD'),
                        beginDate: moment().subtract(1, 'M').format('YYYY-MM-DD'),
                        mobile: '',
                        industry:{id:-1,name:'全部'},
                        version: { id: 8888 },
                        orgStatus: { id: -1, name: '全部' },
                        vatTaxpayer: { id: '-1', name: '全部'},
                        registeredAddress: { code: '-1', name: '全部' },
                        page: {
                            "currentPage": 1,
                            "pageSize": 20
                        },
                        orgType: 2
                    },
                    ajaxData: {},
                    source: { id: -1, name: '全部' },
                    sortActive: 'o.createTime DESC',
                    appId: null,
                    total: ''
                },
                cateringIndustrySetupInfo:{
                    from: {
                        page: {
                            "currentPage": 1,
                            "pageSize": 20
                        }
                    },
                    ajaxData:{},
                    total: ''
                },
                sTSManage: {
                    allManualKeys: [],
                    maxHeight: 0
                },
                guideManage: {
                    guideKeys: [],
                    maxHeight: 0
                },
                promoCode: {
                    maxHeight: 0,
                    ajaxData: [],
                    page: {
                        "currentPage": 1,
                        "pageSize": 20,
                        total: 2
                    }
                },
                // orgTaxManage: {
                //     maxHeight: 0,
                //     ajaxData: [],
                //     page: {
                //         "currentPage": 1,
                //         "pageSize": 20,
                //         total: 50
                //     }
                // },
                dzInfo: {
                    from: {
                        orgName: '',
                        beginDate: moment().subtract(1, 'M').format('YYYY-MM-DD'),
                        endDate: moment().format('YYYY-MM-DD'),
                        // beginDate:moment().subtract(7, 'd').format('YYYY-MM-DD'),
                        mobile: '',
                        status: {
                            name: '全部',
                            id: '-1'
                        },
                        page: {
                            "currentPage": 1,
                            "pageSize": 20
                        }
                    },
                    ajaxData: {},
                    total: ''
                },
                organizetionalList: [],
                organizetionalListInfo: {
                    page: {
                        pageSize: 20,
                        current: 1
                    },
                    vatTaxpayer: 0
                },
                dzAdministration: {
                    orgName: '',
                    phone: ''
                },
                dzAdministrationList: [],
                createGroup:{},
                invitationCodeAdministration: {
                    from: {
                        beginTime: moment().subtract(1, 'M').format('YYYY-MM-DD'),
                        endTime: moment().format('YYYY-MM-DD'),
                        page: {
                            "currentPage": 1,
                            "pageSize": 20
                        },
                        status: {
                            id: '2',
                            name: '全部'
                        }
                    },
                    ajaxData: {},
                    total: ''
                },
                farenw: {
                    from: {
                        code:null,
                        mobile:null,
                        status: {
                            name: '全部',
                            id: 0
                        },
                        page: {
                            "currentPage": 1,
                            "pageSize": 20
                        }
                    },
                    ajaxData: {},
                    total: ''
                },
                inviteCode: {
                    from: {
                        beginTime: moment().format('YYYY-MM')+'-01',
                        endTime: moment().format('YYYY-MM-DD'),
                        page: {
                            "currentPage": 1,
                            "pageSize": 20
                        },
                        status: {
                            id: '-1',
                            name: '全部'
                        }
                    },
                    errorList: [],
                    isImportCustomerError: false,
                    ajaxData: [],
                    total: ''
                },
                leftTree: transDept([])(injectFuns),
                deptCheckedKeys: [],
                deptSelectedKeys: [],
                deptExpandedKeys: ['0', '-1'],
                updatePasswordForm: {
                    form:{
                        // oldPassword : '',
                        newPassword : '',
                        againNewPassword : ''
                    },
                    isShow:false,
                    judgeBlank:true,
                    level:0
                },
                leftDiscountAmount : {

                },
                rightDiscountAmount : {

                },
                lastCreate:{
                    accountingStandards:'',
                    enabledYear:'',
                    isShowEnabledYearSuccessInfo:false,
                    isShowAccountingStandardsSuccessInfo:false,
                    isShowEnabledYearComponent:false,
                    isShowAccountingStandardsComponent:false
                }
            }
            let mobile=data.value.mobile,
                friendName
            if(appId==100){
                friendName='易嘉人'
            }else if(appId==101){
                friendName='运营管理'
            }else if(appId==102){
                friendName='代账管理'
            }else if(appId==1000){
                friendName='账无忌'
            }else if(appId==1001){
                friendName='蜂信'
            }else if(appId==1002){
                friendName='美味不用等'
            }else if(appId==1003){
                friendName='财税机器人'
            }else if(appId==1004){
                friendName='税无忌'
            }else if(appId==1005){
                friendName='内蒙航信'
            }else if(appId==1000000){
                friendName='易嘉人'
            }else if(appId=='3980227871966208'){
                friendName='中泰宜佳'
            }
            window.qimoClientId={nickName:data.value.name,customField:{'伙伴名称':friendName,'手机号':mobile}   }
            initData.myorder = {
                searchValue: '',
                orderTypeValue: 'all',
                typeValue: 'all',
                promptValue: 'all',
            }
            initData.itsOrder = {
                searchValue: '',
                orderTypeValue: 'all',
                typeValue: 'all',
                promptValue: 'all',
            }
            initData.orderManage = {
                searchNameValue: '',
                searchPhoneValue: '',
                theirFriendValue: 'all',
                orderTypeManageValue: 'all',
                typeManageValue: 'all',
                payTypeValue: 'all',
                promptManageValue: 'all',
                orderSourceValue: 'all',
                vatTaxpayer: 0,
                orderType:0
            }
            initData.orderManageSwy = {
                searchNameValue: '',
                searchPhoneValue: '',
                theirFriendValue: 'all',
                orderTypeManageValue: 'all',
                typeManageValue: 'all',
                payTypeValue: 'all',
                promptManageValue: 'all',
                orderSourceValue: 'all',
                vatTaxpayer: 0,
                orderType:0
            }
            initData.orderManageListPage = {
                pageSize: 10,
                current: 1,
                total: 0
            }
            initData.orderManageListPageSwy = {
                pageSize: 10,
                current: 1,
                total: 0
            }
            initData.homeInfoManageListPage = {
                pageSize: 10,
                current: 1,
                total: 0
            }
            initData.bigNewsManageListPage = {
                pageSize: 10,
                current: 1,
                total: 0
            }
            initData.partnerPlanManageListPage = {
                pageSize: 10,
                current: 1,
                total: 0
            }
            initData.orderManageList = [{
                id: 1,
                orderNum: '34234234234',
                orderTime: '2017-02-15 10：39：00',
                orderType: '新购订单',
                companyName: '北京人人时代科技有限公司',
                timeSum: 6,
                startTime: '2017-05-05',
                endTime: '2017-12-05',
                payType: '支付宝',
                buyPrompt: '交易完成',
                buyType: 1,
                orderFrom: 'eshuike',
                phone: 'eshuike',
                orderGz: '已开，邮寄中'
            }]
            initData.orderManageListSwy = [{
            }]
            initData.homeInfoList= []
            initData.partnerList = []
            initData.versionPage = []
            initData.paging = []
            initData.operationList = []
            if (activeKey) {
                if(activeKey == '1202') {
                    initData.activeKey = 12
                    initData.orderActiveKey = 2
                } else {
                    initData.activeKey = activeKey
                }
                if (activeKey == '50'){
                    let currMenu = initData.getMenus.find(item=>item.key == '50'),
                        currentOrg = null
                    if (!(currMenu.initData && currMenu.initData.size)){
                        currentOrg =  injectFuns.getContext().createOrgId
                        if (!currentOrg){
                            initData.activeKey = '1'
                        }else{
                            currMenu.initData = fromJS({ id: currentOrg})
                            initData.currentTab = currMenu
                            initData.isShowAuthentication = true
                        }
                    }
                }
            }

            //从it系统来的特殊处理
            if(from == 'it'){
                setTimeout(()=>{
                    saveActiveKey(activeKey)(injectFuns)
                },0)
            }

            let context = injectFuns.getContext()
                context.appInfo = data.value.app
                injectFuns.setContext(context)
            initView({ meta: api.meta, data: initData }, exports)(injectFuns)
            if (initData.activeKey == 12) {
                let orderActiveKey = da.getterByField('orderActiveKey')(injectFuns) || 1
                initMyOrder(orderActiveKey)(injectFuns)
            }
            // initView({ meta:api.meta, data:initData }, exports)(injectFuns)
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
                link.setAttribute('href', appInfo.iconUrl ? appInfo.iconUrl : 'static/images/default/favicon.png')
            } else {
                name = '易嘉人'
                link.setAttribute('href', 'static/images/default/favicon.png')
            }
            document.title = `${name}_智能财税平台`
            head.appendChild(link)
        }).catch(err => {
            debugger
            // return da.setMessage({ type: 'error', mode: 'message', content: err.toString() })(injectFuns)
            // initView({ meta:{}, data:{} }, exports)(injectFuns)
        })
    }
}

export function setExamModalVisible(visible){
    return injectFuns=>{
        injectFuns.reduce('setExamModalVisible',visible)
    }
}

export function switchOrgList(status){
    return injectFuns=>{
        injectFuns.reduce('switchOrgList',status)
    }
}

export function setVatMode(value){
    return injectFuns=>{
        injectFuns.reduce('setVatMode',value)
    }
}

/**
 * [setShowCompoent 设置创建企业成功之后显示修改启用期间和会计准则的组件]
 * @param {[type]} showCompoent [显示哪个组件]
 */
export function setShowCompoent(showCompoent){
    return injectFuns=>{
        injectFuns.reduce('setShowCompoent',showCompoent)
    }
}

/*伙伴价格管理开始*/
/**
 * [promoCodeInitView 伙伴价格管理初始化]
 * @return {[type]} [description]
 */
export function promoCodeInitView(maxHeight, currentPage, pageSize) {
    return injectFuns => {
        let page = da.getterByField('promoCode.page')(injectFuns).toJS(),
            fromData = {
                currentPage: currentPage || page.currentPage,
                pageSize: pageSize || page.pageSize
            }
        webapi.salecode.querySalecodeList(injectFuns.post, fromData).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            injectFuns.reduce('promoCodeInitView', data.value, maxHeight)
        })
    }
}

/*订单下载*/

export function conDownload(conId) {
    return injectFuns => {
       let fromData = {'contractNo' :conId }
        webapi.order.conDownload(injectFuns.formPost, fromData).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
        })
    }
}


/**
 * 编辑服务商名称
 */
export function editDzOrgName(rowIndex){
    return injectFuns=>{
        injectFuns.reduce('editDzOrgName', rowIndex)
    }
}

export function updateDzOrgNameChange(name, rowIndex){
    return injectFuns=>{
        injectFuns.reduce('updateDzOrgNameChange',name,rowIndex)
    }
}

export function closeUpdateDzOrgName(rowIndex){
    return injectFuns=>{
        injectFuns.reduce('closeUpdateDzOrgName',rowIndex)
    }
}

export function updateDzOrgNameSuccess(rowIndex){
    return injectFuns=>{
        let orgInfo = da.getterByField(`orgs.${rowIndex}`)(injectFuns)
        if (!orgInfo.get('name')) return da.setMessage({
            type: 'error',
            title: '错误',
            content: '服务商名称不允许为空',
            mode: 'message'
        })(injectFuns)
        webapi.org.updateName(injectFuns.post,{id:orgInfo.get('id'),name:orgInfo.get('name')}).then(data=>{
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            injectFuns.reduce('updateDzOrgNameSuccess', rowIndex)
            da.setMessage({
                type: 'success',
                title: '成功',
                content: '服务商名称修改成功',
                mode: 'message'
            })(injectFuns)
        })
    }
}

/**
 * [DelPromoCode 删除当前的伙伴价格]
 * @param {[type]} item [description]
 */
export function DelPromoCode(item) {
    return injectFuns => {
        let e = item
        da.setMessage({
            type: 'confirm',
            title: '警告',
            content: '您确定要删除' + item.get('appName') + '吗？',
            width: 410,
            onCancel: () => {
                da.clearMessage()(injectFuns)
            },
            onOk: () => {
                webapi.salecode.deleteSalecode(injectFuns.post, { id: item.get('id'), ts: item.get('ts') }).then(data => {
                    if (!da.handleWebApiInfo(data)(injectFuns)) return
                    da.clearMessage()(injectFuns)
                    promoCodeInitView(da.getterByField('promoCode.maxHeight')(injectFuns))(injectFuns)
                    return da.setMessage({
                        type: 'success',
                        title: '成功',
                        content: '删除成功',
                        mode: 'message'
                    })(injectFuns)
                })
            }
        })(injectFuns)
    }
}

/**
 * [initAuthentication 实名认证的初始化方法]
 * @return {[type]} [description]
 */
export function initAuthentication(orgId,cb){
    return injectFuns=>{
        webapi.identity.query(injectFuns.post,{orgId:orgId}).then(data=>{
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            injectFuns.reduce('initAuthentication',data.value)
        cb && cb()
            /*
            busLicensePath:营业执照的图片地址
            qrCode:生成二维码的code
             */
        })
    }
}

/**
 * [importPersonCheange 实名认证的上传处理方法]
 * @param  {[type]} info     [description]
 * @param  {[type]} hideMask [description]
 * @return {[type]}          [description]
 */
export function uploadAuthenticationImg(info,hideMask){
    return injectFuns=>{
        if(info.file.status != 'uploading'){
            hideMask()
        }
        if (info.file.status === 'done') {
            if (!da.handleWebApiInfo(info.file.response)(injectFuns)){
                if(!info.file.response.result && info.file.response.value){
                    return da.setMessage({type: 'error', mode: 'message', content: info.file.response.value})(injectFuns)
                }
                return
            }
            if(info.file.response.result && info.file.response.value){
                // da.setMessage({type: 'success', mode: 'message', content: '导入成功！'})(injectFuns)
                injectFuns.reduce('uploadImg',info.file.response.value)
            }
        }
    }
}

/**
 * [seeAuthenticationImg 实名认证的查看营业执照]
 * @param  {[type]} imgPath [description]
 * @return {[type]}         [description]
 */
export function seeAuthenticationImg(imgPath){
    return injectFuns=>{
        da.setMessage({
            type: 'app',
            title: '',
            content: 'app:apps/common/seeImg',
            width: 700,
            initData:{url:imgPath,width:'670px',height:'450px'},
            refName: 'addPromoCodeModal',
            okText: '确定',
            maskClosable:true,
            className:'authenticationImg',
            footer:[],
            onCancel: () => { da.clearMessage()(injectFuns)},
            onOk: () => { da.clearMessage()(injectFuns)}
        })(injectFuns)
    }
}

/**
 * [promoCodePageChange 页码发生变化]
 * @param  {[type]} currentPage [description]
 * @return {[type]}             [description]
 */
export function promoCodePageChange(currentPage) {
    return injectFuns => {
        promoCodeInitView(da.getterByField('promoCode.maxHeight')(injectFuns), currentPage)(injectFuns)
    }
}

/**
 * [promoCodePageSizeChange 每页显示大小发生变化]
 * @param  {[type]} pageSize [description]
 * @return {[type]}          [description]
 */
export function promoCodePageSizeChange(pageSize) {
    return injectFuns => {
        promoCodeInitView(da.getterByField('promoCode.maxHeight')(injectFuns), null, pageSize)(injectFuns)
    }
}

/**
 * 合同签署
 */
export function contarctSiging(id) {
    return injectFuns => {
        let list = {}

        list.id = id
        webapi.order.queryOnlineOrderDetail(injectFuns.post, list).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            if(data){
               let orgName = data.value.orgName
                da.setMessage({
                    type: 'app',
                    title: '合同签署',
                    content: 'app:apps/login/admin/contarctSiging',
                    okText: '立即签署',
                    refName: 'contarctSigingModal',
                    initData: {id,orgName},
                    width: 600,
                    onCancel: () => {
                        da.clearMessage()(injectFuns)
                    },
                    onOk: (data) => {
                        if (data.result) {
                            da.clearMessage()(injectFuns)
                            let list = {}
                            list.page = {
                                currentPage: 1,
                                pageSize: 100
                            }
                            da.setMessage({
                                type: 'confirm',
                                content: '是否已签署合同?',
                                okText:'已签署',
                                cancelText:'未签署',
                                onCancel: () => {  
                                    getOrderList(list)(injectFuns)
                                },
                                onOk: () => {
                                    getOrderList(list)(injectFuns)
                                }
                            })(injectFuns)
                        }
                    }
                })(injectFuns)
            }
        })
    }
}

/**
 * [editPromoCode 编辑伙伴价格]
 * @param  {[type]} item [description]
 * @return {[type]}      [description]
 */
export function editPromoCode(item) {
    return injectFuns => {
        da.setMessage({
            type: 'app',
            title: '编辑伙伴价格',
            content: 'app:apps/login/admin/addPromoCode',
            width: 400,
            initData: item,
            refName: 'addPromoCodeModal',
            okText: '确定',
            onCancel: () => { da.clearMessage()(injectFuns) },
            onOk: (data) => {
                if (data.result) {
                    da.clearMessage()(injectFuns)
                    promoCodeInitView(da.getterByField('promoCode.maxHeight')(injectFuns))(injectFuns)
                    return da.setMessage({
                        type: 'success',
                        title: '成功',
                        content: '修改成功',
                        mode: 'message'
                    })(injectFuns)
                }
            }
        })(injectFuns)
    }
}
/*伙伴价格管理结束*/

export function createVersionTable(e, rowIndex) {
    return injectFuns => {
        let versionContentList = da.getterByField('createVersion.versionContentList')(injectFuns)
        if (rowIndex == versionContentList.size - 1) {
            injectFuns.reduce('addCreateVersionItem')
        }
    }
}
//its订单-暂时屏蔽
/* export function initItsOrder(){
    return async injectFuns=>{
        let res = await webapi.itsOrder.queryOnlineOrderList(injectFuns.post, { page: { currentPage: 1, pageSize: 100 } })
        if (!da.handleWebApiInfo(res)(injectFuns)) return
        injectFuns.reduce('initItsOrder', res.value)
    }
} */

export function initMyOrder(key) {
    return injectFuns => {
        if(key == '1') {
            let params = { page: { currentPage: 1, pageSize: 100 } },
                appId = da.getterByField('appInfo.id')(injectFuns)
            if(appId == 104){
                params.productId = 5
            }
            webapi.order.queryOnlineOrderList(injectFuns.post, params).then(data => {
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                injectFuns.reduce('initMyOrder', data.value, key)
            })
        } else if (key == '2') {
            webapi.order.queryOnlineOrderListSwy(injectFuns.post, { }).then(data => {
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                injectFuns.reduce('initMyOrderSwy', data.value, key)
            })

        }
    }
}
export function initOrderManage() {
    return injectFuns => {
        let queryOrderData,
            curDate = moment(new Date()),
            curYear = curDate.year(),
            curMonth = curDate.month() + 1 < 10 ? '0' + (curDate.month() + 1) : curDate.month() + 1,
            dayNum = moment(curYear + "-" + curMonth, "YYYY-MM").daysInMonth(),
            startDate = curYear + "-" + curMonth + "-" + '01',
            endDate = curYear + "-" + curMonth + "-" + dayNum,

            list = { 'beginDate': startDate + ' 0:0:0', 'endDate': endDate + ' 23:59:59' }
        list = updateOrderManageItem(undefined, 'export')(injectFuns).beginDate.indexOf('undefined')!=-1?list:updateOrderManageItem(undefined, 'export')(injectFuns)

        webapi.order.queryOrderList(injectFuns.post, list).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            queryOrderData = data.value
            return webapi.order.getAllFriend(injectFuns.post, {})
        }).then(data => {
            if (data) {
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                injectFuns.reduce('initOrderManage', queryOrderData, data.value, list)
            }
        })
        webapi.order.queryOrderListSwy(injectFuns.post, list).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            injectFuns.reduce('initMyOrderManageSwy', data.value, list)
        })
    }
}
export function initParnterManage() {
    return injectFuns => {
        webapi.order.getAllFriend(injectFuns.post, {}).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            injectFuns.reduce('initParnterManage', data.value)
        })
    }
}

export function initVersionManage(value, type) {
    return injectFuns => {
        let versionPage = da.getterByField('versionPage')(injectFuns),
            list = {
                currentPage: 1,
                pageSize: 20

            }
        if (type) {
            if (type == 'current') {
                if ((value - 1) * versionPage.pageSize >= versionPage.total) {
                    list.currentPage = 1
                    list.pageSize = versionPage.get('pageSize')
                } else {
                    list.currentPage = value
                    list.pageSize = versionPage.get('pageSize')
                }
            } else if (type == 'pageSize') {
                list.pageSize = value.pageSize
                list.currentPage = value.current
            } else if (type = 'del') {
                if (versionPage.total > versionPage.pageSize && versionPage.total % versionPage.pageSize == 1) {
                    list.currentPage = versionPage.current - 1
                    list.pageSize = versionPage.get('pageSize')
                }
            }
        } else {
            if (versionPage) {
                list.currentPage = versionPage.get('current')
                list.pageSize = versionPage.get('pageSize')
            }
        }
        webapi.web.versionQuery(injectFuns.post, list).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            injectFuns.reduce('initVersionManage', data.value)
        })
    }
}

export function versionPageChange(current, size, type) {
    return injectFuns => {
        let pageInfo = {
            current: current,
            pageSize: size
        }
        initVersionManage(pageInfo, type)(injectFuns)
    }
}

export function sTSManageInitView(maxHeight) {
    return injectFuns => {
        webapi.search.getAllManualKeys(injectFuns.post, {}).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            injectFuns.reduce('initAllManualKeys', data.value, maxHeight)
        })
    }
}

export function guideManageInitView(maxHeight) {
    return injectFuns => {
        webapi.guideAccounting.keywordsList(injectFuns.post, {logo: 1}).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
                injectFuns.reduce('initGuideKeys', data.value, maxHeight)
            })
      }
}
export function guideManageInitView2(maxHeight) {
    return injectFuns => {
        webapi.guideAccounting.keywordsList(injectFuns.post, {logo: 2}).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            injectFuns.reduce('initGuideKeys', data.value, maxHeight)
        })
    }
}
export function guideManageInitView3(maxHeight) {
    return injectFuns => {
        webapi.guideAccounting.keywordsList(injectFuns.post, {logo: 3}).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            injectFuns.reduce('initGuideKeys', data.value, maxHeight)
        })
    }
}

export function guideExport(){
    return injectFuns =>{
        let ExportLogo = da.getterByField('guideManageInitView.Id')(injectFuns)
        webapi.guideAccounting.daoZhangExport(injectFuns.formPost, {logo: ExportLogo})
    }
}

export function guideManageUpdate(maxHeight) {
    return injectFuns => {
        let nowId = da.getterByField('guideManageInitView.Id')(injectFuns)
        webapi.guideAccounting.keywordsList(injectFuns.post, {logo: nowId}).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            injectFuns.reduce('initGuideKeys', data.value, maxHeight)
        })
    }
}

export function sTSManageReFresh() {
    return injectFuns => {
        webapi.search.refresh(injectFuns.post, {}).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            if (data.value) {
                da.setMessage({ type: 'success', mode: 'message', content: '关键字全部重新生成成功!' })(injectFuns)
            } else {
                da.setMessage({ type: 'error', mode: 'message', content: '关键字全部重新生成失败!' })(injectFuns)
            }
        })
    }
}

export function handleEdit(index, keys, code, extKeys) {
    return injectFuns => {

        da.setMessage({
            type: 'app',
            title: '',
            content: 'app:apps/login/admin/sTSManageEdit',
            wrapClassName: 'sTSManageEdit',
            width: 500,
            initData: { keys, code, extKeys, handleEditCb: handleEditCb(injectFuns) },
            refName: 'sTSManageEdit',
            onCancel: () => {
                da.clearMessage()(injectFuns)
				let clearExtKeys = da.getterByField('form.clearExtKeys')(injectFuns)
				// if(clearExtKeys) {
					injectFuns.reduce('updataExtKeys', index, clearExtKeys)
				// }
            },
            onOk: (cb) => {
                if (!cb.result) return
                da.clearMessage()(injectFuns)
                let newKeys = cb.value,
					editExtValue1 = cb.editExtValue1
                webapi.search.update(injectFuns.post, { businessCode: code, keys: newKeys }).then(data => {
                    if (!da.handleWebApiInfo(data)(injectFuns)) return
                    if (data.value) {
                        da.setMessage({ type: 'success', mode: 'message', content: '关键字编辑成功!' })(injectFuns)
                        injectFuns.reduce('updateManualKeys', index, newKeys, editExtValue1)
                    }
                    if(data.result){

                    }
                })
            }
        })(injectFuns)
    }
}


export function handleEdit1(index, id, keyWords ,isAux) {
    return injectFuns => {

        da.setMessage({
            type: 'app',
            title: '',
            content: 'app:apps/login/admin/guideManageEdit',
            wrapClassName: 'guideManageEdit',
            width: 500,
            initData: { index, id, keyWords,isAux, handleEditCb: handleEditCb(injectFuns) },
            refName: 'guideManageEdit',
            onCancel: () => {
                da.clearMessage()(injectFuns)
            },
            onOk: (cb) => {
                if (!cb.result) return

                let newKeys = cb.value.keyWords,
                    checkbox = cb.value.checkbox

                if(checkbox.length == 0){
                    checkbox[0] = '0';

                }else if(checkbox.length != 1){
                    return da.setMessage({ type: 'warning', mode: 'message', content: '您好，暂时不支持多种辅助核算，请选择一项!' })(injectFuns)
                }

                let maxHeight = da.getterByField('guideManage.maxHeight')(injectFuns)
                da.clearMessage()(injectFuns)
                webapi.guideAccounting.keywordsUpdate(injectFuns.post, { id: id ,isAux:checkbox[0],keyWords:newKeys}).then(data => {
                    if (!da.handleWebApiInfo(data)(injectFuns)) return
                    if (data.value) {
                        da.setMessage({ type: 'success', mode: 'message', content: '编辑成功!' })(injectFuns)
                        injectFuns.reduce('updateManualKeys1', index, newKeys)
                        guideManageUpdate(maxHeight)(injectFuns)
                    }


                })
            }
        })(injectFuns)
    }
}

export function handleEditCb(injectFuns) {
	return data => {
		if(data && data.result) {
			injectFuns.reduce('clearExtKeys')
		}
	}
}

export function searchKeys(value) {
    return injectFuns => {
        let allManualKeys = da.getterByField('sTSManage.list')(injectFuns).toJS(),
            searchValue = []

        webapi.search.searchBusiness(injectFuns.post, value).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            if (data.value.length) {
                data.value.map(o => {
                    allManualKeys.map(item => {
                        if (o.businessCode == item.businessCode) {
                            searchValue.push(item)
                        }
                    })
                })
            }
            if (!value) {
                searchValue = allManualKeys
            }
            injectFuns.reduce('searchKeys', fromJS(searchValue))
        })
    }
}


export function guidesearchKeys(value) {
    return injectFuns => {
        let allManualKeys = da.getterByField('guideManage.guideKeys')(injectFuns).toJS(),
          guidesearchValue = []
        webapi.guideAccounting.keywordsList(injectFuns.post, value).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            if (data.value.list.length) {
                guidesearchValue = data.value.list
            }
            if (!value) {
                guidesearchValue = allManualKeys
            }
            injectFuns.reduce('guidesearchKeys', fromJS(guidesearchValue))
        })
    }
}



export function saveActiveKey(key,orgs) {
    return injectFuns => {
        injectFuns.reduce('setAuthenticationView',key,orgs)
        if (key == 13) {
            initOrderManage()(injectFuns)
        } else if (key == 12) {
            let orderActiveKey = da.getterByField('orderActiveKey')(injectFuns) || 1
            initMyOrder(orderActiveKey)(injectFuns)

        } else if (key == 14) {
            initParnterManage()(injectFuns)
        } else if (key == 16) {
            initVersionManage()(injectFuns)
        } else if (key == 1) {
            initView()(injectFuns)
        } else if (key == 38) {
            queryOperateAuthList()(injectFuns)
        } else if(key == 21){
            initHomeInfoManage()(injectFuns)
        } else if (key == 104){
            initItsOrder()(injectFuns)
        }else {
            injectFuns.reduce('saveActiveKey', key,orgs)
        }
    }
}

export function saveOrderActiveKey(key,orgs) {
    return injectFuns => {
        injectFuns.reduce('saveOrderActiveKey',key,orgs)
        initMyOrder(key)(injectFuns)
    }
}
//运营管理
export function operationPageChange(current){
    return injectFuns => {
        injectFuns.reduce('setOperationCurrent', current)
        queryOperateAuthList()(injectFuns)
    }
}
export function operationPageSizeChange(pageSize) {
    return injectFuns => {
        injectFuns.reduce('setOperationPageSize', pageSize)
        queryOperateAuthList()(injectFuns)
    }
}
export function queryOperateAuthList(){
    return injectFuns => {
        let operation = da.getterByField('operation.from')(injectFuns),
            list = {}
        if(operation){
            operation = operation.toJS()
            list.page = {
                "currentPage": operation.page.current,
                "pageSize": operation.page.pageSize
            }
        }else{
            list.page = {
                "currentPage": 1,
                "pageSize": 20
            }
        }
        webapi.operate.queryOperateAuthList(injectFuns.post,list).then(data =>{
            if (!da.handleWebApiException(data)(injectFuns)) return
            injectFuns.reduce('showOperateAuthList',data.value)
        })
    }
}
export function showEditClient(rowIndex){
    return injectFuns => {
        let initData,title='新增角色'
        if(rowIndex!=undefined){
            let roleId = da.getterByField('operationList')(injectFuns).toJS()[rowIndex]
            initData = roleId
            title='查看角色'
        }

        da.setMessage({
            type: 'app',
            title: title,
            content: 'app:apps/dz/operation/operationAdd',
            wrapClassName:'operationAdd',
            width: 360,
            initData: initData,
            refName: 'operationAdd',
            onCancel: ()=> {
                da.clearMessage()(injectFuns)
            },
            onOk: (cb)=> {
                da.clearMessage()(injectFuns)
                queryOperateAuthList()(injectFuns)
            }
        })(injectFuns)
    }
}
export function showRemoveOperation(rowIndex){
    return injectFuns => {
        da.setMessage({
            type: 'confirm',
            title: '提示',
            content: '是否确定删除？',
            onCancel: () => {
                da.clearMessage()(injectFuns)
            },
            onOk: () => {
                da.clearMessage()(injectFuns)
                let list=[]
                if(rowIndex!=undefined){
                    let roleId = da.getterByField('operationList')(injectFuns).toJS()[rowIndex].id
                    list.push(roleId)
                }else{
                    let selectedRows = da.getSelectedRows('operation.operationList.select')(injectFuns)
                    if(selectedRows.toJS().length != 0){
                        selectedRows.map((o,index)=>{
                            list.push(o.get('id'))
                        })
                    }
                }
                webapi.operate.roleDelete(injectFuns.post,list).then(data =>{
                    if (!da.handleWebApiException(data)(injectFuns)) return
                    queryOperateAuthList()(injectFuns)
                })
            }
        })(injectFuns)
    }
}



export function orgCreateOrder(rowIndex) {
    return injectFuns => {
        let isOperators = da.getterByField('isOperators')(injectFuns),
            appInfo = da.getterByField('appInfo')(injectFuns) ? da.getterByField('appInfo')(injectFuns) : undefined,
            orgExpireTimeList = da.getterByField('orgExpireTimeList')(injectFuns).toJS(),
            isYj
        if (isOperators && (!appInfo || appInfo.get('id') == 100)) {//如果是易嘉人的运营人员进来
            isYj = true
        } else if (isOperators && appInfo) {
            isYj = false
        }
        initOrderManage()(injectFuns)
        let org = {
            id: orgExpireTimeList[rowIndex].id,
            name: orgExpireTimeList[rowIndex].name,
            expireTime: orgExpireTimeList[rowIndex].expireTime
        }
        da.setMessage({
            type: 'app',
            title: '创建订单',
            content: 'app:apps/login/admin/manageItem',
            // okText: '查看订单',
            wrapClassName: 'manageItemWrap',
            width: 780,
            initData: {
                isCreate: true,
                orderSource: 2,
                'isYj': isYj,
                'isOperators': isOperators,
                'appInfo': appInfo,
                'mobile': orgExpireTimeList[rowIndex].creatorMobile,
                'id': orgExpireTimeList[rowIndex].id,
                'vatTaxpayer': orgExpireTimeList[rowIndex].vatTaxpayer,
                'org': org
            },
            refName: 'manageItems',
            onCancel: () => {
                da.clearMessage()(injectFuns)
            },
            onOk: (cb) => {
                da.clearMessage()(injectFuns)
                // updateOrderManage()(injectFuns)
                updateOrderManageItem()(injectFuns)

            }
        })(injectFuns)
    }
}
export function searchOrgClick(newSortType) {
    return injectFuns => {
        let { getterByField, setMessage, validate, handleWebApiInfo } = da,
            orgName = getterByField('searchOrg.orgName')(injectFuns),
            sortType = newSortType ? newSortType : getterByField('sortActive')(injectFuns),
            myYjTableTitle = getterByField('myYjTableTitle')(injectFuns),
            queryPost = myYjTableTitle == 'group' ? webapi.org.groupQuery(injectFuns.post, { orgName: orgName, userId: -1, sortType: sortType }) : webapi.org.query(injectFuns.post, { orgName: orgName, userId: -1, sortType: sortType })
        queryPost.then(data => {
            if (!handleWebApiInfo(data)(injectFuns)) return
            injectFuns.reduce('updateOrgList', data.value.orgList, sortType)
        })
    }
}

export function orgQuery() {
    //运营平台的查询点击事件
    return injectFuns => {
        let { getterByField, setMessage, validate, handleWebApiInfo } = da,
            operationPlatform = getterByField('operationPlatform')(injectFuns),
            orgName = operationPlatform.get('orgName'),
            mobile = operationPlatform.get('phone'),
            appInfo = getterByField('appInfo')(injectFuns),
            appId = appInfo ? appInfo.get('id') : null
        if (orgName) {
            if (!validate('admin.operationPlatform.formItems.orgName')(injectFuns)) return
        }
        if (mobile) {
            if (!validate('admin.operationPlatform.formItems.phone')(injectFuns)) return
        }
        if (!orgName && !mobile) {
            if (!validate('admin.operationPlatform')(injectFuns)) return
        }
        let postObj = { orgName: orgName, mobile: mobile, queryType: 1, orgType: 2 }
        if (appId) {
            if (appId == 100) {
                postObj.appId = -1
            } else {
                postObj.appId = appId
            }
        }
        webapi.org.query(injectFuns.post, postObj).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            if (data.value.orgList.length <= 0) {
                da.setMessage({ type: 'success', mode: 'message', content: '没有找到相关的企业，请重新输入' })(injectFuns)
            }
            injectFuns.reduce('setOrgExpireTimeList', data.value)
        })
    }
}
//新增企业统计
export function orgAnalyzeInitView(maxHeight) {
    return injectFuns => {
        let orgAnalyzeFrom = da.getterByField('orgAnalyze.from')(injectFuns).toJS(),
            appInfo = da.getterByField('appInfo')(injectFuns)
        if (orgAnalyzeFrom.appId) {
            orgAnalyzeFrom.appId = orgAnalyzeFrom.appId.id
        }
        webapi.org.analyze(injectFuns.post, orgAnalyzeFrom).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            injectFuns.reduce('setOrgAnalyzeData', data.value, maxHeight)
        })
    }
}
export function orgAnalyzeExportClick() {
    return injectFuns => {
        let orgAnalyzeFrom = da.getterByField('orgAnalyze.from')(injectFuns).toJS(),
            appInfo = da.getterByField('appInfo')(injectFuns)
        if (orgAnalyzeFrom.appId) {
            orgAnalyzeFrom.appId = orgAnalyzeFrom.appId.id
        }/*如果是张无忌的运营人员进来不显示企业来源检索*/
        // if(appInfo){
        //     delete orgAnalyzeFrom.appId
        // }
        // console.log(orgAnalyzeFrom)
        // orgAnalyzeFrom.appId = -1
        webapi.org.analyzeExport(injectFuns.formPost, orgAnalyzeFrom)
    }
}
export function orgAnalyzePageChange(current) {
    return injectFuns => {
        injectFuns.reduce('setOrgAnalyzeCurrent', current)
        orgAnalyzeInitView(da.getterByField('orgAnalyze.maxHeight')(injectFuns))(injectFuns)
    }
}
export function orgAnalyzePageSizeChange(pageSize) {
    return injectFuns => {
        injectFuns.reduce('setOrgAnalyzePageSize', pageSize)
        orgAnalyzeInitView(da.getterByField('orgAnalyze.maxHeight')(injectFuns))(injectFuns)
    }
}

//新增用户统计
export function userAnalyzeInitView(maxHeight) {
    return injectFuns => {
        let userAnalyzeFrom = da.getterByField('userAnalyze.from')(injectFuns).toJS(),
            appInfo = da.getterByField('appInfo')(injectFuns)
        if (userAnalyzeFrom.appId) {
            userAnalyzeFrom.appId = userAnalyzeFrom.appId.id
        }
        webapi.user.analyze(injectFuns.post, userAnalyzeFrom).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            injectFuns.reduce('setUserAnalyzeData', data.value, maxHeight)
        })
    }
}
export function userAnalyzeExportClick() {
    return injectFuns => {
        let userAnalyzeFrom = da.getterByField('userAnalyze.from')(injectFuns).toJS(),
            appInfo = da.getterByField('appInfo')(injectFuns)
        if (userAnalyzeFrom.appId) {
            userAnalyzeFrom.appId = userAnalyzeFrom.appId.id
        }/*如果是张无忌的运营人员进来不显示企业来源检索*/
        // if(appInfo){
        //     delete userAnalyzeFrom.appId
        // }
        // console.log(userAnalyzeFrom)
        webapi.user.analyzeExport(injectFuns.formPost, userAnalyzeFrom)
    }
}
export function userAnalyzePageChange(current) {
    return injectFuns => {
        injectFuns.reduce('setUserAnalyzeCurrent', current)
        userAnalyzeInitView(da.getterByField('userAnalyze.maxHeight')(injectFuns))(injectFuns)
    }
}
export function userAnalyzePageSizeChange(pageSize) {
    return injectFuns => {
        injectFuns.reduce('setUserAnalyzeInfoPageSize', pageSize)
        userAnalyzeInitView(da.getterByField('userAnalyze.maxHeight')(injectFuns))(injectFuns)
    }
}

//用户信息
export function userInfoInitView(maxHeight) {
    return injectFuns => {
        let { getterByField } = da,
            userInfoFrom = getterByField('userInfo.from')(injectFuns).toJS(),
            appInfo = getterByField('appInfo')(injectFuns)
        if (userInfoFrom.appId) {
            userInfoFrom.appId = userInfoFrom.appId.id
        }
        webapi.user.query(injectFuns.post, userInfoFrom).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            injectFuns.reduce('setUserInfoData', data.value, maxHeight)
        })
    }
}
export function userInfoPageChange(current) {
    return injectFuns => {
        injectFuns.reduce('setUserInfoCurrent', current)
        userInfoInitView(da.getterByField('userInfo.maxHeight')(injectFuns))(injectFuns)
    }
}
export function userInfoPageSizeChange(pageSize) {
    return injectFuns => {
        injectFuns.reduce('setUserInfoPageSize', pageSize)
        userInfoInitView(da.getterByField('userInfo.maxHeight')(injectFuns))(injectFuns)
    }
}
export function userInfoQuery(maxHeight) {
    return injectFuns => {
        let { getterByField, validate } = da,
            userInfo = getterByField('userInfo')(injectFuns).toJS()
        if (userInfo.from.mobile) {
            if (!validate('admin.userInfo.formItems.phone')(injectFuns)) return
        }
        injectFuns.reduce('setUserInfoCurrent', 1)
        userInfoInitView(maxHeight)(injectFuns)
    }
}

export function exportUserInfo() {
    return injectFuns => {
        let { getterByField } = da,
            { formPost } = injectFuns,
            userInfoFrom = getterByField('userInfo.from')(injectFuns).toJS(),
            appInfo = getterByField('appInfo')(injectFuns)

        if (userInfoFrom.appId) {
            userInfoFrom.appId = userInfoFrom.appId.id
        }
        webapi.user.queryExport(formPost, userInfoFrom)
    }
}

export function exportDzInfo() {
    return injectFuns => {
        let { getterByField } = da,
            { formPost } = injectFuns,
            dzInfo = getterByField('dzInfo.from')(injectFuns).toJS(),
            list = {
                beginExpireTime:'',
                endExpireTime:'',
                beginDate: dzInfo.beginDate,
                endDate: dzInfo.endDate,
                mobile: dzInfo.mobile,
                orgName: dzInfo.orgName,
                status: (!dzInfo.status||dzInfo.status.id=='-1')?null:dzInfo.status.id,
                orgStatus: 10,
                orgType: 1,
                sortType: '',
                source: '',
                appId: -1,
                version: ''

            }


        webapi.dz.queryExport(formPost, list)
    }
}

//服务商信息单条数据企业信息导出
export function exportDzInfoOrgList() {
    return injectFuns => {
        let { getterByField } = da,
            { formPost } = injectFuns,
            orgListInfo = getterByField('organizetionalListInfo')(injectFuns).toJS(),
            list = {
                dzOrgId:orgListInfo.dzOrgId

            }
        webapi.dz.queryOrgListExport(formPost,list)
    }
}

//服务商信息
export function dzInfoInitView(maxHeight) {
    return injectFuns => {
        let { getterByField } = da,
            dzInfo = getterByField('dzInfo.from')(injectFuns).toJS()
        dzInfo.status = (!dzInfo.status||dzInfo.status.id=='-1')?null:dzInfo.status.id
        webapi.dz.spQuery(injectFuns.post, dzInfo).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            injectFuns.reduce('setDzInfoData', data.value, maxHeight)
        })
    }
}
export function dzInfoQuery(maxHeight) {
    return injectFuns => {
        let { getterByField, validate } = da,
            dzInfo = getterByField('dzInfo')(injectFuns).toJS()
        if (dzInfo.from.mobile) {
            if (!validate('admin.dzInfo.formItems.phone')(injectFuns)) return
        }
        injectFuns.reduce('setDzInfoCurrent', 1)
        let maxHeight = da.getterByField('dzInfo.maxHeight')(injectFuns)
        dzInfoInitView(maxHeight)(injectFuns)
    }
}
export function dzInfoPageChange(page) {
    return injectFuns => {
        injectFuns.reduce('setDzInfoCurrent', page)
        let maxHeight = da.getterByField('dzInfo.maxHeight')(injectFuns)
        dzInfoInitView(maxHeight)(injectFuns)
    }
}
export function dzInfoPageSizeChange(pageSize) {
    return injectFuns => {
        injectFuns.reduce('setDzInfoPageSize', pageSize)
        let maxHeight = da.getterByField('dzInfo.maxHeight')(injectFuns)
        dzInfoInitView(maxHeight)(injectFuns)
    }
}
//法人网
export function farenwInitView(maxHeight) {
    return injectFuns => {
        let { getterByField } = da,
            farenw = getterByField('farenw.from')(injectFuns).toJS()
        farenw.status = (!farenw.status)?null:farenw.status.id==0?null:farenw.status.id
        farenw.code =farenw.code||null
        farenw.mobile=farenw.mobile||null
        webapi.farenw.query(injectFuns.post, farenw).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            injectFuns.reduce('setFarenwData', data.value, maxHeight)
        })
    }
}
//法人网查询数据 
export function farenwQuery() {
    return injectFuns => {
        let { getterByField, validate } = da
        injectFuns.reduce('setFarenwCurrent', 1)
        let maxHeight = da.getterByField('farenw.maxHeight')(injectFuns)
        farenwInitView(maxHeight)(injectFuns)
    }
}
export function farenwPageChange(page) {
    return injectFuns => {
        injectFuns.reduce('setFarenwCurrent', page)
        let maxHeight = da.getterByField('farenw.maxHeight')(injectFuns)
        farenwInitView(maxHeight)(injectFuns)
    }
}

export function farenwPageSizeChange(pageSize) {
    return injectFuns => {
        injectFuns.reduce('setfarenwPageSize', pageSize)
        let maxHeight = da.getterByField('farenw.maxHeight')(injectFuns)
        farenwInitView(maxHeight)(injectFuns)
    }
}
//编辑
export function farenwUpdateCounselCountById(cb){
   return injectFuns => {
        webapi.farenw.updateCounselCountById(injectFuns.post, cb).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            injectFuns.reduce('setFarenwData', data.value, maxHeight)
            farenwQuery()(injectFuns)
        })
    }
}

export function showFarenwEdit(rowIndex){
    return injectFuns => {
        let initData,title='编辑',row
        if(rowIndex!=undefined){
            row = da.getterByField('farenw.ajaxData')(injectFuns).toJS()[rowIndex]
        }

        da.setMessage({
            type: 'app',
            title: title,
            content:'app:apps/login/admin/apps/farenw',
            width: 360,
            height:500,
            initData: row,
            refName: 'farenwModal',
            onCancel: ()=> {
                da.clearMessage()(injectFuns)
            },
            onOk: (cb)=> {
                da.clearMessage()(injectFuns)
                console.log(cb)
                if(cb.result){
                    farenwQuery()(injectFuns)
                }
               // farenwUpdateCounselCountById(cb)
            }
        })(injectFuns)
    }
}

export function goOrganizetionalList(type, id,page) {
    return injectFuns => {
        let list = getList(type,id,page)(injectFuns)
        webapi.web.findOrgBySP(injectFuns.post,list).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            injectFuns.reduce('setOrganizetionalList', data.value,list)
        })
    }
}


// 服务商管理
export function spQuery() {
    return injectFuns => {
        let { getterByField, setMessage, validate, handleWebApiInfo } = da,
            operationPlatform = getterByField('dzAdministration')(injectFuns),
            orgName = operationPlatform.get('orgName'),
            mobile = operationPlatform.get('phone')
        if (orgName) {
            if (!validate('admin.dzAdministration.formItems.orgName')(injectFuns)) return
        }
        if (mobile) {
            if (!validate('admin.dzAdministration.formItems.phone')(injectFuns)) return
        }
        if (!orgName && !mobile) {
            if (!validate('admin.dzAdministration')(injectFuns)) return
        }
        webapi.dz.spQuery(injectFuns.post, { orgName: orgName, mobile: mobile }).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            injectFuns.reduce('setDzAdministrationData', data.value)
        })
        /*webapi.org.query(injectFuns.post,{orgName:orgName,mobile:mobile,queryType:1}).then(data=>{
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            if(data.value.orgList.length <= 0){
                da.setMessage({type:'success' , mode:'message' , content:'没有找到相关的企业，请重新输入'})(injectFuns)
            }
            injectFuns.reduce('setOrgExpireTimeList',data.value.orgList)
        })*/
    }
}

//企业信息
export function organizationalInfoInitView(maxHeight) {
    return injectFuns => {
        let { getterByField } = da,
            organizationalInfo = getterByField('organizationalInfo.from')(injectFuns).toJS(),
            appId = getterByField('organizationalInfo.appId')(injectFuns),
            source = getterByField('organizationalInfo.source')(injectFuns),
            registeredAddress = getterByField('organizationalInfo.registeredAddress')(injectFuns)
        /*appInfo = getterByField('appInfo')(injectFuns),
        appId = appInfo ? appInfo.get('id') : null
    if(appId){
        organizationalInfo.appId = appId
    }*/
        organizationalInfo.queryType = 1
        if (appId) {
            organizationalInfo.appId = appId ? appId.get('id') : null
        }
        if (source) {
            organizationalInfo.source = source && source.get('id') != 0 ? source.get('id') : null
        }
        organizationalInfo.sortType = getterByField('organizationalInfo.sortActive')(injectFuns)
        organizationalInfo.version = organizationalInfo.version.id == 8888 ? null : organizationalInfo.version.id
        organizationalInfo.orgStatus = organizationalInfo.orgStatus ? organizationalInfo.orgStatus.id : undefined
        organizationalInfo.vatTaxpayer = (!organizationalInfo.vatTaxpayer || organizationalInfo.vatTaxpayer.id == '-1') ? null : organizationalInfo.vatTaxpayer.id
        organizationalInfo.industry = (!organizationalInfo.industry || organizationalInfo.industry.id == '-1') ? null : organizationalInfo.industry.id
        organizationalInfo.registeredAddress = organizationalInfo.registeredAddress.code == '-1' ? null : organizationalInfo.registeredAddress.code
        organizationalInfo.showTestUserData = false
        let queryObj = {}
        webapi.org.query(injectFuns.post, organizationalInfo).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            queryObj = data.value
            // injectFuns.reduce('setOrganizationalInfoData', data.value, maxHeight)
            return webapi.org.getCityMap(injectFuns.post,{})
        }).then(cityList=>{
            if (!cityList){
                injectFuns.reduce('setOrganizationalInfoData', queryObj, maxHeight,null)
            }
            if (!da.handleWebApiInfo(cityList)(injectFuns)) return
            injectFuns.reduce('setOrganizationalInfoData', queryObj, maxHeight, cityList.value.provinceList)
        })
    }
}

export function searchOrgSort(option) {
    return injectFuns => {
        injectFuns.reduce('searchOrgSort', option.key)
        let maxHeight = da.getterByField('organizationalInfo.maxHeight')(injectFuns)
        organizationalInfoInitView(maxHeight)(injectFuns)
    }
}
export function organizationalInfoPageChange(current) {
    return injectFuns => {
        injectFuns.reduce('setOrganizationalInfoCurrent', current)
        let maxHeight = da.getterByField('organizationalInfo.maxHeight')(injectFuns)
        organizationalInfoInitView(maxHeight)(injectFuns)
    }
}
export function organizationalInfoPageSizeChange(pageSize) {
    return injectFuns => {
        injectFuns.reduce('setOrganizationalInfoPageSize', pageSize)
        let maxHeight = da.getterByField('organizationalInfo.maxHeight')(injectFuns)
        organizationalInfoInitView(maxHeight)(injectFuns)
    }
}
export function authentiyAudit(orgInfo){
    return injectFuns=>{
        da.setMessage({
            type: 'app',
            title: '认证审核',
            okText: '确定',
            content: 'app:apps/login/admin/authentiyAudit',
            initData: orgInfo,
            refName: 'orgInfoModal',
            width: 400,
            onCancel: () => {
                da.clearMessage()(injectFuns)
            },
            onOk: (data) => {
                if(data.result && data.value){
                    da.setMessage({ type: 'success', mode: 'message', content: '审核成功' })(injectFuns)
                    organizationalInfoInitView(da.getterByField('organizationalInfo.maxHeight')(injectFuns))(injectFuns)
                    da.clearMessage()(injectFuns)
                }

            }
        })(injectFuns)
    }
}
export function organizationalInfoQuery() {
    return injectFuns => {
        let { getterByField, validate } = da,
            organizationalInfo = getterByField('organizationalInfo')(injectFuns).toJS()
        if (organizationalInfo.from.mobile) {
            if (!validate('admin.organizationalInfo.bottom.formItems.phone')(injectFuns)) return
        }
        injectFuns.reduce('setOrganizationalInfoCurrent', 1)
        let maxHeight = da.getterByField('organizationalInfo.maxHeight')(injectFuns)
        organizationalInfoInitView(maxHeight)(injectFuns)
    }
}
export function organizationalInfoExport() {
    return injectFuns => {
        let { getterByField, validate } = da,
            organizationalInfo = getterByField('organizationalInfo')(injectFuns).toJS(),
            appId = getterByField('organizationalInfo.appId')(injectFuns),
            source = getterByField('organizationalInfo.source')(injectFuns)
        if (organizationalInfo.from.mobile) {
            if (!validate('admin.organizationalInfo.bottom.formItems.phone')(injectFuns)) return
        }
        /*injectFuns.reduce('setOrganizationalInfoCurrent',1)
        let maxHeight = da.getterByField('organizationalInfo.maxHeight')(injectFuns)
        organizationalInfoInitView(maxHeight)(injectFuns)*/
        let fromObj = organizationalInfo.from
        fromObj.version = fromObj.version.id == 8888 ? null : fromObj.version.id
        organizationalInfo.from.orgStatus = organizationalInfo.from.orgStatus ? organizationalInfo.from.orgStatus.id : undefined
        fromObj.vatTaxpayer = (!organizationalInfo.from.vatTaxpayer||organizationalInfo.from.vatTaxpayer.id=='-1')?null:organizationalInfo.from.vatTaxpayer.id
        fromObj.sortType = getterByField('organizationalInfo.sortActive')(injectFuns)
        if (appId) {
            fromObj.appId = appId ? appId.get('id') : null
        }
        if (source) {
            fromObj.source = source && source.get('id') != 0 ? source.get('id') : null
        }
        delete fromObj.page
        fromObj.industry = fromObj.industry.id == -1 ? '' : fromObj.industry.id
        fromObj.registeredAddress = fromObj.registeredAddress.code == '-1' ? null : fromObj.registeredAddress.code
        fromObj.showTestUserData = false
        fromObj.beginExpireTime = fromObj.beginExpireTime||''
        fromObj.endExpireTime = fromObj.endExpireTime||''
        console.log(fromObj)
        webapi.org.exportExcel(injectFuns.formPost, fromObj)
    }
}
export function editOrg(index, isDz) {
    return injectFuns => {
        let { getterByField, setMessage, clearMessage } = da,
            orgExpireTimeList = getterByField('orgExpireTimeList')(injectFuns),
            dzAdministrationList = getterByField('dzAdministrationList')(injectFuns),
            title = isDz ? '服务商管理' : '企业管理',
            appInfo = da.getterByField('appInfo')(injectFuns),
            appList = getterByField('appList')(injectFuns),
            initData = isDz ? { client: dzAdministrationList.getIn([index]), isDz: isDz, appList: false, appInfo: appInfo } : { client: orgExpireTimeList.getIn([index]), appList: appList, isDz: isDz, appInfo: appInfo },
            successContent = isDz ? '修改服务商信息成功' : '修改企业信息成功',
            errorContent = isDz ? '修改服务商信息失败' : '修改企业信息失败'
        setMessage({
            type: 'app',
            title: title,
            okText: '确定',
            content: 'app:apps/login/admin/editOrg',
            initData: initData,
            refName: 'editOrgModal',
            width: 660,
            onCancel: () => {
                clearMessage()(injectFuns)
            },
            onOk: (data) => {
                if (data.result && data.value) {
                    da.setMessage({ type: 'success', mode: 'message', content: successContent })(injectFuns)
                    if (isDz) {
                        spQuery()(injectFuns)
                    } else {
                        orgQuery()(injectFuns)
                    }
                } else {
                    da.setMessage({ type: 'error', mode: 'message', content: errorContent })(injectFuns)
                }
                clearMessage()(injectFuns)
            }
        })(injectFuns)
    }
}

export function nextLoginChange(nextLogin) {
    return ({ reduce }) => {
        reduce('nextLoginChange', nextLogin)
    }

}


export function toggleOrg(orgId) {
    return injectFuns => {
        initView(orgId)(injectFuns)
    }

}

export function initCreateOrg() {
    return injectFuns => {
        webapi.org.getCityMap(injectFuns.post,{}).then(data=>{
            if(!da.handleWebApiInfo(data)(injectFuns)) return
            injectFuns.reduce('initCreateOrg', data.value.provinceList)
        })
    }
}

export function createOrgAfterClose() {
    return injectFuns => {
        injectFuns.reduce('createOrgAfterClose')
    }
}
export function initCreatePartner() {
    return injectFuns => {
        injectFuns.reduce('initCreatePartner')
    }
}

export function initCreateVersion() {
    return injectFuns => {
        injectFuns.reduce('initCreateVersion')
    }
}

export function versionItemDelete(rowIndex) {
    return injectFuns => {
        injectFuns.reduce('versionItemDelete', rowIndex)
    }
}

export function setIndustryVersion(industryVersion){
    return injectFuns=>{
        injectFuns.reduce('setIndustryVersion', industryVersion)
    }
}

export function createOrgOk() {
    return injectFuns => {
        let { getterByField, setterByField, validate, setMessage, clearMessage, handleWebApiException } = da,
            { post, reduce } = injectFuns,
            createOrgResult = ''
        if (getterByField('alreadyClick')(injectFuns)) {
            return
        }
        reduce('setAlreadyClick')
        //清空焦点
        reduce('onFieldFocus', '')
        let orgs = getterByField('orgs')(injectFuns),
            isOrg = getterByField('isOrg')(injectFuns),
            appId = getterByField('appInfo.id')(injectFuns),
            myYjTableTitle = getterByField('myYjTableTitle')(injectFuns),
            CreateOrgObj = {},
            industryVersion = getterByField('enterprise.industryVersion')(injectFuns),
            orgList = {},
            createGroupData = getterByField('createGroup')(injectFuns)
        if (isOrg && myYjTableTitle == 'org') {
            if (!validate('admin.enterprise')(injectFuns)) {
                return reduce('setNotClick')
            }
            CreateOrgObj.orgType = 2
            CreateOrgObj.name = getterByField('enterprise.orgName')(injectFuns)
            CreateOrgObj.industry = getterByField('enterprise.industry')(injectFuns).get('id')
            CreateOrgObj.registeredAddress = getterByField('enterprise.registeredAddress.code')(injectFuns)
            CreateOrgObj.vatTaxpayer = getterByField('enterprise.statusOfTaxpayer')(injectFuns).get('id')
            if(getterByField('enterprise.industry')(injectFuns).get('id') == '1007') {
                industryVersion = getterByField('enterprise.selectVersion')(injectFuns).get('id')
            }
            if(getterByField('enterprise.industry.id')(injectFuns) == 1006 && !getterByField('enterprise.vatMode')(injectFuns) && industryVersion == 2){
                da.setMessage({ type: 'error', mode: 'message', content: '请选择纳税方式' })(injectFuns)
                return reduce('setNotClick')
            }
            CreateOrgObj.industryVersion = industryVersion //启用模块
            CreateOrgObj.vatMode = industryVersion == 2 ? getterByField('enterprise.vatMode')(injectFuns) : null //纳税方式
            // 判断当前页签是否是集团，如果是集团创建张无忌直接写死appId为100
            CreateOrgObj.appId = appId == 103 ? 100 : appId
            CreateOrgObj.source = 2
        } else if (myYjTableTitle == 'group'){
            if (!validate('admin.createGroup')(injectFuns)) {
                return reduce('setNotClick')
            }
            CreateOrgObj = {
                name:createGroupData.get('orgName'),
                requiredOrgCount:createGroupData.get('requiredOrgCount').get('name'),
                industry:createGroupData.get('industry').get('id'),
                accountingStandards:createGroupData.get('accountingStandards').get('id'),
                registeredAddress:createGroupData.get('registeredAddress').get('code'),
                orgType:3,
                appId:appId,
                source:4
            }
        } else {
            if (!validate('admin.createOrg')(injectFuns)) {
                return reduce('setNotClick')
            }
            CreateOrgObj.name = getterByField('createOrg.orgName')(injectFuns)
            if (!getterByField('createOrg.requiredOrgCount')(injectFuns)) {
                da.setMessage({
                    type: 'warning',
                    contnet: '请填写账套数',
                    mode: 'message'
                })(injectFuns)
            }
            CreateOrgObj.requiredOrgCount = getterByField('createOrg.requiredOrgCount')(injectFuns).get('name')
            CreateOrgObj.orgType = 1
            if (sessionStorage.getItem('appId') == 'null' || sessionStorage.getItem('appId') == null) {
                CreateOrgObj.appId = null
            } else {
                CreateOrgObj.appId = parseInt(sessionStorage.getItem('appId'))
            }
        }
        CreateOrgObj.px = window.location.href.indexOf('?px') != -1 || location.host.indexOf("px") == 0 ? true : ''
        webapi.org.create(post, CreateOrgObj).then(data => {
            if (!handleWebApiException(data)(injectFuns)) {
                return reduce('setNotClick')
            }
            createOrgResult = data.value

            if (myYjTableTitle == 'group'){
                da.setMessage({
                    type: 'success',
                    content: '创建成功',
                    mode: 'message'
                })(injectFuns)
                return webapi.org.groupQuery(post, { userId: -1 })
            }else{
                return webapi.org.query(post, { userId: -1 })
            }
        }).then(data => {
            if (!data) return
            if (!handleWebApiException(data)(injectFuns)) return
            if (sessionStorage.getItem('appId') == 102) {
                reduce('createOrgAfter')
            }
            if (myYjTableTitle == 'group'){
                orgList.groupList = data.value.orgList
            }else{
                orgList.orgList = data.value.orgList
            }
            return webapi.customer.getEnumDetail(injectFuns.post,['accountingStandards'])
        }).then(data=>{
            if(!data) return
            if (!handleWebApiException(data)(injectFuns)) return
            reduce('afterCreateOrg', orgList, createOrgResult, data.value.accountingStandardsList)
        })
    }
}

export function createPartnerOk() {
    return injectFuns => {
        let { getterByField, setterByField, validate, setMessage, clearMessage, handleWebApiException } = da,
            { post, reduce } = injectFuns,
            createPartnerResult = '',
            currentPartnerIndex = getterByField('currentPartnerIndex')(injectFuns)

        //清空焦点
        reduce('onFieldFocus', '')
        let createPartner = da.getterByField('createPartner')(injectFuns).toJS(),
            list = {
                name: createPartner.name,
                appServiceTel: createPartner.appServiceTel,
                id: createPartner.id
            }
        if (createPartner.parentPartner && createPartner.parentPartner.id != -1) {
            list.parentId = createPartner.parentPartner.id
        }
        if (createPartner.name === undefined || createPartner.name === '') {

            da.setValidate('admin.createPartner.formItems.name', '伙伴名称不能为空')(injectFuns)
            return false
        }
        if (currentPartnerIndex !== undefined) {
            list.appServiceTel = list.appServiceTel == null ? '' : list.appServiceTel
            webapi.order.updatePartner(post, list).then(data => {
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                da.setMessage({
                    type: 'success',
                    content: '修改伙伴成功',
                    mode: 'message'
                })(injectFuns)
                initParnterManage()(injectFuns)
            })
        } else {

            webapi.order.checkNameIsExists(post, { name: createPartner.name }).then(data => {
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                if (data.value) {
                    da.setMessage({
                        type: 'warning',
                        content: '该伙伴名称已存在，请重新填写',
                        mode: 'message'
                    })(injectFuns)
                    return false
                } else {

                    return webapi.order.createPartner(post, list)
                }
            }).then(data => {
                if (data) {

                    if (!da.handleWebApiInfo(data)(injectFuns)) return
                    da.setMessage({
                        type: 'success',
                        content: '新增伙伴成功',
                        mode: 'message'
                    })(injectFuns)
                    initParnterManage()(injectFuns)
                }
            })
        }

    }
}

export function versionItemChange(rowIndex, value) {
    return injectFuns => {
        let { getterByField, setterByField, validate, setMessage, clearMessage, handleWebApiException } = da,
            { post, reduce } = injectFuns
        if (value.length > 80) {
            value = value.substr(0, 80)
        }
        reduce('updateVersionItem', rowIndex, value)
    }
}

export function createVersionOk() {
    return injectFuns => {
        let { getterByField, setterByField, validate, setMessage, clearMessage, handleWebApiException } = da,
            { post, reduce } = injectFuns,
            createVersionResult = '',
            currentVersionIndex = getterByField('currentVersionIndex')(injectFuns),
            versionContentList = getterByField('createVersion.versionContentList')(injectFuns),
            appMultiple = da.getter('admin.createVersion.formItems.app', 'multiple')(injectFuns)
        //清空焦点
        reduce('onFieldFocus', '')
        let createVersion = da.getterByField('createVersion')(injectFuns).toJS(),
            list, content, contentArr, contentHtmlArr, contentHtmlStr

        if (versionContentList.length == 0) {
            return da.setMessage({
                type: 'warning',
                content: '版本更新说明不能为空',
                mode: 'message'
            })(injectFuns)
        } else {
            versionContentList = versionContentList.toJS()
            contentArr = versionContentList.filter(o => {
                if (o.item !== undefined) {
                    return true
                }
            })
            let i = 0
            contentHtmlArr = contentArr.map(o => {
                i++
                return (i + '、' + o.item)
            })
            contentArr = contentArr.map(o => {
                return o.item
            })
            content = contentArr.join('ν')
            contentHtmlArr = contentHtmlArr.join('</p><p>')
            // contentHtmlStr = '<div style="margin:15px"><div style="border: 1px solid #e9e9e9;padding: 10px 15px;borderRadius: 5px;marginBottom: 8px"><p>'+contentHtmlArr+'</p></div><div><span id="editionMore" style="float:right;marginLeft:10px;color:#2baee9;cursor: pointer">更多</span><span style="float:right">查看更多版本信息,请点击</span></div></div>'
            if (!content) {
                return da.setMessage({
                    type: 'warning',
                    content: '版本更新说明不能为空',
                    mode: 'message'
                })(injectFuns)
            }
        }

        if (!createVersion.updateTime) {
            return da.setMessage({
                type: 'warning',
                content: '版本升级日期不能为空',
                mode: 'message'
            })(injectFuns)
        }
        if ((!appMultiple && !createVersion.app) || (appMultiple && (!createVersion.app || createVersion.app.length == 0))) {
            // if((!appMultiple&&!createVersion.app)||(appMultiple&&createVersion.app.length==0)) {
            return da.setMessage({
                type: 'warning',
                content: '所属伙伴不能为空',
                mode: 'message'
            })(injectFuns)
        }
        if (!createVersion.versionNum) {
            return da.setMessage({
                type: 'warning',
                content: '版本号不能为空',
                mode: 'message'
            })(injectFuns)
        }
        if (createVersion.isTips.id && !(createVersion.versionTitle.replace(/\s+/g, ''))) {
            return da.setMessage({
                type: 'warning',
                content: '版本重要提示不能为空',
                mode: 'message'
            })(injectFuns)
        }
        list = {
            isTips: createVersion.isTips.id,
            mtype: createVersion.mtype.id,
            updateDate: createVersion.updateTime,
            versionContent: content,
            versionNum: createVersion.versionNum,
            versionTitle: createVersion.isTips.id ? createVersion.versionTitle.replace(/\n/g, 'ν') : undefined,
            userId: getterByField('userId')(injectFuns)
        }
        contentHtmlStr = '<div><div>【系统消息】<span style="margin-left: 5px;">' + list.updateDate + '</span></div><p style="margin: 5px 0;">版本号：<span>' + list.versionNum + '</span></p ><div style="max-height: 200px;overflow: auto;"><div>更新内容：</div><p>' + contentHtmlArr + '</p ></div><div style="margin-top: 5px;">查看更过版本更新内容点击 —— <span id="editionMore" style="cursor: pointer;color: #3EABE8;">更多</span></div></div>'
        if (currentVersionIndex !== undefined) {
            list.id = da.getterByField('versionList.' + currentVersionIndex + '.id')(injectFuns) == -1 ? 100 : da.getterByField('versionList.' + currentVersionIndex + '.id')(injectFuns)
            list.ts = da.getterByField('versionList.' + currentVersionIndex + '.ts')(injectFuns)
            // list.appId = createVersion.app.id
            list.appId = 100
            webapi.web.versionUpdate(post, list).then(data => {
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                da.setMessage({
                    type: 'success',
                    content: '修改版本信息成功',
                    mode: 'message'
                })(injectFuns)
                initVersionManage()(injectFuns)
            })
        } else {
            // list.appIdList = createVersion.app
            list.appIdList = ['100']
            webapi.web.versionInsert(post, list).then(data => {
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                da.setMessage({
                    type: 'success',
                    content: '新增版本信息成功',
                    mode: 'message'
                })(injectFuns)
                initVersionManage()(injectFuns)
                //     let list2 = {
                //         msgType: 1,
                //         msgTitle: '版本上线内容更新',
                //         msgText: contentHtmlStr,
                //         orgType: list.mtype
                //     }
                //     return webapi.dz.messageCreate(post,list2)
            })
            // .then(data => {
            //     if(data) {
            //         if (!da.handleWebApiInfo(data)(injectFuns)) return
            //         da.setMessage({
            //             type: 'success',
            //             content: '新增版本信息成功',
            //             mode: 'message'
            //         })(injectFuns)
            //         initVersionManage()(injectFuns)
            //     }
            // })

            // webapi.order.checkNameIsExists(post, {name: createVersion.name}).then(data => {
            //     if (!da.handleWebApiInfo(data)(injectFuns)) return
            //         if(data.value) {
            //             da.setMessage({
            //                 type: 'warning',
            //                 content: '该伙伴名称已存在，请重新填写',
            //                 mode: 'message'
            //             })(injectFuns)
            //             return false
            //         } else {

            //             return webapi.order.createVersion(post,list)
            //         }
            // }).then(data=> {
            //     if(data) {

            //         if (!da.handleWebApiInfo(data)(injectFuns)) return
            //         da.setMessage({
            //             type: 'success',
            //             content: '新增伙伴成功',
            //             mode: 'message'
            //         })(injectFuns)
            //         initParnterManage()(injectFuns)
            //     }
            // })
        }

    }
}

export function prev() {
    return injectFuns => {
        injectFuns.reduce('prev')
    }
}

export function deleteOrg(org) {
    return injectFuns => {
        let { getterByField, clearMessage, setMessage, handleWebApiException } = da,
            { post } = injectFuns,
            context = injectFuns.getContext(),
            appId = context.appInfo.id,
            myYjTableTitle = getterByField('myYjTableTitle')(injectFuns)

        // if(org.get('isInitialOrg')){
        //     setMessage({type:'error' , mode:'message' , content:'默认企业不能删除'})(injectFuns)
        //     return
        // }
        if(appId == 1001){
            setMessage({
                type: 'confirm',
                title: '注意',
                content: '删除企业将永久删除该企业相关的所有数据，无法恢复，请谨慎操作。您确定要删除企业么？', //'您确认要删除'+ org.get('name') +'吗？',
                okText: '确定',
                clearFocus: true,
                onCancel: () => {
                    clearMessage()(injectFuns)
                    //如果点击取消的按钮就执行关闭对话框的操作
                },
                onOk: () => {
                    //如果点击确定按钮就执行删除的操作
                    clearMessage()(injectFuns)
                    webapi.org.deleteOrg(post, org.get('id')).then(data => {
                        if (!data) return
                        if (!handleWebApiException(data)(injectFuns)) return
                        let orgs = da.getterByField('orgs')(injectFuns)
                        let index = orgs.findIndex(o => o.get('name') === org.get('name'))
                        orgs = orgs.remove(index)
                        injectFuns.reduce('updateOrgList', orgs)
                        return setMessage({
                            type: 'success',
                            mode: 'message',
                            content: '删除成功'
                        })(injectFuns)
                    })
                }
            })(injectFuns)
        }else{
            da.setMessage({
                type: 'app',
                title: myYjTableTitle == 'group' ? '删除集团' : '删除企业',
                content: 'app:apps/dz/reinitialize',
                width: 520,
                refName: 'reinitializeModal',
                initData: { fromAdmin: true, isGroup: myYjTableTitle == 'group'},
                // okText: '重新初始化',
                onCancel: () => { da.clearMessage()(injectFuns) },
                onOk: async (data) => {
                    if (data.result) {
                        da.clearMessage()(injectFuns)
                        let isHaveOrgGroupByEntOrgId = null
                        if (myYjTableTitle == 'org'){
                            isHaveOrgGroupByEntOrgId = await webapi.org.isHaveOrgGroupByEntOrgId(post, org.get('id'))
                            if (isHaveOrgGroupByEntOrgId && isHaveOrgGroupByEntOrgId.result && isHaveOrgGroupByEntOrgId.value !== 'true'){
                                return setMessage({
                                    type: 'error',
                                    mode: 'message',
                                    content: isHaveOrgGroupByEntOrgId.value
                                })(injectFuns) 
                            }
                        }
                        let data = await webapi.org.deleteOrg(post, org.get('id'))
                        if (!data) return
                        if (!handleWebApiException(data)(injectFuns)) return
                        let orgs = myYjTableTitle == 'group' ? da.getterByField('groupList')(injectFuns) : da.getterByField('orgs')(injectFuns)
                        let index = orgs.findIndex(o => o.get('name') === org.get('name'))
                        orgs = orgs.remove(index)
                        injectFuns.reduce('updateOrgList', orgs)
                        return setMessage({
                            type: 'success',
                            mode: 'message',
                            content: '删除成功'
                        })(injectFuns)
                    }
                }
            })(injectFuns)
        }




    }
}
export function partnerDelete(partnerId) {
    return injectFuns => {
        let { getterByField, clearMessage, setMessage, handleWebApiException } = da,
            { post } = injectFuns
        setMessage({
            type: 'confirm',
            title: '注意',
            content: '确定要删除伙伴吗？', //'您确认要删除'+ org.get('name') +'吗？',
            okText: '确定',
            clearFocus: true,
            onCancel: () => {
                clearMessage()(injectFuns)
                //如果点击取消的按钮就执行关闭对话框的操作
            },
            onOk: () => {
                //如果点击确定按钮就执行删除的操作
                clearMessage()(injectFuns)

                webapi.order.deletePartner(injectFuns.post, { id: partnerId }).then(data => {
                    if (!da.handleWebApiInfo(data)(injectFuns)) return
                    da.setMessage({
                        type: 'success',
                        content: '删除成功',
                        mode: 'message'
                    })(injectFuns)
                    injectFuns.reduce('partnerDelete', partnerId)
                })
            }

        })(injectFuns)
    }
}

export function partnerUpdate(rowIndex) {
    return injectFuns => {
        let curId = da.getterByField('partnerList.' + rowIndex)(injectFuns).get('id'),
            currentPartner
        webapi.order.getById(injectFuns.post, { id: curId }).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            currentPartner = data.value
            return webapi.order.getAllFriend(injectFuns.post, {})
        }).then(data => {
            if (data) {

                if (!da.handleWebApiInfo(data)(injectFuns)) return
                injectFuns.reduce('partnerUpdate', rowIndex, currentPartner, data.value, curId)
            }

        })
        // injectFuns.reduce('partnerUpdate',rowIndex)
    }
}

export function versionDelete(rowIndex) {
    return injectFuns => {
        let { getterByField, clearMessage, setMessage, handleWebApiException } = da,
            { post } = injectFuns,
            versionList = da.getterByField('versionList.' + rowIndex)(injectFuns).toJS(),
            list = {
                id: versionList.id,
                ts: versionList.ts,
                userId: getterByField('userId')(injectFuns)

            }

        setMessage({
            type: 'confirm',
            title: '注意',
            content: '确定要删除产品版本吗？', //'您确认要删除'+ org.get('name') +'吗？',
            okText: '确定',
            clearFocus: true,
            onCancel: () => {
                clearMessage()(injectFuns)
                //如果点击取消的按钮就执行关闭对话框的操作
            },
            onOk: () => {
                //如果点击确定按钮就执行删除的操作
                clearMessage()(injectFuns)

                webapi.web.versionDelete(injectFuns.post, list).then(data => {
                    if (!da.handleWebApiInfo(data)(injectFuns)) return
                    da.setMessage({
                        type: 'success',
                        content: '删除成功',
                        mode: 'message'
                    })(injectFuns)
                    // injectFuns.reduce('versionDelete',partnerId)
                    initVersionManage(null, 'del')(injectFuns)
                })
            }

        })(injectFuns)
    }
}

export function versionUpdate(rowIndex) {
    return injectFuns => {
        let curId = da.getterByField('versionList.' + rowIndex)(injectFuns).get('id'),
            currentVersion
        webapi.web.queryById(injectFuns.post, { id: curId }).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            currentVersion = data.value
            return webapi.order.getAllFriend(injectFuns.post, {})
        }).then(data => {
            if (data) {
                if (!da.handleWebApiInfo(data)(injectFuns)) return

                injectFuns.reduce('versionUpdate', rowIndex, data.value, currentVersion)
            }
        })
        // webapi.order.getAllFriend(injectFuns.post,{}).then(data => {
        //     if (!da.handleWebApiInfo(data)(injectFuns)) return

        //     injectFuns.reduce('versionUpdate',rowIndex,data.value)
        // })

        // webapi.order.getById(injectFuns.post,{id:curId}).then(data=> {
        //     if (!da.handleWebApiInfo(data)(injectFuns)) return
        //     currentVersion = data.value
        //     return webapi.order.getAllFriend(injectFuns.post,{})
        // }).then(data => {
        //     if(data) {

        //         if(!da.handleWebApiInfo(data)(injectFuns)) return
        //         injectFuns.reduce('versionUpdate',rowIndex,currentVersion,data.value,curId)
        //     }

        // })
        // injectFuns.reduce('partnerUpdate',rowIndex)
    }
}


export function createOrgCancel() {
    return injectFuns => {
        injectFuns.reduce('hideCreateOrg')
    }
}
export function createPartnerCancel() {
    return injectFuns => {
        injectFuns.reduce('hideCreatePartner')
    }
}

export function createVersionCancel() {
    return injectFuns => {
        injectFuns.reduce('hideCreateVersion')
    }
}

export function showCreateOrg() {
    return injectFuns => {
        injectFuns.reduce('setIsShowCreateOrg')
        // injectFuns.reduce('setterByField', 'isShowCreateOrg', true)
    }
}

export function handleCheckUnpaidOrder(props, orgId, cb, url,productId) {
    return async injectFuns => {
        if (orgId) {
            var newWindow = window.open('',"_blank")
            if(productId){// fsk 个人代账订单
                localStorage.setItem('token', sessionStorage.getItem('_accessToken'))
                newWindow.location.href = url+'&productId='+productId
                return
            }
            newWindow.document.innerHTML = '正在加载中请稍后。。。'
            let existsUnpaidOrder = webapi.order.existsUnpaidOrder(injectFuns.post, { 'orgId': orgId })
            /* if(da.getterByField('appId')(injectFuns) == 104){
                existsUnpaidOrder = webapi.itsOrder.existsUnpaidOrder(injectFuns.post, { 'orgId': orgId })
            } */
            existsUnpaidOrder.then(data2 => {
                if (!da.handleWebApiInfo(data2)(injectFuns)) {
                    newWindow.close()
                    return
                }
                if (data2.result) {
                    if (data2.value && data2.value == true) {
                        da.setMessage({
                            type: 'warning',
                            content: '存在未支付的订单!',
                            mode: 'message'
                        })(injectFuns)
                        newWindow.close()
                        window.setTimeout(function () {
                            let host = window.location.host
                            initMyOrder()(injectFuns)

                        }, 3000)
                        return
                    }
                }
                if (cb) {
                    localStorage.setItem('token', sessionStorage.getItem('_accessToken'))
                    newWindow.location.href = url
                }
            })
        }
    }
}

export function swyPay (url) {
    return injectFuns => {
        var newWindow = window.open('',"_blank")

        localStorage.setItem('token', sessionStorage.getItem('_accessToken'))
        newWindow.location.href = url
    }
}

export function createOrg() {
    return injectFuns => {
        injectFuns.reduce('createOrg')
    }
}
export function partnerAdd() {
    return injectFuns => {
        injectFuns.reduce('setCreatePartner', true)
    }
}
export function versionAdd() {
    return injectFuns => {
        webapi.order.getAllFriend(injectFuns.post, {}).then(data => {

            injectFuns.reduce('setCreateVersion', true, data.value)
        })
    }
}
export function initClassEdit(){
    return injectFuns => {
        let { getterByField, setterByField, validate, setMessage, clearMessage, handleWebApiException } = da,
            { post, reduce } = injectFuns,
            list={}
        webapi.operate.SetFileSaveSearch(post, list).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            injectFuns.reduce('initClassEdit',data.value)
        })
    }
}
export function showClassEdit(){
    return injectFuns => {
        injectFuns.reduce('setClassEdit', true)
    }
}
export function changeClassEditOk(){
    return injectFuns =>{
        let { getterByField, setterByField, validate, setMessage, clearMessage, handleWebApiException } = da,
            { post, reduce } = injectFuns,
            list={}
        list.imgName = getterByField('classEdit.imgName')(injectFuns)?getterByField('classEdit.imgName')(injectFuns).get('name'):''
        list.classDate = getterByField('classEdit.classDate')(injectFuns)
        list.teacherName = getterByField('classEdit.teacherName')(injectFuns)
        list.teacherIntruduce = getterByField('classEdit.teacherIntruduce')(injectFuns)==''||getterByField('classEdit.teacherIntruduce')(injectFuns)==undefined?undefined:getterByField('classEdit.teacherIntruduce')(injectFuns).split('\n')
        list.title = getterByField('classEdit.title')(injectFuns)
        list.content = getterByField('classEdit.content')(injectFuns)==''||getterByField('classEdit.content')(injectFuns)==undefined?undefined:getterByField('classEdit.content')(injectFuns).split('\n')
        list.enrollUrl = getterByField('classEdit.enrollUrl')(injectFuns)
        // injectFuns.post('http://192.168.1.61:8086/v1/SetFileSave/SetFileSaveInsert',list)
        if (!list.imgName) {
            return da.setMessage({
                type: 'warning',
                content: '请选择banner图',
                mode: 'message'
            })(injectFuns)
        }else if(!list.classDate){
            return da.setMessage({
                type: 'warning',
                content: '请设置开课时间',
                mode: 'message'
            })(injectFuns)
        }else if(!list.teacherName){
            return da.setMessage({
                type: 'warning',
                content: '请填写讲师名字',
                mode: 'message'
            })(injectFuns)
        }else if(!list.teacherIntruduce){
            return da.setMessage({
                type: 'warning',
                content: '请填写讲师简介',
                mode: 'message'
            })(injectFuns)
        }else if(!list.title){
            return da.setMessage({
                type: 'warning',
                content: '请填写标题',
                mode: 'message'
            })(injectFuns)
        }else if(!list.content){
            return da.setMessage({
                type: 'warning',
                content: '请填写课题大纲',
                mode: 'message'
            })(injectFuns)
        }else if(!list.enrollUrl){
            return da.setMessage({
                type: 'warning',
                content: '请填写报名链接',
                mode: 'message'
            })(injectFuns)
        }else{
            webapi.operate.SetFileSaveInsert(post, list).then(data => {
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                da.setMessage({
                    type: 'success',
                    content: '更改直播内容成功',
                    mode: 'message'
                })(injectFuns)
                injectFuns.reduce('hideClassEdit')
            })
        }
    }
}
export function changeClassEditCancel(){
    return injectFuns => {
        injectFuns.reduce('hideClassEdit')
    }
}
export function getLiveInfo() {
    return injectFuns => {
        webapi.web.queryEnumById(injectFuns.post, {}).then(data => {

            injectFuns.reduce('setLiveInfo', true, data.value)
        })
    }
}

export function changeLiveOk() {
    return injectFuns => {
        let { getterByField, setterByField, validate, setMessage, clearMessage, handleWebApiException } = da,
            { post, reduce } = injectFuns,
            createVersionResult = '',
            currentVersionIndex = getterByField('currentVersionIndex')(injectFuns),
            versionContentList = getterByField('createVersion.versionContentList')(injectFuns),
            appMultiple = da.getter('admin.createVersion.formItems.app', 'multiple')(injectFuns)
        //清空焦点
        reduce('onFieldFocus', '')
        let liveInfo = da.getterByField('liveInfo')(injectFuns).toJS(),
            list, content, contentArr, contentHtmlArr, contentHtmlStr

        list = {
            isLive: liveInfo.isLiveObj.id,
            liveTime: liveInfo.liveTime?liveInfo.liveTime:null,
            publishTime: liveInfo.publishTime?liveInfo.publishTime:null
        }
        webapi.web.updateEnumById(post, list).then(data => {

            if (!da.handleWebApiInfo(data)(injectFuns)) return
            injectFuns.reduce('hideChangeLive')
            da.setMessage({
                type: 'success',
                content: '刷新直播成功',
                mode: 'message'
            })(injectFuns)
        })


    }
}

export function changeLiveCancel() {
    return injectFuns => {
        injectFuns.reduce('hideChangeLive')
    }
}

export function createGenerationAccount(isPersonal) {
    return injectFuns => {
        injectFuns.reduce('createGenerationAccount',isPersonal)
    }
}

export function onFieldChange(path, oldValue, newValue) {
    return injectFuns => {
        if (path == 'admin.organizationalInfo.formItems.startTime') {
            injectFuns.reduce('setOrganizationalInfoEndTime', newValue)
        } else if (path == 'admin.userInfo.formItems.startTime') {
            injectFuns.reduce('setUserInfoEndTime', newValue)
        } else if (path == 'admin.createVersion.formItems.isTips') {
            injectFuns.reduce('setIsTipsAndVersionTitle', newValue)
            return
        } else if (path == 'admin.dzAdministration.formItems.phone'||
                   path == 'admin.operationPlatform.formItems.phone'||
                   path == 'admin.userInfo.formItems.phone'||
                   path == 'admin.organizationalInfo.formItems.phone'||
                   path == 'admin.organizationalInfo.bottom.formItems.phone'||
                   path == 'admin.dzInfo.formItems.phone') {
            newValue = newValue.replace(/\s/g, "")
        }
        da.onFieldChange(path, oldValue, newValue)(injectFuns)
        if (path === 'admin.searchOrg.formItems.orgName') {
            searchOrgClick()(injectFuns)
        }else if(path === 'admin.enterprise.formItems.industry'){
            //美容行业已开始的时候不支持一般纳税人，现在支持了，需要把限制的代码放开
            //2017-12-6 by 赵烁
            // 2017-12-7 由于上线要求暂时不支持一般纳税人
            // 2017-12-12 根据需求放开对一般纳税人的支持
            // injectFuns.reduce('setBeautyIndustryOption',newValue.get('id'))
            injectFuns.reduce('setIndustryVersionVisible', newValue.get('id'))
            checkCreatOrgValue(newValue,injectFuns)
        }else if(path === 'admin.enterprise.formItems.orgName'){
            checkCreatOrgValue(newValue,injectFuns)
        }else if(path === 'admin.enterprise.formItems.selectVersion'){
            checkCreatOrgValue(newValue,injectFuns)
        }else if(path === 'admin.enterprise.formItems.statusOfTaxpayer'){
            checkCreatOrgValue(newValue,injectFuns)
        }else if(path === 'admin.lastCreate.formItems.enabledYear'||path === 'admin.lastCreate.formItems.accountingStandards'){
            let postObj = {}
            if(path === 'admin.lastCreate.formItems.enabledYear'){
                postObj = {
                    id:da.getterByField('createOrgId')(injectFuns),
                    enabledYear:parseInt(newValue.split('-')[0]),
                    enabledMonth:parseInt(newValue.split('-')[1])
                }
            }else{
                postObj={
                    id:da.getterByField('createOrgId')(injectFuns),
                    accountingStandards:newValue.get('id')
                }
            }
            webapi.org.updateManageInfo(injectFuns.post,postObj).then(data=>{
                if (!da.handleWebApiException(data)(injectFuns)) return
                injectFuns.reduce('showSuccessInfo',path)
            })
        }else if(path == 'admin.partnerPlan.formItems.partnerPlanStatus'){
            initPartnerPlanManage(undefined,undefined,newValue.toJS())(injectFuns)
        }else if(path == 'admin.createPartnerPlan.formItems.province'){
            let queryList = {code:newValue.get('code')}

            webapi.homeManageQuery.getCityMap(injectFuns.post, queryList).then(data => {
                if (!da.handleWebApiInfo(data)(injectFuns)) return


                injectFuns.reduce('setCreatePartnerPlan', true, undefined, data.value, 'isProvinceChange')
            })
        }
    }
}

//创建企业填数据时校验，必填性没填，创建按钮置灰
function checkCreatOrgValue(newValue,injectFuns){
          debugger
          let currIndustry = da.getterByField('enterprise.industry')(injectFuns),
            currStatusOfTaxpayer = da.getterByField('enterprise.statusOfTaxpayer')(injectFuns),
            currOrgName = da.getterByField('enterprise.orgName')(injectFuns),
            currSelectVersion =da.getterByField('enterprise.selectVersion')(injectFuns)
            
            if(newValue){
                /**
                 * [if 当用户修改过行业之后不再调用企典接口去推荐行业]
                 * @param  {[type]} currIndustry.get('id') [当前行业ID为1代表工业（默认行业）]
                 */
                if(/^[\u4E00-\u9FFF\(\)\（\）]{8,}$/g.test(newValue) && currIndustry.get('id') == 1){
                    webapi.dz.queryIndustryByName(injectFuns.post,newValue).then(data=>{
                        if (!da.handleWebApiException(data)(injectFuns)) return
                        if(data.result && data.value){
                            injectFuns.reduce('setIndustry',data.value)
                        }
                    })
                }else{
                    if(currIndustry.get('id') &&currStatusOfTaxpayer.get('id') && currOrgName){
                        return injectFuns.reduce('setDisabledSdate',false)
                    }else if(currIndustry.get('id') ==1007&&currOrgName&&currSelectVersion && currSelectVersion.get('id')==1){
                        return injectFuns.reduce('setDisabledSdate',false)
                    } 
                    return injectFuns.reduce('setDisabledSdate',true)
                }
            }else{
                return injectFuns.reduce('setDisabledSdate',true)
            }
}

export function saveNextLoginMode() {
    return injectFuns => {
        let { getterByField, clearMessage, setMessage, handleWebApiException } = da,
            { post } = injectFuns,
            nextLoginMode = getterByField('nextLogin')(injectFuns)

        webapi.user.updateEntrance(post, nextLoginMode).then(data => {
            //data = data || saveNextLoginModeTestData

            if (!handleWebApiException(data)(injectFuns)) return
            setMessage({
                type: 'success',
                title: '成功',
                content: '设置成功',
                onOk: () => { clearMessage()(injectFuns) }
            })(injectFuns)
        })

    }
}

export function changeOrg(org, cb) {
    return injectFuns => {
        let context = injectFuns.getContext()
        context.currentOrg = org.toJS()
        injectFuns.setContext(context)
        //api接口地址的前缀，后台多业务库场景使用
        if (context.currentOrg && context.currentOrg.apiDomain) injectFuns.setApiRootPath(context.currentOrg.apiDomain);
        cb({ result: true })
        /*
        let {getterByField, clearMessage, setMessage, handleWebApiException} = da,
            {post} = injectFuns

        api.changeOrg(post, org.get('id')).then(data =>{
            if( !handleWebApiException(data)(injectFuns)) {
                return
            }

            cb({result:true})
        })*/

    }
}
export function toIts(org){
    return injectFuns=>{
        webapi.web.itsSync( injectFuns.post,org.get('id')).then(data => {
            // if(!data.value.url || data.value.url == 'https://devits.rrtimes.com'){
            //     data.value.url = 'http://devits.rrtimes.com:8084'
            // }
            window.location.href = `${data.value.url}/v1/authorize#authorization_code=${data.value.token}&from_url=${window.location.origin}`
        })
        
    }
}

export function logout(cb) {
    return injectFuns => {
        webapi.user.logout(injectFuns.post).then(data => {
            if (!data.result) {
                return
            }
            cb()
        })
    }
}

export function updateMyOrderItemSwy(value, type) {
    return injectFuns => {
        let list = {},
            code = da.getterByField('myorder.searchValue')(injectFuns),
            typeValue = da.getterByField('myorder.typeValue')(injectFuns),
            promptValue = da.getterByField('myorder.promptValue')(injectFuns)
        if (type == 'ordertype') {
            orderTypeValue = value
        } else if (type == 'type') {
            typeValue = value
        } else if (type == 'prompt') {
            promptValue = value
        }

        if (typeValue == 'zfb') {
            list.payType = 3
        } else if (typeValue == 'wx') {
            list.payType = 2
        } else if (typeValue == 'all') {
            list.payType = undefined
        }
        if (promptValue == 'already') {
            list.orderStatus = 2
        } else if (promptValue == 'will') {
            list.orderStatus = 1
        } else if (promptValue == 'all') {
            list.orderStatus = undefined
        } else if (promptValue == 'cancel') {
            list.orderStatus = 3
        }
        list.page = {
            currentPage: 1,
            pageSize: 100
        }

        getOrderListSwy(list, type, value)(injectFuns)
    }
}


//我的订单  订单状态
export function updateMyOrderItem(value, type) {
    return injectFuns => {
        let list = {},
            code = da.getterByField('myorder.searchValue')(injectFuns),
            // orderTypeValue = da.getterByField('myorder.orderTypeValue')(injectFuns),
            typeValue = da.getterByField('myorder.typeValue')(injectFuns),
            promptValue = da.getterByField('myorder.promptValue')(injectFuns)
        if (type == 'ordertype') {
            orderTypeValue = value
        } else if (type == 'type') {
            typeValue = value
        } else if (type == 'prompt') {
            promptValue = value
        }

        // if(orderTypeValue=='new') {
        //     list.orderType = 0
        // } else if(orderTypeValue=='again') {
        //     list.orderType = 1
        // } else if(orderTypeValue=='all') {
        //     list.orderType = undefined
        // }
        if (typeValue == 'zfb') {
            list.payType = 3
        } else if (typeValue == 'wx') {
            list.payType = 2
        } else if (typeValue == 'all') {
            list.payType = undefined
        }
        if (promptValue == 'already') {
            list.orderStatus = 4
        } else if (promptValue == 'will') {
            list.orderStatus = 1
        } else if (promptValue == 'all') {
            list.orderStatus = undefined
        } else if (promptValue == 'cancel') {
            list.orderStatus = 5
        }
        list.page = {
            currentPage: 1,
            pageSize: 100
        }
        // list.orgName = da.getterByField('myorder.searchMyNameValue')(injectFuns)
        // list.mobile = da.getterByField('myorder.searchMyPhoneValue')(injectFuns)
        // list.startDate = da.getterByField('myorder.myBeginDateValue')(injectFuns)
        // list.endDate = da.getterByField('myorder.myEndDateValue')(injectFuns)
        getOrderList(list, type, value)(injectFuns)
    }
}
//订单管理  订单状态
export function orderManagePageChange(current, size, type) {
    return injectFuns => {
        let pageInfo = {
            current: current,
            pageSize: size
        }
        updateOrderManageItem(pageInfo, type)(injectFuns)
    }
}
//订单管理  订单状态   Swy
export function orderManagePageChangeSwy(current, size, type) {
    return injectFuns => {
        let pageInfo = {
            current: current,
            pageSize: size
        }
        updateOrderManageItemSwy(pageInfo, type)(injectFuns)
    }
}
export function updateOrderManageItem(value, type) {
    return injectFuns => {
        let list = {},
            // code = da.getterByField('myorder.searchValue')(injectFuns),
            theirFriendValue = da.getterByField('orderManage.theirFriendValue')(injectFuns),
            // orderTypeValue = da.getterByField('orderManage.orderTypeManageValue')(injectFuns),
            typeValue = da.getterByField('orderManage.typeManageValue')(injectFuns),
            promptValue = da.getterByField('orderManage.promptManageValue')(injectFuns),
            payTypeValue = da.getterByField('orderManage.payTypeValue')(injectFuns),
            orderManagePage = da.getterByField('orderManageListPage')(injectFuns).toJS(),
            orderSourceValue = da.getterByField('orderManage.orderSourceValue')(injectFuns),
            registeredAddress = da.getterByField('orderManage.province')(injectFuns)

        if(registeredAddress && registeredAddress !='0'){
            list.registeredAddress = registeredAddress
        }

        if (type == 'ordertype') {
            orderTypeValue = value
            orderManagePage.current = 1
        } else if (type == 'type') {
            typeValue = value
            orderManagePage.current = 1
        } else if (type == 'prompt') {
            promptValue = value
            orderManagePage.current = 1
        } else if (type == 'friend') {
            theirFriendValue = value
            orderManagePage.current = 1
        } else if (type == 'current') {
            if ((value - 1) * orderManagePage.pageSize >= orderManagePage.total) {
                orderManagePage.current = 1
            } else {
                orderManagePage.current = value

            }
        } else if (type == 'pageSize') {
            orderManagePage.pageSize = value.pageSize
            orderManagePage.current = value.current
        } else if (type == 'del') {
            if (orderManagePage.total > orderManagePage.pageSize && orderManagePage.total % orderManagePage.pageSize == 1) {
                orderManagePage.current = orderManagePage.current - 1
            }
        } else if (type == 'paytype') {
            payTypeValue = value
            orderManagePage.current = 1
        } else if (type == 'ordersource') {
            orderSourceValue = value
            orderManagePage.current = 1
        }
        list.page = {
            currentPage: orderManagePage.current,
            pageSize: orderManagePage.pageSize
        }

        if (typeValue == 'down') {
            list.payType = 1
        } else if (typeValue == 'wx') {
            list.payType = 2
        } else if (typeValue == 'all') {
            list.payType = undefined
        } else if (typeValue == 'zfb') {
            list.payType = 3

        }
        if (promptValue == 'already') {
            list.orderStatus = 4
        } else if (promptValue == 'will') {
            list.orderStatus = 1
        } else if (promptValue == 'all') {
            list.orderStatus = undefined
        } else if (promptValue == 'pending') {
            list.orderStatus = 2
        } else if (promptValue == 'fail') {
            list.orderStatus = 3
        } else if (promptValue == 'cancel') {
            list.orderStatus = 5
        } else if (promptValue == 'del') {
            list.orderStatus = 6
        }
        if (theirFriendValue == 'all') {
            list.appId = undefined
        } else {
            list.appId = theirFriendValue
        }

        if (payTypeValue == 'all') {
            list.orderType = undefined
        } else if (payTypeValue == 'new') {
            list.orderType = 1
        } else if (payTypeValue == 'again') {
            list.orderType = 2
        }
        if (orderSourceValue == 'all') {
            list.orderSource = undefined
        } else if (orderSourceValue == 'online') {
            list.orderSource = 1
        } else if (orderSourceValue == 'offline') {
            list.orderSource = 2
        }



        list.orgName = da.getterByField('orderManage.searchNameValue')(injectFuns) === '' ? undefined : da.getterByField('orderManage.searchNameValue')(injectFuns)
        list.mobile = da.getterByField('orderManage.searchPhoneValue')(injectFuns) === '' ? undefined : da.getterByField('orderManage.searchPhoneValue')(injectFuns)
        list.beginDate = da.getterByField('orderManage.beginDate')(injectFuns) + ' 0:0:0'
        list.endDate = da.getterByField('orderManage.endDate')(injectFuns) + ' 23:59:59'
        list.partner = da.getterByField('orderManage.partnerValue')(injectFuns) === '' ? undefined : da.getterByField('orderManage.partnerValue')(injectFuns)
        list.isPay = da.getterByField('orderManage.orderType')(injectFuns) == 0 ? undefined : da.getterByField('orderManage.orderType')(injectFuns)
        list.vatTaxpayer = da.getterByField('orderManage.vatTaxpayer')(injectFuns)==0 ?null : da.getterByField('orderManage.vatTaxpayer')(injectFuns)

        if(type=='export') {//导出时去查询条件
            return list
        } else {//其他情况掉查询接口

            getOrderManageList(list, type, value)(injectFuns)
        }
    }
}
export function updateOrderManageItemSwy(value, type) {
    return injectFuns => {
        let list = {},
            // code = da.getterByField('myorder.searchValue')(injectFuns),
            theirFriendValue = da.getterByField('orderManageSwy.theirFriendValue')(injectFuns),
            // orderTypeValue = da.getterByField('orderManage.orderTypeManageValue')(injectFuns),
            typeValue = da.getterByField('orderManageSwy.typeManageValue')(injectFuns),
            promptValue = da.getterByField('orderManageSwy.promptManageValue')(injectFuns),
            payTypeValue = da.getterByField('orderManageSwy.payTypeValue')(injectFuns),
            orderManagePage = da.getterByField('orderManageListPageSwy')(injectFuns).toJS(),
            orderSourceValue = da.getterByField('orderManageSwy.orderSourceValue')(injectFuns),
            registeredAddress = da.getterByField('orderManage.province')(injectFuns)

        if(registeredAddress && registeredAddress !='0'){
            list.registeredAddress = registeredAddress
        }
        if (type == 'ordertype') {
            orderTypeValue = value
            orderManagePage.current = 1
        } else if (type == 'type') {
            typeValue = value
            orderManagePage.current = 1
        } else if (type == 'prompt') {
            promptValue = value
            orderManagePage.current = 1
        } else if (type == 'friend') {
            theirFriendValue = value
            orderManagePage.current = 1
        } else if (type == 'current') {
            if ((value - 1) * orderManagePage.pageSize >= orderManagePage.total) {
                orderManagePage.current = 1
            } else {
                orderManagePage.current = value

            }
        } else if (type == 'pageSize') {
            orderManagePage.pageSize = value.pageSize
            orderManagePage.current = value.current
        } else if (type == 'del') {
            if (orderManagePage.total > orderManagePage.pageSize && orderManagePage.total % orderManagePage.pageSize == 1) {
                orderManagePage.current = orderManagePage.current - 1
            }
        } else if (type == 'paytype') {
            payTypeValue = value
            orderManagePage.current = 1
        } else if (type == 'ordersource') {
            orderSourceValue = value
            orderManagePage.current = 1
        }
        list.page = {
            currentPage: orderManagePage.current,
            pageSize: orderManagePage.pageSize
        }
        if (typeValue == 'down') {
            list.payType = 1
        } else if (typeValue == 'wx') {
            list.payType = 2
        } else if (typeValue == 'all') {
            list.payType = undefined
        } else if (typeValue == 'zfb') {
            list.payType = 3

        }
        if (promptValue == 'already') {
            list.orderStatus = 4
        } else if (promptValue == 'will') {
            list.orderStatus = 1
        } else if (promptValue == 'all') {
            list.orderStatus = undefined
        } else if (promptValue == 'pending') {
            list.orderStatus = 2
        } else if (promptValue == 'fail') {
            list.orderStatus = 3
        } else if (promptValue == 'cancel') {
            list.orderStatus = 5
        } else if (promptValue == 'del') {
            list.orderStatus = 6
        }
        if (theirFriendValue == 'all') {
            list.appId = undefined
        } else {
            list.appId = theirFriendValue
        }

        if (payTypeValue == 'all') {
            list.orderType = undefined
        } else if (payTypeValue == 'new') {
            list.orderType = 1
        } else if (payTypeValue == 'again') {
            list.orderType = 2
        }
        if (orderSourceValue == 'all') {
            list.orderSource = undefined
        } else if (orderSourceValue == 'online') {
            list.orderSource = 1
        } else if (orderSourceValue == 'offline') {
            list.orderSource = 2
        }



        list.orgName = da.getterByField('orderManageSwy.searchNameValue')(injectFuns) === '' ? undefined : da.getterByField('orderManageSwy.searchNameValue')(injectFuns)
        list.mobile = da.getterByField('orderManageSwy.searchPhoneValue')(injectFuns) === '' ? undefined : da.getterByField('orderManageSwy.searchPhoneValue')(injectFuns)
        list.beginDate = da.getterByField('orderManageSwy.beginDate')(injectFuns) + ' 0:0:0'
        list.endDate = da.getterByField('orderManageSwy.endDate')(injectFuns) + ' 23:59:59'
        list.partner = da.getterByField('orderManageSwy.partnerValue')(injectFuns) === '' ? undefined : da.getterByField('orderManageSwy.partnerValue')(injectFuns)
        list.isPay = da.getterByField('orderManageSwy.orderType')(injectFuns) == 0 ? undefined : da.getterByField('orderManageSwy.orderType')(injectFuns)
        list.vatTaxpayer = da.getterByField('orderManageSwy.vatTaxpayer')(injectFuns)==0 ?null : da.getterByField('orderManageSwy.vatTaxpayer')(injectFuns)

        if(type=='export') {//导出时去查询条件
            return list
        } else {//其他情况掉查询接口

            getOrderManageListSwy(list, type, value)(injectFuns)
        }
    }
}

export function exportExcelOrderManage(type) {
    return injectFuns => {
        let { getterByField, clearMessage, setMessage, handleWebApiException } = da,
            { formPost } = injectFuns,
            params = updateOrderManageItem(null,type)(injectFuns),
            list = {}
        for(let key in params) {
            if(key !='page') {
                if(params[key]!==undefined) {
                    list[key] = params[key]
                    if(params[key]===null) {
                        list[key] = ''
                    }
                } else {
                    list[key] = ''
                }
            }
        }
        webapi.order.exportOrderList(formPost,list)
    }
}

//删除订单 订单管理
export function delItem(rowIndex) {
    return injectFuns => {
        let { getterByField, clearMessage, setMessage, handleWebApiException } = da,
            { post } = injectFuns,
            list = {}
        list.id = da.getterByField('orderManageList.' + rowIndex + '.id')(injectFuns)
        list.ts = da.getterByField('orderManageList.' + rowIndex + '.ts')(injectFuns)
        webapi.order.deleteTest(post, list).then(data => {
            if (!data.result) {
                return da.setMessage({
                    type: 'warning',
                    content: data.value,
                    mode: 'message'
                })(injectFuns)
            }
            if (!handleWebApiException(data)(injectFuns)) return
            da.setMessage({
                type: 'confirm',
                content: '确定要删除该订单吗?',
                onCancel: () => {
                    da.clearMessage()(injectFuns)
                },
                onOk: () => {
                    da.clearMessage()(injectFuns)


                    webapi.order.deleteOrder(post, list).then(data => {
                        if (!data.result) {
                            return da.setMessage({
                                type: 'warning',
                                content: data.value,
                                mode: 'message'
                            })(injectFuns)
                        }
                        if (!handleWebApiException(data)(injectFuns)) return
                        da.setMessage({
                            type: 'success',
                            content: '删除成功',
                            mode: 'message'
                        })(injectFuns)
                        // updateOrderManage()(injectFuns)
                        updateOrderManageItem(undefined, 'del')(injectFuns)
                    })
                }
            })(injectFuns)
        })
    }
}

//删除订单 订单管理   Swybache
export function delItemSwy(rowIndex) {
    return injectFuns => {
        let { getterByField, clearMessage, setMessage, handleWebApiException } = da,
            { post } = injectFuns,
            list = {}
        list.id = da.getterByField('orderManageListSwy.' + rowIndex + '.id')(injectFuns)
        list.ts = da.getterByField('orderManageListSwy.' + rowIndex + '.ts')(injectFuns)
//        webapi.order.deleteTestSwy(post, list).then(data => {
//            if (!data.result) {
//                return da.setMessage({
//                    type: 'warning',
//                    content: data.value,
//                    mode: 'message'
//                })(injectFuns)
//            }
//            if (!handleWebApiException(data)(injectFuns)) return
            da.setMessage({
                type: 'confirm',
                content: '确定要删除该订单吗?',
                onCancel: () => {
                    da.clearMessage()(injectFuns)
                },
                onOk: () => {
                    da.clearMessage()(injectFuns)

                    webapi.order.deleteOrderSwy(post, list).then(data => {
                        if (!data.result) {
                            return da.setMessage({
                                type: 'warning',
                                content: data.value,
                                mode: 'message'
                            })(injectFuns)
                        }
                        if (!handleWebApiException(data)(injectFuns)) return
                        da.setMessage({
                            type: 'success',
                            content: '删除成功',
                            mode: 'message'
                        })(injectFuns)
                        // updateOrderManage()(injectFuns)
                        updateOrderManageItemSwy(undefined, 'del')(injectFuns)
                    })
                }
            })(injectFuns)
//        })
    }
}

//开始时间
export function updateBeginDateValue(value) {
    return injectFuns => {
        injectFuns.reduce('updateSearchOrgValue', 'beginDate', value)
    }
}
//结束时间
export function updateEndDateValue(value) {
    return injectFuns => {
        injectFuns.reduce('updateSearchOrgValue', 'endDate', value)
    }
}
//开始时间   Swy
export function updateBeginDateValueSwy(value) {
    return injectFuns => {
        injectFuns.reduce('updateSearchOrgValueSwy', 'beginDate', value)
    }
}
//结束时间   Swy
export function updateEndDateValueSwy(value) {
    return injectFuns => {
        injectFuns.reduce('updateSearchOrgValueSwy', 'endDate', value)
    }
}
//客户名称
export function updateNameValue(value) {
    return injectFuns => {
        injectFuns.reduce('updateSearchOrgValue', 'name', value)
    }
}
//手机号
export function updatePhoneValue(value) {
    return injectFuns => {
        injectFuns.reduce('updateSearchOrgValue', 'phone', value)
    }
}
//手机号   Swy
export function updatePhoneValueSwy(value) {
    return injectFuns => {
        injectFuns.reduce('updateSearchOrgValueSwy', 'phone', value)
    }
}
//伙伴
export function updatePartnerValue(value) {
    return injectFuns => {
        injectFuns.reduce('updateSearchOrgValue', 'partner', value)
    }
}
export function updateOrderTypeManage(value) {
    return injectFuns => {
        injectFuns.reduce('updateOrderTypeManage', value - 0)
    }
}

export function updateVatTaxpayerManage(value) {
    return injectFuns => {
        injectFuns.reduce('updateVatTaxpayerManage', value - 0)
    }
}
export function updatePayTypeManage(value) {
    return injectFuns => {
        injectFuns.reduce('updatePayTypeManage', value)
    }
}
//搜索
//管理订单 创建订单
export function updateOrderManage() {
    return injectFuns => {
        let list = {},
            orderTypeValue = da.getterByField('myorder.orderTypeManageValue')(injectFuns),
            typeValue = da.getterByField('myorder.typeManageValue')(injectFuns),
            promptValue = da.getterByField('myorder.promptManageValue')(injectFuns)
        if (orderTypeValue == 'new') {
            list.orderType = 0
        } else if (orderTypeValue == 'again') {
            list.orderType = 1
        } else if (orderTypeValue == 'all') {
            list.orderType = undefined
        }
        if (typeValue == 'down') {
            list.payType = 0
        } else if (typeValue == 'wx') {
            list.payType = 1
        } else if (typeValue == 'all') {
            list.payType = undefined
        }
        if (promptValue == 'already') {
            list.payStatus = 1
        } else if (promptValue == 'will') {
            list.payStatus = 0
        } else if (promptValue == 'all') {
            list.payStatus = undefined
        }
        list.orgName = da.getterByField('myorder.searchNameValue')(injectFuns)
        list.mobile = da.getterByField('myorder.searchPhoneValue')(injectFuns)
        getOrderManageList(list)(injectFuns)
    }
}
//我的订单 2017.7.11 ， 新加 按 名字 手机号 开始 结束时间 查询
export function updateMyPhoneValue(value) {
    return injectFuns => {
        injectFuns.reduce('updateMyPhoneValue', value)
    }
}
export function updateMyNameValue(value) {
    return injectFuns => {
        injectFuns.reduce('updateMyNameValue', value)
    }
}
export function myBeginDateChange(value) {
    return injectFuns => {
        injectFuns.reduce('myBeginDateChange', value)
    }
}
export function myEndDateChange(value) {
    return injectFuns => {
        injectFuns.reduce('myEndDateChange', value)
    }
}

export function getOrderList(list, type, value) {
    return injectFuns => {
        if(da.getterByField('appInfo.id')(injectFuns) == 104){
            list.productId = 5
        }
        webapi.order.queryOnlineOrderList(injectFuns.post, list).then(data => {
            if (!da.handleWebApiException(data)(injectFuns)) return
            injectFuns.reduce('updateMyOrder', data.value, type, value)
        })
    }
}

export function getOrderListSwy(list, type, value) {
    return injectFuns => {
        webapi.order.queryOnlineOrderListSwy(injectFuns.post, list).then(data => {
            if (!da.handleWebApiException(data)(injectFuns)) return
            injectFuns.reduce('updateMyOrderSwy', data.value, type, value)
        })
    }
}

export function getOrderManageList(list, type, value) {
    return injectFuns => {
        webapi.order.queryOrderList(injectFuns.post, list).then(data => {
            if (!da.handleWebApiException(data)(injectFuns)) return
            injectFuns.reduce('updateOrderManage', data.value, type, value)
        })
    }
}

export function getOrderManageListSwy(list, type, value) {
    return injectFuns => {
        webapi.order.queryOrderListSwy(injectFuns.post, list).then(data => {
            if (!da.handleWebApiException(data)(injectFuns)) return
            injectFuns.reduce('updateOrderManageSwy', data.value, type, value)
        })
    }
}
export function getCityMap(){
    return injectFuns =>{
        webapi.org.getCityMap(injectFuns.post,{}).then(ajaxData=>{
            if (!da.handleWebApiException(ajaxData)(injectFuns)) return
            injectFuns.reduce('setOrderCity',ajaxData.value.provinceList)
        })
    }
}
export function cityChange(val) {
    return injectFuns =>{
        injectFuns.reduce('cityChange',val)
    }
}
export function openNum(rowIndex) {
    return injectFuns => {

        let list = {}, orderDetail
        list.id = da.getterByField('myorder.orderList.' + rowIndex + '.id')(injectFuns)
        webapi.order.queryOnlineOrderDetail(injectFuns.post, list).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            orderDetail = data.value
            if (data.value.invoice) {

                return webapi.org.getCityMap(injectFuns.post, { code: data.value.invoice.addressCity })
            } else {
                injectFuns.reduce('setMainList', orderDetail, true)
                return
            }
        }).then(data => {
            if (data) {
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                injectFuns.reduce('setMainList', orderDetail, true, data.value)
            }
        })
    }
}
export function openManageNum(rowIndex) {
    return injectFuns => {

        let list = {}
        list.id = da.getterByField('orderManageList.' + rowIndex + '.id')(injectFuns)
        webapi.order.queryOrderDetail(injectFuns.post, list).then(ajaxData => {
            if (!da.handleWebApiInfo(ajaxData)(injectFuns)) return
            injectFuns.reduce('setMainList', ajaxData.value, true)
        })
        // injectFuns.reduce('updateSearchValue',value)
    }
}
export function openInfo(rowIndex) {
    return injectFuns => {

        let list = {}, orderDetail
        list.id = da.getterByField('myorder.orderList.' + rowIndex + '.id')(injectFuns)
        webapi.order.queryOnlineOrderDetail(injectFuns.post, list).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            orderDetail = data.value
            if (data.value.invoice) {
                return webapi.org.getCityMap(injectFuns.post, { code: data.value.invoice.addressCity })
            } else {
                injectFuns.reduce('setMainList', orderDetail, true)
                return
            }
        }).then(data => {
            if (data) {
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                injectFuns.reduce('setMainList', orderDetail, true, data.value)
            }
        })
    }
}
export function openInfoSwy(rowIndex) {
    return injectFuns => {

        let list = {}, orderDetail
        list.id = da.getterByField('myorderSwy.orderListSwy.' + rowIndex + '.id')(injectFuns)
        webapi.order.queryOnlineOrderDetailSwy(injectFuns.post, list).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            orderDetail = data.value
            if (data.value.invoice) {
                return webapi.org.getCityMap(injectFuns.post, { code: data.value.invoice.addressCity })
            } else {
                injectFuns.reduce('setMainListSwy', orderDetail, true)
                return
            }
        }).then(data => {
            if (data) {
                if (!da.handleWebApiInfo(data)(injectFuns)) return
                injectFuns.reduce('setMainListSwy', orderDetail, true, data.value)
            }
        })
    }
}
//我的订单  删除订单
export function delOrderItem(rowIndex) {
    return injectFuns => {
        let list = {}
        list.id = da.getterByField('myorder.orderList.' + rowIndex + '.id')(injectFuns)
        list.ts = da.getterByField('myorder.orderList.' + rowIndex + '.ts')(injectFuns)
        // list.payStatus = 2

        webapi.order.deleteOnlineOrder(injectFuns.post, list).then(data => {
            if (!data.result) {
                return da.setMessage({
                    type: 'warning',
                    content: data.value,
                    mode: 'message'
                })(injectFuns)
            }
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            let list2 = {},
                typeValue = da.getterByField('myorder.typeValue')(injectFuns),
                promptValue = da.getterByField('myorder.promptValue')(injectFuns)

            if (typeValue == 'zfb') {
                list2.payType = 3
            } else if (typeValue == 'wx') {
                list2.payType = 2
            } else if (typeValue == 'all') {
                list2.payType = undefined
            }
            if (promptValue == 'already') {
                list2.orderStatus = 4
            } else if (promptValue == 'will') {
                list2.orderStatus = 1
            } else if (promptValue == 'all') {
                list2.orderStatus = undefined
            } else if (promptValue == 'cancel') {
                list2.orderStatus = 5
            }
            list2.page = {
                currentPage: 1,
                pageSize: 100
            }
            da.setMessage({
                type: 'success',
                content: '删除成功',
                mode: 'message'
            })(injectFuns)
            getOrderList(list2)(injectFuns)
        })
    }
}
//我的订单  删除订单    Swy
export function delOrderItemSwy(rowIndex) {
    return injectFuns => {
        let list = {}
        list.id = da.getterByField('myorderSwy.orderListSwy.' + rowIndex + '.id')(injectFuns)
        list.ts = da.getterByField('myorderSwy.orderListSwy.' + rowIndex + '.ts')(injectFuns)
        // list.payStatus = 2

        webapi.order.deleteOnlineOrderSwy(injectFuns.post, list).then(data => {
            if (!data.result) {
                return da.setMessage({
                    type: 'warning',
                    content: data.value,
                    mode: 'message'
                })(injectFuns)
            }
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            let list2 = {},
                typeValue = da.getterByField('myorderSwy.typeValue')(injectFuns),
                promptValue = da.getterByField('myorderSwy.promptValue')(injectFuns)

            if (typeValue == 'zfb') {
                list2.payType = 3
            } else if (typeValue == 'wx') {
                list2.payType = 2
            } else if (typeValue == 'all') {
                list2.payType = undefined
            }
            if (promptValue == 'already') {
                list2.orderStatus = 4
            } else if (promptValue == 'will') {
                list2.orderStatus = 1
            } else if (promptValue == 'all') {
                list2.orderStatus = undefined
            } else if (promptValue == 'cancel') {
                list2.orderStatus = 5
            }
            list2.page = {
                currentPage: 1,
                pageSize: 100
            }
            da.setMessage({
                type: 'success',
                content: '删除成功',
                mode: 'message'
            })(injectFuns)
            getOrderListSwy(list2)(injectFuns)
        })
    }
}
//我的订单  取消订单
export function cancelItem(rowIndex) {
    return injectFuns => {

        let list = {}
        list.id = da.getterByField('myorder.orderList.' + rowIndex + '.id')(injectFuns)
        list.ts = da.getterByField('myorder.orderList.' + rowIndex + '.ts')(injectFuns)
        list.payStatus = 2

        da.setMessage({
            type: 'confirm',
            title: '提示',
            content: '是否确定取消订单？',
            onCancel: () => {
                da.clearMessage()(injectFuns)
            },
            onOk: () => {
                da.clearMessage()(injectFuns)
                webapi.order.cancelOnlineOrder(injectFuns.post, list).then(data => {
                    if (!data.result) {
                        return da.setMessage({
                            type: 'warning',
                            content: data.value,
                            mode: 'message'
                        })(injectFuns)
                    }
                    if (!da.handleWebApiInfo(data)(injectFuns)) return
                    let list2 = {},
                        typeValue = da.getterByField('myorder.typeValue')(injectFuns),
                        promptValue = da.getterByField('myorder.promptValue')(injectFuns)
                    if (typeValue == 'zfb') {
                        list2.payType = 3
                    } else if (typeValue == 'wx') {
                        list2.payType = 2
                    } else if (typeValue == 'all') {
                        list2.payType = undefined
                    }
                    if (promptValue == 'already') {
                        list2.orderStatus = 4
                    } else if (promptValue == 'will') {
                        list2.orderStatus = 1
                    } else if (promptValue == 'all') {
                        list2.orderStatus = undefined
                    } else if (promptValue == 'cancel') {
                        list2.orderStatus = 5
                    }
                    list2.page = {
                        currentPage: 1,
                        pageSize: 100
                    }
                    da.setMessage({
                        type: 'success',
                        content: '取消订单成功',
                        mode: 'message'
                    })(injectFuns)
                    getOrderList(list2)(injectFuns)
                })
            }
        })(injectFuns)

    }
}
//我的订单  取消订单   Swy
export function cancelItemSwy(rowIndex) {
    return injectFuns => {

        let list = {}
        list.id = da.getterByField('myorderSwy.orderListSwy.' + rowIndex + '.id')(injectFuns)
        list.ts = da.getterByField('myorderSwy.orderListSwy.' + rowIndex + '.ts')(injectFuns)
//        list.payStatus = 2

        da.setMessage({
            type: 'confirm',
            title: '提示',
            content: '是否确定取消订单？',
            onCancel: () => {
                da.clearMessage()(injectFuns)
            },
            onOk: () => {
                da.clearMessage()(injectFuns)
                webapi.order.cancelOnlineOrderSwy(injectFuns.post, list).then(data => {
                    if (!data.result) {
                        return da.setMessage({
                            type: 'warning',
                            content: data.value,
                            mode: 'message'
                        })(injectFuns)
                    }
                    if (!da.handleWebApiInfo(data)(injectFuns)) return
                    let list2 = {},
                        typeValue = da.getterByField('myorder.typeValue')(injectFuns),
                        promptValue = da.getterByField('myorder.promptValue')(injectFuns)
                    if (typeValue == 'zfb') {
                        list2.payType = 3
                    } else if (typeValue == 'wx') {
                        list2.payType = 2
                    } else if (typeValue == 'all') {
                        list2.payType = undefined
                    }
                    if (promptValue == 'already') {
                        list2.orderStatus = 4
                    } else if (promptValue == 'will') {
                        list2.orderStatus = 1
                    } else if (promptValue == 'all') {
                        list2.orderStatus = undefined
                    } else if (promptValue == 'cancel') {
                        list2.orderStatus = 5
                    }
                    list2.page = {
                        currentPage: 1,
                        pageSize: 100
                    }
                    da.setMessage({
                        type: 'success',
                        content: '取消订单成功',
                        mode: 'message'
                    })(injectFuns)
                    getOrderListSwy(list2)(injectFuns)
                })
            }
        })(injectFuns)

    }
}

export function payItem(rowIndex) {
    return injectFuns => {

        // injectFuns.reduce('updateSearchValue',value)
    }
}
export function againItem(rowIndex) {
    return injectFuns => {

    }
}

export function queryOnlineOrderDetail(rowIndex, orderId, cb,onRedirect,thisProps) {
    return injectFuns => {
        if (orderId) {
            var newWindow = window.open('',"_blank")
            newWindow.document.innerHTML = '正在加载中请稍后。。。'
            // newWindow.document.write('正在加载中请稍后。。。')
            webapi.order.queryOnlineOrderDetail(injectFuns.post, { 'id': orderId }).then(data2 => {
                if (!da.handleWebApiInfo(data2)(injectFuns)) {
                    newWindow.close()
                    return
                }
                if (data2.result) {
                    if (data2.value && data2.value.payStatus == 2) {
                        da.setMessage({
                            type: 'warning',
                            content: '此订单已支付!',
                            mode: 'message'
                        })(injectFuns)
                        newWindow.close()

                        /*
                        window.setTimeout(function () {
                            onRedirect('apps/login/admin?activeKey=12', true)
                        }, 3000)
                        da.clearMessage()(injectFuns)
                        */
                        window.setTimeout(function () {
                            let host = window.location.host
                            // let orderUrl = location.protocol + '//' + host + '/#apps/login/admin?activeKey=12'
                            // window.location.href = orderUrl
                            initMyOrder()(injectFuns)

                        }, 3000)
                        return
                    }
                }

                if (cb) {
                    // cb()

                    let id = da.getterByField('myorder.orderList')(injectFuns).toJS()[rowIndex].id,
                        tipsTxt = '请您在新打开的页面上完成付款',
                        details = '付款完成前请不要关闭此窗口',
                        tipsDetails = '付款完成后请点击【确定】刷新页面'

                    da.setMessage({
                        type: 'warning',
                        content: <div><div style={{ paddingLeft: '0', textIndent: '0px', lineHeight: '18px', color: '#454545' }}><span style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: '-6px' }}>{tipsTxt}</span></div><br /><span style={{ color: '#666666', fontSize: '12px', paddingLeft: '0px', lineHeight: '20px', letterSpacing: 0, marginLeft: '-6px' }}>{details}</span><br /><span style={{ color: '#666666', lineHeight: '20px', letterSpacing: 0, fontSize: '12px', paddingLeft: '0px', marginLeft: '-6px' }}>{tipsDetails}</span></div>,
                        width: 410,
                        hideFooter: true,
                        refName: 'alreadyWarnOver',
                        wrapClassName: 'alreadyWarnOver',
                        highZIndex: true,
                        okText: '确定',
                        footer: [
                            <Button key="submit" type="primary">确定</Button>
                        ],
                        onOk: () => {
                            da.clearMessage()(injectFuns)
                            window.location.reload()
                            //this.props.onRedirect('apps/login/admin?activeKey=12', true)
                        }
                    })(injectFuns)
                    let url = window.location.protocol + '//' + window.location.host + '/#apps/login/order?step=2&id=' + id
                    payItem(rowIndex)
                    newWindow.location.href = url
                }
            })
        }
    }
}

export function queryOnlineOrderDetailSwy(rowIndex, orderId, cb,onRedirect,thisProps) {
    return injectFuns => {
        if (orderId) {
            var newWindow = window.open('',"_blank")
            newWindow.document.innerHTML = '正在加载中请稍后。。。'
            webapi.order.queryOnlineOrderDetailSwy(injectFuns.post, { 'id': orderId }).then(data2 => {
                if (!da.handleWebApiInfo(data2)(injectFuns)) {
                    newWindow.close()
                    return
                }
                if (data2.result) {
                    if (data2.value && data2.value.payStatus == 2) {
                        da.setMessage({
                            type: 'warning',
                            content: '此订单已支付!',
                            mode: 'message'
                        })(injectFuns)
                        newWindow.close()

                        window.setTimeout(function () {
                            let host = window.location.host
                            let orderUrl = location.protocol + '//' + host + '/#apps/login/admin?activeKey=1202'
                            window.location.href = orderUrl
                        }, 3000)
                        return
                    }
                }

                if (cb) {
                    // cb()

                    let id = da.getterByField('myorderSwy.orderListSwy')(injectFuns).toJS()[rowIndex].id,
                        tipsTxt = '请您在新打开的页面上完成付款',
                        details = '付款完成前请不要关闭此窗口',
                        tipsDetails = '付款完成后请点击【确定】刷新页面'

                    da.setMessage({
                        type: 'warning',
                        content: <div><div style={{ paddingLeft: '0', textIndent: '0px', lineHeight: '18px', color: '#454545' }}><span style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: '-6px' }}>{tipsTxt}</span></div><br /><span style={{ color: '#666666', fontSize: '12px', paddingLeft: '0px', lineHeight: '20px', letterSpacing: 0, marginLeft: '-6px' }}>{details}</span><br /><span style={{ color: '#666666', lineHeight: '20px', letterSpacing: 0, fontSize: '12px', paddingLeft: '0px', marginLeft: '-6px' }}>{tipsDetails}</span></div>,
                        width: 410,
                        hideFooter: true,
                        refName: 'alreadyWarnOver',
                        wrapClassName: 'alreadyWarnOver',
                        highZIndex: true,
                        okText: '确定',
                        footer: [
                            <Button key="submit" type="primary">确定</Button>
                        ],
                        onOk: () => {
                            da.clearMessage()(injectFuns)
                            window.location.reload()
                            //this.props.onRedirect('apps/login/admin?activeKey=12', true)
                        }
                    })(injectFuns)
                    let url = window.location.protocol + '//' + window.location.host + '/#apps/login/orderSwy?step=2&id=' + id
                    payItem(rowIndex)
                    newWindow.location.href = url
                }
            })
        }
    }
}

/*业务模版管理*/
export function importTemplate(initData, type, _this) {
	return injectFuns => {
		let prames = {}, {post}=injectFuns

		if(type == '2'){
			prames.metaDataFileName = initData.interface[0].newName
			prames.docTemplateFileName = initData.voucher[0].newName
		}else {
			prames.fileName = initData[0].newName
		}

		da.showLoadingMask({content:'正在导入...'})(injectFuns)
		importTemplat(post, prames, type).then(ajaxData => {
			if (!da.handleWebApiException(ajaxData)(injectFuns)) {
				da.hideLoadingMask()(injectFuns)
				return
			}

			if(ajaxData.result){
				da.hideLoadingMask()(injectFuns)

				da.setMessage({
					type: 'success',
					mode: 'message',
					content: '导入成功！'
				})(injectFuns)

				let obj = {}
				if(type == '2'){
					obj = {interfaceName: '', voucherName: ''}
					obj['initData'+type] = {}
				}else {
					obj = {oldName: ''}
					obj['initData'+type] = ''
				}
				_this.setState(obj)
			}
		})
	}
}

//模版导入
function importTemplat(post, data, type) {
	switch(type){
		case '2':
			return post('/v1/businessTypeTemplate/import', data)
			break
		case '3':
			//debugger
			return post('/v1/businessTypeDocRange/import', data)
			break
		case '4':
			//debugger
			return post('/v1/businessTypeTax/import', data)
			break
		case '5':
			//debugger
			return post('/v1/businessTypeInventoryProperty/import', data)
			break
		case '6':
			//debugger
			return post('/v1/taxClassificationCode/import', data)
			break
		case '7':
			//debugger
			return post('/v1/HelpTips/import', data)
            break
        case '11':
            return post('/v1/businessScan/import', data)
            break
        
	}
}

//邀请码管理
export function invitationCodeAdministrationInitView(maxHeight,maxWidth) {
    return injectFuns => {
        let invitationCodeAdministrationFrom = da.getterByField('invitationCodeAdministration.from')(injectFuns).toJS(),
            appInfo = da.getterByField('appInfo')(injectFuns)
        invitationCodeAdministrationFrom.currentPage = invitationCodeAdministrationFrom.page.currentPage
        invitationCodeAdministrationFrom.pageSize = invitationCodeAdministrationFrom.page.pageSize
        delete invitationCodeAdministrationFrom.page
        if (invitationCodeAdministrationFrom.status) {
            invitationCodeAdministrationFrom.status = invitationCodeAdministrationFrom.status.id
            if(invitationCodeAdministrationFrom.status=='2'||invitationCodeAdministrationFrom.status===null) {
                delete invitationCodeAdministrationFrom.status
            }
        }
        webapi.operate.queryRegCodeList(injectFuns.post, invitationCodeAdministrationFrom).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return

            injectFuns.reduce('setInvitationCodeAdministrationData', data.value, maxHeight,maxWidth)
        })
    }
}
export function invitationCodeAdministrationExportClick() {
    return injectFuns => {
        let invitationCodeAdministrationFrom = da.getterByField('invitationCodeAdministration.from')(injectFuns).toJS(),
            appInfo = da.getterByField('appInfo')(injectFuns)
        delete invitationCodeAdministrationFrom.page
        if (invitationCodeAdministrationFrom.status) {
            invitationCodeAdministrationFrom.status = invitationCodeAdministrationFrom.status.id
            if(invitationCodeAdministrationFrom.status=='2'||invitationCodeAdministrationFrom.status===null) {
                invitationCodeAdministrationFrom.status = null
            }
        }
        webapi.operate.exportData(injectFuns.formPost, invitationCodeAdministrationFrom)
    }
}
export function invitationCodeAdministrationPageChange(current) {
    return injectFuns => {
        injectFuns.reduce('setInvitationCodeAdministrationCurrent', current)
        invitationCodeAdministrationInitView(da.getterByField('invitationCodeAdministration.maxHeight')(injectFuns))(injectFuns)
    }
}
export function invitationCodeAdministrationPageSizeChange(pageSize) {
    return injectFuns => {
        injectFuns.reduce('setInvitationCodeAdministrationPageSize', pageSize)
        invitationCodeAdministrationInitView(da.getterByField('invitationCodeAdministration.maxHeight')(injectFuns))(injectFuns)
    }
}

export function batchCreateReqCode(num) {
    return injectFuns => {
        let list = {}
        if(num) {
            list.maxNum = num
        }
        webapi.operate.makeReqCodes(injectFuns.post, list).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            da.setMessage({
                type: 'success',
                mode: 'message',
                content: '邀请码批量生成成功！'
            })(injectFuns)
            invitationCodeAdministrationInitView(da.getterByField('invitationCodeAdministration.maxHeight')(injectFuns))(injectFuns)
        })
    }
}

export function backDzInfo(isOrganizationalList) {
    return injectFuns => {
        injectFuns.reduce('backDzInfo',isOrganizationalList)
    }
}
export function getList(type,id,page) {
    return injectFuns => {
        let list = {},
            organizetionalListInfo = da.getterByField('organizetionalListInfo')(injectFuns).toJS(),
            vatTaxpayer = type!==undefined?type:organizetionalListInfo.vatTaxpayer
        list.dzOrgId = id?id:organizetionalListInfo.dzOrgId
        list.vatTaxpayer = vatTaxpayer?vatTaxpayer:null
        list.page = page?{
            currentPage: page.currentPage,
            pageSize: page.pageSize
        }:{
            currentPage: organizetionalListInfo.page.current,
            pageSize: organizetionalListInfo.page.pageSize
        }

        return list
    }
}



//新邀请码管理
export function inviteCodeAdministrationInitView(maxHeight,maxWidth,curId,auth) {
    return injectFuns => {
        let params = getInviteCodeQueryParams(true)(injectFuns),
            transTree,
            curItem

        let inviteCodeAdministrationFrom = da.getterByField('inviteCode.from')(injectFuns).toJS(),
            appInfo = da.getterByField('appInfo')(injectFuns)
        inviteCodeAdministrationFrom.currentPage = inviteCodeAdministrationFrom.page.currentPage
        inviteCodeAdministrationFrom.pageSize = inviteCodeAdministrationFrom.page.pageSize
        delete inviteCodeAdministrationFrom.page
        if (inviteCodeAdministrationFrom.status) {
            inviteCodeAdministrationFrom.status = inviteCodeAdministrationFrom.status.id
            if(inviteCodeAdministrationFrom.status=='2'||inviteCodeAdministrationFrom.status===null) {
                delete inviteCodeAdministrationFrom.status
            }
        }

        webapi.web.queryAll(injectFuns.post, {}).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            transTree = transDept(data.value)(injectFuns)
            if(!curId) {
                curId = transTree[0].id
                curItem = transTree[0]
            } else {
                data.value.map(o => {
                    if(o.id == curId) {
                        curItem = o
                    }
                })
            }
            params.appId = curId
            return webapi.web.queryRegCodeList(injectFuns.post, params)
        }).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            injectFuns.reduce('setinviteCodeAdministrationData', data.value, maxHeight,maxWidth,transTree,curItem,auth)

        })
    }
}
export function inviteCodeAdministrationExportClick() {
    return injectFuns => {
        let inviteCodeAdministrationFrom = da.getterByField('inviteCodeAdministration.from')(injectFuns).toJS(),
            appInfo = da.getterByField('appInfo')(injectFuns)
        delete inviteCodeAdministrationFrom.page
        if (inviteCodeAdministrationFrom.status) {
            inviteCodeAdministrationFrom.status = inviteCodeAdministrationFrom.status.id
            if(inviteCodeAdministrationFrom.status=='2'||inviteCodeAdministrationFrom.status===null) {
                inviteCodeAdministrationFrom.status = null
            }
        }
        webapi.operate.exportData(injectFuns.formPost, inviteCodeAdministrationFrom)
    }
}
export function inviteCodeAdministrationPageChange(current) {
    return injectFuns => {
        injectFuns.reduce('setinviteCodeAdministrationCurrent', current)
        inviteCodeAdministrationInitView(
            da.getterByField('inviteCode.maxHeight')(injectFuns) ,
            da.getterByField('inviteCode.maxWidth')(injectFuns) ,
            da.getterByField('curId')(injectFuns)
        )(injectFuns)
    }
}
export function inviteCodeAdministrationPageSizeChange(pageSize) {
    return injectFuns => {
        injectFuns.reduce('setinviteCodeAdministrationPageSize', pageSize)
        inviteCodeAdministrationInitView(
            da.getterByField('inviteCode.maxHeight')(injectFuns) ,
            da.getterByField('inviteCode.maxWidth')(injectFuns) ,
            da.getterByField('curId')(injectFuns)
        )(injectFuns)
    }
}

export function updatePasswordOk() {
    return injectFuns =>{
        let { validate, getterByField,setValidate,setMessage } = da,
            { post, reduce } = injectFuns

        reduce('onFieldFocus', '') //清空焦点

        if (!validate('admin.updatePassword.formItems')(injectFuns)) {
            // cb({result: false})
            return
        }

        // let oldPassword = md5(getterByField('form.oldPassword')(injectFuns)+"yiJia9*"),
        let newPassword = md5(getterByField('updatePasswordForm.form.newPassword')(injectFuns)+"yiJia9*"),
            oldPassword = md5(getterByField('updatePasswordForm.form.oldPassword')(injectFuns)+"yiJia9*"),
            againNewPassword = md5(getterByField('updatePasswordForm.form.againNewPassword')(injectFuns)+"yiJia9*"),
            pwdStrength = getterByField('updatePasswordForm.level')(injectFuns),
            isShow1 = getterByField('updatePasswordForm.isShow1')(injectFuns),
            judgeBlank = getterByField('updatePasswordForm.judgeBlank')(injectFuns)
        if(newPassword !== againNewPassword){
        	setValidate('admin.updatePassword.formItems.againNewPassword', '两次输密码不一致！')(injectFuns)
            return
        }else if(!judgeBlank){
            setValidate('admin.updatePassword.formItems.newPassWord', '密码不能含有空格等非法字符！')(injectFuns)
        }else{
            injectFuns.reduce('updateSuccess')

            // setMessage({
            //     type:'success',
            //     mode: 'message',
            //     content:'恭喜你：修改密码成功！'
            // })(injectFuns)
            post('/v1/user/updatePassword',{'password':oldPassword,'npassword':newPassword,'passwordStrength':pwdStrength}).then(data => {

        		if(!data.result){
                    //return setValidate('admin.updatePassword.formItems.oldPassword', data.error.message)(injectFuns)
                    return setMessage({
                        type:'warning',
                        mode: 'message',
                        content: data.error.message
                    })(injectFuns)
                }else{
                    setMessage({
    					type:'success',
    					mode: 'message',
    					content:'恭喜你：修改密码成功！'
                    })(injectFuns)
                    injectFuns.reduce('setIsShowUpdatePassword',1)
                }
        	})
        }
    }
}

function transDept(treeList) {
    return (injectFuns) => {
        let transTreeList = getTransTreeList(treeList)(injectFuns)
        return transTreeList

    }
}
function getTransTreeList(treeList) {
    return (injectFuns) => {
        let transTreeList = []
        treeList.map(o => {
            if(o.parentId==undefined) {
                transTreeList.push(o)
            } else {
                transTreeList.map(item => {
                    if(item.id == o.parentId) {
                        if(item.subDepts) {
                            item.subDepts.push(o)
                        } else {
                            item.subDepts = [o]
                        }
                    }
                })
            }
        })
        return transTreeList
    }
}

export function onEvent(eventName, option) {
    return (injectFuns) => {
        //重写dynamicAction的事件后,需要再手工执行一下父类事件

        let {reduce} = injectFuns
        //选择了某个部门,加载该部门人员
        if (eventName === 'onTreeSelect' && option.path) {
            if(option.selectedKeys.length===0) {
                return
            }
            da.onEvent(eventName, option)(injectFuns)
            changeCurrentdept(option.selectedKeys[0])(injectFuns)

        } else if(eventName === 'onLinkClick') {
            da.onEvent(eventName, option)(injectFuns)

            if(option.path.indexOf('admin.invitateCodeGrid.operate')!=-1) {
                let list = da.getterByField('inviteCode.ajaxData')(injectFuns).toJS(),
                    rowIndex = option.path.split(',')[1],
                    curItem = list[rowIndex]
                // console.log(curItem)

                webapi.web.regCodeQueryById(injectFuns.post, {id: curItem.id}).then(data => {
                    if (!da.handleWebApiInfo(data)(injectFuns)) return

                    da.setMessage({
                        type: 'app',
                       title: '编辑优惠金额',
                       content: 'app:apps/login/admin/setDiscountAmount',
                       wrapClassName:'setDiscountAmountWrap',
                       width: 410,
                       initData: {isLeft: false,discountPrice: data.value.discountPrice,id: curItem.id},
                       refName: 'setDiscountAmount',
                       onCancel: ()=> {
                           da.clearMessage()(injectFuns)
                       },
                       onOk: (cb)=> {
                           da.clearMessage()(injectFuns)
                           updateRightListItem(cb.params)(injectFuns)


                       }
                    })(injectFuns)
                })
            }
        }else if(eventName == 'onGridFilterChange' && option.path == 'admin.invitateCodeGrid.industryName'){
            let industry=option.value
            if(industry=='-1'){
               industry=''
            }
            queryInviteCodeList(undefined,undefined,undefined,undefined,industry)(injectFuns)
            injectFuns.reduce('setSelect',industry)
        }else if(eventName == 'onGridFilterChange' && option.path == 'admin.invitateCodeGrid.statusStr'){
            let statusStr=option.value
            if(statusStr=='-1'){
               statusStr=''
            }
            queryInviteCodeList(undefined,undefined,undefined,undefined,undefined,statusStr)(injectFuns)
            injectFuns.reduce('setSelect',undefined,statusStr)
        }
        //  else if(eventName === 'onGridSelectAll') {
        //     da.onEvent(eventName, option)(injectFuns)
        //     if(option.path=='admin.invitateCodeGrid.select') {
        //         injectFuns.reduce('cancelSelectDisabled')
        //     }
        // }
        else {
            da.onEvent(eventName, option)(injectFuns)

        }
    }
}

export function getter(path, propertys) {
    return injectFuns => {

        let ret = da.getter(path, propertys)(injectFuns)
        if (da.match(path, propertys, 'admin.invitateCodeGrid.select', ['isSelectAll'])) {
            let parsedPath = da.parsePath(path),
                existSelectedRow = da.getterByField('inviteCode.ajaxData')(injectFuns).findIndex(o => o.get('select') === true && (o.get('status') !== 1&&o.get('status') !== 2)) != -1,
                existNotSelectedRow = da.getterByField('inviteCode.ajaxData')(injectFuns).findIndex(o => o.get('select') !== true && (o.get('status') !== 1&&o.get('status') !== 2)) != -1,
                isSelectAll = false

            return setValue(ret, propertys, { 'isSelectAll': (existSelectedRow && !existNotSelectedRow) })
        }

        if (da.match(path, propertys, 'admin.invitateCodeGrid.select', ['visible'])) {
            let parsedPath = da.parsePath(path),
                status = da.getterByField(`inviteCode.ajaxData.${parsedPath.vars[0]}.status`)(injectFuns)

            ret = (status === 1||status === 2) ? setValue(ret, propertys, {
                visible: false
            }) : setValue(ret, propertys, {
                visible: true
            })

            return ret

        }
        else {
            return ret
        }
    }
}

function setValue(ret, propertys, wrappers) {
    if (typeof (propertys) == 'string') {
        return wrappers.hasOwnProperty(propertys) ? wrappers[propertys] : ret
    }

    propertys.forEach(p => {
        if (wrappers.hasOwnProperty(p))
            ret = ret.set(p, wrappers[p])
    })

    return ret
}

export function changeCurrentdept(deptId) {
    return (injectFuns) => {
        //保存了当前点击的部门ID
        let leftTree= da.getterByField('leftTree')(injectFuns).toJS(),
            curLevel,
            curId,
            parentId
        injectFuns.reduce('saveCurrentDept', deptId)
        leftTree.map(item => {
            if(item.id==deptId) {
                curLevel = 1
                curId = item.id
                parentId = item.parentId

            }
            if(item.subDepts) {
                item.subDepts.map(subItem => {
                    if(subItem.id == deptId) {
                        curLevel = 2
                        curId = subItem.id
                        parentId = subItem.parentId
                    }
                })
            }
        })
        updateInviteCode(curLevel, curId, parentId)(injectFuns)
    }
}

function updateInviteCode(curLevel, curId, parentId) {
    return (injectFuns) => {
        // injectFuns.reduce('updateInviteCode', curLevel, curId, parentId)
        queryInviteCodeList(curId, curLevel, parentId, 1)(injectFuns)
    }
}

 //按页加载人员
 function refreshPersonByPage(personType, current, option,isCurrentSelected) {
    return (injectFuns) => {
        let pageSize = da.getterByField('personPagination.pageSize')(injectFuns),
            {getterByField} = da
            current = current || da.getterByField('personPagination.current')(injectFuns)
        if (!current || !pageSize) {
            return
        }
        let { post, getContext, reduce } = injectFuns,
            { setMessage } = da,
            deptId = ''

        //处理默认参数
        if (current < 1) {
            current = 1
        }
        // if(getContext().creator == getContext().currentUser.id){
        //     injectFuns.reduce('setIsCreator',true)
        // }else{
        //     injectFuns.reduce('setIsCreator',false)
        // }
        //翻页时,使用现有的人员类型
        if (!personType) {
            let currentDeptId = da.getterByField('currentDeptId')(injectFuns)
            if (!currentDeptId || currentDeptId == api.ORG_ROOT_ID) {
                personType = PersonType.ORG
            }
            else if (currentDeptId == api.CUSTOMER_ROOT_ID) {
                personType = PersonType.CUSTOMER
            }
            else {
                personType = PersonType.DEPT
                deptId = currentDeptId
            }
        }
        else if (personType == PersonType.DEPT) {
            if (!option || !option.deptId) {
                return
            }
            deptId = option.deptId
        }

        let offset = current
        let roleFilter = da.getterByField('roleFilter')(injectFuns) || DEFAULT_ROLE_FILTER
        if (personType == PersonType.ORG) {//当根据企业ID加载人员
            let orgId = getContext().currentOrg.id
            webapi.person.queryByOrg(post, orgId, pageSize, offset, roleFilter).then(data=> {
                refreshPersonListFromServer(data,isCurrentSelected)(injectFuns)
            }).catch((err) => {
                setMessage({type: 'error', mode: 'message', content: '获取企业人员列表失败！'})(injectFuns)
            })
        }
        else if (personType == PersonType.CUSTOMER) {
            let orgId = getContext().currentOrg.id
            webapi.person.queryCustomerPerson(post, orgId, pageSize, offset, roleFilter).then(data=> {
                refreshPersonListFromServer(data)(injectFuns)
            }).catch((err) => {
                setMessage({type: 'error', mode: 'message', content: '获取客户人员列表失败！'})(injectFuns)
            })
        }
        else if (personType == PersonType.DEPT) {//当点击了某一个部门的时候
            let depts = getterByField('depts')(injectFuns).toJS(),
                isStopSending = true,
                originalDepts = getterByField('originalDepts')(injectFuns)
            originalDepts.map((element,index)=>{
                if(element.id == deptId){
                    return isStopSending = false
                }
            })
            if(!isStopSending){
                webapi.person.queryByDept(post, deptId, pageSize, offset, roleFilter).then(data=> {
                    refreshPersonListFromServer(data)(injectFuns)
                }).catch((err) => {
                    setMessage({type: 'error', mode: 'message', content: '获取部门人员列表失败！'})(injectFuns)
                })
            }
        }

        if (current !== da.getterByField('personPagination.current')(injectFuns)) {
            reduce('setPaginationCurrentPage', current)
        }
    }
}

export function delSubPartner(curId) {
    return injectFuns => {
        webapi.web.deleteAppSon(injectFuns.post, {id:curId}).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            inviteCodeAdministrationInitView(
                da.getterByField('inviteCode.maxHeight')(injectFuns) ,
                da.getterByField('inviteCode.maxWidth')(injectFuns))(injectFuns)
            da.setMessage({
                type: 'success',
                content: '删除成功',
                mode: 'message'
            })(injectFuns)
        })
    }
}

export function queryInviteCodeList(curId, curLevel, parentId,currentPage,industry,statusStr) {
    return injectFuns => {
        let params = getInviteCodeQueryParams(true)(injectFuns)
        if(curId) {
            params.appId = curId
        } else {
            params.appId = da.getterByField('curId')(injectFuns)
        }
        params.mobile = da.getterByField('inviteCode.from.mobile')(injectFuns)
        if(currentPage) {
            params.currentPage = currentPage
        }
        params.status=statusStr
        params.industry=industry
        webapi.web.queryRegCodeList(injectFuns.post, params).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            injectFuns.reduce('setInviteCodeList',data.value, da.getterByField('inviteCode.from')(injectFuns).toJS(), curId, curLevel, parentId,params)
        })

    }
}

export function exportInviteCode() {
    return injectFuns => {
        let params = getInviteCodeQueryParams(false)(injectFuns),
            params1 = da.getterByField('params')(injectFuns)
        params.status=params1&&params1.status?params1.status:''
        params.industry=params1&&params1.industry?params1.industry:''
        params.appId = da.getterByField('curId')(injectFuns)

        webapi.web.regCodeExportData(injectFuns.formPost, params)

    }
}

export function getInviteCodeQueryParams(havePage) {
    return injectFuns => {
        let form = da.getterByField('inviteCode.from')(injectFuns).toJS(),
            status = (!form.status||(form.status.id==-1))?null:(form.status.id-0),
            params = {
                beginTime: form.beginTime,
                endTime: form.endTime,
                orgName: (form.orgName===undefined||form.orgName==='')?null:form.orgName,
                'status': status
            }

        if(havePage) {
            params.pageSize=form.page.pageSize
            params.currentPage=form.page.currentPage
        }
        return params
    }
}
//批量删除客户记账套
export function delInviteItems(params) {
    return injectFuns => {
        // let list = da.getterByField('inviteCode.ajaxData')(injectFuns).toJS(),
        //     params = []
        // list.map(o=>{
        //     if(o.select) {
        //         params.push({
        //             id: o.id
        //         })
        //     }
        // })
        // if(params.length==0) {
        //     return da.setMessage({
        //         type: 'warning',
        //         content: '请选中要删除的信息',
        //         mode: 'message'
        //     })(injectFuns)
        // }
        webapi.web.regCodeDelete(injectFuns.post, params).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            queryInviteCodeList()(injectFuns)
            return da.setMessage({
                type: 'success',
                content: '删除成功',
                mode: 'message'
            })(injectFuns)
        })
    }
}

export function sendInviteCodes() {
    return injectFuns => {
        let list = da.getterByField('inviteCode.ajaxData')(injectFuns).toJS(),
            params = []
        list.map(o=>{
            if(o.select) {
                params.push({
                    id: o.id
                })
            }
        })
        if(params.length==0) {
            return da.setMessage({
                type: 'warning',
                content: '请选中要发送的信息',
                mode: 'message'
            })(injectFuns)
        }
        webapi.web.sendSMSList(injectFuns.post, params).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            return da.setMessage({
                type: 'success',
                content: '发送成功',
                mode: 'message'
            })(injectFuns)
        })
    }
}

//导出模板
export function exportInviteCodeTemplate() {
    return injectFuns => {
        webapi.web.regCodeExportTemplate(injectFuns.formPost, {})

    }
}

export function importImportInviceCode(data) {
    return injectFuns => {
        let {initView, handleWebApiInfo, setMessage,clearMessage,getterByField} = da,
            {reduce, post, getContext, setContext} = injectFuns

        // if(data.result==true&&data.value==null) {
        //     injectFuns.reduce('importReturnList',data.value)
        // }
        // if (!handleWebApiInfo(data)(injectFuns)) return
        // injectFuns.reduce('importReturnList',data.value)
        // setMessage ({
        //     type: 'success',
        //     content: '导入成功',
        //     mode: 'message'
        // })(injectFuns)
        if (!da.handleWebApiException(data)(injectFuns)) return
        inviteCodeAdministrationInitView(
            da.getterByField('inviteCode.maxHeight')(injectFuns) ,
            da.getterByField('inviteCode.maxWidth')(injectFuns) ,
            da.getterByField('curId')(injectFuns))(injectFuns)
        da.setMessage({
            type: 'success',
            content: '导入成功',
            mode: 'message'
        })(injectFuns)

        // if (!handleWebApiInfo(data)(injectFuns)) return
        // if(!data.value.list || !data.value.list.length) {
        //     injectFuns.reduce('setImportErrorData',data.value.list)
        // } else {
        //     inviteCodeAdministrationInitView(
        //         da.getterByField('inviteCode.maxHeight')(injectFuns) ,
        //         da.getterByField('inviteCode.maxWidth')(injectFuns) ,
        //         da.getterByField('curId')(injectFuns))(injectFuns)
        //     da.setMessage({
        //         type: 'success',
        //         content: '导入成功',
        //         mode: 'message'
        //     })(injectFuns)
        // }
    }
}

export function addSubPartner(params) {
    return injectFuns => {
        if(params===-1) {
            da.setMessage({
                type: 'warning',
                content: '添加失败',
                mode: 'message'
            })(injectFuns)
        } else {
            inviteCodeAdministrationInitView(
                da.getterByField('inviteCode.maxHeight')(injectFuns) ,
                da.getterByField('inviteCode.maxWidth')(injectFuns) ,
                params)(injectFuns)
            da.setMessage({
                type: 'success',
                content: '添加成功',
                mode: 'message'
            })(injectFuns)
        }
        // webapi.web.addAppSon(injectFuns.post, params).then(data => {
        //     if (!da.handleWebApiInfo(data)(injectFuns)) return
        //     if(data.value===-1) {
        //         da.setMessage({
        //             type: 'warning',
        //             content: '添加失败',
        //             mode: 'message'
        //         })(injectFuns)
        //     } else {
        //         inviteCodeAdministrationInitView(
        //             da.getterByField('inviteCode.maxHeight')(injectFuns) ,
        //             da.getterByField('inviteCode.maxWidth')(injectFuns) ,
        //             data.value)(injectFuns)
        //         da.setMessage({
        //             type: 'success',
        //             content: '添加成功',
        //             mode: 'message'
        //         })(injectFuns)
        //     }

        // })
    }
}

export function updateLeftTreeItem(params) {
    return injectFuns => {


        inviteCodeAdministrationInitView(
            da.getterByField('inviteCode.maxHeight')(injectFuns) ,
            da.getterByField('inviteCode.maxWidth')(injectFuns) ,
            params.id)(injectFuns)
        da.setMessage({
            type: 'success',
            content: '编辑成功',
            mode: 'message'
        })(injectFuns)

        // webapi.web.updateAppPrice(injectFuns.post, params).then(data => {
        //     if (!da.handleWebApiInfo(data)(injectFuns)) return
        //     inviteCodeAdministrationInitView(
        //         da.getterByField('inviteCode.maxHeight')(injectFuns) ,
        //         da.getterByField('inviteCode.maxWidth')(injectFuns) ,
        //         params.id)(injectFuns)
        //     da.setMessage({
        //         type: 'success',
        //         content: '编辑成功',
        //         mode: 'message'
        //     })(injectFuns)
        // })
    }
}

export function updateRightListItem(params) {
    return injectFuns => {
        webapi.web.regCodeUpdate(injectFuns.post, params).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            queryInviteCodeList()(injectFuns)
            da.setMessage({
                type: 'success',
                content: '编辑成功',
                mode: 'message'
            })(injectFuns)
        })
    }
}

export function importImportInviceCodeError(data) {
    return injectFuns => {
        injectFuns.reduce('importImportInviceCodeError',data)
    }
}

//官网管理 页签切换，默认为【首页滚动消息】
export function saveHomeType(homeType) {
    return injectFuns => {
        if(homeType == 1){
            initHomeInfoManage()(injectFuns)
        }else if(homeType == 2){
            initBigNewsManage()(injectFuns)
        }else if(homeType == 3){
            webapi.homeManageQuery.partnerPlanInit(injectFuns.post).then(data => {
                if (!da.handleWebApiInfo(data)(injectFuns)) return

                initPartnerPlanManage(undefined,undefined,undefined,data.value)(injectFuns)
            })
        }
    }
}

//新增用户统计两页签切换
export function saveUserManageClick(type, maxHeight) {
    return injectFuns => {
        if(type == 1) {
            userAnalyzeInitView(maxHeight)(injectFuns)
        } else if (type == 2) {
            userTaxManageInitView(maxHeight)(injectFuns)

        }
    }

}
export function saveTaxManageClick(type, maxHeight) {
    return injectFuns => {
        if(type == 1) {
            orgTaxManageInitView(maxHeight)(injectFuns)
        } else if (type == 2) {
            userTaxManageInitView(maxHeight)(injectFuns)

        }
    }

}
export function orgTaxManageInitView(maxHeight) {
    return injectFuns => {
        let orgTaxManageFrom = da.getterByField('orgTaxManage.from')(injectFuns).toJS(),
            appInfo = da.getterByField('appInfo')(injectFuns)
        if (orgTaxManageFrom.appId) {
            orgTaxManageFrom.appId = orgTaxManageFrom.appId.id
        }
        orgTaxManageFrom.type='1'
        webapi.org.itsStats(injectFuns.post, orgTaxManageFrom).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            injectFuns.reduce('setOrgTaxManageData', data.value, maxHeight, orgTaxManageFrom.appId)
        })
    }
}
export function userTaxManageInitView(maxHeight) {
    return injectFuns => {
        let userTaxManageFrom = da.getterByField('userTaxManage.from')(injectFuns).toJS(),
            appInfo = da.getterByField('appInfo')(injectFuns)
        if (userTaxManageFrom.appId) {
            userTaxManageFrom.appId = userTaxManageFrom.appId.id
        }
        userTaxManageFrom.type='2'
        webapi.org.itsStats(injectFuns.post, userTaxManageFrom).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            injectFuns.reduce('setUserTaxManageData', data.value, maxHeight, userTaxManageFrom.appId)
        })
    }
}

export function goOrgTaxInfoList(type, date) {
    return injectFuns => {
        let appId = da.getterByField('orgTaxManage.from.appId')(injectFuns)?da.getterByField('orgTaxManage.from.appId.id')(injectFuns):-1
        webapi.org.itsStatsDetail(injectFuns.post, {"queryDate":date, 'appId': appId, 'type':1}).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            injectFuns.reduce('setOrgTaxInfo',data.value)
        })
    }
}
export function goUserTaxInfoList(type, date) {
    return injectFuns => {
        let appId = da.getterByField('userTaxManage.from.appId')(injectFuns)?da.getterByField('userTaxManage.from.appId.id')(injectFuns):-1
        webapi.org.itsStatsDetail(injectFuns.post, {"queryDate":date, 'appId': appId, 'type':2}).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return
            injectFuns.reduce('setUserTaxInfo',data.value)
        })
    }
}

export function backTaxPage(taxListType, taxManageType) {
    return injectFuns => {
        injectFuns.reduce('backTaxPage', taxListType, taxManageType)
    }
}

//点击新增按钮显示弹窗
export function setAddShow(status) {
    return injectFuns => {
        if(status == 'homeInfo'){
            injectFuns.reduce('setAddShow', status, true)
        }else if(status == 'bigNews'){
            injectFuns.reduce('setAddShow', status, true)
        }else if(status == 'partnerPlan'){
            getCityData()(injectFuns)
        }
    }
}

/**
 * [ 页码发生变化]
 */
export function homeInPageChange(currentPage,status) {
    return injectFuns => {
        if(status == 'homeInfo'){
            initHomeInfoManage(currentPage)(injectFuns)
        }else if(status == 'bigNews'){
            initBigNewsManage(currentPage)(injectFuns)
        }else if(status == 'partnerPlan'){
            initPartnerPlanManage(currentPage)(injectFuns)
        }

    }
}

/**
 * [ 每页显示大小发生变化]
 */
export function homePageSizeChange(currentPage,pageSize,status) {
    return injectFuns => {
        if(status == 'homeInfo'){
            initHomeInfoManage(currentPage, pageSize)(injectFuns)
        }else if(status == 'bigNews'){
            initBigNewsManage(currentPage, pageSize)(injectFuns)
        }else if(status == 'partnerPlan'){
            initPartnerPlanManage(currentPage, pageSize)(injectFuns)
        }
    }
}

//首页滚动消息
export function initHomeInfoManage(currentPage,pageSize) {
    return injectFuns => {
        let homeInfoManageListPage = da.getterByField('homeInfoManageListPage')(injectFuns).toJS(),
            page = {
                currentPage:!!currentPage ? currentPage : homeInfoManageListPage.current,
                pageSize:!!pageSize ? pageSize : homeInfoManageListPage.pageSize
            }
        webapi.homeManageQuery.homeInfoQuery(injectFuns.post, {page:page}).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return

            injectFuns.reduce('initHomeInfoManage', data.value)
        })
    }
}

export function homeInfoDelete(id,ts) {
    return injectFuns => {
        let { getterByField, clearMessage, setMessage, handleWebApiInfo } = da,
            { post } = injectFuns

        setMessage({
            type: 'confirm',
            title: '注意',
            content: '确定要删除当前消息吗？',
            okText: '确定',
            clearFocus: true,
            onCancel: () => {
                clearMessage()(injectFuns)
            },
            onOk: () => {
                clearMessage()(injectFuns)

                webapi.homeManageQuery.deleteList(injectFuns.post, {id: id,ts: ts}).then(data => {
                    if (!da.handleWebApiInfo(data)(injectFuns)) return
                    da.setMessage({
                        type: 'success',
                        content: '删除成功',
                        mode: 'message'
                    })(injectFuns)

                    initHomeInfoManage()(injectFuns)
                })
            }

        })(injectFuns)
    }
}

export function homeInfoUpdate(homeInfoId,ts) {
    return injectFuns => {
        let { getterByField, clearMessage, setMessage, handleWebApiInfo } = da,
            { post } = injectFuns

        webapi.homeManageQuery.getById(injectFuns.post, {id: homeInfoId}).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return

            injectFuns.reduce('setHomeInfoUpdate', true, homeInfoId, ts, data.value)
        })
    }
}

//保存、保存并发布
export function homeInfoRelease(homeInfoId, ts, status, isListRelease) {
    return injectFuns => {
        let { getterByField, clearMessage, setMessage, handleWebApiInfo } = da,
            { post } = injectFuns.post

        if(!!isListRelease && isListRelease == 'isListRelease'){

            webapi.homeManageQuery.releaseNews(injectFuns.post, {id: homeInfoId, ts: ts}).then(data => {
                if (!da.handleWebApiInfo(data)(injectFuns)) return

                da.setMessage({
                    type: 'success',
                    content: '发布成功',
                    mode: 'message'
                })(injectFuns)

                initHomeInfoManage()(injectFuns)
            })
        }else{
            let createHomeInfoData = da.getterByField('createHomeInfo.createHomeInfoData')(injectFuns).toJS(),
                id = da.getterByField('createHomeInfo.homeInfoId')(injectFuns),
                ts = da.getterByField('createHomeInfo.homeInfoTs')(injectFuns),
                tempList = getErrorMessage(createHomeInfoData),
                errorMessage = tempList.errMessageList,
                list = tempList.list,
                queryList

            if (errorMessage && !!errorMessage[0]) {
                setMessage({ type: 'warning', mode: 'message', content: getDisplayErrorMSg(errorMessage) })(injectFuns)
                return
            }else{
                for(let i=0;i<list.length;i++){
                    if(!!list[i].id && !!ts){
                        list[i].ts = ts
                    }
                }

                queryList = {
                    id: !!homeInfoId ? homeInfoId : (!!id ? id : null),
                    status: status,
                    setRollMessageDto: list
                }

                webapi.homeManageQuery.saveNews(injectFuns.post, queryList).then(data => {
                    if (!da.handleWebApiInfo(data)(injectFuns)) return

                    initHomeInfoManage()(injectFuns)
                })
            }
        }
    }
}

function getErrorMessage(createHomeInfoData){
    let errMessageList = [],
        list = [],
        allItemEmpty = true

    for (let i = 0; i < createHomeInfoData.length; i++) {
        let item = createHomeInfoData[i]

        //跳过空行和只有摘要的行
        if (!item || (!item.title && !item.address)) {
            continue
        }
        allItemEmpty = false

        if(!!item.title && !item.address){
            errMessageList.push("第" + (i + 1) + "行" + '链接地址' + "不能为空")
        }else if(!item.title && !!item.address){
            errMessageList.push("第" + (i + 1) + "行" + '标题' + "不能为空")
        }

        if(!!item && !!item.title && !!item.address){
            list.push(item)
        }
    }

    if (!!allItemEmpty) {
        errMessageList.push("请至少填写一条数据!")
    }

    return {errMessageList:errMessageList,list:list}
}

function getDisplayErrorMSg(errorMsg) {

    return <div style={{ display: 'inline-table' }}>{errorMsg.map(item => <div>{item}<br /></div>)}</div>
}

export function createHomeInfoCancel() {
    return injectFuns => {
        injectFuns.reduce('hideCreateHomeInfoCancel')
    }
}

//头条管理
export function initBigNewsManage(currentPage,pageSize) {
    return injectFuns => {
        let bigNewsManageListPage = da.getterByField('bigNewsManageListPage')(injectFuns).toJS(),
            page = {
                currentPage:!!currentPage ? currentPage : bigNewsManageListPage.current,
                pageSize:!!pageSize ? pageSize : bigNewsManageListPage.pageSize
            }
        webapi.homeManageQuery.bigNewsQuery(injectFuns.post, {page:page}).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return

            injectFuns.reduce('initBigNewsManage', data.value)
        })
    }
}

//头条-编辑
export function bigNewsUpdate(bigNews) {
    return injectFuns => {

        injectFuns.reduce('setBigNewsUpdate', true, bigNews)
    }
}

//头条保存、保存并发布
export function bigNewsRelease(bigNewsId, ts, status, isListRelease) {//status: 0 保存；1 保存并发布
    return injectFuns => {
        let { getterByField, clearMessage, setMessage, handleWebApiInfo } = da,
            { post } = injectFuns.post

        if(!!isListRelease && isListRelease == 'isListRelease'){
            webapi.homeManageQuery.releaseBigNews(injectFuns.post, {id: bigNewsId, ts: ts}).then(data => {
                if (!da.handleWebApiInfo(data)(injectFuns)) return

                da.setMessage({
                    type: 'success',
                    content: '发布成功',
                    mode: 'message'
                })(injectFuns)

                initBigNewsManage()(injectFuns)
            })
        }else{
            let createBigNewsData = da.getterByField('createBigNews.createBigNewsData')(injectFuns).toJS(),
                enclosureAddress = da.getterByField('createBigNews.enclosureAddress')(injectFuns),
                errorList = [],
                queryList

            if (!createBigNewsData.title) {
                errorList.push('请填写【标题】项')
            }
            if (!createBigNewsData.author){
                errorList.push('请填写【作者】项')
            }
            if(!createBigNewsData.digest){
                errorList.push('请填写【摘要】项')
            }
            if(!createBigNewsData.address){
                errorList.push('请填写【文章链接】项')
            }
            if(!enclosureAddress){
                errorList.push('请上传封面图片')
            }

            if(!!errorList[0]){
                setMessage({ type: 'warning', mode: 'message', content: getDisplayErrorMSg(errorList) })(injectFuns)
                return
            }else{
                queryList = {
                    id: !!createBigNewsData.id ? createBigNewsData.id : null,
                    ts: createBigNewsData.ts ? createBigNewsData.ts : null,
                    title:createBigNewsData.title,
                    author:createBigNewsData.author,
                    digest:createBigNewsData.digest,
                    address:createBigNewsData.address,
                    enclosureAddress:enclosureAddress,
                    status: status,
                    type: createBigNewsData.type?createBigNewsData.type.id: 1
                }
                webapi.homeManageQuery.saveBigsNews(injectFuns.post, queryList).then(data => {
                    if (!da.handleWebApiInfo(data)(injectFuns)) return

                    injectFuns.reduce('setBigNewsRelease', status == 1 ? false : true, status)

                    if(status == 1){
                        setMessage({ type: 'success', mode: 'message', content: '保存并新增成功' })(injectFuns)
                        initBigNewsManage()(injectFuns)
                    }else{
                        setMessage({ type: 'success', mode: 'message', content: '保存成功，可以编辑下一篇文章' })(injectFuns)
                    }
                })
            }
        }
    }
}
//头条-新增取消弹窗右上角
export function bigNewsCancel() {
    return injectFuns => {
        initBigNewsManage()(injectFuns)
    }
}

export function importReturnPicture(enclosureAddress, status){
    return injectFuns => {

        injectFuns.reduce('setEnclosureAddress', enclosureAddress, status)
    }
}

export function bigNewsDeleteOrReleaseCancel(id,ts,isDelete) {
    return injectFuns => {
        let { getterByField, clearMessage, setMessage, handleWebApiInfo } = da,
            { post } = injectFuns,
            content = isDelete == 'isDelete' ? '确定要删除当前文章吗？' : '确定要取消发布吗？'

        setMessage({
            type: 'confirm',
            title: '注意',
            content: content,
            okText: '确定',
            clearFocus: true,
            onCancel: () => {
                clearMessage()(injectFuns)
            },
            onOk: () => {
                clearMessage()(injectFuns)

                if(isDelete == 'isDelete'){
                    webapi.homeManageQuery.BigNewsDelete(injectFuns.post, {id: id,ts: ts}).then(data => {
                        if (!da.handleWebApiInfo(data)(injectFuns)) return
                        da.setMessage({
                            type: 'success',
                            content: '删除成功',
                            mode: 'message'
                        })(injectFuns)

                        initBigNewsManage()(injectFuns)
                    })
                }else{
                    webapi.homeManageQuery.cancelReleaseBigNews(injectFuns.post, {id: id,ts: ts}).then(data => {
                        if (!da.handleWebApiInfo(data)(injectFuns)) return
                        da.setMessage({
                            type: 'success',
                            content: '取消发布成功',
                            mode: 'message'
                        })(injectFuns)

                        initBigNewsManage()(injectFuns)
                    })
                }
            }
        })(injectFuns)
    }
}

//伙伴管理 initPartnerPlanManage
export function initPartnerPlanManage(currentPage,pageSize,partnerPlanStatus,initData) {
    return injectFuns => {
        let partnerPlanManageListPage = da.getterByField('partnerPlanManageListPage')(injectFuns).toJS(),
            partnerPlanStatus = !!partnerPlanStatus ? partnerPlanStatus : da.getterByField('partnerPlan.from.partnerPlanStatus')(injectFuns).toJS(),
            page = {
                currentPage:!!currentPage ? currentPage : partnerPlanManageListPage.current,
                pageSize:!!pageSize ? pageSize : partnerPlanManageListPage.pageSize
            },
            queryList = {page:page,entity:{status:partnerPlanStatus.id}}
        webapi.homeManageQuery.partnerPlanQuery(injectFuns.post, queryList).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return

            injectFuns.reduce('initPartnerPlanManage', data.value, partnerPlanStatus,initData)
        })
    }
}

export function partnerPlanSave(isChangeType){
    return injectFuns => {
        let { getterByField, clearMessage, setMessage, handleWebApiInfo } = da,
            { post } = injectFuns.post

        let createPartnerData = da.getterByField('partnerPlan.createPartnerData')(injectFuns).toJS(),
            enclosureAddress = da.getterByField('partnerPlan.enclosureAddress')(injectFuns),
            errorList = [],
            queryList

        if(!!isChangeType && isChangeType == 'cancelContract'){
            webapi.homeManageQuery.cancelSavePartnerPlan(injectFuns.post, {id:createPartnerData.id,ts:createPartnerData.ts}).then(data => {
                if (!da.handleWebApiInfo(data)(injectFuns)) return

                setMessage({ type: 'success', mode: 'message', content: '取消签约成功'})(injectFuns)
                initPartnerPlanManage()(injectFuns)
            })
        }else{
            /*if (!createPartnerData.createTime) {
                errorList.push('请选择【签约日期】')
            }*/
            if (!createPartnerData.name){
                errorList.push('请填写【姓名】')
            }
            if(!createPartnerData.phoneNumber){
                errorList.push('请填写【联系电话】')
            }
            if(!createPartnerData.email){
                errorList.push('请填写【联系邮箱】')
            }
            if(!createPartnerData.companyName){
                errorList.push('请填写【公司全称】')
            }
            if(!createPartnerData.province || !createPartnerData.province.name){
                errorList.push('请填写【所在地区-省】')
            }
            if(!createPartnerData.city || !createPartnerData.city.name){
                errorList.push('请填写【所在地区-市】')
            }
            if(!createPartnerData.address){
                errorList.push('请填写【所在地区-详细地址】')
            }
            if(!createPartnerData.serviceContent){
                errorList.push('请填写【服务内容】')
            }
            if(!createPartnerData.serviceScope){
                errorList.push('请填写【服务领域】')
            }
            if(!createPartnerData.businessIntroduction){
                errorList.push('请填写【业务介绍】')
            }

            if(!!errorList[0]){
                setMessage({ type: 'warning', mode: 'message', content: getDisplayErrorMSg(errorList) })(injectFuns)
                return
            }else{
                queryList = {
                    id: !!createPartnerData.id ? createPartnerData.id : null,
                    ts: createPartnerData.ts ? createPartnerData.ts : null,
                    createTime:createPartnerData.createTime,
                    name:createPartnerData.name,
                    phoneNumber:createPartnerData.phoneNumber,
                    email:createPartnerData.email,
                    companyName:createPartnerData.companyName,
                    province:!!createPartnerData.province ? createPartnerData.province.code : null,
                    city:!!createPartnerData.city ? createPartnerData.city.code : null,
                    address:createPartnerData.address,
                    employeeNum:!!createPartnerData.employeeNum ? createPartnerData.employeeNum.id : null,
                    type:!!createPartnerData.type ? createPartnerData.type.id : null,
                    serviceContent:createPartnerData.serviceContent,
                    serviceScope:createPartnerData.serviceScope,
                    businessIntroduction:createPartnerData.businessIntroduction,
                    comment:createPartnerData.comment,
                    status:!!isChangeType && isChangeType == 'isChangeType' ? 1 : (!!createPartnerData.status ? createPartnerData.status : 1),
                    enclosureAddress:enclosureAddress?enclosureAddress:null
                }
                webapi.homeManageQuery.savePartnerPlan(injectFuns.post, queryList).then(data => {
                    if (!da.handleWebApiInfo(data)(injectFuns)) return
                    let content = !!isChangeType && isChangeType == 'isChangeType' ? '已成功转为签约伙伴' : '保存成功'

                    setMessage({ type: 'success', mode: 'message', content: content})(injectFuns)
                    initPartnerPlanManage()(injectFuns)
                })
            }
        }
    }
}

export function createPartnerPlanCancel() {
    return injectFuns => {

        injectFuns.reduce('hidePartnerPlanCancel')
    }
}

export function partnerPlanDelete(id,ts) {
    return injectFuns => {
        let { getterByField, clearMessage, setMessage, handleWebApiInfo } = da,
            { post } = injectFuns

        setMessage({
            type: 'confirm',
            title: '注意',
            content: '确定要删除当前伙伴吗？',
            okText: '确定',
            clearFocus: true,
            onCancel: () => {
                clearMessage()(injectFuns)
            },
            onOk: () => {
                clearMessage()(injectFuns)

                webapi.homeManageQuery.partnerPlanDelete(injectFuns.post, {id: id,ts: ts}).then(data => {
                    if (!da.handleWebApiInfo(data)(injectFuns)) return
                    da.setMessage({
                        type: 'success',
                        content: '删除成功',
                        mode: 'message'
                    })(injectFuns)

                    initPartnerPlanManage()(injectFuns)
                })
            }

        })(injectFuns)
    }
}

//伙伴计划管理-获取省市数据
export function getCityData(partnerPlanList) {
    return injectFuns => {
        let { getterByField,handleWebApiInfo } = da,
            { post } = injectFuns,
            queryList = {
                code: !!partnerPlanList?partnerPlanList.province:null
            }

        webapi.homeManageQuery.getCityMap(injectFuns.post, queryList).then(data => {
            if (!da.handleWebApiInfo(data)(injectFuns)) return


            injectFuns.reduce('setCreatePartnerPlan', true, partnerPlanList, data.value)
        })
    }
}

//导入账套
export function openImportTool(){
    return injectFuns => {
        da.setMessage({
            type: 'app',
            title: '导入账套',
            content: 'app:apps/login/admin/importCover',
            width: 400,
            // initData:{url:imgPath,width:'670px',height:'450px'},
            refName: 'importCoverRef',
            okText: '关闭',
            maskClosable:false,
            className:'importCover',
            footer:[],
            onCancel: () => { da.clearMessage()(injectFuns)},
            onOk: () => { da.clearMessage()(injectFuns)}
        })(injectFuns)
    }
}

export function searchMenuTextChange(val) {
    return injectFuns => {
        injectFuns.reduce('setMenuText', val)
    }
}
export function getFeedbackData(params){
    return injectFuns=>{
        if(!params){
            params = {}
        }
        webapi.web.queryFeedback(injectFuns.post,params).then(ajaxData=>{
            if (!da.handleWebApiInfo(ajaxData)(injectFuns)) return
            injectFuns.reduce('setFeedbackData',ajaxData.value)
        })
    }
}
export function feedbackVisibleCtr(feedbackVisible,val){
    return injectFuns=>{
        injectFuns.reduce('feedbackVisibleCtr',feedbackVisible)
        if(val){
            webapi.web.sendFeedback(injectFuns.post,{content:val}).then(ajaxData=>{
                if (!da.handleWebApiInfo(ajaxData)(injectFuns)) return
                da.setMessage({
                    type: 'success',
                    mode: 'message',
                    content: `反馈成功！`
                })(injectFuns)
            })
        }
    }
}
Object.assign(exports, { ...da, ...exports })
