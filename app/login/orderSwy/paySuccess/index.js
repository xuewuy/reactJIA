import React, { Component,PropTypes } from 'react'

import DynamicComponent, {Modal} from 'dynamicComponent'
import {Button,Input,Card,Dropdown,Menu,ButtonGroup,ZIcon} from 'xComponent'
import defaultComponentFactory from 'defaultComponentFactory'
import './paySuccess.less';
export default class paySuccessComponent extends React.Component {
	static defaultProps = {
        prefixCls: 'paySuccess'
    }
	componentDidMount(){
		this.props.initView(this.props.initData)
        this.openPage(this.props.initData.onRedirect,this.props.initData.clearMessage)
	}

    openPage(fun,clear) {
        let {clearMessage, setMessage} = this.props
        clearTimeout(window.openMyOrder)
        window.openMyOrder = setTimeout(()=>{clearMessage(),fun('apps/login/admin?activeKey=1202',true)}, 3000)
    }

    backMyOrder() {
        // this.props.removeAllTab()
        clearTimeout(window.openMyOrder)        
        this.props.initData.onRedirect('apps/login/admin?activeKey=1202',true)
    }

	
   

	render(){
		if (this.props._isCurrentTab === false) return null //加上这句话
        if (!this.props.payload || !this.props.payload.get('utils'))
            return null
        let message = this.props.payload.getIn(['global', 'message']),
            {prefixCls} = this.props,
            getterByField = this.props.payload.getIn(['utils', 'getterByField'])


		return(
			
			<div className={`${prefixCls}-content`}>	
                <div>
                	<ZIcon
                    icon='modal-success'
                    colorStyle='mint'
                    title=''
                    />
                 	订单支付成功
                 </div>
                <p>3秒后返回<a href='javascript:;' onClick={::this.backMyOrder}>我的订单</a></p>     					                   
                {Modal(message)}
			</div>
		)
	}
}
 