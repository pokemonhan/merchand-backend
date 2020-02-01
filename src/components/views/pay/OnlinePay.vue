<template>
    <div class="container">
        <!-- 线上金流配置 -->

        <div class="filter p10">
            <ul class="left">
                <li>
                    <span>商户号</span>
                    <Input class="w100" v-model="filter.merchant_num" />
                </li>
                <li>
                    <span>创建人</span>
                    <Input class="w100" v-model="filter.person" />
                </li>
                <li>
                    <span>添加日期</span>
                    <Date v-model="filter.dates[0]" />
                    <span class="mv5">~</span>
                    <Date v-model="filter.dates[1]" />
                </li>
                <li>
                    <span>前端名称</span>
                    <Input class="w100" v-model="filter.front_name" />
                </li>
                <li>
                    <span>商户编号</span>
                    <Input class="w100" v-model="filter.merchant_code" />
                </li>
            </ul>
        </div>
        <div class="filter flt-down">
            <ul class="left">
                <li>
                    <span>更新人</span>
                    <Input class="w100" v-model="filter.update_person" />
                </li>
                <li>
                    <span>更新日期</span>
                    <Input class="w100" v-model="filter.update_dates[0]" />
                    <span class="mv5">~</span>
                    <Input class="w100" v-model="filter.update_dates[1]" />
                </li>
                <li>
                    <button class="btn-blue">查询</button>
                    <button class="btn-blue">新增线下入款</button>
                </li>
            </ul>
        </div>
        <div class="table">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row,idx}">
                    <td>{{(pageNo-1)*pageSize+idx+1}}</td>
                    <td
                        :class="row.status?'green':'red'"
                    >{{row.status===1?'开启':row.status===0?'关闭':'???'}}</td>
                    <td>{{row.a1}}</td>
                    <td>{{row.a2}}</td>
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
</template>
<script>
export default {
    data() {
        return {
            filter: {
                merchant_num: '',
                person: '',
                dates: [],
                front_name: '',
                merchant_code: '',
                update_person: '',
                update_dates: []
            },

            headers: ['入款方式','商户号','商户编号','密钥方式','前端名称','支付限额','创建人','创建时间','最后更新人','最后更新时间','状态','操作'],
            list: [
                {
                    a1: '64646466',
                    a2: 'sdfsdfdsf',
                    a3: '充支好礼',
                    a4: '1',
                    a5: '2019-02-02 21:30',
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
        updateNo(val) {},
        updateSize(val) {}
    },
    mounted() {}
}
</script>

<style scoped>
.flt-down {
    padding-left: 10px;
    padding-bottom: 10px;
}
</style>