import React, { useEffect, useState } from 'react'
import { Steps, Card, Transfer, Button, Form, Select, Input, message, Descriptions, Tag, Result } from 'antd';
import { ArrowRightOutlined, ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons';
import type { TransferDirection, TransferListProps } from 'antd/es/transfer';
import { addGroupDataInit, getEmployeInfo, getAllDept, addGroup } from '../../../../type/department';
import './index.less'
import { useForm } from 'antd/es/form/Form';

const { Step } = Steps;
export default function GroupMainView() {
    interface RecordType {
        key: string;
        title: string;
        description: string;
        chosen: boolean;
    }
    // 初始化
    const [data, setData] = useState(new addGroupDataInit())
    const [newGroupForm] = useForm()
    useEffect(() => {
        getEmployeInfo(data, setData)
        getAllDept(data, setData)
    }, []);
    // 搜索过滤
    const filterOption = (inputValue: string, option: RecordType) =>
        option.description.indexOf(inputValue) > -1;
    // 改变时触发
    const handleChange = (newTargetKeys: string[]) => {
        data.addGroupData.selectEmployes = newTargetKeys
        setData({ ...data })
    };
    // 搜索
    const handleSearch = (dir: TransferDirection, value: string) => {
        console.log('search:', dir, value);
    };

    // 上一步
    const preStep = () => {
        switch (data.addGroupData.active) {
            case 1:
                data.addGroupData.active--
                newGroupForm.resetFields()
                setData({ ...data })
                break;
            case 2:
                data.addGroupData.active--
                setData({ ...data })
                break;
        }
    }
    // 第二步
    const secondStep = () => {
        data.addGroupData.active++
        setData({ ...data })
    }
    // 提交信息
    const submitInfo = () => {
        newGroupForm.validateFields().then(res => {
            console.log(res);

            data.addGroupData.active++
            data.addGroupData.confirmForm = data.addGroupData.allDeptInfo.filter((dept: any) => {
                return dept.dno === parseInt(newGroupForm.getFieldValue("deptno"))
            })
            const confirmData = {
                deptno: res.deptno,
                deptname: res.deptname,
                location: res.location
            }
            data.addGroupData.confirmForm = { ...confirmData, ...data.addGroupData.confirmForm }
            setData({ ...data })
        }).catch(() => {
            message.warning('请按要求输入数据！')
        })
    }
    // 最终提交
    const confirmUpload = async () => {
        data.addGroupData.loading = true;
        setData({ ...data })
        const confirmData = {
            // 选择的员工号
            addForm: data.addGroupData.selectEmployes,
            // 团队号
            deptno: data.addGroupData.confirmForm[0].dno,
            // 小组名
            deptname: data.addGroupData.confirmForm.deptname,
            // 小组地址
            location: data.addGroupData.confirmForm.location
        }
        const success = await addGroup(data, setData, confirmData)
        if (success) {
            newGroupForm.resetFields()
            data.addGroupData.selectEmployes = []
            data.addGroupData.confirmForm = {}
            data.addGroupData.loading = false
            data.addGroupData.addSuccess = true
            setData({ ...data })
        }
    }
    // 返回第一步
    const backOne = () => {
        newGroupForm.resetFields()
        data.addGroupData.selectEmployes = []
        data.addGroupData.confirmForm = {}
        data.addGroupData.loading = false
        data.addGroupData.addSuccess = false
        data.addGroupData.active = 0
        setData({ ...data })
    }
    // 下一步的按钮
    const renderFooter: any = (
        _: TransferListProps<any>,
        {
            direction,
        }: {
            direction: TransferDirection;
        },
    ) => {
        if (direction === 'left') {
            return (
                <Button disabled={data.addGroupData.selectEmployes.length === 0 ? true : false} size="small" type='primary' icon={<ArrowRightOutlined />} style={{ float: 'left', margin: 5 }} onClick={secondStep}>
                    前往下一步
                </Button>
            );
        }
        return (
            <Button disabled={data.addGroupData.selectEmployes.length === 0 ? true : false} size="small" type='primary' icon={<ArrowRightOutlined />} style={{ float: 'right', margin: 5 }} onClick={secondStep}>
                前往下一步
            </Button>
        )
    }
    return (
        <div style={{ marginTop: "20px" }}>
            <Card>
                <div>
                    <Steps current={data.addGroupData.active}>
                        <Step title="第一步" description="选择要组成新小组的员工" />
                        <Step title="第二步" description="选择所在部门及小组名" />
                        <Step title="第三步" description="提交信息" />
                    </Steps>
                </div>
                <div className='Step' style={{ marginTop: "30px" }}>
                    <div className='firstStep' style={{ display: data.addGroupData.active === 0 ? "block" : "none" }}>
                        <div className='transfer'>
                            <div className='transferInfo'>
                                <Transfer
                                    pagination
                                    dataSource={data.addGroupData.employeData}
                                    showSearch
                                    filterOption={filterOption}
                                    targetKeys={data.addGroupData.selectEmployes}
                                    onChange={handleChange}
                                    onSearch={handleSearch}
                                    operations={['添加员工', '取消添加']}
                                    render={item => `${item.title}——${item.key}`}
                                    footer={renderFooter}
                                    locale={{ itemUnit: "员工名/员工号", itemsUnit: "员工名/员工号", searchPlaceholder: "查询员工信息" }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='secondStep' style={{ display: data.addGroupData.active === 1 ? "block" : "none" }}>
                        <Form
                            form={newGroupForm}
                            labelCol={{ span: 7 }}
                            wrapperCol={{ span: 16 }}
                            size='large'
                            style={{ margin: "0 auto", width: "25%" }}>
                            <Form.Item name="deptno" label="请选择部门" rules={[{ required: true, message: "请选择部门!" }]}>
                                <Select placeholder="请选择新小组所在部门">
                                    {data.addGroupData.deptSelect}
                                </Select>
                            </Form.Item>
                            <Form.Item name="deptname" label="新小组名字" rules={[{ required: true, message: "请输入小组名字!" }, { min: 2, message: "最少输入两个字符" }]}>
                                <Input placeholder='请输入新小组的名字' />
                            </Form.Item>
                            <Form.Item name="location" label="新小组所在地" rules={[{ required: true, message: "请输入小组所在地!" }, { min: 2, message: "最少输入两个字符" }]}>
                                <Input placeholder='请输入新小组的所在地' />
                            </Form.Item>
                            <div style={{ margin: "0 auto", textAlign: "center" }}>
                                <Button size="middle" icon={<ArrowLeftOutlined />} type='primary' onClick={preStep}>上一步</Button>
                                <Button style={{ marginLeft: "30px" }} size='middle' icon={<ArrowRightOutlined />} type='primary' onClick={submitInfo}>提交信息</Button>
                            </div>
                        </Form>
                    </div>

                    <div className='thirdStep' style={{ display: data.addGroupData.active === 2 ? "block" : "none" }}>
                        <Descriptions column={2} title="确认提交信息" bordered>
                            <Descriptions.Item label="所在部门号"><Tag color='#79a0c9' >{data.addGroupData.confirmForm[0] ? data.addGroupData.confirmForm[0].dno : null}</Tag></Descriptions.Item>
                            <Descriptions.Item label="所在部门名"><Tag color='#79a0c9' >{data.addGroupData.confirmForm[0] ? data.addGroupData.confirmForm[0].dname : null}</Tag></Descriptions.Item>
                            <Descriptions.Item label="新小组名"><Tag color='#79a0c9' >{data.addGroupData.confirmForm ? data.addGroupData.confirmForm.deptname : null}</Tag></Descriptions.Item>
                            {
                                data.addGroupData.selectEmployes.length > 0 && data.addGroupData.selectEmployes.length < 4 ?
                                    <Descriptions.Item label="新增小组员工号">
                                        {data.addGroupData.selectEmployes.map((employe: any) => {
                                            return <Tag color='#79a0c9' key={employe}>{employe}</Tag>
                                        })
                                        }
                                    </Descriptions.Item>
                                    : <Descriptions.Item label="新增小组员工号">
                                        {data.addGroupData.selectEmployes.slice(0, 4).map((employe: any) => {
                                            return <Tag color='#79a0c9' key={employe}>{employe}</Tag>
                                        })
                                        }
                                        .....
                                    </Descriptions.Item>
                            }
                            <Descriptions.Item label="所在地"><Tag color='#79a0c9' >{data.addGroupData.confirmForm ? data.addGroupData.confirmForm.location : null}</Tag></Descriptions.Item>
                        </Descriptions>

                        <div style={{ margin: "10px auto", textAlign: "center" }}>
                            <Button size="middle" icon={<ArrowLeftOutlined />} type='primary' onClick={preStep}>上一步</Button>
                            <Button style={{ marginLeft: "30px" }} size='middle' icon={data.addGroupData.loading ? <LoadingOutlined /> : <ArrowRightOutlined />} type='primary' onClick={confirmUpload}>确认提交</Button>
                        </div>
                    </div>
                    {data.addGroupData.active === 3 ?
                        <div>
                            {data.addGroupData.active === 3 && data.addGroupData.addSuccess === true ?
                                <div className='lastStep' >
                                    <Result
                                        status="success"
                                        title="添加新小组成功!"

                                        extra={[
                                            <Button type="primary" key="back" onClick={backOne}>
                                                返回第一步
                                            </Button>,
                                        ]}
                                    />
                                </div>
                                : <div className='lastStep' >
                                    <Result
                                        status="error"
                                        title="添加新小组失败!"

                                        extra={[
                                            <Button type="primary" key="back" onClick={backOne}>
                                                返回第一步
                                            </Button>,
                                        ]}
                                    />
                                </div>}
                        </div>
                        : null}

                </div>

            </Card >
        </div >
    )

}
