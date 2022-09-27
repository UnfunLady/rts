import request from '../../http'
interface loginData {
    username: string,
    password: string
}
// 登录请求接口
const reqUserLogin = (data: loginData) => {
    return request({ url: '/login', method: 'post', data })
}
const loginApi = {
    reqUserLogin
}
export default loginApi