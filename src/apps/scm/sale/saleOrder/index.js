import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import DynamicComponent from 'dynamicComponent'
import { Modal } from 'dynamicComponent'
import { Popover, Card, Checkbox, Input, Button, ButtonGroup, Table, Column, Cell, Menu, Dropdown, Icon,Select,DropDownDisplay, DropDownSelect} from 'xComponent'
import * as action from './action'
import * as api from './api'
import defaultComponentFactory from 'defaultComponentFactory'
import './saleOrder.less'
import * as consts from '../../utils/consts'
import { fromJS, List} from 'immutable'
import { AppLoader }  from 'appLoader'
const DropdownButton = Dropdown.Button


export default class SaleOrderComponent extends Component {
    static defaultProps = {
        prefixCls: 'saleorder'
    }

    constructor(props){
        super(props)
        this.handleShowImage = this.handleShowImage.bind(this)
        this.handelAcceptAdjunctList = this.handelAcceptAdjunctList.bind(this)
        let vtitle='销售单'
        if(props.initData && props.initData.stype){
            if(props.initData.stype=='rejected'){
                vtitle='销售退货单'
            }
        }
        this.state={
            voucherTitle:vtitle
        }
    } 

    componentDidMount() {
        //注册当前应用特有组件
        defaultComponentFactory.registerComponent('DropDownDisplay',DropDownDisplay)
        defaultComponentFactory.registerComponent('DropDownSelect',DropDownSelect)
        //注册onTabFocus事件
        if(this.props.addEventListener){
            this.props.addEventListener('onTabFocus', ::this.onTabFocus)
            this.props.addEventListener('onTabAdd', ::this.onTabAdd)            
        }
        this.props.initView(this.props.initData)
        let thisStub = this
        setTimeout(()=> {
            let win = ReactDOM.findDOMNode(thisStub.refs.voucher)
            if (win) {
                if (win.addEventListener) {
                    win.addEventListener('keydown', ::thisStub.handleKeyDown, true)
                } else if (win.attachEvent) {
                    win.attachEvent('keydown', ::thisStub.handleKeyDown)
                } else {
                    win.onKeyDown = ::thisStub.handleKeyDown
                }
            }
        }, 0)
    }

    shouldComponentUpdate(nextProps) {
        for(var o in this.props){
            if(this.props[o] != nextProps[o]){
                return true
            }
        }
        return false
        // return !this.props.payload || this.props.payload !== nextProps.payload
    }
    componentWillUnmount() {
        let win = ReactDOM.findDOMNode(this.refs.voucher)//.getElementByClassName(this.props.prefixCls)[0]
        this.props.removeEventListener('onTabFocus')
        this.props.removeEventListener('onTabAdd')
        if (win) {
            if (win.removeEventListener) {
                win.removeEventListener('keydown', ::this.handleKeyDown, true)
            } else if (win.detachEvent) {
                win.detachEvent('keydown', ::this.handleKeyDown)
            } else {
                win.onKeyDown = undefined
            }
        }
    }

    //当前app的tab页被点击
    onTabFocus() {
        this.props.onTabFocus()
    }

    //onAddTab的事件
    // 其他模块调用addTab激活该模块时, 可能需要根据initData来刷新界面数据
    onTabAdd(props) {
        this.props.activeByAddTab(props && props.initData)
    }


