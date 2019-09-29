import React,{ Component,PropTypes } from 'react'
import {Spin} from 'antd'
import ReactDOM from 'react-dom'
import './style.less'

class LoadingMaskComponent extends Component {
    static defaultProps = {
        prefixCls: 'LoadingMask'
    }

	render(){
		let {prefixCls} = this.props,
      tip = this.props.content || '正在处理中...',
      showBackground  = (this.props.showBackground === false ? false : true)
		
      return showBackground ? 
        <div className={prefixCls+'-1'}>
          <Spin size="large" tip={tip} />
        </div>  : 
        <div className={prefixCls+'-2'}>
        </div> 
  }
}



LoadingMaskComponent.newInstance = function newLoadingMaskInstance() {
  const div = document.createElement('div')
  return {
  	show(properties){
      const props = properties || {}
  		document.body.appendChild(div)
  		ReactDOM.render(<LoadingMaskComponent {...props} />, div)
  	},
  	hide() {
      	ReactDOM.unmountComponentAtNode(div)
        try{
      	   document.body.removeChild(div)
        }catch(e){

        }
    }
  }
}

let loadingMask = window.LoadingMask

if(!loadingMask){
    loadingMask = LoadingMaskComponent.newInstance()
    window.LoadingMask = loadingMask
}



export default loadingMask