import React,{ Component,PropTypes } from 'react'
import DynamicComponent from 'dynamicComponent'
import {Button, Table, Column, Cell, Modal,ZIcon,Icon,Pagination} from 'xComponent'
import CreateBigNews from './createBigNews'
import moment from 'moment'

export default class BigNewsManageComponent extends Component {

    handleBigNewsDelete(bigNewsId,ts) {
        return ()=> {
            this.props.bigNewsDeleteOrReleaseCancel(bigNewsId,ts,'isDelete')
        }
    }
    handleBigNewsRelease(bigNewsId,ts) {
        return ()=> {
            this.props.bigNewsRelease(bigNewsId, ts, null, 'isListRelease')
        }
    }

    handleBigNewsReleaseCancel(bigNewsId,ts) {
        return ()=> {
            this.props.bigNewsDeleteOrReleaseCancel(bigNewsId,ts)
        }
    }

    handleBigNewsUpdate(bigNews) {
        return ()=> {
            this.props.bigNewsUpdate(bigNews)
        }
    }
    handleBigNewsAdd() {
        this.props.setAddShow('bigNews')
    }

    handlePageChange(current) {
        this.props.homeInPageChange(current,'bigNews')
    }

    handlePageSizeChange(current, size) {
        this.props.homePageSizeChange(current, size,'bigNews')
    }
    
    render(){
        let utils = this.props.payload.get('utils') ,
            getterByField = utils.get('getterByField'),
            bigNewsList = getterByField('bigNewsList').toJS(),
            bigNewsManageListPage = getterByField('bigNewsManageListPage').toJS(),
            {prefixCls,...otherProps} = this.props,
            isShowCreateBigNews = getterByField('isShowCreateBigNews'),
            height = (bigNewsList.length)*50+32

        height = height > $('.ant-tabs-content-no-animated').outerHeight() - 200? $('.ant-tabs-content-no-animated').outerHeight() - 200  : height
        height = height<32?32:height
        return(
            <div className={`${prefixCls}-homeInfo ${prefixCls}-bigNews`}>
                <div className={`${prefixCls}-homeInfo-table`}>
                    <div className={`${prefixCls}-homeInfo-table-top`}>
                        <div className={`${prefixCls}-homeInfo-header-left`}></div>

                        <div className={`${prefixCls}-homeInfo-header-right`}>
                            <Button type="primary" disabled={this.props.auth!=2} onClick={::this.handleBigNewsAdd}>新增</Button>
                        </div>
                    </div>
                    <Table 
                        rowsCount={bigNewsList.length}
                        rowHeight={50}
                        headerHeight={30}
                        height={height}
                        width={1080}>
                        {this.getColumns(prefixCls,bigNewsList)}
                    </Table>
                    <Pagination 
                        current={bigNewsManageListPage.current} 
                        total={bigNewsManageListPage.total} 
                        pageSize={bigNewsManageListPage.pageSize} 
                        onChange={::this.handlePageChange} 
                        onShowSizeChange = {::this.handlePageSizeChange}
                        showSizeChanger 
                        showQuickJumper
                    />
                </div>
                {this.renderCreateBigNews(isShowCreateBigNews)}
                
            </div>     
        
        )
    }

