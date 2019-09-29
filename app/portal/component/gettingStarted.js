
import React, { Component, PropTypes } from 'react'
import {Checkbox, Button} from 'xComponent'


export default class GettingStartedComponent extends Component {
	render(){
		let prefixCls = this.props.prefixCls

		let getterByField = this.props.payload.getIn(['utils', 'getterByField']),
			noTip = getterByField('noTip'),
			showTip = getterByField('showTip')

		return (
			<div className={`${prefixCls}-gettingstarted`}>
				<div className={`${prefixCls}-gettingstarted-body`}>
				</div>
				<div className={`${prefixCls}-gettingstarted-footer`}>
					{showTip ? <Checkbox 
					 	checked={noTip} 
					 	onChange={(e)=>{this.props.noTip(e.target.checked)}}
                    >
                    	不再提示
                    </Checkbox> : null}
                    <div className={`${prefixCls}-gettingstarted-footer-btn`}
                        onClick={()=>{this.props.know()}}>
                    
                    </div>
				</div>
			</div>
		)
	}
}