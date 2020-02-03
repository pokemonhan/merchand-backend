<template>
    <div class="container">
        <!-- 推广配置 -->

        <div class="flex-center">
            <ul class="form">
                <li>
                    <span>一级返利:</span>
                    <Input class="w250" v-model="form.lev1" />
                    <span class="ml10">%</span>

                </li>
                <li>
                    <span>二级返利:</span>
                    <Input class="w250" v-model="form.lev2" />
                    <span class="ml10">%</span>
                </li>
                <li>
                    <span>三级返利:</span>
                    <Input class="w250" v-model="form.lev3" />
                    <span class="ml10">%</span>
                </li>
            </ul>
        </div>
        <div class="all-btn">
            <button class="btn-plain-large mr20" @click="reset">重置</button>
            <button class="btn-blue-large">确定</button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            form: {
                lev1: '',
                lev2: '',
                lev3: ''
            }
        }
    },
    methods: {
        reset() {
            this.form = {
                lev1: '',
                lev2: '',
                lev3: ''
            }
        }
    },
    mounted() {}
}
</script>

<style scoped>
.flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}
.form li {
    display: flex;
    align-items: center;
    margin-top: 50px;
}
.form li span:first-child {
    margin-right: 10px;
}
.all-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    margin-bottom: 50px;
}
</style>