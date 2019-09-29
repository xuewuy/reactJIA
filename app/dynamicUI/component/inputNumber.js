import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import assign from 'object-assign'
import {Map} from 'immutable'
import {InputNumber, NumericInput} from 'xComponent'

export default class InputNumberComponent extends React.Component {
	static defaultProps = {
      	prefixCls: 'z-input-number'
  	}

  	state = {
  		data : Map({
  			path: '',
  			value:'',
  			step: 1,
  			prompt: '',
			promptIndex: '',
			placeholder:'',
  			placeholderText: '',
  			placeholderIndex: '',
  			isFocus: false,
			className:'',
  			style: {},
  			autoSelect: false,
			ignoreZero: false,
			isChange: false
  		})
  	}

	constructor(props){
		super(props)
		this.state = this.calculateState(this.props)
		this.handleKeyDown = this.handleKeyDown.bind(this)
	}

	componentDidMount() {
		if(this.get('isFocus') && this.props._isGridCell){
    		let domNode = ReactDOM.findDOMNode(this.refs.internal).getElementsByTagName('input')[0]
			if(domNode){
				domNode.focus()
				domNode.value = ''
				domNode.value = this.get('value')
				if(this.get('autoSelect')) {
					setTimeout(() => {domNode.select()}, 0)
				}
				if(domNode.addEventListener) {
                    domNode.addEventListener('keydown', this.handleKeyDown, false)
                } else if (domNode.attachEvent) {
                    domNode.attachEvent('keydown', this.handleKeyDown)
                } else {
                    domNode.onKeyDown = this.handleKeyDown
                }
			}
    	}
  	}


	componentWillReceiveProps(nextProps){
    	this.setState(this.calculateState(nextProps))
    }

    shouldComponentUpdate(nextProps, nextState){
    	/*if(!nextState.data.get('value'))
    		return true*/
    	let b = !this.state.data.equals(nextState.data)
    	return b
    }

   	isNum(s){
	    if (s!=null && s!=""){
	        return !isNaN(s)
	    }
	    return false
	}


	calculateState(props){
		let {data} = this.state,
			{ _path, _getter, _isFocus, style, className } = props,
			pValus = _getter(_path, ['value', 'precision', 'isFocus',
				'width','autoSelect','ignoreZero', 'disabled','min',
				'max', 'isMinus', 'prompt', 'promptIndex', 'allChange', 'placeholder', 'placeholderText', 'placeholderIndex', 'step', 'isChange', 'addonBefore','addonAfter']),
			value = pValus.get('value') + '' || '',
			precision = pValus.get( 'precision') || 0,
			isFocus = _isFocus || pValus.get( 'isFocus') || false,
			width = pValus.get('width'),
			step =pValus.get('step') ===0?0:1,
			prompt = pValus.get('prompt'),
			promptIndex = pValus.get('promptIndex'),
			placeholderText = pValus.get('placeholderText'),
			placeholder = pValus.get('placeholder'),
			placeholderIndex = pValus.get('placeholderIndex'),
			min = pValus.get('min'),
			max = pValus.get('max'),
			autoSelect = pValus.get('autoSelect'),
			ignoreZero = pValus.get('ignoreZero'),
			disabled = pValus.get('disabled'),
			allChange = pValus.get('allChange'),
			isMinus = pValus.get('isMinus') === true,
			isChange=pValus.get('isChange') || false,
			addonBefore = pValus.get('addonBefore'), 
			addonAfter = pValus.get('addonAfter')
			
		if(value == undefined || value == 'undefined'){
			value = ''
		}

/*
		if( this.isNum(value) ){
			value = parseFloat(value).toFixed(precision) + ''
		}
		else
			value = ''
*/

		if(!style && width){
      		style = {width}
    	}


    	if(this.props._isGridCell)
    		style={}

		step = this.calculateSetp(precision)
		this.oldValue = value
		data = this.set(null, {path:_path, value, step, isFocus, className,
			style, min, max ,autoSelect ,ignoreZero,precision,
			disabled, isMinus, prompt, promptIndex, placeholder, placeholderText, allChange, placeholderIndex, step, isChange, addonBefore, addonAfter})
		return {data}
	}

