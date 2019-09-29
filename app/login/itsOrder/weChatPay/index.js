import React, { Component,PropTypes } from 'react'

import DynamicComponent, {Modal} from 'dynamicComponent'
import {Button,Input,Card,Dropdown,Menu,ButtonGroup} from 'xComponent'
import defaultComponentFactory from 'defaultComponentFactory'
import qrcode from './qrcode'
import './weChatPay.less';
export default class weChatPayComponent extends React.Component {
	static defaultProps = {
        prefixCls: 'weChatPay'
    }
	componentDidMount(){
		
		this.getQrCode()
		this.props.initView(this.props.initData)     	
	}

	shouldComponentUpdate(nextProps){
      return !this.props.payload  || this.props.payload !== nextProps.payload
  	}
  	getQrCode(){
        var qr2 = new qrcode(document.getElementById('qrCode'),{
          width: 179,
          height: 179,

        })
		var shareUrl = this.props.initData.url,
		  appInfo = this.props.initData.appInfo,
		  index = shareUrl.indexOf('?')
		if(index != -1){
		  shareUrl = appInfo ? `${shareUrl}&appId=${appInfo.id}` : shareUrl
		}else{
		  shareUrl = appInfo ? `${shareUrl}?appId=${appInfo.id}` : shareUrl
		}
		qr2.makeCode(shareUrl)

	        //qr2.makeCode(this.props.initData.url)

  	}

	handleResetWxCode(){
		this.getQrCode()
		this.props.initView(this.props.initData)		
	}
   
	render(){
		if (this.props._isCurrentTab === false) return null //加上这句话
        // if (!this.props.payload || !this.props.payload.get('utils'))
        //     return null
        let message = this.props.payload.getIn(['global', 'message']),
            {prefixCls} = this.props,
            getterByField = this.props.payload.getIn(['utils', 'getterByField']),
            shouldPrice = this.props.initData.shouldPrice.split('.')[0],
            currentStep,scanning,sumOwing,qrCode
        if(getterByField) {
            currentStep = getterByField('currentStep')
        }
        scanning = currentStep == -1 ? '':<p>请使用微信扫描下方二维码，进行支付</p>
        sumOwing = currentStep == -1 ? <div>二维码已失效<span onClick={::this.handleResetWxCode}>重新获取二维码</span></div>:<div>应付金额：<span>￥{shouldPrice}</span></div>
		qrCode =  currentStep == -1 ? <div><div id="qrCode" className="qrCodeNone"></div><img className={`WeChatQrCode`} src={require("./img/WeChatQrCode.png")} alt=""/></div>:<div id="qrCode"></div> 
        return(
        	<div className={`weChatPay-order`}>
        		{sumOwing}
        		{scanning}
              	{qrCode}
        	</div>
        )
		
	}
}
 