import React from 'react'
import {Map} from 'immutable'
import {notification} from 'xComponent'

export default class NotificationComponent extends React.Component {
    state = {
        data: Map({
            value: null,
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
            {_getter, _getterByField, _path, _value} = props,
            pValues = _getter(_path, ['value','textAlign']) ,
            value = pValues.get('value') == undefined ? (pValues.get('value') || _value) : pValues.get('value'),
            textAlign = pValues.get('textAlign')

        data = data.set('value', value)
        data = data.set('textAlign', textAlign)
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
}

