import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import {Button,Popover,ZIcon } from 'xComponent'

export default class popMessageComponent extends Component {
    componentDidMount() {
    }
    render() {
        let {prefixCls} = this.props,
            utils = this.props.payload.get('utils'),
            getterByField = utils.get('getterByField'),
            popMessage = getterByField('popMessage'),
            currentMessage = getterByField('currentMessage'),
            msgType = currentMessage && currentMessage.get('msgType'),
            currMessageIndex = getterByField('currMessageIndex')
            /*
             * msgType: 6\7
             * 6:试用期延长至30天的消息
             * 7:获得红包的消息
             */
        if(currMessageIndex == popMessage.size){
            return null
        }
        return (
            <div className={`${prefixCls}-popMessage`}>
                {msgType && msgType == 6 ? this.getProbation() : this.getRedEnvelope()}
            </div>
        )
    }
    handleCloseClick(){
        this.props.nextPopMessage()
    }

    handleRedEnvelope(){
        this.props.redEnvelope()
    }

    /**
     * [getProbation 试用期延长至30天的消息]
     * @return {[type]} [description]
     */
    getProbation(){
        let {prefixCls} = this.props,
            utils = this.props.payload.get('utils'),
            getterByField = utils.get('getterByField'),
            currentMessage = getterByField('currentMessage'),
            msgText = currentMessage.get('msgText')
        return (
            <div className={`${prefixCls}-probation`}>
                <img src={require('../img/img-xingxing.png')}/>
                <h3>恭喜您</h3>
                <ZIcon icon='modal-error' onClick={::this.handleCloseClick} />
                <p>{msgText}</p>
                <Button onClick={::this.handleCloseClick}>知道了</Button>
            </div>
        )
    }

    /**
     * [getRedEnvelope 获得红包的消息]
     * @return {[type]} [description]
     */
    getRedEnvelope(){
        let {prefixCls} = this.props,
            utils = this.props.payload.get('utils'),
            getterByField = utils.get('getterByField'),
            currentMessage = getterByField('currentMessage'),
            msgText = currentMessage.get('msgText')
        return (
            <div className={`${prefixCls}-redEnvelope`}>
                <ZIcon icon='modal-error' onClick={::this.handleCloseClick} />
                <p>{msgText}</p>
                <Button onClick={::this.handleRedEnvelope}>立即使用</Button>
            </div>
        )
    }


}

