import React from 'react'
import {Map} from 'immutable'
import classNames from 'classnames'
import { Input } from 'xComponent'

export default class TextComponent extends React.Component {
    static defaultProps = {
      prefixCls: 'z-textInput'
    }

    state = {
        data: Map({
            value: null,
            className:''
        })
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
            {_getter, _getterByField, _path, _value, className} = props,
            pValues = _getter(_path, ['value']) ,
            value = pValues.get('value') == undefined ? (pValues.get('value') || _value) : pValues.get('value')

        data = data.set('value', value)
        data = data.set('className', className)
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
        return data.setIn(propertyName.split('.'), value)
    }

    handleClick() {
        this.props.onEvent('showDetails', {path: this.props._path, value: this.get('value')})
    }

    render() {
  		let className = classNames({
  			 [this.props.prefixCls]: true,
  			 [this.props.className]: !!this.get('className'),
  		})

        let ext = {}
        
        ext.title = this.get('value')

        return (
            <div className={className} {...ext} onClick={::this.handleClick}>
                {this.get('value')}
            </div>
        )
    }
}
