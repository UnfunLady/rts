import { message, Select } from "antd"
import { employe } from "../api"
const { Option } = Select;
export type initIndex = {
    //部门列表
    deptList: [],
}
export class initIndexData {
    initIndexData: initIndex = {
        deptList: [],
    }
}
export const getDeptInfo = async (data: initIndexData, setData: Function) => {
    const res: any = await employe.reqAllDept()
    if (res.code === 200) {
        data.initIndexData.deptList = res.deptInfo
        setData({ ...data })
    } else {
        message.error('请求失败请稍后再试!')
    }

}
// 部门整体
type departmentDataType = {
    employeSalaryForm: {
        dno: number | string,
        groupInfo: [],
        isLoading: boolean,
        editForm: {
<<<<<<< HEAD
            isuse: string | boolean|null,
            deptid: string | number|null,
=======
            isuse: string | boolean | null,
            deptid: string | number | null,
>>>>>>> 71885dc818ea89f99d641651572a211212017952
        },
        performance: {
            deptid: string | number,
            performance: string | number,
        },
        page: number,
        size: number,
    }
    tableDatas: any
}
export class initDepartmentData {
    initDepartmentData: departmentDataType = {
        employeSalaryForm: {
            dno: 0,
            groupInfo: [],
            isLoading: false,
            editForm: {
                isuse: null,
                deptid: null
            },
            performance: {
                deptid: 0,
                performance: 100,
            },
            page: 1,
            size: 8,
        },
        tableDatas: []
    }
}
// 获取部门工资明细
export const getEmployeSalaryInfo = async (data: initDepartmentData, setData: Function) => {
    const res: any = await employe.reqGetSalaryInfo({ dno: data.initDepartmentData.employeSalaryForm.dno })
    if (res.code === 200) {
        // 合并薪资信息
<<<<<<< HEAD
        const groupInfo = res.salaryInfo.map((item:any, index:any) => {
=======
        const groupInfo = res.salaryInfo.map((item: any, index: any) => {
>>>>>>> 71885dc818ea89f99d641651572a211212017952
            return { ...item, ...res.deptInfo[index] };
        });

        data.initDepartmentData.employeSalaryForm.groupInfo = groupInfo;
        setData({ ...data })
        data.initDepartmentData.tableDatas = data.initDepartmentData.employeSalaryForm.groupInfo.map((group: any) => {
            return {
                key: group.id,
                deptid: group.deptid,
                deptname: group.deptname,
                location: group.location,
                count: group.count,
                socialSub: group.socialSub,
                houseSub: group.houseSub,
                eatSub: group.eatSub,
                transSub: group.transSub,
                hotSub: group.hotSub,
                performance: group.performance,
                isuse: group.isuse
            }
        })
    } else {
        message.error('获取信息失败!')
    }
}
// 修改部门绩效
export const updateEmployeSalaryInfo = async (data: initDepartmentData, setData: Function) => {
<<<<<<< HEAD
    const obj={
        editIsuse:data.initDepartmentData.employeSalaryForm.editForm.isuse,
        editIsuseId:data.initDepartmentData.employeSalaryForm.editForm.deptid,
        performanceId:data.initDepartmentData.employeSalaryForm.performance.deptid,
        performance:data.initDepartmentData.employeSalaryForm.performance.performance
    }
    
    const res: any = await employe.reqUpdateSalaryInfo(data.initDepartmentData.employeSalaryForm);
=======

    const obj = {
        editIsuse: data.initDepartmentData.employeSalaryForm.editForm.isuse,
        editIsuseId: data.initDepartmentData.employeSalaryForm.editForm.deptid,
        performanceId: data.initDepartmentData.employeSalaryForm.performance.deptid,
        performance: data.initDepartmentData.employeSalaryForm.performance.performance
    }
    const res: any = await employe.reqUpdateSalaryInfo(obj);
>>>>>>> 71885dc818ea89f99d641651572a211212017952
    if (res && res.code === 200) {
        // 重置修改表单
        data.initDepartmentData.employeSalaryForm.performance = {
            deptid: 0,
            performance: 100,
        }
        data.initDepartmentData.employeSalaryForm.editForm = {
            isuse: '',
            deptid: 0
        }
        // 解锁
        data.initDepartmentData.employeSalaryForm.isLoading = false;
        setData({ ...data })
        getEmployeSalaryInfo(data, setData)
    } else {
        message.error('修改绩效失败！')
    }


}

//-----------------------------------------------
// 员工个人具体薪资管理
interface employeSalaryDetail {
    active: number,//步骤条的激活
    DetailForm: {
        // 传递的部门号
        dno: number | string,
        // 团队号
        deptid: number | string,
        // 全部部门
        AlldeptInfo: [],
        // 员工细节数据
        employeDetail: [],
        // 补贴相关的数据
        subDetail:
        {
            socialSub: number,
            houseSub: number,
            eatSub: number,
            transSub: number,
            hotSub: number,
            performance: number
        }
        ,
        selectOption: JSX.Element[],
        tableDatas: Array<any>,
        // 应发工资
        allSalary: number,
        page: number,
        size: number,
        count: number
    },
    // 收集修改的目标 点击提交时循环执行修改
    editList: Array<any>,
    // 判断是否修改成功
    editSuccess: boolean,
    loading: boolean,
}

// 个人员工薪资管理初始化数据
export class EmployeSalaryDetailData {
    employeSalaryDetailForm: employeSalaryDetail = {
        active: 0,
        DetailForm: {
            dno: '',
            AlldeptInfo: [],
            employeDetail: [],
            subDetail: {
                socialSub: 0,
                houseSub: 0,
                eatSub: 0,
                transSub: 0,
                hotSub: 0,
                performance: 0
            },
            selectOption: [],
            tableDatas: [],
            allSalary: 0,
            deptid: 0,
            page: 1,
            size: 8,
            count: 0
        },
        // 修改列表
        editList: [],
        // 是否成功
        editSuccess: false,
        loading: false
    }
}

// 获取部门小组
export const getDeptByDno = async (data: EmployeSalaryDetailData, setData: Function) => {
    const res: any = await employe.reqGetDeptByDno({ dno: data.employeSalaryDetailForm.DetailForm.dno })
    if (res.code === 200) {
        data.employeSalaryDetailForm.DetailForm.AlldeptInfo = res.groupInfo
        data.employeSalaryDetailForm.DetailForm.selectOption = data.employeSalaryDetailForm.DetailForm.AlldeptInfo.map((dept: any) => {
            return <Option key={dept.id}>{dept.deptname}</Option>
        })
        setData({ ...data })
    } else {
        message.error('获取小组信息失败!')
    }
}
// 获取部门员工细节
export const getEmployeSalaryDetailInfo = async (data: EmployeSalaryDetailData, setData: Function) => {
    const res: any = await employe.reqGetSalaryDetailInfo({ deptid: data.employeSalaryDetailForm.DetailForm.deptid, page: data.employeSalaryDetailForm.DetailForm.page, size: data.employeSalaryDetailForm.DetailForm.size })
    if (res.code === 200) {
        data.employeSalaryDetailForm.DetailForm.employeDetail = data.employeSalaryDetailForm.DetailForm.employeDetail = res.detailInfo;
        data.employeSalaryDetailForm.DetailForm.count = res.count;
        data.employeSalaryDetailForm.DetailForm.subDetail = res.subDetail
        data.employeSalaryDetailForm.DetailForm.tableDatas = data.employeSalaryDetailForm.DetailForm.employeDetail.map((employe: any, index: number) => {
            return {
                index,
                key: employe.employno,
                deptno: employe.deptno,
                employno: employe.employno,
                employname: employe.employname,
                usesocialSub: employe.usesocialSub == "true" ? true : false,
                usehouseSub: employe.usehouseSub == "true" ? true : false,
                useeatSub: employe.useeatSub == "true" ? true : false,
                usetransSub: employe.usetransSub == "true" ? true : false,
                usehotSub: employe.usehotSub == "true" ? true : false,
                usePerformance: employe.usePerformance,
                salary: employe.salary,
                isuse: employe.isuse == "true" ? true : false,
                deptname: employe.deptname,
                allSalary: (
                    employe.isuse != "true"
                        ? employe.salary
                        : (employe.usesocialSub == "true"
                            ? -data.employeSalaryDetailForm.DetailForm.subDetail.socialSub
                            : data.employeSalaryDetailForm.DetailForm.subDetail.socialSub
                        ) +
                        (employe.usehouseSub == "true"
                            ? data.employeSalaryDetailForm.DetailForm.subDetail
                                .houseSub
                            : 0) +
                        (employe.useeatSub == "true"
                            ? data.employeSalaryDetailForm.DetailForm.subDetail.eatSub
                            : 0) +
                        (employe.usetransSub == "true"
                            ? data.employeSalaryDetailForm.DetailForm.subDetail
                                .transSub
                            : 0) +
                        (employe.usehotSub == "true"
                            ? data.employeSalaryDetailForm.DetailForm.subDetail.hotSub
                            : 0) +
                        employe.salary +
                        employe.usePerformance *
                        data.employeSalaryDetailForm.DetailForm.subDetail
                            .performance *
                        0.01
                )
            }
        })
     

        setData({ ...data })

    } else {
        message.error('获取员工信息失败！')
    }

}

// 修改部门员工细节
export const updateEmployeSalaryDetail = async (data: EmployeSalaryDetailData, setData: Function) => {
    const res: any = await employe.reqUpdateSalaryDetail(data.employeSalaryDetailForm.editList)
    data.employeSalaryDetailForm.loading = true
    setData({ ...data })
    if (res.code === 200) {
        setTimeout(() => {
            data.employeSalaryDetailForm.loading = false;
            // 提交修改
            data.employeSalaryDetailForm.active++
            setData({ ...data })
        }, 1000)
        data.employeSalaryDetailForm.editSuccess = true
        setData({ ...data })
    } else {
        // 提交修改
        data.employeSalaryDetailForm.active++
        setData({ ...data })
        message.error('修改失败!')
    }

}