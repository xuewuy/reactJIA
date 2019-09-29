import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import assign from 'object-assign'
import {Map} from 'immutable'
import {DatePicker,Input} from 'xComponent'
// import {MonthPicker,DatePicker,Input} from 'dynamicComponent'
export const MonthPicker  = DatePicker.MonthPicker;
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
export default class DateRangePickerComponent extends React.Component {
	static defaultProps = {
      	prefixCls: 'z-rangePicker'
  	}

 	state = {
  		data : Map({
  			path: '',
            rangeStart:'',
            rangeEnd:'',
  					className:'',
            isEndOpen:false,
            startDate:'',
						endDate:'',
            style:{},
            isEndLessThanStart:false//控制input输入值，为true时，后一项不能小于前一项，false不做判断
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
    	return !this.state.data.equals(nextState.data)
    }

	calculateState(props){
		let {data} = this.state,
			{ _path, _getter} = props,
			pValus = _getter(_path, ['value', 'componentName', 'calendarContainerId','maxLength','format','className','style','startDate', 'isEndLessThanStart','endDate']),
            value = pValus.get('value'),
			componentName = pValus.get('componentName'),
            rangeEnd = value ? value.get('rangeEnd') : '',
            rangeStart = value ? value.get('rangeStart') : '',
            maxLength = pValus.get('maxLength') || '100',
            format = pValus.get('format') || 'YYYY-MM-DD',
            calendarContainerId = pValus.get('calendarContainerId') || 'app',
            className = pValus.get('className'),
            style = pValus.get('style'),
			startDateFirst = pValus.get('startDate') || '',
            endDate = pValus.get('endDate') || '',
            isEndLessThanStart = pValus.get('isEndLessThanStart') || false
        this.oldValue = value
		data = this.set(null, {path:_path,rangeEnd,rangeStart,componentName,calendarContainerId,maxLength,format,className,style,startDateFirst,endDate,isEndLessThanStart})
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

    onStartChange(date,dateString){
        let { data } = this.state,
            path = this.get('path')
        if(!date){
            data = this.set(null,{rangeStart:data.get('rangeStart')})
            this.setState({data})
            return
        }
				let current = moment(date.format('YYYY-MM-DD'))//取凌晨时间,使点今天按钮和日期按钮保持一致
        data = this.set(null,{rangeStart:dateString,isEndOpen : true,startDate:current})
        this.setState({data})
        setTimeout(()=>{
            this.props.onFieldChange && this.props.onFieldChange(path,this.oldValue,Map({rangeStart:dateString,rangeEnd:this.get('rangeEnd')}))
        },100)

    }

    onEndChange(date,dateString){
        let { data } = this.state,
            path = this.get('path')
            if(!date){
                data = this.set(null,{rangeEnd:data.get('rangeEnd')})
                this.setState({data})
                return
            }
				let current = moment(date.format('YYYY-MM-DD'))//取凌晨时间,使点今天按钮和日期按钮保持一致
        data = this.set(null,{rangeEnd:dateString,isEndOpen : false,endDate:current})
        this.setState({data})
        setTimeout(()=>{
            this.props.onFieldChange && this.props.onFieldChange(path,this.oldValue,Map({rangeStart:this.get('rangeStart'),rangeEnd:dateString}))
        },100)

    }

    onInputStartChange(e){
        e.preventDefault()
        if(e.target.value === this.get('value')) return
        let { data } = this.state,
            path = this.get('path')
        data = this.set(null,{rangeStart:e.target.value})
        this.setState({data})
        this.props.onFieldChange && this.props.onFieldChange(path,this.oldValue,Map({rangeStart:e.target.value,rangeEnd:this.get('rangeEnd')}))
    }

    onInputEndChange(e){
        e.preventDefault()
        if(e.target.value === this.get('value')) return
        let { data } = this.state,
            path = this.get('path')
        data = this.set(null,{rangeEnd:e.target.value})
        this.setState({data})
        this.props.onFieldChange && this.props.onFieldChange(path,this.oldValue,Map({rangeStart:this.get('rangeStart'),rangeEnd:e.target.value}))
    }

    onBlur(e) {
        let  { data } = this.state,
            isEndLessThanStart = this.get('isEndLessThanStart'),
            path = this.get('path'),
            startValue = this.get('rangeStart'),
            endValue = this.get('rangeEnd'),
            currentName = e.target.className
        if(!isEndLessThanStart) return
        if(!startValue || !endValue) return

        if(Number(endValue) < Number(startValue)){
            if(currentName.indexOf('startInput') != -1){
                data = this.set(null,{rangeStart:endValue})
                this.setState({data})
                this.props.onFieldChange && this.props.onFieldChange(path,this.oldValue,Map({rangeStart:endValue,rangeEnd:endValue}))
            }else if(currentName.indexOf('endInput') != -1){
                data = this.set(null,{rangeEnd:startValue})
                this.setState({data})
                this.props.onFieldChange && this.props.onFieldChange(path,this.oldValue,Map({rangeStart:startValue,rangeEnd:startValue}))
            }
        }

    }


    getCalendarContainer(){
        return ReactDOM.findDOMNode(this)
        // return document.getElementById(this.get('calendarContainerId'))
    }
    handleEndOpenChange(open){
          let  {data} = this.state
        data = this.set(null,{isEndOpen:open})
        this.setState({data})
    }
    handleStartOpenChange(open){
        if(!open){
            let { data } = this.state
            data = this.set(null,{isEndOpen : true})
            this.setState({data})
        }
    }
    disabledDate(current){
        return current && current.valueOf() < this.get('startDateFirst').valueOf() ||  (this.get('endDate')? current.valueOf() > this.get('endDate').valueOf() : false)
    }
    disabledDateFirst(current){
        return current && current.valueOf() < this.get('startDateFirst').valueOf() ||  (this.get('endDate')? current.valueOf() > this.get('endDate').valueOf() : false)
    }
    getMonthPicker(){
        return(
            <div className={this.get('className')}>
                <MonthPicker
                    value={moment(this.get('rangeStart'), 'YYYY/MM')}
                    style={this.get('style') && this.get('style').toJS()}
                    onChange={::this.onStartChange}
                    getCalendarContainer={::this.getCalendarContainer}
                    onOpenChange={::this.handleStartOpenChange}
                    disabledDate={::this.disabledDateFirst}
                />
                <span style={{padding:'0 5px',color:'#d9d9d9'}}>—</span>
                <MonthPicker
                    value={moment(this.get('rangeEnd'), 'YYYY/MM')}
                    style={this.get('style') && this.get('style').toJS()}
                    onChange={::this.onEndChange}
                    getCalendarContainer={::this.getCalendarContainer }
                    onOpenChange = {::this.handleEndOpenChange}
                    open={this.get('isEndOpen')}
                    disabledDate={::this.disabledDate}
                />
            </div>
        )
    }
    getInput(){
        return(
            <div style={{display:'flex'}} className={this.get('className')}>
                <Input value={this.get('rangeStart')} style={this.get('style') && this.get('style').toJS()} maxLength={this.get('maxLength')} onChange={::this.onInputStartChange} onBlur={::this.onBlur} className='startInput'/>
                <span style={{padding:'0 5px',color:'#d9d9d9'}}>—</span>
                <Input value={this.get('rangeEnd')} style={this.get('style') && this.get('style').toJS()} maxLength={this.get('maxLength')} onChange={::this.onInputEndChange} onBlur={::this.onBlur} className='endInput'/>
            </div>
        )
    }
    getDatePicker(){
        return(
            <div className={this.get('className')}>
                <DatePicker
                    value={this.get('rangeStart') ? moment(this.get('rangeStart'), this.get('format')): this.get('rangeStart')}
                    style={this.get('style') && this.get('style').toJS()}
                    onChange={::this.onStartChange}
                    getCalendarContainer={::this.getCalendarContainer}
                    onOpenChange={::this.handleStartOpenChange}
                    disabledDate={::this.disabledDateFirst}
                    showTime = {false}
                    showToday = {true}
                />
                <span style={{padding:'0 5px',color:'#d9d9d9'}}>—</span>
                <DatePicker
                    value={this.get('rangeEnd') ? moment(this.get('rangeEnd'), this.get('format')) : this.get('rangeEnd')}
                    style={this.get('style') && this.get('style').toJS()}
                    onChange={::this.onEndChange}
                    open={this.get('isEndOpen')}
                    getCalendarContainer={::this.getCalendarContainer}
                    onOpenChange={::this.handleEndOpenChange}
                    disabledDate={::this.disabledDate}
                    showTime = {false}
                    showToday = {false}
                />
            </div>
        )
    }

	render(){
        let componentName = this.get('componentName')
		if(componentName == 'MonthPicker')
            return this.getMonthPicker()
        if(componentName == 'Input')
            return this.getInput()
        if(componentName == 'DatePicker')
            return this.getDatePicker()
	}
}
