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
    init:function(){
        this.mobileData={
            profit:0,
            tax:0,
            pre:0,
            inCol:{
                total:'12,000.00',
                childrens:[{
                    subject:'销售收入',
                    value:'12,000.00'
                },{
                    subject:'利息收入',
                    value:'1,200.00'
                }]
            },
            outCol:{
                total:'720,000.00',
                childrens:[{
                    subject:'招待费',
                    value:'12,000.00'
                }]
            },
            queryParams:{
                shareFileToken : shareJS.getSearch().shareFileToken
            },
            date:{
                begindate:undefined,
                enddate:undefined
            }
        }
        var winWidth = null
        if (window.innerWidth){
            winWidth = window.innerWidth;
        }else if ((document.body) && (document.body.clientWidth)){
            winWidth = document.body.clientWidth;
        }

        var appId = this.getSearch().appId/*,
            iconUrl*/
        if(winWidth>768){

            if(appId){
                window.location.href = window.location.protocol+'//'+window.location.host+'/index.html?shareFileToken='+ this.getSearch().shareFileToken + '&appId=' + appId + '#apps/share/'+this.getSearch().path
            }else{
                window.location.href = window.location.protocol+'//'+window.location.host+'/index.html?shareFileToken='+ this.getSearch().shareFileToken +'#apps/share/'+this.getSearch().path
            }
            /*window.location.href = window.location.protocol+'//'+window.location.host+'/index.html?shareFileToken='+ this.getSearch().shareFileToken +'#apps/share/'+this.getSearch().path*/
        }else{
            document.querySelector('.loading').style.display = 'none'
            this.fecthData()
        }
    },
    fecthData:function (){
        var _this = this;
        this.ajax({
            url:'v1/acmReport/InOutDiary/getShareData',
        type: "POST",
            data: { shareFileToken:_this.getSearch().shareFileToken},
            dataType: "json",
            success: function (response, xml) {
                // todo
                _this.initPage(JSON.parse(response))
            },
            fail: function (status) {
                // fail
            }
        });
    },
    initPage:function (data){
      if(!data.result){
        this.renderOutDate()
        document.querySelector('.out-date').style.display = 'block'

      }else{
        this.renderMobilePage(data)
        document.querySelector('.mobile').style.display = 'block'

      }
    },
    renderOutDate:function  (){
        var l = 5;
        var timerDOM =document.querySelector('.timers')

        var timer = setInterval(function(){
            timerDOM.innerHTML =l+'s'
            if(l==0) {
              clearInterval(timer)
              //alert('此处跳转')
              window.location.href = '../index.html'
            }
            l--
        },1000)
        //document.querySelector('#app').innerHTML=''
    },
    renderMobilePage:function(ajaxData){
        var renderData = this.parseData(ajaxData)
        var begindate = renderData.date.begindate.split('-').join('.'),
          enddate = renderData.date.enddate.split('-').join('.'),
          pariod = begindate+'-'+enddate,
          orgName,
          filter =
        document.querySelector('.orgName').innerHTML = ajaxData.value.orgName
        document.querySelector('.pariod').innerHTML = pariod
        document.querySelector('.pariod').innerHTML = pariod
        document.querySelector('.profit-txt').innerHTML = renderData.profit
        document.querySelector('.profit-title').innerHTML =renderData.mobileFilter.industry==1006?"收支结余":"收支差额"
        document.querySelector('.pre-txt').innerHTML = renderData.pre
        document.querySelector('.tax-txt').innerHTML = renderData.tax
        document.querySelector('.inCol-total').innerHTML = renderData.inCol.total
        document.querySelector('.outCol-total').innerHTML = renderData.outCol.total
        document.querySelector('.inCol-content').innerHTML = this.getItems(renderData.inCol.childrens)
        document.querySelector('.outCol-content').innerHTML = this.getItems(renderData.outCol.childrens)

        /*var filters = eval('(' + ajaxData.value.filters + ')'),
            appInfo = filters.appInfo
        if(appInfo){
            //document.querySelector('.mobile-QRcode').style.display = 'none'
            document.querySelector('.mobile-QRcode').firstElementChild.setAttribute("src","./img/erCode.png")
            //document.querySelector('.mobile-QRcode').firstElementChild.setAttribute("src",`${appInfo.qrCodeService}`)
            document.querySelector('.mobile-QRcode').lastElementChild.innerHTML = `扫一扫关注“${appInfo.name}公众号”<br>${appInfo.appUrl}`
        }else{
            //document.querySelector('.mobile-QRcode').style.display = 'block'
            document.querySelector('.mobile-QRcode').firstElementChild.setAttribute("src","./img/Group3.png")
            document.querySelector('.mobile-QRcode').lastElementChild.innerHTML = "扫一扫关注“易嘉人公众号”<br>www.rrtimes.com"
        }
*/
        if(renderData.mobileFilter.title){
            document.querySelector('.filter').style.display = 'block'
            document.querySelector('.fliter-txt').innerHTML = renderData.mobileFilter.title
        }
        if(renderData.mobileFilter.detials && renderData.mobileFilter.detials.length){
            document.querySelector('.filter-detial').style.display = 'block'
            document.querySelector('.filter-detial').innerHTML = this.renderFilterDetial(renderData.mobileFilter.detials)
        }

        var filters = eval('(' + ajaxData.value.filters + ')'),
            appInfo = filters.appInfo
            if(!appInfo){
                appInfo={
                    "appCopyrightYear":"2017-2019",
                    "appDomain":",dev.rrtimes.com,test.rrtimes.com,demo.rrtimes.com,yj.rrtimes.com,debug.rrtimes.com,",
                    "appEmail":"liyue@rrtimes.com",
                    "appServiceTel":"17319162004",
                    "companyName":"北京人人时代科技有限公司",
                    "companyNameShort":"人人时代",
                    "homeUrl":"https://dev.rrtimes.com/default.html",
                    "iconUrl":"https://www.rrtimes.com/img/100-zwj/favicon.png",
                    "id":100,
                    "logoUrlEmail":"https://www.rrtimes.com/img/100-zwj/portalLogo.png",
                    "logoUrlLogin":"https://www.rrtimes.com/img/100-zwj/logo.png",
                    "logoUrlPortal":"https://www.rrtimes.com/img/100-zwj/portalLogo.png",
                    "logoUrlShare":"https://www.rrtimes.com/img/100-zwj/share.png",
                    "name":"易嘉人",
                    "qrCodeWx":"https://www.rrtimes.com/img/100-zwj/wxCode.png",
                    "status":1
                }

            }
        var iconUrl = appInfo.iconUrl,
        title = appInfo.name == '蜂信' ? '易嘉人' : appInfo.name,
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

        this.initWeiXinShare(ajaxData.value, appInfo)
    },
    renderFilterDetial:function (data){
        var str = ''
        for(var i=0; i<data.length; i++){
            str += "<div class= 'formItemTitle'>\
                      <h3>"+ data[i].name +"</h3>\
                      <h3  class='fliter-detial-txt'>"+ data[i].content +"</h3>\
                  </div>"
        }
        return str
    },
    getItems:function (list){

        if(!list || list.length === 0){
            return ''
        }else{
            var domArr = [];
            /*list.map(item=>{
                domArr.push(<div className = 'formContentItem' key = {item.subject}>
                        <span>{item.subject}</span>
                        <span>{item.value}</span>
                    </div>)
            })*/
            for(var i=0;i<list.length;i++){
               domArr.push("<div class = 'formContentItem'>\
                        <span>"+list[i].subject+"</span>\
                        <span>"+list[i].value+"</span>\
                    </div>")
            }
            return domArr.join('')
        }
    },
    parseData:function (ajaxData){
        var mobileData = this.mobileData
        mobileData.date = {
          begindate:ajaxData.value.begindate,
          enddate:ajaxData.value.enddate
        }
        var data = ajaxData.value.data
        if(data.groupperdata &&　data.groupperdata.length){
            mobileData.profit =  data.groupperdata[data.groupperdata.length-1][data.groupperdata[data.groupperdata.length-1].length-3] ||0
            mobileData.tax =  data.groupperdata[data.groupperdata.length-1][data.groupperdata[data.groupperdata.length-1].length-2] ||0
            mobileData.pre = data.groupperdata[data.groupperdata.length-1][data.groupperdata[data.groupperdata.length-1].length-1] ||0
        }else{
            mobileData.profit = '0'
            mobileData.pre = '0'
        }
        mobileData.inCol={ }
        mobileData.inCol.childrens=[]
        var inColName = data.inColName,
          outColName = data.outColName,
          inColLength = inColName && inColName.split(',').length ? inColName.split(',').length:0,
          outColLength = outColName && outColName.split(',').length ? outColName.split(',').length:0
        if(inColName && inColName.split(',').length && data.groupperdata &&　data.groupperdata.length){
            mobileData.inCol.total = data.inoutdata[data.inoutdata.length-1][inColLength-1]
            var arrIn = inColName.split(',')
            /*arrIn.map((item,index)=>{
                mobileData.inCol.childrens.push({
                    subject:item,
                    value: data.inoutdata[data.inoutdata.length-1][index]
                })



            })*/
            for(var j=0;j<arrIn.length;j++){
                mobileData.inCol.childrens.push({
                    subject:arrIn[j],
                    value: data.inoutdata[data.inoutdata.length-1][j]
                })
            }



        }else{
          mobileData.inCol.total = '0'
        }
        mobileData.outCol={ }
        mobileData.outCol.childrens = []
        if(outColName && outColName.split(',').length && data.groupperdata &&　data.groupperdata.length){
          mobileData.outCol.total = data.inoutdata[data.inoutdata.length-1][inColLength + outColLength-1]
          var arrOut = outColName.split(',')
          /*arrOut.map((item,index)=>{
              mobileData.outCol.childrens.push({
                  subject:item,
                  value: data.inoutdata[data.inoutdata.length-1][index+inColLength]
              })
          })*/
            for(var k=0; k<arrOut.length; k++){
                mobileData.outCol.childrens.push({
                    subject:arrOut[k],
                    value: data.inoutdata[data.inoutdata.length-1][k+inColLength]
                })
            }
        }else{
          mobileData.outCol.total = '0'
        }
        var filters =JSON.parse(ajaxData.value.filters),
            mobileFilter = {}
            mobileFilter.title = '',
            mobileFilter.detials = [],
            titleArr = [],
            industry = ajaxData.value.data.inColName.indexOf('律所业务')!=-1?1008:null
            mobileFilter.industry = filters.appInfo ? filters.appInfo.industry : undefined 
        var titleText = industry == 1008 ? '案号' : '项目'
            if(filters.groupstr){
                titleArr = filters.groupstr.split(',')
                for(var j=0;j<titleArr.length;j++){
                    switch(titleArr[j]){
                        case 'department':
                            mobileFilter.title+='部门,'
                            break
                        case 'employee':
                            mobileFilter.title+='职员,'
                            break
                        case 'project':
                            mobileFilter.title+=titleText+','
                            break
                    }
                }
            }

            if(filters.departmentName && filters.departmentName.length){
                mobileFilter.detials.push({
                    name:'部门',
                    content:filters.departmentName.join(',')
                })
            }
            if(filters.employeeName && filters.employeeName.length){
                mobileFilter.detials.push({
                    name:'职员',
                    content:filters.employeeName.join(',')
                })
            }
            if(filters.projectName && filters.projectName.length){
                mobileFilter.detials.push({
                    name:titleText,
                    content:filters.projectName.join(',')
                })
            }
            if(mobileFilter.title){
                mobileFilter.title = mobileFilter.title.slice(0,mobileFilter.title.length-1)
            }
            mobileData.mobileFilter = mobileFilter
        return mobileData

    },
    ajax: function (options) {
        var host = window.location.host
        /*if(/localhost/.test(window.location.host) || /127.0.0.1/.test(window.location.host)){
            host = 'dev.rrtimes.com'
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
    initWeiXinShare:function (data, appInfo) {
        var _this = this;

        this.ajax({
            url:'v1/mobile/getJsSignInfo',
            type: "POST",
            data: { url:window.location.href.split('#')[0]},
            dataType: "json",
            success: function (response, xml) {
                // todo
                _this.initWeixinJsSdk(JSON.parse(response).value.signInfo,data,appInfo)
                //initWeixinJsSdk(ajaxData.value.signInfo,data)
            },
            fail: function (status) {
                // fail
            }
        });
    },
    initWeixinJsSdk:function (signInfo,data,appInfo) {
        var appId = this.getSearch().appId
        var host = window.location.host
            //"http://static.oschina.net/uploads/cooperation/question_banner_one_ioXRy.jpg";
        if(/localhost/.test(window.location.host) || /127.0.0.1/.test(window.location.host)){
            host = 'dev.rrtimes.com'
        }
        var shareUrl = window.location.protocol+'//'+host+ window.location.pathname  + window.location.search + window.location.hash
        var defaultUrl = 'http://test.rrtimes.com/index.html?shareFileToken=f1687236393371648d9e3720cd44500aceba0972b830ddb18#apps/share'
        var urlEnCodeUrl =  encodeURIComponent(signInfo.url),
            imgUrl = appInfo.logoUrlShare

        var temp = {
                link: window.location.href,
                title:'收支统计表', // 分享标题
                desc:data.orgName+'\n'+data.begindate+'~'+data.enddate, // 分享描述
                imgUrl:imgUrl

                /*appId?
                window.location.protocol+'//'+window.location.host+'/static/testImg/wxERCode.png':
                window.location.protocol+'//'+window.location.host+'/static/img/LOGO.png'// 分享图标*/
        }
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
