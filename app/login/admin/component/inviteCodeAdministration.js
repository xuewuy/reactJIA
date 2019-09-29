import React,{ Component,PropTypes } from 'react'
import DynamicComponent from 'dynamicComponent'
import {HCFLayout,Button, Tabs, Radio, Table, Column, Cell, Card,Modal,Pagination, Tree,TreeNode, Checkbox,Upload, CountDownButton, Menu, Dropdown,DropdownButton} from 'xComponent'
import ImportCustomerError from './importCustomerError'

export default class inviteCodeAdministrationComponent extends Component {
    componentDidMount() {
        $('.ant-tabs-tabpane-active .admin-operationPlatform').height($('.ant-tabs-tabpane-active').outerHeight())
        let maxHeight = $('.admin-operationPlatform').height() - ($('.admin-operationPlatform .admin-operationPlatform-form').height() + 30)  - ($('.admin-operationPlatform .admin-Pagination').height() + 10) - 23
        let width = $('.admin-operationPlatform').width() - 208
        
        this.props.inviteCodeAdministrationInitView(maxHeight,width,undefined,this.props.auth)
    }
    handleQueryClick(maxHeight){
        return ()=>{
            this.props.inviteCodeAdministrationInitView(maxHeight)
        }
    }
    handleAnalyzeExportClick(){
        this.props.inviteCodeAdministrationExportClick()
    }
    
    handleinviteAmount(rowIndex){

    }
    handlePageChange(e){
        this.props.inviteCodeAdministrationPageChange(e)
    }
    handlePageSizeChange(e,size){
        this.props.inviteCodeAdministrationPageSizeChange(size)
    }
    handleAddSubPartner() {
        let {clearMessage, setMessage} = this.props,
            getterByField = this.props.payload.getIn(['utils', 'getterByField']),
            curId = getterByField('curId'),
            parentId = getterByField('parentId'),
            curLevel = getterByField('curLevel'),
            leftTree = getterByField('leftTree').toJS(),
            messageTitle = 'aaaa',
            firstLevelStatusDisabled = false
            
        let firstLevelObj,firstLevelName,firstLevelId,curIndex,secondLevelName
        if(curLevel ===1) {

            leftTree.map( item => {
                if(item.id == curId) {
                    firstLevelObj = item
                    firstLevelName = item.name
                    firstLevelId = item.id//
                    //
                    if(item.status == 1) {
                        firstLevelStatusDisabled = true
                    }
                    if(!item.subDepts||(item.subDepts&&item.subDepts.length==0)) {
                        secondLevelName=firstLevelName+'001'//
                    } else {
                        curIndex = (item.subDepts.length+1)+''
                        if(curIndex.length==1) {
                            curIndex = '00'+curIndex
                        } else if(curIndex.length==2) {
                            curIndex = '0'+curIndex
                        }
                        secondLevelName=firstLevelName+curIndex//
                        
                    }
                }
            })
        } else if(curLevel ===2) {
            leftTree.map( item => {
                if(item.id == parentId) {
                    firstLevelObj = item
                    firstLevelName = item.name
                    firstLevelId = item.id//

                    if(item.subDepts.length==0) {
                        curIndex ='001'
                    } else {

                        curIndex = (parseInt( item.subDepts[item.subDepts.length-1].name.replace( item.subDepts[item.subDepts.length-1].parentName,'') )+1 ) +''
                    }
                   
                    if(curIndex.length==1) {
                        curIndex = '00'+curIndex
                    } else if(curIndex.length==2) {
                        curIndex = '0'+curIndex
                    }
                    secondLevelName=firstLevelName+curIndex//
                        
                }
            })
        } else {
            return setMessage({
                type: 'warning',
                content: '请先选择左侧伙伴或伙伴下级',
                mode: 'message'
            })
        }
        if(firstLevelStatusDisabled) {
            return setMessage({
                type: 'warning',
                content: '该伙伴不能添加下级',
                'mode': 'message'
            })
        }
        // this.props.addSubPartner({'parentId':firstLevelId,'name':secondLevelName,'smallPrice':0,'commonlyPrice':0})
        setMessage({
            type: 'app',
           title: '增加二级伙伴',
           content: 'app:apps/login/admin/setDiscountAmount',
           wrapClassName:'setDiscountAmountWrap',
           width: 410,
           initData: {isLeft: true,isEdit:false,'firstLevelId':firstLevelId,'secondLevelName':secondLevelName},
           refName: 'setDiscountAmount',
           onCancel: ()=> {
               clearMessage()
           },
           onOk: (cb)=> {          
               clearMessage()
            //    this.props.addSubPartner(cb.params)
               this.props.addSubPartner(cb.value)
               
           }
        })	
    }
    handleEditSubPartner() {
        let {clearMessage, setMessage} = this.props,
            getterByField = this.props.payload.getIn(['utils', 'getterByField']),
            curId = getterByField('curId'),
            parentId = getterByField('parentId'),
            curLevel = getterByField('curLevel'),
            leftTree = getterByField('leftTree').toJS(),
            messageTitle = 'aaaa'
            
        let firstLevelObj,firstLevelName,firstLevelId,curIndex,secondLevelName,expireTime,secondLevelId,smallPrice,commonlyPrice
        if(curLevel ===1) {
            return setMessage({
                type: 'warning',
                content: '请先选择左侧伙伴下级',
                mode: 'message'
            })
        } else if(curLevel ===2) {
            leftTree.map( item => {
                if(item.id == parentId) {
                    firstLevelObj = item
                    firstLevelName = item.name
                    firstLevelId = item.id//
                    
                    item.subDepts.map( subItem => {
                        if(subItem.id == curId) {
                            secondLevelName = subItem.name
                            secondLevelId = subItem.id
                            smallPrice = subItem.smallPrice
                            commonlyPrice = subItem.commonlyPrice
                            expireTime = subItem.expireTime
                        }
                    })
                        
                }
            })
        } else {
            return setMessage({
                type: 'warning',
                content: '请先选择左侧伙伴或伙伴下级',
                mode: 'message'
            })
        }
        setMessage({
            type: 'app',
            title: '编辑二级伙伴',
            content: 'app:apps/login/admin/setDiscountAmount',
            wrapClassName:'setDiscountAmountWrap',
            width: 410,
            initData: {isLeft: true,isEdit:true,'secondLevelId':secondLevelId,'smallPrice':smallPrice,'commonlyPrice':commonlyPrice, 'secondLevelName':secondLevelName,'expireTime':expireTime},
            refName: 'setDiscountAmount',
            onCancel: ()=> {
                clearMessage()
            },
            onOk: (cb)=> {          
                clearMessage()
                // this.props.updateLeftTreeItem(cb.params)
                this.props.updateLeftTreeItem(cb.value)
                
            }
        })	
    }
    handleDelSubPartner() {
        let {clearMessage, setMessage} = this.props,
        getterByField = this.props.payload.getIn(['utils', 'getterByField']),
        curId = getterByField('curId'),
        parentId = getterByField('parentId'),
        curLevel = getterByField('curLevel')

        setMessage({
            type: 'confirm',
            title: '删除',
            content: '确定删除该记录?',
            onCancel: ()=> {
              clearMessage()
            },
            onOk: ()=> {
              clearMessage()
              this.props.delSubPartner(curId)
            }
        })
        
    
    }

