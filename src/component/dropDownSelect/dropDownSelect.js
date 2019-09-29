import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import SelectComponent from '../../apps/dynamicUI/component/select'
import {Input, Button} from 'xComponent'

export default class DropDownSelectComponent extends Component {

    constructor(props) {
        super(props)
        this.state = this.calculateState(this.props)
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this.calculateState(nextProps))
    }

    calculateState(props) {
        let {_path, _getter, _isFocus, style, className} = props,
            pValues = _getter(_path, ['selectButtonName']),
            selectButtonName = pValues.get('selectButtonName')

        this.selectButtonName = selectButtonName
    }

    handleGroupButtonClick(e) {
        if (this.props.onEvent) {
            setTimeout(() => this.props.onEvent('onInputButtonClick', {path: this.props._path}), 0)
        }

        if (e.preventDefault)
            e.preventDefault()
        if (e.stopPropagation)
            e.stopPropagation()
    }

    onEndEdit() {
        if (this.props.onEndEdit) {
            this.props.onEndEdit()
        }
        else if (this.props.onEvent) {
            setTimeout( ()=>this.props.onEvent('onEndEdit', {path: this.props._path}), 10)
        }
    }

    onBlur(e) {
        if (this.props.onBlur) {
            this.props.onBlur()
        }
        else if (this.props.onEvent) {
            setTimeout( ()=>this.props.onEvent('onBlur', {path: this.props._path}), 10)
        }
    }

    filterOption(inputValue, option) {
        if (option && option.props && option.props.data) {
            let itemData = option.props.data
            if ((itemData.get('code') && itemData.get('code').indexOf(inputValue) == 0)  //code左匹配
                // || (itemData.get('name') && itemData.get('name').indexOf(inputValue) != -1)//名字模糊匹配
                || (itemData.get('name') && itemData.get('name').indexOf(inputValue) != -1)
                || (itemData.get('codeAndName') && itemData.get('codeAndName').indexOf(inputValue) == 0)
                || (itemData.get('helpCode') && itemData.get('helpCode').indexOf(inputValue.toUpperCase()) != -1)) {
                return true
            }
            else {
                return false
            }
        }

        return true
    }

    render() {
        return (
            <div className="select-with-button">
                <SelectComponent {...this.props} onEndEdit={::this.onEndEdit} onBlur={::this.onBlur} filterOption={::this.filterOption}/>
                <Button ref="selectButton" onMouseDown={::this.handleGroupButtonClick} className={'select-group-button'} onClick={::this.handleGroupButtonClick}>{this.selectButtonName}
                </Button>                
            </div>
        )
    }
}

