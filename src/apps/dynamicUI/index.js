import React, { Component } from 'react'
import defaultComponentFactory from './defaultComponentFactory'
import decorators from './decorators'

function getComponent(fieldType, componentName, componentFactory) {
    let cf = componentFactory || defaultComponentFactory

    if (componentName) {
        return cf.getComponent(componentName)
    } else
        return cf.getDefaultComponent(fieldType)
}

let DynamicComponent = (props) =>{
    let {payload, _path, _component, componentFactory, componentInstances} = props

    if(!payload|| !payload.get('utils') )
        return null

    let getter = payload.getIn(['utils','getter']),
        getterByField = payload.getIn(['utils','getterByField']),
        pValues = getter(_path,['type', 'component']),
        fieldType = pValues.get( 'type'),
        componentName = _component || pValues.get('component')

    if(componentInstances && componentInstances[componentName])
        return componentInstances[componentName]

    let Component = getComponent(fieldType, componentName, componentFactory)
    //let c = React.Component
    if(React.Component.isPrototypeOf(Component)){
        return React.createElement(Component,{
            ...props, 
            _getter:props._getter || getter,
            _getterByField:getterByField,
            key:_path
        })
    }
    else{
        //debugger
        //return <Component {...props} _getter={props._getter || getter} _getterByField={getterByField}  key={_path} />
         
        return Component({
            ...props, 
            _getter:props._getter || getter,
            _getterByField:getterByField
        })
    }
       /**/
}

const components = defaultComponentFactory.getComponents()

export default DynamicComponent

Object.assign(exports, {
    ...components, 
    decorators: decorators,
    defaultComponentFactory: defaultComponentFactory, 
    ...exports})
