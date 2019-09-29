import React from 'react'
import { Checkbox, Button } from 'antd';
const CheckboxGroup = Checkbox.Group;
import './style.less'

export default class CheckboxGroupFilterComponent extends React.Component {
    static defaultProps = {
        prefixCls: 'checkboxgroupfilter'
    }

    state = {
        dataSource : [
        /*
          { label: '苹果', value: 'Apple' },
          { label: '梨', value: 'Pear' },
          { label: '橘', value: 'Orange' },*/
        ],
        value:[]
    }

    constructor(props){
        super(props)
        this.state = this.calculateState(this.props)
    }

    componentWillReceiveProps(nextProps){
        this.setState(this.calculateState(nextProps))
    }

    calculateState(props){
        return {
            value:props.value ? props.value.toJS() : undefined,
            dataSource: props.dataSource ? props.dataSource.toJS(): undefined
        }
       
    }


    handleChange(checkedValues){
        this.setState({value:checkedValues})
    }

    handleOk(){
        this.props.onOk && this.props.onOk(this.state.value)
    }

    handleReset(){
        this.setState({value:[]})
        this.props.onReset && this.props.onReset()
    }

    handleClose(){
         this.props.onClose && this.props.onClose()
    }

    render() {
        return (
            <div className={this.props.prefixCls}>
                <CheckboxGroup
                    options={this.state.dataSource} 
                    defaultValue={[]} 
                    onChange={::this.handleChange} 
                    value = {this.state.value}
                />
                <div className={`${this.props.prefixCls}-btns`}> 
                    <Button type='primary' onClick={::this.handleOk}>确定</Button>
                   {// <a className={`${this.props.prefixCls}-btns-ok`} onClick={::this.handleOk}>确定</a>
                    //<a className={`${this.props.prefixCls}-btns-reset`} onClick={::this.handleReset}>重置</a>}
                    //<a className={`${this.props.prefixCls}-btns-close`} onClick={::this.handleClose}>关闭</a>}
                    }
                </div>
            </div>
        )
    }
}
