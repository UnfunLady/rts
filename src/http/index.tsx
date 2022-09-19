import axios from "axios";
import nprogress from 'nprogress'
import 'nprogress/nprogress.css';
import { message } from 'antd'
enum MSGS {
    // 自动递增
    '请求操作成功!' = 200,
    '用户名或密码错误!',//201
    '请求出现异常',//202
    '身份信息异常'//203
}

const request = axios.create({
    baseURL: '/api',
    timeout: 5000,
    headers: {
        "Content-Type": "application/json;charset=utf-8",
        
    }
})


request.interceptors.request.use(config => {
    nprogress.start()
    config.headers = config.headers || {};
    return config
})
request.interceptors.response.use(res => {
    const code: number = res.data.code
    // 如果身份过期
    if (code === 203) {
        nprogress.done()
        message.error(MSGS[code] + '       ' + res.data.msg)
        return Promise.reject(res.data)
    } else {
        if (code !== 200) {
            message.error(MSGS[code] + '       ' + res.data.msg)
            nprogress.done()
            return Promise.reject(res.data)
        }
        else {
            nprogress.done()
            return res.data
        }
    }
}, err => {
    message.error(
        '请求失败!'
    )
})

export default request

