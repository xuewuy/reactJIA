import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Menu, Icon,Popover,ZIcon ,Input} from 'xComponent'
const SubMenu = Menu.SubMenu
const Item = Menu.Item
const MenuItemGroup = Menu.ItemGroup
import { Badge,Modal,Button } from 'antd';

import qrcode from '../../../utils/qrcode.js'

export default class PortalHeaderComponent extends Component {
    state = {
        visible: true
    }
    constructor(props) {
        super(props)
        this.state = {
            isLsAppCnIgnore:false
        }
    }
    render() {
        let {prefixCls} = this.props,
            menu = '导航',
            utils = this.props.payload.get('utils'),
            getterByField = utils.get('getterByField'),
            fromDz = getterByField('fromDz'),
            fromZf = getterByField('fromZf'),
            orgs = getterByField('orgs'),
            oldOrgs = getterByField('oldOrgs'),
            currentOrg = getterByField('currentOrg'),
            currentOrgType = currentOrg ? currentOrg.get('orgType') : '',
            currentUser = getterByField('currentUser'),
            sex = getterByField('sex'),
            showMenu = getterByField('showMenu'),
            isShowSearch = orgs.size > 7 ? true : false,
            appInfo = getterByField('appInfo'),
            appId = appInfo && appInfo.get('id'),
            helpDisplay = appId==100 || appId==102 || appId==1001 || appId == 1005 || appId == 1002 ? 'qqlive':'helpDisplay',
            wxercode = '/static/images/default/wxercode.png',//portal页header微信二维码
            logoImg = currentOrgType == 3 && appId == 103 ? '/static/images/default/new-yj-logo.png' : '/static/images/default/new-zwj-logo.png',//portal页header的logo
            homeUrl  = '/',//portal页header的logo
            identification = getterByField('identification'),//特殊处理请会计处理不出现企业列表
            version = getterByField('version') && getterByField('version').size > 0 && getterByField('version').toJS(),
            severalMessages = getterByField('severalMessages'),
            showOpenAccountManage = getterByField('showOpenAccountManage') ? getterByField('showOpenAccountManage'):'2',
            menus = getterByField('menus').toJS(),
            examine,
            dot = severalMessages ? 'true':'false',
            currentCreatorId = currentOrg && currentOrg.get('creator'),
            currentUserId = currentUser && currentUser.get('id'),
            industry = currentOrg && currentOrg.get('industry'),
            showTaxLink = getterByField('showTaxLink') && location.href.indexOf("?dev")!=-1,
            isShowQrCode = currentOrgType == 2 && currentCreatorId == currentUserId && appId == 100,
            isShowTingke = appId != 1010,
            visible = getterByField('feedbackVisible'),
            currentOrgId = sessionStorage['currentOrgId'],
            appCode = appId == 1010 ? require("./../img/99gxcmCode.png") : require("./../img/appCode.png"),
            expired,
            expiredTime,
            isLsAppCnIgnore = (
                (localStorage['isLsAppCnIgnore'] &&
                    localStorage['isLsAppCnIgnore'].indexOf(currentOrgId) != -1) ||
                getterByField('isLsAppCnIgnore')
            )

            expiredTime = currentOrg.toJS().expireTime
            if((new Date(expiredTime)).getTime()-new Date().getTime() <= 0){
                expired = true
            }else {
                expired = false
            }

            
        if (industry === 1006 && appId !== 103){
            logoImg = '/static/images/default/cyLogoImg.png'//餐饮的portal页header的logo
        }
        /**
         * [if 如果是oem登录进来的更换oem相对应的图片]
         * @param  {[type]} appInfo &&            appInfo.size > 0 [description]
         * @return {[type]}         [description]
         */
        for(var i = 0;i < menus.length; i++) {
            if(menus[i].id==1020){
                examine='立即查看'
                break
            }else{
                examine=''
            }
        }
        if (appInfo && appInfo.size > 0) {
            // 这块后期可以统一从接口返回的图片中替换先暂时写死
            wxercode = appInfo.get('qrCodeWx') || wxercode//portal页微信公众号的二维码
            homeUrl = appInfo.get('homeUrl') || homeUrl
        }
        if(location.hostname=="yj.rrtimes.com" && homeUrl != '#'){
            homeUrl="https://www.rrtimes.com/"
        }
        if(appId==102){
            homeUrl=homeUrl+'#dz'
        }else if(appId == 1005 || appId == 1001){
            homeUrl = 'javascript:;'
        }else if(appId==1010){
            homeUrl=homeUrl
        }else{
            homeUrl=homeUrl+'#qy'
        }
        if(appId==1010){
            logoImg = appInfo.get('logoUrlPortal')
        }

        setTimeout(() => {
            this.handleAppCnHide()
        }, 10000)
        let content = (
                <div className="codeImg">
                    <p>{appId == 1010 ? '新华99' : '账无忌'}移动应用1.0</p>
                    <img src={appCode} alt=""/>
                    <p>扫描二维码下载安装</p>
                    {appId != 1010 ? <a href="https://www.rrtimes.com/appDetails.html" target="_blank">了解详情</a> : null}
                </div>
            )
        return (
            <header className={`${prefixCls}-header`}>
                <div className={`${prefixCls}-header-logo`}>
                    {
                        showMenu ?
                            (<div>
                                <a href={homeUrl}><img src={logoImg}/></a>
                                <div className={`${prefixCls}-header-toggle`} onClick={::this.handleToggleMenuVisible}>
                                    <Icon type='left' className={`${prefixCls}-header-toggle-left`}/>
                                </div>
                            </div>)
                        :
                            (<div className={`${prefixCls}-header-toggle`} onClick={::this.handleToggleMenuVisible}>
                                <Icon type='right' className={`${prefixCls}-header-toggle-right`}/>
                            </div>)
                    }

                    <Menu
                        onClick={::this.handleMenuClick}
                        selectedKeys={['org-' + currentOrg.get('id')]}
                        ref='orgMenu'
                        className={`${prefixCls}-header-orgMenu`}
                        onOpenChange={::this.handleMenuOpenChange}
                    >
                        {this.renderOrgs(prefixCls, oldOrgs, orgs, currentOrg, isShowSearch)}
                    </Menu>
                </div>
                {
                    expired?<div style={{lineHeight:'58px',marginLeft:'-200px',fontSize: '16px',color:'#F9E37E'}}>当前账套已过期，如需续费请联系400-6060-386</div>:null
                }
                
                <div className={`${prefixCls}-header-nav`} id='portal-header-nav'>

                    {
                        currentOrgType != 3 && fromZf ? 
                            (<Popover overlayClassName={`${prefixCls}-text-message`} placement="bottom" content='返回集团版'>
                                <ZIcon icon={'first-level'} onClick={::this.handleBackHome(fromZf) } />
                            </Popover>) 
                        : 
                        null
                    }

                    {currentOrgType == 2 && fromDz ? this.renderBackHome(oldOrgs, orgs) : ''}

                    {
                        !(appId == 100 || appId == 1010) || industry === 1009 ? 
                            '' 
                        : 
                            (<div className={`${prefixCls}-appCode`}>
                                <Popover overlayClassName={`${prefixCls}-appCodeImg`} placement="bottom" content={content}>
                                    <div className="appIcon">
                                        <ZIcon icon={'label-New'} />
                                        <ZIcon icon={'yidongduan'} />
                                    </div>
                                </Popover>
                                {isLsAppCnIgnore?null:<div className={`${prefixCls}-appCn`}>
                                    <div className='appImg'>
                                        <span onClick={::this.handleAppCnEverHide}></span>
                                    </div>
                                </div>}
                            </div>)
                    }
                    
                    {/*当当前登录的是企业端的时候才显示更新提示*/}
                    {(()=>{
                        if (appId==103 && currentOrgType==3 || currentOrgType == 2 && currentOrg || currentOrgType == 1){
                            // 只有是企业端的时候//消息
                            return(
                                <Badge dot={severalMessages && dot=='true'}   className={`${prefixCls}-header-message portal-messageCenter`}>
                                    <Popover overlayClassName={`${prefixCls}-text-message`} placement="bottom" content='消息'>
                                        <ZIcon icon={'xiaoxi2'} onClick={::this.handleMessageCenter} />
                                    </Popover>
                                    {version && version.isShow==true && showOpenAccountManage == '2' && severalMessages && dot=='true'? <div className={`${prefixCls}-header-message-content`}>
                                        <div className={`${prefixCls}-arrow`}></div>
                                        <div className={`${prefixCls}-header-message-title textCenter`}>
                                            <div><ZIcon onClick={::this.handleCloseMessageContent} icon={'close'} /></div>
                                        </div>
                                        <p>{version.sysVersion.versionTitle}</p>
                                        <div className={`${prefixCls}-header-message-btns`}>
                                            <a href="javascript:;" onClick={::this.handleOpenAccountManage}>
                                                <span>{examine}</span>
                                            </a>
                                        </div>
                                    </div> : null}

                                </Badge>
                            )
                        }else{
                            return null
                        }
                    })()}
                    {isShowTingke?(<Popover overlayClassName={`${prefixCls}-text-message`} placement="bottom" content='听课'>
                        <ZIcon icon={'tingke'} onClick={::this.handleClassroomClick} />
                    </Popover>):null}
                    <Popover overlayClassName={`${prefixCls}-text-message`} placement="bottom" content='帮助'>
                        <a target="_blank" className={helpDisplay} onClick={::this.handleMenuClick1}>
                            <ZIcon icon={'bangzhuzhongxin1'} />
                        </a>
                    </Popover>
                    {isShowQrCode ? <div className={`${prefixCls}-wxCode`}>
                        <ZIcon icon={'tuijianyoujiang'}/>
                        <div id='protal-QrCode'>
                            <span>扫描二维码分享给好友</span>
                            <img className={'qrCode-logo'} src={require('../img/wxlogo.png')} width='30' height='30'  alt=""/>
                        </div>
                    </div> : null}
                    <Menu
                        mode="horizontal"
                        onClick={::this.handleMenuClick}>
                        {this.renderCommon(prefixCls, currentUser,sex)}
                    </Menu>
                </div>
                <Modal
                  visible={visible}
                  title="意见收集"
                  footer={[
                    <Button key="back" onClick={::this.handleCancel}>取消</Button>,
                    <Button key="submit" type="primary" onClick={::this.handleOk}>
                      提交
                    </Button>,
                  ]}
                  onCancel = {::this.handleCancel}
                >
                  <div><textArea ref = "feedbackText" style ={{
                      height:'150px',
                      width:'100%',
                      defaultValue :'',
                      border:'1px solid #e9e9e9',
                      borderRadius: "4px",
                      padding:"10px",
                      textIndent:"2em",
                      outline: "none",
                      resize:"none"
                  }} rows={4} placeholder = "请输入反馈内容" maxLength={500}></textArea></div>
                </Modal>
            </header>
        )
    }
    showModal(){
        this.props.feedbackVisibleCtr(true)
    }
    handleCancel(){
        this.props.feedbackVisibleCtr(false)
    }
    handleOk(){
        let val = this.refs.feedbackText.value
        this.props.feedbackVisibleCtr(false,val,()=>{
            this.refs.feedbackText.value=''
        })
    }
    handleMenuClick(e) {
        let utils = this.props.payload.get('utils'),
            getterByField = utils.get('getterByField'),
            disableMenus = getterByField('disableMenus'),
            appInfo = getterByField('appInfo'),
            appId = sessionStorage.getItem('appId')!='undefined'?sessionStorage.getItem('appId'):appInfo.get('id'),
            initData = appInfo ? {
                appInfo : appInfo
            } : null
        if (e.key === 'logout') {//退出登录删除session
            sessionStorage.setItem('currentOrgId','')
            sessionStorage.setItem('dzOrgId','')
            sessionStorage.setItem('serviceProviderOrgId','')
            sessionStorage.setItem('appId',null)
            this.props.logout(()=> {
                this.props.removeAllTab()
                let onlineServiceUrl = appInfo && appInfo.get('onlineServiceUrl') || false
                this.props.onLogoutSucess(onlineServiceUrl)
            })
        }
        else if (e.key === 'myYJ') {
            this.props.removeAllTab()
            this.props.onRedirect('apps/login/admin',true)
        }
        else if (e.key.indexOf('org-') != -1) {
            this.props.removeAllTab()
            this.props.toggleOrg(e.key.replace('org-', ''),undefined)
        }
        else if (e.key === 'setting') {
            this.props.addTab('个人设置', 'apps/systemSetting/safetyInformation', {initData})
        }
        else if (e.key === 'about') {
            // console.log('about menu clicked')
            // this.props.showHelp()

        }
        else if (e.key === 'help') {
            //操作流程
            this.props.setShowGettingStarted()
        }
        else if (e.key === 'flowChart'){
            //教学版流程图
            this.props.setShowGettingStarted({ isFlowChart:true })
        }
        else if(e.key == 'feedback'){
            this.showModal()
        } else if (e.key === 'myExam'){
            this.props.addTab('我的考试', 'apps/tools/myExam')
        }
    }
    getHelpType(industry, appInfo, industryVersion){
        let type = ''
        if(appInfo.get('id') == 1005){
            type = '?type=hx'
        }else{
            if (industry == 1006 && industryVersion == 1){
                type = '?type=cy'
            }else if(industry == 1005){
                type = '?type=jkmr'
            }
        }
        return type
    }
    handleAppCnHide(){
        let portalAppCn = document.querySelector('.portal-appCn')
        if(portalAppCn){
            portalAppCn.classList.add("portal-appCnHide")
        }
    }
    handleAppCnEverHide(){
        this.props.isLsAppCnIgnore() 
    }
    handleMenuClick1(e) {
        let utils = this.props.payload.get('utils'),
            getterByField = utils.get('getterByField'),
            currentOrg = getterByField('currentOrg'),
            industry = currentOrg && currentOrg.get('industry'),
            appInfo = getterByField('appInfo'),
            // homeUrl = window.location.origin,
            // helpUrl = homeUrl+'/help/help.html'
            homeUrl = appInfo && appInfo.get('homeUrl') || "/",
            mainUrl = homeUrl.split('default')[0],
            endChars = mainUrl.charAt(mainUrl.length-1),
            industryVersion = getterByField('industryVersion'),
            helpType = this.getHelpType(industry, appInfo, industryVersion),
            helpUrl = endChars=='/' ? (mainUrl+'help.html'+ helpType) : mainUrl+'/help.html'+helpType
        if(homeUrl=='#'){
            helpUrl = 'https://www.rrtimes.com/help.html'+helpType
        }
        window.open(helpUrl);
    }
    componentDidMount(){
        let utils = this.props.payload.get('utils'),
            getterByField = utils.get('getterByField'),
            currentOrg = getterByField('currentOrg'),
            currentUser = getterByField('currentUser'),
            currentOrgType = currentOrg ? currentOrg.get('orgType') : '',
            appInfo = getterByField('appInfo'),
            appId = appInfo && appInfo.get('id') ? appInfo.get('id') : sessionStorage.getItem('appId'),
            currentCreatorId = currentOrg && currentOrg.get('creator'),
            currentUserId = currentUser && currentUser.get('id'),
            industry = currentOrg && currentOrg.get('industry'),
            isShowQrCode = currentOrgType == 2 && currentCreatorId == currentUserId && appId == 100 
            //餐饮业邀请好友不显示

        if(isShowQrCode){
            this.getQrCode()
        }
    }
    getQrCode(){
        let qr2 = new qrcode(document.getElementById('protal-QrCode'),{
            width: 120,
            height: 120
        })
        let utils = this.props.payload.get('utils'),
            getterByField = utils.get('getterByField'),
            imgPath = getterByField('authentication.imgPath'),
            uri = 'http://192.168.20.196:8088/activity.html#activity?memo=',
            qrCode = getterByField('qrCode'),
            protocol = window.location.protocol
        if(window.location.href.indexOf('dev') != -1){
            uri = protocol+'//dev.rrtimes.com/mobile/activity.html#activity?memo='
        }else if(window.location.href.indexOf('test') != -1){
            uri = protocol+'//mtest.rrtimes.com/activity.html#activity?memo='
        }else{
            uri = protocol+'//m.rrtimes.com/activity.html#activity?memo='
        }
        if(qrCode){
            qr2.makeCode(uri+qrCode)
        }

    }
    handleClassroomClick(e){
        let utils = this.props.payload.get('utils'),
            getterByField = utils.get('getterByField'),
            appInfo = getterByField('appInfo'),
            homeUrl = appInfo && appInfo.get('homeUrl') || "/",
            mainUrl = homeUrl.split('default')[0],
            endChars = mainUrl.charAt(mainUrl.length-1),
            calssroomUrl = endChars=='/'?mainUrl+'classroom.html':mainUrl+'/classroom.html'
        if(homeUrl=='#'||homeUrl=='https://www.zhwuji.com/'){
            calssroomUrl = 'https://www.rrtimes.com/classroom.html'
        }
        window.open(calssroomUrl);
    }
    handleToggleMenuVisible() {
        this.props.toggleMenuVisible()
    }

