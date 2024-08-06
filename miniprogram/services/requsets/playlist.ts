import qyRequest from '../index'

const url = 'playlist'
export default {
  topList(cat = '全部', limit = 6, offset = 0) {
    return qyRequest.request({
      url: `top/${url}`,
      data: {
        cat,
        limit,
        offset
      }
    })
  },
  detail(id: number) {
    /**
     *  热歌 id = 3778678
     *  新歌 id = 3779629
     *  原创 id = 2884035
     *  飙升 id = 19723756
     */
    return qyRequest.request({
      url: `${url}/detail`,
      data: {
        id
      }
    })
  },
  // 歌单类目
  hot() {
    return qyRequest.request({
      url: `${url}/hot`
    })
  },
}