import request from "../../http"
const getRecoverGroupByPage = (params: object) => {
    return request({ url: "/api/getRecoverGroup", method: "get", params })
}
const recoverGroup = (data: object) => {
    return request({ url: "/api/recoverGroup", method: "post", data })
}

export default {
    getRecoverGroupByPage,
    recoverGroup
}