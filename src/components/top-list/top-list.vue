<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs" :rank="rank"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
import MusicList from '@/components/music-list/music-list'
import {mapGetters} from 'vuex'
import {getMusicList} from '@/api/rank'
import {ERR_OK} from '@/api/config'
import {createSong} from '@/common/js/song'
import {generateRecommendSongUrl} from '@/api/song'

export default {
  name: 'top-list',
  components: {MusicList},
  created() {
    this._getMusicList()
  },
  data() {
    return {
      songs: [],
      rank: true
    }
  },
  computed: {
    title() {
      return this.topList.topTitle
    },
    bgImage() {
      if (this.songs.length) {
        return this.songs[0].image
      }
      return ''
    },
    ...mapGetters([
      'topList'
    ])
  },
  methods: {
    _getMusicList() {
      if (!this.topList.id) {
        this.$router.push('/rank')
        return
      }
      getMusicList(this.topList.id).then(res => {
        if (res.code === ERR_OK) {
          this._normalizeSongs(res.songlist)
        }
      })
    },
    _normalizeSongs(lists) {
      let ret = []
      let songmids = []
      let songtypes = []
      lists.forEach((item) => {
        let musicData = item.data
        if (musicData.songmid && musicData.albummid) {
          songmids.push(musicData.songmid)
          songtypes.push(0)
        }
      })
      generateRecommendSongUrl(songmids, songtypes).then(res => {
        if (res.data.expiration !== 0) {
          res.data.midurlinfo.forEach((item, index) => {
            let musicData = lists[index].data
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
    transition: all 0.3s ease

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
