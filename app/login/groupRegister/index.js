import React,{ Component,PropTypes } from 'react'
import DynamicComponent, {FormItem,onRedirect} from 'dynamicComponent'
import { HCFLayout, Button, Steps, CountDownButton, Alert, ZIcon, Radio, Popover} from 'xComponent'
import styles from "./clientRegister.less"
import constant from 'constant'
const RadioGroup = Radio.Group

const content = (
<div>
	<p>没有邀请码，请<a>联系客服</a></p>
</div>
)
export default class RegisterComponent extends React.Component {
	static defaultProps = {
      	prefixCls: 'clientRegister',
  	}

  	constructor(props){
  		super(props)
  	}

  	componentDidMount() {
  		this.props.initView(this.props.isDevelop,this)
  	}
  	shouldComponentUpdate(nextProps){
        return !this.props.payload  || this.props.payload !== nextProps.payload
    }
  	handleLClick(){
  		this.props.login(data =>{
			// entrance 1代表我的易嘉人          2代表企业
			if(data.result){
				let { payload } = this.props,
					getterByField = payload.getIn(['utils', 'getterByField']),
					form = getterByField('form')
				if (data.entrance == 1) {
					this.props.onLoginSuccess('apps/login/admin', true)
				} else {
					this.props.onLoginSuccess('apps/portal', true)
				}
		  }
            let {payload} = this.props,
                getterByField = payload.getIn(['utils','getterByField']),
                fromBuySwy = getterByField('fromBuySwy'),
                orgId = getterByField('createOrgId')
            if(fromBuySwy=='tasteBuy'){
                this.props.onLoginSuccess('#apps/login/order?orgId='+orgId,true)
            }
		})
  }
	handleSubmitClick(e){
        let fromBuySwy
        if(location.hash.indexOf('fromBuySwy=middle') != -1) {
            fromBuySwy = 'middle'
        }else if(location.hash.indexOf('fromBuySwy=high') != -1) {
            fromBuySwy = 'high'
        }else if(location.hash.indexOf('?tasteBuy') != -1) {
            fromBuySwy = 'tasteBuy'
        }else if(location.hash.indexOf('?fxhtop') != -1) {
            fromBuySwy = 'fxhtop'
        }
		this.props.register(undefined, undefined, fromBuySwy)
	}
	prev(){
		this.props.prev()
	}
	handleLoginClick(){
        if(this.props.appParams.fromBuySwy) {
            this.props.onRedirect('apps/login/login?' + this.props.appParams.fromBuySwy + '=true',true)
        } else {
            this.props.onRedirect('apps/login/login',true)
        }
	}
	getVerify(cb){
		this.props.getVerify(cb)
	}
	getComponentInstances(){
      return {
  			countDownButton: <CountDownButton onClick={::this.getVerify} style={{height:45}} text='获取验证码' count={120} />,
            help:<div  className={`${this.props.prefixCls}-help-box`}>
                    <Popover content={(
                        <div>
                            <p>没有邀请码，请<a href="javascript:;" onClick={::this.handlelink}>联系客服</a></p>
                        </div>
                        )} placement="right">
                    <ZIcon icon='help' />
                    </Popover>
                </div>
  		}
    }

	handleShowAgreementClick(e){
	 	this.props.showAgreement()
	}
	handleShowHelpClick(){
		this.props.showHelp()
	}
  	render() {
        if(this.props._isCurrentTab === false) return null //加上这句话
  		if(!this.props.payload || !this.props.payload.get('utils') )
           return (<div></div>)

       	let {prefixCls, ...otherProps} = this.props,
            {payload} = this.props,
            message = this.props.payload.getIn(['global','message']),
            getter = payload.getIn(['utils','getter']),
    	  	getterByField = payload.getIn(['utils','getterByField']),
            currentStep = getterByField('currentStep')
	    return (
	    	<HCFLayout
    			main={this.renderMain(prefixCls, otherProps,currentStep,this)}
	    		{...otherProps}
	    	/>
	    )
	 }