    handleSearchTextChange(e) {
        // this.setState({searchText:e.target.value})
    }
    getTooltipContainer(){
        return document.getElementById('portal-header-nav')
    }
    handleClickDz() {
        let utils = this.props.payload.get('utils'),
            getterByField = utils.get('getterByField'),
            currentOrgId = getterByField('currentOrgId')
        this.props.toggleOrg(currentOrgId)

    }
    componentDidUpdate(){
        let dom = ReactDOM.findDOMNode(this.refs.orgMenu)
        let utils = this.props.payload.get('utils'),
            getterByField = utils.get('getterByField'),
            fromDz = getterByField('fromDz'),
            index = fromDz ? 1 : 2,
            currentOrg = getterByField('currentOrg'),
            currentUser = getterByField('currentUser'),
            currentOrgType = currentOrg ? currentOrg.get('orgType') : '',
            currentCreatorId = currentOrg && currentOrg.get('creator'),
            currentUserId = currentUser && currentUser.get('id'),
            industry = currentOrg && currentOrg.get('industry'),
            appInfo = getterByField('appInfo'),
            appId = appInfo && appInfo.get('id') ? appInfo.get('id') : sessionStorage.getItem('appId'),
            isShowQrCode = currentOrgType == 2 && currentCreatorId == currentUserId && appId == 100
        if(dom && $($(dom).find('li')).find('ul').length > 0){
            // 在这里处理没有企业管理权限的时候
            if($($(dom).find('li')).find('ul').find('li')[index]){
                $($(dom).find('li')).find('ul').find('li')[index].className = 'ant-menu-item ant-menu-item-active'
                $($(dom).find('li')).find('ul').find('li')[index].focus()
            }
        }
        if(isShowQrCode){
            $('#protal-QrCode').find("img[alt='Scan me!']").remove()
            $('#protal-QrCode').find('canvas').remove()
            this.getQrCode()
        }
    }

