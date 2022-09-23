import React, { useState, useEffect, useRef } from 'react'
import { Avatar, Button, Card, Input, message, Modal, Table } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { ColumnsType } from 'antd/lib/table';
import { delDepartmentInit, getDept, confirmDelDepartment } from '../../../../../type/department';
import './index.less'
interface Props {
    change: Function
}
export default function ShowDepartment(props: Props) {
    const [data, setData] = useState(new delDepartmentInit())
    const confirmDelInput: React.Ref<any> = useRef(null)

    useEffect(() => {
        getDept(data, setData)
    }, [])

    // 点击解散小组
    const ToDelGroup = (record: any) => {
        props.change(true, record)
    }

    const showFinalConfrim = (record: any) => {
        confirm({
            width: 500,
            icon: <DeleteOutlined style={{ color: "red" }} />,
            okText: "确认解散",
            cancelText: "取消解散",
            okButtonProps: { className: "confirmDelDepartment", },
            title: "再次确认",
            content: (
                <>
                    <p>请输入<span style={{ color: "red" }}>确认解散</span>以解散部门</p>
                    <Input ref={confirmDelInput} placeholder='请输入确认解散' required />
                </>
            ),
            async onOk() {
                if (confirmDelInput.current && confirmDelInput.current.input.value.trim() === "确认解散") {
                    const success = await confirmDelDepartment({
                        children: record.childrenData,
                        dno: record.dno
                    })
                    if (success) {
                        getDept(data, setData)
                    }


                } else {
                    message.warn('请输入确认解散以解散部门')
                    showFinalConfrim(record)

                }

            }
        })
    }
    const { confirm } = Modal
    // 解散部门
    const delDepartment = (record: any) => {
        confirm({
            width: 500,
            icon: <DeleteOutlined style={{ color: "red" }} />,
            content: (
                <span>部门还有<span style={{ color: "red" }}>{record.childrenCount}个小组,</span>共<span style={{ color: "red" }}>{record.count}人</span>,是否坚持解散！</span>
            ),
            okText: "确认解散",
            cancelText: "取消解散",
            okButtonProps: { className: "confirmDelDepartment" },
            title: "风险操作",
            onOk() {
                showFinalConfrim(record)
            }
        })
    }


    interface DataType {
        key: React.Key;
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
                        <Button style={{ marginRight: "20px", borderRadius: "3px", height: "30px", fontSize: "12px" }} icon={<DeleteOutlined />} type="primary" onClick={() => ToDelGroup(record)}>解散小组</Button>
                        <Button style={{ borderRadius: "3px", height: "30px", fontSize: "12px" }} icon={<DeleteOutlined />} danger type='primary' onClick={() => delDepartment(record)}>解散部门</Button>
                    </>
                )
            }
        },
    ];

    return (
        <div>
            <Card>
                <Table columns={columns} bordered dataSource={data.initData.tableData} />
            </Card>
        </div>
    )

}