    handleKeyDown(e) {
        if (e.ctrlKey && !e.altKey && (e.key == 's' || e.keyCode == 83)) {  //保存
            this.props.save()

            if (e.preventDefault)
                e.preventDefault()
            if (e.stopPropagation)
                e.stopPropagation()
        }
        else if (e.ctrlKey && e.altKey && (e.key == 's' || e.keyCode == 83)) { //保存并新增
            this.props.saveAndNew()

            if (e.preventDefault)
                e.preventDefault()
            if (e.stopPropagation)
                e.stopPropagation()
        }
        else if (e.ctrlKey && !e.altKey && (e.key == "ArrowLeft" || e.keyCode == 37)) {  //上一张
            this.props.loadPrivVoucher()
        }
        else if (e.ctrlKey && !e.altKey && (e.key == "ArrowRight" || e.keyCode == 39)) {  //下一张
            this.props.loadNextVoucher()
        }
        else if(e.key=='ArrowUp' || e.keyCode ==38){
            //上键
            this.props.toTargetCell(api.ARROWUP)
        }
        else if(e.key=='ArrowDown' || e.keyCode ==40){
            //下键
            this.props.toTargetCell(api.ARROWDOWN)
        }
        else if(e.key == "ArrowLeft"  || e.keyCode == 37){ //左键
            let selectedText = window.getSelection().toString(),
                cursorPosition = this.getCursorPosition(e.target),
                getter = this.props.payload.getIn(['utils','getter']),
                focusField = getter(null, 'focusField')

            if(!e.target.value ||
               (selectedText && selectedText.length == e.target.value.length) ||
               cursorPosition == 0 ||
               focusField.indexOf('voucher.voucherBody.inventoryService') != -1){
                this.props.toTargetCell(api.ARROWLEFT)
            }
        }
        else if(e.key == "ArrowRight"  || e.keyCode == 39){ //右键
            let selectedText = window.getSelection().toString(),
                cursorPosition = this.getCursorPosition(e.target),
                getter = this.props.payload.getIn(['utils','getter']),
                focusField = getter(null, 'focusField')

            if(!e.target.value ||
               (selectedText && selectedText.length == e.target.value.length) ||
               cursorPosition == e.target.value.length ||
               focusField.indexOf('voucher.voucherBody.inventoryService') != -1){
                this.props.toTargetCell(api.ARROWRIGHT)
            }
        }
    }
    getCursorPosition(target){
        let oTxt1 = target
        let cursorPosition=-1

        if(oTxt1.selectionStart != undefined){//非IE浏览器
            cursorPosition= oTxt1.selectionStart
        }else{//IE
            if(document.selection){
                let range = document.selection.createRange()
                range.moveStart("character",-oTxt1.value.length)
                cursorPosition=range.text.length
            }
        }

        return cursorPosition
    }
    handlePriv() {
        this.props.loadPrivVoucher()
    }

    handleNext() {
        this.props.loadNextVoucher()
    }

    handleSaveAndNew() {
        this.props.saveAndNew()
    }

    handleSave() {
        this.props.save()
    }

    handleNew() {
        this.props.newVoucher()
    }

    handleAttachmentClick() {
        this.props.attachmentManage()
    }

    handleGridBlur() {
        this.props.handleGridBlur()
    }

    getPopoverContainer () {
        return document.getElementById('saleorder-voucher')
    }
    
    handleMenuClick(e) {
        if (e.key == 'useTemplate') {
            this.props.useTemplate()
        }
        else if (e.key == 'saveAsTemplate') {
            this.props.saveAsTemplate()
        }
        else if (e.key == 'verify') {
            this.props.verify()
        }
        else if (e.key == 'antiVerify') {
            this.props.antiVerify()
        }
        else if(e.key=='generateVoucher'){
           
            this.props.generateVoucher(this.props.onAddTab)
        }
        else if (e.key == 'delete') {
            this.props.del(() => {
                this.props.onDelTab('apps/scm/sale/saleOrder')
            })
        }
        else if (e.key == 'voucherList') {
            this.props.onAddTab('销售单列表', 'apps/scm/sale/saleList')
        }
    }
    handlePrint(){
        this.props.print()
    }
    handleEvent(eventName, option) {
        let getterByField = this.props.payload.getIn(['utils', 'getterByField']),
            docSourceTypeId = getterByField('voucherData.voucherHeader.docSourceTypeId'),
            sourceVoucherId = getterByField('voucherData.voucherHeader.sourceVoucherId')
        if (eventName == 'onScrollEnd' && option.path == 'voucher.voucherBody') {
            this.setState({voucherBodyScrollY: option.y})  //记录滚动的位置,来计算"插入"和"删除"按钮的位置
        }else if(eventName === 'onLinkClick') {
            if (option.path == 'voucher.voucherHeader.formItems.attachCount'){
                this.handleShowImage()
            }else{
                this.props.onEvent(eventName, option)
            }
		}
        this.props.onEvent(eventName, option)
    }
	
