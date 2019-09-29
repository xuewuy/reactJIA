import React, { Component, PropTypes } from 'react'
import { Tabs, Icon, Alert, Button, Menu, Dropdown,ZIcon } from 'xComponent';
import { AppLoader } from 'appLoader'
import classNames from 'classnames'
import moment from 'moment'

const TabPane = Tabs.TabPane;

export default class PortalMainComponent extends Component {

    state = {
        reRender: false,
        textValue:''
    }

    constructor(props) {
        super(props)
        this.onResize = this.onResize.bind(this)
        this.update = this.update.bind(this)

    }

    componentDidMount() {
        var win = window
        if (win.addEventListener) {
            win.addEventListener('resize', this.onResize, false)
        } else if (win.attachEvent) {
            win.attachEvent('onresize', this.onResize)
        } else {
            win.onresize = this.onResize
        }
        this.getSceneMenu()
    }


    componentWillUnmount() {
        var win = window
        if (win.removeEventListener) {
            win.removeEventListener('resize', this.onResize, false)
        } else if (win.detachEvent) {
            win.detachEvent('onresize', this.onResize)
        } else {
            win.onresize = undefined
        }


    }


    onResize() {
        clearTimeout(this._updateTimer)
        this._updateTimer = setTimeout(this.update, 16)
    }

    update() {
        this.setState({reRender: true})
    }

    handleEdit(targetKey, action) {
        if (!targetKey || !action) return
        if (action === "remove")
            this.props.delTab(targetKey)

    }

    handleChange(activeKey) {
        if (!activeKey) return
        this.props.selectTab(activeKey)
    }

    handleCloseAll() {
        this.props.removeAllTab()
    }

    getTabPanes(tabs, showMenu, currentTab) {
        return tabs.map((tab, index)=> {
            return (
                <TabPane key={tab.get('url')} tab={<span title={tab.get('title')}>{tab.get('title')}</span>}>
                    {::this.getPaneContent(tab, showMenu, currentTab)}
                </TabPane>
            )
        })
    }

    handleExtendClick(e) {
        const extMenu = {
          "0": "http://bbs.rrtimes.com/forum-43-1.html",
           "5":"http://bbs.rrtimes.com/forum-42-1.html",
           "10":"iframe:///ui/",
           "20":"iframe:///webapi/",
           "30":"http://sona.rrtimes.com",
           "40":"http://jira.rrtimes.com/",
           "50":"apps/dev/bug/bugList",
           "60":"apps/acm/richardTicket/metaManager/cardUIMetaList",
           "80":"apps/fi/manageTax/reportManagement"
        };
        let target = (e.target || e.domEvent && e.domEvent.target);
        let name = target && target.innerText || "研发";
        let key = e.key || "0";
		    if(name=="开发故事"){
          key="5"
        }
        if(name == "录制操作" || name=="保存录制"){
          this.handleRecord()
          return;
        }
        let url = extMenu[key];
        if (!url && key){
            if(this.deleteFlag){
               this.deleteFlag = false;
               return;
            }
            this.excuteScene(key);
        }
        if (!url)return;
        if (url.indexOf("http://") == 0) {
            window.open(url);
        } else {
            this.props.addTab(name, url);
        }
    }

