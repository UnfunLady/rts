import React, { useState } from 'react'
import Header from '../../../component/Header'
import { Button, Card, Form, Input, message, Modal, Upload, UploadProps } from 'antd'
import { RcFile, UploadFile } from 'antd/lib/upload';
import { LoadingOutlined, PlusOutlined, RollbackOutlined, CheckOutlined } from '@ant-design/icons'
import { useForm } from 'antd/es/form/Form';
import { addDepartment } from '../../../type/department';
export default function AddDepartmentView() {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<any>();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [openImg, setOpenImg] = useState(false)
    const [addDepartmentForm] = useForm()
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
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
            return false;
        }
        return false;
    };


    // 图片状态改变时
    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
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
    const resetForm = () => {
        addDepartmentForm.resetFields()
    }
    // 确认提交
    const confirmAdd = () => {
        addDepartmentForm.validateFields().then(async res => {
            const formData = new FormData();
            fileList.forEach(file => {
                formData.append('files[]', JSON.stringify(file as RcFile));
            });
            // 把要用的信息也添加进去
            formData.append('base64', imageUrl)
            // 修改的部门名
            formData.append('dname', res.dname)
            // 职责
            formData.append('explain', res.explain)
            const success = await addDepartment(formData)
            if (success) {
                message.success('添加部门成功')
                resetForm()
                removeImg()
            }
        }).catch(() => {
            message.warning('请按规定输入数据')
        })
    }
    return (
        <div style={{ margin: "30px" }}>
            <Header title='创建新部门' explain='创建新部门之前,请确认新部门不重复' />
            <div style={{ marginTop: "30px" }}>
                <Card>
                    <Form
                        form={addDepartmentForm}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        size='large'
                        style={{ margin: "0 auto", width: "25%" }}>
                        <Form.Item name="upload" className='uploadClass' label="部门头像" rules={[{ required: true, message: "请上传部门头像!" }]}>
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
                        <Form.Item name="dname" label="部门名字" rules={[{ required: true, message: "请输入部门名字!" }, { min: 2, max: 8, message: "部门名字位于2-8个字之间" }]}>
                            <Input placeholder='请输入新部门的名字' />
                        </Form.Item>
                        <Form.Item name="explain" label="部门职责" rules={[{ required: true, message: "请输入部门职责!" }, { min: 2, max: 70, message: "部门名字位于2-70个字之间" }]}>
                            <Input placeholder='请输入新部门的职责' />
                        </Form.Item>
                    </Form>
                    <div style={{ margin: "10px auto", textAlign: "center" }}>
                        <Button size="middle" icon={<RollbackOutlined />} type='primary' onClick={resetForm} >重置表单</Button>
                        <Button style={{ marginLeft: "30px" }} size='middle' icon={loading ? <LoadingOutlined /> : <CheckOutlined />} type='primary' onClick={confirmAdd}>确认提交</Button>
                    </div>
                </Card>
                <Modal width={800} open={openImg} title="图片预览" footer={null} onCancel={cancelOpen}>
                    <img alt="example" style={{ width: '100%' }} src={imageUrl} />
                </Modal>


            </div>
        </div>
    )

}