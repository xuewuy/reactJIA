import React from 'react'
import {Modal as Modal1 ,Icon, Button} from 'xComponent'
import {Modal} from 'dynamicComponent'
const confirm = Modal1.confirm

import Top from './component/top'
import BottomLeft from './component/bottomLeft'
import BottomRight from './component/bottomRight'

import './style.less'


export default class GettingStartedForAdminComponent extends React.Component {
	static defaultProps = {
        prefixCls: 'gettingStartedForAdmin'
    }

    constructor(props){
        super(props)
        this.handleTabClose = this.handleTabClose.bind(this)
        this.handleTabFocus = this.handleTabFocus.bind(this)
        this.handleOpenDept = this.handleOpenDept.bind(this)
        this.handleOpenAccSubjects = this.handleOpenAccSubjects.bind(this)
        this.handleOpenCustomer = this.handleOpenCustomer.bind(this)
        this.handleOpenVendor = this.handleOpenVendor.bind(this)
        this.handleOpenAccount = this.handleOpenAccount.bind(this)
        this.handleOpenJournalAccount = this.handleOpenJournalAccount.bind(this)
        this.handleShowWaterAccountVideo = this.handleShowWaterAccountVideo.bind(this)
    }

    componentDidMount() {
        if( this.props.appParams['isFromMenu'] != 'true')
    	   this.props.addEventListener && this.props.addEventListener('onTabClose', this.handleTabClose)
        this.props.addEventListener && this.props.addEventListener('onTabFocus', this.handleTabFocus)
        this.props.initView(this.props.initData,this.props.auth,this.props.menuIds)
    }

    componentWillUnmount() {
        if( this.props.appParams['isFromMenu'] != 'true')
            this.props.removeEventListener && this.props.removeEventListener('onTabClose')
        
        this.props.removeEventListener && this.props.removeEventListener('onTabFocus')
    }

    handleTabFocus(){
        this.props.initView(this.props.initData,this.props.auth,this.props.menuIds)
    }

    handleTabClose(url){
    	let that = this
    	confirm({
    		title: '提示',
    		content: '下次登录不再显示操作流程?',
    		okText:'是',
    		cancelText:'否',
    		onOk() {
                that.props.close()
    			that.props.removeEventListener && that.props.removeEventListener('onTabClose')
    			setTimeout( ()=>{that.props.onDelTab(url)} , 50)
    		},
    		onCancel() {
    			that.props.removeEventListener && that.props.removeEventListener('onTabClose')
    			setTimeout( ()=>{that.props.onDelTab(url)} , 50)
    		},
  		});
    	return false
    }

    handleOpenDept(){
    	this.props.onAddTab('部门人员', `apps/systemSetting/deptPerson/deptPerson`, {})
    }
    handleOpenAccSubjects(){
        this.props.onAddTab('科目及期初', `apps/fi/accSubjects/accSubjects`, {})
    }
    handleOpenCustomer(){
    	this.props.onAddTab('基础档案', `apps/systemSetting/basicFileMaintenance?tab=true`, {judgeBasicFiles:{judgeTabsContent:'customerArchive', judgeTabsValue:'0'}})
    }

    handleOpenVendor(){
    	this.props.onAddTab('基础档案', `apps/systemSetting/basicFileMaintenance?tab=true`, {judgeBasicFiles:{judgeTabsContent:'vendor', judgeTabsValue:'1'}})
    }

    handleOpenAccount(){
    	this.props.onAddTab('基础档案', `apps/systemSetting/basicFileMaintenance?tab=true`, {judgeBasicFiles:{judgeTabsContent:'bankAccount', judgeTabsValue:'6'}})
    }

    handleOpenJournalAccount(){
        let getterByField = this.props.payload.getIn(['utils','getterByField'])
        this.props.onAddTab('流水账', `apps/acm/richardTicket/card`)
    }

    handleShowWaterAccountVideo(){
        let that = this
        this.props.setMessage({
                type: 'app',
                title: '如何记录流水账视频',
                content: 'app:apps/common/video?height=550&width=978&videoUrl=http://videos.rrtimes.com/yijiacaishui.mp4',
                refName: 'showWaterAccountVideo',
                wrapClassName: 'showWaterAccountVideo',
                width:978,
                onCancel: function() {
                    that.props.clearMessage()
                }
        })
    }

    render() {
        if(this.props._isCurrentTab === false) 
            return null
        if (!this.props.payload || !this.props.payload.get('utils'))  
            return null
        let message = this.props.payload.getIn(['global', 'message']),
            {prefixCls, ...otherProps} = this.props,
            getterByField = this.props.payload.getIn(['utils','getterByField']),
            roles = this.props.appParams['role'].split(','),
            person = getterByField('person'),
            customer = getterByField('customer'),
            vendor = getterByField('vendor'),
            account = getterByField('account'),
            bank = getterByField('bank'),
            taxUrlOne = getterByField('taxUrlOne'),
            appInfo = getterByField('initData')

        return (
            <div className={prefixCls}>
                <Top 
                    {...this.props} 
                    roles={roles}
                    taxUrlOne = {taxUrlOne}
                />
                <div className={`${prefixCls}-bottom`}>
                    <BottomLeft 
                        {...this.props} 
                        roles={roles}
                    />
                    <BottomRight 
                        {...this.props} 
                        roles={roles}
                    />
                </div>
                {Modal(message)}
            </div>
        )
    }
}