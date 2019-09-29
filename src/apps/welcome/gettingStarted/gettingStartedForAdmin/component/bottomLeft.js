import React from 'react'
import {Button, Icon} from 'xComponent'
import classNames from 'classnames'

export default class bottomLeftComponent extends React.Component {
	handleOpenJournalAccount(){
 		let getterByField = this.props.payload.getIn(['utils','getterByField'])
        this.props.onAddTab('流水账', `apps/acm/richardTicket/card`,/*{initData: 201003}*/)
	}
	handleShowWaterAccountVideo(){
		let that = this,
			utils = this.props.payload.get('utils'),
			getterByField = utils.get('getterByField'),
			appInfo = getterByField('initData') ? getterByField('initData') : undefined,
			waterVideoUrl = 'http://videos.rrtimes.com/yijiacaishui.mp4' 
			if(appInfo && appInfo.id == 1010){
				waterVideoUrl = appInfo.videoUrlAcm
			}
			if(!waterVideoUrl)return;

        this.props.setMessage({
                type: 'app',
                title: '如何记录流水账视频',
                content: `app:apps/common/video?height=550&width=978&videoUrl=${waterVideoUrl}`,
                refName: 'showWaterAccountVideo',
                wrapClassName: 'showWaterAccountVideo',
                width:978,
                onCancel: function() {
                    that.props.clearMessage()
                }
        })

	}
	render(){
		let {prefixCls, ...otherProps} = this.props,
		    className = classNames({
    			[`${prefixCls}-bottom-left`]: true,
    			[`${prefixCls}-bottom-left-full`]: false
    		}),
            getterByField = this.props.payload.getIn(['utils', 'getterByField']),
            menuIds = this.props.tab.get('menuIds') ? this.props.tab.get('menuIds').toJS() : getterByField('menuIds'),
            isDisable = menuIds.find(id=>id==201003)
		return (
			<div className={className}>
				<ul>
	        		<li className={`${prefixCls}-bottom-left-li1`}>
	        			
	        			<span><a  onClick={::this.handleShowWaterAccountVideo}>
							<img src={require("../img/waterVideo.png")} />
                        如何记流水账？
                        </a></span>
	        		</li>
	        		<li className={`${prefixCls}-bottom-left-li2`}>
	        			流水账是日常经营中收支业务的记录，帮助企业出纳记录企业日常业务数据。覆盖业务范围广泛，分为收入、支出、成本/折旧和摊销、存取现金/内部账户互转、收款/付款，能够满足企业日常经营中的常见业务。
	        		</li>
	        		<li className={`${prefixCls}-bottom-left-li3`}>
	        			<Button type="primary" disabled={!!!isDisable} size="large" onClick={::this.handleOpenJournalAccount}>记一笔</Button>
	        		</li>

	        	</ul>
					
			</div>
		)
	}
}