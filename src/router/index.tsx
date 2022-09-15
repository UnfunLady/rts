import { Navigate } from 'react-router-dom'
import { MenuOutlined, SolutionOutlined, HomeOutlined, MoneyCollectOutlined, AppstoreOutlined, UserOutlined, TeamOutlined } from '@ant-design/icons';
import HomeView from '../views/HomeView'
import MainView from '../views/MainView'
import EmployeView from '../views/EmployeView'
import EmployeInfo from '../views/EmployeView/EmployeInfo'
import EmployeSalary from '../views/EmployeView/EmployeSalary';
import SalaryIndexView from '../views/EmployeView/EmployeSalary/IndexView';
import DepartmentSalaryDetail from '../views/EmployeView/EmployeSalary/IndexView/departmentSalaryDetail';
import EmployeDetailView from '../views/EmployeView/EmployeSalary/IndexView/employeDetailView';
import DepartmentView from '../views/DepartmentView';
import DepartmentEditView from '../views/DepartmentView/DepartmentEditView'
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
    {
        path: '/homeView/employeView/employeSalary',
        show: false,
        element: (
            <>
                <Navigate to="/homeView/employeView/employeSalary/salaryIndexView" />
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
                    {
                        path: 'employeSalary',
                        element: <EmployeSalary />,
                        icon: <MoneyCollectOutlined />,
                        title: '薪资管理',
                        breadcrumbName: '薪资管理',
                        show: true,
                        children: [
                            {
                                path: 'salaryIndexView',
                                element: <SalaryIndexView />,
                                icon: <UserOutlined />,
                                title: '部门薪资管理',
                                breadcrumbName: '部门薪资管理',
                                show: true,
                            },
                            {
                                path: 'departmentSalaryDetail',
                                element: <DepartmentSalaryDetail />,
                                icon: <UserOutlined />,
                                title: '部门薪资管理',
                                breadcrumbName: '部门薪资管理',
                                show: true,
                            },
                            {
                                path: 'employeDetailView',
                                element: <EmployeDetailView />,
                                icon: <UserOutlined />,
                                title: '员工工资明细',
                                breadcrumbName: '员工工资明细',
                                show: true,
                            },
                        ]
                    },
                ]
            },
            {
                path: 'department',
                element: <DepartmentView />,
                title: '部门菜单',
                breadcrumbName: '部门菜单',
                icon: <HomeOutlined />,
                show: true,
                children: [
                    {
                        path: 'departmentView',
                        element: <DepartmentEditView />,
                        title: '现有部门信息',
                        breadcrumbName: '现有部门信息',
                        icon: <SolutionOutlined />,
                        show: true
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
    '/homeView/employeView/employeSalary': '薪资管理',
    '/homeView/employeView/employeSalary/salaryIndexView': '全部信息',
    '/homeView/employeView/employeSalary/departmentSalaryDetail': '部门薪资信息',
    '/homeView/employeView/employeSalary/employeDetailView': '部门员工薪资信息',
    '/homeView/department': '部门菜单',
    '/homeView/department/departmentView': '现有部门信息'
};
export default routes