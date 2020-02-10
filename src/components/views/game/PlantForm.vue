<template>
    <div class="container">
        <!-- 平台管理 -->

        <div>
            <button
                v-for="(item, index) in buttons"
                :key="index"
                :class="curr_btn===item.value?'btn-blue':'btn-plain'"
                @click="selectBtn(item)"
            >{{item.label}}</button>
        </div>
        <div class="filter p10 mt10">
            <ul class="left">
                <li>
                    <span>游戏平台</span>
                    <Select v-model="filter.plant" :options="plant_opt"></Select>
                </li>
                <li>
                    <span>启用状态</span>
                    <Select v-model="filter.status" :options="status_opt" ></Select>
                </li>
                <li>
                    <button class="btn-blue">查询</button>
                    <button class="btn-blue">确定</button>
                </li>
            </ul>
        </div>
        <div class="table mt20">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row,idx}">
                    <td>{{(pageNo-1)*pageSize+idx+1}}</td>
                    <td>{{row.a1}}</td>
                    <td>
                        <button class="btns-blue">上移</button>
                        <button class="btns-blue">下移</button>
                    </td>
                    <td>
                        <Switchbox class="switch-select" v-model="row.a1" />
                    </td>
                    <td>
                        <Switchbox class="switch-select" v-model="row.a1" />
                    </td>
                    <td>
                        <button class="btns-blue">上传图片</button>
                    </td>
                </template>
            </Table>

            <Page
                class="table-page"
                :total="total"
                :pageNo.sync="pageNo"
                :pageSize.sync="pageSize"
                @updateNo="updateNo"
                @updateSize="updateSize"
            />
        </div>
    </div>
</template> <script>
export default {
    data() {
        return {
            buttons: [
                { label: 'H5平台管理', value: '1' },
                { label: 'PC平台管理', value: '2' },
                { label: 'APP平台管理', value: '3' }
            ],
            curr_btn: '1',
            plant_opt: [
                { label: '全部', value: '' },
                { label: '测试', value: '1' }
            ],
            status_opt: [
                { label: '全部', value: '' },
                { label: '开启', value: '1' },
                { label: '关闭', value: '0' }
            ],
            filter: {
                plant: '',
                status: ''
            },
            headers: ['ICON','游戏平台','排序','是否维护','是否启用','操作'],
            list: [
                {
                    a1: true,
                    a2: 'sdfsdfdsf',
                    a3: '充支好礼',
                    a4: '1',
                    a5: '2019-02-02 21:30'
                },
                {
                    a1: true,
                    a2: 'sdfsdfdsf',
                    a3: '充支好礼',
                    a4: '1',
                    a5: '2019-02-02 21:30'
                }
            ],
            total: 0,
            pageNo: 1,
            pageSize: 25
        }
    },
    methods: {
        selectBtn(item) {
            this.curr_btn = item.value
        },

        updateNo(val) {},
        updateSize(val) {}
    },
    mounted() {}
}
</script>

<style scoped>

/* .p10 全局样式 */
.switch-select {
    transform: scale(0.8);
}
</style>