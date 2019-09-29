/**
 * Create by shenxy on 16/10/12.
 */

import React, { Component, PropTypes } from 'react'
import DynamicComponent, { Modal } from 'dynamicComponent'
import { Menu, Dropdown, Button } from 'xComponent'
import './editOrg.less'

export default class editOrgComponent extends Component {
    static defaultProps = {
        prefixCls: 'editOrg'
    }

    componentDidMount() {
        this.props.initView(this.props.initData)
    }

    shouldComponentUpdate(nextProps) {
        return !this.props.payload || this.props.payload !== nextProps.payload
    }
    getComponentInstances(){
        let getterByField = this.props.payload.getIn(['utils', 'getterByField']),
            currOrgCount = getterByField('currOrgCount')
        if(currOrgCount <= 3){
            return {
                orgCount: <span>该服务商剩余账套数为{currOrgCount}</span>
            }
        }else{
            return {
                orgCount: <span></span>
            }
        }
    }

    render() {
        if (!this.props.payload || !this.props.payload.get('utils')) {
            return null
        }

        let message = this.props.payload.getIn(['global', 'message']),
            {prefixCls, ...otherProps} = this.props,
            getterByField = this.props.payload.getIn(['utils', 'getterByField']),
            createTime = getterByField('form.createTime'),
            creatorName = getterByField('form.creatorName'),
            creatorMobile = getterByField('form.creatorMobile')
        return (
            <div className={this.props.prefixCls}>
                <div className={`${prefixCls}-body-title`}>
                    <span><span style={{width:'72px',display:'inline-block',textAlign:'right'}}>创建时间：</span>{createTime}</span>
                    <span>管理员：{creatorName}</span>
                    <span>电话：{creatorMobile}</span>
                </div>
                {this.props.initData.isDz ? <div style={{marginBottom:'10px'}}>
                    <span style={{width:'75px'}}>申请账套数：{this.props.initData.client.requiredOrgCount}</span>
                </div> : null}
                <div className={`${prefixCls}-body`}>
                    <DynamicComponent {...otherProps} componentInstances={this.getComponentInstances()} _path="editOrg"/>
                </div>
                {Modal(message)}
            </div>
        )
    }
}