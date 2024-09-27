// pages/tabbar-profile/tabbar-profile.ts
Page({
  data: {
    avatarUrl: '',
    nickName: ''
  },

  onLoad() {
    const avatarUrl = wx.getStorageSync('avatarUrl')
    const nickname = wx.getStorageSync('nickname')
    if (avatarUrl) {
      this.setData({
        avatarUrl
      })
    }
    if (nickname) {
      this.setData({
        nickName: nickname
      })
    }
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
      nickName: nickname
    })
    // 获取 openid
    const res = await wx.cloud.callFunction({
      name: 'login'
    })

    const { openid } = res.result as Extract<ICloud.CallFunctionResult, 'openid'>
    wx.setStorageSync('openid', openid)
  }
})