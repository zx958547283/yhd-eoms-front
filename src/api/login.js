import request from '@/utils/request'

export function login(username, password, force) {
  return request.post('/auth/loginEOMS', {
    username,
    password,
    force
  })
}

export function getInfo() {
  return request({
    url: '/admin/info',
    method: 'get'
  })
}

export function logout(token) {
  return request.post('/auth/loginOutEOMS', { token })
}
