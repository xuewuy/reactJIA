import React,{ Component,PropTypes } from 'react'
import DynamicComponent from 'dynamicComponent'
import {Tabs, Button, Table, Column, Cell} from 'xComponent'
import UserTaxManage from './userTaxManage.js'
import OrgTaxManage from './orgTaxManage.js'
import moment from 'moment'
const TabPane = Tabs.TabPane

export default class TaxManageComponent extends Component {

    handleTaxManageTabClick(e){
        $('.ant-tabs-tabpane-active .admin-operationPlatform').height($('.ant-tabs-tabpane-active').outerHeight())
        let maxHeight = $('.admin-operationPlatform').height() - ($('.admin-operationPlatform .admin-operationPlatform-form').height() + 30)  - ($('.admin-operationPlatform .admin-Pagination').height() + 10) - 23
        // this.props.userAnalyzeInitView(maxHeight)
        this.props.saveTaxManageClick(e,maxHeight)
    }

    backTax(taxListType, taxManageType) {
        return () => {
            this.props.backTaxPage(taxListType, taxManageType)
        }
    }

    getOrgTaxInfoListColumns(prefixCls,orgList){
        return [
            <Column
                key='index'
                header={(<Cell>序号</Cell>)}
                width={40}
                cell={props=>(
                    <Cell>
                        {1 + props.rowIndex}
                    </Cell>
                )}
            />,
            <Column
                key='mobile'
                header={(<Cell>电话</Cell>)}
                width={200}
                cell={props=>(
                    <Cell>
                        {orgList.get(props.rowIndex).get('userName')}
                    </Cell>
                )}
            />,
            <Column
                key='name'
                header={(<Cell>企业名称</Cell>)}
                width={200}
                cell={props=>(
                    <Cell><div style={{width:'184px',overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap','textAlign':'left'}} title={orgList.get(props.rowIndex).get('orgName')}>{orgList.get(props.rowIndex).get('orgName')}</div></Cell>
                )}
            />,
            <Column
                key='createTime'
                header={(<Cell>创建日期</Cell>)}
                width={160}
                cell={props=>(
                    <Cell>
                        <div style={{width:'184px',overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap','textAlign':'left'}} title={orgList.get(props.rowIndex).get('createTime')?orgList.get(props.rowIndex).get('createTime').split(' ')[0]:''}>
                            {orgList.get(props.rowIndex).get('createTime')}
                        </div>
                    </Cell>
                )}
            />,
            <Column
                key='lastLoginTime'
                header={(<Cell>最后登录日期</Cell>)}
                width={160}
                cell={props=>(
                    <Cell>
                        <div style={{width:'184px',overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap','textAlign':'left'}} title={orgList.get(props.rowIndex).get('lastLoginTime')?orgList.get(props.rowIndex).get('lastLoginTime').split(' ')[0]:''}>
                            {orgList.get(props.rowIndex).get('lastLoginTime')}
                        </div>
                    </Cell>
                )}
            />
        ]

    }

    getUserTaxInfoListColumns(prefixCls,orgList){
        return [
            <Column
                key='index'
                header={(<Cell>序号</Cell>)}
                width={40}
                cell={props=>(
                    <Cell>
                        {1 + props.rowIndex}
                    </Cell>
                )}
            />,
            <Column
                key='userName'
                header={(<Cell>企业名称</Cell>)}
                width={200}
                cell={props=>(
                    <Cell><div style={{width:'184px',overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap','textAlign':'left'}} title={orgList.get(props.rowIndex).get('oname')}>{orgList.get(props.rowIndex).get('oname')}</div></Cell>
                )}
            />,
            <Column
                key='creatorName'
                header={(<Cell>纳税人身份</Cell>)}
                width={140}
                cell={props=>(
                    <Cell>
                        <div style={{width:'124px',overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap','textAlign':'left'}} title={orgList.get(props.rowIndex).get('vatTaxpayer')==41?'一般纳税人':'小规模纳税人'}>
                            {orgList.get(props.rowIndex).get('vatTaxpayer')}
                        </div>
                    </Cell>
                )}
            />,
            <Column
                key='userName'
                header={(<Cell>电话</Cell>)}
                width={160}
                cell={props=>(
                    <Cell>
                        <div style={{width:'144px',overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap','textAlign':'left'}} title={orgList.get(props.rowIndex).get('userName')}>
                            {orgList.get(props.rowIndex).get('userName')}
                        </div>
                    </Cell>
                )}
            />,
            <Column
                key='createTime'
                header={(<Cell>创建日期</Cell>)}
                width={200}
                cell={props=>(
                    <Cell>
                        <div style={{width:'184px',overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap','textAlign':'left'}} title={orgList.get(props.rowIndex).get('createTime')?orgList.get(props.rowIndex).get('createTime').split(' ')[0]:''}>
                            {orgList.get(props.rowIndex).get('createTime')}
                        </div>
                    </Cell>
                )}
            />,
            <Column
                key='endDate'
                header={(<Cell>截止日期</Cell>)}
                width={160}
                cell={props=>(
                    <Cell>
                        <div style={{width:'184px',overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap','textAlign':'left'}} title={orgList.get(props.rowIndex).get('endDate')?orgList.get(props.rowIndex).get('endDate').split(' ')[0]:''}>
                            {orgList.get(props.rowIndex).get('endDate')}
                        </div>
                    </Cell>
                )}
            />,
            <Column
                key='lastLoginTime'
                header={(<Cell>最后登录日期</Cell>)}
                width={160}
                cell={props=>(
                    <Cell>
                        <div style={{width:'184px',overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap','textAlign':'left'}} title={orgList.get(props.rowIndex).get('lastLoginTime')?orgList.get(props.rowIndex).get('lastLoginTime').split(' ')[0]:''}>
                            {orgList.get(props.rowIndex).get('lastLoginTime')}
                        </div>
                    </Cell>
                )}
            />
        ]
    }
    
	render(){
		let utils = this.props.payload.get('utils') ,
			getterByField = utils.get('getterByField'),
            message = this.props.payload.getIn(['global', 'message']),
			{prefixCls,...otherProps} = this.props,
            taxManageType = getterByField('taxManageType') ? getterByField('taxManageType') : '1',
            taxListType = getterByField('taxListType'),
            userTaxListInfo = getterByField('userTaxListInfo')?getterByField('userTaxListInfo').toJS():{},
            userTaxList = getterByField('userTaxList'),
            orgTaxListInfo = getterByField('orgTaxListInfo')?getterByField('orgTaxListInfo').toJS():{},
            orgTaxList = getterByField('orgTaxList')
        if(!taxListType) {
            return(
                <div className={`${prefixCls}-taxmanage`}>
                    <Tabs type="card" className={`${prefixCls}-taxmanage-tabs`} onTabClick={::this.handleTaxManageTabClick} activeKey={taxManageType}>
                        <TabPane key="1" tab='汇算清缴用户统计'>
                            {taxManageType != 1 ? null : <OrgTaxManage {...this.props} />}
                        </TabPane>                       
                        <TabPane key="2" tab='汇算清缴企业统计'>
                            {taxManageType != 2 ? null : <UserTaxManage {...this.props} />}
                        </TabPane>
                    </Tabs>
                  </div>     
            )
        } else if(taxListType == 1) {
            let orgListHeight = (orgTaxList.size) * 50 + 32,
                orgTaxManageMaxHeight = getterByField('orgTaxManage.maxHeight')      
            orgListHeight = orgListHeight > orgTaxManageMaxHeight ? orgTaxManageMaxHeight : orgListHeight
            
            return (
                <div className={`${prefixCls}-operationPlatform ${prefixCls}-organizationalInfo`} style={{width:'840px'}}>
                    <div className={`${prefixCls}-operationPlatform-form`}>
                        <span className='organizetionalList-title'>用户列表</span>
                        <div className={`${prefixCls}-operationPlatform-backBtn`}>
                            <Button onClick={::this.backTax(0, 2)} type='primary'>返回汇算清缴用户统计</Button>
                        </div>
                        
                    </div>
                    <Table
                        rowsCount={orgTaxList.size}
                        rowHeight={50}
                        headerHeight={30}
                        height={orgListHeight}
                        width={840}>
                        {this.getOrgTaxInfoListColumns(prefixCls,orgTaxList)
                        }
                    </Table>
                </div>
            )
        } else if(taxListType == 2) {
            let userListHeight = (userTaxList.size) * 50 + 32,
                userTaxManageMaxHeight = getterByField('userTaxManage.maxHeight')      
            userListHeight = userListHeight > userTaxManageMaxHeight ? userTaxManageMaxHeight : userListHeight
            return (
                <div className={`${prefixCls}-operationPlatform ${prefixCls}-organizationalInfo`} style={{width:'1140px'}}>
                    <div className={`${prefixCls}-operationPlatform-form`}>
                        <span className='organizetionalList-title'>企业列表</span>
                        <div className={`${prefixCls}-operationPlatform-backBtn`}>
                            <Button onClick={::this.backTax(0, 1)} type='primary'>返回汇算清缴企业统计</Button>
                        </div>
                        
                    </div>
                    <Table
                        rowsCount={userTaxList.size}
                        rowHeight={50}
                        headerHeight={30}
                        height={userListHeight}
                        width={1140}>
                        {this.getUserTaxInfoListColumns(prefixCls,userTaxList)
                        }
                    </Table>
                </div>
            )
        }
		
	}
}