<template>
    <div class="container">
        <div class="select-list">
            <button
                :class="[founds_incomeorder==='Online'?'btn':'btn-blue']"
                @click="offlineShow"
            >线下入款</button>
            <button
                :class="[founds_incomeorder==='Online'?'btn-blue':'btn']"
                @click="onlineShow"
            >线上入款</button>
        </div>
        <!-- ------------------------------------    线下   --------------------------------------------->

            <Offline v-show="founds_incomeorder==='Offline'"></Offline>


        <!-- ------------------------------------    线上入款    ---------------------------------------->

            <Online v-show="founds_incomeorder==='Online'"></Online>
    </div>
</template>

<script>
import Offline from './incomeOrderCont/offline.vue'
import Online from './incomeOrderCont/online.vue'
import{mapState,mapMutations,mapGetters} from 'vuex'
export default {
    name: "IncomeOrder",
    components: {
        Offline: Offline,
        Online: Online
    },
    data() {
        return {

        }
    },
    computed:{
        ...mapState(['founds_incomeorder'])
    },
    methods: {
        ...mapMutations(['updateFounds_incomeorder']),
        offlineShow(){
            this.updateFounds_incomeorder('Offline')
        },
        onlineShow(){
            this.updateFounds_incomeorder('Online')
        },
    },
    mounted() {
        // this.curr_list=this.founds_incomeorder
        // console.log('传入',this.$route)
    }
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