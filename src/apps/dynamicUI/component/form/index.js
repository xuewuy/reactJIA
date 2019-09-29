import React from 'react'
//import { Form } from 'xComponent'
import classNames from 'classnames'
import DynamicComponent from '../../'


export default class FormComponent extends React.Component {
    static defaultProps = {
        prefixCls: 'z-form'
    }
    componentDidMount(){
        //this.offsetWidth = this.getWindowWidth()
        //this.offsetHeight = ReactDOM.findDOMNode(this).offsetHeight
        //let ddd =  ReactDOM.findDOMNode(this)
        //debugger
    }

    getChildComponents(){
        if(!this.props.payload || !this.props.payload.get('utils') ) 
           return (<div></div>)

        let { _path, payload, _getter, prefixCls, className, ...otherProps } = this.props,
            utils = payload.get('utils'),
            getter = _getter || utils.get('getter'),
            childrens = getter(_path, 'childrens'),
            ret = []

    	childrens.forEach((children,index)=>{
            let path = `${_path}.${children.get('name')}`,
                visible = _getter(path, 'visible')
            if(visible == false) return

    		ret.push((
    			<DynamicComponent 
                    key={index}
                    _meta={children} 
                    payload={payload}
                    {...otherProps}  
                   _path={`${_path}.${children.get('name')}`}
                />
    		))
    	})

        ret = ret.concat(this.props.children)

        return ret
    }

    render() {

        let className = classNames({
             [this.props.prefixCls]: true,
             [this.props.className]: !!this.props.className,
        })


    	return(<div className={className}>{::this.getChildComponents()}</div>)
    }
}
