import React from 'react'
import {Map} from 'immutable'
import classNames from 'classnames'

export default class TextComponent extends React.Component {
    static defaultProps = {
      prefixCls: 'z-text'
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
            pValues = _getter(_path, ['value','textAlign']) ,
            value = pValues.get('value') == undefined ? (pValues.get('value') || _value) : pValues.get('value'),
            textAlign = pValues.get('textAlign')

        data = data.set('value', value)
        data = data.set('textAlign', textAlign)
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

    render() {
  		let className = classNames({
  			 [this.props.prefixCls]: true,
  			 [this.props.className]: !!this.get('className'),
  		})

        let ext = {}
        if(this.get('textAlign'))
            ext.style = { textAlign: this.get('textAlign')}

        return (
            <div className={className} {...ext}>
                {this.get('value')}
            </div>
        )
    }
}
