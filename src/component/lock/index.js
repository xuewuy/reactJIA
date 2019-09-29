import React,{ Component,PropTypes } from 'react'
import ReactDOM from 'react-dom'
import md5 from 'md5'
import {Button,Input,Message,Alert} from 'xComponent'
import {post,setAccessToken,clearAccessToken} from '../../utils/fetch-wrapper'
import './lock.less'
import webapi from 'webapi'
class LockComponent extends Component {
    static defaultProps = {
        prefixCls: 'lock'
    }
    state = {
      password:'',
      type:'text',
      validate:false,
      validateMessage:'密码不能为空'
    }
    handleClick(){
      if(!this.state.password){
        return this.showValidate('密码不能为空')
      }
      let pwd = md5(this.state.password+'yiJia9*'),
          orgId = sessionStorage.getItem('currentOrgId') || ''

      webapi.user.login(post,localStorage['loginUser'],pwd,orgId).then(data=>{
        if(!data.result && data.error){
          return this.showValidate(data.error.message)
        } 
        setAccessToken(data.token)
        if(window.lock.LockComponent.stop().result){
          window.lock.LockComponent.restart(this.props.time,this.props)
        }
      })
      
    }
    showValidate(text){
      this.setState({validate:true,validateMessage:text})
      setTimeout(()=>{
        this.hideValidate()
      },2000)
    }
    hideValidate(){
      this.setState({validate:false})
    }
    handleChange(e){
      this.setState({password:e.target.value})
    }
    handleFocus(){
      this.setState({type:'password',validate:false})
    }
    handleSwitchClick(){
      webapi.user.logout(post).then(data =>{
          if(!data.result){
              return
          }
          this.props.onLogoutSucess()
      })
    }
    setValidate(){
      if(this.state.validate){
        return (<Alert message={this.state.validateMessage} type="error" showIcon />)
      }else{
        return null
      }
    }
    render(){
        let {prefixCls} = this.props
        
      return(
        <div className={prefixCls}>
          <div className={`${prefixCls}-validate`}>
            {this.setValidate()}
          </div>
          <div className={`${prefixCls}-body`}>
            <h1>亲，长时间未操作请您重新登录</h1>
            <div className={`${prefixCls}-body-user`}>
              <label>账号：</label>
              <Input type='text' placeholder={localStorage['loginUser']} disabled></Input>
            </div>
            <div className={`${prefixCls}-body-password`}>
              <label>密码：</label>
              <Input type={this.state.type} value={this.state.password} placeholder='请输入密码' onPressEnter={::this.handleClick} onChange={::this.handleChange} onFocus={::this.handleFocus}></Input>
            </div>
            <div className={`${prefixCls}-body-btn`}>
              <Button type='primary' onClick={::this.handleClick}>登录</Button>
              <div className={`${prefixCls}-body-switch`}>
                切换账户<a href="javascript:;" onClick={::this.handleSwitchClick}>重新登录</a>
              </div>
            </div>
          </div>
        </div>
      )
  }
}


window.lock = {
  lockTime:20,
  timer:null,
  reSetTime:()=>{
    window.lock.lockTime = window.lock.date
  },
  removeEventListener:()=>{
    if (document.removeEventListener) {
        // document.removeEventListener('mousemove', window.lock.reSetTime, false)
        document.removeEventListener('click', window.lock.reSetTime, false)
        // document.removeEventListener('keydown', window.lock.reSetTime, false)
    } else if (document.detachEvent) {
        // document.detachEvent('onmousemove', window.lock.reSetTime)
        document.detachEvent('onclick', window.lock.reSetTime)
        // document.detachEvent('onkeydown', window.lock.reSetTime)
    } else {
        // document.onmousemove = undefined
        document.onclick = undefined
        // document.onkeydown = undefined
    }
  },
  addEventListener:()=>{
    if (document.addEventListener) {
        // document.addEventListener('mousemove', window.lock.reSetTime)
        document.addEventListener('click', window.lock.reSetTime)
        // document.addEventListener('keydown', window.lock.reSetTime)
    } else if (document.attachEvent) {
        // document.attachEvent('onmousemove', window.lock.reSetTime)
        document.attachEvent('onclick', window.lock.reSetTime)
        // document.attachEvent('onkeydown', window.lock.reSetTime)
    } else {
        // document.onmousemove = window.lock.reSetTime
        document.onclick = window.lock.reSetTime
        // document.onkeydown = window.lock.reSetTime
    }
  }
}
LockComponent.newInstance = function newLockInstance() {
  const div = document.createElement('div')
  div.id = 'lock'
  return {
    start(time,props){
      if(!window.lock.date){
        window.lock.date = time ? time : window.lock.lockTime
      }
      window.lock.lockTime = time ? time : window.lock.date
      clearInterval(window.lock.timer)
      if(localStorage['remember'] == 'true'){
        return window.lock.LockComponent.stop()
      }
      window.lock.addEventListener(time)
      console.log('在'+window.lock.lockTime+'分钟之后自动锁屏')
      window.lock.timer = setInterval(()=>{
        window.lock.lockTime--
        if(window.lock.lockTime <= 0){
          clearInterval(window.lock.timer)
          clearAccessToken()
          window.lock.removeEventListener()
          document.body.appendChild(div)
          ReactDOM.render(<LockComponent onLogoutSucess={props.onLogoutSucess} time={time} />, div)
        }
        console.log('在'+window.lock.lockTime+'分钟之后自动锁屏')
      },60000)
      
    },
    restart(time,props){
      window.lock.lockTime = time ? time : window.lock.date
      clearInterval(window.lock.timer)
      LockComponent.newInstance().start(time,props)
    },
    stop() {
      clearInterval(window.lock.timer)
      let s = ReactDOM.unmountComponentAtNode(div)
      window.lock.removeEventListener()
      try{
         document.body.removeChild(document.getElementById('lock'))
         return {result:true}
      }catch(e){
        return {result:false}
        debugger
      }
    }
  }
}

let Lock = window.lock.LockComponent
if(!window.lock.LockComponent){
  Lock = LockComponent.newInstance()
  window.lock.LockComponent = LockComponent.newInstance()
}

export default Lock