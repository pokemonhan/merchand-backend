// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './js/router'
import store from './js/vuex'

import tool from './js/tool'
import plugins from './js/plugins.js'
var echarts = require('echarts')
import menuList from './js/menuList'

import $ from 'jquery'
Vue.use(plugins)
window.$ = $
window.all = {};

all.tool = tool;
all.store = store;
all.router = router;

all.menu_list = menuList;
all.echarts = echarts;
// console.log(all,'$tool');
// all.tool.setLocal("name","abc");

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
