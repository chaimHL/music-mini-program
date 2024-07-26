import qyRequest from '../index'

const url = 'playlist'
export default {
  detail(id: number) {
    /**
     *  热歌 id = 3778678
     */
    return qyRequest.request({
      url: `${url}/detail`,
      data: {
        id
      }
    })
  }
}