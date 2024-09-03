// components/recommended-song/recommended-song.ts
Component({
  properties: {
    songData: {
      type: Object,
      value: {}
    }
  },
  methods: {
    onTapSong() {
      const id = this.properties.songData.id
      wx.navigateTo({
        url: `/packageMusic/pages/music-play/music-play?id=${id}`
      })
    }
  }
})