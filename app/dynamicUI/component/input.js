import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import assign from 'object-assign'
import {Map} from 'immutable'
import {Input} from 'xComponent'

export default class InputComponent extends React.Component {
	static defaultProps = {
      	prefixCls: 'z-input'
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
				isCooling : true,
				regex:'',
				hasBorder:0,
				autoSelect:false,
				type:'text',
				isChange: false
  		})
  	}

	constructor(props){
		super(props)
		this.state = this.calculateState(this.props)
	}

	componentDidMount() {
		if(this.get('isFocus') && this.props._isGridCell){
    		let domNode = ReactDOM.findDOMNode(this.refs.internal).getElementsByTagName('input')[0]
			if(domNode){
				//setTimeout(() => {domNode.click()}, 0)
				domNode.focus()
				domNode.value = ''
				domNode.value = this.get('value')
				if (this.get('autoSelect')) {
					setTimeout(() => {domNode.select()}, 0)
				}
			}
    	}
  	}

	componentWillReceiveProps(nextProps){
    	this.setState(this.calculateState(nextProps))
    }

    shouldComponentUpdate(nextProps, nextState){
		if(!nextState.data.get('value'))
    		return true
    	let b = !this.state.data.equals(nextState.data)
    	return b
		//return !this.state.data.equals(nextState.data)
    }

	calculateState(props) {
		let { data } = this.state,
			{ _path, _getter, _isFocus, addonBefore,addonAfter, style } = props,
			pValus = _getter(_path, ['value', 'isFocus', 'maxlength', 'visible', 'disabled', 'placeholder', 'addonBefore', 'addonAfter', 'width', 'height', 'allChange', 'className', 'regex', 'hasBorder', 'autoSelect', 'type', 'isChange','showTips']),
			value = pValus.get('value') || '',
			isFocus =  _isFocus || pValus.get('isFocus') || false,
			disabled =pValus.get( 'disabled') || false,
			visible = pValus.get( 'visible') || true,
			placeholder=pValus.get('placeholder'),
			maxlength = pValus.get('maxlength') || 100,
			width = pValus.get('width'),
			height = pValus.get('height'),
			allChange = pValus.get('allChange') || false,
			regex = pValus.get('regex'),
			hasBorder=pValus.get('hasBorder') || 0,
			type=pValus.get('type') || 'text',
			autoSelect=pValus.get('autoSelect') || false,
			isChange=pValus.get('isChange') || false,
			showTips = pValus.get('showTips') || false,
			className = pValus.get('className') 

		addonBefore = addonBefore || pValus.get('addonBefore')
		addonAfter = addonAfter || pValus.get('addonAfter')

		this.oldValue = value

		if(hasBorder==1 && !isNaN(width)){
			width=parseInt(width)-3
			if(style)style.width=width
		}
		if(!style && width){
      		style = {width}
    	}

    	if(!style && height){
    		style ={height}
    	}

    	if(this.props._isGridCell)
    		style={}


		data = this.set(null, { path: _path, value, isFocus, disabled, maxlength, visible, className, placeholder, addonBefore, addonAfter, style, allChange, regex, hasBorder, autoSelect, type, isChange, showTips})
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

	handleBlur(e){
		console.log('handleBlur:')
		//e.preventDefault()
		let newValue = e.target.value,
				oldValue = this.oldValue,
				bindField = this.get('bindField')

		newValue = this.replaceNegativeSign(newValue)
		this.setState({data:this.set('value', newValue)})

		if( this.props.onFieldChange && oldValue !== newValue) {
				this.props.onFieldChange(this.get('path'), oldValue, newValue)
		}
	}

	handleFocus(e){
		e.preventDefault()
		if(this.get('isCooling') === false){
    		return
	    }
		this.setState({data:this.set('isCooling', false)})

		if(!this.get('isFocus')){
			if(this.get('autoSelect')){
				let domNode = ReactDOM.findDOMNode(this.refs.internal).getElementsByTagName('input')[0]
				if (domNode) {
                	//setTimeout(() => {domNode.click()}, 0)
					setTimeout(() => {domNode.select()}, 0)
				}
			}
			this.props.onFieldFocus(this.get('path'))
		}
		setTimeout(()=>{
	    	this.setState({data:this.set('isCooling', true)})
	    }, 1000)
	}

	handleChange(e){
		//注释e.preventDefault()原因：IE11下在Input组件中快速输入1212时，始终无法录入2，只录入了11
		//e.preventDefault()

		if(!e.target || (e.target && e.target.value === this.get('value'))) return

		let val = e.target.value.replace(/([#0-9]\u20E3)|[\xA9\xAE\u203C\u2047-\u2049\u2122\u2139\u3030\u303D\u3297\u3299][\uFE00-\uFEFF]?|[\u2190-\u21FF][\uFE00-\uFEFF]?|[\u2300-\u23FF][\uFE00-\uFEFF]?|[\u2460-\u24FF][\uFE00-\uFEFF]?|[\u25A0-\u25FF][\uFE00-\uFEFF]?|[\u2600-\u27BF][\uFE00-\uFEFF]?|[\u2900-\u297F][\uFE00-\uFEFF]?|[\u2B00-\u2BF0][\uFE00-\uFEFF]?|(?:\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDEFF])[\uFE00-\uFEFF]?/g, '')
		let repValue = this.replaceNegativeSign(val)
		this.setState({data:this.set('value', repValue)})

		let newValue = repValue,
			  oldValue = this.oldValue

		if(!this.get('isFocus') || this.get('allChange')){
				if( this.props.onFieldChange && oldValue !== newValue) {
						this.props.onFieldChange(this.get('path'), oldValue, newValue)
				}
		}
	}

	replaceNegativeSign(newValue){
			let repValue

			if (this.get('regex')) {
					let regExp = new RegExp(this.get('regex'))

					//解决Safari、360浏览器下，中文输入法时正数正则表达式却可以录入负号-的问题
					if ((regExp.test('0.0') || regExp.test('0')) && !regExp.test('-1') && newValue && newValue.indexOf('-') > -1) {
							repValue = newValue.replace('-', '')
					}else{
							repValue = newValue
					}
			}else{
					repValue = newValue
			}

			return repValue
	}

	render(){
		let className = classNames({
			 [this.props.prefixCls]: true,
			 [this.get('className')]: !!this.get('className'),
			 ['change-input']: !!this.get('isChange')
		})

		return (
			<div>
				<Input
					ref='internal'
					value={this.get('value') || ''}
					placeholder={this.get('placeholder')}
					className={className}
					disabled={this.get('disabled')}
					style={this.get('style') && this.get('style').toJS()}
					regex={this.get('regex')}
					hasBorder={this.get('hasBorder')}
					autoSelect={this.get('autoSelect')}
					type={this.get('type')}
					autosize={{ minRows: 5, maxRows: 5 }}
					onBlur={::this.handleBlur}
					onFocus={::this.handleFocus}
					onChange={::this.handleChange}
					addonBefore={this.get('addonBefore')}
					addonAfter={this.get('addonAfter')}
					maxLength ={this.get('maxlength')}
					title={this.get('showTips') ? this.get('value') || '' : ''}
				/>
			</div>
		)
	}
}
