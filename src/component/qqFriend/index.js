import React,{ Component,PropTypes } from 'react'
import {Spin} from 'antd'
import ReactDOM from 'react-dom'
import './style.less'

class QqFriendComponent extends Component {
    static defaultProps = {
        prefixCls: 'qqFriend'
    }

	render(){
		let {prefixCls} = this.props,
      // tip = this.props.content || '正在处理中...',
        showBackground  = (this.props.showBackground === false ? false : true)
        return showBackground ? 
            <div className={prefixCls+'-1'}>
                <div style = {{display:'inline-block',position:'relative'}}>
                    <span 
                        style = {{position:'absolute',padding:'2px 5px',color:'#999',background:'#fff',border:'1px solid #ddd',right:'-20px',top:'0px',cursor:'pointer'}}
                        onClick = {this.props.hide}>X</span>
                    <iframe frameborder = '0' scrolling = 'no' width = '940' height = '590'   id = 'qqFriend' src={this.props.url}></iframe>
                </div>
              
            </div>: 
        <div className={prefixCls+'-2'}></div> 
  }
}



QqFriendComponent.newInstance = function newQqFriendInstance() {
  const div = document.createElement('div')
  return {
  	show(url){
  		document.body.appendChild(div)
  		ReactDOM.render(<QqFriendComponent url = {url} hide = {this.hide} />, div)
  	},
  	hide() {
      	ReactDOM.unmountComponentAtNode(div)
        try{
      	   document.body.removeChild(div)
        }catch(e){

        }
    }
  }
}

let qqFriend = window.qqFriend

if(!qqFriend){
    qqFriend = QqFriendComponent.newInstance()
    window.qqFriend = qqFriend
}



export default qqFriend