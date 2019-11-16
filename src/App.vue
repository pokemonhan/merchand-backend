<template>
    <div id="app">
        <!-- 顶部 -->
        <Header class="header"></Header>
        <div class="content">
            <!-- 侧边栏 -->
            <Aside class="aside"></Aside>
            <div class="main">
                <TabNav class="tab-nav"></TabNav>
                <router-view />
                <div id="toast-box"></div>
            </div>
        </div>

    </div>
</template>

<script>
import Header from "./components/Header.vue";
import Aside from "./components/Aside.vue";
import TabNav from "./components/TabNav.vue";

export default {
    name: "App",
    components: {
        Header,
        Aside,
        TabNav
    },
    data(){
      return {
          play: true
      }
    },
    methods: {
        playMusic() {
            //方式1
            // var audio = document.createElement("audio");
            // audio.src = require("./assets/audio/wan.wav");
            // audio.play();
            // 方式2
            var audio = new Audio(require("./assets/audio/wan.wav"));
            // audio.play();
            let play = true
            document.body.addEventListener("mouseenter", function () {
                play && audio.play();
                play = false

                // audio = null;
            })
        }
    },
    mounted() {
        let self = this;
        setTimeout(() => {
            // self.playMusic()
        }, 400);
    }
};
</script>

<style scoped>
/* #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    height: 100%;
    background: rgb(238, 240, 241);
} */

.content {
    /* height: 100%; */
    width: 1200px;
    display: flex;
    flex-direction: row;
    position: absolute;
    left: 50%;
    margin-left: -600px;
    /* transform: translateX(-50%); */
    margin-top: 20px;
}
.aside {
    width: 150px;
    /* overflow: hidden; */
}
.main {
    margin-left: 10px;
    /* width: 100%; */
    width: 1040px;
    /* border: 1px solid #000; */
}
.tab-nav {
    width: 100%;
}
#toast-box {
    position: fixed;
    top: 10px;
    left: 50%;
}
/* button{
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.26);
}
button:hover{
  box-shadow: none;
} */
</style>
