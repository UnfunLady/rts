import request from "../../http";

// 部门有关
interface deptData {
    deptno?: number | string | undefined,
    deptId?: number | string | undefined,
    page?: number | string,
    size?: number | string
}
// 获取全部部门 
const reqAllDept = () => {
    return request({ url: '/deptInfo', method: 'get' })
}
// 根据部门号获取团队
const reqGetDeptByDno = (params: deptData) => {
    return request({ url: '/getDeptByDno', method: 'get', params })
}
// 根据团队获取员工
const reqGetGroupEmploye = (params: deptData) => {
    return request({ url: '/getEmployee', method: 'get', params })
}
const employe = {
    reqAllDept,
    reqGetDeptByDno,
    reqGetGroupEmploye
}

export default employe