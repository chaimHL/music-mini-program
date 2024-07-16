import qyRequest from '../index'

export function topMv(limit = 20, offset = 0) {
  return qyRequest.request({
    url: 'top/mv',
    data: {
      limit,
      offset
    }
  })
}