import React, { Component, PropTypes } from 'react'
import { HCFLayout, Menu, Icon, Button, Tabs, Radio, Table, Column, Cell, ZIcon, Input,Consult} from 'xComponent'
import DynamicComponent, { FormItem ,Modal} from 'dynamicComponent'
import { AppLoader } from 'appLoader'
import MyYJ from './component/myYJ'
import Order from './component/order'
import OrderSwy from './component/orderSwy'
import Setting from './component/setting'
import MyOrder from './component/myOrder'
import MyOrderSwy from './component/myOrderSwy'
import TaxManage from './component/taxManage'
import Farenw from './component/farenw'
import Operation from './component/operation'
import ItsOrder from './component/itsOrder'
import InviteCodeAdministrationComponent from './component/inviteCodeAdministration'
import styles from "./admin.less"
import PromoCode from './component/promoCode'
import Antd from 'antd'
const ModalComponent = Antd.Modal
const SubMenu = Menu.SubMenu
const Item = Menu.Item
const TabPane = Tabs.TabPane
const RadioGroup = Radio.Group
const MenuItemGroup = Menu.ItemGroup
import defaultUser from '../../portal/img/defaultUser.png'
import * as api from './api'

export default class AdminComponent extends Component {
    static defaultProps = {
        prefixCls: 'admin'
    }

    componentDidMount() {
        this.props.initView(undefined,undefined,this.props.appParams.activeKey, this.props.appParams.from)
    }

    handleOrgClick(org) {
        return (e)=> {
            if (e.preventDefault)
                e.preventDefault()
            if (e.stopPropagation)
                e.stopPropagation()
            if (window.location.href.indexOf('?h=its') != -1){
                this.props.toIts(org)
            }else{
                this.props.changeOrg(org, (data) => {
                    if (data.result) {
                        this.props.onRedirect('apps/portal', true)
                    }
                })
            }
        }
    }

    handleMenuClick(e) {
        let utils = this.props.payload.get('utils'),
            getterByField = utils.get('getterByField'),
            appInfo = getterByField('appInfo')
        if (e.key === 'logout') {
            sessionStorage.setItem('appId',null)
            this.props.logout(()=> {
                let onlineServiceUrl = appInfo && appInfo.get('onlineServiceUrl') || false
                this.props.onLogoutSucess(onlineServiceUrl)
            })
        }else if(e.key === 'feedback'){
            this.showFeedback()
        }
    }
    getOrgIsDisable(orgInfo) {
        /**
         * 针对特殊行业不允许进入账套的有：
         * 是否是特殊行业：1005 健康美容业  1006餐饮行业 为特殊行业
         * 1.过期账套不允许
         * 2.未购买的账套不允许
         * 3.只有实名认证通过的,实名认证的状态: 0待认证;1认证已通过;2认证审核中;3认证未通过
         */
        let expired = orgInfo.get('expired'),//是否过期
            industry = orgInfo.get('industry'),//当前所属行业
            status = orgInfo.get('status'),//当前实名认证的状态
            orgStatus = orgInfo.get('orgStatus'),
            orgType = orgInfo.get('orgType'),//当前的企业类型，1代账端 2企业端
            weatherNewBuy = orgInfo.get('weatherNewBuy'),//当前是否首次购买（也可判断是否购买成功）
            isSpecialIndustry = industry > 1000//是否是特殊行业
        /* if (!this.props.isDevelop){
            return expired || (orgType == 1 && status == 0)
        } */
        if (isSpecialIndustry) {
            //特殊行业的控制
            return !(orgStatus > 0 && orgStatus < 3)
        } else {
            //正常行业的控制
            return expired || (orgType == 1 && status == 0)
        }
    }
    getGroupList(groupList,oldGroupList){
        let { prefixCls, payload, ...otherProps } = this.props,
            list = []
        oldGroupList.map(org => {
            list.push(
                <Item key={'org-' + org.get('id')} disabled={!(org.get('expired') || org.get('orgStatus') == 2)} title={org.get('name')}>
                    <i className={`${prefixCls}-orgIocn`} />
                    <a onClick={::this.handleOrgClick(org)}>{org.get('name')}</a>
                </Item>
            )
        })
        return list
    }
    getOrgList(orgs,oldOrgs){
        let { prefixCls, payload, ...otherProps} = this.props,
            list = []
        oldOrgs.map(org=>{
            // if(  !(org.get('expired')||( org.get('orgType')==1&&org.get('status')==0) )  ){
            if(  !(( org.get('orgType')==1&&org.get('status')==0) )  ){
                let isDisabled = this.getOrgIsDisable(org),
                    isSpecialIndustry = org.get('industry') > 1000
                list.push(
                    // <Item key={'org-' + org.get('id')} disabled={isDisabled} title={isDisabled && isSpecialIndustry ? '亲，特定行业需成功上传营业执照，购买后才能使用' : org.get('name')}>
                    <Item className={org.get('expired')?'expiredText':''} key={'org-' + org.get('id')} title={isDisabled && isSpecialIndustry ? '亲，特定行业需成功上传营业执照，购买后才能使用' : org.get('name')}>
                        {org.get('orgType') == 1 ? (<i className={`${prefixCls}-orgDzIocn`} />) : (<i className={`${prefixCls}-orgIocn`}/>)}
                        <a onClick={::this.handleOrgClick(org)}>{org.get('name')}</a>
                    </Item>
                )
            }
        })
        return list
    }
    handleSearchMenuTextChange(e){
        this.props.searchMenuTextChange(e.target.value)
    }

