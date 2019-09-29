import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Select } from 'antd'

export default class ButtonComponent extends Component {

    state = {
        regex: ""  //录入规则  内容为正则表达式
    }

    constructor(props) {
        super(props)
        this.handleKeyDown = this.handleKeyDown.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.oldValue = nextProps.value
        this.setState({regex: nextProps.regex})
    }

    componentDidMount() {
        this.oldValue = this.props.value
        this.setState({regex: this.props.regex})

        if (this.props.combobox || this.props.showSearch) {
            let win = ReactDOM.findDOMNode(this.refs.internal).getElementsByTagName('input')[0]
            if  (win) {
                if (win.addEventListener) {
                    win.addEventListener('keydown', this.handleKeyDown, false)
                } else if (win.attachEvent) {
                    win.attachEvent('keydown', this.handleKeyDown)
                } else {
                    win.onKeyDown = this.handleKeyDown
                }
            }
        }
    }

    componentWillUnmount() {
        if (this.props.combobox || this.props.showSearch) {
            let win = ReactDOM.findDOMNode(this.refs.internal).getElementsByTagName('input')[0]
            if (win) {
                if (win.removeEventListener) {
                    win.removeEventListener('keydown', this.handleKeyDown, false)
                } else if (win.detachEvent) {
                    win.detachEvent('keydown', this.handleKeyDown)
                } else {
                    win.onKeyDown = undefined
                }
            }
        }
    }

    handleChange(e) {
        this.setState({regex: this.props.regex})

        //let isInputable = (this.props.combobox || this.props.showSearch),
        let value = e
        // haolj COMMENT START 20170113 keydown中已作了数字检查，此处不需要再做处理
        // if (isInputable) {
        //     if (!e || e == '-') {
        //         value = e
        //     }
        //     else {
        //         let illegalNum = this.props.numberOnly && isNaN(e),
        //             illegalPrecision = false,
        //             precision = this.props.precision  //小数精度,默认2位
        //
        //         if (precision != undefined) {       //如果超过了精度范围,则不能输入
        //             let precisionValue = parseFloat(e).toFixed(precision)
        //             illegalPrecision = (parseFloat(e) != parseFloat(precisionValue))
        //         }
        //
        //         if (illegalNum || illegalPrecision) {
        //             this.setState({regex: this.props.regex})  //使得重新render,把不合法数据恢复到oldValue
        //             return
        //         }
        //     }
        // }
        // haolj COMMENT END 20170113

        this.oldValue = value


        if (this.props.onChange) {
            this.props.onChange(value)
        }
    }

