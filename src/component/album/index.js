import React from 'react'
import {Map} from 'immutable'
import ReactDOM from 'react-dom'

import {Carousel, Button, Upload, Icon, Card} from 'xComponent'
import {Modal} from 'dynamicComponent'
import './style.less'


export default class AlbumComponent extends React.Component {
  
    static defaultProps = {
        prefixCls: 'album'
    }

    state ={
        data:Map({
            offsetHeight:0,
            offsetWidth:0
        })
    }

    constructor(props){
        super(props)
        this.onResize = this.onResize.bind(this)
        this.update = this.update.bind(this)
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
            return data.mergeDeep(value)
        }
        if(typeof value === 'object'){
            return data.mergeDeepIn(propertyName.split('.'), value) 
        }
        else{
            return data.setIn(propertyName.split('.'), value)           
        }
    }
    componentWillReceiveProps( nextProps){
        this.update()
    }

    componentDidMount() {
        this.update()
        var win = window
        if (win.addEventListener) {
            win.addEventListener('resize', this.onResize, false)
        } else if (win.attachEvent) {
            win.attachEvent('onresize', this.onResize)
        } else {
            win.onresize = this.onResize
        }
    }

    componentWillUnmount(){
        var win = window
        if (win.removeEventListener) {
            win.removeEventListener('resize', this.onResize, false)
        } else if (win.detachEvent) {
            win.detachEvent('onresize', this.onResize)
        } else {
            win.onresize = undefined
        }
    }

    onResize() {
        clearTimeout(this._updateTimer)
        this._updateTimer = setTimeout(this.update, 16)
    }

    update() {
        let dom = ReactDOM.findDOMNode(this),
            height = dom.offsetHeight > window.innerHeight ? 0 :dom.offsetHeight 

        //todo
        this.setState({data:this.set(null,{offsetHeight:height , offsetWidth:dom.offsetWidth})})
    }

    render() {
      let album = this.props.album
      if(!album || album.size === 0) return null

      let {slidesToShow , initialSlide, dots } = this.props

      let albumSetting = {
          slidesToShow,
          initialSlide,
          centerPadding: 8,
          focusOnSelect: true,
          infinite:false,
          arrows:true,
          dots,
          prevArrow:<div><Button type='primary' shape='circle-outline' icon='left' /></div>,
          nextArrow:<div><Button type='primary' shape='circle-outline' icon='right' /></div>,
          afterChange: function (index) {
              
          }
        }

        let  style={height:this.get('offsetHeight'), width:this.get('offsetWidth')}
console.log(style)
        return (
            <div className={this.props.prefixCls} style={{width:style.width}}>
                <Carousel {...albumSetting}>
                    {album.map(o=>{
                        return (
                            <div style={{padding:8}}>
                                <Card  bodyStyle={{padding: 2}} >
                                    <a>
                                        <img className={`${this.props.prefixCls}-img`} src={o.get('fileUrl')} />
                                    </a>
                                </Card>
                            </div>
                        )
                    })}
                </Carousel>
            </div>
        )
  }
}
