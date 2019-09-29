import React from 'react'
import { Map, List, fromJS } from 'immutable'
import { Select, Button, Popover } from 'xComponent'
import { AppLoader } from 'appLoader'

export default class DropDownDisplayComponent extends React.Component {
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

    calculateState(props) {
        let {data} = this.state,
            {_getter, _getterByField, _path, _value} = props,
            pValues = _getter(_path, ['value', 'displayMember']),
            value = pValues.get('value') == undefined ? (pValues.get('value') || _value) : pValues.get('value'),
            displayMember = pValues.get('displayMember')
        if(!value){
            value=Map({})
        }
        if (!Map.isMap(value) && !List.isList(value) && (typeof value == 'object')) {
            value = fromJS(value)
        }

        data = data.set('value', value)
        data = data.set('path', _path)
        data = data.set('displayMember', displayMember)
        this.oldValue = value

        return {data}
    }


    handleClick(e) {
        e.preventDefault()
        this.props.onFieldFocus(this.get('path'))
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
        let subjectName = ''

        if (this.get('value') && typeof(this.get('value')) == 'object') {
            subjectName = this.get('value').get(this.get('displayMember')) || ''
        }
        else {
            subjectName = this.get('value') || ''
        }

        return (
            <div className='z-grid-displaycell' onClick={::this.handleClick} title={subjectName}>
                <span>{subjectName}</span>
            </div>
        )
    }
}
