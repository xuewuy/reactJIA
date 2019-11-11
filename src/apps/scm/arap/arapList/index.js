import React from 'react'
import DynamicComponent, {Modal} from 'dynamicComponent'
import { Button,Input,Card,Icon} from 'xComponent'
import { Select } from 'antd';
import { Checkbox } from 'antd';
import './arapList.less'
const Option = Select.Option;
export default class ArapListComponent extends React.Component {

    static defaultProps = {
        prefixCls: 'araplist'
    }
    constructor(props){
        super(props)
    }
    refresh(){
        this.props.refresh()
    }
    handleExport(){
        this.props.exportExcel()
    }

    handlePrint(){
        this.props.print()
    }

    handleAuditOne(ps){
        return () => {
            this.props.handleAuditOne(ps)
        }
    }
    // 点击 审核
    puToExamine(){
        this.props.toExamine()
    }
    //反审核
    backAuditOne(ps){
        return () => {
            this.props.backAuditOne(ps)
        }
    }
    // 点击删除 图标
    deleteIcon(value){
        return () => {
            this.props.deleteIcon(value)
        }
    }
    // handleDelOne(ps){
    //     return ()=>{
    //         let {clearMessage, setMessage} = this.props,
    //             getterByField = this.props.payload.getIn(['utils','getterByField']),
    //             status = getterByField(`list.${ps.rowIndex}.status`),
    //             disableDel = status == 3  //已审核

    //         if(disableDel)
    //             return

    //         setMessage({
    //             type: 'confirm',
    //             title: '删除',
    //             content: '确定删除该收款明细?',
    //             onCancel: ()=>{ clearMessage() } ,
    //             onOk: ()=>{
    //                 this.props.delOne(ps.rowIndex)
    //                 return
    //             }
                
    //         })
            
    //     }
    // }

    endOptionColumnCreator(ps){
        let getterByField = this.props.payload.getIn(['utils','getterByField']),
            status = getterByField(`list.${ps.rowIndex}.status`)
            // disableAudit = (status == 3 || status == 1), //已审核或者暂存
            // disableDel = status == 3  //已审核
            // disabled = {disableAudit}
        return (
            <span className={`${this.props.prefixCls}-detail-option`}>

                {status == 128 ?
                    <Icon className={`${this.props.prefixCls}-detail-audit-disabled`} 
                        type='question'   
                        disabled               
                        title='审核'>
                    </Icon>
                    :<Icon 
                        className={`${this.props.prefixCls}-detail-audit`} 
                        type='question'
                        onClick ={::this.handleAuditOne(ps)}
                        title='审核'>
                    </Icon>}


                {status != 128 ?
                    <Icon className={`${this.props.prefixCls}-detail-audit-out-disabled`} 
                        type='question'   
                        disabled               
                        title='反审核'>
                    </Icon>
                    :<Icon 
                        className={`${this.props.prefixCls}-detail-audit-out`} 
                        type='question'
                        onClick ={::this.backAuditOne(ps)}
                        title='反审核'>
                    </Icon>}


                {status == 128 ?
                   <Icon 
                        className={`${this.props.prefixCls}-detail-del-disabled`} 
                        type='question'
                        disabled 
                        title='删除'/> 
                    :<Icon 
                        className={`${this.props.prefixCls}-detail-del`} 
                        type='question'
                        onClick ={::this.deleteIcon(ps)}
                        
                        title='删除'/>
                }
                
            </span>
        )
    }


    handleEvent(eventName, option){
        if(eventName === 'onLinkClick') {
            let getterByField = this.props.payload.getIn(['utils', 'getterByField']),
                rowIndex = parseInt(option.path.split(',')[1]),
                {setMessage} = this.props,
                id = getterByField('list').toJS()[rowIndex].id,
                initData = {id: id,showStatus: true}

            if (option.path.indexOf('root.list.code') != -1) {
                this.props.onAddTab('收款单', `apps/scm/arap/arapOrder`, {initData})    //传给凭证id进行查询
            }
        }else{
            this.props.onEvent(eventName, option)
        }
    }
    // 批量删除
    arapDl(){
        this.props.arapDl()
    }
    componentDidMount() {
        this.props.initView()
    }
    handleAdd(){
        this.props.onAddTab('收款单',`apps/scm/arap/arapOrder`)
    }

    render(){
        if(this.props._isCurrentTab === false) return null
    	if (!this.props.payload || !this.props.payload.get('utils'))
            return null
        let message = this.props.payload.getIn(['global', 'message']),
            {prefixCls, ...otherProps} = this.props,
            getterByField = this.props.payload.getIn(['utils', 'getterByField'])
            let s = this.state
            let tabletype = getterByField('tableType')||'0',
                bCheckOrig = false,
                bCheckQuantity =false
          
    	return (
    		 <div className={prefixCls}>
                <Card>
                    <div className = 'btnWarp'>
                        <nav className = 'selectPicker'>
                           <div id = 'pickerWrap'>
                               <DynamicComponent {...otherProps} ref='accountQuery' _path="root.accountQuery" />
                           </div>
                            <div>
                            <Button type="ghost" type="primary" title='刷新' className={`${prefixCls}-function-refresh`} icon='search' onClick={::this.refresh} />
                            </div>

                        </nav>

                        <nav className = 'btnsR'>
                            <Button type="ghost" type="primary" className={`${prefixCls}-function-add`}  onClick={::this.handleAdd}>新增收款单</Button>
                            <Button onClick={::this.puToExamine} type="ghost" type="primary">审核</Button>    
                            <Button onClick={::this.arapDl} type="ghost" type="primary">删除</Button>    
                            <Button 
                                type="ghost" 
                                type="primary" 
                                title='打印' 
                                className={`${prefixCls}-function-print`} 
                                icon='search' 
                                onClick={::this.handlePrint} />

                            <Button 
                                type="ghost" 
                                type="primary" 
                                title='导出Excel' 
                                className={`${prefixCls}-function-export`} 
                                icon='search' 
                                onClick={::this.handleExport} />
                        </nav>
                    </div>
        		 	<DynamicComponent {...otherProps} 
                        _path="root.list"
                        scroll={{y:true,x:true}}
                        onEvent={::this.handleEvent}
                        endOptionColumnTitle='操作' 
                        endOptionColumnWidth={100}
                        endOptionColumnCreator={::this.endOptionColumnCreator} 
                        endOptionColumnFixed
                        bodyStyle={{overflowY:'auto'}}
                    />
                    <DynamicComponent {...otherProps} _path="root.paging"/>
        		  	{Modal(message)}
                </Card>
    		 </div>

    	)
    }
}