	handlelink() {
		let getterByField = this.props.payload.getIn(['utils', 'getterByField']),
			appInfo = sessionStorage.getItem('appInfo'),
			iTop = (window.screen.availHeight - 30 - 450) / 2,
			iLeft = (window.screen.availWidth - 10 - 590) / 2
		if (appInfo && appInfo.get('id') == 1000) {
			window.open('http://kefu.rongkecloud.com/RKServiceClientWeb/service?ek=b5c1f88e152a5d985e0bacda416e6fb3e6d853b9&bg=4&gd=231&ad=0&searchengine=&keywords=&intype=2&rk_userparams=&isinvite=0&qd=zwj', "_blank", "toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=590, height=450,top=" + iTop + ",left=" + iLeft + "")
		} else {
			window.open("http://kefu.rongkecloud.com/RKServiceClientWeb/service?ek=b5c1f88e152a5d985e0bacda416e6fb3e6d853b9&bg=4&gd=231&ad=0&searchengine=&keywords=&intype=2&rk_userparams=&isinvite=0&qd=yj", "_blank", "toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=590, height=450,top=" + iTop + ",left=" + iLeft + "")
		}
	}

    setShowCompoent(showCompoent){
        return ()=>{
            this.props.setShowCompoent(showCompoent)
        }
	}
	getIsSpecialIndustry(industry){
        /**
         * industry ID 说明（为了后期扩展其他行业做准备）
         * 1005 健康美容业
         * 1006 餐饮行业
         */
		// if (this.props.isDevelop){
			return industry.get('id') > 1000
		// }else{
		// 	return false
		// }
	}

	handleIndustryVersionChange(e){
		this.props.setIndustryVersion(e.target.value)
	}

 	renderMain(prefixCls, otherProps,currentStep,This) {
 		const Step = Steps.Step
		let url = document.location.hostname,
			company = constant.COMPANY,
			index = company.findIndex(i=>i.appDomain.indexOf(','+url+',')!=-1),
			productName = index == -1 ? '易嘉人' : company[index].name,
            {payload} = this.props,
            getter = payload.getIn(['utils','getter']),
            getterByField = payload.getIn(['utils','getterByField']),
            agree = getterByField('agree'),
            form = getterByField('form')

 		if(currentStep == 0){
 			return (
	    	   <div className={prefixCls}>
                    <h2 className={`${prefixCls}-header`}>集团注册</h2>
                    
                    <div className={`${prefixCls}-img`}>
                        <DynamicComponent componentInstances={this.getComponentInstances()}  _path='register.registerOne' {...otherProps}>
                        </DynamicComponent>
                        <span className={`${prefixCls}-help`}>
                            长时间没收到验证码，请查看
                            <a onClick={::this.handleShowHelpClick}>帮助</a>
                            <span className={`${prefixCls}-login`}>已有账号
                                <a onClick={::this.handleLoginClick}>请登录</a>
                            </span>
                        </span>
                    </div>
                    <Button type="primary" disabled={!agree}  className={`${prefixCls}-btn`} onClick={::this.handleSubmitClick}>注册</Button>
                    <span className={`${prefixCls}-checked`}>
                        <DynamicComponent  _path='register.registerOne.agree' {...otherProps}
                        />
                        <a onClick={::this.handleShowAgreementClick}>《用户协议条款》</a>
							{productName}承诺保护您的个人隐私
                    </span>
					
	      		</div>
	    	)
 		}else{
 			let disabledClick = getterByField('disabledClick'),
				statusOfTaxpayer = getterByField('form.statusOfTaxpayer'),
				industryVersion = getterByField('form.industryVersion'),
				industryVersionVisible = getterByField('industryVersionVisible')
 			return (
 				<div className={`${prefixCls} ${prefixCls}-Two`}>
	    	   		<h2 className={`${prefixCls}-header`}>完善信息</h2>
	    	   		<div className={`${prefixCls}-registertwobtn`}>
		    	   		<DynamicComponent componentInstances={this.getComponentInstances()} _path='register.registerTwo' {...otherProps}> }
						</DynamicComponent>
	    	   		</div>
	    	   		<Button type="primary" className={`${prefixCls}-btn`} disabledClick={disabledClick} onClick={::this.handleSubmitClick}>立即使用</Button>
	      		</div>
 			)
 		}
  	}
}
