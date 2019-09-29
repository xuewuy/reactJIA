import React, { Component, PropTypes } from 'react'
import { Button, Upload } from 'xComponent'

export default class ImportTemplat extends Component {
	constructor(props) {
		super(props)
		this.state = {
			oldName: '',
			interfaceName: '',
			voucherName: '',
			initData2: {},
			initData3: '',
			initData4: '',
			initData5: '',
			initData6: '',
			initData7: '',
			initData11: '',
		}
	}
	
	getContent(type){
		let strs = "/static/images/mobanguanli/"+type+".png"
		return(<img src= {strs}/>)
	}
	
	handleImportStatementChange(type, info){
		let {setMessage} = this.props
		
		if(info.file.status != 'uploading')
			this.props.hideLoadingMask()
		
		if (info.file.status === 'done') {
			if (info.file.response.error && info.file.response.error.message) {
				setMessage({
					type: 'error',
					mode: 'message',
					content: info.file.response.error.message
				})
				return
			}else if(info.file.response.result && info.file.response.value){
				let initData = info.file.response.value.setEnclosureList, obj = {}
				
				if(!type){
					obj = {oldName: info.file.name}
					obj['initData'+this.props.type] = initData
				}else{
					obj[type+'Name'] = info.file.name
					let initData2 = this.state.initData2
					initData2[type] = initData
					obj['initData'+this.props.type] = initData2
				}
				
				this.setState(obj)
			}
		}else if (info.file.status === 'error') {
			setMessage({
				type: 'error',
				mode: 'message',
				content: `${info.file.name} 上传失败`
			})
		}
	}
	
	handleBeforeUpload(file) {
		let {setMessage} = this.props,
			three=file.name.split("."),
			suffix=three[three.length-1]
		
		if(suffix === 'xls' || suffix === 'xlsx'){
			this.props.showLoadingMask({content:'正在上传...'})
			return true
		}
		
		setMessage({
			type: 'error',
			mode: 'message',
			content: '只支持导入excel格式文件'
		})
		return false
	}
	
	imortFile(){
		let { initData2, initData3, initData4, initData5, initData6, initData7, initData11} = this.state,
			type = this.props.type
		
		switch(type){
			case '2':
				if(!initData2.interface || !initData2.voucher){
					this.getMessage()
					return
				}
				this.props.importTemplate(initData2, type, this)
				break
			case '3':
				if(!initData3){
					this.getMessage()
					return
				}
				this.props.importTemplate(initData3, type, this)
				break
			case '4':
				if(!initData4){
					this.getMessage()
					return
				}
				this.props.importTemplate(initData4, type, this)
				break
			case '5':
				if(!initData5){
					this.getMessage()
					return
				}
				this.props.importTemplate(initData5, type, this)
				break
			case '6':
				if(!initData6){
					this.getMessage()
					return
				}
				this.props.importTemplate(initData6, type, this)
				break
			case '7':
				if(!initData7){
					this.getMessage()
					return
				}
				this.props.importTemplate(initData7, type, this)
				break
			case '11':
				if (!initData11) {
					this.getMessage()
					return
				}
				this.props.importTemplate(initData11, type, this)
				break
		}
	}
	
	getMessage(){
		let {setMessage} = this.props
		setMessage({
			type: "warning",
			mode: 'message',
			content: "请选择文件！"
		})
	}
	
	getUpload(name, type){
		return (
			<Upload {...{
				showUploadList: false,
				action: '/v1/setEnclosure/enclosureDispose',
				headers: {token:getAccessToken()},
				multiple: false,
				onChange: this.handleImportStatementChange.bind(this, type),
				beforeUpload: this.handleBeforeUpload.bind(this),
				accept:'.xls,.xlsx'
			}}>
				{
					this.props.type=='2' ?
					<span>
						{type=='interface' ? <Button type="primary">{this.state.interfaceName? "重选"+name : "选择"+name}</Button>:null}
						{type=='voucher' ? <Button type="primary">{this.state.voucherName ? "重选"+name : "选择"+name}</Button>:null}
					</span>:
					<Button type="primary">{this.state.oldName ? "重选"+name : "选择"+name}</Button>
				}
			</Upload>
		)
	}
	
	render() {
		if(this.props._isCurrentTab === false) return null //加上这句话
		if (!this.props.payload || !this.props.payload.get('utils'))
			return null
		let {prefixCls, type, ...otherProps} = this.props
		
		return (
			<div className={`${prefixCls}-templat-management`}>
				<div className={`${prefixCls}-templat-management-content`}>
					<div className="import-header">
						{
							type!="2" ?
							<div className = {`${prefixCls}-upload`}>
								{this.getUpload('文件')}
								<span className="oldname">{this.state.oldName}</span>
							</div>:
							<div>
								<div>
									{this.getUpload('界面模板', 'interface')}
									<span className="oldname">{this.state.interfaceName}</span>
								</div>
								
								<div className = {`${prefixCls}-upload-btn`}>
									{this.getUpload('凭证模板', 'voucher')}
									<span className="oldname">{this.state.voucherName}</span>
								</div>
							</div>
						}
					</div>
					
					{
						type=="2" ?
						<div>
							<p>选择界面模板该界面使用Excel方式管理模板，效果与“凭证模板”管理相同！<br/>
							请同时选择以上两个模板后，一起导入！</p>
						</div> :
						<div>
							<p>选择文件选择下图的Excel模板，确认后，点击“开始导入”</p>
							{ this.getContent(type) }
						</div>
					}
					
					<div className="import-footer">
						<Button type="primary" onClick={::this.imortFile}>开始导入</Button>
						{type == '3' ? <span className="prompt">(仅识别和导入“允许客户自行修改科目的业务”一个页签即可)</span> : null}
						{type == '4' ? <span className="prompt">(仅识别和导入“收入类型对应属性表”一个页签即可)</span> : null}
						{type == '5' ? <span className="prompt">(仅识别和导入“业务类型存货关系表”一个页签即可)</span> : null}
					</div>
				</div>
			</div>
		)
	}
}

