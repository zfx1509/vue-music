import axios from 'common/js/axios'
import {ERR_OK} from '@/api/config'
import {commonJsonParams, generateSongVkeyData} from './config'

export function generateSongUrl (guid, songmid, songtype) {
  return new Promise((resolve, reject) => {
    getSongUrl(guid, songmid, songtype).then(res => {
      if (res.data.code === ERR_OK) {
        resolve({data: res.data.req_0.data.midurlinfo})
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
  return axios(url, data)
}

function getGuid () {
  let t = (new Date()).getUTCMilliseconds()
  return Math.round(2147483647 * Math.random()) * t % 1e10
}
