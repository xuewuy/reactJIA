import React, {Component} from 'react'
import classNames from 'classnames'
import {Map} from 'immutable'
import {MovablePanel} from 'xComponent'
import omit from 'omit.js'
import DynamicComponent from '../'

export default class LayoutComponent extends Component {
	static defaultProps = {
		prefixCls:'z-movablepanel'
	}

	state = {
  		data : Map({
  			path: ''
  		})
  	}

	constructor(props){
		super(props)
		this.state = this.calculateState(this.props)
	}

	componentWillReceiveProps(nextProps){
    	this.setState(this.calculateState(nextProps))
    }


    calculateState(props){
		let { data } = this.state,
			{ _path, _getter, _isFocus, style, className } = props,
			values = _getter(_path, ['name','visible', 'direction', 'justifyContent', 'alignItems', 'width', 'height', 'className', 'childrens','title','styles']),
			name = values.get( 'name'),
			visible = values.get( 'visible') || true,
			direction = values.get('direction'),
			justifyContent = values.get('justifyContent'),
			alignItems = values.get('alignItems'),
			width = values.get('width'),
			height = values.get('height'),
			childrens = values.get('childrens'),
            title = values.get('title'),
            styles = values.get('styles')

		className = classNames(values.get('className'), className)

		data = this.set(null,{path: _path, name, visible, direction, justifyContent, alignItems, width, height, className, childrens,title,styles })
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
			return Map(value)
		}
		
		return data.setIn(propertyName.split('.'), value)			
	}


	handleClick(e) {
		this.props.onEvent 
			&& this.props.onEvent('onClick', {path: this.props._path}) 
	}
	render(){
		let className = classNames({
			 [this.props.prefixCls]: true,
			 [this.get('className')]: !!this.get('className'),
		})

		if(!this.get('visible'))
			return null

		return (
			<MovablePanel
				key={this.get('name')}
				className={className}
				width={this.get('width')}
				height={this.get('height')}
                style={this.get('styles')}
                onClick = {::this.handleClick}>
				{this.get('title')}
			</MovablePanel>
		)
	}

}