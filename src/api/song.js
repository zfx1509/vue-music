import {axiosGet, axiosPost} from 'common/js/axios'
import {ERR_OK} from '@/api/config'
import {commonJsonParams, generateSongVkeyData, generateRecommendSongVkeyData} from './config'

export function generateSongUrl (songmid, songtype) {
  return new Promise((resolve, reject) => {
    getSongUrl(songmid, songtype).then(res => {
      if (res.data.code === ERR_OK) {
        resolve({data: res.data.req_0.data.midurlinfo})
      }
    }).catch(err => {
      resolve({data: err})
    })
  })
}

export function getlyric (songmid) {
  const url = '/music/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
  const data = Object.assign({}, commonJsonParams, {
    songmid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: Date.parse(new Date())
  })
  return axiosGet(url, data).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function generateRecommendSongUrl(songmid, songtype) {
  return new Promise((resolve, reject) => {
    getRecommendSongUrl(songmid, songtype).then(res => {
      if (res.data.code === ERR_OK) {
        resolve({data: res.data.req_0.data})
      }
    }).catch(err => {
      resolve({data: err})
    })
  })
}

function getSongUrl (songmid, songtype) {
  const guid = getGuid()
  const url = '/cgi-bin/musicu.fcg'
  const songVkeyData = generateSongVkeyData(guid, songmid, songtype)
  const data = Object.assign({}, commonJsonParams, {
    platform: 'yqq.json',
    hostUin: 0,
    needNewCode: 0
  }, songVkeyData)
  return axiosGet(url, data)
}

function getRecommendSongUrl(songmid, songtype) {
  const guid = `${getGuid()}`
  const url = '/cgi-bin/musicu.fcg'
  const recommendSongVkeyData = generateRecommendSongVkeyData(guid, songmid, songtype)
  return axiosPost(url, recommendSongVkeyData)
}

function getGuid () {
  let t = (new Date()).getUTCMilliseconds()
  return Math.round(2147483647 * Math.random()) * t % 1e10
}
