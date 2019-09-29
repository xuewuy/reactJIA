import React,{ Component,PropTypes } from 'react'
import DynamicComponent from 'dynamicComponent'
import {HCFLayout,Button, Tabs, Radio, Table, Column, Cell, Card,Modal,Pagination} from 'xComponent'

export default class userTaxManageComponent extends Component {
    componentDidMount() {
        $('.ant-tabs-tabpane-active .admin-operationPlatform').height($('.ant-tabs-tabpane-active').outerHeight())
        let maxHeight = $('.admin-operationPlatform').height() - ($('.admin-operationPlatform .admin-operationPlatform-form').height() + 30)  - ($('.admin-operationPlatform .admin-Pagination').height() + 10) - 23
        this.props.userTaxManageInitView(maxHeight)
    }
    handleQueryClick(maxHeight){
        return ()=>{
            this.props.userTaxManageInitView(maxHeight)
        }
    }
    handleAnalyzeExportClick(){
        this.props.userAnalyzeExportClick()
    }
    getColumns(prefixCls,userList){
        let utils = this.props.payload.get('utils'),
            getterByField = utils.get('getterByField'),
            userTaxAppId = getterByField('userTaxManage.userTaxAppId')
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
                width={userTaxAppId==-1?455:200}
                cell={props=>(
                    <Cell>{userList.get(props.rowIndex).get('createTime')}</Cell>
                )}
            />,
            <Column
                key='enterpriseSum'
                header={(<Cell>{userTaxAppId==100?'账无忌':'云代账'}新增汇算清缴企业数</Cell>)}
                width={userTaxAppId==-1?0:255}
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
            this.props.goUserTaxInfoList(type, date)
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
            userList = getterByField('userTaxManage.ajaxData'),
            height = (userList.size) * 50 + 32,
            userTaxManage = getterByField('userTaxManage').toJS(),
            auth = this.props.auth && this.props.auth > 1,
            userTaxAppId = getterByField('userTaxManage.userTaxAppId')?getterByField('userTaxManage.userTaxAppId'):-1
        height = height > userTaxManage.maxHeight-36 ? userTaxManage.maxHeight-36 : height
        return (
            <div className={`${prefixCls}-operationPlatform ${prefixCls}-userAnalyze`} style={{"width":"680px"}}>
                <div className={`${prefixCls}-operationPlatform-form`}>
                    <DynamicComponent _path='admin.userTaxManage' {...otherProps} />
                    <div className={`${prefixCls}-operationPlatform-queryBtn`}>
                        <Button type='primary' onClick={::this.handleQueryClick(userTaxManage.maxHeight)}>查询</Button>
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
                    width={680}>
                    {this.getColumns(prefixCls,userList)
                    }
                </Table>
                {false?<div className={`${prefixCls}-Pagination`}>
                    <Pagination
                        showSizeChanger = {true}
                        showQuickJumper
                        current={userAnalyze.from.page.currentPage}
                        pageSize = {userAnalyze.from.page.pageSize}
                        total={userAnalyze.total}
                        onChange={::this.handlePageChange}
                        onShowSizeChange ={::this.handlePageSizeChange}
                        pageSizeOptions = {['20','50','100','200']}
                    />
                </div>:null}
            </div>
        )
    }
}