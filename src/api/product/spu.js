import request from '@/utils/request'

// 获取SPU列表数据的接口 GET /admin/product/{page}/{limit}
export const reqSpuList = (page,limit,category3Id)=>request({
    url: `/admin/product/${page}/${limit}`,
    method: 'get',
    params: {category3Id}
})