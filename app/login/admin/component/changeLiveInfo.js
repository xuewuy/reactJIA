import React,{ Component,PropTypes } from 'react'
import DynamicComponent from 'dynamicComponent'
import {Button,ZIcon,Table,Input,Column,Cell,Popover} from 'xComponent'

export default class ChangeLiveInfoComponent extends Component {
	componentDidMount(){
		// this.props.initLiveInfo()
	}

	
	render(){
		let {prefixCls, ...otherProps} = this.props
		let utils = this.props.payload.get('utils'),
			getterByField = utils.get('getterByField'),
			path_ = 'admin.liveInfo'
		return (
			<div className={`${prefixCls}-liveInfo`}>
				<DynamicComponent className={`${prefixCls}-createVersion-form`} _path={path_} {...otherProps} />
			</div>
		)
	}
}
