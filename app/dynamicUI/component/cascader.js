import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import assign from 'object-assign'
import { Map, List, fromJS } from 'immutable'
import { Cascader } from 'xComponent'

export default class CascaderComponent extends React.Component {
	static defaultProps = {
		prefixCls: 'z-cascader'
	}


	state = {
		data: Map({
			path: '',
			value: '',
			isFocus: false,
			disabled: false,
			visible: true,
			className: '',
			dataSource: [],
			displayMember: '',
			valueMember: '',
			style: {},
			placeholder: '',
			isCool: true
		})
	}

	constructor(props) {
		super(props)
		this.state = this.calculateState(this.props)
		this.lazyLoadDataSource = this.lazyLoadDataSource.bind(this)
	}


	componentWillReceiveProps(nextProps) {
		this.setState(this.calculateState(nextProps))
	}

	shouldComponentUpdate(nextProps, nextState) {
		return !this.state.data.equals(nextState.data)
	}

	calculateState(props) {
		let { data } = this.state,
			{ _path, _getter, _isFocus, addonBefore, style, className } = props,
			pValues = _getter(_path, ['value', 'dataSource', 'displayMember', 'valueMember', 'getPopupContainer', 'isFocus', 'visible', 'disabled', 'width', 'height', 'isShowLast', 'placeholder','showRedStar']),
			value = pValues.get('value') ? pValues.get('value') : '',
			dataSource = pValues.get('dataSource'),
			displayMember = pValues.get('displayMember') || 'name',
			valueMember = pValues.get('valueMember') || 'id',
			isFocus = _isFocus || pValues.get('isFocus') || false,
			getPopupContainer = pValues.get('getPopupContainer') || 'app',
			disabled = pValues.get('disabled') || false,
			visible = pValues.get('visible') || true,
			width = pValues.get('width'),
			height = pValues.get('height'),
			isShowLast = pValues.get('isShowLast'),
			showRedStar = pValues.get('showRedStar'),
			placeholder = pValues.get('placeholder')

		this.oldValue = value

		if (!style && width) {
			style = { width }
		}

		if (!style && height) {
			style = { height }
		}

		if (this.props._isGridCell)
			style = {}


		data = this.set(null, {
			path: _path, value, dataSource, displayMember,
			valueMember, isFocus, disabled, visible, isShowLast, className, style, getPopupContainer, placeholder,showRedStar
		})

		if (!dataSource || dataSource.size == 0) {
			dataSource = this.state.data.get('dataSource')
		}
		data = data.set('dataSource', List.isList(dataSource) ? dataSource : fromJS(dataSource))
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
		if (typeof value === 'object' && !List.isList(value)) {
			return data.mergeIn(propertyName.split('.'), value)
		}
		else {
			return data.setIn(propertyName.split('.'), value)
		}
	}

	lazyLoadDataSource() {
		let dataSourceFetchMode = this.get('dataSourceFetchMode')
		if (dataSourceFetchMode === 0) return

		if (dataSourceFetchMode === 1 && this.get('dataSource') && this.get('dataSource').size > 0)
			return

		//this.setState({data:this.set('dataSource', undefined)})
		this.props.getterByAjax(this.get('path'), 'dataSource', (data) => {
			this.setState({ data: this.set('dataSource', data) })
		})
		//this.props.lazyLoad(this.get('path'), 'dataSource', {fetchMode:dataSourceFetchMode})
	}


	handleFocus(e) {
		if (this.get('isCooling') === false) {
			return
		}

		this.setState({ data: this.set('isCooling', false) })

		this.lazyLoadDataSource()

		if (!this.get('isFocus'))
			this.props.onFieldFocus(this.get('path'))

		if (this.props.onFocus) {
			this.props.onFocus(e)
		}

		let that = this
		setTimeout(() => {
			this.setState({ data: this.set('isCooling', true) })
		}, 10)
	}


	handleChange(k, v) {
		//debugger
		let value = v ? v : '',
			oldValue = this.oldValue,
			path = this.get('path')
		if (!this.props.onFieldChange)
			return

		if ((!!this.oldValue !== !!value) ||
			this.oldValue !== value)
			setTimeout(() => {
				this.props.onFieldChange(path, oldValue, value)
			}, 10);
	}

