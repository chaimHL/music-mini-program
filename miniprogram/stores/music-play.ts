// 正在播放的音乐信息
import { observable, action } from 'mobx-miniprogram'
// 创建播放器
export const innerAudioContext = wx.createInnerAudioContext()
export const musicPlayStore = observable({
  albumSrc: '',
  musicName: '',
  isPaused: false, // 是否暂停状态
  setAlbumSrc: action(function (this: any, src: string) {
    this.albumSrc = src
  }),
  setMusicName: action(function (this: any, name: string) {
    this.musicName = name
  }),
  onTapPlayOrPause: action(function (this: any) {
    if (innerAudioContext.paused) {
      innerAudioContext.play()
      this.isPaused = false
    } else {
      innerAudioContext.pause()
      this.isPaused = true
    }
  })
})