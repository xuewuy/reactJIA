import React from 'react'
import {fromJS, Map} from 'immutable'
import {Address, Button, Popover, ZIcon}  from 'xComponent'
import DynamicComponent, {Attachment} from 'dynamicComponent'
import * as welcome from '../../welcome/action'

export default class CellIcon extends React.Component {
    state = {
        data : Map({
            value:'',
            type:'string'
            // iconValue: false,//true false
            // iconType: 'ticket'//ticket accounting tax
            // headerLine: undefined,
            // operation: undefined,
            // companyName: undefined,
            // currentDate: undefined,
            // ticket: undefined,
            // accounting: undefined,
            // tax: undefined
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
        // let { data } = this.state,
        //     {_getter, _getterByField, _path} = props,
        //     pValues = _getter(_path, ['value', 'docId']),
        //     value = pValues.get('value'),
        //     type = typeof value === 'string' ? 'string' : 'object'
        //     data = this.set(null,{value,type})
        let { data } = this.state,
            {_getter, _getterByField, _path} = props,
            pValues = _getter(_path, ['value']),
            value = pValues.get('value'),
            type = typeof value === 'string' ? 'string' : 'object'
            data = this.set(null,{value})
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

    render(){
        if(this.state.data.get('value') == 1){
            return <ZIcon icon='weikaishi' colorStyle='gray' title='未开始' />
        }else if(this.state.data.get('value') == 2){
            return <ZIcon icon='jinhangzhong' title='进行中' />
        } else if(this.state.data.get('value') == 3) {
            return <ZIcon icon='message-success'  title='已完成' />
        } else if(this.state.data.get('value') == 4) {
            return <span style={{color:'#666666',lineHeight:'30px',display: 'block',textAlign: 'center'}}>无需申报</span>
        } else if(this.state.data.get('value') == 5) {
            return <span style={{color:'#666666',lineHeight:'30px',display: 'block',textAlign: 'center'}}>无需催款</span>
        } else {
            return null
        }

    }
}
