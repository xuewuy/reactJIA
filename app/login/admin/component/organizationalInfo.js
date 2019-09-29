import React,{ Component,PropTypes } from 'react'
import DynamicComponent from 'dynamicComponent'
import {HCFLayout,Button, Tabs, Radio, Table,Icon, Column, Cell, Card,Modal,Pagination,Dropdown,Menu} from 'xComponent'

export default class organizationalInfoComponent extends Component {
    componentDidMount() {
        $('.ant-tabs-tabpane-active .admin-operationPlatform').height($('.ant-tabs-tabpane-active').outerHeight())
        let maxHeight = $('.admin-operationPlatform').height() - ($('.admin-operationPlatform .admin-operationPlatform-form').height() + 30)  - ($('.admin-operationPlatform .admin-Pagination').height() + 10) - 23
        this.props.organizationalInfoInitView(maxHeight)
    }
    handleQueryClick(maxHeight){
        return ()=>{
            this.props.organizationalInfoQuery(maxHeight)
        }
    }
    handleExportClick(){
      this.props.organizationalInfoExport()
    }
    handleEditOrg(index){
        return ()=>{
            this.props.editOrg(index)
        }
    }
    handleAuthenticationClick(imgPath){
        return ()=>{
            imgPath = imgPath.replace('/v1/img/', '')
            this.props.seeAuthenticationImg(`/v1/img/${imgPath}`)
        }
    }
    handleAuthentiyAuditClick(orgInfo){
        return ()=>{
            this.props.authentiyAudit(orgInfo)
        }
    }
    getColumns(prefixCls,orgList,page,appInfo){
        let industrySource = {
            1:'工业',
            2:'商贸',
            3:'服务',
            4:'信息技术',
            1005:'健康美容业',
            1006:'餐饮业',
            1007:'幼教',
            1008:'侓师事务所',
            1009:'房地产'
        }
        if(appInfo){
            return [
                <Column
                    key='name'
                    header={(<Cell>序号</Cell>)}
                    width={60}
                    cell={props=>(
                        <Cell>
                            {(page.currentPage -1) * page.pageSize + 1 + props.rowIndex}
                        </Cell>
                    )}
                />,
                <Column
                    key='operation'
                    header={(<Cell>操作</Cell>)}
                    width={80}
                    cell={props => (
                        <Cell>{<a disabled={!(orgList.get(props.rowIndex).get('status') == 2 || orgList.get(props.rowIndex).get('status') == 3)} href="javascript:;" onClick={::this.handleAuthentiyAuditClick(orgList.get(props.rowIndex))}>认证审核</a>}</Cell>
                    )}
                />,
                <Column
                    key='orgName'
                    header={(<Cell>企业名称</Cell>)}
                    width={180}
                    cell={props=>(
                        <Cell><div style={{width:'172px',overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap'}} title={orgList.get(props.rowIndex).get('name')}>{orgList.get(props.rowIndex).get('name')}</div></Cell>
                    )}
                />,
                <Column
                    key='busLicensePath'
                    header={(<Cell>营业执照</Cell>)}
                    width={80}
                    cell={props=>(
                        <Cell>{orgList.get(props.rowIndex).get('busLicensePath') ? <a href="javascript:;" style={{color:'#3EABE8'}} onClick={::this.handleAuthenticationClick(orgList.get(props.rowIndex).get('busLicensePath'))}>查看</a> : null}</Cell>
                    )}
                />,
                <Column
                    key = 'industry'
                    header = {(<Cell>所属行业</Cell>)}
                    width = { 100}
                    cell = {
                        props=>(
                            <Cell>{industrySource[orgList.get(props.rowIndex).get('industry')]}</Cell>
                        )}
                />,
                <Column
                    key = 'industry'
                    header = {(<Cell>地区</Cell>)}
                    width = { 100}
                    cell = {
                        props=>(
                            <Cell>{orgList.get(props.rowIndex).get('registeredAddress')}</Cell>
                        )}
                />,
                <Column
                    key='users'
                    header={(<Cell>已激活用户数</Cell>)}
                    width={0}
                    cell={props=>(
                        <Cell>{orgList.get(props.rowIndex).get('users')}</Cell>
                    )}
                />,
                <Column
                    key='creatorName'
                    header={(<Cell>纳税人身份</Cell>)}
                    width={110}
                    cell={props=>(
                        <Cell>{orgList.get(props.rowIndex).get('vatTaxpayerName')}</Cell>

                    )}
                />,
                <Column
                    key='creatorMobile'
                    header={(<Cell>电话</Cell>)}
                    width={120}
                    cell={props=>(
                        <Cell>{orgList.get(props.rowIndex).get('creatorMobile')}</Cell>
                    )}
                />,
                <Column
                    key='version'
                    header={(<Cell>版本</Cell>)}
                    width={80}
                    cell={props=>(
                        /*<Cell>{
                            (()=>{
                                if(orgList.getIn([props.rowIndex]).get('version') == 0){
                                    return '测试版'
                                }else if(orgList.getIn([props.rowIndex]).get('version') == 1){
                                    return '试用版'
                                }else if(orgList.getIn([props.rowIndex]).get('version') == 2){
                                    return '软件版'
                                }else if(orgList.getIn([props.rowIndex]).get('version') == 3){
                                    return '服务版'
                                }else{
                                    return '试用版'
                                }
                            })()
                        }</Cell>*/
                        <Cell>{orgList.get(props.rowIndex).get('versionName')}</Cell>
                    )}
                />,
                <Column
                    key='spName'
                    header={(<Cell>所属服务商</Cell>)}
                    width={100}
                    cell={props=>(
                        <Cell><div style={{width:'83px',overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap'}} title={orgList.get(props.rowIndex).get('spName')}>{orgList.get(props.rowIndex).get('spName')}</div></Cell>
                    )}
                />,
                <Column
                    key='appName'
                    header={(<Cell>所属伙伴</Cell>)}
                    width={100}
                    cell={props=>(
                        <Cell>{orgList.get(props.rowIndex).get('appName')}</Cell>
                    )}
                />,
                <Column
                    key='appName'
                    header={(<Cell>状态</Cell>)}
                    width={60}
                    cell={props=>(
                        <Cell>{orgList.get(props.rowIndex).get('orgStatus')}</Cell>
                    )}
                />,
                <Column
                    key='createTime'
                    header={(<Cell>创建日期</Cell>)}
                    width={90}
                    cell={props=>(
                        <Cell>{orgList.get(props.rowIndex).get('createTime')}</Cell>
                    )}
                />,
                <Column
                    key='expireTime'
                    header={(<Cell>截止日期</Cell>)}
                    width={90}
                    cell={props=>(
                        <Cell>{orgList.get(props.rowIndex).get('expireTime')}</Cell>
                    )}
                />,
                <Column
                    key='createTime'
                    header={(<Cell>最后登录日期</Cell>)}
                    width={90}
                    cell={props=>(
                        <Cell>{orgList.get(props.rowIndex).get('lastLoginTime')}</Cell>
                    )}
                />,
                <Column
                    key='totalReceipt'
                    header={(<Cell>流水账总数</Cell>)}
                    width={80}
                    cell={props=>(
                        <Cell>{orgList.get(props.rowIndex).get('totalReceipt')}</Cell>
                    )}
                />,
                <Column
                    key='totalJournal'
                    header={(<Cell>凭证总数</Cell>)}
                    width={80}
                    cell={props=>(
                        <Cell>{orgList.get(props.rowIndex).get('totalJournal')}</Cell>
                    )}
                />,
                <Column
                    key='totalOperation'
                    header={(<Cell>操作次数</Cell>)}
                    width={80}
                    cell={props=>(
                        <Cell>{orgList.get(props.rowIndex).get('totalOperation')}</Cell>
                    )}
                />
            ]
        }else{
            return [
                <Column
                    key='name'
                    header={(<Cell>序号</Cell>)}
                    width={60}
                    cell={props=>(
                        <Cell>
                            {(page.currentPage -1) * page.pageSize + 1 + props.rowIndex}
                        </Cell>
                    )}
                />,
                <Column
                    key='orgName'
                    header={(<Cell>企业名称</Cell>)}
                    width={180}
                    cell={props=>(
                        <Cell><div style={{width:'172px',overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap'}} title={orgList.get(props.rowIndex).get('name')}>{orgList.get(props.rowIndex).get('name')}</div></Cell>
                    )}
                />,
                <Column
                    key='users'
                    header={(<Cell>已激活用户数</Cell>)}
                    width={0}
                    cell={props=>(
                        <Cell>{orgList.get(props.rowIndex).get('users')}</Cell>
                    )}
                />,
                <Column
                    key='creatorName'
                    header={(<Cell>纳税人身份</Cell>)}
                    width={110}
                    cell={props=>(
                        <Cell>{orgList.get(props.rowIndex).get('vatTaxpayerName')}</Cell>
                    )}
                />,
                <Column
                    key='creatorMobile'
                    header={(<Cell>电话</Cell>)}
                    width={120}
                    cell={props=>(
                        <Cell>{orgList.get(props.rowIndex).get('creatorMobile')}</Cell>
                    )}
                />,
                <Column
                    key='appName'
                    header={(<Cell>企业来源</Cell>)}
                    width={100}
                    cell={props=>(
                        <Cell>{orgList.get(props.rowIndex).get('appName')}</Cell>
                    )}
                />,
                <Column
                    key='version'
                    header={(<Cell>版本</Cell>)}
                    width={80}
                    cell={props=>(
                        <Cell>{
                            (()=>{
                                if(orgList.getIn([props.rowIndex]).get('version') == 0){
                                    return '测试版'
                                }else if(orgList.getIn([props.rowIndex]).get('version') == 1){
                                    return '试用版'
                                }else if(orgList.getIn([props.rowIndex]).get('version') == 2){
                                    return '软件版'
                                }else if(orgList.getIn([props.rowIndex]).get('version') == 3){
                                    return '服务版'
                                }else{
                                    return '试用版'
                                }
                            })()
                        }</Cell>
                    )}
                />,
                <Column
                    key='appName'
                    header={(<Cell>所属伙伴</Cell>)}
                    width={100}
                    cell={props=>(
                        <Cell>{orgList.get(props.rowIndex).get('appName')}</Cell>
                    )}
                />,
                <Column
                    key='appName'
                    header={(<Cell>状态</Cell>)}
                    width={60}
                    cell={props=>(
                        <Cell>{orgList.get(props.rowIndex).get('orgStatus')}</Cell>
                    )}
                />,
                <Column
                    key='createTime'
                    header={(<Cell>创建日期</Cell>)}
                    width={90}
                    cell={props=>(
                        <Cell>{orgList.get(props.rowIndex).get('createTime')}</Cell>
                    )}
                />,
                <Column
                    key='expireTime'
                    header={(<Cell>截止日期</Cell>)}
                    width={90}
                    cell={props=>(
                        <Cell>{orgList.get(props.rowIndex).get('expireTime')}</Cell>
                    )}
                />,
                <Column
                    key='createTime'
                    header={(<Cell>最后登录日期</Cell>)}
                    width={90}
                    cell={props=>(
                        <Cell>{orgList.getIn([props.rowIndex]).lastLoginTime}</Cell>
                    )}
                />,
                <Column
                    key='totalReceipt'
                    header={(<Cell>流水账总数</Cell>)}
                    width={80}
                    cell={props=>(
                        <Cell>{orgList.get(props.rowIndex).get('totalReceipt')}</Cell>
                    )}
                />,
                <Column
                    key='totalJournal'
                    header={(<Cell>凭证总数</Cell>)}
                    width={80}
                    cell={props=>(
                        <Cell>{orgList.get(props.rowIndex).get('totalJournal')}</Cell>
                    )}
                />,
                <Column
                    key='totalOperation'
                    header={(<Cell>操作次数</Cell>)}
                    width={80}
                    cell={props=>(
                        <Cell>{orgList.get(props.rowIndex).get('totalOperation')}</Cell>
                    )}
                />
            ]
        }
        
    }
    handlePageChange(e){
        this.props.organizationalInfoPageChange(e)
    }
    handlePageSizeChange(e,size){
        this.props.organizationalInfoPageSizeChange(size)
    }

    handleSearchOrgClick(option){
        this.props.searchOrgSort(option)
    }

    getSortBtn(){
        let {prefixCls,...otherProps} = this.props,
            utils = this.props.payload.get('utils') ,
            getterByField = utils.get('getterByField'),
            sortActive = getterByField('organizationalInfo.sortActive')
        return(
            <Menu onClick={::this.handleSearchOrgClick}>
                <Menu.Item key="o.createTime DESC">
                    <div className={sortActive == 'o.createTime DESC'? `${prefixCls}-sort-item-active` :''}>
                        <span>按照时间从大到小</span>
                        {sortActive == 'o.createTime DESC'?<Icon type="check" />:null}
                    </div>
                </Menu.Item>
                <Menu.Item key="o.totalReceipt DESC">
                    <div className={sortActive == 'o.totalReceipt DESC'? `${prefixCls}-sort-item-active` :''}>
                        <span>流水账明细由多到少</span>
                        {sortActive == 'o.totalReceipt DESC'?<Icon type="check" />:null}
                    </div>
                </Menu.Item>
                <Menu.Item key="o.totalJournal DESC">
                    <div className={sortActive == 'o.totalJournal DESC'? `${prefixCls}-sort-item-active` :''}>
                        <span>凭证明细由多到少</span>
                        {sortActive == 'o.totalJournal DESC'?<Icon type="check" />:null}
                    </div>
                </Menu.Item>
            </Menu>
        )
    }
    render(){
        let {prefixCls, ...otherProps} = this.props
        
        let utils = this.props.payload.get('utils'),
            getterByField = utils.get('getterByField'),
            orgList = getterByField('organizationalInfo.ajaxData'),
            height = (orgList.size) * 50 + 47>=47?(orgList.size) * 50 + 47:47,
            organizationalInfo = getterByField('organizationalInfo').toJS(),
            appInfo = getterByField('appInfo'),
            width = appInfo ? 1180 : 1280,
            auth = this.props.auth > 1
        height = height > organizationalInfo.maxHeight ? organizationalInfo.maxHeight : height
        // height = height > 402 ? 402 : height
        return (
            <div className={`${prefixCls}-operationPlatform ${prefixCls}-organizationalInfo`} style={{width:width}}>
                <div className={`${prefixCls}-operationPlatform-form ${prefixCls}-info`}>
                    <div className={`${prefixCls}-info-top`}>
                        <DynamicComponent _path='admin.organizationalInfo.top' {...otherProps} />
                    </div>
                    <div className={`${prefixCls}-info-bottom`}>
                        <div>
                            <DynamicComponent _path='admin.organizationalInfo.bottom' {...otherProps} />
                        </div>
                    <div>
                    <div className={`${prefixCls}-info-end`}>
                        <DynamicComponent _path='admin.organizationalInfo.end' {...otherProps} />
                        <Dropdown overlay={this.getSortBtn()}>
                              <Button zIcon='sort' title='排序' className={`${prefixCls}-sort`}/>
                        </Dropdown>
                    </div> 
                            <div className={`${prefixCls}-operationPlatform-queryBtn export`}>
                            {
                                auth ? <Button onClick={::this.handleExportClick} title='Excel导出'
                                className={`exportBtn btnNoTM`}
                                icon='search'
                                disabled={this.props.auth!=2}
                                /> : null
                            }
                            </div>
                            <div className={`${prefixCls}-operationPlatform-queryBtn`}>
                                <Button type='primary' onClick={::this.handleQueryClick(organizationalInfo.maxHeight)}>查询</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <Table
                    className={`${prefixCls}-operationPlatform-form ${prefixCls}-organizationalInfo-table`}
                    rowsCount={orgList.size}
                    rowHeight={50}
                    headerHeight={30}
                    height={height}
                    width={width}>
                    {this.getColumns(prefixCls,orgList,organizationalInfo.from.page,appInfo)
                    }
                </Table>
                <div className={`${prefixCls}-Pagination`}>
                    <Pagination
                        showSizeChanger
                        showQuickJumper
                        current={organizationalInfo.from.page.currentPage}
                        pageSize = {organizationalInfo.from.page.pageSize}
                        total={organizationalInfo.total}
                        onChange={::this.handlePageChange}
                        onShowSizeChange ={::this.handlePageSizeChange}
                        pageSizeOptions = {['20','50','100','200']}
                    />
                </div>
            </div>
        )
    }
}
