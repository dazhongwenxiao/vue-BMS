<template>
  <el-card>
    <div slot="header" class="head">
        <span>线上热门搜索</span> 
        <el-radio-group v-model="radio" size="small">
            <el-radio-button label="全部渠道"></el-radio-button>
            <el-radio-button label="线上"></el-radio-button>
            <el-radio-button label="门店"></el-radio-button>
        </el-radio-group>
    </div>
    <div class="charts" ref="charts"></div>
  </el-card>
</template>

<script>
import echarts from 'echarts'
export default {
    name: 'Category'
    ,data(){
        return {
            radio: "全部渠道"
        }
    }
    ,mounted(){
        let mychart = echarts.init(this.$refs.charts)
        mychart.setOption({
            title: {
                text: "搜索引擎"
                ,subtext: "1048"
                ,left: "center"
                ,top: 'center'
                ,textStyle: {
                    fontSize: 16
                }
            },
            series: [
                {
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: true,
                        position: 'outside'
                    },
                    labelLine: {
                        show: true
                    },
                    data: [
                        { value: 300, name: '视频广告' },
                        { value: 1048, name: '搜索引擎' },
                        { value: 735, name: '直接访问' },
                        { value: 580, name: '邮件营销' },
                        { value: 484, name: '联盟广告' }
                    ]
                }
            ]
        })
        mychart.on('mousemove', (params)=>{
            const {name,value} = params.data
            mychart.setOption({
                title: {
                    text: name
                    ,subtext: value
                }
            })
        })
    }
}
</script>

<style scoped>
.head{
    align-items: center;
    display: flex;
    justify-content: space-between;
}
.charts{
    width: 100%;
    height: 280px;
}
</style>