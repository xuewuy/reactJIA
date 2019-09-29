import React, { Component, PropTypes } from 'react'
import DynamicComponent from 'dynamicComponent'
import { Button, Menu, Table, Dropdown, Column, Popover, Cell,Input, Card, Modal, ZIcon, Icon, Consult} from 'xComponent'
import CreateOrgForm from './createOrg'
import CreateOrgAfter from './createOrgAfter'
import UpdatePasswordForm from './updatePassword'
import moment from 'moment'
import { getter } from '../action';
const SubMenu = Menu.SubMenu
const Item = Menu.Item

export default class MyYJComponent extends Component {

    handleShowCreateOrg() {
        this.props.showCreateOrg()
    }

    handleDeleteOrg(props, orgs) {
        return () => {
            let org = orgs.get(props.rowIndex)
            this.props.deleteOrg(org)
        }
    }
    handlePayOrg(props, orgs) {
        return () => {
            let rowIndex = props.rowIndex,
                orgId = orgs.toJS()[rowIndex].id,
                url = window.location.protocol + '//' + window.location.host + '/#apps/login/order?orgId=' + orgId
            window.open(url)
        }
    }

    handleUnpaidOrder(props, orgs,productId) {
        return () => {
            let rowIndex = props.rowIndex,
                orgInfo = orgs.toJS()[rowIndex],
                orgId = orgs.toJS()[rowIndex].id,
                maxOrgCount = orgs.toJS()[rowIndex].maxOrgCount,
                url = window.location.protocol + '//' + window.location.host + '/#apps/login/order?orgId=' + orgId
                /**
                 * 2019.1.19汇算清缴在线订单 add by zhaoshuo
                 */
                if(orgInfo.appId == 104){
                    url = window.location.protocol + '//' + window.location.host + '/?h=its#apps/login/order?orgId=' + orgId
                }
            if(maxOrgCount && maxOrgCount == 29 && productId == '3'){
                Modal.info({
                    title: '温馨提示~',
                    content: (
                      <div>
                        <p>购买账套总数30套及以上有更多优惠哦，请电话联系我们：400-6060-386</p>
                      </div>
                    ),
                    onOk() {},
                });
            }else{
                this.props.handleCheckUnpaidOrder(props, orgId, this.handlePayOrg(props,orgs),url,productId)
            }

        }

    }
    // handleBuyServicePersonal(props, orgs,type){
    //     return ()=>{
    //         debugger
    //         if(type=='buy'){
    //
    //         }else if(type=="add"){
    //
    //         }else if(type == 'rebuy'){
    //
    //         }
    //         let rowIndex = props.rowIndex,
    //             orgId = orgs.toJS()[rowIndex].id,
    //             url = window.location.protocol + '//' + window.location.host + '/#apps/login/order?orgId=' + orgId
    //
    //
    //         // this.props.handleBuyServicePersonal(props, orgId,type, this.handlePayOrg(props,orgs),url)
    //     }
    // }
    handleOrgClick(props, orgs) {
        return (e) => {
            if (e.preventDefault)
                e.preventDefault()
            if (e.stopPropagation)
                e.stopPropagation()

            let org = orgs.get(props.rowIndex)
            if (window.location.href.indexOf('?h=its') != -1) {
                this.props.toIts(org)
            } else {
                this.props.changeOrg(org, (data) => {
                    if (data.result) {
                        this.props.onRedirect('apps/portal', true)
                    }
                })
            }
        }
    }

    handleCreateGenerationAccount(isPersonal) {
        return ()=>{
            this.props.createGenerationAccount(isPersonal)
        }
    }

    handleCreateOrg() {
        this.props.createOrg()
    }
    handleSearchOrgClick(sortType) {
        this.props.searchOrgClick(sortType.key)
    }
    findElem(arrayToSearch, attr, val) {
        arrayToSearch = arrayToSearch.toJS()
        for (var i = 0; i < arrayToSearch.length; i++) {
            if (arrayToSearch[i][attr] == val) {
                return i;
            }
        }
        return -1;
    }
    getComponentInstances() {
        return {
            search: <i className={`${this.props.prefixCls}-search-i`}></i>
        }
    }

    handleStartExamClick(){
        this.props.setExamModalVisible(true)
    }

    handleSwitchOrgList(status){
        return ()=>{
            this.props.switchOrgList(status)
        }
    }

