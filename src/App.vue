<template>
  <div id="app">
    <Header></Header>
    <div class="content">
      <!-- 侧边栏 -->
      <Aside class="aside"></Aside>
      <div class="main">
        <TabNav class="tab-nav"></TabNav>
        <router-view />
      </div>
    </div>
    
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Aside from './components/Aside.vue';
import TabNav from './components/TabNav.vue';

export default {
  name: 'App',
  components:{
    Header,
    Aside,
    TabNav
  },
  // data(){
  //   return {

  //   }
  // },
  methods:{

  },
  mounted() {
    
  },
}
</script>

<style scoped>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
  /* height: 100%; */
  /* background: rgb(238, 240, 241); */

}

.content{
  /* height: 100%; */
  width: 1285px;
  display: flex;
  flex-direction: row;
  position: absolute;
  left: 50%;
  margin-left: -643px;
  /* transform: translateX(-50%); */
  margin-top: 20px;

}
.aside{
width: 192px;
}
.main{
  margin-left: 18px;
  /* width: 100%; */
  width:1070px;
  /* border: 1px solid #000; */
}
.tab-nav{
  width: 100%;
}
</style>
