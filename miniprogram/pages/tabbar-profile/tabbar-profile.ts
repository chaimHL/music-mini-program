// pages/tabbar-profile/tabbar-profile.ts
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { songSheetStore } from '../../stores/song-sheet'
import { songSheetCollection } from '../../utils/index'
Page({
  data: {
    isLogin: false,
    avatarUrl: '',
    nickName: '',
    tabs: [
      { name: '收藏', type: 'star' },
      { name: '喜欢', type: 'like' }
    ],
    showDialog: false,
    sheetName: ''
  },

  onLoad(this: any) {
    // 绑定 MobX store
    this.storeBindings = createStoreBindings(this, {
      store: songSheetStore,
      fields: ['songSheet'],
      actions: ['setSongSheet']
    })

    const avatarUrl = wx.getStorageSync('avatarUrl')
    const nickname = wx.getStorageSync('nickname')
    if (avatarUrl) {
      this.setData({
        avatarUrl
      })
    }
    if (nickname) {
      this.setData({
        isLogin: true,
        nickName: nickname
      })
    }
  },

  onShow(this: any) {
    this.setSongSheet()
  },

  onReady(this: any) {
    this.setSongSheet()
  },

  onUnload(this: any) {
    // 解绑
    this.storeBindings.destroyStoreBindings()
  },

  // 用户头像
  onChooseAvatar(event: WechatMiniprogram.CustomEvent) {
    const { avatarUrl } = event.detail
    wx.setStorageSync('avatarUrl', avatarUrl)
    this.setData({
      avatarUrl
    })
  },

  // 登录
  async onFormSubmit(event: WechatMiniprogram.CustomEvent) {
    // 获取用户昵称
    const { nickname } = event.detail.value
    wx.setStorageSync('nickname', nickname)
    this.setData({
      isLogin: true,
      nickName: nickname
    })
    // 获取 openid
    const res = await wx.cloud.callFunction({
      name: 'login'
    })

    const { openid } = res.result as Extract<ICloud.CallFunctionResult, 'openid'>
    wx.setStorageSync('openid', openid)
  },

  onTapFavor(event: WechatMiniprogram.CustomEvent) {
    const { type } = event.currentTarget.dataset.item
    wx.navigateTo({
      url: `/packageMusic/pages/more-songs/more-songs?type=${type}`
    })
  },

  // 添加歌单
  onAddSongSheet() {
    this.setData({
      showDialog: true
    })
  },

  async onTapConfirm(this: any) {
    const name = this.data.sheetName
    const data = {
      name,
      songs: []
    }
    const res = await songSheetCollection.add(data)
    if (res) {
      wx.showToast({
        title: '创建歌单成功',
        icon: 'success',
        duration: 2000
      })
      this.setSongSheet()
    }
  },

  // 删除歌单
  async onDeleteSongSheet(this: any, event: WechatMiniprogram.CustomEvent) {
    const res = await songSheetCollection.remove(event.detail.id)
    if (res) {
      wx.showToast({
        title: "删除歌单成功"
      })
      this.setSongSheet()
    }
  }
})