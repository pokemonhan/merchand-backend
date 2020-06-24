<template>
    <div class="contain" ref="contain">
        <ul class="level-1">
            <li
                v-for="(lev1, lev1_index) in (menu_list||[]).filter(item=>item.display)"
                :key="lev1_index"
            >
                <span
                    :class="['title',$route.path == lev1.path&&(!lev1.children)?'active-menu':'',curr_ul(lev1)?'lev1-active':'']"
                    @click="expandMenu(lev1,lev1_index)"
                >
                    <i :class="['iconfont '+lev1.icon, 'mr5']"></i>
                    <span class="title-name">{{lev1.label}}</span>
                    <span v-if="lev1.children" class="iconfont iconup right"></span>
                </span>

                <!-- 二级菜单 -->
                <ul :ref="lev1_index" :class="['level2',curr_ul(lev1)?'active-ul':'']">
                    <li
                        v-for="(lev2, lev2_index) in (lev1.children||[]).filter(item=>item.display)"
                        :key="lev2_index"
                    >
                        <!-- 标题 -->
                        <span
                            :ref="lev2.path"
                            :class="['title',$route.path == lev2.path?'active-menu':'']"
                            @click="expandMenu(lev2, lev1_index+'_'+lev2_index)"
                        >
                            <!-- <i :class="['iconfont', i.icon]"></i> -->
                            <span>{{lev2.label}}</span>
                            <span v-if="lev2.children" class="iconfont iconup right"></span>
                        </span>

                        <!-- ---------    三级菜单 ------------------------->
                        <ul :ref="lev1_index+'_'+lev2_index" class="level3">
                            <li v-for="(lev3, lev3_index) in lev2.children" :key="lev3_index">
                                <span
                                    :class="['title',$route.path == lev3.path?'active-menu':'']"
                                    @click="expandMenu(lev3, lev3_index)"
                                >
                                    <!-- <i :class="['iconfont', i.icon]"></i> -->
                                    <span>{{lev3.labe}}</span>
                                    <span v-if="lev3.children" class="iconfont iconup right"></span>
                                </span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import Slide from '../js/config/slide'
import menuList from '../js/menuList'
export default {
    data() {
        return {
            screenWidth: document.body.clientWidth, // 屏幕高度
            menu_list: [],
            chain: [], // 父子级关系，格式[0,2,3]// 第下标 0 个的第 2 个子级 的第3个子子级
            count: 0
        }
    },
    computed: {
        ...mapState(['tab_nav_list', 'aside_scroll_path'])
    },
    methods: {
        ...mapMutations(['updateTab_nav_list']),

        // 是否是当前路由的父级 ul, 是返回true
        curr_ul(lev1) {
            if (lev1.children) {
                // 子项有当前路由返回true
                let havePath = lev1.children.find(item => {
                    return item.path === this.$route.path
                })
                return havePath ? true : false
            }
            return false
        },
        expandMenu(item, index) {
            // console.log("该元素item", item);
            // console.log("这个index", index);

            /** 根据路径获取相关信息 */
            function getMenuData(path, arr) {
                // console.log("arr", arr);
                let template_data
                arr.forEach(lev1_menu => {
                    if (lev1_menu.children) {
                        let hadFindData = lev1_menu.children.find(lev2_menu => {
                            // console.log("lev2", lev2_menu.path);
                            return lev2_menu.path === path
                        })
                        if (hadFindData) {
                            template_data = hadFindData
                            return
                        }
                    }
                })
                return template_data
            }
            // 子菜单跳转
            if (!item.children) {
                // 获取该path 的所有数据
                let data = getMenuData(item.path, window.all.menu_list)
                // console.log("数据", data);
                let list = this.tab_nav_list
                // 导航条没有该页面 就添加进去
                let isHadTab = list.find(tab => tab.path === item.path)
                if (!isHadTab && item.path !== '/home/home') {
                    list.push({
                        label: item.label,
                        path: item.path,
                        name: data.name
                    })
                    // 最多多十五个 导航条
                    if (list.length >= 15) {
                        list.shift()
                    }
                    this.updateTab_nav_list(list)
                }
                this.$router.push(item.path)

                // 没有 children 就是父级菜单,就下滑打开该菜单
            } else {
                let ele = this.$refs[item.pre_idx][0]
                // $(ele).slideToggle(200)
                Slide.slideToggle(ele)
                // Slide.slideUp(ele)
            }
        },
        objToArr(obj, pre_idx = '') {
            // let list = []
            return Object.keys(obj).map((key, index) => {
                let item = obj[key]
                // console.log('item: ', item);

                let template = {
                    id: item.id,
                    label: item.label,
                    icon: item.icon,
                    en_name: item.en_name,
                    path: item.route,
                    display: item.display,
                    pre_idx: pre_idx + index,
                    // type: '',
                    level: item.level
                }

                if (item.child) {
                    template.children = this.objToArr(
                        item.child,
                        pre_idx + index + '-'
                    )
                }
                return template
            })
            // }
            // return list
        },
        autoScroll(jumpPath) {
            if (!jumpPath) return
            let containEle = this.$refs.contain
            let currEle = this.$refs[jumpPath]
            if (!currEle) return
            currEle = currEle[0]
            let parent_top = containEle.offsetTop
            let curr_top = currEle && currEle.offsetTop
            // curr_top - parent_top
            containEle.scrollTo({
                top: curr_top - parent_top - 50,
                left: 0,
                behavior: 'smooth'
            })
        },
        getMenuList() {
            if (!window.all.tool.getLocal('Authorization')) return

            if (window.all.tool.getLocal('menu')) {
                this.menu_list = window.all.tool.getLocal('menu')
            } else {
                let { method, url } = this.$api.current_admin_menu

                this.$http({ method, url }).then(res => {
                    // console.log('res',res)
                    if (res && res.data && res.code === '200') {
                        let menu = this.objToArr(res.data)
                        this.menu_list = menu
                        window.all.tool.setLocal('menu', menu)
                    }
                })
            }

        }
        // 获取当前路由的父级或祖先级
        // getFather() {
        //     let curr_path = this.$route.path;
        //     let menu = this.menu_list;
        //     if (!menu) return;
        //     // console.log('menu: ', menu);
        //     // 获取父子级关系 如 1-1-1
        //     let chain_temp = "";
        //     let getPreChain = function(arr, pre_fix = "") {
        //         arr.forEach((item, index) => {
        //             if (item.children) {
        //                 let pre =
        //                     pre_fix !== "" ? pre_fix + "-" + index : index;
        //                 getPreChain(item.children, pre);
        //             } else {
        //                 if (item.path === curr_path) {
        //                     pre_fix =
        //                         pre_fix !== "" ? pre_fix + "-" + index : index;
        //                     chain_temp = pre_fix;
        //                 }
        //             }
        //         });
        //     };
        //     let data = {
        //         // pageSize: this.form.id,
        //         // page: this.form.
        //     };
        //     data = window.all.tool.rmEmpty(data);

        //     let { url, method } = this.$api.current_admin_menu;
        //     this.$http({ method, url, data }).then(res => {
        //         // console.log('列表👌👌👌👌: ', res)
        //         if (res && res.code === "200") {
        //             this.$toast.success(res.message);
        //             //this.mod_show = false
        //             //this.dia_show = false
        //             this.getList();
        //         }
        //     });
        //     getPreChain(menu);
        //     this.chain = (chain_temp || "").split("-");
        //     // console.log('menu: ', menu)
        //     // console.log('锁链', this.chain)
        // }
    },
    watch: {
        $route: function(to, from) {
            // this.getFather()
            if (from.path === '/login') {
                
                this.getMenuList()
            }
        },
        aside_scroll_path(jumpPath) {
            this.autoScroll(jumpPath)
            // if (!jumpPath) return
            // let containEle = this.$refs.contain
            // let currEle = this.$refs[jumpPath][0]
            // let parent_top = containEle.offsetTop
            // let curr_top = currEle && currEle.offsetTop
            // // curr_top - parent_top
            // containEle.scrollTo({
            //     top: curr_top - parent_top - 50,
            //     left: 0,
            //     behavior: 'smooth'
            // })
        }
    },
    mounted() {
        this.getMenuList()
        let self = this
        if(this.menu_list&&this.menu_list.length>0){
            if(window.location.pathname){
                setTimeout(()=>{
                    this.autoScroll(window.location.pathname)
                },200)
            }
        }
        // let setHeight = function() {
        //     let height = document.documentElement.clientHeight // 可视 页面高度
        //     let ele = self.$refs.contain
        //     // console.log('ele: ', ele);

        //     if (ele) {
        //         let offsetTop = ele.offsetTop
        //         ele.style.height = height - offsetTop - 10 + 'px'
        //     }
        // }
        // setHeight()
        // // onresize调节尺寸时, 同步设置 菜单高度
        // window.onresize = window.all.tool.debounce(setHeight, 300)
    }
}
</script>

