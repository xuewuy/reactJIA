import React,{ Component,PropTypes } from 'react'
import DynamicComponent from 'dynamicComponent'
import {Button,ZIcon,Table,Input,Column,Cell,Popover} from 'xComponent'

export default class CreateVersionComponent extends Component {
	componentDidMount(){
		this.props.initCreateVersion()
	}
	hanldeChange(rowIndex) {
		return () => {
			this.props.changeCreateContentItem(rowIndex,e.target.value)
		}
	}
	handleVersionItemDelete(rowIndex) {
		return () => {
			// this.props.versionItemDelete(rowIndex)
		}
	}
	handleVersionItemChange(rowIndex) {
		return (e) => {
			this.props.versionItemChange(rowIndex,e.target.value)
		}
	}
	getColumns(prefixCls,versionContentList) {
		let utils = this.props.payload.get('utils') ,
            getterByField = utils.get('getterByField'),
            page = getterByField('versionPage'),
            pageSize=0,
            current=0
        return [
    		<Column
                key='headerLine'
                header={(<Cell>序号</Cell>)}
                width={35}
                cell={props=>(
                    <Cell>
                    	<p style={{padding:'8px'}}>
                        	{props.rowIndex+1}
                        </p>
                    </Cell>)
                }
            />,
    		<Column
    			key='mtype'
    			header={(<Cell>详情信息</Cell>)}
    			width={310}
    			cell={props=>(
    				<Cell>
    					<Input value={versionContentList[props.rowIndex].item===undefined?'':versionContentList[props.rowIndex].item} 
							onChange={::this.handleVersionItemChange(props.rowIndex)}
							maxLength={80}
						/>
    				</Cell>
    			)}
    		/>,
    		<Column
    			key='operation'
    			flexGrow={1}
    			header={(<Cell>操作</Cell>)}
    			width={50}
    			cell={props=>(
    				<Cell>
    					
    					<Button 
    						type="dashed"  
    						className={`${prefixCls}-version-operation-buy`}
                            onClick={::this.handleVersionItemDelete(props.rowIndex)}
                            disabled={(versionContentList[props.rowIndex].status==1)?true:false}
                            style={{marginLeft:4,marginRight:4}}
                            title = '删除'
                            className='deleteBtn'
    						>
    						<ZIcon icon='remove' />
    					</Button>
    					
    				</Cell>
    			)}
    		/>

    	]
	}

	handleRowClick(e, rowIndex){
		let curElmName = e.target.tagName
		if(curElmName!='I'&&curElmName!='BUTTON') {

			this.props.createVersionTable(e, rowIndex)
		} else {
			this.props.versionItemDelete(rowIndex)
		}
		// this.props.onEvent('fixedGirdRowClick', rowIndex)
	}
	getContent() {
		let utils = this.props.payload.get('utils') ,
            getterByField = utils.get('getterByField'),
            versionContentList = getterByField('createVersion.versionContentList').toJS()
        return (<div>
        	{::this.getItems(versionContentList)}
        </div>)
	}
	getItems(items) {
		let i=0
		return items.map(o=> {
			if(o.item!==undefined) {

				i++

				return (<p><span>{i}、</span><span>{o.item}</span></p>)
			}
		})
	}
	render(){
		let {prefixCls, ...otherProps} = this.props
		let utils = this.props.payload.get('utils'),
			getterByField = utils.get('getterByField'),
			path_ = 'admin.createVersion',
			versionContentList = getterByField('createVersion.versionContentList').toJS()
		return (
			<div className={`${prefixCls}-createVersion`}>
				<DynamicComponent className={`${prefixCls}-createVersion-form`} _path={path_} {...otherProps} />
				<span style={{marginLeft:'25px',marginRight:'8px'}} className='versionInfoTitle'>版本更新说明 : </span>
				<Table 
	                rowsCount={versionContentList.length}
					rowHeight={30}
	                headerHeight={0}
	    			height={100}
	    			width={395}
					onRowClick={::this.handleRowClick}
	    			>
	    		    {this.getColumns(prefixCls,versionContentList)}
				</Table>
				<div className='previewBtn'>
					<Popover content={::this.getContent()}>
						<Button type="primary">预览</Button>
					</Popover>
				</div>
			</div>
		)
	}
}
				// <DynamicComponent className={`${prefixCls}-createVersion-form`} _path={path_} {...otherProps} />
				// <DynamicComponent className={`${prefixCls}-createVersion-content`} _path='admin.versionContent' {...otherProps} />