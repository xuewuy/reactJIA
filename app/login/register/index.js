import React,{ Component,PropTypes } from 'react'
import DynamicComponent, {FormItem,onRedirect} from 'dynamicComponent'
import {HCFLayout,Button,Steps,CountDownButton,Alert} from 'xComponent'
import styles from "./register.less"

export default class RegisterComponent extends React.Component {
	static defaultProps = {
      	prefixCls: 'register',
  	}

  	constructor(props){
  		super(props)
  		this.handleGetImage = this.handleGetImage.bind(this)
  	}

  	componentDidMount() {
  		this.props.initView()
  	}
  	shouldComponentUpdate(nextProps){
        return !this.props.payload  || this.props.payload !== nextProps.payload
    }
	handleSubmitClick(e){
		let This = this.props
		let setPath = function() {
  			This.onRedirect('apps/login/login',true)
  		}
		this.props.register(data =>{
			// entrance 1代表我的易嘉人          2代表企业
			if(data.result){
				if(data.entrance == 1){
		            this.props.onLoginSuccess('apps/login/admin',true)
				}else{
		            this.props.onLoginSuccess('apps/portal',true)
				}
		    }
		})
	}
	prev(){
		this.props.prev()
	}
	handleLoginClick(){
		this.props.onRedirect('apps/login/login',true)
	}
	handleGetVerify(){
		this.props.getVerify()
	}
	getComponentInstances(){
      return {
  			countDownButton: <CountDownButton onClick={::this.handleGetVerify} style={{width:110,height:45}} text='获取验证码' count={60} />
  		}
    }
    handleGetImage(){
    	this.props.getImage()
    }
    setImage(){
    	let {prefixCls, ...otherProps} = this.props,
            {payload} = this.props,
            getter = payload.getIn(['utils','getter']),
    	  	getterByField = payload.getIn(['utils','getterByField']),
            imgSrc = getterByField('imgSrc')
    	return{
    		countDownButton: <img onClick={::this.handleGetImage} src={imgSrc} />
    	}
    }
	handleShowAgreementClick(e){
	 	this.props.showAgreement()
	}
	handleShowHelpClick(){
		this.props.showHelp()
	}
    handleClick() {
        this.props.login2(data =>{
            // entrance 1代表我的易嘉人          2代表企业
            if(data.result){
                if(data.entrance == 1){
                    this.props.onLoginSuccess('apps/login/admin',true)
                }else{
                    this.props.onLoginSuccess('apps/portal',true)
                }
            }
        })

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
 	renderMain(prefixCls, otherProps,currentStep,This) {
		 const Step = Steps.Step

 		if(currentStep == 0){
 			let {prefixCls, ...otherProps} = this.props,
	            {payload} = this.props,
	            getter = payload.getIn(['utils','getter']),
	    	  	getterByField = payload.getIn(['utils','getterByField']),
	            agree = getterByField('agree')
 			return (
	    	   <div className={prefixCls}>
	    	   		<h2 className={`${prefixCls}-header`}>欢迎注册易嘉人</h2>
	    	   		<div className={`${prefixCls}-Steps`}>
				        <Steps current={currentStep}>
						    <Step title="" />
						    <Step title="" />
						    <Step title="" />
				        </Steps>
				    </div>
	    	   		<div className={`${prefixCls}-img`}>
		    	   		<DynamicComponent componentInstances={this.setImage()}  _path='register.registerOne' {...otherProps}>
			    	   	</DynamicComponent>
	    	   		</div>
                    <span className={`${prefixCls}-loginBtn`}>已有账号
                        <a onClick={::this.handleLoginClick}>请登录</a>
                    </span>
	    	   		<Button type="primary" disabled={!agree} className={`${prefixCls}-btn`} onClick={::this.handleSubmitClick}>下一步</Button>
   					<span className={`${prefixCls}-checked`}>
    	   				<DynamicComponent  _path='register.registerOne.agree' {...otherProps}
    	   				/>
    	   				<a onClick={::this.handleShowAgreementClick}>《用户协议条款》</a>
    	   				易嘉人承诺保护您的个人隐私
    	   			</span>

	      		</div>
	    	)
 		}else if(currentStep == 1){
 			return (
 				<div className={prefixCls}>
	    	   		<h2 className={`${prefixCls}-header`}>欢迎注册易嘉人</h2>
	    	   		<div className={`${prefixCls}-Steps`}>
				        <Steps current={currentStep}>
						    <Step title="" />
						    <Step title="" />
						    <Step title="" />
				        </Steps>
				    </div>
	    	   		<div className={`${prefixCls}-registertwobtn`}>
		    	   		<DynamicComponent componentInstances={this.getComponentInstances()} _path='register.registerTwo' {...otherProps}> }
			    	   	</DynamicComponent>
	    	   		</div>
                    <span className={`${prefixCls}-checked`}  style={{textAlign: 'left'}}>
                        长时间没收到验证码，请查看
                        <a onClick={::this.handleShowHelpClick}>帮助</a>
                        <span className={`${prefixCls}-loginBtn`} style={{float:'right',width: 'auto'}}><a onClick={::this.prev}>返回上一步</a></span>
                    </span>
	    	   		<Button type="primary" className={`${prefixCls}-btn`} onClick={::this.handleSubmitClick}>下一步</Button>
	      		</div>
 			)
 		}else if(currentStep == 2){
 			let {prefixCls, ...otherProps} = this.props,
	            {payload} = this.props,
	            getter = payload.getIn(['utils','getter']),
	    	  	getterByField = payload.getIn(['utils','getterByField']),
	            agree = getterByField('agree'),
	            disabledClick = getterByField('disabledClick')
 			return (
 				<div className={prefixCls}>
	    	   		<h2 className={`${prefixCls}-header`}>欢迎注册易嘉人</h2>
	    	   		<div className={`${prefixCls}-Steps`}>
				        <Steps current={currentStep}>
						    <Step title="" />
						    <Step title="" />
						    <Step title="" />
				        </Steps>
				    </div>
	    	   		<DynamicComponent componentInstances={this.getComponentInstances()} className={`${prefixCls}-form`} _path='register.registerThree' {...otherProps}> }
		    	   	</DynamicComponent>
	    	   		<Button type="primary" className={`${prefixCls}-btn`} disabledClick={disabledClick} onClick={::this.handleSubmitClick}>创建</Button>
	    	   		<span className={`${prefixCls}-loginBtn`} style={{marginTop: '12px'}}><a onClick={::this.prev}>返回上一步</a></span>
	      		</div>
 			)
 		} else {
            return (
                <div className={prefixCls}>
                    <h2 className={`${prefixCls}-header`}>欢迎注册易嘉人</h2>
                    <div style={{width:'355px'}} className={`${prefixCls}-Steps`}>
                        <Steps current={currentStep}>
                            <Step title="" />
                            <Step title="" />
                            <Step title="" />
                        </Steps>
                    </div>
                    <div className={`${prefixCls}-finish`}>
                        <img src={require("./img/success.png")} alt=""/>
                        <p>恭喜您，创建企业账套成功</p>
                        <Button type="primary" className={`${prefixCls}-btn`} onClick={::this.handleClick}>立即体验</Button>
                    </div>
                </div>
            )
        }

  	}
}
