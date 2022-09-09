import { Navigate } from 'react-router-dom'
import { MenuOutlined, AppstoreOutlined, UserOutlined, TeamOutlined } from '@ant-design/icons';
import HomeView from '../views/HomeView'
import MainView from '../views/MainView'
import EmployeView from '../views/EmployeView'
import EmployeInfo from '../views/EmployeView/EmployeInfo'

// const HomeView = lazy(() => import('../views/HomeView'))
// const MainView = lazy(() => import('../views/MainView'))
// const EmployeView = lazy(() => import('../views/EmployeView'))
// const EmployeInfo = lazy(() => import('../views/EmployeView/EmployeInfo'))

// type Route = {
//     path: string,
//     element: React.ReactNode,
//     icon?: React.ReactNode,
//     title?: string,
//     children?: Array<Route>,
//     [propName: string]: any
// }
const routes: any = [
    //重定向
    {
        path: '/homeView',
        show: false,
        element: (
            <>
                <Navigate to="/homeView/mainView" />
            </>
        ),
    },
    {
        path: '/homeView/employeView',
        show: false,
        element: (
            <>
                <Navigate to="/homeView/employeView/employeInfo" />
            </>
        ),
    },
    //------------------------------------
    {
        path: '/homeView',
        element: (
            <>
                <HomeView />
            </>
        ),
        title: '首页',
        breadcrumbName: '首页',
        icon: <MenuOutlined />,
        showChildren: true,
        show: true,
        children: [
            {
                path: 'mainView',
                element: <MainView />,
                title: '首页信息',
                breadcrumbName: '首页信息',
                icon: <AppstoreOutlined />,
                show: true
            },
            {
                path: 'employeView',
                element: (
                    <EmployeView />
                ),
                icon: <TeamOutlined />,
                title: '员工菜单',
                breadcrumbName: '员工菜单',
                show: true,
                children: [
                    {
                        path: 'employeInfo',
                        element: <EmployeInfo />,
                        icon: <UserOutlined />,
                        title: '员工管理',
                        breadcrumbName: '员工管理',
                        show: true,
                    },
                ]
            },
        ]
    },
    {
        path: '/',
        element: <Navigate to="/homeView/mainView" />,
        show: false
    }
]
export const breadcrumbNameMap: Record<string, string> = {
    '/homeView': '首页',
    '/homeView/mainView': '首页信息',
    '/homeView/employeView': '员工菜单',
    '/homeView/employeView/employeInfo': '员工管理',
};
export default routes