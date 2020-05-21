<template>
    <div class="container">
        <div class="hd-btn">
            <button
                v-for="(item, index) in buttons"
                :key="index"
                :class="['head-btns',head_act_btn===item.value?'btn-blue':'btn-plain']"
                @click="selectBtn(item)"
            >{{item.label}}</button>
        </div>
        <div class="filter search">
            <ul class="left">
                <li>
                    <button class="btn-blue" @click="add">添加登录弹窗公告</button>
                </li>
                <li>
                    <span>登录弹窗公告标题</span>
                    <Input style="width:150px;" v-model="filter.title" />
                </li>
                <li>
                    <button class="btn-blue" @click="getList">查询</button>
                </li>
            </ul>
        </div>
        <div class="table" style="margin-top:20px;">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row}">
                    <td>{{row.title}}</td>
                    <td>
                        <img style="max-width:100px;max-height:80px;" :src="head_path+row.pic" alt />
                    </td>
                    <td>{{row.start_time}}</td>
                    <td>{{row.end_time}}</td>
                    <td>
                        <Switchbox :value="row.status" @update="switchStatus($event,row)" />
                    </td>
                    <td>{{row.author && row.author.name}}</td>
                    <td>{{row.last_editor && row.last_editor.name}}</td>
                    <td>{{row.updated_at}}</td>
                    <td>
                        <button class="btn-blue" @click="edit(row)">编辑</button>
                        <button class="btn-red" @click="del(row)">删除</button>
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
        <!-- 添加公告 , 编辑公告 -->
        <Dialog :show.sync="dia_show" :title="dia_title">
            <div class="dia-inner">
                <div>
                    <ul class="form">
                        <li>
                            <span>公告名称</span>
                            <Input
                                class="w250"
                                placeholder="最多5个字"
                                v-model="form.name"
                                maxlength="5"
                            />
                        </li>

                        <li>
                            <span>选择图片</span>
                            <div class="upload-pic">
                                <img style="max-width:290px;max-height:140px;" :src="pic_data" alt />
                            </div>
                        </li>
                        <li>
                            <Upload
                                style="width:110px;margin:0 auto;"
                                title="图片上传"
                                @change="upPicChange($event)"
                                type="file"
                            />
                        </li>
                        <li>
                            <span>跳转链接</span>
                            <Input class="w250" v-model="form.link" />
                        </li>
                        <li>
                            <span>时间范围</span>
                            <Date type="datetimerange" style="width:300px;" v-model="form.dates" />
                        </li>
                        <li>
                            <span>状态选择</span>
                            <Radio
                                class="radio-left"
                                label="开"
                                :value="form.status"
                                val="1"
                                v-model="form.status"
                            />
                            <Radio
                                class="radio-right"
                                label="关"
                                :value="form.status"
                                val="0"
                                v-model="form.status"
                            />
                        </li>
                    </ul>
                    <div class="form-buttons">
                        <button class="btn-plain-large" @click="dia_show=false">取消</button>
                        <button class="btn-blue-large ml50" @click="diaCfm">保存</button>
                    </div>
                </div>
            </div>
        </Dialog>
        <Modal :show.sync="show_del_modal" title="删除公告" content="是否删除该公告" @confirm="delConfirm"></Modal>
    </div>
</template>


