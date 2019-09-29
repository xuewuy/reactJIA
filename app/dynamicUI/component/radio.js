
import React from 'react'
import { Map } from 'immutable'
import { Radio } from 'xComponent'
import classNames from 'classnames'

const RadioGroup = Radio.Group


export default class RadioComponent extends React.Component {
	state = {
		data: Map({
			path: '',
			value: '',
			isFocus: false,
			dataSource: [],
			displayMember: '',
			valueMember: '',
			style: {},
			disabled: false
		})
	}

	static defaultProps = {
		prefixCls: 'z-radio'
	}

	constructor(props) {
		super(props)
		this.state = this.calculateState(this.props)
	}

	componentWillReceiveProps(nextProps) {
		this.setState(this.calculateState(nextProps))
	}

	shouldComponentUpdate(nextProps, nextState) {
		return !this.state.data.equals(nextState.data)
	}

	calculateState(props) {
		let {data} = this.state,
			{ _path, _getter, _isFocus, _disabled, style, className } = props,
			pValus = _getter(_path, ['value', 'isFocus', 'disabled', 'displayMember', 'valueMember', 'width']),
			value = pValus.get('value') || '',
			isFocus = _isFocus || pValus.get('isFocus') || false,
			dataSource = _getter(_path, 'dataSource'),
			displayMember = pValus.get('displayMember') || 'name',
			valueMember = pValus.get('valueMember') || 'code',
			width = pValus.get('width'),
			disabled = pValus.get('disabled')
		this.oldValue = value

		if (!style && width) {
			style = { width }
		}

		data = this.set(null, { path: _path, value, isFocus, disabled, dataSource, displayMember, valueMember, style })
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
			return data.mergeDeep(value)
		}
		if (typeof value === 'object') {
			return data.mergeDeepIn(propertyName.split('.'), value)
		}
		else {
			return data.setIn(propertyName.split('.'), value)
		}
	}
	lazyLoadDataSource() {
		let dataSourceFetchMode = this.get('dataSourceFetchMode')

		if (dataSourceFetchMode === 0) return

		if (dataSourceFetchMode === 1 && this.get('dataSource'))
			return

		this.props.lazyLoad(this.get('path'), 'dataSource', { fetchMode: dataSourceFetchMode })
	}


	getOptions() {
		let dataSource = this.get('dataSource')
		return dataSource ? dataSource.map((item, index) =>
			<Option value={item.get(this.get('valueMember'))}>
				{item.get(this.get('displayMember'))}
			</Option>) :
			[]
	}

	findItem(input, dataSource) {
		return dataSource.find(x => (x.get(this.get('valueMember')) === input || x.get(this.get('displayMember')) === input))
	}

	handleChange(e) {
		let value = e.target.value,
			oldValue = this.oldValue,
			path = this.get('path'),
			dataSource = this.get('dataSource')

		value = this.findItem(value, dataSource)
		if (!this.props.onFieldChange)
			return

		if ((!!this.oldValue !== !!value) ||
			(this.oldValue.get(this.get('valueMember')) !== value.get(this.get('valueMember'))))
			setTimeout(() => this.props.onFieldChange(path, oldValue, value), 0)

	}

	handleFocus(e) {
		if (!this.get('isFocus'))
			this.props.onFieldFocus(this.get('bindField'))
	}

	getChildren(dataSource, displayMember, valueMember) {
		return dataSource.map(o => {
			return (
				<Radio key={o.get(valueMember)} value={o.get(valueMember)}> {o.get(displayMember)}</Radio>
			)
		})
	}


	render() {
		let className = classNames({
			[this.props.prefixCls]: true,
			[this.props.className]: !!this.get('className'),
		})

		let dataSource = this.get('dataSource')
		let bln = true
		return (
			<div className={className} onFocus={::this.handleFocus}>
				<RadioGroup
					disabled={this.get('disabled')}
					onChange={::this.handleChange}
					style={this.get('style') && this.get('style').toJS()}
					value={this.get('value.' + this.get('valueMember'))}>
					{this.getChildren(dataSource, this.get('displayMember'), this.get('valueMember'))}
				</RadioGroup>
        	</div >
		)
	}
}
