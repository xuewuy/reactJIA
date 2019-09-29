/**
 * created by shenxy 2016/9/14
 */
import React from 'react'
import { Map, List, is } from 'immutable'
import DynamicComponent from '../../'
import Checkbox from '../checkbox'
import {Popover,Checkbox as CB, Input, ZIcon, Tabs,DatePicker, Icon,Button, Radio } from 'xComponent'
import {Select} from 'antd'
// import { RangePicker } from '../rangePicker'
import classNames from 'classnames'
import * as antd from 'antd'
import { fromJS } from 'immutable'
import './antTable.less'

export const MonthPicker  = DatePicker.MonthPicker;
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

const Option = Select.Option
const Table = antd.Table
const TabPane = Tabs.TabPane
const RadioGroup = Radio.Group
const regexArr = [
    "^((-)?[0-9]+)(?:\.[0-9]{1,2})?$",
    "^([0-9]+)(?:\.[0-9]{1,2})?$",
    "^([0-9]+)$",
    "^([0-9a-zA-Z]+)$",
    "^([0-9]{1,2})(\.\d{1,2})?|100$",
    "^([0-9]{1,3})(\.\d{1,2})?|1000$",
    "^([1-9]([0-9]+)?)$",
    "^(([1-9])?[0-9]+)(?:\.[0-9]{1,2})?$"
]


export default class AntTableComponent extends React.Component {
    static defaultProps = {
        prefixCls: 'z-ant-table'
    }

    state = {
        data: Map({
            path: '',
            value: undefined,
            className: '',
            rowHeight: 30,
            headerHeight: 30,
            groupHeaderHeight: 30,
            disabled: false,
            enableSum: false,
            enableSequenceColumn: true,
            style: {}
        })
    }

