/**
 * created by shenxy 2016/9/14
 */
import React from 'react'
import { Map, List, is } from 'immutable'
import DynamicComponent from '../../'
import Checkbox from '../checkbox'
import { Checkbox as CB } from 'xComponent'
import classNames from 'classnames'
import Table from 'rc-table/dist/rc-table'
import 'rc-table/dist/rc-table.css'
// import { Table } from 'antd'
//const Table = require('rc-table/dist/rc-table');
//require('rc-table/dist/rc-table.css');
//require('rc-table/assets/bordered.css');

export default class AntGridComponent extends React.Component {
    static defaultProps = {
        prefixCls: 'z-ant-grid'
    }

    state = {
        data: Map({
            path: '',
            value: undefined,
            className: '',
            rowHeight: 30,
            headerHeight: 30,
            groupHeaderHeight: 30,
            disabled: false,
            enableSum: false,
            enableSequenceColumn: true,
            style: {}
        })
    }

    constructor(props) {
        super(props)
        this.state = this.calculateState(this.props)
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this.calculateState(nextProps))
    }

    calculateState(props) {
        let {data} = this.state,
            {_path, _getter, style, className} = props,
            pValues = _getter(_path, ['value', 'rowHeight', 'headerHeight', 'disabled', 'useFixedHeader', 'hideHeader', 'rowKey', 'height', 'width', 'useValueGetter', 'rowClassName', 'selected', 'enableSum', 'disableCellFocus','textAlign','isAllChecked']),
            value = pValues.get('value') || List(),
            rowHeight = pValues.get('rowHeight') || 'auto',
            headerHeight = pValues.get('headerHeight') || 30,
            disabled = pValues.get('disabled') || false,
            useFixedHeader = pValues.get('useFixedHeader') || false,
            hideHeader = pValues.get('hideHeader') || false,
            width = pValues.get('width'),
            height = pValues.get('height'),
            isAllChecked = pValues.get('isAllChecked'),
            rowClassName = pValues.get('rowClassName'),
            useValueGetter = pValues.get('useValueGetter') === undefined ? true: pValues.get('useValueGetter'),
            disableCellFocus = pValues.get('disableCellFocus') === undefined ? false: pValues.get('disableCellFocus'),
            selected = pValues.get('selected'),
            rowKey = pValues.get('rowKey'),   //需要一个主键字段
            enableSum = pValues.get('enableSum') || false,
            textAlign = pValues.get('textAlign')||'left'

        data = this.set(null, {
            path: _path, value,
            rowHeight, headerHeight,
            disabled, className, style,
            useFixedHeader, hideHeader, rowKey,
            width, height, useValueGetter, rowClassName,
            selected, enableSum, disableCellFocus,textAlign,isAllChecked
        })

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
        if (typeof value === 'object') {
            return data.mergeIn(propertyName.split('.'), value)
        }
        else {
            return data.setIn(propertyName.split('.'), value)
        }
    }

    getData() {
        let data = this.get('value').toJS()

        if (this.get('rowKey')) {
            return data
        }
        //如果没有指定rowKey,并且没有key字段,则使用index填充到key字段里
        for (let i = 0; i < data.length; i++) {
            let item = data[i]
            if (!item || item.key) {
                continue
            }

            item.key = i
        }

        return data
    }

    handleFieldFocus() {
        return (cellPath) => {
            if(this.get('disableCellFocus') !== true){
                let data = this.set('focusPath', cellPath)
                this.setState({data})
                setTimeout( ()=>this.props.onFieldFocus(cellPath), 0)
            }
        }
    }

    onRowDoubleClick(e) {
        //TODO
        console.log('onRowDoubleClick')
    }

    onRowClick(e) {
        setTimeout( ()=>{
            this.props.onEvent && this.props.onEvent('onRowClick', {path: this.props._path, event: e})
        }, 0)
    }

    // 回调方法参数没有给index,只有record,没法自动计算一个key值, 所以暂时去掉了
    // rowKeyFun(record) {
    //     if (!record) {
    //         return ''
    //     }
    //
    //     if (record instanceof List || record instanceof Map) {
    //         return record.hashCode()
    //     }
    //
    //     if (typeof record === "object") {
    //         if (record.key) {
    //             return record.key
    //         }
    //         if (record.id) {
    //             return record.id
    //         }
    //         if (record.index) {
    //             return record.index
    //         }
    //     }
    //
    //     return record
    // }

    render() {
        let scrollStyle = {x: (this.get('width') || false), y: (this.get('height') || false)},
            {prefixCls, ...otherProps} = this.props,
            rowKey = this.get('rowKey')// || this.rowKeyFun  //填写字段名,或者一个回调方法

        let isSelected = this.get('selected')
        let className = classNames({
            'bordered': true,
            'rr-rc-table-selected': isSelected,
            'rr-rc-table-unselected': !isSelected,
            'rc-table-hasSumLine': !!this.get('enableSum')
        })

        return (
            <Table
                onRowClick={::this.onRowClick}
                onRowDoubleClick={::this.onRowDoubleClick}
                columns={::this.getColumns()}
                data={::this.getData()}
                showHeader={!this.get('hideHeader')}
                rowClassName={(record, i) => this.get('rowClassName')}
                scroll={scrollStyle}
                // bodyStyle={{ display: 'solid' }}
                footer={::this.getSumTable()}
                className={className}
                emptyText={()=>{return ''}}
                rowKey={rowKey}
                {...otherProps} />
        )
    }

    getColumns() {
        let { _path, _getter, prefixCls, style, className, ...otherProps } = this.props,
            children = _getter(_path, 'childrens'),
            columns = []

        if (!children || children.size == 0) {
            return []
        }

        for (let i = 0; i < children.size; i++) {
            let child = children.get(i)
            let column = this.getColumnByMeta(_path, child)
            if(column)
                columns.push(column)
        }

        this.oldColumns = columns
        this.oldChildren = children

        return columns
    }


