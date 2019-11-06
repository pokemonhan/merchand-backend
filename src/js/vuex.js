import Vue from 'vue'
import Vuex from 'vuex';


Vue.use(Vuex);

const state = {
    isShowLoading: false,
    tab_nav_list:[]         // 顶部导航菜单
};
const mutations = {};
for (let item in state) {
    mutations['update'+item] = (state, value) => {
        state[item] = value
    }
}
console.log(mutations, 'mutations')
export default new Vuex.Store({
    state,
    mutations
})