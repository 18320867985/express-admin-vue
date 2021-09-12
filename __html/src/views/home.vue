<template>
<div>

    <h3 class="echart-ttl" style="margin-top:10px">柱状图数据分析</h3>
    <bar-chart echartId="bar"></bar-chart>

    <!-- <h3 class="echart-ttl">饼状图数据分析</h3>
    <div class="pie-box">
        <div>
            <pie-chart echartId="pie"></pie-chart>
        </div>
    </div> -->

    <h3 class="echart-ttl"  >饼状图数据分析</h3>
    <div class="pie-box">
        <div>
            <pie-chart-2 echartId="pie-2" :height="550"></pie-chart-2>
        </div>
    </div>

    <h3 class="echart-ttl" >线状图数据分析</h3>
    <line-chart  echartId="line-1" :height="450"></line-chart>

    <h3 class="echart-ttl">线状和饼状图综合数据分析</h3>
    <div class="pie-box">
        <div>
            <pie-chart-3 echartId="pie-3" :height="600"></pie-chart-3>
        </div>
    </div>

</div>
</template>

<script>
import LineChart from "../components/echarts/line.vue";
import BarChart from "../components/echarts/bar.vue";
//import PieChart from "../components/echarts/pie.vue";
import PieChart2 from "../components/echarts/pie-2.vue";
import PieChart3 from "../components/echarts/pie-3.vue"

export default {
    data() {
        return {}
    },
    computed: {

        getUserVid() {
            return this.$store.getters.getUserVid;
        }
    },
    components: {
        LineChart,
        BarChart,
        // PieChart,
        PieChart2,
        PieChart3
    }
}
</script>

<style lang="scss" scoped>
.echart-ttl {
    text-align: center;
    color: #777;
    padding-bottom: 10px;
    font-size: 18px;
}

.pie-box {
    display: flex;
    justify-content: space-around;

    >div {
        flex: 1;
    }

}
</style>
