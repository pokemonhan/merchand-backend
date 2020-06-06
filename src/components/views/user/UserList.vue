<template>
    <!-- 会员列表 -->
    <div class="container">
        <div class="filter">
            <ul class="left">
                <li>
                    <span>会员账号</span>
                    <Input limit="en-num" v-model="filter.account" />
                </li>
                <li>
                    <span>会员ID</span>
                    <Input limit="en-num" v-model="filter.userid" />
                </li>
                <li>
                    <span>注册日期</span>
                    <Date type="datetimerange" v-model="filter.dates" style="width:300px" />
                </li>
                <li>
                    <span>在线状态</span>
                    <span>
                        <Select v-model="filter.online_state" :options="online_state_opt"></Select>
                    </span>
                </li>
                <li>
                    <span>上级账号</span>
                    <Input v-model="filter.parent_account" />
                </li>
                <li>
                    <span>登录IP</span>
                    <Input errmsg="格式错误" :showerr="errIpShow(filter.loginIP)" v-model="filter.loginIP" />
                </li>
                <li>
                    <span>注册IP</span>
                    <Input errmsg="格式错误" :showerr="errIpShow(filter.registIP)" v-model="filter.registIP" />
                </li>
                <li>
                    <span>正式账号</span>
                    <Select v-model="filter.is_tester" :options="is_tester_opt"></Select>
                </li>
                <li>
                    <span>
                        <button class="btn-blue" @click="getList">查询</button>
                    </span>
                    <span>
                        <button class="btn-blue" @click="exportExcel()">导出Excel</button>
                    </span>
                </li>
                <li>
                    <button class="btn-blue" @click="addAccClick">添加账号</button>
                </li>
            </ul>
        </div>
        <div class="table">
            <!-- 在线状态, 游戏账号, 游戏ID, 会员标签, 团队人数, 上级账号, 玩家金额, 注册IP->登录iP,注册日期->登录日期 -->
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row}">
                    <td :class="[row.is_online==1?'green':'red']">{{row.is_online==1?'在线':'离线'}}</td>
                    <td>{{row.mobile}}</td>
                    <td>{{row.guid}}</td>
                    <td>
                        <i :class="['iconfont',row.is_tester==0 ?'icongou green':'iconcha red']"></i>
                    </td>
                    <td>{{row.user_tag}}</td>
                    <td>{{row.total_members}}</td>
                    <td>{{row.parent_mobile}}</td>
                    <td>{{row.balance}}</td>
                    <td>{{row.register_ip}}</td>
                    <td>{{row.last_login_ip}}</td>
                    <td>{{row.created_at}}</td>
                    <td>{{row.last_login_time}}</td>
                    <td>{{row.status==0  ? '是':'否'}}</td>
                    <td>
                        <button class="btn-blue" @click="userDetail(row)">详情</button>
                        <button
                            v-if="row.status==1"
                            class="btn-blue"
                            @click="addBlackList(row)"
                        >加入黑名单</button>
                    </td>
                </template>
            </Table>
        </div>
        <div class="page">
            <Page
                :total="total"
                :pageNo.sync="pageNo"
                :pageSize.sync="pageSize"
                @updateNo="updateNo"
                @updateSize="updateSize"
            />
        </div>
        <Dialog class="g-modal-mask" :show.sync="show_detail" title="详情">
            <div class="dia-inner">
                <div class="mod-body">
                    <!-- 个人资料信息-图片 -->
                    <div class="row1 pic">
                        <div>
                            <img class="avator" :src="detail_list.avatar" alt="没有图片" />
                        </div>
                        <div class="user-info">
                            <tr>
                                <td class="head-2">{{detail_list.name}}</td>
                                <td>
                                    <span>VIP等级:</span>
                                    <span>VIP{{detail_list.level}}</span>
                                </td>
                                <td style="height:42px;" v-if="EditUserTab" class="user-lab">
                                    <span class="mr5">会员标签:</span>
                                    <Select v-model="user_tab" :options="user_tab_opt"></Select>
                                    <button class="btn-blue" @click="editUserTabCfm()">保存</button>
                                    <button class="btn-blue" @click="EditUserTab=false">取消</button>
                                </td>
                                <td style="height:42px;" v-if="!EditUserTab" class="user-lab">
                                    <span class="mr5">会员标签:</span>
                                    <span v-if="detail_list.label && detail_list.label.id==2" class="bg-red">
                                        <i class="iconfont iconjinggao1-"></i>
                                        <span>{{detail_list.label && detail_list.label.title}}</span>
                                    </span>
                                    <span v-if="detail_list.label && detail_list.label.id!=2">
                                        <span>{{detail_list.label && detail_list.label.title}}</span>
                                    </span>
                                    <button class="btn-blue" @click="EditUserTab=true">修改</button>
                                </td>
                            </tr>
                            <tr>
                                <td style="height:46px;">
                                    <span>ID:</span>
                                    <span>{{detail_list.guid}}</span>
                                </td>
                                <td>
                                    <span>账号余额:</span>
                                    <span>{{detail_list.balance}}元</span>
                                </td>
                                <td>
                                    <span>账号类型:</span>
                                    <span>{{detail_list.type==1?'正式账号':'测试账号'}}</span>
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
                                    <button class="btn-blue" @click="reLoginPwd()">重置</button>
                                </li>
                                <li>
                                    <span>取款密码:</span>
                                    <button class="btn-blue" @click="reWidthdrawPwd()">重置</button>
                                </li>
                                <li>
                                    <span>管理银行卡:</span>
                                    <button class="btn-blue" @click="viewBank()">查看</button>
                                </li>
                            </ul>
                            <ul style="margin-top:10px;">
                                <li>
                                    <span>清空支付宝:</span>
                                    <button class="btn-blue" @click="clearAli()">清空</button>
                                </li>
                                <li>
                                    <span>账号状态:</span>
                                    <span
                                        :class="[detail_list.status==1?'green':'red']"
                                    >{{detail_list.status==1?'正常':'禁用'}}</span>
                                    <button
                                        v-if="detail_list.status==0"
                                        class="btn-blue"
                                        @click="unlock()"
                                    >解锁</button>
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
                                    <span>{{detail_list.promotion_details && detail_list.promotion_details.promotion_level }}</span>
                                </li>
                                <li>
                                    <span>团队成员数:</span>
                                    <span>{{detail_list.promotion_details && detail_list.promotion_details.total_members}}人</span>
                                </li>
                                <li>
                                    <span>佣金金额:</span>
                                    <span>{{detail_list.promotion_details && detail_list.promotion_details.commission_banlace}}</span>
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
                                    <span>最大单笔存款:</span>
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
                                    <span>{{login_device_obj[detail_list.other_info && detail_list.other_info.device || ''].text}}</span>
                                </li>
                                <li>
                                    <span>最后登录IP:</span>
                                    <span>{{detail_list.other_info && detail_list.other_info.last_login_ip}}</span>
                                </li>
                                <li>
                                    <span>最后登录地址:</span>
                                    <span>{{detail_list.other_info && detail_list.other_info.last_login_address}}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="list">
                            <ul>
                                <li>
                                    <span>最后登录:</span>
                                    <span>{{detail_list.other_info && detail_list.other_info.last_login_time}}</span>
                                </li>
                                <li>
                                    <span>距今登录:</span>
                                    <span>{{detail_list.other_info && detail_list.other_info.last_seen_time}}</span>
                                </li>
                                <li>
                                    <span>注册IP:</span>
                                    <span>{{detail_list.other_info && detail_list.other_info.register_ip}}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="list">
                            <ul>
                                <li>
                                    <span>注册时间:</span>
                                    <span>{{detail_list.other_info && detail_list.other_info.created_at}}</span>
                                </li>
                                <li>
                                    <span>登录次数:</span>
                                    <span>{{detail_list.other_info && detail_list.other_info.number_of_logins}}</span>
                                </li>
                                <li>
                                    <span>推广渠道:</span>
                                    <span>{{detail_list.other_info && detail_list.other_info.register_type}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
        <Dialog :show.sync="inner_mask_show" title="添加账号">
            <div class="confirm ">
                <div class="content">
                    <ul>
                        <li>
                            <span>会员账号:</span>
                            <Input limit="en-num" v-model="form.account" />
                        </li>
                        <li>
                            <span>账号类型:</span>
                            <Select
                                style="width:191px;"
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
                        <button class="btn-blue-large" @click="addCfm">确认</button>
                    </div>
                </div>
            </div>
        </Dialog>
        <Dialog :show.sync="show_add_black_list" title="加入黑名单">
            <div class="dia-inner">
                <div class="blacklist-inner">
                    <div class="infor">是否确定把该玩家加入黑名单！</div>
                    <span class="textarea-remark">
                        <span class="remark">备注:</span>
                        <textarea v-model="blackRemark" class="textarea" cols="40" rows="10"></textarea>
                    </span>
                    <div class="btns">
                        <button class="btn-plain-large mr50" @click="show_add_black_list=false">取消</button>
                        <button class="btn-blue-large" @click="addBlackListCfm()">确认</button>
                    </div>
                </div>
            </div>
        </Dialog>
        <Dialog :show.sync="show_password" :title="reset_title">
            <div class="dia-inner">
                <ul class="form">
                    <li v-if=" this.reset_status=='reLoginPwd'">
                        <span>密码:</span>
                        <Input type="password" v-model="reset.password" placeholder="8-16位，字母加数字" />
                    </li>
                    <li v-if="this.reset_status=='reWidthdrawPwd'">
                        <span>密码:</span>
                        <Input
                            type="password"
                            v-model="reset.withdrawPassword"
                            placeholder="8-16位，字母加数字"
                        />
                    </li>
                    <li v-if=" this.reset_status=='reLoginPwd'">
                        <span>确认密码:</span>
                        <Input
                            type="password"
                            v-model="reset.conf_password"
                            placeholder="8-16位，字母加数字"
                            @update="pwdUpdate"
                        />
                        <div class="err-item">{{reset.passwordMsg}}</div>
                    </li>
                    <li v-if="this.reset_status=='reWidthdrawPwd'">
                        <span>确认密码:</span>
                        <Input
                            type="password"
                            v-model="reset.confWithdrawPassword"
                            placeholder="8-16位，字母加数字"
                            @update="withdrawPwdUpdate"
                        />
                        <div class="err-item">{{reset.withdrawPasswordMsg}}</div>
                    </li>
                    <li class="conf-btn">
                        <button class="btn-blue" @click="resetCfm()">确认</button>
                    </li>
                </ul>
            </div>
        </Dialog>
        <Dialog :show.sync="Ali_show" title="清空支付宝">
            <div class="dia-inner">
                <div class="ali-inner">
                    <div class="infor">是否确定清空支付宝？</div>
                    <div class="ali-btns">
                        <button class="btn-plain-large mr50" @click="Ali_show=false">取消</button>
                        <button class="btn-blue-large" @click="clearAliCfm()">确认</button>
                    </div>
                </div>
            </div>
        </Dialog>
        <Dialog :show.sync="unlock_show" title="账号解锁">
            <div class="dia-inner">
                <div class="ali-inner">
                    <div class="infor">是否确定解锁改账号？</div>
                    <div class="ali-btns">
                        <button class="btn-plain-large mr50" @click="unlock_show=false">取消</button>
                        <button class="btn-blue-large" @click="unlockCfm()">确认</button>
                    </div>
                </div>
            </div>
        </Dialog>
    </div>
</template>

<script>
import{mapState,mapMutations,mapGetters} from 'vuex'
import Slide from '../../../js/config/slide'
import menuList from '../../../js/menuList'
export default {
    name: "UserList",
    data() {
        return {
            menu_list:[],
            filter: {
                account: "",
                userid: "",
                dates: [],
                online_state: "",
                parent_account: "",
                is_tester: "",
                loginIP: "",
                registIP: ""
            },
            reset: {
                password: "",
                conf_password: "",
                withdrawPassword: "",
                confWithdrawPassword: "",
                passwordMsg: "",
                withdrawPasswordMsg: ""
            },
            pwdReg: /^[0-9A-Za-z]{8,16}$/,
            online_state_opt: [
                { label: "全部", value: "" },
                { label: "在线", value: "1" },
                { label: "离线", value: "0" }
            ],
            is_tester_opt: [
                { label: "全部", value: "" },
                { label: "是", value: "1" },
                { label: "否", value: "0" }
            ],
            headers: [
                "在线状态",
                "会员账号",
                "会员ID",
                "正式账号",
                "会员标签",
                "团队人数",
                "上级账号",
                "会员余额",
                "注册IP",
                "登录IP",
                "注册日期",
                "登录日期",
                "是否黑名单",
                "操作"
            ],
            list: [],
            total: 300,
            pageNo: 1,
            pageSize: 25,

            show_detail: false,
            use_detail: false,
            form: {
                account: "",
                password: "",
                type: "",
                conf_pwd: ""
            },
            user_tab: "",
            EditUserTab: false,
            user_tab_opt: [],
            inner_mask_show: false,
            show_add_black_list: false,
            blackRemark: "",
            curr_row: {},
            show_password: false,
            reset_title: "",
            reset_status: "",
            detail_list: {},
            Ali_show: false,
            unlock_show: false,
            login_device_obj: {
                "": { text: "" },
                "1": { text: "PC" },
                "2": { text: "H5" },
                "3": { text: "APP" }
            }
        };
    },
    computed:{
        ...mapState(['tab_nav_list'])
    },
    methods: {
        ...mapMutations(['updateTab_nav_list']),
        objToArr(obj, pre_idx = '') {
            // let list = []
            return Object.keys(obj).map((key, index) => {
                let item = obj[key]
                // console.log('item: ', item);

                let template = {
                    id: item.id,
                    label: item.label,
                    icon: item.icon,
                    en_name: item.en_name,
                    path: item.route,
                    display: item.display,
                    pre_idx: pre_idx + index,
                    // type: '',
                    level: item.level
                }

                if (item.child) {
                    template.children = this.objToArr(
                        item.child,
                        pre_idx + index + '-'
                    )
                }
                return template
            })
            // }
            // return list
        },
        //校验ip地址
        errIpShow(val){
            if(!val) return false
            let reg=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/

            return !reg.test(val)
        },
        //校验查询条件
        checkFilter(){
            let reg=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
            // let re=new RegExp(IpCheck)
            if(!reg.test(this.filter.loginIP) && this.filter.loginIP!='' ){
                return false
            }
            if(!reg.test(this.filter.registIP) && this.filter.registIP!=''){
                return false
            }
            return true
        },
        //获取列表
        getMenuList(){
            if(!window.all.tool.getLocal('Authorization')) return
            if(window.all.tool.getLocal('menu')){
                this.menu_list=window.all.tool.getLocal('menu')
            }
        },
        getSelectOpt() {
            let { url, method } = this.$api.tag_list;
            this.$http({ url, method }).then(res => {
                if (res && res.code == "200") {
                    if (
                        res.data &&
                        res.data.data &&
                        Array.isArray(res.data.data)
                    ) {
                        let arr = [];
                        for (var i = 0; i < res.data.data.length; i++) {
                            let item = res.data.data[i];
                            arr.push({ label: item.title, value: item.id });
                        }
                        this.user_tab_opt = arr;
                        // console.log('标签数据',this.user_tab_opt)
                    }
                }
            });
        },
        editUserTabCfm() {
            let data = {
                guid: this.detail_list.guid,
                label: this.user_tab
            };
            // console.log("修改标签请求数据", data);
            let { method, url } = this.$api.user_list_tag_edit;
            this.$http({ method, url, data }).then(res => {
                // console.log("修改标签返回数据", res);
                if (res && res.code == "200") {
                    this.$toast.success(res.message);
                    this.userDetail(this.curr_row);
                    this.EditUserTab = false;
                }
            });
        },
        clearForm() {
            this.form = {
                account: "",
                password: "",
                type: "",
                conf_pwd: ""
            };
        },
        checkForm() {
            if (this.form.account === "") {
                this.$toast.warning("会员账号不可为空");
                return false;
            }
            return true;
        },
        userDetail(row) {
            // console.log('获取详情列表传入数据row',row)
            this.show_detail = true;
            this.curr_row = row;
            let data = {
                guid: String(row.guid)
            };
            // console.log("请求数据", data);
            let { method, url } = this.$api.user_list_detail;
            this.$http({ method, url, data }).then(res => {
                // console.log("详情返回详情数据", res);
                if (res && res.code == "200") {
                    this.detail_list = res.data;
                }
            });
        },
        addBlackList(row) {
            this.show_add_black_list = true;
            this.curr_row = row;
        },
        addBlackListCfm() {
            let datas = {
                id: this.curr_row.id,
                remark: this.blackRemark
            };
            // console.log('请求数据',datas)
            let data = window.all.tool.rmEmpty(datas);
            let { method, url } = this.$api.user_list_add_blackList;
            this.$http({ method, url, data }).then(res => {
                // console.log('返回数据',res)
                if (res && res.code == "200") {
                    this.$toast.success(res.message);
                    this.show_add_black_list = false;
                    this.getList();
                }
            });
        },
        addAccClick() {
            this.inner_mask_show = true;
            this.clearForm();
        },
        addCfm() {
            this.checkForm();
            let data = {
                mobile: this.form.account,
                is_tester: this.form.type,
                password: this.form.password,
                password_confirmation: this.form.conf_pwd
            };
            // console.log('请求数据',data)
            let { method, url } = this.$api.user_list_add;
            this.$http({ method, url, data }).then(res => {
                // console.log("返回数据", res);
                if (res && res.code == "200") {
                    this.inner_mask_show = false;
                    this.$toast.success(res && res.message);
                    this.getList();
                }
            });
        },
        closeConfirm() {
            this.inner_mask_show = false;
        },
        getList() {
            // console.log(this.checkFilter())
            if(!this.checkFilter()) return
            let createdAt = "";
            if (this.filter.dates[0] && this.filter.dates[1]) {
                createdAt = JSON.stringify([
                    this.filter.dates[0],
                    this.filter.dates[1]
                ]);
            }
            let datas = {
                mobile: this.filter.account,
                guid: this.filter.userid,
                created_at: createdAt,
                is_online: this.filter.online_state,
                parent_mobile: this.filter.parent_account,
                last_login_ip: this.filter.loginIP,
                register_ip: this.filter.registIP,
                is_tester: this.filter.is_tester,
                page: this.pageNo,
                pageSize: this.pageSize
            };
            // console.log("请求数据", datas);
            let data = window.all.tool.rmEmpty(datas);
            let { method, url } = this.$api.user_list;
            this.$http({ method, url, data }).then(res => {
                // console.log("返回数据", res);
                if (res && res.code === "200") {
                    this.list = res.data.data;
                    this.total = res.data.total;
                }
            });
        },
        exportExcel() {
            // console.log('列表',this.menu_list)
            let firstList={}
            let childList={}
            let fatherList={}
            for(var i=0;i<this.menu_list.length;i++){
                firstList=this.menu_list[i].children
                let fatherTemplate=this.menu_list[i]
                for(var j=0;j<firstList.length;j++){
                    if(firstList[j].path=='/user/userlist'){
                        fatherList=fatherTemplate
                        childList=firstList[j]
                    }
                }
            }
            // console.log('最小',childList)
            // console.log('父亲',fatherList)
            import("../../../js/config/Export2Excel").then(excel => {
                const tHeaders = this.headers;
                const data = this.list.map(item => {
                    return [
                        item.is_online==0?'离线':'在线',
                        item.mobile,
                        item.guid,
                        item.is_tester==0?'否':'是',
                        item.user_tag,
                        item.total_members,
                        item.parent_mobile,
                        item.balance,
                        item.regist_ip,
                        item.last_login_ip,
                        item.created_at,
                        item.last_login_time
                    ];
                });
                excel.export_json_to_excel({
                    header: tHeaders,
                    data,
                    filename: fatherList.label+'-'+"会员列表",
                    autoWidth: true,
                    bookType: "xlsx"
                });
            });
        },
        clearReset() {
            this.reset = {
                password: "",
                conf_password: ""
            };
        },
        resetCfm() {
            if (this.reset_status == "reLoginPwd") {
                this.reLoginPwdCfm();
            }
            if (this.reset_status == "reWidthdrawPwd") {
                this.reWidthdrawPwdCfm();
            }
        },
        checkReset() {
            if (!this.reset.password) {
                this.$set(this.reset, "passwordMsg", "密码不能为空");
                return !this.reset.passwordMsg;
            }
            if (this.reset.password != this.reset.conf_password) {
                this.$set(this.reset, "passwordMsg", "两次输入密码不一致");
                return !this.reset.passwordMsg;
            } else {
                this.reset.passwordMsg = this.pwdReg.test(this.reset.password)
                    ? ""
                    : "请输入8-16个字母及数字组合";
            }
            return true;
        },
        reLoginPwd() {
            this.reset_status = "reLoginPwd";
            this.show_password = true;
            this.reset_title = "重置登录密码";
            this.clearReset();
        },
        pwdUpdate() {
            this.checkReset();
        },
        reLoginPwdCfm() {
            let data = {
                guid: this.detail_list.guid,
                password: this.reset.password,
                password_confirmation: this.reset.conf_password
            };
            // console.log('重置登录密码请求数据',data)
            if (this.checkReset()) {
                let { method, url } = this.$api.user_list_reset_login_password;
                this.$http({ method, url, data }).then(res => {
                    // console.log('重置登录密码返回数据',res)
                    if (res && res.code == "200") {
                        this.$toast.success(res.message);
                        this.show_password = false;
                    }
                });
            }
        },
        checkWithdrawReset() {
            if (!this.reset.withdrawPassword) {
                this.$set(this.reset, "withdrawPasswordMsg", "密码不能为空");
                return !this.reset.withdrawPasswordMsg;
            }
            if (
                this.reset.withdrawPassword != this.reset.confWithdrawPassword
            ) {
                this.$set(
                    this.reset,
                    "withdrawPasswordMsg",
                    "两次输入密码不一致"
                );
                return !this.reset.withdrawPasswordMsg;
            } else {
                this.reset.withdrawPasswordMsg = this.pwdReg.test(
                    this.reset.withdrawPassword
                )
                    ? ""
                    : "请输入8-16个字母及数字组合";
            }
            return true;
        },
        reWidthdrawPwd() {
            this.reset_status = "reWidthdrawPwd";
            this.show_password = true;
            this.reset_title = "重置取款密码";
            this.clearReset();
        },
        withdrawPwdUpdate() {
            this.checkWithdrawReset();
        },
        reWidthdrawPwdCfm() {
            let data = {
                guid: this.detail_list.guid,
                withdrawals_password: this.reset.withdrawPassword,
                withdrawals_password_confirmation: this.reset
                    .confWithdrawPassword
            };
            if (this.checkWithdrawReset()) {
                let {
                    method,
                    url
                } = this.$api.user_list_reset_without_password;
                this.$http({ method, url, data }).then(res => {
                    if (res && res.code == "200") {
                        this.$toast.success(res.message);
                        this.show_password = false;
                    }
                });
            }
        },
        //查看银行 跳转至银行卡反差中心
        viewBank() {
            this.show_detail = false;
            // console.log('菜单',this.menu_list)
            let bank=[]
            for(var i=0;i<this.menu_list.length;i++){
                let item =this.menu_list[i].children
                if(item){
                    for(var j=0;j<item.length;j++){
                        bank.push(item[j])
                    }
                }
            }
            // console.log('bank',bank)
            let bankItem={}
            for(var k=0;k<bank.length;k++){
                if(bank[k].path=='/set/bankcenter'){
                    bankItem=bank[k]
                }
            }
            // console.log('bankItem',bankItem)
            let list=this.tab_nav_list
            // console.log('表',list)
            let isHadTab=list.find(tab=>tab.path===bankItem.path)
            if(!isHadTab){
                list.push({
                    label:bankItem.label,
                    name:bankItem.name,
                    path:bankItem.path
                })
                this.updateTab_nav_list(list)
            }
            this.$router.push(bankItem.path)
        },
        clearAli() {
            this.Ali_show = true;
        },
        clearAliCfm() {
            let data = {
                guid: String(this.detail_list.guid)
            };
            // console.log('请求数据',data)
            let { method, url } = this.$api.user_list_clear_alipay;
            this.$http({ method, url, data }).then(res => {
                // console.log('返回数据',res)
                if (res && res.code == "200") {
                    this.Ali_show = false;
                    this.$toast.success(res.message);
                }
            });
        },
        unlock() {
            this.unlock_show = true;
        },
        unlockCfm() {
            let data = {
                guid: String(this.detail_list.guid)
            };
            let { method, url } = this.$api.user_list_unlock;
            this.$http({ method, url, data }).then(res => {
                if (res && res.code == "200") {
                    this.unlock_show = false;
                    this.userDetail(this.curr_row);
                    this.$toast.success(res.message);
                }
            });
        },
        updateNo(val) {
            this.getList();
        },
        updateSize(val) {
            this.pageNo = 1;
            this.getList();
        }
    },
    watch:{
        $route:function(to,from){
            if(from.path==='/user/userlist'){
                this.getMenuList()
            }
        }
    },
    mounted() {
        this.getMenuList()
        this.getList();
        this.getSelectOpt();
    }
};
</script>

<style scoped>
/* .container .red .green ---在 App.vue公共区 */
/* .filter 部分样式在公共区 */
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
    width: 2000px;
}

