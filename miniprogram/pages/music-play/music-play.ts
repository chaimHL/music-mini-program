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
    contentHeight: 667, // 内容区域高度
    controlData: {} as any // 播放滑块数据
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
        songData: res.songs[0],
        controlData: { ...this.data.controlData, durationTime: res.songs[0].dt }
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
    // 获取播放时间
    innerAudioContext.onTimeUpdate(() => {
      this.setData({
        controlData: { ...this.data.controlData, currentTime: innerAudioContext.currentTime * 1000 }
      })
      const progressValue = this.data.controlData.currentTime * 100 / this.data.controlData.durationTime
      this.setData({
        controlData: { ...this.data.controlData, progressValue }
      })
    })
    // 解决点击滑块后因为onTimeUpdate停止监听导致的滑块与播放时间停止更新的问题
    innerAudioContext.onWaiting(() => {
      innerAudioContext.pause()
    })
    innerAudioContext.onCanplay(() => {
      innerAudioContext.play()
    })
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
  },
  // 滑块被点击
  onSliderChange(event: WechatMiniprogram.CustomEvent) {
    const { value } = event.detail
    const currentTime = value / 100 * this.data.controlData.durationTime
    const position = Number((currentTime / 1000).toFixed(3))
    // 设置播放器
    innerAudioContext.seek(position)
  }
})