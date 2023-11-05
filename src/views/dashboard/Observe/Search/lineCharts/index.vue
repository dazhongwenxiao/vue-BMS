<template>
  <div>
    <div class="header">
        <span style="margin-right:10px">{{title}}</span>
        <svg-icon icon-class="prompt" />
    </div>
    <div class="main">
        <slot name="main"></slot>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
    name: 'lineCharts'
    ,props: ['title']
    ,mounted(){
        // 初始化echart实例
        let lineChart = echarts.init(this.$refs.charts)
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
                        color: 'skyblue'
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
                                    ,color: "skyblue"
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
                left: -15,
                top: 0,
                right: 0,
                bottom: 0
            }

        })
    }
}
</script>

<style scoped>
.main,.charts{
    margin-top: 15px;
}
.charts{
    width: 100%;
    height: 50px;
}
</style>