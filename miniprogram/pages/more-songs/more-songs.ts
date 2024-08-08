// pages/recommended-songs/recommended-songs.ts
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { musicChartsStore } from '../../stores/music-charts'

Page({
  data: {
    type: '' // 推荐歌曲或巅峰榜：ranking
  },
  onLoad(this: any, options: any) {
    const { type, toplistType } = options
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
    }
  },
  onUnload(this: any) {
    if (this.data.type === 'ranking') {
      // 解绑 巅峰榜 store
      this.musicChartsStoreBindings.destroyStoreBindings()
    }
  },
})