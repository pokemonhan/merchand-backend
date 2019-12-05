<template>
    <!-- 会员列表 -->
    <div class="container">
        <div class="filter-group">
            <div class="filter flt-up">
                <ul class="left">
                    <li>
                        <span>会员账号</span>
                        <Input style="width:100px;" limit="en-num" v-model="filter.account" />
                    </li>
                    <li>
                        <span>会员ID</span>
                        <Input style="width:100px;" limit="en-num" v-model="filter.userid" />
                    </li>
                    <li>
                        <span>注册日期</span>
                        <Date style="width:100px;" v-model="filter.start_date" />
                        <span style="margin:0 5px;">至</span>
                        <Date v-model="filter.end_date" />
                    </li>
                    <li>
                        <span>在线状态</span>
                        <span>
                            <Select
                                v-model="filter.online_state"
                                :options="online_state_opt"
                                style="width:100px;"
                                @update="selectupdate"
                            ></Select>
                        </span>
                    </li>
                    <li>
                        <span>正式状态</span>
                        <span>
                            <Select
                                v-model="filter.online_state"
                                :options="online_state_opt"
                                style="width:100px;"
                                @update="selectupdate"
                            ></Select>
                        </span>
                    </li>
                </ul>
            </div>
            <div class="filter flt-down">
                <ul class="left">
                    <li>
                        <span>上级状态</span>
                        <!-- <Input class="account-status" size="small"/> -->
                        <span>
                            <Select
                                v-model="filter.online_state"
                                :options="online_state_opt"
                                style="width:100px;"
                                @update="selectupdate"
                            ></Select>
                        </span>
                    </li>
                    <li>
                        <span>登录IP</span>
                        <Input style="width:100px;" limit="number" v-model="filter.loginIP" />
                    </li>
                    <li>
                        <span class="w4e">注册IP</span>
                        <Input style="width:100px;" limit="number" v-model="filter.registIP" />
                    </li>
                    <li>
                        <span>
                            <button class="btn-blue">查询</button>
                        </span>
                        <span>
                            <button class="btn-blue">导出Excel</button>
                        </span>
                    </li>
                    <li>
                        <button class="btn-blue" @click="addAccClick">添加账号</button>
                    </li>
                </ul>
            </div>
        </div>
        <div class="tool-bar"></div>
        <!-- 在线状态, 游戏账号, 游戏ID, 会员标签, 团队人数, 上级账号, 玩家金额, 注册IP->登录iP,注册日期->登录日期 -->

        <TwoTable :headers="headers" :column="list">
            <template v-slot:tdOne="{row}">
                <!-- <td></td> -->
                <td :class="[row.a==='在线'?'green':'orange']">{{row.a}}</td>
                <td>{{row.b}}</td>
                <td>{{row.c}}</td>
                <td>
                    <i v-if="row.d==='1'" class="iconfont iconyuanquan red"></i>
                    <i v-if="row.d==='0'" class="iconfont icongou green"></i>
                </td>
                <td>{{row.e}}</td>
                <td>{{row.f}}</td>
                <td>
                    <div class="table-opra">
                        <span style="margin-right:10px;" @click="showDetail">详情</span>
                        <span @click="addBlackList">加入黑名单</span>
                    </div>
                </td>
            </template>
            <template v-slot:tdTwo="{row}">
                <td>{{row.a}}</td>
                <td>{{row.b}}</td>
                <td>{{row.c}}</td>
                <td>{{row.d}}</td>
                <td>{{row.e}}</td>
                <td>{{row.f}}</td>
                <!-- <td>{{row.f}}</td> -->
            </template>
        </TwoTable>
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
                <div class="mod-head">
                    <span>添加账号 详情</span>
                    <i class="iconfont iconcuowuguanbi-" @click="closeUserList()"></i>
                </div>
                <div class="mod-body">
                    <!-- 个人资料信息-图片 -->
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
                                <td>
                                    <span>VIP等级:</span>
                                    <span>VIP1</span>
                                </td>
                                <td style="height:42px;" v-if="EditUserTab" class="user-lab">
                                    <span class="mr5">会员标签</span>
                                    <Select v-model="user_tab" :options="user_tab_opt"></Select>
                                    <span class="a">保存</span>
                                    <span class="a" @click="EditUserTab=false">取消</span>
                                </td>
                                <td style="height:42px;" v-if="!EditUserTab" class="user-lab">
                                    <span class="mr5">会员标签</span>
                                    <span class="bg-red">
                                        <i class="iconfont iconjinggao1-"></i>
                                        <span>{{'危险会员'}}</span>
                                    </span>
                                    <span class="a" @click="EditUserTab=true">修改</span>
                                </td>
                            </tr>
                            <tr>
                                <td style="height:46px;">
                                    <span>ID:</span>
                                    <span>{{'666'}}</span>
                                </td>
                                <td>
                                    <span>账号余额: 0.00元</span>
                                    <span>0.00元</span>
                                </td>
                                <td>
                                    <span>账号类型:</span>
                                    <span>{{'正式账号'}}</span>
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
                                    <span>管理银行卡:</span>
                                    <span class="a">重置</span>
                                </li>
                                <li>
                                    <span>清空支付宝:</span>
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
                            </ul>
                        </div>
                        <div class="list">
                            <ul>
                                <li>
                                    <span>存款次数:</span>
                                    <span>{{'0.00'}}元</span>
                                </li>
                                <li>
                                    <span>总入款:</span>
                                    <span>{{'0.00'}}</span>
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
                                    <span>{{'192.168.222.222'}}</span>
                                </li>
                                <li>
                                    <span>最后登录地址:</span>
                                    <span>{{'192.168.222.222'}}</span>
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
        <div v-if="inner_mask_show" class="modal-mask">
            <div class="confirm v-modal">
                <div class="mod-head">
                    <span>添加账号</span>
                    <i class="iconfont iconcuowuguanbi-" @click="closeConfirm()"></i>
                </div>

                <div class="content">
                    <ul>
                        <li>
                            <span>会员账号:</span>
                            <Input v-model="form.account" />
                        </li>
                        <li>
                            <span>账号类型:</span>
                            <Select
                                style="width:185px;"
                                v-model="form.type"
                                :options="[{label:'测试账号',value:0},{label:'正式账号',value:1}]"
                            ></Select>
                        </li>
                        <li>
                            <span>登录密码:</span>
                            <Input v-model="form.password" type="password" />
                        </li>

                        <li>
                            <span>确认密码:</span>
                            <Input v-model="form.conf_pwd" type="password" />
                        </li>
                    </ul>
                    <div class="confirm-btn">
                        <button class="btn-blue-large">确认</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-mask" v-if="show_add_black_list">
            <div class="v-modal">
                <div class="mod-head">
                    <span>加入黑名单</span>
                    <i class="iconfont iconcuowuguanbi-" @click="show_add_black_list=false"></i>
                </div>
                <div class="blacklist-inner">
                    <div class="infor">是否确定把该玩家加入黑名单！</div>
                    <span class="textarea-remark">
                        <span class="remark">备注:</span>
                        <textarea class="textarea" cols="40" rows="10"></textarea>
                    </span>
                    <div class="btns">
                        <button class="btn-plain-large mr50" @click="show_add_black_list=false">取消</button>
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
                account: '',
                userid: '',
                start_date: '',
                end_date: '',
                online_state: '',
                loginIP: '',
                registIP: ''
            },
            headers: [
                [
                    '在线状态',
                    '会员账号',
                    '会员ID',
                    '正式账号',
                    '会员标签',
                    '团队人数',
                    '操作'
                ],
                [
                    '上级账号',
                    '会员余额',
                    '注册IP',
                    '登录IP',
                    '注册日期',
                    '登录日期'
                ]
            ],
            list: [
                {
                    a: '在线',
                    b: '132****4654',
                    c: '33542354234',
                    d: '1',
                    e: 'sd',
                    f: '192.168.0.0',
                    g: 'df',
                    h: 'df',
                    i: '192.168.0.0',
                    j: '192.168.0.0',
                    k: '2019/8/12 14：12：00',
                    l: '2019/8/12 14：12：00',
                    m: '2019/8/12 14：12：00'
                },
                { a: '离线', b: '132****4654', c: '3', d: '0' }
            ],
            online_state: '',
            online_state_opt: [
                { label: '全部', value: '' },
                { label: '在线', value: '1' },
                { label: '离线', value: '2' }
            ],
            total: 300,
            pageNo: 1,
            pageSize: 25,

            show_detail: false,
            use_detail: false,
            form: {
                account: '',
                password: '',
                type: '',
                conf_pwd: ''
            },
            user_tab: '',
            EditUserTab: false,
            user_tab_opt: [
                { label: '危险会员', value: 1 },
                { label: '普通会员', value: 2 }
            ],

            inner_mask_show: false,
            show_add_black_list: false
        }
    },
    methods: {
        selectupdate(val) {
            this.$toast.info('你好')
        },

        showDetail() {
            this.show_detail = true
        },
        addBlackList() {
            this.show_add_black_list = true
        },
        closeUserList() {
            this.show_detail = false
        },
        addAccClick() {
            this.inner_mask_show = true
        },
        closeConfirm() {
            this.inner_mask_show = false
        },
        updateNo(val) {
            this.p
        },
        updateSize(val) {}
    },
    mounted() {}
}
</script>

