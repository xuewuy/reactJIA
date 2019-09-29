import React from 'react'
import {Map} from 'immutable'


export default class MultiLinkComponent extends React.Component {
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
            pValues = _getter(_path, ['value','textAlign','defaultValue']) ,
            value = pValues.get('value') == undefined ? (pValues.get('value') || _value) : pValues.get('value'),
            textAlign = pValues.get('textAlign'),
            defaultValue = pValues.get('defaultValue')
        
        if(defaultValue != ''  && defaultValue !=null) value=defaultValue
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

    handleClick(o) {
        this.props.onEvent && this.props.onEvent('onLinkClick', {path: this.props._path,rowData:o})
    }

    render() {
        let ext = {}
        if(this.get('textAlign'))
            ext.style = { textAlign: this.get('textAlign')}
        let linkValue=this.get('value') || []
        return <div className='z-grid-displaycell' {...ext}>
            {
                linkValue.map(o=> {
                    return(
                        <a style={{paddingRight: '8px'}} className='linkCellStyle' onClick={()=>{::this.handleClick(o)}}>{o.get('code')}</a>
                    )}
                )
            }
        </div>
       
    }
}

