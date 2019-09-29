import React from 'react'
import {Map} from 'immutable'


export default class LinkComponent extends React.Component {
    state = {
        data: Map({
            value: null,
            showTips:false
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
            pValues = _getter(_path, ['value', 'textAlign', 'defaultValue', 'showTips', 'disabled','disabledTitle']) ,
            value = pValues.get('value') == undefined ? (pValues.get('value') || _value) : pValues.get('value'),
            textAlign = pValues.get('textAlign'),
            defaultValue = pValues.get('defaultValue'),
            showTips = pValues.get('showTips') || false,
            disabled = pValues.get('disabled') || false,
            disabledTitle = pValues.get('disabledTitle') || false

        if(defaultValue != ''  && defaultValue !=null) value=defaultValue
        data = data.set('value', value)
        data = data.set('textAlign', textAlign)
        data = data.set('showTips', showTips)
        data = data.set('disabled', disabled)
        data = data.set('disabledTitle', disabledTitle)

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
        this.props.onEvent && this.props.onEvent('onLinkClick', {path: this.props._path})
    }

    render() {

        let ext = {}
        if(this.get('textAlign')){
            ext.style = { textAlign: this.get('textAlign') }
            
        }
        if (this.get('disabledTitle')){
            ext.title = this.get('disabledTitle')
        }
        return (
            <div className='z-grid-displaycell' {...ext}>
                {this.get('disabled')?<span style={{cursor:'not-allowed',color:'#999'}}>{this.get('value')}</span> : <a onClick={::this.handleClick} title={this.get('showTips') == true ? this.get('value') : null}>
                    {this.get('value')}
                </a>}
            </div>
        )
    }

}