    handleShowImage() {
        let {setMessage, clearMessage, payload} = this.props,
            getterByField = payload.getIn(['utils', 'getterByField']),
            album = getterByField('voucherData.album')

        setMessage({
            type: 'app',
            title: '',
            content: 'app:apps/common/accessory',
            okText: '确定',
            width: 1000,
            refName: 'accessory',
            wrapClassName: 'accessory',
            initData: {album, isEdit: true},
            onCancel: ()=>{ clearMessage() },
            onOk:(data) => {
                clearMessage()
                if(data.result) {
                    this.props.upload(data.filesList)
                }
            }
        })
    }

    getFooterComponentInstances(preReceivePayAmount,overdraftAmount,editStatus,voucherStatus,stype){
        let getterByField = this.props.payload.getIn(['utils', 'getterByField']),
            hasCustomer = getterByField('voucherData.voucherHeader.customer')
        if(preReceivePayAmount=='' && overdraftAmount=='' || !hasCustomer || stype=='rejected') {
            return{
                labelAfterMoney:<label></label>
            }
        }
        else if(preReceivePayAmount>0 && !!hasCustomer){
            let receivePayAmount=parseFloat(preReceivePayAmount).toFixed(2),
                settlementAmount=parseFloat(getterByField('voucherData.voucherFooter.settlementAmount')).toFixed(2),
                balance=receivePayAmount-settlementAmount,
                settleReadOnly=balance>=0
            this.props.setSettleReadOnly(settleReadOnly,receivePayAmount)
            if(editStatus==1){
                return{
                    labelAfterMoney:<label className={'lblStyle'}>余额<span className={'greenStyle'}>¥{receivePayAmount}</span>元
                    {settlementAmount!='NaN'?
                    ((balance>=0)?
                    <span ref='settlemoney'>(<span>¥{settlementAmount}</span>元用于本次折扣)</span>:
                    <span ref='settlemoney'>(<span>¥{receivePayAmount}</span>元用于本次折扣)</span>)
                    :''
                    }
                    </label>
                }
            }
            else{
                return{
                    labelAfterMoney:((balance>=0)?
                    <span ref='settlemoney'>(<span>¥{settlementAmount}</span>元用于本次折扣)</span>:
                    <span ref='settlemoney'>(<span>¥{receivePayAmount}</span>元用于本次折扣)</span>)
                }
            }
        }
        else if((preReceivePayAmount=='' || preReceivePayAmount ==0) && overdraftAmount>0 && !!hasCustomer){
            let draftAmount=parseFloat(overdraftAmount).toFixed(2)
            if(editStatus==1){
                return{
                    labelAfterMoney:<span><label className={'spaceStyle'}></label><label className={'lblStyle'}>欠款<span className={'redStyle'}>¥{draftAmount}</span>元</label></span>
                }
            }
            return{
                labelAfterMoney:<label></label>
            }
        }
        else{
            return{
                labelAfterMoney:<label></label>
            }
        }       
    }
	
    handleLoadAccessory() {
        let {setMessage, clearMessage, payload} = this.props,
            getterByField = payload.getIn(['utils', 'getterByField']),
            album = getterByField('voucherData.album')
        
        setMessage({
            type: 'app',
            title: '',
            content: 'app:apps/common/accessory',
            okText: '确定',
            width: 1000,
            refName: 'accessory',
            wrapClassName: 'accessory',
            initData: {album, isEdit: true},
            onCancel: ()=>{ clearMessage() },
            onOk:(data) => {
                clearMessage()
                if(data.result) {
                    this.props.upload(data.filesList)
                }
            }
        })
    }
	