<style scoped>
/* .container .red .green ---在 App.vue公共区 */
/* .filter 部分样式在公共区 */
.filter-group {
    padding: 20px 10px;
    background: #f2f2f2;
    /* border-radius: 5px; */
}

.flt-down {
    margin-top: 8px;
}
.w4e {
    width: 4em;
}
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
/* .modal-mask   .v-modal  .mod-head确认窗口 已转移到公共css*/

.confirm .content {
    width: 600px;
    height: 300px;
}
.confirm .content ul li {
    margin-top: 30px;
}
.confirm .content ul li {
    display: flex;
    justify-content: center;
    align-items: center;
}
.confirm .content ul li > span:first-child {
    margin-right: 10px;
}
/* .blacklist {
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
} */
.blacklist-inner {
    width: 700px;
    height: 326px;
    padding-top: 18px;
    text-align: center;
}
.blacklist-inner .btns {
    margin-top: 30px;
    /* padding: 8px 16px; */
}
.blacklist-inner .btns .btn-plain-normal {
    margin-right: 50px;
}
.textarea-remark {
    display: flex;
    justify-content: center;
    align-items: top;
    margin-top: 10px;
}
.blacklist-inner .textarea {
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    resize: none;
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
/*  */
.confirm .iconcuowuguanbi-,
.modal-mask .iconcuowuguanbi- {
    position: absolute;
    right: 12px;
    font-size: 26px;
    color: #ffffff;
    cursor: pointer;
}
/* .confirm .iconcuowuguanbi-:hover,
.modal-mask .iconcuowuguanbi-:hover {
    cursor: pointer;
} */
.modal-mask .mod-body {
    min-width: 800px;
    padding: 20px 40px;
}

.v-modal .mod-body .row1 {
    display: flex;
}
.mod-body .user-info tr td {
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
.user-info .user-lab {
    display: flex;
    align-items: center;
}
/* .modal-mask .row1, */
.modal-mask .row2,
.modal-mask .row3,
.modal-mask .row4,
.modal-mask .row5 {
    padding: 20px 10px;
    margin-top: 10px;
    background: #f7f7f7;
    /* border-radius: 3px; */
}
.modal-mask .list ul {
    display: flex;
}
.list {
    margin-top: 10px;
}
.list ul li {
    white-space: nowrap;
    /* font-weight: 600; */
    color: rgb(83, 83, 83);
}
.list ul li:first-child {
    width: 230px;
}
.list ul li:nth-child(2) {
    width: 210px;
}
.list ul li:not(:last-child) {
    margin-right: 25px;
}
/* .list ul li > span:nth-child(2) {
    font-size: 14px;
} */

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
.remark {
    margin-right: 5px;
    position: relative;
    top: 5px;
}
.mr5 {
    margin-right: 5px;
}
.mr50 {
    margin-right: 50px;
}
</style>