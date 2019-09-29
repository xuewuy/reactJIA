import React from 'react'
import { Map } from 'immutable'
import { Popover } from 'xComponent'


export default class PopModifyLabelComponent extends React.Component {
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
            pValues = _getter(_path, ['value', 'displayMember', 'modifiedMember']),
            value = pValues.get('value') == undefined ? (pValues.get('value') || _value) : pValues.get('value'),
            displayMember = pValues.get('displayMember'),
            modifiedMember = pValues.get('modifiedMember')

        data = data.set('value', value)
        data = data.set('path', _path)
        data = data.set('displayMember', displayMember)
        data = data.set('modifiedMember', modifiedMember)

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
        let itemValue = this.get('value')
        if (!itemValue) {
            return <div></div>
        }

        if (typeof itemValue != 'object') {
            return <div
                onClick={::this.handleClick}
                className='popModifiedLabel'>
                {itemValue}
            </div>
        }

        let displayText = itemValue.get(this.get('displayMember')),
            modifiedText = itemValue.get(this.get('modifiedMember')),
            popContent = <div><span className="popModifiedLabel-pop-modifiedMember" style={{textDecoration: 'line-through'}}>{modifiedText}</span><span
                className="popModifiedLabel-pop-displayMember" style={{color: 'red'}}>{displayText}</span></div>

        return (
            <Popover content={popContent} trigger="hover">
                <span className="popModifiedLabel-displayMember">{displayText}</span>
            </Popover>
        )
    }

}

