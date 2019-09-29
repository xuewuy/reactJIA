import React, { Component, PropTypes } from 'react'
import userAnalyze from './userAnalyze'
import userAnalyze2 from './userAnalyze2'
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
				<Tabs type="card" className={`${prefixCls}-order-management-tabs`}>
					{this.setManageTags()}
				</Tabs>
			</div>
		)
	}

	setManageTags(){
		return [
			<TabPane key="1" tab='企业版代账版统计'>
				<userAnalyze {...this.props} />
			</TabPane>,
			<TabPane key="2" tab='汇算清缴统计'>
				<userAnalyze2 {...this.props} />
			</TabPane>,
		]
	}
}

