<template>
  <div>
    <el-card style="margin:0px 0px 20px">
      <CategorySelect @getCategoryID="getCategoryID" :show="!isShowTable"></CategorySelect>
    </el-card>
    
    <el-card>
      <div v-show="isShowTable">
        <el-button 
          @click="addAttr" 
          :disabled="!category3id" 
          style="margin-bottom:10px" 
          type="primary" 
          icon="el-icon-plus">
          添加属性
        </el-button>
        <el-table
          :data="attrInfoList"
          height="400"
          border
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center">
          </el-table-column>
          <el-table-column
            prop="attrName"
            label="属性名称"
            width="150">
          </el-table-column>
          <el-table-column
            prop="address"
            label="属性值列表">
            <template slot-scope="{row}">
              <el-tag 
                style="margin-right: 20px" 
                type="success" v-for="(attrValue,index) in row.attrValueList" 
                :key="index">
                {{attrValue.valueName}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作"
            width="150">
            <template slot-scope="{row}">
              <el-button 
                @click="updateAttr(row)" 
                type="warning" 
                icon="el-icon-edit" 
                size="mini">
                d
              </el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini">s</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加属性 | 修改属性的结构 -->
      <div v-show="!isShowTable">
        <el-form ref="form" label-width="60px" style="width:250px" :model="attrInfo">
          <el-form-item label="属性名">
          <el-input placeholder="请输入属性名" v-model="attrInfo.attrName"></el-input>
        </el-form-item>
        </el-form>
        <el-button 
          :disabled="!attrInfo.attrName" 
          type="primary" 
          icon="el-icon-plus" 
          @click="addAttrValue">
          添加属性值
        </el-button>
        <el-button @click="isShowTable=true">取消</el-button>
        <el-table
          border
          :data="attrInfo.attrValueList"
          style="width: 100%;margin:10px 0px">
          <el-table-column
            align="center"
            prop="prop"
            label="序号"
            type="index"
            width="80px">
          </el-table-column>
          <el-table-column
            prop="prop"
            label="属性值名称"
            width="width">
            <template slot-scope="{row,$index}">
              <el-input 
                :ref="$index"
                v-if="row.flag"
                @blur="toLook(row)"
                size="mini" 
                v-model="row.valueName" 
                placeholder="请输入属性值名称">
              </el-input>
              <span v-else @click="toShow(row,$index)">{{row.valueName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="prop"
            label="操作"
            width="width">
            <template slot-scope="{row,$index}">
              <!-- 气泡确认框 -->
              <el-popconfirm
                @onConfirm="deleteAttrValue($index)"
                :title="`你确定要删除${row.valueName}吗？`">
                <el-button 
                  slot="reference" 
                  size="mini" 
                  type="danger" 
                  icon="el-icon-delete">
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="addOrUpdateAttr" :disabled="attrInfo.attrValueList.length<1">保存</el-button>
        <el-button @click="isShowTable=true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
// 按需引入lodash当中的深拷贝
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'Attr',
  data(){
    return {
      category1id: '',
      category2id: '',
      category3id: '',
      attrInfoList: [],
      isShowTable: true,
      attrInfo: {
        attrName: "", // 属性名
        attrValueList: [ 
          // 属性值，因为属性值可能有多个因此用数据，每一个属性值都是一个对象
        ],
        categoryId: 0, // 三级分类的id
        categoryLevel: 0,
      }
    }
  },
  methods: {
    // 自定义事件的回调
    getCategoryID(categoryPar){
      if(categoryPar.level == 1){
        this.category1id = categoryPar.categoryid
        this.category2id = ''
        this.category3id = ''
      }else if(categoryPar.level == 2){
        this.category2id = categoryPar.categoryid
        this.category3id = ''
      }else{
        // 代表三级分类的id有了
        this.category3id = categoryPar.categoryid
        // 发请求获取数据
        this.getAttrList()
      }
    },
    // 获取平台属性数据
    async getAttrList(){
      const {category1id,category2id,category3id} = this;
      let result = await this.$API.attr.reqAttrInfoList(category1id,category2id,category3id)
      if(result.code == 200){
        this.attrInfoList = result.data
        // console.log(this.attrInfoList);
      }
    },
    addAttrValue(){
      // 向属性值的数组里面添加元素
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        valueName: "",
        flag: true
      })
      this.$nextTick(()=>{
        this.$refs[this.attrInfo.attrValueList.length-1].focus()
      })
    },
    toLook(row){ // row：形参是当前用户添加的最新的属性值
      if(row.valueName.trim() == ''){
        this.$message("请你输入一个正常的属性值")
        row.valueName = ''
        return
      }
      let isRepat = this.attrInfo.attrValueList.some(item=>{
        // 需要将row从数组里面判断并去除
        if(row!=item){
          return row.valueName.trim() == item.valueName.trim()
        }
      })
      if(isRepat) {
        this.$message("属性名已存在")
        row.valueName = ''
        return
      }
      // 失去焦点换成查看模式
      row.flag = false
    },
    toShow(row,index){
      row.flag = true
      // 获取input节点，实现自动聚焦
      // 对于浏览器而言页面的重绘是需要时间的，不可能一点击就获取数据
      this.$nextTick(()=>{
        console.log(this.$refs[index].focus());
      })
    },
    // 添加属性按钮的回调
    addAttr(){
      this.isShowTable = false
      // 清除数据
      this.attrInfo = {
        attrName: "", // 属性名
        attrValueList: [ 
          // 属性值，因为属性值可能有多个因此用数据，每一个属性值都是一个对象
        ],
        categoryId: this.category3id, // 三级分类的id
        categoryLevel: 0,
      }
    },
    // 修改属性按钮的回调
    updateAttr(row){
      // console.log(row);
      this.isShowTable = false
      // 将选中的属性赋值给attrInfp (用深拷贝)
      this.attrInfo = cloneDeep(row)
      this.attrInfo.attrValueList.forEach(item=>{
        // 如果数据是响应式的，为了添加的数据也是响应式，需要使用$set添加
        // 第一个参数：对象；第二个参数：添加新的响应式属性；第三个参数：新的属性的属性值
        this.$set(item,'flag',false)
      })
    },
    // 气泡确认框确定按钮的回调
    deleteAttrValue(index){
      // 当前删除属性值的操作不需要发请求的
      this.attrInfo.attrValueList.splice(index,1)
    },
    // 保存或更新属性
    async addOrUpdateAttr(){
      // 如果用户添加很多属性值，且属性值为空的不应该提交给服务器
      // 提交给服务器数据当中不应该出现flag字段
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item=>{
        // 过滤属性值不为空的
        if(item.valueName != ''){
          // 删除flag属性
          delete item.flag
          return true
        }
      })
      try {
        await this.$API.attr.reqAddAttr(this.attrInfo)
        this.$message({type: 'success',message: '添加成功'})
        this.isShowTable = true
        this.getAttrList()
      } catch (error) {
      }

    }
  }
}
</script>

<style>

</style>
