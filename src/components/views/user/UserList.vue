<template>
    <!-- 会员列表 -->
    <div class="container">
        <div class="filter">
            <ul class="left">
                <li>
                    <span>会员账号</span>
                    <Input style="width:90px;" limit="en-num" v-model="filter.account" />
                </li>
                <li>
                    <span>会员ID</span>
                    <Input style="width:90px;" limit="en-num" v-model="filter.userid" />
                </li>
                <li>
                    <span>注册日期</span>
                    <Date style="width:100px;" v-model="filter.start_date" />
                    <span style="margin:0 5px;">至</span>
                    <Date v-model="filter.end_date" />
                </li>
                <li>
                    <span>在线状态</span>
                    <!-- <Input class="account-status" size="small"/> -->
                    <span>
                        <Select
                            v-model="filter.online_state"
                            :options="online_state_opt"
                            style="width:90px;"
                            @update="selectupdate"
                        ></Select>
                    </span>
                </li>
                <li>
                    <span>上级状态</span>
                    <!-- <Input class="account-status" size="small"/> -->
                    <span>
                        <Select
                            v-model="filter.online_state"
                            :options="online_state_opt"
                            style="width:90px;"
                            @update="selectupdate"
                        ></Select>
                    </span>
                </li>
                <li>
                    <span>注册IP</span>
                    <Input style="width:90px;" limit="number" v-model="filter.registid" />
                </li>
                <li style="margin-left:600px;margin-top:10px;">
                    <span>
                        <button class="btn-blue">查询</button>
                    </span>
                    <span>
                        <button class="btn-blue">导出Excel</button>
                    </span>
                </li>
            </ul>
            <div class="right"></div>
        </div>
        <div class="tool-bar">
            <button class="btn-plain" @click="addAccClick">添加账号</button>
        </div>

        <Table
            :headers="headers"
            :column="list"
            @checkboxChange="checkboxChange"
            :haveCheckbox="false"
        >
            <!-- 在线状态, 游戏账号, 游戏ID, 会员标签, 团队人数, 上级账号, 玩家金额, 注册IP->登录iP,注册日期->登录日期 -->
            <template v-slot:item="{row}">
                <td :class="[row.a==='在线'?'green':'orange']">{{row.a}}</td>
                <td>{{row.b}}</td>
                <td>{{row.c}}</td>
                <td>{{row.d}}</td>
                <td>{{row.e}}</td>
                <td>{{row.f}}</td>
                <td>
                    <div>{{row.h}}</div>
                    <div>{{row.i}}</div>
                </td>
                <td>
                    <div>{{row.j}}</div>
                    <div>{{row.k}}</div>
                </td>
                <td>
                    <div>{{row.l}}</div>
                    <div>{{row.m}}</div>
                </td>
                <td>
                    <div class="table-opra">
                        <span style="margin-right:10px;" @click="showDetail">详情</span>
                        <span @click="addBlackList">加入黑名单</span>
                    </div>
                </td>
            </template>
        </Table>
        <div class="page">
            <Page
                :total="total"
                :pageNo.sync="pageNo"
                :pageSize.sync="pageSize"
                @updateNo="updateNo"
                @updateSize="updateSize"
            />
        </div>
        <div class="modal-mask" v-if="show_detail">
            <div class="v-modal">
                <!-- // mask 内容 -------------- -->
                <div class="detail">
                    <div class="close-icon" @click="closeUserList()">
                        <i class="iconfont iconcuowuguanbi-"></i>
                    </div>
                    <!-- 一遍信息-图片 -->
                    <div class="row1 pic">
                        <div>
                            <img
                                class="avator"
                                src="../../../assets/image/user/neko.png"
                                alt="没有图片"
                            />
                        </div>
                        <div class="user-info">
                            <tr>
                                <td class="head-2">我爱吃火锅</td>
                                <td>VIP等级:VIP1</td>
                                <td>会员标签</td>
                            </tr>
                            <tr>
                                <td style="height:46px;">ID:66666</td>
                                <td>总余额: 0.00元</td>
                                <td v-if="EditUserTab" class="flex">
                                    <Select v-model="user_tab" :options="user_tab_opt"></Select>
                                    <span class="a">保存</span>
                                    <span class="a" @click="EditUserTab=false">取消</span>
                                </td>
                                <td v-if="!EditUserTab" class="flex">
                                    <span class="bg-red">
                                        <i class="iconfont iconjinggao1-"></i>
                                        <span>{{'危险会员'}}</span>
                                    </span>
                                    <span class="a" @click="EditUserTab=true">修改</span>
                                </td>
                            </tr>
                        </div>
                    </div>
                    <!-- 个人信息 -->
                    <div class="row2 info">
                        <div class="head-2">个人信息</div>
                        <div class="list">
                            <ul>
                                <li>
                                    <span>登录密码:</span>
                                    <span class="a">重置</span>
                                </li>
                                <li>
                                    <span>取款密码:</span>
                                    <span class="a">重置</span>
                                </li>
                                <li>
                                    <span>清空密码:</span>
                                    <span class="a">重置</span>
                                </li>
                                <li>
                                    <span>清空支付宝:</span>
                                    <span class="a">重置</span>
                                </li>
                                <li>
                                    <span>清空姓名:</span>
                                    <span class="a">重置</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- 推广详情 -->
                    <div class="row3 promotion">
                        <div class="head-2">推广详情</div>
                        <div class="list">
                            <ul>
                                <li>
                                    <span>推广级别:</span>
                                    <span>{{'----'}}</span>
                                </li>
                                <li>
                                    <span>团队成员数:</span>
                                    <span>{{'100'}}人</span>
                                </li>
                                <li>
                                    <span>佣金金额:</span>
                                    <span>{{'0.00'}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- 财务信息 -->
                    <div class="row4 money">
                        <div class="head-2">财务信息</div>
                        <div class="list">
                            <ul>
                                <li>
                                    <span>今日存款:</span>
                                    <span>{{'0.00'}}元</span>
                                </li>
                                <li>
                                    <span>今日取款:</span>
                                    <span>{{'100'}}人</span>
                                </li>
                                <li>
                                    <span>总出款:</span>
                                    <span>{{'0.00'}}</span>
                                </li>
                                <li>
                                    <span>总入款:</span>
                                    <span>{{'0.00'}}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="list">
                            <ul>
                                <li>
                                    <span>存款次数:</span>
                                    <span>{{'0.00'}}元</span>
                                </li>
                                <li>
                                    <span>提款次数:</span>
                                    <span>{{'100'}}人</span>
                                </li>
                            </ul>
                        </div>
                        <div class="list">
                            <ul>
                                <li>
                                    <span>最多单笔存款:</span>
                                    <span>{{'0.00'}}元</span>
                                </li>
                                <li>
                                    <span>最大单笔提款:</span>
                                    <span>{{'100'}}人</span>
                                </li>
                            </ul>
                        </div>
                        <div class="list">
                            <ul>
                                <li>
                                    <span>总投注:</span>
                                    <span>{{'0.00'}}元</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- 其他信息 -->
                    <div class="row5 other">
                        <div class="head-2">其它信息</div>
                        <div class="list">
                            <ul>
                                <li>
                                    <span>最后登录设备:</span>
                                    <span>{{'IOS'}}</span>
                                </li>
                                <li>
                                    <span>最后登录IP:</span>
                                    <span>{{'IOS'}}</span>
                                </li>
                                <li>
                                    <span>最后登录地址:</span>
                                    <span>{{'IOS'}}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="list">
                            <ul>
                                <li>
                                    <span>最后登录时间:</span>
                                    <span>{{'IOS'}}</span>
                                </li>
                                <li>
                                    <span>距今登录:</span>
                                    <span>{{'IOS'}}</span>
                                </li>
                                <li>
                                    <span>注册IP:</span>
                                    <span>{{'IOS'}}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="list">
                            <ul>
                                <li>
                                    <span>注册时间:</span>
                                    <span>{{'2019/05/16 15:15:00'}}</span>
                                </li>
                                <li>
                                    <span>登录次数:</span>
                                    <span>{{'IOS'}}</span>
                                </li>
                                <li>
                                    <span>推广渠道:</span>
                                    <span>{{'IOS'}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="inner_mask_show" class="inner-mask">
            <div class="confirm v-model">
                <div class="close-icon" @click="closeConfirm()">
                    <i class="iconfont iconcuowuguanbi-"></i>
                </div>
                <div class="form">
                    <ul>
                        <li>
                            <span>会员账号:</span>
                            <Input v-model="add_acc" />
                        </li>
                        <li>
                            <span>登录密码:</span>
                            <Input v-model="add_acc" type="password" />
                        </li>
                        <li>
                            <span>确认密码:</span>
                            <Input v-model="add_acc" type="password" />
                        </li>
                    </ul>
                    <div class="confirm-btn">
                        <button class="btn-blue-large">确认</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-mask" v-if="show_add_black_list">
            <div class="blacklist">
                <div class="blacklist-inner">
                    <div class="infor">是否确定把该玩家加入黑名单！</div>
                    <span class="textarea-remark">
                        <span class="mr5">备注:</span>
                        <textarea class="textarea" cols="40" rows="10"></textarea>
                    </span>
                    <div class="btns">
                        <button class="btn-plain-large mr100" @click="show_add_black_list=false">取消</button>
                        <button class="btn-blue-large">确认</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            filter: {
                account: "",
                userid: "",
                start_date: "",
                end_date: "",
                online_state: "",
                registid: ""
            },
            headers: [
                { label: "在线状态" },
                { label: "游戏账号" },
                { label: "游戏ID" },
                { label: "会员标签" },
                { label: "团队人数" },
                { label: "上级账号" },
                { label: "玩家金额" },
                { label: "注册IP,登录IP" },
                { label: "注册日期, 登录日期" },
                { label: "操作" }
            ],
            list: [
                {
                    a: "在线",
                    b: "132****4654",
                    c: "33542354234",
                    d: "555555554234",
                    e: "sd",
                    f: "192.168.0.0",
                    g: "df",
                    h: "df",
                    i: "192.168.0.0",
                    j: "192.168.0.0",
                    k: "2019/8/12 14：12：00",
                    l: "2019/8/12 14：12：00",
                    m: "2019/8/12 14：12：00"
                },
                { a: "离线", b: "132****4654", c: "3", d: "4" }
            ],
            online_state: "",
            online_state_opt: [
                { label: "全部", value: "" },
                { label: "在线", value: "1" },
                { label: "离线", value: "2" }
            ],
            pageNo: 1,
            pageSize: 25,
            total: 300,

            show_detail: false,
            use_detail: false,
            add_acc: "",
            user_tab: "",
            EditUserTab: false,
            user_tab_opt: [
                { label: "危险会员", value: 1 },
                { label: "普通会员", value: 2 }
            ],

            inner_mask_show: false,
            show_add_black_list: false
        };
    },
    methods: {
        checkboxChange(whitch, is_checked, check_list) {
            console.log(" check_list", check_list);
            console.log("whitch", whitch);
            console.log("是否选中", is_checked);
            console.log(this.list);
        },
        selectupdate(val) {
            this.$toast.info("你好");
        },

        showDetail() {
            this.show_detail = true;
        },
        addBlackList() {
            this.show_add_black_list = true;
        },
        closeUserList() {
            this.show_detail = false;
        },
        addAccClick() {
            this.inner_mask_show = true;
        },
        closeConfirm() {
            this.inner_mask_show = false;
        },
        updateNo(val) {
            this.p;
        },
        updateSize(val) {}
    },
    mounted() {}
};
</script>

