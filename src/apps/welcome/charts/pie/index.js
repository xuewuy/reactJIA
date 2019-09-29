import React from 'react';
import { ReactEcharts }  from 'xComponent'

export default class EchartPieComponent extends React.Component {
	constructor(props) {
		super(props);
	}

	getOptionPie() {
	    return {
	        title: {
	            text: '销售签约榜',
	            // subtext: '纯属虚构',
	            x: 'center'
	        },
	        tooltip: {
	            trigger: 'item',
	            formatter: "{a} <br/>{b} : {c} ({d}%)"
	        },
	        // legend: {
	        //     orient: 'vertical',
	        //     x: 'left',
	        //     data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
	        // },
	        toolbox: {
	            show: true,
	            feature: {
	                mark: {show: true},
	                dataView: {show: true, readOnly: false},
	                magicType: {
	                    show: true,
	                    type: ['pie', 'funnel'],
	                    option: {
	                        funnel: {
	                            x: '25%',
	                            width: '50%',
	                            funnelAlign: 'left',
	                            max: 1548
	                        }
	                    }
	                },
	                restore: {show: true},
	                saveAsImage: {show: true}
	            }
	        },
	        calculable: true,
	        series: [
	            {
	                name: '签约总额',
	                type: 'pie',
	                radius: '55%',
	                center: ['50%', '60%'],
	                data: [
	                    {value: 40000, name: '业务二部(王二)'},
	                    {value: 32000, name: '业务六部(钱五)'},
	                    {value: 15000, name: '业务七部(刘八)'},
	                    {value: 50000, name: '业务一部(张一)'},
	                    {value: 40000, name: '业务三部(李三)'},
						{value: 30000, name: '业务四部(赵四)'}
	                ]
	            }
	        ]
	    }
	}

	render() {
        return (
            <div>
                <ReactEcharts echartOption={::this.getOptionPie()} theme='macarons' style={{height: '400px', width: '100%'}}/>
            </div>
        )
    }
}
