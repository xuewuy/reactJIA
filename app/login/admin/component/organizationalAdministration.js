import React,{ Component,PropTypes } from 'react'
import DynamicComponent from 'dynamicComponent'
import {HCFLayout,Button, Tabs, Radio, Table, Column, Cell, Card,Modal} from 'xComponent'

export default class organizationalAdministrationComponent extends Component {
    handleOrgQuery(){
        this.props.orgQuery()
    }
    handleEditOrg(index){
        return ()=>{
            this.props.editOrg(index)
        }
    }
    handleOrgCreateOrder(index){
        return ()=>{
            this.props.orgCreateOrder(index)
        }
    }
    componentDidMount() {
        $('.ant-tabs-tabpane-active .admin-operationPlatform').height($('.ant-tabs-tabpane-active').outerHeight())
    }
    getColumns(prefixCls,orgList,appInfo){
        let isDisabled = this.props.auth && this.props.auth > 1 
        if(appInfo&&appInfo.get('id')==1000){
            return [
                <Column
                    key='name'
                    header={(<Cell>序号</Cell>)}
                    width={40}
                    cell={props=>(
                        <Cell>
                            {props.rowIndex+1}
                        </Cell>
                    )}
                />,
                <Column
                    key='orgName'
                    header={(<Cell>企业名称</Cell>)}
                    width={180}
                    cell={props=>(
                        <Cell><div style={{width:'172px',overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap'}} title={orgList.getIn([props.rowIndex]).name}>{orgList.getIn([props.rowIndex]).name}</div></Cell>
                    )}
                />,
                <Column
                    key='users'
                    header={(<Cell>已激活用户数</Cell>)}
                    width={0}
                    cell={props=>(
                        <Cell>{orgList.getIn([props.rowIndex]).users}</Cell>
                    )}
                />,
                <Column
                    key='creatorName'
                    header={(<Cell>管理员姓名</Cell>)}
                    width={150}
                    cell={props=>(
                        <Cell>{orgList.getIn([props.rowIndex]).creatorName}</Cell>
                    )}
                />,
                <Column
                    key='creatorMobile'
                    header={(<Cell>电话</Cell>)}
                    width={150}
                    cell={props=>(
                        <Cell>{orgList.getIn([props.rowIndex]).creatorMobile}</Cell>
                    )}
                />,
                <Column
                    key='version'
                    header={(<Cell>版本</Cell>)}
                    width={120}
                    cell={props=>(
                        <Cell>{
                            (()=>{
                                if(orgList.getIn([props.rowIndex]).version == 0){
                                    return '测试版'
                                }else if(orgList.getIn([props.rowIndex]).version == 1){
                                    return '试用版'
                                }else if(orgList.getIn([props.rowIndex]).version == 2){
                                    return '软件版'
                                }else if(orgList.getIn([props.rowIndex]).version == 3){
                                    return '服务版'
                                }else{
                                    return '试用版'
                                }
                            })()
                        }</Cell>
                    )}
                />,
                
                <Column
                    key='createTime'
                    header={(<Cell>创建日期</Cell>)}
                    width={90}
                    cell={props=>(
                        <Cell>{orgList.getIn([props.rowIndex]).createTime}</Cell>
                    )}
                />,
                <Column
                    key='expireTime'
                    header={(<Cell>截止日期</Cell>)}
                    width={90}
                    cell={props=>(
                        <Cell>{orgList.getIn([props.rowIndex]).expireTime}</Cell>
                    )}
                />,
                <Column
                    key='createTime'
                    header={(<Cell>最后登录日期</Cell>)}
                    width={90}
                    cell={props=>(
                        <Cell>{orgList.getIn([props.rowIndex]).lastLoginTime}</Cell>
                    )}
                />,
                <Column
                    key='control'
                    header={(<Cell>操作</Cell>)}
                    width={200}
                    cell={props=>(
                        <Cell>
                            <Button disabled={!isDisabled} onClick={::this.handleEditOrg(props.rowIndex)} style={{'marginRight':8}}>
                                管理
                            </Button>
                            <Button onClick={::this.handleOrgCreateOrder(props.rowIndex)} disabled={true}>
                                创建订单
                            </Button>
                        </Cell>
                    )}
                />
            ]
        }else if(appInfo&&appInfo.get('id')==100) {
            return [
                <Column
                    key='name'
                    header={(<Cell>序号</Cell>)}
                    width={40}
                    cell={props=>(
                        <Cell>
                            {props.rowIndex+1}
                        </Cell>
                    )}
                />,
                <Column
                    key='orgName'
                    header={(<Cell>企业名称</Cell>)}
                    width={180}
                    cell={props=>(
                        <Cell><div style={{width:'172px',overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap'}} title={orgList.getIn([props.rowIndex]).name}>{orgList.getIn([props.rowIndex]).name}</div></Cell>
                    )}
                />,
                <Column
                    key='users'
                    header={(<Cell>已激活用户数</Cell>)}
                    width={0}
                    cell={props=>(
                        <Cell>{orgList.getIn([props.rowIndex]).users}</Cell>
                    )}
                />,
                <Column
                    key='creatorName'
                    header={(<Cell>管理员姓名</Cell>)}
                    width={140}
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
                    key='version'
                    header={(<Cell>版本</Cell>)}
                    width={80}
                    cell={props=>(
                        <Cell>{
                            (()=>{
                                if(orgList.getIn([props.rowIndex]).version == 0){
                                    return '测试版'
                                }else if(orgList.getIn([props.rowIndex]).version == 1){
                                    return '试用版'
                                }else if(orgList.getIn([props.rowIndex]).version == 2){
                                    return '软件版'
                                }else if(orgList.getIn([props.rowIndex]).version == 3){
                                    return '服务版'
                                }else{
                                    return '试用版'
                                }
                            })()
                        }</Cell>
                    )}
                />,
                <Column
                    key='appName'
                    header={(<Cell>企业来源</Cell>)}
                    width={80}
                    cell={props=>(
                        <Cell>{orgList.get(props.rowIndex).appName}</Cell>
                    )}
                />,
                <Column
                    key='createTime'
                    header={(<Cell>创建日期</Cell>)}
                    width={90}
                    cell={props=>(
                        <Cell>{orgList.getIn([props.rowIndex]).createTime}</Cell>
                    )}
                />,
                <Column
                    key='expireTime'
                    header={(<Cell>截止日期</Cell>)}
                    width={90}
                    cell={props=>(
                        <Cell>{orgList.getIn([props.rowIndex]).expireTime}</Cell>
                    )}
                />,
                <Column
                    key='createTime'
                    header={(<Cell>最后登录日期</Cell>)}
                    width={90}
                    cell={props=>(
                        <Cell>{orgList.getIn([props.rowIndex]).lastLoginTime}</Cell>
                    )}
                />,
                <Column
                    key='control'
                    header={(<Cell>操作</Cell>)}
                    width={200}
                    cell={props=>(
                        <Cell>
                            <Button disabled={!isDisabled} onClick={::this.handleEditOrg(props.rowIndex)} style={{'marginRight':8}}>
                                管理
                            </Button>
                            <Button onClick={::this.handleOrgCreateOrder(props.rowIndex)} disabled={isDisabled && orgList.getIn([props.rowIndex]).creatorMobile && orgList.getIn([props.rowIndex]).source != 1 ? false : true}>
                                创建订单
                            </Button>
                        </Cell>
                    )}
                />
            ]
        }
        
    }
    render(){
        let {prefixCls, ...otherProps} = this.props
        let utils = this.props.payload.get('utils'),
            getterByField = utils.get('getterByField'),
            orgExpireTimeList = getterByField('orgExpireTimeList'),
            height = (orgExpireTimeList.size) * 50 + 32,
            appInfo = getterByField('appInfo'),
            width = appInfo ? 1110 : 1250
        height = height > $('.ant-tabs-content-no-animated').outerHeight() - 97? $('.ant-tabs-content-no-animated').outerHeight() - 97  : height
        height = height<32?32:height
        // 没有企业来源的时候宽度是1060
        // 有企业来源的时候宽度是1140
        return (
            <div className={`${prefixCls}-operationPlatform ${prefixCls}-organizationalAdministration`}>
                <div className={`${prefixCls}-operationPlatform-form`}>
                    <DynamicComponent _path='admin.operationPlatform' {...otherProps} />
                    <div className={`${prefixCls}-operationPlatform-queryBtn`}>
                        <Button type='primary' onClick={::this.handleOrgQuery}>查询</Button>
                    </div>
                </div>
                <Table 
                    rowsCount={orgExpireTimeList.size}
                    rowHeight={50}
                    headerHeight={30}
                    height={height}
                    width={width}>
                    {this.getColumns(prefixCls,orgExpireTimeList,appInfo)
                    }
                 </Table>
            </div>
        )
    }
}