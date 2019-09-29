import React from 'react'
import Immutable, {Map} from 'immutable'
import {Table, Column, Cell} from 'fixed-data-table'
import DynamicComponent from '../../'

export default function CellComponent(props){
    let { _path, _getter, disabled,  rowIndex, style } = props,
        path = `${_path},${rowIndex}`,
        values = _getter(path, ['', 'isFocus', 'value', 'disabled']),
        meta = values.get(''),
        isFocus = values.get('isFocus'),
        value = values.get('value')
        disabled = disabled || values.get('disabled') || false

    let displayComponent = meta.get('displayComponent') || 'DisplayCell'

    let renderEdit = ()=> {
        return DynamicComponent({
            ...props,
            _path:path,
            _isFocus:true,
            _isGridCell:true
        })
    }

    let renderDisplay = () => {
        let ext = {}

        if(props._value)
            ext._value = props._value

        return DynamicComponent({
            ...props,
            _path : path,
            _component:displayComponent,
            ...ext,
            onFieldFocus:handleFieldFocus,
        })
    }

    let handleFieldFocus = ()=> {
        if( !props.disableCellFocus ){
            //let data = this.set('isFocus', true)
            //this.setState({data})
            setTimeout( ()=>props.onFieldFocus(path), 0)
        }
    }


    if(disabled){
        return renderDisplay()
    }

    if(isFocus)
        return renderEdit()

    return renderDisplay()
}
/*
export default class CellComponent extends React.Component{

  state = {
      data : Map({
          meta:Map(),
          path:'',
          value:undefined,
          isFocus:false,
          disabled:false,
          style: Map()
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
      if(nextState.data.get("isFocus"))
          return true
      return !this.state.data.equals(nextState.data) 
  }

  calculateState(props){
      let { _path, _getter, disabled,  rowIndex, style } = props,
          path = `${_path},${rowIndex}`,
          pValus = _getter(path, ['', 'isFocus', 'value', 'disabled']),
          meta = pValus.get(''),
          isFocus = pValus.get('isFocus'),
          value = pValus.get('value')
      
      disabled = disabled || pValus.get('disabled') || false
    
      let data = this.set(null,{path, meta, value, isFocus, disabled, style })

      return {data}
  }


  get(propertyName) {
      if (!propertyName || propertyName === '') {
        return this.state.data
      }
      return this.state.data.getIn(propertyName.split('.'))
  }

  set(propertyName, value) {
      if (!propertyName || propertyName === '') {
          return Immutable.fromJS(value)
      }
      
      let data = this.state.data
      if(typeof value === 'object'){
          return data.mergeIn(propertyName.split('.'), value) 
      }
      else{
          return data.setIn(propertyName.split('.'), value)     
      }
  }

  handleFieldFocus(path){
      if( !this.props.disableCellFocus ){
        let data = this.set('isFocus', true)
        this.setState({data})
        setTimeout( ()=>this.props.onFieldFocus(path), 0)
      }
  }


  render(){
      let { _path, _getter, rowIndex } = this.props,
          path = `${_path},${rowIndex}`,
          isFocus = this.get('isFocus'),
          disabled = this.get('disabled'),
          displayComponent = this.get('meta').get('displayComponent') || 'DisplayCell',
          value = this.get('value')
      if(disabled){
          return this.renderDisplay(path, displayComponent)
      }

      if(isFocus)
          return this.renderEdit(path)

      return this.renderDisplay(path, displayComponent)
  }

  renderEdit(path){
    return (
       <DynamicComponent
          key={path}
              {...this.props}
              _path = {path} 
              _isFocus={true}
              _isGridCell={true}
        />
    )
  }

  renderDisplay(path, displayComponent, value){
    let ext = {}
    if(this.props._value)
      ext._value = this.props._value

    return DynamicComponent({
        ...this.props,
        _path : path,
        _component:displayComponent,
        ...ext,
        onFieldFocus:this.handleFieldFocus.bind(this),
    })
    /*return (
      <DynamicComponent
          key={path}
            {...this.props}
            _path = {path}
            _component={displayComponent}
            {...ext}
            onFieldFocus = {::this.handleFieldFocus}
        />
      )
  }
}

/*
  renderDisplay(path){
    return (
      <DynamicComponent
            {...this.props}
            _path = {path}
            _component="DisplayCell"
            onFieldFocus = {::this.handleFieldFocus}
        />
      )
  }
 */