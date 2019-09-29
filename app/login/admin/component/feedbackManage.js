import React,{ Component,PropTypes } from 'react'
import DynamicComponent from 'dynamicComponent'
import {Button, Table, Column, Cell, Modal,ZIcon,Icon,Pagination} from 'xComponent'
import moment from 'moment'

export default class C extends Component {
    static defaultProps = {
        prefixCls: 'feedback'
    }
    componentDidMount(){
        this.props.getFeedbackData()
    }
    render(){
		let utils = this.props.payload.get('utils') ,
			getterByField = utils.get('getterByField'),
            message = this.props.payload.getIn(['global', 'message']),
			{prefixCls,...otherProps} = this.props,
            feedbackData = getterByField('feedbackData')


        if(!feedbackData) return null

        let feedbackList = feedbackData.toJS().list,
            feedbackPage = feedbackData.toJS().page,
            height = (feedbackList.length)*50+32

        height = height > $('.ant-tabs-content-no-animated').outerHeight() - 200? $('.ant-tabs-content-no-animated').outerHeight() - 200  : height
        height = height<32?32:height

		return(
			<div className={`${prefixCls}-feedback-home`}>
                <div className={`${prefixCls}-table-top`}>
                    <div className={`${prefixCls}-header-left`}></div>

                    <div className={`${prefixCls}-header-right`}>
                        <Button type="primary" onClick={()=>{this.handleRefesh(feedbackPage)}}>刷新</Button>
                    </div>
                </div>
                <Table
                    rowsCount={feedbackList.length}
                    rowHeight={50}
                    headerHeight={30}
                    height={height}
                    width={900}>
                    {this.getColumns(feedbackList)}
                </Table>
                <Pagination
                    current={feedbackPage.currentPage}
                    total={feedbackPage.sumCloum}
                    pageSize={feedbackPage.pageSize}
                    onChange={::this.handlePageChange}
                    onShowSizeChange = {::this.handlePageSizeChange}
                    showSizeChanger
                    showQuickJumper
                />
  			</div>
    	)
	}
    getColumns(feedbackList){
        return [
            <Column
                key='headerLine'
                header={(<Cell>序号</Cell>)}
                width={80}
                cell={props=>(
                    <Cell>
                        {props.rowIndex+1}
                    </Cell>)
                }
            />,
            <Column
    			key='createTime'
    			header={(<Cell>消息更新日期</Cell>)}
    			width={180}
    			cell={props=>(
    				<Cell>
    					{feedbackList[props.rowIndex].time ? feedbackList[props.rowIndex].time.split(' ')[0] : ''}
    				</Cell>
    			)}
    		/>,
            <Column
    			key='mobile'
    			header={(<Cell>账号</Cell>)}
    			width={180}
    			cell={props=>(
    				<Cell>
    					{feedbackList[props.rowIndex].phone||''}
    				</Cell>
    			)}
    		/>,
            <Column
    			key='content'
    			header={(<Cell>反馈内容</Cell>)}
    			width={460}
    			cell={props=>(
    				<Cell >
                        <div style={{"wordBreak":"break-all"}} title = {feedbackList[props.rowIndex].content||''}>
                        {feedbackList[props.rowIndex].content||''}
                        </div>

    				</Cell>
    			)}
    		/>
        ]
    }
    handleHomeTabClick(e){
        this.props.saveHomeType(e)
    }
    handleRefesh(feedbackPage){
        this.props.getFeedbackData({
            page:{
                currentPage:feedbackPage.currentPage,
                pageSize:feedbackPage.pageSize
            }
        })
    }
    handlePageChange(currentPage){
        this.props.getFeedbackData({page:{currentPage}})
        //
    }
    handlePageSizeChange(currentPage, pageSize){
        this.props.getFeedbackData({page:{currentPage,pageSize}})
        //
    }

}
