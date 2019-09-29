import React, {Component} from 'react'
import {Cell} from 'fixed-data-table-2'

export default class CollapseCell extends Component {
    render() {
        const {
            data,
            rowIndex,
            columnKey,
            collapsedRows,
            callback,
            ...props
        } = this.props
        return (
            <div>
                <Cell {...props}>
                    <a onClick={() => callback(rowIndex)}>
                        {collapsedRows && collapsedRows.has(rowIndex)
                            ? '\u25BC'
                            : '\u25BA'}
                    </a>
                </Cell>
            </div>
        )
    }
}