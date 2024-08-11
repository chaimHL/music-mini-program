// components/pop-song/pop-song.ts
Component({
  properties: {
    songData: {
      type: Object,
      value: {}
    }
  },
  methods: {
    onTapPopSong() {
      const { id } = this.properties.songData
      wx.navigateTo({
        url: `/pages/more-songs/more-songs?type=pop&id=${id}`
      })
    }
  }
})