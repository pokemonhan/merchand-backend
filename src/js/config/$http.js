import axios from 'axios'

const ERROR_MAP = {

}

const BASE_PATH = location.protocol + '//'

let http = axios.create({
    baseURL: BASE_PATH,
    timeout: 10000,
    // retry: 3,
    retryDelay: 1000,
    header:{
        'Content-Type': 'application/json; charset=utf-8'
    }
})

http.interceptors.request.use(req => {
    // let token = window.all.tool.getSession('token')
    // if(token){
    //     req.header.token= token
    //     if(isToken)
    // }
    // req.headers.token=sessionStorage.getItem('token')
    return req
})
http.interceptors.response.use(res =>{
    // if(true){}
    return res
})

export default http