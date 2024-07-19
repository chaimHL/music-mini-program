// components/mv-item/mv-item.ts
Component({
  properties: {
    mvData: {
      type: Object,
      value: {}
    }
  },
  methods: {
    tapMvItem() {
      wx.navigateTo({
        url: `/pages/video-detail/video-detail?id=${this.properties.mvData.id}`
      })
    }
  }
})