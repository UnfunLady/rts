import React, { useEffect, FC, useState } from 'react'
import PubSub from 'pubsub-js'
import { Table, Card, Button, Tag } from 'antd'
import { FormOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table';
import { getGroupByEdit, editGroupInit } from '../../../../../../type/department'
import { useNavigate } from 'react-router-dom';
interface Props {
    change: Function,
}
const ShowGroupView = (props: Props) => {
    interface DataType {
        key: React.Key;
    }
    const [data, setData] = useState(new editGroupInit())
    useEffect(() => {
        PubSub.subscribe('editDno', (msg: any, dno: number | string) => {
            getGroupByEdit(data, setData, dno)
        })

    })
    // 编辑小组
    const editGroupInfo = (record: any) => {
        PubSub.publish('editGroupInfo', record)
        props.change(true)
    }
    // 表格行
    const columns: ColumnsType<DataType> = [
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
            title: '所在城市',
            dataIndex: 'location',
            align: 'center',
            render: (_, record: any) => {
                return <Tag color='#285b90'>{record.location}</Tag>
            }
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
                        <Button style={{ borderRadius: "3px", height: "30px", fontSize: "12px" }} icon={<FormOutlined />} type='primary' onClick={() => editGroupInfo(record)}>编辑信息</Button>
                    </>
                )
            }
        },
    ];
    const navigate = useNavigate()
    const changeEditStatus = () => {
        navigate('/homeView/department')
    }
    return (

        <div>
            <Card>
                <Button style={{ marginBottom: "30px" }} icon={<ArrowLeftOutlined />} type="primary" onClick={changeEditStatus}>返回</Button>
                <Table bordered pagination={false} columns={columns} dataSource={data.editGroupInitData.tableData} />
            </Card>
        </div>
    )

}
export default ShowGroupView