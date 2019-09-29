import React,{ Component,PropTypes } from 'react'
import DynamicComponent from 'dynamicComponent'
import {HCFLayout,Button, Tabs, Radio, Table, Column, Cell, Card,Modal,Pagination,ZIcon} from 'xComponent'

export default class userInfoComponent extends Component {
    componentDidMount() {
        $('.ant-tabs-tabpane-active .admin-operationPlatform').height($('.ant-tabs-tabpane-active').outerHeight())
        let maxHeight = $('.admin-operationPlatform').height() - ($('.admin-operationPlatform .admin-operationPlatform-form').height() + 30)  - ($('.admin-operationPlatform .admin-Pagination').height() + 10) - 23
        this.props.userInfoInitView(maxHeight)
    }
    handleQueryClick(maxHeight){
        return ()=>{
            this.props.userInfoQuery(maxHeight)
        }
    }
    handleEditOrg(index){
        return ()=>{
            this.props.editOrg(index)
        }
    }
    getColumns(prefixCls,userList,page,appInfo){
        if(appInfo && appInfo.get('id') != 100){
            return [
                <Column
                    key='name'
                    header={(<Cell>序号</Cell>)}
                    width={40}
                    cell={props=>(
                        <Cell>
                            {(page.currentPage -1) * page.pageSize + 1 + props.rowIndex}
                        </Cell>
                    )}
                />,
                <Column
                    key='orgName'
                    header={(<Cell>企业名称</Cell>)}
                    width={200}
                    cell={props=>(
                      <Cell><div style={{width:'192px',overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap'}} title={userList.get(props.rowIndex).get('orgNames')}>{userList.get(props.rowIndex).get('orgNames')}</div></Cell>
                    )}
                />,
                <Column
                    key='users'
                    header={(<Cell>用户名</Cell>)}
                    width={150}
                    cell={props=>(
                        <Cell>{userList.get(props.rowIndex).get('name')}</Cell>
                    )}
                />,
                <Column
                    key='creatorMobile'
                    header={(<Cell>电话</Cell>)}
                    width={100}
                    cell={props=>(
                        <Cell>{userList.get(props.rowIndex).get('mobile')}</Cell>
                    )}
                />,
                <Column
                    key='createTime'
                    header={(<Cell>创建日期</Cell>)}
                    width={160}
                    cell={props=>(
                        <Cell>{userList.get(props.rowIndex).get('createTime')}</Cell>
                    )}
                />,
                <Column
                    key='expireTime'
                    header={(<Cell>最后登录日期</Cell>)}
                    width={160}
                    cell={props=>(
                        <Cell>{userList.get(props.rowIndex).get('lastLoginTime')}</Cell>
                    )}
                />
            ]
        }else{
           return [
               <Column
                   key='name'
                   header={(<Cell>序号</Cell>)}
                   width={40}
                   cell={props=>(
                       <Cell>
                           {(page.currentPage -1) * page.pageSize + 1 + props.rowIndex}
                       </Cell>
                   )}
               />,
               <Column
                   key='orgName'
                   header={(<Cell>企业名称</Cell>)}
                   width={290}
                   cell={props=>(
                       <Cell><div style={{width:'282px',overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap'}} title={userList.get(props.rowIndex).get('orgNames')}>{userList.get(props.rowIndex).get('orgNames')}</div></Cell>
                   )}
               />,
               <Column
                   key='users'
                   header={(<Cell>用户名</Cell>)}
                   width={150}
                   cell={props=>(
                       <Cell>{userList.get(props.rowIndex).get('name')}</Cell>
                   )}
               />,
               <Column
                   key='creatorMobile'
                   header={(<Cell>电话</Cell>)}
                   width={100}
                   cell={props=>(
                       <Cell>{userList.get(props.rowIndex).get('mobile')}</Cell>
                   )}
               />,
               <Column
                   key='appName'
                   header={(<Cell>所属伙伴</Cell>)}
                   width={100}
                   cell={props=>(
                       <Cell>{userList.get(props.rowIndex).get('appName')}</Cell>
                   )}
               />,
               <Column
                   key='createTime'
                   header={(<Cell>创建日期</Cell>)}
                   width={160}
                   cell={props=>(
                       <Cell>{userList.get(props.rowIndex).get('createTime')}</Cell>
                   )}
               />,
               <Column
                   key='expireTime'
                   header={(<Cell>最后登录日期</Cell>)}
                   width={160}
                   cell={props=>(
                       <Cell>{userList.get(props.rowIndex).get('lastLoginTime')}</Cell>
                   )}
               />
           ] 
        }
        
    }
    handlePageChange(e){
        this.props.userInfoPageChange(e)
    }
    handlePageSizeChange(e,size){
        this.props.userInfoPageSizeChange(size)
    }
    handleExportUserInfoClick() {
        this.props.exportUserInfo()
    }
    render(){
        let {prefixCls, ...otherProps} = this.props
        let utils = this.props.payload.get('utils'),
            getterByField = utils.get('getterByField'),
            userList = getterByField('userInfo.ajaxData'),
            height = (userList.size) * 50 + 32,
            userInfo = getterByField('userInfo').toJS(),
            appInfo = getterByField('appInfo'),
            tableWidth = appInfo && appInfo.get('id')!=100 ? '900px' : '1000px',
            auth = this.props.auth > 1
        height = height > userInfo.maxHeight ? userInfo.maxHeight : height
        return (
            <div className={`${prefixCls}-operationPlatform`} style={{width:tableWidth}}>
                <div className={`${prefixCls}-operationPlatform-form`}>
                    <DynamicComponent _path='admin.userInfo' {...otherProps} />
                    <div className={`${prefixCls}-operationPlatform-queryBtn`}>
                        <Button type='primary' onClick={::this.handleQueryClick(userInfo.maxHeight)}>查询</Button>
                        {auth ? <Button onClick={::this.handleExportUserInfoClick}   title='Excel导出'
                                className={`exportBtn btnNoTM`}
                                icon='search'
                                disabled={this.props.auth!=2}
                                /> : null}
                    </div>
                </div>
                <Table 
                    rowsCount={userList.size}
                    rowHeight={50}
                    headerHeight={30}
                    height={height}
                    width={tableWidth}>
                    {this.getColumns(prefixCls,userList,userInfo.from.page,appInfo)
                    }
                </Table>
                <div className={`${prefixCls}-Pagination`}>
                    <Pagination
                        showSizeChanger = {true}
                        showQuickJumper = {true}
                        current={userInfo.from.page.currentPage}
                        pageSize = {userInfo.from.page.pageSize}
                        total={userInfo.total}
                        onChange={::this.handlePageChange}
                        onShowSizeChange ={::this.handlePageSizeChange}
                        pageSizeOptions = {['20','50','100','200']}
                    />
                </div>
            </div>
        )
    }
}