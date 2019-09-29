import React from 'react';
import { ReactEcharts }  from 'xComponent'

export default class EchartPieComponent extends React.Component {
	constructor(props) {
		super(props);
	}

	getOptionBar() {
	    return {
			tooltip : {
				trigger: 'axis',
				axisPointer : {            // 坐标轴指示器，坐标轴触发有效
					type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			legend: {
				data:['散户数','一般纳税人','小规模纳税人']
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis : [
				{
					type : 'category',
					data : ['业务五部','业务三部','业务二部','业务一部','业务四部']
				}
			],
			yAxis : [
				{
					type : 'value'
				}
			],
			series : [
				{
					name:'散户数',
					type:'bar',
					data:[200, 190, 300, 440, 600]
				},
				{
					name:'一般纳税人',
					type:'bar',
					// stack: '广告',
					data:[130, 180, 260, 390, 540]
				},
				{
					name:'小规模纳税人',
					type:'bar',
					// stack: '广告',
					data:[180, 130, 160, 210, 140]
				}
			]
		}
	}

	render() {
        return (
            <div>
                <ReactEcharts echartOption={::this.getOptionBar()} theme='macarons' style={{height: '400px', width: '100%'}}/>
            </div>
        )
    }
}
