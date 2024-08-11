// pages/recommended-songs/recommended-songs.ts
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { musicChartsStore } from '../../stores/music-charts'
import { recommendedSongsStore } from '../../stores/recommended-songs'
import playlist from '../../services/requsets/playlist'

Page({
  data: {
    type: '' // 推荐歌曲或巅峰榜：ranking
  },
  onLoad(this: any, options: any) {
    const { type, toplistType, id } = options
    this.data.type = type
    let field = ''
    if (type === 'ranking') {
      switch (toplistType) {
        case 'N': // 新歌榜
          field = 'newSongList'
          break
        case 'O': // 原创榜
          field = 'originalSongList'
          break
        default: // 飙升榜
          field = 'soaringSongList'
          break
      }
      // 绑定 巅峰榜 store
      this.musicChartsStoreBindings = createStoreBindings(this, {
        store: musicChartsStore,
        fields: {
          songsData: [field]
        },
        actions: []
      })
    } else if (type === 'recommended') {
      // 绑定 推荐歌曲 store
      this.recommendedSongsStoreBindings = createStoreBindings(this, {
        store: recommendedSongsStore,
        fields: {
          songsData: 'playlist'
        },
        actions: []
      })
    } else if (type === 'pop') {
      this.getPopSongs(id)
    }
  },
  onReady(this: any) {
    wx.setNavigationBarTitle({
      title: this.data.songsData.name
    })
  },
  onUnload(this: any) {
    if (this.data.type === 'ranking') {
      // 解绑 巅峰榜 store
      this.musicChartsStoreBindings.destroyStoreBindings()
    } else if (this.data.type === 'recommended') {
      // 解绑 推荐歌曲 store
      this.recommendedSongsStoreBindings.destroyStoreBindings()
    }
  },
  // 获取热门歌单
  async getPopSongs(id: string) {
    const res = await playlist.detail(Number(id))
    this.setData({
      songsData: res.playlist || {}
    })
  }
})