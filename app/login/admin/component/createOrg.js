import React,{ Component,PropTypes } from 'react'
import DynamicComponent from 'dynamicComponent'
import { Button, ZIcon,Radio} from 'xComponent'
const RadioGroup = Radio.Group

export default class CreateOrgComponent extends Component {
	componentDidMount(){
		this.props.initCreateOrg()
	}
	handleChange(e){
		this.props.setIndustryVersion(e.target.value)
	}
	handleVatModeChange(e){
		this.props.setVatMode(e.target.value)
	}
	render(){
		let {prefixCls, ...otherProps} = this.props
		let utils = this.props.payload.get('utils'),
			getterByField = utils.get('getterByField'),
			isOrg = getterByField('isOrg'),
			appId = getterByField('appInfo').get('id'),
			myYjTableTitle = this.props.initData.myYjTableTitle,
			path_ = myYjTableTitle == 'group' ? 'admin.createGroup' : isOrg ? 'admin.enterprise' : 'admin.createOrg',
			industryVersionVisible = getterByField('enterprise.industryVersionVisible'),
			statusOfTaxpayer = getterByField('enterprise.statusOfTaxpayer'),
			industryVersion = getterByField('enterprise.industryVersion'),
			vatMode = getterByField('enterprise.vatMode'),
			vatModeVisible = getterByField('enterprise.vatModeVisible')
		return (
			<div className={`${prefixCls}-createOrg`}>
				<DynamicComponent className={`${prefixCls}-createOrg-form`} _path={path_} {...otherProps} />
				{industryVersionVisible && isOrg ? (
					<div>
						<div className={`${prefixCls}-createOrg-industryVersion`}>
							<div><span>*</span>启用模块：</div>
							<RadioGroup onChange={::this.handleChange} value={industryVersion}>
								<Radio value={1}><span className='pointer' title={'记录每天收支流水，统计收支结余、往来欠款及资金变动'}>流水账</span></Radio>
								<Radio value={2}><span className='pointer' title={'包含流水账模块，实现流水账生成财务凭证，查看财务账表、报表，测算纳税申报表'}>财务账</span></Radio>
							</RadioGroup>
						</div>
						{vatModeVisible ? (
							<div className={`${prefixCls}-createOrg-vatMode`}>
								<div><span>*</span>纳税方式：</div>
								<RadioGroup onChange={::this.handleVatModeChange} value={vatMode}>
									<Radio value={36}><span className='pointer'>查账征收</span></Radio>
									<Radio value={37}><span className='pointer'>核定征收</span></Radio>
								</RadioGroup>
							</div>
						) : null}
					</div>
				) : null}
			</div>
		)
	}
}