    recordObj = {
      status:"",
      logs:[]
    }
    getDefaultKey2Value(){
      let dataStr = moment(new Date()).format('YYYY-MM-DD')
      return {
        '#date#': dataStr,
        ['_' + dataStr]: '<#date#>'
      }
    }
    async excuteScene(key){
        let data = await __post("/v1/scene/query",{"id":key})
        if (data.result){
             let valueList = data.value.sceneOperates;
             if(valueList.length == 0){
                return;
             }
             // __post('/v1/SetOrg/reInitialization',{});
             valueList.index = 0;
             valueList.key2value = this.getDefaultKey2Value();
             this.excuteSceneDetail(valueList);
        }
    }
    async excuteSceneDetail(valueList){
        let {key2value} = valueList;
        let {url,parameter,result} = valueList[valueList.index];
        if( ++valueList.index >= valueList.length)return;
        if(!url)return;

        url = JSON.parse(url)
        if(url.indexOf("://") > 0){
            url = url.split("://")[1];
            url = url.substr(url.indexOf("/"))
        }
        parameter = parameter || "";
        let pattern = new RegExp("<#[^#>]+#>","g");
        // if(parameter.indexOf("<#")==-1 && parameter.indexOf("#")!=-1){
        //   pattern = new RegExp("#\\w+#","g");
        // }
        let key = null; // '<#result_0["0"]["orgId"]#>'  key2value={'result_0':[{orgId:1000}]}
        let searchPara = parameter;
        while(key = pattern.exec(searchPara)){
            let keyWord = key[0].replace("<#","").replace("#>","");
            let cacheKey = keyWord.split('[')[0].split('.')[0];
            let path = keyWord.substr(cacheKey.length);
            let value = key2value['#' + cacheKey + '#'];
            let parameterValue = new Function("obj","return obj" + path )(value)
            parameter = parameter.replace(key[0],parameterValue);
        }

        let  data = await __post(url,JSON.parse(parameter))
        if (!data.result){
            confirm(data.error.message)
        }else {
            key2value[result] = data.value;
            this.excuteSceneDetail(valueList);
        }

    }
    createScene(sen,flag){
        let sceneName= "";
        if(flag){
           sceneName = prompt('场景名称已存在，请重新输入：')
        }else{
            sceneName = prompt('请输入场景名称：')
        }
        sen.name = sceneName;
        __post("/v1/scene/create",sen).then(data =>{
            if(data.result){
              this.recordObj.logs = []
              alert("新增成功")
               this.getSceneMenu()
            }else if(data.error.code == '510001'){
                this.createScene(sen,true);
            }else{
                this.recordObj.logs = []
                alert(data.error.message)
            }
        });
    }
    getPathByValue(obj,value){
      let path = ""
      for(let k in obj){
        let curPath = "['"+ k +"']";
        if(obj[k] == value)return curPath;
        if(typeof obj[k] != "object")continue;
        path = this.getPathByValue(obj[k],value);
        if(path != "") return curPath + path
      }
      return path;
    }
    replaceParaValue2KeyPath({paraStr,itemIndex,value,keyPathCache,items}){
      if(keyPathCache["_" + value] !== undefined){
        return paraStr.replace(value,keyPathCache["_" + value]);
      }
      //查找当前参数值依赖的数据路径
      for (let i = itemIndex - 1; i >= 0; i--) {
        let item = items[i];
        if(!item.result || item.result.indexOf(value)==-1)continue;
        let resultValue = JSON.parse(item.result).value;
        //确定当前参数值在对像中的路径
        item.description = "#result_" + i + "#";
        let valuePath = this.getPathByValue(resultValue, value);
        valuePath = "<#result_" + i + valuePath + "#>"
        keyPathCache["_" + value] = valuePath;
        paraStr = paraStr.replace(value, valuePath);
        break;
      }
      return paraStr;
    }
    replaceParaObj({paraObj, item, itemIndex, keyPathCache, items}){
      let paraObjIsArray = Array.isArray(paraObj);
      for(let key in paraObj){
        let value = paraObj[key];
        if(typeof value == "object"){
          this.replaceParaObj({paraObj:value, item, itemIndex, keyPathCache, items});
        }
        //只处理：1.数组中的参数；2.值为ID(类型为数字且值220000000000000)；3.或者值为当前日期
        else if(paraObjIsArray || typeof value == "number" && value > 220000000000000 || value == keyPathCache['#date#']) {
          //空值或长度小于8的都不处理。
          if(!value || value.toString().length < 8)continue;
          item.parameter = this.replaceParaValue2KeyPath({paraStr:item.parameter, itemIndex, value, keyPathCache, items})
        }
      }
    }
    handleSaveRecord(){
      let sen = {
         "name": "",
         "sceneOperates": this.recordObj.logs
       }
       let keyPathCache = this.getDefaultKey2Value();
       //处理参数依赖
       let items = this.recordObj.logs
       items.forEach((item, itemIndex)=>{
          let paraObj = item.parameter && JSON.parse(item.parameter);
         this.replaceParaObj({paraObj, item, itemIndex, keyPathCache, items});
       })
       //整理数据result,description
       items.forEach((item)=>{
         if(item.description != "场景操作明细"){
           item.result = item.description
           item.description = "场景操作明细"
         }else{
           item.result = "true"
         }
       });
       //console.log(this.recordObj.logs)
       this.createScene(sen,false);
    }
    handleBeginRecord(){
      let recordObj = this.recordObj
      let result = "true";
      let description = "场景操作明细";
      window.__record = (url,data,ajaxData,index) => {
          if(url.indexOf("v1/scene/create")>0){
              return;
          }
          url = JSON.stringify(url);
          let parameter= JSON.stringify(data);
          let menuName = location.appName || "";
          let operationName = window.event && event.target && event.target.innerText
          if(index != null){
              recordObj.logs[index].result = JSON.stringify(ajaxData);
          }else{
              recordObj.logs.push({url,parameter,result,menuName,operationName,description});
          }
          return recordObj.logs.length-1;
      }
    }
    handleRecord(){
      if(this.recordObj.status == "recording"){
        this.recordObj.status = ""
        window.__record = null
        this.handleSaveRecord();
      }else{
        this.recordObj.status = "recording"
        this.handleBeginRecord();
      }
    }

