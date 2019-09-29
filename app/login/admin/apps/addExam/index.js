import React,{ Component,PropTypes } from 'react'
import ReactDOM from 'react-dom'
import DynamicComponent,{Modal} from 'dynamicComponent'
import { Button, Card, Popover, ZIcon} from 'xComponent'
import styles from './addExam.less'

export default class cateringIndustrySetup extends Component {

	static defaultProps = {
		prefixCls:'addExam'
	}

	componentDidMount(){
		this.props.initView(this.props.initData)
	}

    shouldComponentUpdate(nextProps){
        return !this.props.payload  || this.props.payload !== nextProps.payload
	}

	render(){
        if(this.props._isCurrentTab === false) return null
		if(!this.props.payload || !this.props.payload.get('utils') )
           return null

		let { prefixCls, ...otherProps } = this.props,
			getterByField = this.props.payload.getIn(['utils','getterByField']),
			activeKey = getterByField('activeKey')
		return(
			<div className={prefixCls}>
				<DynamicComponent
					_path='addExam'
					{...otherProps}
				/>
			</div>
		)
	}
}
