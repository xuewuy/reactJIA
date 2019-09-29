import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import assign from 'object-assign'
import {Map} from 'immutable'
import {DatePicker} from 'xComponent'
import moment from 'moment'

export default class DatePickerComponent extends React.Component {
	static defaultProps = {
      	prefixCls: 'z-datepicker'
  	}

 	state = {
  		data : Map({
  			path: '',
  			value:'',
  			isFocus: false,
  			className:'',
  			style:{},
  			fromBody: false,
  			format:'yyyy-MM-dd',
  		})
  	}

	constructor(props){
		super(props)
		this.state = this.calculateState(this.props)
	}

	componentDidMount() {
		if(this.get('isFocus')){
			//this.refs.internal.toggleOpen({open:true})
    	}
  	}


	componentWillReceiveProps(nextProps){
    	this.setState(this.calculateState(nextProps))
    }

    shouldComponentUpdate(nextProps, nextState){
    	return !this.state.data.equals(nextState.data)
    }

	calculateState(props){
		let {data} = this.state,
			{ _path, _getter, style, className} = props,
			pValus = _getter(_path, ['bindField', 'value', 'isFocus','format', 'width', 'disabled','disabledDate','fromBody']),
			bindField = pValus.get('bindField'),
			value = pValus.get('value') || '',
			isFocus = pValus.get( 'isFocus') || false,
			width = pValus.get('width'),
			format = pValus.get('format') ? pValus.get('format').toUpperCase() : 'YYYY-MM-DD',
			disabled = pValus.get('disabled'),
			disabledDate = pValus.get('disabledDate') || '',
			fromBody = pValus.get('fromBody') || false

		this.oldValue = value
		if(!style && width){
      		style = {width}
    	}


    	if(this.props._isGridCell)
    		style={}

		data = this.set(null, {path:_path, value, isFocus, className, format,  style, disabled,disabledDate,fromBody})

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
/*
	componentDidMount(){
		let { _meta,_runtime } = this.props,
			{ bindField } = _meta
		if( _runtime.isFocus(bindField)){
			this.refs.internal.toggleOpen({open:true})
		}
	}


	handleFocus(bindField,e){
		let { _meta, _runtime} = this.props
		if(!_runtime.isFocus(bindField))
			this.props.onFieldFocus(bindField)
	}*/



	handleChange(e,str){
		let newValue = str,
			oldValue = this.oldValue,
			path = this.get('path')

		this.setState({data:this.set('value', newValue)})

		if( oldValue !== newValue && this.props.onFieldChange) {
			this.props.onFieldChange(path, oldValue, newValue)

		}
	}

	handleOpen(open){
		if(!!open){
            this.props.onEvent('onPopupOpen', {path: this.props._path})
        }
	}

	handleVisibleChange(e){
		alert()
	}
	getCalendarContainer(){
		if(this.get('fromBody')) {
			return document.body
		} else {
			return ReactDOM.findDOMNode(this)
		}
	}

	handleFocus(e){
		if(!this.get('isFocus'))
			this.props.onFieldFocus(this.get('path'))
	}
	disabledDate(current) {
		// maxDisabledDate:最大可选时间，true为当前日期以后都可以选
		// minDisabledDate:最小可选时间，true为当前日期以前都可以选
		let disabledDate = this.get('disabledDate').size ? this.get('disabledDate').toJS() : '',
			c = moment(current).startOf('day'),
			b = false


		if(!disabledDate){
			return false
		}

		if(!disabledDate.maxDisabledDate && !disabledDate.minDisabledDate){
			return false
		}
		if(disabledDate.maxDisabledDate) {
			b = c.isAfter(disabledDate.maxDisabledDate)

		}
		if(disabledDate.minDisabledDate) {
			b = b || c.isBefore(disabledDate.minDisabledDate)

		}
		return b

	}

	render(){
		let className = classNames({
			 [this.props.prefixCls]: true,
			 [this.props.className]: !!this.get('className'),
		})

		return (
			<div onFocus={::this.handleFocus}>
				<DatePicker ref='internal'
							value={ this.get('value') && moment(this.get('value'), this.get('format'))}
							className={className}
							style={this.get('style') && this.get('style').toJS()}
							format={this.get('format') }
							onChange={::this.handleChange}
							onOpenChange={::this.handleOpen}
							disabled={this.get('disabled')}
							disabledDate={::this.disabledDate}
							//toggleOpen={::this.handleFocus}
							getCalendarContainer={::this.getCalendarContainer}
							onVisibleChange={::this.handleVisibleChange}
							showTime = {false}
                    		showToday = {false}
				/>
			</div>
		)
	}
}
