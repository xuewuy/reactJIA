import React, { Component,PropTypes } from 'react'
import DynamicComponent, {Modal} from 'dynamicComponent'
import {Button,Input,Card,Tabs,Dropdown,Menu,ButtonGroup} from 'xComponent'
import defaultComponentFactory from 'defaultComponentFactory'
import './farenw.less'
export default class farenwComponent extends React.Component {
	static defaultProps = {
        prefixCls: 'farenw'
    }
	componentDidMount(){
		this.props.initView(this.props.initData)
	}
   
	render(){
        // if(!this.props.payload || !this.props.payload.get('utils') ) {
        //    return null
        // }
        let message = this.props.payload.getIn(['global', 'message']),
            {prefixCls, ...otherProps} = this.props,
            getterByField = this.props.payload.getIn(['utils', 'getterByField'])  
		return(
			
			<div className={prefixCls}>
	      		<DynamicComponent {...otherProps} _path='farenwEdit.farenwEditList'/>             
	          {Modal(message)}
			</div>
		)
	}
}
 