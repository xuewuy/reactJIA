import React,{ Component,PropTypes } from 'react'
export default class ImgComponent extends Component {
    render() {
        let initData = this.props.initData || {},
            url = initData.url,
            width = initData.width,
            height = initData.height
      return (
          <img style={{width:width,height:height}} src={url} />
      )   
    }
}
