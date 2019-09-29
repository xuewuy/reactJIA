import React, { Component } from 'react'
import { Table, Column, Cell } from 'fixed-data-table'

export default class NormalCell extends Component {
    render() {
        let cellName = this.props.data.type === 'expanded' ? 'Expanded' : 'Cell'
        return (
            <Cell {...this.props}>{cellName} {this.props.data}</Cell>
        )
    }
}