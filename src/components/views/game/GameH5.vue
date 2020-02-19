<template>
    <div class="container">
        <!-- h5游戏管理 -->

        <div>
            <button :class="isHot?'btn-blue':'btn-plain'" @click="hotGameclick()">热门游戏</button>
            <button
                v-for="(item, index) in buttons"
                :key="index"
                :class="curr_type_id===item.id?'btn-blue':'btn-plain'"
                @click="selectBtn(item)"
            >{{item.name}}</button>
        </div>
      
        <div class="hot-game">
            <HotGame v-if="isHot" />
            <TypeGame v-else :type_id="curr_type_id" />
        </div>
    </div>
</template>

<script>
import HotGame from './TypeDetail/HotGame.vue'
import TypeGame from './TypeDetail/TypeGame.vue'
export default {
    components: {
        HotGame,
        TypeGame
    },
    data() {
        return {
            buttons: [],
            curr_type_id: '',
            isHot: true
        }
    },
    methods: {
        hotGameclick() {
            this.isHot = true
            this.curr_type_id = ''
        },
        selectBtn(item) {
            this.isHot = false
            this.curr_type_id = item.id
        },

        getSelect() {
            let { method, url } = this.$api.game_search_condition_list
            this.$http({ method, url }).then(res => {
                if (res && res.code === '200') {
                    this.buttons = res.data.gameTypes

                    // 游戏平台
                    if (res.data.gameVendors) {
                        let arr = res.data.gameVendors
                        this.vendor_opt = [{ label: '全部', value: '' }]
                        let array = arr.map(item => {
                            return { label: item.name, value: item.id }
                        })
                        this.vendor_opt = this.vendor_opt.concat(array)
                    }

                    // 获取 table 内    容
                    // this.getList()
                }
            })
        }
        // updateNo(val) {},
        // updateSize(val) {}
    },
    mounted() {
        this.getSelect()
    }
}
</script>

<style scoped>
</style>