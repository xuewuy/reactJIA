import React from 'react'

import {Button, Icon} from 'xComponent'

export default class bottomRightComponent extends React.Component {
	handleOpenDept(){
		this.props.onAddTab('部门人员', `apps/systemSetting/deptPerson/deptPerson`, {})
	}
	handleOpenAccSubjects(){
		this.props.onAddTab('科目及期初', `apps/fi/accSubjects/accSubjects`, {})
	}
	handleOpenCustomer(){
		this.props.onAddTab('基础档案', `apps/systemSetting/basicFileMaintenance?tab=true`, {judgeBasicFiles:{judgeTabsContent:'customerArchive', judgeTabsValue:'0'}})
	}
	handleOpenVendor(){
		this.props.onAddTab('基础档案', `apps/systemSetting/basicFileMaintenance?tab=true`, {judgeBasicFiles:{judgeTabsContent:'vendor', judgeTabsValue:'1'}})
	}
	handleOpenAccount(){
		this.props.onAddTab('基础档案', `apps/systemSetting/basicFileMaintenance?tab=true`, {judgeBasicFiles:{judgeTabsContent:'bankAccount', judgeTabsValue:'6'}})
	}

	handleSystemSetVideo(){
		let that = this,
			utils = this.props.payload.get('utils'),
			getterByField = utils.get('getterByField'),
			appInfo = getterByField('initData') ? getterByField('initData') : undefined,
			initVideoUrl = 'http://videos.rrtimes.com/yijiaxitongshezhi.mp4'
			if(appInfo && appInfo.id == 1010){
				initVideoUrl = appInfo.videoUrlInit
			}
			if(!initVideoUrl)return;

        this.props.setMessage({
            type: 'app',
            title: '初始化视频',
            content: `app:apps/common/video?height=440&width=978&videoUrl=${initVideoUrl}`,
            refName: 'showSystemSetVideo',
            wrapClassName: 'showSystemSetVideo',
            width:978,
            onCancel: function() {
                that.props.clearMessage()
            }
        })

	}
    
	render(){
		let  {prefixCls, roles, ...otherProps} = this.props,
            width = '580px'
		let utils = this.props.payload.get('utils'),
			getterByField = utils.get('getterByField'),
            menuIds = this.props.tab.get('menuIds') ? this.props.tab.get('menuIds').toJS() : getterByField('menuIds'),
            customer = getterByField('customer'),
            person = getterByField('person'),
            vendor = getterByField('vendor'), 
            bank = getterByField('vendor'),
			account = getterByField('account'),
			appId = getterByField('appId'),
            deptIsDisable = menuIds.find(id=>id==200001),
			basicFileIsDisable = menuIds.find(id=>id==200004)
		return (
			<div className={`${prefixCls}-bottom-right`} style={{width:width}}>
	        	<ul>
	        		<li className={`${prefixCls}-docs-1`}>
	        			<span><a  onClick={::this.handleSystemSetVideo}>
							<img src={require("../img/video.png")} />
                            观看初始化视频
                        </a></span>
					</li>
					{appId != 1001 ? (
						<li>
							<span className={!person ? (prefixCls + '-icon') : (prefixCls + '-icon-finished')}><Icon type="check-circle-o" /></span>
								{!!deptIsDisable ? <a onClick={::this.handleOpenDept}>完善部门人员信息，</a> : <span>完善部门人员信息，</span>}
							<span>设置角色权限并邀请，您可以邀请像记账员（出纳）、会计、老板和员工这样的用户，您邀请的每个用户都能够登录您的企业来帮助您一起管理业务</span>
						</li>
					) : null}
                    <li>
	        			<span className={!account?(prefixCls+'-icon'):(prefixCls+'-icon-finished')}><Icon type="check-circle-o" /></span>
                        {!!basicFileIsDisable ? <a onClick={::this.handleOpenAccSubjects}>完善科目及期初余额，</a> : <span>完善科目及期初余额，</span>}
	        			<span>为记录企业日常经济事项做好会计分类；</span>
	        		</li>
	        		<li>
	        			<span className={!customer?(prefixCls+'-icon'):(prefixCls+'-icon-finished')}><Icon type="check-circle-o" /></span>
                        {!!basicFileIsDisable ? <a onClick={::this.handleOpenCustomer}>完善客户信息、设置期初余额，</a> : <span>完善客户信息、设置期初余额，</span>}
	        			<span>以方便后续记录您与该客户的交易</span>
	        		</li>
	        		<li>
	        			<span className={!vendor?(prefixCls+'-icon'):(prefixCls+'-icon-finished')}><Icon type="check-circle-o" /></span>
                        {!!basicFileIsDisable ? <a onClick={::this.handleOpenVendor}>完善供应商信息、设置期初余额，</a> : <span>完善供应商信息、设置期初余额，</span>}
	        			<span>以方便后续记录您与供应商的交易</span>
	        		</li>
	        		<li>
	        			<span className={!bank?(prefixCls+'-icon'):(prefixCls+'-icon-finished')}><Icon type="check-circle-o" /></span>
                        {!!basicFileIsDisable ? <a onClick={::this.handleOpenAccount}>完善银行账户、设置期初余额，</a> : <span>完善银行账户、设置期初余额，</span>}
	        			<span>以方便后续记录账户资金的流入流出</span>
	        		</li>
	        	</ul>
        	</div>
		)
	}
}