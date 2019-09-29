import React from 'react'
import {Modal as Modal1 ,Icon, Button} from 'xComponent'
import {Modal} from 'dynamicComponent'
const confirm = Modal1.confirm

import './style.less'


export default class OperationProcessComponent extends React.Component {
	static defaultProps = {
        prefixCls: 'operationProcess'
    }
    constructor(props){
        super(props)
        this.handleTabClose = this.handleTabClose.bind(this)
        this.handleTabFocus = this.handleTabFocus.bind(this)
        this.handleImportTicket = this.handleImportTicket.bind(this)
        this.handleOpenIts = this.handleOpenIts.bind(this)

        this.functions = [{
            code:'p1',
            name:'记一笔',
            tabName:'新增流水',
            url:'apps/acm/richardTicket/card',
            btnStatus:{menuId:201003,auth:1}
        },{
            code:'p2',
            name:'银行对账单',
            tabName:'银行对账单',
            url:'apps/acm/bankStatement',
            btnStatus:{menuId:201013,auth:1}
        },{
            code:'p3',
            name:'发票',
            url:'',
            btnStatus:{menuId:201001,auth:2},
            onClick:this.handleImportTicket
        },{
            code:'p4',
            name:'资产管理',
            tabName:'资产卡片管理',
            url:'apps/fi/assetManagement/list',
            btnStatus:{menuId:207001,auth:1}
        },{
            code:'p5',
            name:'科目及期初',
            tabName:'科目及期初',
            url:'apps/fi/accSubjects/accSubjects',
            btnStatus:{menuId:200005,auth:1}
        },{
            code:'p6',
            name:'流水账',
            tabName:'流水账列表',
            url:'apps/acm/richardTicket/list',
            btnStatus:{menuId:201001,auth:1}
        },{
            code:'p7',
            name:'工资单',
            tabName:'工资单',
            url:'apps/gl/payRoll/payRollList',
            btnStatus:{menuId:202001,auth:1}
        },{
            code:'p8',
            name:'企业信息',
            tabName:'企业信息',
            url:'apps/dz/editClient',
            btnStatus:{menuId:200002,auth:1},
            initParameter: { id: '', isDisabled: false, isRefresh: true, type: 2 } 
        }]
        this.functions1 = [{
            code:'p1',
            name:'会计凭证',
            tabName:'凭证管理',
            url:'apps/fi/voucherManagement',
            btnStatus:{menuId:203002,auth:1}
        },{
            code:'p2',
            name:'增值税申报表',
            tabName:'增值税',
            url:'apps/fi/manageTax/declareTaxOfValueAdded',
            btnStatus:{menuId:204001,auth:1}
        },{
            code:'p3',
            name:'汇算清缴',
            tabName:'一键汇算清缴',
            url:'apps/fi/manageTax/otherTax',
            btnStatus:{menuId:2040,auth:1},
            onClick:this.handleOpenIts
        },{
            code:'p4',
            name:'财务报表',
            tabName:'资产负债表',
            url:'apps/fi/report/balanceSheet',
            btnStatus:{menuId:203006,auth:1}
        },{
            code:'p5',
            name:'会计账簿',
            tabName:'余额表',
            url:'apps/fi/accountBook/balances',
            btnStatus:{menuId:203005,auth:1}
        },{
            code:'p6',
            name:'附加税申报表',
            tabName:'附加税',
            url:'apps/fi/manageTax/cityBuildExtraTax',
            btnStatus:{menuId:204007,auth:1}
        },{
            code:'p7',
            name:'财务分析',
            tabName:'资产负债情况',
            url:'iframe://apps/yj-bs-analysis/index.html',
            btnStatus:{menuId:214001,auth:1}
        },{
            code:'p8',
            name:'企业所得税预缴',
            tabName:'企业所得税预缴辅助计算表',
            url:'apps/fi/manageTax/declareTaxOfPrepayAB',
            btnStatus:{menuId:204002,auth:1}
        },{
            code:'p10',
            name:'风险检查',
            tabName:'风险检查',
            url:'iframe://apps/yj-risk/index.html',
            btnStatus:{menuId:2120,auth:1}
        }]
    }
    // constructor(props){
    //     super(props)
    //     this.handleTabClose = this.handleTabClose.bind(this)
    //     this.handleTabFocus = this.handleTabFocus.bind(this)
    //     this.handleOpenRichardticketcard = this.handleOpenRichardticketcard.bind(this)
    //     this.handleOpenBankStatement = this.handleOpenBankStatement.bind(this)
    //     this.handleImportTicket = this.handleImportTicket.bind(this)
    //     this.handleOpenAssetManagementList = this.handleOpenAssetManagementList.bind(this)
    //     this.handleOpenZfCompany = this.handleOpenZfCompany.bind(this)
        
