import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import assign from 'object-assign'
import { Map } from 'immutable'
import { DropdownButton,Menu,Button,Dropdown,Icon } from 'xComponent'

export default class DropDownComponent extends React.Component {
    static defaultProps = {
        prefixCls: 'z-dropdown'
    }

    state = {
        data: Map({
            path: '',
            value: '',
            isFocus: false,
            disabled: false,
            visible: true,
            className: '',
            style: {},
            maxlength: 100,
            trigger:'hover',
            overlay:'',
            selectIndex:0
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

    shouldComponentUpdate(nextProps, nextState){
    	return !this.state.data.equals(nextState.data)
    }

    calculateState(props) {
        let { data } = this.state,
            { _path, _getter, _isFocus, addonBefore, style, className } = props,
            pValus = _getter(_path, ['value', 'text', 'isFocus', 'visible', 'disabled', 'width', 'height', 'type', 'zIcon','overlay']),
            value = pValus.get('value') || '',
            text = pValus.get('text') || '',
            isFocus = _isFocus || pValus.get('isFocus') || false,
            disabled = pValus.get('disabled') || false,
            visible = pValus.get('visible') || true,
            width = pValus.get('width'),
            height = pValus.get('height'),
            type = pValus.get('type'),
            zIcon = pValus.get('zIcon'),
            overlay = pValus.get('overlay')


        this.oldValue = value

        if (!style && width) {
            style = { width }
        }

        if (!style && height) {
            style = { height }
        }


        data = this.set(null, { path: _path, value, text, isFocus, disabled, visible, className, style, type, zIcon,overlay })
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
        e.preventDefault()
    }

    handleClick(e) {
        this.props.onEvent && this.props.onEvent('onClick', { path: this.props._path,selectIndex:e.key })
        this.setState({data:this.set('selectIndex', e.key)})
    }

    recursion(dataSource,sortTypeId) {
		return (
			dataSource.map((menu, index) => {
				if (menu.children) {
					return (
						<SubMenu key={menu.get('id')} title={menu.get('name')}>
							{this.recursion(menu.children)}
						</SubMenu>
					)
				} else {
                    if(menu.get('id')==sortTypeId){
                        return (<Menu.Item key={menu.get('id')}><span className={`${this.props.prefixCls}-sortmenu-selected`} ><Icon type="check" />{menu.get('name')}</span></Menu.Item>)
                    }
                    else{
					    return (<Menu.Item key={menu.get('id')} value={index}>{menu.get('name')}</Menu.Item>)
                    }
				}
			})
		)
	}
    render() {
        let getterByField = this.props.payload.getIn(['utils','getterByField']),
            sortTypeId =  this.get('selectIndex') || 0,
            menuItems = []
        let className = classNames({
            [this.props.prefixCls]: true,
            [this.props.className]: !!this.get('className')
        })
        let showText = this.get('value') || this.get('text'),
            overlay= this.get('overlay') 


        const menu = (
			<Menu onClick={::this.handleClick}>
				{this.recursion(overlay,sortTypeId)}
			</Menu>
		)
        return (
            <Dropdown overlay={menu}>
                <Button
                    ref='internal'
                    className={className}
                    disabled={this.get('disabled')}
                    style={this.get('style') && this.get('style').toJS()}
                    onFocus = {::this.handleFocus }
                    type = { this.get('type') }
                    zIcon = { this.get('zIcon') || '' }>
                    { showText || '' }
                </Button>
            </Dropdown>
		)
}
}
