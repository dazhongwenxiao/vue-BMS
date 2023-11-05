<template>
  <div class="echart" ref="echart"></div>
</template>

<script>
import echarts from 'echarts'
export default {
    name: 'barChart'
    ,mounted(){
        // 初始化init实例
        let barChart = echarts.init(this.$refs.echart)
        // 配置数据
        barChart.setOption({
            xAxis: {
                show: false
                ,type: 'category'
            }
            ,yAxis: {
                show: false
            }
            // 系列
            ,series: [
                {
                    type: 'bar'
                    ,data: [80,40,70,30,20,50,80,20]
                    ,color: '#00008b'
                }
            ]
            // 布局调试
            ,grid: {
                left: 0
                ,right: 0
                ,top: 0
                ,bottom: 0
            }
            // 提示
            ,tooltip: {}
        })
    }
}
</script>

<style>
.echart{
    width: 100%;
    height: 100%;
}
</style>