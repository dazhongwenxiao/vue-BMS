<template>
  <div>
    <el-row :gutter="10">
        <el-col :span="6">
            <el-card>
                <Details title="总销售额" number="￥ 126560">
                    <template slot="charts">
                        <span class="charts">周同比</span>
                        <span class="charts">56.67%<svg-icon class="icon" icon-class="up" /></span>
                        <span class="charts">日同比</span>
                        <span class="charts">19.16%<svg-icon class="icon" icon-class="down" /></span>
                    </template>
                    <template slot="footer">
                        <span>日销售额￥ 12423</span>
                    </template>
                </Details>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card>
                <Details title="访问量" number="88460">
                    <template slot="charts">
                        <lineChart></lineChart>
                    </template>
                    <template slot="footer">
                            <span>日访问量 1234</span>
                    </template>
                </Details>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card>
                <Details title="支付笔数" number="88460">
                    <template slot="charts">
                        <barChart></barChart>
                    </template>
                    <template slot="footer">
                            <span>转化率 65%</span>
                    </template>
                </Details>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card>
                <Details title="运营活动效果" number="78%">
                    <template slot="charts">
                        <progressChart></progressChart>
                    </template>
                    <template slot="footer">
                            <span class="charts">周同比</span>
                            <span class="charts">12%<svg-icon class="icon" icon-class="up" /></span>
                            <span class="charts">日同比</span>
                            <span class="charts">11%<svg-icon class="icon" icon-class="down" /></span>
                    </template>
                </Details>
            </el-card>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import Details from './Details'
import lineChart from './lineChart'
import barChart from './barChart'
import progressChart from './progressChart'
export default {
    name: "Card",
    components: {
        Details,
        lineChart,
        barChart,
        progressChart
    }
}
</script>

<style scope>
    .charts{
        margin-right: 15px;
        font-size: 14px;
    }
    .icon{
        margin-left: 5px;
        font-size: 8px;
    }
</style>