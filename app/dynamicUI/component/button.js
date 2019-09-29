import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import assign from 'object-assign'
import {Map} from 'immutable'
import {Button} from 'xComponent'

export default class ButtonComponent extends React.Component {
	static defaultProps = {
      	prefixCls: 'z-button'
  	}

  	state = {
  		data : Map({
  			path: '',
  			value:'',
  			isFocus: false,
  			disabled:false,
  			visible:true,
  			className:'',
  			style: {},
  			maxlength:100,
			colorStyle:'default'
  		})
  	}

	constructor(props){
		super(props)
		this.state = this.calculateState(this.props)
	}

	componentDidMount() {
		if(this.get('isFocus')){
    		let domNode = ReactDOM.findDOMNode(this.refs.internal).getElementsByTagName('button')[0]
			if(domNode){
				domNode.focus()
				domNode.value = ''//?
				domNode.value = this.get('value')
			}
    	}
  	}

	componentWillReceiveProps(nextProps){
    	this.setState(this.calculateState(nextProps))
    }

    shouldComponentUpdate(nextProps, nextState){
    	return !this.state.data.equals(nextState.data)
    }

	calculateState(props){
		let { data } = this.state,
			{ _path, _getter, _isFocus, addonBefore, style } = props,
			pValus = _getter(_path, ['value', 'text','isFocus', 'visible', 'disabled', 'width', 'className','height', 'type','zIcon','ghost','colorStyle']),
			value = pValus.get('value') || '',
			text = pValus.get('text') || '',
			isFocus =  _isFocus || pValus.get('isFocus') || false,
			disabled =pValus.get( 'disabled') || false,
			visible = pValus.get( 'visible') || true,
			width = pValus.get('width'),
			height = pValus.get('height'),
			type = pValus.get('type'),
			zIcon = pValus.get('zIcon'),
			className=pValus.get('className'),
			ghost=pValus.get('ghost'),
			colorStyle=pValus.get('colorStyle')

		this.oldValue = value

		if(!style && width){
      		style = {width}
    	}

    	if(!style && height){
    		style ={height}
    	}


		data = this.set(null,{path: _path, value, text,isFocus, disabled, visible, className, style, type,zIcon,ghost,colorStyle })
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


	handleFocus(e){
		e.preventDefault()		
		if(!this.get('isFocus')){
			this.props.onFieldFocus(this.get('path'))
		}
	}

	handleClick(e) {
		this.props.onEvent 
			&& this.props.onEvent('onClick', {path: this.props._path}) 
	}

	recursion(dataSource) {
		return (
			dataSource.map((menu, index) => {
				if (menu.children) {
					return (
						<SubMenu key={menu.get('id')} title={menu.get('title')}>
							{this.recursion(menu.children)}
						</SubMenu>
					)
				} else {
					return (<Menu.Item key={menu.get('id')}>{menu.get('title')}</Menu.Item>)
				}
			})
		)
	}

	render(){
		if(!this.props.className){
			this.props.className=this.get('className') || ''
		}
	
		let className ={} 
		let zIcon=this.get('zIcon') || ''
	
		if(!zIcon){
			let shapeName=this.props.prefixCls+'-'+this.get('colorStyle')
			className=classNames({
				[this.props.prefixCls]: true,
				[this.props.className]: !!this.get('className'),
				[shapeName]: !!this.get('colorStyle')
			})
		}
		else{
			let shapeName = 'rriconfont--',
				shape = 'default'
				shapeName = `${shapeName}${this.get('colorStyle')}-${shape}`
			className=classNames({
				[this.props.prefixCls]: true,
				[shapeName]: true,
				[this.props.className]: !!this.get('className')
			})
		}
		let showText=this.get('value') || this.get('text')
		return (
			<Button
				ref='internal'
				className={className}
				disabled={this.get('disabled')}
				style={this.get('style') && this.get('style').toJS()}
				onClick={::this.handleClick}
				onFocus={::this.handleFocus}
				ghost={this.get('ghost')}
				type={this.get('type') || "primary"}
				colorStyle={this.get('colorStyle')}
				zIcon={zIcon}>
				{showText || ''}
			</Button>
		)
	}
}
