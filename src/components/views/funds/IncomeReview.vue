<template>
    <div class="container">
        <h4 class="head">入款审核</h4>
        <div class="select-list">
            <button
                :class="[curr_list==='Online'?'btn':'btn-blue']"
                @click="curr_list='Offline'"
            >线下入款</button>
            <button
                :class="[curr_list==='Online'?'btn-blue':'btn']"
                @click="curr_list='Online'"
            >线上入款</button>
        </div>
        <!-- ------------------------------------    线下   --------------------------------------------------------->
        
        <component :is="curr_list"></component>
        
        <!-- ------------------------------------    线上入款    --------------------------------------------------------->
    </div>
</template>

<script>
import Offline from './incomeReviewContent/offline.vue'
import Online from './incomeReviewContent/online.vue'
export default {
    components:{
        Offline: Offline,
        Online: Online,
    },
    data() {
        return {
            curr_list:'Offline'
        }
    },
    methods: {
        
    },
    mounted() {}
};
</script>

<style scoped>
.container {
    padding: 20px 8px 20px 8px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    background: #fff;
}
.head {
    margin-left: 20px;
}
</style>