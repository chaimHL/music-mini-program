// pages/music-play/music-play.ts
import song from '../../services/requsets/song'
const app = getApp()
Page({
  data: {
    songData: {},
    lrc: '',
    current: 0, // 当前激活的 swiperItem
    contentHeight: 667 // 内容区域高度
  },
  onLoad(options: any) {
    // 计算内容区域高度
    const { screenHeight, statusBarHeight } = app.globalData.windowInfo
    const contentHeight = screenHeight - statusBarHeight - 44
    this.setData({ contentHeight })

    const { id } = options
    // 获取歌曲详情
    song.detail(id).then(res => {
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
  },
  onSwiperChange(event: WechatMiniprogram.SwiperChange) {
    this.setData({
      current: event.detail.current
    })
  }
})