    getComponentInstances() {
        return {
            uploadImage: <a onClick={::this.handleLoadAccessory} style={{marginLeft: 30}}>上传</a>
        }
    }

    render() {
        if(this.props._isCurrentTab === false) return null
        if (!this.props.payload || !this.props.payload.get('utils'))  return null

        let message = this.props.payload.getIn(['global', 'message']),
            {prefixCls, ...otherProps} = this.props,
            getterByField = this.props.payload.getIn(['utils', 'getterByField']),
            getter = this.props.payload.getIn(['utils', 'getter']),
            stype=this.props.initData ==null ?'':this.props.initData.stype,
            content = this.getContent()

        let code = getterByField('voucherData.voucherHeader.code'),
            preReceivePayAmount = getterByField('voucher.voucherFooter.formItems.prePayment') || '',//预收款
            overdraftAmount = getterByField('voucher.voucherFooter.formItems.overdraftAmount') || '',//欠款
            makerName = getterByField('voucherData.voucherHeader.maker') || '',
            auditorName = getterByField('voucherData.voucherHeader.auditor') || '',
            voucherSource = getterByField('voucherData.voucherHeader').get('voucherSource') || '',
            mouseHoverRow = getterByField('mouseHoverRow'),
            delIconStyle = {},
            editStatus = getterByField('editStatus'),
            voucherStatus = getterByField('voucherData.voucherHeader.state'),            
            delText = '删除',
			isPopoverVisible = getterByField('voucherData.form.isVisible'),
			adjunctSize = getterByField('voucherData.form.adjunctSize')
        if(voucherSource){
            delText = '驳回'
        }else{
            delText = '删除'
        }
        //控制删除按钮的是否显示+显示位置: header高度 + 2*borderWidth + (row高度 + 1) * 行数 - 滚动后顶部的y值
        if (mouseHoverRow) {
            let top = api.GRID_HEADER_HEIGHT + 2 + api.GRID_ROW_HEIGHT * mouseHoverRow.get('rowIndex') - (this.state.voucherBodyScrollY ? this.state.voucherBodyScrollY : 0)
            delIconStyle = {top: top, position: 'relative'}
        }
        else {
            delIconStyle = {display: 'none'}
        }

        //根据行数,显示grid高度
        let voucherItemCount = getterByField('voucherData.voucherItems').size,
            gridHeight = api.GRID_HEADER_HEIGHT + 2 + api.GRID_ROW_HEIGHT * voucherItemCount + api.GRID_FOOTER_HEIGHT,
            gridContainerStyle = {display: 'flex', height: gridHeight}

        //根据行数,控制右下角按钮是否显示
        let isShowRightBottom = voucherItemCount >=6
        let getMoreMenu = (editStatus, voucherStatus) => {
            if (voucherStatus == action.STATUS_VOUCHER_AUDITED) {
                return (
                    <Menu onClick={::this.handleMenuClick}>
                        <Menu.Item key="antiVerify">反审核</Menu.Item>
                        <Menu.Item key="delete" disabled>{delText}</Menu.Item>
                        <Menu.Item key="voucherList">销售单列表</Menu.Item>
                        <Menu.Item key="generateVoucher">生成销售退货单</Menu.Item>
                    </Menu>
                )
            }
            else {
                return (
                    <Menu onClick={::this.handleMenuClick}>
                        <Menu.Item key="verify" disabled={editStatus != action.STATUS_VIEW}>审核</Menu.Item>
                        <Menu.Item key="delete" disabled={editStatus != action.STATUS_VIEW || voucherStatus == action.STATUS_VOUCHER_WRITEOFF}>{delText}</Menu.Item>
                        <Menu.Item key="voucherList">销售单列表</Menu.Item>
                        <Menu.Item key="generateVoucher" disabled={editStatus != action.STATUS_VIEW}>生成销售退货单</Menu.Item>
                    </Menu>
                )
            }
        }
        
        let selectStyle = {minWidth: '150px'}
            
        return (
            //{Modal(message)}的父容器,不能设置ref,否则confirm框打开后,无法关闭,因此多加一层div
            <div className={this.props.prefixCls}>
                <div ref="voucher" id={`${prefixCls}-voucher`} className={`${prefixCls}-voucher`}>
                    <Card>
                        <div className={`${prefixCls}-top`}>
                            <div className={`${prefixCls}-top-left-div`}>
                                {
                                    //翻页按钮
                                    <ButtonGroup className={`${prefixCls}-top-left`}>
                                        <Button type="primary" onClick={::this.handlePriv}>{'<'}</Button>
                                        <Button type="primary" onClick={::this.handleNext}>{'>'}</Button>
                                    </ButtonGroup>
                                }
                                 {
                                    voucherStatus == action.STATUS_VOUCHER_AUDITED ?
                                    <img className={`${prefixCls}-audited-icon`} src={require("./img/audited.png")}
                                    alt=""/> : ''
                                }
                            </div>
                            <div className={`${prefixCls}-top-right-div`}>
                            {
                                //新增状态
                                editStatus == action.STATUS_ADD ? <div>
                                    <Button type="primary" onClick={::this.handleSave} className={`${prefixCls}-top-right`}>保存</Button>
                                    <Button type="primary" onClick={::this.handleSaveAndNew} className={`${prefixCls}-top-right`}>保存并新增</Button>
                                    <Dropdown overlay={getMoreMenu(editStatus, voucherStatus)}>
									<Button type="primary" className={`${prefixCls}-top-right`}>更多<Icon type="down" /></Button>
                                    </Dropdown>
                                </div> : ''
                            }
                            {
                                //编辑状态
                                editStatus == action.STATUS_EDIT ? <div>
                                    <Button type="primary" onClick={::this.handleSave} className={`${prefixCls}-top-right`}>保存</Button>
                                    <Button type="primary" onClick={::this.handleNew} className={`${prefixCls}-top-right`}>新增</Button>
                                    <Dropdown overlay={getMoreMenu(editStatus, voucherStatus)}>
									<Button type="primary" className={`${prefixCls}-top-right`}>更多<Icon type="down" /></Button>
                                    </Dropdown>
                                </div> : ''
                            }
                            {
                                //查看状态
                                editStatus == action.STATUS_VIEW ?
                                    (voucherStatus == action.STATUS_VOUCHER_AUDITED ?
                                        <div>
                                            <Button type="primary" onClick={::this.handleNew} className={`${prefixCls}-top-right`}>新增</Button>
                                            <Dropdown overlay={getMoreMenu(editStatus, voucherStatus)}>
											<Button type="primary" className={`${prefixCls}-top-right`}>更多<Icon type="down" /></Button>
                                            </Dropdown>
                                        </div>
                                        :
                                        <div>
                                            <Button type="primary" onClick={::this.handleSave} className={`${prefixCls}-top-right`} disabled>保存</Button>
                                            <Button type="primary" onClick={::this.handleNew} className={`${prefixCls}-top-right`} >新增</Button>
                                            <Dropdown overlay={getMoreMenu(editStatus, voucherStatus)}>
											<Button type="primary" className={`${prefixCls}-top-right`}>更多<Icon type="down" /></Button>
                                            </Dropdown>
                                        </div>)
                                    : ''
                            }
                             <Button 
                                type="ghost" 
                                type="primary" 
                                title='打印' 
                                className={`${prefixCls}-function-print`} 
                                icon='search' 
                                onClick={::this.handlePrint} />
                            </div>
                        </div>

                        <div className={`${prefixCls}-title`}>
                            <span>{this.state.voucherTitle}</span>
                        </div> 
                        
                        <div className={`${prefixCls}-header`} id={`${prefixCls}-voucher-header`}>
                            <DynamicComponent {...otherProps} onEvent={::this.handleEvent}
							componentInstances={this.getComponentInstances()}
                                              _path="voucher.voucherHeader"/>
                            <Popover placement="bottom" content={content}  getTooltipContainer={::this.getPopoverContainer} trigger="click" visible={isPopoverVisible}  onVisibleChange={::this.handleIsVisible} >
                                <div className={`${prefixCls}-adjunct`}>附件:<span>{adjunctSize}</span></div>
                            </Popover>
                        </div>

                        <div className={`${prefixCls}-body`} onBlur={::this.handleGridBlur}>
                            <div className={`${prefixCls}-body-container-div`} style={gridContainerStyle}>
                                <DynamicComponent {...otherProps} _path="voucher.voucherBody" onEvent={::this.handleEvent}/>
                            </div>
                        </div>

                        <div className={`${prefixCls}-footer`}>
                            <label>制单人：{makerName}</label>
                            <label>审核人：{auditorName}</label>
                        </div>                    
                    </Card>
                     <div className={`${prefixCls}-stitle`}>
                        <span>结算情况</span>
                     </div>
                     <hr className={`${prefixCls}-line`} />
                     <div className={`${prefixCls}-header`}>
                        <DynamicComponent componentInstances={this.getFooterComponentInstances(preReceivePayAmount,overdraftAmount,editStatus,voucherStatus,stype)} {...otherProps}  _path="voucher.voucherFooter"/>
                        <div className={`${prefixCls}-footer-right-div`}>
                            {
                                //新增状态
                                (editStatus == action.STATUS_ADD && isShowRightBottom) ?
                                    <div>
                                        <Button type="primary" onClick={::this.handleSave} className={`${prefixCls}-footer-right`}>保存</Button>
                                        <Button type="primary" onClick={::this.handleSaveAndNew} className={`${prefixCls}-footer-right`}>保存并新增</Button>
                                    </div> : ''
                            }

                            {
                                //编辑状态
                                (editStatus == action.STATUS_EDIT && isShowRightBottom) ?
                                    <div>
                                        <Button type="primary" onClick={::this.handleSave} className={`${prefixCls}-footer-right`}>保存</Button>
                                        <Button type="primary" onClick={::this.handleNew} className={`${prefixCls}-footer-right`}>新增</Button>
                                    </div> : ''
                            }
                        </div>
                    </div>
                </div>
               
                {Modal(message)}
            </div>
        )
    }
    
