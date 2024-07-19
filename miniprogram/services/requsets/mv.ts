import qyRequest from '../index'

export function topMv(offset = 0, limit = 20) {
  return qyRequest.request({
    url: 'top/mv',
    data: {
      limit,
      offset
    }
  })
}

export function mvUrl(id: string) {
  return qyRequest.request({
    url: 'mv/url',
    data: {
      id
    }
  })
}