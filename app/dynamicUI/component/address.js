import React from 'react'
import {Map} from 'immutable'
import {Address}  from 'xComponent'

export default class AddressComponent extends React.Component {
  	state = {
  		data : Map({
            path:'',
            provinces: '',
            citys:'',
            districts:'',
            text:'',
            showDetail:true
  		})
  	}

    constructor(props){
        super(props)
        this.state = this.calculateState(this.props)
    }

    componentWillReceiveProps(nextProps){
        this.setState(this.calculateState(nextProps))
    }

    shouldComponentUpdate(nextProps, nextState){
        return true
        return !this.state.data.equals(nextState.data)
    }

    calculateState(props){
        let { data } = this.state,
            {_getter, _getterByField, _path} = props,
            pValues = _getter(_path, ['value', 'width','disabled','showDetail','showTips']),
            value = pValues.get('value'),
            provinces = !value ? '' : value.get('provinces') || '',
            citys = !value ? '' : value.get('citys') || '',
            districts = !value ? '' : value.get('districts') || '',
            text = !value ? '' : value.get('text') || '',
            width = pValues.get('width'),
            disabled=pValues.get('disabled') || false,
            showDetail = pValues.get('showDetail'),
            showTips = pValues.get('showTips') || false
        this.oldValue = value
        data = this.set(null,{path:_path,provinces,citys,districts,text, width,disabled,showDetail,showTips})
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
        if (!propertyName || propertyName === '') {
            return data.merge(value)
        }
        if(typeof value === 'object'){
            return data.mergeIn(propertyName.split('.'), value)
        }
        else{
            return data.setIn(propertyName.split('.'), value)
        }
    }
    handleChange(value){
        let newValue = value,
            oldValue = this.oldValue,
            path = this.get('path')
        if(oldValue === newValue) return
        if( this.props.onFieldChange && oldValue !== newValue) {
            this.props.onFieldChange(path, oldValue, newValue)
        }
    }


    render(){
        let showDetail = this.get('showDetail'),
            showTips = this.get('showTips')

        if(showDetail ==null || showDetail ==undefined || showDetail ==true){
            showDetail=true
        }
	    return(
	    	<Address showDetail={showDetail} showTips = {showTips} onChange={::this.handleChange} value={this.state.data.toJS()} />
    	)
    }

}
