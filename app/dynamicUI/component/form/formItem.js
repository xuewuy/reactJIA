import React from 'react'
import classNames from 'classnames'
import { Form,Icon, Tooltip,Popover } from 'xComponent'
import DynamicComponent from '../../'

const FormItem = Form.Item

export default class FormItemComponent extends React.Component {
     static defaultProps = {
        prefixCls: 'z-formitem'
    }
    render() {
       if(!this.props.payload || !this.props.payload.get('utils') ) 
           return (<div></div>)

        let className = classNames({
             [this.props.prefixCls]: true,
             [this.props.className]: !!this.props.className,
        })

        let { _path, payload } = this.props,
            path = _path,
            utils = payload.get('utils'),
            getter = this.props._getter || utils.get('getter'),
            values = getter(path, ['required','showLabel','after','description','title']),
            required = values.get('required') || false,
            description = values.get('description'),
            showLabel =(typeof values.get('showLabel') === "undefined" || values.get('showLabel') === true) ? true: false,
            after = values.get('after'),
            label = ''
            if(showLabel){
                if(description){
                    label = <a title={description}>{getter(_path, 'title')}</a>
                }
                else{
                   label = getter(_path, 'title')
                }
            }



            
    	return (
            <FormItem
                className={className}
                label={label} 
                required={required}
                >

                {this.props.children}

                {this.renderError(getter, path)}

                {after? <DynamicComponent _component={after} {...this.props} /> :null}
            </FormItem>

        )
    }

    renderError(getter, path){
        let values = getter(path, ['validate.result', 'validate.showIcon', 'validate.showTooltip', 'validate.placement']),
            validateResult = values.get('validate.result'),
            showIcon = values.get('validate.showIcon') === undefined ? true : !!values.get('validate.showIcon'),
            showTooltip = values.get('validate.showTooltip') === undefined ? true : !!values.get('validate.showTooltip'),
            placement = values.get('validate.placement') ? values.get('validate.placement') : 'right'

        if(validateResult && validateResult.size > 0){
            let ext = {}
            if(showTooltip)
                ext = {visible:true}

            let message = validateResult.map(s=><p>{s}</p>)

            return( 
                <Popover content={message} placement={placement} {...ext}>
                    <span className={showIcon?'has-error has-feedback':'aaa'} >
                    </span>
                </Popover>
            )
        }
        else
        {
            return null
        }
    }
}

/*  <span className='has-error has-feedback' >
                    </span>
// <Icon type='user' />
     <Tooltip title='ddd'><span className='has-error has-feedback' >ddd</span></Tooltip>
<FormItem key={index} label={children.getIn(['fieldMeta','title'])}>
                <DynamicComponent key={index} _meta={children}  {...props}/>
            </FormItem>

              <div className="dynamic-page-form-header-item">
                <label className="dynamic-page-form-header-item-label">{meta.get('title')}</label>
                <DynamicComponent  {...this.props} _meta={meta.set()}/>
            </div>
 */
