import React from 'react'
import classNames from 'classnames'
import {Map} from 'immutable'
import {Table, Column, Cell} from 'fixed-data-table'
import {Button,Checkbox, Icon, Popover,Select, Radio, CheckboxGroupFilter, InputFilter, RangePickerFilter} from 'xComponent'
import DynamicComponent from '../../'

const autoAdjustOverflow = {
  adjustX: 1,
  adjustY: 1,
};

const targetOffset = [0, 0];

export const placements = {
  left: {
    points: ['cr', 'cl'],
    overflow: autoAdjustOverflow,
    offset: [-4, 0],
    targetOffset,
  },
  right: {
    points: ['cl', 'cr'],
    overflow: autoAdjustOverflow,
    offset: [4, 0],
    targetOffset,
  },
  top: {
    points: ['bc', 'tc'],
    overflow: autoAdjustOverflow,
    offset: [0, -4],
    targetOffset,
  },
  bottom: {
    points: ['tc', 'bc'],
    overflow: autoAdjustOverflow,
    offset: [0, 4],
    targetOffset,
  },
  topLeft: {
    points: ['bl', 'tl'],
    overflow: autoAdjustOverflow,
    offset: [0, -4],
    targetOffset,
  },
  leftTop: {
    points: ['tr', 'tl'],
    overflow: autoAdjustOverflow,
    offset: [-4, 0],
    targetOffset,
  },
  topRight: {
    points: ['br', 'tr'],
    overflow: autoAdjustOverflow,
    offset: [0, -4],
    targetOffset,
  },
  rightTop: {
    points: ['tl', 'tr'],
    overflow: autoAdjustOverflow,
    offset: [4, 0],
    targetOffset,
  },
  bottomRight: {
    points: ['tr', 'br'],
    overflow: autoAdjustOverflow,
    offset: [-4, 0],
    targetOffset,
  },
  rightBottom: {
    points: ['bl', 'br'],
    overflow: autoAdjustOverflow,
    offset: [4, 0],
    targetOffset,
  },
  bottomLeft: {
    points: ['tl', 'bl'],
    overflow: autoAdjustOverflow,
    offset: [0, 4],
    targetOffset,
  },
  leftBottom: {
    points: ['br', 'bl'],
    overflow: autoAdjustOverflow,
    offset: [-4, 0],
    targetOffset,
  },
}

export default class ColumnHeaderCellComponent extends React.Component {
	state = {
  		data : Map({
  			path:'',
  			title:'',
  			required:false,
  			popoverVisible: false,
  			filter:undefined,
  			filterValue:undefined
  		})
  	}

	constructor(props){
		super(props)
		this.state = this.calculateState(this.props)
		this.handleFilterOk = this.handleFilterOk.bind(this)
		this.handleFilterReset = this.handleFilterReset.bind(this)
	}

	componentWillReceiveProps(nextProps){
    	this.setState(this.calculateState(nextProps))
    }

    shouldComponentUpdate(nextProps, nextState){
    	return this.state.data !== nextState.data
    }

	calculateState(props){
		let {data} = this.state,
			{ _path, _getter, style, className } = props,
			values = _getter(_path, ['title','required', 'filter', 'subtitles','headerShowCheck','isChecked','disabled']),
			title = values.get('title'),
			required = values.get('required') || false,
			filter = values.get('filter'),
			filterValue,
            key,
			subtitles = values.get('subtitles'),
			headerShowCheck = values.get('headerShowCheck'),
			isChecked = values.get('isChecked') || false,
			disabled = values.get('disabled') || false


		if(filter){
			let valuePath = filter.get('valuePath'),
				getterByField = this.props.payload.getIn(['utils','getterByField'])
			
			filterValue = getterByField(valuePath)
            key = filter.get('key')
		}
			

		data = this.set(null,{path:_path, title, required, filter, filterValue, subtitles,headerShowCheck, isChecked, disabled, key})
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
		let cls = classNames({
			 'ant-form-item-required':this.get('required')
		})
		return (
			<Cell>
				<label className={cls}>{this.get('title')}</label>
				{this.renderFilter()}
				{this.renderHeadCheckBox()}
				{::this.renderSubTitle()}
			</Cell>
		)
	}

