import React from 'react'
import ReactDOM from 'react-dom'
import {Map, List} from 'immutable'
import classNames from 'classnames'
import {Table, Column, Cell,ColumnGroup} from 'fixed-data-table-2'
import { Checkbox, Popover, Button,ZIcon,Select,Row, Col } from 'xComponent'
import {appendColumn, insertOptionColumn, insertAddColumn, insertDelColumn, insertSequenceColumn, insertCollapseColumn,insertSelectColumn, appendEndOptionColumn} from '../column'


// import * as api from '../../../../acm/createRichardTicket/api'
import DynamicComponent from 'dynamicComponent'


export default class GridComponent extends React.Component{
	static defaultProps = {
        prefixCls: 'z-grid55'
    }

	state = {
  		data : Map({
  			path:'',
  			value:undefined,
  			className:'',
  			rowHeight:32,
  			headerHeight:32,
  			groupHeaderHeight: 32,
  			disabled:false,
  			enableSum: false,
  			enableSequenceColumn:true,
  			allowAddrow:false,
  			allowDelrow:false,
			allowAddColumn: false,
			allowDelColumn: false,
            allowExpandRow:false,
            collapsedRows: new Set(),
  			style: {},
  		})
  	}

	constructor(props){
		super(props)
		this.state = this.calculateState(this.props)
        this.columns = []
        

        //this._handleCollapseClick = this._handleCollapseClick.bind(this);
        this._subRowHeightGetter = this._subRowHeightGetter.bind(this);
        this._rowExpandedGetter = this._rowExpandedGetter.bind(this);
		//this.onResize = this.onResize.bind(this)
        //this.update = this.update.bind(this)
    }
    

    _handleCollapseClick(rowIndex) {
		let collapsedRows = this.state.data.get('collapsedRows')

		let scrollToRow = rowIndex
		if (collapsedRows.has(rowIndex)) {
			collapsedRows.delete(rowIndex)
			scrollToRow = null
		} else {
			collapsedRows.add(rowIndex)
        }
        

        this.setState({
            data: this.set(null, {
                scrollToRow: scrollToRow,
                collapsedRows: collapsedRows
            })
        })
	}

	_subRowHeightGetter(index) {
		let rowObj =this.get(`value.${index}.detail`),
			rowHeight =this.get('rowHeight') + 15
		if(rowObj){
			let currentRowIndex = rowObj.size
			rowHeight =currentRowIndex * (this.get('rowHeight') + 15)
			/*
			if(currentRowIndex>2) {
				rowHeight = currentRowIndex * this.get('rowHeight') + 40
			}
			else if(currentRowIndex>1) {
				rowHeight = currentRowIndex * this.get('rowHeight') + 25
			}
			else{
				rowHeight =currentRowIndex * this.get('rowHeight') + 15
			}*/
		}
		console.log(rowHeight)
		
		return this.state.data.get('collapsedRows').has(index) ? this.get('rowHeight') : rowHeight
	}

	_rowExpandedGetter({ rowIndex, width, height }) {
		// if (!this.state.data.get('collapsedRows').has(rowIndex)) {
		// 	return null
		// }

		if(this.props.rowIndex !=rowIndex){
			this.props.rowIndex =rowIndex
		}
		let {...otherProps } = this.props
		return (
			<div>
				<Row>
					<Col className={'col1'} style={{width:'30px'}}></Col>
					<Col className={'col1'} style={{width:'72px'}}></Col>
					<Col className={'col1'} style={{width:'142px'}}></Col>
					<Col ><div style={{'padding-left':'95px'}}><DynamicComponent {...otherProps}  _path='root.detail' /></div></Col>
				</Row>
				
			</div>
		)
	}

	componentDidMount() {

    }

    componentWillUnmount(){

    }

	componentWillReceiveProps(nextProps){
    	this.setState(this.calculateState(nextProps))
    }

    shouldComponentUpdate(nextProps, nextState){
    	return true
	}
	
