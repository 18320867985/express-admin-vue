<template>
<div>

    <h3 class="echart-ttl">柱状图数据分析</h3>
    <bar-chart echartId="bar"></bar-chart>

    <!-- <h3 class="echart-ttl">饼状图数据分析</h3>
    <div class="pie-box">
        <div>
            <pie-chart echartId="pie"></pie-chart>
        </div>
    </div> -->

    <h3 class="echart-ttl">饼状图数据分析</h3>
    <div class="pie-box">
        <div>
            <pie-chart-2 echartId="pie-2"></pie-chart-2>
        </div>
    </div>

    <h3 class="echart-ttl">线状图数据分析</h3>
    <line-chart></line-chart>

    <h3 class="echart-ttl">饼状图数据分析</h3>
    <div class="pie-box">
        <div>
            <pie-chart-3 echartId="pie-3"></pie-chart-3>
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
    padding: 5px;
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
