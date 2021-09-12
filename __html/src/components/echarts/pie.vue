<template>
<div :id="echartId" class="echart-box" :style="{height:height+'px'}"></div>
</template>

<script>
import * as echarts from 'echarts/core';
import {
    PieChart
} from 'echarts/charts';
import {
    CanvasRenderer
} from 'echarts/renderers';

echarts.use(
    [PieChart, CanvasRenderer]
);

export default {

    props: {
        echartId: {
            type: String,
            default: "echartId"
        },
         height:{
            type:Number,
            default:400
        }
    },

    mounted() {
        var chartDom = document.getElementById(this.echartId);
        var myChart = echarts.init(chartDom);
        var option;

        option = {
            series: [{
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                data: [{
                        value: 235,
                        name: '视频广告'
                    },
                    {
                        value: 274,
                        name: '联盟广告'
                    },
                    {
                        value: 310,
                        name: '邮件营销'
                    },
                    {
                        value: 335,
                        name: '直接访问'
                    },
                    {
                        value: 400,
                        name: '搜索引擎'
                    }
                ]
            }]
        };

        option && myChart.setOption(option);

    },
}
</script>

<style lang="scss" scoped>
.echart-box {
    width: 100%;
    background: #fff;

}
</style>>
