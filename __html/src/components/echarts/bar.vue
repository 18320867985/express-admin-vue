<template>
<div :id="echartId" class="echart-box"></div>
</template>

<script>
import * as echarts from 'echarts/core';
import {
    GridComponent
} from 'echarts/components';
import {
    BarChart
} from 'echarts/charts';
import {
    CanvasRenderer
} from 'echarts/renderers';

echarts.use(
    [GridComponent, BarChart, CanvasRenderer]
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
                data: ['1', '2', '3', '4', '5', '6', '7','8', '9', '10', '11', '12', '13', '14','15', '16', '17', '18', '19','20',"21",'22',"23",'24',"25",'26',"27","28",'29',"30"]
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [120, 500, 150, 180, 270, 110, 130,820, 200, 150, 280, 700, 110, 130,234,110, 130,820, 200, 150, 280, 700, 110,130,820, 300, 550, 680, 200, 810],
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                }
            }]
        };

        option && myChart.setOption(option);

    },
}
</script>

<style lang="scss" scoped>
.echart-box {
    height: 400px;
    width: 100%;
    background: #fff;

}
</style>>
