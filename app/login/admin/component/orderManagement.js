import React, { Component, PropTypes } from 'react'
import OrderManage from './orderManage'
import OrderManageSwy from './orderManageSwy'
import { Tabs } from 'xComponent'
const TabPane = Tabs.TabPane

export default class OrderManagement extends Component {
	
	render() {
		if(this.props._isCurrentTab === false) return null //加上这句话
		if (!this.props.payload || !this.props.payload.get('utils'))
			return null
		let {prefixCls, ...otherProps} = this.props,
			getterByField = this.props.payload.getIn(['utils', 'getterByField'])
            
		return (
			<div className={`${prefixCls}-order-management`}>
				<Tabs type="card" className={`${prefixCls}-order-management-tabs`} >
					{this.setManageTags()}
				</Tabs>
			</div>
		)
	}

	setManageTags(){
		if( this.props.appParams.orderActiveKey == '1'){
			return [
				<TabPane key="1" tab='账无忌订单'>
					<OrderManage {...this.props} />
				</TabPane>
			]
		}
		else if(this.props.appParams.orderActiveKey == '2'){
			return [
				<TabPane key="2" tab='税无忌订单'>
					<OrderManageSwy {...this.props} />
				</TabPane>
			]
		}
		else{
			return [
				<TabPane key="1" tab='账无忌订单'>
					<OrderManage {...this.props} />
				</TabPane>,
				<TabPane key="2" tab='税无忌订单'>
					<OrderManageSwy {...this.props} />
				</TabPane>,
			]
		}
		
	}
}