    handleMenuKeydown(e){
        if(e.keyCode == 13){
            if(e.target.className.indexOf('ant-menu-root') != -1 || e.target.className.indexOf('searchOrg') != -1){
                document.querySelector('.ant-menu-item-active') && document.querySelector('.ant-menu-item-active').click()
                e.stopPropagation()
                e.preventDefault()
            }
        }
    }
    handleMenuOpenChange(e){
        let dom = ReactDOM.findDOMNode(this.refs.orgMenu)
        if(document.removeEventListener){
            dom.removeEventListener('keydown',this.handleMenuKeydown)
        }else if(document.detachEvent){
            dom.detachEvent('onkeydown',this.handleMenuKeydown)
        }else{

        }
        if(e.length >= 1){
            dom.focus()
            if(document.addEventListener){
                dom.addEventListener('keydown',this.handleMenuKeydown)
            }else if(document.attachEvent){
                dom.addEventListener('onkeydown',this.handleMenuKeydown)
            }else{
            }
        }
    }
    handleShowUpdateInfo(){
        this.props.showSyatemUpdate()
    }
    handleMessageCenter(){
        this.props.showMessageCenter()
    }
    handleCloseMessageContent(){
        this.props.closeVersionTips()
    }


    handleOpenAccountManage(){
        this.props.showOpenAccountManage()
    }
    handleCloseVersionTips(){
        this.props.closeVersionTips()
    }
    handleTaxClick() {
        this.props.openIts()
    }
    handleTaxIntroduceClick() {
        window.open('https://www.rrtimes.com/finalSettlement.html')
    }
    renderFavorite(prefixCls) {
        return (
            <SubMenu title={
                <div className={`${prefixCls}-header-nav-favo`}>
                    <i className={`${prefixCls}-header-nav-favo-icon`} />
                </div>
            }>
            </SubMenu>
        )
    }
    handleSearchMenuTextChange(e){
        this.props.searchMenuTextChange(e.target.value)
    }

