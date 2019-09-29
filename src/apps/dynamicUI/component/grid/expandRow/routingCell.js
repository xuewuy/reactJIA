import React, { Component } from 'react'
import DroppableCell from './droppableCell'
import NormalCell from './normalCell'

export default class RoutingCell extends Component {
    render() {
        let rowData = this.props.data ? this.props.data[this.props.rowIndex] :[]
        return (
            <div>
                {
                    this.props.columnKey === undefined ?
                    <DroppableCell {...this.props} rowData={rowData} /> :
                    <NormalCell {...this.props} rowData={rowData} />
                }
            </div>
        )
    }
}