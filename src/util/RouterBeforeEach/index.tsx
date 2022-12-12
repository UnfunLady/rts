import { useEffect, useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'
import routes from "../../router"
import { message } from "antd"
// 筛选路由 如果匹配了路径就返回路由信息 没有就返回null
// 不能用map 之类 不能return终止的
const checkAuth = (routers: any, path: String) => {
    for (const route of routers) {
        if ((route.absolutePath ? route.absolutePath : route.path) === path) {
            return route
        } else {
            if (route.children) {
                const res: any = checkAuth(route.children, path)
                return res
            }
        }
    }
    return null
}
// 筛选匹配的路由 返回信息出去
const checkRouterAuth = (path: String) => {
    let auth = null
    auth = checkAuth(routes, path)
    return auth
}
// 路由鉴权
const RouterBeforeEach = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [auth, setAuth] = useState(false)
    // 从store获取登录状态
    const isLogin = useSelector((state: any) => {
        return state.user.userList.isLogin
    })
    const userToken = useSelector((state: any) => {
        return state.user.userList.userToken
    })

    useEffect(() => {
        // 获取和当前路由路径匹配的路由
        const obj: any = checkRouterAuth(location.pathname)
        // 登录鉴权
        if (obj && obj.auth && isLogin == false && userToken == '') {
            setAuth(false)
            navigate('/loginView', { replace: true })
            message.warning('请先登录！')
        } else {
            // 鉴权成功返回true
            setAuth(true)
        }
    }, [location.pathname])
    // 返回outlet或null
    return auth ? <Outlet /> : null
}

export default RouterBeforeEach