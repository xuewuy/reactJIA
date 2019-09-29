import React from 'react'
import './help.less'
import constant from 'constant'

export default class Help extends React.Component {

	render(){
		let appInfo = this.props.initData || null,
			helpEmail = 'liyue@rrtimes.com',
			helpTel = '400-6060-386'
		if(appInfo){
			helpEmail = appInfo.appEmail
			if(appInfo.appServiceTel){
				helpTel = appInfo.appServiceTel 
			}
		} 

		return (<section className='help'>
					<h1>没有收到验证码怎么办？</h1>
					<p>
						亲爱的用户，验证码短信/邮件正常都会在数秒钟内发送，如果您未收到短信/邮件，请参照如下常见情况进行解决：
						<p>1、由于您的手机或邮箱软件设定了某些安全设置，验证码短信/邮件可能被拦截进了垃圾箱。请打开垃圾箱查看，并将易嘉人号码添加为白名单。</p>
						<p>2、由于运营商通道故障造成了短信/邮件发送时间延迟，请耐心稍候片刻或点击重新获取验证码。</p>
						<p>3、关于手机号验证，目前支持移动、联通和电信的所有号码，暂不支持国际及港澳台地区号码。</p>
					</p>
					<p>如果您尝试了上述方式后均未解决，或存有其他疑问，请通过电话<span className='help_meail'>{helpTel}</span>获取客服协助。</p>
				</section>)
	}
}
