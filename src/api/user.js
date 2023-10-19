import request from '@/utils/request'

// 对外暴露登录接口函数 POST /admin/acl/index/login
export function login(data) {
  return request({
    url: '/admin/acl/index/login',
    method: 'post',
    data
  })
}

// 对外暴露获取用户信息函数 GET /admin/acl/index/info
export function getInfo(token) {
  return request({
    url: '/admin/acl/index/info',
    method: 'get',
    params: { token }
  })
}

// 对外暴露登录函数
export function logout() {
  return request({
    url: '/admin/acl/index/logout',
    method: 'post'
  })
}
