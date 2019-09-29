import React,{ Component,PropTypes } from 'react'
import {HCFLayout, Button, Steps, CountDownButton,Alert} from 'xComponent'
import DynamicComponent, {FormItem} from 'dynamicComponent'
import styles from "./forgetPassword.less"
import img from "./img/success.png"

const Step = Steps.Step

export default class ForgetPasswordComponent extends Component {
	static defaultProps = {
  	prefixCls: 'forgetPassword'
	}

 	componentDidMount() {
		this.props.initView()
	}
  shouldComponentUpdate(nextProps){
    return !this.props.payload  || this.props.payload !== nextProps.payload
  }

 	handlePrev(e){
		this.props.prev()
	}

	handleNext(e){
		this.props.handleNext((user)=>{
			this.props.onRedirect('apps/login/login', {user})
		})
	}

	handleReLoginClick(e){
	  this.props.onRedirect('apps/login/login',true)
	}

  handleGoClientRegisterClick(e){
    this.props.onRedirect('apps/login/clientRegister',true)
  }

  handleShowHelpClick(){
    this.props.showHelp()
  }

  handleLoginClick(e){
    this.props.login((data)=>{
      if(data.result){
        if(data.entrance === 2)
          this.props.onLoginSuccess('apps/portal',true)
        else
          this.props.onLoginSuccess('apps/login/admin',true)
      }
    })
  }

  handleGetCaptcha(){
    let reset = this.refs.countDownButton.reset
    this.props.getCaptcha(()=>{
      setTimeout(reset, 200)
    })
  }

  getAccountName() {
    let {payload} = this.props,
    getterByField = payload.getIn(['utils','getterByField']),
    accountName = getterByField('form.mobile')
    return accountName
  }

  render() {
      if(this.props._isCurrentTab === false) return null //加上这句话
  		if(!this.props.payload || !this.props.payload.get('utils') )
        return (<div></div>)
       	let {prefixCls, ...otherProps} = this.props
        return (
        	<HCFLayout
      			main={this.renderMain(prefixCls, otherProps)}
        		{...otherProps}
        	/>
        )
  }

 	renderMain(prefixCls, otherProps) {
 		let utils = otherProps.payload.get('utils') ,
     		getterByField = utils.get('getterByField'),
      	steps = getterByField('steps'),
      	currentStep = getterByField('currentStep'),
      	mobile = getterByField('form.mobile'),
      	isFirstStep = currentStep === 0,
      	isLastStep = currentStep === steps.size - 1
    var setText = '';
    let classNames = ''
    if(currentStep == 0){
      setText = '安全验证';
      classNames = prefixCls + '-index'
    }else if(currentStep == 1){
      setText = '设置新密码';
      classNames = prefixCls + '-tow'
    }else{
      setText = '设置完成';
    }
    var display = currentStep == 0 ? 'show' : 'hide'
    
    let content = ()=>{
    	if( isFirstStep )
				return (<DynamicComponent _path={`forgetPassword.formItems0`} {...otherProps} componentInstances={this.getComponentInstances()} />)
			if( !isFirstStep && !isLastStep )
	   		return (<DynamicComponent _path={`forgetPassword.formItems1`} {...otherProps} componentInstances={this.getComponentInstances()} />)
		}
    	return (
    	   <div className={`${prefixCls} ${classNames}`}>
    	   		<h2 className={`${prefixCls}-header`}>{setText}</h2>
    	   		<DynamicComponent className={`${prefixCls}-form`} _path='forgetPassword' {...otherProps}>
    	   			{ content() }
    	   		</DynamicComponent>
  	   			<span className={`${prefixCls}-footer`}>
              <div className={display}>
                <p className={`${prefixCls}-help`}>长时间没有收到验证码，请查看
									<a onClick={::this.handleShowHelpClick}>帮助</a>
									<a className='relogin-left' onClick={::this.handleReLoginClick}>重新登录</a>
								</p>
              </div>
  	   				<Button type="primary"  size="large" style={{display:currentStep == 2 ? 'none':''}} className={`${prefixCls}-btn`} onClick={::this.handleNext}>{currentStep==1?'完成':'下一步'}</Button>
  	   				<div className={currentStep == 2 ? 'show' : 'hide'}>
                <div className={`${prefixCls}-ok`}>
                  <img src={img} alt=""/>
                  <p>设置密码成功</p>
                  <p style={{color:"#666"}}>找回密码的账号为：{::this.getAccountName()}</p>
                  <Button type="primary"  size="large" onClick={::this.handleLoginClick}>立即进入应用</Button>
                </div>
              </div>
  	   			</span>
      		</div>
    	)
  	}
  	getComponentInstances(prefixCls, otherProps){
  		return {
  			countDownButton: <CountDownButton ref='countDownButton' style={{width:110}} text='获取验证码' count={120}  onClick={::this.handleGetCaptcha} />
  		}
  	}
}
