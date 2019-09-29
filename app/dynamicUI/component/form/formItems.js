import React from 'react'
import { Form } from 'xComponent'
import classNames from 'classnames'
import DynamicComponent from '../../'
import FormItem from './formItem'
import { ZIcon, Popover } from 'xComponent'


export default class FormItemsComponent extends React.Component {
    static defaultProps = {
        prefixCls: 'z-formitems'
    }

    getPopoverContainer() {
        return document.getElementById('app')
    }

    getChildComponents() {
        if (!this.props.payload || !this.props.payload.get('utils')) {
            return (<div></div>)
        }

        let { _getter, payload, _path, prefixCls, className, ...otherProps } = this.props,
            utils = payload.get('utils'),
            getter = _getter || utils.get('getter'),
            childrens = getter(_path, 'childrens'),
            ret = [],
            itemIndex = 0

        childrens.forEach((children, index) => {
            let path = `${_path}.${children.get('name')}`,
                visible = getter(path, 'visible'),
                className = getter(path, 'className')


            if (visible == false) return

            let placement = ((itemIndex + 1) % 3 === 0 || children.get('name')==='abstract') ? 'left' : 'right',
                popOverStyle = children.get('type') =='bool' ? 'helpChkStyle':'helpStyle'
            itemIndex++
            let ext = {}
            if (className)
                ext.className = className
            ret.push((
                <FormItem
                    key={index}
                    payload={payload}
                    {...otherProps}
                    _path={path}
                    {...ext}>
                    <DynamicComponent payload={payload} {...otherProps} _path={path} />
                    {(children.getIn(['helpTipsTitle']) && children.getIn(['helpTips'])) ?
                        <Popover ref='helpPopOver' zIndex='991' content={::this.renderTips(children.getIn(['helpTipsTitle']),children.getIn(['helpTips']))} placement={placement}>

                            <ZIcon icon='help' className={popOverStyle} />
                        </Popover> : null}

                </FormItem>
            ))
    })
        return ret
    }

renderTips(title, content) {
    return (
        <div style={{ width: '200px', padding: '5px 2px' }}>
            <div style={{ fontWeight: 'bold', paddingBottom: '4px' }}>{title}：</div>
            <div><hr /></div>
            <div dangerouslySetInnerHTML={{ __html: content }} style={{ width: '100%',overflowX:'hidden',overflowY: 'auto', wordWrap: 'break-word',paddingTop:'4px' }}></div>
        </div>
    )
}

render() {
    
    let { _getter, payload, _path } = this.props,
        utils = payload.get('utils'),
        getter = _getter || utils.get('getter'),
        classNameMore = getter(_path, 'className') || ''
        
    let className = classNames({
         [this.props.prefixCls]: true,
         [classNameMore]: !!classNameMore,
    })
    return (
        <div className={className}>
            {::this.getChildComponents()}
            </div>
    )
}
}

/*
<FormItem key={index} label={children.getIn(['fieldMeta','title'])}>
                <DynamicComponent key={index} _meta={children}  {...props}/>
            </FormItem>
            <span key={index} style={{padding:8}}>
                    <label >{children.getIn(['fieldMeta','title'])}</label>
                    <DynamicComponent  _meta={children}  {...props}/>
                </span>
 */
