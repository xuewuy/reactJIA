import React,{ Component } from 'react'
import ReactDOM from 'react-dom'
import { Map } from 'immutable'
import { Radio } from 'xComponent'

export default class AntRadio extends Component {
    state = {
        data: Map({
            path: '',
            key:'',
            value: ''
        })
    }
    static defaultProps = {
        prefixCls: 'ant-radio'
    }

    constructor(props) {
        super(props)
        this.state = this.calculateState(this.props)
    }
    componentWillReceiveProps(nextProps) {
        this.setState(this.calculateState(nextProps))
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
            return data.mergeDeep(value)
        }
        if (typeof value === 'object') {
            return data.mergeDeepIn(propertyName.split('.'), value)
        }
        else {
            return data.setIn(propertyName.split('.'), value)
        }
    }

    calculateState(props) {
        let {data} = this.state,
            { _path, _getter, style} = props,
            pValus = _getter(_path, ['value','key','className','visible','visibleKey']),
            value = pValus.get('value') || '',
            className = pValus.get('className') || '',
            key = pValus.get('key'),
            visible = pValus.get('visible'),
            visibleKey = pValus.get('visibleKey') || false
        this.oldValue = value
        data = this.set(null, { path: _path, value,key,className,visible,visibleKey})
        return { data }
    }
    handleChange(e){
        let value = this.get('key'),
            oldValue = this.oldValue,
            path = this.get('path')
        setTimeout(() => this.props.onFieldChange(path, oldValue, value), 0)
    }
    render(){
        if(this.get('visible')){
            if(this.get('visibleKey')){
                if(this.get('visibleKey') == this.get('key')){
                    return null
                }
            }else{
                return null 
            }
        }
        return (
            <div className={this.get('className')}>
                <Radio onChange={::this.handleChange} key={this.get('key')} checked={this.get('key') == this.get('value')} value={this.get('value')}></Radio>
            </div>
        )
    }
}