// 这个模块主要获取的是品牌管理的数据的模块
// GET /admin/product/baseTrademark/{page}/{limit}
import request from '@/utils/request'
// 获取品牌列表接口
export const reqTradeMarkList = (page,limit)=>request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: 'get'
})

// 处理添加品牌操作 POST /admin/product/baseTrademark/save  携带两个参数：品牌名称、品牌LOGO

// 修改品牌 PUT /admin/product/baseTrademark/update  携带三个参数：id、品牌名称、品牌LOGO
export const reqAddOrUpdateTradeMark = (tradeMark)=>{
    if(tradeMark.id){
        return request({
            url: '/admin/product/baseTrademark/update',
            method: 'put',
            data: tradeMark
        })
    }else{
        return request({
            url: '/admin/product/baseTrademark/save',
            method: 'post',
            data: tradeMark
        })
    }
}

// 删除品牌 /admin/product/baseTrademark/remove/{id}
export const reqDeleteTradeMark = (id)=>request({
    url:  `/admin/product/baseTrademark/remove/${id}`,
    method: 'delete'
})