    renderOrgs(prefixCls, oldOrgs,orgs, currentOrg,isShowSearch) {
        let utils = this.props.payload.get('utils'),
            getterByField = utils.get('getterByField'),
            fromDz = getterByField('fromDz'),
            disableMenus = getterByField('disableMenus'),
            orgSearchValue = getterByField('orgSearchValue'),
            isShowOrgAdmin = disableMenus && disableMenus.size > 0 && disableMenus.find(o=> o.get('id') == '10001'),//是否显示企业管理
            appInfo = getterByField('appInfo'),
            appId = sessionStorage.getItem('appId')!='undefined'?sessionStorage.getItem('appId'):appInfo.get('id'),
            titleStr = appId==102?'服务商':'企业',
            groupList = getterByField('groupList'),
            oldGroupList = getterByField('oldGroupList')
        return (
            <SubMenu className={`${prefixCls}-header-orgList`} title={
                <div className={`${prefixCls}-header-nav-org`}>
                    <ZIcon icon='liebiao' />
                    <p title={currentOrg.get('name')}>{currentOrg.get('name')}</p>
                </div>
            }>
                {(currentOrg.get('orgType')==2&&appId==102) || isShowOrgAdmin ? null :(
                    <Item key='myYJ' className={`${prefixCls}-header-nav-myYJ`}  title={`${titleStr}管理`}>
                        <i className={`${prefixCls}-header-nav-myYJ-icon`}/>
                        {titleStr}管理
                        <Icon type='right' className={`${prefixCls}-header-nav-myYJ-right`}/>
                    </Item>
                )}
                {isShowSearch?<MenuItemGroup title={
                    <div style={{padding:'0px',background:'#fff'}}>
                        <Input placeholder={`搜索${titleStr}`} className='searchOrg' value={orgSearchValue} onChange={::this.handleSearchMenuTextChange}
                        />
                        <i className={`${prefixCls}-left-span-i`}/>
                    </div>
                } /> : oldOrgs && oldOrgs.size > 0 && <Item
                    className={`${prefixCls}-header-list-title`} style={{ color: '#aaa', background: '#fff', fontSize: '12px', height: '18px', lineHeight: '18px', marginLeft: '4px' }}>
                    {titleStr}列表
                </Item>}
                {oldOrgs.map((org, index)=>{
                    // if(  !(org.get('expired')||( org.get('orgType')==1&&org.get('status')==0) )  ){
                    if(  !(( org.get('orgType')==1&&org.get('status')==0) )  ){
                        if(org.get('expired')){
                            return (
                                <Item className='expiredText' key={'org-' + org.get('id')} title={org.get('name')}>
                                    {org.get('expired')?(<i className={'orgTypeCustomer1'} />):(org.get('orgType') == 1 ? (<i className={'orgTypeCompany'} />) : (<i className={'orgTypeCustomer'} />)) }
                                    {org.get('name')}
                                    {currentOrg.get('id') === org.get('id') ? (
                                        <Icon style={{ marginLeft: 8, fontSize: 'small' }} type='check' />) : ''}
                                </Item>
                            )
                        }else {
                            return (
                                <Item  key={'org-' + org.get('id')} title={org.get('name')}>
                                    {org.get('expired')?(<i className={'orgTypeCustomer1'} />):(org.get('orgType') == 1 ? (<i className={'orgTypeCompany'} />) : (<i className={'orgTypeCustomer'} />)) }
                                    {org.get('name')}
                                    {currentOrg.get('id') === org.get('id') ? (
                                        <Icon style={{ marginLeft: 8, fontSize: 'small' }} type='check' />) : ''}
                                </Item>
                            )
                        }
                        
                    }
                })}
                {appInfo.get('id') == 103 && oldGroupList && oldGroupList.size > 0 ? 
                    <MenuItemGroup>
                        <Item
                            className={`${prefixCls}-header-list-title`} style={{ color: '#aaa', background: '#fff', fontSize: '12px', height: '18px', lineHeight: '18px', marginLeft: '4px' }}>
                            集团列表
                        </Item>
                        {oldGroupList.map((org, index) => {
                            // if (!(org.get('expired') || (org.get('orgType') == 3 && org.get('orgStatus') == 2))) {
                            if (!((org.get('orgType') == 3 && org.get('orgStatus') == 2))) {
                                if(org.get('expired')){
                                    return (
                                        <Item className='expiredText' key={'org-' + org.get('id')} title={org.get('name')}>
                                            {org.get('expired')?(<i className={'orgTypeCustomer1'} />):(<i className={'orgTypeCustomer'} />)}
                                            {org.get('name')}
                                            {currentOrg.get('id') === org.get('id') ? (
                                                <Icon style={{ marginLeft: 8, fontSize: 'small' }} type='check' />) : ''}
                                        </Item>
                                    )
                                }else {
                                    return (
                                        <Item key={'org-' + org.get('id')} title={org.get('name')}>
                                            {org.get('expired')?(<i className={'orgTypeCustomer1'} />):(<i className={'orgTypeCustomer'} />)}
                                            {org.get('name')}
                                            {currentOrg.get('id') === org.get('id') ? (
                                                <Icon style={{ marginLeft: 8, fontSize: 'small' }} type='check' />) : ''}
                                        </Item>
                                    )
                                }
                            }
                        })}
                    </MenuItemGroup>
                : null}
            </SubMenu>
        )
    }

