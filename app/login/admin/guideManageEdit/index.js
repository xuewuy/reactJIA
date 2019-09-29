import React,{Component} from 'react'
import DynamicComponent from 'dynamicComponent'
import { Input, Button, Text ,Checkbox} from 'xComponent'
const CheckboxGroup  = Checkbox.Group
import './style.less'

export default class GuideManageEditComponent extends Component{

	static defaultProps = {
      	prefixCls: 'guideManageEdit'
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

	handleCheckBoxChange(values){
		this.props.setCheckBoxValue(values)
	}

	render(){
		 if (!this.props.payload || !this.props.payload.get('utils'))
            return null
        let {prefixCls,...otherProps} = this.props,
            utils = this.props.payload.get('utils'),
            getterByField = utils.get('getterByField'),
						value = getterByField('form.keyWords'),
						CheckBoxValue = getterByField('form.CheckBoxValue').toJS()
						const options = [
						  { label: '客户', value: '1' },
						  { label: '供应商', value: '2' },
						  { label: '人员', value: '3' },
						  { label: '部门', value: '4' },
						  { label: '项目', value: '5' },
						  { label: '存货', value: '6' },
						];
		return (
			<div className={this.props.prefixCls}>
				<div className={`${prefixCls}-head`}>请输入关键字：</div>
				<div className={`${prefixCls}-body`}>
					<Input value={value} allChange={false} onChange={::this.handleChange}></Input>
				</div>
				<div>
						<span>设置辅助核算项：</span>
						<CheckboxGroup options={options} value={CheckBoxValue} onChange={::this.handleCheckBoxChange} />
				</div>
			</div>
		)
	}

}
