import React from 'react'
import ReactDOM from 'react-dom'
import DynamicComponent from 'dynamicComponent'
import { Icon, Button } from 'xComponent'

export default class MatrixProEmptyRowComponent extends React.Component {
    static defaultProps = {
        prefixCls: 'z-matrixeditor-emptyrow'
    }

    handleAddRow() {
        this.props.onAddRow && this.props.onAddRow({ path: this.props._path, rowIndex: this.props.rowIndex })
    }

    render() {
        let { _path, _getter, prefixCls } = this.props

        return (
            <span className={`${prefixCls}-function-a`}>
                <a onClick={:: this.handleAddRow}>
                    <Icon type='plus' title='新增' />
                </a>
            </span>
        )
    }
}