    render() {
        if(this.props._isCurrentTab === false) return null //加上这句话
        if (!this.props.payload || !this.props.payload.get('utils'))
            return null
        let {prefixCls, ...otherProps} = this.props,
            utils = this.props.payload.get('utils'),
            getterByField = utils.get('getterByField'),
            currentUserName = getterByField('currentUserName'),
            message = this.props.payload.getIn(['global','message']),
            appId = getterByField('appId'),
            orgs = getterByField('orgs')||[],
            oldOrgs = getterByField('oldOrgs')||[],
            appInfo = getterByField('appInfo'),
            feedbackVisible = getterByField('feedbackVisible'),
            isShowSearch = orgs&&orgs.size&&orgs.size > 7 ? true : false,
            sex = getterByField('sex'),
            orgSearchValue = getterByField('orgSearchValue'),
            titleStr = appId==102?'服务商':'企业',
            oldGroupList = getterByField('oldGroupList'),
            groupList = getterByField('groupList'),
            logoImage = appId == 103 ? '/static/images/default/new-yj-logo.png' : '/static/images/default/new-zwj-logo.png',//portal页header的logo,
            userImage = '',
            homeUrl = appInfo && appInfo.size > 0 && appInfo.get('homeUrl') ? appInfo.get('homeUrl') : '/'

        if(location.hostname=="yj.rrtimes.com" && homeUrl != '#'){
            homeUrl="https://www.rrtimes.com/"
        }
        if(appId==102){
            homeUrl=homeUrl+'#dz'
        }else if(appId==1010){
            homeUrl=homeUrl
        }else{
            homeUrl=homeUrl+'#qy'
        }
        if(appId ==1010){
            logoImage = appInfo.get('logoUrlPortal')
        }
        if(sex == 0){
            userImage = '/static/images/default/defaultUserMen.svg'
        }else if(sex == 1){
            userImage = '/static/images/default/defaultUserGirl.svg'
        }else{
            userImage = '/static/images/default/defaultUserMen.svg'
        }

        //it网站来源特殊处理
        var itStyle = {}
        if(this.props.appParams.from == 'it'){
            itStyle = {display:'none'}
        }
        return (
            <div style={{overflow:'hidden',flexDirection:'column',display:'flex'}}>
                {Modal(message)}
                <div className={`${prefixCls}-header`} style={itStyle}>
                    <a href={homeUrl}>
                        <img src={appInfo && appInfo.size > 0 && appInfo.get('logoUrlPortal') ? logoImage : require('../../../static/images/default/logo.png')} alt=""/>
                    </a>
                    <Menu>
                        <SubMenu title={
                            <div className={`${prefixCls}-headerOrg`}>
                                <ZIcon icon='liebiao' />
                                <span>{appId==102?'我的服务商':'我的企业'}</span>
                            </div>
                          }>
                            {isShowSearch?<MenuItemGroup title={
                                <div style={{padding:'0px',background:'#fff'}}>
                                    <Input placeholder={`搜索${titleStr}`} className='searchOrg' value={orgSearchValue} onChange={::this.handleSearchMenuTextChange}/>
                                    <i className={`${prefixCls}-left-span-i`}/>
                                </div>
                            } /> : orgs && orgs.size > 0 && <Item style={{ color: '#aaa', background: '#fff', fontSize: '12px', height: '18px', lineHeight: '18px', marginLeft: '4px',marginTop:"20px" }}>企业列表</Item>}
                            {orgs && orgs.size > 0 && this.getOrgList(orgs, oldOrgs)}
                            {appId == 103 && groupList && groupList.size > 0 ? 
                                <MenuItemGroup>
                                    <Item
                                        style={{ color: '#aaa', background: '#fff', fontSize: '12px', height: '18px', lineHeight: '18px', marginLeft: '4px' }}>
                                        集团列表
                                    </Item>
                                    {this.getGroupList(groupList, oldGroupList)}
                                </MenuItemGroup>
                            : null}
                        </SubMenu>
                    </Menu>

                    <Menu className={`${prefixCls}-header-nav`} onClick={::this.handleMenuClick}>
                        {this.renderCommon(prefixCls, currentUserName, userImage,appInfo)}
                    </Menu>
                </div>

                {this.renderMain(prefixCls, otherProps)}
                {//需求说admin页面不加意见收集通道
                    /*this.renderFeedback(feedbackVisible)*/
                }
            </div>
        )
    }
    renderFeedback(feedbackVisible){
        if(!feedbackVisible) return null
        return <ModalComponent
            visible
            type ='modal'
            title='意见收集'
            width={600}
            footer={[
              <Button key="back" onClick={::this.handleCancel}>取消</Button>,
              <Button key="submit" type="primary" onClick={::this.handleOk}>
                提交
              </Button>,
            ]}
            maskClosable={false}
            onCancel={::this.handleCancel}
        >
            <div><textArea ref = "feedbackText" style ={{
                height:'150px',
                width:'500px',
                defaultValue :'',
                border:'1px solid #e9e9e9',
                borderRadius: "4px",
                padding:"10px",
                textIndent:"2em",
                outline: "none",
                resize:"none"
            }} rows={4} placeholder = "请输入反馈内容"  maxLength={500}></textArea></div>
        </ModalComponent>
    }
    showFeedback(){
        // this.refs.feedbackText.value = ''
        this.props.feedbackVisibleCtr(true)
    }
    handleCancel(){
        this.props.feedbackVisibleCtr(false)
    }
    handleOk(){
        let val = this.refs.feedbackText.value
        this.props.feedbackVisibleCtr(false,val)
    }
    /**
     * [设置显示企业管理的view]
     */
    setManageTags(){
        let payload = this.props.payload,
            utils = payload.get('utils'),
            getterByField = utils.get('getterByField'),
            activeKey = getterByField('activeKey'),
            operateAuth = getterByField('operateAuth').toJS(),
            tabs = getterByField('getMenus').toJS(),
            isShowAuthentication = getterByField('isShowAuthentication'),
            authentication = tabs.find(org=>org.key == '50'),
            AuthenticationComponent = authentication.component,
            tab = getterByField('currentTab'),
            currentTab = tab && tab.size ? tab.toJS() : tab,
            menuArr = [],
            isOrganizationalList =  getterByField('isOrganizationalList')
            if(isShowAuthentication && currentTab && currentTab.key == '50'){
                menuArr.push(<TabPane key={authentication.key} tab={authentication.menuName}>
                    {activeKey != authentication.key ? null : <AuthenticationComponent initData={currentTab.initData} {...this.props}/>}
                    </TabPane>)
            }
        if(operateAuth.length >= 1){
            operateAuth.map(auth=>{
                let tab = tabs.find(menu=>menu.menuId == auth.menuId),
                    Component = tab.component
                if(tab.menuId==3060) {
                    if(isOrganizationalList) {
                        tab.menuName='企业列表'
                    } else {
                        tab.menuName='服务商信息'
                    }
                }
                if(tab.menuId==3095) {
                    menuArr.push(<TabPane key={tab.key} tab={tab.menuName} className={'inviteCodeAdministration-tab'} >
                        {activeKey != tab.key ? null : <Component {...this.props} auth={auth.authType} />}
                        </TabPane>)
                } else {
                    if (tab.appPath){
                        menuArr.push(<TabPane key={tab.key} tab={tab.menuName}>
                            {activeKey != tab.key ? null : <AppLoader ref={tab.appPath} path={tab.appPath} />}
                        </TabPane>)
                    }else{
                        menuArr.push(<TabPane key={tab.key} tab={tab.menuName}>
                            {activeKey != tab.key ? null : <Component {...this.props} auth={auth.authType} />}
                        </TabPane>)
                    }
                }
            })
        }
        return menuArr
    }
    handleTabClick(e){
        this.props.saveActiveKey(e)
    }
    handleOrderTabClick(e){
        this.props.saveOrderActiveKey(e)
    }
    renderMain(prefixCls, otherProps) {
        let payload = otherProps.payload,
            utils = payload.get('utils'),
            getterByField = utils.get('getterByField'),
            currentStep = getterByField('currentStep'),
            userId = getterByField('userId'),
            activeKey = getterByField('activeKey'),
            orderActiveKey = getterByField('orderActiveKey') || 1,
            showOrder = getterByField('showOrder'),
            showOrderSwy = getterByField('showOrderSwy'),
            appInfo = getterByField('appInfo'),
            appIdNum = getterByField('appId'),
            tabStr = appIdNum==102?'我的服务商':'我的企业'

             //it网站来源特殊处理
        var itTabClassName = {}
        if(this.props.appParams.from == 'it'){
            itTabClassName = `${prefixCls}-main-it`
        }
        /*
        if( this.props.appParams.orderActiveKey &&  this.props.appParams.orderActiveKey != orderActiveKey){
            this.props.saveOrderActiveKey(this.props.appParams.orderActiveKey )
            return null
        }
        */
        return (
            <div className={prefixCls}>

                <div className={`${prefixCls}-main ${itTabClassName}`}>
                    <Tabs type="card" className={`${prefixCls}-tabs`} onTabClick={::this.handleTabClick} activeKey={activeKey}>
                        <TabPane key="1" tab={tabStr}>
                            {
                                (()=>{
                                   if(activeKey !=1){
                                        return null
                                    }else{
                                        return  currentStep == 0 ? <MyYJ {...this.props} /> : this.setFinishView(prefixCls,otherProps)
                                    }
                                })()
                            }
                        </TabPane>
                        <TabPane key="3" tab='设置'>
                            {activeKey != 3 ? null : <Setting {...this.props} />}
                        </TabPane>
                        {((appInfo.get('id')==100 || appInfo.get('id')==1004 || appInfo.get('id')==104)&&!showOrder)?<TabPane key="12" tab='我的订单'>
                        {activeKey != 12 ? null : <Tabs onTabClick={::this.handleOrderTabClick} className={`${prefixCls}-order-tabs`} activeKey={orderActiveKey}><TabPane key='1' tab={appInfo.get('id') == 104 ? '汇算清缴订单' : '账无忌订单'}>{<MyOrder {...this.props} />}</TabPane>{appInfo.get('id') == 104 ? null : <TabPane key='2' tab='税无忌订单'>{<MyOrderSwy {...this.props} />}</TabPane>}</Tabs>}{/*<MyOrder {...this.props} />*/}
                        </TabPane>:''}
                        {((appInfo.get('id')==100 || appInfo.get('id')==104)&&showOrder)?<TabPane key="11" tab='订单详情'>
                        {activeKey != 11 ? null : <Order {...this.props} />}
                        </TabPane>:''}
                        {(appInfo.get('id')==100&&showOrderSwy)?<TabPane key="20" tab='订单详情'>
                        {activeKey != 20 ? null : <OrderSwy {...this.props} />}
                        </TabPane>:''}

                        {this.setManageTags()}

                    </Tabs>
                </div>

            </div>
        )
    }

