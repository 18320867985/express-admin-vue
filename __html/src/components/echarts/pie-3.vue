<template>
<div :id="echartId" class="echart-box" :style="{height:height+'px'}"></div>
</template>

<script>
import * as echarts from 'echarts/core';
import {
    DatasetComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent
} from 'echarts/components';
import {
    LineChart,
    PieChart
} from 'echarts/charts';
import {
    CanvasRenderer
} from 'echarts/renderers';

echarts.use(
    [DatasetComponent, TooltipComponent, GridComponent, LegendComponent, LineChart, PieChart, CanvasRenderer]
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

        setTimeout(function () {

            option = {
                legend: {},
                tooltip: {
                    trigger: 'axis',
                    showContent: false
                },
                dataset: {
                    source: [
                        ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
                        ['成品奶茶', 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
                        ['牛奶火柴', 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
                        ['芝士可可', 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
                        ['比萨', 25.2, 37.1, 41.2, 18, 33.9, 49.1]
                    ]
                },
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    gridIndex: 0
                },
                grid: {
                    top: '55%'
                },
                series: [{
                        type: 'line',
                        smooth: true,
                        seriesLayoutBy: 'row',
                        emphasis: {
                            focus: 'series'
                        }
                    },
                    {
                        type: 'line',
                        smooth: true,
                        seriesLayoutBy: 'row',
                        emphasis: {
                            focus: 'series'
                        }
                    },
                    {
                        type: 'line',
                        smooth: true,
                        seriesLayoutBy: 'row',
                        emphasis: {
                            focus: 'series'
                        }
                    },
                    {
                        type: 'line',
                        smooth: true,
                        seriesLayoutBy: 'row',
                        emphasis: {
                            focus: 'series'
                        }
                    },
                    {
                        type: 'pie',
                        id: 'pie',
                        radius: '30%',
                        center: ['50%', '25%'],
                        emphasis: {
                            focus: 'data'
                        },
                        label: {
                            formatter: '{b}: {@2012} ({d}%)'
                        },
                        encode: {
                            itemName: 'product',
                            value: '2012',
                            tooltip: '2012'
                        }
                    }
                ]
            };

            myChart.on('updateAxisPointer', function (event) {
                var xAxisInfo = event.axesInfo[0];
                if (xAxisInfo) {
                    var dimension = xAxisInfo.value + 1;
                    myChart.setOption({
                        series: {
                            id: 'pie',
                            label: {
                                formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                            },
                            encode: {
                                value: dimension,
                                tooltip: dimension
                            }
                        }
                    });
                }
            });

            myChart.setOption(option);

        });

        option && myChart.setOption(option);
    },
}
</script>

<style lang="scss" scoped>
.echart-box {
    width: 100%;
    padding-top:15px ;
    background: #fff;

}
</style>>
