<template>
    <div class="container">
        <div class="select-list">
            <button
                :class="[curr_list==='Online'?'btn-blue':'btn']"
                @click="curr_list='Online'"
            >线上入款</button>
            <button
                :class="[curr_list==='Online'?'btn':'btn-blue']"
                @click="curr_list='Offline'"
            >线下入款</button>
        </div>
        <!-- ------------------------------------    线下   --------------------------------------------->

            <Offline v-show="curr_list==='Offline'"></Offline>


        <!-- ------------------------------------    线上入款    ---------------------------------------->

            <Online v-show="curr_list==='Online'"></Online>
    </div>
</template>

<script>
import Offline from './incomeOrderCont/offline.vue'
import Online from './incomeOrderCont/online.vue'
export default {
    name: "IncomeOrder",
    components: {
        Offline: Offline,
        Online: Online
    },
    data() {
        return {
            curr_list: 'Offline'
        }
    },
    methods: {},
    mounted() {}
}
</script>

<style scoped>
/* .container 公共区 */
/* .container {
    padding: 20px 8px 20px 8px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    background: #fff;
} */
.head {
    margin-left: 20px;
}
</style>