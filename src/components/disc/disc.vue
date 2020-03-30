<template>
  <transition name="side">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
import MusicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
import {getSongList} from '@/api/recommend'
import {ERR_OK} from '@/api/config'
import {createSong} from '@/common/js/song'
import {generateRecommendSongUrl} from '../../api/song'

export default {
  name: 'disc',
  components: {
    MusicList
  },
  created() {
    this._getSongList()
  },
  data() {
    return {
      songs: []
    }
  },
  computed: {
    title() {
      return this.disc.dissname
    },
    bgImage() {
      return this.disc.imgurl
    },
    ...mapGetters([
      'disc'
    ])
  },
  methods: {
    _getSongList() {
      if (!this.disc.dissid) {
        this.$router.push('/recommend')
        return
      }
      getSongList(this.disc.dissid).then(res => {
        if (res.data.code === ERR_OK) {
          this._normalizeSongs(res.data.cdlist[0].songlist)
        }
      })
    },
    _normalizeSongs(lists) {
      let ret = []
      let songmids = []
      let songtypes = []
      lists.forEach((item) => {
        let musicData = item
        if (musicData.songmid && musicData.albummid) {
          songmids.push(musicData.songmid)
          songtypes.push(0)
        }
      })
      generateRecommendSongUrl(songmids, songtypes).then(res => {
        if (res.data.expiration !== 0) {
          res.data.midurlinfo.forEach((item, index) => {
            let musicData = lists[index]
            musicData.url = item.purl
            if (musicData.url && musicData.albummid) {
              ret.push(createSong(musicData))
            }
          })
          this.songs = ret
        } else {
          this._normalizeSongs(lists)
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
