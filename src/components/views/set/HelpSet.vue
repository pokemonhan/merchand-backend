<template>
    <div class="container">
        <div>
            <button
                v-for="(item, index) in plant_opt"
                :key="index"
                :class="curr_btn===item.value?'btn-blue-large':'btn-plain-large'"
                @click="plantSelect(item)"
            >{{item.label}}</button>
        </div>
        <div>
            <div class="filter p10 mt20">
                <ul class="left">
                    <li>
                        <span>标题</span>
                        <Input v-model="filter.title" />
                    </li>
                    <li>
                        <span>启用状态</span>
                        <Select v-model="filter.status" :options="status_opt"></Select>
                    </li>
                    <li>
                        <button class="btn-blue" @click="getList()">查询</button>
                        <button class="btn-blue">添加帮助</button>
                    </li>
                </ul>
            </div>
        </div>
        <div>
            <ul>
                <li v-for="(lv1,lv1_index) in plant_opt" :key="lv1_index">
                    <div>
                        <table>
                            <td>
                                <img v-if="show_help_list[lv1_index]" @click="hide_list(lv1,lv1_index)" style="width:20px;" src="../../../assets/image/hide.png" alt="">
                                <img v-else @click="show_list(lv1,lv1_index)" style="width:20px;" src="../../../assets/image/show.png" alt="">
                            </td>
                            <td>{{lv1.label}}</td>
                            <td>
                                <Switchbox></Switchbox>
                            </td>
                            <td>
                                <button>编辑</button>
                                <button>删除</button>
                            </td>
                        </table>
                    </div>

                    <ul v-if="show_help_list[lv1_index] && lv1.child " >
                        <li v-for="(lv2,lv2_index) in lv1.child" :key="lv2_index">
                            <table>
                                <td>{{lv2.label}}</td>
                                <td>
                                    <img style="width:100px;" src="../../../assets/image/announce/sysAnnounce.png" alt="">
                                </td>
                                <td>
                                    <Switchbox></Switchbox>
                                </td>
                                <td>
                                    <button>编辑</button>
                                    <button>删除</button>
                                </td>
                            </table>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            curr_btn: 1,
            plant_opt: [
                { 
                    label: "H5帮助管理",
                    value: 1 ,
                    child:[
                        { name: "会员列表", path: "/user/userlist" },
                        { name: "登录记录", path: "/user/loginlog" },
                        { name: "标签管理 ", path: "/user/tabmanage" },
                        { name: "黑名单管理 ", path: "/user/blacklistmanage" },
                        { name: "等级设置 ", path: "/user/levelsetting" },
                        { name: "洗码设置 ", path: "/user/washsetting" }
                    ]
                },
                { 
                    label: "PC帮助管理", 
                    value: 2 ,
                    child:[
                        { name: "入款订单", path: "/funds/incomeorder" },
                        { name: "人工存取", path: "/funds/manualaccess" },
                        { name: "出款审核", path: "/funds/paymentreview" },
                        { name: "出款订单", path: "/funds/paymentorder" },
                        { name: "资金账变", path: "/funds/fundchange" }
                    ]
                },
                { 
                    label: "APP帮助管理", 
                    value: 3 ,
                    child:[
                        { name: "跑马灯消息", path: "/announce/marquee" },
                        { name: "系统公告", path: "/announce/systemannounce" },
                        { name: "登录弹窗公告 ", path: "/announce/loginpopup" },
                        { name: "轮播公告 ", path: "/announce/carousel" }
                    ]
                },
            ],
            help_opt: [
                { label: "充值失败？", value: 1 },
                { label: "提现失败？", value: 2 },
                { label: "游戏卡顿？", value: 3 }
            ],
            status_opt: [
                { label: "全部", value: "" },
                { label: "启用", value: "1" },
                { label: "关闭", value: "0" }
            ],
            filter: {
                title: "",
                status: ""
            },
            show_help_list:[],
        };
    },
    methods: {
        getList() {
            let datas = {
                type: this.curr_btn,
                title: this.filter.title,
                status: this.filter.status,
                page: this.pageNo,
                pageSize: this.pageSize
            };
            // console.log('请求数据',datas)
            let data = window.all.tool.rmEmpty(datas);
            let { method, url } = this.$api.help_center_list;
            this.$http({ method, url, data }).then(res => {
                console.log("返回数据", res);
                if (res && res.code == "200") {
                    let arr = res.data.data || [];
                }
            });
        },
        plantSelect(item) {
            this.curr_btn = item.value;
        },
        show_list(item,index){
            this.show_help_list[index]=true
            this.$set(this.show_help_list,index,true)
            // this.show_help_list=this.show_help_list.slice
        },
        hide_list(item,index){
            this.show_help_list[index]=false
            this.$set(this.show_help_list,index,false)
        },
    },
    mounted() {}
};
</script>

<style scoped>
.help-switch {
    transform: scale(0.9);
    width: 100px;
}
</style>