import React,{ Component,PropTypes } from 'react'
import ReactDOM from 'react-dom'
import DynamicComponent,{Modal} from 'dynamicComponent'
import { Button, Card, Popover} from 'xComponent'
import styles from './cateringIndustrySetup.less'

export default class cateringIndustrySetup extends Component {

	static defaultProps = {
		prefixCls:'cateringIndustrySetup'
	}

	componentDidMount(){
		this.props.initView()
	}

    shouldComponentUpdate(nextProps){
        return !this.props.payload  || this.props.payload !== nextProps.payload
	}

	handleRefreshClick(){
		this.props.query()
	}

	handlePopoverVisibleChange(visible){
		this.props.popoverVisibleChange(visible)
	}

	getPopoverContent(){
		let { prefixCls, ...otherProps } = this.props,
			message = this.props.payload.getIn(['global', 'message']),
			getterByField = this.props.payload.getIn(['utils', 'getterByField'])
		return (
			<div className={`${prefixCls}-filters-right-popover`}>
				<DynamicComponent _path='cateringIndustrySetup.popoverContent' {...otherProps}></DynamicComponent>
			</div>
		)
	}
	getTooltipContainer(){
		return ReactDOM.findDOMNode(this)
	}
	
	render(){
        if(this.props._isCurrentTab === false) return null
		if(!this.props.payload || !this.props.payload.get('utils') )
           return null

		let { prefixCls, ...otherProps } = this.props,
	   		message = this.props.payload.getIn(['global','message']),
			getterByField = this.props.payload.getIn(['utils','getterByField']),
			popoverVisible = getterByField('popoverVisible')
		return(
			<div className={prefixCls}>
				<div className={`${prefixCls}-filters`}>
					<div className={`${prefixCls}-filters-left`}>
						<DynamicComponent _path='cateringIndustrySetup.filters' {...otherProps}></DynamicComponent>
						<div className={`${prefixCls}-filters-left-refresh`}>
							<Button onClick={::this.handleRefreshClick} title='刷新' icon='search' />
						</div>
					</div>
					<div className={`${prefixCls}-filters-right`} id={`${prefixCls}-filters-right`}>
						<Popover
							content={::this.getPopoverContent()}
							trigger="click"
							placement="bottom"
							visible={popoverVisible}
							getTooltipContainer={::this.getTooltipContainer}
							className={`${prefixCls}-filters-right-popover-warp`}
							onVisibleChange={::this.handlePopoverVisibleChange}
						>
							<Button type="primary">批量设置业务类型</Button>
						</Popover>
					</div>
				</div>
				<DynamicComponent _path='cateringIndustrySetup.grid' {...otherProps}></DynamicComponent>
				<div className={`${prefixCls}-footer`}>
					<DynamicComponent _path='cateringIndustrySetup.pagination' {...otherProps} />
				</div>
			</div>
		)
	}
}
