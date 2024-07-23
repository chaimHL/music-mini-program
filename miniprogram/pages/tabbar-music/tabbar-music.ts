// pages/tabbar-music/tabbar-music.ts
import banner from '../../services/requsets/banner'

Page({
  data: {
    banners: [] as any[]
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
  }
})