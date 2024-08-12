import { mvUrl, mvDetail } from "../../services/requsets/mv"

// pages/video-detail/video-detail.ts
Page({
  data: {
    videoUrl: '',
    detail: {}
  },
  onLoad(options: any) {
    const { id } = options
    if (id) {
      this.getMvUrl(id)
      this.getMvDetail(id)
    }
  },
  // 获取 mv 地址
  async getMvUrl(id: string) {
    try {
      const res = await mvUrl(id)
      this.setData({
        videoUrl: res.data.url
      })
    } catch (error) {
      console.log(error)
    }
  },
  // 获取 mv 详情
  async getMvDetail(id: string) {
    try {
      const res = await mvDetail(id)
      this.setData({
        detail: res.data || {}
      })
    } catch (error) {
      console.log(error)
    }
  }
})