import React,{ Component,PropTypes } from 'react'
import DynamicComponent from 'dynamicComponent'
import {Button, Menu, Table, Dropdown, Column, Cell, Card,Modal,ZIcon,Icon,Pagination} from 'xComponent'
import CreatePartner from './createPartner'
import moment from 'moment'
const SubMenu = Menu.SubMenu
const Item = Menu.Item

export default class PartnerManageComponent extends Component {

    handlePartnerDelete(partnerId) {
        return ()=> {
        	this.props.partnerDelete(partnerId)
        }
    }
    handlePartnerUpdate(rowIndex) {
        return ()=> {
            this.props.partnerUpdate(rowIndex)
        }
    }
    handlePartnerAdd() {
    	this.props.partnerAdd()
    }
    
	render(){
		let utils = this.props.payload.get('utils') ,
			getterByField = utils.get('getterByField'),
            orgs = getterByField('orgs'),
            oldOrgList = getterByField('oldOrgList'),
			orgType = getterByField('orgType'),
            userId = getterByField('userId'),
            message = this.props.payload.getIn(['global', 'message']),
            partnerList = getterByField('partnerList').toJS(),
			{prefixCls,...otherProps} = this.props,
			isShowCreatePartner = getterByField('isShowCreatePartner'),
			height = (partnerList.length)*50+32,
            auth = this.props.auth && this.props.auth > 1
        height = height > $('.ant-tabs-content-no-animated').outerHeight() - 78? $('.ant-tabs-content-no-animated').outerHeight() - 78  : height
        height = height<32?32:height
		return(
			<div className={`${prefixCls}-partner`}>
				<div className={`${prefixCls}-partner-table`}>
					<div className={`${prefixCls}-partner-table-top`}>
                        
                        <div className={`${prefixCls}-partner-table-filters`}>
                            
                            <div className={`${prefixCls}-partner-header-right`}>
                                <Button type="primary" onClick={::this.handlePartnerAdd} disabled={auth?false:true}>新增</Button>
                            </div>
                        </div>
				 	</div>
					<Table 
		                rowsCount={partnerList.length}
						rowHeight={50}
		                headerHeight={30}
		    			height={height}
		    			width={1080}>
		    		    {this.getColumns(prefixCls,partnerList)}
					 </Table>	
				</div>
		  		{this.renderCreatePartner(isShowCreatePartner)}
                
  			</div>     
		
    	)
	}

    getColumns(prefixCls,partnerList){
        // 版本类型  1专业版
        //           2普及版
        // 注册类型  1代账公司
        //           2企业用户
		
        //           3个人代账
        //           <Column
            //     key='parentPartner'
            //     flexGrow={1}
            //     header={(<Cell>上级伙伴</Cell>)}
            //     width={180}
            //     cell={props=>(
            //         <Cell>
                        
            //             {partnerList[props.rowIndex].parentName}
            //         </Cell>
            //     )}
            // />,
        let utils = this.props.payload.get('utils') ,
            getterByField = utils.get('getterByField'),
            isDisabled = this.props.auth && this.props.auth > 1
    	return [
    		<Column
                key='headerLine'
                header={(<Cell>序号</Cell>)}
                width={180}
                cell={props=>(
                    <Cell>
                        {props.rowIndex+1}
                    </Cell>)
                }
            />,
    		<Column
    			key='name'
    			header={(<Cell>伙伴名称</Cell>)}
    			width={280}
    			cell={props=>(
    				<Cell>
    					{partnerList[props.rowIndex].name}
    				</Cell>
    			)}
    		/>,
    		<Column
    			key='mobile'
    			header={(<Cell>手机号</Cell>)}
    			width={180}
    			cell={props=>(
    				<Cell>
                        {partnerList[props.rowIndex].appServiceTel}
    				</Cell>)
    			}
    		/>,
    		<Column
    			key='operation'
    			flexGrow={1}
    			header={(<Cell>操作</Cell>)}
    			width={180}
    			cell={props=>(
    				<Cell>
                        <Button 
                            type="dashed"  
                            className={`${prefixCls}-partner-operation-buy`}
                            onClick={::this.handlePartnerUpdate(props.rowIndex)}
                            disabled={!isDisabled ? true : (partnerList[props.rowIndex].status==1)?true:false}
                            style={{marginLeft:4,marginRight:4}}
                            >
                            编辑
                        </Button>
    					
    					<Button 
    						type="dashed"  
    						className={`${prefixCls}-partner-operation-buy`}
                            onClick={::this.handlePartnerDelete(partnerList[props.rowIndex].id)}
                            disabled={!isDisabled ? true : (partnerList[props.rowIndex].status==1)?true:false}
                            style={{marginLeft:4,marginRight:4}}
    						>
    						删除
    					</Button>
    					
    				</Cell>
    			)}
    		/>

    	]
    }

    renderCreatePartner(isShowCreatePartner){
    	if(!isShowCreatePartner) return null
    	let onOk = ()=> {this.props.createPartnerOk()},
    		onCancel = ()=>{ this.props.createPartnerCancel() }


        return (
        	<Modal 
        		visible
        	 	type ='modal'
                title='伙伴信息'
                width={400}
                // okText='创建'
                onOk={ onOk }
                onCancel = { onCancel }
                >
                <CreatePartner {...this.props} />
            </Modal>
        )
    }

}