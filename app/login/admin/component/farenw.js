import React,{ Component,PropTypes } from 'react'
import DynamicComponent from 'dynamicComponent'
import {HCFLayout,Button, Tabs, Radio, Table, Column, Cell, Card,Modal,Pagination} from 'xComponent'

export default class farenwComponent extends Component {
    componentDidMount() {
        $('.ant-tabs-tabpane-active .admin-operationPlatform').height($('.ant-tabs-tabpane-active').outerHeight())
        let maxHeight = $('.admin-operationPlatform').height() - ($('.admin-operationPlatform .admin-operationPlatform-form').height() + 30)  - ($('.admin-operationPlatform .admin-Pagination').height() + 10) - 23
        this.props.farenwInitView(maxHeight)
    }
    handleQueryClick(){
        return ()=>{
            this.props.farenwQuery()
        }
    }

    handleEditClientClick(rowIndex){
        return ()=>{ 
            this.props.showFarenwEdit(rowIndex)
        }
    }

    getColumns(prefixCls,farenwList,page){
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
                key='edit'
                header={(<Cell>管理</Cell>)}
                width={90}
                cell={props=>(
                    <Cell>
                        <Button 
                          type="dashed"  
                          className={`${prefixCls}-edit-but`}
                          onClick={::this.handleEditClientClick(props.rowIndex)}
                          style={{marginLeft:4,marginRight:4}}
                          >
                          编辑
                      </Button>
                    </Cell>
                )}
            />,
            <Column
                key='code'
                header={(<Cell>会员卡编码</Cell>)}
                width={100}
                cell={props=>(
                    <Cell>
                        <div style={{width:'104px',overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap','textAlign':'left'}} title={farenwList.get(props.rowIndex).get('code')}>
                            {farenwList.get(props.rowIndex).get('code')}
                        </div>
                    </Cell>
                )}
            />,
            <Column
                key='secret'
                header={(<Cell>会员卡密码</Cell>)}
                width={100}
                cell={props=>(
                    <Cell>
                        <div style={{width:'94px',overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap','textAlign':'left'}} title={farenwList.get(props.rowIndex).get('secret')}>
                            {farenwList.get(props.rowIndex).get('secret')}
                        </div>
                    </Cell>
                )}
            />,
            <Column
                key='createTime'
                header={(<Cell>导入时间</Cell>)}
                width={93}
                cell={props=>(
                    <Cell>
                        <div style={{width:'94px',overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap','textAlign':'left'}} title={farenwList.get(props.rowIndex).get('createTime')?farenwList.get(props.rowIndex).get('createTime').split(' ')[0]:''}>
                            {farenwList.get(props.rowIndex).get('createTime')?farenwList.get(props.rowIndex).get('createTime').split(' ')[0]:''}
                        </div>
                    </Cell>
                )}
            />,
            <Column
                key='effectiveTime'
                header={(<Cell>生效时间</Cell>)}
                width={93}
                cell={props=>(
                    <Cell>
                        <div style={{width:'94px',overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap','textAlign':'left'}} title={farenwList.get(props.rowIndex).get('effectiveTime')?farenwList.get(props.rowIndex).get('effectiveTime').split(' ')[0]:''}>
                            {farenwList.get(props.rowIndex).get('effectiveTime')?farenwList.get(props.rowIndex).get('effectiveTime').split(' ')[0]:''}
                        </div>
                    </Cell>
                )}
            />,
            <Column
                key='expireTime'
                header={(<Cell>失效时间</Cell>)}
                width={93}
                cell={props=>(
                    <Cell>
                        <div style={{width:'94px',overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap','textAlign':'left'}} title={farenwList.get(props.rowIndex).get('expireTime')?farenwList.get(props.rowIndex).get('expireTime').split(' ')[0]:''}>
                            {farenwList.get(props.rowIndex).get('expireTime')?farenwList.get(props.rowIndex).get('expireTime').split(' ')[0]:''}
                        </div>
                    </Cell>
                )}
            />,
            <Column
                key='mobile'
                header={(<Cell>绑定易嘉账号</Cell>)}
                width={120}
                cell={props=>(
                    <Cell>
                        <div style={{width:'94px',overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap','textAlign':'left'}} title={farenwList.get(props.rowIndex).get('mobile')}>
                            {farenwList.get(props.rowIndex).get('mobile')}
                        </div>
                    </Cell>
                )}
            />,
            <Column
                key='bindTime'
                header={(<Cell>绑定激活时间</Cell>)}
                width={120}
                cell={props=>(
                    <Cell>
                        {
                         <div style={{width:'94px',overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap','textAlign':'left'}} title={farenwList.get(props.rowIndex).get('bindTime')?farenwList.get(props.rowIndex).get('bindTime').split(' ')[0]:''}>
                            {farenwList.get(props.rowIndex).get('bindTime')?farenwList.get(props.rowIndex).get('bindTime').split(' ')[0]:''}
                        </div>

                        }
                    </Cell>
                )}
            />,
            <Column
                key='orgCount'
                header={(<Cell>创建账套</Cell>)}
                width={90}
                cell={props=>(
                    <Cell>
                        {
                            farenwList.get(props.rowIndex).get('orgCount')?farenwList.get(props.rowIndex).get('orgCount'):0
                        }
                    </Cell>
                )}
            />,
            <Column
                key='counselCount'
                header={(<Cell>剩余咨询次数</Cell>)}
                width={120}
                cell={props=>(
                    <Cell>
                        {
                            farenwList.get(props.rowIndex).get('counselCount')?(farenwList.get(props.rowIndex).get('counselCount') != -1?farenwList.get(props.rowIndex).get('counselCount'):'不限次'):0
                        }
                    </Cell>
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
                key='edit'
                header={(<Cell>管理</Cell>)}
                width={90}
                cell={props=>(
                    <Cell>
                        <Button 
                          type="dashed"  
                          className={`${prefixCls}-edit-but`}
                          onClick={::this.handleEditClientClick(props.rowIndex)}
                          style={{marginLeft:4,marginRight:4}}
                          >
                          编辑
                      </Button>
                    </Cell>
                )}
            />,
            <Column
                key='code'
                header={(<Cell>会员卡编码</Cell>)}
                width={100}
                cell={props=>(
                    <Cell>
                        <div style={{width:'104px',overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap','textAlign':'left'}} title={farenwList.get(props.rowIndex).get('code')}>
                            {farenwList.get(props.rowIndex).get('code')}
                        </div>
                    </Cell>
                )}
            />,
            <Column
                key='secret'
                header={(<Cell>会员卡密码</Cell>)}
                width={100}
                cell={props=>(
                    <Cell>
                        <div style={{width:'94px',overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap','textAlign':'left'}} title={farenwList.get(props.rowIndex).get('secret')}>
                            {farenwList.get(props.rowIndex).get('secret')}
                        </div>
                    </Cell>
                )}
            />,
            <Column
                key='createTime'
                header={(<Cell>导入时间</Cell>)}
                width={93}
                cell={props=>(
                    <Cell>
                        <div style={{width:'94px',overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap','textAlign':'left'}} title={farenwList.get(props.rowIndex).get('createTime')?farenwList.get(props.rowIndex).get('createTime').split(' ')[0]:''}>
                            {farenwList.get(props.rowIndex).get('createTime')?farenwList.get(props.rowIndex).get('createTime').split(' ')[0]:''}
                        </div>
                    </Cell>
                )}
            />,
            <Column
                key='effectiveTime'
                header={(<Cell>生效时间</Cell>)}
                width={93}
                cell={props=>(
                    <Cell>
                        <div style={{width:'94px',overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap','textAlign':'left'}} title={farenwList.get(props.rowIndex).get('effectiveTime')?farenwList.get(props.rowIndex).get('effectiveTime').split(' ')[0]:''}>
                            {farenwList.get(props.rowIndex).get('effectiveTime')?farenwList.get(props.rowIndex).get('effectiveTime').split(' ')[0]:''}
                        </div>
                    </Cell>
                )}
            />,
            <Column
                key='expireTime'
                header={(<Cell>失效时间</Cell>)}
                width={93}
                cell={props=>(
                    <Cell>
                        <div style={{width:'94px',overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap','textAlign':'left'}} title={farenwList.get(props.rowIndex).get('expireTime')?farenwList.get(props.rowIndex).get('expireTime').split(' ')[0]:''}>
                            {farenwList.get(props.rowIndex).get('expireTime')?farenwList.get(props.rowIndex).get('expireTime').split(' ')[0]:''}
                        </div>
                    </Cell>
                )}
            />,
            <Column
                key='mobile'
                header={(<Cell>绑定易嘉账号</Cell>)}
                width={120}
                cell={props=>(
                    <Cell>
                        <div style={{width:'94px',overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap','textAlign':'left'}} title={farenwList.get(props.rowIndex).get('mobile')}>
                            {farenwList.get(props.rowIndex).get('mobile')}
                        </div>
                    </Cell>
                )}
            />,
            <Column
                key='bindTime'
                header={(<Cell>绑定激活时间</Cell>)}
                width={120}
                cell={props=>(
                    <Cell>
                        {
                         <div style={{width:'94px',overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap','textAlign':'left'}} title={farenwList.get(props.rowIndex).get('bindTime')?farenwList.get(props.rowIndex).get('bindTime').split(' ')[0]:''}>
                            {farenwList.get(props.rowIndex).get('bindTime')?farenwList.get(props.rowIndex).get('bindTime').split(' ')[0]:''}
                        </div>

                        }
                    </Cell>
                )}
            />,
            <Column
                key='orgCount'
                header={(<Cell>创建账套</Cell>)}
                width={90}
                cell={props=>(
                    <Cell>
                        {
                            farenwList.get(props.rowIndex).get('orgCount')?farenwList.get(props.rowIndex).get('orgCount'):0
                        }
                    </Cell>
                )}
            />,
            <Column
                key='counselCount'
                header={(<Cell>剩余咨询次数</Cell>)}
                width={120}
                cell={props=>(
                    <Cell>
                        {
                            farenwList.get(props.rowIndex).get('counselCount')?(farenwList.get(props.rowIndex).get('counselCount') != -1?farenwList.get(props.rowIndex).get('counselCount'):'不限次'):0
                        }
                    </Cell>
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
        this.props.farenwPageChange(e)
    }
    handlePageSizeChange(e,size){
        this.props.farenwPageSizeChange(size)
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
 
    }

    farenwEditContext(row){
        
    }

    handleFarenwPageSure() {
        let utils = this.props.payload.get('utils') ,
            getterByField = utils.get('getterByField'),
            farenw = getterByField('farenw').toJS(),
            currentPage = $('.page-farenw-box .ant-pagination-options-quick-jumper input').attr('value'),
            current = parseInt(currentPage),
            totalPage =Math.ceil(farenw.total / farenw.from.page.pageSize)

        if( current > totalPage) {
            current = totalPage
        } else if (current == 0 || current < 0) {
            current = 1
        } else if(isNaN(current)) {
            current = 1			
        }
        this.props.farenwPageChange(current)
        
    }
    render(){
        let {prefixCls, ...otherProps} = this.props
        
        let utils = this.props.payload.get('utils'),
            getterByField = utils.get('getterByField'),
            farenwList = getterByField('farenw.ajaxData'),
            height = (farenwList.size) * 50 + 32,
            farenw = getterByField('farenw').toJS(),
            auth = this.props.auth && this.props.auth > 1,
            listHeight = (farenwList.size) * 50 + 32
        height = height > farenw.maxHeight ? farenw.maxHeight : height
        // height = height > 402 ? 402 : height
       

            return (
                <div className={`${prefixCls}-operationPlatform ${prefixCls}-organizationalInfo`} style={{width:'1270px'}}>
                    <div className={`${prefixCls}-operationPlatform-form`}>
                        <DynamicComponent _path='admin.farenw' {...otherProps} />
                        <div className={`${prefixCls}-operationPlatform-queryBtn`}>
                            <Button onClick={::this.handleQueryClick()}>查询</Button>
                        </div>
                    </div>
                    <Table
                        rowsCount={farenwList.size}
                        rowHeight={50}
                        headerHeight={30}
                        height={height}
                        width={1060}>
                        {this.getColumns(prefixCls,farenwList,farenw.from.page)
                        }
                    </Table>
                    <div className={`${prefixCls}-Pagination  page-dzinfo-box`}>
                        <Pagination
                            showSizeChanger
                            showQuickJumper
                            current={farenw.from.page.currentPage}
                            pageSize = {farenw.from.page.pageSize}
                            total={farenw.total}
                            onChange={::this.handlePageChange}
                            onShowSizeChange ={::this.handlePageSizeChange}
                            pageSizeOptions = {['20','50','100','200']}
                        />
                        <Button onClick={::this.handleFarenwPageSure}  type='default' className='page-sure-btn page-dzinfo-sure-btn'>确定</Button>
                    </div>
                </div>
            )
        
    }
}
