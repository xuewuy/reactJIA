import React,{Component} from 'react'
import DynamicComponent from 'dynamicComponent'
import {Icon,BackTop } from 'xComponent'
import './smallEnterprises.less'
import RcEchartsMap from  './RcEchartsMap.js'

export default class LandingComponent extends Component{

	static defaultProps = {
      	prefixCls: 'landing'
  	}

    componentDidMount() {

    }

  	handleLoginClick(){
  		this.props.onRedirect('apps/login/login',true)
  	}
    handleRegisterClick(){
        this.props.onRedirect('apps/login/register',true)
    }
    handleClientRegisterClick(){
        this.props.onRedirect('apps/login/clientRegister',true)
    }
    handleClickIndex(){
        //this.props.onRedirect('apps/root',true)
				location = "/"
    }
    handleTopClick2(e) {
        let clientHeight = document.documentElement.clientHeight || document.body.clientHeight
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop

        if(document.documentElement.scrollTop) {
            document.documentElement.scrollTop=0
        } else {
            document.body.scrollTop=0
        }
    }
    handlePhoneListMouseOut(e) {
        if(e.relatedTarget.nodeName=="DIV") {
            this.refs.phoneBtn.click();
        }
    }
    handlePadListMouseOut(e) {

        if(e.relatedTarget.nodeName=="DIV") {
            this.refs.padBtn.click();
        }
        if(e.relatedTarget.nodeName==null) {
        }
    }

