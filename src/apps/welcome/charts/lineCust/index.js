import React from 'react';
import { ReactEcharts }  from 'xComponent'

export default class EchartPieComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    getOptionLine() {
        return {
        	// title: {
        	// 	text: '2016年理票概况'
        	// },
        	tooltip : {
        		trigger: 'axis'
        	},
        	legend: {
        		data:['理票记录数','附件数','上传图片数','上传表单数']
        	},
        	toolbox: {
        		feature: {
        			dataZoom: {
        				yAxisIndex: 'none'
        			},
        			dataView: {readOnly: false},
        			magicType: {type: ['line', 'bar']},
        			restore: {},
        			saveAsImage: {}
        		}
        	},
        	xAxis : [
        		{
        			type : 'category',
        			boundaryGap : false,
        			data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
        		}
        	],
        	yAxis : [
        		{
        			type : 'value'
        		}
        	],
        	series : [
        		{
        			name:'理票记录数',
        			type:'line',
        			// stack: '数量',  //该配置项,确定是否堆叠样式
        			data:[1600, 1800, 2100, 2200, 2050, 1900, 1800, 1600, 1400, 1600, 1500, 1600]
        		},
        		{
        			name:'附件数',
        			type:'line',
        			// stack: '数量',
        			data:[1200, 1400, 1650, 1600, 1700, 1800, 1700, 2100, 2200, 2400, 2200, 1900]
        		},
        		{
        			name:'上传图片数',
        			type:'line',
        			// stack: '数量',
        			data:[480, 600, 700, 750, 700, 800, 1000, 1300, 1200, 1500, 1400, 1450]
        		},
        		{
        			name:'上传表单数',
        			type:'line',
        			// stack: '数量',
        			data:[300, 600, 500, 800, 900, 1200, 1150, 950, 1050, 850, 900, 600]
        		}
        	]
        }
    }

    render() {
        return (
            <div>
                <ReactEcharts
					echartOption={::this.getOptionLine()}
					style={{height: '400px', width: '100%'}}
					theme='shine'/>
            </div>
        )
    }

    // theme='macarons'
}
