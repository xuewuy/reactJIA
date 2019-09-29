import React,{ Component,PropTypes } from 'react'
import DynamicComponent from 'dynamicComponent'
import {Button, Table, Column, Cell, Modal,ZIcon,Icon,Pagination} from 'xComponent'
import CreateHomeInfo from './createHomeInfo'
import moment from 'moment'
let currentDate = moment().format('YYYY-MM-DD'),
    currentDateTimestamp = moment(currentDate).format('x')//当前日期时间戳

export default class HomeInfoManageComponent extends Component {

    handleHomeInfoDelete(homeInfoId,ts) {
        return ()=> {
        	this.props.homeInfoDelete(homeInfoId,ts)
        }
    }
    handleHomeInfoUpdate(homeInfoId,ts) {
        return ()=> {
            this.props.homeInfoUpdate(homeInfoId,ts)
        }
    }
    handleHomeInfoAdd() {
        this.props.setAddShow('homeInfo')
    }

    handleHomeInfoRelease(homeInfoId,ts){
        return ()=> {
            this.props.homeInfoRelease(homeInfoId, ts, undefined, 'isListRelease')
        }
    }

    handlePageChange(current) {
        this.props.homeInPageChange(current,'homeInfo')
    }

    handlePageSizeChange(current, size) {
        this.props.homePageSizeChange(current, size,'homeInfo')
    }
    
	render(){
		let utils = this.props.payload.get('utils') ,
			getterByField = utils.get('getterByField'),
            homeInfoList = getterByField('homeInfoList').toJS(),
			homeInfoManageListPage = getterByField('homeInfoManageListPage').toJS(),
            {prefixCls,...otherProps} = this.props,
			isShowCreateHomeInfo = getterByField('isShowCreateHomeInfo'),
			height = (homeInfoList.length)*50+32

        height = height > $('.ant-tabs-content-no-animated').outerHeight() - 200? $('.ant-tabs-content-no-animated').outerHeight() - 200  : height
        height = height<32?32:height

		return(
			<div className={`${prefixCls}-homeInfo`}>
				<div className={`${prefixCls}-homeInfo-table`}>
					<div className={`${prefixCls}-homeInfo-table-top`}>
                        <div className={`${prefixCls}-homeInfo-header-left`}></div>

                        <div className={`${prefixCls}-homeInfo-header-right`}>
                            <Button type="primary" disabled={this.props.auth!=2} onClick={::this.handleHomeInfoAdd}>新增</Button>
                        </div>
				 	</div>
					<Table 
		                rowsCount={homeInfoList.length}
						rowHeight={50}
		                headerHeight={30}
                        height={height}
		    			width={1080}>
		    		    {this.getColumns(prefixCls,homeInfoList)}
					</Table>
                    <Pagination 
                        current={homeInfoManageListPage.current} 
                        total={homeInfoManageListPage.total} 
                        pageSize={homeInfoManageListPage.pageSize} 
                        onChange={::this.handlePageChange} 
                        onShowSizeChange = {::this.handlePageSizeChange}
                        showSizeChanger 
                        showQuickJumper
                    />
				</div>
		  		{this.renderCreateHomeInfo(isShowCreateHomeInfo)}
                
  			</div>     
		
    	)
	}

    getColumns(prefixCls,homeInfoList){
        let utils = this.props.payload.get('utils') ,
            getterByField = utils.get('getterByField')

    	return [
    		<Column
                key='headerLine'
                header={(<Cell>序号</Cell>)}
                width={80}
                cell={props=>(
                    <Cell>
                        {props.rowIndex+1}
                    </Cell>)
                }
            />,
    		<Column
    			key='createTime'
    			header={(<Cell>消息更新日期</Cell>)}
    			width={180}
    			cell={props=>(
    				<Cell>
    					{homeInfoList[props.rowIndex].createTime ? homeInfoList[props.rowIndex].createTime.split(' ')[0] : ''}
    				</Cell>
    			)}
    		/>,
    		<Column
    			key='address'
    			header={(<Cell>链接地址</Cell>)}
    			width={440}
    			cell={props=>(
    				<Cell>
                        <span style={{'whiteSpace': 'nowrap', 'textOverflow': 'ellipsis', 'overflow': 'hidden', 'width': '423', 'display': 'block' }} title={homeInfoList[props.rowIndex].address}>{homeInfoList[props.rowIndex].address}</span>
    				</Cell>)
    			}
    		/>,
            <Column
                key='status'
                header={(<Cell>状态</Cell>)}
                width={100}
                cell={props=>(
                    <Cell>
                        {homeInfoList[props.rowIndex].status == 1 ? '未发布' : (homeInfoList[props.rowIndex].status == 2 ? '显示中' : '历史发布')}
                    </Cell>)
                }
            />,
    		<Column
    			key='operation'
    			header={(<Cell>操作</Cell>)}
    			width={280}
    			cell={props=>(
    				<Cell>
                        <Button 
                            type="dashed"  
                            className={`${prefixCls}-homeInfo-operation-buy`}
                            disabled={this.props.auth != 2 || homeInfoList[props.rowIndex].status == 3 ? true : false}
                            onClick={::this.handleHomeInfoUpdate(homeInfoList[props.rowIndex].id,homeInfoList[props.rowIndex].ts)}
                            style={{marginLeft:4,marginRight:4}}
                            >
                            编辑
                        </Button>
    					
    					<Button 
    						type="dashed"  
    						className={`${prefixCls}-homeInfo-operation-buy`}
                            disabled={this.props.auth!=2}
                            onClick={::this.handleHomeInfoDelete(homeInfoList[props.rowIndex].id,homeInfoList[props.rowIndex].ts)}
                            style={{marginLeft:4,marginRight:4}}
    						>
    						删除
    					</Button>
    					
                        <Button 
                            type="dashed"  
                            className={`${prefixCls}-homeInfo-operation-buy`}
                            disabled={this.props.auth != 2 || homeInfoList[props.rowIndex].status != 1 ? true : false}
                            onClick={::this.handleHomeInfoRelease(homeInfoList[props.rowIndex].id,homeInfoList[props.rowIndex].ts)}
                            style={{marginLeft:4,marginRight:4}}
                            >
                            {homeInfoList[props.rowIndex].status == 1 ? <span>发&emsp;布</span> : '已发布'}
                        </Button>
    				</Cell>
    			)}
    		/>

    	]
    }

    renderCreateHomeInfo(isShowCreateHomeInfo){
    	if(!isShowCreateHomeInfo) return null
    	let handleOkAndRelease = () => {
                this.props.homeInfoRelease(null,null,2)
            },
            onOk = () => {
                this.props.homeInfoRelease(null,null,1)
            },
            onCancel = () => {
                this.props.createHomeInfoCancel()
            },
            footer = [
                <Button key="back" onClick={onCancel}>取消</Button>,
                <Button key="submit" type="primary" onClick={onOk}>保存</Button>, 
                <Button key="submitAndRelease" type="primary" onClick={handleOkAndRelease}>保存并发布</Button>
               ]

        return (
        	<Modal
        		visible
        	 	type ='modal'
                title='消息管理'
                width={600}
                wrapClassName='homeInfo-createHomeInfo'
                footer={footer}
                maskClosable={false}
                onCancel={onCancel}
            >
                <CreateHomeInfo {...this.props} />
            </Modal>
        )
    }
}