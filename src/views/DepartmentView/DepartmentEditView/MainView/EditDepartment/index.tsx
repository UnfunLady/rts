import React, { useRef, useState } from 'react'
import { Avatar, Button, Card, Form, Input, message, Modal, Upload } from 'antd'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { ArrowLeftOutlined, ArrowRightOutlined, CheckOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import './index.less'
interface propsType {
    editDeptData: any
}
export default function EditDepartment(props: propsType) {
    const { avatar } = props.editDeptData
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [openImg, setOpenImg] = useState(false)
    const editGroupForm: any = useRef()
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
        }
        return false;
    };
    // 图片状态改变时
    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    // upload按钮样式
    const uploadButton = (
        <div >
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
        </div>
    );

    const handlePreview = (file: UploadFile) => {
        getBase64(file.originFileObj as RcFile, url => {
            setImageUrl(url)
        })
        setOpenImg(true)
    };

    return (
        <div>
            <Card>
                <div>
                    <Button type='primary' icon={<ArrowLeftOutlined />} style={{ margin: "5px" }} size="large">返回部门信息</Button>
                    <Button type='primary' icon={<ArrowRightOutlined />} style={{ margin: "5px" }} size="large">修改小组信息</Button>
                </div>
                <div >
                    <Form
                        ref={editGroupForm}
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

                                name="file"
                                listType="picture-card"
                                className="avatar-uploader"
                                fileList={fileList}
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                beforeUpload={beforeUpload}
                                onChange={handleChange}
                                onPreview={handlePreview}
                                maxCount={1}
                            >
                                {uploadButton}
                            </Upload>
                        </Form.Item>
                        <Form.Item name="dname" label="部门名字">
                            <Input placeholder='请输入要修改的名字' />
                        </Form.Item>
                        <Form.Item name="explain" label="部门职责">
                            <Input placeholder='请输入要修改的部门职责' />
                        </Form.Item>
                        <div style={{ textAlign: 'center' }}>
                            <Button type='primary' icon={<CheckOutlined />}  >确认提交</Button>
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