    handleBeforeUploadClick(info) {
        return new Promise((resolve, reject) => {
            let {setMessage,clearMessage} = this.props,
                getterByField = this.props.payload.getIn(['utils', 'getterByField']),
                fileStrArr = info.name.split('.'),
                fileType =fileStrArr[fileStrArr.length-1]

            if(fileType=='xls'||fileType=='xlsx') {
            } else {
                return setMessage ({
                    type: 'warning',
                    content: '请选择正确格式单据',
                    mode: 'message'
                })
            }
            
            //未上传,直接返回
            this.props.showLoadingMask({content:'正在上传...'})
            resolve()
            return
        })
    }

    handleImportTemplet(info){
        let {setMessage,clearMessage} = this.props
        if(info.file.status != 'uploading')
        if (info.file.status === 'uploading') {
        }
        if (info.file.status === 'done') {
            try
            {
                this.props.hideLoadingMask()
                if(info.file.response) {
                    if(typeof info.file.response.value == 'object'&&(info.file.response.value.list&&info.file.response.value.list.length)) {
                        this.props.importImportInviceCodeError(info.file.response.value)
                    } else {
                        this.props.importImportInviceCode(info.file.response)
                    }
                }
            }
            catch(e){
                this.props.hideLoadingMask()
                throw e
            }
        }
        else if (info.file.status === 'error') {
            this.props.hideLoadingMask()
            return setMessage({
                type:'error',
                mode:'message',
                content:`${info.file.name} 上传失败`
            })
        }
    }
    handleQueryListClick() {
        this.props.queryInviteCodeList()
    }
    handleExportClick() {
        this.props.exportInviteCode()
    }
    handleExportTemplateClick() {
        this.props.exportInviteCodeTemplate()
    }
    handleDelItemsClick() {
        let {clearMessage, setMessage} = this.props,
            utils = this.props.payload.get('utils'),
            getterByField = utils.get('getterByField'),
            list = getterByField('inviteCode.ajaxData').toJS(),
            params = []
        list.map(o=>{
            if(o.select) {
                params.push({
                    id: o.id
                })
            }
        })
        if(params.length==0) {
            return setMessage({
                type: 'warning',
                content: '请选中要删除的信息',
                mode: 'message'
            })
        }
        setMessage({
            type: 'confirm',
            title: '删除',
            content: '确定删除选中记录?',
            onCancel: ()=> {
              clearMessage()
            },
            onOk: ()=> {
              clearMessage()
              this.props.delInviteItems(params)
            }
        })
    }
    handleSendInviteCodesClick(e) {
        this.props.sendInviteCodes()
        
    }

