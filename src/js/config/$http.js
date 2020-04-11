'use strict';
import axios from 'axios'
import router from '../router'
// import { Loading } from 'element-ui'

import AES_encrypt from './AES_encrypt'
import AES_decrypt from './AES_decrypt'

// 如果指令是 [npm run build --  inner]  那么inner 就是 HOST的内容 
// ps:默认为 inner。  prod.env.js中设置
let HOST = process.env.HOST

let hostList = {
    inner: location.protocol + '//api.jianghu.local',    // 测试站内网
    outer: location.protocol + '//api.397017.com',       // 测试外围
    harris: location.protocol + '//api.jianghu.me',      // harris
    ethan: location.protocol + '//apionline.jianghu.ethanphp',    // ethan
}
// 有数据,但匹配不到就直接使用HOST地址 
const BASE_PATH = hostList[HOST] || HOST
// const BASE_PATH = hostList[HOST]
let http = axios.create({
    baseURL: BASE_PATH,
    timeout: 30000,
    // retry: 2,
    // retryDelay: 1000,
    // withCredentials : true,
    header: {
        'Content-Type': 'application/json; charset=utf-8',
        // 'content-type': 'application/x-www-form-urlencoded;',
        'Cache-Control': 'no-cache',
    },

    // 设置 状态码范围
    validateStatus: function (status) {
        return true
    },
})

// let loading = null
let loadingEle = null

// 请求预设 ---
http.interceptors.request.use(req => {
    console.log('req: ', req);
    if (!loadingEle) {
        loadingEle = document.getElementById('g-loading')
    }
    if (loadingEle && loadingEle.style) {
        loadingEle.style.display = 'block'
    }

    let Authorization = window.all.tool.getLocal('Authorization')
    // let expires = new Date(window.all.tool.getLocal('expires_at')).getTime()
    // let now = new Date().getTime()
    // let not_login = req.url.indexOf(BASE_PATH+'/merchant-api/login') === -1        // 并非 /login页面
    if (Authorization) {
        req.headers.Authorization = Authorization   // 这是token+token_type
        // if (expires && now > expires) {
        //     // alert('token已经超时,请重新登陆..')
        //     // window._Vue_.$router.push('/login')
        // }
    }

    if (req.data) {
        let upload = '/merchant-api/upload'
        // 上传图片不加密
        if(req.url !== upload) {
            let data = JSON.parse(JSON.stringify(req.data))
            var encrypt_data = AES_encrypt(data);
            // console.log('进来加密encrypt_data: ', encrypt_data);
            let request = {
                data: encrypt_data
            }
            req.data = request

        }
    }

    return req
})


// 后台返回数据 全局预设 ---
http.interceptors.response.use(res => {
    // console.log('res: ', res);

    // loading 样式设置
    if (loadingEle && loadingEle.style) {
        loadingEle.style.display = 'none'
    }

    if (res && res.data) {
        res.data = AES_decrypt(res.data)
        
        let message = res.message || res.data.message
        if (res.status === 200) {

            if (res.data.code !== '200') {
                // console.log('code !=200 : ', res.data);
                message = message || 'data.code is not 200!'
                window.__vm__.$toast.error(message)
            }
        } else {
            // console.log('出错时: ', res.data);
            if (res.status === 401) {
                message = message || '401 未登录，或者没权限'
                window.__vm__.$toast.error(message)
                router.push('/login')
            }
            if (res.status === 403) {
                message = message || '403, 请注意权限'
                window.__vm__.$toast.error(message)
            }
        }
        return res.data
    } else {
        window.__vm__.$toast.error('没有data数据，出现服务问题或被禁止!')
        // console.log('res: ', res);
        return res

    }
}, (error) => {
    // console.log('error: ', [error]);
    if (loadingEle && loadingEle.style) {
        loadingEle.style.display = 'none'
    }
    error && window.__vm__.$toast.error('出现网络服务问题.')
})

export default http
