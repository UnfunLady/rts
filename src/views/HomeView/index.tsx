
import React, { useState, useEffect } from 'react'
// 引入路由表
import routes from '../../router'
// 引入location获取路径
import { useLocation, useNavigate, Outlet, Link } from 'react-router-dom';
import { Layout, Col, Row, Breadcrumb, Button, Menu } from 'antd';
// 引入type数据
import type { MenuProps } from 'antd'
import { mainViewDataInit, getMenuNodes } from '../../type/mainView';
import { MenuFoldOutlined, MenuUnfoldOutlined, } from '@ant-design/icons';
import './index.less'
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import { breadcrumbNameMap } from '../../router';

const { Header, Sider, Content } = Layout;
type Props = {}
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
    useEffect(() => {
        // 初始化路由菜单
        data.mainViewData.menuList = getMenuNodes(routesList as [])
        // 刷新的时候获取默认路径
        const activePath: string[] = location.pathname.split('/')
        switch (activePath.length) {
            case 4:
                data.mainViewData.OpenKeys = activePath.slice(0, 3)
                break;
        }
        data.mainViewData.defaultPath = activePath
        setData({ ...data })
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

    return (
        <Layout>
            <Sider collapsed={data.mainViewData.isClose}>
                <Menu
                    onClick={onClick}
                    // 默认初始选中
                    selectedKeys={data.mainViewData.defaultPath.length > 0 ? data.mainViewData.defaultPath : location.pathname.split('/')}
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
                            <Col span={8} >3</Col>
                            <Col span={3} >4</Col>
                        </Row>
                    </div>
                </Header>
                <Content>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>

    )
}

export default MainView