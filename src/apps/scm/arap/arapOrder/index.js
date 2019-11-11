import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import DynamicComponent from 'dynamicComponent'
import { Modal } from 'dynamicComponent'
import { Popover, Card, Checkbox, Input, Button, ButtonGroup, Table, Column, Cell, Menu, Dropdown, Icon,Select } from 'xComponent'
import * as action from './action'
import * as api from './api'
import './arapOrder.less'
import * as consts from '../../utils/consts'
import { fromJS, Map,List} from 'immutable'
import { AppLoader } from 'appLoader'
const DropdownButton = Dropdown.Button


export default class ArapOrderComponent extends Component {
    static defaultProps = {
        prefixCls: 'araporder',
        voucherTitle:'收款单'
    }
    
    constructor(props){
        super(props)
        this.handleShowImage = this.handleShowImage.bind(this)
        this.handelAcceptAdjunctList = this.handelAcceptAdjunctList.bind(this)
    } 

    componentDidMount() {
        //注册onTabFocus事件
        if(this.props.addEventListener){
            this.props.addEventListener('onTabFocus', ::this.onTabFocus)
            this.props.addEventListener('onTabAdd', ::this.onTabAdd)
            
        }
        this.props.initView(this.props.initData)
    }

    shouldComponentUpdate(nextProps) {
        for(var o in this.props){
            if(this.props[o] != nextProps[o]){
                return true
            }
        }
        return false
    }
    componentWillUnmount() {
        let win = ReactDOM.findDOMNode(this.refs.voucher)
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
    
    handleShowAccessory() {
        this.props.showAccessory()
    }

    getPopoverContainer () {
        return document.getElementById('araporder-voucher')
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
                this.props.onDelTab('apps/scm/arap/arapOrder')
            })
        }
        else if (e.key == 'voucherList') {
            this.props.onAddTab('收款单列表', 'apps/scm/arap/arapList')
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
        }
        else if(eventName=='onLinkClick'){
            if (option.path.indexOf('voucher.voucherBody.cancelVoucherCode') != -1) {
                let rowIndex =option.path.split(',')[1]
                this.props.showDetailsVoucher(this.props.onAddTab,rowIndex)
            }else if (option.path == 'voucher.voucherHeader.formItems.attachCount'){
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
            content = this.getContent()

        let code = getterByField('voucherData.voucherHeader.code'),
            customer=getterByField('voucherData.voucherHeader.customerList') || '',//客户
            makerName = getterByField('voucherData.voucherHeader.maker') || '',
            auditorName = getterByField('voucherData.voucherHeader.auditor') || '',
            voucherSource = getterByField('voucherData.voucherHeader').get('voucherSource') || '',
            showStatus = getterByField('showStatus'),
            editStatus = getterByField('editStatus'),
            voucherStatus = getterByField('voucherData.voucherHeader.state'),
            preReceivePayAmount=isNaN(getterByField('voucherData.voucherHeader.preReceivePayAmount'))?'':parseFloat(getterByField('voucherData.voucherHeader.preReceivePayAmount')).toFixed(2) || '',
            isEnableSumVisible = getterByField('voucherData.form.isEnableSumVisible'),
            delText = '删除',
			isPopoverVisible = getterByField('voucherData.adjunctInfo.isVisible'),
			adjunctSize = getterByField('voucherData.adjunctInfo.adjunctSize')
        let customerId=''
        if(Map.isMap(customer)){
            customerId=customer.get('id')
        }
        if(voucherSource){
            delText = '驳回'
        }else{
            delText = '删除'
        }

        //根据行数,显示grid高度
        let voucherItemCount = getterByField('voucherData.voucherItems').size,
            gridHeight = api.GRID_HEADER_HEIGHT + 2 + api.GRID_ROW_HEIGHT * voucherItemCount + api.GRID_FOOTER_HEIGHT,
            gridContainerStyle = {display: 'flex', height: gridHeight},
            imgHeight = `${prefixCls}-imgHeight`

        //根据行数,控制右下角按钮是否显示

        if(!voucherItemCount){
            //如果没有明细，隐藏合计行
            //this.props.setTotalRowVisible(false)
        }

        if(showStatus) {
            imgHeight = `${prefixCls}-imgHeight`
        } else {
            if(customerId == '' || customerId==undefined) {
                imgHeight = `${prefixCls}-imgHeight1`
            }else if(customerId != '' && voucherItemCount == 0) {
                imgHeight = `${prefixCls}-imgHeight2`
            }
        }
        
        // if(customerId == '' || customerId==undefined) {
        //     imgHeight = `${prefixCls}-imgHeight1`
        // }else if(customerId != '' && voucherItemCount == 0) {
        //     imgHeight = `${prefixCls}-imgHeight2`
        // }

        let getMoreMenu = (editStatus, voucherStatus) => {
            if (voucherStatus == action.STATUS_VOUCHER_AUDITED) {
                return (
                    <Menu onClick={::this.handleMenuClick}>
                        <Menu.Item key="antiVerify">反审核</Menu.Item>
                        <Menu.Item key="delete" disabled>{delText}</Menu.Item>
                        <Menu.Item key="voucherList">收款单列表</Menu.Item>
                    </Menu>
                )
            }
            else {
                return (
                    <Menu onClick={::this.handleMenuClick}>
                        <Menu.Item key="verify" disabled={editStatus != action.STATUS_VIEW}>审核</Menu.Item>
                        <Menu.Item key="delete" disabled={editStatus != action.STATUS_VIEW}>{delText}</Menu.Item>
                        <Menu.Item key="voucherList">收款单列表</Menu.Item>
                    </Menu>
                )
            }
        }
        //控制底部合计行的显隐
        let isEnableSumVisibleClassName = isEnableSumVisible ? (`${prefixCls}-voucher`) : (`${prefixCls}-voucher ${prefixCls}-isEnableSumVisible`)
           
        return (
            //{Modal(message)}的父容器,不能设置ref,否则confirm框打开后,无法关闭,因此多加一层div
            <div className={this.props.prefixCls}>
                <div ref="voucher" id={`${prefixCls}-voucher`} className={isEnableSumVisibleClassName}>
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
                                    <img className={`${prefixCls}-audited-icon`} src={require("../../sale/saleOrder/img/audited.png")}
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
                                    <Button type="primary" onClick={::this.handleSave} className={`${prefixCls}-top-right`} >保存</Button>
                                    <Button type="primary" onClick={::this.handleNew} className={`${prefixCls}-top-right`} >新增</Button>
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
                            <span>{this.props.voucherTitle}</span>
                        </div>
                        
                        <div className={`${prefixCls}-header`}>
                            <DynamicComponent {...otherProps}  onEvent={::this.handleEvent} 
							 componentInstances={this.getComponentInstances()} 
                                              _path="voucher.voucherHeader"/>
                            <Popover placement="bottom" content={content}  getTooltipContainer={::this.getPopoverContainer} trigger="click" visible={isPopoverVisible}  onVisibleChange={::this.handleIsVisible} >
                                <div className={`${prefixCls}-adjunct`}>附件:<span>{adjunctSize}</span></div>
                            </Popover>
                        </div>
                        <hr className={`${prefixCls}-line`} />
                        <div className={`${prefixCls}-stitle`}>
                            <span>待收款交易</span>
                        </div>
                        <div className={`${prefixCls}-body`} onBlur={::this.handleGridBlur}>
                            <div className={`${prefixCls}-body-container-div`} style={gridContainerStyle}>
                                <DynamicComponent {...otherProps} _path="voucher.voucherBody" onEvent={::this.handleEvent}/>
                            </div>
                        </div>
                        <div className={imgHeight}>
                        {
                            (editStatus == action.STATUS_ADD && (customerId==undefined || customerId==''))?                            
                            <div className={`${prefixCls}-body-container-img`}><img className={`${prefixCls}-tips-nocustomer`} src={require("./img/s1.png")} alt=""/></div>:
                            (voucherItemCount==0&&!showStatus)?
                            <div className={`${prefixCls}-body-container-img2`}><img className={`${prefixCls}-tips-hascustomer`} src={require("./img/s2.png")} alt=""/><span className={`${prefixCls}-tips-number`}>¥{preReceivePayAmount}</span></div>:
                            ''
                        }
                        </div>

                        <div className={`${prefixCls}-footer`}>
                            <label>制单人：{makerName}</label>
                            <label>审核人：{auditorName}</label>
                        </div>                    
                    </Card>
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
			isArapOrder = {voucherStatus:getterByField('voucherData.voucherHeader.state')},
            initData = {album:getterByField('voucherData.adjunctInfo.album'), isArapOrder:isArapOrder},
            id = getterByField('voucherData.voucherHeader.id'),
            app =<AppLoader path={appPath} ref={refName} currentId={id} initData={initData} adjunctEvent={this.handelAcceptAdjunctList}/>
        //div初始化一个宽度,与即将加载的apploader里同款, 避免apploader异步加载完后, popover整体偏
        return (
            <div style={{width: '250px'}}>
                {app}
            </div>
        )
    }
    
	handelAcceptAdjunctList(adjunctList) {
		this.props.upload(adjunctList)
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