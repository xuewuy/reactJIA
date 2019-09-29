import React,{ Component,PropTypes } from 'react'
import DynamicComponent from 'dynamicComponent'
import {HCFLayout,Button, Tabs, Radio, Table, Column, Cell, Card,Modal,Pagination} from 'xComponent'

export default class userAnalyze2Component extends Component {
	handleQueryClick(){

	}
	render(){
		let {prefixCls, ...otherProps} = this.props,
			utils = this.props.payload.get('utils'),
            getterByField = utils.get('getterByField')
        return (
        	<div className={`${prefixCls}-operationPlatform ${prefixCls}-userAnalyze`}>
                <div className={`${prefixCls}-operationPlatform-form`}>
                    <DynamicComponent _path='admin.userAnalyze2' {...otherProps} />
                    <div className={`${prefixCls}-operationPlatform-queryBtn`}>
                        <Button type='primary' onClick={::this.handleQueryClick()}>查询</Button>
                    </div>
                </div>
                <Table 
                    // rowsCount={userList.size}
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