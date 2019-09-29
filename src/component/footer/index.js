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
          return (
            <footer className={prefixCls}>
                <p className={`${prefixCls}-text`}>copyright © 2019 薛武英</p>
            </footer>
        )
  }
}
