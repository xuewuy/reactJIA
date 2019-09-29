import React,{ Component,PropTypes } from 'react'
import ReactDOM from 'react-dom'
import DynamicComponent,{Modal} from 'dynamicComponent'
import { Button, Card, Popover, ZIcon} from 'xComponent'
import styles from './examManagement.less'

export default class cateringIndustrySetup extends Component {

	static defaultProps = {
		prefixCls:'examManagement'
	}

	componentDidMount(){
		this.props.initView()
	}

    shouldComponentUpdate(nextProps){
        return !this.props.payload  || this.props.payload !== nextProps.payload
	}

	handleSwitchModule(activeKey){
		return ()=>{
			this.props.switchModule(activeKey)
		}
	}
	endOptionColumnCreator(option){
		
		return (
			<span className={`${this.props.prefixCls}-detail-option`}>
				<ZIcon
					icon='edit'
					onClick={::this.handleAddExamClick(option)}
					title='编辑'
				/>
				<ZIcon
					icon='remove'
					onClick={::this.handleRemoveClick(option)}
					title='删除'
				/>
                </span>
		)
	}

	handleRemoveClick(option){
		return ()=>{
			let getterByField = this.props.payload.getIn(['utils', 'getterByField']),
				rowIndex = option && option.rowIndex,
				fieldList = getterByField('fieldList'),
				row = option && fieldList.get(rowIndex)
			this.props.remove(row)
		}
	}

	handleAddExamClick(option){
		return ()=>{
			let getterByField = this.props.payload.getIn(['utils', 'getterByField']),
				rowIndex = option && option.rowIndex,
				fieldList = getterByField('fieldList'),
				row = option && fieldList.get(rowIndex)
			this.props.addExam(row)
		}
	}

	handleSearchClick(){
		this.props.getAchievementList()
	}

	handleSendClick(type){
		return ()=>{
			this.props.sendMS(type)
		}
	}

	handleExportClick(){
		this.props.exportExcel()
	}

	handleSearchExamList(){
		this.props.getExamList()
	}

	render(){
        if(this.props._isCurrentTab === false) return null
		if(!this.props.payload || !this.props.payload.get('utils') )
           return null

		let { prefixCls, ...otherProps } = this.props,
			message = this.props.payload.getIn(['global', 'message']),
			getterByField = this.props.payload.getIn(['utils','getterByField']),
			activeKey = getterByField('activeKey')
		return(
			<div className={prefixCls}>
				<div className={`${prefixCls}-header`}>
					<div className={activeKey == 0 ? 'active' : ''} onClick={::this.handleSwitchModule(0)}>场次管理</div>
					<div className={activeKey == 1 ? 'active' : ''} onClick={::this.handleSwitchModule(1)}>成绩管理</div>
				</div>
				<div className={`${prefixCls}-filters`}>
					{activeKey == 0 ? (
						<div className={`${prefixCls}-filters-fieldManage`}>
							<div className={`${prefixCls}-filters-fieldManage-left`}>
								<DynamicComponent _path='examManagement.search' {...otherProps} />
								<div>
									<Button type="primary" onClick={::this.handleSearchExamList}>查询</Button>
								</div>
							</div>
							<div className={`${prefixCls}-filters-fieldManage-right`}>
								<Button type="primary" onClick={::this.handleAddExamClick()}>新增考试场次</Button>
							</div>
						</div>
					) : (
						<div className={`${prefixCls}-filters-achievementManage`}>
								<DynamicComponent _path='examManagement.filters' {...otherProps} />
								<div className={`${prefixCls}-filters-achievementManage-btns`}>
									<Button type="primary" onClick={::this.handleSearchClick}>查询</Button>
									<Button type="primary" onClick={::this.handleSendClick(0)}>实操短信</Button>
									<Button type="primary" onClick={::this.handleSendClick(1)}>专业成绩短信</Button>
									<Button className={`exportBtn`} title='Excel导出' icon='search' onClick={::this.handleExportClick} />
								</div>
						</div>
					)}
				</div>
				{activeKey == 0 ? (
					<DynamicComponent 
						_path='examManagement.tabs.fieldManage' 
						{...otherProps} 
						endOptionColumnTitle='操作'
						endOptionColumnWidth={80}
						endOptionColumnCreator={::this.endOptionColumnCreator}
						endOptionColumnFixed
					/>
				) : (
					<DynamicComponent 
						_path='examManagement.tabs.achievementManage' 
						{...otherProps} 
					/>
				)}
				{Modal(message) }
			</div>
		)
	}
}
