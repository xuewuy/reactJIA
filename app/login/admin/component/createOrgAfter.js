import React,{ Component,PropTypes } from 'react'
import {ZIcon} from 'xComponent'

export default class CreateOrgAfter extends Component {
	render(){
		return (
			<div className={`createOrgAfter-content`}>
				<ZIcon icon='modal-success'/>
				<h4>服务商创建成功</h4>
				<p>亲，服务商版试用需联系客服审核通过后才可试用，联系我们：400-6060-386</p>
			</div>
		)
	}
}
