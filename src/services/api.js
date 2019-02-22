import request from '../utils/request';

export function login(params) {
  return request('api/login', { method: 'POST', body: params, });
}
export function forgot(params) {
  return request('api/forgot', { method: 'POST', body: params, });
}
export function resetpass(params) {
  return request('api/resetpass', { method: 'POST', body: params, });
}
export function profileGet() {
  return request('api/profile', {method: 'GET'});
}
export function profilePut(params) {
  return request('api/profile', { method: 'PUT', body: params, });
}
export function productsList(val) {
  return request('api/list?page='+val.page+'&limit='+val.limit, {method: 'GET'});
}