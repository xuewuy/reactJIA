import React,{ Component,PropTypes } from 'react'
import DynamicComponent from 'dynamicComponent'
import {Button, Table, Column, Cell, Modal,ZIcon,Icon,Pagination} from 'xComponent'
import CreatePartnerPlan from './createPartnerPlan'
import moment from 'moment'

export default class PartnerPlanManageComponent extends Component {

    handlePartnerPlanDelete(partnerPlanId,ts) {
        return ()=> {
            this.props.partnerPlanDelete(partnerPlanId,ts)
        }
    }
    handlePartnerPlanUpdate(partnerPlanList) {
        return ()=> {
            this.props.getCityData(partnerPlanList)
        }
    }
    handlePartnerPlanAdd() {
        this.props.setAddShow('partnerPlan')
    }

    handlePageChange(current) {
        this.props.homeInPageChange(current,'partnerPlan')
    }

    handlePageSizeChange(current, size) {
        this.props.homePageSizeChange(current, size,'partnerPlan')
    }
    
    render(){
        let utils = this.props.payload.get('utils') ,
            getterByField = utils.get('getterByField'),
            partnerPlanList = getterByField('partnerPlanManageList').toJS(),
            partnerPlanManageListPage = getterByField('partnerPlanManageListPage').toJS(),
            {prefixCls,...otherProps} = this.props,
            isShowCreatePartnerPlan = getterByField('isShowCreatePartnerPlan'),
            isShowAdd = getterByField('isShowAdd'),
            height = (partnerPlanList.length)*50+32

        height = height > $('.ant-tabs-content-no-animated').outerHeight() - 200? $('.ant-tabs-content-no-animated').outerHeight() - 200  : height
        height = height<32?32:height
        return(
            <div className={`${prefixCls}-partnerPlan`}>
                <div className={`${prefixCls}-homeInfo-table`}>
                    <div className={`${prefixCls}-homeInfo-table-top`}>
                        <div className={`${prefixCls}-homeInfo-header-left`}>
                            <DynamicComponent _path='admin.partnerPlan' {...otherProps} />
                        </div>
                        
                        <div className={`${prefixCls}-homeInfo-header-right`}>
                            <Button type="primary" disabled={this.props.auth!=2} onClick={::this.handlePartnerPlanAdd}>新增</Button>
                        </div>
                    </div>
                    <Table 
                        rowsCount={partnerPlanList.length}
                        rowHeight={50}
                        headerHeight={30}
                        height={height}
                        width={1240}>
                        {this.getColumns(prefixCls,partnerPlanList)}
                    </Table>
                    <Pagination 
                        current={partnerPlanManageListPage.current} 
                        total={partnerPlanManageListPage.total} 
                        pageSize={partnerPlanManageListPage.pageSize} 
                        onChange={::this.handlePageChange} 
                        onShowSizeChange = {::this.handlePageSizeChange}
                        showSizeChanger 
                        showQuickJumper
                    />
                </div>
                {this.renderCreatePartnerPlan(isShowCreatePartnerPlan,isShowAdd)}
                
            </div>     
        
        )
    }

