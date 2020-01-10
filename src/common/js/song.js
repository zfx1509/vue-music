import {getSongUrl} from '@/api/song'
import {ERR_OK} from '@/api/config'

export default class Song {
  constructor ({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
}

export function createSong (musicData) {
  let guid = getGuid()
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: generateSongUrl(guid, musicData.songmid)
  })
}

function filterSinger (singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}

function getGuid () {
  let t = (new Date()).getUTCMilliseconds()
  return Math.round(2147483647 * Math.random()) * t % 1e10
}

function generateSongUrl (guid, songmid) {
  getSongUrl(guid, songmid).then(res => {
    if (res.data.code === ERR_OK) {
      return res.data.req_0.midurlinfo[0].purl
    }
  }).catch(err => {
    console.log(err)
  })
}
