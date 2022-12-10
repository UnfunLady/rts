import React, { useEffect, useState } from 'react'
import { FormOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Card, Form, Input, message } from 'antd'
import { updateGroupInfo } from '../../../../../../type/department'
import PubSub from 'pubsub-js'
import { useForm } from 'antd/es/form/Form'
type dataInitType = {
    editInfo: any
}
class dataInit {
    editData: dataInitType = {
        editInfo: []
    }
}
const EditGroup = (props: {
    change: Function
}) => {
    const [data, setData] = useState(new dataInit())
    const [editForm] = useForm()
    useEffect(() => {
        PubSub.subscribe('editGroupInfo', (msg: any, record: any) => {
            data.editData.editInfo = record
            setData({ ...data })
            editForm.setFieldsValue({
                deptname: data.editData.editInfo.deptname,
                location: data.editData.editInfo.location,
                count: data.editData.editInfo.count,
            })
        })
    })

    const back = () => {
        props.change(false)
    }

    const confirmEditGroup = () => {
        editForm.validateFields().then(async (res) => {
            let updateInfo;
            if (data.editData.editInfo.deptname != res.deptname) {
                updateInfo = {
                    id: data.editData.editInfo.id,
                    deptname: res.deptname,
                    location: res.location,
                    count: res.count,
                    updateName: true
                }
            } else {
                updateInfo = {
                    id: data.editData.editInfo.id,
                    deptname: res.deptname,
                    location: res.location,
                    count: res.count,
                    updateName: false
                }
            }
            const success = await updateGroupInfo(updateInfo)

            if (success) {
                // data.editData.editInfo.deptname=editForm.getFieldValue("deptname");
                props.change(false)
            }
        }).catch(() => {
            message.error('请按要求输入数据')
        })


    }
    return (
        <div>
            <Card>
                <Button type='primary' icon={<ArrowLeftOutlined />} onClick={back}>返回</Button>
                <Form
                    form={editForm}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ width: "33%", margin: "0 auto", }}>
                    <Form.Item label="小组名字" name="deptname"
                        rules={[{ required: true, message: '小组名不能为空' }, { min: 4 }]}
                    >
                        <Input placeholder='输入要修改的小组名' />
                    </Form.Item>
                    <Form.Item label="所在位置" name="location"
                        rules={[{ required: true, message: '所在位置不能为空' }, { min: 2 }]}
                    >
                        <Input placeholder='输入要修改的小组所在位置' />
                    </Form.Item>
                    <Form.Item label="小组总人数" name="count"
                        rules={[{ required: true, message: '小组总人数不能为空' },]}
                    >
                        <Input placeholder='输入要修改的小组小组总人数' />
                    </Form.Item>
                    <div style={{ textAlign: "center" }}>
                        <Button type='primary' icon={<FormOutlined />} onClick={confirmEditGroup}>提交修改</Button>
                    </div>
                </Form>
            </Card>
        </div >
    )

}
export default EditGroup