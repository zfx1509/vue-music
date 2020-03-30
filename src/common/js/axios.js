import originAxios from 'axios'

export function axiosGet(url, data) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)

  return new Promise((resolve, reject) => {
    originAxios.get(url, data).then(res => resolve(res)).catch(err => reject(err))
  })
}

export function axiosPost(url, data) {
  return new Promise((resolve, reject) => {
    originAxios.post(url, data).then(res => resolve(res)).catch(err => reject(err))
  })
}

function param(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}
