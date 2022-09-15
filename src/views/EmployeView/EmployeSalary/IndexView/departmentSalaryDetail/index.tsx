import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Table, Card, Tag, Slider, Switch } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { initDepartmentData, getEmployeSalaryInfo, updateEmployeSalaryInfo } from '../../../../../type/employeSalary';
import Header from '../../../../../component/Header';
interface DataType {
    key: string,
    id: string | number
}
//接受路由传递的信息
interface deptInfoData {
    dno: string | number,
    [propName: string]: any,
}

const DepartmentSalaryDetail: FC = () => {
    const [data, setData] = useState(new initDepartmentData())
    const location: any = useLocation()
    // 防抖函数
    // const deboundce = (fn: Function, wait: number = 800) => {
    //     let timer: any;
    //     return function () {
    //         clearTimeout(timer);
    //         timer = setTimeout(function () {
    //             // console.log(this)  //=>这里面的this指向window，也就是前面的count那的this是指向window
    //             //但是防抖函数的this应该是指向container
    //             fn();
    //         }, wait)
    //     }
    // }

    useEffect(() => {
        if (location.state) {
            const deptInfo: deptInfoData = JSON.parse(location.state.deptInfo);
            data.initDepartmentData.employeSalaryForm.dno = deptInfo.dno
            getEmployeSalaryInfo(data, setData)
        } else {
            console.log(2);

        }
    }, [])

    const columns: ColumnsType<DataType> = [
        {
            title: '团队号',
            dataIndex: 'deptid',
            key: 'deptid',
            align: 'center',
        },
        {
            title: '团队名',
            dataIndex: 'deptname',
            key: 'deptname',
            align: 'center',
        },
        {
            title: '团队位置',
            dataIndex: 'location',
            key: 'location',
            align: 'center',
            render: (_, record: any) => {
                return (
                    <Tag color="green" key={record.key}>
                        {record.location}
                    </Tag>
                )
            }
        },
        {
            title: '团队人数',
            dataIndex: 'count',
            key: 'count',
            align: 'center',
        },
        {
            title: '社保',
            dataIndex: 'socialSub',
            key: 'socialSub',
            align: 'center',
        },
        {
            title: '房补',
            dataIndex: 'houseSub',
            key: 'houseSub',
            align: 'center',
        },
        {
            title: '餐补',
            dataIndex: 'eatSub',
            key: 'eatSub',
            align: 'center',
        },
        {
            title: '交通补',
            dataIndex: 'transSub',

            align: 'center',
        },
        {
            title: '高温补',
            dataIndex: 'hotSub',
            key: 'hotSub',
            align: 'center',
        },
        {
            title: '绩效比例%(1000元)',
            dataIndex: 'performance',
            key: 'performance',
            align: 'center',
            render: (_, record: any) => {
                return (
                    <Slider
                        disabled={data.initDepartmentData.employeSalaryForm.isLoading}
                        min={1}
                        max={100}
                        defaultValue={record.performance}
                        onAfterChange={(newValue) => changePerformance(newValue, record)}
                    />
                )
            }
        },
        {
            title: '是否提供补助',
            dataIndex: 'isuse',
            key: 'isuse',
            align: 'center',
            render: (_, record: any) => {
                return (
                    <Switch loading={data.initDepartmentData.employeSalaryForm.isLoading} onChange={(newValue) => changeIsuse(newValue, record)} checkedChildren="补助" checked={record.isuse === 'true' ? true : false} unCheckedChildren="不补助" defaultChecked />
                )
            }
        },
    ];
    // 修改补贴
    const changeIsuse = (newValue: boolean, record: any) => {
        data.initDepartmentData.employeSalaryForm.editForm.deptid = record.deptid;
        data.initDepartmentData.employeSalaryForm.editForm.isuse = newValue;
        setData({ ...data })
        updateEmployeSalaryInfo(data, setData)
        getEmployeSalaryInfo(data, setData)

    }




    // 修改绩效
    const changePerformance = (newValue: string | number, record: any) => {
        if (!data.initDepartmentData.employeSalaryForm.isLoading) {
            data.initDepartmentData.employeSalaryForm.performance.deptid = record.deptid
            data.initDepartmentData.employeSalaryForm.performance.performance = newValue
            data.initDepartmentData.employeSalaryForm.isLoading = true;
            setData({ ...data })
            //修改绩效
            updateEmployeSalaryInfo(data, setData)
        }
    }



    return (
        <div className="departmentSalaryDetail" style={{ margin: "20px" }}>
            <Header title='温馨提示' explain='这是针对整个小团队的明细,如想修改具体某位员工的数据请在详细信息处修改' />
            <Card style={{ marginTop: "40px" }}>
                <Table pagination={false} columns={columns} rowKey={record => record.key} bordered dataSource={data.initDepartmentData.tableDatas} />
            </Card>
        </div>
    );
}



export default DepartmentSalaryDetail;