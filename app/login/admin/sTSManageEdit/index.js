import React,{Component} from 'react'
import DynamicComponent from 'dynamicComponent'
import { Input, Button, Text } from 'xComponent'
import './sTSManageEdit.less'

export default class STSManageEditComponent extends Component{

	static defaultProps = {
      	prefixCls: 'sTSManageEdit'
  	}
	
	componentDidMount() {
		this.props.initView(this.props.initData)
    }

	handleChange(e){
		this.props.changeValue(e)
	}
	
	handleClear() {
		this.props.clearExtValue()
	}

	render(){
		 if (!this.props.payload || !this.props.payload.get('utils'))
            return null
        let {prefixCls,...otherProps} = this.props,
            utils = this.props.payload.get('utils'),
            getterByField = utils.get('getterByField'),
			value = getterByField('form.editValue') ? getterByField('form.editValue').toJS() : '',
			extValue = getterByField('form.editExtValue') ? getterByField('form.editExtValue').toJS() : '',
			displayValue = ''
		
		if(!!value) {
			value.map(o => {
				if(!displayValue) {
					displayValue = o
				} else {
					displayValue = displayValue + ' ' + o
				}
			})
		}
		
		return (
			<div className={this.props.prefixCls}>
				<div className={`${prefixCls}-head`}>请输入关键字：(请用空格分隔)</div>
				<div className={`${prefixCls}-body`}>
					<Input value={displayValue} allChange={false} onChange={::this.handleChange}></Input>
				</div>
				<div className={`${prefixCls}-clear`}>
					<div className={`${prefixCls}-clearTitle`}><span>推荐关键字：</span><a onClick={::this.handleClear}>清空</a></div>
					<div className={`${prefixCls}-clearValue`}>{extValue}</div>
				</div>
			</div>
		)
	}

}