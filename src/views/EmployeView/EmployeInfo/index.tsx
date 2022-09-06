import React, { FC, useState, useEffect, useRef } from 'react';
import { SearchOutlined, PlusOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { columns, employeInfoDataInit, getEmploye, getAllDept, getGroup } from '../../../type/employeInfo'
import { Card, Select, Form, Button, Table, Input, Empty, Pagination, Modal, Radio, DatePicker } from 'antd';
import './index.less'
import moment from 'moment';
const EmployeInfo: FC = () => {
    // 初始化数据
    const [data, setData] = useState(new employeInfoDataInit())
    // 修改或添加员工model open
    const [open, setOpen] = useState(true);
    const showModal = () => {
        setOpen(true);
    };
    const hideModal = () => {
        setOpen(false);
    };
    // 日期格式
    const dateFormat = 'YYYY/MM/DD';
    // form的标签
    const selectForm: any = useRef()
    useEffect(() => {
        // 获取全部部门的方法
        getAllDept(data, setData)
    }, [])
    // 修改事件
    const handleDeptChange = (value: string | number) => {
        // 清空小组的值 需要给表单打ref和form.item的name
        selectForm.current.setFieldsValue({
            groupSelect: undefined
        })
        data.initData.selectForm.deptId = ''
        data.initData.selectForm.dno = value
        setData({ ...data })
        // 获取小组
        getGroup(data, setData)
    }
    // 选择小组同时获取学生
    const handleGroupChange = (value: string | number | undefined) => {
        data.initData.selectForm.deptId = value
        setData({ ...data })
        // 获取员工
        getEmploye(data, setData)
    }
    // 修改页码
    const pageChange = (page: number, size: number) => {
        data.initData.selectForm.page = page;
        data.initData.selectForm.size = size;
        setData({ ...data })
        // 发请求
        getEmploye(data, setData)
    }
    // 添加或修改员工
    const addOrUpdateEmploye = () => {

    }
    return (
        <div className="EmployeInfo" style={{ margin: "30px", }}>
            <Card style={{ boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.05)" }} >
                <Form ref={selectForm} name='basic' layout="inline">
                    <Form.Item label="部门名">
                        <Select size="large" placeholder="请选择部门" onChange={handleDeptChange} style={{ width: 230 }}>
                            {data.initData.deptSelect}
                        </Select>
                    </Form.Item>
                    <Form.Item label="所属团队" name="groupSelect">
                        <Select allowClear disabled={data.initData.selectForm.dno !== '' ? false : true} size="large" placeholder="请选择部门小组" onSelect={handleGroupChange} style={{ width: 230 }}>
                            {data.initData.groupSelect}
                        </Select>
                    </Form.Item>
                    <Form.Item label="查询" >
                        <div style={{ display: 'inline-block' }}>
                            <Input placeholder='请输入查询信息' size='large' style={{ width: 200 }} />
                            <Button style={{ marginLeft: '15px', borderRadius: '5px' }} type="primary" icon={<SearchOutlined />}>
                                搜索
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Card >
            <Card style={{ marginTop: "20px", boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.09)", display: data.initData.employeInfo.length > 0 ? "block" : 'none' }}>
                <div>
                    <Button size='large' style={{ marginBottom: '15px', borderRadius: '3px' }} type="primary" icon={<PlusOutlined />} onClick={addOrUpdateEmploye}>
                        添加员工
                    </Button>
                    <Table pagination={false} bordered={true} columns={columns} dataSource={data.initData.tableDatas} size="small" />
                </div>
            </Card>
            <Pagination
                style={{ marginTop: '15px', float: "right", display: data.initData.employeInfo.length > 0 ? "block" : 'none' }}
                total={data.initData.employeCount as number | undefined}
                showSizeChanger
                showQuickJumper
                showTotal={total => `Total ${total} items`}
                defaultPageSize={8}
                pageSizeOptions={[8, 10, 15]}
                onChange={pageChange}
            />
            <Empty
                style={{ display: data.initData.employeInfo.length > 0 ? "none" : 'block', marginTop: '100px' }}
                imageStyle={{
                    height: 60,

                }}
                description={
                    <span>
                        <h4 style={{ color: 'gray' }}>暂无数据 请选择查看</h4>
                    </span>
                }
            >
            </Empty>

            {/* 添加或修改员工 */}
            <Modal
                title={data.initData.isUpdate ? "修改员工" : "添加员工"}
                open={open}
                width={800}
                onOk={hideModal}
                onCancel={hideModal}
                okText={data.initData.isUpdate ? "确认修改" : "确认添加"}
                cancelText="取消操作"
                okButtonProps={{ icon: <CheckOutlined /> }}
                cancelButtonProps={{ icon: <CloseOutlined /> }}
            >
                <div>
                    <Form labelCol={{ span: 3 }} size="large" wrapperCol={{ span: 16 }} name='basic1' labelAlign='right'>
                        <Form.Item label="姓名">
                            <Input placeholder='请输入员工姓名' size='large' style={{ width: 320 }} />
                        </Form.Item>
                        <Form.Item label="性别">
                            <Radio.Group value={1}>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label="入职日期">
                            <DatePicker size='large' style={{ width: 250 }} defaultValue={moment('2022/01/01', dateFormat)} format={dateFormat} />
                        </Form.Item>

                    </Form>
                </div>
            </Modal >
        </div >
    );
}

export default EmployeInfo;