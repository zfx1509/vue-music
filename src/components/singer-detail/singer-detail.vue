<template>
  <transition name="slide">
    <MusicList :songs="songs" :title="title" :bg-image="bgImage"></MusicList>
  </transition>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
import {getSingerDetail} from '@/api/singer'
import {generateSongUrl} from '@/api/song'
import {ERR_OK} from '@/api/config'
import {createSong} from 'common/js/song'
import MusicList from '@/components/music-list/music-list'

export default {
  name: 'singer-detail',
  components: {MusicList},
  data () {
    return {
      songs: []
    }
  },
  activated() {
    this._getDetail()
  },
  created() {
    this._getDetail()
  },
  computed: {
    title () {
      return this.singer.name
    },
    bgImage () {
      return this.singer.avatar
    },
    ...mapGetters([
      'singer'
    ])
  },
  methods: {
    _getDetail() {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      this.songs = []
      getSingerDetail(this.singer.id).then(res => {
        if (res.code === ERR_OK) {
          this._normalizeSongs(res.data.list)
        }
      })
    },
    _normalizeSongs (list) {
      let ret = []
      let songmids = []
      let songtypes = []
      list.forEach((item) => {
        let {musicData} = item
        if (musicData.songmid && musicData.albummid) {
          songmids.push(`"${musicData.songmid}"`)
          songtypes.push(0)
        }
      })
      generateSongUrl(songmids.join(','), songtypes.join(',')).then(res => {
        res.data.forEach((item, index) => {
          let {musicData} = list[index]
          musicData.url = item.purl
          if (musicData.url && musicData.albummid) {
            ret.push(createSong(musicData))
          }
        })
        this.songs = ret
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slide-enter-active, .slide-leave-active
    transition all 0.3s

  .slide-enter, .slide-leave-to
    transform translate3d(100%, 0, 0)
</style>
