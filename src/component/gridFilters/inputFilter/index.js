import React from 'react'

import {Input, Icon} from 'xComponent'
import './style.less'


export default class InputFilterComponent extends React.Component {
  
    static defaultProps = {
        prefixCls: 'inputfilter'
    }

    state = {
        value : ''
    }

    constructor(props){
        super(props)
        this.state = this.calculateState(this.props)
    }

    componentWillReceiveProps(nextProps){
        this.setState(this.calculateState(nextProps))
    }

    calculateState(props){
        return {value:props.value}
    }

    handleOk(){
        this.props.onOk && this.props.onOk(this.state.value)
    }

    handleReset(){
        this.setState({value:''})
        this.props.onReset && this.props.onReset()
    }

    handleChange(e){
        this.setState({value:e.target.value})
        this.props.onChange && this.props.onChange(this.state.value)
    }

    handleClose(){
         this.props.onClose && this.props.onClose()
    }


    render() {
        return (
            <span className={this.props.prefixCls} >
              <Input ref='input' className={`${this.props.prefixCls}-input`} value={this.state.value} onChange={::this.handleChange}/>
                <div className={`${this.props.prefixCls}-btns`}> 
                    <a className={`${this.props.prefixCls}-btns-ok`} onClick={::this.handleOk}>确定</a>
                    {//<a className={`${this.props.prefixCls}-btns-reset`} onClick={::this.handleReset}>重置</a>}
                    //<a className={`${this.props.prefixCls}-btns-close`} onClick={::this.handleClose}>关闭</a>}
                    }
                </div>
            </span>
        )
    }
}
