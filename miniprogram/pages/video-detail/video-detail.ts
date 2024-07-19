import { mvUrl } from "../../services/requsets/mv"

// pages/video-detail/video-detail.ts
Page({
  data: {
    videoUrl: ''
  },
  onLoad(options) {
    const { id } = options
    if (id) {
      this.getMvUrl(id)
    }
  },
  async getMvUrl(id: string) {
    try {
      const res = await mvUrl(id)
      this.setData({
        videoUrl: res.data.url
      })
    } catch (error) {
      console.log(error)
    }
  }
})