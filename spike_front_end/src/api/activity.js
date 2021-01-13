import request_server from '@/utils/request_server'

export function getActivity() {
    return request_server({
      url: '/activity',
      method: 'get',
    })
  }

export function enter(aid) {
  return request_server({
    url: "/enter/" + aid,
    method: 'get'
  })
}

export function publish(data) {
  return request_server({
    url: "/publish",
    method: 'post',
    data
  })
}

export function del(aid) {
  return request_server({
    url: "/delete/" + aid,
    method: "delete",
  })
}
