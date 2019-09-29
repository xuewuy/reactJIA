'user strict'
import React from 'react'
import ReactDOM from 'react-dom'
import {Map, List, fromJS} from 'immutable'
import {Select, Button}  from 'xComponent'


export default class SelectComponent extends React.Component {
  	state = {
  		data : Map({
        path: '',
        value:'',
        isFocus: false,
        dataSourceFetchMode: 0, //0:只从元数据取，1:只获取一次，2：每次焦点进入都获取 默认0
        dataSource:[],
        displayMember:'',
        valueMember:'',
        combobox:false,
		showSearch:false,
		placeholder:'',
        style:{},
        numberOnly: false,
        interceptTab: false,
        isCooling : true,
        regex: '',
        multiple: false,
        dropdownMatchSelectWidth: true,
        dropdownStyle: {},
		showArrow: true,
		isChange: false
  		})
  	}

	constructor(props){
		super(props)
		this.state = this.calculateState(this.props)
		this.lazyLoadDataSource = this.lazyLoadDataSource.bind(this)
		this.click = this.click.bind(this)
	}

	componentWillReceiveProps(nextProps){
    	this.setState(this.calculateState(nextProps))
    }

	componentDidMount() {
		if(this.get('isFocus') && this.props._isGridCell){
			let domNode = ReactDOM.findDOMNode(this.refs.internal).getElementsByTagName('input')[0]
			if (domNode) {
//				domNode.focus()
                setTimeout(() => {domNode.click()}, 0)
				// domNode.value = ''
				// domNode.value = this.get('value')

				if (this.get('autoSelect')) {
					setTimeout(() => {domNode.select()}, 0)
				}
			}
		}

		// if (this.get('textAlign') && this.props._isGridCell) {
		// 	let domNode = ReactDOM.findDOMNode(this.refs.internal).getElementsByTagName('input')[0]
		// 	domNode.setStyle({textAlign: this.get('textAlign')})
		// } 
	}

    shouldComponentUpdate(nextProps, nextState){
    	return !this.state.data.equals(nextState.data)
    }

	calculateState(props){
		let {data} = this.state,
			{ _path, _getter, _isFocus, style, className } = props,
			pValues = _getter(_path, ['value', 'isFocus','disabled', 'dataSourceFetchMode',
										'displayMember', 'valueMember',  'combobox', 'showSearch',
										'width', 'tags', 'minWidth', 'numberOnly', 'dropdownFooterName', 'extClassName',
										'defaultActiveFirstOption', 'autoSelect', 'enableHideDropdownByClick', 'precision',
										'getPopupContainer', 'interceptTab', 'allowClear', 'regex', 'filterOptionExpressions',
                    'multiple', 'dropdownMatchSelectWidth', 'dropdownStyle', 'showArrow','placeholder','isChange','maxRowLength']),
			value = pValues.get('value') || '',
			isFocus =  _isFocus || pValues.get('isFocus') || false,
			dataSourceFetchMode = pValues.get('dataSourceFetchMode') || 0,
			dataSource = _getter(_path, 'dataSource'),
			displayMember = pValues.get( 'displayMember') || 'EEEEEEE',
      		valueMember = pValues.get( 'valueMember') || '',
      		combobox = pValues.get('combobox') === undefined ? false : pValues.get('combobox'),
      		showSearch = pValues.get('showSearch') === undefined ? false : pValues.get('showSearch'),
			width = pValues.get('width'),
			tags = pValues.get('tags'),
			disabled =pValues.get( 'disabled') || false,
			placeholder = pValues.get('placeholder') ||　'',
			minWidth = pValues.get('minWidth'),
			numberOnly = pValues.get('numberOnly'),
      		regex = pValues.get('regex'),
			dropdownFooterName = pValues.get('dropdownFooterName'),
			extClassName = pValues.get('extClassName'),
			defaultActiveFirstOption = !(pValues.get('defaultActiveFirstOption') == false),
			autoSelect = pValues.get('autoSelect'),
			enableHideDropdownByClick = !!pValues.get('enableHideDropdownByClick'),
			precision = pValues.get('precision'),
			getPopupContainer = pValues.get('getPopupContainer') || 'app',
			interceptTab = pValues.get('interceptTab') === true,
			allowClear =  pValues.get('allowClear') === undefined ? false : pValues.get('allowClear'),
			filterOptionExpressions = pValues.get('filterOptionExpressions'),
            multiple = pValues.get('multiple') || false,
            dropdownMatchSelectWidth = pValues.get('dropdownMatchSelectWidth') === undefined ? true : pValues.get('dropdownMatchSelectWidth'),
            dropdownStyle = pValues.get('dropdownStyle') || '',
            showArrow = pValues.get('showArrow'),
            isChange=pValues.get('isChange') || false,
            maxRowLength = pValues.get('maxRowLength') || props.maxRowLength || 300
	  
		this.oldValue = value
		if(!style){
			if (width) {
				style = {width}
			}
			else if (minWidth) {
				style = {minWidth}
			}
    	}

    	if(this.props._isGridCell)
    		style={}

		data = this.set(null, {path:_path, value, isFocus,
			dataSourceFetchMode,  displayMember,
			valueMember,  combobox, showSearch, style, tags,
			disabled, numberOnly, regex, dropdownFooterName, extClassName, defaultActiveFirstOption,
			autoSelect, enableHideDropdownByClick, precision,getPopupContainer, interceptTab, allowClear,
			filterOptionExpressions,multiple, dropdownMatchSelectWidth, dropdownStyle, showArrow,placeholder,
			isChange, maxRowLength})
		if (dataSourceFetchMode === 2 && (!dataSource || dataSource.size == 0)) {
			dataSource = this.state.data.get('dataSource')
		}
        data = data.set('dataSource', List.isList(dataSource) ? dataSource : fromJS(dataSource))
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
			if (data.get('tags') || data.get('multiple')) {
				return data.merge(value)
			}
			else {
				return data.mergeDeep(value)
			}
		}
		if(typeof value === 'object' && !List.isList(value)){
			if (data.get('tags') || data.get('multiple')) {
				return data.merge(propertyName.split('.'), value)
			}
			else {
				return data.mergeDeepIn(propertyName.split('.'), value)
			}
		}

