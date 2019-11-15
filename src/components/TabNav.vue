<template>
    <div class="container" v-if="$route.path!=='/home'">
        <ul>
            <li v-for="(item, index) in tab_nav_list" :key="index" :class="[item.path===$route.path?'active-tab-nav':'']">
                <span :class="['title']" @click="jumpRouter(item)">{{item.name}}</span>
                <span class="close" @click="close(item)">X</span>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {
            current_path: '',
            menu_list: []
        };
    },
    computed: {
        ...mapState(["tab_nav_list"]),
        // current_path(){
        //     let menu_list = window.all.menuList;
        //     menu_list.forEach(item=>{
        //     console.log("TCL: current_path -> item", item.path)
        //         if(item.path===this.$route.path){
        //             console.log("TCL: current_path -> item.name", item.name)
        //             return item.name
        //         }
        //     })
        //     // return '2'
        // }
        // tab_nav_list(){
        //     return
        // }
    },
    watch: {
        '$route'(to, from){
           /*  // 根据path 得知当前路由中文名
            menu_list.forEach(item=>{
                if(item.path==='/home'){
                    this.current_path = '首页'
                }
                // if(item.children){
                //     item.children.forEach(item =>{
                //         if(item.path===to.path){
                //             this.current_path = item.path
                //         }
                //     })
                // }
            }) */
        }
    },
    methods: {
        ...mapMutations(['updatetab_nav_list']),
        jumpRouter(item){
            // 非当前则跳转
            if(item.path !== this.$route.path){ 
                this.$router.push(item.path) 
            }
            
        },
        // getPathName(path){
        //     console.log("TCL: getPathName -> path", path)
        //     if(path==='/home') return '首页'              
        //     this.menu_list.forEach(item=>{

        //         if(item.children){
        //             item.children.forEach(i =>{
        //                 console.log(i, '子级i');
                        
        //                 if(i.path===path){
        //                     return i.name
        //                 }
        //             })
        //         }
        //     })
        // },
        close(tab){
            console.log('要关闭的', tab);
         
            let list = this.tab_nav_list.filter(item => item.path!==tab.path) // 把当前tab 从中去除
            this.updatetab_nav_list(list)
            // 如果关闭当前,跳转到最后一个tab
            if(this.$route.path===tab.path && this.tab_nav_list.length > 1){
                let last_index = this.tab_nav_list.length - 1
                this.$router.push(this.tab_nav_list[last_index].path)
            }
        }
    },
    watch: {
        'tab_nav_list'(val){
            
        }
    },
    mounted() {
            this.menu_list = window.all.menu_list  

    }
};
</script>

<style scoped>
.container {
    width: 100%;
    max-width: 1000px;
    overflow: auto;
}

.container ul {
    width: 100%;
    display: flex;
    font-size: 14px;
    font-weight: 600;
    color: #444;
}

.container ul > li:hover {
    cursor: pointer;
}
.container ul > li {
    position: relative;
    height: 28px;
    line-height: 28px;
    width: 130px;
    background: #fff;
    margin-left: 10px;
    padding-left: 6px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;

    /* padding: 4px 20px 4px 8px; */
}
.container ul > li:first-child {
    margin-left: 0;
}
ul > li .title{
    display: inline-block;
    text-align: center;
    min-width: 86px;
}
.container ul > li:hover .title {
    color: rgb(0, 89, 255);
}
.close {
    /* float: right; */
    /* display: inline-block; */
    height: 23px;
    width: 23px;
    position: absolute;
    right:3px;
    top: 3px;
    padding: 2px 2px 2px 7px;
    /* border: 1px solid #000; */
    background: rgb(241, 241, 241);
    border-radius: 50%;
    line-height: 17px;
    /* background: #000; */
    /* margin-right: -5px; */
}
.close:hover {
    color: red;
    /* background: rgb(155, 142, 142); */
}
.container ul .active-tab-nav{
    color:rgb(0, 128, 255);
    background-color: rgba(255, 255, 255, 0.8);
}
</style>