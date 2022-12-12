
import { employe } from '../api';

import { message, Select } from 'antd'
import moment from 'moment';
const { Option } = Select;
export interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}
type selectType = {
    [propName: string]: any
}
// 收集表单数据
interface employeInfoData {
    selectForm: {
        dno: number | string,//部门号
        deptId: number | string,//部门团队id
        page: number | string,
        size: number | string
    }
    deptInfo: selectType,//所有部门信息
    groupInfo: selectType,//根据部门号获取的所有团队
    employeInfo: selectType//根据团队号获取的全部员工信息,
    deptSelect: [],//部门选择列表
    groupSelect: [],//小组选择列表
    provinceSelect: any,//省份选择列表
    citySelect: any,//地市选择列表
    employeCount: number | string,//小组员工总人数
    tableDatas: DataType[],
    addOrUpdateForm: {
        employno: number,
        dno: string | number,//部门号
        deptno: string | number,//团队号
        employname: string,
        deptInfo: selectType,//所有部门信息
        groupInfo: selectType,//根据部门号获取的所有团队
        deptSelect: [],//部门选择列表
        groupSelect: [],//小组选择列表
        employage: string,
        employsex: string,
        employidcard: string,
        employphone: string,
        entryDate: string,
        employemail: string,
        employaddress: string,
        employsalary: string,
        province: string,  // 所属省（直辖市）
        city: string,    // 所属市 
        isUpdate: boolean,
        keyword: string | number,
    },
    routeDno: any,
    routeDeptId: any,
    provinceListAll: [],//全国的省
    cityListAll: [],//全国地市
}
export class employeInfoDataInit {
    initData: employeInfoData = {
        selectForm: {
            dno: '',
            deptId: '',
            page: 1,
            size: 8,
        },
        deptInfo: [],
        groupInfo: [],
        employeInfo: [],
        deptSelect: [],//部门选择列表
        groupSelect: [],//小组选择列表
        provinceSelect: [],//省份选择列表
        citySelect: [],//地市选择列表
        employeCount: 1,
        tableDatas: [],
        addOrUpdateForm: {
            employno: 0,
            dno: 0,//部门号
            deptno: 0,//团队号
            employname: '',
            deptInfo: [],//所有部门信息
            groupInfo: [],//根据部门号获取的所有团队
            deptSelect: [],//部门选择列表
            groupSelect: [],//小组选择列表
            employage: '',
            employsex: '',
            employidcard: '',
            employphone: '',
            entryDate: '',
            employemail: '',
            employaddress: '',
            employsalary: '',
            province: '',  // 所属省（直辖市）
            city: '',     // 所属市 
            isUpdate: false,
            keyword: ''
        },
        routeDno: 1,
        routeDeptId: undefined,
        provinceListAll: [],//全国的省
        cityListAll: [],//全国地市

    }
}
// 部门信息类型
type deptOrGroupInfo = {
    dno: string | number,
    dname: string,
    id: string | number,
    deptno: string | number,
    deptname: string | number,
    [propName: string]: any
}
type employeInfo = {
    deptno: number | string,
    employno: number | string,
    employname: string,
    employage: string,
    employsex: string,
    employidcard: number | string,
    employphone: number | string,
    entryDate: number | string,
    employemail: string,
    employaddress: string,
    employsalary: number | string,
    isuse: string,
    deptname: string,
    dno: number | string,
}