    // }

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
    handleOpenIts(){
        this.props.openIts()
    }
    handleImportTicket(){
        let {clearMessage, setMessage} = this.props
        setMessage({
            type: 'app',
            title: '发票导入',
            content: 'app:apps/acm/richardTicket/importNew',
            okText: '下一步',
            wrapClassName: 'richardTicketImportNewModal',
            refName:'richardTicketImportNewModal',
            onCancel: ()=>{ clearMessage() } ,
            onOk: (data)=>{
                if(data && data.result) {
                    clearMessage()
                }
            },
            width:640,
            height:320,
            bodyStyle:{padding:10},
        })
    }

    handleClick(f){
        return ()=>{
            if(f.onClick){
                f.onClick()
            }else{
                let message = this.props.payload.getIn(['global', 'message']),
                    {prefixCls, ...otherProps} = this.props,
                    getterByField = this.props.payload.getIn(['utils','getterByField']),
                    initData = f.initParameter?f.initParameter:undefined,
                    industry = getterByField('industry'),
                    lvUrl = industry==1008&&f.btnStatus.menuId==204002||f.btnStatus.menuId==204011?'apps/fi/manageTax/personalIncomeTaxReturn':f.url
                this.props.onAddTab(f.tabName, lvUrl, {initData})
//             this.props.onAddTab(f.tabName, f.url, {initData: f.btnStatus.menuId})
            }
        }
    }
    hasAuth(menu){
        let getterByField = this.props.payload.getIn(['utils', 'getterByField']),
            menuIds = this.props.tab.get('menuIds') ? this.props.tab.get('menuIds').toJS() : getterByField('menuIds'),
            auth = this.props.tab.get('auth') ? this.props.tab.get('auth').toJS() : getterByField('auth'),
            industry = getterByField('industry'),
            isDisable = false
        if(menu.name=='企业所得税预缴'&&industry==1008){
           menu.btnStatus.menuId=204011
        }
        
        if(!menuIds) return isDisable
        menuIds.map(id=>{
            if(isDisable)return
            if(id == menu.btnStatus.menuId){
                // 有权限，但是需要判断一下当前的权限
                let currMenuAuth = auth.find(a=> Object.keys(a)== id)
                
                if(currMenuAuth[id] == 1){
                    if(industry == 1008){
                        if(menu.btnStatus.menuId == 2040){
                            return isDisable = false
                        }else{
                            return isDisable = true
                        }
                    }
                    return isDisable = true
                }else if(currMenuAuth[id] == 2){
                    if(industry == 1008){
                        if(menu.btnStatus.menuId==201001){
                            return isDisable = false
                        }
                        if(menu.btnStatus.menuId==2040){
                            return isDisable = false
                        }
                        //律所行业汇算清缴置灰
                        if(menu.btnStatus.menuId != 201001 && menu.btnStatus.menuId != 2040){
                            return isDisable = true
                        }
                    }else {
                        return isDisable = true
                    }
                }else { 
                    return isDisable = false
                }

                
                
            }else{
                // 没有权限直接至灰
                isDisable = false
            }
        })
        
        return isDisable
    }

    render() {
        if(this.props._isCurrentTab === false) 
            return null
        if (!this.props.payload || !this.props.payload.get('utils'))  
            return null
        let message = this.props.payload.getIn(['global', 'message']),
            {prefixCls, ...otherProps} = this.props,
            getterByField = this.props.payload.getIn(['utils','getterByField']),
            // roles = this.props.appParams['role'].split(','),
            person = getterByField('person'),
            customer = getterByField('customer'),
            vendor = getterByField('vendor'),
            account = getterByField('account'),
            bank = getterByField('bank'),
            taxUrlOne = getterByField('taxUrlOne'),
            context = getterByField('context'),
            appInfo = getterByField('initData'),
            industry = getterByField('industry'),
            lvClass = industry==1008?'lvClass':''

        return (
            <div className={prefixCls}>
                <div className={`${prefixCls}-wrapper`}>
                    <div className='hText'>操作流程</div>
                    <div className={`${prefixCls}-center`}>
                        <div className={`${prefixCls}-text`}>
                            <div className={`${prefixCls}-textLeft`}>
                                {
                                    this.functions.map(f=>
                                    <p className={this.hasAuth(f) ? f.code:f.code + ' ashPlacing'} onClick={::this.handleClick(f)}>
                                        {f.name}
                                    </p>
                                    )
                                }
                            </div>
                            <div className={`${prefixCls}-textRight`+' '+lvClass}>
                                {
                                    this.functions1.map(f=>
                                        <p className={this.hasAuth(f) ? f.code:f.code + ' ashPlacing'} onClick={::this.handleClick(f)}>
                                             {industry==1008&&f.name=='企业所得税预缴'?'合伙人个人经营所得税A表':f.name}
                                        </p>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {Modal(message)}
            </div>
        )
    }
}