import { FC, useState, useEffect } from 'react'
import Header from '../../../component/Header'
import { Button, Card, Form, Modal, Pagination, Select, Tag } from 'antd'
import Table, { ColumnsType } from 'antd/lib/table';
import { EditOutlined, CloseOutlined, CheckOutlined, InfoOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons'
import { employeLeaveInit, getEmployeLeaveData } from '../../../type/attendance';
// 引入富文本编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
const Index: FC = () => {
    // 表格行
    const columns: ColumnsType<any> = [
        {
            title: '请假编号',
            dataIndex: 'leaveNumber',
            align: 'center'
        },
        {
            title: '请假缘由',
            dataIndex: 'whyLeave',
            align: 'center'
        },
        {
            title: '请假时长',
            dataIndex: 'leaveLong',
            align: 'center'
        },
        {
            title: '员工号',
            dataIndex: 'employeno',
            align: 'center'
        },
        {
            title: '员工名',
            dataIndex: 'employename',
            align: 'center'
        },
        {
            title: '小组号',
            dataIndex: 'deptid',
            align: 'center'
        },
        {
            title: '团队号',
            dataIndex: 'dno',
            align: 'center'
        },
        {
            title: '审核回复',
            dataIndex: 'reply',
            align: 'center',
            render: (_, record: any,) => {
                return <span className='reply' dangerouslySetInnerHTML={{ __html: record.reply }}></span>
            },
        },
        {
            title: '申请时间',
            dataIndex: 'leaveWhen',
            align: 'center'
        },
        {
            title: '审核状态',
            dataIndex: 'verfiyState',
            align: 'center',
            render: (_, record: any) => {
                return <>
                    <Tag color={record.verfiyState == "none" ? '#e6a23c' : (record.verfiyState === "true" ? '#00965e' : '#ff4d4f')}
                        icon={record.verfiyState == "none" ? <InfoOutlined /> : (record.verfiyState === "true" ? <CheckOutlined /> : <CloseOutlined />)} >{record.verfiyState == "none" ? '未核批' : (record.verfiyState === "true" ? '已通过' : '不通过')}</Tag>
                </>
            }
        },
        {
            title: '核审人',
            dataIndex: 'whichVerfiy',
            align: 'center',
            render: (_, record: any) => {
                return <Tag icon={<UserOutlined />}  >{record.whichVerfiy}</Tag>;
            }
        },
        {
            title: '操作',
            dataIndex: 'option',
            align: 'center',
            render: (_, record: any) =>
                <>
                    {
                        record.verfiyState == "none" ? <>
                            <Button style={{ height: "27px", borderRadius: "3px", border: "none", fontSize: "12px", marginRight: "15px" }} type="primary" icon={<EditOutlined />} onClick={() => verfiyLeave(record)}>去审批</Button>
                            <Button style={{ height: "27px", borderRadius: "3px", border: "none", fontSize: "12px" }} type="primary" danger icon={<CloseOutlined />} >不通过</Button>
                        </>
                            : <Button style={{ height: "27px", borderRadius: "3px", border: "none", fontSize: "12px", marginRight: "15px" }} type="primary" icon={<SearchOutlined />} >查看</Button>
                    }
                </>
        },
    ];
    const Option = Select.Option;
    // 初始化数据
    const [data, setData] = useState(new employeLeaveInit())
    // 审批modal
    const [showVerfiy, setShowVerfiy] = useState(false);
    // 表单
    const [verfiyForm] = Form.useForm()
    // 回复
    const [reply, setReply] = useState(null);
    // 富文本
    const [content, setContent] = useState(BraftEditor.createEditorState(null))

    //富选框参数
    const controls: any = ['undo', 'redo', 'separator',
        'font-size', 'line-height', 'letter-spacing', 'separator',
        'text-color', 'blod', 'italic', 'underline', 'strike-through', 'separator',
        'superscript', 'subscript', 'remove-styles', 'emoji', 'separator', 'text-indent', 'text-align', 'separator',
        'headings', 'list-ul', 'list-ol', 'blockquote', 'code', 'separator',
        'link', 'separator', 'hr', 'separator',
        'clear', 'separator',
    ]
    useEffect(() => {
        getEmployeData();
        setContent(BraftEditor.createEditorState(null))
    }, [])
    // 获取请假数据
    const getEmployeData = () => {
        getEmployeLeaveData(data, setData)
    }
    // 修改分页器时
    const changePage = (page: number, pageSize: number) => {
        data.employeLeave.page = page;
        data.employeLeave.size = pageSize;
        getEmployeData();
    }
    // 点击审批
    const verfiyLeave = (record: any) => {
        setShowVerfiy(true)
        data.employeLeave.editLeaveData = record;
    }
    const verfiyOk = () => {
        const saveText = content.toHTML();
        // 发请求
        console.log(data.employeLeave.editLeaveData);

    }
    const verfiyCancel = () => {
        setShowVerfiy(false)
        verfiyForm.resetFields()
    }
    return (
        <div style={{ margin: "30px" }}>
            <Header title='员工请假审批' explain='对提交请假申请的员工请求进行审核是否通过 并作出回复' />
            <br />
            <Card>
                <div className='tableClass'>
                    <Table pagination={false} columns={columns} rowKey={(record) => record.leaveNumber} bordered dataSource={data.employeLeave.employeLeaveData} />
                </div>
                <br />
                <div style={{ float: "right" }}>
                    <Pagination
                        total={data.employeLeave.count}
                        pageSizeOptions={[8, 10, 15]}
                        defaultPageSize={8}
                        showTotal={(total) => `共 ${total} 条请假申请`}
                        showSizeChanger
                        showQuickJumper
                        onChange={changePage}
                    />
                </div>
            </Card >
            <Modal open={showVerfiy} title="假条审批" closable onOk={verfiyOk} width="1400px" onCancel={verfiyCancel}>
                <Form form={verfiyForm} labelCol={{ span: 4 }}
                    wrapperCol={{ span: 19 }}>
                    <Form.Item initialValue={"true"} name="state" label="是否通过" labelCol={{ span: 4 }}
                        wrapperCol={{ span: 4 }}>
                        <Select size='large'>
                            <Option key="true">通过</Option>
                            <Option key="false">不通过</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="reason" label="回复" labelCol={{ span: 4 }}
                        wrapperCol={{ span: 19 }}>
                        <div style={{ border: "1px solid #d9d9d9" }}>
                            <BraftEditor
                                controls={controls}
                                value={content}
                                onChange={(editorState) => { setContent(editorState) }}
                            />

                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </div >
    )

}
export default Index