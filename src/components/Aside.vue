<template>
    <div class="container">
        <ul class="level-1">
            <li v-for="(item, index) in menu_list" :key="index">
                <span :class="['title',$route.path == item.path?'active-menu':'']" @click="expandMenu(item,index)">
                    <!-- <span></span> -->
                    <i :class="['icon-left','iconfont', item.icon]"></i>
                    <span class="title-name">{{item.name}}</span>
                    <span v-if="item.children" class="iconfont iconup right"></span>
                </span>
                <ul :ref="index" class="level2">
                    <li v-for="(i, j) in item.children" :key="j">
                        <span :class="['title',$route.path == i.path?'active-menu':'']" @click="expandMenu(i,index+'-'+j)">
                            <i :class="['iconfont', i.icon]"></i>
                            <span>{{i.name}}</span>
                            <span v-if="i.children" class="iconfont iconup right"></span>
                        </span>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
import {mapState,mapMutations, mapGetters} from 'vuex'
export default {
    data() {
        return {
            currentMenu: Number,
            menu_list:[]
        
        };
    },
    computed:{
        ...mapState(['tab_nav_list'])
    },
    methods: {
        ...mapMutations(['updatetab_nav_list']),
        expandMenu(item, index) {
            // console.log("TCL: expandMenu -> item", item)
            console.log("TCL: expandMenu -> index", index)
            // console.log("TCL: expandMenu -> 当前", this.currentMenu)
            if (item.path) {
                if(this.$route.path !== item.path){
                    this.$router.push(item.path);
                }
                
                let list = this.tab_nav_list;
                // 导航条没有该页面 就添加进去
                if(this.tab_nav_list.indexOf(item) === -1){
                    list.push(item)
                    // 保持不大于7个菜单导航
                    if(list.length > 7){
                        list.shift()
                    }
                    // if(list.length)
                    this.updatetab_nav_list(list)
                }


                // 没有 path 就是父级菜单,就下滑打开该菜单
            } else {
                item.children && $('.level2').eq(index).slideToggle(200)
            }
                this.currentMenu = index
        }
    },
    watch: {
        '$route':function(to,from){
            if(to.path==='/home') return
            let path = to.path;
            console.log("TCL: path", path)
      /*       1.同一父级,则 退出 2.不同父级,关闭以前,打开跳转的父级菜单 */

            //1.同一父级,则 退出

            //取 path 的父级
            // menu_list = this.menu_list
            
            
            // /*** TODO
            function getfather(array){
                array.forEach( (item, index) => {
                // console.log("TCL: getfather -> item", item)
                    if(item.children){
                        item.children.forEach( i => {
                            if(i.path===to.path){
                                return item.path
                            }
                        })
                    }
                })
            }
            let father_path = getfather(this.menu_list)
        }
    },
    mounted() {
        // console.log('aside');
        this.menu_list = window.all.menu_list
        console.log(this.tab_nav_list.length);
            // 解决刷新时顶部tab_nav都消失的问题, 根据路由加载当前导航.
            if(this.tab_nav_list.length===0){
                this.menu_list.forEach( (item, index) => {
                    if(item.children){
                        item.children.forEach( i => {
                            if(i.path===this.$route.path){
                                let list = [i]
                                this.updatetab_nav_list(list)
                            }
                        })
                    }
                })
            }
    }
};
</script>

<style scoped>
.container {
    width: 195px;
    max-height: 92vh;
    border: 1px solid rgb(247, 247, 247);
    box-sizing: border-box;
    background: #fff;
    /* text-align: center; */
    border-radius: 6px;
    cursor: pointer;
    overflow: auto;
}
/* 一级菜单 */
.level-1 > li .title {
    display: inline-block;
    padding: 10px 0;
    width: 100%;
    font-size: 16px;
}
/* 二级菜单 */
.level2 {
    display: none;
}
.level2 > li .title {
    /* display: inline-block; */
    /* display:none; */
    padding: 8px 10px;
    padding-left: 40px;
    width: 100%;
    font-size: 14px;
    /* border: 1px solid #000; */
}
li .title:hover {
    width: 100%;
    background: linear-gradient(to right, #5a5efd, #67b5fd);
    /* border: 1px solid #000; */
}
.active-menu{
    background: linear-gradient(to right, #5a5efd, #67b5fd);
}
.container > ul > li {
    /* border: 1px solid rgb(189, 189, 189); */
    /* padding: 10px 0; */
    /* height: 30px; */
    /* background: #000; */
}
.right {
    float: right;
    margin-right: 8px;
    margin-top: 4px;
}
.title-name {
    margin-left: 16px;
}
.icon-left {
    margin-left: 21px;
}
</style>