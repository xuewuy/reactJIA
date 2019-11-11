import React from 'react'
import DynamicComponent, {Modal} from 'dynamicComponent'
import { Menu, Dropdown, Button, Card, Checkbox ,Input} from 'xComponent'
const DropdownButton = Dropdown.Button
import './shareReport.less'
import defaultUser from  '../../../static/images/default/defaultUserMen.svg'
import headImg from  './img/head.png'
import * as api from './api'

export default class CurrentReport extends React.Component {
    static defaultProps = {
        prefixCls: 'shareReport'
    }
    componentDidMount() {
        this.props.initView()
    }
    toHomePage(){
        window.location.href = window.location.protocol+'//'+window.location.host
        //window.location.reload()
    }
    componentDidUpdate(){
        if(!!window.ActiveXObject || "ActiveXObject" in window) {
            //ie11flex支持不好，表体出不来
            // document.querySelector('.rc-table-content').style.display = 'block'
            setTimeout(function(){
                document.querySelector('.shareReport .rc-table-content').style.display = 'block'
            },1000)

        }
        let timerDOM = document.querySelector('.timers')
        if(timerDOM){
            let l = 5
            let timer = setInterval(()=>{
                timerDOM.innerHTML =l+ 's'
                if(l===0){
                    clearInterval(timer)
                    window.location.href = '../index.html'
                }
                l--
            },1000)
        }
    }
    getItems(list){

        if(!list || list.length === 0){
            return null
        }else{
            let domArr = []
            list.map(item=>{
                domArr.push(<div className = 'formContentItem' key = {item.subject}>
                        <span>{item.subject}</span>
                        <span>{item.value}</span>
                    </div>)
            })
            return domArr
        }
    }
    getContent(data){
        let message = this.props.payload.getIn(['global', 'message']),
            {prefixCls, ...otherProps} = this.props,
            getterByField = this.props.payload.getIn(['utils', 'getterByField']),
            pariod = '',
            orgName = ''
            if(getterByField('date')){
                let begindate = getterByField('date').toJS().begindate.split('-').join('.'),
                    enddate = getterByField('date').toJS().enddate.split('-').join('.')
                orgName = getterByField('orgName')
                pariod = begindate+'-'+enddate
            }
        return data? [
            <div className = 'out-date'>
                <img src={require('./img/ico.png')}/>
                <h3>分享已过期  <time className="timers">5s</time>后返回首页</h3>
            </div>
        ]:[
            <div className ={`${prefixCls}-title`} key = 'a1'>
                            <h3>{orgName} {pariod}收支统计表</h3>
                    </div>,
                     <DynamicComponent {...otherProps}
                            _path="root.list"
                            scroll={{y:true,x:true}}
                            key = 'a2'
                            bodyStyle={{overflow:'auto'}}/>
                ]


    }
    getRightTopContent(appInfo){
        let arr = [],
            userImg = defaultUser
        if( localStorage["currentUserName"] !=='null' ){
            arr.push(<span>
                    <img
                        height="30"
                        src={userImg}
                        style={{"marginRight":'8px'}}/>
                    <span
                        style={{"paddingTop": "15px", "left": "63px","fontSize":"16px"}}>
                        {localStorage["currentUserName"]}
                    </span>
                </span>)
        }else{
            arr.push(<span key = 'login'>已有账号，请<a href ='index.html#apps/login/login' >登录</a>，<a href ='index.html#apps/login/clientRegister' >立即注册</a></span>)
        }

        return arr
    }

    render(){
    	if (!this.props.payload || !this.props.payload.get('utils'))
            return null
        let message = this.props.payload.getIn(['global', 'message']),
            {prefixCls, ...otherProps} = this.props,
            getterByField = this.props.payload.getIn(['utils', 'getterByField']),
            pariod = '',
            appInfo = getterByField('appInfo')

        let winWidth = null
            if (window.innerWidth){
                winWidth = window.innerWidth;
            }else if ((document.body) && (document.body.clientWidth)){
                winWidth = document.body.clientWidth;
            }
        return (
            <div className={prefixCls}>
                <Card>
                    <div className ={`${prefixCls}-logo`}>
                        {::this.getRightTopContent(appInfo)}
                    </div>
                    {::this.getContent(getterByField('outDate'))}
                    {Modal(message)}
                </Card>
            </div>
        )


    }
}
