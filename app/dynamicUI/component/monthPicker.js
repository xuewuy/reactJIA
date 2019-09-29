import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import assign from 'object-assign'
import {Map} from 'immutable'
import {DatePicker} from 'xComponent'
import moment from 'moment'
export const MonthPicker  = DatePicker.MonthPicker;
export default class MonthPickerComponent extends React.Component {
	static defaultProps = {
      	prefixCls: 'z-monthpicker'
  	}

 	state = {
  		data : Map({
  			path: '',
  			value:'',
  			isFocus: false,
  			className:'',
  			style:{},
			format:'yyyy-MM',
			placeholder:''
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
			pValus = _getter(_path, ['bindField', 'value', 'isFocus','format', 'width','calendarContainerId','disabled','max', 'min','fromBody','placeholder']),
			bindField = pValus.get('bindField'),
			value = pValus.get('value') || '',
			isFocus = pValus.get( 'isFocus') || false,
			width = pValus.get('width'),
			format = pValus.get('format'),
			//disabledDate = pValus.get('disabledDate'),
			disabled = pValus.get('disabled'),
			max = pValus.get('max'),
			min = pValus.get('min'),
			fromBody = pValus.get('fromBody'),
			placeholder = pValus.get('placeholder'),
			calendarContainerId = pValus.get('calendarContainerId') || 'app'
		this.oldValue = value
		if(!style && width){
      		style = {width}
    	}


    	if(this.props._isGridCell)
    		style={}

		data = this.set(null, {path:_path, value, isFocus, className, format,  style,calendarContainerId,disabled, max, min,fromBody,placeholder})

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

	handleVisibleChange(e){
		alert()
	}

	handleFocus(e){
		if(!this.get('isFocus'))
			this.props.onFieldFocus(this.get('path'))
	}
    getCalendarContainer(){
        //return document.getElementById(this.get('calendarContainerId'))
        // return ReactDOM.findDOMNode(this)
        if(this.get('fromBody')) {
            return document.body
        } else {
            return ReactDOM.findDOMNode(this)
        }
    }

    disabledDate(current) {
		// max:最大可选时间，true为当前日期以后都可以选
		// min:最小可选时间，true为当前日期以前都可以选
		let max = this.get('max'),
			min = this.get('min'),
			c = moment(current),
			b = false

		if(!max && !min){
			return false
		}

		if(max){
			b = c.isAfter(max)
		}

		if(min)
			b = b || c.isBefore(min)

		return b

	}

	render(){
		let className = classNames({
			 [this.props.prefixCls]: true,
			 [this.props.className]: !!this.get('className'),
		})

		return (
			<div onFocus={::this.handleFocus}>
			   	<MonthPicker ref='internal'
				value={this.get('value') && moment(this.get('value'), this.get('format') || 'YYYY/MM')}
				   	className={className}
		        	style={this.get('style') && this.get('style').toJS()}
		        	format={this.get('format') }
		        	onChange={::this.handleChange}
                    disabled={this.get('disabled')}
					disabledDate = {::this.disabledDate}
					placeholder={this.get('placeholder')}
		        	//toggleOpen={::this.handleFocus}
		        	onVisibleChange={::this.handleVisibleChange}
                    getCalendarContainer={::this.getCalendarContainer}
                    allowClear = {false}
	        	/>
        	</div>
		)
	}
}
