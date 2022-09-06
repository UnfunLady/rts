import type { ColumnsType } from 'antd/es/table';
import { employe } from '../api';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { message, Select, Button } from 'antd'
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
        dno: number | string | undefined,//部门号
        deptId: number | string | undefined,//部门团队id
        page: number | string,
        size: number | string
    }
    deptInfo: selectType,//所有部门信息
    groupInfo: selectType,//根据部门号获取的所有团队
    employeInfo: selectType//根据团队号获取的全部员工信息,
    deptSelect: [],//部门选择列表
    groupSelect: [],//小组选择列表
    employeCount: number | string,//小组员工总人数
    tableDatas: DataType[],
    isUpdate: boolean

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
        employeCount: 1,
        tableDatas: [],
        isUpdate: false
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
// 表格行
export const columns: ColumnsType<DataType> = [
    {
        title: '团队',
        dataIndex: 'deptname',
        align: 'center'
    },
    {
        title: '员工号',
        dataIndex: 'employno',
        align: 'center'
    },
    {
        title: '员工名',
        dataIndex: 'employname',
        align: 'center'
    },
    {
        title: '年龄',
        dataIndex: 'employage',
        align: 'center'
    },
    {
        title: '性别',
        dataIndex: 'employsex',
        align: 'center'
    },
    {
        title: '身份证',
        dataIndex: 'employidcard',
        align: 'center'
    },
    {
        title: '电话',
        dataIndex: 'employphone',
        align: 'center'
    },
    {
        title: '入职日',
        dataIndex: 'entryDate',
        align: 'center'
    },
    {
        title: '邮箱',
        dataIndex: 'employemail',
        align: 'center'
    },
    {
        title: '地址',
        dataIndex: 'employaddress',
        align: 'center'
    },
    {
        title: '薪资',
        dataIndex: 'employsalary',
        align: 'center'
    },
    {
        title: '操作',
        dataIndex: 'option',
        align: 'center',
        render: (_, record: { key: React.Key }) =>
            <>
                <Button style={{ height: "27px", borderRadius: "3px", border: "none", fontSize: "12px" }} type="primary" icon={<EditOutlined />} onClick={() => editEmploye(record)}>修改</Button>
                <Button style={{ height: "27px", marginLeft: "15px", borderRadius: "3px", border: "none", fontSize: "12px" }} danger icon={<DeleteOutlined />} type='primary' >删除</Button>
            </>
    },
];
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
// 选择小组后获取员工
export const getEmploye = async (data: employeInfoDataInit, setData: Function) => {
    const res: any = await employe.reqGetGroupEmploye(data.initData.selectForm)
    if (res.code === 200) {
        data.initData.employeInfo = res.employeInfo;
        data.initData.employeCount = res.count
        setData({ ...data })
        data.initData.tableDatas = data.initData.employeInfo.map((employe: employeInfo) => {
            return {
                key: employe.employno,
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
const editEmploye = (key: any) => {
    console.log(key);

}