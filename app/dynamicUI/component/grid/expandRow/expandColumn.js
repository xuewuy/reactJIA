import React, { Component } from 'react'
import { Table, Column, Cell } from 'fixed-data-table'
import RoutingCell from './routingCell'


export function insertExpandColumn(columns, gridProps) {
	columns.splice(0, 0, (
		<Column
			width={25}
			key="_expand"
			fixed={true}
			cell={props => (<RoutingCell {...gridProps} {...props} />)}
			header={''}
		/>
	))
	return columns
}

/*
export default class ExpandRow extends Component {
    render() {
        let width = this.props.width,
            height = this.props.height,
            data = this.props.data
        return (
            <Table
                rowHeight={50}
                rowsCount={data.length}
                width={width}
                height={height}
                headerHeight={50}
            >
                {this.createColumns()}
            </Table>
        )
    }

    createColumns() {
        let width = this.props.width,
            data = this.props.data,
            columnCount = 5
        var columns = [
            <Column
                key={0}
                columnKey={0}
                header={''}
                cell={<RoutingCell data={data} />}
                width={25}
            />
        ];
        for (let i = 1; i < 5; i++) {
            columns.push(
                <Column
                    key={i}
                    columnKey={i}
                    header={'Column ' + i}
                    cell={<RoutingCell data={data} />}
                    width={width / columnCount}
                />
            )
        }

        return columns
    }
}
*/