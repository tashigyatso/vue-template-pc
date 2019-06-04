import request from '../utils/request';

export function isLogin(port) {
  return request({
    url: '/api/sso/isLogin',
    method: 'get',
    params: { portal: port },
  });
}

export function logout() {
  return request({
    url: '/api/sso/logout',
    method: 'get',
  });
}