    handleNavPhoneLayerClick() {
        this.refs.phoneBtn.click();
    }
    handleNavPadLayerClick() {
        this.refs.padBtn.click();
    }
    handlePhoneNavBtnClick() {

        if(this.refs.phoneNavList.style.height=='0px') {
            this.refs.navLayerPhone.style.display = 'none'
        } else {
            this.refs.navLayerPhone.style.display = 'block'
        }
    }
    handlePadNavBtnClick() {

        if(this.refs.padNavList.style.height=='0px') {
            this.refs.navLayerPad.style.display = 'none'
        } else {
            this.refs.navLayerPad.style.display = 'block'
        }

    }
	render(){
		return (
	<div className={this.props.prefixCls}>

        <nav className="navbar  navbar-new site-navbar navbar-fixed">
            <div className="container-fluid1">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar" id="phone-btn" ref="phoneBtn" onClick={::this.handlePhoneNavBtnClick}>
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>

                    <div className="header-logo">
                        <a href="javascript:;">
                            <img src={require("./img/logo2.png")} />
                            <span className="line">|</span>
                            <span className="logoText">智能财税平台</span>
                        </a>
                    </div>

                </div>

                <div className="navbar-header navbar-header-my">
                    <button type="button" className="navbar-toggle collapsed right-list navbar-right-btn" data-toggle="collapse" data-target="#navbar-rightList" aria-expanded="false" aria-controls="navbar-rightList" onClick={::this.handlePadNavBtnClick} ref="padBtn">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>

                    <div className="header-logo">
                        <a href="javascript:;">
                            <img src={require("./img/logo2.png")} />
                            <span className="line">|</span>
                            <span className="logoText">智能财税平台</span>
                        </a>
                    </div>

                    <div className="collapse navbar-collapse navbar-left dropdow-new navbar-leftList pad-show">
                        <ul className="nav navbar-nav  nav-new">
                            <li  onClick={::this.handleClickIndex}><a href="#">首页</a>
                            </li>
                            <li className='active'>
                                <a href="javascript:;">小微企业</a>
                            </li>
                            <li>
                                <a href="javascript:;">服务商</a>
                            </li>
                            <li>
                                <a href="javascript:;">社区</a>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="nav-right-btn hidden-my">
                    <button type="button" className="navbar-toggle collapsed right-list" data-toggle="collapse" data-target="#navbar-rightList" aria-expanded="false" aria-controls="navbar-rightList">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                </div>

                <div className="loginWarp collapse navbar-collapse navbar-right dropdow-new hidden-my">
                    <div className="login-a">
                        <a className='login-button' href="javascript:void(0)" onClick={::this.handleLoginClick}>登录</a>
                        <a className={this.props.prefixCls + '-register'} onClick={::this.handleClientRegisterClick}>企业注册</a>
                        <a className='line' href="javascript:;">|</a>
                        <a className={this.props.prefixCls + '-register'} onClick={::this.handleRegisterClick} >服务商注册</a>
                    </div>

                </div>

                <div className="collapse navbar-collapse navbar-left dropdow-new hidden-my  pc-show">
                    <ul className="nav navbar-nav  nav-new">
                        <li  onClick={::this.handleClickIndex}><a href="#">首页</a>
                        </li>
                        <li className='active'>
                            <a href="javascript:;">小微企业</a>
                        </li>
                        <li>
                            <a href="javascript:;">服务商</a>
                        </li>
                        <li>
                            <a href="javascript:;">社区</a>
                        </li>

                        <li className='dispHi'>
                            <a href="javascript:void(0)" onClick={::this.handleLoginClick}>登录</a>
                        </li>
                        <li className='dispHi'>
                            <a onClick={::this.handleClientRegisterClick}>企业注册</a>
                        </li>
                        <li className='dispHi'>
                            <a onClick={::this.handleRegisterClick} >服务商注册</a>
                        </li>
                    </ul>
                </div>


            </div>
        </nav>

        <div id="navbar" className="collapse navbar-collapse navbar-left dropdow-new hidden-my  phone-show  navbar-list-fixed" onMouseOut={::this.handlePhoneListMouseOut} ref="phoneNavList">
            <ul className="nav navbar-nav  nav-new">
                <li><a href="#"  onClick={::this.handleClickIndex}>首页</a>
                </li>
                <li>
                    <a  href="javascript:;">小微企业</a>
                </li>
                <li>
                    <a href="javascript:;">服务商</a>
                </li>
                <li>
                    <a href="javascript:;">社区</a>
                </li>

                <li className='dispHi'>
                    <a href="javascript:void(0)" onClick={::this.handleLoginClick}>登录</a>
                </li>
                <li className='dispHi'>
                    <a onClick={::this.handleClientRegisterClick}>企业注册</a>
                </li>
                <li className='dispHi'>
                    <a onClick={::this.handleRegisterClick} >服务商注册</a>
                </li>
            </ul>
        </div>

        <div  className="collapse navbar-collapse navbar-right dropdow-new clickNew1 pad-show  navbar-list-fixed" id="navbar-rightList" onMouseOut={::this.handlePadListMouseOut}  ref="padNavList">
            <ul className="nav navbar-nav  nav-new login-list">
                <li className='dispHi2'>
                    <a href="javascript:void(0)" onClick={::this.handleLoginClick}>登录</a>
                </li>
                <li className='dispHi2'>
                    <a onClick={::this.handleClientRegisterClick}>企业注册</a>
                </li>
                <li className='dispHi2'>
                    <a onClick={::this.handleRegisterClick} >服务商注册</a>
                </li>
            </ul>
        </div>

        <div className="carousel slide small-carousel carousel-martop">
            <div className="container-fluid">
                <div className='left-text'>
                    <h1>小微企业智能财税云平台</h1>
                    <p>管好生意，轻松记账；迈入业务和财务一体化新时代</p>
                </div>
                <div className='right-img2'>
                    <img className='img-responsive map-img2' src={require("./img/map2.png")}/>
                    <span></span>
                </div>
            </div>
        </div>
        <div className='startUsing'>
            <div className='container'>
                <div className='row col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                    <h1>开始使用</h1>
                    <p>快速注册，填写企业信息，开通账套即可使用</p>
                    <img src={require("./img/startUsing.png")} className='img-responsive' alt=""/>
                </div>
            </div>
        </div>
      	<div id="advantage" className="grey">
            <div className="container">
                <div className="advantage">
                    <h1>找服务</h1>
                    <p>根据企业自身使用情况，选择您需要的财税服务</p>
                </div>
           	  <div className="row">
                	<div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 layout">
                	   <div className="my-modal">
                            <img src={require("./img/tuoguan.png")} alt=""/>
                        </div>
                        <div className="adv-list">
                            <h1>财税全托管</h1>
                            <p>根据账期生成账单，上下游自动对账</p>
                            <p>上下游的单据自动流转</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 layout">
                    	<div className="my-modal">
                        	<img src={require("./img/zizhu.png")} alt=""/>
                        </div>
                        <div className="adv-list">
                        	<h1>财税自助</h1>
                            <p>业务单据自动生成会计凭证及报表</p>
                            <p>实时核算成本</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 layout">
                    	<div className="my-modal">
                        	<img src={require("./img/peixun.png")} alt=""/>
                        </div>
                        <div className="adv-list">
                        	<h1>财税培训</h1>
                            <p>基于人工智能技术的自学习和专家系统</p>
                            <p>业务异常情况下的智能财税处理</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 layout">
                        <div className="my-modal">
                            <img src={require("./img/gongshangtong.png")} alt=""/>
                        </div>
                        <div className="adv-list">
                            <h1>工商通</h1>
                            <p>选用平台认证会计，只需专注核心业务</p>
                            <p>企业与代账会计用一套账</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 layout">
                        <div className="my-modal">
                            <img src={require("./img/shuiwuyou.png")} alt=""/>
                        </div>
                        <div className="adv-list">
                            <h1>税无忌</h1>
                            <p>介绍：自助财税自助财税自助财税</p>
                            <p>自助财税自助财税自助财税</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 layout">
                        <div className="my-modal">
                            <img src={require("./img/jiasuqi.png")} alt=""/>
                        </div>
                        <div className="adv-list">
                            <h1>上市加速器</h1>
                            <p>介绍：自助财税自助财税自助财税</p>
                            <p>自助财税自助财税自助财税</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div className='map'>
            <div className='container'>
                <RcEchartsMap />
            </div>
        </div>
      	<div id="vesion" className="cost">
            <div className="container">
                <div className="advantage">
                    <h1>快支付</h1>
                    <p>选择网银、微信、支付宝和淘宝都可以快速进行线上支付</p>
                </div>
            	<div className="row">
                	<div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 m30">
                        <img className='img-responsive' src={require("./img/zhifubao.png")} alt=""/>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 m30">
                        <img className='img-responsive' src={require("./img/weixin.png")} alt=""/>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 m30">
                        <img className='img-responsive' src={require("./img/wangyin.png")} alt=""/>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 m30">
                        <img className='img-responsive' src={require("./img/weibo.png")} alt=""/>
                    </div>
                </div>
            </div>
        </div>
      	<div className="footer">
        	<p className="infor">
            	<span className="address">公司地址：北京市东城区南大街1号来福士19层</span>
                <span className="company">copyright @ 2015-2016 北京人人时代科技有限公司</span>
            </p>
            <h1>企业管理，随你掌控！<a href="javascript:;" onClick={::this.handleLoginClick}  className="footer-btn">立即体验</a></h1>
        </div>


        <div className="nav-layer phone-show" onClick={::this.handleNavPhoneLayerClick} ref='navLayerPhone'>
        </div>
        <div className="nav-layer pad-show" onClick={::this.handleNavPadLayerClick} ref='navLayerPad'>
        </div>
        <BackTop />


	</div>
        )
	}
}
