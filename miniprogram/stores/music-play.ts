// 正在播放的音乐信息
import { observable, action } from 'mobx-miniprogram'

export const musicPlayStore = observable({
  albumSrc: '',
  musicName: '',
  setAlbumSrc: action(function (this: any, src: string) {
    this.albumSrc = src
  }),
  setMusicName: action(function (this: any, name: string) {
    this.musicName = name
  })
})