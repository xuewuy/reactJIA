import React from 'react'
import {Map} from 'immutable'
import {Pagination, Button}  from 'xComponent'

export default class PaginationComponent extends React.Component {
    static defaultProps = {
        prefixCls: 'z-pagination'
    }

  	state = {
  		data : Map({
  			value:null,
            // isJumpPage:false
  		})
  	}


    constructor(props){
        super(props)
        this.state = this.calculateState(this.props)
    }

    componentWillReceiveProps(nextProps){


        this.setState(this.calculateState(nextProps))
    }

    shouldComponentUpdate(nextProps, nextState){

        // if(nextState.data.get("isJumpPage")) return false
        return !this.state.data.equals(nextState.data)
    }

    calculateState(props){
        let { data } = this.state,
            {_getter, _path} = props,
            pValus = _getter(_path, ['value', 'pageSizeOptions']),
            value = _getter(_path,'value'),
            pageSizeOptions = pValus.get('pageSizeOptions') || ['20','50','100','200']

        // data = data.set('value', value)

        // let currentPage = $('#z-pagination .ant-pagination-options-quick-jumper input').attr('value'),
        //     current = parseInt(currentPage),
        //     totalPage = Math.ceil(value.get('total') / value.get('pageSize'))

        // if(current > totalPage) {
        //     value = value.set('current', totalPage)
            // this.setState({data:this.set('value', newValue)})
        // }
        data = this.set(null,{path: _path, value, pageSizeOptions })

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

    handleChange(current){
        this.props.onEvent && this.props.onEvent('onGridPageChanged', {path:this.props._path,current, pageSize: this.get('value').get('pageSize')})
    }

    handleSizeChange(e, pageSize){
         this.props.onEvent && this.props.onEvent('onGridPageSizeChanged', {path:this.props._path, pageSize, current: this.get('value').get('current')})
    }

    handleGoPageSize() {
        let currentPage = $('#z-pagination .ant-pagination-options-quick-jumper input').attr('value'),
            current = parseInt(currentPage),
            totalPage = Math.ceil(this.get('value').get('total') / this.get('value').get('pageSize'))

        if(current == NaN || current > totalPage) {
            current = totalPage
            // $('#z-pagination .ant-pagination-options-quick-jumper input').val(current)
            // this.setState({data:this.set('isJumpPage',true)})
            // this.setState(this.calculateState(this.props, current))
            // let value = this.get('value').set('current', totalPage)
            // this.setState({data:this.set('value', value)})
        } else if (current == 0 || current < 0) {
            current = 1
        }
        this.props.onEvent && this.props.onEvent('onGridPageChanged', {path:this.props._path,current , pageSize: this.get('value').get('pageSize')})
    }

    render(){
      let currentPageSize = this.get('value.current') || 1
	    return(
            <div className={this.props.prefixCls} id={this.props.prefixCls}>
	    	    <Pagination
                    showSizeChanger
                    showQuickJumper
                    current={this.get('value.current') || 1}
                    pageSize = {this.get('value.pageSize') || 10}
                    total={this.get('value.total') || 0}
                    onChange={::this.handleChange}
                    onShowSizeChange ={::this.handleSizeChange}
                    pageSizeOptions = {::this.get('pageSizeOptions')}
                />
                <Button onClick={::this.handleGoPageSize}>确定</Button>
            </div>
    	)
    }
}
