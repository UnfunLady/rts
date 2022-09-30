import { Button, Card, message, Pagination, Popconfirm, Tag } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import React, { useEffect, useState } from 'react'
import Header from '../../component/Header'
import { UndoOutlined, MoneyCollectOutlined, RotateLeftOutlined, HistoryOutlined, UserOutlined } from '@ant-design/icons'
import { recoverInit, getAllRecoverEmployeByPage, confirmRecoverEmploye } from '../../type/recoverEmploye'
import Table from 'antd/es/table'
export default function RecoverEmploye() {
    interface dataType {
        key: React.Key
    }

    const [data, setData] = useState(new recoverInit())
    useEffect(() => {
        // 获取全部信息
        getAllRecoverEmployeByPage(data, setData)
    }, [])
    // 修改页码
    const changePagination = (page: number, size: number) => {
        data.recoverData.page = page
        data.recoverData.size = size
        // 获取全部信息
        getAllRecoverEmployeByPage(data, setData)
    }
    // 恢复员工
    const confirmRecover = async (record: any) => {
        const reSuccess = await confirmRecoverEmploye(record)
        if (reSuccess) {
            // 获取全部信息
            getAllRecoverEmployeByPage(data, setData)
        } else {
            message.error('操作出现异常,恢复失败')
        }
    }

    // 表格行
    const columns: ColumnsType<dataType> = [
        {
            title: '团队号',
            dataIndex: 'dno',
            align: 'center'
        },
        {
            title: '部门号',
            dataIndex: 'deptno',
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
            title: '薪资(元)',
            dataIndex: 'employsalary',
            align: 'center',
            render: (_, record: any) => {
                return <Tag style={{ minWidth: "80px" }} icon={<MoneyCollectOutlined />} color='processing'>{record.employsalary}</Tag>
            }
        },
        {
            title: '删除时间',
            dataIndex: 'confirmTime',
            align: 'center',
            render: (_, record: any) => {
                return <Tag icon={<HistoryOutlined />} color='processing'>{record.confirmTime}</Tag>
            }
        },
        {
            title: '删除人',
            dataIndex: 'whichDone',
            align: 'center',
            render: (_, record: any) => {
                return <Tag icon={<UserOutlined />} color='red'>{record.whichDone}</Tag>
            }
        },
        {
            title: '操作',
            dataIndex: 'option',
            align: 'center',
            render: (_, record: { key: React.Key }) =>
                <>
                    <Popconfirm icon={<RotateLeftOutlined style={{ color: "green" }} />} title={`您确定要恢复被删除员工吗？`} cancelText="取消恢复" okText="确认恢复" onConfirm={() => confirmRecover(record)}>
                        <Button style={{ height: "27px", marginLeft: "15px", borderRadius: "3px", border: "none", fontSize: "12px" }} icon={<UndoOutlined />} type='primary'>恢复员工</Button>
                    </Popconfirm>
                </>
        },
    ];
    return (
        <div style={{ margin: "30px" }}>
            <Header title='恢复删除的员工' explain='恢复被失误删除的员工到原来的部门团队' />
            <br />
            <Card>
                <Table size='middle' pagination={false} columns={columns} dataSource={data.recoverData.tableData} bordered />
                <br />
                <Pagination
                    style={{ float: "right" }}
                    total={data.recoverData.count}
                    showTotal={total => `共 ${total} 人`}
                    onChange={changePagination}
                    showSizeChanger
                    pageSizeOptions={[8, 10, 15]}
                    defaultPageSize={8}
                    defaultCurrent={1}
                />
            </Card>

        </div>
    )

}