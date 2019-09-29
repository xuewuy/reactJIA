import React,{ Component, PropTypes } from 'react'
import classNames from 'classnames'
import './service.less'

export default class ServiceComponent extends Component {
	static defaultProps = {
        prefixCls: 'service'
    }
	render(){
		let {prefixCls} = this.props
	  	return (
	  		<div className={prefixCls}>
	  			<div className={prefixCls+'-big'}>abc</div>
	  			<div className={prefixCls+'-little'}>123</div>
	  		</div>
	  	)
	}
}