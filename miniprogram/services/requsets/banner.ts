import qyRequest from '../index'

export default {
  getList(type = 1) {
    return qyRequest.request({
      url: 'banner',
      data: {
        type
      }
    })
  }
}