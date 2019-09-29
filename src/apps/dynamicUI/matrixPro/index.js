import React from 'react'
import ReactDOM from 'react-dom'
import {Map} from 'immutable'
import Row from './row'
import EmptyRow from './emptyRow'

export default class MatrixProComponent extends React.Component {
	static defaultProps = {
        prefixCls: 'z-matrixeditor'
    }


    constructor(props){
        super(props)
       
    }

    shouldComponentUpdate(nextProps, nextState) {
        for (var o in this.props) {
            if (this.props[o] != nextProps[o]) {
                return true
            }
        }

        if (this.state != nextState)
            return true
        return false
    }


    render(){
        let  {prefixCls, ...otherProps} = this.props,
            value = this.props._getter(`root.list,${this.props.rowIndex}.detail`,'value'),
            disabled = this.props._getter(this.props._path, 'disabled'),
            allowAdd = this.props._getter(this.props._path, 'allowAdd'),
            required = this.props._getter(this.props._path, 'required')

        if(!value) return null
        return (
            <div className={prefixCls}>
                <EmptyRow  {...otherProps} onAddRow={::this.handleAddRow} allowAdd={allowAdd} />
                {this.renderRows(value, otherProps, disabled,required)}
            </div>
        )
    }

    handleAddRow(option){
        if(option){
            option.parentRowIndex = this.props.rowIndex
            this.props.onEvent && this.props.onEvent('onMatrixEditorAddRow', option)
        }
    }

    handleDelRow(option){
        if(option){
            option.parentRowIndex = this.props.rowIndex
            this.props.onEvent && this.props.onEvent('onMatrixEditorDelRow', option)
        }
    }


    renderRows(value, otherProps, disabled,required){
        return value.map((o, rowIndex)=>{
            return (
                <Row 
                    key={rowIndex}
                    {...otherProps }
                    parentRowIndex ={this.props.rowIndex}
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