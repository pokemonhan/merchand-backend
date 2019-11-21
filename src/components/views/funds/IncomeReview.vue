<template>
    <div class="container">
        <h4 class="head">入款审核</h4>
        <div class="select-list">
            <button
                :class="[curr_list==='online'?'btn':'btn-blue']"
                @click="curr_list='offline'"
            >线下入款</button>
            <button
                :class="[curr_list==='online'?'btn-blue':'btn']"
                @click="curr_list='online'"
            >线上入款</button>
        </div>
        <!-- ------------------------------------    线下   --------------------------------------------------------->
        <div v-if="curr_list==='offline'">
            <div class="filter">
                <ul class="left">
                    <li>
                        <span>会员账号</span>
                        <Input style="width:120px" v-model="offline_filter.account" />
                    </li>
                    <li>
                        <span>会员ID</span>
                        <Input style="width:110px" v-model="offline_filter.id" />
                    </li>
                    <li>
                        <span>充值时间</span>
                        <Date style="width:110px" v-model="offline_filter.date" />
                    </li>
                    <li>
                        <span>订单号</span>
                        <Input style="width:110px" v-model="offline_filter.order_id" />
                    </li>
                    <li>
                        <span>商户</span>
                        <Input style="width:110px" v-model="offline_filter.vendor" />
                    </li>
                    <li>
                        <span>支付状态</span>
                        <Select
                            style="width:110px"
                            v-model="offline_filter.pay_status"
                            :options="pay_status_opt"
                        ></Select>
                    </li>
                    <li>
                        <span>支付方式</span>
                        <Select
                            style="width:110px"
                            v-model="offline_filter.pay_way"
                            :options="pay_way_opt"
                        ></Select>
                    </li>
                    <li style="margin-left:600px">
                        <button class="btn-blue">查询</button>
                    </li>
                    <li>
                        <button class="btn-blue">导出Excel</button>
                    </li>
                </ul>
                <div class="right1"></div>
            </div>
            <div class="table">
                <Table :headers="offline_table_headers" :column="off_list">
                    <template v-slot:item="{row}">
                        <td style="height:30px">{{row.b}}</td>
                        <td>{{row.a}}</td>
                        <td>{{row.b}}</td>
                        <td>{{row.d}}</td>
                        <td>{{row.d}}</td>
                        <td>{{row.e}}</td>
                        <td>{{row.f}}</td>
                        <td>{{row.h}}</td>
                        <td>{{row.i}}</td>
                        <td>{{row.j}}</td>
                        <td>
                            <span>
                                <span class="a" @click="offlineShowDetail(row)">详情</span>
                                <span class="a" @click="offlineIncomeConf(row)">通过</span>
                            </span>
                        </td>
                    </template>
                    <template #tr>
                        <tr>
                            <td colspan="6">合计:</td>
                            <td>200.00</td>
                            <td>200.00</td>
                            <td colspan="3"></td>
                        </tr>
                        <tr>
                            <td colspan="6">总计:</td>
                            <td>200.00</td>
                            <td>200.00</td>
                            <td colspan="3"></td>
                        </tr>
                    </template>
                </Table>
            </div>
            <!-- 详情 modal------------------------------- -->
            <div class="modal-mask" v-if="is_show_offline_detail">
                <div class="v-modal">
                    <div @click="is_show_offline_detail=false">
                        <i class="iconfont iconcuowuguanbi-"></i>
                    </div>
                    <div class="detail">
                        <tr>
                            <td>
                                <span>会员账号:</span>
                                <span>{{'1234324324'}}</span>
                            </td>
                            <td>
                                <span>会员ID:</span>
                                <span>{{'1234324324'}}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>会员等级:</span>
                                <span>{{'1234324324'}}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>平台名称:</span>
                                <span>{{'红牛平台'}}</span>
                            </td>
                            <td>
                                <span>支付类型:</span>
                                <span>{{'红牛支付支付宝扫码'}}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>第三方支付订单号:</span>
                                <span>{{'654646565465'}}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>充值金额:</span>
                                <span>{{'654646565465'}}</span>
                            </td>
                            <td>
                                <span>交易时间:</span>
                                <span>{{'2019-09-20 12:59:30'}}</span>
                            </td>
                        </tr>
                    </div>
                    <div class="save-btn">
                        <!-- <a href="/i/w3school_logo_white.gif" download="w3logo"> -->
                        <a class="btn-blue-large" @click="offlineSavePicture">保存图片</a>
                    </div>
                </div>
            </div>

            <Modal
                :show="offline_conf"
                title="入款审核"
                content="通过该入款订单"
                @cancel="offline_conf=false"
                @confirm="offlineIncomeConfirm"
            ></Modal>
        </div>

        <!-- ------------------------------------    线上入款    --------------------------------------------------------->
        <div v-if="curr_list==='online'">
            <div class="filter">
                <ul class="left">
                    <li>
                        <span>会员账号</span>
                        <Input style="width:100px" v-model="online_filter.account" />
                    </li>
                    <li>
                        <span>会员ID</span>
                        <Input style="width:100px" v-model="online_filter.id" />
                    </li>
                    <li>
                        <span>充值时间</span>
                        <Date style="width:90px" v-model="online_filter.date" />
                    </li>

                    <li>
                        <span>转账方式</span>
                        <Select
                            style="width:100px"
                            v-model="online_filter.pay_way"
                            :options="pay_way_opt"
                        ></Select>
                    </li>
                    <li>
                        <span>审核状态</span>
                        <Select
                            style="width:110px"
                            v-model="online_filter.review_status"
                            :options="review_status_opt"
                        ></Select>
                    </li>
                    <li>
                        <button class="btn-blue">查询</button>
                    </li>
                    <li>
                        <button class="btn-blue">导出Excel</button>
                    </li>
                </ul>
                <div class="right1"></div>
            </div>
            <div class="table">
                <Table :headers="online_table_headers" :column="online_list">
                    <template v-slot:item="{row}">
                        <td style="height:30px">{{row.b}}</td>
                        <td>{{row.a}}</td>
                        <td>{{row.b}}</td>
                        <td>{{row.d}}</td>
                        <td>{{row.d}}</td>
                        <td>{{row.e}}</td>
                        <td>{{row.f}}</td>
                        <td>
                            <span v-if="true">
                                <span class="a" @click="onlineIncomeConf(row,true)">通过</span>
                                <span class="a" @click="onlineIncomeConf(row,false)">拒绝</span>
                                <span class="a" @click="onlineShowDetail(row)">详情</span>

                            </span>
                            <span v-else>
                                <span class="a" @click="onlineShowDetail(row)">详情</span>
                                <span class="a" @click="onlineIncomeConf(row)">通过</span>
                            </span>
                        </td>
                        <td>{{row.h}}</td>
                    </template>
                    <template #tr>
                        <tr>
                            <td colspan="4">合计:</td>
                            <td>200.00</td>
                            <td colspan="4"></td>
                        </tr>
                        <tr>
                            <td colspan="4">总计:</td>
                            <td>200.00</td>
                            <td colspan="4"></td>
                        </tr>
                    </template>
                </Table>
                <Page
                    class="page"
                    :total="online_total"
                    :pageNo.sync="online_pageNo"
                    :pageSize.sync="online_pageSize"
                    @updateNo="onlineUpdateNo"
                    @updateSize="onlineUpdateSize"
                />
            </div>
            <!-- offline详情 modal------------------------------- -->
            <div class="modal-mask" v-if="is_show_online_detail">
                <div class="v-modal">
                    <div @click="is_show_online_detail=false">
                        <i class="iconfont iconcuowuguanbi-"></i>
                    </div>
                    <div class="detail">
                        <tr>
                            <td>
                                <span>会员账号:</span>
                                <span>{{'1234324324'}}</span>
                            </td>
                            <td>
                                <span>会员ID:</span>
                                <span>{{'1234324324'}}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>会员等级:</span>
                                <span>{{'1234324324'}}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>转入银行:</span>
                                <span>{{'招商银行'}}</span>
                            </td>
                            <td>
                                <span>转入账号:</span>
                                <span>{{'红牛支付支付宝扫码'}}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>充值金额:</span>
                                <span>{{'654646565465'}}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>收款金额:</span>
                                <span>{{'654646565465'}}</span>
                            </td>
                            <td>
                                <span>收款账号:</span>
                                <span>{{'2019-09-20 12:59:30'}}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>交易时间:</span>
                                <span>{{'2019-09-20 12:59:30'}}</span>
                            </td>
                        </tr>
                    </div>
                    <div class="save-btn">
                        <!-- <a href="/i/w3school_logo_white.gif" download="w3logo"> -->
                        <a class="btn-blue-large" @click="onlineSavePicture">保存图片</a>
                    </div>
                </div>
            </div>

            <Modal
                :show="is_show_online_conf"
                title="入款审核"
                :content="online_conf_content"
                @cancel="is_show_online_conf=false"
                @confirm="onlineIncomeConfirm"
            ></Modal>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            curr_list: "online",
            offline_filter: {
                account: "",
                id: "",
                date: "",
                order_id: "",
                vendor: "",
                pay_status: "",
                pay_way: ""
            },

            pay_status_opt: [
                { label: "全部", value: "" },
                { label: "已支付", value: 1 },
                { label: "未支付", value: 2 }
            ],
            pay_way_opt: [
                { label: "全部", value: "" },
                { label: "微信充值", value: 1 },
                { label: "支付宝充值", value: 2 },
                { label: "京东充值", value: 3 }
            ],
            offline_table_headers: [
                { label: "订单号" },
                { label: "会员账号" },
                { label: "会员ID" },
                { label: "上级代理" },
                { label: "商户" },
                { label: "支付方式" },
                { label: "充值金额" },
                { label: "实际到账" },
                { label: "支付状态" },
                { label: "充值时间" },
                { label: "操作" }
            ],
            off_list: [
                { a: "aD201909201252", b: "13245678942", c: "4561234", d: "13256689796", e: "红牛商户", f: "微信充值", g: "100", h: "99.9", i: "已支付", j: "2019/09/20 12:25:20" }
            ],
            offline_total: 0,
            offline_pageNo: 1,
            offline_pageSize: 25,
            is_show_offline_detail: false,
            offline_conf: false,
            // 线上 -----------------------------------
            online_filter: {
                account: "",
                id: "",
                date: "",
                pay_way: "",
                review_status: ""
            },
            review_status: "",
            review_status_opt: [
                { label: "全部", value: "" },
                { label: "审核中", value: 1 },
                { label: "通过", value: 2 },
                { label: "拒绝", value: 3 }
            ],
            online_table_headers: [
                { label: "订单号" },
                { label: "会员账号" },
                { label: "会员ID" },
                { label: "转账方式" },
                { label: "充值金额" },
                { label: "审核状态" },
                { label: "充值时间" },
                { label: "操作" },
                { label: "操作人" }
            ],
            online_list: [
                { a: "aD201909201252", b: "13245678942", c: "4561234", d: "支付宝转账", e: "100.00", f: "2019/09/20 12:25:20", g: "100", h: "admin", i: "admin" },
                { a: "aD201909201252", b: "13245678942", c: "4561234", d: "支付宝转账", e: "100.00", f: "2019/09/20 12:25:20", g: "100", h: "admin", i: "admin" }
            ],
            online_conf_content: '',
            online_total: 0,
            online_pageNo: 1,
            online_pageSize: 25,
            is_show_online_detail: false,
            is_show_online_conf: false,
            online_conf_button: '',     // 点击的是 1. 通过按钮('pass'), 2.拒绝('refuse')

        };
    },
    methods: {
        offlineShowDetail(row) {
            this.is_show_offline_detail = true;
        },
        offlineIncomeConf(row) {
            this.offline_conf = true;
        },
        offlineSavePicture() {
            let a_link = document.createElement("a");
            a_link.download = "asd-coding5.png";
            // a_link.href ='https://file.iviewui.com/asd/asd-coding5.png'
            a_link.click();
        },
        offlineIncomeConfirm() {},
        offlineUpdateNo(val) {},
        offlineUpdateSize(val) {
            this.pageNo = 1
        },
        offlineGetList(){
            // this.$http
        },
        // 线上-----------------

        onlineShowDetail(row) {
            this.is_show_online_detail = true;
        },
        onlineIncomeConf(row, is_confirm) {
            this.is_show_online_conf = true;
            if(is_confirm){
                this.online_conf_button = 'pass'
                this.online_conf_content = '是否通过该订单'
            }else{
                this.online_conf_content = '是否拒绝该订单'
                this.online_conf_button = 'refuse'
            }
        },
        onlineSavePicture() {
            let a_link = document.createElement("a");
            a_link.download = "asd-coding5.png";
            // a_link.href ='https://file.iviewui.com/asd/asd-coding5.png'
            a_link.click();
        },
        onlineIncomeConfirm() {
            if(this.online_conf_button==='pass'){
                console.log('确认通过');
                
            }else{
                console.log('确认拒绝')
            }
        },
        onlineUpdateNo(val) {},
        onlineUpdateSize(val) {
            this.pageNo = 1
        },
        onlineGetList(){
            // this.$http
        },
    }
};
</script>

<style scoped>
.container {
    padding: 20px 8px 20px 8px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    background: #fff;
}
.head {
    margin-left: 20px;
}
.select-list {
    padding: 10px;
    border-bottom: 1px solid #eee;
    /* margin-bottom: 10px; */
}
/*  */
.filter ul li{
    margin: 10px 10px 10px 0;
}
/* .modal-mask     样式在公共区... */
.v-modal {
    min-width: 600px;
    height: 400px;
    position: absolute;
    top: 100px;
    z-index: 3;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 40px;
    background-color: #fff;
    border-radius: 7px;
}
.modal-mask .iconcuowuguanbi- {
    position: absolute;
    right: 12px;
    top: 12px;
    font-size: 35px;
    color: #4c8bfd;
}
.modal-mask .iconcuowuguanbi-:hover {
    color: #6999f1;
}
.v-modal .detail td {
    padding-top: 10px;
    padding-bottom: 10px;
}
.v-modal .detail tr td > :nth-child(2) {
    padding-left: 10px;
    font-size: 14px;
    color: #555;
}
.save-btn {
    text-align: center;
    margin-top: 60px;
}
.save-btn .btn-blue-large {
    text-align: center;
    /* padding: 8px 12px; */
}
</style>