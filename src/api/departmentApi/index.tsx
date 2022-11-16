import request from "../../http"

// 修改部门无头像
const reqUpdateDepartmentNoAvatar = (data: any) => {
    return request({ url: '/api/editDeptNoAvatar', method: 'post', data })
}
// 修改部门有头像
const reqUpdateDepartmentAvatar = (data: any) => {
    return request({
        url: '/api/editDeptR', method: 'post', data,
    })
}
// 根据部门号获取团队
const reqGetDeptByDno = (params: Object) => {
    return request({ url: '/api/getDeptByDno', method: 'get', params })
}
// 获取全部部门 
const reqAllDept = () => {
    return request({ url: '/api/deptInfo', method: 'get' })
}
// 修改部门小组信息
const reqUpdateGroupInfo = (data: any) => {
    return request({ url: '/api/editGroupInfo', method: 'post', data })
}
// 获取全部员工
const reqGetAllEmploye = () => {
    return request({ url: '/api/getAllEmploye', method: 'get' })
}
// 新增小组
const reqAddGroup = (data: any) => {
    return request({ url: '/api/addGroup', method: 'post', data })
}
// 新增部门
const reqAddDepartment = (data: any) => {
    return request({ url: '/api/addDeptpartmentR', method: 'post', data })
}
// 解散小组
const delGroup = (data: any) => {
    return request({ url: '/api/delGroup', method: 'post', data })
}
// 解散部门
const delDept = (data: any) => {
    return request({ url: '/api/delDept', method: 'post', data })
}
const department = {
    reqUpdateDepartmentAvatar,
    reqUpdateDepartmentNoAvatar,
    reqGetDeptByDno,
    reqUpdateGroupInfo,
    reqGetAllEmploye,
    reqAllDept,
    reqAddGroup,
    reqAddDepartment,
    delGroup,
    delDept
}
export default department