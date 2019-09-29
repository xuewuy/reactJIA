import React from 'react'
import ReactDOM from 'react-dom'
import DynamicComponent from 'dynamicComponent'
import {Icon, Button} from 'xComponent'


export default class MatrixEditorEmptyRowComponent extends React.Component {
	static defaultProps = {
        prefixCls: 'z-matrixeditor-emptyrow'
    }

    handleAddRow(){
    	this.props.onAddRow && this.props.onAddRow({path: this.props._path})
    }

    render(){
        let { _path, _getter} = this.props,
            addComponent = _getter(_path, 'addComponent')

        if(this.props.allowAdd === false)
            return null

    	return(
    		<span className={this.props.prefixCls} >
                {addComponent?
                    <DynamicComponent _component={addComponent} {...this.props} />:
                    <a onClick={::this.handleAddRow}>
                        <Icon type='plus'></Icon>
                    </a>
                }
	    	</span>
    	)
    }
}

