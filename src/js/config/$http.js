import axios from 'axios'

const ERROR_MAP = {

}

const BASE_PATH = location.protocol + '//api.jianghu.local'

let http = axios.create({
    baseURL: BASE_PATH,
    timeout: 10000,
    // retry: 3,
    // retryDelay: 1000,
    header:{
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-cache'
    }
})

http.interceptors.request.use(req => {
    // let token = window.all.tool.getSession('token')
    let Authorization = window.all.tool.getLocal('Authorization')
    // let expires = new Date(window.all.tool.getSession('expires_at')).getTime()
    // let now = new Date().getTime()
    let not_login = req.url.indexOf('/merchant-api/login')=== -1        // 并非 /login页面
    if(Authorization && not_login){
        req.headers.Authorization = Authorization   // 这是token+token_type
        
    }
    return req
})
http.interceptors.response.use(res =>{
    if(res&& res.data && res.data.code!=='200'){
        window._Vue_.$toast.error(res.data.message)
    }
    return res.data
},error => {
    alert(error)
    // window._Vue_.$toast(error.toString())
})

export default http