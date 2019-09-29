import React, { Component, PropTypes } from 'react'
import DynamicComponent, { Modal } from 'dynamicComponent'
import { Menu, Dropdown, Button } from 'xComponent'
import './contarctSiging.less'

export default class contarctSigingComponent extends Component {
    static defaultProps = {
        prefixCls: 'contarctSiging'
    }

    componentDidMount() {
        this.props.initView(this.props.initData)
    }

    shouldComponentUpdate(nextProps) {
        return !this.props.payload || this.props.payload !== nextProps.payload
    }

    render() {
        if (!this.props.payload || !this.props.payload.get('utils')) {
            return null
        }

        let message = this.props.payload.getIn(['global', 'message']),
            {prefixCls, ...otherProps} = this.props,
            getterByField = this.props.payload.getIn(['utils', 'getterByField'])
        return (
            <div className={this.props.prefixCls}>
                <div className={`${prefixCls}-body`}>
                    {<DynamicComponent {...otherProps} _path="contarctSiging"/>}
                </div>
                {Modal(message)}
            </div>
        )
    }
}