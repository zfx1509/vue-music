import jsonp from '@/common/js/jsonp'
import {commonJsonpParams, options} from './config'

export function getHotKey() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
  const data = Object.assign({}, commonJsonpParams, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })
  return jsonp(url, data, options)
}

export function search(w, p, catZhida) {
  const url = '/music/soso/fcgi-bin/search_for_qq_cp'
  const data = Object.assign({}, commonJsonpParams, {
    w,
    p,
    perpage: 20,
    n: 20,
    catZhida: catZhida ? 1 : 0,
    zhidaqu: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    remoteplace: 'txt.mqq.all',
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })
  return jsonp(url, data, options)
}
