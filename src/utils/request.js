import fetch from 'dva/fetch';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {

  const newOptions = {  ...options }; //...defaultOptions,
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    console.log(newOptions.body instanceof FormData)
    if (!(newOptions.body instanceof FormData)) {
      console.log('form');
      newOptions.headers = {
        Accept: 'application/json; ',
        'Content-Type': 'application/json; charset=utf-8',        
        Authorization: 'Bearer '+ window.localStorage.getItem('token'),
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // newOptions.body is FormData
      console.log('sdfasfasdf');
      newOptions.headers = {
        Accept: 'application/json',
        // 'Content-Type': 'multipart/form-data',
        // "Content-Type": "application/x-www-form-urlencoded",
        Authorization: 'Bearer '+ window.localStorage.getItem('token'),
        ...newOptions.headers,
      };
      newOptions.body = newOptions.body;
    }
  }
  else{
    newOptions.headers = {
      Accept: 'application/json',
      Authorization: 'Bearer '+ window.localStorage.getItem('token'),
      ...newOptions.headers,
    };
  }

  return fetch('http://xx.xxx.xxx.xx:3000/'+url, newOptions)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => {
      console.log('request.js', data);
      if (newOptions.method === 'DELETE' || data.status === 204) {
        return data.text();
      }
      return data;
    }
  )
    .catch(err => ({ err }));
}
