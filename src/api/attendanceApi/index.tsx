import request from "../../http";

const reqGetEmployeLeavePage = (params: object) => {
    return request({ url: '/api/getEmployeLeaveByPage', params })
}

export default {
    reqGetEmployeLeavePage
}