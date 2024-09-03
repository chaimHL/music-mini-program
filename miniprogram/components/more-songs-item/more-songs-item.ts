// components/more-songs-item/more-songs-item.ts
Component({
  properties: {
    itemData: {
      type: Object,
      value: {}
    },
    index: {
      type: Number,
      value: 0
    }
  },
  methods: {
    onTapSong() {
      const id = this.properties.itemData.id
      wx.navigateTo({
        url: `/packageMusic/pages/music-play/music-play?id=${id}`
      })
    }
  }
})