    handleBackHome(e) {
        return ()=>{
            sessionStorage.setItem('serviceProviderOrgId','')
            sessionStorage.setItem('dzOrgId','')
            sessionStorage.setItem('zfOrgId', '')
            this.props.toggleOrg(e,{companyToDz:true})
        }
    }

    renderBackHome(oldOrgs,orgs) {
        let getterByField = this.props.payload.getIn(['utils','getterByField']),
            fromDz = getterByField('fromDz'),
            fromDzTabData = getterByField('fromDzTabData'),
            fromDzName = getterByField('fromDzName')
        fromDzName = fromDzName == '我的桌面' || fromDzName == '首页' || !fromDzName ? '返回财税服务管理平台' : `返回${fromDzName}`
        return(
            <Popover overlayClassName={`portal-text-message`} placement="bottom" content={fromDzName}>
                <div className={'portal-header-nav-back-home'} onClick={::this.handleBackHome(fromDz)}>
                    <ZIcon icon={'first-level'} />
                    <div>{fromDzName}</div>
                </div>
            </Popover>
        )
    }


    renderNotifications(prefixCls) {
        return (
            <SubMenu title={
            <div className={`${prefixCls}-header-nav-li`}>
                <i className={`${prefixCls}-header-nav-msg-icon`}/>
            </div>
        }>
                <Item key='noti-khgj'>
                    客户跟进提醒
                </Item>
                <Item key='noti-xqdqq'>
                    续签到期前提醒
                </Item>
                <Item key='noti-xqdq'>
                    续签到期提醒
                </Item>
                <Item key='noti-sf'>
                    收费提醒
                </Item>
                <Item key='noti-qk'>
                    欠款提醒
                </Item>
                <Item key='noti-zdy'>
                    自定义提醒
                </Item>
            </SubMenu>
        )
    }

