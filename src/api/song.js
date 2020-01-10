import axios from 'common/js/axios'
import {commonJsonParams, generateSongVkeyData} from './config'

export function getSongUrl (guid, songmid) {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  const songVkeyData = generateSongVkeyData(guid, songmid)
  const data = Object.assign({}, commonJsonParams, {
    platform: 'yqq.json',
    hostUin: 0,
    needNewCode: 0
  }, songVkeyData)
  return axios(url, data)
}