    render() {
        let utils = this.props.payload.get('utils'),
            getterByField = utils.get('getterByField'),
            orgs = getterByField('orgs'),
            groupList = getterByField('groupList'),
            oldGroupList = getterByField('oldGroupList'),
            oldOrgList = getterByField('oldOrgList'),
            orgType = getterByField('orgType'),
            userId = getterByField('userId'),
            myYjTableTitle = getterByField('myYjTableTitle'),
            message = this.props.payload.getIn(['global', 'message'])
        if (!orgs) return null
        let isShowCreateOrg = getterByField('isShowCreateOrg'),
            createOrgAfter = getterByField('createOrgAfter'),
            isPersonal = getterByField('isPersonal'),
            regCodeStatus = getterByField('regCodeStatus'),
            isShowUpdatePassword = (regCodeStatus===0),
            isServiceProvider = getterByField('isServiceProvider'),
            { prefixCls, ...otherProps } = this.props,
            height = myYjTableTitle == 'group' ? (groupList.size) * 50 + 32 : (orgs.size) * 50 + 32,
            isHidden = '',
            isOrange = 'orange-btn',
            isShowSearch = getterByField('isShowSearch'),
            currentServerTime = getterByField('currentServerTime'),
            appId = sessionStorage.getItem('appId')!='undefined'?sessionStorage.getItem('appId'):getterByField('appId'),
            sumWidth = appId == 102 ? 1160 : 1170,
            // sumWidth = appId == 102 ? 1080 : 900,
            flexContent = appId == 102 ? 'flex-end' : 'space-between',
            adminHeaderHeight = $('.admin-header').height()?$('.admin-header').height():58,
            myYJTableTopHeight = $('.admin-myYJ-table-top').height()?$('.admin-myYJ-table-top').height():88,
            listTitle = $('.admin-myYJ-list-title').height() ? $('.admin-myYJ-list-title').height() : 40

        // isShowUpdatePassword = true
        // height = height > 430 ? 430 : height
        let contentHeight = appId == 103 ? document.body.clientHeight - adminHeaderHeight - myYJTableTopHeight - listTitle - 66 : document.body.clientHeight - adminHeaderHeight - myYJTableTopHeight - 66
        height = contentHeight > height ? height : contentHeight
        if(isServiceProvider!=true) {
            isHidden = 'isHidden'
            isOrange = ''
        }
        let disableMenus = getterByField('disableMenus'),
            orgCreateId = '10002',//企业管理-创建id
            orgCreateIndex = disableMenus && disableMenus.size > 0 ? this.findElem(disableMenus, "id", orgCreateId) : -1,
            orgDelId = '10003',//企业管理-删除id
            orgDelIndex = disableMenus && disableMenus.size > 0 ? this.findElem(disableMenus, "id", orgDelId) : -1,
            remind = { remind: false, sum: 0 },//即将过期的账套
            expired = { expired: false, sum: 0 },//已经过期的账套
            appInfo = getterByField('appInfo'),
            examModalVisible = getterByField('examModalVisible'),
            orgNum = myYjTableTitle == 'group' ? groupList.size : orgs.size
        oldOrgList.map((org, index) => {
            let expireTime = moment(org.get('expireTime')).add(1, 'days').format('YYYY-MM-DD'),
                subtractTime = moment(org.get('expireTime')).subtract(11, 'days').format('YYYY-MM-DD'),
                isExpire = moment(currentServerTime).isBetween(subtractTime, expireTime)
            if (org.get('expired')) {//已经过期
                expired = { expired: true, sum: expired.sum + 1 }
            }
            if (isExpire) {//即将过期
                remind = { remind: true, sum: remind.sum + 1 }
            }
        })
        return (
            <div className={`${prefixCls}-myYJ`} style={{ height: '100%' }}>
                <Consult />
                <div className={`${prefixCls}-myYJ-table`} style={{ width: sumWidth }}>
                    <div className={`${prefixCls}-myYJ-table-top`}>
                        {(() => {
                            if (appId == 104) {
                                return (<div className={`${prefixCls}-myYJ-remind`}>
                                    <ZIcon icon='modal-warn' />
                                    <span>亲！欢迎使用汇算清缴功能，如需咨询或购买请联系我们的工作人员，客服电话 ：400-6060-386</span>
                                </div>)
                            }
                            if (expired.expired) {
                                return (<div className={`${prefixCls}-myYJ-remind`}>
                                    <ZIcon icon='modal-warn' />
                                    <span>您有{expired.sum}个{appId == 102 ? '服务商' : '企业'}账套已过期，如有需要请尽快联系我们的工作人员购买，客服电话：{appInfo ? appInfo.get('appServiceTel') || '17319162004' : '17319162004'}</span>
                                </div>)
                            } else if (remind.remind) {
                                return (<div className={`${prefixCls}-myYJ-remind`}>
                                    <ZIcon icon='modal-warn' />
                                    <span>您有{remind.sum}个{appId == 102 ? '服务商' : '企业'}账套即将过期，如有需要请尽快联系我们的工作人员购买，客服电话：{appInfo ? appInfo.get('appServiceTel') || '17319162004' : '17319162004'}</span>
                                </div>)
                            } else {
                                return null
                            }
                        })()}
                        <div className={`${prefixCls}-myYJ-table-filters`} style={{ justifyContent: flexContent }}>
                            {appId == 102 ? null : <div className={`${prefixCls}-myYJ-header-left`}>
                                <div className={`${prefixCls}-myYJ-table-title`}>
                                    {isShowSearch ? [
                                        <span key='value2' >已创建企业</span>,
                                        <DynamicComponent key='1' _path='admin.searchOrg' {...otherProps} componentInstances={this.getComponentInstances()} />
                                    ] : [<span key='value2' >已创建企业</span>]}
                                </div>
                                <Dropdown overlay={this.getSortBtn()}>
                                    <Button zIcon='sort' title='排序' className={`${prefixCls}-sort`} />
                                </Dropdown>
                        </div>}
                        {appInfo.get('id') == 103 ? null : 
                            <div className={`${prefixCls}-myYJ-header-right`}>
                                {(() => {
                                    if (orgCreateIndex && orgCreateIndex == -1) {
                                        if (appId == 102) {
                                            return (
                                                <div>
                                                {/*<Button type="primary" onClick={::this.handleCreateGenerationAccount(true)}>创建个人代账版</Button>*/}
                                                    <Button type="primary" onClick={::this.handleCreateGenerationAccount()}>创建财税服务商</Button>
                                                </div>

                                        )
                                        }else{
                                            return (<Button type="primary" onClick={::this.handleCreateOrg}>创建企业</Button>)
                                        }
                                    }else{
                                        return null
                                    }
                                })()}
                                {window.location.href.indexOf('?px') != -1 || location.host.indexOf("px")==0 ? <Button type="primary" className={`${prefixCls}-myYJ-header-right-myExam`} onClick={::this.handleStartExamClick}>开始考试</Button> : null}
                                {this.renderExamModal(examModalVisible)}
                            </div>
                        }
                    </div>
                </div>
                {appInfo.get('id') == 103 ? 
                    <div className={`${prefixCls}-myYJ-list-title`}>
                        <div className={`${prefixCls}-myYJ-list-title-left`}>
                            <div className={`${prefixCls}-myYJ-list-title-btn ${myYjTableTitle == 'org' ? 'admin-myYJ-list-title-btn-active':''}`} onClick={::this.handleSwitchOrgList('org')}>企业管理</div>
                            <div className={`${prefixCls}-myYJ-list-title-btn ${myYjTableTitle == 'group' ? 'admin-myYJ-list-title-btn-active':''}`} onClick={::this.handleSwitchOrgList('group')}>集团管理</div>
                        </div>
                        <div className={`${prefixCls}-myYJ-list-title-right`}>
                            {myYjTableTitle == 'org' ? <Button type="primary" onClick={::this.handleCreateOrg}>创建企业</Button> : <Button type="primary" onClick={::this.handleCreateOrg}>创建集团</Button>}
                        </div>
                    </div>
                : null}
                {myYjTableTitle == 'org' ? 
                    <Table
                        rowsCount={orgs.size}
                        rowHeight={50}
                        headerHeight={30}
                        height={height}
                        width={sumWidth}>
                        {this.getColumns(prefixCls, orgs, orgDelIndex)}
                    </Table>
                : <Table
                    rowsCount={groupList.size}
                    rowHeight={50}
                    headerHeight={30}
                    height={height}
                    width={sumWidth}>
                    {this.getGroupColumns(prefixCls, groupList, orgDelIndex)}
                </Table>}
                
                {orgNum <= 0 ? <div style={{width: 'max-content',textAlign: 'center',margin: '50px auto'}}>
                    <img src={require('../img/list_default.png')} width='170' height='150' alt=""/>
                    <p style={{ paddingTop: '10px' }}>{myYjTableTitle == 'group' ? '亲~，您还没有创建集团，快快创建体验哟~' : '亲~，您还没有创建企业，快快创建体验哟~'}</p>
                </div> : null}
			</div>
            { this.renderCreateOrg(isShowCreateOrg) }
            { this.renderUpdatePassword(isShowUpdatePassword) }

            {
                createOrgAfter?
                this.renderCreateOrgAfter(isShowCreateOrg):null
            }

  			</div>

    	)
    }

