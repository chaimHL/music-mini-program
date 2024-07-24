// pages/tabbar-music/tabbar-music.ts
import { getSelectorRect } from '../../utils/index'
import banner from '../../services/requsets/banner'

Page({
  data: {
    banners: [] as any[],
    swipterHeight: 150
  },
  onLoad() {
    this.getBanners()
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
    const res = await getSelectorRect('.img')
    this.setData({
      swipterHeight: res[0].height || 150
    })
  }
})