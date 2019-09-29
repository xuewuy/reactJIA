import React,{ Component,PropTypes } from 'react'
import DynamicComponent from 'dynamicComponent'
import {Tabs} from 'xComponent'
import HomeInfoManage from './homeInfoManage.js'
import BigNewsManage from './bigNewsManage.js'
import PartnerPlanManage from './partnerPlanManage.js'
import moment from 'moment'
const TabPane = Tabs.TabPane

export default class HomeManageComponent extends Component {

    handleHomeTabClick(e){
        this.props.saveHomeType(e)
    }
    
	render(){
		let utils = this.props.payload.get('utils') ,
			getterByField = utils.get('getterByField'),
            message = this.props.payload.getIn(['global', 'message']),
			{prefixCls,...otherProps} = this.props,
            homeType = getterByField('homeType') ? getterByField('homeType') : '1'
        
        if( this.props.appParams.homeType &&  this.props.appParams.homeType != homeType){
            this.props.saveHomeType(this.props.appParams.homeType )
            return null
        }

		return(
			<div className={`${prefixCls}-home`}>
                <Tabs type="card" className={`${prefixCls}-tabs`} onTabClick={::this.handleHomeTabClick} activeKey={homeType}>
                    <TabPane key="1" tab='首页滚动消息'>
                        {homeType != 1 ? null : <HomeInfoManage {...this.props} />}
                    </TabPane>                       
                    <TabPane key="2" tab='头条管理'>
                        {homeType != 2 ? null : <BigNewsManage {...this.props} />}
                    </TabPane>
                    <TabPane key="3" tab='伙伴计划管理'>
                        {homeType != 3 ? null : <PartnerPlanManage {...this.props} />}
                    </TabPane>
                </Tabs>
  			</div>     
    	)
	}
}