import Vue from 'vue'
import Vuex from 'vuex';


Vue.use(Vuex);

const state = {
    isLogin: false,
    isShowLoading: false,
    showMask: false,

    loudSpeakerOpen: true, // 是否打开喇叭
    tab_nav_list: [],        // 顶部导航菜单
    BASE_PATH: '',
    keepAliveExclude: ['SendEmail'],   // 不需要缓存的 组件name
    picPrefix: window.location.protocol + '//pic.397017.com/', // 静态图片前缀
    loadingShow: false,
    //路由传参
    founds_incomeorder: 'Offline',
    aside_scroll_path: '', // 自动滚动的路径
};
const getters = {
    keepAliveInclude(state) {
        let home = []
        // 使导航条里的路由 保持keepalive 
        let arr = (state.tab_nav_list || []).map(item => {
            return item.name
        })
        return arr.concat(home)
    }
}
const mutations = {};
for (let key in state) {
    getters[key] = state => {
        return state[key]
    }
    let mutationKey = 'update' + key.charAt(0).toUpperCase() + key.slice(1)
    mutations[mutationKey] = (state, value) => {
        state[key] = value
    }
    
}
export default new Vuex.Store({
    state,
    getters,
    mutations
})