	getOptions() {
		if (!this.get('dataSource') || !this.get('dataSource').size) {

		}
		let toOptions = (dataSource, valueMember, displayMember) => {
			if (!dataSource && window._dataSource) dataSource = fromJS(window._dataSource)
			return dataSource.map(o => {
				return {
					label: o.get(displayMember),
					value: o.get(valueMember) + '',
					children: toOptions(o.get('children'), valueMember, displayMember)
				}
			}).toJS()
		}
		if (this.get('dataSource').size > 0) {
			window._dataSource = this.get('dataSource').toJS()
			return this.get('dataSource').toJS()
		}
		else if (window._dataSource) {
			return window._dataSource
		}

	}

	handleAreaClick(e, label, option) {
		e.stopPropagation()
		//console.log('clicked', label, option)
	}

	getPopupContainer() {
		if (typeof this.get('getPopupContainer') == 'string') {
			return document.getElementById(this.get('getPopupContainer'))
		} else {
			return ReactDOM.findDOMNode(this)
		}
	}

	getBindFieldValue(childId) {
		let _dataSource = this.get('dataSource')
		if ((!_dataSource || !_dataSource.size) && window._dataSource) {
			//data = data.set('dataSource', List.isList(window._dataSource) ? window._dataSource : fromJS(window._dataSource))
			_dataSource = fromJS(window._dataSource)
		}
		if (!childId) return undefined
		let response = ''
		_dataSource.map(o => {
			if (!o.get('children') || !o.get('children').size) {
				if (o.get('value') == childId) {
					response = o.get('value') + ''
				}
			} else {
				o.get('children').map(ele => {
					if (ele.get('value') == childId) {
						response = o.get('value') + ',' + childId
					}
				})
			}
		})
		return response

	}

	render() {
		let className = classNames({
			[this.props.prefixCls]: true,
			[this.props.className]: !!this.get('className'),
		})

		let value = this.get('value') || [], bindValue = null, ext = {}, _this = this
		if (value.size > 0) {
			if (typeof (value.get('id')) == 'number') {
				//只传入了末级，需要查询datasource
				window.setTimeout(function () {
					bindValue = _this.getBindFieldValue(value.get('id'))
					if (bindValue) {
						let dataStrArr = bindValue.split(","), dataIntArr = []
						dataIntArr = dataStrArr.map(function (data) {
							return +data
						})
						bindValue = dataIntArr
					}
				}, 100)

			}
			else if (typeof (value.get('id')) == 'undefined') {
				//直接传入解析
				if (value.get && !value.get(0)) {
					ext.value = []
				}
				else if (value.get && value.get(0) && value.size >= 1) {
					let selectSize = value.size,
						dataIntArr = []
					if (selectSize > 1) {
						if (typeof (value.get(0)) == 'string' && typeof (value.get(1)) == 'string') {
							dataIntArr.push(parseInt(value.get(0)))
							dataIntArr.push(parseInt(value.get(1)))
						}
						else {
							dataIntArr.push(value.get(0).get('value'))
							dataIntArr.push(value.get(1).get('value'))
						}

					}
					else {
						if (typeof (value.get(0).get('value')) == 'object') {
							dataIntArr.push(value.get(0).get('value').get(0))
							dataIntArr.push(value.get(0).get('value').get(1))
						}
						else {
							dataIntArr.push(value.get(0).get('value'))
						}
					}
					bindValue = dataIntArr
				}
			}
		}
		const displayRender = (labels, selectedOptions) => labels.map((label, i) => {
			//debugger
			const option = selectedOptions[i]
			if (i === labels.length - 1) {
				return (
					<span key={option.value}>
						{label}
					</span>)
			}
			return <span key={option.value}>{label} / </span>
		})



		if (bindValue) ext.value = bindValue
		let showRedStar = this.get('showRedStar') ? true : false
		return (
			<div>
				{showRedStar?<span style={{ 'margin-right': '4px', color: '#f50', 'vertical-align': 'middle','font-family':'SimSun','font-size':'12px' }}>*</span>:null}
				<Cascader
					ref='internal'
					placeholder={this.get('placeholder')}
					options={this.getOptions()}
					{...ext}
					size={'large'}
					className={className}
					matchInputWidth={true}
					allowClear={this.get('allowClear')}
					disabled={this.get('disabled')}
					style={this.get('style') && this.get('style').toJS()}
					expandTrigger={'hover'}
					notFoundContent='无可选下拉项'
					getPopupContainer={::this.getPopupContainer}
					onFocus={::this.handleFocus}
					onChange={::this.handleChange}
					displayRender={displayRender}
					showSearch
				/>
	        </div >
		)
	}
}