    handleMaxClick(){
        this.props.onMax()
    }

    getTabExtendElement() {
        //apps/acm/customer/customerList

        // let tabBarExtraContent = tabPanes.size > 1 ?
        // 	(<Button onClick={::this.handleCloseAll}>关闭全部</Button>):
        // 	null
        //<Menu.Item key="30">代码质量改进</Menu.Item>

         const sceneMenu =(
            <Menu id = "scene" onClick={::this.handleExtendClick}>
             {this.state.textValue}
            </Menu>
        );
        let getterByField = this.props.payload.getIn(['utils', 'getterByField']),
            isShowMaxBtn = getterByField('isShowMaxBtn')
        
        const menu = (
            <Menu onClick={::this.handleExtendClick}>
                <Menu.Item key="10">原型</Menu.Item>
                <Menu.Item key="20">web接口</Menu.Item>
                <Menu.Item key="30">代码质量-Sonar</Menu.Item>
                <Menu.Item key="40">开发任务-Jira</Menu.Item>
                <Menu.Item key="60">理票元数据维护</Menu.Item>
                <Menu.Item key="80">通用报表管理</Menu.Item>
            </Menu>
        );


        const visible = location.href.indexOf('127.0.0.1') != -1
                        || location.href.indexOf('192.') != -1
                        || location.href.indexOf('dev.rrtimes.com') != -1
                        || location.href.indexOf('test.rrtimes.com') != -1
                        || location.href.indexOf('newacm.rrtimes.com') != -1;
        let operations = ''
        if (!visible){
            operations = isShowMaxBtn && (
                <Button type="ghost" className='expand-btn'>
                    <ZIcon onClick={::this.handleMaxClick} icon = {this.props.isMax ? 'suoxiao' : 'zhankai1'} />
                </Button>
            )
        }else{
            operations = (
                <span>
                    <Dropdown.Button
                        overlay={sceneMenu}
                        type="ghost"
                        onClick={::this.handleExtendClick}
                    visible={visible}
                    >
                    {this.recordObj.status == "" ? "录制操作" : "保存录制"}
                </Dropdown.Button>
                <Dropdown.Button
                    overlay={menu}
                    type="ghost"
                    onClick={::this.handleExtendClick}
                    visible = { visible }
                >
                    BugList
                </Dropdown.Button>
                <Button type="ghost" className='expand-btn'>
                    {isShowMaxBtn ? <ZIcon onClick={::this.handleMaxClick} icon={this.props.isMax ? 'suoxiao' : 'zhankai1'} /> : null}
                </Button>
            </span>
            )
        }
        return operations;
    }
    deleteScene(key){
       __post("/v1/scene/delete",{id:key}).then(data =>{
            if(data.result){
                alert("删除成功")
                this.getSceneMenu()
            }else{
                alert(data.error.message)
            }
       })
    }
    handleDeleteClick(e){
        this.deleteFlag = true;
        if(e.target.id && confirm("你确定删除此场景吗？")){
            this.deleteScene(e.target.id);
        }

    }
    deleteFlag = false;
    getSceneMenu(){
        let menuKey =[];
         __post("/v1/scene/querylist",{}).then(data =>{
                if(data.result){
                  let valueList = data.value.list || data.value;
                  valueList.map((item)=>{
                    // $('#scene').menu('appendItem',{id:item.id,text:item.name});
                    //<img src="portal/img/1.jpg"/>
                    menuKey.push(<Menu.Item key={item.id}><span id ={item.id} onClick={::this.handleDeleteClick}>删除</span>&nbsp;&nbsp;{item.name}</Menu.Item>);
                  });
                }
                });
        this.state.textValue = menuKey
         this.setState(this.state)
    }

