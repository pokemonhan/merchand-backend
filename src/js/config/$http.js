'use strict';
import axios from 'axios'
import router from '../router'

// 如果指令是 [npm run build --  inner]  那么inner 就是 HOST的内容 
// ps:默认为 inner。  prod.env.js中设置
let HOST = process.env.HOST
console.log('HOST: ', HOST);


let hostList = {
    inner: location.protocol + '//api.jianghu.local',    // 测试站内网
    outer: location.protocol + '//api.397017.com',       // 测试外围
    harris: location.protocol + '//api.jianghu.me',      // harris
    ethan: location.protocol + '//api.jianghu.ethan',    // ethan
}
// 有数据,但匹配不到就直接使用HOST地址 
const BASE_PATH = hostList[HOST] || HOST
// const BASE_PATH = hostList[HOST]
// console.log('BASE_PATH: ', process.env);
let http = axios.create({
    baseURL: BASE_PATH,
    timeout: 10000,
    // retry: 2,
    // retryDelay: 1000,
    // withCredentials : true,

    header: {
        'Content-Type': 'application/json; charset=utf-8',
        // 'content-type' : 'application/x-www-form-urlencoded',
        'Cache-Control': 'no-cache',
    },

    // 设置 状态码范围
    validateStatus: function (status) {
        return status >= 100 && status <= 600;
    },
})
// let data={
//     a:'a',
//     b: 'b',
// }
// http.post('/merchant-api/login',data).then(res=>{
//     console.log('res: ', res);

// })
// 请求预设 ---

http.interceptors.request.use(req => {
    let Authorization = window.all.tool.getLocal('Authorization')
    // let expires = new Date(window.all.tool.getLocal('expires_at')).getTime()
    // let now = new Date().getTime()
    let not_login = req.url.indexOf('/headquarters-api/login') === -1        // 并非 /login页面
    if (Authorization && not_login) {
        req.headers.Authorization = Authorization   // 这是token+token_type
        // if (expires && now > expires) {
        //     // alert('token已经超时,请重新登陆..')
        //     // window._Vue_.$router.push('/login')
        // }
    }
    return req
})

// 后台返回数据 全局预设 ---
http.interceptors.response.use(res => {
    // let data = res.data
    if (res && res.data) {
        if (res.data.code !== '200') {

            if (res.status !== 200) {
                // 401 跳转到login 登录
                if (res.status === 401) {
                    res.data.message && window.__vm__.$toast.error(res.data.message)
                    // router.push('/login')
                    return res.data
                }

                let message = res.message || res.data.message
                if (message) {
                    window.__vm__.$toast.error(message)
                } else {
                    window.__vm__.$toast.error('出现服务问题或被禁止')
                }
                // console.log(res)
            }
        }
    } else {

        let message = res.message || res.data.message
        if (message) {
            window.__vm__.$toast.error(message)
        } else {
            window.__vm__.$toast.error('出现服务问题或被禁止')
        }
        if (res) {
            console.log('错误信息未知?', res)
        }
    }

    return res.data
}, (error) => {
    // error && alert(error.response)
    error && window.__vm__.$toast.error('出现网络服务问题')
    // return Promise.resolve(error)
})

export default http
