import React, { Component,PropTypes } from 'react'
import DynamicComponent, { Modal } from 'dynamicComponent'
import {Button, Table, ZIcon, Column, Cell, Input, Pagination} from 'xComponent'
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
        let maxHeight = $('.admin-sTSManage').height() - ($('.admin-sTSManage .admin-option').height() + 30) - 23
        this.props.sTSManageInitView(maxHeight)
    }
	
	handleReFresh() {
		this.props.sTSManageReFresh()
	}
	
	handleRefresh1() {
        let maxHeight = $('.admin-sTSManage').height() - ($('.admin-sTSManage .admin-option').height() + 30) - 23
        this.props.sTSManageInitView(maxHeight)
	}
	
    handlePageChange(e){
        this.props.sTSManagePageChange(e)
    }
	
    handlePageSizeChange(e,size){
        this.props.sTSManagePageSizeChange(size)
    }
	
	handleEdit(index, keys, code, extKeys1) {
		return ()=> {
			this.props.handleEdit(index, keys, code, extKeys1)
		}
	}
	
	handleChange(e){
		let value = e.target.value
		this.pubSub.onNext(() => {
			this.props.searchKeys(value)
		})
	}
	
	getColumns(prefixCls,sTsList,page){
		if(sTsList.length) {
			sTsList.map(o => {
				o.keys1 = [], o.extKeys1 = []
				if(o.keys.length > 1) {
					o.keys.map((x, i) => {
						if(x) {
							if(i < (o.keys.length - 1)){
								o.keys1.push(x + '/')
							} else {
								o.keys1.push(x)
							}
						}
					})
				} else {
					o.keys1 = o.keys
				}
				if(o.extKeys && o.extKeys.length > 1) {
					o.extKeys.map((x, i) => {
						if(x) {
							if(i < (o.extKeys.length - 1)){
								o.extKeys1.push(x + '/')
							} else {
								o.extKeys1.push(x)
							}
						}
					})
				} else {
					o.extKeys1 = o.extKeys
				}
			})
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
							onClick={::this.handleEdit(props.rowIndex, sTsList[props.rowIndex].keys, sTsList[props.rowIndex].businessCode, sTsList[props.rowIndex].extKeys1)}>
							<ZIcon icon="edit" title='编辑'/>
						</Button>
					</Cell>
				)}
			/>,
			<Column
				key='businessCode'
				header={(<Cell>业务编码</Cell>)}
				width={100}
				cell={props=>(
					<Cell>{sTsList[props.rowIndex].businessCode}</Cell>
				)}
			/>,
			<Column
				key='businessName'
				header={(<Cell>业务名称</Cell>)}
				width={200}
				cell={props=>(
					<Cell>{sTsList[props.rowIndex].name}</Cell>
				)}
			/>,
			<Column
				key='keyword'
				header={(<Cell>关键字</Cell>)}
				width={280}
				cell={props=>(
					<Cell>{sTsList[props.rowIndex].keys1}</Cell>
				)}
			/>,
			<Column
				key='extKeyword'
				header={(<Cell>推荐关键字</Cell>)}
				width={280}
				cell={props=>(
					<Cell>{sTsList[props.rowIndex].extKeys1}</Cell>
				)}
			/>,
		]
	}

	render(){
		let {prefixCls, ...otherProps} = this.props,
			utils = this.props.payload.get('utils'),
			getterByField = utils.get('getterByField'),
			message = this.props.payload.getIn(['global', 'message']),
            sTsList = getterByField('sTSManage.allManualKeys').toJS(),
            sTSManage = getterByField('sTSManage').toJS(),
            height = (sTsList.length) * 50 + 32,
            appInfo = getterByField('appInfo'),
            width = 980/*appInfo ? 1080 : 1180*/
		
		
        height = height > sTSManage.maxHeight ? sTSManage.maxHeight : height
		
		return (
			<div className={`${prefixCls}-sTSManage`}>
				<div className={`${prefixCls}-option`}>
					<Input placeholder={'请输入关键字搜索'} onChange={::this.handleChange}></Input>
					<Button zIcon='refresh' colorStyle='orange' title='刷新' className={`${prefixCls}-function-refresh`} onClick={::this.handleRefresh1} />
					<Button onClick={::this.handleReFresh}>全部重新生成</Button>
				</div>
				<Table
                    rowsCount={sTsList.length}
                    rowHeight={50}
                    headerHeight={30}
                    height={height}
                    width={width}>
                    {this.getColumns(prefixCls,sTsList,undefined/*sTSManage.form.page*/)
                    }
                </Table>
			</div>
		)
	}
}
               /* <div className={`${prefixCls}-Pagination`}>
                    <Pagination
                        showSizeChanger
                        showQuickJumper
                        current={sTSManage.form.page.currentPage}
                        pageSize = {sTSManage.form.page.pageSize}
                        total={sTSManage.total}
                        onChange={::this.handlePageChange}
                        onShowSizeChange ={::this.handlePageSizeChange}
                        pageSizeOptions = {[20,50,100,200]}
                    />
                </div>*/