// 获取全部部门的方法
export const getAllDept = async (data: employeInfoDataInit, setData: Function) => {
    const res: any = await employe.reqAllDept()
    if (res.code === 200) {
        data.initData.deptInfo = res.deptInfo
        data.initData.deptSelect = data.initData.deptInfo.map((dept: deptOrGroupInfo) => {
            return <Option key={dept.dno}>{dept.dname}</Option>
        })
        setData({ ...data })
    } else {
        message.error('请求出错请稍后重试')
    }
}
// 选择部门后获取小组
export const getGroup = async (data: employeInfoDataInit, setData: Function) => {
    const res: any = await employe.reqGetDeptByDno(data.initData.selectForm)
    if (res.code === 200) {
        data.initData.groupInfo = res.groupInfo;
        data.initData.groupSelect = data.initData.groupInfo.map((group: deptOrGroupInfo) => {
            return <Option key={group.id}>{group.deptname}</Option>
        })
        setData({ ...data })
    }
    else {
        message.error('请求出错请稍后重试')
    }
}
// 搜索员工
export const searchEmployeInfo = async (data: employeInfoDataInit, keyword: string | number, setData: Function) => {
    const searchData = {
        keyword,
        page: data.initData.selectForm.page,
        size: data.initData.selectForm.size
    }
    const res: any = await employe.reqSearchEmploye(searchData)
    if (res.code === 200) {
        data.initData.employeInfo = res.employeInfo;
        data.initData.employeCount = res.count
        setData({ ...data })
        data.initData.tableDatas = data.initData.employeInfo.map((employe: employeInfo) => {
            return {
                key: employe.employno,
                deptno: employe.deptno,
                employno: employe.employno,
                employname: employe.employname,
                employage: employe.employage,
                employsex: employe.employsex,
                employidcard: employe.employidcard,
                employphone: employe.employphone,
                entryDate: employe.entryDate,
                employemail: employe.employemail,
                employaddress: employe.employaddress,
                employsalary: employe.employsalary,
                deptname: employe.deptname
            }
        })
    } else {
        message.error('获取员工信息失败')
    }

}
// 选择小组后获取员工
export const getEmploye = async (data: employeInfoDataInit, setData: Function) => {
    const { keyword } = data.initData.addOrUpdateForm
    if (keyword !== '') {
        searchEmployeInfo(data, keyword, setData)
    } else {
        const res: any = await employe.reqGetGroupEmploye(data.initData.selectForm)
        if (res.code === 200) {
            data.initData.employeInfo = res.employeInfo;
            data.initData.employeCount = res.count
            setData({ ...data })
            data.initData.tableDatas = data.initData.employeInfo.map((employe: employeInfo) => {
                return {
                    key: employe.employno,
                    deptno: employe.deptno,
                    employno: employe.employno,
                    employname: employe.employname,
                    employage: employe.employage,
                    employsex: employe.employsex,
                    employidcard: employe.employidcard,
                    employphone: employe.employphone,
                    entryDate: employe.entryDate,
                    employemail: employe.employemail,
                    employaddress: employe.employaddress,
                    employsalary: employe.employsalary,
                    deptname: employe.deptname
                }
            })
        }
        else {
            message.error('请求出错请稍后重试')
        }
    }

}
// 获取全国的省市县 （返回结果大概3万行 不能暴力遍历）
export const getAllProvinceAndCityList = (data: employeInfoDataInit, setData: Function) => {
    employe.reqGetAllProvinceAndAllCity().then((results: any) => {
        let res: any = results;
        if (res.code === 200) {
            // 省份赋值
            data.initData.provinceListAll = res.districts[0].districts;
            data.initData.provinceSelect = data.initData.provinceListAll.map((province: any) => {
                return <Option key={province.name}>{province.name}</Option>
            })
        }
        setData({ ...data })
    });
}
// 地市赋值
export const getCityList = (data: employeInfoDataInit, setData: Function, pname: string) => {
    // city赋值
    data.initData.cityListAll = data.initData.provinceListAll.filter((item: any) => item.name === pname)[0]['districts']
    data.initData.citySelect = data.initData.cityListAll.map((city: any) => {
        return <Option key={city.name}>{city.name}</Option>
    })
    setData({ ...data })
}
// 点击添加或修改员工 把选择部门赋值
export const employeSelect = (data: employeInfoDataInit, setData: Function) => {
    data.initData.addOrUpdateForm.dno = data.initData.selectForm.dno
    data.initData.addOrUpdateForm.deptno = data.initData.selectForm.deptId
    data.initData.addOrUpdateForm.deptInfo = data.initData.deptInfo
    data.initData.addOrUpdateForm.groupInfo = data.initData.groupInfo;
    data.initData.addOrUpdateForm.deptSelect = data.initData.addOrUpdateForm.deptInfo.map((dept: any) => {
        return <Option key={dept.dno}>{dept.dname}</Option>
    })
    data.initData.addOrUpdateForm.groupSelect = data.initData.addOrUpdateForm.groupInfo.map((group: deptOrGroupInfo) => {
        return <Option key={group.id}>{group.deptname}</Option>
    })
    setData({ ...data })
}
// 选择了部门后获取新的小组
export const changeAddOrUpdateSelect = async (data: employeInfoDataInit, setData: Function) => {
    const res: any = await employe.reqGetDeptByDno(data.initData.addOrUpdateForm)
    if (res.code === 200) {
        data.initData.addOrUpdateForm.groupInfo = res.groupInfo;
        data.initData.addOrUpdateForm.groupSelect = data.initData.addOrUpdateForm.groupInfo.map((group: deptOrGroupInfo) => {
            return <Option key={group.id}>{group.deptname}</Option>
        })
        setData({ ...data })
    }
    else {
        message.error('请求出错请稍后重试')
    }
}

