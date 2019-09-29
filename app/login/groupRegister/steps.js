import React,{ Component,PropTypes } from 'react'
import { Steps } from 'xComponent'
const Step = Steps.Step

export default class RegisterStepsComponent extends Component {
	render(){
		let utils = this.props.payload.get('utils') ,
			getterByField = utils.get('getterByField'),
			steps = getterByField('steps'),
			currentStep = getterByField('currentStep'),
			{prefixCls} = this.props
		
		return (
			<Steps current={currentStep} className={`${prefixCls}-main-steps`}>
				{ steps.toJS().map((s,i)=>{return (<Step title={s.title} />)})}
			</Steps>
		)
	}
}