<style scoped>
.contain {
    width: 12rem;
    max-height: calc(100vh - 100px);
    min-width: 145px;
    margin-left: 10px;
    border-top: 2px solid #4c8bfd;
    cursor: pointer;
    overflow: auto;
    background: #fff;

    /* user-select: none; */
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;
    box-shadow: 0 0 7px #bdbdbd;
}
.contain::-webkit-scrollbar {
    width: 3px;
    color: #48f;
}
.contain::-webkit-scrollbar-thumb {
    background: #d3e0f8;
}
/* 一级菜单 */
.level-1 > li > .title {
    display: inline-block;
    padding: 10px 0;
    width: 100%;
    font-size: 15px;
    font-weight: 600;
    text-align: center;
    /* border-top: 1px solid rgb(253, 253, 253); */
    /* color: rgb(63, 62, 62); */
}

/* 二级菜单 */
/* .level2 {
} */

/* 激活的ul */

.lev1-active {
    border-left: 3px solid #2569e9;
    color: #4c8bfd;
    transition: border 0.2s;
}
.active-ul {
    border-left: 3px solid #2569e9;
    transition: border 0.2s;
}

.level2 > li > .title {
    display: inline-block;
    /* padding: 8px 0; */
    padding-top: 8px;
    padding-bottom: 8px;
    padding-left: 20px;
    width: 100%;
    font-size: 13px;
    text-align: center;
    /* font-weight: 600; */
    /* border: 1px solid #000; */
}
.level2 > li > .title span {
    display: inline-block;
    min-width: 100px;
    text-align: left;
    margin-left: 10px;
    /* padding-left: 20px; */
    /* border: 1px solid #000; */
}
.level3 > li .title {
    display: inline-block;
    padding: 8px 10px;
    padding-left: 60px;
    font-size: 15px;
}
li .title:hover {
    width: 100%;
    background: #6791df;
    color: #fff;
}
.active-menu {
    background: #4c8bfd;
    color: #fff;
    
}
/* .contain > ul > li {
  
} */
.right {
    float: right;
    margin-right: 8px;
    margin-top: 4px;
}

/* 菜单 - 标题文字 lev1 */
/* .title-name {
    margin-left: 1.23rem;
} */
.icon-left {
    margin-left: 21px;
}
</style>