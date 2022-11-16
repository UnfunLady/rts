import request from '../../http'

// 登录请求接口
const getChinaEvilInfo = (t: number) => {
    return request({ baseURL: '/wy', url: `/ug/api/wuhan/app/data/list-total?t=${t}`, method: 'get' })
}
const map = {
    getChinaEvilInfo
}
export default map