<template>
    <div class="container">
        <div class="select-list">
            <button
                :class="[curr_list==='deposit'?'btn-blue':'btn']"
                @click="curr_list='deposit'"
            >人工存款记录</button>

            <button
                :class="[curr_list==='withdrawal'?'btn-blue':'btn']"
                @click="curr_list='withdrawal'"
            >人工扣款记录</button>
        </div>

        <!-----------------------------------  人工存款__记录  ------------------------------------->
        <Deposit v-show="curr_list==='deposit'"></Deposit>

        <!-----------------------------------  人工取款__记录  ------------------------------------->
        <Withhold v-show="curr_list==='withdrawal'"></Withhold>
    </div>
</template>

<script>
import Deposit from './manualAccessCont/Deposit'
import Withhold from './manualAccessCont/Withhold'
export default {
    components: {
        Deposit,
        Withhold
    },
    data() {
        return {
            curr_list: 'deposit'
        }
    },
    methods: {},
    mounted() {}
}
</script>

<style scoped>
/* container 公共区 */
/* .container {
    padding: 20px 8px 20px 8px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    background: #fff;
} */

/* .select-list {
 
} */
.table {
    margin-top: 20px;
}
</style>