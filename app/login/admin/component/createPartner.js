import React,{ Component,PropTypes } from 'react'
import DynamicComponent from 'dynamicComponent'
import {Button,ZIcon} from 'xComponent'

export default class CreatePartnerComponent extends Component {
	componentDidMount(){
		this.props.initCreatePartner()
	}
	render(){
		let {prefixCls, ...otherProps} = this.props
		let utils = this.props.payload.get('utils'),
			getterByField = utils.get('getterByField'),
			path_ = 'admin.createPartner'
		return (
			<div className={`${prefixCls}-createOrg`}>
				<DynamicComponent className={`${prefixCls}-createPartner-form`} _path={path_} {...otherProps} />
			</div>
		)
	}
}