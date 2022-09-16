import { message } from "antd"
import { employe } from "../api"
// 部门基础信息
export interface departmentData {
    allDeptInfo: any,
    page: number,
    size: number,
    showDetail: boolean,
    // 详细信息
    detailForm: {
        [propName: string]: any
    },
    allTableDatas: Array<any>,
    childrenTableDatas: Array<any>,
}
// 部门信息初始化
export class departmentDataInit {
    departmentData: departmentData = {
        allDeptInfo: [

        ],
        page: 1,
        size: 8,
        showDetail: false,
        detailForm: {},
        allTableDatas: [],
        childrenTableDatas: []
    }
}

export const getAllDeptInfo = async (data: departmentDataInit, setData: Function) => {
    const res: any = await employe.reqAllDept();
    if (res.code === 200) {
        // 遍历团队  把团队添加到所属部门
        res.deptInfo.forEach((item: any, index: number) => {
            // 给每个部门定义一个children数组
            item.children = []
            res.groupInfo.forEach((child: any) => {
                // 如果符合条件就添加进去
                if (item.dno === child.deptno) {
                    item.children.push(child)
                }
            })
        })
        data.departmentData.allDeptInfo = res.deptInfo;
        data.departmentData.allTableDatas = data.departmentData.allDeptInfo.map((dept: any) => {
            return {
                key: dept.dno,
                dno: dept.dno,
                dname: dept.dname,
                avatar: dept.avatar,
                groupCount: dept.groupCount,
                count: dept.count,
                explain: dept.explain
            }
        })
        // 详细信息
        data.departmentData.childrenTableDatas = data.departmentData.allDeptInfo.map((dept: any) => {
            return dept.children.map((child: any) => {
                return {
                    key: child.id,
                    dno: dept.dno,
                    dname: dept.dname,
                    groupCount: dept.groupCount,
                    count: dept.count,
                    explain: dept.explain,
                    location: child.location,

                }
            })

        })
        setData({ ...data })
    } else {
        message.error('获取部门信息失败!')
    }

}


// 修改部门用到的数据
export interface editDepartmentData {
    editDeptData: {
        [propName: string]: any
    },
    isEdit: boolean,
    // 是否上传头像
    isUpload: boolean
}
// 初始化
export class editDepartmentDataInit {
    editDeptData: editDepartmentData = {
        editDeptData: {},
        isEdit: false,
        isUpload: false
    }
}