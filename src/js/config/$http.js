'use strict';
import axios from 'axios'
import router from '../router'
// import { Loading } from 'element-ui'
import JsEncrypt from 'jsencrypt'  // ras 工具
import CryptoJS from 'crypto-js' // aes 工具

// //偏移量 由前端每次请求随机生成 16位
var IV = randomString(16);
// //AES加密KEY 由前端自己每次请求随机生成
var KEY = randomString(16);
var public_key = "-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCgy6JOupuDqE9itVQvGSBDJotBEJFASuklIwvcMNtXUH99PdihJ+TJN2AjNphzCdgL9KlguDG+u4C719DZOC3YrGn7Ps9vWOFtQYLzh69cGd+nlqOR4LKVSAYRn2NtrV9elAzBjie/Y7ITMsU9+ZTsccRqb+qd+OlBsYdg9dhvVQIDAQAB-----END PUBLIC KEY-----";

//随机串
function randomString (len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; //默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
    var maxPos = $chars.length;
    var pwd = '';
    for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

/**
 * AES加密数组 传入参数为需要传递的数组JSON
 */
function AES_encrypt (data, KEY, IV, pkcs8_public) {
    // console.log('aes 里面的data: ', data);
    var key_utf8 = CryptoJS.enc.Utf8.parse(KEY);// 秘钥
    var iv_utf8 = CryptoJS.enc.Utf8.parse(IV);//向量iv
    let srcs = ''
    switch (typeof (data)) {
        case 'string':
            srcs = CryptoJS.enc.Utf8.parse(data)
            break;
        case 'object':
            srcs = CryptoJS.enc.Utf8.parse(JSON.stringify(data))
            break;
        default:
            srcs = CryptoJS.enc.Utf8.parse(data.toString())
    }
    //AES 加密
    var encrypted = CryptoJS.AES.encrypt(srcs, key_utf8, { iv: iv_utf8, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString();
    //RSA 加密 组包
    return pack(encrypted, IV, KEY, pkcs8_public)
}

//组包
function pack (encrypted, iv, key, pub_key) {
    var jsencrypt = new JsEncrypt();
    jsencrypt.setKey(pub_key);
    var rsa_iv = jsencrypt.encrypt(iv);
    var rsa_key = jsencrypt.encrypt(key);
    var splitFlag = 'aesrsastart';
    var res_data = encrypted + splitFlag + rsa_iv + splitFlag + rsa_key
    return res_data
}
// aes 解码
function aesDecrypt (data, iKey, iValue) {
    var decrypted = '';
    decrypted = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(iKey), {
        iv: CryptoJS.enc.Utf8.parse(iValue),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}
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
// console.log('BASE_PATH: ', process.env);
let http = axios.create({
    baseURL: BASE_PATH,
    timeout: 30000,
    // retry: 2,
    // retryDelay: 1000,
    // withCredentials : true,
    header: {
        // 'Content-Type': 'application/json; charset=utf-8',
        'Content-Type': 'application/json',
        // 'content-type': 'application/x-www-form-urlencoded;',
        'Cache-Control': 'no-cache',
    },

    // 设置 状态码范围
    validateStatus: function (status) {
        // return status >= 100 && status <= 600;
        return true
    },
})

// let loading = null
let loadingEle = null

// 请求预设 ---
http.interceptors.request.use(req => {
    // console.log('req: ', req);
    if (!loadingEle) {
        loadingEle = document.getElementById('g-loading')
    }
    if (loadingEle && loadingEle.style) {
        loadingEle.style.display = 'block'
    }

    let Authorization = window.all.tool.getLocal('Authorization')
    // let expires = new Date(window.all.tool.getLocal('expires_at')).getTime()
    // let now = new Date().getTime()
    // let not_login = req.url.indexOf('/merchant-api/login') === -1        // 并非 /login页面
    if (Authorization) {
        req.headers.Authorization = Authorization   // 这是token+token_type
        // if (expires && now > expires) {
        //     // alert('token已经超时,请重新登陆..')
        //     // window._Vue_.$router.push('/login')
        // }
    }

    //加密后的数据 json 直接传递给后端

    if (req.method !== 'get') {
        let data = JSON.parse(JSON.stringify(req.data))
        var encrypt_data = AES_encrypt(data, KEY, IV, public_key);
        // console.log('进来加密encrypt_data: ', encrypt_data);
        let request = {
            data: encrypt_data
        }
        req.data = request
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
    
    // let data = res.data
    // console.log('data: ', data);
    if (res && res.data) {
        if (res.status !== 200) {
            // 401 跳转到login 登录
            if (res.status === 401) {
                res.data.message && window.__vm__.$toast.error(res.data.message)
                router.push('/login')
                return res.data
            }

            let message = res.message || res.data.message
            if (message) {
                window.__vm__.$toast.error(message)
            } else {
                window.__vm__.$toast.error('出现服务问题或被禁止!')
            }
        } else {
            let cryptData = res.data.data
            let cryptDataArr = cryptData.split("hDdoAPaXI3S") // TODO: 为什么是这个几个

            // 如果不符合 直接返回
            if (cryptDataArr.length !== 3) return res.data
            var cryptDataStr = cryptDataArr[0];
            var privateKey = "-----BEGIN PRIVATE KEY-----MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAPTYUA2oNnnEwCM+firQEh3qtvhzy2sPcCCPBuk1ALN98ThFtwbsAIXn4iflC8cL74OxsW5LhVLqRaNJwrj19nUWRNg2V0UG0qiSMDoFQzcf14Tl3YEMVhHmhT60KEc/mcOkGp7BGFneNRkUrnAedUPaI18hHfwlOXCTBOXjsLEHAgMBAAECgYAOsZCUUTz7r8gMFWsC7Lu5meVjIafag/GpsouqoSiqnOtGAkEKpE0fvBvBYyiCyH+WOqq4QMX+hNqrAvkxmmkw3Zj6pqGIGBm8qP0sC7kV9l3+1GyNweBaPqnZs02Kb3WCZnw8h1NaJRR9uqXFITzLkNgxEOuq9oiQqmI9UmP7sQJBAP1qL2O32RS/i08lCHR1r/XQTF/0pkSPX+a6SEf25iewzKm5do8hOtSG7+zjOlOQwsGwCPuNovz5g8BPMv2juQ8CQQD3V78skMtTp+0c6WjVh5ORIkkYAyOnSfl3nigkQKCfGyiTwX1cm3GLTHkDHZBVJjFyz8U/ngZZbG8ScHZCMtiJAkEAroiApQxNXaXiu5rE7PjVPNa+k2P7U8LviQiJmc7pizKQcuDCUCfRzeg1vJBvbniIOkAUn7RYKiVrYXrqopgtbwJAd+zzpIgQDd+99+a0DdROmHAnQJ1FDDex3W2xyOIM/xgL9Jg8UEqOIxxREFGlSaPbFe/nk5DrQzBwKmCc9jvxAQJALe9ZaKqPeZywh2aUa8huotTe5lj/iDeGdHOgxx4xkDK9ddzuSks1dbJQ/gHl8lA7MjOI6TvtgeLB9FOOvsi5EQ==-----END PRIVATE KEY-----";
            var jsencrypt = new JsEncrypt();
            jsencrypt.setPrivateKey(privateKey);
            var iValue = jsencrypt.decrypt(cryptDataArr[1]);
            var iKey = jsencrypt.decrypt(cryptDataArr[2]);
            var aesDecryptData = aesDecrypt(cryptDataStr, iKey, iValue);
            var dataArr = JSON.parse(aesDecryptData);
            // context.responseData = dataArr;
            // console.log('dataArr', dataArr);
            res.data = dataArr
            return res.data
        }
        return res.data
    } else {

        let message = res.message || res.data.message
        if (message) {
            window.__vm__.$toast.error(message)
        } else {
            window.__vm__.$toast.error('出现服务问题或被禁止!!')
        }
        if (res) {
            // console.log('错误信息未知?', res)
        }
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