<style scoped>
.container {
    padding: 20px 8px 20px 8px;
    /* font-size: 14px; */
    background: #fff;
    border-radius: 5px;
    border-top-left-radius: 0;
}
.filter {
    line-height: 30px;
}

/*  */

/* .acc-status {
    display: flex;
    align-items: center;
    display: inline-block;
} */

.btn-blue {
    /* padding: 4px 15px; */
    outline: none;
    border: none;
    border-radius: 3px;
    color: #fff;
    background: #4c8bfd;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    cursor: pointer;
}
.btn-blue:hover {
    background: #6a9bf5;
    box-shadow: none;
}
.filter .btn-blue {
    padding: 4px 15px;
}
.tool-bar .btn-blue {
    padding: 6px 15px;
}
.tool-bar {
    margin-bottom: 10px;
}
.table-td {
    /* width: 300px; */
    text-align: center;
    padding: 18px 6px;
}
/* .modal-mask   已转移到公共css*/
.v-modal {
    min-width: 500px;
    min-height: 500px;
    position: absolute;
    top: 100px;
    z-index: 2;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 7px;
}

/* 确认窗口 */
.inner-mask .confirm {
    min-width: 450px;
    min-height: 350px;
    position: absolute;
    top: 100px;
    z-index: 3;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 10px;
    background-color: #fff;
    border-radius: 7px;
}
.confirm .form {
    width: 300px;
    position: relative;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.confirm .form ul li {
    margin-top: 30px;
}
.confirm .form ul li {
    display: flex;
    align-items: center;
}
.confirm .form ul li > span:first-child {
    margin-right: 10px;
}
.blacklist {
    min-width: 450px;
    min-height: 380px;
    position: absolute;
    top: 50%;
    z-index: 2;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background-color: #fff;
    border-radius: 7px;
}
.blacklist-inner {
    text-align: center;
}
.blacklist-inner .btns button {
    margin-top: 70px;
    /* padding: 8px 16px; */
}
.blacklist-inner .btns .btn-plain-normal {
    margin-right: 60px;
}
.textarea-remark{
    display: flex;
    justify-content: center;
    align-items: baseline;
    margin-top: 10px;
}
.blacklist-inner .textarea{
    margin-top: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
}
.table-opra span {
    font-size: 14px;
    font-weight: border;
    text-decoration: underline;
    cursor: pointer;
    color: #4c8bfd;
}
.a {
    font-weight: border;
    text-decoration: underline;
    cursor: pointer;
    color: #4c8bfd;
    margin-left: 8px;
}
.a:active {
    color: red;
}
.page {
    margin-top: 30px;
    display: flex;
    justify-content: center;
}
.detail {
    width: 800px;
    position: relative;
    padding: 25px;
}
.confirm .iconcuowuguanbi-,
.modal-mask .iconcuowuguanbi- {
    position: absolute;
    right: 12px;
    top: 12px;
    font-size: 35px;
    color: #4c8bfd;
}
.confirm .iconcuowuguanbi-:hover,
.modal-mask .iconcuowuguanbi-:hover {
    color: #749ff0;
    cursor: pointer;
}
.v-modal .detail .row1 {
    display: flex;
}
/* .detail .user-info {
} */
.detail .user-info tr td {
    padding: 6px 12px;
}
.avator {
    width: 85px;
    height: 85px;
    overflow: hidden;
    border: 3px solid #4c8bfd;
    border-radius: 5px;
}
.head-2 {
    font-size: 16px;
    font-weight: 600;
    color: #4c8bfd;
}
.modal-mask .row1,
.modal-mask .row2,
.modal-mask .row3,
.modal-mask .row4,
.modal-mask .row5 {
    margin-top: 24px;
}
.modal-mask .list ul {
    display: flex;
}
.list {
    margin-top: 10px;
}
.list ul li {
    font-weight: 600;
    color: rgb(83, 83, 83);
}
.list ul li:not(:last-child) {
    margin-right: 40px;
}
.bg-red {
    padding: 4px 6px;
    border-radius: 5px;
    background: #fe4c4c;
    color: #fff;
}
.confirm-btn {
    margin-top: 30px;
    text-align: center;
}
.confirm-btn .btn-blue {
    padding: 8px 14px;
}
.mr5{
    margin-right: 5px;
    position: relative;
    top: 5px;
}
.mr100{
    margin-right: 100px;
}
</style>