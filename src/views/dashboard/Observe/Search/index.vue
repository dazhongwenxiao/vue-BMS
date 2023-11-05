<template>
  <el-card>
    <!-- 头部标题 -->
    <div slot="header" class="head">
        <span>线上热门搜索</span>  
        <el-dropdown>
            <span class="el-dropdown-link">
                <!-- 下拉菜单<i class="el-icon-arrow-down el-icon--right"></i> -->
                <i class="el-icon-more"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
    <!-- 详细数据 -->
    <div>
        <el-row :gutter="10">
            <el-col :span="12">
                <lineCharts title="搜索用户数">
                    <template slot="main">
                        <span class="count" >12321</span>
                        <span>17.1<svg-icon class="icon" icon-class="up" /></span>
                    </template>
                </lineCharts></el-col>
            <el-col :span="12">
                <lineCharts title="人均搜索次数">
                    <template slot="main">
                        <span class="count" >2.7</span>
                        <span>26.2<svg-icon class="icon" icon-class="down" /></span>
                    </template>
                </lineCharts>
            </el-col>
        </el-row>
        <!-- 表格 -->
        <el-table
            style="width: 100%;margin-top:10px;"
            border
            :data="tableData"
            >
            <el-table-column
                label="排名"
                align="center"
                type="index"
                width="80">
            </el-table-column>
            <el-table-column
                label="搜索关键字">
            </el-table-column>
            <el-table-column
                label="用户数"
                sortable>
            </el-table-column>
            <el-table-column
                label="周涨幅"
                sortable>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
            class="pagination"
            layout="prev, pager, next"
            :total="1000">
        </el-pagination>
    </div>

  </el-card>
</template>

<script>
import lineCharts from './lineCharts'
export default {
    name: 'Search'
    ,data(){
        return {
            tableData: [{}]
        }
    }
    ,components: {
        lineCharts
    }
}
</script>

<style scoped>
.head{
    display: flex;
    justify-content: space-between;
}
.count{
    margin-right: 20px;
    font-size: 24px;
}
.icon{
    margin-left: 5px;
    font-size: 8px;
}
.pagination{
    float: right;
    margin: 8px auto;
}
</style>