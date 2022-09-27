
import { useState, useEffect } from 'react'
// 引入路由表
import routes from '../../router'
// 引入location获取路径
import { useLocation, useNavigate, Outlet, Link } from 'react-router-dom';
import { Layout, Col, Row, Dropdown, Breadcrumb, Button, Menu, Avatar } from 'antd';
// 引入type数据
import type { MenuProps } from 'antd'
import { mainViewDataInit, getMenuNodes } from '../../type/mainView';
import { MenuFoldOutlined, MenuUnfoldOutlined, DownOutlined } from '@ant-design/icons';
import './index.less'
import { breadcrumbNameMap } from '../../router';
import PubSub from 'pubsub-js'
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
        data.mainViewData.defaultPath = e.keyPath
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
    // 菜单
    const menu = (
        <Menu
            items={[
                {
                    label: (
                        <span>我的信息</span>
                    ),
                    key: '0',
                },
                {
                    label: (
                        <span>修改密码</span>
                    ),
                    key: '1',
                },
                {
                    label: (
                        <span>退出登录</span>
                    ),
                    key: '2',
                },
            ]}
        />
    );





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
                                        <Avatar />
                                        <span>UnfunLady</span>
                                        <DownOutlined />
                                    </div>
                                </Dropdown>
                            </Col>
                        </Row>
                    </div>
                </Header>
                <Content>
                    {isAlive ? <Outlet /> : ''}
                </Content>
            </Layout>
        </Layout>

    )
}

export default MainView