    handleMenuClick(e){
        if(e.key == 'exportCustomer') {
            this.props.exportInviteCode()
        }
        if(e.key == 'exportTemplate') {
            this.props.exportInviteCodeTemplate()
        }
    }
    handleNoSendClick() {
        let {clearMessage, setMessage} = this.props
        setMessage({
            type: 'warning',
            content: '请选中要发送的信息',
            mode: 'message'
        })
    }
    render(){
        
        let {prefixCls, ...otherProps} = this.props
        let utils = this.props.payload.get('utils'),
            getterByField = utils.get('getterByField'),
            inviteCodeList = getterByField('inviteCode.ajaxData'),
            allSelectState = getterByField('allSelectState'),
            height = (inviteCodeList.size) * 50 + 32,
            maxWidth = getterByField('inviteCode.maxWidth'),
            inviteCode = getterByField('inviteCode').toJS(),
            leftTree = getterByField('leftTree'),
            auth = this.props.auth && this.props.auth > 1,
            multipleFalse = false,
            appId = getterByField('curId'),
            actionUrl = `/v1/regCode/batchImport?appId=${appId}`,
            curLevel = getterByField('curLevel'),
            isImportCustomerError =getterByField('inviteCode.isImportCustomerError'),
            getMenu = (
                <Menu onClick={::this.handleMenuClick} disabled={this.props.auth!=2}>
                    <Menu.Item key="exportCustomer" disabled={this.props.auth!=2}>导出客户</Menu.Item>
                    <Menu.Item key="exportTemplate" disabled={this.props.auth!=2}>模板下载</Menu.Item>
                </Menu>
            ),
            getMenu2 = (
                <Menu onClick={::this.handleMenuClick} disabled={this.props.auth!=2}>
                    <Menu.Item key="exportTemplate" disabled={this.props.auth!=2}>模板下载</Menu.Item>
                </Menu>
            ),
            canSend = false

        inviteCodeList.toJS().map(o=> {
            if(o.select==true) {
                canSend = true
            }
        })
            
        let allSelectBStr 
            if(allSelectState==1||allSelectState==2||!allSelectState) {
                allSelectBStr = false
            } else if(allSelectState == 3) {
                allSelectBStr = true
                
            }
        height = height > inviteCode.maxHeight ? inviteCode.maxHeight : height
        return (
            <div className={`${prefixCls}-operationPlatform ${prefixCls}-inviteCodeAdministration`}  style={{ height: '100%' }}>
                <div className={`${prefixCls}-inviteCodeAdministration-top`}>
                	<div className={`${prefixCls}-inviteCodeAdministration-left`}>
                		<Card title='伙伴邀请码' extra={
    	            		<div>
    	            			<Button type='ghost' shape="circle" icon="plus" onClick={::this.handleAddSubPartner} className={`${prefixCls}-left-add`}  disabled={this.props.auth!=2} />
    	            			<Button type='ghost' shape="circle" icon="edit" onClick={::this.handleEditSubPartner} disabled={curLevel===1||this.props.auth!=2} className={`${prefixCls}-left-edit`}/>
    	            			<Button type='ghost' shape="circle" icon="cross" onClick={::this.handleDelSubPartner} disabled={curLevel===1||this.props.auth!=2} className={`${prefixCls}-left-del`}/>
    	        			</div>
                		} >
                            
                            <DynamicComponent {...otherProps} _path="admin.leftTree"/>
        	   			</Card>
            	   	</div>
            	   	<div className={`${prefixCls}-inviteCodeAdministration-main`}>
            	   		<Card>
                            <div  className={`${prefixCls}-inviteCodeAdministration-main-top`}>
                                <div  className={`${prefixCls}-inviteCodeAdministration-main-top-left`}>
                                    <DynamicComponent {...otherProps} _path="admin.invitateCodeForm" />
                                </div>
                                <div  className={`${prefixCls}-inviteCodeAdministration-main-top-right`}>
                                    <Button type='primary' onClick={::this.handleQueryListClick} className={`${prefixCls}-inviteCodeAdministration-top-btn`} title='查询'>查询</Button>
                                    
                                    
                                    {curLevel===1?<span>
                                        <Button title='导出客户'  type="primary" onClick={::this.handleExportClick} style={{'marginLeft':'10px'}}  disabled={this.props.auth!=2}>导出客户</Button>
                                        <DropdownButton overlay={getMenu2} type="primary"  className='import-btn' disabled={this.props.auth!=2}>
                                        </DropdownButton>
                                    </span>:<span>
                                        <Upload
                                            action={actionUrl}
                                            onChange={::this.handleImportTemplet}
                                            headers= {{token:getAccessToken()}}
                                            beforeUpload={::this.handleBeforeUploadClick}
                                            multiple={multipleFalse}
                                            type="primary"
                                            disabled={this.props.auth!=2}
                                            {...{showUploadList:false}}>
                                            <Button  type="primary" className='import-btn' style={{'marginLeft':'0px'}}  disabled={this.props.auth!=2}>导入客户</Button>
                                        </Upload>
                                        <DropdownButton overlay={getMenu} type="primary"  className='import-btn' disabled={this.props.auth!=2}>
                                        </DropdownButton>
                                    </span>}
                                    {canSend?<CountDownButton type='primary' onClick={::this.handleSendInviteCodesClick} className={`${prefixCls}-inviteCodeAdministration-top-btn`} text='发送邀请码' count={20} title='发送邀请码'  disabled={this.props.auth!=2}/>:
                                    <Button type='primary' onClick={::this.handleNoSendClick} className={`${prefixCls}-inviteCodeAdministration-top-btn`} title='发送邀请码' disabled={this.props.auth!=2}>发送邀请码</Button>}
                                    <Button type='primary' onClick={::this.handleDelItemsClick} className={`${prefixCls}-inviteCodeAdministration-top-btn`} title='删除客户和账套' disabled={this.props.auth!=2}>删除</Button>
                                </div>
                            </div>
                            <div  className={`${prefixCls}-inviteCodeAdministration-main-bottom`}>
                                <DynamicComponent {...otherProps} _path="admin.invitateCodeGrid" />
                            </div>
            	   		</Card>
            	   	</div>
                </div>
                <div className={`${prefixCls}-inviteCodeAdministration-footer`}>
                    <Pagination
                        showSizeChanger = {true}
                        showQuickJumper
                        current={inviteCode.from.page.currentPage}
                        pageSize = {inviteCode.from.page.pageSize}
                        total={inviteCode.total}
                        onChange={::this.handlePageChange}
                        onShowSizeChange ={::this.handlePageSizeChange}
                        pageSizeOptions = {['20','50','100','200']}
                    />
                </div>
                {::this.rendImportCustomerError(isImportCustomerError)}
            </div>        
        )
    }