    constructor(props) {
        super(props)
        this.state = this.calculateState(this.props)
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this.calculateState(nextProps))
    }

    calculateState(props) {
        
        let {data} = this.state,
            {_path, _getter, style, className} = props,
            pValues = _getter(_path, ['value']),
            value = pValues.get('value') || List(),
            transData,dynamicData,staticData,formStringDataMap,sumMap
        
        if(value.toJS().tableDetail) {
            value = value.toJS()
            if(!value.tableDetail.dataJson){
                value.tableDetail.dataJson = {
                    content: {}
                }
            }
            if(value.tableDetail.dataJson.content.length===undefined){//判断是否是多表 单表
                transData = value.tableDetail.dataJson.content.transData
                dynamicData = value.tableDetail.dataJson.content.dynamicData
                formStringDataMap = value.tableDetail.dataJson.content.formStringDataMap
                sumMap = value.tableDetail.dataJson.content.formStringDataMap?value.tableDetail.dataJson.content.sumMap:value.tableDetail.dataJson.content.dynamicData
                staticData = value.tableDetail.dataJson.content.data
                staticData = value.tableDetail.dataJson.content.data
                formStringDataMap

                if(transData&&dynamicData&&staticData&&sumMap){
                    value.tableDetail.dataJson.content.data = ::this.mergeData(transData,dynamicData,staticData,formStringDataMap,sumMap)
                    value = fromJS(value)
                }
            }else{
                for(let i=0;i<value.tableDetail.dataJson.content.length;i++){
                    let item = value.tableDetail.dataJson.content[i]

                    transData = item.transData
                    dynamicData = item.dynamicData
                    staticData = item.data
                    sumMap = item.formStringDataMap?item.sumMap:item.dynamicData

                    if(transData&&dynamicData&&staticData&&sumMap){
                        item.data = ::this.mergeData(transData,dynamicData,staticData,formStringDataMap,sumMap)
                    }
                }
                value = fromJS(value)
            }
        }
        
        data = this.set(null, {
            value
        })

        return {data}
    }

    //合并数据
    mergeData(transData,dynamicData,data,formStringDataMap,sumMap) {
        //转换成相同格式
        let newData =  ::this.transformData(transData,dynamicData,data,formStringDataMap,sumMap)

        return data
    }

    transformData(transData,dynamicData,data,formStringDataMap,sumMap) {
        // let data = []
        let reg = /^[0-9]*$/
        if(!data) {
            data=[]
        }
        for(let key in sumMap) {
            let row = key.split('c')[0].replace('r',''),
                col = key.split('c')[1],
                curName,
                curValue = dynamicData[key],
                curChangeValue = formStringDataMap?formStringDataMap[key]:undefined
            if(key.indexOf('r')!==0||key.indexOf('c')!== 3||isNaN(parseInt(row)) ) {
                continue
            }
            if( isNaN(parseInt(key.charAt(4))) ) {
                data[row-1][key.substr(4)] = dynamicData[key]
                continue
            }
            transData.map(item => {
                if(item.indexStr==col) {
                    curName = item.key
                }
            })
            if(data.length<row) {
                let dataLen = data.length
                for(let i=row;i>dataLen;i--) {
                    data.push({
                        key: ''+i
                    })
                }
            }
            if(curValue!==undefined&&curChangeValue!==undefined) {//都有值是input+radio，是对象
                data[row-1][curName] = {
                    value: curValue,
                    memo: curChangeValue
                }
                
            } else if(curValue===undefined) {//其他的都不是对象

                data[row-1][curName] = curChangeValue
            } else if(curChangeValue ===undefined) {
                data[row-1][curName] = curValue
                
            }
            
        }

        return data
    }

    get(propertyName) {
        if (!propertyName || propertyName === '') {
            return this.state.data
        }
        return this.state.data.getIn(propertyName.split('.'))
    }

    set(propertyName, value) {
        let data = this.state.data
        if (!propertyName || propertyName === '') {
            return data.merge(value)
        }
        if (typeof value === 'object') {
            return data.mergeIn(propertyName.split('.'), value)
        }
        else {
            return data.setIn(propertyName.split('.'), value)
        }
    }

    getData() {
        let data = this.get('value').toJS()

        if (this.get('rowKey')) {
            return data
        }
        //如果没有指定rowKey,并且没有key字段,则使用index填充到key字段里
        for (let i = 0; i < data.length; i++) {
            let item = data[i]
            if (!item || item.key) {
                continue
            }

            item.key = i
        }

        return data
    }

    setColumns(columns,operationList, i, tableData) {
        // let columns = this.get('value').get('columns').toJS()
        columns = columns.filter(e => !e.isHideColumn)
        columns = columns.map(item => {
            let curMerge,
                className = 'z-ant-table-cell',
                dataIndex = item.dataIndex,
                cellProps = {}
            //加类名
            // if(item.className) {
            //     className = className + ' '+item.className
            // }
            //加组件名
            // if(item.component) {

            // }
            
            if(item.children) {
                // item.children.map(child => {
                //     return ::this.setColumns(child)
                // })
                item.children = ::this.setColumns(item.children,operationList, i, tableData)
            }
            cellProps.className = className
            if(item.style) {
                cellProps.style = item.style
            }
            if(item.renderMerge) {
                curMerge = item.renderMerge
                // delete item.renderMerge
                item.render = (text, row, index) => {

                    // return ::this.setCell(text, row, index, curMerge, className, item.component)
                    return ::this.setCell(text, row, dataIndex, index, item, cellProps, i, tableData)

                }
            } else {
                item.render = (text, row, index) => {
                    // return <div className={className}>
                    //     {text}
                    // </div>
                    return ::this.setComponent(text, row, dataIndex, cellProps, item, undefined, i, tableData)//i是第几个表，tableData是当前表的数据，text是值，row是这行数据，dataIndex是这列名，cellProps是特殊样式相关
                }
            }
            return item
        })

        if(!!operationList){
            if(operationList.place == 'first' && columns[0].title != '操作'){
                columns.unshift({
                    title: '操作', dataIndex: '', key: 'x', width:'100', render: (text) =>  this.getOperation(text, operationList)
                })
            }else if(operationList.place == 'end' && columns[columns.length-1].title != '操作'){
                columns.push({
                    title: '操作', dataIndex: '', key: 'x', width:'100', render: (text) =>  this.getOperation(text, operationList)
                })
            }
        }
        return columns
    }

    getOperation(text, operationList){
        return <div>
            {
                operationList.list.map(o => {
                    if(operationList.type=='icon'){
                        return <ZIcon icon={o.type} colorStyle={o.color} onClick={::this.handleIconClick(o.type,text)} title={o.title}/>
                    }
                })
            }

        </div>
    }

    handleIconClick(type,text){
        return ()=>{
            this.props.handleIconClick(type,text)
        }
    }

    clearThousandsPosition(num){
        if(num && num.toString().indexOf(',') > -1){
            let x = num.toString().split(',')
            return parseFloat(x.join(""))
        }else{
            return num
        }
    }
    
    addThousandsPosition(input, isFixed, fixedNum) {
        if(isNaN(input)) return null
    
        let num
    
        if (isFixed) {
            num = typeof (fixedNum) == 'number' ? parseFloat(input).toFixed(fixedNum) : parseFloat(input).toFixed(2)
        }else{
            num = input.toString()
        }

        num = num.toString().indexOf('.') != -1 ? num.toString().replace(/(\d{1,3})(?=(\d{3})+(?:\.))/g, "$1,") : num.toString().replace(/(\d{1,3})(?=(\d{3}))/g, "$1,");
    
        return num
    }

    //设置组件setComponent
    setComponent(text, row, dataIndex, cellProps, item, specialProps, i, tableData) {
        let component = (specialProps&&specialProps.component)?specialProps.component:item.component,
            regex = (specialProps&&specialProps.regex!==undefined)?regexArr[specialProps.regex]:(item.regex!==undefined? regexArr[item.regex]:''),
            disabled = (specialProps&&specialProps.disabled!==undefined)?specialProps.disabled:(item.disabled? true:false),
            maxlength = (specialProps&&specialProps.maxlength!==undefined)?specialProps.maxlength:(item.maxlength? item.maxlength:100),
            thousands = (specialProps&&specialProps.thousands!==undefined)?specialProps.thousands:(item.thousands? true:false),
            isFixed = (specialProps&&specialProps.isFixed!==undefined)?specialProps.isFixed:(item.isFixed? true:false),
            fixedNum = (specialProps && specialProps.fixedNum !== undefined) ? specialProps.fixedNum : (item.fixedNum !== undefined ? item.fixedNum : undefined),
            linkDisabled = disabled,
            textAlign = (specialProps&&specialProps.textAlign!==undefined)?specialProps.textAlign:(item.textAlign? item.textAlign:'left'),
            type = (specialProps && specialProps.type !== undefined) ? specialProps.type : (item.type ? item.type : undefined),
            className = (specialProps && specialProps.className !== '') ? specialProps.className : (item.className ? item.className : '')

        if(tableData.allDisabled!==undefined) {
            disabled = tableData.allDisabled
        }
        if(!component) {
            if(thousands&&text!='*') {
                
                text = :: this.addThousandsPosition(text, isFixed, fixedNum)
                if(text==='NaN') {
                    text = ''
                }
            }
            if (!!type && type === 'HTMLcontent'){
                text = <div dangerouslySetInnerHTML={{ __html: text }} />
            }
            return <div className={className ? className + ' ' + cellProps.className : cellProps.className} style={{ 'textAlign': textAlign }} title={text} {...cellProps} >
                {text}
            </div>
            // return <div className={className}>
            //     {text}
            // </div>
        }
        if(component=='Text') {
            // return <div className={className} >
            //     {text}
            // </div>
            if(thousands&&text!='*') {
                text = :: this.addThousandsPosition(text, isFixed, fixedNum)
                if(text==='NaN') {
                    text = ''
                }
            }
            if (!!type && type === 'HTMLcontent') {
                text = <div dangerouslySetInnerHTML={{ __html: text }} />
            }
            return <div className={className ? className + ' ' + cellProps.className : cellProps.className} style={{ 'textAlign': textAlign }} title={!!type && type ==='HTMLcontent' ? '' : text} {...cellProps} >
                {text}
            </div>
        }
        if(component=='Link') {
            return <div className={className ? className + ' ' + cellProps.className : cellProps.className} title={text} {...cellProps} >
                {linkDisabled?<span style={{cursor:'not-allowed',color:'#999'}}>{text}</span> : <a onClick={::this.handleClick(text, row, dataIndex, item, i, tableData)} title={item.showTips ? text : null}>
                    {text}
                </a>}
            </div>
        }
        if(component=='Input') {
            let InputLeftText = (specialProps&&specialProps.InputLeftText)?specialProps.InputLeftText : ((item&&item.InputLeftText)?item.InputLeftText:null),
                InputRightText = (specialProps&&specialProps.InputRightText)?specialProps.InputRightText : ((item&&item.InputRightText)?item.InputRightText:null),
                inputType
            // return <div className={className}>
            //     <DynamicComponent _component={component} />
            // </div> onChange={::this.handleChange(text,component)}
            if(thousands&&!isNaN(parseFloat(text))) {
                text = :: this.addThousandsPosition(text, isFixed, fixedNum)
                if(text==='NaN') {
                    text = ''
                }
            }
            if(typeof text=='object') {
                text = text.memo
            }
            if(
                regex == "^((-)?[0-9]+)(?:\.[0-9]{1,2})?$" ||
                regex == "^([0-9]+)(?:\.[0-9]{1,2})?$" ||
                regex == "^([0-9]+)$" ||
                regex == "^([0-9]{1,2})(\.\d{1,2})?|100$" ||
                regex == "^([0-9]{1,3})(\.\d{1,2})?|1000$" ||
                regex == "^([1-9]([0-9]+)?)$" ||
                regex == "^(([1-9])?[0-9]+)(?:\.[0-9]{1,2})?$"
            ) {
                inputType = undefined
                if(!maxlength||maxlength>12) {
                    maxlength = 12
                }
            } else {
                inputType = 'inputStr'
            }
            return <div {...cellProps} className={className ? className + ' ' + cellProps.className : cellProps.className}>
                <Input 
                    value={text|| ''} 
                    title={text || ''}
                    disabled={disabled} 
                    regex={regex}
                    style={inputType?{}:{'textAlign':'right'}}	
                    maxLength ={maxlength}
                    onBlur={ value => ::this.handleChange(value.target.value, row.key,  dataIndex,inputType, i, tableData, regex)}	
                    addonAfter={InputRightText===undefined?null:InputRightText}
                    addonBefore={InputLeftText===undefined?null:InputLeftText}
                />
            </div>
        }
        if (component == 'DoubleInput') {
            let leftText = (specialProps && specialProps.leftText) ? specialProps.leftText : ((item && item.leftText) ? item.leftText : null),
                centerText = (specialProps && specialProps.centerText) ? specialProps.centerText : ((item && item.centerText) ? item.centerText : null),
                rightText = (specialProps && specialProps.rightText) ? specialProps.rightText : ((item && item.rightText) ? item.rightText : null),
                inputType,
                value,
                memo
            // return <div className={className}>
            //     <DynamicComponent _component={component} />
            // </div> onChange={::this.handleChange(text,component)}
            // if (thousands && !isNaN(parseFloat(text))) {
            //     text = :: this.addThousandsPosition(text, isFixed)
            //     if (text === 'NaN') {
            //         text = ''
            //     }
            // }
            
            leftText = !!leftText ? <div dangerouslySetInnerHTML={{ __html: leftText }} style={{ display: 'inline-block' }}/> : null

            if (typeof text == 'object') {
                value = text.value
                memo = text.memo
            }
            if (
                regex == "^((-)?[0-9]+)(?:\.[0-9]{1,2})?$" ||
                regex == "^([0-9]+)(?:\.[0-9]{1,2})?$" ||
                regex == "^([0-9]+)$" ||
                regex == "^([0-9]{1,2})(\.\d{1,2})?|100$" ||
                regex == "^([0-9]{1,3})(\.\d{1,2})?|1000$" ||
                regex == "^([1-9]([0-9]+)?)$" ||
                regex == "^(([1-9])?[0-9]+)(?:\.[0-9]{1,2})?$"
            ) {
                inputType = undefined
                if (!maxlength || maxlength > 12) {
                    maxlength = 12
                }
            } else {
                inputType = 'inputStr'
            }
            return <div {...cellProps} className={className ? className + ' ' + cellProps.className : cellProps.className}>
                {leftText}
                <Input
                    value={value || ''}
                    title={value || ''}
                    disabled={disabled}
                    regex={regex}
                    style={inputType ? { "width": "100px" } : { "width": "100px", 'textAlign': 'right' }}
                    maxLength={maxlength}
                    onBlur={value => ::this.handleChange(value.target.value, row.key,  dataIndex,'doubleInputValue', i, tableData, regex)}
            />
                {centerText}
                <Input
                    value={memo || ''}
                    title={memo || ''}
                    disabled={disabled}
                    regex={regex}
                    style={inputType ? { "width": "100px" } : { "width": "100px", 'textAlign': 'right' }}
                    maxLength={maxlength}
                    onBlur={value => ::this.handleChange(value.target.value, row.key,  dataIndex,'doubleInputMemo', i, tableData, regex)}
            />
                {rightText}
            </div>
        }
        if(component == 'Select'){
            let selectList = (specialProps&&specialProps.selectList)?specialProps.selectList : ((item&&item.selectList)?item.selectList:undefined),
                valueMember = (specialProps&&specialProps.valueMember)?specialProps.valueMember : ((item&&item.valueMember)?item.valueMember:'id'),
                displayMember = (specialProps&&specialProps.displayMember)?specialProps.displayMember : ((item&&item.displayMember)?item.displayMember:'name')
            
            // let selectList = (specialProps&&specialProps.component=='Select'&&specialProps.selectList)?specialProps.selectList:undefined
            return <div {...cellProps} className={className ? className + ' ' + cellProps.className : cellProps.className}>
                <Select style={{width:'100%'}} value={text} disabled={disabled}   onChange={ value => ::this.handleChange(value, row.key,  dataIndex, undefined, i, tableData)}>
                    {selectList.map(itemOption => <Option key={itemOption[valueMember]} title={itemOption[displayMember]}>{itemOption[displayMember]}</Option>)}
                </Select>
            </div>
        }

        if(component == 'MonthRangePicker') {
            let valueStart =  undefined,
                valueEnd = undefined
            // if(text) {
            //     valueStart = text.split('~')[0]?text.split('~')[0]:undefined
            //     valueEnd = text.split('~')[1]?text.split('~')[1]:undefined
            // }
            if(typeof text=='object') {
                valueStart = text.memo.split('~')[0]?text.memo.split('~')[0]:undefined
                valueEnd = text.memo.split('~')[1]?text.memo.split('~')[1]:undefined
            } else if (text) {
                valueStart = text.split('~')[0]?text.split('~')[0]:undefined
                valueEnd = text.split('~')[1]?text.split('~')[1]:undefined
            }
            return <div {...cellProps} className={className ? className + ' ' + cellProps.className : cellProps.className}>
                <MonthPicker
                    disabled={disabled} 
                    value = {valueStart && moment(valueStart, 'YYYY/MM')}
                    onChange={ value => ::this.handleChange((value&&value.format("YYYY-MM")), row.key,  dataIndex, 'start', i, tableData)}
                />
                <span style={{padding:'0 5px',color:'#d9d9d9'}}>—</span>
                <MonthPicker
                    disabled={disabled} 
                    value = {valueEnd && moment(valueEnd, 'YYYY/MM')}                              
                    onChange={ value => ::this.handleChange((value&&value.format("YYYY-MM")), row.key,  dataIndex, 'end', i, tableData)}
                   
                />
            </div>
        }

        if(component == 'DatePicker') {
            return <div {...cellProps} className={className ? className + ' ' + cellProps.className : cellProps.className}>
                <DatePicker 
                    disabled={disabled} 
                    value = {text && moment(text, 'YYYY/MM/DD')}                              
                    onChange={ value => ::this.handleChange((value&&value.format("YYYY-MM-DD")), row.key,  dataIndex, 'date', i, tableData)}/>
            </div>
        }

        if(component == 'MonthPicker') {
            return <div {...cellProps} className={className ? className + ' ' + cellProps.className : cellProps.className}>
                <MonthPicker 
                    disabled={disabled} 
                    value = {typeof text=='object' ? moment(text.memo, 'YYYY/MM'): text}                              
                    onChange={ value => ::this.handleChange((value&&value.format("YYYY-MM")), row.key,  dataIndex, 'month', i, tableData)}/>
            </div>
        }
        if(component == 'Popover'){
            let content = <div dangerouslySetInnerHTML={{__html:text.content}} />,
                className = (specialProps && specialProps.className !== undefined) ? specialProps.className : (item.className ? item.className : 'taxReport-Popover')

            return <div {...cellProps} className={className ? className + ' ' + cellProps.className : cellProps.className}>
                        <div>
                            <span>{text.text}</span>
                            <Popover overlayClassName={className} content={content} title="" placement="right">
                                <ZIcon icon="help"></ZIcon>
                            </Popover>
                        </div>
                    </div>
        }
        if(component == 'RadioInput') {
            return <div {...cellProps} className={className ? className + ' ' + cellProps.className : cellProps.className}>
                {specialProps.RedioLeftText}
                <span style={{'margin-left': '12px'}}>
                    {
                        specialProps.dataSource.length === 1 ? 
                        <RadioGroup
                            disabled={disabled}
                            style={{ width: '100%', display: "inline" }}
                            onChange={value => :: this.handleChange(value.target.value, row.key,  dataIndex,(value.target.value===specialProps.disabledItem?"Radioinput":"RadioInputClear"), i, tableData) }
                            value={text ? (typeof text == 'object' ? text.value : text) : text}>
                            {specialProps.dataSource.map(radioItem => <Radio key={radioItem[specialProps.valueMember]} value={radioItem[specialProps.valueMember]}>{radioItem[specialProps.displayMember]}</Radio>)}
                        </RadioGroup>
                        :
                        <RadioGroup
                            disabled={disabled}
                            style={{ width: '100%', display: "inline" }}
                            onChange={value => :: this.handleChange(value.target.value, row.key,  dataIndex, "Radioinput", i, tableData) }
                            value={text ? (typeof text == 'object' ? text.value : text) : text}>
                            {specialProps.dataSource.map(radioItem => <Radio key={radioItem[specialProps.valueMember]} value={radioItem[specialProps.valueMember]}>{radioItem[specialProps.displayMember]}</Radio>)}
                        </RadioGroup>
                    }
                    
                </span>
                {specialProps.InputLeftText}
                <Input 
                    value={text ? text.memo : ''} 
                    title={text ? text.memo : ''} 
                    disabled={(text ? text.value!==specialProps.disabledItem : true)} 
                    regex={regex}	
                    style={{"width": "100px"}}
                    maxLength ={maxlength}	
                    onBlur={ value => ::this.handleChange(value.target.value, row.key,  dataIndex,"radioInput", i, tableData)}	
                />
                {specialProps.InputRightText}
            </div>
        }

        if(component == 'Radio'){
            let dataSource = (specialProps&&specialProps.dataSource)?specialProps.dataSource : ((item&&item.dataSource)?item.dataSource:undefined),
                valueMember = (specialProps&&specialProps.valueMember)?specialProps.valueMember : ((item&&item.valueMember)?item.valueMember:'id'),
                displayMember = (specialProps&&specialProps.displayMember)?specialProps.displayMember : ((item&&item.displayMember)?item.displayMember:'name'),
                content = (specialProps&&specialProps.content)?specialProps.content : ((item&&item.content)?item.content:null),
                hasBrackets = (specialProps&&specialProps.hasBrackets)?specialProps.hasBrackets : ((item&&item.hasBrackets)?item.hasBrackets:undefined)

            return <div {...cellProps} className={className ? className + ' ' + cellProps.className : cellProps.className}>
                {
                    content ? <span>{content}</span> : null
                }
                {
                    hasBrackets ? 
                        <span>
                            <RadioGroup style={{width:'100%',display:"inline"}} disabled={disabled}  value={text} onChange={ value => ::this.handleChange(value, row.key,  dataIndex, 'radio', i, tableData)}>
                                （&emsp;{dataSource.map(item=><Radio value={item[valueMember]}>{item[displayMember]}</Radio>)}）
                            </RadioGroup>
                        </span>
                        : <span>
                            <RadioGroup style={{width:'100%',display:"inline"}} disabled={disabled}  value={text} onChange={ value => ::this.handleChange(value, row.key,  dataIndex, 'radio', i, tableData)}>
                                &emsp;{dataSource.map(item=><Radio value={item[valueMember]}>{item[displayMember]}</Radio>)}
                            </RadioGroup>
                        </span>
                }
            </div>
        }
    }

    // value={moment(this.get('rangeStart'), 'YYYY/MM')}
    //                 style={this.get('style') && this.get('style').toJS()}
    //                 onChange={::this.onStartChange}
    //                 getCalendarContainer={::this.getCalendarContainer}
    //                 onOpenChange={::this.handleStartOpenChange}
    //                 disabledDate={::this.disabledDateFirst} 
    //   value={moment(this.get('rangeEnd'), 'YYYY/MM')}
    //                 style={this.get('style') && this.get('style').toJS()}
    //                 onChange={::this.onEndChange}
    //                 getCalendarContainer={::this.getCalendarContainer }
    //                 onOpenChange = {::this.handleEndOpenChange}
    //                 open={this.get('isEndOpen')}
    //                 disabledDate={::this.disabledDate} 

    handleBlur(value, key, column, type, tableIndex, tableData){

		// console.log('handleBlur:')
        // //e.preventDefault()
        // debugger
		// let newValue = e.target.value,
		// 		oldValue = this.oldValue,
		// 		bindField = this.get('bindField')

		// newValue = this.replaceNegativeSign(newValue)
		// this.setState({data:this.set('value', newValue)})

		// if( this.props.onFieldChange && oldValue !== newValue) {
		// 		this.props.onFieldChange(this.get('path'), oldValue, newValue)
		// }
    }

    handleChange(value, key, column, type, tableIndex, tableData, regex) {//tableIndex 是第几个表

        let valueData = this.get('value'),
            content = valueData.get('tableDetail').get('dataJson').get('content'),
            transData// = content.toJS().transData
        if((value==''&&tableData.data[key-0][column]==undefined)||value==tableData.data[key-0][column]) {
            return 
        }
        if(content.toJS().length===undefined){//单表
            transData = content.toJS().transData
        }else{
            content = content.toJS()
            transData = content.toJS()[tableIndex]
            // for(let i=0;i<content.length;i++){
            //     let item = content[i],
            //         tempTransData = item.transData,
            //         status = tempTransData.filter(o=>{
            //             return column == o.key
            //         })
                    
            //     if(!!status){
            //         transData = item.transData
            //         break
            //     }
            // }
        }
        ::this.changeTable(value, key, column, type, this.get('path'),transData,tableIndex, tableData, regex)
        // this.props.onTableFieldChange(value, key, column, type, this.get('path'),transData,tableIndex, tableData)

    }

    changeTable(value, key, column, type, path ,transData,tableIndex, tableData, regex) {

        let data = tableData.data,
            //oldData = tableData.data,
            oldValue = tableData.data[key][column],
            changeName,
            // transData = tableData.transData,
            // dynamicData = tableData.dynamicData,
            dynamicData = tableData.dynamicData,
            changeDatas = tableData.changeDatas

        if(!changeDatas) {
            changeDatas = {}
        }
        // if(!changeDatas) {
        //     changeDatas = []
        // }
        if(type) {
            let curValue = data[key][column],
                newValue = value
            if(type=='start') {
                if(!curValue) {
                    curValue = {
                        ...curValue,
                        memo: newValue +'~'
                    }
                } else if(!curValue.memo) {
                    // curValue = newValue +'~'
                    curValue = {
                        ...curValue,
                        memo: newValue +'~'
                    }
                } else {
                    // curValue = newValue +'~'+curValue.split('~')[1]
                    curValue = {
                        ...curValue,
                        memo: newValue +'~'+curValue.memo.split('~')[1]
                    }
                }
            } else if(type=='end') {
                if(!curValue) {
                    curValue = {
                        ...curValue,
                        memo: '~' + newValue 
                    }
                } else if(!curValue.memo) {
                    // curValue = '~' + newValue 
                    curValue = {
                        ...curValue,
                        memo: '~' + newValue 
                    }
                } else {
                    // curValue = curValue.split('~')[0] +'~'+ newValue
                    curValue = {
                        ...curValue,
                        memo: curValue.memo.split('~')[0] +'~'+ newValue
                    }
                }
            } else if(type=='date') {
                curValue = value
                
            } else if(type=='month') {
                //curValue = value
                curValue = {
                    ...curValue,
                    memo: value
                }
                
            } else if(type=='radio') {
                curValue = value.target.value
            } else if(type=='Radioinput') {
                curValue = {
                    ...curValue,
                    value: value
                }
            } else if(type=='Popover') {
                curValue = {
                    ...curValue,
                    memo: value
                }
            }  else if(type=='radioInput') {
                curValue = {
                    ...curValue,
                    memo: value
                }
            } else if(type=='RadioInputClear') {
                curValue = {
                    value: value,
                    memo: ''
                }
            } else if(type=='inputStr') {
                if(regex) {
                    let re = new RegExp(regex)
                    if(!re.test(value)) {
                        value = ''
                    }
                }
                curValue = {
                    value: '',
                    memo: value
                }
            } else if (type == 'doubleInputValue') {
                if (regex) {
                    let re = new RegExp(regex)
                    if (!re.test(value)) {
                        value = ''
                    }
                }
                if (regex == "^([0-9]{1,2})(\.\d{1,2})?|100$" || regex == "^([0-9]{1,3})(\.\d{1,2})?|1000$") {
                    if (value === '') {
                        value = '0'
                    } else {

                        if (regex == "^([0-9]{1,2})(\.\d{1,2})?|100$" && value - 0 > 100) {
                            value = '100'
                        } else if (regex == "^([0-9]{1,2})(\.\d{1,2})?|100$" && value - 0 < 0) {
                            value = '0'
                        } else if (regex == "^([0-9]{1,3})(\.\d{1,2})?|1000$" && value - 0 > 1000) {
                            value = '1000'
                        } else if (regex == "^([0-9]{1,3})(\.\d{1,2})?|1000$" && value - 0 < 0) {
                            value = '0'
                        }
                        if (value !== "") {
                            value = ((value - 0).toFixed(2) - 0) + ''
                        }

                    }
                }
                value = value.replace(/[^\d.-]/g, "")
                if (isNaN(value - 0)) {
                    value = ''
                }
                curValue = {
                    ...curValue,
                    value: value
                }
            } else if (type == 'doubleInputMemo') {
                if (regex) {
                    let re = new RegExp(regex)
                    if (!re.test(value)) {
                        value = ''
                    }
                }
                if (regex == "^([0-9]{1,2})(\.\d{1,2})?|100$" || regex == "^([0-9]{1,3})(\.\d{1,2})?|1000$") {
                    if (value === '') {
                        value = '0'
                    } else {

                        if (regex == "^([0-9]{1,2})(\.\d{1,2})?|100$" && value - 0 > 100) {
                            value = '100'
                        } else if (regex == "^([0-9]{1,2})(\.\d{1,2})?|100$" && value - 0 < 0) {
                            value = '0'
                        } else if (regex == "^([0-9]{1,3})(\.\d{1,2})?|1000$" && value - 0 > 1000) {
                            value = '1000'
                        } else if (regex == "^([0-9]{1,3})(\.\d{1,2})?|1000$" && value - 0 < 0) {
                            value = '0'
                        }
                        if (value !== "") {
                            value = ((value - 0).toFixed(2) - 0) + ''
                        }

                    }
                }
                value = value.replace(/[^\d.-]/g, "")
                if (isNaN(value - 0)) {
                    value = ''
                }
                curValue = {
                    ...curValue,
                    memo: value
                }
            }

            data[key][column] = curValue
            //oldValue = oldData ? oldData[key][column] : undefined
            transData.map(o => {
                if(o.key == column) {
                    let rowStr = (key-0+1)<10?'0'+(key-0+1):(key-0+1)+''
                    changeName = 'r'+rowStr+'c'+o.indexStr
                }
            })
            changeDatas[changeName] = curValue
            // changeDatas.push({
            //     "cellName": changeName,
            //     "value":curValue
            // })
            dynamicData[changeName] = curValue
        } else {
            value = ::this.clearThousandsPosition(value)+''            
            if(regex) {
                let re = new RegExp(regex)
                if(!re.test(value)) {
                    value = ''
                }
            }

            if (regex == "^([0-9]{1,2})(\.\d{1,2})?|100$" || regex == "^([0-9]{1,3})(\.\d{1,2})?|1000$") {
                if (value === '') {
                    value = '0'
                } else {

                    if (regex == "^([0-9]{1,2})(\.\d{1,2})?|100$" && value - 0 > 100) {
                        value = '100'
                    } else if (regex == "^([0-9]{1,2})(\.\d{1,2})?|100$" && value - 0 < 0) {
                        value = '0'
                    } else if (regex == "^([0-9]{1,3})(\.\d{1,2})?|1000$" && value - 0 > 1000) {
                        value = '1000'
                    } else if (regex == "^([0-9]{1,3})(\.\d{1,2})?|1000$" && value - 0 < 0) {
                        value = '0'
                    }
                    if (value !== "") {
                        value = ((value - 0).toFixed(2) - 0) + ''
                    }

                }
            }

            value = value.replace(/[^\d.-]/g, "")
            if(isNaN(value-0)) {
                value =''
            }
            data[key][column]=value
            //oldValue = oldData ? oldData[key][column] : undefined
            //将修改过的数据存储起来
            transData.map(o => {
                if(o.key == column) {
                    let rowStr = (key-0+1)<10?'0'+(key-0+1):(key-0+1)+''
                    changeName = 'r'+rowStr+'c'+o.indexStr
                }
            })
            changeDatas[changeName] = value
            // changeDatas.push({
            //     "cellName": changeName,
            //     "value":value
            // })
            dynamicData[changeName] = value
        }

        tableData.data = data
        tableData.transData = transData
        tableData.dynamicData = dynamicData
        tableData.dynamicData = dynamicData
        tableData.changeDatas = changeDatas

        this.props.onTableFieldChange(value, key, column, type, this.get('path'), transData, tableIndex, tableData, oldValue)
        
        // if(tableIndex ===undefined) {//单表
            
        // } else {// 多表

        // }
    }

    handleClick(text, row, dataIndex, item) {
        return () => {
            this.props.onEvent && this.props.onEvent('onTableLinkClick', {text,row,dataIndex,item})
        }
        
    }

    setCell(text, row,  dataIndex, index, item, cellProps,i,tableData) {
        let curMerge = item.renderMerge
            // component = item.component,
            // disable = item.disable? true:false
        for(let i=0;i<curMerge.length;i++) {
            if(curMerge[i].index == index) {
                if(curMerge[i].style) {
                    cellProps.style = curMerge[i].style
                }
                if(curMerge[i].colSpan===undefined&&curMerge[i].rowSpan===undefined) {
                    return ::this.setComponent(text, row, dataIndex, cellProps, item, curMerge[i],i,tableData)
        
                } else {

                    return {
                        // children: <div className={className}>{text}</div>,
                        children: ::this.setComponent(text, row, dataIndex, cellProps, item, curMerge[i],i,tableData),
                        props: {
                            colSpan: curMerge[i].colSpan,
                            rowSpan: curMerge[i].rowSpan
                        }
                    }
                }
            }
        }
        
        // return <div className={className}>{text}</div>
        return ::this.setComponent(text, row, dataIndex, cellProps, item, undefined,i,tableData)
    }
    setHeaderRow(column,index) {
        return <div className='z-th-cell'>
            {column}
        </div>
    }

    getHeaderLeft(prefixCls,leftChildrens) {
        return (
            <div className={`${prefixCls}-nav-left`}>
                {::this.getHeaderItems(leftChildrens)}
                <Button className={'refresh-btn'} icon='search' title='刷新'></Button>
            </div>
        )
    }

    getHeaderRight(prefixCls,rightChildrens) {
        return (
            <div className={`${prefixCls}-nav-right`}>
                {::this.getHeaderItems(rightChildrens)}
                <Button className='download-btn' type="ghost"  title='导出Excel'><Icon type="download" /></Button>
                <Button title='打印' className='printBtn' icon='search' />
            </div>
        )
    }

    getHeaderItems(childrens) {
        if(!childrens||!childrens.length) return
        childrens = childrens.map(item => {
            if(!item.component) return 
            return ::this.getHeaderComponent(item)

        })
        return childrens
    }

    getHeaderComponent(item) {
        let value = this.get('value'),
        paramsData = !!value && value.size>0 ? value.get('tableDetail').get('dataJson').get('paramsData') : undefined
        if(!item.component) {
            return <span {...item.cellProps}>
                {text}
            </span>
        }
        if(item.component=="Button") {
            return <Button {...item.cellProps}>{item.value}</Button>
        }
        if(item.component=="DatePicker") {
            return <DatePicker 
                    value = {paramsData && moment(paramsData.get(item.bindField), 'YYYY/MM/DD')}                              
                    onChange={ value => ::this.handleItemChange((value&&value.format("YYYY-MM-DD")),item,undefined)}
                    {...item.cellProps}
                    />
        }
        if(item.component=="MonthPicker") {
            return <MonthPicker 
                    value = {paramsData && moment(paramsData.get(item.bindField), 'YYYY/MM')}                              
                    onChange={ value => ::this.handleItemChange((value&&value.format("YYYY-MM")),item,undefined)} {...item.cellProps}/>
        }
        
        if(item.component=='Text') {
            return <span {...item.cellProps}>
                {paramsData.get(item.bindField)}
            </span>
        }
        if(item.component=='Input') {
            return <Input 
                        value={paramsData.get(item.bindField)||''} 
                        disabled={disabled} 
                        onChange={ value => ::this.handleChange(value.target.value, item,undefined) } 
                        {...item.cellProps}
                        regex={item.regex|| ''}	
                        maxLength ={item.maxlength|| 100}	
                    />
        }
        if(item.component == 'Select'){
            let selectList = (item&&item.selectList)?item.selectList : undefined,
                valueMember = (item&&item.valueMember)?item.valueMember : undefined,
                displayMember = (item&&item.displayMember)?item.displayMember : undefined
            
            return <Select style={{width:'100%'}} value={paramsData.get(item.bindField)}  onChange={ value => ::this.handleItemChange(value, item,undefined)} {...item.cellProps}>
                    {selectList.map(itemOption=><Option key={itemOption[valueMember]}>{itemOption[displayMember]}</Option>)}
                </Select>
        }

        if(item.component == 'MonthRangePicker') {
            let valueStart =  undefined,
                valueEnd = undefined
            if(text) {
                valueStart = paramsData.get(item.bindField).split('~')[0]?text.split('~')[0]:undefined
                valueEnd = paramsData.get(item.bindField).split('~')[1]?text.split('~')[1]:undefined
            }
            return <div {...item.cellProps}>
                <MonthPicker
                    value = {valueStart && moment(valueStart, 'YYYY/MM')}
                    onChange={ value => ::this.handleItemChange((value&&value.format("YYYY-MM")), item, 'start')}
                />
                <span style={{padding:'0 5px',color:'#d9d9d9'}}>—</span>
                <MonthPicker
                    value = {valueEnd && moment(valueEnd, 'YYYY/MM')}                              
                    onChange={ value => ::this.handleItemChange((value&&value.format("YYYY-MM")), item, 'end')}
                   
                />
            </div>
        }
    }

    handleItemChange(value,item,type) {
        ::this.props.onItemFieldChange(value,item,type)
    }

    /*handleChange(e,text,component){
        
        this.props.handleRowChange(e,text,component)
    }*/

    render() {
        let {prefixCls, ...otherProps} = this.props
        let className = classNames({
            'bordered': true
        }),
            value = this.get('value'),
            //title = !!value && value.size>0 ? value.get('tableType').get('name') : undefined,
            tableNameList = !!value && value.size>0 ? value.get('tableNameList') : undefined,
            //tableType = !!value && value.size>0 ? value.get('tableType') : undefined,
            content = !!value && value.size>0 ? value.get('tableDetail').get('dataJson').get('content') : undefined,
            header = !!value && value.size>0 ? value.get('tableDetail').get('dataJson').get('header') : undefined,
            leftChildrens,rightChildrens,isShow

        if(header) {
            isShow=header.toJS().isShow
            leftChildrens=header.toJS().leftChildrens
            rightChildrens=header.toJS().rightChildrens
        }

        if(!content) {
            return null
        }
 
        return (

            <div className={prefixCls}>
                <div className={`${prefixCls}-nav`}>
                    {
                        isShow?::this.getHeaderLeft(prefixCls,leftChildrens):null
                    }
                    {/*!!tableType.get('isExistTitle') ? <h2 className='reportFormTitle'>{title}</h2> : null*/}
                    {
                        isShow?::this.getHeaderRight(prefixCls,rightChildrens):null
                    }
                </div>
                <div className={`${prefixCls}-content`}>
                    {
                        /*!!tableType.get('isMultiPage') ?<div className={`${prefixCls}-tabs`}>{::this.getTabs(tableNameList)}</div> : null*/
                    }
                    
                    {::this.getTables(content)}
                </div>
            </div>
            
        )
    }

    getTabs(tableNameList){
        if(!tableNameList || tableNameList.size == 0) return null
        
        return (
            <Tabs
                //onChange={::this.callback}
                //defaultActiveKey={tableNameList.get(0).get('id')}
                className={'colflex1'}  ref='mTab'>
                    {
                        tableNameList.map(o => {
                            return <TabPane key={o.get('id')} className='colflex1 page1' tab={<span title={o.get('name')}>{o.get('name')}</span>}/>
                        })
                    }
            </Tabs>
        )
    }

    setRow(record, index, content) {
        let className = '',
            addRowClass = content.get('addRowClass') && content.get('addRowClass').size && content.get('addRowClass') && content.get('addRowClass').toJS()
        if(index%2) {
            className = 'oddRow'
        } else {
            className = 'evenRow'
        }
        if (addRowClass && addRowClass[index]){
            className += ` ${addRowClass[index]}`
        }
        return className
    }

    getTables(content){
        if(!content || content.size == 0) return null
        let {prefixCls, ...otherProps} = this.props,
            i =0 
        //判断是不是数组
        if(content.toJS().length===undefined) {
            let list = content.get('data').toJS(),
                tableHeight = document.querySelector('.ant-tabs-tabpane-active') ? document.querySelector('.ant-tabs-tabpane-active').clientHeight - 20 : 0,
                tableWidth = document.querySelector('.ant-tabs-tabpane-active') ? document.querySelector('.ant-tabs-tabpane-active').clientWidth - 20 : 0,                
                tHeadHeight = document.querySelector('.ant-table-header table') ? document.querySelector('.ant-table-header table').clientHeight :(document.querySelector('.ant-table-thead')?document.querySelector('.ant-table-thead').clientHeight:0),
                // tHeadHeight,
                height = (list.length)*32,
                scrollHeight = tableHeight - tHeadHeight - 45,                
                // scrollHeight,
                scroll                

            //height = height > scrollHeight ? scrollHeight : height
            //height = height<tHeadHeight?tHeadHeight:height
            // if(document.querySelector('.ant-table-header table')){
            //     tHeadHeight = document.querySelector('.ant-table-header table').clientHeight
            // }else if(document.querySelector('.ant-table-thead')){
            //     tHeadHeight = document.querySelector('.ant-table-thead').clientHeight
            // }else{
            //     tHeadHeight = 0
            // }
            // scrollHeight = tableHeight - tHeadHeight - 45
            if(content.get('scrollWidth') && content.get('scrollWidth')>tableWidth ) {
                scroll = {
                    x:content.get('scrollWidth')
                }
            }
            if(height > scrollHeight) {
                if(scroll) {
                    scroll.y = scrollHeight
                } else {
                    scroll = {
                        y: scrollHeight
                    }
                }
            }
            if(!scroll) {
                scroll = {
                    y: false,
                    x: false
                }
            }
            return (
                <div className='z-ant-table-tables'>
                    <Table
                        bordered={true}
                        size='small'
                        className={content.get('className')}
                        showHeader = {content.get('showHeader')===undefined?true:content.get('showHeader')}
                        pagination={false}
                        columns={::this.setColumns(content.get('columns').toJS(),content.get('operationList') ? content.get('operationList').toJS() : undefined, undefined, content.toJS())}
                        dataSource={content.get('data').toJS()}
                        onHeaderRow={::this.setHeaderRow('name',0)}
                        scroll={scroll}
                        rowClassName = {(record, index) => { return ::this.setRow(record, index,content) }}
                        {...otherProps}
                    />
                            
                </div>                
            )
        } else {
            let cardBodyHeight = document.querySelector('.ant-tabs-tabpane-active') ? document.querySelector('.ant-tabs-tabpane-active').clientHeight - 20 : undefined,
                height = cardBodyHeight ? cardBodyHeight - 45 : undefined

            return (

                <div className='z-ant-table-tables' style={{height:height,overflowY: 'auto'}}>
                    <div>
                        {
                            content.map(o => {
                                i++
                                return <Table
                                            bordered={true}
                                            size='small'
                                            className={content.get('className')}
                                            showHeader = {o.get('showHeader')===undefined?true:o.get('showHeader')}
                                            pagination={false}
                                            columns={::this.setColumns(o.get('columns').toJS(),o.get('operationList') ? o.get('operationList').toJS() : undefined, i, o.toJS())}
                                            dataSource={o.get('data').toJS()}
                                            onHeaderRow={::this.setHeaderRow('name',0)}
                                            rowClassName = {(record, index) => { return ::this.setRow(record, index,content) }}
                                            {...otherProps}
                                        />
                            }) 
                        }
                    </div>
                </div>
            )       
        }
    }

}
// {...otherProps}
                    {/*onChange={ value => ::this.handleChange(value.target.value, row.key,  dataIndex,'input', i, tableData) } */} 		