	calculateState(props){
		let {data} = this.state,
			{ _path, _getter, style, className } = props,
			pValues = _getter(_path,['value', 'rowHeight', 'headerHeight', 'disabled', 'enableSum','enableSequenceColumn',
				'allowAddrow','allowDelrow', 'allowAddColumn', 'allowDelColumn', 'allowExpandRow','footerHeight', 'disableCellFocus', 'enableMouseMoveEvent']),
			value = pValues.get('value') || List(),
			rowHeight = pValues.get('rowHeight') || 32,
			headerHeight = pValues.get('headerHeight') || (pValues.get('headerHeight') === 0 ? 0 : 32),  //如果特意设置为0, 则保持值为0
			disabled = pValues.get('disabled') || false,
			enableSum = pValues.get('enableSum') || false,
			enableSequenceColumn = pValues.get('enableSequenceColumn') === undefined ?  true : pValues.get('enableSequenceColumn'),
			allowAddrow = pValues.get('allowAddrow') || false,
			allowDelrow = pValues.get('allowDelrow') || false,
			allowAddColumn = pValues.get('allowAddColumn') || false,
			allowDelColumn = pValues.get('allowDelColumn') || false,
			allowExpandRow = pValues.get('allowExpandRow') || false,
			disableCellFocus = pValues.get('disableCellFocus') === undefined ? false: pValues.get('disableCellFocus'),
			footerHeight = pValues.get('footerHeight') || (enableSum ? 32 : 0),    //a || b ? c : d 的默认结合优先级是  (a||b) ? c : d  ,而不是 a || (b?c:d)
			enableMouseMoveEvent = pValues.get('enableMouseMoveEvent') || false

            let scrollOffsetHeight = (value.size - (this.get('value') ?this.get('value').size:0)) * rowHeight
            scrollOffsetHeight = scrollOffsetHeight > 0 ?0 :scrollOffsetHeight
            let scrollLeft = 0,
                scrollTop = this.get('scrollTop') || 0

            scrollTop += scrollOffsetHeight

            scrollTop = scrollTop <0? 0:scrollTop

		data = this.set(null,{path: _path, value,
			rowHeight, headerHeight,
			disabled, enableSum,enableSequenceColumn,
			allowAddrow, allowDelrow, allowAddColumn,
            allowDelColumn,allowExpandRow, className, style, footerHeight,
            disableCellFocus, enableMouseMoveEvent, scrollTop, scrollLeft })

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



	getColumns(){
		if(this.columns.length > 0) return this.columns
		let { _path, _getter, prefixCls, style, className,
			endOptionColumnCreator, endOptionColumnTitle,
			endOptionColumnWidth,endOptionColumnFixed, ...otherProps } = this.props,

		   childrens = _getter(_path, 'childrens'),
		   disabled = this.get('disabled'),
		   disableCellFocus = this.get('disableCellFocus'),
		   columns = [],endOptionCaption=''

		childrens.forEach((children,index) =>{
			if(children.get('isSelectColumn')) return
			if(children.get('isFixed')) {
				//debugger
				endOptionColumnCreator=children.get('childrens')
				endOptionColumnTitle=children.get('title')
				endOptionColumnWidth=children.get('width')
				endOptionColumnFixed=children.get('isFixed')
				endOptionCaption=children.get('name')
				//_path=_path + '.' + children.get('name')

				return
			}
			//columns = insertSelectColumn(columns, _path, children, _getter, otherProps)
			//else{
				let visible = _getter(_path + '.' + children.get('name'),'visible')
				visible = visible == undefined ? true : visible
				if(visible)
					columns = appendColumn(columns, children, disabled,  _path, _getter, otherProps, index, disableCellFocus)
			//}
		})
		if(!disabled && (this.get('allowAddrow') || this.get('allowDelrow')))
			columns = insertOptionColumn(columns, this.props, this.get('allowAddrow'), this.get('allowDelrow'))

		// if(endOptionColumn){
		// 	endOptionColumnCreator=endOptionColumn.get('endOptionColumnCreator')
		// 	endOptionColumnTitle=endOptionColumn.get('endOptionColumnTitle')
		// 	endOptionColumnWidth=endOptionColumn.get('endOptionColumnWidth')
		// 	endOptionColumnFixed=endOptionColumn.get('endOptionColumnFixed')
		// }
        
        if(this.get('allowExpandRow')){			
            let { collapsedRows } = this.state.data.get('collapsedRows')
            columns = insertCollapseColumn(columns,this.props,null,collapsedRows)           

		}
        if(endOptionColumnCreator){
			//console.log(_path)
			columns = appendEndOptionColumn(columns, otherProps, endOptionColumnCreator, endOptionColumnTitle, endOptionColumnWidth,endOptionColumnFixed, _path,_getter,endOptionCaption)
        }
        

		if(this.get('enableSequenceColumn'))
			columns = insertSequenceColumn(columns, this.props)

		if(this.get('allowAddColumn'))
			columns = insertAddColumn(columns, this.props)

		if(this.get('allowDelColumn'))
			columns = insertDelColumn(columns, this.props)

		

		childrens.forEach((children,index) =>{
			if(children.get('isSelectColumn'))
				columns = insertSelectColumn(columns, _path, children, _getter, otherProps)
		})

		return columns
	}

	handleRowDoubleClick(e, rowIndex){
		if(this.get('disabled'))
			this.props.onEvent('rowDoubleClick', rowIndex)
			//this.props.onEvent('rowDoubleClick',  this.get('value').get(rowIndex))
	}

	handleRowClick(e, rowIndex){
		this.props.onEvent('fixedGirdRowClick', rowIndex)		
	}

	handleRowMouseEnter(e, rowIndex){
		if(!this.get('disabled') && this.get('enableMouseMoveEvent')) {
			this.props.onEvent('rowMouseEnter',  {path: this.get('path'), rowIndex: rowIndex, value: this.get('value').get(rowIndex)})
		}
	}

	handleRowMouseLeave(e, rowIndex){
		//目前没有用到mouseLeave, 暂不上抛
		// if(!this.get('disabled') && this.get('enableMouseMoveEvent')){
		// 	this.props.onEvent('rowMouseLeave',  {path: this.get('path'), rowIndex: rowIndex, value: this.get('value').get(rowIndex)})
		// }
	}

	handleScrollEnd(x, y) {
        this.setState( {data: this.set(null,{scrollLeft:x, scrollTop:y})} )
		this.props.onEvent('onScrollEnd',  {path: this.get('path'), x, y})
	}

	render(){
		let className = classNames({
			 [this.props.prefixCls]: true,
			 [this.props.className]: !!this.get('className'),
             'fixed-table-hasSumLine': !!this.get('enableSum')
		})
		let width = this.props.style.width || 0,
			height = this.props.style.height || 0
		//if(width > 0 || height === 0) height=500
		if(width === 0 || height === 0) return null

        let scrollToRow = parseInt(this.get('scrollTop') / this.get('rowHeight')) + 1
		/*
		let dom = ReactDOM.findDOMNode(this)
        if(dom){
            dom.style.width = width + 'px'
            dom.style.height = height + 'px'
        }*/
		let isScrollToTop = this.get('value').size * this.get('rowHeight') + this.get('headerHeight') <= height
		return (
			<Table
				key = {this.props._path}
				className={this.props.prefixCls}
				rowsCount={this.get('value').size}
				rowHeight={this.get('rowHeight')}
				groupHeaderHeight={this.get('groupHeaderHeight')}
				headerHeight={this.get('headerHeight')}
				footerHeight={this.get('footerHeight')}
    			width={width}
    			height={height}
				onRowDoubleClick={this.get('disabled')?this.handleRowDoubleClick.bind(this):undefined}
				onRowClick={this.handleRowClick.bind(this)}
				onRowMouseEnter={this.get('disabled') ? undefined : this.handleRowMouseEnter.bind(this)}
				onRowMouseLeave={this.get('disabled') ? undefined : this.handleRowMouseLeave.bind(this)}
                onScrollEnd={this.handleScrollEnd.bind(this)}
                subRowHeightGetter={this._subRowHeightGetter}
                rowExpanded={this._rowExpandedGetter}
				_path = {this.props._path}
				_getter = {this.props._getter}
				_mustRender = {this.props._mustRender}
                //scrollToRow = {scrollToRow}
				style={{width, height}}>
    			{::this.getColumns()}
			 </Table>
		)
	}
}
