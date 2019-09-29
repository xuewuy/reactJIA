import React,{ Component,PropTypes } from 'react'
import DynamicComponent from 'dynamicComponent'
import {Button, Menu, Table, Dropdown, Column, Cell, Card,Modal,ZIcon,Icon,Pagination,DatePicker} from 'xComponent'
import CreateVersion from './createVersion'
import ChangeLiveInfoComponent from './changeLiveInfo'
import ClassEdit from './classEdit'
import moment from 'moment'
const SubMenu = Menu.SubMenu
const Item = Menu.Item

export default class versionComponent extends Component {
    // componentDidMount() {
    //     $('.ant-tabs-tabpane-active .admin-operationPlatform').height($('.ant-tabs-tabpane-active').outerHeight()-38)
    //     let maxHeight = $('.admin-operationPlatform').height() - ($('.admin-operationPlatform .admin-operationPlatform-form').height() + 30)  - ($('.admin-operationPlatform .admin-Pagination').height() + 10) - 23
    //     this.props.organizationalInfoInitView(maxHeight)
    // }
    handleVersionDelete(rowIndex) {
        return ()=> {
        	this.props.versionDelete(rowIndex)
        }
    }
    handleVersionUpdate(rowIndex) {
        return ()=> {
            this.props.versionUpdate(rowIndex)
        }
    }
    handleVersionAdd() {
    	this.props.versionAdd()
    }
    handleChangeLive() {
        this.props.getLiveInfo()
    }
    handleClassEdit(){
        this.props.showClassEdit()
    }

    handleImportToolClick() {
        this.props.openImportTool()
    }

    handlePageChange(current) {
        this.props.initVersionManage(current,'current')
    }

    handlePageSizeChange(current, size) {
        this.props.versionPageChange(current, size,'pageSize')
    }
    
	render(){
		let utils = this.props.payload.get('utils') ,
			getterByField = utils.get('getterByField'),
            orgs = getterByField('orgs'),
            oldOrgList = getterByField('oldOrgList'),
			orgType = getterByField('orgType'),
            userId = getterByField('userId'),
            message = this.props.payload.getIn(['global', 'message']),
            versionList = getterByField('versionList')?getterByField('versionList').toJS():[],
            versionPage = getterByField('versionPage').toJS(),
			{prefixCls,...otherProps} = this.props,
            isShowCreateVersion = getterByField('isShowCreateVersion'),
            isShowLive = getterByField('isShowLive'),
            isShowClassEdit = getterByField('isShowClassEdit'),
			height,
            maxHeight = $('.admin-version').height() - ($('.admin-version .admin-version-table-top').height() + 20)  - ($('.admin-version .ant-pagination').height() + 20) - 60
        height = (versionList.length)*50+32
		height = height>maxHeight?maxHeight:height
		return(
			<div className={`${prefixCls}-version`} style={{height:'100%',width:'100%',position:'absolute'}}>
				<div className={`${prefixCls}-version-table`}>
					<div className={`${prefixCls}-version-table-top`}>
                        
                        <div className={`${prefixCls}-version-table-filters`}>
                            
                            <div className={`${prefixCls}-version-header-right`}>
                                <Button type="primary" onClick={::this.handleImportToolClick} >导入账套</Button>
                                <Button type="primary" onClick={::this.handleClassEdit} >直播内容编辑</Button>
                                <Button type="primary" onClick={::this.handleChangeLive} >直播管理</Button>
                                <Button type="primary" onClick={::this.handleVersionAdd} >新增</Button>
                            </div>
                        </div>
				 	</div>
					<Table 
		                rowsCount={versionList.length}
						rowHeight={50}
		                headerHeight={30}
		    			height={height}
		    			width={1080}>
		    		    {this.getColumns(prefixCls,versionList)}
					</Table>	
                    <Pagination 
                        current={versionPage.current} 
                        total={versionPage.total} 
                        pageSize={versionPage.pageSize} 
                        onChange={::this.handlePageChange} 
                        onShowSizeChange = {::this.handlePageSizeChange}
                        showSizeChanger 
                        showQuickJumper
                    />
				</div>
		  		{this.renderCreateVersion(isShowCreateVersion)}
		  		{this.renderChangeLive(isShowLive)}
                {this.renderClassEdit(isShowClassEdit)}
                
  			</div>     
		
    	)
	}

