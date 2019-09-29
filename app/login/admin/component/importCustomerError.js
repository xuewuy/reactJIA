import React,{ Component,PropTypes } from 'react'
import DynamicComponent from 'dynamicComponent'
import {Button,ZIcon} from 'xComponent'

export default class ImportCustomerErrorComponent extends Component {
	componentDidMount(){
		// this.props.initImportCustomerError()
	}
	getContent(list) {
		return <div  className='admin-importCustomerError-main-items'>
			{
				list.map(item => <p className='admin-importCustomerError-main-item'>
				{item}
				</p>)
			}
		</div>
	}
	render(){
		let {prefixCls, ...otherProps} = this.props
		let utils = this.props.payload.get('utils'),
			getterByField = utils.get('getterByField'),
			isLeft = getterByField('isLeft'),
			path_ = isLeft ? 'admin.leftDiscountAmount' : 'admin.rightDiscountAmount',
			statusOfTaxpayer = getterByField('enterprise.statusOfTaxpayer'),
			list = getterByField('inviteCode.errorList').toJS()
		return (
			<div className={`${prefixCls}-importCustomerError`}>
				<div className={`${prefixCls}-importCustomerError-title`}>
					<ZIcon icon='modal-warn'/>
					<p className={`${prefixCls}-importCustomerError-title-txt`}>亲，有{list.length}条数据未执行导入</p>
				</div>
				<div className={`${prefixCls}-importCustomerError-main`}>
					<p className={`${prefixCls}-importCustomerError-main-title`}>详情内容</p>
					{::this.getContent(list)}
				</div>
			</div>
		)
	}
}