    getColumns(prefixCls,bigNewsList){
        let utils = this.props.payload.get('utils') ,
            getterByField = utils.get('getterByField'),
            imgUrl = '/v1/img/'

        return [
            <Column
                key='headerLine'
                header={(<Cell>序号</Cell>)}
                width={50}
                cell={props=>(
                    <Cell>
                        {props.rowIndex+1}
                    </Cell>)
                }
            />,
            <Column
                key='updateTime'
                header={(<Cell>头条更新日期</Cell>)}
                width={100}
                cell={props=>(
                    <Cell>
                        {bigNewsList[props.rowIndex].createTime ? bigNewsList[props.rowIndex].createTime.split(' ')[0] : ''}
                    </Cell>
                )}
            />,
            <Column
                key='articleTitle'
                header={(<Cell>文章图片</Cell>)}
                width={100}
                cell={props=>(
                    <Cell>
                        {!!bigNewsList[props.rowIndex].enclosureAddress ? <img src={imgUrl+bigNewsList[props.rowIndex].enclosureAddress} alt="" className='coverPic'/> : ''}
                    </Cell>)
                }
            />,
            <Column
                key='articleTitle'
                header={(<Cell>文章标题</Cell>)}
                width={450}
                cell={props=>(
                    <Cell>
                        <span style={{'whiteSpace': 'nowrap', 'textOverflow': 'ellipsis', 'overflow': 'hidden', 'width': '433', 'display': 'block' }} title={bigNewsList[props.rowIndex].title}>{bigNewsList[props.rowIndex].title}</span>
                    </Cell>)
                }
            />,
            <Column
                key='articleTitle'
                header={(<Cell>文章作者</Cell>)}
                width={100}
                cell={props=>(
                    <Cell>
                        <span style={{'whiteSpace': 'nowrap', 'textOverflow': 'ellipsis', 'overflow': 'hidden', 'width': '83', 'display': 'block' }} title={bigNewsList[props.rowIndex].author}>{bigNewsList[props.rowIndex].author}</span>
                    </Cell>)
                }
            />,
            <Column
                key='operation'
                header={(<Cell>操作</Cell>)}
                width={280}
                cell={props=>(
                    <Cell>
                        <Button 
                            type="dashed"  
                            className={`${prefixCls}-homeInfo-operation-buy`}
                            disabled={this.props.auth!=2}
                            onClick={::this.handleBigNewsUpdate(bigNewsList[props.rowIndex])}
                            style={{marginLeft:4,marginRight:4}}
                            >
                            编辑
                        </Button>
                        
                        <Button 
                            type="dashed"  
                            className={`${prefixCls}-homeInfo-operation-buy`}
                            disabled={this.props.auth!=2}
                            onClick={::this.handleBigNewsDelete(bigNewsList[props.rowIndex].id,bigNewsList[props.rowIndex].ts)}
                            style={{marginLeft:4,marginRight:4}}
                            >
                            删除
                        </Button>
                        
                        {bigNewsList[props.rowIndex].status == 1 ? 
                            <Button 
                                type="dashed"  
                                className={`${prefixCls}-homeInfo-operation-buy`}
                                disabled={this.props.auth!=2}
                                onClick={::this.handleBigNewsReleaseCancel(bigNewsList[props.rowIndex].id,bigNewsList[props.rowIndex].ts)}
                                style={{marginLeft:4,marginRight:4}}
                                >
                                取消发布
                            </Button>
                            :
                            <Button 
                                type="dashed"  
                                className={`${prefixCls}-homeInfo-operation-buy`}
                                disabled={this.props.auth!=2}
                                onClick={::this.handleBigNewsRelease(bigNewsList[props.rowIndex].id,bigNewsList[props.rowIndex].ts)}
                                style={{marginLeft:4,marginRight:4}}
                                >
                                发&emsp;&emsp;布
                            </Button>
                        }
                    </Cell>
                )}
            />

        ]
    }

    renderCreateBigNews(isShowCreateBigNews){
        if(!isShowCreateBigNews) return null
        let handleOkAndRelease = () => {
                this.props.bigNewsRelease(null, null, 1)
            },
            onOk = () => {
                this.props.bigNewsRelease(null, null, 0)
            },
            onCancel = () => {
                this.props.bigNewsCancel()
            },
            footer = [
                <Button key="submit" type="primary" onClick={onOk}>保存</Button>, 
                <Button key="submitAndRelease" type="primary" onClick={handleOkAndRelease}>保存并发布</Button>
               ]


        return (
            <Modal 
                visible
                type ='modal'
                title='头条内容'
                width={600}
                footer={footer}
                onCancel={onCancel}
                maskClosable={false}
                wrapClassName='bigNews-createBigNews'
                >
                <CreateBigNews {...this.props} />
            </Modal>
        )
    }

}