import * as da from 'dynamicAction'
import * as api from './api'
import webapi from 'webapi'
import Immutable, { fromJS } from 'immutable'
import wx from 'weixin-js-sdk'

//console.log(wx)
export function initView(isPC) {
    return injectFuns => {
        let data = api.getData(),
            meta = api.getMeta()
        let {handleWebApiException } = da, { reduce, post } = injectFuns
        queryInOutDiary()(injectFuns)
    }
}

//pc端
function queryInOutDiary(){
    return injectFuns=>{
        let data = api.getData(),
            meta = api.getMeta()
        let queryParams = data.queryParams
        let {handleWebApiException } = da, { reduce, post } = injectFuns

            //meta后四项固定
            //meta.childrens[1].childrens = meta.childrens[1].childrens.slice(-4)
            //da.getSelectedRows

        webapi.inOutDiaryShare.getShareData(post,queryParams).then(ajaxData=>{
            //if (!handleWebApiException(ajaxData)(injectFuns)) return
            if(ajaxData.result){
                // initWeiXinShare(ajaxData.value)(injectFuns)

                let appInfo = JSON.parse(ajaxData.value.filters).appInfo,
                    industry = ajaxData.value.data.inColName.indexOf('律所业务')!=-1?1008:null,
                    newMetaEles = parseListMeta(ajaxData.value.data,industry)
                    
                data.orgName = ajaxData.value.orgName
                data.date.begindate = ajaxData.value.begindate
                data.date.enddate = ajaxData.value.enddate

                if(!appInfo){
                    appInfo={
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
                }

                if (appInfo.industry == 1006) {//

                    meta.childrens[0].childrens[2].title = '收支结余'
                    meta.childrens[0].childrens[3].visible = false
                    meta.childrens[0].childrens[4].visible = false
                }
                
                data.appInfo = appInfo
                let iconUrl = appInfo.iconUrl,
                    title = appInfo.name == '蜂信' ? '易嘉人' : appInfo.name,
                    linkArr = document.querySelectorAll('link[rel="shortcut icon"]')
                var head = document.getElementsByTagName('head')[0],
                    link = document.createElement('link')
                for(var i=0;i<linkArr.length;i++){
                  if(linkArr[i].remove){
                    linkArr[i].remove()
                  }else if(linkArr[i].removeNode){
                    linkArr[i].removeNode()
                  }else if(head.removeChild){
                    head.removeChild(linkArr[i])
                  }else{
                    $(linkArr[i]).remove()
                  }
                }


                link.setAttribute('rel','shortcut icon')
                link.setAttribute('href',iconUrl)
                document.title = title

                head.appendChild(link)

                if(newMetaEles.inColChilds){
                    meta.childrens[0].childrens[0].childrens = newMetaEles.inColChilds
                    meta.childrens[0].childrens[0].columnGroup = true
                    meta.childrens[0].childrens[0].bindField = null
                }else{
                    meta.childrens[0].childrens[0].childrens = null
                    meta.childrens[0].childrens[0].bindField = 'list.{0}.inout0'
                    meta.childrens[0].childrens[0].columnGroup = false
                }
                if(newMetaEles.outColChilds){
                    meta.childrens[0].childrens[1].childrens = newMetaEles.outColChilds
                    meta.childrens[0].childrens[1].columnGroup = true
                    meta.childrens[0].childrens[1].bindField = null
                }else{
                    meta.childrens[0].childrens[1].childrens = null
                    meta.childrens[0].childrens[1].bindField = 'list.{0}.inout1'
                    meta.childrens[0].childrens[1].columnGroup = false
                }
                meta.childrens[0].childrens.unshift(...newMetaEles.aLeftHeader)
                let  styleArr =ajaxData.value.data.style? JSON.parse(ajaxData.value.data.style):'',
                    mergeCells = []
                    //{row: [0,6], col: [0]},
                if(styleArr.length>0){
                    styleArr.map(item=>{
                        mergeCells.push({
                            row:item[0].split(','),
                            col:item[1].split(',')
                        })
                    })
                }
                meta.childrens[0].mergeCells = mergeCells
                data.list = parseListData(ajaxData.value.data)
                data.queryParams = queryParams//重置查询条件


                da.initView({data,meta},exports)(injectFuns)
            }else{
                data = {outDate:true}
                da.initView({data,meta:{}},exports)(injectFuns)
            }


            //查询组件的日期显示总和查询期间保持一致
            //meta.childrens[0].defaultDiplayText = queryParams.begindate+' 至 '+queryParams.enddate

        })
    }

}
//动态拼接meta
function parseListMeta (listData,industry){
    let aLeftHeader = [],
        inColChilds = [],
        outColChilds = [],
        titleText = industry == 1008 ? '案号' : '项目'

    if(listData.groupColName && listData.inoutdata && listData.inoutdata.length){//有项目或则案号选项
        listData.groupColName.split(',').map((item,index)=>{
            if(item ==='department'){
                aLeftHeader.push({
                    name: 'department',
                    title: '部门',
                    type: 'string',
                    showTips:true,
                    disabled: true,
                    bindField: 'list.{0}.department',
                    width:80
                })
            }else if(item ==='employee'){
                aLeftHeader.push({
                    name: 'employee',
                    title: '职员',
                    type: 'string',
                    disabled: true,
                    bindField: 'list.{0}.employee',
                    width:80
                })
            }else if(item ==='project'){
                aLeftHeader.push({
                    name: 'project',
                    title: titleText,
                    type: 'string',
                    disabled: true,
                    bindField: 'list.{0}.project',
                    width:80
                })
            }
        })
    }else{
        if(!listData.inoutdata || !listData.inoutdata.length){//没有数据时,标题不分行
            aLeftHeader.push({
                name: 'type',
                title: '类型',
                type: 'string',
                disabled: true,
                bindField:'list.{0}.total',
                width:80
            })
        }else{
            aLeftHeader.push({
                name: 'type',
                title: '类型',
                type: 'string',
                disabled: true,
                columnGroup: true,
                childrens:[{
                    name:'businessType',
                    title:'业务类型',
                    type:'string',
                    disabled:true,
                    bindField:'list.{0}.total',
                    width:80
                }]

            })
        }

    }
    //inColChilds

    if(listData.inoutdata && listData.inoutdata && listData.inoutdata.length){//无数据时收支没有分行
        listData.inColName.split(',').map((item,index)=>{
            inColChilds.push({
                name: 'inout'+ index,
                title: item,
                type: 'float',
                showTips:true,
                textAlign:'center',
                disabled: true,
                textAlign:'right',
                bindField: 'list.{0}.inout'+index,
                width:80
            })
        })
    }else{
        inColChilds = null
    }

    //outColChilds
    if(listData.inoutdata && listData.inoutdata && listData.inoutdata.length){//无数据时收支没有分行
        listData.outColName.split(',').map((item,index)=>{
            outColChilds.push({
                name: 'inout'+ (index+inColChilds.length),
                title: item,
                type: 'float',
                disabled: true,
                showTips:true,
                textAlign:'right',
                bindField: 'list.{0}.inout'+(index+inColChilds.length),
                width:80
            })
        })
    }else{
        outColChilds = null
    }
    return {
        aLeftHeader:aLeftHeader,
        inColChilds:inColChilds,
        outColChilds:outColChilds
    }

}

//设置Data
function parseListData(data){
    let newListData = [],
        groupName = data.groupColName? data.groupColName.split(','): ['total'],
        {groupperdata,inoutdata} = data,
        noGrouppredata = []
    if(!data.inoutdata || data.inoutdata.length===0){//空数据时
        let tempJson0 = {}
        groupName.map((item,index)=>{
            tempJson0[item] = ''
        })
        tempJson0.pre = ''
        tempJson0.inout0 = ''
        tempJson0.inout1 = ''
        newListData.push(tempJson0)
        return newListData
    /////////////// 空数据时初始化data //////////////////////////////////
    }


    ////////////////有数据时/////////////////////////////////////////////////////
    if(groupName[0]==='total') noGrouppredata = ['金额','合计']
    if( !data.inColName ){//如果收入为空，给inoutdata每一项的首位补0
        inoutdata && inoutdata.map(item =>{
            item.unshift('')
        })
    }
    if( !data.outColName  ){//如果支出为空，给inoutdata每一项的末尾补0
        inoutdata && inoutdata.map(item =>{
            item.push('')
        })
    }
    for(let i=0; i<groupperdata.length; i++){
        let tempJson = {}
        if(groupName[0]==='total'){
            tempJson['total'] = noGrouppredata[i]
        }else{
            groupName.map((item,index)=>{
                tempJson[item] = groupperdata[i][index]
            })
        }

        tempJson.profit = groupperdata[i][groupperdata[i].length-3]//倒数第二项是利润
        tempJson.tax = groupperdata[i][groupperdata[i].length-2]//倒数第二项是利润
        tempJson.pre = groupperdata[i][groupperdata[i].length-1]//最后一项是收支比
        for(let j=0; j<inoutdata[i].length; j++){
            tempJson['inout'+j] = inoutdata[i][j]
        }

        newListData.push(tempJson)
    }
    let  styleArr =data.style? JSON.parse(data.style):''
    if(!data.groupColName){
        //根据收入支出分项的长度调整最后一行合计的数据,当没有选辅助项时才有此设置
        let inColLength = data.inColName? data.inColName.split(',').length : 1,
            outColLength = data.outColName? data.outColName.split(',').length : 1
        newListData[newListData.length-1].inout0 = newListData[newListData.length-1]['inout'+(inColLength-1)]
        newListData[newListData.length-1]['inout'+ inColLength] = newListData[newListData.length-1]['inout'+(inColLength+outColLength-1)]
    }


    return newListData
}
export function initWeiXinShare(data){
    return injectFuns=>{
        let host = window.location.host
        if(/localhost/.test(window.location.host) || /127.0.0.1/.test(window.location.host)){
            host = '192.168.1.202'
        }
        //let shareUrl = window.location.protocol+'//'+host+ window.location.pathname  + window.location.search + window.location.hash
        //let defaultUrl = 'http://test.rrtimes.com/index.html?shareFileToken=f1687236393371648d9e3720cd44500aceba0972b830ddb18#apps/share'
        webapi.inOutDiaryShare.getJsSignInfo(injectFuns.post,window.location.href.split('#')[0]).then(ajaxData => {
            if (!da.handleWebApiInfo(ajaxData)(injectFuns)) return

            initWeixinJsSdk(ajaxData.value.signInfo,data)(injectFuns)
        })
    }
}
function initWeixinJsSdk(signInfo,data) {
    return (injectFuns) => {
        let host = window.location.host
            //"http://static.oschina.net/uploads/cooperation/question_banner_one_ioXRy.jpg";
        if(/localhost/.test(window.location.host) || /127.0.0.1/.test(window.location.host)){
            host = '192.168.1.202'
        }
        let shareUrl = window.location.protocol+'//'+host+ window.location.pathname  + window.location.search + window.location.hash
        let defaultUrl = 'http://test.rrtimes.com/index.html?shareFileToken=f1687236393371648d9e3720cd44500aceba0972b830ddb18#apps/share'
        let urlEnCodeUrl =  encodeURIComponent(signInfo.url)
        let temp = {
                link: window.location.href,
                title:'易嘉人智能财税', // 分享标题
                desc: data.orgName+data.begindate+'~'+data.enddate+'收支统计表', // 分享描述
                imgUrl:window.location.protocol+'//'+window.location.host+'/static/img/LOGO.png'// 分享图标
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
                    console.log(paramsTimeline)
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
                    console.log(paramsAppMessage)
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
Object.assign(exports, {...da, ...exports })
