import React,{ Component,PropTypes } from 'react'
import {Button} from 'xComponent'

export default class CountDownComponent extends Component {
    static defaultProps = {
        prefixCls: 'countDown'
    }

    state = {
        currentCount:0
    }

    constructor(props){
        super(props)
        this.reset = this.reset.bind(this)
    }

    handleClick(e){
        let timer = null
        let setTime = ()=>{
            let currentCount = this.state.currentCount
            if(currentCount == -1){
                 this.setState( {currentCount:0})
                 return
            }

            currentCount = currentCount > 0 ? currentCount - 1: this.props.count

            this.setState({currentCount:currentCount})
            if(currentCount > 0)
            timer = setTimeout( setTime, 1000) 
        }

        setTime()

        this.props.onClick && this.props.onClick(() => {
            clearTimeout(timer)
            this.setState( {currentCount:0})
        })
    }

    reset(){
        
        this.setState( {currentCount:-1})
    }

    render() {
	    let currentCount = this.state.currentCount,
            disabled = currentCount > 0,
            text = disabled ? `${this.props.text}(${currentCount})` : this.props.text,
            type = this.props.type ? this.props.type : null

            if(this.props.disabled) {
                disabled = this.props.disabled
            }

        return (
          <Button type={type} style={this.props.style}  disabled={disabled} onClick={::this.handleClick}>{text}</Button>
        )
    }
}
