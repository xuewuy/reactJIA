import React from 'react';
import { ReactEcharts }  from 'xComponent'

export default class EchartPieComponent extends React.Component {
	constructor(props) {
		super(props);
	}

	getOptionLine() {
	    return {
			title: {
				text: '收费回款统计'
			},
			tooltip : {
				trigger: 'axis'
			},
			legend: {
				data:['本期营业收入','一般纳税人','小规模纳税人']
			},
			toolbox: {
				feature: {
					saveAsImage: {}
				}
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
					boundaryGap : false,
					data : ['财务托管','财税梳理','财税咨询','上市服务','方案筹划','汇算清缴','财产损失', '政府沟通']
				}
			],
			yAxis : [
				{
					type : 'value'
				}
			],
			series : [
				{
					name:'本期营业收入',
					type:'line',
					stack: '总量',
					areaStyle: {normal: {}},
					data:[14000000, 5000000, 9000000, 17000000, 7000000, 11600000, 3500000, 8800000]
				},
				{
					name:'一般纳税人',
					type:'line',
					stack: '总量',
					areaStyle: {normal: {}},
					data:[9000000, 3000000, 6000000, 11000000, 4800000, 6800000, 2000000, 5300000]
				},
				{
					name:'小规模纳税人',
					type:'line',
					stack: '总量',
					areaStyle: {normal: {}},
					data:[5000000, 2000000, 3000000, 6000000, 2200000, 4800000, 1500000, 3500000]
				}
			]
		}
	}

	render() {
        return (
            <div>
                <ReactEcharts echartOption={::this.getOptionLine()} style={{height: '400px', width: '100%'}}/>
            </div>
        )
    }

	// theme='macarons'
}