/*

    getColumns() {
        let { _path, _getter, prefixCls, style, className, ...otherProps } = this.props,
            children = _getter(_path, 'childrens'),
            columns = []

        if (!children) {
            return []
        }

        //如果meta配置不变,表示columns对象不会发生变化,使用缓存提高性能
        //Immutable.is替换深度遍历,提高比较效率(本质为hashcode比较)
        //2016-11-22 考虑到titleComponent数据刷新，这里去掉
        // if (is(this.oldChildren, children) && this.oldColumns) {
        //     return this.oldColumns
        // }

        for (let i = 0; i < children.size; i++) {
            let child = children.get(i)
            if (child.get('visible') === false)
            {
                continue
            }

            if (child.get('columnGroup')) {
                let subChildren = child.get('childrens')
                let subColumns = []
                if (subChildren && subChildren.size > 0) {
                    for (let subchild of subChildren) {
                        if (subchild.get('visible') === false)
                        {
                            continue
                        }
                        // let columnPath = _path + '.' + child.get('name') + '.' + subchild.get('name')
                        let index = _path.split(',')[1],
                            columnMetaPath = _path.split(',')[0] + '.' + child.get('name') + '.' + subchild.get('name'),
                            columnCellPath = _path.split(',')[0] + '.' + child.get('name')+ '.' + subchild.get('name') + (index ? (',' + index) : '')
                        subColumns.push(this.getColumnItem(columnMetaPath, columnCellPath))
                    }
                }
                columns.push({
                    title: child.get('titleComponent') ?
                    <DynamicComponent _component={child.get('titleComponent')} {...this.props}/> : child.get('title'),
                    children: subColumns,
                    // render: ::this.renderContent
                })
            }
            else if (child.get('isSelectColumn')) {
                let index = _path.split(',')[1],
                    columnMetaPath = _path.split(',')[0] + '.' + child.get('name'),
                    columnCellPath = _path.split(',')[0] + '.' + child.get('name') + (index ? (',' + index) : '')
                columns.push(this.getSelectColumnItem(columnMetaPath, columnCellPath))
            }
            else {
                let index = _path.split(',')[1],
                    columnMetaPath = _path.split(',')[0] + '.' + child.get('name'),
                    columnCellPath = _path.split(',')[0] + '.' + child.get('name') + (index ? (',' + index) : '')
                columns.push(this.getColumnItem(columnMetaPath, columnCellPath))
            }
        }

        this.oldColumns = columns
        this.oldChildren = children
        return columns
    }*/

    getColumnByMeta(parentPath, meta){
        let index = parentPath.split(',')[1],
            metaPath = parentPath.split(',')[0] + '.' + meta.get('name'),
            cellPath = parentPath.split(',')[0] + '.' + meta.get('name') + (index ? (',' + index) : '')

        let { _getter } = this.props,
            columnGroup = meta.get('columnGroup'),
            visible = meta.get('visible'),
            pValues = _getter(cellPath, ['bindField', 'titleComponent', 'width', 'title', 'colClassName', 'enableSum']),
            bindField = pValues.get('bindField'),
            titleComponent = pValues.get('titleComponent'),
            title = pValues.get('title'),
            width = pValues.get('width'),
            colClassName = pValues.get('colClassName'),
            enableSum = pValues.get('enableSum'),
            ret = {}

        if(visible === false)
            return undefined

        if(meta.get('isSelectColumn')){
            let checked = this.props.getter(cellPath, 'isSelectAll') || this.get('isAllChecked')
            let handleSelectColumnHeaderChange = (e)=> {
                this.props.onEvent('onGridSelectAll', {cellPath, selected: e.target.checked})
            }

            ret.title = <CB checked={checked} onChange={handleSelectColumnHeaderChange}/>
            ret.className = colClassName

            if (width) {
                ret.width = width
            }
            ret.render = ::this.renderSelectComponent(metaPath, cellPath)
        }
        else if(columnGroup){
            ret.title = titleComponent ?
                    ( <DynamicComponent _component={titleComponent} {...this.props} /> ):
                    title

            let children = meta.get('childrens')
            if (children && children.size > 0) {
                for (let sub of children) {
                    let o = this.getColumnByMeta(cellPath, sub)
                    if(!o) continue

                    if(!ret.children)
                        ret.children = []
                    ret.children.push(o)
                }
            }
        }
        else{
            let bindFieldName = bindField.split('.').pop()
            ret.title = titleComponent ? (<DynamicComponent _component={titleComponent} {...this.props}/> ): <div title = {title}>{title}</div>
            ret.dataIndex = bindFieldName
            ret.key = bindFieldName
            ret.className = colClassName
            ret.enableSum = enableSum

            if (width) {
                ret.width = width
            }
            ret.render = this.renderComponent(metaPath, cellPath)
        }
        return ret
    }

    getColumnItem(metaPath, cellPath) {
        let { _getter } = this.props,
            bindField = _getter(cellPath,'bindField'),
            titleComponent = _getter(cellPath,'titleComponent'),
            title = _getter(cellPath,'title'),
            width = _getter(cellPath,'width'),
            colClassName = _getter(cellPath,'colClassName'),
            enableSum = _getter(cellPath,'enableSum')

        let bindFieldName = bindField.split('.').pop(),
            column = {
                title: titleComponent ? <DynamicComponent _component={titleComponent} {...this.props}/> : <div title = {title}>{title}</div>,
                dataIndex: bindFieldName,
                key: bindFieldName,
                className: colClassName,
                enableSum: enableSum
            }

        if (width) {
            column.width = width
        }
        column.render = this.renderComponent(metaPath, cellPath)

        return column
    }

    getSelectColumnItem(metaPath, cellPath) {
        let { _getter } = this.props,
            width = _getter(cellPath,'width'),
            colClassName = _getter(cellPath,'colClassName')

        let checked = this.props.getter(cellPath, 'isSelectAll'),
            handleSelectColumnHeaderChange = (e)=> {
                this.props.onEvent('onGridSelectAll', {cellPath, selected: e.target.checked})
            }

        let column = {
                title: <CB checked={checked} onChange={handleSelectColumnHeaderChange}/>,
                className: colClassName
            }

        if (width) {
            column.width = width
        }
        column.render = ::this.renderSelectComponent(metaPath, cellPath)

        return column
    }

    getSumTable() {
        if (!this.get('enableSum')) {
            return undefined
        }

        return (currentData) =>{

            return <table className="rr-rc-table-footer">
                    <colgroup>
                        {
                            ::this.getWidthCols(this.oldColumns)//使用已经计算好的columns缓存)
                        }
                    </colgroup>
                <thead className="rc-table-thead">
                <tr>
                    {
                        ::this.getSumCols(currentData, this.oldColumns)
                    }
                </tr>
                </thead>
            </table>
        }
    }

    getWidthCols(columns) {
        let cols = []

        for (let item of columns) {
            if (!item.children) {
                cols.push(<col style={{width: item.width, minWidth: item.width}}/>)
            }
            else {
                cols = cols.concat(::this.getWidthCols(item.children))
            }
        }

        return cols
    }

    //计算列的合计
    getSumCols(currentData, columns) {
        let cols = []
        if (!currentData || currentData.length <= 0 || !columns || columns.length <= 0) {
            return <th></th>
        }

        for (let item of columns) {
            if (!item) {
                cols.push(<th></th>)
                continue
            }

            if (!item.children && (!item.key || !item.enableSum)) {
                cols.push(<th></th>)
                continue
            }

            if (!item.children) {
                cols.push(<th>{::this.getSingleColSum(currentData, item)}</th>)
            }
            else {
                cols = cols.concat(::this.getSumCols(currentData, item.children))
            }
        }

        return cols
    }

    getSingleColSum(currentData, item) {
        let sum = 0
        for (let i = 0; i < currentData.length; i++) {
            let dataItem = currentData[i][item.key]
            if (dataItem && !isNaN(dataItem)) {
                sum += parseFloat(dataItem)
            }
        }

        return sum
    }

    renderEdit(path, style){
        return (
            <DynamicComponent
                {...this.props}
                _path = {path}
                _isFocus={true}
                _isGridCell={true}
            />
        )
    }

    renderDispaly(path, displayComponent, style, value) {
        let _isFocus = (displayComponent == 'Input' || displayComponent == 'InputNumber')

        return (
            <DynamicComponent
                {...this.props}
                _path = {path}
                style = {style}
                _component={displayComponent}
                _value = {value}
                _isFocus = {_isFocus}
                onFieldFocus = {::this.handleFieldFocus(path)}
            />
        )
    }

    renderComponent(metaPath, pCellPath) {
        let isDisableCellFocus = this.get('disableCellFocus'),
            colDisplayComponent = this.props._getter(pCellPath, 'displayComponent') || 'DisplayCell',
            colDisabled = this.props._getter(pCellPath, 'disabled'),
            useValueGetter = this.get('useValueGetter'),
            rowHeight = this.get('rowHeight'),
            textAlign = this.get('textAlign')

        return (value, row, index) => {
            const obj = {
                children: value,
                props: {},
            };

            let cellPath = `${pCellPath},${index}`,
                isFocus = isDisableCellFocus ? false : (this.get('focusPath') == cellPath),
                displayComponent = (this.props._getter(cellPath, 'displayComponent') || 'DisplayCell'),
                // useValueGetter = isDisableCellFocus ? colUseValueGetter : this.get('useValueGetter'),
                disabled = isDisableCellFocus ? colDisabled : this.props._getter(cellPath, 'disabled') //这个方法可以获取当前cell的属性(可动态设置),而不是该列在meta里的描述

            obj.props = this.checkMerge(metaPath, index)

            let style = undefined
            if (rowHeight && !isNaN(rowHeight)) {
                style = { height: rowHeight + 'px', lineHeight: rowHeight + 'px' ,textAlign:textAlign}
            }

            if (disabled) {
                if( useValueGetter )
                    obj.children = this.renderDispaly(cellPath, displayComponent, style)
                else
                    obj.children = this.renderDispaly(cellPath, displayComponent, style, value)
            }
            else if (isFocus) {
                obj.children = this.renderEdit(cellPath, style)
            }
            else {
                if( useValueGetter )
                    obj.children = this.renderDispaly(cellPath, displayComponent, style)
                else
                    obj.children = this.renderDispaly(cellPath, displayComponent, style, value)
            }

            return obj
        }
    }

    renderSelectComponent(metaPath, pCellPath) {
        let { _getter } = this.props,
            title = _getter(pCellPath,'title')

        return (value, row, index) => {
            const obj = {
                children: value,
                props: {},
            };

            let cellPath = `${pCellPath},${index}`

            obj.props = this.checkMerge(metaPath, index)

            let style = undefined,
                rowHeight = this.get('rowHeight')
            if (rowHeight && !isNaN(rowHeight)) {
                style = { height: rowHeight + 'px', lineHeight: rowHeight + 'px' }
            }

            // if (meta.get('width')) {
            //     style.width = meta.get('width')
            // }

            obj.children = <Checkbox
                key={title}
                {...this.props}
                _getter = {this.props._getter}
                _path = {cellPath}
                style={style} />

            return obj
        }
    }

    checkMerge(path, rowIndex) {
        let {_path, _getter} = this.props,
            mergeCells = _getter(_path, 'mergeCells')

        if (!mergeCells || mergeCells.size == 0) {
            return {}
        }

        let children = _getter(_path, 'childrens'),
            fieldName = path.split('.').pop(),
            mergeProps = {}

        if (!children || children.size == 0) {
            return {}
        }

        //先确定列数
        let colIndex = -1,
            tmpIndex = 0
        for (let child of children) {
            if (child.get('name') == fieldName) {
                colIndex = tmpIndex
                break
            }

            if (child.get('columnGroup')) {
                let subChildren = child.get('childrens')
                for (let subChild of subChildren) {
                    if (subChild.get('name') == fieldName) {
                        colIndex = tmpIndex
                        break
                    }

                    tmpIndex++
                }

                if (colIndex > -1) {
                    break
                }
            }
            else {
                tmpIndex++
            }
        }

        if (colIndex < 0) {
            return {}
        }

        //遍历每个合并配置项
        for (let mergeItem of mergeCells) {
            if (!mergeItem || !mergeItem.get('row') || mergeItem.get('row').size == 0 || !mergeItem.get('col') || mergeItem.get('col').size == 0) {
                continue
            }

            //如果只是合并一列中的项
            if (mergeItem.get('col').size == 1 && colIndex == mergeItem.get('col').get(0)) {
                if (rowIndex == mergeItem.get('row').get(0)) {
                    mergeProps.rowSpan = mergeItem.get('row').get(1) - mergeItem.get('row').get(0) + 1
                    break
                }
                else if (rowIndex > mergeItem.get('row').get(0) && rowIndex <= mergeItem.get('row').get(1)) {
                    mergeProps.rowSpan = 0
                    break
                }
            }

            //如果只是合并一行中的项
            if (mergeItem.get('row').size == 1 && rowIndex == mergeItem.get('row').get(0)) {
                if (colIndex == mergeItem.get('col').get(0)) {
                    mergeProps.colSpan = mergeItem.get('col').get(1) - mergeItem.get('col').get(0) + 1
                    break
                }
                else if (colIndex > mergeItem.get('col').get(0) && colIndex <= mergeItem.get('col').get(1)) {
                    mergeProps.colSpan = 0
                    break
                }
            }

            //多行多列合并,关注最左上角cell
            if (colIndex == mergeItem.get('col').get(0) && rowIndex == mergeItem.get('row').get(0)) {
                mergeProps.rowSpan = mergeItem.get('row').get(1) - mergeItem.get('row').get(0) + 1
                mergeProps.colSpan = mergeItem.get('col').get(1) - mergeItem.get('col').get(0) + 1
                break
            }
            else if (rowIndex >= mergeItem.get('row').get(0) && rowIndex <= mergeItem.get('row').get(1)
                    && colIndex >= mergeItem.get('col').get(0) && colIndex <= mergeItem.get('col').get(1)) {
                mergeProps.rowSpan = 0
                mergeProps.colSpan = 0
                break
            }

        }

        return mergeProps
    }

}
