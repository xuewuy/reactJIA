import React from 'react'

import {DatePicker } from 'antd'
import './style.less'

const RangePicker = DatePicker.RangePicker;


export default class RangePickerComponent extends React.Component {
  
    static defaultProps = {
        prefixCls: 'rangpickerfilter'
    }

    state = {
        value : undefined
    }

    constructor(props){
        super(props)
        this.state = this.calculateState(this.props)
    }

    componentWillReceiveProps(nextProps){
        this.setState(this.calculateState(nextProps))
    }

    calculateState(props){
        return {value:props.value?props.value.toJS():undefined}
    }

    handleOk(){
        this.props.onOk && this.props.onOk(this.state.value)
    }

    handleReset(){
        this.setState({value:undefined})
        this.props.onReset && this.props.onReset()
    }

    handleChange(value){
        
        this.setState({value:value})
        this.props.onChange && this.props.onChange(this.state.value)
        this.props.onSelected && this.props.onSelected()
    }

    handleClose(){
        this.props.onClose && this.props.onClose()
    }


    render() {
        
        return (
            <span className={this.props.prefixCls} >
                <RangePicker style={{ width: 150 }} format="yy/MM/dd" onChange={::this.handleChange} value={this.state.value} />
                <div className={`${this.props.prefixCls}-btns`}> 
                    <a className={`${this.props.prefixCls}-btns-ok`} onClick={::this.handleOk}>确定</a>
                    {//<a className={`${this.props.prefixCls}-btns-reset`} onClick={::this.handleReset}>重置</a>
                    //<a className={`${this.props.prefixCls}-btns-close`} onClick={::this.handleClose}>关闭</a>
                    }
                </div>
            </span>
        )
    }
}
