import React from 'react'
import { Table, Column, Cell } from 'fixed-data-table'
import Checkbox from '../checkbox'
import MyCell from './cell'
import OptionCell from './optionCell'
import OptionHeaderCell from './optionHeaderCell'
import TotalCell from './totalCell'
import DynamicComponent from '../../'
import {Map, List,fromJS} from 'immutable'
import { Checkbox as CB,ZIcon } from 'xComponent'
import CollapseCell from './expandRow/collapseCell'

export function appendColumn(columns, meta, disabled, path, getter, props, index, disableCellFocus) {
	let name = meta.get('name'),
		width = meta.get('width') || 100,
		flexGrow = meta.get('flexGrow'),
		headerComponent = meta.get('headerComponent') || 'ColumnHeaderCell',
		enableSum = meta.get('enableSum') || false,
		isResizable = meta.get('isResizable') || false,
		visible = meta.get('visible') == undefined ? true : meta.get('visible'),
		ext = {}

	if (!visible) {
		return columns
	}

	disabled = disabled || meta.get('disabled')

	path = `${path}.${name}`

	if (flexGrow)
		ext.flexGrow = flexGrow



	columns.push((
		<Column
			columnKey={name}
			key={name}
			isResizable={isResizable}
			width={width}
			{...ext}
			cell={ps => (
				MyCell({
					...props,
					...ps,
					_getter:getter,
					_path:path,
					disabled,
					disableCellFocus,
					style:{ width }
				})
				/*<MyCell
					key={name + props.rowIndex}
					{...props}
					{...ps}
					_getter={getter}
					_path={path}
					disabled={disabled}
					disableCellFocus={disableCellFocus}
					style={{ width }}
				/>*/
			)}

			header={
				<DynamicComponent
					key={index}
					{...props}
					_path={path}
					_component={headerComponent}
				/>
			}
			footer={enableSum ? (
				<TotalCell
					key={name}
					columnKey={name}
					{...props}
					_getter={getter}
					_path={path}
					disabled={disabled}
					style={{ width }}
				/>) : undefined
			}
		/>
	))

	return columns
}

export function insertOptionColumn(columns, gridProps, allowAddrow, allowDelrow) {
	columns.splice(0, 0, (
		<Column
			width={30}
			key="_option"
			fixed={true}
			cell={props => (<OptionCell {...gridProps} {...props} allowAddrow={allowAddrow} allowDelrow={allowDelrow} />)}
			header={
				<OptionHeaderCell {...gridProps} allowAddrow={allowAddrow} allowDelrow={allowDelrow} />
			}
		/>
	))
	return columns
}

export function insertAddColumn(columns, gridProps) {
	let { _path, _getter } = gridProps
	let handleClick = (ps) => () => {
		gridProps.onEvent && gridProps.onEvent('onLinkAddColumn', { path: _path + ',' + ps.rowIndex })
	}
	let getContent = (ps) => {

		return (
			<Cell>
				<a onClick={handleClick(ps)}></a>
			</Cell>
		)
	}
	columns.splice(0, 0, (
		<Column
			key="_addColumn"
			width={42}
			fixed={true}
			cell={props => getContent(props)}
		/>
	))
	return columns
}
export function insertDelColumn(columns, gridProps) {
	let { _path, _getter } = gridProps
	let handleClick = (ps) => () => {
		gridProps.onEvent && gridProps.onEvent('onLinkDelColumn', { path: _path + ',' + ps.rowIndex })
	}
	let getContent = (ps) => {

		return (
			<Cell>
				<a onClick={handleClick(ps)}></a>
			</Cell>
		)
	}
	columns.splice(columns.length, 0, (
		<Column
			key="_delColumn"
			width={42}
			fixed={false}
			cell={props => getContent(props)}
		/>
	))
	return columns
}

