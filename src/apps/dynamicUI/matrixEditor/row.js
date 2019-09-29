import React from 'react'
import ReactDOM from 'react-dom'
import {Map} from 'immutable'
import DynamicComponent from 'dynamicComponent'
import {Icon, Button} from 'xComponent'
import FormItem from '../component/form/formItem'



export default class MatrixEditorRowComponent extends React.Component {
	static defaultProps = {
        prefixCls: 'z-matrixeditor-row'
    }

    state = {
        data : Map({
            path:'',
            className:'',
            height:30,
            disabled:false,
            required:false,
            enableSequenceColumn:true,
            allowAddrow:false,
            allowDelrow:false,
            meta:undefined,
            style: {display:'flex'}
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
    }

    calculateState(props){
        let {data} = this.state,
            { _path, _getter, style, className } = props,
            pValues = _getter(_path,['', 'rowHeight', 'disabled', 'enableSequenceColumn', 'allowAddrow', 'allowDelrow']),
            meta = pValues.get(''),
            height = pValues.get('rowHeight') || 30,
            disabled = pValues.get('disabled') || false,
            required = pValues.get('required') || false,
            enableSequenceColumn = pValues.get('enableSequenceColumn') === undefined ?  true : pValues.get('enableSequenceColumn'),
            allowAddrow = pValues.get('allowAddrow') || true,
            allowDelrow = pValues.get('allowDelrow') || true
          
            
        data = this.set(null,{path: _path, meta,
            height,   
            disabled, required,enableSequenceColumn,
            allowAddrow, allowDelrow, className, style })

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


    handleDelRow(){
    	this.props.onDelRow && this.props.onDelRow( {path: this.props._path,rowIndex:this.props.rowIndex})
    }

    render(){
        let meta = this.get('meta'),
        	childrens = meta.get('childrens'),
            {prefixCls, disabled,required, ...otherProps} = this.props

        if(!childrens) return null

        return (
           <span className={prefixCls} >

           		{this.renderChildrens(childrens, otherProps)}

           		{(this.get('allowDelrow') && !disabled )?
                	<a onClick={::this.handleDelRow}><Icon type='cross'></Icon></a>
                	:null
           		}
           </span>
        )
    }

    renderChildrens(childrens, otherProps){
    	let ret = []
    	childrens.forEach(o=>{            
            let path = `${this.props._path}.${o.get('name')},${this.props.rowIndex}`,
                visible = otherProps._getter(path, 'visible'),
                title =  otherProps._getter(path, 'title'),
                required =  otherProps._getter(path, 'required')

            if(visible != undefined && visible === false)
                return
            
            ret.push(<FormItem required={required} {...otherProps} _path = {path} >
                <DynamicComponent {...otherProps} _path={path} />
                </FormItem>
            )  

    		/*
    		ret.push(
    			<span style={{width:12}}>
    			</span>
    		)*/
    	})

    	return ret
    }
}
/*
            if(visible != undefined && visible === false)
                return

            
            ret.push(
                <label>{title + ':'}</label>
            )
            ret.push(
                <DynamicComponent 
                    {...otherProps}
                    _path={path}
                />
            )*/