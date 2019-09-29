import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import assign from 'object-assign'
import { Map } from 'immutable'
import { Checkbox } from 'xComponent'

export default class CheckboxComponent extends React.Component {
	static defaultProps = {
		prefixCls: 'z-checkbox'
	}

	state = {
		data: Map({
			path: '',
			value: '',
			isFocus: false,
			className: '',
			style: {},
			disabled: false
		})
	}

	constructor(props) {
		super(props)
		this.state = this.calculateState(this.props)
	}

	componentDidMount() {
		// if(this.get('isFocus')){
		// 	/*
		// 	let domNode = ReactDOM.findDOMNode(this.refs.internal).getElementsByTagName('input')[0]
		// 	domNode.focus()
		// 	domNode.value = ''
		// 	domNode.value = this.get('value')*/
		// }
	}

	componentWillReceiveProps(nextProps) {
		this.setState(this.calculateState(nextProps))
	}

	shouldComponentUpdate(nextProps, nextState) {
		return !this.state.data.equals(nextState.data)
	}

	calculateState(props) {
		let {data} = this.state,
			{ _path, _getter, _isFocus, style, className } = props,
			pValus = _getter(_path, ['value', 'isFocus', 'width', 'title', 'showLabel', 'disabled']),
			value = pValus.get('value') || false,
			isFocus = _isFocus || pValus.get('isFocus') || false,
			showLabel = pValus.get('showLabel') === undefined ? true : pValus.get('showLabel'),
			title = pValus.get('title'),
			width = pValus.get('width'),
			disabled = pValus.get('disabled')

		this.oldValue = value

		if (!style && width) {
			style = { width }
		}

		data = this.set(null, { path: _path, value, isFocus, className, title, showLabel, style, disabled })
		return { data }
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
		if (typeof value === 'object') {
			return data.mergeIn(propertyName.split('.'), value)
		}
		else {
			return data.setIn(propertyName.split('.'), value)
		}
	}


	handleFocus(e) {
		if (!this.get('isFocus'))
			this.props.onFieldFocus(this.get('bindField'))
	}

	handleChange(e) {
		let newValue = e.target.checked,
			oldValue = this.oldValue,
			path = this.get('path')

		if (oldValue === newValue) return

		this.setState({ data: this.set('value', newValue) })

		if (this.props.onFieldChange && oldValue !== newValue) {
			this.props.onFieldChange(path, oldValue, newValue)
		}

	}

	render() {

		let className = classNames({
			[this.props.prefixCls]: true,
			[this.props.className]: !!this.get('className'),
		})

		let children = this.props.children || (this.get('showLabel') ? '' : this.get('title'))

		return children ? (
			<Checkbox
				ref='internal'
				checked={this.get('value')}
				className={className}
				style={this.get('style') && this.get('style').toJS()}
				disabled={this.get('disabled')}
				onFocus={::this.handleFocus}
				onChange = {::this.handleChange } >
				{children}
            </Checkbox>
		):(
			<Checkbox
				ref='internal'
				checked={this.get('value')}
				className={className}
				style={this.get('style') && this.get('style').toJS()}
				disabled={this.get('disabled')}
				onFocus={::this.handleFocus}
				onChange={::this.handleChange}>
			</Checkbox>
		)
	}
}
