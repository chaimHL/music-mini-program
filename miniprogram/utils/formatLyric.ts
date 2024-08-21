// 匹配时间部分的字符串，如 [04:04.46]
const timeReg = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/

export function formatLyric(lyric: string) {
  const result = []
  const lyricList = lyric.split('\n')
  for (const lyricStr of lyricList) {
    const res = timeReg.exec(lyricStr)
    if (!res) continue
    // 时间（字符串）转为毫秒（数字）
    const min = Number(res[1]) * 60 * 1000
    const sec = Number(res[2]) * 1000
    const msec = res[3].length === 2 ? Number(res[3]) * 10 : Number(res[3])
    const time = min + sec + msec

    // 歌词
    const text = lyricStr.replace(timeReg, '')
    result.push({ time, text })
  }

  return result
}