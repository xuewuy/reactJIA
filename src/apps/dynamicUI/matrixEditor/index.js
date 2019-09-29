import React from 'react'
import ReactDOM from 'react-dom'
import {Map} from 'immutable'
import Row from './row'
import EmptyRow from './emptyRow'

export default class MatrixEditorComponent extends React.Component {
	static defaultProps = {
        prefixCls: 'z-matrixeditor'
    }


    constructor(props){
        super(props)
       
    }

    shouldComponentUpdate(nextProps, nextState){
        return true
    }

    render(){
        let  {prefixCls, ...otherProps} = this.props,
            value = this.props._getter(this.props._path, 'value'),
            disabled = this.props._getter(this.props._path, 'disabled'),
            allowAdd = this.props._getter(this.props._path, 'allowAdd'),
            required = this.props._getter(this.props._path, 'required'),
            className = this.props._getter(this.props._path, 'className')

        if(!value) return null

        return (
            <div className={prefixCls+' '+className}>
                {this.renderRows(value, otherProps, disabled,required)}
                {!disabled ? <EmptyRow  {...otherProps} onAddRow ={::this.handleAddRow} allowAdd={allowAdd} /> : null}
            </div>
        )
    }

    handleAddRow(option){
        this.props.onEvent && this.props.onEvent('onMatrixEditorAddRow', option)
    }

    handleDelRow(option){
        this.props.onEvent && this.props.onEvent('onMatrixEditorDelRow', option)
    }


    renderRows(value, otherProps, disabled,required){
        return value.map((o, rowIndex)=>{
            return (
                <Row 
                    key={rowIndex}
                    {...otherProps }
                    rowIndex={rowIndex}
                    onAddRow ={::this.handleAddRow}
                    onDelRow ={::this.handleDelRow}
                    disabled = {disabled}
                    required = {required}
                />
            )
        })
    }
}