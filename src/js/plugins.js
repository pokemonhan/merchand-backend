// 全局注册组件
import Input from '../components/commonComponents/Input.vue'
import Select from '../components/commonComponents/Select.vue'
import Date from '../components/commonComponents/DatePicker.vue'

import directives from './config/directive.js'

const components ={
    Input,
    Select,
    Date
}


export default {
    install(Vue){
        // 全局注册组件

        for(let key in components){
            Vue.component(key,components[key])
        }
        // 指令
        for(let key in directives) {
            Vue.directive(key, directives[key])
        }
    }
}