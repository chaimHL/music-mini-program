// pages/music-play/music-play.ts
import song from '../../services/requsets/song'
Page({
  data: {
    songData: {},
    lrc: ''
  },
  onLoad(options: any) {
    const { id } = options
    // 获取歌曲详情
    song.detail(id).then(res => {
      console.log(res)
      this.setData({
        songData: res.songs[0]
      })
    })
    // 获取歌词
    song.lyric(id).then(res => {
      this.setData({
        lrc: res.lrc.lyric
      })
    })
  }
})