import React,{ Component, PropTypes } from 'react'
import classNames from 'classnames'
import '../assets/rriconfont/iconfont.less'

export default function ZIconComponent(props){
	const { colorStyle='default', 
	icon, shape = 'default',
	 disabled, className = '', onClick,  ...otherProps} = props
		let shapeName = 'rriconfont--',
			ext = {}

		if(!disabled && onClick)
			ext.onClick = onClick


		if(disabled)
			shapeName = `${shapeName}${shape}-disabled`
		else
			shapeName = `${shapeName}${colorStyle}-${shape}`
		
		const classString = classNames({
		    rriconfont: true,
		    [`rriconfont-${icon}`]: true,
		    [shapeName]: true,
		    [className]: true,
	  	})

	  	return (<i className={classString} {...otherProps} {...ext} />)
}
/*
export default class ZIconComponent extends Component {
	render(){
		const { colorStyle='default', icon, shape = 'default', disabled, className = '', onClick,  ...otherProps} = this.props
		let shapeName = 'rriconfont--',
			ext = {}

		if(!disabled && onClick)
			ext.onClick = onClick


		if(disabled)
			shapeName = `${shapeName}${shape}-disabled`
		else
			shapeName = `${shapeName}${colorStyle}-${shape}`
		
		const classString = classNames({
		    rriconfont: true,
		    [`rriconfont-${icon}`]: true,
		    [shapeName]: true,
		    [className]: true,
	  	})

	  	return (<i className={classString} {...otherProps} {...ext} />)
	}
}*/