    renderOnlineServie(prefixCls) {
        return (
            <SubMenu title={
            <div className={`${prefixCls}-header-nav-li`}>
                <i className={`${prefixCls}-header-nav-online-icon`}/>
            </div>
        }>
                <Item key='service-qq'>
                    <div className={`${prefixCls}-header-nav-li`}>
                        <i className={`${prefixCls}-header-nav-message-icon`}/>
                        <div>
                            QQ沟通
                        </div>
                    </div>
                </Item>
                <Item key='service-phone'>
                    <div className={`${prefixCls}-header-nav-li`}>
                        <i className={`${prefixCls}-header-nav-phone-icon`}/>
                        <div>
                            电话咨询
                        </div>
                    </div>
                </Item>
                <Item key='service-person'>
                    <div className={`${prefixCls}-header-nav-li`}>
                        <i className={`${prefixCls}-header-nav-manual-icon`}/>
                        <div>
                            人工服务
                        </div>
                    </div>
                </Item>
            </SubMenu>
        )
    }

// <span >欢迎您</span>
    renderCommon(prefixCls, currentUser,sex) {
        let utils = this.props.payload.get('utils'),
            getterByField = utils.get('getterByField'),
            currentOrg = getterByField('currentOrg'),
            industry = currentOrg && currentOrg.get('industry'),
            hasGettingStartedAuth = getterByField('hasGettingStartedAuth'),
            disableMenus = getterByField('disableMenus'),
            safetyInformation = getterByField('safetyInformation'),
            appInfo = getterByField('appInfo'),
            appId = sessionStorage.getItem('appId')!='undefined'?sessionStorage.getItem('appId'):appInfo.get('id'),
            isShowPerSetting = disableMenus && disableMenus.size > 0 && disableMenus.find(o=> o.get('id') == '10000'),//是否显示个人设置
            userImg,
            industryVersion = industry == 1006 && getterByField('industryVersion') == 2
            if(safetyInformation==1){
                let sex1 = currentUser ? currentUser.get('sex') : ''
                if(sex1 == 0){
                    userImg = '/static/images/default/defaultUserMen.svg'
                }else if(sex1 == 1){
                    userImg = '/static/images/default/defaultUserGirl.svg'
                }else{
                    userImg = '/static/images/default/defaultUserMen.svg'
                }
            }else{
                if(sex == 0){
                    userImg = '/static/images/default/defaultUserMen.svg'
                }else if(sex == 1){
                    userImg = '/static/images/default/defaultUserGirl.svg'
                }else{
                    userImg = '/static/images/default/defaultUserMen.svg'
                }
            }

        return (
            <SubMenu className={`${prefixCls}-subMenu`} title={
                <span>
                    <img height="30" src={userImg} style={{marginRight:10}} />
                    <span style={{left:63}}>{currentUser?currentUser.get('name'): ''}</span>
                    <ZIcon icon='jiantou-xiangxia' />
                </span>
            }>
                {!isShowPerSetting && appId != 1002 && appId != 1008 ? //餐饮业1002;通过和谷创建的账套1008隐藏个人设置
                <Item key="setting">
                    <div className={`${prefixCls}-header-nav-li`}>
                        <i className={`${prefixCls}-header-nav-setting-icon`}/>
                        <div>
                            个人设置
                        </div>

                    </div>
                </Item> : null}
                {(hasGettingStartedAuth == true || industryVersion) && industry !== 1009 ? //餐饮业隐藏操作流程、房地产行业隐藏操作流程
                <Item key="help">
                    <div className={`${prefixCls}-header-nav-li`}>
                        <i className={`${prefixCls}-header-nav-help-icon`}/>
                        <div>
                         操作流程
                        </div>
                    </div>
                </Item>:null}
                {(window.location.href.indexOf('?edu') != -1 || location.host.indexOf("edu") == 0 || location.host.indexOf("jx") == 0) && hasGettingStartedAuth == true || industryVersion ? //餐饮业隐藏流程图
                    <Item key="flowChart">
                        <div className={`${prefixCls}-header-nav-li`}>
                            <i className={`${prefixCls}-header-nav-beginnerGuidance-icon`} />
                            <div>
                                流程图
                        </div>
                        </div>
                    </Item> : null}
                <Item key="feedback">
                    <div className={`${prefixCls}-header-nav-li`}>
                        <i className={`${prefixCls}-header-nav-feedback-icon`}/>
                        <div>
                            意见收集
                        </div>

                    </div>
                </Item>
                {window.location.href.indexOf('?px') != -1 || location.host.indexOf("px")==0 ? (
                    <Item key="myExam">
                        <div className={`${prefixCls}-header-nav-li`}>
                            <i className={`${prefixCls}-header-nav-myExam-icon`} />
                            <div>
                                我的考试
                        </div>
                        </div>
                    </Item>
                ) : null}
                {appId != 1008 ? //通过和谷创建的账套1008隐藏
                    <Item key="logout">
                        <div className={`${prefixCls}-header-nav-li`}>
                            <i className={`${prefixCls}-header-nav-logout-icon`}/>
                            <div>
                                退出
                            </div>
                        </div>
                    </Item> : null }
            </SubMenu>
        )

    }
}