<template>
  <el-card class="box-card" style="margin-top:10px">
    <div slot="header" class="clearfix">
        <!-- 头部左侧内容 -->
        <el-tabs class="tab" v-model="activeName">
            <el-tab-pane label="销售额" name="sale"></el-tab-pane>
            <el-tab-pane label="访问量" name="visit"></el-tab-pane>
        </el-tabs>
        <!-- 头部右侧内容 -->
        <div class="right">
            <span>今日</span>
            <span>本周</span>
            <span>本月</span>
            <span>本年</span>
            <el-date-picker
                class="date"
                type="datetimerange"
                size="mini"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['12:00:00']">
            </el-date-picker>
        </div>
    </div>
    <div>
        <el-row :gutter="10">
            <el-col :span="18">
                <div class="charts" ref="charts"></div>
            </el-col>
            <el-col :span="6" class="sale">
                <h4>门店{{title}}排名</h4>
                <ul>
                    <li>
                        <span class="findex">1</span>
                        <span>肯德基</span>
                        <span>323,234</span>
                    </li>
                    <li>
                        <span class="findex">2</span>
                        <span>肯德基</span>
                        <span>323,234</span>
                    </li>
                    <li>
                        <span class="findex">3</span>
                        <span>肯德基</span>
                        <span>323,234</span>
                    </li>
                    <li>
                        <span class="lindex">4</span>
                        <span>肯德基</span>
                        <span>323,234</span>
                    </li>
                    <li>
                        <span class="lindex">5</span>
                        <span>肯德基</span>
                        <span>323,234</span>
                    </li>
                    <li>
                        <span class="lindex">6</span>
                        <span>肯德基</span>
                        <span>323,234</span>
                    </li>
                    <li>
                        <span class="lindex">7</span>
                        <span>肯德基</span>
                        <span>323,234</span>
                    </li>
                </ul>
            </el-col>
        </el-row>
    </div>
  </el-card>
</template>

<script>
import echarts from 'echarts'
export default {
    name: 'Sale',
    data(){
        return {
            activeName: 'sale'
            ,mycharts: null
            ,data1: [200,100,200,200,300,600,200,100,600,800,200,200]
            ,data2: [200,100,100,600,800,200,200,200,200,300,600,200]
        }
    }
    ,mounted(){
        // 初始化
        this.mycharts = echarts.init(this.$refs.charts)
        // 销售额柱状图
        this.mycharts.setOption({
            title: {
                text: this.title + "趋势图"
                ,textStyle: {
                    fontSize: 14
                }
            }
            ,tooltip: {
                trigger: "axis"
                ,axisPointer: {
                    type: "shadow"
                }
            }
            ,grid: {
                left: "3%"
                ,right: "4%"
                ,bottom: "3%"
                ,containLabel: true
            }
            ,xAxis:{
                type: 'category'
                ,data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月',]
                ,axisTick: {
                    alignWithLabel: true

                }
            }
            ,yAxis:{
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
            }
            ,series:[
                {
                    type: 'bar'
                    ,data: this.date
                    ,barWidth: "50%"
                    ,color: '#00008b'

                }
            ]
            

        })
    }
    ,computed: {
        title(){
            return this.activeName == 'sale'? "销售额":"访问量"
        }
        ,date(){
            return this.activeName == 'sale'? this.data1:this.data2
        }
    }
    // 监听属性
    ,watch: {
        title(){
            // 当头部变化时重新修改图表配置数据
            // 图表配置消息可以再次修改
            this.mycharts.setOption({
                title: {
                    text: this.title + "趋势图"
                }
                ,series: [
                    {
                       data: this.date
                    }
                ]
            })
        }
    }
}
</script>

<style scoped>
    .clearfix{
        position: relative;
        display: flex;
        justify-content: space-between;
    }
    .tab{
        width: 100%;
        
    }
    .right{
        position: absolute;
        right: 0px;
    }
    .date{
        width: 220px;
    }
    .right span{
        margin-right: 15px;
    }
    .charts{
        width: 100%;
        height: 300px;
    }
    .sale{
        margin-top: -30px;
        right: 0px;
    }
    ul{
        height: 260px;
        list-style: none;
        padding: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    ul li{
        display: flex;
        justify-content: space-between;
    }

    ul li span:nth-child(2){
        flex-basis: 55%;
    }

    .findex{
        width: 20px;
        height: 20px;
        line-height: 20px;
        border-radius: 50%;
        background-color: black;
        color: white;
        text-align: center;
    }
    .lindex{
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
    }

</style>