
import { useState, useEffect } from 'react'
// 引入路由表
import routes from '../../router'
// 引入location获取路径
import { useLocation, useNavigate, Outlet, Link } from 'react-router-dom';
import { Layout, Col, Row, Dropdown, Breadcrumb, Button, Menu, Avatar, message, Modal, Form, Tag, Input } from 'antd';
// 引入type数据
import type { MenuProps } from 'antd'
import { mainViewDataInit, getMenuNodes, updatePassword } from '../../type/mainView';
import { MenuFoldOutlined, MenuUnfoldOutlined, DownOutlined } from '@ant-design/icons';
import './index.less'
import { breadcrumbNameMap } from '../../router';
import PubSub from 'pubsub-js'
import RouterBeforeEach from '../../util/RouterBeforeEach';
import { useDispatch, useSelector } from 'react-redux';
import { USEROUT } from '../../store/constant';
import { useForm } from 'antd/es/form/Form';
const { Header, Sider, Content } = Layout;
type Props = {
}
const MainView = (props: Props) => {
    // didmount时初始化
    // 定义初始数据
    const [data, setData] = useState(new mainViewDataInit())
    // 获取要生成的路由
    // 路由对象
    const location = useLocation()
    const navitage = useNavigate()
    const dispatch = useDispatch()
    const userInfo = useSelector((state: any) => {
        return state.user.userList.userInfo || {}
    })

    // 过滤路由表
    const routesList = routes.filter((r: any) => {
        if (r.show && r.show === true) {
            return r
        } else {
            if (r.activePath) {
                return r
            }
        }
    })
    // 面包屑arr 
    const breadCrumbCheck = () => {
        const pathSnippets = location.pathname.split('/').filter((i) => i)
        // 遍历路由对象生成面包屑
        const extraBreadcrumbItems = pathSnippets.map((_, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            return (
                <Breadcrumb.Item key={url}>
                    <Link to={url}>{breadcrumbNameMap[url]}</Link>
                </Breadcrumb.Item>
            );
        })

        return extraBreadcrumbItems
    }
    // 递归筛选路由属性带有activePath的路由用于修改默认选中路径
    const checkActivePath = (routerList: any, locationName: Array<any>) => {
        routerList.map((route: any) => {
            if (route.children) {
                // 递归循环直到当前激活的路由
                return checkActivePath(route.children, locationName)
            } else {
                // 当前激活路由判断是否有activePath
                if (route.activePath && route.activePath.length > 0) {
                    if (route.path === locationName[locationName.length - 1]) {
                        data.mainViewData.defaultPath = route.activePath.split('/')
                        setData({ ...data })
                    }
                } else {
                    //   三级四级路由
                    switch (locationName.length) {
                        case 4:
                            data.mainViewData.OpenKeys = locationName.slice(0, 3)
                            break;
                        case 5:
                            data.mainViewData.OpenKeys = locationName.slice(0, 4)
                            break;
                    }
                    data.mainViewData.defaultPath = locationName
                    setData({ ...data })
                }
            }
        })
    }
    useEffect(() => {
        // 初始化路由菜单
        data.mainViewData.menuList = getMenuNodes(routesList as [])
        // 递归筛选路由属性带有activePath的路由用于修改默认选中路径
        checkActivePath(routesList, location.pathname.split('/'))
        setData({ ...data })
        // 重置路由的方法  用于全国疫情配合下文的outlet刷新路由
        PubSub.subscribe('reloadRouter', reloadRouter)
        return () => {
            PubSub.clearAllSubscriptions()
        }

    }, [location.pathname])

    // 修改合并阀门 控制菜单是否合并
    const changeClose = () => {
        data.mainViewData.isClose = !data.mainViewData.isClose
        setData({ ...data })
    }
    // 跳转路由
    const onClick: MenuProps['onClick'] = e => {
        // 修改默认选中菜单
        // data.mainViewData.defaultPath = e.keyPath
        setData({ ...data })
        if (e.keyPath.length > 1) {
            // 如果是二级以上菜单
            const to = e.keyPath[e.keyPath.length - 1] + '/' + e.key;
            navitage(to)
        } else {
            const to = e.key;
            navitage(to)
        }
    };
    const onOpenChange = (openKeys: string[]) => {

        data.mainViewData.OpenKeys = openKeys
        setData({ ...data })
    }
    // 控制outlet显示和隐藏
    const [isAlive, setAlive] = useState(true)
    const reloadRouter = () => {
        // 不显示路由
        setAlive(false)
        // 随后显示刷新 比location.reload 和router.go(0) 效果会好一点
        setTimeout(() => {
            setAlive(true)
        }, 10)
    }


    // 用户信息相关
    // 退出登录
    const userLogOut = () => {
        dispatch({ type: USEROUT, data: {} })
        navitage('/loginView')
        message.success('退出登录成功!')
    }
    // 菜单
    const menu = (
        <Menu
            items={[
                {
                    label: (
                        <span style={{ display: "block", }} onClick={() => setShowInfo(true)}>我的信息</span>
                    ),
                    key: '0',
                },
                {
                    label: (
                        <span style={{ display: "block", }} onClick={() => setShowPwd(true)} > 修改密码</span >
                    ),
                    key: '1',
                },
                {
                    label: (
                        <span style={{ display: "block", }} onClick={userLogOut}>退出登录</span>
                    ),
                    key: '2',
                },
            ]}
        />
    );
    // 修改密码表单
    const [updatePwdForm] = useForm()
    // 个人信息
    const [showInfo, setShowInfo] = useState(false)
    // 修改密码
    const [showPwd, setShowPwd] = useState(false)
    // 取消修改
    const cancelUpdatePwd = () => {
        setShowPwd(false)
        updatePwdForm.resetFields()
    }
    // 确定修改密码
    const updatePwd = () => {
        updatePwdForm.validateFields().then(async res => {
            if (res.confirmNewPwd === res.newPwd) {
                const updateSuccess = await updatePassword({
                    editInfo: {
                        nowPassword: res.nowPwd,
                        newPassword: res.newPwd,
                    },
                    user: userInfo.username
                })
                if (updateSuccess) {
                    setShowPwd(false)
                    updatePwdForm.resetFields()
                    // 退出登录
                    dispatch({ type: USEROUT, data: {} })
                    navitage('/loginView')
                }
            } else {
                message.warn('两次密码输入不一致!')
            }

        }).catch(err => {
            message.warning('请按要求输入数据！')
        })

    }


    return (
        <Layout>
            <Sider collapsed={data.mainViewData.isClose}>
                <Menu
                    onClick={onClick}
                    // 默认初始选中
                    selectedKeys={data.mainViewData.defaultPath.length > 0 ? data.mainViewData.defaultPath : location.pathname.split('/')}
                    defaultOpenKeys={data.mainViewData.OpenKeys}

                    openKeys={data.mainViewData.OpenKeys}
                    mode="inline"
                    theme="dark"
                    onOpenChange={onOpenChange}
                    items={data.mainViewData.menuList}
                >
                </Menu>
            </Sider>
            <Layout>
                <Header>
                    <div className='header'>
                        <Row align='middle'>
                            <Col span={1} >
                                <Button onClick={changeClose} type="link" icon={!data.mainViewData.isClose ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />} />
                            </Col>
                            <Col span={8} >
                                <Breadcrumb >{breadCrumbCheck()}</Breadcrumb>
                            </Col>
                            <Col span={11} ></Col>
                            <Col span={3} >
                                <Dropdown overlay={menu}>
                                    <div className='userInfo'>
                                        <Avatar src={userInfo.avatar} />
                                        <span>{userInfo.nickname}</span>
                                        <DownOutlined />
                                    </div>
                                </Dropdown>
                            </Col>
                        </Row>
                    </div>
                </Header>
                <Content>
                    {isAlive ? <RouterBeforeEach /> : ''}
                </Content>
            </Layout>
            {/* 个人信息 */}
            <Modal open={showInfo} onCancel={() => setShowInfo(false)} title="管理员信息" width={600} footer={
                <Button onClick={() => setShowInfo(false)}>我知道了</Button>
            }>
                <Form size='large' labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
                    <Form.Item label="当前头像">
                        <Avatar src={userInfo.avatar} />
                    </Form.Item>
                    <Form.Item label="用户名/权限">
                        <Tag color='processing'>{userInfo.username}</Tag>
                        <Tag color='error'>{userInfo.level == 1 ? "超级管理员" : "普通管理员"}</Tag>
                    </Form.Item>
                    <Form.Item label="用户昵称">
                        <Tag color='processing'>{userInfo.nickname}</Tag>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal open={showPwd} onCancel={cancelUpdatePwd} title="修改密码" width={700} footer={
                <div>
                    <Button type='primary' onClick={cancelUpdatePwd}>取消修改</Button>
                    <Button type='primary' onClick={updatePwd}>确认修改</Button>
                </div>
            }>
                <Form form={updatePwdForm} size='large' labelCol={{ span: 4 }} wrapperCol={{ span: 19 }}>
                    <Form.Item name='nowPwd' label="当前密码" rules={[{ required: true, message: "当前密码不能为空!" }, { min: 5, message: "最少输入5位字符" }]}>
                        <Input placeholder='请输入当前账号密码' />
                    </Form.Item>
                    <Form.Item name='newPwd' label="新密码" rules={[{ required: true, message: "新密码不能为空!" }, { min: 5, message: "最少输入5位字符" }]}>
                        <Input.Password placeholder='请输入新密码' />
                    </Form.Item>
                    <Form.Item name='confirmNewPwd' label="确认新密码" rules={[{ required: true, message: "确认密码不能为空!" }, { min: 5, message: "最少输入5位字符" }]}>
                        <Input.Password placeholder='请确认新密码' />
                    </Form.Item>
                </Form>
            </Modal>
        </Layout >

    )
}

export default MainView