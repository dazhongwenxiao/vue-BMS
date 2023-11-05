<template>
    <div class="chart" ref="chart"></div>
</template>

<script>
import echarts from 'echarts'
export default {
    name: 'progressChart'
    ,mounted(){
        // 初始化
        let progressChart = echarts.init(this.$refs.chart)

        progressChart.setOption({
            xAxis: {
                show: false
                // 最小值最大值的设置
                ,min: 0
                ,max: 100
            }
            ,yAxis: {
                show: false
                ,type: 'category'
            }
            ,series: [
                {
                    type: 'bar'
                   ,data: [78] 
                   ,barWidth: 10
                   ,itemStyle: {
                    normal: {
                        // 设置圆角
                        barBorderRadius: [0,10,10,0]
                    }
                   }
                //    设置背景
                   ,showBackground: true
                //    文本标签
                   ,label: {
                        show: true
                        // 文本标签内容
                        ,formatter: '|'
                        // 文本标签位置
                        ,position: 'right'
                        ,color: 'green'
                   }
                }
            ]
            ,grid: {
                top: 0
                ,bottom: 0
                ,left: 0
                ,right: 0
                ,containLabel: false
            }
        })
    }
}
</script>

<style>
.chart{
    width: 100%;
    height: 100%;
}
</style>