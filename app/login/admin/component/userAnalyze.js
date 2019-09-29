import React,{ Component,PropTypes } from 'react'
import DynamicComponent from 'dynamicComponent'
import {HCFLayout,Button, Tabs, Radio, Table, Column, Cell, Card,Modal,Pagination} from 'xComponent'

export default class userAnalyzeComponent extends Component {
    componentDidMount() {
        $('.ant-tabs-tabpane-active .admin-operationPlatform').height($('.ant-tabs-tabpane-active').outerHeight())
        let maxHeight = $('.admin-operationPlatform').height() - ($('.admin-operationPlatform .admin-operationPlatform-form').height() + 30)  - ($('.admin-operationPlatform .admin-Pagination').height() + 10) - 23
        this.props.userAnalyzeInitView(maxHeight)
    }
    handleQueryClick(maxHeight){
        return ()=>{
            this.props.userAnalyzeInitView(maxHeight)
        }
    }
    handleAnalyzeExportClick(){
        this.props.userAnalyzeExportClick()
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
                key='createTime'
                header={(<Cell>日期</Cell>)}
                width={200}
                cell={props=>(
                    <Cell>{userList.get(props.rowIndex).get('createTime')}</Cell>
                )}
            />,
            <Column
                key='enterpriseSum'
                header={(<Cell>企业端新增用户数</Cell>)}
                width={180}
                cell={props=>(
                    <Cell>{userList.get(props.rowIndex).get('enterpriseSum')}</Cell>
                )}
            />,
            <Column
                key='dzSum'
                header={(<Cell>代账端新增用户数</Cell>)}
                width={180}
                cell={props=>(
                    <Cell>{userList.get(props.rowIndex).get('dzSum')}</Cell>
                )}
            />,
            <Column
                key='count'
                header={(<Cell>新增用户数</Cell>)}
                width={180}
                cell={props=>(
                    <Cell>{userList.get(props.rowIndex).get('count')}</Cell>
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
            userList = getterByField('userAnalyze.ajaxData'),
            height = (userList.size) * 50 + 32,
            userAnalyze = getterByField('userAnalyze').toJS(),
            auth = this.props.auth && this.props.auth > 1
        height = height > userAnalyze.maxHeight ? userAnalyze.maxHeight : height
        return (
            <div className={`${prefixCls}-operationPlatform ${prefixCls}-userAnalyze`}>
                <div className={`${prefixCls}-operationPlatform-form`}>
                    <DynamicComponent _path='admin.userAnalyze' {...otherProps} />
                    <div className={`${prefixCls}-operationPlatform-queryBtn`}>
                        <Button type='primary' onClick={::this.handleQueryClick(userAnalyze.maxHeight)}>查询</Button>
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
                    {this.getColumns(prefixCls,userList,userAnalyze.from.page)
                    }
                </Table>
                <div className={`${prefixCls}-Pagination`}>
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
                </div>
            </div>
        )
    }
}