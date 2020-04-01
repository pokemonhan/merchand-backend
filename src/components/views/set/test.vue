<template>
    <div class="container">
        <!-- 帮助设置 -->
        <div>
            <button
                v-for="(item, index) in plant_opt"
                :key="index"
                :class="curr_btn===item.value?'btn-blue-large':'btn-plain-large'"
                @click="plantSelect(item)"
            >{{item.label}}</button>
        </div>
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
                    <button class="btn-blue" @click="getList">查询</button>
                    <button class="btn-blue" @click="add">添加</button>
                </li>
            </ul>
        </div>
        <div class="table mt20">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row,idx}">
                    <!-- '编号','标题','图片','添加人','添加时间','是否启用','最后更新人','最后跟新时间','操作' -->
                    <td>{{(pageNo-1)*pageSize+idx+1}}</td>
                    <td>{{row.title}}</td>
                    <td>
                        <img
                            v-if="row.pic"
                            :src="head_path+row.pic"
                            style="max-width:100px;max-height:100px;"
                        />
                    </td>
                    <td>{{row.author && row.author.name}}</td>
                    <td>{{row.created_at}}</td>
                    <td>
                        <Switchbox :value="row.status" @update="switchUpd($event,row)" />
                    </td>
                    <td>{{row.newer && row.newer.name}}</td>
                    <td>{{row.updated_at}}</td>
                    <td>
                        <Upload
                            style="width:100px;margin:0 auto;"
                            title="更换图片"
                            @change="upPicChange($event, row)"
                            type="file"
                        />
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
        <Dialog :show.sync="dia_show" title="添加">
            <div class="dia-inner">
                <div class="flex-center">
                    <ul class="form">
                        <li>
                            <span>标题:</span>
                            <Input class="w200" v-model="form.title" />
                        </li>
                        <li>
                            <span>添加图片:</span>
                            <Input style="width:98px" v-model="form.pic_path" />
                            <Upload
                                style="width:100px;"
                                title="选择图片"
                                @change="AddPicChange($event)"
                                type="file"
                            />
                        </li>
                        <li>
                            <span>是否启用:</span>
                            <Switchbox v-model="form.status" />
                        </li>
                        <li class="form-btn">
                            <button class="btn-plain-large" @click="dia_show=false">取消</button>
                            <button class="btn-blue-large ml50" @click="addCfm">确认</button>
                        </li>
                    </ul>
                </div>
            </div>
        </Dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            curr_btn: 1,
            plant_opt: [
                { label: "H5帮助管理", value: 1 },
                { label: "PC帮助管理", value: 2 },
                { label: "APP帮助管理", value: 3 }
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
            protocol: window.location.protocol,
            head_path:'',
            headers: [
                "编号",
                "标题",
                "图片",
                "添加人",
                "添加时间",
                "是否启用",
                "最后更新人",
                "最后跟新时间",
                "操作"
            ],
            list: [],
            total: 0,
            pageNo: 1,
            pageSize: 25,
            // dialog
            curr_row: {},
            dia_show: false,
            dia_status: "",
            form: {
                title: "",
                pic_path: "",
                status: ""
            },
            // list: [
            //     {
            //         label: "H5帮助管理",
            //         value: 1,
            //         time: "2019-10-20",
            //         child: [
            //             {
            //                 name: "会员列表",
            //                 path: "/user/userlist",
            //                 author: "charon1",
            //                 created_at: "2020-5-10"
            //             },
            //             {
            //                 name: "登录记录",
            //                 path: "/user/loginlog",
            //                 author: "charon2",
            //                 created_at: "2020-5-11"
            //             },
            //             {
            //                 name: "标签管理 ",
            //                 path: "/user/tabmanage",
            //                 author: "charon3",
            //                 created_at: "2020-5-12"
            //             },
            //             {
            //                 name: "黑名单管理 ",
            //                 path: "/user/blacklistmanage",
            //                 author: "charon4",
            //                 created_at: "2020-5-13"
            //             },
            //             {
            //                 name: "等级设置 ",
            //                 path: "/user/levelsetting",
            //                 author: "charon5",
            //                 created_at: "2020-5-14"
            //             },
            //             {
            //                 name: "洗码设置 ",
            //                 path: "/user/washsetting",
            //                 author: "charon6",
            //                 created_at: "2020-5-15"
            //             }
            //         ]
            //     },
            //     {
            //         label: "PC帮助管理",
            //         value: 2,
            //         time: "2019-10-20",
            //         child: [
            //             {
            //                 name: "入款订单",
            //                 path: "/funds/incomeorder",
            //                 author: "charon7",
            //                 created_at: "2020-5-16"
            //             },
            //             {
            //                 name: "人工存取",
            //                 path: "/funds/manualaccess",
            //                 author: "charon8",
            //                 created_at: "2020-5-17"
            //             },
            //             {
            //                 name: "出款审核",
            //                 path: "/funds/paymentreview",
            //                 author: "charon9",
            //                 created_at: "2020-5-18"
            //             },
            //             {
            //                 name: "出款订单",
            //                 path: "/funds/paymentorder",
            //                 author: "charon10",
            //                 created_at: "2020-5-19"
            //             },
            //             {
            //                 name: "资金账变",
            //                 path: "/funds/fundchange",
            //                 author: "charon11",
            //                 created_at: "2020-5-20"
            //             }
            //         ]
            //     },
            //     {
            //         label: "APP帮助管理",
            //         value: 3,
            //         time: "2019-10-20",
            //         child: [
            //             {
            //                 name: "跑马灯消息",
            //                 path: "/announce/marquee",
            //                 author: "charon12",
            //                 created_at: "2020-5-21"
            //             },
            //             {
            //                 name: "系统公告",
            //                 path: "/announce/systemannounce",
            //                 author: "charon13",
            //                 created_at: "2020-5-22"
            //             },
            //             {
            //                 name: "登录弹窗公告 ",
            //                 path: "/announce/loginpopup",
            //                 author: "charon14",
            //                 created_at: "2020-5-23"
            //             },
            //             {
            //                 name: "轮播公告 ",
            //                 path: "/announce/carousel",
            //                 author: "charon15",
            //                 created_at: "2020-5-24"
            //             }
            //         ]
            //     }
            // ],
        };
    },
    methods: {
        initForm() {
            this.form = {
                title: "",
                pic_path: "",
                status: 0
            };
        },
        checkFilter(){
            this.filter={
                title: "",
                status: ""
            }
        },
        plantSelect(item) {
            this.curr_btn = item.value;
            this.checkFilter();
            this.getList();
        },
        add() {
            this.dia_show = true;
            this.initForm();
        },
        addCfm() {
            let data = {
                type: this.curr_btn,
                title: this.form.title,
                pic: this.form.pic_path,
                status: this.form.status
            };
            // console.log('请求数据',data)
            let { url, method } = this.$api.help_center_add;
            this.$http({ method, url, data }).then(res => {
                // console.log('返回数据',res)
                if (res && res.code == "200") {
                    this.$toast.success(res && res.message);
                    this.dia_show = false;
                    this.getList();
                }
            });
        },
        switchUpd(val, row) {
            let data = {
                id: row.id,
                status: val ? 1 : 0
            };
            let { url, method } = this.$api.help_center_set;
            this.$http({ method, url, data }).then(res => {
                if (res && res.code == "200") {
                    this.$toast.success(res && res.message);
                    this.getList();
                }
            });
        },
        AddPicChange(e) {
            let pic = e.target.files[0];
            let basket = "set/help/uploads";
            let formList = new FormData();
            formList.append("file", pic, pic.name);
            formList.append("basket", basket);
            let { url, method } = this.$api.update_picture_database;
            let data = formList;
            let headers = { "Content-Type": "multipart/form-data" };
            this.$http({ method, url, data, headers }).then(res => {
                // console.log('返回数据',res)
                if (res && res.code == "200") {
                    this.$set(this.form, "pic_path", res.data.path);
                }
            });
        },
        upPicChange(e, row) {
            let reader = new FileReader();
            let pic = e.target.files[0];
            let basket = "set/helpset/uploads";
            var icon = "";
            let form = new FormData();
            form.append("file", pic, pic.name);
            form.append("basket", basket);
            let { url, method } = this.$api.update_picture_database;
            let data = form;
            let headers = { "Content-Type": "multipart/form-data" };
            this.$http({ method, url, data, headers }).then(res => {
                if (res && res.code == "200") {
                    // returnData=res.data
                    this.updatePicture(res.data, row.id);
                }
            });
        },
        updatePicture(data, id) {
            console.log("id: ", id);
            if (!data) return;
            console.log(data);
            let para = {
                id: id,
                pic: data.path
            };
            // console.log('请求数据',para);
            let { url, method } = this.$api.help_center_set;
            this.$http({ method, url, data: para }).then(res => {
                // console.log("res", res);
                if (res && res.code == "200") {
                    this.getList();
                }
            });
        },
        updateNo(val) {
            this.getList();
        },
        updateSize(val) {
            this.pageNo=1;
            this.getList();
        },
        getList() {
            let datas = {
                type: this.curr_btn,
                title:this.filter.title,
                status:this.filter.status,
                page:this.pageNo,
                pageSize:this.pageSize
            };
            // console.log('请求数据',datas)
            let data=window.all.tool.rmEmpty(datas)
            let { method, url } = this.$api.help_center_list;
            this.$http({ method, url, data }).then(res => {
                // console.log('返回数据',res)
                if (res && res.code == "200") {
                    this.list = res.data.data;
                    this.total = res.data.total;
                }
            });
        }
    },
    mounted() {
        this.head_path=this.protocol+'//pic.397017.com/';
        this.getList();
    }
};
</script>

<style scoped>
.tab-img {
    max-width: 150px;
    max-height: 100px;
}
.flex-center {
    display: flex;
    justify-content: center;
}
.form li {
    display: flex;
    line-height: 30px;
    margin-top: 20px;
}
.form li > span:first-child {
    min-width: 5em;
    text-align: right;
    margin-right: 10px;
}
.form-btn {
    width: fit-content;
    margin: 0 auto;
}
</style>