import { Navigate } from 'react-router-dom'
import { MenuOutlined, SolutionOutlined, SafetyOutlined, AreaChartOutlined, InsuranceOutlined, HomeOutlined, BlockOutlined, DatabaseOutlined, MoneyCollectOutlined, AppstoreOutlined, UserOutlined, TeamOutlined, DeleteOutlined } from '@ant-design/icons';
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
import AddGroupView from '../views/DepartmentView/AddGroupView'
import AddDepartmentView from '../views/DepartmentView/AddDepartmentView';
import DeleteDepartmentView from '../views/DepartmentView/DeleteDepartmentView';
import DMainView from '../views/DepartmentView/DeleteDepartmentView/MainView'
import EvilControl from '../views/EvilControl';
import ChinaInfo from '../views/EvilControl/ChinaInfo';
import CompanyInfo from '../views/EvilControl/CompanyInfo';
import ShowNoCovid from '../views/EvilControl/ShowNoCovid';
import LoginView from '../views/LoginView';
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

    {
        path: '/homeView/department',
        show: false,
        element: (
            <>
                <Navigate to="/homeView/department/departmentView" />
            </>
        ),
    },
    {
        path: '/homeView/department/deleteDepartmentView',
        show: false,
        element: (
            <>
                <Navigate to="/homeView/department/deleteDepartmentView/mainView" />
            </>
        ),
    },
    {
        path: '/homeView/evilControl',
        show: false,
        element: (
            <>
                <Navigate to="/homeView/evilControl/chinaInfo" />
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
                        show: true,
                        children: [
                            {

                            },
                        ]
                    },
                    {
                        path: 'addGroupView',
                        element: <AddGroupView />,
                        title: '组织新小组',
                        breadcrumbName: '组织新小组',
                        icon: <BlockOutlined />,
                        show: true,
                        children: [
                            {

                            },
                        ]
                    },
                    {
                        path: 'addDepartmentView',
                        element: <AddDepartmentView />,
                        title: '创建新部门',
                        breadcrumbName: '创建新部门',
                        icon: <DatabaseOutlined />,
                        show: true,
                        children: [
                            {

                            },
                        ]
                    },

                    {
                        path: 'deleteDepartmentView',
                        element: <DeleteDepartmentView />,
                        title: '解散部门或小组',
                        breadcrumbName: '解散部门或小组',
                        icon: <DeleteOutlined />,
                        show: true,
                        children: [
                            {
                                path: 'mainView',
                                element: <DMainView />,
                                icon: <UserOutlined />,
                                title: '部门删除管理',
                                breadcrumbName: '部门删除管理',
                                show: true,
                            },
                        ]
                    },
                ]
            },
            {
                path: 'evilControl',
                element: <EvilControl />,
                title: '疫情防控',
                breadcrumbName: '疫情防控',
                icon: <SafetyOutlined />,
                show: true,
                children: [
                    {
                        path: 'chinaInfo',
                        element: <ChinaInfo />,
                        title: '全国疫情信息',
                        breadcrumbName: '全国疫情信息',
                        icon: <AreaChartOutlined />,
                        show: true,
                    },
                    {
                        path: 'companyInfo',
                        element: <CompanyInfo />,
                        title: '公司防控信息',
                        breadcrumbName: '公司防控信息',
                        icon: <InsuranceOutlined />,
                        show: true,
                        children: [

                        ]
                    },
                    {

                        path: 'showNoCovid',
                        element: <ShowNoCovid />,
                        title: '相关员工信息',
                        breadcrumbName: '相关员工信息',
                        icon: <InsuranceOutlined />,
                        show: false,
                        activePath: '/homeView/evilControl/companyInfo',
                    }
                ]
            }
        ]
    },
    {
        path: '/',
        element: <Navigate to="/homeView/mainView" />,
        show: false
    },
    {
        path: '/loginView',
        element: <LoginView />,
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
    '/homeView/department/departmentView': '现有部门信息',
    '/homeView/department/departmentView/editGroup': '修改小组信息',
    '/homeView/department/addGroupView': '组织新小组',
    '/homeView/department/addDepartmentView': '创建新部门',
    '/homeView/evilControl': '疫情防控',
    '/homeView/evilControl/chinaInfo': '全国疫情信息',
    '/homeView/evilControl/companyInfo': '公司疫情信息',
    '/homeView/evilControl/showNoCovid': '相关员工信息',
};
export default routes