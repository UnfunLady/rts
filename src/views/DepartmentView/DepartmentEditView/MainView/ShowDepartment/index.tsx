import React, { useEffect, useState } from 'react'
import { FileTextOutlined, FormOutlined, SearchOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { departmentDataInit } from '../../../../../type/department'
import type { ColumnsType } from 'antd/es/table';
import { getAllDeptInfo } from '../../../../../type/department';
import { Avatar, Button, Card, Table, Tag } from 'antd'
import './index.less'
import { useNavigate } from 'react-router-dom';
export default function ShowDepartment() {
    interface DataType {
        key: React.Key;
    }
    const [data, setData] = useState(new departmentDataInit())
    useEffect(() => {
        getAllDeptInfo(data, setData)
    }, [])
    const navigate = useNavigate()
    // 查看团队下某个部门信息
    const moveGroupDetail = (record: any) => {
        console.log(record);
        navigate('/homeView/employeView/employeInfo', {
            state: {
                dno: record.dno,
                deptId: record.key
            }
        })
    }
    // 表格行
    const columns: ColumnsType<DataType> = [
        {
            title: '部门号',
            dataIndex: 'dno',
            align: 'center'
        },
        {
            title: '部门名',
            dataIndex: 'dname',
            align: 'center'
        },
        {
            title: '部门头像',
            align: 'center',
            render: (_, record: any) => {
                return <Avatar src={record.avatar} />
            }
        },
        {
            title: '操作',
            align: 'center',
            width: 400,
            render: (_, record: any) => {
                return (
                    <>
                        <Button style={{ marginRight: "20px", borderRadius: "3px", height: "30px", fontSize: "12px" }} icon={<FileTextOutlined />} type="default" >基本信息</Button>
                        <Button style={{ borderRadius: "3px", height: "30px", fontSize: "12px" }} icon={<FormOutlined />} type='primary'>编辑信息</Button>
                    </>
                )
            }
        },
    ];
    const childColums: ColumnsType<DataType> = [
        {
            title: '部门下团队号',
            dataIndex: 'key',
            align: 'center'
        },
        {
            title: '团队名',
            dataIndex: 'dname',
            align: 'center'
        },
        {
            title: '团队所在城市',
            dataIndex: 'location',
            align: 'center',
            render: (_, record: any) => {
                return <Tag icon={<EnvironmentOutlined />} color="#636ca5">
                    {record.location}
                </Tag>
            }
        },
        {
            title: '团队总人数',
            dataIndex: 'count',
            align: 'center'
        },
        {
            title: '操作',
            align: 'center',
            render: (_, record: any) => {
                return <Button type='primary' style={{ fontSize: "12px", height: "30px" }} icon={<SearchOutlined />} onClick={() => moveGroupDetail(record)}>查看信息</Button>
            }
        },
    ]


    return (
        <div>
            <Card>
                <Table
                    expandable={{
                        columnTitle: '详细信息',
                        columnWidth: 130,
                        expandedRowRender: (record: any, index) => (
                            <div style={{ marginTop: "10px" }}>
                                <h3 style={{ color: "#606266", fontWeight: "600", }} >部门细节</h3>
                                <span className='childDetailText' >部门号:<span className='sufixText'>{record.dno}</span> </span>
                                <span className='childDetailText' >部门名:<span className='sufixText'>{record.dname}</span></span>
                                <span className='childDetailText' >部门团队数:<span className='sufixText'>{record.groupCount}</span></span>
                                <span className='childDetailText' >部门总人数:<span className='sufixText'>{record.count}</span></span>
                                <span className='childDetailText' >部门职责:<span className='sufixText'>{record.explain}</span></span>
                                <Table bordered dataSource={data.departmentData.childrenTableDatas[index]} columns={childColums} key={record.key} style={{ margin: 0 }} />
                            </div>

                        ),
                        // rowExpandable: record => record.name !== 'Not Expandable',
                    }}
                    dataSource={data.departmentData.allTableDatas}
                    rowKey={record => record.key}
                    columns={columns}
                    bordered
                    size='small' />
            </Card>
        </div>
    )

}