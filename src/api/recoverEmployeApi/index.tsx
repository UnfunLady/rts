import request from "../../http"
// 获取信息
const getRecoverEmployeByPage = (params: object) => {
    return request({ url: '/api/getDeletedEmploye', method: 'get', params })
}
// 恢复信息
const reqRecoverEmploye = (data: object) => {
    return request({ url: '/api/rebackEmploye', method: "post", data })
}
export default {
    getRecoverEmployeByPage,
    reqRecoverEmploye
}