        //填写附件管理的界面
    getContent() {
        let {prefixCls, ...otherProps} = this.props,
            getterByField = this.props.payload.getIn(['utils', 'getterByField']),
			appPath = 'apps/common/adjunct',
            refName = 'adjunct',
			isSaleOrder = {voucherStatus:getterByField('voucherData.voucherHeader.state')},
            initData = {album:getterByField('voucherData.form.album'), isSaleOrder:isSaleOrder},
            id = getterByField('voucherData.voucherHeader.id'),
            app =<AppLoader path={appPath} ref={refName} currentId={id} initData={initData} adjunctEvent={this.handelAcceptAdjunctList}/>
        //div初始化一个宽度,与即将加载的apploader里同款, 避免apploader异步加载完后, popover整体偏
        return (
            <div style={{width: '250px'}}>
                {app}
            </div>
        )
    }
    
	handelAcceptAdjunctList(adjunctList, addFileList) {
		this.props.upload(adjunctList, addFileList)
	}
	
    handleIsVisible(v) {
        let {prefixCls, ...otherProps} = this.props,
            getterByField = this.props.payload.getIn(['utils', 'getterByField']),
			isShowPic = $('.viewer-in'),
			isDelFiles = $('.ant-modal-mask'),
            isShowThumbnail = $('.adjunct').find('.ant-popover-open')
			
        if(!!isShowPic.length || !!isDelFiles.length || !!isShowThumbnail.length){
            this.props.visibleChange(true)
        }else{
            this.props.visibleChange(v)
        }
    }

}