<template>
    <div class="container">
        <!-- 黑名单管理 -->
        <QuickQuery :date="quick_query" @update="dateUpdate" />
        <div class="filter">
            <ul class="left">
                <li>
                    <span>会员账号</span>
                    <Input style="width:100px" limit="en-num" v-model="filter.mobile" />
                </li>
                <li>
                    <span>会员ID</span>
                    <Input style="width:100px" limit="en-num" v-model="filter.guid" />
                </li>
                <li>
                    <span>进入黑名单时间</span>
                    <Date
                        type="datetimerange"
                        style="width:300px;"
                        v-model="filter.dates"
                        @update="timeUpdate()"
                    />
                </li>
                <li>
                    <span>进入黑名单次数</span>
                    <Input style="width:100px" limit="en-num" v-model="filter.black_num" />
                </li>
                <li>
                    <span>
                        <button class="btn-blue" @click="getList">查询</button>
                    </span>
                    <span>
                        <button class="btn-blue" @click="clearAll">清空</button>
                    </span>
                </li>
            </ul>
        </div>
        <div class="table">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row}">
                    <td>{{row.mobile}}</td>
                    <td>{{row.guid}}</td>
                    <td>{{row.account}}</td>
                    <td>{{row.register_time}}</td>
                    <td>{{row.last_login_time}}</td>
                    <td>{{row.created_at}}</td>
                    <td>{{row.last_login_ip}}</td>
                    <td>{{row.black_num}}</td>
                    <td>{{row.remark}}</td>
                    <td>
                        <button class="btn-green" @click="turnOnUser(row)">启用</button>
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
        <Dialog :show.sync="blackList_show" title="黑名单详情"  >
            <div class="dia-inner" style="width:1200px" >
                <div class="cont">
                    <QuickQuery :date="quick_query" @update="quickDateUpdate" />
                    <div class="filter p10">
                        <ul class="left">
                            <li>
                                <span>进入黑名单日期</span>
                                <Date
                                    style="width:300px;"
                                    type="datetimerange"
                                    v-model="black.dates"
                                    @update="blackTimeUpdate()"
                                />
                            </li>
                            <li>
                                <span>状态</span>
                                <Select v-model="black.status" :options="status_opt"></Select>
                            </li>
                            <li style="margin-bottom:0;">
                                <button class="btn-blue" @click="getBlackListDetail" >查询</button>
                                <button class="btn-blue"  @click="clearBlack" >清空</button>
                            </li>
                        </ul>
                    </div>
                    <Table class="table" :headers="blackHeaders" :column="blackList">
                        <template v-slot:item="{row}">
                            <td>{{row.mobile}}</td>
                            <td>{{row.guid}}</td>
                            <td>{{row.account}}</td>
                            <td>{{row.register_time}}</td>
                            <td>{{row.last_login_time}}</td>
                            <td>{{row.created_at}}</td>
                            <td>{{row.remove_time}}</td>
                            <td>{{row.last_login_ip}}</td>
                            <td>{{row.remark}}</td>
                        </template>
                    </Table>
                    <Page
                        class="table-page"
                        :total="blackTotal"
                        :pageNo.sync="blackPageNo"
                        :pageSize.sync="blackPageSize"
                        @updateNo="blackUpdateNo"
                        @updateSize="blackUpdateSize"
                    />
                </div>
            </div>
        </Dialog>
    </div>
</template>

