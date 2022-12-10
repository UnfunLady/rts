import { Button, Card, Pagination, Table, Modal, Form, Tag, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { ArrowLeftOutlined, SearchOutlined, EditOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table';
import { evilEmployeInfoInit, getEvilEmployeInfo, getAllInfo, updateEvilEmployeInfo } from '../../../type/evilControl';
import Header from '../../../component/Header'
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';
export default function ShowNoCovid() {
    const [data, setData] = useState(new evilEmployeInfoInit())
    const location: any = useLocation()
    const navigate = useNavigate()
    const [updateForm] = useForm()
    const { Option } = Select
    useEffect(() => {
        const { info, justCheck } = location.state
        if (justCheck) {
            data.employeData.justCheck = true
            data.employeData.isAllEmploye = true
            setData({ ...data })
            getAllInfo(data, setData, {
                dno: location.state.info.dno,
                page: data.employeData.page,
                size: data.employeData.size
            })
        } else {
            if (info.dno && !data.employeData.isAllEmploye) {
                getEvilInfo()
            } else {
                data.employeData.justCheck = false;
                data.employeData.isAllEmploye = false;
                data.employeData.justCheck = false;
                setData({ ...data })
                navigate('/homeView/evilControl/companyInfo')
            }

        }
        // evilEmployeInfoInit(data, setData,)
    }, [])

    // 返回
    const back = () => {
        navigate('/homeView/evilControl/companyInfo')
    }

    // 获取数据
    const getEvilInfo = async () => {
        // 如果查看的是全部数据就获取全部的
        if (data.employeData.isAllEmploye || data.employeData.justCheck) {
            // node
            // getAllInfo(data, setData, {
            //     baseInfo: { dno: location.state.info.dno },
            //     pagination: { page: data.employeData.page, size: data.employeData.size },
            // })
            // springboot
            getAllInfo(data, setData, {
                dno: location.state.info.dno,
                page: data.employeData.page,
                size: data.employeData.size
            })
        } else {
            getEvilEmployeInfo(data, setData, {
                dno: location.state.info.dno,
                page: data.employeData.page,
                size: data.employeData.size
            });
        }
    };

    // 获取全部信息
    const getAll = () => {
        data.employeData.isAllEmploye = !data.employeData.isAllEmploye;
        if (data.employeData.isAllEmploye) {
            getAllInfo(data, setData, {
                dno: location.state.info.dno,
                page: data.employeData.page,
                size: data.employeData.size
            })
        } else {
            getEvilInfo()
        }
    }
    // 修改分页
    const changePage = (page: number, pageSize: number) => {
        data.employeData.page = page;
        data.employeData.size = pageSize;
        setData({ ...data })
        // 重新获取数据
        getEvilInfo();
    }
    // 修改信息前置
    const editInfo = (record: any) => {
        data.employeData.updateForm = record;
        console.log(data.employeData.updateForm);
        updateForm.setFieldsValue({
            firstIn: record.firstInoculation,
            twoIn: record.secondInoculation,
            threeIn: record.threeInoculation,
        })
        data.employeData.dialogTableVisible = true;
        setData({ ...data })
    }
    // 修改信息前置2
    const changeInoculation = (value: boolean | string, type: string) => {
        switch (type) {
            case 'three':
                updateForm.setFieldsValue({
                    firstIn: value,
                    twoIn: value,
                    threeIn: value
                })
                setData({ ...data })
                break;
            case 'two':

                // data.employeData.updateForm['firstInoculation'] = data.employeData.updateForm['secondInoculation'];
                updateForm.setFieldsValue({
                    firstIn: value,
                    twoIn: value,
                })
                setData({ ...data })
                break;
        }

    }
    // 取消修改按钮
    const cancelEdit = () => {
        data.employeData.updateForm = {}
        data.employeData.dialogTableVisible = false;
        updateForm.resetFields()
        setData({ ...data })
    }
    // 提交修改
    const cofirmUpdate = () => {
        updateEvilEmployeInfo(data, setData,
            {
                depallid: data.employeData.updateForm['depallid'],
                deptid: data.employeData.updateForm['deptid'],
                employno: data.employeData.updateForm['employno'],
                firstInoculation: updateForm.getFieldValue('firstIn') ? updateForm.getFieldValue('firstIn') : data.employeData.updateForm['firstInoculation'],
                secondInoculation: updateForm.getFieldValue('twoIn') ? updateForm.getFieldValue('twoIn') : data.employeData.updateForm['secondInoculation'],
                threeInoculation: updateForm.getFieldValue('threeIn') ? updateForm.getFieldValue('threeIn') : data.employeData.updateForm['threeInoculation'],
            }
            , {
                dno: location.state.info.dno,
                page: data.employeData.page, size: data.employeData.size
            })
    }
    interface DataType {
        key: React.Key;
    }
    // 表格行
    const columns: ColumnsType<DataType> = [
        {
            title: '部门号',
            dataIndex: 'depallid',
            align: 'center'
        },
        {
            title: '小组号',
            dataIndex: 'deptid',
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
            title: '性别',
            dataIndex: 'employsex',
            align: 'center'
        },
        {
            title: '员工电话',
            dataIndex: 'employphone',
            align: 'center'
        },
        {
            title: '第一针',
            dataIndex: 'firstInoculation',
            align: 'center',
            render: (_, record: any) => {
                return (
                    <span style={{ color: record.firstInoculation === 'false' ? 'red' : 'green', }}>
                        {record.firstInoculation === "false" ? "未接种" : "已接种"}</span>
                )
            }
        },
        {
            title: '第二针',
            dataIndex: 'secondInoculation',
            align: 'center',
            render: (_, record: any) => {
                return (
                    <span style={{ color: record.secondInoculation === 'false' ? 'red' : 'green', }}>
                        {record.secondInoculation === "false" ? "未接种" : "已接种"}</span>
                )
            }
        },
        {
            title: '第三针',
            dataIndex: 'threeInoculation',
            align: 'center',
            render: (_, record: any) => {
                return (
                    <span style={{ color: record.threeInoculation === 'false' ? 'red' : 'green', }}>
                        {record.threeInoculation === "false" ? "未接种" : "已接种"}</span>
                )
            }
        },
        {
            title: '操作',
            align: 'center',
            dataIndex: 'n',
            width: 200,
            render: (_, record: any) => {
                return (
                    <>
                        <Button type='primary' icon={<EditOutlined />} onClick={() => { editInfo(record) }}>编辑信息</Button>
                    </>
                )
            }
        },
    ];
    return (
        <div style={{ margin: "30px" }}>
            <Header title='防疫相员工信息' explain='疫苗接种相关的员工信息,修改时注意前两针与第三针的状况' />
            <br />
            <Card>
                <div>
                    <Button style={{ marginRight: "20px" }} type='primary' icon={<ArrowLeftOutlined />} onClick={back}>返回</Button>
                    {
                        data.employeData.justCheck ? "" : <Button type='primary' icon={<SearchOutlined />} onClick={getAll}>{
                            data.employeData.isAllEmploye ? "返回具体信息" : "查看所有员工"
                        }</Button>
                    }
                </div>
                <div style={{ marginTop: "20px" }}>
                    <Table rowKey={record => record.key} pagination={false} bordered columns={columns} dataSource={data.employeData.isAllEmploye ? data.employeData.allTableData : data.employeData.evilTableData} />
                    <br />
                    <Pagination style={{ float: "right" }} pageSize={8} onChange={changePage} pageSizeOptions={[8, 10, 15]} showTotal={total => `共 ${total} 名员工`} showSizeChanger showQuickJumper total={data.employeData.isAllEmploye ? data.employeData.allCount : data.employeData.someCount} />
                </div>
            </Card >
            {/* 修改信息 */}
            <Modal forceRender title="编辑信息" open={data.employeData.dialogTableVisible} width={800} onCancel={cancelEdit} onOk={cofirmUpdate}>
                <Form form={updateForm} size="large" labelCol={{ span: 7 }}
                    wrapperCol={{ span: 16 }}
                >
                    <Form.Item label="员工号">
                        <Tag color='default'>{data.employeData.updateForm['employno']}</Tag>
                    </Form.Item>
                    <Form.Item label="员工名">
                        <Tag color='default'>{data.employeData.updateForm['employname']}</Tag>
                    </Form.Item>
                    <Form.Item label="员工电话">
                        <Tag color='default'>{data.employeData.updateForm['employphone']}</Tag>
                    </Form.Item>
                    <Form.Item name="firstIn" label="第一针是否接种">
                        <Select disabled={updateForm.getFieldValue('twoIn') === 'true'} style={{ width: "300px" }} placeholder="请选择修改,不修改则为原来的值">
                            <Option value="true" key={0}>已接种</Option>
                            <Option value="false" key={1}>未接种</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="twoIn" label="第二针是否接种">
                        <Select onChange={(value) => changeInoculation(value, 'two')} style={{ width: "300px" }} placeholder="请选择修改,不修改则为原来的值" disabled={updateForm.getFieldValue('threeIn') === 'true'}  >
                            <Option value="true" key={0}>已接种</Option>
                            <Option value="false" key={1}>未接种</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="threeIn" label="第三针是否接种">
                        <Select style={{ width: "300px" }} placeholder="请选择修改,不修改则为原来的值" onChange={(value) => changeInoculation(value, 'three')} >
                            <Option value="true" key={0}>已接种</Option>
                            <Option value="false" key={1}>未接种</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>

        </div >
    )

}