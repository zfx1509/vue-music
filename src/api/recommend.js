import {axiosGet} from 'common/js/axios'
import {commonJsonParams, recommendData} from './config'

export function getRecommend () {
  const url = '/music/api/getTopBanner'
  const data = Object.assign({}, commonJsonParams, {
    platform: 'yqq.json',
    hostUin: 0,
    needNewCode: 0
  }, recommendData)
  return axiosGet(url, data)
}

export function getDiskList () {
  const url = '/music/api/getDiscList'
  const data = Object.assign({}, commonJsonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: 0.8460504040667609
  })
  return axiosGet(url, data)
}

export function getSongList(disstid) {
  const url = '/music/api/getCdInfo'
  const data = Object.assign({}, commonJsonParams, {
    format: 'jsonp',
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0
  })
  return axiosGet(url, data)
}