    prev(){
        this.props.prev()
    }

    /**
     * [setShowCompoent 设置创建企业成功之后显示修改启用期间和会计准则的组件]
     * @param {[type]} showCompoent [显示哪个组件]
     */
    setShowCompoent(showCompoent){
        return ()=>{
            this.props.setShowCompoent(showCompoent)
        }
    }

    getIsSpecialIndustry(industry){
        /**
         * industry ID 说明（为了后期扩展其他行业做准备）
         * 1005 健康美容业
         * 1006 餐饮行业
         */
        /* if (!this.props.isDevelop){
            return false
        } */
        return industry > 1000
    }
    /**
     * 处理如果创建的是特殊行业直接跳转至实名认证页面
     * @param {*} orgInfo
     */
    handleAuthentication(orgInfo) {
        return () => {
            this.props.saveActiveKey('50', orgInfo)
        }
    }

    setFinishView(prefixCls,otherProps){
        let payload = otherProps.payload,
            utils = payload.get('utils'),
            getterByField = utils.get('getterByField'),
            orgs = getterByField('orgs'),
            createOrgId = getterByField('createOrgId'),
            appIdNum = getterByField('appId'),
            appInfo = getterByField('appInfo'),
            str = appIdNum==102?'服务商':'企业',
            accountingStandardsList = getterByField('accountingStandardsList'),
            createOrgInfo = orgs.find(org=>org.get('id')==createOrgId),//根据create接口返回的orgId去企业列表中查找新建的企业
            currIndustry = createOrgInfo.get('industry'),
            isShowEnabledYearComponent= getterByField('lastCreate.isShowEnabledYearComponent'),
            isShowAccountingStandardsComponent = getterByField('lastCreate.isShowAccountingStandardsComponent'),
            enabledYear = getterByField('lastCreate.enabledYear'),
            isShowEnabledYearSuccessInfo = getterByField('lastCreate.isShowEnabledYearSuccessInfo'),
            isShowAccountingStandardsSuccessInfo = getterByField('lastCreate.isShowAccountingStandardsSuccessInfo'),
            isSpecialIndustry = this.getIsSpecialIndustry(currIndustry),
            accountingStandards = getterByField('lastCreate.accountingStandards'),
            successInfoMargin = accountingStandards.get('id') == 19 ? '23px' : '0px',
            telNumber = '400-6060-386'
            
            if(appInfo && appInfo.get('id') == 1010){
                telNumber = appInfo.get('appServiceTel')
            }
        return(
            <div className={`${prefixCls}-finishView`}>
                <Consult />
                <div className={`${prefixCls}-center`}>
                    <img src={require("./img/finish.png")} alt=""/>
                    <h3>{isSpecialIndustry ? (currIndustry == 1008?'企业创建成功，成功上传《律师事务所执业许可证》购买后即可使用':'企业创建成功，成功上传营业执照购买后即可使用') : `恭喜您，${str}创建成功！`}</h3>
                    <div className={`${prefixCls}-orgName`}>
                        <p title={createOrgInfo.get('name')}>
                            <label>{str}名称：</label>
                            <span>{createOrgInfo.get('name')}</span>
                        </p>
                        <p>
                            <label>启用期间：</label>
                            {!isShowEnabledYearComponent ? <span>{enabledYear}</span> : <DynamicComponent _path='admin.lastCreate.formItems.enabledYear' componentInstance {...otherProps} />}
                            {!isShowEnabledYearComponent ? <ZIcon icon='edit' onClick={::this.setShowCompoent('isShowEnabledYearComponent')}/> : null}
                            {isShowEnabledYearSuccessInfo ? <span style={{ color: '#47C700', paddingLeft: '7px'}}>修改成功</span> : null}
                        </p>
                        <p>
                            <label>会计准则：</label>
                            
                            {!(currIndustry == 1005 || currIndustry == 1006 || currIndustry == 1007 || currIndustry == 1008 || currIndustry == 1009) ? <DynamicComponent _path='admin.lastCreate.formItems.accountingStandards' componentInstance {...otherProps} /> : <span>{accountingStandardsList.find(data => data.id == createOrgInfo.get('accountingStandards')).name}</span>}
                            {isShowAccountingStandardsSuccessInfo && !(currIndustry == 1005 || currIndustry == 1006) ? <span style={{ color: '#47C700', paddingLeft: '7px', marginTop: successInfoMargin }}>修改成功</span> : null}
                        </p>
                        {!(currIndustry == 1005 || currIndustry == 1006) ? <div style={{ color: '#DB6D35', textAlign: 'center' }}>注：请认真核实会计准则和启用期间，如有疑问请拨打：{telNumber}</div> : null}
                    </div>
                    <div className={`${prefixCls}-btns`}>
                        {isSpecialIndustry ? (currIndustry == 1008?<Button type="primary" onClick={::this.handleAuthentication(createOrgInfo)}>上传《律师事务所执业许可证》</Button>:<Button type="primary" onClick={::this.handleAuthentication(createOrgInfo)}>上传营业执照</Button> ) : <Button type="primary" onClick={::this.handleOrgClick(createOrgInfo)}>立即体验</Button>}

                        <Button onClick={::this.prev}>返回列表</Button>
                    </div>
                </div>

            </div>
        )
    }

    renderCommon(prefixCls, currentUserName, userImage,appInfo) {
        return (
            <SubMenu title={
                <span>
                    <img src={userImage} />
                    <span style={{paddingTop:15, left:63}}>{currentUserName}</span>
                    <ZIcon icon='jiantou-xiangxia' />
                </span>
              }>
                <Item key="logout">
                    <div className={`${prefixCls}-header-nav-li`}>
                        <i className={`${prefixCls}-header-nav-logout-icon`}/>
                        <span>退出</span>
                    </div>
                </Item>
            </SubMenu>
        )

    }
}
