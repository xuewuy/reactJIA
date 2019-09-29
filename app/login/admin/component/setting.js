import React, { Component,PropTypes } from 'react'
import {Radio, Button} from 'xComponent'
const RadioGroup = Radio.Group

export default class SettingComponent extends Component {

 	handleChange(e){
 		this.props.nextLoginChange(e.target.value)
 	}

 	handleOk(e){
 		this.props.saveNextLoginMode()
 	}


	render(){

		let utils = this.props.payload.get('utils') ,
			getterByField = utils.get('getterByField'),
			nextLogin = getterByField('nextLogin') === "2" ? "2" : "1" ,
			{prefixCls} = this.props


		return(
			<div className={`${prefixCls}-setting`}>
				<br />
				<h3 className={`${prefixCls}-setting-header`}>下次登录</h3>
				<br />
				<RadioGroup value={nextLogin} onChange={::this.handleChange}>
					<Radio key="1" className={`${prefixCls}-setting-radio`} value="1">{getterByField('appId')==102?'进入我的服务商':'进入我的企业'}</Radio>
					<Radio key="2" className={`${prefixCls}-setting-radio`} value="2">{getterByField('appId')==102?'进入我最后登录的服务商':'进入我最后登录的企业'}</Radio>
				</RadioGroup>
				<br />
				<Button type="primary" className={`${prefixCls}-setting-btn`} onClick={::this.handleOk}>确定</Button>
			</div>
    	)
	}

}
