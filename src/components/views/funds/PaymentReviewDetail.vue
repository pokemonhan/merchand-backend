<template>
    <div>
        <div style="margin-top:5px;" class="filter">
            <ul class="left">
                <li>
                    <span>会员账号</span>
                    <Input class="w100" v-model="filter.user_account" />
                </li>
                <li>
                    <span>会员ID</span>
                    <Input class="w100" v-model="filter.userid" />
                </li>
                <li>
                    <span>状态</span>
                    <Select v-model="filter.status" :options="status_opt"></Select>
                </li>
            </ul>
            <!-- <div>
                <button class="btn-blue">查询</button>
                <button class="btn-blue">导出excel</button>
            </div> -->
        </div>

        <Table style="margin-top:20px;" :headers="headers" :column="list">
            <template v-slot:item="{row}">
                <td>{{row.a1}}</td>
                <td>{{row.a2}}</td>
                <td>{{row.a3}}</td>
                <td>{{row.a4}}</td>
                <td>{{row.a5}}</td>
                <td>{{row.a6}}</td>
                <td>{{row.a7}}</td>
                <td>{{row.a8}}</td>
                <td>{{row.a9}}</td>
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
</template>

<script>
export default {
    name: 'PaymentReviewDetail',
    props: {
        userid: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            filter: {
                user_account: '',
                userid: '',
                status: ''
            },
            status_opt: [
                { label: '全部', value: '' },
                { label: '已完成', value: '1' },
                { label: '未完成', value: '2' }
            ],
            status_color:{
                '0':'red',
                '1':'green',
            },
            headers: [
                { label: '会员账号' },
                { label: '会员ID' },
                { label: '订单号' },
                { label: '金额类型' },
                { label: '金额' },
                { label: '需求打码' },
                { label: '当前打码' },
                { label: '状态' },
                { label: '稽核时间' }
            ],
            list: [
                { a1: '13245678989', a2: '4561342', a3: 'D45678944654', a4: '优惠存款', a5: '100', a6: '100', a7: '50', a8: '1', a9: '2019/09/25 18：17：30' }, { a1: '13245678989', a2: '4561342', a3: 'D45678944654', a4: '优惠存款', a5: '100', a6: '100', a7: '50', a8: '0', a9: '2019/09/25 18：17：30' },
            ],
            total: 0,
            pageNo: 1,
            pageSize: 25
        }
    },
    methods: {
        updateNo(val) {},
        updateSize(val) {},
    },
    mounted() {
        console.log(this.userid,'userid')
    }
}
</script>

<style scoped>
.filter{
    padding: 10px;
}
.w100{
    width: 100px;
}
</style>