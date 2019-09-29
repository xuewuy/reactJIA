import React from 'react'
import { ReactEcharts } from 'xComponent'
import './china.js'

export default class RcEchartsMapComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    randomData() {
        return Math.round(Math.random()*1000);
    }

    getOptionPie() {
        return {
           title: {
               text: '找专家',
               textStyle: {
                  fontSize: 24,
                  fontWeight: 'normal'
               },
               subtext: '根据您所在的地区推荐财税机构及专家，供您自行选择',
               subtextStyle: {
                  fontSize: 16
               },
               left: 'center',
               top:45
           },
           tooltip: {
               trigger: 'item'
           },
           legend: {
               orient: '',
               left: '',
               show:false,
               data:[]
           },
           visualMap: {
               min: 0,
               max: 2500,
               left: 'left',
               top: 'bottom',
               show:false,
               type:'continuous',
               text: ['高','低'],           // 文本，默认为数值文本
               calculable: true
           },
           toolbox: {
               show: false,
               orient: 'vertical',
               left: 'right',
               top: 'center',
               feature: {
                   dataView: {readOnly: false},
                   restore: {},
                   saveAsImage: {}
               }
           },
           series: [
               {
                   name: '专家一',
                   type: 'map',
                   mapType: 'china',
                   roam: false,
                   label: {
                       normal: {
                           show: true
                       },
                       emphasis: {
                           show: true
                       }
                   },
                   data:[
                       {name: '北京',value: this.randomData() },
                       {name: '天津',value: this.randomData() },
                       {name: '上海',value: this.randomData() },
                       {name: '重庆',value: this.randomData() },
                       {name: '河北',value: this.randomData() },
                       {name: '河南',value: this.randomData() },
                       {name: '云南',value: this.randomData() },
                       {name: '辽宁',value: this.randomData() },
                       {name: '黑龙江',value: this.randomData() },
                       {name: '湖南',value: this.randomData() },
                       {name: '安徽',value: this.randomData() },
                       {name: '山东',value: this.randomData() },
                       {name: '新疆',value: this.randomData() },
                       {name: '江苏',value: this.randomData() },
                       {name: '浙江',value: this.randomData() },
                       {name: '江西',value: this.randomData() },
                       {name: '湖北',value: this.randomData() },
                       {name: '广西',value: this.randomData() },
                       {name: '甘肃',value: this.randomData() },
                       {name: '山西',value: this.randomData() },
                       {name: '内蒙古',value: this.randomData() },
                       {name: '陕西',value: this.randomData() },
                       {name: '吉林',value: this.randomData() },
                       {name: '福建',value: this.randomData() },
                       {name: '贵州',value: this.randomData() },
                       {name: '广东',value: this.randomData() },
                       {name: '青海',value: this.randomData() },
                       {name: '西藏',value: this.randomData() },
                       {name: '四川',value: this.randomData() },
                       {name: '宁夏',value: this.randomData() },
                       {name: '海南',value: this.randomData() },
                       {name: '台湾',value: this.randomData() },
                       {name: '香港',value: this.randomData() },
                       {name: '澳门',value: this.randomData() }
                   ]
               },
               {
                   name: '专家二',
                   type: 'map',
                   mapType: 'china',
                   label: {
                       normal: {
                           show: true
                       },
                       emphasis: {
                           show: true
                       }
                   },
                   data:[
                       {name: '北京',value: this.randomData() },
                       {name: '天津',value: this.randomData() },
                       {name: '上海',value: this.randomData() },
                       {name: '重庆',value: this.randomData() },
                       {name: '河北',value: this.randomData() },
                       {name: '安徽',value: this.randomData() },
                       {name: '新疆',value: this.randomData() },
                       {name: '浙江',value: this.randomData() },
                       {name: '江西',value: this.randomData() },
                       {name: '山西',value: this.randomData() },
                       {name: '内蒙古',value: this.randomData() },
                       {name: '吉林',value: this.randomData() },
                       {name: '福建',value: this.randomData() },
                       {name: '广东',value: this.randomData() },
                       {name: '西藏',value: this.randomData() },
                       {name: '四川',value: this.randomData() },
                       {name: '宁夏',value: this.randomData() },
                       {name: '香港',value: this.randomData() },
                       {name: '澳门',value: this.randomData() }
                   ]
               },
               {
                   name: '专家三',
                   type: 'map',
                   mapType: 'china',
                   label: {
                       normal: {
                           show: true
                       },
                       emphasis: {
                           show: true
                       }
                   },
                   data:[
                       {name: '北京',value: this.randomData() },
                       {name: '天津',value: this.randomData() },
                       {name: '上海',value: this.randomData() },
                       {name: '广东',value: this.randomData() },
                       {name: '台湾',value: this.randomData() },
                       {name: '香港',value: this.randomData() },
                       {name: '澳门',value: this.randomData() }
                   ]
               }
           ]
        }
    }

    render() {
        return (
            <div style={{height:'100%',width:'100%'}}>
                <ReactEcharts echartOption={::this.getOptionPie()} style={{height:'100%',width:'100%'}}/>
            </div>
        )
    }
}
