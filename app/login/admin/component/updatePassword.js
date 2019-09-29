import React,{ Component,PropTypes } from 'react'
import DynamicComponent from 'dynamicComponent'
import {Button,ZIcon} from 'xComponent'

export default class UpdatePasswordComponent extends Component {
	componentDidMount(){
		// this.props.initUpdatePassword()
    }

    getComInstances(){
		let {prefixCls, payload} = this.props,
	  		getterByField = payload.getIn(['utils','getterByField']),
	  		isShow = getterByField('isShow'),
	  		level = getterByField('level')

	  	let levelText = '弱'
	  	let changeColor = 'week'
	  	let changeLong = 'changeLong-week'

	  	if(level == 1){
	  		levelText = '中'
	  		changeColor = 'center'
	  		changeLong = 'changeLong-center'

	  	}else if(level == 2){
	  		levelText = '强'
	  		changeColor = 'strong'
	  		changeLong = 'changeLong-strong'
	  	}

	  	let element =  isShow ?
	  			(<div>
					密码强度：<span className={changeColor}>{levelText}</span>
					<div className={changeLong}></div>
				</div>
				): <div/>

		return{
			"passwordDegree":element
		}
	}
	render(){
		let {prefixCls, ...otherProps} = this.props
		let utils = this.props.payload.get('utils'),
			getterByField = utils.get('getterByField'),
			path_ =  'admin.updatePassword'
		return (
			<div className={`${prefixCls}-updatePassword`}>
                <p style={{'textAlign':'center','fontSize':'22px','padding':'20px'}}>亲，请设置一个新密码</p>
				<DynamicComponent className={`${prefixCls}-updatePassword-form`} _path={path_} {...otherProps} componentInstances={this.getComInstances()} />
			</div>
		)
	}
}
