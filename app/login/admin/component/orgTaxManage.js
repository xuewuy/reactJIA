import React,{ Component,PropTypes } from 'react'
import DynamicComponent from 'dynamicComponent'
import {HCFLayout,Button, Tabs, Radio, Table, Column, Cell, Card,Modal,Pagination} from 'xComponent'

export default class orgTaxManageComponent extends Component {
    componentDidMount() {
        $('.ant-tabs-tabpane-active .admin-operationPlatform').height($('.ant-tabs-tabpane-active').outerHeight())
        let maxHeight = $('.admin-operationPlatform').height() - ($('.admin-operationPlatform .admin-operationPlatform-form').height() + 30)  - ($('.admin-operationPlatform .admin-Pagination').height() + 10) - 23
        this.props.orgTaxManageInitView(maxHeight)
    }
    handleQueryClick(maxHeight){
        return ()=>{
            this.props.orgTaxManageInitView(maxHeight)
        }
    }
    handleAnalyzeExportClick(){
        this.props.userAnalyzeExportClick()
    }
    getColumns(prefixCls,userList,appId){
        let utils = this.props.payload.get('utils'),
            getterByField = utils.get('getterByField'),
            orgTaxAppId = getterByField('orgTaxManage.orgTaxAppId')?getterByField('orgTaxManage.orgTaxAppId'):-1
        return [
            <Column
                key='index'
                header={(<Cell>序号</Cell>)}
                width={45}
                cell={props=>(
                    <Cell>
                        {1 + props.rowIndex}
                    </Cell> 
                )}
            />,
            <Column
                key='createTime'
                header={(<Cell>日期</Cell>)}
                width={orgTaxAppId==-1?455:200}
                cell={props=>(
                    <Cell>{userList.get(props.rowIndex).get('createTime')}</Cell>
                )}
            />,
            <Column
                key='enterpriseSum'
                header={(<Cell>{orgTaxAppId==100?'账无忌':'云代账'}新增汇算清缴用户数</Cell>)}
                width={orgTaxAppId==-1?0:255}
                visible={orgTaxAppId==-1?false:true}
                cell={props=>(
                    <Cell>
                        {
                            userList.get(props.rowIndex).get('count')=='0' ?'0': <a href="javascript:;"  onClick={::this.handleEnterpriseSumList(0, userList.get(props.rowIndex).get('createTime')) }>{userList.get(props.rowIndex).get('count')}</a>
                        }
                    </Cell>
                )}
            />,
            <Column
                key='sum'
                header={(<Cell>累计新增用户数</Cell>)}
                width={180}
                cell={props=>(
                    <Cell>{userList.get(props.rowIndex).get('sum')}</Cell>
                )}
            />
        ]
    }

    handleEnterpriseSumList(type, date) {
        return () => {
            this.props.goOrgTaxInfoList(type, date)
        }
    }

    handlePageChange(e){
        this.props.userAnalyzePageChange(e)
    }

    handlePageSizeChange(e,size){
        this.props.userAnalyzePageSizeChange(size)
    }
    
    render(){
        let {prefixCls, ...otherProps} = this.props
        let utils = this.props.payload.get('utils'),
            getterByField = utils.get('getterByField'),
            orgTaxList = getterByField('orgTaxManage.ajaxData'),
            height = (orgTaxList.size) * 50 + 32,
            orgTaxManage = getterByField('orgTaxManage').toJS(),
            auth = this.props.auth && this.props.auth > 1,
            orgTaxAppId = getterByField('orgTaxManage.orgTaxAppId')?getterByField('orgTaxManage.orgTaxAppId'):-1,       
            appId = getterByField('orgTaxManage.from.appId')?getterByField('orgTaxManage.from.appId.id'):-1
        height = height > orgTaxManage.maxHeight-36 ? orgTaxManage.maxHeight-36 : height
        orgTaxManage.total = 50
        return (
            <div className={`${prefixCls}-operationPlatform ${prefixCls}-userAnalyze`} style={{"width":"680px"}}>
                <div className={`${prefixCls}-operationPlatform-form`}>
                    <DynamicComponent _path='admin.orgTaxManage' {...otherProps} />
                    <div className={`${prefixCls}-operationPlatform-queryBtn`}>
                        <Button type='primary' onClick={::this.handleQueryClick(orgTaxManage.maxHeight)}>查询</Button>
                        {auth ? <Button onClick={::this.handleAnalyzeExportClick} title='Excel导出'
                                className={`exportBtn btnNoTM`}
                                icon='search'
                                disabled={this.props.auth!=2}
                                /> : null}
                    </div>
                </div>
                <Table 
                    rowsCount={orgTaxList.size}
                    rowHeight={50}
                    headerHeight={30}
                    height={height}
                    width={680}>
                    {this.getColumns(prefixCls,orgTaxList,appId)
                    }
                </Table>
                {false?<div className={`${prefixCls}-Pagination`}>
                    <Pagination
                        showSizeChanger = {true}
                        showQuickJumper
                        current={orgTaxManage.from.page.currentPage}
                        pageSize = {orgTaxManage.from.page.pageSize}
                        total={orgTaxManage.total}
                        onChange={::this.handlePageChange}
                        onShowSizeChange ={::this.handlePageSizeChange}
                        pageSizeOptions = {['20','50','100','200']}
                    />
                </div>:null}
            </div>
        )
    }
}