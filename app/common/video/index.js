import React,{ Component,PropTypes } from 'react'


export default class VideoComponent extends Component {
	
  constructor(props){
      super(props)
  }

  render() {
    return (
      <video controls autoPlay height={this.props.appParams.height} width={this.props.appParams.width} name="media">
        <source src={this.props.appParams.videoUrl} type="video/mp4" />
      </video>
    )  	
  }
}
