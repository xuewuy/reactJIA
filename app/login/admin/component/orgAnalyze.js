import React,{ Component,PropTypes } from 'react'
import DynamicComponent from 'dynamicComponent'
import {HCFLayout,Button, Tabs, Radio, Table, Column, Cell, Card,Modal,Pagination} from 'xComponent'

export default class orgAnalyzeComponent extends Component {
    componentDidMount() {
        $('.ant-tabs-tabpane-active .admin-operationPlatform').height($('.ant-tabs-tabpane-active').outerHeight())
        let maxHeight = $('.admin-operationPlatform').height() - ($('.admin-operationPlatform .admin-operationPlatform-form').height() + 30)  - ($('.admin-operationPlatform .admin-Pagination').height() + 10) - 23
        this.props.orgAnalyzeInitView(maxHeight)
    }
    handleQueryClick(maxHeight){
        return ()=>{
            this.props.orgAnalyzeInitView(maxHeight)
        }
    }
    handleAnalyzeExportClick(){
        this.props.orgAnalyzeExportClick()
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
                key='appName'
                header={(<Cell>所属伙伴</Cell>)}
                width={200}
                cell={props=>(
                    <Cell>{userList.get(props.rowIndex).get('appName')}</Cell>
                )}
            />,
            <Column
                key='createTime'
                header={(<Cell>日期</Cell>)}
                width={200}
                cell={props => (
                    <Cell>{userList.get(props.rowIndex).get('createTime')}</Cell>
                )}
            />,
            <Column
                key='enterpriseSum'
                header={(<Cell>企业端新增企业数</Cell>)}
                width={130}
                cell={props=>(
                    <Cell>{userList.get(props.rowIndex).get('enterpriseSum')}</Cell>
                )}
            />,
            <Column
                key='dzSum'
                header={(<Cell>代账端新增企业数</Cell>)}
                width={130}
                cell={props=>(
                    <Cell>{userList.get(props.rowIndex).get('dzSum')}</Cell>
                )}
            />,
            <Column
                key='count'
                header={(<Cell>新增企业数</Cell>)}
                width={130}
                cell={props=>(
                    <Cell>{userList.get(props.rowIndex).get('count')}</Cell>
                )}
            />,
            <Column
                key='sum'
                header={(<Cell>累计新增企业数</Cell>)}
                width={130}
                cell={props=>(
                    <Cell>{userList.get(props.rowIndex).get('sum')}</Cell>
                )}
            />
        ]
    }
    handlePageChange(e){
        this.props.orgAnalyzePageChange(e)
    }
    handlePageSizeChange(e,size){
        this.props.orgAnalyzePageSizeChange(size)
    }
    render(){
        
        let {prefixCls, ...otherProps} = this.props
        let utils = this.props.payload.get('utils'),
            getterByField = utils.get('getterByField'),
            userList = getterByField('orgAnalyze.ajaxData'),
            height = (userList.size) * 50 + 32,
            orgAnalyze = getterByField('orgAnalyze').toJS(),
            auth = this.props.auth && this.props.auth > 1
        height = height > orgAnalyze.maxHeight ? orgAnalyze.maxHeight : height
        // height = height > 402 ? 402 : height
        return (
            <div className={`${prefixCls}-operationPlatform ${prefixCls}-orgAnalyze`}>
                <div className={`${prefixCls}-operationPlatform-form`}>
                    <DynamicComponent _path='admin.orgAnalyze' {...otherProps} />
                    <div className={`${prefixCls}-operationPlatform-queryBtn`}>
                        <Button type='primary' onClick={::this.handleQueryClick(orgAnalyze.maxHeight)}>查询</Button>
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
                    {this.getColumns(prefixCls,userList,orgAnalyze.from.page)
                    }
                </Table>
                <div className={`${prefixCls}-Pagination`}>
                    <Pagination
                        showSizeChanger = {true}
                        showQuickJumper
                        current={orgAnalyze.from.page.currentPage}
                        pageSize = {orgAnalyze.from.page.pageSize}
                        total={orgAnalyze.total}
                        onChange={::this.handlePageChange}
                        onShowSizeChange ={::this.handlePageSizeChange}
                        pageSizeOptions = {['20','50','100','200']}
                    />
                </div>
            </div>
        )
    }
}