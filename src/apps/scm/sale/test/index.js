import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import DynamicComponent from 'dynamicComponent'
import { Modal } from 'dynamicComponent'
import { Popover, Card, Checkbox, Input, Button, ButtonGroup, Table, Column, Cell, Menu, Dropdown, Icon, Select, DropDownDisplay, DropDownSelect } from 'xComponent'
import * as action from './action'
import * as api from './api'
import './style.less'
import { fromJS, List } from 'immutable'
import { AppLoader } from 'appLoader'
const DropdownButton = Dropdown.Button

export default class SaleOrderComponent extends Component {
    static defaultProps = {
        prefixCls: 'common'
    }

    constructor(props) {
        super(props)
        let vtitle = '销售单'
        this.state = {
            voucherTitle: vtitle
        }
    }

    componentDidMount() {
        this.props.initView()
    }

    render() {
        if (this.props._isCurrentTab === false) return null
        if (!this.props.payload || !this.props.payload.get('utils')) return null

        let message = this.props.payload.getIn(['global', 'message']),
            { prefixCls, ...otherProps } = this.props
        return (
            <div>
                <DynamicComponent {...otherProps} _path="voucher.voucherHeader" />
            
                {Modal(message)}
            </div>
        )
    }

}