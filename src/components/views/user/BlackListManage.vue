<template>
    <div class="container">
        <!-- 黑名单管理 -->
        <QuickQuery :date="quick_query" @update="dateUpdate" />
        <div class="filter p10">
            <ul class="left">
                <li>
                    <span>会员账号</span>
                    <Input style="width:110px" limit="en-num" v-model="filter.account" />
                </li>
                <li>
                    <span>会员ID</span>
                    <Input style="width:110px" limit="en-num" v-model="filter.user_id" />
                </li>
                <li>
                    <span>进入黑名单时间</span>
                    <Date style="width:95px;" v-model="filter.start_date" @update="timeUpdate()" />
                    <span style="margin:0 5px;">~</span>
                    <Date style="width:95px;" v-model="filter.end_date" @update="timeUpdate()" />
                </li>
                <li>
                    <span>进入黑名单次数</span>
                    <Input style="width:110px" limit="en-num" v-model="filter.times" />
                </li>
            </ul>
            <div class="right">
                <button class="btn-blue" @click="search">查询</button>
                <button class="btn-blue" @click="clearAll">清空</button>
            </div>
        </div>
        <div class="table">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row}">
                    <td>{{row.b}}</td>
                    <td>{{row.a}}</td>
                    <td>{{row.b}}</td>
                    <td>{{row.b}}</td>
                    <td>{{row.b}}</td>
                    <td>{{row.c}}</td>
                    <td>{{row.b}}</td>
                    <td>{{row.d}}</td>
                    <td>{{row.e}}</td>
                    <td>
                        <button class="btn-green" @click="turnOnUser">启用</button>
                        <button class="btn-blue" @click="dtlShow(row)">详情</button>
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

        <Modal
            :show="show_black_list_conf"
            title="黑名单管理"
            content="是否启用该账户"
            @cancel="show_black_list_conf=false"
            @close="show_black_list_conf=false"
            @confirm="blackListConfirm"
        ></Modal>
        <div class="modal-mask" v-if="show_detail">
            <div class="v-modal">
                <div class="mod-head">
                    <span>黑名单 详情</span>
                    <i class="iconfont iconcuowuguanbi-" @click="show_detail=false"></i>
                </div>
                <div class="mod-body detail">
                    <BlackListManageDetail></BlackListManageDetail>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BlackListManageDetail from './BlackListManageDetail.vue'
export default {
    components: {
        BlackListManageDetail
    },
    data() {
        return {
            quick_query: [],
            filter: {
                account: '',
                user_id: '',
                start_date: '',
                end_date: '',
                times: ''
            },
            user_id: '',
            headers: [
                '会员账号',
                '会员ID',
                '账户余额',
                '注册时间',
                '最后登录时间',
                '进入黑名单时间',
                '最后登录IP',
                '进入黑名单次数',
                '备注',
                '操作'
            ],

            list: [
                {
                    a: '13245678998',
                    b: '100.00',
                    c: '2019/11/02 12:30:23',
                    d: '2019/12/15 12:12:00',
                    e: '冻结'
                },
                {
                    a: '1',
                    b: '2',
                    c: '192.168.1.1(中国.广州）',
                    d: '2019/12/15 12:12:00',
                    e: '冻结'
                }
            ],
            total: 0,
            pageSize: 20,
            pageNo: 1,
            // modal
            modal_cont: '是否启用该账户',
            show_black_list_conf: false,
            show_detail: false,
            is_detail_show: ''
        }
    },
    methods: {
        dateUpdate(dates) {
            this.filter.start_date = dates[0]
            this.filter.end_date = dates[1]
            // this.$set(this.filter, 'start_date', dates[0])
            // this.$set(this.filter, 'end_date', dates[1])
            this.filter = Object.assign(this.filter)
        },
        timeUpdate() {
            // 同步快捷查询时间
            this.quick_query = [this.filter.start_date, this.filter.end_date]
        },
        search() {},
        clearAll() {
            console.log(this.filter)
            this.filter = {
                account: '',
                user_id: '',
                start_date: '',
                end_date: '',
                times: ''
            }
        },
        updateNo(val) {},
        updateSize(val) {},
        turnOnUser() {
            this.show_black_list_conf = true
        },
        dtlShow() {
            this.show_detail = true
        },
        blackListConfirm() {
            console.log('我确认了')
        },
        
    },
    mounted() {}
}
</script>

<style scoped>
/* .container 公共区*/

/* .filter 公共区 */
/* .filter {
} */

.table {
    margin-top: 15px;
}
/* .g-head 公共区 */
/* btn-blue 公共区 */
/* table-page 公共区 */
.detail {
    width: 1080px;
}
</style>