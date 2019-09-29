import React from 'react'
import ReactDOM from 'react-dom'

export default class TimeItemYear extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        let value = this.props.value
        if(value){
            return (
                <div className={`${this.props.prefixCls}-yearCard`}>
                    <div className={`${this.props.prefixCls}-yearCard-warp`}>
                        <div style={{background:this.props.color || '#89CD89'}}>{this.props.value}</div>
                    </div>
                </div>
            )
        }else{
            return (
                <div className={`${this.props.prefixCls}-dot`} style={{background:this.props.color || '#89CD89'}}>
                </div>
            )
        }
        
    }
}