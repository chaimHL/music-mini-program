// pages/recommended-songs/recommended-songs.ts
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { recommendedSongsStore } from '../../stores/recommended-songs'

Page({
  onLoad(this: any) {
    // 绑定 MobX store
    this.storeBindings = createStoreBindings(this, {
      store: recommendedSongsStore,
      fields: ['playlist'],
      actions: ['setPlayList']
    })
  },
  onUnload(this: any) {
    // 解绑
    this.storeBindings.destroyStoreBindings()
  },
})