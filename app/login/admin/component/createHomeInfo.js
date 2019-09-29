import React,{ Component,PropTypes } from 'react'
import DynamicComponent from 'dynamicComponent'
import {Button,ZIcon} from 'xComponent'

export default class CreateHomeInfoComponent extends Component {
	/*componentDidMount(){
		this.props.initCreateHomeInfo()
	}*/
	
	render(){
		let {prefixCls, ...otherProps} = this.props
		let utils = this.props.payload.get('utils'),
			getterByField = utils.get('getterByField'),
			path_ = 'admin.createHomeInfo'
		
		return (
			<div className={`${prefixCls}-createHomeInfo`}>
				<div>滚动消息更新内容:</div>
				<div className={`${prefixCls}-createHomeInfo-list`}>
					<DynamicComponent className={`${prefixCls}-createHomeInfo-form`} _path={path_} {...otherProps} />
				</div>				
			</div>
		)
	}
}