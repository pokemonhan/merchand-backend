<template>
    <div class="container">
         <!-- 黑名单管理 -->
        <QuickQuery @update="dateUpdate"/>
        <div class="filter">
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
                    <Date style="width:110px;" v-model="filter.start_date" />
                    <span style="margin:0 5px;"> ~ </span>
                    <Date style="width:110px;" v-model="filter.end_date" />
                </li>
                
            </ul>
            <div class="right">
                    <button class="btn-blue">查询</button>
            </div>
        </div>
        <div class="table">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row}">
                    <td>{{row.b}}</td>
                    <td>{{row.a}}</td>
                    <td>{{row.b}}</td>
                    <td>{{row.b}}</td>
                    <td>{{row.c}}</td>
                    <td>{{row.d}}</td>
                    <td>{{row.e}}</td>
                    <td>
                        <button class="btn-blue" @click="turnOnUser">启用</button>
                    </td>
                </template>
            </Table>
            <Page
                class="table-page"
                :total="total"
                :pagerCount="pagerCount"
                @updateNo="updateNo"
                @updateSize="updateSize"
            />
        </div>
        <!-- <div class="modal-mask" >
            <div class="v-modal">
            </div>
        </div>-->
        <Modal
            :show="show_black_list_conf"
            title="黑名单管理"
            content="是否启用该账户"
            @cancel="show_black_list_conf=false"
            @confirm="blackListConfirm"
        ></Modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            filter: {
                account: '',
                user_id: '',
                start_date: '',
                end_date: '',
            },
            user_id: "",
            headers: [
                { label: "会员账号" },
                { label: "上级账户" },
                { label: "账户余额" },
                { label: "注册时间" },
                { label: "最后登录时间" },
                { label: "最近登录IP" },
                { label: "状态" },
                { label: "操作" }
            ],

            list: [
                { a: "13245678998", b: "100.00", c: "2019/11/02 12:30:23", d: "2019/12/15 12:12:00", e: "冻结" },
                { a: "1", b: "2", c: "192.168.1.1(中国.广州）", d: "2019/12/15 12:12:00", e: "冻结" }
            ],
            total: 0,
            pagerCount: 0,

            modal_cont: "是否启用该账户",
            show_black_list_conf: false
        };
    },
    methods: {
        dateUpdate(dates) {
            console.log('开始',this.filter);
            
            console.log('dates: ', dates[0]);
            this.filter.start_date = dates[0]
            this.filter.end_date = dates[1]
            // this.$set(this.filter, 'start_date', dates[0])
            // this.$set(this.filter, 'end_date', dates[1])
            this.filter = Object.assign(this.filter)
            console.log('结束',this.filter);

        },
        updateNo(val) {},
        updateSize(val) {},
        turnOnUser() {
            this.show_black_list_conf = true;
        },
        blackListConfirm() {
            console.log("我确认了");
        }
    },
    mounted() {}
};
</script>

<style scoped>
.container {
    padding: 20px 8px 20px 8px;
    background: #fff;
    border-radius: 5px;
    border-top-left-radius: 0;
}
.filter {
    /* display: flex; */
    /* line-height: 30px; */
}
/* .filter > ul > li {
    margin-right: 15px;
    line-height: 28px;
}
.filter {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
} */
.table {
    margin-top: 15px;
}
/* .page {
    margin-top: 30px;
    display: flex;
    justify-content: center;
} */
</style>