<script>
export default {
    // props: {},
    name: "LoginPopup",
    data() {
        return {
            pic_data: "",
            picFile: {},
            pic_id: "",
            buttons: [
                { label: "PC网页", value: "1" },
                { label: "H5手机", value: "2" },
                { label: "手机APP", value: "3" }
            ],
            head_act_btn: "1",
            filter: {
                title: ""
            },
            headers: [
                "登录弹窗公告标题",
                "图片",
                "发布时间",
                "结束时间",
                "状态",
                "发布人",
                "最后跟新人",
                "最后跟新时间",
                "操作"
            ],
            list: [],
            form: {
                name: "",
                pic_path: "",
                link: "",
                dates: [],
                status: ""
            },
            total: 0,
            pageNo: 1,
            pageSize: 25,
            dia_show: false,
            dia_title: "",
            dia_status: "",
            show_del_modal: false, // 删除公告
            protocol: window.location.protocol,
            head_path: "",
            curr_row: {}
        };
    },
    methods: {
        switchStatus(val, row) {
            let data = {
                id: row.id,
                status: val ? 1 : 0
            };
            let { url, method } = this.$api.announce_loginpopup_change_status;
            this.$http({ method, url, data }).then(res => {
                if (res && res.code == "200") {
                    this.$toast.success(res && res.message);
                    this.getList();
                }
            });
        },
        initForm() {
            this.form = {
                name: "",
                link: "",
                dates: [],
                status: ""
            };
            this.pic_data = "";
        },

        diaCfm() {
            if (this.dia_status === "add") {
                this.addCfm();
            }
            if (this.dia_status === "edit") {
                this.editCfm();
            }
        },
        add() {
            this.dia_status = "add";
            this.dia_title = "添加公告";
            this.dia_show = true;
            this.initForm();
        },
        addCfm() {
            let addConfirm = () => {
                let data = {
                    device: this.head_act_btn,
                    title: this.form.name,
                    pic_id: this.pic_data,
                    link: this.form.link,
                    start_time: this.form.dates[0],
                    end_time: this.form.dates[1],
                    status: this.form.status
                };
                // console.log("请求数据", data);
                let { url, method } = this.$api.announce_loginpopup_add;
                this.$http({ method, url, data }).then(res => {
                    // console.log('返回数据',res)
                    if (res && res.code == "200") {
                        this.$toast.success(res && res.message);
                        this.dia_show = false;
                        this.getList();
                        this.initForm();
                    }
                });
            };
            this.upLoadPic(addConfirm);
        },
        edit(row) {
            this.initForm();
            this.dia_status = "edit";
            this.dia_title = "编辑";
            this.dia_show = true;
            this.form = {
                id: row.id,
                name: row.title,
                link: row.link,
                dates: [row.start_time, row.end_time],
                status: String(row.status)
            };
            this.pic_data = row.pic;
            this.pic_id = row.pic_id;
        },
        editCfm() {
            let editConf = () => {
                let data = {
                    id: this.form.id,
                    device: this.head_act_btn,
                    title: this.form.name,
                    pic_id: this.pic_id,
                    link: this.form.link,
                    start_time: this.form.dates[0],
                    end_time: this.form.dates[1],
                    status: this.form.status
                };
                let { url, method } = this.$api.announce_loginpopup_edit;
                this.$http({ method, url, data }).then(res => {
                    // console.log('返回数据',res)
                    if (res && res.code == "200") {
                        this.$toast.success(res && res.message);
                        this.dia_show = false;
                        this.getList();
                        this.initForm();
                    }
                });
            };
            this.upLoadPic(editConf);
        },
        del(row) {
            this.curr_row = row;
            this.show_del_modal = true;
        },
        delConfirm() {
            let data = {
                id: this.curr_row.id
            };
            let { url, method } = this.$api.announce_loginpopup_del;
            this.$http({ method, url, data }).then(res => {
                console.log("返回数据", res);
                this.$toast.success(res && res.message);
                this.show_del_modal = false;
                this.getList();
            });
        },
        upPicChange(e) {
            let file = e.target.files[0];
            let self = this;
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onerror = function() {
                return;
            };
            reader.onload = function(file) {
                self.pic_data = file.target.result;
            };
            this.picFile = e;
            // console.log('图片数据',this.pic_data)
        },
        upLoadPic(callback) {
            let e = this.picFile;
            let pic = e.target.files[0];
            let basket = "announce/loginpopup/uploads";
            let formList = new FormData();
            formList.append("file", pic, pic.name);
            formList.append("basket", basket);
            let { url, method } = this.$api.update_picture_database;
            let data = formList;
            let headers = { "Content-Type": "multipart/form-data" };
            this.$http({ method, url, data, headers }).then(res => {
                // console.log(res)
                if (res && res.code == "200") {
                    this.pic_data = res.data.id;
                    this.pic_id = res.data.id;
                    callback();
                }
            });
        },
        getList() {
            let datas = {
                device: this.head_act_btn,
                title: this.filter.title,
                page: this.pageNo,
                pageSize: this.pageSize
            };
            // console.log('请求数据',para)
            let data = window.all.tool.rmEmpty(datas);
            let { url, method } = this.$api.announce_loginpopup_list;
            this.$http({ url, method, data }).then(res => {
                // console.log('返回数据',res)
                if (res && res.code == "200") {
                    this.list = res.data.data;
                    this.total = res.data.total;
                }
            });
        },
        selectBtn(item) {
            this.head_act_btn = item.value;
            this.getList();
        },
        updateNo(val) {
            this.getList();
        },
        updateSize(val) {
            this.pageNo = 1;
            this.getList();
        }
    },
    mounted() {
        this.head_path = this.protocol + "//pic.397017.com/";
        this.getList();
    }
};
</script>

<style scoped>
/* .filter 为全局样式 App.vue中  */
.container .search {
    margin-top: 10px;
    padding: 10px;
}
.head-btns:not(:first-child) {
    margin-left: 5px;
}
.w250 {
    width: 500px;
}
.dia-inner {
    width: 700px;
}
.dia-inner > div {
    width: 340px;
    margin: 0 auto;
    /* border: 1px solid #000; */
}
.form > li {
    display: flex;
    align-items: center;
    margin-top: 20px;
}
.form > li:nth-child(2) {
    margin-top: 10px;
}
/* .form > li:nth-child(3) {
    margin-top: 0;
} */
.form > li > span:first-child {
    min-width: 5em;
    /* font-weight: bolder; */
    /* margin-right: 8px; */
}
.upload-pic {
    display: inline-block;
    width: 300px;
    height: 140px;
    text-align: center;
    border: 1px solid #ddd;
}
.radio-right {
    margin-left: 100px;
}
.form-buttons {
    margin-top: 40px;
    text-align: center;
}
.ml50 {
    margin-left: 50px;
}
.max-w800 {
    max-width: 300px;
}
</style>