<script>
export default {
    name: "BlackListManage",
    data() {
        return {
            quick_query: [],
            filter: {
                mobile: "",
                guid: "",
                dates: [],
                black_num: ""
            },
            guid: "",
            headers: [
                "会员账号",
                "会员ID",
                "账户余额",
                "注册时间",
                "最后登录时间",
                "进入黑名单时间",
                "最后登录IP",
                "进入黑名单次数",
                "备注",
                "操作"
            ],

            list: [],
            total: 0,
            pageSize: 25,
            pageNo: 1,

            blackTotal:0,
            blackPageNo:1,
            blackPageSize:25,
            // modal
            modal_cont: "是否启用该账户",
            show_black_list_conf: false,
            show_detail: false,
            is_detail_show: "",
            curr_row: {},
            blackList_show:false,
            black:{
                dates:[],
                status:''
            },
            blackHeaders:[
                '会员账号',
                '会员ID',
                '账户余额',
                '注册时间',
                '最后登录时间',
                '进入黑名单时间',
                '解冻时间',
                '最后登录IP',
                '备注',
            ],
            blackList:[],
            status_opt: [
                { label: '全部', value: ""},
                { label: '已解冻', value: "1" },
                { label: '冻结', value: "0"}
            ],
        };
    },
    methods: {
        timeUpdate() {
            // 同步快捷查询时间
            this.quick_query = this.filter.dates;
        },
        dateUpdate(dates) {
            // console.log("传入时间", dates);
            let arr = [dates[0] + " 00:00:00", dates[1] + " 00:00:00"];
            this.$set(this.filter, "dates", arr);
        },
        quickDateUpdate(dates) {
            let arr = [dates[0] + " 00:00:00", dates[1] + " 00:00:00"];
            this.$set(this.black, "dates", arr);
        },
        blackTimeUpdate() {
            // 同步快捷查询时间
            this.quick_query = this.black.dates
        },
        getList() {
            let createAt = "";
            if (this.filter.dates[0] && this.filter.dates[1]) {
                createAt = JSON.stringify([
                    this.filter.dates[0],
                    this.filter.dates[1]
                ]);
            }
            let para = {
                mobile: this.filter.mobile,
                guid: this.filter.guid,
                createAt: createAt,
                page: this.pageNo,
                pageSize: this.pageSize
            };
            console.log("请求数据", para);
            let data = window.all.tool.rmEmpty(para);
            let { method, url } = this.$api.black_list_list;
            this.$http({ method: method, url: url, data: data }).then(
                res => {
                    console.log("返回数据", res);
                    if (res && res.code == "200") {
                        this.list = res.data.data;
                        this.total = res.data.total;
                    }
                }
            );
        },
        clearAll() {
            this.filter = {
                mobile: "",
                user_id: "",
                dates: [],
                black_num: ""
            };
        },
        updateNo(val) {
            this.getList();
        },
        updateSize(val) {
            this.pageNo = 1;
            this.getList();
        },
        blackUpdateNo(val) {
            this.getBlackListDetail();
        },
        blackUpdateSize(val) {
            this.blackPageNo = 1;
            this.getBlackListDetail();
        },
        turnOnUser(row) {
            this.show_black_list_conf = true;
            this.curr_row = row;
        },
        blackListConfirm() {
            let data = {
                id: this.curr_row.id
            };
            console.log("加入黑名单请求数据", data);
            let { url, method } = this.$api.black_list_detail_remove;
            this.$http({ method, url, data }).then(res => {
                // console.log(res)
                if (res && res.code == "200") {
                    this.$toast.success(res && res.message);
                    this.show_black_list_conf = false;
                    this.getList();
                }
            });
        },
        dtlShow(row) {
            this.blackList_show = true;
            this.curr_row = row;
            this.getBlackListDetail();
        },
        getBlackListDetail(){
            let createAt = "";
            if (this.black.dates[0] && this.black.dates[1]) {
                createAt = JSON.stringify([
                    this.black.dates[0],
                    this.black.dates[1]
                ]);
            }
            let para={
                guid:this.curr_row.guid,
                status:this.black.status,
                createAt:createAt,
                page: this.blackPageNo,
                pageSize: this.blackPageSize
            }
            // console.log('黑名单详情请求数据',para)
            let params = window.all.tool.rmEmpty(para)
            let {method,url} =this.$api.black_list_detail_list;
            this.$http({method:method,url:url,params:params}).then(res=>{
                console.log(res)
                if(res && res.code=='200'){
                    this.blackList=res.data.data;
                    this.blackTotal=res.data.total;
                    // console.log('获取到的数据',this.blackList)
                }
            })
        },
        clearBlack(){
            this.black={
                dates:[],
                status:'',
            }
        }
    },
    mounted() {
        this.getList();
    }
};
</script>

<style scoped>
/* .container 公共区*/

/* .filter 公共区 */
/* .filter {
} */
.filter {
    /* margin-top: 10px; */
    margin-bottom: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
}
.filter .left {
    margin-left: 10px;
}
.filter .left li {
    margin-top: 10px;
    /* margin-bottom: 10px; */
}
.table {
    margin-top: 15px;
}
table {
    border-collapse: collapse;
    width: 100%;
}
.table {
    margin-top: 10px;
    width: 100%;
    overflow-x: auto;
}
.table .v-table {
    width: 1500px;
}

/* .g-head 公共区 */
/* btn-blue 公共区 */
/* table-page 公共区 */
.detail {
    width: 1080px;
}
</style>