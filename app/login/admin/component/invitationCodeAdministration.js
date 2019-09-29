import React,{ Component,PropTypes } from 'react'
import DynamicComponent from 'dynamicComponent'
import {HCFLayout,Button, Tabs, Radio, Table, Column, Cell, Card,Modal,Pagination,CountDownButton} from 'xComponent'

export default class InvitationCodeAdministrationComponent extends Component {
    componentDidMount() {
        $('.ant-tabs-tabpane-active .admin-operationPlatform').height($('.ant-tabs-tabpane-active').outerHeight())
        let maxHeight = $('.admin-operationPlatform').height() - ($('.admin-operationPlatform .admin-operationPlatform-form').height() + 30)  - ($('.admin-operationPlatform .admin-Pagination').height() + 10) - 23
        let maxWidth = $('.admin-main').width() - 68
        this.props.invitationCodeAdministrationInitView(maxHeight,maxWidth)
    }
    handleQueryClick(maxHeight){
        return ()=>{
            this.props.invitationCodeAdministrationInitView(maxHeight)
        }
    }
    handleAnalyzeExportClick(){
        this.props.invitationCodeAdministrationExportClick()
    }
    
    getColumns(prefixCls,userList,page){
        return [
            <Column
                key='index'
                header={(<Cell>序号</Cell>)}
                width={45}
                cell={props=>(
                    <Cell>
                        {(page.currentPage -1) * page.pageSize + 1 + props.rowIndex}
                    </Cell>
                )}
            />,
            <Column
                key='reqCode'
                header={(<Cell>邀请码</Cell>)}
                width={200}
                cell={props=>(
                    <Cell>{userList.get(props.rowIndex).get('reqCode')}</Cell>
                )}
            />,
            <Column
                key='createTime'
                header={(<Cell>生成日期</Cell>)}
                width={180}
                cell={props=>(
                    <Cell>{userList.get(props.rowIndex).get('createTime')?userList.get(props.rowIndex).get('createTime').split(' ')[0]:''}</Cell>
                )}
            />,
            <Column
                key='mobile'
                header={(<Cell>激活手机号</Cell>)}
                width={180}
                cell={props=>(
                    <Cell>{userList.get(props.rowIndex).get('mobile')}</Cell>
                )}
            />,
            <Column
                key='useTime'
                header={(<Cell>激活时间</Cell>)}
                width={180}
                cell={props=>(
                    <Cell>{userList.get(props.rowIndex).get('useTime')?userList.get(props.rowIndex).get('useTime').split(' ')[0]:''}</Cell>
                )}
            />,
            <Column
                key='statusStr'
                header={(<Cell>邀请码状态</Cell>)}
                width={180}
                cell={props=>(
                    <Cell>{userList.get(props.rowIndex).get('status')?'已激活':'未激活'}</Cell>
                )}
            />
        ]
    }
    handlePageChange(e){
        this.props.invitationCodeAdministrationPageChange(e)
    }
    handlePageSizeChange(e,size){
        this.props.invitationCodeAdministrationPageSizeChange(size)
    }
    handleBatchCreateClick() {
        this.props.batchCreateReqCode()
    }
    render(){
        
        let {prefixCls, ...otherProps} = this.props
        let utils = this.props.payload.get('utils'),
            getterByField = utils.get('getterByField'),
            userList = getterByField('invitationCodeAdministration.ajaxData'),
            height = (userList.size) * 50 + 32,
            invitationCodeAdministration = getterByField('invitationCodeAdministration').toJS(),
            auth = this.props.auth && this.props.auth > 1
        height = height > invitationCodeAdministration.maxHeight ? invitationCodeAdministration.maxHeight : height
        // height = height > 402 ? 402 : height
        return (
            <div className={`${prefixCls}-operationPlatform ${prefixCls}-invitationCodeAdministration`}>
                <div className={`${prefixCls}-operationPlatform-form`}>
                    <DynamicComponent _path='admin.invitationCodeAdministration' {...otherProps} />
                    <div className={`${prefixCls}-operationPlatform-queryBtn`}>
                        <Button type='primary' onClick={::this.handleQueryClick(invitationCodeAdministration.maxHeight)}>查询</Button>
                        <CountDownButton type='primary' onClick={::this.handleBatchCreateClick} text='批量生成邀请码' count={10} />
                        {auth ? <Button onClick={::this.handleAnalyzeExportClick} title='Excel导出'
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
                    width={965}>
                    {this.getColumns(prefixCls,userList,invitationCodeAdministration.from.page)
                    }
                </Table>
                <div className={`${prefixCls}-Pagination`}>
                    <Pagination
                        showSizeChanger = {true}
                        showQuickJumper
                        current={invitationCodeAdministration.from.page.currentPage}
                        pageSize = {invitationCodeAdministration.from.page.pageSize}
                        total={invitationCodeAdministration.total}
                        onChange={::this.handlePageChange}
                        onShowSizeChange ={::this.handlePageSizeChange}
                        pageSizeOptions = {['20','50','100','200']}
                    />
                </div>
            </div>
        )
    }
}