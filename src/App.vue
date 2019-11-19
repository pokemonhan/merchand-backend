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

<style>
/* ----------------------    公共样式    -------------------------------------------------- */

 /* 背景遮罩层 */
        .modal-mask {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 1;
            background-color: rgba(0, 0, 0, 0.6);
        }

        /* 内部遮罩层 */
        .inner-mask {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 2;
            background-color: rgba(0, 0, 0, 0.6);
        }

        /* 按钮 */
        button {
            outline: none;
            border: none;
            box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
            padding: 4px 6px;
            cursor: pointer;
            margin: 0 5px;
        }

        .btn {
            /* height: 26px; */
            padding-left: 15px;
            padding-right: 15px;
            /* padding: 3px 15px; */
            box-sizing: border-box;
            border-radius: 3px;
            outline: none;
            border: none;
            box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
            cursor: pointer;
            color: #333;
            border: 1px solid #333;
            background-color: #fff;
        }

        .btn:hover {
            box-shadow: none;
            /* color: #246aeb;
    border: 1px solid #48f; */
        }

        .btn-blue {
            /* height: 26px; */
            padding-left: 15px;
            padding-right: 15px;
            outline: none;
            border: none;
            box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
            cursor: pointer;
            box-sizing: border-box;
            border-radius: 3px;
            color: #fff;
            border: 1px solid #4c8bfd;
            background: #4c8bfd;
        }

        .btn-blue:hover {
            box-shadow: none;
            background: #6397f7;
        }
        .btn-blue:active {
            box-shadow: none;
            background: #3f7beb;
        }

        .btn-blue-large {
            /* height: 26px; */
            padding: 9px 18px;
            /* outline: none; */
            border: none;
            box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
            cursor: pointer;
            box-sizing: border-box;
            border-radius: 3px;
            color: #fff;
            background: #4c8bfd;
        }

        .btn-blue-large:hover {
            box-shadow: none;
            background: #6397f7;
        }
        .btn-blue-large:active {
            box-shadow: none;
            background: #3f7beb;
        }
        .btn-blue-large:hover {
            box-shadow: none;
            background: #6397f7;
        }

        .btn-plain {
            /* height: 26px; */
            padding-left: 15px;
            padding-right: 15px;
            /* padding: 3px 15px; */
            box-sizing: border-box;
            border-radius: 3px;
            outline: none;
            border: none;
            box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
            cursor: pointer;
            color: #4c8bfd;
            border: 1px solid #4c8bfd;
            background-color: #fff;
        }

        .btn-plain:hover {
            box-shadow: none;
            color: #246aeb;
        }

        .btn-plain-large {
            /* height: 26px; */
            padding: 8px 18px;
            box-sizing: border-box;
            border-radius: 3px;
            outline: none;
            border: none;
            box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
            cursor: pointer;
            color: #4c8bfd;
            border: 1px solid #4c8bfd;
            background-color: #fff;
        }

        .btn-plain-large:hover {
            box-shadow: none;
            color: #246aeb;
        }
        .btn-plain-large:active {
            box-shadow: none;
            color: #3f7beb;
        }

        /* *星符号 */
        .require::before {
            content: "*";
            color: red;
            /* line-height: 1em; */
        }

        .flex {
            display: flex;
            /* justify-content: center; */
            /* align-items: center; */
        }

        .filter {
            display: flex;
            /* line-height: 30px; */
            align-items: center;
            justify-content: space-between;
            /* white-space: nowrap; */
            font-size: 13px;
            /* line-height: 30px; */
        }

        .filter .left,
        .filter .right {
            display: flex;
            flex-wrap: wrap;
        }

        .filter .left>li {
            display: flex;
            align-items: center;
            margin-right: 10px;
        }

        .filter .left>li>span:first-child {
            margin-right: 4px;
        }

        .page {
            margin-top: 30px;
            display: flex;
            justify-content: center;
        }

        .a {
            font-weight: border;
            text-decoration: underline;
            cursor: pointer;
            color: #4c8bfd;
            margin-left: 8px;
        }

        .a:active {
            color: red;
        }
</style>
