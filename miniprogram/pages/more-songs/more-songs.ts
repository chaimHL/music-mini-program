// pages/recommended-songs/recommended-songs.ts
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { musicChartsStore } from '../../stores/music-charts'
import { recommendedSongsStore } from '../../stores/recommended-songs'
import { playListStore } from '../../stores/play-list'
import playlist from '../../services/requsets/playlist'

Page({
  data: {
    type: '' // 推荐歌曲或巅峰榜：ranking
  },
  onLoad(this: any, options: any) {
    const { type, toplistType, id } = options
    this.setData({
      type
    })
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
    // 绑定播放列表 store
    // 播放歌曲列表
    this.playListBindings = createStoreBindings(this, {
      store: playListStore,
      fields: ['playMusicList'],
      actions: ['setPlayMusicList']
    })
  },
  onReady(this: any) {
    wx.setNavigationBarTitle({
      title: this.data.songsData?.name || ''
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
    // 解绑 播放列表 store
    this.playListBindings.destroyStoreBindings()
  },
  // 获取热门歌单
  async getPopSongs(id: string) {
    const res = await playlist.detail(Number(id))
    this.setData({
      songsData: res.playlist || {}
    })
  },

  // 点击了某一首歌曲
  onTapSong(this: any) {
    this.setPlayMusicList(this.data.songsData.tracks)
  }
})