/* .g-modal-mask   .g-v-modal  .mod-head确认窗口 已转移到公共css*/

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
    margin-top: 5px;
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
.g-modal-mask .iconcuowuguanbi- {
    position: absolute;
    right: 12px;
    font-size: 26px;
    color: #ffffff;
    cursor: pointer;
}
/* .confirm .iconcuowuguanbi-:hover,
.g-modal-mask .iconcuowuguanbi-:hover {
    cursor: pointer;
} */
.g-modal-mask .mod-body {
    min-width: 800px;
}

.mod-body .row1 {
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
/* .g-modal-mask .row1, */
.g-modal-mask .row2,
.g-modal-mask .row3,
.g-modal-mask .row4,
.g-modal-mask .row5 {
    padding: 20px 10px;
    margin-top: 10px;
    background: #f7f7f7;
    /* border-radius: 3px; */
}
.g-modal-mask .list ul {
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
.form li {
    display: flex;
    align-items: center;
    position: relative;
}
.form li:not(:first-child) {
    margin-top: 20px;
}
.form li > span:first-child {
    margin-right: 10px;
    width: 70px;
    justify-content: center;
    text-align: right;
}

.conf-btn {
    display: flex;
    justify-content: center;
}
.err-item {
    position: absolute;
    top: 30px;
    left: 7em;
    /* height: 13px; */
    font-size: 12px;
    color: red;
}
.ali-inner {
    text-align: center;
    font-size: 14px;
    margin-top: 8%;
}
.ali-btns {
    margin-top: 8%;
}
/* .table .v-table {
    min-height: 0;
} */
</style>
