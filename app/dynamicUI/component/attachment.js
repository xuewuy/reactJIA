import React from 'react'
import {Map} from 'immutable'
import {Popover, ZIcon, Button} from 'xComponent'
import { AppLoader } from 'appLoader'
import {List} from 'immutable'
import Rx from 'rx-lite'

export default class AttachmentComponent extends React.Component {
    state = {
        data: Map({
            value: null,
        })
    }


    constructor(props) {
        super(props)
        this.state = this.calculateState(this.props)
        this.handelAcceptAdjunctList = this.handelAcceptAdjunctList.bind(this)

        let pubSub = new Rx.Subject()
        //对可观察者发射的数据1秒内只订阅第一个接受到的
        pubSub.asObservable().debounce(500).subscribe(
            function (x) {
                x()
            },
            function (err) {
                console.log('Error: %s', err);
            })

        this.pubSub = pubSub
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this.calculateState(nextProps))
    }

	componentWillUnmount() {
        if (this.pubSub) {
            this.pubSub.onCompleted()
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !this.state.data.equals(nextState.data)
    }

    calculateState(props) {
        let {data} = this.state,
            {_getter, _getterByField, _path, _value} = props,
            pValues = _getter(_path, ['value', 'isShow', 'status', 'showText', 'showText1', 'showStyle', 'hideSize', 'containerId', 'placement', 'isDebounce', 'onlyOne', 'webapiPath', 'unReload','isDisabled']) ,
            value = this.props.value || (pValues.get('value') == undefined ? (pValues.get('value') || _value) : pValues.get('value')),
            isShow = (this.props.isShow || pValues.get('isShow')) || false,
            status = (this.props.status || pValues.get('status')) || 0,
            showText = (this.props.showText || pValues.get('showText')) || '',
            showText1 = (this.props.showText1 || pValues.get('showText1')) || '',
            showStyle = (this.props.showStyle || pValues.get('showStyle')) || '',
            hideSize = (this.props.hideSize || pValues.get('hideSize')) || false,
            containerId = (this.props.containerId || pValues.get('containerId')) || 'app',
            placement = (this.props.placement || pValues.get('placement')) || 'bottom',
            isDebounce = (this.props.isDebounce || pValues.get('isDebounce')) || false,
            onlyOne = (this.props.onlyOne || pValues.get('onlyOne')) || false,
            webapiPath = (this.props.webapiPath || pValues.get('webapiPath')) || '',
            unReload = (this.props.unReload || pValues.get('unReload')) || '',
            isDisabled = (this.props.isDisabled || pValues.get('isDisabled')) || false

        data = data.set('value', value)
        data = data.set('isShow', isShow)
        data = data.set('status', status)
        data = data.set('showText', showText)
        data = data.set('showText1', showText1)
        data = data.set('showStyle', showStyle)
        data = data.set('hideSize', hideSize)
        data = data.set('containerId', containerId)
        data = data.set('placement', placement)
        data = data.set('isDebounce', isDebounce)
        data = data.set('onlyOne', onlyOne)
        data = data.set('unReload', unReload)
        data = data.set('webapiPath', webapiPath)
        data = data.set('isDisabled', isDisabled)
        return {data}
    }

    get(propertyName) {
        if (!propertyName || propertyName === '') {
            return this.state.data
        }
        return this.state.data.getIn(propertyName.split('.'))
    }


    set(propertyName, value) {
        let data = this.state.data
        return data.setIn(propertyName.split('.'), value)
    }

    getPopoverContainer () {
        return document.getElementById(this.get('containerId'))
    }

    render() {
        let content = this.getContent(),
            size = this.get('value') ? this.get('value').size : 0,
            isDisabled = this.get('isDisabled') || false,
            disabledStyle = {
                cursor: 'not-allowed',
                color:'#999'
            },
            eleContent = <div style={isDisabled ? disabledStyle : null} className={`attachment`}>{this.get('showText')}<span>{size}</span></div>
        if(this.get('hideSize')) {
            size = ''
        }

        if(this.get('showStyle') && this.get('showStyle') == 'button') {
            eleContent = <Button style={isDisabled ? disabledStyle : null} className={`attachment`}><span><ZIcon icon='upload' title='' /></span>{!size ? (this.get('showText1') ||this.get('showText')) : this.get('showText')}<span>{size ? size : ''}</span></Button>
        }

        return (
            //<div className='z-grid-displaycell'>
            <Popover overlayClassName={'attachmentPop'} placement={this.get('placement')} content={content} getTooltipContainer={::this.getPopoverContainer} trigger = "click" visible= { this.get('isShow') }   onVisibleChange={::this.handleIsVisible} >
                {eleContent}
            </Popover>
            //</div>
        )
    }
    //填写附件管理的界面
    getContent() {
        let orgId=this.props.appParams && this.props.appParams.orgId
        let appPath = this.props.docId ? 'apps/common/adjunct?docId=' + this.props.docId : 'apps/common/adjunct'
        if(orgId){
            if(appPath.indexOf('?') > -1){
                appPath +='&orgId='+orgId
            }
            else{
                appPath+='?orgId='+orgId
            }
        }
        let refName = 'adjunct',
            initData = { album: this.get('value') || List(), other: { onlyOne: this.get('onlyOne'), webapiPath: this.get('webapiPath'), unReload: this.get('unReload')}},
            app =<AppLoader path={appPath} ref={refName} status={this.get('status')} initData={initData} adjunctEvent={this.handelAcceptAdjunctList}/>
        //div初始化一个宽度,与即将加载的apploader里同款, 避免apploader异步加载完后, popover整体偏
        return (
            <div style={{width: '250px'}}>
                {app}
            </div>
        )
    }

	handelAcceptAdjunctList(fileList, optionFileList) {
        if(this.get('status') == 0) {
            this.props.onEvent('attachementChange', {path: this.props._path, value: {fileList: fileList}})
        }else {
            if(this.get('isDebounce')) {
                this.pubSub.onNext( ()=>{
                    this.props.onEvent('attachementChange', {path: this.props._path, value: {fileList: fileList, optionFileList: optionFileList}})
                })
            } else {
                this.props.onEvent('attachementChange', {path: this.props._path, value: {fileList: fileList, optionFileList: optionFileList}})
            }
        }
	}

    handleIsVisible(v) {
        let isShowPic = $('.viewer-in'),
			// isDelFiles = $('.ant-modal-mask'),
			isDelFiles = $('.ant-confirm-confirm'),
            isShowThumbnail = $('.adjunct').find('.ant-popover-open')
        if (this.get('isDisabled')) return
        if(!!isShowPic.length || !!isDelFiles.length || !!isShowThumbnail.length){
            this.props.onEvent('attachementVisible', {path: this.props._path, visible:true})
        }else{
            this.props.onEvent('attachementVisible', {path: this.props._path, visible:v})
        }
    }
}
