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
window.io = io
window.Echo = new Echo({
    broadcaster: 'socket.io',
    host: 'http://echo.397017.com:6001' // laravel-echo-server host
});

Vue.use(plugins)
window.$ = $
window.all = {
    tool,
    store,
    router,
    menu_list,
    echarts,
    // wangeditor
};

Vue.config.productionTip = true  // TODO: 以后改为false
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
