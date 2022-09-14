import axios from "axios";
import request from "../../http";

// 部门有关
interface deptData {
    deptno?: number | string | undefined,
    deptId?: number | string | undefined,
    page?: number | string,
    size?: number | string
}
interface searchEmployeData {
    keyword: string | number,
    page: string | number,
    size: string | number
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
// 关键字查找
const reqSearchEmploye = (params: searchEmployeData) => {
    return request({ url: '/searchEmploy', method: 'get', params })
}
// 获取省市（高德地图API）
// const reqGetAllProvinceAndAllCity = () => {
//     return new Promise(resolve => {
//         axios({
//             url: 'https://restapi.amap.com/v3/config/district', method: 'get', params: {
//                 // 这个是高德地图API申请的 Key，
//                 key: '42552fba291f8a50278dddbe2d7460a2',
//                 keywords: '中国',
//                 subdistrict: 3,
//                 extensions: 'base'
//             }
//         }).then((res) => {
//             resolve(res)
//         })
//     })
// }

//
const reqGetAllProvinceAndAllCity = () => {
    return request({ url: '/getProvinceCity', method: 'get' })
}
// 确认添加员工
// 添加或修改员工
const reqAddOrUpdateEmploye = (data: object) => {
    return request({ url: '/addOrUpdateEmploy', method: 'post', data })
}
// 删除员工
const reqDeleteEmploye = (data: object) => {
    return request({ url: '/deleteEmploy', method: 'post', data })
}
// 获取部门工资明细
interface SalaryInfo {
    dno: string | number
}
// 获取部门工资明细
const reqGetSalaryInfo = (params: SalaryInfo) => {
    return request({ url: '/getSaralyInfo', method: 'get', params })
}
// 修改部门工资明细的细节
const reqUpdateSalaryInfo = (data: any) => {
    return request({ url: '/updateSalaryInfo', method: 'post', data })
}


// 获取部门员工详细工资细节
const reqGetSalaryDetailInfo = (params: object) => {
    return request({ url: '/getSaralyDetailInfo', method: 'get', params })
}
const employe = {
    reqAllDept,
    reqGetDeptByDno,
    reqGetGroupEmploye,
    reqGetAllProvinceAndAllCity,
    reqAddOrUpdateEmploye,
    reqDeleteEmploye,
    reqSearchEmploye,
    reqGetSalaryInfo,
    reqUpdateSalaryInfo,
    reqGetSalaryDetailInfo
}

export default employe