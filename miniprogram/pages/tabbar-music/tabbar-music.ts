// pages/tabbar-music/tabbar-music.ts
import { throttle } from 'underscore'

import { getSelectorRect } from '../../utils/index'
import banner from '../../services/requsets/banner'
import playlist from '../../services/requsets/playlist'


const throttled = throttle(getSelectorRect, 100, { trailing: false })

Page({
  data: {
    banners: [] as any[],
    swipterHeight: 150,
    playlist: [] as any[]
  },
  onLoad() {
    this.getBanners()
    // 获取推荐歌单
    this.getPlayList()
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
    // console.log(1111)
  },
  async getPlayList() {
    const res = await playlist.detail(3778678)
    const arr = res.playlist.tracks.slice(0, 6)
    this.setData({
      playlist: arr || []
    })
  }
})