    getColumns(prefixCls,versionList){
        let utils = this.props.payload.get('utils') ,
            getterByField = utils.get('getterByField'),
            page = getterByField('versionPage'),
            pageSize=0,
            current=0
        if(page) {
            pageSize = page.toJS().pageSize
            current = page.toJS().current
        }
    	return [
    		<Column
                key='headerLine'
                header={(<Cell>序号</Cell>)}
                width={50}
                cell={props=>(
                    <Cell>
                        {props.rowIndex+1+(pageSize*(current-1))}
                    </Cell>)
                }
            />,
    		<Column
    			key='mtype'
    			header={(<Cell>版本类型</Cell>)}
    			width={100}
    			cell={props=>(
    				<Cell>
    					{versionList[props.rowIndex].mtype==1?'代账端':'企业端'}
    				</Cell>
    			)}
    		/>,
    		<Column
    			key='versionNum'
    			header={(<Cell>版本号</Cell>)}
    			width={120}
    			cell={props=>(
    				<Cell>
                        {versionList[props.rowIndex].versionNum}
    				</Cell>)
    			}
    		/>,
            <Column
                key='updateTime'
                header={(<Cell>版本升级日期</Cell>)}
                width={180}
                cell={props=>(
                    <Cell>
                        {versionList[props.rowIndex].updateTime.split(' ')[0]}
                    </Cell>
                )}
            />,
            <Column
                key='appName'
                header={(<Cell>所属伙伴</Cell>)}
                width={180}
                cell={props=>(
                    <Cell>
                        {versionList[props.rowIndex].appName}
                    </Cell>
                )}
            />,
            <Column
                key='mtype'
                header={(<Cell>是否显示弹框</Cell>)}
                width={120}
                cell={props=>(
                    <Cell>
                        {versionList[props.rowIndex].isTips==0?'不显示':'显示'}
                    </Cell>
                )}
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
                            className={`${prefixCls}-version-operation-buy`}
                            //onClick={::this.handleversionDelete(props, orgs)}
                            onClick={::this.handleVersionUpdate(props.rowIndex)}
                            disabled={(versionList[props.rowIndex].status==1 )?true:false}
                            style={{marginLeft:4,marginRight:4}}
                            >
                            编辑
                        </Button>
    					
    					<Button 
    						type="dashed"  
    						className={`${prefixCls}-version-operation-buy`}
                            //onClick={::this.handleversionDelete(props, orgs)}
                            onClick={::this.handleVersionDelete(props.rowIndex)}
                            disabled={(versionList[props.rowIndex].status==1 )?true:false}
                            style={{marginLeft:4,marginRight:4}}
    						>
    						删除
    					</Button>
    					
    				</Cell>
    			)}
    		/>

    	]
    }

    renderCreateVersion(isShowCreateVersion){
    	if(!isShowCreateVersion) return null
    	let onOk = ()=> {this.props.createVersionOk()},
    		onCancel = ()=>{ this.props.createVersionCancel() }


        return (
        	<Modal 
        		visible
        	 	type ='modal'
                title='版本信息'
                width={500}
                // okText='创建'
                maskClosable={false}
                onOk={ onOk }
                onCancel = { onCancel }
                >
                <CreateVersion {...this.props} />
            </Modal>
        )
    }
    renderChangeLive(isShowLive){
    	if(!isShowLive) return null
    	let onOk = ()=> {this.props.changeLiveOk()},
    		onCancel = ()=>{ this.props.changeLiveCancel() }


        return (
        	<Modal 
        		visible
        	 	type ='modal'
                title='直播管理'
                width={500}
                maskClosable={false}
                // okText='创建'
                onOk={ onOk }
                onCancel = { onCancel }
                >
                <ChangeLiveInfoComponent {...this.props} />
            </Modal>
        )
    }
    renderClassEdit(isShowClassEdit){
        if(!isShowClassEdit) return null
        let onOk = ()=> {this.props.changeClassEditOk()},
            onCancel = ()=>{ this.props.changeClassEditCancel() }
        return (
            <Modal 
                visible
                type ='modal'
                title='直播内容编辑'
                width={500}
                // okText='创建'
                maskClosable={false}
                onOk={ onOk }
                onCancel = { onCancel }
                >
                <ClassEdit {...this.props} />
            </Modal>
        )
    }

}