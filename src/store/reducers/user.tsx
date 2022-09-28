import { USEROUT, SETTOKEN, SETUSERINFO } from "../constant";
interface userInfo {
    isLogin: boolean,
    userToken: string | number,
    userInfo: []
}
class userInit {
    userList: userInfo = {
        isLogin: false,
        userToken: '',
        userInfo: []
    }
}

export default function userLoginControl(preState = new userInit(), action: any) {
    const { type, data } = action
    switch (type) {
        case SETTOKEN:
            preState.userList.userToken = data.token
            preState.userList.isLogin = true
            // localStorage.setItem('userInfo', JSON.stringify(preState))
            return { ...preState }
        case SETUSERINFO:
            preState.userList.userInfo = data.Info
            // localStorage.setItem('userInfo', JSON.stringify(preState))
            return { ...preState }
        case USEROUT:
            preState = new userInit()
            return { ...preState }
        default:
            return preState
    }
}