import React from 'react'
import ReactDOM from 'react-dom'
import {Map} from 'immutable'
import {Tabs} from 'xComponent'
import DynamicComponent from '../'

const TabPane = Tabs.TabPane

export default class TabsComponent extends React.Component {
    static defaultProps = {
        prefixCls: 'z-tabs'
    }

    constructor(props){
        super(props)
        this.state = {isHandleChange:false};
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
            return data.mergeDeep(value)
        }
        if(typeof value === 'object'){
            return data.mergeDeepIn(propertyName.split('.'), value)
        }
        else{
            return data.setIn(propertyName.split('.'), value)
        }
    }

    handleChange(e){
        this.setState({isHandleChange:e});
        this.props.onEvent && this.props.onEvent('onTabChange', {path:this.props._path, value:e})
    }


    getChildComponents(childrens, path, getter, otherProps){

    	return childrens.map((children,index)=>{

            let childPath = `${path}.${children.get('name')}`,
                childDis = children.get('disabled') == undefined ?false : children.get('disabled'),
                childVisible = children.get('visible') == undefined ? true : children.get('visible')
            
            if (!!childVisible){
                return (
                    <TabPane key={index} tab={< span title={!!getter(childPath, 'tabTitle') ? getter(childPath, 'tabTitle') : getter(childPath, 'title')} >{getter(childPath, 'title')}</span >} disabled={childDis}>
                        <DynamicComponent
                            key={index}
                            {...otherProps}
                            _getter={getter}
                            _path={childPath}
                        />
                    </TabPane>
                )
            }
        })
    }

    render() {
        let { _getter, _path, prefixCls, className, ...otherProps } = this.props,
            values = _getter(_path, ['tabStyle','tabPosition','childrens','activeKey', 'enabledInternalActiveKey']),
            childrens = values.get('childrens') ,
            enabledInternalActiveKey = values.get('enabledInternalActiveKey') === false ? false:  true,
            tabStyle = values.get('tabStyle') || 'card',
            activeKey = '0' ,
            tabPosition = values.get('tabPosition') || 'top'
        
        if(enabledInternalActiveKey == true){
            activeKey = this.state.isHandleChange ? this.state.isHandleChange : (values.get('activeKey') || '0')
        }else{
            activeKey = values.get('activeKey') || '0'
        }


    	return(
            //tabBarExtraContent：在页签右侧增加元素，例如按钮等
            <div className={this.props.prefixCls} >
                 <Tabs size="small" activeKey={activeKey} type={tabStyle} tabPosition ={tabPosition} tabBarExtraContent={this.props.tabBarExtraContent} onChange={::this.handleChange}>
                    {::this.getChildComponents(childrens, _path, _getter, otherProps)}
                 </Tabs>
             </div>
        )
    }
}
/*
 <DynamicComponent
                    key={index}
                    _meta={children}
                    {...props}
                    _height={this.get('offsetHeight')}
                    _width={this.get('offsetWidth')}  />
 */