    getColumns(prefixCls,partnerPlanList){
        let utils = this.props.payload.get('utils') ,
            getterByField = utils.get('getterByField'),
            isDisabled = this.props.auth && this.props.auth > 1
        return [
            <Column
                key='headerLine'
                header={(<Cell>序号</Cell>)}
                width={40}
                cell={props=>(
                    <Cell>
                        {props.rowIndex+1}
                    </Cell>)
                }
            />,
            <Column
                key='name'
                header={(<Cell>姓名</Cell>)}
                width={80}
                cell={props=>(
                    <Cell>
                        <span style={{'whiteSpace': 'nowrap', 'textOverflow': 'ellipsis', 'overflow': 'hidden', 'width': '63', 'display': 'block' }} title={partnerPlanList[props.rowIndex].name}>{partnerPlanList[props.rowIndex].name}</span>
                    </Cell>
                )}
            />,
            <Column
                key='phoneNumber'
                header={(<Cell>联系电话</Cell>)}
                width={80}
                cell={props=>(
                    <Cell>
                        <span style={{'whiteSpace': 'nowrap', 'textOverflow': 'ellipsis', 'overflow': 'hidden', 'width': '63', 'display': 'block' }} title={partnerPlanList[props.rowIndex].phoneNumber}>{partnerPlanList[props.rowIndex].phoneNumber}</span>
                    </Cell>
                )}
            />,
            <Column
                key='createTime'
                header={(<Cell>申请/新增日期</Cell>)}
                width={100}
                cell={props=>(
                    <Cell>
                        {partnerPlanList[props.rowIndex].createTime ? partnerPlanList[props.rowIndex].createTime.split(' ')[0] : ''}
                    </Cell>
                )}
            />,
            <Column
                key='email'
                header={(<Cell>联系邮箱</Cell>)}
                width={100}
                cell={props=>(
                    <Cell>
                        <span style={{'whiteSpace': 'nowrap', 'textOverflow': 'ellipsis', 'overflow': 'hidden', 'width': '83', 'display': 'block' }} title={partnerPlanList[props.rowIndex].email}>{partnerPlanList[props.rowIndex].email}</span>
                    </Cell>
                )}
            />,
            <Column
                key='companyName'
                header={(<Cell>公司名称</Cell>)}
                width={150}
                cell={props=>(
                    <Cell>
                        <span style={{'whiteSpace': 'nowrap', 'textOverflow': 'ellipsis', 'overflow': 'hidden', 'width': '133', 'display': 'block' }} title={partnerPlanList[props.rowIndex].companyName}>{partnerPlanList[props.rowIndex].companyName}</span>
                    </Cell>)
                }
            />,
            <Column
                key='place'
                header={(<Cell>所在地区</Cell>)}
                width={100}
                cell={props=>(
                    <Cell>
                        <span style={{'whiteSpace': 'nowrap', 'textOverflow': 'ellipsis', 'overflow': 'hidden', 'width': '83', 'display': 'block' }} title={partnerPlanList[props.rowIndex].place}>{partnerPlanList[props.rowIndex].place}</span>
                    </Cell>
                )}
            />,
            <Column
                key='employeeNum'
                header={(<Cell>员工人数</Cell>)}
                width={80}
                cell={props=>(
                    <Cell>
                        <span style={{'whiteSpace': 'nowrap', 'textOverflow': 'ellipsis', 'overflow': 'hidden', 'width': '63', 'display': 'block' }} title={partnerPlanList[props.rowIndex].employeeName}>{partnerPlanList[props.rowIndex].employeeName}</span>
                    </Cell>
                )}
            />,
            <Column
                key='type'
                header={(<Cell>伙伴类型</Cell>)}
                width={120}
                cell={props=>(
                    <Cell>
                        <span style={{'whiteSpace': 'nowrap', 'textOverflow': 'ellipsis', 'overflow': 'hidden', 'width': '103', 'display': 'block' }} title={partnerPlanList[props.rowIndex].typeName}>{partnerPlanList[props.rowIndex].typeName}</span>
                    </Cell>
                )}
            />,
            <Column
                key='businessIntroduction'
                header={(<Cell>业务介绍</Cell>)}
                width={150}
                cell={props=>(
                    <Cell>
                        <span style={{'whiteSpace': 'nowrap', 'textOverflow': 'ellipsis', 'overflow': 'hidden', 'width': '133', 'display': 'block' }} title={partnerPlanList[props.rowIndex].businessIntroduction}>{partnerPlanList[props.rowIndex].businessIntroduction}</span>
                    </Cell>
                )}
            />,
            <Column
                key='status'
                header={(<Cell>状态</Cell>)}
                width={60}
                cell={props=>(
                    <Cell>
                        {partnerPlanList[props.rowIndex].status == '1' ? '已签约' : '待跟踪' }
                    </Cell>
                )}
            />,
            <Column
                key='operation'
                header={(<Cell>操作</Cell>)}
                width={180}
                cell={props=>(
                    <Cell>
                        <Button 
                            type="dashed"  
                            className={`${prefixCls}-homeInfo-operation-buy`}
                            disabled={this.props.auth!=2}
                            onClick={::this.handlePartnerPlanUpdate(partnerPlanList[props.rowIndex])}
                            style={{marginRight:4}}
                            >
                            编辑备注
                        </Button>
                        
                        <Button 
                            type="dashed"  
                            disabled={this.props.auth!=2}
                            className={`${prefixCls}-homeInfo-operation-buy`}
                            onClick={::this.handlePartnerPlanDelete(partnerPlanList[props.rowIndex].id,partnerPlanList[props.rowIndex].ts)}
                            style={{marginLeft:4}}
                            >
                            删除
                        </Button>
                    </Cell>
                )}
            />

        ]
    }

    renderCreatePartnerPlan(isShowCreatePartnerPlan,isShowAdd){
        if(!isShowCreatePartnerPlan) return null
        let handleCancelContract = () => {
                this.props.partnerPlanSave('cancelContract')
            },
            handleContract = () => {
                this.props.partnerPlanSave('isChangeType')
            },
            onOk = () => {
                this.props.partnerPlanSave()
            },
            onCancel = () => {
                this.props.createPartnerPlanCancel()
            },
            disabled = !!isShowAdd && (isShowAdd == 'isShowAdd' || isShowAdd == '1') ? true : false,
            footer = !!isShowAdd && isShowAdd == '1' ? 
                [<Button key="submitAndRelease" type="primary" onClick={handleCancelContract}>取消签约</Button>,
                <Button key="back" onClick={onCancel}>取消</Button>,
                <Button key="submit" type="primary" onClick={onOk}>保存</Button>]
                :
                [<Button key="submitAndRelease" type="primary" onClick={handleContract} disabled={disabled}>转为已签约伙伴</Button>,
                <Button key="back" onClick={onCancel}>取消</Button>,
                <Button key="submit" type="primary" onClick={onOk}>保存</Button>]

        return (
            <Modal 
                visible
                type ='modal'
                title='伙伴信息'
                width={851}
                footer={footer}
                onCancel={onCancel}
                maskClosable={false}
                wrapClassName='homeInfo-createPartnerPlan'
                >
                <CreatePartnerPlan {...this.props} />
            </Modal>
        )
    }

}