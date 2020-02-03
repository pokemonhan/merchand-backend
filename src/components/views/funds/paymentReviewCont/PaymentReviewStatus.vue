<template>
    <div class="container">
        厅主列表
        <div class="filter p10">
            <ul class="left">
                <li>
                    <span>厅主账号</span>
                    <Input class="w100" v-model="filter.acc" />
                </li>
                <li>
                    <span></span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            filter: {
                acc: ''
            }
        }
    },
    methods: {},
    mounted() {}
}
</script>

<style scoped>
</style>