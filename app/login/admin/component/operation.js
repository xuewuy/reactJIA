import React, { Component,PropTypes } from 'react'

import DynamicComponent from 'dynamicComponent'
import {HCFLayout,Button, Tabs, Radio, Table, Column, Cell, Card,Pagination} from 'xComponent'
import defaultComponentFactory from 'defaultComponentFactory'

export default class operationComponent extends React.Component {
	 
    handleEditClientClick(rowIndex){
        return ()=>{ 
            this.props.showEditClient(rowIndex)
        }
    }
    handleRemoveOperation(rowIndex){
        return ()=>{ 
            this.props.showRemoveOperation(rowIndex)
        }
    }
    handleAdded(){
        this.props.showEditClient()
    }
    handleDel(){
        this.props.showRemoveOperation()
    }
    handlePageChange(e){
        this.props.operationPageChange(e)
    }
    handlePageSizeChange(e,size){
        this.props.operationPageSizeChange(size)
    }
    getColumns(prefixCls,userList,page){
        return [
            <Column
                key='index'
                header={(<Cell>序号</Cell>)}
                width={45}
                cell={props=>(
                    <Cell>
                        {(page.currentPage -1) * page.pageSize + 1 + props.rowIndex}
                    </Cell>
                )}
            />,
            <Column
                key='phone'
                header={(<Cell>手机号</Cell>)}
                width={200}
                cell={props=>(
                    <Cell>{userList.get(props.rowIndex).get('phone')}</Cell>
                )}
            />,
            <Column
                key='user'
                header={(<Cell>用户名称</Cell>)}
                width={180}
                cell={props=>(
                    <Cell>{userList.get(props.rowIndex).get('user')}</Cell>
                )}
            />,
            <Column
                key='friend'
                header={(<Cell>伙伴名称</Cell>)}
                width={180}
                cell={props=>(
                    <Cell>{userList.get(props.rowIndex).get('friend')}</Cell>
                )}
            />,
            <Column
                key='role'
                header={(<Cell>角色</Cell>)}
                width={190}
                cell={props=>(
                    <Cell>{userList.get(props.rowIndex).get('role')}</Cell>
                )}
            />,
            <Column
                key='operation'
                flexGrow={1}
                header={(<Cell>操作</Cell>)}
                width={180}
                cell={props=>(
                  <Cell>
                      <Button 
                          type="dashed"  
                          className={`${prefixCls}-partner-operation-buy`}
                          onClick={::this.handleEditClientClick(props.rowIndex)}
                          style={{marginLeft:4,marginRight:4}}
                          disabled={this.props.auth!=2}
                          >
                          编辑
                      </Button>
                    
                      <Button 
                          type="dashed"  
                          className={`${prefixCls}-partner-operation-buy`}
                          onClick={::this.handleRemoveOperation(props.rowIndex)}
                          style={{marginLeft:4,marginRight:4}}
                          disabled={this.props.auth!=2}
                          >
                          删除
                      </Button>
                    
                  </Cell>
                )}
              />
        ]
    }
  getAdd(){
      if(this.props.auth==2){
          return(<Button type='primary' onClick={::this.handleAdded} disabled={this.props.auth!=2}>新增</Button>)
      }
  }
	render(){
      let {prefixCls, ...otherProps} = this.props
      let utils = this.props.payload.get('utils'),
          getterByField = utils.get('getterByField'),
          userList = getterByField('operationList'),
          paging = getterByField('paging').toJS(),
          clientHeight = document.body.clientHeight,
          userListHeight = (userList.size) * 50 + 32,
          operationMaxHeight = clientHeight-230,
          height = userListHeight > operationMaxHeight ? operationMaxHeight:userListHeight

          
		return(
			
			<div className={`${prefixCls}-operation`}>

              <div className={`${prefixCls}-operation-head`}>
                  <div>
                      {this.getAdd()}
                  </div>
              </div>
      				<div className={`${prefixCls}-operation-body`}>
                  <Table 
                      rowsCount={userList.size}
                      rowHeight={50}
                      headerHeight={30}
                      height={height}
                      width={975}>
                      {this.getColumns(prefixCls,userList,paging)
                      }
                  </Table>
              </div>
           	  <Pagination
                  showSizeChanger = {true}
                  showQuickJumper
                  current={paging.currentPage}
                  pageSize = {paging.pageSize}
                  total={paging.total}
                  onChange={::this.handlePageChange}
                  onShowSizeChange ={::this.handlePageSizeChange}
                  pageSizeOptions = {['20','50','100','200']}
              />               
			</div>
		)
	}
}
 