export function insertSequenceColumn(columns, gridProps) {
	let { _path, _getter } = gridProps,
		enableSum = _getter(_path, 'enableSum'),
		enableLink = _getter(_path, 'eanbleLinkForSeqColumn'),
		startSequence = _getter(_path, 'startSequence')

	let handleClick = (ps) => () => {
		gridProps.onEvent && gridProps.onEvent('onLinkClick', { path: _path + ',' + ps.rowIndex })
	}



	let getContent = (ps) => {

		let text = startSequence ? (startSequence + ps.rowIndex + 1) + '' : (ps.rowIndex + 1) + ''
		if (enableLink)
			return (
				<Cell>
					<a onClick={handleClick(ps)}>
						{text}
					</a>
				</Cell>
			)
		else
			return (
				<Cell>
					{text}
				</Cell>
			)
	}
	/*
	(
					<Cell>
					  {props.rowIndex + ''}
					</Cell>
					)
	 */
	columns.splice(0, 0, (
		<Column
			key="_sequence"
			width={42}
			fixed={true}
			cell={props => getContent(props)}
			header={
				<Cell>序号</Cell>
			}

			footer={enableSum ? (
				<Cell style={{ fontWeight: 'bold' }}>合计</Cell>) : undefined
			}
		/>
	))
	return columns
}

export function _endOptionColumnCreator(ps){
	let {path,prefixCls,list,columnName,rowIndex,...otherProps} = ps
	if(!list) return {}
	return(
		 <div className='z-fixedcolumn-detail-displaycell'>
                {
                    list.map(o=> {
                        let childPath = `${path}.${columnName}.${o.get('name')}`
						childPath=childPath+','+rowIndex
                        return DynamicComponent({...otherProps, _path:childPath})
                            //<DynamicComponent key={childPath} {...otherProps} _path={childPath} />
                    })
                }
            </div>
	)
}
export function insertSelectColumn(columns, path, children, getter, otherProps) {
	let name = children.get('name'),
		width = children.get('width')

	path = `${path}.${name}`
	let checked = getter(path, 'isSelectAll')
	let handleSelectColumnHeaderChange = (e) => {
		otherProps.onEvent('onGridSelectAll', { path, selected: e.target.checked })
	}

	columns.splice(0, 0, (
		<Column
			key={name}
			columnKey={name}
			isSelectColumn={true}
			width={width}
			fixed={true}
			cell={props => {
				let visible = getter(path + ',' + props.rowIndex, 'visible')

				return visible === false ? null
					: (<Checkbox
						key={name}
						{...otherProps}
						_getter={getter}
						checked={checked}
						_path={`${path},${props.rowIndex}`}
						style={{ width }} />)
			}}
			header={
				<Cell><CB checked={checked} onChange={handleSelectColumnHeaderChange} /></Cell>
			}
		/>
	))
	return columns
}

export function insertCollapseColumn(columns, gridProps,_handleCollapseClick,collapsedRows){
	let { _path, _getter } = gridProps
	let handleClick = (ps) => () => {
		gridProps.onEvent && gridProps.onEvent('onLinkDelColumn', { path: _path + ',' + ps.rowIndex })
	}
	// callback={_handleCollapseClick} 
	let getContent = (ps) => {
		return (
			<CollapseCell gridProps collapsedRows={collapsedRows}>
			</CollapseCell>
		)
	}
	columns.splice(columns.length, 0, (
		<Column
			key="_collapseCol"
			width={0}
			fixed={true}
			cell={props => getContent(props)}
		/>
	))
	return columns
}


export function appendEndOptionColumn(columns, otherProps, endOptionColumnCreator, endOptionColumnTitle, endOptionColumnWidth, endOptionColumnFixed, path,getter,endOptionCaption) {
	let width = endOptionColumnWidth || 100
	endOptionColumnFixed = endOptionColumnFixed === true ? true : false
	let conent={}
	if(typeof(endOptionColumnCreator) =='function'){
		conent=ps => { return endOptionColumnCreator({ ...otherProps, ...ps, gridPath: path }) }
	}
	else{
		conent=ps => { return _endOptionColumnCreator({ ...otherProps, ...ps, path: path,list:endOptionColumnCreator,_getter:getter,columnName:endOptionCaption}) }
	}
	columns.push(
		<Column
			columnKey="endOptionColumn"
			key="endOptionColumn"
			width={width}
			cell={conent}
			header={<Cell>{endOptionColumnTitle}</Cell>}
			fixed={endOptionColumnFixed}
		/>
	)

	return columns
}








/*
cell = {
				<MyCell
					key={index+name }
					{...props} 
					_getter = {getter}
					_path = {path}
					disabled = {disabled}
					style={{width}}
				/>
			}
 */