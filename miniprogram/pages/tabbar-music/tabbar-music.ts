// pages/tabbar-music/tabbar-music.ts
import { throttle } from 'underscore'

import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { recommendedSongsStore } from '../../stores/recommended-songs'
import { musicChartsStore } from '../../stores/music-charts'

import { getSelectorRect } from '../../utils/index'

import banner from '../../services/requsets/banner'
import playlist from '../../services/requsets/playlist'

const app = getApp()
const throttled = throttle(getSelectorRect, 100, { trailing: false })

Page({
  data: {
    banners: [] as any[],
    swipterHeight: 150,
    popPlaylist: [], // 热门歌单
    screenWidth: 375
  },
  onLoad(this: any) {
    // 获取屏幕宽度
    this.getWindowInfo()

    this.getBanners()
    // 绑定 MobX store
    this.recommendedSongsStoreBindings = createStoreBindings(this, {
      store: recommendedSongsStore,
      fields: ['theFirst6Songs'],
      actions: ['setPlayList']
    })

    // 巅峰榜
    this.musicChartsStoreBindings = createStoreBindings(this, {
      store: musicChartsStore,
      fields: ['newSongList', 'originalSongList', 'soaringSongList'],
      actions: ['newSong', 'originalSong', 'soaringSong']
    })

    // 获取推荐歌单
    this.getPlayList()

    // 获取热门歌单
    this.getPopPlaylist()

    // 获取巅峰榜数据
    this.getMusicCharts()
  },

  onUnload(this: any) {
    // 解绑
    this.recommendedSongsStoreBindings.destroyStoreBindings()
    this.musicChartsStoreBindings.destroyStoreBindings()
  },

  getWindowInfo() {
    const { screenWidth } = app.globalData.windowInfo
    this.setData({
      screenWidth
    })
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
  // 点击了推荐歌曲的更多
  onTapMoreRec() {
    wx.navigateTo({
      url: '/pages/more-songs/more-songs?type=recommended'
    })
  },
  // 点击了热门歌单的更多
  onTapMorePop() {
    wx.navigateTo({
      url: '/pages/songs-list/songs-list'
    })
  },
  async getPlayList(this: any) {
    const res = await playlist.detail(3778678)
    const obj = res.playlist
    this.setPlayList(obj || {})
  },
  async getPopPlaylist() {
    const res = await playlist.topList()
    const arr = res.playlists || []
    this.setData({
      popPlaylist: arr
    })
  },
  getMusicCharts(this: any) {
    const ids: Record<string, number> = {
      newSong: 3779629,
      originalSong: 2884035,
      soaringSong: 19723756
    }
    for (const key in ids) {
      const id = ids[key]
      playlist.detail(id).then(res => {
        this[key](res.playlist || {})
      })
    }
  }
})