import React, { Component, PropTypes } from 'react'
import AcmEngine from './acmEngine'
import STSManage from './sTSManage'
import GuideManage from './guideManage'
import ImportTemplat from './importTemplat'
import { AppLoader } from 'appLoader'
import { Tabs } from 'xComponent'
const TabPane = Tabs.TabPane

export default class TemplatManagement extends Component {
	
	render() {
		if(this.props._isCurrentTab === false) return null //加上这句话
		if (!this.props.payload || !this.props.payload.get('utils'))
			return null
		let {prefixCls, ...otherProps} = this.props
		
		return (
			<div className={`${prefixCls}-templat-management`}>
				<Tabs type="card" className={`${prefixCls}-templat-management-tabs`}>
					{this.setManageTags()}
				</Tabs>
			</div>
		)
	}

	setManageTags(){
		return [
			<TabPane key="1" tab='凭证模版'>
				<AcmEngine {...this.props} />
			</TabPane>,
			<TabPane key="2" tab='凭证模板Excel导入'>
				<ImportTemplat {...this.props} type="2"/>
			</TabPane>,
			<TabPane key="3" tab='允许客户自行修改科目的业务'>
				<ImportTemplat {...this.props} type="3"/>
			</TabPane>,
			<TabPane key="4" tab='收入类型对应属性表'>
				<ImportTemplat {...this.props} type="4"/>
			</TabPane>,
			<TabPane key="5" tab='业务类型存货关系表'>
				<ImportTemplat {...this.props} type="5"/>
			</TabPane>,
			<TabPane key="6" tab='发票导入存货对照'>
				<ImportTemplat {...this.props} type="6"/>
			</TabPane>,
			<TabPane key="7" tab='帮助提示导入'>
				<ImportTemplat {...this.props} type="7"/>
			</TabPane>,
			<TabPane key="11" tab='发票生成流水规则'>
				<ImportTemplat {...this.props} type="11" />
			</TabPane>,
			<TabPane key="8" tab='业务类型搜索'>
				<STSManage {...this.props} />
			</TabPane>,
			<TabPane key="9" tab='导账业务类型搜索'>
				<GuideManage {...this.props} />
			</TabPane>,
			<TabPane key="10" tab='餐饮行业设置'>
				<AppLoader path={'apps/login/admin/apps/cateringIndustrySetup'}
					ref={'apps/login/admin/apps/cateringIndustrySetup'}
				/>
			</TabPane>,
		]
	}
}

