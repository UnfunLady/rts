import { message, Select } from "antd"
import { employe, department } from "../api"

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
    isEditGroup: boolean,
    // 是否上传头像
    isUpload: boolean
}
// 初始化
export class editDepartmentDataInit {
    editDeptData: editDepartmentData = {
        editDeptData: {},
        isEdit: false,
        isEditGroup: false,
        isUpload: false,

    }
}
// 有头像修改
export const updateHasAva = async (data: any) => {
    const res: any = await department.reqUpdateDepartmentAvatar(data)
    if (res.code === 200) {
        message.success('修改信息成功!')
        return true
    } else {
        message.error('修改失败')
        return false
    }

}
// 无头像修改
export const updateNoAva = async (data: any) => {
    const res: any = await department.reqUpdateDepartmentNoAvatar(data)
    if (res.code === 200) {
        message.success('修改信息成功!')
        return true
    } else {
        message.error('修改失败')
        return false
    }

}

// 修改小组用到的数据
interface editGroupData {
    groupInfo: [],
    tableData: Array<any>
}
export class editGroupInit {
    editGroupInitData: editGroupData = {
        groupInfo: [],
        tableData: []
    }
}
// 获取修改的小组数据
export const getGroupByEdit = async (data: editGroupInit, setData: Function, dno: number | string) => {
    const res: any = await department.reqGetDeptByDno({ dno })
    if (res.code === 200) {
        data.editGroupInitData.groupInfo = res.groupInfo
        data.editGroupInitData.tableData = data.editGroupInitData.groupInfo.map((group: any) => {
            return {
                key: group.id,
                deptno: group.deptno,
                id: group.id,
                deptname: group.deptname,
                location: group.location,
                count: group.count
            }
        })
        setData({ ...data })
    } else {
        message.error('获取数据失败')
    }

}
// 修改小组数据
export const updateGroupInfo = async (data: {
    id: number | string, deptname: number | string, location: string, count: number | string
}) => {
    const res: any = await department.reqUpdateGroupInfo(data);
    if (res.code === 200) {
        message.success('修改小组成功,刷新以获取最新信息')
        return true
    } else {
        message.error('修改失败！')
        return false
    }

}


// 组织新部门
interface RecordType {
    key: string;
    title: string;
    description: string;
    chosen: boolean;
}
interface addGroupDataInterface {
    // 展示的员工数据
    employeData: Array<RecordType>,
    // 选中的员工集合
    selectEmployes: string[],
    // 全部部门信息
    allDeptInfo: [],
    // 选择部门的option
    deptSelect: Array<any>,
    // 步骤条
    active: number,
    // 确认信息的表单
    confirmForm: any,
    // loading
    loading: boolean,
    // 是否添加成功
    addSuccess: boolean
}
export class addGroupDataInit {
    addGroupData: addGroupDataInterface = {
        employeData: [],
        selectEmployes: [],
        allDeptInfo: [],
        deptSelect: [],
        active: 0,
        confirmForm: [],
        loading: false,
        addSuccess: false
    }
}
// 获取全部部门
const { Option } = Select
export const getAllDept = async (data: addGroupDataInit, setData: Function) => {
    const res: any = await department.reqAllDept()
    if (res.code === 200) {
        data.addGroupData.allDeptInfo = res.deptInfo
        data.addGroupData.deptSelect = data.addGroupData.allDeptInfo.map((dept: any) => {
            return <Option key={dept.dno} >{dept.dname}</Option>
        })
        setData({ ...data })
    } else {
        message.error('获取部门信息失败')
    }
}
// 获取员工
export const getEmployeInfo = async (data: addGroupDataInit, setData: Function) => {
    const res: any = await department.reqGetAllEmploye()
    if (res.code === 200) {
        res.employeInfo.map((employe: any) => {
            const eData = {
                key: employe.key,
                title: employe.label,
                description: `${employe.label}---${employe.key}`,
                chosen: false
            };
            data.addGroupData.employeData.push(eData)

        })
        setData({ ...data })
    } else {
        message.error('获取员工信息失败')
    }
}

// 最终提交
export const addGroup = async (data: addGroupDataInit, setData: Function, confirmData: object) => {
    const res: any = await department.reqAddGroup(confirmData)
    if (res.code === 200) {
        message.success('添加小组成功！')
        data.addGroupData.active++
        setData({ ...data })
        return true
    } else {
        message.error('添加小组失败')
        return false
    }

}

// 添加部门
export const addDepartment = async (data: object) => {
    const res: any = await department.reqAddDepartment(data)
    if (res.code === 200) {
        return true
    } else {
        message.error('添加部门失败!')
        return false
    }

}

// 删除部门相关
interface deleteDepartmentType {
    allDept: []
    tableData: Array<any>
}
export class delDepartmentInit {
    initData: deleteDepartmentType = {
        allDept: [],
        tableData: [],
    }
}
// 获取部门信息
export const getDept = async (data: delDepartmentInit, setData: Function) => {
    const res: any = await department.reqAllDept()
    if (res.code === 200) {
        // 遍历团队  把团队添加到所属部门
        res.deptInfo.forEach((item: any, index: number) => {
            // 给每个部门定义一个children数组
            item.children = []
            // 遍历所有子小组
            res.groupInfo.forEach((child: any) => {
                // 如果符合条件就添加进去
                if (item.dno === child.deptno) {
                    item.children.push(child)
                }
            })
        })
        data.initData.allDept = res.deptInfo
        data.initData.tableData = data.initData.allDept.map((dept: any) => {
            return {
                key: dept.dno,
                dno: dept.dno,
                avatar: dept.avatar,
                dname: dept.dname,
                count: dept.count,
                childrenCount: dept.children.length,
                childrenData: dept.children
            }
        })
        setData({ ...data })
    } else {
        message.error('获取部门信息失败')
    }

}


// 解散小组
export const delGroup = async (data: object) => {
    const res: any = await department.delGroup(data)
    if (res.code === 200) {
        message.success('解散小组成功！')

        return true
    } else {
        message.error('解散小组失败')
        return false

    }
}

// 解散部门
export const confirmDelDepartment = async (data: object) => {
    const res: any = await department.delDept(data)
    if (res.code === 200) {
        message.success('解散小组成功！')
        return true
    } else {
        return false
        message.error('解散小组失败!')
    }
}