    getPaneContent(tab, showMenu, currentTab) {
        let url = tab.get('url'),
            title = tab.get('title'),
            btnStatus = tab.get('btnStatus'),
            pageId = tab.get('pageId'),
            isMax = this.props.isMax
        if (!url)return (
            <iframe className="iframe" src="/ui/"/>
        )


        if (url.indexOf('iframe://') !== -1) {

            return (
                <iframe className="iframe" src={url.replace('iframe://','')}/>
            )
        }

        if (url.indexOf('http://') !== -1) {
            return (
                <iframe className="iframe" src={url}/>
            )
        }


        if (url.indexOf('apps') !== -1) {
            //tab = tab.set('render',1)
            if (this.state.reRender)
                tab = tab.set('reRender', true)
            let ext = tab.get('props') && tab.get('props').toJS()
            ext = ext || {}

            if (currentTab && currentTab.get('title') == tab.get('title')) {
                ext._isCurrentTab = true
            }else{
                ext._isCurrentTab = false
            }

            let that = this
            let addEventListener = (url) => (eventName, handler)=> {
                setTimeout(()=> {
                    that.props.addEventListener(url, eventName, handler)
                }, 16)

            }

            let removeEventListener = (url) => (eventName)=> {
                setTimeout(()=> {
                    that.props.removeEventListener(url, eventName)
                }, 16)

            }
            return (
                <AppLoader
                    ref={url}
                    key={url}
                    path={url}
                    onCheckMenuBtn={this.props.checkMenuBtn}                    
                    onAddTab={this.props.addTab}
                    onDelTab={this.props.delTab}
                    onSelectTab={this.props.selectTab}
                    onToggleOrg={this.props.toggleOrg}
                    onUpdateCurrentUser={this.props.updateCurrentUser}
                    onRefreshCurrentTab={this.props.refreshCurrentTab}
                    addEventListener={ addEventListener(url)}
                    removeEventListener={removeEventListener(url)}
                    onRenameTab={this.props.renameTab}
                    onUpdateOrg={this.props.updateOrg}
                    onRedirect={this.props.onRedirect}
                    removeAllTab={this.props.removeAllTab}
                    ESM={this.props.ESM}//当账无忌被第三方引用的时候用于跟第三方通信的方法
                    tab={tab}
                    btnStatus={btnStatus}
                    pageId={pageId}
                    showMenu={showMenu}
                    {...ext}
                />
            )
        }

    }

    render() {
        let {prefixCls, payload} = this.props,
            getter = payload.getIn(['utils', 'getter']),
            getterByField = payload.getIn(['utils', 'getterByField']),
            tabs = getter('portal.tabs', 'value'),
            currentTab = getter('portal.currentTab', 'value'),
            activeKey = currentTab ? currentTab.get('url') : undefined,
            showMenu = getterByField('showMenu'),
            tabPanes = this.getTabPanes(tabs, showMenu, currentTab).toJS(),
            firstTabIsMyDesk = tabs.getIn([0,'title']) == '我的桌面'

        let className = classNames({
             [`${prefixCls}-main`]: true,
             [`${prefixCls}-main-myDesk`]: firstTabIsMyDesk
        })
        return (
            <div className={className}>
                <Tabs
                    type='editable-card'
                    className={`${prefixCls}-tabs`}
                    hideAdd
                    animated={false}
                    onEdit={::this.handleEdit}
                    activeKey={activeKey}
                    onChange={::this.handleChange}
                    tabBarExtraContent={this.getTabExtendElement()}
                >
                    {tabPanes}
                </Tabs>
            </div>
        )
    }
}

/*
 tabBarExtraContent={tabBarExtraContent}
 */
/*
 //{tabPanes}

 render() {
 let {prefixCls} = this.props
 return (
 <div className={`${prefixCls}-main`}>
 <Tabs type='editable-card'>
 <TabPane tab="选项卡" key="1">
 <iframe className="iframe" src="http://www.bings.com" />
 </TabPane>
 <TabPane tab="选项卡" key="2">
 <div className="iframe">fsdfwefwe</div>
 </TabPane>
 <TabPane tab="选项卡" key="3">
 <iframe className='iframe' src="http://www.baidu.com" />
 </TabPane>
 <TabPane tab="选项卡" key="4">选项卡一内容</TabPane>
 </Tabs>
 </div>
 )
 }
 */
