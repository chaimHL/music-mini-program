// pages/music-play/music-play.ts
import song from '../../services/requsets/song'
const app = getApp()
// 创建播放器
const innerAudioContext = wx.createInnerAudioContext()
Page({
  data: {
    tabs: ['歌曲', '歌词'],
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
    // 播放歌曲
    innerAudioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
    innerAudioContext.autoplay = true
  },
  // 点击 tab 进行切换
  onTapTab(event: WechatMiniprogram.BaseEvent) {
    this.setData({
      current: event.currentTarget.dataset.index
    })
  },
  onSwiperChange(event: WechatMiniprogram.SwiperChange) {
    this.setData({
      current: event.detail.current
    })
  }
})