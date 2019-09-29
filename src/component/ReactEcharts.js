/**
 * Created by shenxy on 16/8/19.
 */
import React from 'react'
import ReactEcharts from 'echarts-for-react'  // or var ReactEcharts = require('echarts-for-react');
import './chartsTheme/macarons'
import './chartsTheme/shine'

export default class ReactEchartsComponent extends React.Component{

    onChartReadyCallback(echart) {
        //console.log(echart)
    }

    EventsDict(e) {
        //console.log('echart' + e)
    }

    shouldComponentUpdate(nextProps){
        let refName = nextProps.refName || 'echarts_react'
        let echarts_instance = this.refs[refName].getEchartsInstance();
        echarts_instance.clear()
        echarts_instance.resize()
        return true
    }

    render() {
        let option = this.props.echartOption
        let theme = this.props.theme
        let style = this.props.style
        let refName = this.props.refName || 'echarts_react'
        if (!style) {
            style = {height: '200px', width: '100%', position:'absolute'}
        }
        if (option) {
            return (
                <ReactEcharts
                    ref={refName}
                    option={option}
                    theme={theme}
                    style={style}
                    onChartReady={this.onChartReadyCallback}
                    // onEvents={this.EventsDict} 
                />
            )
        }
        else {
            return null
        }
    }
}
