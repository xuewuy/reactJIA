import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import assign from 'object-assign'
import {Map} from 'immutable'
import {Input} from 'xComponent'

export default class PasswordComponent extends React.Component {
	static defaultProps = {
      	prefixCls: 'z-password'
  	}

  	state = {
  		data : Map({
  			path: '',
  			value:'',
  			isFocus: false,
  			className:'',
  			style: {},
            type:'text'
  		})
  	}

	constructor(props){
		super(props)
		this.state = this.calculateState(this.props)
	}

	componentDidMount() {
		if(this.get('isFocus')){
    		let domNode = ReactDOM.findDOMNode(this.refs.internal).getElementsByTagName('input')[0]
    		domNode.focus()
    		domNode.value = ''
    		domNode.value = this.get('value')
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
			{ _path, _getter, style, className } = props,
			pValus = _getter(_path, ['value', 'isFocus', 'visible', 'disabled', 'placeholder','width', 'height']),
			bindField = _getter(_path, 'bindField'),
			value = pValus.get('value') || '',
			isFocus = pValus.get( 'isFocus') || false,
			placeholder=pValus.get('placeholder'),
			width = pValus.get('width'),
			height = pValus.get('height') 

		this.oldValue = value


		if(!style && width){
      		style = {width}
    	}

    	if(!style && height){
    		style ={height}
    	}

		data = this.set(null,{path: _path, value, isFocus, className, placeholder, style })
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
			return data.mergeDeep(value)
		}
		if(typeof value === 'object'){
			return data.mergeDeepIn(propertyName.split('.'), value)	
		}
		else{
			return data.setIn(propertyName.split('.'), value)			
		}
	}

	handleBlur(e){
		e.preventDefault()
		let newValue = e.target.value,
			oldValue = this.oldValue,
			bindField = this.get('bindField')

		this.setState({data:this.set('value', newValue)})

		if( this.props.onFieldChange && oldValue !== newValue) {
			this.props.onFieldChange(this.get('path'), oldValue, newValue)
		}
	}

	handleFocus(e){
		e.preventDefault()
        let { data } = this.state
        data = this.set('type', 'password')
        setTimeout(()=>{
            this.setState({data})
        },0)
		if(!this.get('isFocus')){
			this.props.onFieldFocus(this.get('path'))
		}
	}

	handleChange(e){
		e.preventDefault()
		if(e.target.value === this.get('value')) return
		this.setState({data:this.set('value', e.target.value)})

		let newValue = e.target.value,
			oldValue = this.oldValue
		if(!this.get('isFocus')){
			if( this.props.onFieldChange && oldValue !== newValue) {
				this.props.onFieldChange(this.get('path'), oldValue, newValue)
			}
		}
	}

	render(){
		let className = classNames({
			 [this.props.prefixCls]: true,
			 [this.props.className]: !!this.get('className'),
		})
		return (
            <Input 
            	type={this.get('value') ? 'password' : this.get('type')}
            	ref='internal' 
            	value={this.get('value')} 
            	placeholder={this.get('placeholder')}
            	className={className}
            	style={this.get('style') && this.get('style').toJS()}
            	onBlur={::this.handleBlur} 
            	onFocus={::this.handleFocus} 
            	onChange={::this.handleChange}
            	addonBefore={this.props.addonBefore}
            />
		)
	}
}
