/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,
    windowInfo: WechatMiniprogram.WindowInfo | {}
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}