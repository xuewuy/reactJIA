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
  		this.props.initView(this.props.isDevelop)
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
					form = getterByField('form'),
					currentIndustry = form.get('industry'),
					isSpecialIndustry = this.getIsSpecialIndustry(currentIndustry)
				if ((window.location.href.indexOf('?px') == -1 || location.host.indexOf("px")==0) && isSpecialIndustry){
					this.props.onLoginSuccess('apps/login/admin?activeKey=50', true)
				}else{
					if (data.entrance == 1) {
						this.props.onLoginSuccess('apps/login/admin', true)
					} else {
						if (window.location.href.indexOf('?h=its') != -1){
							this.props.toIts()
							// webapi.web.itsSync(injectFuns.post, org.get('id')).then(data => {
							// 	window.location.href = `${data.value.url}/v1/authorize#authorization_code=${data.value.token}&from_url=${window.location.origin}`
							// })
						}else{
							this.props.onLoginSuccess('apps/portal', true)
						}
					}
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
        }else if(location.hash.indexOf('?fxhtopSY') != -1) {
            fromBuySwy = 'fxhtopSY'
        }else if(location.hash.indexOf('?fxhtopQB') != -1) {
            fromBuySwy = 'fxhtopQB'
        }else if(location.hash.indexOf('?fxhtopDK') != -1) {
            fromBuySwy = 'fxhtopDK'
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

	handleVatModeChange(e){
		this.props.setVatMode(e.target.value)
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
            form = getterByField('form'),
            appInfo = getterByField('appInfo'),
			next = '下一步'
			
        if(appInfo && appInfo.get('id')==1010){
			productName  = appInfo.get('name')
		}
        if(location.hash.indexOf('fromBuySwy') != -1) {
            next = '立即注册'
        }

 		if(currentStep == 0){
 			return (
	    	   <div className={prefixCls}>
                    <h2 className={`${prefixCls}-header`}>企业注册</h2>
                    <div className={`${prefixCls}-Steps`}>
                        <img src={require('./img/step1.png')}/>
                    </div>
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
                    <Button type="primary" disabled={!agree}  className={`${prefixCls}-btn`} onClick={::this.handleSubmitClick}>{next}</Button>
                    <span className={`${prefixCls}-checked`}>
                        <DynamicComponent  _path='register.registerOne.agree' {...otherProps}
                        />
                        <a onClick={::this.handleShowAgreementClick}>《用户协议条款》</a>
							{productName}承诺保护您的个人隐私
                    </span>
					
	      		</div>
	    	)
 		}else if(currentStep == 1){
 			let disabledClick = getterByField('disabledClick'),
				statusOfTaxpayer = getterByField('form.statusOfTaxpayer'),
				industryVersion = getterByField('form.industryVersion'),
				industryVersionVisible = getterByField('industryVersionVisible'),
				vatMode = getterByField('vatMode'),
				vatModeVisible = getterByField('vatModeVisible')
 			return (
 				<div className={`${prefixCls} ${prefixCls}-Two`}>
	    	   		<h2 className={`${prefixCls}-header`}>创建企业</h2>
	    	   		<div style={{width:'100%'}} className={`${prefixCls}-Steps`}>
				        <img src={require('./img/step2.png')}/>
				    </div>
	    	   		<div className={`${prefixCls}-registertwobtn`}>
		    	   		<DynamicComponent componentInstances={this.getComponentInstances()} _path='register.registerTwo' {...otherProps}> }
						</DynamicComponent>
						{industryVersionVisible ? (
							<div>
								<div className={`${prefixCls}-createOrg-industryVersion`}>
									<div>启用模块：</div>
									<RadioGroup onChange={::this.handleIndustryVersionChange} value={industryVersion}>
										<Radio value={1}><span title={'记录每天收支流水，统计收支结余、往来欠款及资金变动'}>流水账</span></Radio>
										<Radio value={2}><span title={'包含流水账模块，实现流水账生成财务凭证，查看财务账表、报表，测算纳税申报表'}>财务账</span></Radio>
									</RadioGroup>
								</div>
								{vatModeVisible ? (
									<div className={`${prefixCls}-createOrg-vatMode`}>
										<div>纳税方式：</div>
										<RadioGroup onChange={::this.handleVatModeChange} value={vatMode}>
											<Radio value={36}><span className='pointer'>查账征收</span></Radio>
											<Radio value={37}><span className='pointer'>核定征收</span></Radio>
										</RadioGroup>
									</div>
								) : null}
							</div>
						) : null}
                        {/*statusOfTaxpayer.get('id') == 41 ? <div className={`${prefixCls}-remind`}><ZIcon icon='modal-warn'/>一般纳税人增值税申报模板正在开发中，敬请期待。</div> : null*/}
	    	   		</div>
	    	   		<Button type="primary" className={`${prefixCls}-btn`} disabledClick={disabledClick} onClick={::this.handleSubmitClick}>下一步</Button>

	    	   		<span className={`${prefixCls}-login`}  style={{marginTop:'8px',width:'100%',textAlign:'center'}}><a onClick={::this.prev}>返回上一步</a></span>
	      		</div>
 			)
 		}else{
            let orgName = form.get('orgName'),
                enabledYear = form.get('enabledYear'),
                accountingStandards = form.get('accountingStandards'),
                isShowEnabledYearComponent= getterByField('isShowEnabledYearComponent'),
                isShowEnabledYearSuccessInfo = getterByField('isShowEnabledYearSuccessInfo'),
                isShowAccountingStandardsComponent = getterByField('isShowAccountingStandardsComponent'),
                isShowAccountingStandardsSuccessInfo = getterByField('isShowAccountingStandardsSuccessInfo'),
				currentIndustry = form.get('industry'),
				isSpecialIndustry = this.getIsSpecialIndustry(currentIndustry)
 			return (
 				<div className={prefixCls}>
	    	   		<h2 className={`${prefixCls}-header`}>成功注册{productName}</h2>
	    	   		<div style={{width:'100%'}} className={`${prefixCls}-Steps`}>
				        <img src={require('./img/step2.png')}/>
				    </div>
	    	   		<div className={`${prefixCls}-finish`}>
	    	   			<img src={require("./img/success.png")} alt=""/>
	    	   			<p className={`${prefixCls}-finish-text`}>恭喜您，创建企业账套成功</p>
                        <p title={orgName}>
                            <label>企业名称：</label>
                            <span>{orgName}</span>
                        </p>
                        <p>
                            <label>启用期间：</label>
                            {!isShowEnabledYearComponent ? <span>{enabledYear}</span> : <DynamicComponent _path='register.registerTwo.enabledYear' componentInstance {...otherProps} />}
                            {!isShowEnabledYearComponent ? <ZIcon icon='edit' onClick={::this.setShowCompoent('isShowEnabledYearComponent')}/> : null}
                            {isShowEnabledYearSuccessInfo ? <span style={{color:'#47C700',paddingLeft:'7px'}}>修改成功</span> : null}
                        </p>
                        <p>
                            <label>会计准则：</label>
                            {!isShowAccountingStandardsComponent ? <span>{accountingStandards.get('name')}</span>: <DynamicComponent _path='register.registerTwo.accountingStandards' componentInstance {...otherProps} />}
							{!isShowAccountingStandardsComponent && !(currentIndustry.get('id') === 1005 || currentIndustry.get('id') === 1008) ? <ZIcon icon='edit' onClick={::this.setShowCompoent('isShowAccountingStandardsComponent')}/> : null}
                            {isShowAccountingStandardsSuccessInfo ? <span style={{color:'#47C700',paddingLeft:'7px'}}>修改成功</span> : null}
						</p>
						<Button type="primary" className={`${prefixCls}-btn`} onClick={::this.handleLClick}>{window.location.href.indexOf('?px') != -1  || location.host.indexOf("px")==0? '立即体验' : isSpecialIndustry ?  (currentIndustry.get('id') !== 1008 ? '上传营业执照':'律师事务所执业许可证'): '立即体验'}</Button>
	    	   		</div>
	      		</div>
 			)
 		}
  	}
}
