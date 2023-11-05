<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" :model="cdForm">
        <el-form-item label="一级分类">
            <el-select :disabled="show" placeholder="请选择" v-model="cdForm.category1id" @change="handler1">
            <el-option :label="c1.name" :value="c1.id" v-for="c1 in list1" :key="c1.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
            <el-select :disabled="show" placeholder="请选择" v-model="cdForm.category2id" @change="handler2">
            <el-option :label="c2.name" :value="c2.id" v-for="c2 in list2" :key="c2.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
            <el-select :disabled="show" placeholder="请选择" v-model="cdForm.category3id" @change="handler3">
            <el-option :label="c3.name" :value="c3.id" v-for="c3 in list3" :key="c3.id"></el-option>
            </el-select>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
    name: 'CategorySelect',
    props: ['show'],
    data(){
        return {
            // 一级分类数据
            list1: [],
            // 二级分类数据
            list2: [],
            // 三级分类数据
            list3: [],
            // 收集相应的一级二级三级分类的id
            cdForm: {
                category1id : '',
                category2id : '',
                category3id : ''
            }
        }
    },
    // 组件挂载完毕，向服务器发请求，获取相应的一级分类的数据
    mounted(){
        // 获取一级分类数据的方法
        this.getCategory1List();
    },methods: {
        async getCategory1List(){
            let result = await this.$API.attr.reqCategory1List()
            if(result.code == 200){
                this.list1 = result.data
            }
        },
        // 一级分类的事件回调（当一级分类的option发生变化的时候获取相应的二级分类的数据）
        async handler1(){
            // 清除数据
            this.list2 = []
            this.list3 = []
            this.cdForm.category2id = ''
            this.cdForm.category3id = ''
            const {category1id} = this.cdForm;
            this.$emit('getCategoryID',{categoryid:category1id,level:1 })
            let result = await this.$API.attr.reqCategory2List(category1id)
            if(result.code == 200){
                this.list2 = result.data
            }
        },
        // 二级分类的事件回调（当一级分类的option发生变化的时候获取相应的二级分类的数据）
        async handler2(){
            this.list3 = []
            this.cdForm.category3id = ''
            const {category2id} = this.cdForm;
            this.$emit('getCategoryID',{categoryid:category2id, level:2})
            let result = await this.$API.attr.reqCategory3List(category2id)
            if(result.code == 200){
                this.list3 = result.data
            }
        },
        // 三级分类的事件回调
        handler3(){
            const {category3id} = this.cdForm
            this.$emit('getCategoryID',{categoryid:category3id, level:3})
        }
    }
}
</script>

<style>
</style>