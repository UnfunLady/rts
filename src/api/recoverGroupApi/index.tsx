import request from "../../http"
const getRecoverGroupByPage = (params: object) => {
    return request({ url: "/getRecoverGroup", method: "get", params })
}
const recoverGroup = (data: object) => {
    return request({ url: "/recoverGroup", method: "post", data })
}

export default {
    getRecoverGroupByPage,
    recoverGroup
}