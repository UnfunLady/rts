import React, { useEffect, useState } from 'react'
import type { ColumnsType } from 'antd/es/table';

import { ArrowLeftOutlined, ArrowRightOutlined, BackwardOutlined } from '@ant-design/icons';
import { EmployeSalaryDetailData, getDeptByDno, updateEmployeSalaryDetail, getEmployeSalaryDetailInfo } from '../../../../../type/employeSalary'
import { Card, Steps, Select, Result, Descriptions, Slider, Tag, Button, Table, Switch, message, Pagination } from 'antd'
import Header from '../../../../../component/Header'
import { useLocation } from 'react-router-dom'
export default function EmployeDetailView() {
    const { Step } = Steps;
    const [data, setData] = useState(new EmployeSalaryDetailData())
    //接受路由传递的信息
    interface deptInfoData {
        dno: string | number;
        [propName: string]: any;
    }
    const location: any = useLocation()
    useEffect(() => {
        if (location.state) {
            const deptInfo: deptInfoData = JSON.parse(location.state.deptInfo);
            data.employeSalaryDetailForm.DetailForm.dno = deptInfo.dno
            getDeptByDno(data, setData)
        } else {

        }
    }, [])
    // 选择了某个小组
    const selectGroup = (value: string | number) => {
        data.employeSalaryDetailForm.DetailForm.deptid = value;
        setData({ ...data })
    }
    // 上一步
    const preStep = () => {
        if (data.employeSalaryDetailForm.active === 0) {
            data.employeSalaryDetailForm.editList = []
            // 清空编辑列表
            // 清空数据 保持最新
            data.employeSalaryDetailForm.DetailForm.tableDatas = []
            setData({ ...data })
            message.info('已经是第一步了')
        } else if (data.employeSalaryDetailForm.active === 1) {
            console.log(data.employeSalaryDetailForm.editList);
            // 清空编辑列表
            data.employeSalaryDetailForm.editList = []
            // 清空数据 保持最新
            data.employeSalaryDetailForm.DetailForm.tableDatas = []
            data.employeSalaryDetailForm.active--
            setData({ ...data })
        } else if (data.employeSalaryDetailForm.active === 2) {
            // // 清空编辑列表
            // data.employeSalaryDetailForm.editList = []

            data.employeSalaryDetailForm.active--
            setData({ ...data })
        } else {
            data.employeSalaryDetailForm.active--
            setData({ ...data })
        }

    }
    // 下一步
    const nextStep = () => {
        switch (data.employeSalaryDetailForm.active) {
            case 0:
                getEmployeSalaryDetailInfo(data, setData)
                data.employeSalaryDetailForm.active++
                setData({ ...data })

                break;
            case 1:
                if (data.employeSalaryDetailForm.editList.length === 0) {
                    message.error('尚未修改员工信息')
                } else {
                    getEmployeSalaryDetailInfo(data, setData)
                    data.employeSalaryDetailForm.active++
                    setData({ ...data })
                }
                break;
            case 2:
                updateEmployeSalaryDetail(data, setData)
                setData({ ...data })
                break;
            default:
                break;
        }

    }



    // 修改绩效
    const changeSub = (checked: number | string | boolean, record: any, type: string, index: number,) => {
        // 修改具体绩效
        switch (type) {
            case 'social':
                record.usesocialSub = checked
                break;
            case 'house':
                record.usehouseSub = checked
                break;
            case 'eat':
                record.useeatSub = checked
                break;
            case 'trans':
                record.usetransSub = checked
                break;
            case 'hot':
                record.usehotSub = checked
                break;
            case 'performance':
                record.usePerformance = checked
                break;
            default:
                record.isuse = checked
                break;
        }
        // 锁
        data.employeSalaryDetailForm.loading = true
        setData({ ...data })
        setTimeout(() => {
            // 解锁
            data.employeSalaryDetailForm.loading = false
            setData({ ...data })
        }, 500)
        // 计算薪资
        const allSalary = (
            (
                record.isuse !== "true" && record.isuse !== true
                    ? record.salary
                    : (record.usesocialSub === "true" || record.usesocialSub === true
                        ? -data.employeSalaryDetailForm.DetailForm.subDetail.socialSub
                        : data.employeSalaryDetailForm.DetailForm.subDetail.socialSub
                    ) +
                    (record.usehouseSub === "true" || record.usehouseSub === true
                        ? data.employeSalaryDetailForm.DetailForm.subDetail
                            .houseSub
                        : 0) +
                    (record.useeatSub === "true" || record.useeatSub === true
                        ? data.employeSalaryDetailForm.DetailForm.subDetail.eatSub
                        : 0) +
                    (record.usetransSub === "true" || record.usetransSub === true
                        ? data.employeSalaryDetailForm.DetailForm.subDetail
                            .transSub
                        : 0) +
                    (record.usehotSub === "true" || record.usehotSub === true
                        ? data.employeSalaryDetailForm.DetailForm.subDetail.hotSub
                        : 0) +
                    record.salary +
                    record.usePerformance *
                    data.employeSalaryDetailForm.DetailForm.subDetail
                        .performance *
                    0.01
            )
        )
        record.allSalary = allSalary;
        // 将修改过的数据添加到修改表单中收集
        data.employeSalaryDetailForm.editList.push(record)
        // if (data.employeSalaryDetailForm.editList.length > 0) {
        //     data.employeSalaryDetailForm.editList.map((item, index) => {
        //         console.log(1);
        //         if (item.index === record.index) {
                 
        //             console.log(data.employeSalaryDetailForm.editList);
        //         } else {
        //             console.log(data.employeSalaryDetailForm.editList);
        //         }
        //     })
        // } else {
        //     console.log(1);

            
        // }




    }
    // 返回第一步
    const backOne = () => {
        data.employeSalaryDetailForm.active = 0;
        data.employeSalaryDetailForm.editList = []
        setData({ ...data })
    }

    interface DataType {
        key: string,
        id: string | number
    }
    // 表格Table colums
    const columns: ColumnsType<DataType> = [
        {

            title: '部门号',
            dataIndex: 'deptno',
            align: 'center'
        },
        {
            title: '部门名',
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
            title: '社保',
            dataIndex: 'usesocialSub',
            align: 'center',
            render: (_, record: any, index: number) => {
                return <Switch onChange={(checked) => changeSub(checked, record, 'social', index)} disabled={data.employeSalaryDetailForm.loading ? true : false} checkedChildren="补贴" unCheckedChildren="不补贴" checked={record.usesocialSub} />
            }
        },
        {
            title: '房补',
            dataIndex: 'usehouseSub',
            align: 'center',
            render: (_, record: any, index: number) => {
                return <Switch onChange={(checked) => changeSub(checked, record, 'house', index)} disabled={data.employeSalaryDetailForm.loading ? true : false} checkedChildren="补贴" unCheckedChildren="不补贴" defaultChecked={record.usehouseSub === "true" ? true : false} />
            }
        },
        {
            title: '餐补',
            dataIndex: 'useeatSub',
            align: 'center',
            render: (_, record: any, index: number) => {
                return <Switch onChange={(checked) => changeSub(checked, record, 'eat', index)} disabled={data.employeSalaryDetailForm.loading ? true : false} checkedChildren="补贴" unCheckedChildren="不补贴" defaultChecked={record.useeatSub === "true" ? true : false} />
            }
        },
        {
            title: '交通补',
            dataIndex: 'usetransSub',
            align: 'center',
            render: (_, record: any, index: number) => {
                return <Switch onChange={(checked) => changeSub(checked, record, 'trans', index)} disabled={data.employeSalaryDetailForm.loading ? true : false} checkedChildren="补贴" unCheckedChildren="不补贴" defaultChecked={record.usetransSub === "true" ? true : false} />
            }
        },
        {
            title: '高温补',
            dataIndex: 'usehotSub',
            align: 'center',
            render: (_, record: any, index: number) => {
                return <Switch onChange={(checked) => changeSub(checked, record, 'hot', index)} disabled={data.employeSalaryDetailForm.loading ? true : false} checkedChildren="补贴" unCheckedChildren="不补贴" defaultChecked={record.usehotSub === "true" ? true : false} />
            }
        },
        {
            title: '绩效比例',
            dataIndex: 'usePerformance',
            align: 'center',
            render: (_, record: any, index: number) => {
                return <Slider onChange={(checked) => changeSub(checked, record, 'performance', index)} disabled={data.employeSalaryDetailForm.loading} defaultValue={record.usePerformance} min={0} max={100} />
            }
        },
        {
            title: '底薪',
            dataIndex: 'salary',
            align: 'center',
        },
        {
            title: '是否补贴',
            dataIndex: 'isuse',
            align: 'center',
            render: (_, record: any, index: number) => {
                return <Switch onChange={(checked) => changeSub(checked, record, 'isuse', index)} disabled={data.employeSalaryDetailForm.loading ? true : false} checkedChildren="补贴" unCheckedChildren="不补贴" defaultChecked={record.isuse === "true" ? true : false} />
            }
        },
        {
            title: '应发工资',
            align: 'center',
            dataIndex: 'allSalary',
            render: (_, record: any) => {
                return <span className='allSalary'>{record.allSalary}</span>
            }
        },
    ];
    // 修改页码
    const changePage = (page: number, pageSize: number) => {
        data.employeSalaryDetailForm.DetailForm.page = page;
        data.employeSalaryDetailForm.DetailForm.size = pageSize;
        setData({ ...data })
        getEmployeSalaryDetailInfo(data, setData)
    }

    return (
        <div style={{ margin: "20px" }}>
            <Header title="温馨提示" explain="请详细核实每一步要操作的对象以免造成不必要的麻烦" />
            <Card style={{ marginTop: "40px" }}>
                <div>
                    <Steps current={data.employeSalaryDetailForm.active}>
                        <Step title="选择团队" description="选择要修改的具体团队" />
                        <Step title="确认修改的信息" description="完成您的操作" />
                        <Step title="提交修改" description="提交以完成您的修改" />
                    </Steps>
                </div>
                <div>
                    <div style={{ padding: "40px", textAlign: "center", display: data.employeSalaryDetailForm.active === 0 ? "block" : "none" }}>
                        <span style={{ paddingRight: "20px" }}>请选择小组</span>
                        <Select onChange={selectGroup} size='large' placeholder='请选择要修改的小组员工' style={{ width: 220, borderRadius: "8px !important" }} allowClear>
                            {data.employeSalaryDetailForm.DetailForm.selectOption}
                        </Select>
                    </div>
                    <div style={{ margin: "30px 0 30px 0", display: data.employeSalaryDetailForm.active === 1 ? "block" : "none" }}>
                        <Table rowKey={(record: any) => record.employno} pagination={false} dataSource={data.employeSalaryDetailForm.DetailForm.tableDatas} bordered columns={columns} />

                    </div>
                    <div style={{ margin: "30px 0 30px 0", display: data.employeSalaryDetailForm.active === 2 ? "block" : "none" }}>
                        <h3><span style={{ fontWeight: "bold" }}>请确认要修改的信息</span></h3>
                        {
                            data.employeSalaryDetailForm.editList.map((employe: any) => {
                                return (
                                    <Descriptions bordered size='middle' key={employe.key} style={{ marginTop: "20px" }}>
                                        <Descriptions.Item label="团队名"><Tag color="default">{employe.deptname}</Tag></Descriptions.Item>
                                        <Descriptions.Item label="员工姓名"><Tag color="error">{employe.employname}</Tag></Descriptions.Item>
                                        <Descriptions.Item label="社保"><Tag color="default">{employe.usesocialSub === "true" ? "有" : "无"}</Tag></Descriptions.Item>
                                        <Descriptions.Item label="房补"><Tag color="default">{employe.usehouseSub === "true" ? "有" : "无"}</Tag></Descriptions.Item>
                                        <Descriptions.Item label="餐补" ><Tag color="default">{employe.useeatSub === "true" ? "有" : "无"}</Tag></Descriptions.Item>
                                        <Descriptions.Item label="交通补" ><Tag color="default">{employe.usetransSub === "true" ? "有" : "无"}</Tag></Descriptions.Item>
                                        <Descriptions.Item label="高温补" ><Tag color="default">{employe.usehotSub === "true" ? "有" : "无"}</Tag></Descriptions.Item>
                                        <Descriptions.Item label="绩效(1000元)"><Tag color="default">{employe.usePerformance === "true" ? "有" : "无"}</Tag></Descriptions.Item>
                                        <Descriptions.Item label="底薪" ><Tag color="default">{employe.salary === "true" ? "有" : "无"}</Tag></Descriptions.Item>
                                        <Descriptions.Item label="是否补贴" ><Tag color="success">{employe.isuse === "true" ? "有" : "无"}</Tag></Descriptions.Item>
                                        <Descriptions.Item label="应发工资" ><Tag color="success">{employe.allSalary}</Tag></Descriptions.Item>
                                    </Descriptions>
                                )
                            })
                        }
                    </div>
                    <div style={{ margin: "30px 0 30px 0", display: data.employeSalaryDetailForm.active === 3 ? "block" : "none" }}>
                        <div style={{ display: data.employeSalaryDetailForm.editSuccess ? "block" : "none" }}>
                            <Result
                                status="success"
                                title="修改成功"
                                subTitle="点击返回继续选择修改"
                                extra={[
                                    <Button icon={<BackwardOutlined />} type="primary" key="console" onClick={backOne}>
                                        返回第一步
                                    </Button>,

                                ]}
                            />
                        </div>
                        <div style={{ display: !data.employeSalaryDetailForm.editSuccess ? "block" : "none" }}>
                            <Result
                                status="error"
                                title="修改失败"
                                subTitle="点击返回继续选择修改"
                                extra={[
                                    <Button icon={<BackwardOutlined />} type="primary" key="console" onClick={backOne}>
                                        返回第一步
                                    </Button>,

                                ]}
                            />
                        </div>
                    </div>


                </div>

                <div style={{ margin: "0 auto", textAlign: "center", display: data.employeSalaryDetailForm.active === 3 ? "none" : "block" }}>
                    <Button disabled={data.employeSalaryDetailForm.DetailForm.deptid === 0} type='primary' style={{ margin: "4px" }} icon={<ArrowLeftOutlined />} onClick={preStep}>上一步</Button>
                    <Button loading={data.employeSalaryDetailForm.loading} disabled={data.employeSalaryDetailForm.DetailForm.deptid === 0} type='primary' style={{ margin: "4px" }} icon={<ArrowRightOutlined />} onClick={nextStep}>{data.employeSalaryDetailForm.active < 2 ? "下一步" : "提交修改"}</Button>
                </div>
                <div style={{ marginTop: "10px", float: "right" }}>
                    <Pagination
                        showTotal={total => `共 ${total} 名员工`}
                        defaultPageSize={8}
                        pageSizeOptions={[8, 10, 15]}
                        total={data.employeSalaryDetailForm.DetailForm.count}
                        showSizeChanger
                        showQuickJumper
                        onChange={changePage}
                    />
                </div>
            </Card >
        </div >
    )

}