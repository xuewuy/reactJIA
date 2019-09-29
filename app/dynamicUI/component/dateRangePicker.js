import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import assign from 'object-assign'
import {Map ,fromJS} from 'immutable'
import {DatePicker} from 'xComponent'
import moment from 'moment'
const RangePicker = DatePicker.RangePicker
export default class DatePickerComponent extends React.Component {
    static defaultProps = {
        prefixCls: 'z-datepicker'
    }

    state = {
        data : Map({
            path: '',
            value:'',
            isFocus: false,
            className:'',
            style:{},
            format:'yyyy-MM-dd'
        })
    }

    constructor(props){
        super(props)
        this.state = this.calculateState(this.props)
    }

    componentDidMount() {
        if(this.get('isFocus')){
            //this.refs.internal.toggleOpen({open:true})
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState(this.calculateState(nextProps))
    }

    shouldComponentUpdate(nextProps, nextState){
        return !this.state.data.equals(nextState.data)
    }

    calculateState(props){
        let {data} = this.state,
            { _path, _getter, style, className} = props,
            pValus = _getter(_path, ['bindField', 'value', 'isFocus','format', 'width', 'disabled','containerId', 'startDate']),
            bindField = pValus.get('bindField'),
            value = pValus.get('value') || '',
            isFocus = pValus.get( 'isFocus') || false,
            width = pValus.get('width'),
            format = pValus.get('format') ? pValus.get('format').toUpperCase() : 'YYYY-MM-DD',
            disabled = pValus.get('disabled'),
            startDate = pValus.get('startDate'),
            containerId = pValus.get('containerId')
        
        this.oldValue = value

        if(!style && width){
            style = {width}
        }

        if(this.props._isGridCell)
            style={}
        data = this.set(null, {path:_path, value, isFocus, className, format,  style, disabled,containerId,startDate})
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

    handleChange(e,str){
        let newValue = str,
            oldValue = this.oldValue,
            path = this.get('path')
        this.setState({data:this.set('value', newValue)})
        if( oldValue !== newValue && this.props.onFieldChange) {
            this.props.onFieldChange(path, oldValue, newValue)
        }
    }

    handleFocus(e){
        if(!this.get('isFocus'))
            this.props.onFieldFocus(this.get('path'))
    }
    getCalendarContainer(){
        return ReactDOM.findDOMNode(this)
        // return document.getElementById(this.get('containerId'))
    }
    handleDisabledDate (current) {
        return current && current.valueOf() < this.get('startDate').valueOf()
    }

    render(){
        let className = classNames({
             [this.props.prefixCls]: true,
             [this.props.className]: !!this.get('className'),
        }),
        defaultValue = [moment(moment().startOf('month').format("YYYY-MM-DD")),moment(moment().endOf('month').format("YYYY-MM-DD"))],
        value = this.get('value')?[moment(this.get('value').get(0)),moment(this.get('value').get(1))]:defaultValue
        return (
            <div onFocus={::this.handleFocus}>
                <RangePicker ref='internal'
                    defaultValue={value}
                    className={className}
                    style={::this.get('style') && this.get('style').toJS()}
                    format={this.get('format') }
                    onChange={::this.handleChange}
                    disabled={::this.get('disabled')}
                    disabledDate={::this.handleDisabledDate}
                    getCalendarContainer={::this.getCalendarContainer}
                />
            </div>
        )
    }
}
