import React, { Component,PropTypes } from 'react'
import DynamicComponent, { Modal } from 'dynamicComponent'
import {Button, Table, ZIcon, Column, Cell, Input, Pagination,Upload} from 'xComponent'
import Rx from 'rx-lite'

export default class MyOrderComponent extends Component {
	constructor(props){
        super(props)
		let pubSub = new Rx.Subject()

        //对可观察者发射的数据500毫秒内只订阅最后一个接受到的
        pubSub.asObservable().debounce(500).subscribe(
            function (x) {
                x()
            },
            function (err) {
                console.log('Error: %s', err);
            })

        this.pubSub = pubSub
    }

  componentDidMount() {
      let maxHeight = $('.admin-guideManage').height() - ($('.admin-guideManage .admin-option').height() + 30) - 23
      this.props.guideManageInitView(maxHeight)
  }

	handleRefresh1() {
	    let maxHeight = $('.admin-guideManage').height() - ($('.admin-guideManage .admin-option').height() + 30) - 23
	    this.props.guideManageInitView(maxHeight)
	}

	handleRefresh2() {
			let maxHeight = $('.admin-guideManage').height() - ($('.admin-guideManage .admin-option').height() + 30) - 23
			this.props.guideManageInitView2(maxHeight)
	}

	handleRefresh3() {
			let maxHeight = $('.admin-guideManage').height() - ($('.admin-guideManage .admin-option').height() + 30) - 23
			this.props.guideManageInitView3(maxHeight)
	}

	guideExport(){
		  this.props.guideExport()
	}
	handleEdit(index, id, keyWords ,isAux) {
		return ()=> {
			this.props.handleEdit1(index, id, keyWords ,isAux)
		}
	}

	handleChange(e){
		let value = e.target.value
		this.pubSub.onNext(() => {
			let	newValue = {keyWords:value,logo:1}
				this.props.guidesearchKeys(newValue)
		})
	}
	getColumns(prefixCls,sTsList,page){
		let obj = {
			1:'客户',
			2:'供应商',
			3:'人员',
			4:'部门',
			5:'项目',
			6:'存货'
		}
		return [
			<Column
				key='sequenceNumber'
				header={(<Cell>序号</Cell>)}
				width={40}
				cell={props=>(
					<Cell>
						{/*(page.currentPage -1) * page.pageSize + 1 + */props.rowIndex + 1}
					</Cell>
				)}
			/>,
			<Column
				key='option'
				header={(<Cell>操作</Cell>)}
				width={80}
				cell={props=>(
					<Cell>
						<Button
							type="dashed"
							onClick={::this.handleEdit(props.rowIndex, sTsList[props.rowIndex].id, sTsList[props.rowIndex].keyWords ,sTsList[props.rowIndex].isAux)}>
							<ZIcon icon="edit" title='编辑'/>
						</Button>
					</Cell>
				)}
			/>,
			<Column
				key='yjCode'
				header={(<Cell>科目编码</Cell>)}
				width={100}
				cell={props=>(
					<Cell>
						<div style={{textAlign:'left'}}>
							{sTsList[props.rowIndex].yjCode}
						</div>
					</Cell>
				)}
			/>,
			<Column
				key='yjName'
				header={(<Cell>科目名称</Cell>)}
				width={200}
				cell={props=>(
					<Cell><div style={{textAlign:'left'}}>{sTsList[props.rowIndex].yjName}</div></Cell>
				)}
			/>,
			<Column
				key='isAux'
				header={(<Cell>辅助核算</Cell>)}
				width={150}
				cell={props=>(
					<Cell>
						<div style={{textAlign:'left'}}>
							{obj[sTsList[props.rowIndex].isAux]}
						</div>
					</Cell>
				)}
			/>,
			<Column
				key='keyWords '
				header={(<Cell>关键字</Cell>)}
				width={410}
				cell={props=>(
					<Cell>
						<div style={{textAlign:'left'}}>
							{sTsList[props.rowIndex].keyWords }
						</div>
					</Cell>
				)}
			/>,
		]
	}
	handleUploadCheange(info){
		this.props.uploadAuthenticationImg(info, this.props.hideLoadingMask)
	}
	handleBeforeUpload(info){
        return new Promise((resolve, reject) => {
			let {setMessage,clearMessage} = this.props,
                fileStrArr = info.name.split('.'),
                fileType =fileStrArr[fileStrArr.length-1].toUpperCase()
            if(fileType=='XLS'||fileType=='XLSX' ) {
				resolve()
                this.props.showLoadingMask({content:'正在上传...'})
            } else {
				reject()
                setMessage ({
					type: 'warning',
                    content: '文件格式错误，请上传文件格式为 xls xlsx的文件',
                    mode: 'message'
                })
            }
        })
    }



	render(){
		let {prefixCls, ...otherProps} = this.props,
			utils = this.props.payload.get('utils'),
			getterByField = utils.get('getterByField'),
			message = this.props.payload.getIn(['global', 'message']),
	    sTsList = getterByField('guideManage.guideKeys').toJS(),
	    height = (sTsList.length) * 50 + 32,
	    appInfo = getterByField('appInfo'),
	    width = 980,
			nowingId = getterByField('guideManageInitView.Id')

		return (
			<div className={`${prefixCls}-guideManage`}>
				<div>
					 <Button type="primary" onClick={::this.handleRefresh1}  className ={ nowingId == 1 ? `${prefixCls}-bagcolor` : null} >2013准则导入2013准则</Button>
					 <Button type="primary" onClick={::this.handleRefresh2}  className={`${prefixCls}-Pleft`} className ={ nowingId == 2 ? `${prefixCls}-bagcolor` : null}>企业会计制度导入2013准则</Button>
					 <Button type="primary" onClick={::this.handleRefresh3}  className={`${prefixCls}-Pleft`} className ={ nowingId == 3 ? `${prefixCls}-bagcolor` : null}>2007准则导入2007准则</Button>
				</div>
				<div className={`${prefixCls}-option`}>
					<Input placeholder={'请输入关键字搜索'} onChange={::this.handleChange}></Input>
					<Button zIcon='refresh' colorStyle='orange' title='刷新' className={`${prefixCls}-function-refresh`} onClick={::this.handleRefresh1} />
					<Button onClick = {::this.guideExport}>导出</Button>
					<Upload
						action={`/v1/fiImport2/daoZhangInput`}
						headers={{ token: getAccessToken() }}
						multiple='false'
						type="primary"
						className='uploadCompoent'
						onChange={::this.handleUploadCheange}
						beforeUpload={::this.handleBeforeUpload}
						showUploadList={false}
					>
						<Button>导入</Button>
					</Upload>
				</div>
				<Table
            rowsCount={sTsList.length}
            rowHeight={50}
            headerHeight={30}
            height={height}
            width={width}>
            {this.getColumns(prefixCls,sTsList)}
        </Table>
			</div>
		)
	}
}
