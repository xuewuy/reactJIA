import React from 'react'
import {Map} from 'immutable'
import DynamicComponent from 'dynamicComponent'
import omit from 'omit.js'
import {ZIcon} from 'xComponent'
export default class FixedColumnComponent extends React.Component {
    static defaultProps = {
      	prefixCls: 'z-fixedcolumn'
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
	}

	componentWillReceiveProps(nextProps) {
		this.setState(this.calculateState(nextProps))
	}

	shouldComponentUpdate(nextProps, nextState) {
		return !this.state.data.equals(nextState.data)
	}

	calculateState(props) {
		let {data} = this.state,
			{ path, _getter, _isFocus, style, className } = props,
			pValus = _getter(path, ['value', 'isFocus', 'width', 'title', 'showLabel', 'disabled','colorStyle','icon']),
			value = pValus.get('value') || false,
			isFocus = _isFocus || pValus.get('isFocus') || false,
			showLabel = pValus.get('showLabel') === undefined ? true : pValus.get('showLabel'),
			title = pValus.get('title'),
			width = pValus.get('width'),
			disabled = pValus.get('disabled'),
            colorStyle = pValus.get('colorStyle'),
			icon = pValus.get('icon')

		this.oldValue = value

		if (!style && width) {
			style = { width }
		}

		data = this.set(null, { path: path, value, isFocus, className, title, showLabel, style, disabled,colorStyle,icon })
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

    handleClick(path) {
        
        this.props.onEvent && this.props.onEvent('onClick', { path: path})
		//return
    }

    getChildComponents(childrens, _path, prefixCls, otherProps,columnName){
		if(!childrens) return null
        return(
            <span className={`${prefixCls}-detail-option`}>
                {
                    childrens.map(o=> {
                        let childPath = `${_path}.${columnName}.${o.get('name')}`
                        return (
                             <DynamicComponent {...otherProps} _path={childPath} />
                            //<ZIcon icon={o.get('zIcon')} disabled={o.get('disabled')} colorStyle={o.get('colorStyle')}   title={o.get('title')}></ZIcon>
                        )}
                    )
                }
            </span>
        )
    }

	//{this.getChildComponents(list,path,prefixCls,otherProps,columnName)}
    render() {
        let {prefixCls,icon,path,rowIndex} = this.props
        return(
            <span className={`${prefixCls}-detail-option`}>
                <ZIcon icon={icon} path={path} disabled={this.get('disabled')} colorStyle={this.get('colorStyle')} onClick={()=>{::this.handleClick(path)}} title={this.get('title')}></ZIcon>
            </span>
        )
    }
}

