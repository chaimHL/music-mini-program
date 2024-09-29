/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,
    windowInfo: WechatMiniprogram.WindowInfo | {}
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}

// 解决批量查询调用 remove() 或 update() 类型检测报错的问题
declare class ExtendedQuery extends DB.Query {
  remove(): Promise<DB.IRemoveResult>
  update(): Promise<DB.IUpdateResult>
}