// 添加或修改员工
export const cofimAddOrUpdate = async (data: employeInfoDataInit) => {
    if (data.initData.addOrUpdateForm.isUpdate) {
        const updateObj={
            employno:data.initData.addOrUpdateForm.employno,
            deptno:data.initData.addOrUpdateForm.deptno,
            "employname": data.initData.addOrUpdateForm.employname,
            "employage": data.initData.addOrUpdateForm.employage,
            "employsex":data.initData.addOrUpdateForm.employsex,
            "employidcard":data.initData.addOrUpdateForm.employidcard,
            "employphone": data.initData.addOrUpdateForm.employphone,
            "entryDate": data.initData.addOrUpdateForm.entryDate,
            "employemail": data.initData.addOrUpdateForm.employemail,
            "employaddress":  data.initData.addOrUpdateForm.employaddress,
            "employsalary": data.initData.addOrUpdateForm.employsalary,
            "isUpdate": false,
            "changeGroup": false,
            "old":data.initData.selectForm.deptId,

        }
        const res: any = await employe.reqAddOrUpdateEmploye({ default: data.initData.addOrUpdateForm, old: data.initData.selectForm.deptId, changeGroup: false })
        if (res.code === 200) {
            message.success('修改员工成功！')
        } else {
            message.error('修改员工失败！')
        }
    } else {
        const addObj={
            deptno:data.initData.addOrUpdateForm.deptno,
            "employname": data.initData.addOrUpdateForm.employname,
            "employage": data.initData.addOrUpdateForm.employage,
            "employsex":data.initData.addOrUpdateForm.employsex,
            "employidcard":data.initData.addOrUpdateForm.employidcard,
            "employphone": data.initData.addOrUpdateForm.employphone,
            "entryDate": data.initData.addOrUpdateForm.entryDate,
            "employemail": data.initData.addOrUpdateForm.employemail,
            "employaddress":  data.initData.addOrUpdateForm.employaddress,
            "employsalary": data.initData.addOrUpdateForm.employsalary,
            "isUpdate": false,
            "changeGroup": false
        }
        console.log(addObj);
        
        const res: any = await employe.reqAddOrUpdateEmploye({ default: data.initData.addOrUpdateForm, old: data.initData.selectForm.deptId, changeGroup: false })
        if (res.code === 200) {
            message.success('添加员工成功！')
        } else {
            message.error('添加员工失败！')
        }
    }

}
// 点击修改员工
export const editEmploye = (key: any, data: employeInfoDataInit, setData: Function, setOpen: Function, addOrUpdateForm: any) => {
    //    设置要修改的员工号
    data.initData.addOrUpdateForm.employno = key.employno
    setData({ ...data })
    employeSelect(data, setData)
    // 点击修改时筛选出默认选中的部门和团队 在form的initValues设置了
    data.initData.addOrUpdateForm.isUpdate = true
    addOrUpdateForm.setFieldsValue({
        deptno: data.initData.selectForm.deptId,
        dno: data.initData.selectForm.dno,
        employage: key.employage,
        employemail: key.employemail,
        employidcard: key.employidcard,
        employname: key.employname,
        employphone: key.employphone,
        employsalary: key.employsalary,
        employsex: key.employsex,
        entryDate: moment(key.entryDate),

    })
    setOpen(true)
  
}

// 删除员工
export const deleteEmploye = async (employno: number | string, deptno: number | string, user: string) => {
    console.log({ employno, deptno, user });

    const res: any = await employe.reqDeleteEmploye({ employno, deptno, user })
    if (res.code === 200) {
        message.success('删除员工成功！')
        return true

    } else {
        message.error('删除员工失败！')
        return false
    }
}

