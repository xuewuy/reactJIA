import React from 'react'
import {Map} from 'immutable'
import {Input}  from 'xComponent'
import DynamicComponent, { Modal } from 'dynamicComponent'

export default class popUpMenuTree extends React.Component {
    state = {
        data : Map({
            displayText:'',
            style:{}
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
            pValues = _getter(_path, ['value','className','isEndNode','style']),
            value = pValues.get('value'),
            className = pValues.get('className'),
            isEndNode = pValues.get('isEndNode'),
            style = pValues.get('style')
        this.oldValue = value
            data = this.set(null,{path:_path,value,className,isEndNode,style})
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
    handleClick(){
        let {clearMessage, setMessage} = this.props,
            This = this
        setMessage({
            type: 'app',
            content: 'app:apps/common/subjectsMenuTree',
            refName: 'subjectsMenuTree',
            initData:{checkable:false,isEndNode:true},
            maskClosable:true,
            title:'选择科目',
            highZIndex:true,
            wrapClassName:'popUpMenuTree',
            closable:false,
            width: 470,
            onCancel: ()=> {
                clearMessage()
            },
            onOk: (cb)=> {
                if(cb.result){
                    clearMessage()
                    let { datas } = This.state
                    datas = This.set(null,{displayText:cb.value})
                    This.setState({datas})
                    This.handleChange(cb.value)
                }
            }
        })
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
        let message = this.props.payload.getIn(['global', 'message'])
        return(
            <div style={{display:'flex'}} onClick={::this.handleClick}>
                <Input className={this.get('className')} style={::this.get('style') && ::this.get('style').toJS()} onChange={::this.handleChange} value={this.get('value') ? this.get('value').get('codeAndName') : ''}></Input>
                <span style={{marginLeft:'-20px',zIndex:'3',fontSize:'20px',lineHeight:'0.7'}}>...</span>
                {Modal(message)}
            </div>
        )
    }
    
}

