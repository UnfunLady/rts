import React from 'react'
import { ArrowLeftOutlined, DeleteOutlined, DeliveredProcedureOutlined } from '@ant-design/icons'
import { Card, Button, Table, Tag, Popconfirm } from 'antd'
import { delGroup } from '../../../../../type/department';
import { ColumnsType } from 'antd/lib/table';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
interface Props {
    GroupInfo: any,
    change: Function
}

export default function DeleteGroupView(props: Props) {
    const navigate = useNavigate()
    const user = useSelector((state: any) => {
        return state.user.userList.userInfo.username
    })
    // 解散小组
    const confirmDel = async (record: any) => {
        const delData = {
            id: record.id,
            user: user
        }
        const success = await delGroup(delData)
        if (success) {
            props.change(false)
        }
    }
    // 迁移成员
    const toMoveEmploye = (record: any) => {
        navigate('/homeView/employeView/employeInfo', { state: { dno: record.dno, deptId: record.id } })
    }
    interface DataType {
        key: React.Key,
        location: string
    }
    // 表格行
    const columns: ColumnsType<DataType> = [
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
            title: '小组位置',
            dataIndex: 'location',
            align: 'center',
            render: (_, record) => {
                return <Tag color='#476080'>{record.location}</Tag>
            },
        },
        {
            title: '小组总人数',
            dataIndex: 'count',
            align: 'center'
        },
        {
            title: '操作',
            align: 'center',
            width: 400,
            render: (_, record: any) => {
                return (
                    <>
                        <Popconfirm
                            title={`该小组还有${record.count}人,是否解散该小组?`}
                            icon={<DeleteOutlined style={{ color: 'red' }} />}
                            okText="解散小组"
                            cancelText="取消操作"
                            onConfirm={() => confirmDel(record)}
                        >
                            <Button style={{ marginRight: "20px", borderRadius: "3px", height: "30px", fontSize: "12px" }} icon={<DeleteOutlined />} type="primary" danger >解散小组</Button>
                        </Popconfirm>
                        <Button style={{ borderRadius: "3px", height: "30px", fontSize: "12px" }} icon={<DeliveredProcedureOutlined />} type='primary' onClick={() => { toMoveEmploye(record) }}>迁移成员</Button>
                    </>
                )
            }
        },
    ];
    const dataSource = props.GroupInfo.childrenData.map((group: any) => {
        return {
            dno: props.GroupInfo.dno,
            key: group.id,
            id: group.id,
            deptname: group.deptname,
            location: group.location,
            count: group.count
        }
    })
    return (

        <div>
            <Card>
                <Button style={{ margin: "20px" }} type='primary' icon={<ArrowLeftOutlined />} onClick={() => props.change(false)}>返回</Button>

                <Table columns={columns} bordered dataSource={dataSource} />
            </Card>
        </div>
    )

}