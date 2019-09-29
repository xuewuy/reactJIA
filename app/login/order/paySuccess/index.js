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
        let {clearMessage, setMessage,initData} = this.props,
			{isSpOrder} = initData
        clearTimeout(window.openMyOrder)
		let url = isSpOrder? 'apps/login/admin':'apps/login/admin?activeKey=12'
        window.openMyOrder = setTimeout(()=>{clearMessage(),fun(url,true)}, 3000)
    }

    backMyOrder() {
		debugger
        let  getterByField = this.props.payload.getIn(['utils', 'getterByField']),
			{isSpOrder} = this.props.initData
        // this.props.removeAllTab()
        clearTimeout(window.openMyOrder)
		let url = isSpOrder?'apps/login/admin' : 'apps/login/admin?activeKey=12'
        this.props.initData.onRedirect(url,true)
    }




	render(){
		if (this.props._isCurrentTab === false) return null //加上这句话
        if (!this.props.payload || !this.props.payload.get('utils'))
            return null
        let message = this.props.payload.getIn(['global', 'message']),
            {prefixCls} = this.props,
            getterByField = this.props.payload.getIn(['utils', 'getterByField']),
			{isSpOrder} = this.props.initData
			console.log(isSpOrder?'我的服务商':'我的订单',isSpOrder)
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
                <p>3秒后返回<a href='javascript:;' onClick={::this.backMyOrder}>
				{
					isSpOrder?
					'我的服务商':
					'我的订单'
				}

				</a></p>
                {Modal(message)}
			</div>
		)
	}
}
