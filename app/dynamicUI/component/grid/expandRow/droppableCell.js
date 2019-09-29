import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Table, Column, Cell} from 'fixed-data-table'

export default class DroppableCell extends Component {
    render() {
        if (this.props.data.type === 'expanded') return null

        let myData = this.props.data

        let toggleRow = () => {
            //myData[this.props.rowData.key].expanded = !myData[this.props.rowData.key].expanded            
        }

        
        let dropdown = this.props.data.dropdown? '▼': '►'
        return (
            <div>
                <Cell {...this.props} onClick={toggleRow.bind(this)}>
                    {dropdown}
                </Cell>         
            </div>
        )
    }


}