    rendImportCustomerError(isImportCustomerError){
        if (!isImportCustomerError) return null

        let onCancel = () => { this.props.queryInviteCodeList() },
            utils = this.props.payload.get('utils'),
            getterByField = utils.get('getterByField')

        return (
            <Modal
                visible
                type='modal'
                title=''
                width={380}
                okText='知道了'
                onCancel={onCancel}
                closable={true}
                maskClosable={false}
                footer={<div>
                    <Button onClick={onCancel}>知道了</Button>
                </div>}
            >
                <ImportCustomerError {...this.props} />
            </Modal>
        )
    }

    renderTreeNode(leftTree) {
        let displayMember = 'name',
    		valueMember = 'id',
    		childrenMember = 'subDepts'

    	let ret =  leftTree.map((item) => {
	    	let children = item.get(childrenMember),
                disabled = false,
                disabledKeys = [],
                v = item.get(valueMember),
                l = item.get(displayMember),
                isShow = item.get('isShow')

            if(isShow === false) return null
            if(disabledKeys){
                disabled = [].findIndex(o=>item.get(valueMember) == o ) != -1
            }

		    if (children) {
		        return (
			        <TreeNode 
                        key={v} 
                        title={l}
                        disabled={disabled}>
			            {this.renderTreeNode(children)}
			        </TreeNode>
		        )
      		}
      		return (<TreeNode 
                className='z-tree-leaf' 
                key={v} 
                title={l} 
                isLeaf disabled={disabled} 
            />)
    	})
        let retNew = []
        ret.forEach(o=>{
            if(o)
                retNew.push(o)
        })
        return retNew
    }
}