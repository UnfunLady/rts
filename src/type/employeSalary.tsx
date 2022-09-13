import { message } from "antd"
import { employe } from "../api"
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

type departmentDataType = {
    employeSalaryForm: {
        dno: number | string,
        groupInfo: [],
        isLoading: boolean,
        editForm: {
            isuse: string | boolean,
            deptid: string | number,
        },
        performance: {
            deptid: string | number,
            performance: string | number,
        },
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
                isuse: '',
                deptid: 0
            },
            performance: {
                deptid: 0,
                performance: 100,
            },

        },
        tableDatas: []
    }
}
// 获取工资明细
export const getEmployeSalaryInfo = async (data: initDepartmentData, setData: Function) => {
    const res: any = await employe.reqGetSalaryInfo({ dno: data.initDepartmentData.employeSalaryForm.dno })
    if (res.code === 200) {
        data.initDepartmentData.employeSalaryForm.groupInfo = res.groupInfo;
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
    console.log(res);
}

