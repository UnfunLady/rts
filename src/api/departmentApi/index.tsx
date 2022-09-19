import request from "../../http"

// 修改部门无头像
const reqUpdateDepartmentNoAvatar = (data: any) => {
    return request({ url: '/editDeptNoAvatar', method: 'post', data })
}
// 修改部门有头像
const reqUpdateDepartmentAvatar = (data: any) => {
    return request({
        url: '/editDeptR', method: 'post', data,
    })
}

// 根据部门号获取团队
const reqGetDeptByDno = (params: Object) => {
    return request({ url: '/getDeptByDno', method: 'get', params })
}

// 修改部门小组信息
const reqUpdateGroupInfo = (data: any) => {
    return request({ url: '/editGroupInfo', method: 'post', data })
}
const department = {
    reqUpdateDepartmentAvatar,
    reqUpdateDepartmentNoAvatar,
    reqGetDeptByDno,
    reqUpdateGroupInfo
}
export default department