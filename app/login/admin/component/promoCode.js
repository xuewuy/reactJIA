import React,{ Component,PropTypes } from 'react'
import DynamicComponent from 'dynamicComponent'
import {HCFLayout,Button, Tabs, Radio, Table, Column, Cell, Card,Modal,Pagination,ZIcon} from 'xComponent'

export default class promoCodeComponent extends Component {
    componentDidMount() {
        $('.ant-tabs-tabpane-active .admin-operationPlatform').height($('.ant-tabs-tabpane-active').outerHeight()-38)
        let maxHeight = $('.admin-operationPlatform').height() - ($('.admin-operationPlatform .admin-operationPlatform-form').height() + 30)  - ($('.admin-operationPlatform .admin-Pagination').height() + 10) - 23
        this.props.promoCodeInitView(maxHeight)
    }

    /**
     * [hanfleDelPromoCode 删除伙伴价格]
     * @param  {[type]} item [当前选中的伙伴价格]
     */
    hanfleDelPromoCode(item){
        return ()=>{
            this.props.DelPromoCode(item)
        }
    }

    /**
     * [handlePromoCode 新增伙伴价格]
     * @return {[type]} [description]
     */
    handlePromoCode(){
        this.props.addPromoCode()
    }

    /**
     * [handleEditPromoCode 编辑伙伴价格]
     * @param  {[type]} item [当前选中的伙伴价格]
     */
    handleEditPromoCode(item){
        return ()=>{
            this.props.editPromoCode(item)
        }
    }
    
    getColumns(codeList,page){
        let isDisabled = this.props.auth && this.props.auth > 1
        return [
            <Column
                key='name'
                header={(<Cell>序号</Cell>)}
                width={43}
                cell={props=>(
                    <Cell>
                        {(page.currentPage -1) * page.pageSize + 1 + props.rowIndex}
                    </Cell>
                )}
            />,
            <Column
              key='subscibe'
              header={(<Cell>操作</Cell>)}
              width={180}
              cell={props=>(
                <Cell>
                    <Button disabled={!isDisabled} onClick={::this.handleEditPromoCode(codeList.get(props.rowIndex))} style={{marginRight:'10px'}}>编辑</Button>
                    <Button disabled={!isDisabled} onClick={::this.hanfleDelPromoCode(codeList.get(props.rowIndex))}>删除</Button>
                </Cell>
              )}
            />,
            <Column
                key='appName'
                header={(<Cell>伙伴名称</Cell>)}
                width={270}
                cell={props=>(
                  <Cell><div style={{width:'100%',overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap'}} title={codeList.get(props.rowIndex).get('appName')}>{codeList.get(props.rowIndex).get('appName')}</div></Cell>
                )}
            />,
            <Column
                key='productName'
                header={(<Cell>产品名称</Cell>)}
                width={180}
                cell={props=>(
                    <Cell>{codeList.get(props.rowIndex).get('productName')}</Cell>
                )}
            />,
            <Column
                key='saleCode'
                header={(<Cell>优惠码</Cell>)}
                width={120}
                cell={props=>(
                    <Cell>{codeList.get(props.rowIndex).get('saleCode')}</Cell>
                )}
            />,
            <Column
                key='salePrice'
                header={(<Cell>伙伴价格</Cell>)}
                width={155}
                cell={props=>(
                    <Cell>{codeList.get(props.rowIndex).get('salePrice')}</Cell>
                )}
            />,
            <Column
                key='productPrice'
                header={(<Cell>官方标价</Cell>)}
                width={155}
                cell={props=>(
                    <Cell>{codeList.get(props.rowIndex).get('productPrice')}</Cell>
                )}
            />
        ]
    }

    /**
     * [handlePageChange 分页发生改变]
     * @param  {[type]} currentPage [description]
     * @return {[type]}             [description]
     */
    handlePageChange(currentPage){
        this.props.promoCodePageChange(currentPage)
    }

    /**
     * [handlePageSizeChange 页码发生改变]
     * @param  {[type]} currentPage [description]
     * @param  {[type]} pageSize    [description]
     * @return {[type]}             [description]
     */
    handlePageSizeChange(currentPage,pageSize){
        this.props.promoCodePageSizeChange(pageSize)
    }
    
    render(){
        let {prefixCls, ...otherProps} = this.props
        let utils = this.props.payload.get('utils'),
            getterByField = utils.get('getterByField'),
            codeList = getterByField('promoCode.ajaxData'),
            maxHeight = getterByField('promoCode.maxHeight'),
            page = getterByField('promoCode.page').toJS(),
            height = codeList && codeList.size ? (codeList.size) * 50 + 32 : 50,
            tableWidth = '1105px',
            auth = this.props.auth && this.props.auth > 1
        height = height > maxHeight ? maxHeight : height
        return (
            <div className={`${prefixCls}-operationPlatform`} style={{width:tableWidth}}>
                <div className={`${prefixCls}-operationPlatform-form ${prefixCls}-promoCodeBtn`}>
                    <Button type='primary' onClick={::this.handlePromoCode} disabled={auth?false:true}>新增</Button>
                </div>
                <Table 
                    rowsCount={codeList && codeList.size}
                    rowHeight={50}
                    headerHeight={30}
                    height={height}
                    width={tableWidth}>
                    {this.getColumns(codeList,page)}
                </Table>
                <div className={`${prefixCls}-Pagination`}>
                    <Pagination
                        showSizeChanger = {true}
                        showQuickJumper = {true}
                        current={page.currentPage}
                        pageSize = {page.pageSize}
                        total={page.sumCloum}
                        onChange={::this.handlePageChange}
                        onShowSizeChange ={::this.handlePageSizeChange}
                        pageSizeOptions = {['20','50','100','200']}
                    />
                </div>
            </div>
        )
    }
}