	renderSubTitle() {
		let subtitles = this.get('subtitles'),
			path = this.get('path')
		if(!subtitles || subtitles.size == 0) return null

		return <DynamicComponent
			{...this.props}
			_path={path}
			_component={subtitles}
			// onFieldFocus={::this.handleFieldFocus}
		/>
	}
	getHeaderSelectOption(dataSource){
		return dataSource ? dataSource.map((item, index)=>
            <Option value={item.get('id')}>
                {item.get('name')}
            </Option>) :
            []
	}
	renderFilter(){
		let filter = this.get('filter')
		if(!filter ) return null
		let type = filter.get('type'),
			value = this.get('filterValue'),
            style = filter.get('style') ? filter.get('style').toJS() : {},
            title = filter.get('title') || '',
            className = filter.get('className'),
			content,
            placement = filter.get('placement') || 'bottomRight',
			iconStyle = {marginLeft:4,cursor:'pointer', fontSize:'small', fontWeight: 'normal',paddingTop:2}

		/*
		if(value){
			if(value.size != undefined){
				if(value.size > 0 ){
					if(type != 'rangePicker'){
						iconStyle.color="#57c5f7"
					}
					else{
						if(value.get(0))
							iconStyle.color="#57c5f7"
					}
				}
			}
			else{
				iconStyle.color="#57c5f7"
			}
			
		}*/

		if(type==='input'){
			content = 
				<InputFilter 
					onOk={::this.handleFilterOk}
					onReset={::this.handleFilterReset}
					onClose={::this.handleFilterClose}
					value={value}
				>
				</InputFilter>
		}
		else if(type === 'checkbox'){
			let dataSource = filter.get('dataSource')
			if(!dataSource) throw "checkbox filter 必须设置dataSource"

			content = <div className={className}>
				<CheckboxGroupFilter
					onOk={::this.handleFilterOk}
					onReset={::this.handleFilterReset}
					onClose={::this.handleFilterClose}
					value={value}
					dataSource = {dataSource}
				>
				</CheckboxGroupFilter></div>
		}
		else if(type === 'rangePicker'){
			content = 
				<RangePickerFilter 
					onOk={::this.handleFilterOk}
					onReset={::this.handleFilterReset}
					onClose={::this.handleFilterClose}
					value={value}>
				</RangePickerFilter>
		}else if( type === 'radio'){
            return (
                <Radio onChange={::this.handleFilterChange} checked={value}>{title}</Radio>
            )
        }else if(type === 'select'){
			let dataSource = filter.get('dataSource')
			if(!dataSource) throw "checkbox filter 必须设置dataSource"

			content = <div className={className}>
				<Select 
					onChange={::this.handleFilterOk}
					value={value}>
					{
						::this.getHeaderSelectOption(dataSource)
					}
				</Select></div>
		}

		if(!content) return null
		let dataSource = filter.get('dataSource'),
			selectValue = filter.get('selectValue')
		if(!dataSource) throw "checkbox filter 必须设置dataSource"
		return type === 'select'?<div className={'headerSelect '+className}>
				<Select 
					onChange={::this.handleFilterOk}
					value={selectValue}>
					{
						::this.getHeaderSelectOption(dataSource)
					}
				</Select></div>:
			<Popover 
				visible={this.get('popoverVisible')}
				content={content} 
				trigger="click" 
				placement={placement} 
				builtinPlacements={placements}
				overlayClassName="gridFilterOpenClass"
				onVisibleChange={::this.handlePopoverVisibleChange}
                overlayStyle={style}
                >
				<Icon type='filter'  style={iconStyle}/>
			</Popover>
		
	}
	
	renderHeadCheckBox(){
		let headerShowCheck = this.get('headerShowCheck'),
			isChecked = this.get('isChecked'),
			disabled = this.get('disabled')
		let handleAllSelectChange = (e) => {
			this.props.onEvent && this.props.onEvent('handleAllSelectChange', { path: this.props._path ,value:e.target.checked})
		}
		return (
			<div style={{display: headerShowCheck ? "block" : "none"}}>
				{
					headerShowCheck?(<Checkbox checked={isChecked} disabled={disabled} onChange={handleAllSelectChange} value={'审核'}></Checkbox>):''
				}
			</div>
		
		)
	}


	handleFilterOk(value){
		let data = this.set(null, {'popoverVisible':false, filterValue:value})
		this.setState({data:data})
		setTimeout(()=>{
			let path = this.get('path')
			this.props.onEvent('onGridFilterChange', {path, value})
		},0)
		
	}
	
	handleFilterReset(){
		let data = this.set(null, {'popoverVisible':false, filterValue:undefined})

		this.setState({data:data})
		let path = this.get('path')

		setTimeout(()=>{
			let path = this.get('path')
			this.props.onEvent('onGridFilterChange', {path, undefined})
		},0)
	}

	handleFilterClose(){
		let data = this.set(null, {'popoverVisible':false})
		this.setState({data:data})
	}

	handlePopoverVisibleChange(visible){
      	this.setState({data:this.set('popoverVisible',visible)})
    }

    handleFilterChange(e){
        let data = this.set(null, {filterValue:!this.get('filterValue')})
        this.setState({data:data})
        let path = this.get('path'),
            This = this,
            filterValue = !this.get('filterValue'),
            oldValue = this.get('filterValue'),
            key = this.get('key')
        setTimeout(()=>{
            This.props.onEvent('onFilterRadioChange', {path, checked:filterValue,key:key})
        },0)
    }

}
