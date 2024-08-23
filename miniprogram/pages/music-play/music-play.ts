// pages/music-play/music-play.ts
import { throttle } from 'underscore'
import song from '../../services/requsets/song'
import { formatLyric } from '../../utils/index'

const app = getApp()
// 创建播放器
const innerAudioContext = wx.createInnerAudioContext()
Page({
  data: {
    tabs: ['歌曲', '歌词'],
    songData: {},
    lrc: [] as any[],
    current: 0, // 当前激活的 swiperItem
    contentHeight: 667, // 内容区域高度
    controlData: {} as any, // 播放滑块数据
    isSliderChanging: false, // 记录是否正在拖动滑块
    isSliderChange: false, // 记录是否正在点击滑块
    isPaused: false, // 是否暂停状态
    currentLrc: '', // 当前歌词
    currentLrcIndex: -1
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
      const lrc = formatLyric(res.lrc.lyric)
      this.setData({
        lrc
      })
    })
    // 播放歌曲
    innerAudioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
    innerAudioContext.autoplay = true

    const throttled = throttle(this.handleAudioContextTimeUpdate, 1000)
    // 监听播放
    innerAudioContext.onTimeUpdate(() => {
      // 获取播放时间
      if (!this.data.isSliderChanging) {
        throttled()
      }
      // 匹配歌词
      if (!this.data.lrc.length) return
      let lrcIndex = this.data.lrc.length - 1
      for (let index = 0; index < this.data.lrc.length; index++) {
        const element = this.data.lrc[index]
        // element.time 单位为 ms; innerAudioContext.currentTime 单位为 s
        if (element.time > innerAudioContext.currentTime * 1000) {
          lrcIndex = index - 1
          break
        }
      }
      if (this.data.currentLrcIndex === lrcIndex) return
      this.setData({
        currentLrc: this.data.lrc[lrcIndex].text,
        currentLrcIndex: lrcIndex
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

  handleAudioContextTimeUpdate() {
    // 解决点击滑块，滑块有时会跳动的问题
    const currentTime = this.data.isSliderChange ? this.data.controlData.currentTime : innerAudioContext.currentTime * 1000
    this.setData({
      controlData: { ...this.data.controlData, currentTime }
    })
    const progressValue = this.data.controlData.currentTime * 100 / this.data.controlData.durationTime
    console.log(progressValue);

    this.setData({
      controlData: { ...this.data.controlData, progressValue }
    })

    this.data.isSliderChange = false
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
  // 滑块被点击，或者拖动完成后
  onSliderChange(event: WechatMiniprogram.CustomEvent) {
    console.log('==========');
    this.data.isSliderChange = true
    const { value } = event.detail
    const currentTime = value / 100 * this.data.controlData.durationTime
    this.setData({
      controlData: { ...this.data.controlData, currentTime }
    })
    const position = Number((currentTime / 1000).toFixed(3))
    // 设置播放器
    // 跳转到指定位置, position单位 s。精确到小数点后 3 位
    innerAudioContext.seek(position)
    // 更新 progressValue，防止滑块来回跳动
    const progressValue = currentTime * 100 / this.data.controlData.durationTime
    this.setData({
      controlData: { ...this.data.controlData, progressValue }
    })
    this.data.isSliderChanging = false
  },
  // 拖动过程中触发的事件
  onSliderChanging(event: WechatMiniprogram.CustomEvent) {
    this.data.isSliderChanging = true
    const { value } = event.detail
    const currentTime = value / 100 * this.data.controlData.durationTime
    const progressValue = currentTime * 100 / this.data.controlData.durationTime
    const controlData = { ...this.data.controlData, currentTime, progressValue }
    this.setData({
      controlData
    })
  },
  // 点击播放或暂停按钮
  onTapPlayOrPause() {
    if (innerAudioContext.paused) {
      innerAudioContext.play()
      this.setData({
        isPaused: false
      })
    } else {
      innerAudioContext.pause()
      this.setData({
        isPaused: true
      })
    }
  }
})