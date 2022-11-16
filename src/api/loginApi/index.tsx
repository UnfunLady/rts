import request from '../../http'
interface loginData {
    username: string,
    password: string
}
// 登录请求接口
const reqUserLogin = (data: loginData) => {
    return request({ url: '/api/login', method: 'post', data })
}
// 修改密码
const editPassword = (data: object) => {
    return request({
        url: '/api/editPassword', data, method: 'post'
    })
}
const loginApi = {
    reqUserLogin,
    editPassword
}

export default loginApi