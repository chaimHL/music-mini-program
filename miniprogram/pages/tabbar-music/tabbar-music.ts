// pages/tabbar-music/tabbar-music.ts
import { throttle } from 'underscore'

import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { recommendedSongsStore } from '../../stores/recommended-songs'

import { getSelectorRect } from '../../utils/index'

import banner from '../../services/requsets/banner'
import playlist from '../../services/requsets/playlist'


const throttled = throttle(getSelectorRect, 100, { trailing: false })

Page({
  data: {
    banners: [] as any[],
    swipterHeight: 150
  },
  onLoad(this: any) {
    this.getBanners()

    // 绑定 MobX store
    this.storeBindings = createStoreBindings(this, {
      store: recommendedSongsStore,
      fields: ['theFirst6Songs'],
      actions: ['setPlayList']
    })

    // 获取推荐歌单
    this.getPlayList()
  },
  onUnload(this: any) {
    // 解绑
    this.storeBindings.destroyStoreBindings()
  },
  onTapSearch() {
    wx.navigateTo({ url: '/pages/search/search' })
  },
  async getBanners() {
    const res = await banner.getList()
    this.setData({
      banners: res.banners || []
    })
  },
  // banner 图片加载完后执行
  async onBannerLoad() {
    const res = await throttled('.img')
    this.setData({
      swipterHeight: res[0].height || 150
    })
  },
  // 点击了区块标题的更多
  onTapMore() {
    wx.navigateTo({
      url: '/pages/recommended-songs/recommended-songs'
    })
  },
  async getPlayList(this: any) {
    const res = await playlist.detail(3778678)
    const arr = res.playlist.tracks
    this.setPlayList(arr || [])
  }
})