	calculateSetp(precision){
		if(!precision)
			return 1
		if(precision === '' || precision === 0)
			return 1
		return 1/Math.pow(10, precision)
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


	handleBlur(e){
		let newValue = e,
			oldValue = this.oldValue,
			path = this.get('path'),
			defaultFee = 0

		if(newValue == undefined)
			newValue = ''

		if (this.get('ignoreZero') && newValue == '') {
			newValue = defaultFee.toFixed(2)
		}

		if(this.get('isMinus') && newValue && newValue > 0 ){
			newValue = newValue * -1
		}

		this.setState({data:this.set('value', (this.get('value') == '0.00' && newValue == '0.00') ? '0' : newValue )})

		if( this.props.onFieldChange && oldValue !== newValue) {
			setTimeout(()=>{this.props.onFieldChange(path, oldValue, newValue)},0)
		}
	}

	handleKeyDown(e) {
        if (e.type !== 'keydown') {
            return
        }

        //回车键 ,切换焦点
        if (e.key === 'Enter' || e.keyCode == 13 || e.keyCode == 108 || e.keyCode == 9) {  //e.keyCode == 9  不支持tab键,因为如果阻止了事件外抛,select的选择项键盘选中无法生效
            if (this.props.onEvent) {
                setTimeout( ()=>this.props.onEvent('onEndEdit', {path: this.props._path}))

                if (e.keyCode == 9) {
					if(e.preventDefault)
						e.preventDefault()
					if(e.stopPropagation)
						e.stopPropagation()
				}
                return
            }
        }
	}


	onEndEdit() {
		if (this.props.onEndEdit) {
			this.props.onEndEdit()
		}
		else if (this.props.onEvent) {
			setTimeout( ()=>this.props.onEvent('onEndEdit', {path: this.props._path}))
		}
	}
	handleFocus(e){
		e.preventDefault()
		// if(!this.get('isFocus'))
			setTimeout(()=>this.props.onFieldFocus(this.get('path')))
	}


	handleChange(e){
		if(this.get('allChange')){
			let newValue = e,
				oldValue = this.oldValue,
				path = this.get('path'),
				defaultFee = 0

			if(newValue == undefined)
				newValue = ''

			// if (this.get('ignoreZero') && newValue == '' && this.get('isFocus')) {
			// 		newValue = defaultFee.toFixed(2)
			// }

			if(this.get('isMinus') && newValue && newValue > 0 ){
				newValue = newValue * -1
			}

			!this.get('isFocus') &&
			this.setState({data:this.set('value', (this.get('value') == '0.00' && newValue == '0.00') ?
			 '0' : newValue )})

			if( this.props.onFieldChange && oldValue !== newValue) {
				setTimeout(()=>{this.props.onFieldChange(path, oldValue, newValue)},0)
			}
		}
	}

	isNumber(obj) {  
		return typeof obj === 'number' && !isNaN(obj)
	}  


	render(){
		let className = classNames({
			[this.props.prefixCls]: true,
			[this.props.className]: !!this.get('className'),
			['change-input']: !!this.get('isChange')			
		})
		let ext = {}
		if(this.props._isGridCell)
			ext.style={width: '100%'}

		if(this.get('min') != undefined)
			ext.min = this.get('min')

		if(this.get('max') != undefined)
			ext.max = this.get('max')

		if (this.get('addonBefore') != undefined)
			ext.addonBefore = this.get('addonBefore')

		if (this.get('addonAfter') != undefined)
			ext.addonAfter = this.get('addonAfter')

		let displayValue = this.get('value')
		if (this.get('ignoreZero') && displayValue == 0 && !this.get('isFocus')) {
			displayValue = ''
		}
		if (this.get('precision') && displayValue !='') {
			displayValue = parseFloat(displayValue)
			if(typeof displayValue === 'number' && !isNaN(displayValue)){
				displayValue =  displayValue.toFixed(this.get('precision'))
			}
		}

		if(!displayValue && displayValue != 0)
			displayValue = ''
		let prompt
		if(this.state.data.get('path').split(',')[1] == this.state.data.get('promptIndex')) {
			prompt = this.get('prompt')
		}else {
			prompt = ''
		}
		let placeholderText
		if(this.state.data.get('path').split(',')[1] == this.state.data.get('placeholderIndex')) {
			placeholderText = this.get('placeholderText')
		}else {
			placeholderText = ''
		}

		if(this.get('placeholder') != undefined){
			placeholderText =this.get('placeholder')
		}
		return (
			<div title={prompt}>
				 <NumericInput
				 	ref='internal'
	            	// value={this.get('value')}
	            	value={displayValue}
	            	className={className}
					disabled={this.get('disabled')}
	            	style={this.get('style') && this.get('style').toJS()}
					step={this.get('step')}
					//onEndEdit={::this.onEndEdit}
	            	onFocus={::this.handleFocus}
					onChange={::this.handleChange}
	            	onBlur={::this.handleBlur}
	            	placeholder={placeholderText}
					handleKeyDown={::this.handleKeyDown}

	            	{...ext}
	            />
            </div>
		)
	}
}
