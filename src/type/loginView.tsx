import { message } from 'antd'
import { loginView } from '../api'
import { USEROUT, SETTOKEN, SETUSERINFO } from "../store/constant";
export const loginCheck = async (userInfo: { username: string, password: string }, dispatch: Function) => {
    const res: any = await loginView.reqUserLogin(userInfo)
    if (res && res.code === 200) {
        // 保存信息
        dispatch({ type: SETTOKEN, data: { token: res.token } })
        dispatch({ type: SETUSERINFO, data: { Info: res.Info } })
        return true
    } else {
        message.error('账号或密码错误或请求出现异常')
        return false
    }
}
