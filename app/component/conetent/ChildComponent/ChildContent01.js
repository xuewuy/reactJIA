import React from 'react'
import ReactDom from 'react-dom'
import {Button, Divider} from 'antd'

class ChildContent01 extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        <div>
            <Button type="primary">{this.props.num}</Button>
            <ul>
                   {
                       //再用props获取
                       this.props.arr.map(el=>{
                           return (
                               <li key={el}>{el}</li>
                           )
                       })
                   }
               </ul>
        </div>
    }
}

export default ChildContent01 