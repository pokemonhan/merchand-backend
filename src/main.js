// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './js/router'
import store from './js/vuex'

import tool from './js/tool'                  // 常用工具
import plugins from './js/plugins.js'         // 1.公用组件, 2.指令,  3.axios

import echarts from 'echarts'
// import wangeditor from 'wangeditor'   // 发邮件页面有引用          // wangeditor 富文本 ,使用见官网————备用
import menu_list from './js/menuList'           // 菜单目录

import $ from 'jquery'                          // jquery
import xss from 'xss'

import Echo from 'laravel-echo'
import io from 'socket.io-client'
// import io from './js/config/socket2'
// websocket
// import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

window.io = io
let HOST = process.env.HOST
// console.log('host',HOST)
let echoHost=""
if(HOST=="stg"){
    echoHost="http://echo.397017.com:6001"
}
if(HOST=="outer"){
    echoHost="http://echodev.397017.com:6002"
}else{
    echoHost="http://echo.397017.com:6001" 
}
window.Echo = new Echo({
    broadcaster: 'socket.io',
    host:echoHost  // laravel-echo-server host
});

Vue.use(plugins)
// Vue.use(ElementUI)
window.$ = $
window.all = {
    tool,
    store,
    router,
    menu_list,
    echarts,
    // wangeditor
};

Vue.config.productionTip = false  // TODO: 以后改为false
// 防止xss 攻击
Object.defineProperty(Vue.prototype, '$xss', {
    value: xss
  })
/* eslint-disable no-new */
window.__vm__= new Vue({
    el: '#app',
    store,
    router,
    components: { App },
    template: '<App/>'
})
