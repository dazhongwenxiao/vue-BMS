<template>
  <div class="chart" ref="chart"></div>
</template>

<script>
import echarts from 'echarts'
export default {
    name:"lineChart",
    mounted(){
        // 初始化echart实例
        let lineChart = echarts.init(this.$refs.chart)
        // 配置数据
        lineChart.setOption({
            xAxis:{
                // 隐藏x轴
                show: false,
                type: 'category'
            },
            yAxis:{
                show: false
            },
            // 系列
            series:[
                // 折线图
                {
                    type: 'line'
                    ,smooth: true
                    ,data: [80,40,70,30,20,50,80,20]
                    // 拐点样式的设置
                    ,itemStyle:{
                        opacity: 0
                    }
                    // 线条样式
                    ,lineStyle: {
                        color: 'orange'
                    }
                    // 填充颜色设置
                    ,areaStyle: {
                        color: {
                            type: 'linear'
                            ,x: 0
                            ,y: 0
                            ,x2: 0
                            ,y2: 1
                            ,colorStops: [
                                {
                                    offset: 0
                                    ,color: "orange"
                                }
                                ,{
                                    offset: 1
                                    ,color: '#fff'
                                }
                            ]
                        }
                    }
                }
            ],
            // 布局调试
            grid:{
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
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