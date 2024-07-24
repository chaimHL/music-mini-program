export function getSelectorRect(selector: string) {
  return new Promise<any[]>((resolve) => {
    const query = wx.createSelectorQuery()
    query.select(selector).boundingClientRect()
    query.exec(res => {
      resolve(res)
    })
  })
}