    handleKeyDown(e) {
        if (e.type !== 'keydown' || (!this.props.combobox && !this.props.showSearch)) {
            return
        }

        //回车键 ,切换焦点
        if (e.key === 'Enter' || e.keyCode == 13 || e.keyCode == 108 || e.keyCode == 9) {  //e.keyCode == 9  不支持tab键,因为如果阻止了事件外抛,select的选择项键盘选中无法生效
            if (this.props.onEndEdit) {
                this.props.onEndEdit()

                if( this.props.interceptTab ){
                    if (e.keyCode == 9) {
                        if(e.preventDefault)
                            e.preventDefault()
                        if( e.stopPropagation)
                            e.stopPropagation()
                    }
                }

                return
            }
        }

        //如果只允许数字,则拦截其他按键
        if (this.props.numberOnly) {
            //空格和等号,这两个对于凭证可能有特殊含义的快捷键
            if (e.key === ' ' || e.keyCode == 32 || e.key === '=' || e.keyCode == 187 || e.keyCode == 229 || (e.target.value && (e.key === '-' || e.keyCode == 189 || e.keyCode == 109))) {
                if (this.props.onShortcutKey) {
                    this.props.onShortcutKey(e)

                    if (e.preventDefault)
                        e.preventDefault()
                    if (e.stopPropagation)
                        e.stopPropagation()
                    return
                }
            }

            // 2016-12-21 haolj COMMENT START
            // let precision = this.props.precision || 2  //小数精度,默认2位
            // let isAlpha = (e.keyCode >= 65 && e.keyCode <= 90),         //字母
            //     isVisibleKey = (e.keyCode == 106 || e.keyCode == 107 || e.keyCode == 111 ||
            //                     (e.keyCode >= 186 && e.keyCode <= 222 && e.keyCode != 189 && e.keyCode != 190)),    //可见的特殊字符
            //     // illegalMinus = (e.keyCode == 189 || e.keyCode == 109) && this.oldValue,                         //不符合逻辑的"负号"(如果已经输入过内容,则不允许输入)
            //     illeaguePoint = (e.keyCode == 110 || e.keyCode == 190) && (this.oldValue.indexOf('.') != -1),       //不符合逻辑的"小数点"
            //     isOutOfASC = (e.keyCode > 222)      //中文输入法等非ASC码
            //     // illegalNum = (this.oldValue.indexOf('.') != -1 && this.oldValue.indexOf('.') == this.oldValue.length - precision - 1)  //已经到小数点后N位
            //
            // if (isAlpha || isVisibleKey || illeaguePoint || isOutOfASC) {  //|| illegalMinus || illegalNum
            //     if(e.preventDefault)
            //         e.preventDefault()
            //     if( e.stopPropagation)
            //         e.stopPropagation()
            // }
            // 2016-12-21 haolj COMMENT END

            // ADD 2016-12-21 haolj START
            //进行正则判断
            if (this.props.regex) {
                console.log('e.keyCode: ' + e.keyCode )
                //e.keyCode  8:Backspace  46:Delete
                //27:Esc 9:Tab 37:Left 39:Right
                //38:UP 40：DOWN
                //13、108：Enter
                //保持左边这些按键可用
                if (e.type !== 'keydown' ||
                    e.keyCode == 8  ||
                    e.keyCode == 46 ||
                    e.keyCode == 27 ||
                    e.keyCode == 9  ||
                    e.keyCode == 37 ||
                    e.keyCode == 39 ||
                    e.keyCode == 38 ||
                    e.keyCode == 40 ||
                    e.key === 'Enter' ||
                    e.keyCode == 13 ||
                    e.keyCode == 108 ||
                    (e.ctrlKey)) {

                    this.props.onKeyDown && this.props.onKeyDown(e)
                    return
                }

                //解极品五笔输入法下，新增凭证中无法输入数字的问题
                if(e.keyCode == '229'){
                    return
                }

                // 获取光标当前位置
                let cursorPosition = this.getCursorPosition(e.target)
                let regExp = new RegExp(this.props.regex)///^[A-Za-z0-9]+$/)

                let selectedText = window.getSelection().toString(),
                    checkText,keyCode

                //Chrome中小数点的ascii码是110（小键盘）、190（大键盘）
                if(e.keyCode == 46 || e.keyCode == 110 || e.keyCode == 190){
                    keyCode = 46
                    //当为小数正则表达式时，不进行小数点正则检查
                    if(regExp.test('0.0') && e.target.value && e.target.value.indexOf('.') == -1){
                      return
                    }
                //109：小键盘负号的keyCode 189:大键盘负号的keyCode
                }else if(e.keyCode == 189 || e.keyCode == 109){
                    keyCode = 45

                    //当为负数正则表达式时，不进行负号正则检查
                    if(regExp.test('-1') && !e.target.value){
                      return
                    }
                }else{
                  keyCode = e.keyCode
                }

                let stateValue = this.oldValue.toString()
                if(selectedText != ''){
                    stateValue = stateValue.replace(selectedText, '')
                }

                //将输入的字符插入数字串中
                if(stateValue.length == cursorPosition){
                    checkText = stateValue + this.stringFromCharCode(keyCode)
                }else if(cursorPosition == 0){
                    checkText = this.stringFromCharCode(keyCode) + stateValue
                }else{
                    checkText = stateValue.substring(0, cursorPosition) +
                                this.stringFromCharCode(keyCode) +
                                stateValue.substring(cursorPosition)
                }

                if(!regExp.test(checkText)){
                  if (e.preventDefault)
                      e.preventDefault()
                  if (e.stopPropagation)
                      e.stopPropagation()
                  return
                }
            }
            // ADD 2016-12-21 haolj END
        }
    }

    stringFromCharCode(keyCode){
        let ret = ''
        if(keyCode == 96){
            ret = '0'
        }else if(keyCode == 97){
            ret = '1'
        }else if(keyCode == 98){
            ret = '2'
        }else if(keyCode == 99){
            ret = '3'
        }else if(keyCode == 100){
            ret = '4'
        }else if(keyCode == 101){
            ret = '5'
        }else if(keyCode == 102){
            ret = '6'
        }else if(keyCode == 103){
            ret = '7'
        }else if(keyCode == 104){
            ret = '8'
        }else if(keyCode == 105){
            ret = '9'
        }else{
            ret = String.fromCharCode(keyCode)
        }

        return ret
    }

    getCursorPosition(target){
        let oTxt1 = target
        let cursorPosition=-1

        if(oTxt1.selectionStart != undefined){//非IE浏览器
            cursorPosition= oTxt1.selectionStart
        }else{//IE
            if(document.selection){
                let range = document.selection.createRange()
                range.moveStart("character",-oTxt1.value.length)
                cursorPosition=range.text.length
            }
        }

        return cursorPosition
    }
    render() {
        let _oldValue = this.oldValue || undefined
        return (
            <Select ref='internal' {...this.props} value={_oldValue} onChange={::this.handleChange}/>
        )
    }
}
