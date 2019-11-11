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
        var searchJson=shareJS.getSearch(),
            host = window.location.host,
            shareUrl = location.protocol+ '//'+host,
            pngStr = searchJson.pngs,
            urlStr = location.protocol+ '//'+host+'/v1/img/',
            pngArr = pngStr.split(','),
            pngArrLen = pngArr.length
        for(var i=0;i<pngArrLen;i++) {
            var imgUrl = urlStr+pngArr[i],
                img = document.createElement('img')
            img.src = imgUrl
            document.body.appendChild(img)
        }

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

    ajax: function (options) {
        var host = window.location.host
        /*if(/localhost/.test(window.location.host) || /127.0.0.1/.test(window.location.host)){
            host = 'dev.rrtimes.com:8088'
        }*/
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

    setTitleAndLogo:function(appData){
        var _this = this

        var iconUrl = appData.iconUrl,
            title = appData.name == '蜂信' ? '易嘉人' : appData.name,
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

    initWeiXinShare:function (appData) {
        var _this = this;

        this.ajax({
            url:'v1/mobile/getJsSignInfo',
            type: "POST",
            data: { url:window.location.href.split('#')[0]},
            dataType: "json",
            success: function (response, xml) {
                // todo
                _this.initWeixinJsSdk(JSON.parse(response).value.signInfo, appData)
                //initWeixinJsSdk(ajaxData.value.signInfo,data)
            },
            fail: function (status) {
                // fail
            }
        });
    },
    initWeixinJsSdk:function (signInfo,appData) {
        var searchList = this.getSearch(),
            appId = searchList.appId,
            queryPeriod = searchList.queryPeriod,
            host = window.location.host
            
            //"http://static.oschina.net/uploads/cooperation/question_banner_one_ioXRy.jpg";
        if(/localhost/.test(window.location.host) || /127.0.0.1/.test(window.location.host)){
            host = 'dev.rrtimes.com'
        }
        var shareUrl = window.location.protocol+'//'+host+ window.location.pathname  + window.location.search + window.location.hash
        var defaultUrl = 'http://test.rrtimes.com/index.html?shareFileToken=f1687236393371648d9e3720cd44500aceba0972b830ddb18#apps/share'
        var urlEnCodeUrl =  encodeURIComponent(signInfo.url),
            imgUrl = appData.logoUrlShare,title

        if(searchList.type == 'balanceSheet'){
            title = '资产负债表'
        }else if(searchList.type == 'cashFlowStatement'){
            title = '现金流量表'
        }else if(searchList.type == 'profitStatement'){
            title = '利润表'
        }

        var temp = {
                link: window.location.href,
                title: title, // 分享标题
                desc:'\n' + queryPeriod, // 分享描述
                imgUrl:imgUrl
        }

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
