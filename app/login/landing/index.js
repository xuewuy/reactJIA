import React,{Component} from 'react'
import DynamicComponent from 'dynamicComponent'
import {Icon,BackTop } from 'xComponent'
import './landing.less'

export default class LandingComponent extends Component{

	static defaultProps = {
      	prefixCls: 'landing'
  	}

    componentDidMount() {

    }


    handleScroll() {
        let clientHeight = document.documentElement.clientWidth || document.body.clientWidth
        let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop
        if(clientHeight<scrollHeight) {
            this.refs.returnTop.style.display = "block";
        } else {
            this.refs.returnTop.style.display = "none";
        }
    }

  	handleLoginClick(){
  		this.props.onRedirect('apps/login/login',true)
  	}

    handleRegisterClick(){
        this.props.onRedirect('apps/login/register',true)
    }
    handleSmallEnterprisesClick(){
        this.props.onRedirect('apps/login/smallEnterprises',true)
    }
    handleClientRegisterClick(){
        this.props.onRedirect('apps/login/clientRegister',true)
    }
    returnTop(e) {
    }
    handleTopClick(e) {
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
                            <li className='active'><a href="#">首页</a>
                            </li>
                            <li>
                                <a href="javascript:;" onClick={::this.handleSmallEnterprisesClick}>小微企业</a>
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
                        <a className={this.props.prefixCls + '-register'} onClick={::this.handleClientRegisterClick}>注册</a>
                    </div>

                </div>

                <div className="collapse navbar-collapse navbar-left dropdow-new hidden-my  pc-show">
                    <ul className="nav navbar-nav  nav-new">
                        <li className='active'><a href="#">首页</a>
                        </li>
                        <li>
                            <a href="javascript:;" onClick={::this.handleSmallEnterprisesClick}>小微企业</a>
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
                            <a onClick={::this.handleClientRegisterClick}>注册</a>
                        </li> 
                    </ul>
                </div>


            </div>
        </nav>

        <div id="navbar" className="collapse navbar-collapse navbar-left dropdow-new hidden-my  phone-show navbar-list-fixed" onMouseOut={::this.handlePhoneListMouseOut} ref="phoneNavList">
            <ul className="nav navbar-nav  nav-new">
                <li><a href="#">首页</a>
                </li>
                <li>
                    <a href="javascript:;" onClick={::this.handleSmallEnterprisesClick}>小微企业</a>
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
                    <a onClick={::this.handleClientRegisterClick}>注册</a>
                </li> 
            </ul>
        </div>

        <div  className="collapse navbar-collapse navbar-right dropdow-new clickNew1 pad-show navbar-list-fixed" id="navbar-rightList" onMouseOut={::this.handlePadListMouseOut}  ref="padNavList">
            <ul className="nav navbar-nav  nav-new login-list">
                <li className='dispHi2'>
                    <a href="javascript:void(0)" onClick={::this.handleLoginClick}>登录</a>
                </li>
                <li className='dispHi2'>
                    <a onClick={::this.handleClientRegisterClick}>注册</a>
                </li> 
            </ul>
        </div>
        <div className="carousel slide login-carousel carousel-martop">
            <div className="container-fluid">
                <div className='left-text'>
                    <h1>小微企业智能财税云平台</h1>
                    <p>管好生意，轻松记账；迈入业务和财务一体化新时代</p>
                    <a href="javascript:;" onClick={::this.handleLoginClick}>立即体验</a>
                </div>
                <img className='img-responsive map-img1' src={require("./img/map.png")}/>
            </div>
        </div>
      	<div id="advantage" className="grey">
        	<p className="advantage">我们能做什么</p>
            <div className="container">
           	  <div className="row">
                	<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 layout">
                	   <div className="my-modal">
                            <img src={require("./img/1.png")} alt=""/>
                        </div>
                        <div className="adv-list">
                            <h1>业务一体化</h1>
                            <p>业务单据自动生成会计凭证及报表，实时核算成本，为生意提供利润参考；智能生成应收账款，及时预警控制风险</p>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 layout">
                    	<div className="my-modal">
                        	<img src={require("./img/2.png")} alt=""/>
                        </div>
                        <div className="adv-list">
                        	<h1>智能财税</h1>
                            <p>基于人工智能技术的自学习和专家系统，以大数据智能评测。能在业务异常情况下智能提醒和理财处理</p>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 layout">
                    	<div className="my-modal">
                        	<img src={require("./img/3.png")} alt=""/>
                        </div>
                        <div className="adv-list">
                        	<h1>专业化服务</h1>
                            <p>专业化社区为您解答财税方面的问题，您还可以选择经过我们认证的财税专家为您提供专项服务</p>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 layout">
                        <div className="my-modal">
                            <img src={require("./img/4.png")} alt=""/>
                        </div>
                        <div className="adv-list">
                            <h1>上下游协同</h1>
                            <p>上下游的单据自动流转，自动完成对账，客户可以对订单全程跟踪，智能提醒，方便协作</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
      	<div id="vesion" className="cost">
        	<p className="advantage">核心优势</p>
            <div className="container">
            	<div className="row">
                	<div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 m30">
                    	<div className="free">
                            <img src={require("./img/resource.jpg")} alt=""/>
                        	<div><strong>深厚的资源</strong></div>
                            <p>行业资源+大数据积累</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 m30">
                    	<div className="free">
                        	<img src={require("./img/team.jpg")} alt=""/>
                            <div><strong>专业的团队</strong></div>
                            <p>20年财税经验+ERP技术研发</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 m30">
                    	<div className="free">
                        	<img src={require("./img/pattern.jpg")} alt=""/>
                            <div><strong>创新模式</strong></div>
                            <p>平台化应用+专业化服务+智能财税</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      	<div className="footer">
        	<p className="infor">
            	<span className="address">公司地址：北京市东城区南大街1号来福士19层</span>
                <span  className="company">copyright @ 2015-2016 北京人人时代科技有限公司</span>
            </p>
            <h1>企业管理，随你掌控！<a href="javascript:;" onClick={::this.handleLoginClick} className="footer-btn">立即体验</a></h1>
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
