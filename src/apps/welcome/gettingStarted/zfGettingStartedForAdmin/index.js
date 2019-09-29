import React from 'react'
import {Modal as Modal1 ,Icon, Button} from 'xComponent'
import {Modal} from 'dynamicComponent'
const confirm = Modal1.confirm

import './style.less'


export default class ZfGettingStartedForAdminComponent extends React.Component {
	static defaultProps = {
        prefixCls: 'zfGettingStartedForAdmin'
    }

    constructor(props){
        super(props)
        this.handleTabClose = this.handleTabClose.bind(this)
        this.handleTabFocus = this.handleTabFocus.bind(this)
        this.handleOpenZfCompany = this.handleOpenZfCompany.bind(this)
        this.handleOpenNewAccSubjects = this.handleOpenNewAccSubjects.bind(this)
        this.handleOpenZfPerson = this.handleOpenZfPerson.bind(this)
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

    handleOpenZfCompany(){
    	this.props.onAddTab('企业管理', `iframe://apps/zfjg/index.html#/zf-root/zf-company-list`, {})
    }
    handleOpenNewAccSubjects(){
        this.props.onAddTab('科目管理', `apps/fi/accSubjects/newAccSubjects`, {})
    }
    handleOpenZfPerson(){
    	this.props.onAddTab('集团管理人员', `iframe://apps/zfjg/index.html#/zf-root/zf-person-list`, {})
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
                <div className={`${prefixCls}-wrapper`}>
                    <h2>你好，欢迎使用账无忌集团版</h2>
                    <div className={`${prefixCls}-center`}>
                        <div className={`${prefixCls}-text`}>
                            <div className="flow1">
                                <span className="bg">1</span>
                                <p onClick={::this.handleOpenZfCompany}>新建企业</p>
                            </div>
                            <div className="flow2">
                                <span className="bg">2</span>
                                <p onClick={::this.handleOpenNewAccSubjects}>确认行业科目</p>
                            </div>
                            <div className="flow3">
                                <span className="bg">3</span>
                                <p onClick={::this.handleOpenZfPerson}>邀请集团管理员</p>
                            </div>
                        </div>
                    </div>
                </div>
                {Modal(message)}
            </div>
        )
    }
}