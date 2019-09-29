import React, {Component} from 'react'
import classNames from 'classnames'
import {Map} from 'immutable'
import {Layout} from 'xComponent'
import omit from 'omit.js'
import DynamicComponent from '../'

function getChildComponents(props, childrens, path){
	if(!childrens) return null
	let cs =  childrens.map((children,index)=>{

        let childPath = `${path}.${children.get('name')}`
        	 //props = omit(props,['prefixCls'])

        return DynamicComponent({ ...props,  _path :childPath})
            
    })

	return cs

}


export default function LayoutCreator(props){
	let	{ _path, _getter, _isFocus, style, className } = props,
			values = _getter(_path, ['name','visible', 'direction', 'justifyContent', 'alignItems', 'width', 'height', 'className', 'childrens']),
			name = values.get( 'name'),
			visible = values.get( 'visible') || true,
			direction = values.get('direction'),
			justifyContent = values.get('justifyContent'),
			alignItems = values.get('alignItems'),
			width = values.get('width'),
			height = values.get('height'),
			childrens = values.get('childrens')

		className = classNames(values.get('className'), className)

		className = classNames({
			 [className]: !!className,
		})


		if(!visible)
			return null

		return Layout({
			className,
			direction,
			justifyContent,
			alignItems,
			width,
			height,
			children:getChildComponents(props,childrens, _path)
		})

}
/*
export default class LayoutComponent extends Component {
	static defaultProps = {
		prefixCls:'z-layout'
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
			values = _getter(_path, ['name','visible', 'direction', 'justifyContent', 'alignItems', 'width', 'height', 'className', 'childrens']),
			name = values.get( 'name'),
			visible = values.get( 'visible') || true,
			direction = values.get('direction'),
			justifyContent = values.get('justifyContent'),
			alignItems = values.get('alignItems'),
			width = values.get('width'),
			height = values.get('height'),
			childrens = values.get('childrens')

		className = classNames(values.get('className'), className)

		data = this.set(null,{path: _path, name, visible, direction, justifyContent, alignItems, width, height, className, childrens })
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


	getChildComponents(childrens, path){
		if(!childrens) return null
    	return childrens.map((children,index)=>{

            let childPath = `${path}.${children.get('name')}`,
            	 props = omit(this.props,['prefixCls'])

            return(
                <DynamicComponent
                    key={index}
                    {...props}
                     _path = {childPath}
                />
            )
        })
    }

	render(){
		let className = classNames({
			 [this.props.prefixCls]: true,
			 [this.get('className')]: !!this.get('className'),
		})

		if(!this.get('visible'))
			return null

		return Layout({
			className,
			direction:this.get('direction'),
			justifyContent:this.get('justifyContent'),
			alignItems:this.get('alignItems'),
			width:this.get('width'),
			height:this.get('height'),
			children:this.getChildComponents(this.get('childrens'), this.get('path'))
		})
/*
			<Layout
				key={this.get('path')}
				className={className}
				direction={this.get('direction')}
				justifyContent={this.get('justifyContent')}
				alignItems={this.get('alignItems')}
				width={this.get('width')}
				height={this.get('height')}
			>
				{this.getChildComponents(this.get('childrens'), this.get('path'))}
			</Layout>
		)
	}

}*/