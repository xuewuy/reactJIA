var shareJS = {
    getSearch:function (){
        var search = window.location.search.slice(1),
            arr = search.split('&'),
            searchJson = {}
        for(var i=0; i<arr.length;i++){
            arr[i].split('=')
            searchJson[arr[i].split('=')[0]] = arr[i].split('=')[1]
        }
        return searchJson
    },
    init: function() {
        this.mobileData = {
            year: '',
            month: '',
            amount: '',
            name: '',
            phone: ''
        }
        var searchJson=shareJS.getSearch(),
            host = window.location.host,
            shareUrl = location.protocol+ '//'+host,
            url = 'v1/web/dz/feedBack/updateFeedbackStatus',
            list = {},
            taxAmount = searchJson.a
        // list.token = searchJson.tk
        list.year = searchJson.d.split('-')[0]-0
        list.month = searchJson.d.split('-')[1]-0
        list.customerOrgId = searchJson.c
        list.taxType = searchJson.t
        list.orgId = searchJson.o
        // list.name = searchJson.n
        list.userId = searchJson.u
        list.id = searchJson.fid
        list.ts = searchJson.ts.replace('%20',' ')
        list.status = 1
        this.mobileData.year = list.year
        if(list.month-0<10) {
            this.mobileData.month = '0'+list.month

        } else {

            this.mobileData.month = list.month
        }
        this.mobileData.name = list.name
        this.mobileData.amount = taxAmount
        this.mobileData.list = list
        this.mobileData.url = url
        // document.querySelector('#shareInfo').innerHTML = list.name+list.year+'年'+this.mobileData.month+'月份应缴个人所得税税款金额：'
        document.querySelector('.shareRMB').innerHTML = '￥'+taxAmount
        document.querySelector('.shareDate').innerHTML = list.year+'-'+this.mobileData.month

        this.fecthData(list,url)
        this.getAppImgUrl()
        
    },
    getAppImgUrl:function (){
        var _this = this
        this.ajax({
            url:'v1/app/getById',
            type: "POST",
            data: {id:_this.getSearch().appId},
            dataType: "json",
            isGetAppInfo: true,
            success: function (response, xml) {
                var appData

                if(!JSON.parse(response).value){
                    appData={
                        "id":100,
                        "parentId":10,
                        "name":"易嘉人",
                        "status":1,
                        "homeUrl":"https://www.rrtimes.com",
                        "appEmail":"liyue@rrtimes.com",
                        "qrCodeWx":"https://www.rrtimes.com/img/100/wxCode.png",
                        "companyName":"北京人人时代科技有限公司",
                        "companyNameShort":"人人时代",
                        "iconUrl":"https://www.rrtimes.com/img/100/favicon.png",
                        "logoUrlLogin":"https://www.rrtimes.com/img/100/logo.png",
                        "logoUrlPortal":"https://www.rrtimes.com/img/100/portalLogo.png",
                        "logoUrlShare":"https://www.rrtimes.com/img/100/share.png",
                        "appDomain":",dev.rrtimes.com,test.rrtimes.com,demo.rrtimes.com,yj.rrtimes.com,127.0.0.1,",
                        "appCopyrightYear":"2017-2019",
                        "logoUrlEmail":"https://www.rrtimes.com/img/100/portalLogo.png",
                        "appServiceTel":"17319162004"
                    }
                }else{
                    appData = JSON.parse(response).value
                }
                _this.setTitleAndLogo(appData)
            },
            fail: function (status) {
                // fail
            }
        });
    },
    fecthData:function (list,url){
        var _this = this;
        this.ajax({
            url:url,
        type: "POST",
            data: list,
            dataType: "json",
            success: function (response, xml) {
                // todo
                _this.initPage(JSON.parse(response),list)
                _this.orgName = JSON.parse(response).value.orgName
            },
            fail: function (status) {
                // fail
            }
        });
    },
    orgName: '',
    initPage:function (data,list){

      if(!data.result){
        this.renderOutDate()

        document.querySelector('.out-time').style.display = 'block'
        return
      }else{
        this.renderMobilePage(data,list)
        var share
      }
    },
    renderMobilePage:function(ajaxData,list){
        if(ajaxData&&ajaxData.value&&ajaxData.value.ts&&list) {
            list.ts = ajaxData.value.ts
        }

        if(ajaxData&&ajaxData.result) {
            var overdue = this.getDate(new Date(ajaxData.value.ts),1 ),
                curDate = new Date()
            // if(curDate.getTime()>overdue.getTime()) {
            //     // this.renderOutDate()
            //     document.querySelector('.out-date').style.display = 'flex'
            //     document.querySelector('.shareContent').style.display = 'none'
            //     document.querySelector('.alreadyWhat').style.display = 'none'
            //     document.querySelector('.alreadySure').style.display = 'none'
            //     document.querySelector('.mobile').style.display = 'flex'
            //     document.querySelector('.promtBox').style.display = 'none'
                
                
            //     return 
            // }
            if(list.status == 1) {
                var taxTypeStr = ''
                if(list.taxType ==1) {
                    taxTypeStr = '增值税'
                } else if(list.taxType ==2) {
                    taxTypeStr = '企业所得税预缴'

                }
                document.querySelector('.mobile').style.display = 'flex'
                document.querySelector('.shareContent').style.display = 'flex'
                document.querySelector('.out-date').style.display = 'none'                
                document.querySelector('.alreadyWhat').style.display = 'none'
                document.querySelector('.alreadySure').style.display = 'none'
                document.querySelector('.shareRMB').innerHTML = '￥'+ajaxData.value.taxAmount.toFixed(2)
                document.querySelector('#shareInfo').innerHTML = ajaxData.value.orgName+list.year+'年'+this.mobileData.month+'月份应缴'+ajaxData.value.taxTypeName+'税款金额：'
                if(ajaxData.value.pName&&ajaxData.value.pMobile) {
                    document.querySelector('.sharePhone').innerHTML = ajaxData.value.pName+':<a href="tel:'+ajaxData.value.pMobile+'">'+ajaxData.value.pMobile+'</a>(拨打)'

                } else {
                    document.querySelector('.sharePhone').innerHTML = ''

                }

                if(ajaxData.value.result) {
                    document.querySelector('.promtBox').style.display = 'none'
                    document.querySelector('.shareWhat').disabled = false
                    document.querySelector('.shareSure').disabled = false
                } else {
                    document.querySelector('.shareWhat').disabled = true
                    document.querySelector('.shareSure').disabled = true
                    document.querySelector('.promtBox').style.display = 'block'
                    if(ajaxData.value.status==1) {
                        document.querySelector('.promtBoxImg').innerHTML = "<img src='img/yc.png' />"
                        document.querySelector('.promtBoxContent p').innerHTML = '出现异常请更新'

                    } else if(ajaxData.value.status==2||ajaxData.value.status==3) {
                        // document.querySelector('.promtBoxImg').innerHTML = "<img src='img/qr.png' />"
                        // document.querySelector('.promtBoxContent p').innerHTML = '已反馈'
                        document.querySelector('.out-date').style.display = 'flex'
                        document.querySelector('.shareContent').style.display = 'none'
                        document.querySelector('.alreadyWhat').style.display = 'none'
                        document.querySelector('.alreadySure').style.display = 'none'
                        document.querySelector('.mobile').style.display = 'flex'
                        document.querySelector('.promtBox').style.display = 'none'
                        return
                    } else {
                        document.querySelector('.promtBoxImg').innerHTML = "<img src='img/sb.png' />"
                        document.querySelector('.promtBoxContent p').innerHTML = '异常'
                    }
                }
            } else if(list.status == 2) {
                if(ajaxData.value.result) {
                    document.querySelector('.shareContent').style.display = 'none'
                    document.querySelector('.alreadyWhat').style.display = 'flex'
                    document.querySelector('.alreadySure').style.display = 'none'
                    document.querySelector('.out-date').style.display = 'none'                
                
                } else {
                    if(ajaxData.value.status==1) {
                         document.querySelector('.promtBoxImg').innerHTML = "<img src='img/sb.png' />"
                        document.querySelector('.promtBoxContent p').innerHTML = '反馈失败'
                    } else if(ajaxData.value.status==2||ajaxData.value.status==3) {
                        // document.querySelector('.promtBoxImg').innerHTML = "<img src='img/qr.png' />"
                        // document.querySelector('.promtBoxContent p').innerHTML = '已反馈'
                        document.querySelector('.out-date').style.display = 'flex'
                        document.querySelector('.shareContent').style.display = 'none'
                        document.querySelector('.alreadyWhat').style.display = 'none'
                        document.querySelector('.alreadySure').style.display = 'none'
                        document.querySelector('.mobile').style.display = 'flex'
                        document.querySelector('.promtBox').style.display = 'none'
                        return
                    }
                    document.querySelector('.shareWhat').disabled = false
                    document.querySelector('.shareSure').disabled = false
                    document.querySelector('.promtBox').style.display = 'block'
                }
            } else if(list.status == 3) {
                if(ajaxData.value.result) {
                    document.querySelector('.shareContent').style.display = 'none'
                    document.querySelector('.alreadyWhat').style.display = 'none'
                    document.querySelector('.alreadySure').style.display = 'flex'
                    document.querySelector('.out-date').style.display = 'none'                
                
                } else {
                    if(ajaxData.value.status==1) {
                         document.querySelector('.promtBoxImg').innerHTML = "<img src='img/sb.png' />"
                        document.querySelector('.promtBoxContent p').innerHTML = '反馈失败'
                    } else if(ajaxData.value.status==2||ajaxData.value.status==3) {
                        // document.querySelector('.promtBoxImg').innerHTML = "<img src='img/qr.png' />"
                        // document.querySelector('.promtBoxContent p').innerHTML = '已反馈'
                        document.querySelector('.out-date').style.display = 'flex'
                        document.querySelector('.shareContent').style.display = 'none'
                        document.querySelector('.alreadyWhat').style.display = 'none'
                        document.querySelector('.alreadySure').style.display = 'none'
                        document.querySelector('.mobile').style.display = 'flex'
                        document.querySelector('.promtBox').style.display = 'none'
                        return
                    }
                    document.querySelector('.shareWhat').disabled = false
                    document.querySelector('.shareSure').disabled = false
                    document.querySelector('.promtBox').style.display = 'block'
                }
            }
        } else {
                        document.querySelector('.promtBoxImg').innerHTML = "<img src='img/sb.png' />"
            document.querySelector('.promtBoxContent p').innerHTML = '异常'
        }
        // this.initWeiXinShare(ajaxData.value)
    },
    renderOutDate:function  (){
        var l = 5;
        var timerDOM =document.querySelector('.timers')

        var timer = setInterval(function(){
            timerDOM.innerHTML =l+'s'
            if(l==0) {
              clearInterval(timer)
            //   window.location.href = '../index.html'
              window.location.href = window.location.origin + '/index.html'
            }
            l--
        },1000)
    },
    ajax: function (options) {
        var host = window.location.host
        if(/localhost/.test(window.location.host) || /127.0.0.1/.test(window.location.host)){
            host = 'dev.rrtimes.com'
        }
        options.url = window.location.protocol+'//'+host+'/'+options.url
        options = options || {};
        options.type = (options.type || "GET").toUpperCase();
        options.dataType = options.dataType || "json";
        var params = JSON.stringify(options.data);
        //创建 - 非IE6 - 第一步
        if (window.XMLHttpRequest) {
            var xhr = new XMLHttpRequest();
        } else { //IE6及其以下版本浏览器
            var xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }

        //接收 - 第三步
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var status = xhr.status;
                if (status >= 200 && status < 300) {
                    options.success && options.success(xhr.responseText, xhr.responseXML);
                } else {
                    options.fail && options.fail(status);
                }
            }
        }

        //连接 和 发送 - 第二步
        if (options.type == "GET") {
            xhr.open("GET", options.url + "?" + params, true);
            xhr.send(null);
        } else if (options.type == "POST") {
            xhr.open("POST", options.url, true);
            //设置表单提交时的内容类型
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(params);
        }
    },
    handleWhatClick: function() {
        var list = this.mobileData.list,
            url = this.mobileData.url
        console.log(list)
        list.status = 2
        this.fecthData(list,url)
    },
    handleSureClick: function() {
        console.log('sure')
        var list = this.mobileData.list,
            url = this.mobileData.url

        list.status = 3
        this.fecthData(list,url)
    },
    handleCloseClick: function() {

        document.querySelector('.promtBox').style.display = 'none'
    },
    setTitleAndLogo:function(appData){
        var _this = this

        var iconUrl = appData.iconUrl,
            title = '税款通知',
            linkArr = document.querySelectorAll('link[rel="shortcut icon"]')

        for(var i=0;i<linkArr.length;i++){
          if(linkArr[i].remove){
            linkArr[i].remove()
          }else{
            linkArr[i].removeNode()
          }
        }
        var head = document.getElementsByTagName('head')[0],
            link = document.createElement('link')

        link.setAttribute('rel','shortcut icon')
        link.setAttribute('href',iconUrl)
        document.title = title

        head.appendChild(link)

        _this.initWeiXinShare(appData)
    },
    initWeiXinShare:function (data) {
        var _this = this;

        this.ajax({
            url:'v1/mobile/getJsSignInfo',
            type: "POST",
            data: { url:window.location.href.split('#')[0]},
            dataType: "json",
            success: function (response, xml) {
                // todo
                _this.initWeixinJsSdk(JSON.parse(response).value.signInfo,data)
                //initWeixinJsSdk(ajaxData.value.signInfo,data)
            },
            fail: function (status) {
                // fail
            }
        });
    },
    getDate: function (curDate, addDays){  
        var date = curDate?curDate:new Date();//获取当前时间
        addDays= addDays?addDays:1; 
        date.setDate(date.getDate()+addDays);//设置天数 -1 天
        return date;  
    },  
    initWeixinJsSdk:function (signInfo,data) {
        var host = window.location.host,
            searchList = this.getSearch()
            //"http://static.oschina.net/uploads/cooperation/question_banner_one_ioXRy.jpg";
        if(/localhost/.test(window.location.host) || /127.0.0.1/.test(window.location.host)){
            host = 'dev.rrtimes.com:8088'
        }
        var shareUrl = window.location.protocol+'//'+host+ window.location.pathname  + window.location.search + window.location.hash
        var defaultUrl = 'http://test.rrtimes.com/index.html?shareFileToken=f1687236393371648d9e3720cd44500aceba0972b830ddb18#apps/share'
        var urlEnCodeUrl =  encodeURIComponent(signInfo.url),
            imgUrl = data.logoUrlShare
        var temp = {
                link: window.location.href,
                title:'税款通知', // 分享标题
                desc: this.orgName+' '+searchList.d.replace('-','.')+'增值税税款', // 分享描述
                // imgUrl:window.location.protocol+'//'+window.location.host+'/static/img/LOGO.png'// 分享图标
                imgUrl:imgUrl// 分享图标
        }
        temp.title = '税款通知'
        // temp.desc = '代账端税款通知'
            /*temp.share.link = window.location.origin + '/transmit.html?shareID='+shareID;*/ //window.location.href;
      /* if(navigator.userAgent.toLowerCase().match(/MicroMessenger/i)=="micromessenger"){
            startweixin();
        }*/
        startweixin();
        function startweixin() {
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印
                appId: signInfo.appId, // 必填，公众号的唯一标识
                timestamp: signInfo.timestamp, // 必填，生成签名的时间戳
                nonceStr: signInfo.nonceStr, // 必填，生成签名的随机串
                signature: signInfo.signature, // 必填，签名，见附录1
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'/*, 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'openLocation'*/] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            var paramsTimeline = {
                title: temp.title, // 分享标题
                desc: temp.desc, // 分享描述
                link: temp.link, // 分享链接
                imgUrl: temp.imgUrl, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function() {
                    //console.log(paramsTimeline)
                },
                cancel: function() {
                    //
                }
            };
            var paramsAppMessage = {
                title: temp.title, // 分享标题
                desc: temp.desc, // 分享描述
                link: temp.link, // 分享链接
                imgUrl: temp.imgUrl, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function() {
                    //success
                    //console.log(paramsAppMessage)
                },
                cancel: function() {
                    //
                }
            };
            wx.ready(function() {

                wx.onMenuShareTimeline(paramsTimeline);
                wx.onMenuShareAppMessage(paramsAppMessage);

            });
        }
    }
}
shareJS.init()
