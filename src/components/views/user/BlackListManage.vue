<template>
    <div class="container">
        <!-- 黑名单管理 -->
        <QuickQuery :date="quick_query" @update="dateUpdate" />
        <div class="filter p10">
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
                    <Date v-model="filter.start_date" @update="timeUpdate()" />
                    <span style="margin:0 5px;">~</span>
                    <Date v-model="filter.end_date" @update="timeUpdate()" />
                </li>
                <li>
                    <span>进入黑名单次数</span>
                    <Input style="width:100px" limit="en-num" v-model="filter.black_num" />
                </li>
            </ul>
            <div class="right">
                <button class="btn-blue" @click="getList">查询</button>
                <button class="btn-blue" @click="clearAll">清空</button>
            </div>
        </div>
        <div class="table">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row}">
                    <td>{{row.mobile}}</td>
                    <td>{{row.guid}}</td>
                    <td>{{row.account}}</td>
                    <td>{{row.register_time}}</td>
                    <td>{{row.last_login_time}}</td>
                    <td>{{row.create_at}}</td>
                    <td>{{row.last_login_ip}}</td>
                    <td>{{row.black_num}}</td>
                    <td>{{row.remark}}</td>
                    <td>
                        <button class="btn-green" @click="turnOnUser(row)">启用</button>
                        <button class="btn-blue" @click="dtlShow()">详情</button>
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
                    <BlackListManageDetail :row="curr_row" ></BlackListManageDetail>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BlackListManageDetail from "./BlackListManageDetail.vue";
export default {
    components: {
        BlackListManageDetail
    },
    data() {
        return {
            quick_query: [],
            filter: {
                mobile: "",
                guid: "",
                start_date: "",
                end_date: "",
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
            pageSize: 20,
            pageNo: 1,
            // modal
            modal_cont: "是否启用该账户",
            show_black_list_conf: false,
            show_detail:false,
            is_detail_show: "",
            curr_row:{},
        };
    },
    methods: {
        dateUpdate(dates) {
            this.filter.start_date = dates[0];
            this.filter.end_date = dates[1];
            // this.$set(this.filter, 'start_date', dates[0])
            // this.$set(this.filter, 'end_date', dates[1])
            this.filter = Object.assign(this.filter);
        },
        timeUpdate() {
            // 同步快捷查询时间
            this.quick_query = [this.filter.start_date, this.filter.end_date];
        },
        getList() {
            let para = {
                mobile:this.filter.mobile,
                guid:this.filter.guid,
                createAt:[this.filter.start_date,this.filter.end_date]
            };
            let params = window.all.tool.rmEmpty(para);
            let {method,url} =this.$api.black_list_list;
            this.$http({method:method,url:url,params:params}).then(res=>{
                // console.log('返回数据',res)
                if(res && res.code=='200'){
                    this.list=res.data.data
                    this.total=res.data.total
                }
            })
        },
        clearAll() {
            console.log(this.filter);
            this.filter = {
                mobile: "",
                user_id: "",
                start_date: "",
                end_date: "",
                black_num: ""
            };
        },
        updateNo(val) {},
        updateSize(val) {},
        turnOnUser() {
            this.show_black_list_conf = true;
            this.curr_row=row;
        },
        blackListConfirm() {
            let data = {
                id:this.curr_row.id
            }
            let {url,method} = this.$api.black_list_detail_remove;
            this.$http({method,url,data}).then(res=>{
                // console.log(res)
                if(res && res.code=='200'){
                    this.$toast.success(res && res.message);
                    this.show_black_list_conf=false
                    this.getList();
                }else{
                    if(res && res.message !==""){

                    }
                }
            })
        },
        dtlShow() {
            this.show_detail = true;
        },
        
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