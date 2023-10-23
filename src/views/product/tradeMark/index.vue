<template>
  <div>
    <!-- 按钮 -->
    <el-button @click="showDialog" type="primary" icon="el-icon-plus" style="margin-bottom: 15px">添加</el-button>
    <!-- 
      表格组件
      data: 表格组件将来需要展示的数据————数组类型
      border: 是给表格添加边框
      column属性：
        label：显示标题
        width：对应列的宽度
        align：对齐方式
        prop: 对应列内容的字段名

      注意1：elementUI当中的table组件，数据是以一列进行展示的
     -->
     <el-table style="width: 100%" border :data="list">

      <el-table-column
        type="index"
        align="center"
        prop="prop"
        label="序号"
        width="80px">
      </el-table-column>
      <el-table-column
        prop="tmName"
        label="品牌名称"
        width="width">
      </el-table-column>
      <el-table-column
        prop="prop"
        label="品牌LOGO"
        width="width">
        <template slot-scope="{row}">
          <img :src="row.logoUrl" style="width:60px">
        </template>
      </el-table-column>
      <el-table-column
        prop="prop"
        label="操作"
        width="width">
        <template slot-scope="{row, $index}">
          <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateDialog">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
        </template>
      </el-table-column>

     </el-table>

     <!-- 
      分页器
        当前第几页、数据总条数、每页展示条数、连续页码数
        layout: 可以实现分页器布局
     -->
     <el-pagination
      style="margin-top:20px; text-align:center"
      :current-page="1"
      :page-size="limit"
      :page-sizes="[3,5,10]"
      background
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="getPageList">
    </el-pagination>
    <!-- 
      对话框dialog
      :visible.sync: 控制对话框显示与隐藏用的
     -->
    <el-dialog title="添加品牌" :visible.sync="dialogFormVisible">
      <!-- 
        form表单 :model属性，这个属性的作用是，把表单的数据收集到那个对象的身上，
                 将来表单验证，也需要这个属性
       -->
      <el-form :model="form" style="width:80%">
        <el-form-item label="品牌名称" label-width="100px">
          <el-input autocomplete="off" v-model="form.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px">
          <!-- 
            action:设置图片上传的地址-POST /admin/product/fileUpload
            :on-success: 可以检测到图片上传成功，当图片上传成功，会执行一次
            :before-upload: 可以在上传图片之前，会执行一次
           -->
          <el-upload
            class="avatar-uploader"
            action="http://gmall-h5-api.atguigu.cn/admin/product/fileUpload" 
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="form.logoUrl" :src="form.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'tradeMark',
  data(){
    return {
      form: {
        tmName: ''
        ,logoUrl: ''
      },
      // 代表分页器第几页
      page: 1,
      limit: 3,
      total: 0,
      list: [],
      dialogFormVisible: false
    }
  },
  mounted(){
    // 获取列表数据函数
    this.getPageList()
  },
  methods: {
    async getPageList(pager = 1){
      this.page = pager;
      const {page, limit} = this;
      // 获取品牌列表接口
      let result = await this.$API.trademark.reqTradeMarkList(page, limit)
      if(result.code == 200){
        this.total = result.data.total
        this.list = result.data.records
      }
    },
    handleSizeChange(limit){
      this.limit = limit
      this.getPageList()
    },
    // 点击添加品牌
    showDialog(){
      this.dialogFormVisible = true
      // 清除数据
      this.form = {
        tmName: ''
        ,logoUrl: ''
      }
    },
    updateDialog(){
      this.dialogFormVisible = true
    },
    handleAvatarSuccess(res, file) {
      // res：上传成功之后返回前端数据；file：上传成功之后服务器返回前端数据
      this.form.logoUrl = res.data
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      // 添加按钮（添加或更新品牌）
      async addOrUpdateTradeMark(){
        this.dialogFormVisible = false
        // 发请求
        let result = await this.$API.trademark.reqAddOrUpdateTradeMark(this.form)
        if(result.code == 200){
          this.$message(this.form.id? '修改品牌成功':'添加品牌成功')
          this.getPageList()
        }
      }
    }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
