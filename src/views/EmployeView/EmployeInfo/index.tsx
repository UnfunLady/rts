import React, { FC, useState, useEffect, useRef } from 'react';
import type { ColumnsType } from 'antd/es/table';

import { SearchOutlined, EditOutlined, DeleteOutlined, UserOutlined, SmileOutlined, IdcardOutlined, MoneyCollectOutlined, HomeOutlined, LayoutOutlined, MailOutlined, PhoneOutlined, PlusOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { employeInfoDataInit, getCityList, changeAddOrUpdateSelect, searchEmployeInfo, employeSelect, getEmploye, getAllDept, getGroup, deleteEmploye, getAllProvinceAndCityList, cofimAddOrUpdate, editEmploye } from '../../../type/employeInfo'
import { Card, Select, Form, Button, Table, Popconfirm, Input, Empty, Pagination, Modal, Radio, DatePicker, message } from 'antd';
import './index.less'
import { useLocation } from 'react-router-dom';
interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}

const EmployeInfo: FC = () => {
    // 初始化数据
    const [data, setData] = useState(new employeInfoDataInit())
    // 是否有路由参数
    const location: any = useLocation()

    useEffect(() => {
        // 获取全部部门的方法
        getAllDept(data, setData)
        setData({ ...data })
        // 获取省份
        getAllProvinceAndCityList(data, setData)
        if (location.state !== null) {
            data.initData.selectForm.dno = location.state.dno.toString()
            getAllDept(data, setData)
            data.initData.selectForm.deptId = location.state.deptId.toString()
            // handleDeptChange(data.initData.selectForm.dno)
            getEmploye(data, setData)
        }
    }, [])

    // 是否删除
    const confirmDelete = (record: any) => {
        deleteEmploye(record.employno)
        // 获取员工
        getEmploye(data, setData)
    }

    // 表格行
    const columns: ColumnsType<DataType> = [
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
                    <Button style={{ height: "27px", borderRadius: "3px", border: "none", fontSize: "12px" }} type="primary" icon={<EditOutlined />} onClick={() => editEmploye(record, data, setData, setOpen, addOrUpdateForm)}>修改</Button>
                    <Popconfirm title={`您确定要删除员工吗？`} cancelText="取消" okText="删除" onConfirm={() => confirmDelete(record)}>
                        <Button style={{ height: "27px", marginLeft: "15px", borderRadius: "3px", border: "none", fontSize: "12px" }} danger icon={<DeleteOutlined />} type='primary'>删除</Button>
                    </Popconfirm>
                </>
        },
    ];
    // 修改或添加员工model open
    const [open, setOpen] = useState(false);

    const [addOrUpdateForm] = Form.useForm()
    const showModal = () => {
        setOpen(true);
    };
    const hideModal = () => {
        addOrUpdateForm.resetFields()
        setOpen(false);
    };
    // 日期格式
    const dateFormat = 'YYYY-MM-DD';
    // form的标签
    const selectForm: any = useRef()
    // 修改事件
    const handleDeptChange = (value: string | number) => {
        // 清空小组的值 需要给表单打ref和form.item的name
        selectForm.current?.setFieldsValue({
            groupSelect: undefined
        })
        data.initData.selectForm.deptId = ''
        data.initData.selectForm.dno = value
        setData({ ...data })
        // 获取小组
        getGroup(data, setData)
    }

    // 选择小组同时获取学生
    const handleGroupChange = (value: string | number) => {
        data.initData.selectForm.deptId = value
        setData({ ...data })
        // 获取员工
        getEmploye(data, setData)
        // 添加和修改要用到的选择项
        employeSelect(data, setData)
    }

    // 修改页码
    const pageChange = (page: number, size: number) => {
        data.initData.selectForm.page = page;
        data.initData.selectForm.size = size;
        setData({ ...data })
        // 发请求获取员工
        getEmploye(data, setData)
    }
    // 点击确定
    const onFinish = async () => {
        addOrUpdateForm.validateFields().then(res => {
            data.initData.addOrUpdateForm = { ...data.initData.addOrUpdateForm, ...addOrUpdateForm.getFieldsValue() }
            // 修改时间
            data.initData.addOrUpdateForm.entryDate = res.entryDate.format(dateFormat)
            // 修改地址
            data.initData.addOrUpdateForm.employaddress = data.initData.addOrUpdateForm.province + ' ' + data.initData.addOrUpdateForm.city
            // todo添加员工
            cofimAddOrUpdate(data)
            getEmploye(data, setData)
            addOrUpdateForm.resetFields()

        }).catch(err => {
            if (err) {
                message.error('请按要求填写表单数据！')
                return false

            }

        })

    }
    // 修改了省份 赋值city
    const changeCity = (value: any) => {
        getCityList(data, setData, value)
    }
    // 修改或添加的部门选择时清空团队
    const changeAddOrUpdateDept = (value: string | number) => {

        addOrUpdateForm.setFieldsValue({
            deptno: undefined
        })
        console.log(addOrUpdateForm.getFieldsValue());

        data.initData.addOrUpdateForm.dno = value
        setData({ ...data })
        changeAddOrUpdateSelect(data, setData)
    }

    const changeGroupId = (value: string | number) => {
        data.initData.addOrUpdateForm.deptno = value
        setData({ ...data })
    }

    // 添加或修改员工
    const addNewEmploye = () => {
        data.initData.addOrUpdateForm.isUpdate = false
        showModal()
    }
    // 绑定搜索的keyword
    const changeKeyword = (e: any) => {
        data.initData.addOrUpdateForm.keyword = e.target.value
        setData({ ...data })
    }
    // 查找
    const searchEmploye = () => {
        const keyword = selectForm.current.getFieldValue('keyword')
        searchEmployeInfo(data, keyword, setData)
    }
    return (
        <div className="EmployeInfo" style={{ margin: "30px", }}>
            <Card style={{ boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.05)" }} >
                <Form ref={selectForm} name='basic' layout="inline">
                    <Form.Item label="部门名">
                        <Select size="large" placeholder="请选择部门" onChange={handleDeptChange} defaultValue={data.initData.selectForm.dno === '' ? undefined : data.initData.selectForm.dno} style={{ width: 230 }}>
                            {data.initData.deptSelect}
                        </Select>
                    </Form.Item>
                    <Form.Item label="所属团队" name="groupSelect">
                        <Select allowClear disabled={data.initData.selectForm.dno !== '' ? false : true} size="large" placeholder="请选择部门小组" onSelect={handleGroupChange} defaultValue={data.initData.routeDeptId} style={{ width: 230 }}>
                            {data.initData.groupSelect}
                        </Select>
                    </Form.Item>
                    <Form.Item label="查询" name="keyword" >
                        <div style={{ display: 'inline-block' }}>
                            <Input placeholder='请输入查询信息' onInput={(e) => { changeKeyword(e) }} size='large' style={{ width: 200 }} />
                            <Button disabled={data.initData.addOrUpdateForm.keyword === ''} style={{ marginLeft: '15px', borderRadius: '5px' }} type="primary" icon={<SearchOutlined />} onClick={searchEmploye}>
                                搜索
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Card >
            <Card style={{ marginTop: "20px", boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.09)", display: data.initData.employeInfo.length > 0 ? "block" : 'none' }}>
                <div>
                    <Button size='large' style={{ marginBottom: '15px', borderRadius: '3px' }} type="primary" icon={<PlusOutlined />} onClick={addNewEmploye}>
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

                // image="http://localhost:3000/images/empty.svg"
                style={{ height: "100%", display: data.initData.employeInfo.length > 0 ? "none" : 'block', marginTop: '100px' }}
                imageStyle={{
                    width: "100%",
                    height: '100%'
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
                title={data.initData.addOrUpdateForm.isUpdate ? "修改员工" : "添加员工"}
                open={open}
                width={1000}
                onOk={onFinish}
                onCancel={hideModal}
                okText={data.initData.addOrUpdateForm.isUpdate ? "确认修改" : "确认添加"}
                cancelText="取消操作"
                okButtonProps={{ icon: <CheckOutlined /> }}
                cancelButtonProps={{ icon: <CloseOutlined /> }}
            >
                <div>
                    <Form form={addOrUpdateForm} labelCol={{ span: 3 }} size="large" wrapperCol={{ span: 16 }} name='basic1'  >
                        <Form.Item label="姓名" name="employname" rules={[{ required: true, message: '员工姓名不能为空' }]}>
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder='请输入员工姓名' size='large' style={{ width: 320 }} />
                        </Form.Item>
                        <Form.Item label="性别" name="employsex" rules={[{ required: true, message: '性别不能不选' }]}>
                            <Radio.Group value={1}>
                                <Radio value={"男"}>男</Radio>
                                <Radio value={"女"}>女</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label="年龄" name="employage" rules={[{ required: true, message: '年龄不能为空' }]}>
                            <Input prefix={<SmileOutlined className="site-form-item-icon" />} placeholder='请输入员工年龄' size='large' style={{ width: 320 }} />
                        </Form.Item>
                        <Form.Item label="入职日期" name="entryDate" rules={[{ required: true, message: '入职日期不能为空' }]}>
                            <DatePicker size='large' style={{ width: 250 }} placeholder="请选择入职日期" format={dateFormat} />
                        </Form.Item>
                        <Form.Item label="身份证" name="employidcard" rules={[{ required: true, message: '身份证不能为空' }]}>
                            <Input prefix={<IdcardOutlined className="site-form-item-icon" />} placeholder='请输入员工身份证' size='large' style={{ width: 320 }} />
                        </Form.Item>
                        <Form.Item label="电话" name="employphone" rules={[{ required: true, message: '电话不能为空' }]}>
                            <Input prefix={<PhoneOutlined className="site-form-item-icon" />} placeholder='请输入员工电话' size='large' style={{ width: 320 }} />
                        </Form.Item>

                        <Form.Item label="邮箱" name="employemail" rules={[{ required: true, message: '邮箱不能为空' }]}>
                            <Input prefix={<MailOutlined className="site-form-item-icon" />} addonAfter=".com" style={{ width: 320 }} />
                        </Form.Item>

                        <div className='address' >
                            <Form.Item label="省份" name="province" rules={[{ required: true, message: '地址不能为空' }]}>
                                <Select suffixIcon={<LayoutOutlined className="site-form-item-icon" />} size="large" placeholder="请选择省份" onChange={changeCity} style={{ width: 230 }}>
                                    {data.initData.provinceSelect}
                                </Select>
                            </Form.Item>
                            <Form.Item label="地市" name="city" rules={[{ required: true, message: '地址不能为空' }]}>
                                <Select size="large" placeholder="请选择地市" style={{ width: 230, }}>
                                    {data.initData.citySelect}
                                </Select>
                            </Form.Item>
                        </div>

                        <Form.Item label="部门名" name="dno" rules={[{ required: true, message: '部门信息不能为空' }]}>
                            <Select suffixIcon={<HomeOutlined className="site-form-item-icon" />} size="large" placeholder="请选择部门名" onChange={changeAddOrUpdateDept} style={{ width: 230 }}>
                                {data.initData.addOrUpdateForm.deptSelect}
                            </Select>

                        </Form.Item>
                        <Form.Item label="团队" name="deptno" rules={[{ required: true, message: '部门信息不能为空' }]}>
                            <Select size="large" placeholder="请选择所属团队" onChange={changeGroupId} style={{ width: 230 }}>
                                {data.initData.addOrUpdateForm.groupSelect}
                            </Select>
                        </Form.Item>
                        <Form.Item label="薪资" name="employsalary" rules={[{ required: true, message: '薪资不能为空' }]}>
                            <Input prefix={<MoneyCollectOutlined className="site-form-item-icon" />} placeholder='请输入员工薪资' size='large' style={{ width: 320 }} />
                        </Form.Item>
                    </Form>
                </div>
            </Modal >
        </div >
    );
}

export default EmployeInfo;