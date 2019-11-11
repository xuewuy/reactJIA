import React from 'react'
import {Map} from 'immutable'
import { Form,DatePicker } from 'xComponent'
import {Layout} from 'xComponent'
import DynamicComponent from 'dynamicComponent'

const Header = Layout.Header
const Content = Layout.Content
const Footer = Layout.Footer
const Sider = Layout.Sider




export default class TestComponent extends React.Component {
    componentDidMount() {
        this.props.initView()
    }

    render(){
      if(!this.props.payload || !this.props.payload.get('utils') )  return null
        debugger
      return <DynamicComponent  {...this.props} _path='root'/>
    }


  /*
  render() {

    return (
      <Layout direction='column' style={{backgroundColor:'white'}}>
        <Layout height={200}  style={{backgroundColor:'antiquewhite'}}>header</Layout>
        <Layout direction='row'>
          <Layout width={200}  style={{backgroundColor:'burlywood'}} >c1</Layout>
          <Layout direction='column'>
            <Layout height={200} style={{backgroundColor:'red'}}>
            d1
            </Layout>
            <Layout direction='row' >
              <Layout justifyContent='center' alignItems='center' style={{backgroundColor:'blue'}}>
              e1
              </Layout>
              <Layout>
              e2
              </Layout>
              <Layout style={{backgroundColor:'blue'}}>
              e3
              </Layout>
            </Layout>
            <Layout height={200} style={{backgroundColor:'red'}}>
            d3
            </Layout>
          </Layout>
          <Layout width={200} style={{backgroundColor:'burlywood'}} >c3</Layout>
        </Layout>
        <Layout height={200}  style={{backgroundColor:'antiquewhite'}}>footer</Layout>
      </Layout>
    )
  }*/
}
