class QyRequest {
  constructor(public baseUrl: string) { }

  request<T = any>(options: WechatMiniprogram.RequestOption) {
    const { url } = options
    return new Promise<T>((resolve, reject) => {
      wx.request({
        ...options,
        url: this.baseUrl + url,
        success: res => {
          resolve(res.data as T)
        },
        fail: reject
      })
    })
  }
}
export default QyRequest