import React,{ Component,PropTypes } from 'react'
import DynamicComponent from 'dynamicComponent'
import {Button,ZIcon,Table,Input,Column,Cell,Popover} from 'xComponent'

export default class ClassEditComponent extends Component {
	componentDidMount(){
		this.props.initClassEdit()
	}

	
	render(){
		let {prefixCls, ...otherProps} = this.props
		let utils = this.props.payload.get('utils'),
			getterByField = utils.get('getterByField'),
			path_ = 'admin.classEdit'
		return (
			<div className={`${prefixCls}-classEdit`}>
				<DynamicComponent className={`${prefixCls}-createVersion-form`} _path={path_} {...otherProps} />
			</div>
		)
	}
}