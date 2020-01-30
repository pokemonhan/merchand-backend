<template>
    <div class="container">
        <!-- h5游戏管理 -->

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
                    <span>游戏名称</span>
                    <Input class="w100" v-model="filter.name" />
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
                    <td
                        :class="row.status?'green':'red'"
                    >{{row.status===1?'开启':row.status===0?'关闭':'???'}}</td>
                    <td>{{row.a1}}</td>
                    <td>
                        <button class="btns-blue">上移</button>
                        <button class="btns-blue">下移</button>
                    </td>
                    <td>
                        <Switchbox class="switch-select" v-model="row.a1" />
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
                { label: '热门游戏', value: '1' },
                { label: '刺激棋牌', value: '2' },
                { label: '经典棋牌', value: '3' },
                { label: '电子游艺', value: '4' },
                { label: '竞技竞猜', value: '5' }
            ],
            curr_btn: '1',
            plant_opt: [
                { label: '全部', value: '' },
                { label: '测试', value: '1' }
            ],
            filter: {
                plant: '',
                name: ''
            },
            headers: ['编号', '游戏平台', '游戏名称', '排序', '是否热门'],
            list: [
                {
                    a1: '64646466',
                    a2: 'sdfsdfdsf',
                    a3: '充支好礼',
                    a4: '1',
                    a5: '2019-02-02 21:30'
                },
                {
                    a1: '64646466',
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
</script> <style scoped>
.w100 {
    width: 100px;
}
/* .p10 全局样式 */
.switch-select {
    transform: scale(0.8);
}
</style>