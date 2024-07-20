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

export function mvDetail(mvid: string) {
  return qyRequest.request({
    url: 'mv/detail',
    data: {
      mvid
    }
  })
}

export function allvideo(id: string) {
  return qyRequest.request({
    url: 'related/allvideo',
    data: {
      id
    }
  })
}