import React from 'react'

import {Carousel, Button, Upload, Icon, Card} from 'xComponent'


import {Modal} from 'dynamicComponent'
import './viewAlbum.less'


export default class ViewAlbumComponent extends React.Component {
  
    static defaultProps = {
        prefixCls: 'richardticketviewalbum'
    }

    componentDidMount() {
        this.props.initView(this.props.initData)
    }

    handleDelImage(item){
        return (e)=>{
          if(e.preventDefault)
            e.preventDefault()
          if( e.stopPropagation)
            e.stopPropagation()
            this.props.delImage(item)            
        }
    }

    handleSelectImage(item){
        return (e)=>{
          if(e.preventDefault)
            e.preventDefault()
          if( e.stopPropagation)
            e.stopPropagation()
          this.props.selectImage(item)            
        }
    }
	
	
	handleShowPrev() {
		let comingPic = 'prev'
		this.props.showAroundPics(comingPic)
	}
	
	handleShowNext() {
		let comingPic = 'next'
		this.props.showAroundPics(comingPic)
	}

    render() {
        if(!this.props.payload || !this.props.payload.get('utils') )  return null
        let message = this.props.payload.getIn(['global', 'message'])

        let {prefixCls, ...otherProps} = this.props,
            getterByField = this.props.payload.getIn(['utils','getterByField']),
            album = getterByField('album'),
            isEdit = getterByField('isEdit'),
            positon = getterByField('slidePosition'),
            albumSize = album ? album.size : 0,
            currentImg = getterByField('current'),
			picNum = (getterByField('currentIndex') + 1) + '/' + albumSize
        

        let albumSetting = {
              slidesToShow: 4,
              slidesToScroll: 1,
              initialSlide: 0,
              slickGoTo:positon,
              centerPadding: 8,
              focusOnSelect: true,
              infinite:false,
              arrows:albumSize > 4,
              variableWidth: false,
              className:this.props.prefixCls + '-carousel',
              dots: false,
              prevArrow:<div><Button type='primary' shape='circle-outline' icon='left' /></div>,
              nextArrow:<div><Button type='primary' shape='circle-outline' icon='right' /></div>,
              afterChange:(current)=>{
                this.props.changeSlidePosition(current)
              }
        }

        let currentShowImage = null
        if(currentImg)
            currentShowImage = <div className={`${prefixCls}-preview-imgDad`}><img className={`${prefixCls}-preview-img`}  src={currentImg.get('src')}/></div>

        return (
            <div className={prefixCls}>
				<div className={`${prefixCls}-picNum`}>{picNum}</div>
                <div  className={`${prefixCls}-preview`} >
					<Icon onClick={::this.handleShowPrev} className={`${prefixCls}-showPrev`}  type='question' title='上一张' />
					<Icon onClick={::this.handleShowNext} className={`${prefixCls}-showNext`}  type='question' title='下一张' />
                   {currentShowImage}
                </div>
                 
                <Carousel {...albumSetting}>
                    {album.map(o=>{
                        return (
                            <div className={`${prefixCls}-card`}>
                                <Card  bodyStyle={{padding: 2}} >
                                    <a onClick={::this.handleSelectImage(o)}>
                                        <img className={`${prefixCls}-img`} src={o.get('src')} />
                                    </a>
                                     {isEdit?
                                        <a onClick={::this.handleDelImage(o)}><Icon className={`${prefixCls}-icon`}  type='cross-circle'></Icon></a>
                                        : null
                                     }
                                    
                                </Card>
                            </div>
                        )
                    }).toJS()}
                </Carousel>
                {Modal(message)}
            </div>
        )
  }
}
