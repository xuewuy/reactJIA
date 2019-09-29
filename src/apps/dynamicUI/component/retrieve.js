import React from 'react'
import {Map} from 'immutable'
import ReactDOM from 'react-dom'
import { Input, Button, Popover,Icon } from 'xComponent'
import { AppLoader } from 'appLoader'
import Immutable, { List ,fromJS } from 'immutable'

export default class Retrieve extends React.Component {
    state = {
        data : Map({
            initMeta:'',
            initData:'',
            className:'',
            visible:false,
            displayText:'',
            childVisible:false
        })
    }

    constructor(props){
        super(props)
        this.state = this.calculateState(this.props)
    }

    componentWillReceiveProps(nextProps){
        this.setState(this.calculateState(nextProps))
    }

    shouldComponentUpdate(nextProps, nextState){
        return true
        return !this.state.data.equals(nextState.data)
    }

    calculateState(props){
        let { data } = this.state,
            {_getter, _getterByField, _path} = props,
            pValues = _getter(_path, ['value','className','appPath','placement','refName','child','okText','cancelText','btnTextAlign']),
            value = pValues.get('value') || '',
            className = pValues.get('className') || 'voucherQuery',
            appPath = pValues.get('appPath') || 'apps/common/retrieve',
            placement = pValues.get('placement') || 'bottomLeft',
            refName = pValues.get('refName') || '',
            child = pValues.get('child') || false,
            okText = pValues.get('okText') || '查询',
            cancelText = pValues.get('cancelText') || '取消',
            btnTextAlign = pValues.get('btnTextAlign') || 'center'
        data = this.set(null,Map({path:_path,value,className,appPath,placement,refName,child,okText,cancelText,btnTextAlign}))
        this.oldValue = value
        return {data}
    }

    get(propertyName) {
        if (!propertyName || propertyName === '') {
            return this.state.data
        }
        return this.state.data.getIn(propertyName.split('.'))
    }

    set(propertyName, value) {
        let data = this.state.data
        if (!propertyName || propertyName === '') {
            return data.merge(value)
        }
        if(typeof value === 'object'){
            return data.mergeIn(propertyName.split('.'), value) 
        }
        else{
            return data.setIn(propertyName.split('.'), value)           
        }
    }

    handleVisibleChange(visible){
        if(!visible){
            if(!document.querySelector('.ant-modal-wrap')){
                let { data } = this.state
                data = this.set(null,{visible:visible})
                this.setState({data})
            }
        }else{
            let { data } = this.state
            data = this.set(null,{visible:visible})
            this.setState({data})
            this.props.onEvent('openRetrieve', {path: this.get('path')})
        }
    }
    
    getTooltipContainer(){
        let DOM =  ReactDOM
        return DOM.findDOMNode(this)
    }
    setValue(dataValue){
        let value = this.get('value').toJS()
        value.data = dataValue
        this.props.onFieldChange(this.get('path'), this.oldValue, fromJS(value))
    }

    render(){
        let meta = this.state.data.get('value') && this.state.data.get('value').get('meta')
            meta =meta && meta.size? meta : fromJS(meta)
        let data = this.state.data.get('value') && this.state.data.get('value').get('data')
            data = data&&data.size? data : fromJS(data)
        let This = this,
            app = <AppLoader path={this.state.data.get('appPath')+'?'+this.get('refName')}
                    initData={data}
                    initMeta={meta}
                    onAddTab={this.props.onAddTab}
                    onDelTab={this.props.onDelTab}
                    ref={'retrieve' + '_' +this.get('refName')}
                ></AppLoader>
                
        let handleOk=()=>{
            let appProps = app._owner._instance.refs['retrieve'+ '_' +this.get('refName')].refs.wrappedInstance.refs.connector.refs.wrappedInstance.props
                appProps.onOK && appProps.onOK(data => {
                    // This.handleVisibleChange(!data.result)
                    if(data.result){
                        setTimeout(()=>{
                            This.setValue(data.value)
                        },0)
                        setTimeout(()=>{
                            This.props.onEvent && This.props.onEvent('onRetrieveOk', {path: This.get('path'), data: data.value},cbValue=>{
                                if(data.result && cbValue.result){
                                   This.handleVisibleChange(false) 
                                }else{
                                    This.handleVisibleChange(true)
                                }
                            })
                        },100)
                    }
                })
        }

        let handleCancel=()=>{
            let appProps = app._owner._instance.refs['retrieve'+ '_' +this.get('refName')].refs.wrappedInstance.refs.connector.refs.wrappedInstance.props
            if(appProps.onCancel){
                appProps.onCancel(data=>{
                    return This.handleVisibleChange(data.result)
                })
            }
            This.handleVisibleChange(false)
        }

        const content = !This.get('visible') ? null: (
            <div className={This.get('className')}>

                {app}
                <div style={{textAlign:This.get('btnTextAlign')}}>
                    <span id='btnClick'>
                        <Button onClick={handleCancel} className='cancel'>{This.get('cancelText')}</Button>
                        <Button onClick={handleOk} className='query' type="primary" style={{marginLeft:'8px'}}>{This.get('okText')}</Button>
                    </span>
                </div>
            </div>
        )

        return(
            <div ref='retrieveWrap' className='retrieveWrap'>
                <Popover placement={this.get('placement')} getTooltipContainer={::this.getTooltipContainer} content={content} onVisibleChange={::this.handleVisibleChange} visible={This.get('visible')} trigger="click">
                    <div style={{display:'flex'}} >
                        <Input value={this.state.data.get('value').get('data').size ? this.state.data.get('value').get('data').get('defaultDiplayText') :this.state.data.get('value').get('data').defaultDiplayText}></Input>
                        <span style={{marginLeft:'-58px',zIndex:'3',fontSize:'12px', display: 'flex', flexDirection: 'column', justifyContent: 'center'/*,lineHeight:'28px'*/}}>
                            <a>更多条件</a>
                        </span>
                    </div>
                </Popover>
            </div>
        )
    }
    
}

