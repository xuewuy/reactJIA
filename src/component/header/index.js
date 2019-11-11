import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Menu, Icon } from 'antd'
const SubMenu = Menu.SubMenu
const Item = Menu.Item

import styles from "./header.less"

export default class HeaderComponent extends Component {
    static defaultProps = {
        prefixCls: 'header'
    }
    handleToLandingClick(props){
        let getterByField = this.props.payload.getIn(['utils', 'getterByField']),
            appInfo = getterByField('appInfo')
        if(this.props.onLogoClick){
            this.props.onLogoClick(this.props.onRedirect)
        }else{
            let homeUrl = appInfo && appInfo.get('homeUrl') || "/"
            homeUrl = homeUrl+'?logout=true'
            if(document.location.hostname=='yj.rrtimes.com')homeUrl="https://www.rrtimes.com"
            location = homeUrl
        }
    }

    componentDidMount() {
        let getterByField = this.props.payload.getIn(['utils', 'getterByField']),
            appInfo = getterByField('appInfo'),
            linkArr = document.querySelectorAll('link[rel="shortcut icon"]')
        for(var i=0;i<linkArr.length;i++){
            let parentElement = linkArr[i].parentNode
            if(parentElement){
                parentElement.removeChild(linkArr[i])
            }
        }

        let head = document.getElementsByTagName('head')[0],
            link = document.createElement('link')

        link.setAttribute('rel','shortcut icon');
        if(appInfo){
            link.setAttribute('href',appInfo.get('iconUrl') || 'static/img/favicon.ico')
            document.title = `${appInfo.get('name')}_智能财税平台`
        }else {
            document.title = '易嘉人_智能财税平台'
            link.setAttribute('href','static/img/favicon.ico');
        }
        head.appendChild(link)
    }
    handleMenuClick(e) {
        if (e.key === 'logout') {//退出登录删除session
            sessionStorage.setItem('currentOrgId','')
            sessionStorage.setItem('dzOrgId','')
            sessionStorage.setItem('serviceProviderOrgId','')
            this.props.logout(()=> {
                this.props.removeAllTab()
                this.props.onLogoutSucess()
            })
        }
    }
    render() {
        let {prefixCls,props} = this.props,
            getterByField = this.props.payload.getIn(['utils', 'getterByField']),
            appInfo = getterByField('appInfo'),
            currentUser = getterByField('currentUser'),
            sex = getterByField('sex'),
            orgId = this.props.appParams.orgId,
            userImg  = '/static/images/default/defaultUserMen.svg',//portal页header用户头像
            logoImg = require('./img/logo.png'),
            orderStep = getterByField('orderStep'),
            logoText = orderStep == 1 ? '结算页':'收银台',
            header
            if(sex){
                if(sex1 == 0){
                    userImg = '/static/images/default/defaultUserMen.svg'
                }else if(sex1 == 1){
                    userImg = '/static/images/default/defaultUserGirl.svg'
                }else{
                    userImg = '/static/images/default/defaultUserMen.svg'
                }
            }
            if (appInfo) {
                // 这块后期可以统一从接口返回的图片中替换先暂时写死
                userImg = appInfo.get('setUserLogo') || userImg//portal页右上角用户头像
                logoImg = appInfo.get('logoUrlLogin') || logoImg//portal左上角logo
            }
            if(orgId){
                return (<header className={prefixCls}>
                            <div className={`${prefixCls}-logo`}>
                                <a href="javascript:;" onClick={::this.handleToLandingClick}>
                                    <img src={logoImg} />
                                    <span className="payLogoText">{logoText}</span>
                                </a>
                            </div>
                            <Menu onClick={::this.handleMenuClick}
                                mode="horizontal">
                                 <SubMenu title={
                                    <span>
                                        <img height="35" src={userImg} style={{marginRight:8}} />
                                        <span>{currentUser}</span>
                                        <Icon type='down'  className={`${prefixCls}-header-nav-downicon`}/>
                                    </span>
                                  }>

                                        <Item key="logout">
                                            <div className={`${prefixCls}-header-nav-li`}>
                                                <i className={`${prefixCls}-header-nav-logout-icon`}/>
                                                <div className="quit">
                                                    退出
                                                </div>
                                            </div>
                                        </Item>
                                    </SubMenu>
                            </Menu>
                        </header>)
            }else{
                if(appInfo && (appInfo.get('id') == 1000 || appInfo.get('id') == 1010)){
                    return (<header className={prefixCls}>
                        <div className={`${prefixCls}-logo`}>
                            <a href="javascript:;" onClick={::this.handleToLandingClick}>
                                <img src={logoImg} className="oemLogo"/>
                            </a>
                        </div>
                        <div className={`${prefixCls}-btn`}>
                            <a href="javascript:;" onClick={::this.handleToLandingClick}>{appInfo?appInfo.get('name'):''}官网</a>
                        </div>
                    </header>)
                }else{
                    return (<header className={prefixCls}>
                                <div className={`${prefixCls}-logo`}>
                                    <a href="javascript:;" onClick={::this.handleToLandingClick}>
                                        <img src={logoImg} />
                                        <span className="line">|</span>
                                        <span className="logoText">智能财税平台</span>
                                    </a>
                                </div>
                                <div className={`${prefixCls}-btn`}>
                                    <a onClick={::this.handleToLandingClick} href="javascript:;">易嘉人官网</a>
                                </div>
                            </header>)

                }
            }
    }
}


// if(appInfo && (appInfo.get('id') == 102 || appInfo.get('id') == 100 || appInfo.get('id') == 1001)){
//     return (<header className={prefixCls}>
//                 <div className={`${prefixCls}-logo`}>
//                     <a href="javascript:;" onClick={::this.handleToLandingClick}>
//                         <img src={logoImg} />
//                         <span className="line">|</span>
//                         <span className="logoText">智能财税平台</span>
//                     </a>
//                 </div>
//                 <div className={`${prefixCls}-btn`}>
//                     <a onClick={::this.handleToLandingClick} href="javascript:;">易嘉人官网</a>
//                 </div>
//             </header>)
// }else{
//     return (<header className={prefixCls}>
//                 <div className={`${prefixCls}-logo`}>
//                     <a href="javascript:;" onClick={::this.handleToLandingClick}>
//                         <img src={logoImg} className="oemLogo"/>
//                     </a>
//                 </div>
//                 <div className={`${prefixCls}-btn`}>
//                     <a href="javascript:;" onClick={::this.handleToLandingClick}>{appInfo?appInfo.get('name'):''}官网</a>
//                 </div>
//             </header>)
// }
