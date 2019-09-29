import React,{ Component,PropTypes } from 'react'
import {Button} from 'xComponent'
import {Map} from 'immutable'
import {Select,Input} from 'antd'
// import * as city from './city'
import {post} from '../utils/fetch-wrapper/index.js'
import webapi from 'webapi'
const Option = Select.Option

export default class AddressComponent extends Component {

    static defaultProps = {
        prefixCls: 'z-address'
    }

    state = {
        path:'',
        provinces: '',
        citys:'',
        districts:'',
        text:'',
        city:{},
        isShowDetail:true
    }

    constructor(props){
        super(props)
        this.state = props.value
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.value.provinces != this.state.provinces){
            webapi.org.getCityMap(post,{code:nextProps.value.provinces}).then(data=>{
                this.setState({city:data.value,...nextProps.value})
            })
        }else{
            this.setState(nextProps.value)
        }

    }
    componentDidMount() {
        let code = null
        if(this.props.value.provinces){
            code = this.props.value.provinces
        }
        webapi.org.getCityMap(post,{code:code}).then(data=>{
            this.setState({city:data.value})
        })

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
        if(typeof value === 'object'){
            return data.mergeIn(propertyName.split('.'), value)
        }
        else{
            return data.setIn(propertyName.split('.'), value)
        }
    }

    // 当值发生改变的时候
  	provincesChange(e){
        webapi.org.getCityMap(post,{code:e}).then(data=>{
            this.setState({city:data.value})
            if(data.result && data.value){
                return data.value
            }else{
                return false
            }
        }).then(data=>{
            if(data){
                this.setState({provinces:e,citys:e.substr(0,2)+'0100',districts:e.substr(0,2)+'0101',city:data})
                this.props.onChange && this.props.onChange(Map({provinces:e,citys:e.substr(0,2)+'0100',districts:e.substr(0,2)+'0101',text:this.state.text}))
            }
        })

  	}
    citysChange(e){
        let districtsArr = [],
            city = this.state.city
        city.countyList.map((x) => {
            if(x.code.substr(0,4) == e.substr(0,4)){
                districtsArr.push(x.code)
            }
        })
        this.setState({citys:e,districts:districtsArr[0]})
        this.props.onChange && this.props.onChange(Map({provinces:this.state.provinces,citys:e,districts:districtsArr[0],text:this.state.text}))
    }
    districtsChange(e){
        this.setState({districts:e})
        this.props.onChange && this.props.onChange(Map({provinces:this.state.provinces,citys:this.state.citys,districts:e,text:this.state.text}))
    }
    addressText(e){
        this.setState({text:e.target.value})
        this.props.onChange && this.props.onChange(Map({provinces:this.state.provinces,citys:this.state.citys,districts:this.state.districts,text:e.target.value}))
    }
    citysInit(){
        let arr = [],
            This = this,
            city = this.state.city
        city && city.cityList.map((x) => {
            if(!!This.state.provinces && This.state.provinces.substr(0,2) == x.code.substr(0,2)){
                arr.push(<Option key={x.c} value={x.code}>{x.name}</Option>)
            }else if(This.state.provinces == ''){
                arr.push(<Option key={x.c} value={x.code}>{x.name}</Option>)
            }
        })
        return arr
    }
    districtsInit(){
        let arr = [],
            This = this,
            city = this.state.city
        city && city.countyList.map((x) => {
            if(!!This.state.citys && This.state.citys.substr(0,4) == x.code.substr(0,4)){
                arr.push(<Option key={x.code} value={x.code}>{x.name}</Option>)
            }else if(This.state.citys == ''){
                arr.push(<Option key={x.code} value={x.code}>{x.name}</Option>)
            }
        })
        return arr
    }
	render(){
		let {value,showDetail,showTips} = this.props
        let selectWidth = 120,
            inputWidth = 300,
            city = this.state.city,
            disabled=value.disabled || false,
            isShowDetail = showDetail === false?showDetail:true
        if (value.width) {
            selectWidth = value.width * 0.25
            inputWidth = value.width * 0.25
        }
		return (
			<div className={`prefixCls`}>
                <Select disabled={disabled} value={this.state.provinces} style={{ width: selectWidth, 'margin-right':5 }} onChange={::this.provincesChange} >
                    {
                        city && city.provinceList.map((x) => {
                            return <Option key={x.code} value={x.code}>{x.name}</Option>
                        })
                    }
                </Select>
                <Select  disabled={disabled} value={this.state.citys} style={{ width: selectWidth, 'margin-right':5 }} onChange={::this.citysChange}>
                    {
                        this.citysInit()
                    }
                </Select>
                <Select disabled={disabled} value={this.state.districts}  style={{ width: selectWidth, 'margin-right':5 }} onChange={::this.districtsChange}>
                    {
                        this.districtsInit()
                    }
                </Select>
                {isShowDetail?<Input title = {showTips? this.state.text:'' } disabled={disabled} placeholder="" value={this.state.text} onChange={::this.addressText} style={{width:inputWidth}}/>:''}

            </div>
		)
	}
}
