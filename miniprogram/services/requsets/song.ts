import qyRequest from '../index'

const url = 'song'
export default {
  // 歌曲详情
  detail(ids: number | string) {
    return qyRequest.request({
      url: `${url}/detail`,
      data: {
        ids
      }
    })
  },
  // 歌词
  lyric(id: number | string) {
    return qyRequest.request({
      url: 'lyric',
      data: {
        id
      }
    })
  },
}