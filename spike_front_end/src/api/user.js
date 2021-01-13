import request_server from '@/utils/request_server'
import request from '@/utils/request'

export function login(data) {
  //return request({
    //url: '/vue-element-admin/user/login',
  return request_server({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request_server({
    url: '/userInfo',
  //return request({
    //url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
