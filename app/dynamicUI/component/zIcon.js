import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import assign from 'object-assign'
import {Map} from 'immutable'
import {ZIcon} from 'xComponent'

export default function ZIconComponent(props){
	let { _path, _getter } = props,
		values = _getter(_path, ['disabled', 'visible','className', 'colorStyle', 'zIcon']),
		disabled = values.get( 'disabled') || false,
		visible = values.get( 'visible') || true,
		className= values.get('className'),
		colorStyle= values.get('colorStyle'),
		zIcon = values.get('zIcon')

	className=classNames({
		[className]: !!className,
	})

	return ZIcon({
		icon:zIcon,
		colorStyle,
		disabled,
		className,
		onClick: function(){
			props.onEvent && props.onEvent('onClick', { path: _path})
		}
	})
}


/*
export default class ZIconComponent1 extends React.Component {
	static defaultProps = {
      	prefixCls: 'z-icon'
  	}

  	state = {
  		data : Map({
  			path: '',
  			disabled:false,
  			visible:true,
  			className:'',
			colorStyle:'default',
			zIcon:''

  		})
  	}

	constructor(props){
		super(props)
		this.state = this.calculateState(this.props)
	}

	componentDidMount() {
  	}

	componentWillReceiveProps(nextProps){
    	this.setState(this.calculateState(nextProps))
    }

    shouldComponentUpdate(nextProps, nextState){
    	return !this.state.data.equals(nextState.data)
    }

	calculateState(props){
		let { data } = this.state,
			{ _path, _getter } = props,
			values = _getter(_path, ['disabled', 'visible','className', 'colorStyle', 'zIcon']),
			disabled =values.get( 'disabled') || false,
			visible = values.get( 'visible') || true,
			className=values.get('className'),
			colorStyle= values.get('colorStyle'),
			zIcon = values.get('zIcon')

		data = this.set(null,{path: _path, disabled, visible,className, colorStyle, zIcon})
		return {data}
	}

	get(propertyName) {
		if (!propertyName || propertyName === '') {
			return this.state.data
		}
		return this.state.data.getIn(propertyName.split('.'))
	}

	set(propertyName, value) {
		let data = this.state.data
		if (!propertyName || propertyName === '') {
			return data.merge(value)
		}
		if(typeof value === 'object'){
			return data.mergeIn(propertyName.split('.'), value)	
		}
		else{
			return data.setIn(propertyName.split('.'), value)			
		}
	}

	handleClick(path){
		 this.props.onEvent && this.props.onEvent('onClick', { path: path})
	}

	render(){
		let className=classNames({
			[this.props.prefixCls]: true,
			[this.props.className]: !!this.get('className'),
		})

		return ZIcon({
			icon:this.get('zIcon'),
			colorStyle:this.get('colorStyle'),
			disabled:this.get('disabled'),
			className:className,
			onClick: function(){this.handleClick(this.get('path')).bind(this)}
		})
		/*return (
			<ZIcon
				ref='internal'
				icon={this.get('zIcon')}
				colorStyle={this.get('colorStyle')}
				disabled={this.get('disabled')}
				className={className}
				onClick={()=>{::this.handleClick(this.get('path'))}}>
			</ZIcon>
		)
	}
}

*/