<template>
  <div class="suggest">
    <ul class="suggest-list">
      <li @click="selectItem(item)" class="suggest-item" v-for="(item, index) in result" :key="`suggest-${index}`">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import {search} from '@/api/search'
import {ERR_OK} from '@/api/config'
import {createSong} from '@/common/js/song'
import {generateRecommendSongUrl} from '@/api/song'
import Singer from '@/common/js/singer'
import {mapMutations} from 'vuex'

const TYPE_SINGER = 'singer'

export default {
  name: 'suggest',
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      page: 1,
      result: []
    }
  },
  methods: {
    async search() {
      let res = await search(this.query, this.page, this.showSinger)
      if (res.data.code === ERR_OK) {
        let data = res.data.data
        let ret = []
        if (data.zhida && data.zhida.singerid) {
          ret.push({...data.zhida, ...{type: TYPE_SINGER}})
        }
        let song = null
        try {
          song = JSON.parse(JSON.stringify(data.song))
        } catch (e) {
          song = null
        }
        if (song && song.list.length > 0) {
          let ret2 = []
          let songmids = []
          let songtypes = []
          song.list.forEach((musicData) => {
            if (musicData.songmid && musicData.albummid) {
              songmids.push(musicData.songmid)
              songtypes.push(0)
            }
          })
          let res = await generateRecommendSongUrl(songmids, songtypes)
          if (res.data.expiration !== 0) {
            res.data.midurlinfo.forEach((item, index) => {
              let musicData = song.list[index]
              musicData.url = item.purl
              if (musicData.url && musicData.albummid) {
                ret2.push(createSong(musicData))
              }
            })
            ret = ret.concat(ret2)
            this.result = ret
          } else {
            this.search(data.song.list)
          }
        }
      }
    },
    getIconCls(item) {
      if (item.type === TYPE_SINGER) {
        return 'icon-mine'
      } else {
        return 'icon-music'
      }
    },
    getDisplayName(item) {
      if (item.type === TYPE_SINGER) {
        return item.singername
      } else {
        return `${item.name}-${item.singer}`
      }
    },
    selectItem(item) {
      if (item.type === TYPE_SINGER) {
        const singer = new Singer({
          id: item.singermid,
          name: item.singername
        })
        this.$router.push({
          path: `/search/${singer.id}`
        })
        this.setSinger(singer)
      }
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  watch: {
    query(val) {
      if (val) {
        this.search()
      } else {
        this.result = []
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden

    .suggest-list
      padding: 0 30px

      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px

      .icon
        flex: 0 0 30px
        width: 30px

        [class^="icon-"]
          font-size: 14px
          color: $color-text-d

      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden

        .text
          no-wrap()

    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
