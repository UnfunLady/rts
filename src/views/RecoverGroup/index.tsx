import { Button, Card, Popconfirm, Tag, Table, Pagination } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { useEffect, useState } from 'react'
import Header from '../../component/Header'
import { getAllRecoverGroupByPage, reqRecoverGroup } from '../../type/recoverGroup'
import { RotateLeftOutlined, UserOutlined, UndoOutlined } from '@ant-design/icons'
import { recoverInit } from '../../type/recoverGroup'
export default function RecoverGroup() {
    interface dataType {
        key: React.Key
    }
    const [data, setData] = useState(new recoverInit())
    useEffect(() => {
        // 获取全部信息
        getAllRecoverGroupByPage(data, setData)
    }, [])
    // 修改页码
    const changePagination = (page: number, size: number) => {
        data.recoverData.page = page
        data.recoverData.size = size
        // 获取全部信息
        getAllRecoverGroupByPage(data, setData)
    }
    // 恢复小组
    const confirmRecover = async (record: any) => {
        const success = await reqRecoverGroup(record)
        if (success) {
            getAllRecoverGroupByPage(data, setData)
        }
    }

    // 表格行
    const columns: ColumnsType<dataType> = [
        {
            title: '部门号',
            dataIndex: 'deptno',
            align: 'center'
        },
        {
            title: '小组号',
            dataIndex: 'id',
            align: 'center'
        },
        {
            title: '小组名',
            dataIndex: 'deptname',
            align: 'center'
        },
        {
            title: '所在地',
            dataIndex: 'location',
            align: 'center'
        },
        {
            title: '小组剩余人数',
            dataIndex: 'count',
            align: 'center'
        },
        {
            title: '删除时间',
            dataIndex: 'confirmTime',
            align: 'center',
            render: (_, record: any) => {
                return <Tag color='processing'>{record.confirmTime}</Tag>
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
                    <Popconfirm icon={<RotateLeftOutlined style={{ color: "green" }} />} title={`您确定要恢复被删除的小组吗？`} cancelText="取消恢复" okText="确认恢复" onConfirm={() => confirmRecover(record)}>
                        <Button style={{ height: "27px", marginLeft: "15px", borderRadius: "3px", border: "none", fontSize: "12px" }} icon={<UndoOutlined />} type='primary'>恢复小组</Button>
                    </Popconfirm>
                </>
        },
    ];
    return (

        <div style={{ margin: "30px" }}>
            <Header title='恢复解散的小组' explain='解散的小组员工无法恢复' />
            <br />
            <Card>
                <Table columns={columns} pagination={false} bordered size='middle' dataSource={data.recoverData.tableData} locale={{ emptyText: "目前暂无被删除的小组" }} />
                <br />
                <Pagination
                    style={{ float: "right" }}
                    total={data.recoverData.count}
                    showTotal={total => `共 ${total} 个小组`}
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