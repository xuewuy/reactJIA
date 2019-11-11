import React,{ Component,PropTypes } from 'react'
import styles from "./footer.less"

export default class FooterComponent extends Component {
    static defaultProps = {
        prefixCls: 'footer'
    }
  render() {
    	let {prefixCls} = this.props,
          getterByField = this.props.payload.getIn(['utils', 'getterByField']),
          appInfo = getterByField('appInfo')
          if(!appInfo){
              return (
                  <footer className={prefixCls}>
                      <p className={`${prefixCls}-text`}>copyright © 2015-2017 北京人人时代科技有限公司</p>
                  </footer>
              )
          }else{
            if(appInfo.get('id') == 1000){
              return (
                  <footer className={prefixCls}>
                      <p className={`${prefixCls}-text`}>copyright © {appInfo.get('appCopyrightYear')}&nbsp;{appInfo.get('companyName')}&nbsp;联合出品</p>
                  </footer>
              )
            }else if(appInfo.get('id') == 1010){

                return (
                    <footer className={prefixCls}>
                        <p className={`${prefixCls}-text2line`}>copyright © {appInfo.get('appCopyrightYear')}&nbsp;{appInfo.get('companyName')}<br/>易嘉人提供算法引擎</p>
                    </footer>
                )
            
            }else{
                return (
                    <footer className={prefixCls}>
                        <p className={`${prefixCls}-text`}>copyright © {appInfo.get('appCopyrightYear')}&nbsp;{appInfo.get('companyName')}</p>
                    </footer>
                )
            }
          }
  }
}
