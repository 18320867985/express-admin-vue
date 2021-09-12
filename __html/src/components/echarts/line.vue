<template>
    <div :id="echartId" class="echart-box"></div>
</template>

<script>
import * as echarts from 'echarts/core';
import {
    GridComponent
} from 'echarts/components';
import {
    LineChart
} from 'echarts/charts';
import {
    CanvasRenderer
} from 'echarts/renderers';

echarts.use(
    [GridComponent, LineChart, CanvasRenderer]
);

export default {

    props: {
        echartId: {
            type: String,
            default: "echartId"
        }
    },
    mounted() {

        var chartDom = document.getElementById(this.echartId);
        var myChart = echarts.init(chartDom);
        var option;

        option = {
            xAxis: {
                type: 'category',
                data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line'
            }]
        };

        option && myChart.setOption(option)

    },
}
</script>

<style lang="scss" scoped>
.echart-box{
    height: 400px;
    width: 100%;
    background: #fff;

}
</style>>


