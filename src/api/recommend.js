import {axiosGet} from 'common/js/axios'
import {commonJsonParams, recommendData} from './config'

export function getRecommend() {
  const url = '/cgi-bin/musics.fcg'
  const data = Object.assign({}, commonJsonParams, {
    sign: 'zzaokqat38cn6gheff15c4441255ee9ef959d8dacccc3f88',
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq.json',
    needNewCode: 0
  }, recommendData)
  return axiosGet(url, data)
}

export function getDiskList() {
  const url = '/music/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  const data = Object.assign({}, commonJsonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random()
  })
  return axiosGet(url, data)
}

export function getSongList(disstid) {
  const url = '/music/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  const data = Object.assign({}, commonJsonParams, {
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
