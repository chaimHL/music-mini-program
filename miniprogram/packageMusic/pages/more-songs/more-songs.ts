// packageMusic/pages/more-songs/more-songs.ts
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { musicChartsStore } from '../../../stores/music-charts'
import { recommendedSongsStore } from '../../../stores/recommended-songs'
import { playListStore } from '../../../stores/play-list'
import { songSheetStore } from '../../../stores/song-sheet'
import playlist from '../../../services/requsets/playlist'

Page({
  data: {
    type: '', // 推荐歌曲或巅峰榜：ranking
    songsData: {}
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
    } else if (type === 'star' || type === 'like') {
      this.processFavor(type)
    }
    // 绑定播放列表 store
    // 播放歌曲列表
    this.playListBindings = createStoreBindings(this, {
      store: playListStore,
      fields: ['playMusicList'],
      actions: ['setPlayMusicList', 'setplayMusicIndex']
    })

    // 绑定歌单列表 store
    this.songSheetBindings = createStoreBindings(this, {
      store: songSheetStore,
      fields: ['songSheet'],
      actions: ['setSongSheet']
    })
  },
  onReady(this: any) {
    wx.setNavigationBarTitle({
      title: this.data.songsData?.name || ''
    })
    // 获取歌单数据
    this.setSongSheet()
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

    // 解绑歌单列表 store
    this.songSheetBindings.destroyStoreBindings()
  },
  // 获取热门歌单
  async getPopSongs(id: string) {
    const res = await playlist.detail(Number(id))
    this.setData({
      songsData: res.playlist || {}
    })
  },

  // 点击了某一首歌曲
  onTapSong(this: any, event: WechatMiniprogram.BaseEvent) {
    this.setPlayMusicList(this.data.songsData.tracks)
    const { index } = event.currentTarget.dataset
    this.setplayMusicIndex(index)
  },

  // 处理收藏、喜欢
  async processFavor(type: string) {
    const db = wx.cloud.database()
    const collection = db.collection('c_' + type)
    const res = await collection.get()
    const name = type === 'star' ? '我的收藏' : '我的喜欢'
    this.setData({
      songsData: {
        name,
        tracks: res.data || []
      }
    })
  }
})