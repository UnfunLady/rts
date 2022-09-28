import { MenuProps, message } from 'antd';
import { loginView } from '../api'
type MenuItem = Required<MenuProps>['items'][number];
export interface mainViewData {
    menuList: [],
    isClose: boolean,
    defaultPath: string[],
    OpenKeys: string[]
}
export class mainViewDataInit {
    mainViewData: mainViewData = {
        // 菜单列表
        menuList: [],
        // 是否合并菜单栏
        isClose: false,
        // 默认路由激活路径
        defaultPath: [],
        // 默认选中菜单
        OpenKeys: []
    }
}

// 生成菜单的函数
function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[], type?: 'group',): MenuItem {
    return {
        key, icon, children, label, type,
    } as MenuItem;
}
export const getMenuNodes = (menuList: MenuItem[]) => {
    // console.log('mlist', menuList);
    var finalResult: any = []
    menuList.map((item: any) => {
        // 如果有子路由就生成多级菜单
        if (item.showChildren) {
            const routesMap = item.children.map((cd: any) => {
                if (cd.children && cd.children.length) {
                    // console.log('cd.children', getMenuNodes(cd.children));
                    return (
                        getItem(cd.title, cd.path, cd.icon,
                            // 递归遍历子路由
                            cd.children.map((cdc: any) => {
                                return cdc.show ? getItem(cdc.title, cdc.path, cdc.icon) : null
                            })
                        )
                    )
                } else {
                    return (
                        cd.show ?
                            getItem(cd.title, cd.path, cd.icon) : null
                    )
                }
            })
            finalResult = [...finalResult, ...routesMap]
            return finalResult
        } else {
            if (item.show) {
                // console.log('item.show', item);
            }
            return (
                item.show ?
                    getItem(item.title, item.path, item.icon) : null
            )
        }
    })

    return finalResult
}


// 修改密码
export const updatePassword = async (data: object) => {
    const res: any = await loginView.editPassword(data)
    if (res.code === 200) {
        message.success('修改密码成功请重新登录！')
        return true
    } else {
        message.error('修改密码失败！')
        return false
    }
}