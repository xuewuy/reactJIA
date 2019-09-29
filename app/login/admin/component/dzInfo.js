import React,{ Component,PropTypes } from 'react'
import DynamicComponent from 'dynamicComponent'
import {HCFLayout,Button, Tabs, Radio, Table, Column, Cell, Card,Modal,Pagination} from 'xComponent'

export default class dzInfoComponent extends Component {
    componentDidMount() {
        $('.ant-tabs-tabpane-active .admin-operationPlatform').height($('.ant-tabs-tabpane-active').outerHeight())
        let maxHeight = $('.admin-operationPlatform').height() - ($('.admin-operationPlatform .admin-operationPlatform-form').height() + 30)  - ($('.admin-operationPlatform .admin-Pagination').height() + 10) - 23
        this.props.dzInfoInitView(maxHeight)
    }
    handleQueryClick(maxHeight){
        return ()=>{
            this.props.dzInfoQuery(maxHeight)
        }
    }
    handleExportClick(){
      // this.props.organizationalInfoExport()//导出还没有接口
    }
    handleEditOrg(index){
        return ()=>{
            this.props.editOrg(index)
        }
    }
    getColumns(prefixCls,orgList,page){
        return [
            <Column
                key='index'
                header={(<Cell>序号</Cell>)}
                width={40}
                cell={props=>(
                    <Cell>
                        {(page.currentPage -1) * page.pageSize + 1 + props.rowIndex}
                    </Cell>
                )}
            />,
            <Column
                key='name'
                header={(<Cell>服务商名称</Cell>)}
                width={180}
                cell={props=>(
                    <Cell><div style={{width:'172px',overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap','textAlign':'left'}} title={orgList.get(props.rowIndex).get('name')}>{orgList.get(props.rowIndex).get('name')}</div></Cell>
                )}
            />,
            <Column
                key='creatorName'
                header={(<Cell>管理员姓名</Cell>)}
                width={100}
                cell={props=>(
                    <Cell>
                        <div style={{width:'104px',overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap','textAlign':'left'}} title={orgList.get(props.rowIndex).get('creatorName')}>
                            {orgList.get(props.rowIndex).get('creatorName')}
                        </div>
                    </Cell>
                )}
            />,
            <Column
                key='creatorMobile'
                header={(<Cell>电话</Cell>)}
                width={100}
                cell={props=>(
                    <Cell>
                        <div style={{width:'94px',overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap','textAlign':'left'}} title={orgList.get(props.rowIndex).get('creatorMobile')}>
                            {orgList.get(props.rowIndex).get('creatorMobile')}
                        </div>
                    </Cell>
                )}
            />,
            <Column
                key='requiredOrgCount'
                header={(<Cell>申请账套数</Cell>)}
                width={90}
                cell={props=>(
                    <Cell>
                        <div style={{width:'74px',overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap','textAlign':'left'}} title={orgList.get(props.rowIndex).get('requiredOrgCount')}>
                            {orgList.get(props.rowIndex).get('requiredOrgCount')}
                        </div>
                    </Cell>
                )}
            />,
            <Column
                key='createTime'
                header={(<Cell>创建日期</Cell>)}
                width={90}
                cell={props=>(
                    <Cell>
                        <div style={{width:'94px',overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap','textAlign':'left'}} title={orgList.get(props.rowIndex).get('createTime')?orgList.get(props.rowIndex).get('createTime').split(' ')[0]:''}>
                            {orgList.get(props.rowIndex).get('createTime')?orgList.get(props.rowIndex).get('createTime').split(' ')[0]:''}
                        </div>
                    </Cell>
                )}
            />,
            <Column
                key='expireTime'
                header={(<Cell>截止日期</Cell>)}
                width={90}
                cell={props=>(
                    <Cell>
                        <div style={{width:'94px',overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap','textAlign':'left'}} title={orgList.get(props.rowIndex).get('expireTime')?orgList.get(props.rowIndex).get('expireTime').split(' ')[0]:''}>
                            {orgList.get(props.rowIndex).get('expireTime')?orgList.get(props.rowIndex).get('expireTime').split(' ')[0]:''}
                        </div>
                    </Cell>
                )}
            />,
            <Column
                key='lastLoginTime'
                header={(<Cell>最后登录日期</Cell>)}
                width={90}
                cell={props=>(
                    <Cell>
                        <div style={{width:'94px',overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap','textAlign':'left'}} title={orgList.get(props.rowIndex).get('lastLoginTime')?orgList.get(props.rowIndex).get('lastLoginTime').split(' ')[0]:''}>
                            {orgList.get(props.rowIndex).get('lastLoginTime')?orgList.get(props.rowIndex).get('lastLoginTime').split(' ')[0]:''}
                        </div>
                    </Cell>
                )}
            />,
            <Column
                key='totalOrg'
                header={(<Cell>总账套数</Cell>)}
                width={70}
                cell={props=>(
                    <Cell>
                        {
                            orgList.get(props.rowIndex).get('totalOrg') ? <a href="javascript:;"  onClick={::this.handleOrganizetionalList(0, orgList.get(props.rowIndex).get('id')) }>{orgList.get(props.rowIndex).get('totalOrg')}</a>:'0'
                        }
                    </Cell>
                )}
            />,
            <Column
                key='totalSmallOrg'
                header={(<Cell>小规模</Cell>)}
                width={70}
                cell={props=>(
                    <Cell>
                        {
                            orgList.get(props.rowIndex).get('totalSmallOrg')?<a href="javascript:;" onClick={::this.handleOrganizetionalList(42,orgList.get(props.rowIndex).get('id'))}>{orgList.get(props.rowIndex).get('totalSmallOrg')}</a>:'0'
                        }
                    </Cell>
                )}
            />,
            <Column
                key='totalGeneralOrg'
                header={(<Cell>一般纳税人</Cell>)}
                width={70}
                cell={props=>(
                    <Cell>
                        {
                            orgList.get(props.rowIndex).get('totalGeneralOrg')?<a href="javascript:;" onClick={::this.handleOrganizetionalList(41,orgList.get(props.rowIndex).get('id'))}>{orgList.get(props.rowIndex).get('totalGeneralOrg')}</a>:'0'
                        }
                    </Cell>
                )}
            />,
            <Column
                key='status'
                header={(<Cell>账号状态</Cell>)}
                width={70}
                cell={props=>(
                    <Cell>{orgList.get(props.rowIndex).get('spStatus')}</Cell>
                )}
            />
        ]
    }
    getListColumns(prefixCls,orgList,page){
        return [
            <Column
                key='index'
                header={(<Cell>序号</Cell>)}
                width={40}
                cell={props=>(
                    <Cell>
                        {(page.currentPage -1) * page.pageSize + 1 + props.rowIndex}
                    </Cell>
                )}
            />,
            <Column
                key='name'
                header={(<Cell>企业名称</Cell>)}
                width={200}
                cell={props=>(
                    <Cell><div style={{width:'184px',overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap','textAlign':'left'}} title={orgList.get(props.rowIndex).get('name')}>{orgList.get(props.rowIndex).get('name')}</div></Cell>
                )}
            />,
            <Column
                key='creatorName'
                header={(<Cell>纳税人身份</Cell>)}
                width={140}
                cell={props=>(
                    <Cell>
                        <div style={{width:'124px',overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap','textAlign':'left'}} title={orgList.get(props.rowIndex).get('vatTaxpayerName')}>
                            {orgList.get(props.rowIndex).get('vatTaxpayerName')}
                        </div>
                    </Cell>
                )}
            />,
            <Column
                key='creatorMobile'
                header={(<Cell>电话</Cell>)}
                width={100}
                cell={props=>(
                    <Cell>
                        <div style={{width:'144px',overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap','textAlign':'left'}} title={orgList.get(props.rowIndex).get('creatorMobile')}>
                            {orgList.get(props.rowIndex).get('creatorMobile')}
                        </div>
                    </Cell>
                )}
            />,
            <Column
                key='createTime'
                header={(<Cell>创建日期</Cell>)}
                width={120}
                cell={props=>(
                    <Cell>
                        <div style={{width:'104px',overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap','textAlign':'left'}} title={orgList.get(props.rowIndex).get('createTime')?orgList.get(props.rowIndex).get('createTime').split(' ')[0]:''}>
                            {orgList.get(props.rowIndex).get('createTime')?orgList.get(props.rowIndex).get('createTime').split(' ')[0]:''}
                        </div>
                    </Cell>
                )}
            />,
            <Column
                key='expireTime'
                header={(<Cell>截止日期</Cell>)}
                width={90}
                cell={props=>(
                    <Cell>
                        <div style={{width:'104px',overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap','textAlign':'left'}} title={orgList.get(props.rowIndex).get('expireTime')?orgList.get(props.rowIndex).get('expireTime').split(' ')[0]:''}>
                            {orgList.get(props.rowIndex).get('expireTime')?orgList.get(props.rowIndex).get('expireTime').split(' ')[0]:''}
                        </div>
                    </Cell>
                )}
            />,
            <Column
                key='lastLoginTime'
                header={(<Cell>最后登录日期</Cell>)}
                width={90}
                cell={props=>(
                    <Cell>
                        <div style={{width:'104px',overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap','textAlign':'left'}} title={orgList.get(props.rowIndex).get('lastLoginTime')?orgList.get(props.rowIndex).get('lastLoginTime').split(' ')[0]:''}>
                            {orgList.get(props.rowIndex).get('lastLoginTime')?orgList.get(props.rowIndex).get('lastLoginTime').split(' ')[0]:''}
                        </div>
                    </Cell>
                )}
            />,
            <Column
                key='totalOrg'
                header={(<Cell>流水账总数</Cell>)}
                width={90}
                cell={props=>(
                    <Cell>{orgList.get(props.rowIndex).get('totalReceipt')}</Cell>
                )}
            />,
            <Column
                key='totalSmallOrg'
                header={(<Cell>凭证总数</Cell>)}
                width={90}
                cell={props=>(
                    <Cell>{orgList.get(props.rowIndex).get('totalJournal')}</Cell>
                )}
            />,
            <Column
                key='totalGeneralOrg'
                header={(<Cell>操作次数</Cell>)}
                width={90}
                cell={props=>(
                    <Cell>{orgList.get(props.rowIndex).get('totalOperation')}</Cell>
                )}
            />
        ]
    }
    handleListPageChange(e){
        let utils = this.props.payload.get('utils'),
            getterByField = utils.get('getterByField'),
            page = getterByField('organizetionalListInfo.page').toJS()

        page.currentPage = e    
        this.props.goOrganizetionalList(undefined, undefined, page)
    }
    handleListPageSizeChange(e,size){
        let utils = this.props.payload.get('utils'),
            getterByField = utils.get('getterByField'),
            page = getterByField('organizetionalListInfo.page').toJS()
        
        page.pageSize = size
        page.currentPage = 1 
        this.props.goOrganizetionalList(undefined, undefined, page)
    }
    handlePageChange(e){
        this.props.dzInfoPageChange(e)
    }
    handlePageSizeChange(e,size){
        this.props.dzInfoPageSizeChange(size)
    }
    handleExportDzInfoClick() {
        this.props.exportDzInfo()
    }
    //服务商信息单条数据企业信息导出
    handleExportOrgList() {
        this.props.exportDzInfoOrgList()
    }
    goList() {
        let utils = this.props.payload.get('utils'),
            getterByField = utils.get('getterByField'),
            isOrganizationalList = getterByField('isOrganizationalList')
        this.props.backDzInfo(!isOrganizationalList)
    }
    handleOrganizetionalList(type, id) {
        return () => {
            this.props.goOrganizetionalList(type, id)
        }
    }
    getTitle(vatTaxpayer) {
        if(vatTaxpayer==null) {
            return (
                <span className='organizetionalList-title'>企业列表</span>
            )
        } else if(vatTaxpayer===41) {
            return (
                <span className='organizetionalList-title'>企业列表 > 一般纳税人</span>                
            )
        } else if(vatTaxpayer===42) {
            return (
                <span className='organizetionalList-title'>企业列表 > 小规模账套</span>                
            )
        }
    }
    handleListPageSure() {
        let utils = this.props.payload.get('utils') ,
            getterByField = utils.get('getterByField'),
            organizetionalListInfoPage = getterByField('organizetionalListInfo.page').toJS(),
            currentPage = $('.page-list-box .ant-pagination-options-quick-jumper input').attr('value'),
            current = parseInt(currentPage),
            totalPage =Math.ceil(organizetionalListInfoPage.total / organizetionalListInfoPage.pageSize)

        if( current > totalPage) {
            current = totalPage
        } else if (current == 0 || current < 0) {
            current = 1
        } else if(isNaN(current)) {
            current = 1			
        }
        this.props.goOrganizetionalList(undefined, undefined, {
            'pageSize': organizetionalListInfoPage.pageSize,
            'tatal': organizetionalListInfoPage.tatal,
            'currentPage': current
        })
        
    }
    handleDzInfoPageSure() {
        let utils = this.props.payload.get('utils') ,
            getterByField = utils.get('getterByField'),
            dzInfo = getterByField('dzInfo').toJS(),
            currentPage = $('.page-dzinfo-box .ant-pagination-options-quick-jumper input').attr('value'),
            current = parseInt(currentPage),
            totalPage =Math.ceil(dzInfo.total / dzInfo.from.page.pageSize)

        if( current > totalPage) {
            current = totalPage
        } else if (current == 0 || current < 0) {
            current = 1
        } else if(isNaN(current)) {
            current = 1			
        }
        this.props.dzInfoPageChange(current)
        
    }
    render(){
        let {prefixCls, ...otherProps} = this.props
        
        let utils = this.props.payload.get('utils'),
            getterByField = utils.get('getterByField'),
            dzList = getterByField('dzInfo.ajaxData'),
            height = (dzList.size) * 50 + 32,
            dzInfo = getterByField('dzInfo').toJS(),
            organizetionalListInfo = getterByField('organizetionalListInfo').toJS(),
            organizetionalList = getterByField('organizetionalList'),
            auth = this.props.auth && this.props.auth > 1,
            isOrganizationalList = getterByField('isOrganizationalList'),
            listHeight = (organizetionalList.size) * 50 + 32,
            vatTaxpayer = getterByField('organizetionalListInfo.vatTaxpayer')
        height = height > dzInfo.maxHeight ? dzInfo.maxHeight : height
        listHeight = listHeight > organizetionalListInfo.maxHeight ? organizetionalListInfo.maxHeight : listHeight
        // height = height > 402 ? 402 : height
        if(isOrganizationalList) {
            return (
                <div className={`${prefixCls}-operationPlatform ${prefixCls}-organizationalInfo`} style={{width:'1260px'}}>
                    <div className={`${prefixCls}-operationPlatform-form`}>
                        {::this.getTitle(vatTaxpayer)}
                        <div className={`${prefixCls}-operationPlatform-backBtn`}>
                            <Button onClick={::this.handleExportOrgList}>导出</Button>
                            <Button onClick={::this.goList} type='primary'>返回服务商信息</Button>
                        </div>
                        
                    </div>
                    <Table
                        rowsCount={organizetionalList.size}
                        rowHeight={50}
                        headerHeight={30}
                        height={listHeight}
                        width={1050}>
                        {this.getListColumns(prefixCls,organizetionalList,organizetionalListInfo.page)
                        }
                    </Table>
                    <div className={`${prefixCls}-Pagination page-list-box`}>
                        <Pagination
                            showSizeChanger
                            showQuickJumper
                            current={organizetionalListInfo.page.currentPage}
                            pageSize = {organizetionalListInfo.page.pageSize}
                            total={organizetionalListInfo.page.total}
                            onChange={::this.handleListPageChange}
                            onShowSizeChange ={::this.handleListPageSizeChange}
                            pageSizeOptions = {['20','50','100','200']}
                        />
                        <Button onClick={::this.handleListPageSure}  type='default' className='page-sure-btn page-list-sure-btn'>确定</Button>
                    </div>
                </div>
            )
            
        } else {

            return (
                <div className={`${prefixCls}-operationPlatform ${prefixCls}-organizationalInfo`} style={{width:'1260px'}}>
                    <div className={`${prefixCls}-operationPlatform-form`}>
                        <DynamicComponent _path='admin.dzInfo' {...otherProps} />
                        <div className={`${prefixCls}-operationPlatform-queryBtn`}>
                            <Button onClick={::this.handleQueryClick(dzInfo.maxHeight)}>查询</Button>
                        </div>
                        <div className={`${prefixCls}-operationPlatform-queryBtn`}>
                            {
                                auth ? <Button onClick={::this.handleExportDzInfoClick} title='Excel导出'
                                className={`exportBtn btnNoTM`}
                                icon='search'
                                disabled={this.props.auth!=2}
                                /> : null
                            }
                        </div>
                    </div>
                    <Table
                        rowsCount={dzList.size}
                        rowHeight={50}
                        headerHeight={30}
                        height={height}
                        width={1060}>
                        {this.getColumns(prefixCls,dzList,dzInfo.from.page)
                        }
                    </Table>
                    <div className={`${prefixCls}-Pagination  page-dzinfo-box`}>
                        <Pagination
                            showSizeChanger
                            showQuickJumper
                            current={dzInfo.from.page.currentPage}
                            pageSize = {dzInfo.from.page.pageSize}
                            total={dzInfo.total}
                            onChange={::this.handlePageChange}
                            onShowSizeChange ={::this.handlePageSizeChange}
                            pageSizeOptions = {['20','50','100','200']}
                        />
                        <Button onClick={::this.handleDzInfoPageSure}  type='default' className='page-sure-btn page-dzinfo-sure-btn'>确定</Button>
                    </div>
                </div>
            )
        }
    }
}
