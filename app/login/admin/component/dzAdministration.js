import React,{ Component,PropTypes } from 'react'
import DynamicComponent from 'dynamicComponent'
import {HCFLayout,Button, Tabs, Radio, Table, Column, Cell, Card,Modal} from 'xComponent'

export default class dzAdministrationComponent extends Component {
    componentDidMount() {
        $('.ant-tabs-tabpane-active .admin-operationPlatform').height($('.ant-tabs-tabpane-active').outerHeight())
    }
    handleOrgQuery(){
        this.props.spQuery()
    }
    handleEditOrg(index){
        return ()=>{
            this.props.editOrg(index,true)
        }
    }
    getColumns(prefixCls,orgList){
        let isDisabled = this.props.auth && this.props.auth > 1
        return [
            <Column
                key='index'
                header={(<Cell>序号</Cell>)}
                width={40}
                cell={props=>(
                    <Cell>
                        {props.rowIndex+1}
                    </Cell>
                )}
            />,
            <Column
                key='name'
                header={(<Cell>企业名称</Cell>)}
                width={380}
                cell={props=>(
                    <Cell><div style={{width:'372px',overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap'}} title={orgList.getIn([props.rowIndex]).name}>{orgList.getIn([props.rowIndex]).name}</div></Cell>
                )}
            />,
            <Column
                key='requiredOrgCount'
                header={(<Cell>申请账套数</Cell>)}
                width={90}
                cell={props=>(
                    <Cell>{orgList.get(props.rowIndex).requiredOrgCount}</Cell>
                )}
            />,
            <Column
                key='maxOrgCount'
                header={(<Cell>账套上线数</Cell>)}
                width={90}
                cell={props=>(
                    <Cell>{orgList.get(props.rowIndex).maxOrgCount}</Cell>
                )}
            />,
            <Column
                key='creatorName'
                header={(<Cell>管理员姓名</Cell>)}
                width={120}
                cell={props=>(
                    <Cell>{orgList.getIn([props.rowIndex]).creatorName}</Cell>
                )}
            />,
            <Column
                key='creatorMobile'
                header={(<Cell>电话</Cell>)}
                width={120}
                cell={props=>(
                    <Cell>{orgList.getIn([props.rowIndex]).creatorMobile}</Cell>
                )}
            />,
            <Column
                key='createTime'
                header={(<Cell>申请日期</Cell>)}
                width={110}
                cell={props=>(
                    <Cell>{orgList.getIn([props.rowIndex]).createTime?orgList.getIn([props.rowIndex]).createTime.split(' ')[0]:''}</Cell>
                )}
            />,
            <Column
                key='status'
                header={(<Cell>状态</Cell>)}
                width={110}
                cell={props=>(
                    <Cell>{orgList.getIn([props.rowIndex]).status ? '正常' : '未审核'}</Cell>
                )}
            />,
            <Column
                key='control'
                header={(<Cell>操作</Cell>)}
                width={90}
                cell={props=>(
                    <Cell>
                        <Button disabled={!isDisabled} onClick={::this.handleEditOrg(props.rowIndex)}>
                            管理
                        </Button>
                    </Cell>
                )}
            />
        ]
    }
    render(){
        let {prefixCls, ...otherProps} = this.props
        let utils = this.props.payload.get('utils'),
            getterByField = utils.get('getterByField'),
            dzAdministrationList = getterByField('dzAdministrationList'),
            height = (dzAdministrationList.size) * 50 + 32
        height = height > $('.ant-tabs-content-no-animated').outerHeight() - 97? $('.ant-tabs-content-no-animated').outerHeight() - 97  : height
        height = height<32?32:height
        return (
            <div className={`${prefixCls}-operationPlatform ${prefixCls}-organizationalAdministration`}>
                <div className={`${prefixCls}-operationPlatform-form`}>
                    <DynamicComponent _path='admin.dzAdministration' {...otherProps} />
                    <div className={`${prefixCls}-operationPlatform-queryBtn`}>
                        <Button onClick={::this.handleOrgQuery}>查询</Button>
                    </div>
                </div>
                <Table 
                    rowsCount={dzAdministrationList.size}
                    rowHeight={50}
                    headerHeight={30}
                    height={height}
                    width={1150}>
                    {this.getColumns(prefixCls,dzAdministrationList)
                    }
                 </Table>
            </div>
        )
    }
}