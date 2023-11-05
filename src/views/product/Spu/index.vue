<template>
  <div>
    <el-card style="margin-bottom:15px">
      <CategorySelect @getCategoryID="getCategoryID"></CategorySelect>
    </el-card>
    <el-card>
      <!-- 展示SPU列表 -->
      <div v-show="scene == 0">
        <el-button 
          icon="el-icon-plus"
          :disabled="!category3Id"
          style="margin-bottom:10px" 
          type="primary">
          添加SPU
        </el-button>
        <el-table
          border
          :data="records"
          style="width: 100%">

          <el-table-column
            align="center"
            type="index"
            label="序号"
            width="80">
          </el-table-column>

          <el-table-column
            prop="spuName"
            label="spu名称"
            width="width">
          </el-table-column>

          <el-table-column
            prop="description"
            label="spu描述"
            width="width">
          </el-table-column>

          <el-table-column
            prop="prop"
            label="操作"
            width="width">
            <template slot-scope="{row}">
              <hint-button title="添加spu" size="mini" type="success" icon="el-icon-plus"></hint-button>
              <hint-button title="修改spu" size="mini" type="warning" icon="el-icon-edit"></hint-button>
              <hint-button title="查看当前spu全部sku列表" size="mini" type="info" icon="el-icon-info"></hint-button>
              <hint-button title="删除spu" size="mini" type="danger" icon="el-icon-delete"></hint-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页器 -->
        <el-pagination
          style="margin-top:20px; text-align:center"
          :current-page="page"
          :page-size="limit"
          :page-sizes="[3,5,10]"
          layout="prev, pager, next, jumper, ->, sizes, total"
          :total="total"
          @size-change="handlerSizeChange"
          @current-change="handlerCurrentChange">
        </el-pagination>
      </div>
      <!-- 添加SPU | 修改SPU -->
      <SpuForm v-show="scene == 1"></SpuForm>
      <!-- 添加SKU -->
      <SkuForm v-show="scene == 2"></SkuForm>
    </el-card>
  </div>
</template>

<script>
  import SpuForm from './SpuForm'
  import SkuForm from './SkuForm'
export default {
  components: {
    SkuForm,
    SkuForm
  },
  name: 'Spu',
  data(){
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      show: true,
      page: 1,
      limit: 3,
      total: 99,
      records: [],
      scene: 0 //0代表现实spu列表  1代表添加或修改spu  2代表添加sku
    }
  },
  methods: {
    // 三级联动自定义事件
    getCategoryID({categoryid,level}){
      if(level == 1){
        this.category1Id = categoryid
        this.category2Id = ''
        this.category3Id = ''
      }else if(level == 2){
        this.category2Id = categoryid
        this.category3Id = ''
      }else{
        // 代表三级分类的id有了
        this.category3Id = categoryid
        // 发请求获取数据
        this.getSpuList()
      }
    },
    // 获取SPU列表数据的方法
    async getSpuList(){
      const {page, limit, category3Id} = this;
      let result = await this.$API.spu.reqSpuList(page, limit, category3Id)
      if(result.code == 200){
        this.total = result.data.total
        this.records = result.data.records
      }
    },
    // 分页器按钮回调
    handlerCurrentChange(page){
      this.page = page
      this.getSpuList()
    },
    handlerSizeChange(limit){
      this.limit = limit
      this.getSpuList()
    }
  }
}
</script>

<style>

</style>