    getSortBtn() {
        let { prefixCls, ...otherProps } = this.props,
            utils = this.props.payload.get('utils'),
            getterByField = utils.get('getterByField'),
            sortActive = getterByField('sortActive')
        return (
            <Menu onClick={::this.handleSearchOrgClick}>
                <Menu.Item key="o.expireTime DESC">
                    <div className={sortActive == 'o.expireTime DESC' ? `${prefixCls}-sort-item-active` : ''}>
                        <span>截止日期从大到小</span>
                        {sortActive == 'o.expireTime DESC' ? <Icon type="check" /> : null}
                    </div>
                </Menu.Item>
                <Menu.Item key="o.expireTime ASC">
                    <div className={sortActive == 'o.expireTime ASC' ? `${prefixCls}-sort-item-active` : ''}>
                        <span>截止日期从小到大</span>
                        {sortActive == 'o.expireTime ASC' ? <Icon type="check" /> : null}
                    </div>
                </Menu.Item>
                <Menu.Item key="CONVERT(o.name USING gbk) ASC">
                    <div className={sortActive == 'CONVERT(o.name USING gbk) ASC' ? `${prefixCls}-sort-item-active` : ''}>
                        <span>企业名称A-Z</span>
                        {sortActive == 'CONVERT(o.name USING gbk) ASC' ? <Icon type="check" /> : null}
                    </div>
                </Menu.Item>
                <Menu.Item key="CONVERT(o.name USING gbk) DESC">
                    <div className={sortActive == 'CONVERT(o.name USING gbk) DESC' ? `${prefixCls}-sort-item-active` : ''}>
                        <span>企业名称Z-A</span>
                        {sortActive == 'CONVERT(o.name USING gbk) DESC' ? <Icon type="check" /> : null}
                    </div>
                </Menu.Item>
            </Menu>
        )
    }

getLocalTime(nS) {
    let D = new Date(parseInt(nS));
    if (!nS) return ''
    return D.getFullYear() + "年" + (D.getMonth() + 1) + "月" + D.getDate() + '日\n' + D.getHours() + ':' + D.getMinutes() + ':' + D.getSeconds()
}

handleAuthentication(orgInfo){
    return ()=>{
        this.props.saveActiveKey('50',orgInfo)
    }
}
/**
 * 获取进入账套的权限
 */
getOrgIsDisable(orgInfo){
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
        orgStatus = orgInfo.get('orgStatus'),//当前实名认证的状态
        orgType = orgInfo.get('orgType'),//当前的企业类型，1代账端 2企业端
        isSpecialIndustry = industry > 1000//是否是特殊行业
    //屏蔽特殊行业的创建，只有在?dev的开发环境下才可以进入账套
    if (isSpecialIndustry) {
        //特殊行业的控制
        return !( orgStatus > 0 && orgStatus < 3)
    } else {
        //正常行业的控制
        return expired || (orgType == 1 && status == 0)
    }
}
/**
 * 获取实名认证的权限
 */
getAuthenticationIsDisable(orgInfo, userId){
    /**
     * 针对特殊行业实名认证的有规则：
     * 是否是特殊行业：1005 健康美容业  1006餐饮行业 为特殊行业
     * 1.只有实名认证通过的,实名认证的状态: 0待认证;1认证已通过;2认证审核中;3认证未通过
     * 实名认证状态为 1 或者 2 或者 创建者不是自己 置灰
     */
    let industry = orgInfo.get('industry'),//当前所属行业
        status = orgInfo.get('status'),//当前实名认证的状态
        creator = orgInfo.get('creator'),//当前企业创建者id
        isSpecialIndustry = industry == 1005 || industry == 1006//是否是特殊行业
    return creator != userId
}

getPurchaseStatus(orgInfo, userId){
    /**
     * 针对特殊行业立即订购的规则：
     * 是否是特殊行业：1005 健康美容业  1006餐饮行业 为特殊行业
     * 1.只有实名认证通过的,实名认证的状态: 0待认证;1认证已通过;2认证审核中;3认证未通过
     * 特殊行业只能实名认证通过之后才能购买
     */
    let industry = orgInfo.get('industry'),//当前所属行业
        status = orgInfo.get('status'),//当前实名认证的状态
        creator = orgInfo.get('creator'),//当前企业创建者id
        orderStatus = orgInfo.get('orderStatus'),//订单状态
        isSpecialIndustry = industry > 1000//是否是特殊行业
    // if (window.location.href.indexOf('?dev') > -1){
        if (isSpecialIndustry) {
            return !(creator == userId && orderStatus == 0 && (status == 1 || orgInfo.get('expireTime')))
        } else {
            return !(creator == userId && orderStatus == 0)
        }
    // }else{
    //     return !(creator == userId && orderStatus == 0)
    // }
}

getStatusText(orgInfo){
    /**
     * 针对特殊行业不能进入账套的提示语：
     * 是否是特殊行业：1005 健康美容业  1006餐饮行业 为特殊行业
     * 1.只有实名认证通过的,实名认证的状态: 0待认证;1认证已通过;2认证审核中;3认证未通过
     */
    let utils = this.props.payload.get('utils'),
        getterByField = utils.get('getterByField'),
        industry = orgInfo.get('industry'),//当前所属行业
        status = orgInfo.get('status'),//当前实名认证的状态
        orgStatus = orgInfo.get('orgStatus'),//企业状态
        weatherNewBuy = orgInfo.get('weatherNewBuy'),//购买状态
        isSpecialIndustry = industry > 1000,//是否是特殊行业
        expireTime = orgInfo.get('expireTime'),
        appId = getterByField('appInfo.id'),
        statusText ={
            0: { text:'待认证',color:'#999'},
            1: { text: '正常', color:'#00CC00'},
            2: { text: '认证审核中', color:'#F39812'},
            3: { text: '认证未通过', color:'#FF686F'}
        },
        orgStatusText ={
            0: { text:'未知状态',color:'#999'},
            1: { text: '试用', color:'#F39812'},
            2: { text: '正常', color:'#00CC00'},
            3: { text: '过期', color:'#FF686F'}
        },
        groupStatusText ={
            0: { text:'未知状态',color:'#999'},
            1: { text: '待审核', color:'#F39812'},
            2: { text: '正常', color:'#00CC00'},
            3: { text: '过期', color:'#FF686F'}
        },
        text = '',
        color = ''
    if (isSpecialIndustry) {//是否是特殊行业
        if (expireTime){
            text = orgStatusText[orgStatus].text
            color = orgStatusText[orgStatus].color
        }else{
            text = status == 1 && !weatherNewBuy ? '已认证通过未购买' : statusText[status].text
            color = statusText[status].color
        }
    }else if( appId == 104){//汇算清缴暂时写死为正常
        text = orgStatusText[2].text
        color = orgStatusText[2].color
    }else{//普通行业
        text = orgStatusText[orgStatus].text
        color = orgStatusText[orgStatus].color
    }

    //集团总分特殊控制
    if(appId == 103){
        text = groupStatusText[orgStatus].text
        color = groupStatusText[orgStatus].color
    }

    return (
        <p style={{ fontSize: '12px', textAlign:'center' }}>
            <span style={{ border: `3px solid ${color}`, borderRadius: '50%', display: 'inline-block', marginRight: '2px' }}></span>
            <span>{text}</span>
        </p>
    )
}

getDisableText(orgInfo){
    let industry = orgInfo.get('industry'),//当前所属行业
        status = orgInfo.get('status'),//当前实名认证的状态
        weatherNewBuy = orgInfo.get('weatherNewBuy'),//购买状态
        isSpecialIndustry = industry > 1000,//是否是特殊行业
        isDisable = this.getOrgIsDisable(orgInfo),
        disableText = '亲，特定行业需上传营业执照，购买后才能使用'
    if (!isDisable || !isSpecialIndustry){
        disableText = orgInfo.get('name')
    }
    return disableText
}

handleEditDzOrgName(rowIndex){
    return () => this.props.editDzOrgName(rowIndex)
}
handleUpdateDzOrgNameChange(rowIndex){
    return (e) => {
        this.props.updateDzOrgNameChange(e.target.value, rowIndex)
    }
}

handleCloseUpdateDzOrgNameClick(rowIndex){
    return () => this.props.closeUpdateDzOrgName(rowIndex)
}

handleUpdateDzOrgNameSuccess(rowIndex){
    return () => this.props.updateDzOrgNameSuccess(rowIndex)
}

getDisplayComopnent(orgInfo, props, orgs){
    let utils = this.props.payload.get('utils'),
        getterByField = utils.get('getterByField'),
        appInfo = getterByField('appInfo'),
        appId = appInfo && appInfo.get('id'),
        nameCellWidth = appId == 102 ? '187px' : '263px',
        updateNameStatus = orgInfo.get('updateNameStatus')
    if(orgInfo.get('orgType')==1){
        if (updateNameStatus){
            return (
                <div className={`${this.props.prefixCls}-dzOrg`}>
                    <Input value={orgInfo.get('name')} maxLength={100} onChange={::this.handleUpdateDzOrgNameChange(props.rowIndex)} />
                    <div>
                        <ZIcon icon='success' onClick={::this.handleUpdateDzOrgNameSuccess(props.rowIndex)} />
                        <ZIcon icon='error' onClick={::this.handleCloseUpdateDzOrgNameClick(props.rowIndex)} />
                    </div>
                </div>
            )
        }else{
            return (
                <div className={`${this.props.prefixCls}-dzOrg`} /* style={{ display: 'flex', justifyContent:'space-evenly'}} */>
                    {/* <a disabled={this.getOrgIsDisable(orgInfo)} onClick={::this.handleOrgClick(props, orgs)} style = {{ 'whiteSpace': 'nowrap','textAlign':'left', 'textOverflow': 'ellipsis', 'overflow': 'hidden', 'width': nameCellWidth, 'display': 'block' }} title = { orgInfo.get('name') } > { orgInfo.get('name') }</a> */}
                    <a  onClick={::this.handleOrgClick(props, orgs)} style = {{ 'whiteSpace': 'nowrap','textAlign':'left', 'textOverflow': 'ellipsis', 'overflow': 'hidden', 'width': nameCellWidth, 'display': 'block' }} title = { orgInfo.get('name') } > { orgInfo.get('name') }</a>
                <ZIcon icon='edit' onClick={::this.handleEditDzOrgName(props.rowIndex)} />
                </div>
            )
        }
    }else{
        return (
            // <a disabled={appId == 104 ? false : this.getOrgIsDisable(orgInfo)} onClick={::this.handleOrgClick(props, orgs)} style = {{ 'whiteSpace': 'nowrap','textAlign':'left', 'textOverflow': 'ellipsis', 'overflow': 'hidden', 'width': nameCellWidth, 'display': 'block' }} title = { orgInfo.get('name') } > { orgInfo.get('name') }</a>
            <a onClick={::this.handleOrgClick(props, orgs)} style = {{ 'whiteSpace': 'nowrap','textAlign':'left', 'textOverflow': 'ellipsis', 'overflow': 'hidden', 'width': nameCellWidth, 'display': 'block' }} title = { orgInfo.get('name') } > { orgInfo.get('name') }</a>
        )
    }
}

getGroupColumns(prefixCls, groupList, orgDelIndex){
    let utils = this.props.payload.get('utils'),
        getterByField = utils.get('getterByField'),
        userId = getterByField('userId')
    return [
        <Column
            key='rowIndex'
            header={(<Cell>序号</Cell>)}
            width={40}
            cell={props => (
                <Cell style={{textAlign:'center'}}>
                    {props.rowIndex+1}
                </Cell>
            )}
        />,
        <Column
            key='name'
            header={(<Cell>集团名称</Cell>)}
            width={200}
            cell={props => (
                <Cell className='orgName-column' title={groupList.getIn([props.rowIndex, 'name'])}>
                    {/* <a disabled={groupList.getIn([props.rowIndex, 'orgStatus']) != 2} onClick={::this.handleOrgClick(props, groupList)} style = {{ 'whiteSpace': 'nowrap','textAlign':'left', 'textOverflow': 'ellipsis', 'overflow': 'hidden', 'width': '200px', 'display': 'block' }} title = { groupList.getIn([props.rowIndex, 'name']) } > { groupList.getIn([props.rowIndex, 'name']) }</a> */}
                    <a onClick={::this.handleOrgClick(props, groupList)} style = {{ 'whiteSpace': 'nowrap','textAlign':'left', 'textOverflow': 'ellipsis', 'overflow': 'hidden', 'width': '200px', 'display': 'block' }} title = { groupList.getIn([props.rowIndex, 'name']) } > { groupList.getIn([props.rowIndex, 'name']) }</a>
                </Cell>
            )}
        />,
        <Column
            key='createTime'
            header={(<Cell>注册时间</Cell>)}
            width={200}
            cell={props => (
                <Cell className='orgName-column' title={groupList.getIn([props.rowIndex, 'createTime'])}>
                    {groupList.getIn([props.rowIndex, 'createTime'])}
                </Cell>
            )}
        />,
        <Column
            key='expireTime'
            header={(<Cell>到期时间</Cell>)}
            width={200}
            cell={props => (
                <Cell className='orgName-column' title={groupList.getIn([props.rowIndex, 'expireTime'])}>
                    {groupList.getIn([props.rowIndex, 'expireTime'])}
                </Cell>
            )}
        />,
        <Column
            key='maxOrgCount'
            header={(<Cell>可汇总账套数</Cell>)}
            width={200}
            cell={props => (
                <Cell className='orgName-column' title={groupList.getIn([props.rowIndex, 'maxOrgCount'])}>
                    {groupList.getIn([props.rowIndex, 'maxOrgCount'])}
                </Cell>
            )}
        />,
        <Column
            key='orgStatus'
            header={(<Cell>状态</Cell>)}
            width={200}
            cell={props => (
                <Cell className='orgName-column' title={groupList.getIn([props.rowIndex, 'orgStatus'])}>
                    {this.getStatusText(groupList.getIn([props.rowIndex]))}
                </Cell>
            )}
        />,
        <Column
            key='operation'
            header={(<Cell>操作</Cell>)}
            width={130}
            cell={props => (
                <Cell className='orgName-column'>
                    <Button
                        type="dashed"
                        disabled={groupList.getIn([props.rowIndex, 'creator']) != userId}
                        className={`${prefixCls}-myYJ-cancel`}
                        onClick={::this.handleDeleteOrg(props, groupList)}
                    >
                        删除
                    </Button>
                </Cell>
            )}
        />
    ]
}


getColumns(prefixCls, orgs, orgDelIndex){
    // 版本类型  1专业版
    //           2普及版
    // 注册类型  1代账公司
    //           2企业用户

    //           3个人代账
    let utils = this.props.payload.get('utils'),
        getterByField = utils.get('getterByField')
    var userId = getterByField('userId'),
        // appId = sessionStorage.getItem('appId'),
        appInfo = getterByField('appInfo'),
        appId = appInfo && appInfo.get('id'),
        nameWidth = appId == 102 ? 220 : 280,
        nameCellWidth = appId == 102 ? '203px' : '263px',
        expireTimeWidth = appId == 102 ? 100 : 180,
        lastLoginTimeWidth = appId == 102 ? 150 : 180,
        subscibeWidth = appId == 102 ? 100 : 180,
        statusWidth = appId == 102 ? 90 : 0,
        orgWidth = appId == 102 ? 110 : 0,
        sumOrgWidth = appId == 102 ? 100 : 0,
        curDate = moment(new Date()),
        currentOrgType = getterByField('currentOrgType'),
        redPackageCountText = (
            <div style={{fontSize:'12px',color:'#454545'}}>
                <p style={{ color:'#FEA728'}}>如何获得红包?</p>
                <p>1. 点击【实名认证】</p>
                <p>2. 微信扫描二维码成功邀请好友注册即可获得红包</p>
            </div>
        )
    //汇算清缴不显示最后登录时间
    if(appId == 104){
        lastLoginTimeWidth = 0
    }
    return [<Column
                key='rowIndex'
                header={(<Cell>序号</Cell>)}
                width={40}
                cell={props => (
                    <Cell style={{textAlign:'center'}}>
                        {props.rowIndex+1}
                    </Cell>
                )}
            />,
            <Column
                key='name'
                header={(<Cell>{appId == 102 ? '服务商名称' : '企业名称'}</Cell>)}
                width={nameWidth}
                cell={props => (
                    <Cell className='orgName-column' style={{textAlign:'left'}} title={this.getDisableText(orgs.getIn([props.rowIndex]))}>
                        {this.getDisplayComopnent(orgs.getIn([props.rowIndex]), props, orgs)}
                    </Cell>
                )}
            />,
            <Column
                key='status'
                header={(<Cell>状态</Cell>)}
                width={appId == 102 ? 0 : 130}
                cell={props => (
                    <Cell>
                        {this.getStatusText(orgs.getIn([props.rowIndex]))}
                    </Cell>)
                }
            />,
    		<Column
                key='expireTime'
                header={(<Cell>截止日期</Cell>)}
                width={expireTimeWidth}
                cell={props => (
                    <Cell>
                        {orgs.getIn([props.rowIndex, 'expireTime']) && orgs.getIn([props.rowIndex, 'expireTime']).split(' ')[0]}
                    </Cell>)
                }
            />,
            <Column
                key='orgStatus'
                header={(<Cell>状态</Cell>)}
                width={statusWidth}
                cell={props => (
                    <Cell>
                        {orgs.getIn([props.rowIndex, 'expired']) ? '已过期' : (orgs.getIn([props.rowIndex, 'status']) == 0 ? '待审核' : '审核通过')}
                    </Cell>)
                }
            />,
            <Column
                key='totalOrg'
                header={(<Cell>已创建账套数</Cell>)}
                width={orgWidth}
                cell={props => (
                    <Cell>
                        {orgs.getIn([props.rowIndex, 'totalOrg'])||0}
                    </Cell>)
                }
            />,
            <Column
                key='useableOrgCount'
                header={(<Cell>可用账套数量</Cell>)}
                width={orgWidth}
                cell={props => (
                    <Cell>
                        {(orgs.getIn([props.rowIndex, 'maxOrgCount']) ? orgs.getIn([props.rowIndex, 'maxOrgCount']) : 0) - (orgs.getIn([props.rowIndex, 'totalOrg']) ? orgs.getIn([props.rowIndex, 'totalOrg']) : 0)}
                    </Cell>)
                }
            />,
            <Column
                key='maxOrgCount'
                header={(<Cell>总账套数量</Cell>)}
                width={sumOrgWidth}
                cell={props => (
                    <Cell>
                        {orgs.getIn([props.rowIndex, 'maxOrgCount'])}
                    </Cell>)
                }
            />,
            <Column
                key='lastLoginTime'
                header={(<Cell>最后登录时间</Cell>)}
                width={lastLoginTimeWidth}
                cell={props => (
                    <Cell>
                        {orgs.getIn([props.rowIndex, 'lastLoginTime'])}
                    </Cell>)
                }
            />,
            <Column
                key='redPackageCount'
                header={(<Cell>
                    <span>红包数量</span>
                    <Popover content={redPackageCountText} placement="right" overlayClassName={`${prefixCls}-code`}>
                        <ZIcon icon='help-solid' />
                    </Popover>
                </Cell>)}
                width={appId == 100 ? 100 : 0}//红包数量的宽度
                cell={props => (
                    <Cell onClick={::this.handleAuthentication(orgs.getIn([props.rowIndex]))}>
                        <a href='javascript:;' title={'点击马上领红包'} style={{ color:'#3EABE8'}}>
                            {orgs.getIn([props.rowIndex, 'redPackageCount'])}
                        </a>
                    </Cell>)
                }
            />,
            <Column
                key='version'
                header={(<Cell>版本</Cell>)}
                // width={100}//先隐藏这一列
                width={0}
                cell={props => (
                    <Cell>
                        试用版
                    </Cell>)
                }
            />,
            <Column
                key='orgType'
                header={(<Cell>企业类型</Cell>)}
                // width={100}//先隐藏这一列
                width={0}
                cell={props => (
                    <Cell>
                        {orgs.getIn([props.rowIndex, 'orgType']) == 1 ? '代账机构' : orgs.getIn([props.rowIndex, 'orgType']) == 2 ? '企业' : '个人'}
                    </Cell>)
                }
            />,
    		<Column
                key='subscibe'
                flexGrow={1}
                header={(<Cell>订阅</Cell>)}
                width={subscibeWidth}
                cell={props => (
                    <Cell>
                        {appId == 100 ? <Button
                            type="dashed"
                            onClick={::this.handleAuthentication(orgs.getIn([props.rowIndex]))}
                            className={`${prefixCls}-myYJ-authentication`}
                            disabled={::this.getAuthenticationIsDisable(orgs.getIn([props.rowIndex]),userId)}
                            >
                            {orgs.getIn([props.rowIndex,'status'])==1 ? '已实名认证' :'实名认证'}
                        </Button> : null}
                        {appId == 100 || appId == 104 ? <Button
                            type="dashed"
                            visible ={(orgs.getIn([props.rowIndex, 'orgType']) == 1 || !(appId == 100 || appId == 104) ) ? false : true}
                            className={`${prefixCls}-myYJ-buy`}
                            onClick={::this.handleUnpaidOrder(props, orgs)}
                            disabled = {::this.getPurchaseStatus(orgs.getIn([props.rowIndex]),userId)}
                            title = {(orgs.getIn([props.rowIndex, 'creator']) == userId&&orgs.getIn([props.rowIndex, 'orderStatus']) != 0)?'已存在未支付订单，请到我的订单中进行支付':''}
                        >
    						{orgs.getIn([props.rowIndex, 'weatherNewBuy'])==0?'立即订购':'续购'}
                        </Button> : null}
                        {/*appId == 104 ? <Button
                            type="dashed"
                            className={`${prefixCls}-myYJ-buy`}
                            onClick={::this.handleUnpaidOrder(props, orgs)}
                            disabled = {::this.getPurchaseStatus(orgs.getIn([props.rowIndex]),userId)}
                            title = {(orgs.getIn([props.rowIndex, 'creator']) == userId&&orgs.getIn([props.rowIndex, 'orderStatus']) != 0)?'已存在未支付订单，请到我的订单中进行支付':''}
                        >
    						{orgs.getIn([props.rowIndex, 'weatherNewBuy'])==0?'立即订购':'续购'}
    					</Button> : null*/}
                        {
                            // (function(){
                            // //     debugger
                            // //     let a = orgs.getIn([props.rowIndex]).toJS()
                            // // })()
                            //
                            // (
                            //     appId == 102  &&
                            //     orgs.getIn([props.rowIndex, 'requiredOrgCount']) =='0~29账套' &&
                            //     orgs.getIn([props.rowIndex, 'maxOrgCount']) > 0 &&
                            //     orgs.getIn([props.rowIndex, 'maxOrgCount']) <= 29
                            // ) ?
                            // (
                            //     [
                            //         // <Button
                            //         //     type="dashed"
                            //         //     width={50}
                            //         //     disabled={orgs.getIn([props.rowIndex, 'creator']) != userId}
                            //         //     className={`${prefixCls}-myYJ-buyP`}
                            //         //     onClick={::this.handleUnpaidOrder(props, orgs,orgs.getIn([props.rowIndex, 'weatherNewBuy']) ? orgs.getIn([props.rowIndex, 'orgStatus']):1)}
                            //         // >
                            //         //     {orgs.getIn([props.rowIndex, 'weatherNewBuy'])==0?'购买':'续购'}
                            //         // </Button>,
                            //         // <Button
                            //         //     type="dashed"
                            //         //     visible={orgs.getIn([props.rowIndex, 'orgStatus']) =='2'}
                            //         //     disabled={orgs.getIn([props.rowIndex, 'creator']) != userId}
                            //         //     className={`${prefixCls}-myYJ-buy`}
                            //         //     onClick={::this.handleUnpaidOrder(props, orgs,'3')}
                            //         // >
                            //         //     增购账套
                            //         // </Button>
                            //     ]
                            // ):null
                        }

    					{

                            //只有创建者创建的账套或者服务版账套不能删除
    					    orgDelIndex && orgDelIndex == -1 ?
                            <Button
                                type="dashed"
                                disabled={orgs.getIn([props.rowIndex, 'creator']) != userId || orgs.getIn([props.rowIndex, 'version']) == 3}
                                className={`${prefixCls}-myYJ-cancel`}
                                onClick={::this.handleDeleteOrg(props, orgs)}
                            >
                                删除
                            </Button> : null
    					}
            				</Cell>
            			)}
        />

    	]
    }
renderExamModal(examModalVisible){
    let { prefixCls } = this.props,
        hendlePracticalExamClick = ()=>{
            this.props.setExamModalVisible(false)
            this.props.createOrg()
        },
        handleFiscalExamClick = ()=>{
            this.props.setExamModalVisible(false)
            this.props.onRedirect('apps/tools/onlineExam',true)
        },
        hendleCancelClick = ()=>{
            this.props.setExamModalVisible(false)
        }
    return (
        <Modal
            visible={examModalVisible}
            type='modal'
            width={640}
            className={`${prefixCls}-exam-modal`}
            onCancel={hendleCancelClick}
            maskClosable={false}
            footer={<div></div>}
        >
            <h1>请选择您的考卷</h1>
            <div className={`${prefixCls}-exam-modal-btns`}>
                <div onClick={hendlePracticalExamClick} title="第一场  “账无忌”软件实操考试">
                    <img src={require('../img/PracticalExam.png')} alt="第一场  “账无忌”软件实操考试"/>
                    <p>第一场  “账无忌”软件实操考试</p>
                </div>
                <div onClick={handleFiscalExamClick} title="第二场  财税基础知识考试">
                    <img src={require('../img/FiscalExam.png')} alt="第二场  财税基础知识考试" />
                    <p>第二场  财税基础知识考试</p>
                </div>
            </div>
        </Modal>
    )
}
renderCreateOrgAfter(){
    let onOk = () => { this.props.createOrgAfterClose() }
    return (
        <Modal
            visible
            type='modal'
            width={400}
            okText='知道了'
            className='createorgafter'
            onOk={onOk}
            maskClosable={false}
            footer={<div>
                <Button type='primary' onClick={onOk}>知道了</Button>
            </div>}
        >
            <CreateOrgAfter  />
        </Modal>
    )

}
renderCreateOrg(isShowCreateOrg){
    if (!isShowCreateOrg) return null

    let onOk = () => { this.props.createOrgOk() },
        onCancel = () => { this.props.createOrgCancel() },
        utils = this.props.payload.get('utils'),
        getterByField = utils.get('getterByField'),
        isPersonal = getterByField('isPersonal'),
        myYjTableTitle = getterByField('myYjTableTitle'),
        appInfo = getterByField('appInfo'),
        appId = appInfo.get('id') ? appInfo.get('id') : sessionStorage.getItem('appId')!='undefined'?sessionStorage.getItem('appId'):getterByField('appId'),
        titleStr = myYjTableTitle == 'group' ? '创建集团' : appId == 102 ?'创建服务商' : '创建企业',
        isDisabled = getterByField('createOrg.isDisabled'),
        modalTitleComponent = (
            <div className='admin-createOrg-modalTitle'>
                <div>{titleStr}</div>
                {appId == 102 || appId == 103 ? null : <p>提示：各地税法政策有差异，请准确选择地区。</p>}
            </div>
        )


    return (
        <Modal
            visible
            type='modal'
            // title={titleStr}
            title={modalTitleComponent}
            width={400}
            okText='创建'
            onOk={onOk}
            maskClosable={false}
            footer={<div>
                <Button type='ghost' onClick={onCancel}>取消</Button>
                <Button type='primary' disabled={appId == 102 || appId == 103 ? false : isDisabled} onClick={onOk}>创建</Button>
            </div>}
            onCancel={onCancel}
        >
            <CreateOrgForm {...this.props} initData={{ myYjTableTitle}}/>
        </Modal>
    )
}
    renderUpdatePassword(isShowUpdatePassword){
        if (!isShowUpdatePassword) return null



        let onOk = () => { this.props.updatePasswordOk() },
            utils = this.props.payload.get('utils'),
            getterByField = utils.get('getterByField')


        return (
            <Modal
                visible
                type='modal'
                title=''
                width={500}
                okText='保存'
                onOk={onOk}
                closable={false}
                maskClosable={false}
                className={'updatePasswordModal'}
                footer={<div style={{width: '388px'}}>
                    <Button type='primary' onClick={onOk} className={'updatePasswordSave'}>保存修改</Button>
                </div>}
            >
                <UpdatePasswordForm {...this.props} />
            </Modal>
        )
    }
}