		else{
			return data.setIn(propertyName.split('.'), value)
		}
	}
	lazyLoadDataSource(){
		let dataSourceFetchMode = this.get('dataSourceFetchMode')

		if(dataSourceFetchMode === 0) return

		if(dataSourceFetchMode === 1 && this.get('dataSource') && this.get('dataSource').size > 0)
			return

		//this.setState({data:this.set('dataSource', undefined)})
		this.props.getterByAjax(this.get('path'), 'dataSource', (data)=>{
			this.setState({data:this.set('dataSource', data)})
		})
		//this.props.lazyLoad(this.get('path'), 'dataSource', {fetchMode:dataSourceFetchMode})
	}


	getOptions(){
        let dataSource = this.get('dataSource')
        
		if (this.get('tags') || this.get('multiple')) {
			// return dataSource ? dataSource.map((item, index)=>
			// 	<Option key={this.getValue(item)}>
			// 		{this.getDisplayText(item)}
			// 	</Option>) :
			// 	[]

			let productChildren = []
			if (dataSource) {
				dataSource.forEach(item => {
					productChildren.push(<Option key={this.getValue(item)} 	title = {this.getDisplayText(item)} data={item}><span title={this.getDisplayText(item)}>{this.getDisplayText(item)}</span></Option>)
				})
            }
            
			return productChildren
		}
		else {
			//此处Option的data属性,用于自定义过滤
			let maxRowLength = this.get('maxRowLength') 
			if(dataSource && dataSource.size > maxRowLength){
				let filterInput = this.get('filterInput') 
				if(filterInput ){  
					//onsearch
					let filterFun = this.filterOption() 
					dataSource = dataSource.filter((item, index)=>{
						let option = {
							props:{
								key:index,
								value : this.getValue(item),
								title:this.getDisplayText(item),
								data:item
							}
						}
						return filterFun(filterInput, option)
					})
					dataSource = dataSource.slice(0,50)
				}else{ 
					let startIndex = 0 
					let valueItem = this.get('value')
					if(valueItem){
						let value = this.getValue(valueItem)
						startIndex = dataSource.findIndex((item)=> value == this.getValue(item))
						if(startIndex ==-1) startIndex = 0 
					}
                    let endIndex = startIndex + maxRowLength,
                        subjectSelect = document.querySelector('.select-with-button .ant-select-dropdown .ant-select-dropdown-menu')

                    console.dir(subjectSelect)
                     
                    if (startIndex > 100){
                        if (dataSource.size - 1 - startIndex > maxRowLength){//当前选中项之后数据超出最大条数
                            dataSource = dataSource.slice(startIndex - 3, endIndex - 3)
                            subjectSelect.scrollTop = 0 //下拉框滚动条回到顶部
                        }else{//少于最大条数永远倒数取最大条数的数量
                            dataSource = dataSource.slice(-(maxRowLength-1), -1)
                        }
                        
                    }
				} 
            }
            
			return dataSource ? dataSource.map((item, index)=>
				<Option
				key={index}
				value={this.getValue(item)}
				title = {this.getDisplayText(item)}
				data={item}>
					<span title={this.getDisplayText(item)}>
						{this.getDisplayText(item)}
					</span>
				</Option>):[]

		}
	}

	findItem(input, dataSource){
		return dataSource.find(x=>( this.getValue(x) === input || this.getDisplayText(x) === input))
	}

	handleChange(e){
		let value = e,
			oldValue = this.oldValue,
			path = this.get('path'),
			dataSource = this.get('dataSource')

		if(this.get('combobox')){
			if(!this.props.onFieldChange)
	        	return

		    if( (!!this.oldValue !== !!value) ||
		    	this.getValue(this.oldValue) !== this.getValue(value) ){

			    	if(typeof(value) === 'string'){
			    		let v = this.findItem(value, this.get('dataSource'))
			    		if(v)
			    			value = v
			    	}
              //放弃使用setTimeout，原因：IE11下在combobox的Select组件中快速输入1212时，始终无法录入2，只录入了11
		        	//setTimeout( ()=>this.props.onFieldChange(path, oldValue, value), 0)
		        	this.props.onFieldChange(path, oldValue, value)
	        }
		}
		else if (this.get('tags') || this.get('multiple')) {
			if(!this.props.onFieldChange)
				return

			setTimeout( ()=>this.props.onFieldChange(path, oldValue, value), 0)
		}
		else {
			value = this.findItem(value, dataSource)
		    if(!this.props.onFieldChange)
	        	return

		    if( (!!this.oldValue !== !!value) ||
		    	this.getValue(this.oldValue) !== this.getValue(value) )
	        	setTimeout( ()=>this.props.onFieldChange(path, oldValue, value), 0)
    	}

	}

	onShortcutKey(e) {
		if (this.props.onShortcutKey) {
			this.props.onShortcutKey(e)
		}
		else if (this.props.onEvent) {
			setTimeout( ()=>this.props.onEvent('onShortcutKey', {path: this.props._path, keyEvent: e}))
		}
	}

	onEndEdit() {
		if (this.props.onEndEdit) {
			this.props.onEndEdit()
		}
		else if (this.props.onEvent) {
			setTimeout( ()=>this.props.onEvent('onEndEdit', {path: this.props._path}))
		}
	}

	handleSearch(e) { 
		console.log('handleSearch():filterInput='+this.filterInput)  
		
		this.setState({data:this.set('filterInput', e)})
        setTimeout( ()=>this.props.onEvent('onSearch', {path: this.props._path, value: e}))
	}

	onSelect() {
		if (this.props.onEndEdit) {
			this.props.onEndEdit()
		}
		else if (this.props.onEvent) {
			setTimeout( ()=>this.props.onEvent('onEndEdit', {path: this.props._path}))
		}
	}

	handleFocus(e){
		if(this.get('isCooling') === false){
    		return
	    }

		this.setState({data:this.set('isCooling', false)})

		this.lazyLoadDataSource()
		if(!this.get('isFocus'))
			this.props.onFieldFocus(this.get('path'))
		if (this.props.onFocus) {
			this.props.onFocus(e)
		}

	    let that = this
	    setTimeout(()=>{
	    	this.setState({data:this.set('isCooling', true)})
	    }, 1000)
	}

	handleBlur(e) {
		if (this.props.onBlur) {
			this.props.onBlur(e)
		}
		else if (this.props.onEvent) {
			setTimeout( ()=>this.props.onEvent('onBlur', {path: this.props._path}))
		}
	}

	getValue(obj){
		let value = obj
		if( typeof (value) === 'string' || typeof (value) === 'number')
			return value
		if(this.get('valueMember')){
			if(!value) return ''
			value = value.get(this.get('valueMember'))
			if(value===0){
				value=value.toString()//解决下拉为0无法选中的问题
			}
			/*
			if(typeof(value) !='undefined'){
				value=value.toString()
			}*/
		}
		return value
	}

	getDisplayText(obj){
		let text = obj
		if( typeof (text) === 'string' || typeof (text) === 'number')
			return text
		if(this.get('displayMember')){
			if(!text) return ''
			text = text.get(this.get('displayMember'))
			if(!text) return ''
		}
		return text
	}

    handleDropdownFooterClick(e) {
        if (this.props.onEvent) {
            setTimeout( ()=>this.props.onEvent('onDropdownFooterClick', {path: this.props._path, click:this.click}))
        }
    }

    click(){
		let domNode = ReactDOM.findDOMNode(this.refs.internal).getElementsByTagName('input')[0]
		if (domNode) {
            setTimeout(() => {domNode.click()}, 0)
		}
    }


    getDropdownFooter(){
        if (this.get('dropdownFooterName')) {
            return <Button type='primary' onClick={::this.handleDropdownFooterClick} style={{width: '100%', position: 'inherit', borderRadius: '0px'}}>{this.get('dropdownFooterName')}</Button>
        }

        return null
    }
    getPopupContainer(){
    	if(typeof this.get('getPopupContainer') == 'string'){
    		return document.getElementById(this.get('getPopupContainer'))
    	}else{
    		return ReactDOM.findDOMNode(this)
    	}
    }

	filterOption() {
		if (this.props.filterOption) {
			return this.props.filterOption
		}

		let filterOptionExpressions = this.get('filterOptionExpressions')

		if(filterOptionExpressions){
			let filterFields = filterOptionExpressions.split(',') 
			return (input, option)=>{
				for(let f of filterFields){
					let tmp = option.props.data.get(f) 
					if (tmp && tmp.toLowerCase().indexOf(input.toLowerCase()) != -1 )  
						return true  
				}
				return false
			}
		}
        else
            return ()=> true   //手动onSearch的时候受到影响的解决方案

		return undefined
	}

	render(){
		let dataSource = this.get('dataSource'),
			//value = (dataSource && 		.size > 0)? this.getValue(this.get('value')): this.getDisplayText(this.get('value')),
			ext = {}, value,
			className = this.get('extClassName')
		if(!!this.get('isChange')) {
			if(className) {

				className+= ' change-input'
			} else {
				className = 'change-input'
			}
		}

		if(!dataSource || dataSource.size == 0)
			value = this.getDisplayText(this.get('value'))
		else{
			value = this.getValue(this.get('value'))
		}

		if(dataSource && dataSource.size> 0 && dataSource.findIndex(o=> this.getValue(o) == value ) == -1){
			value = this.getDisplayText(this.get('value'))
		}

		if(this.get('combobox'))
			ext.combobox = true
		else if (this.get('showSearch'))
			ext.showSearch = true
		if(this.props._isGridCell)
			ext.style={width: '100%'}
		ext.tags = this.get('tags') || false
    	ext.multiple = this.get('multiple') || false
		if (ext.tags || ext.multiple) {
			value = []
			if (this.get('value') && (typeof this.get('value') == 'object')) {
				this.get('value').forEach(v => {
					value.push(v)
				})
			}
		}

		//若下拉框有内容并且元数据设置allowClear为true则显示删除图标，否则不显示
		let allowClear = false
		if(!!value && this.get('allowClear') == true){
			allowClear = true
		}else{
			allowClear = false
		}

		return (
			<div onFocus={::this.handleFocus} onBlur={::this.handleBlur}>
	            <Select
                  className={className}
                  ref='internal'
                  value={value}
                  style={this.get('style') && this.get('style').toJS()}
                  disabled={this.get('disabled')}
                  {...ext}
                  onChange={::this.handleChange}
                  onSearch={::this.handleSearch}
                  numberOnly={this.get('numberOnly')}
                  regex={this.get('regex')}
                  precision={this.get('precision')}
                  onEndEdit={::this.onEndEdit}
                  onSelect={::this.onSelect}
                  onShortcutKey={::this.onShortcutKey}
                  defaultActiveFirstOption={this.get('defaultActiveFirstOption')}
                  dropdownFooter={::this.getDropdownFooter()}
                  enableHideDropdownByClick={::this.get('enableHideDropdownByClick')}
                  filterOption={::this.filterOption()}
                  getPopupContainer={::this.getPopupContainer}
                  notFoundContent = '无可选下拉项'
                  interceptTab = {this.get('interceptTab')}
                  allowClear = {allowClear}
				  optionLabelProp={'title'}
				  placeholder={this.get('placeholder')}
                  dropdownMatchSelectWidth={this.get('dropdownMatchSelectWidth')}
                  dropdownStyle={this.get('dropdownStyle') && this.get('dropdownStyle').toJS()}
                  showArrow = {this.get('showArrow')}
	            	>
	            		{::this.getOptions()}
	        	</Select>
        	</div>
		)
	}
}
