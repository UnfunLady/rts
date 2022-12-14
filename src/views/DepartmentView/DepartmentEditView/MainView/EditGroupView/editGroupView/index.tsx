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
<<<<<<< HEAD
            console.log(data.editData.editInfo.deptname, res.deptname);

=======
>>>>>>> 71885dc818ea89f99d641651572a211212017952
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
<<<<<<< HEAD
=======
                props.change(false)
>>>>>>> 71885dc818ea89f99d641651572a211212017952
            }
        }).catch(() => {
            message.error('????????????????????????')
        })


    }
    return (
        <div>
            <Card>
                <Button type='primary' icon={<ArrowLeftOutlined />} onClick={back}>??????</Button>
                <Form
                    form={editForm}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ width: "33%", margin: "0 auto", }}>
                    <Form.Item label="????????????" name="deptname"
                        rules={[{ required: true, message: '?????????????????????' }, { min: 4 }]}
                    >
                        <Input placeholder='???????????????????????????' />
                    </Form.Item>
                    <Form.Item label="????????????" name="location"
                        rules={[{ required: true, message: '????????????????????????' }, { min: 2 }]}
                    >
                        <Input placeholder='????????????????????????????????????' />
                    </Form.Item>
                    <Form.Item label="???????????????" name="count"
                        rules={[{ required: true, message: '???????????????????????????' },]}
                    >
                        <Input placeholder='???????????????????????????????????????' />
                    </Form.Item>
                    <div style={{ textAlign: "center" }}>
                        <Button type='primary' icon={<FormOutlined />} onClick={confirmEditGroup}>????????????</Button>
                    </div>
                </Form>
            </Card>
        </div >
    )

}
export default EditGroup