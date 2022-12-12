import React, { useEffect, useRef, useState } from 'react'
import { Avatar, Button, Card, Form, Input, message, Modal, Upload } from 'antd'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { updateHasAva, updateNoAva } from '../../../../../type/department';
import { ArrowLeftOutlined, ArrowRightOutlined, CheckOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import './index.less'
import PubSub from 'pubsub-js'
import { useNavigate } from 'react-router-dom';
interface propsType {
    editDeptData: any,
    change: Function,
    changeGroup: Function
}
export default function EditDepartment(props: propsType) {
    const navigate = useNavigate()
    // 回显
    const { avatar, explain, dname, dno } = props.editDeptData
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<any>();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [openImg, setOpenImg] = useState(false)
    const [editGroupForm] = Form.useForm();

    useEffect(() => {
        editGroupForm.setFieldsValue({
            dname,
            explain
        })
        // props改变时更新
    }, [props])
    // 返回小组
    const backDept = () => {
        props.change(false)
    }
    // 修改小组
    const goToGroup = () => {
        props.changeGroup(true)
    }
    // 图片转码
    const getBase64 = (img: RcFile, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
    };
    // 取消预览
    const cancelOpen = () => {
        setOpenImg(false)
    }
    // 上传前
    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('只能上传 JPG/PNG 文件!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('图片大小必须小于 2MB!');
            return false;
        }


        return false;
    };


    // 图片状态改变时
    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        console.log(newFileList);
        
        if (newFileList && newFileList.length > 0) {
            // 如果有头像 就添加 并且把放大的url也设置
            getBase64(newFileList[0].originFileObj as RcFile, url => {
                setImageUrl(url)
            })
            setFileList(newFileList);
        }

    };
    // upload按钮样式
    const uploadButton = (
        <div >
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
        </div>
    );
    // 预览
    const handlePreview = () => {
        setOpenImg(true)
    };

    // 删除
    const removeImg = () => {
        setFileList([])
    }
    // 提交修改
    const confirmUpload = async () => {
        const lengthFile = editGroupForm.getFieldValue('upload');
        // 如果有图片走图片请求
        if (lengthFile && lengthFile.length !== 0) {
            setLoading(true)
            editGroupForm.validateFields().then(async (res) => {
                if (res.upload.fileList.length > 0) {
                    const formData = new FormData();
                    fileList.forEach(file => {
                        // 
                        formData.append('file', file.originFileObj as File);

                    });
                    // 把要用的信息也添加进去
                    // formData.append('base64', imageUrl)
                    // 修改的部门名

                    formData.append('dname', editGroupForm.getFieldValue('dname'))
                    // 职责
                    formData.append('explain', editGroupForm.getFieldValue('explain'))
                    // 部门号
                    formData.append('dno', dno)
                    // 标识
                    formData.append('react', 'true')
                    if (dname === editGroupForm.getFieldValue('dname')) {
                        formData.append('notName', "true")
                    }
                    const success = await updateHasAva(formData)
                    if (success) {
                        // todo  pubsub  设置edit为false  显示show组件
                        props.change(false)
                        // 重置图片
                        editGroupForm.setFieldValue('upload', [])
                        setFileList([])
                        setLoading(false)
                        // pubsub  通知更新
                        PubSub.publish('getAllDept', true)
                    } else {
                        message.error('更新失败！')
                    }
                } else {
                    // todo  没有头像
                    console.log(2);
                    setLoading(false)
                }
            }).catch((err) => {
                setLoading(false)
                message.error('请按规定输入数据')
            })

        } else {

            if (dname === editGroupForm.getFieldValue('dname')) {
                console.log(1);
                // 如果名字没有修改就只修改职责
                const editDeptData = {
                    dno: dno,
                    explain: editGroupForm.getFieldValue('explain'),
                }
                const success = await updateNoAva({ editDeptData, notName: true })
                if (success) {
                    // pubsub  通知更新
                    props.change(false)
                    PubSub.publish('getAllDept', true)
                }
                else {
                    message.error('修改失败')
                }
            } else {
                // 无头像修改
                const editDeptData = {
                    dno: dno,
                    explain: editGroupForm.getFieldValue('explain'),
                    dname: editGroupForm.getFieldValue('dname')
                }
                const success = await updateNoAva({ editDeptData })
                if (success) {
                    // pubsub  通知更新
                    props.change(false)
                    PubSub.publish('getAllDept', true)
                }
                else {
                    message.error('修改失败')
                }
            }

        }


    }

    return (
        <div>
            <Card>
                <div>
                    <Button type='primary' icon={<ArrowLeftOutlined />} style={{ margin: "5px" }} size="middle" onClick={backDept}>返回部门信息</Button>
                    <Button type='primary' icon={<ArrowRightOutlined />} style={{ margin: "5px" }} size="middle" onClick={goToGroup}>修改小组信息</Button>
                </div>
                <div >
                    <Form
                        form={editGroupForm}
                        size='large'
                        style={{ width: "30%", margin: "0 auto" }}
                        name="editGroupForm"
                        labelAlign='right'
                        labelCol={{ span: 6 }}
                    >
                        <Form.Item label="当前部门头像">
                            <Avatar size="large" src={avatar} />
                        </Form.Item>
                        <Form.Item name="upload" className='uploadClass' label="修改部门头像">
                            <Upload
                                onRemove={removeImg}
                                name="file"
                                listType="picture-card"
                                className="avatar-uploader"
                                fileList={fileList}
                                action="/api/editDeptR"
                                beforeUpload={beforeUpload}
                                onChange={handleChange}
                                onPreview={handlePreview}
                                maxCount={1}

                            >
                                {uploadButton}
                            </Upload>
                        </Form.Item>
                        <Form.Item name="dname" label="部门名字" rules={[
                            { required: true, message: "请输入部门名字!", },
                            { min: 4, max: 8, message: "用户名必须是4-8位", },
                        ]}>
                            <Input placeholder='请输入要修改的名字' />
                        </Form.Item>
                        <Form.Item name="explain" label="部门职责" rules={[
                            { required: true, message: "请输入部门描述!", },
                            { min: 2, max: 70, message: "部门描述必须是2-70位", },
                        ]}>
                            <Input placeholder='请输入要修改的部门职责' />
                        </Form.Item>
                        <div style={{ textAlign: 'center' }}>
                            <Button type='primary' icon={<CheckOutlined />} onClick={confirmUpload} >确认提交</Button>
                        </div>

                    </Form>
                </div>
            </Card >
            <Modal width={800} open={openImg} title="图片预览" footer={null} onCancel={cancelOpen}>
                <img alt="example" style={{ width: '100%' }} src={imageUrl} />
            </Modal>
        </div >
    )

}