<template>
    <div class="container">
        <!-------------------- 系统公告 ----------------->
        <div class="filter p10">
            <ul class="left">
                <li>
                    <button class="btn-blue" @click="add">添加公告</button>
                </li>
                <li>
                    <span>公告标题</span>
                    <Input style="width:150px;" v-model="filter.header" />
                </li>
                <li>
                    <button class="btn-blue" @click="getList">查询</button>
                </li>
            </ul>
            <div class="right">
                <i class="iconfont iconjinggao1-"></i>
                <div class="pic">
                    <span class="head-2">前端页面: 消息-系统消息</span>
                    <img
                        class="image"
                        width="600"
                        src="../../../assets/image/announce/sysAnnounce.png"
                        alt="loading"
                    />
                </div>
            </div>
        </div>
        <div class="table">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row}">
                    <td>{{row.title}}</td>
                    <td>
                        <img width="40" :src="head_path+row.h5_pic" alt />
                        <img width="40" :src="head_path+row.app_pic" alt />
                        <img width="40" :src="head_path+row.pc_pic" alt />
                    </td>
                    <td>{{getDevice(row.device)}}</td>
                    <td>{{row.created_at}}</td>
                    <td>{{row.end_time}}</td>
                    <td>
                        <Switchbox :value="row.status" @update="switchStatus($event,row)" />
                    </td>
                    <td>{{row.author && row.author.name}}</td>
                    <td>{{row.last_editor && row.last_editor.name}}</td>
                    <td>{{row.updated_at}}</td>
                    <td>
                        <button class="btns-blue" @click="edit(row)">编辑</button>
                        <button class="btns-red" @click="del(row)">删除</button>
                    </td>
                </template>
            </Table>
        </div>
        <Page
            class="table-page"
            :total="total"
            :pageNo.sync="pageNo"
            :pageSize.sync="pageSize"
            @updateNo="updateNo"
            @updateSize="updateSize"
        />
        <Dialog :show.sync="dia_show" :title="dia_title">
            <div class="dia-inner">
                <div>
                    <ul class="form">
                        <li>
                            <span>公告标题</span>
                            <Input
                                class="w250"
                                placeholder="最多5个字"
                                v-model="form.title"
                                maxlength="5"
                            />
                        </li>

                        <li>
                            <span>公告内容</span>
                            <div class="upload-btn">
                                <div>
                                    <Input style="width:124px;" v-model="form.app_pic_path" />
                                    <Upload
                                        style="width:110px"
                                        title="App图片上传"
                                        @change="upAppPicChange($event)"
                                        type="file"
                                    />
                                    <button
                                        style="width:60px;margin-left:4px"
                                        class="btn-blue"
                                        @click="appPreview"
                                    >预览</button>
                                </div>

                                <div>
                                    <Input style="width:124px;" v-model="form.pc_pic_path" />
                                    <Upload
                                        style="width:110px"
                                        title="PC图片上传"
                                        @change="upPcPicChange($event)"
                                        type="file"
                                    />
                                    <button
                                        style="width:60px;margin-left:4px"
                                        class="btn-blue"
                                        @click="pcPreview"
                                    >预览</button>
                                </div>

                                <div>
                                    <Input style="width:124px;" v-model="form.h5_pic_path" />
                                    <Upload
                                        style="width:110px"
                                        title="H5图片上传"
                                        @change="upH5PicChange($event)"
                                        type="file"
                                    />
                                    <button
                                        style="width:60px;margin-left:4px"
                                        class="btn-blue"
                                        @click="h5Preview"
                                    >预览</button>
                                </div>
                            </div>
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
        <Dialog :show.sync="pic_dia_show" title="预览图片">
            <img
                class="max-w800"
                :src="head_path+form.app_pic_path"
                alt
                v-if="showApp"
            />
            <img
                class="max-w800"
                :src="head_path+form.pc_pic_path"
                alt
                v-if="showPc"
            />
            <img
                class="max-w800"
                :src="head_path+form.h5_pic_path"
                alt
                v-if="showH5"
            />
        </Dialog>
        <Modal
            :show.sync="mod_show"
            title="删除"
            content="是否删除该公告"
            @cancel="mod_show=false"
            @confirm="modConf"
        ></Modal>
    </div>
</template>


<script>
export default {
    name: 'SystemAnnounce',
    data() {
        return {
            filter: {
                header: ""
            },
            headers: [
                "公告标题",
                "图片",
                "设备",
                "发布时间",
                "结束时间",
                "状态",
                "发布人",
                "最后更新人",
                "最后跟新时间",
                "操作"
            ],
            list: [],
            total: 0,
            pageNo: 1,
            pageSize: 25,
            dia_show: false, //TODO
            dia_title: "",
            form: {
                title: "",
                pc_pic_path: "",
                h5_pic_path: "",
                app_pic_path: "",
                dates: [],
                status: ""
            },
            src: [],
            pic_dia_show: false,
            curr_pic_idx: -1,
            // model
            mod_show: false,
            head_path:'',
            showApp: "",
            showPc: "",
            showH5: "",
            dia_status: "",
            device_name: {
                1: "PC",
                2: "H5",
                3: "APP"
            },
            curr_row: {},
            protocol: window.location.protocol
        };
    },
    methods: {
        getDevice(device) {
            let device_all = "";
            // console.log("传值", device);
            for (let i = 0; i < device.length; i++) {
                let item = device[i];
                let name = this.device_name[item];
                device_all = device_all + name + ",";
            }
            return device_all.slice(0, -1);
        },
        updateNo(val) {
            this.getList();
        },
        updateSize(val) {
            this.pageNo = 1;
            this.getList();
        },
        upAppPicChange(e) {
            let pic = e.target.files[0];
            let basket = "announce/systemannounce/uploads/app";
            let formList = new FormData();
            formList.append("file", pic, pic.name);
            formList.append("basket", basket);
            let { url, method } = this.$api.update_picture_database;
            let data = formList;
            let headers = { "Content-Type": "multipart/form-data" };
            this.$http({ method, url, data, headers }).then(res => {
                // console.log(res)
                if (res && res.code == "200") {
                    this.$set(this.form, "app_pic_path", res.data.path);
                }
            });
        },
        upPcPicChange(e) {
            let pic = e.target.files[0];
            let basket = "announce/systemannounce/uploads/pc";
            let formList = new FormData();
            formList.append("file", pic, pic.name);
            formList.append("basket", basket);
            let { url, method } = this.$api.update_picture_database;
            let data = formList;
            let headers = { "Content-Type": "multipart/form-data" };
            this.$http({ method, url, data, headers }).then(res => {
                console.log('检查',res)
                if (res && res.code == "200") {
                    this.$set(this.form, "pc_pic_path", res.data.path);
                }
            });
        },
        upH5PicChange(e) {
            let pic = e.target.files[0];
            let basket = "announce/systemannounce/uploads/h5";
            let formList = new FormData();
            formList.append("file", pic, pic.name);
            formList.append("basket", basket);
            let { url, method } = this.$api.update_picture_database;
            let data = formList;
            let headers = { "Content-Type": "multipart/form-data" };
            this.$http({ method, url, data, headers }).then(res => {
                // console.log(res)
                if (res && res.code == "200") {
                    this.$set(this.form, "h5_pic_path", res.data.path);
                }
            });
        },
        appPreview() {
            this.pic_dia_show = true;
            this.showApp = true;
            this.showPc = false;
            this.showH5 = false;
        },
        pcPreview() {
            this.pic_dia_show = true;
            this.showPc = true;
            this.showH5 = false;
            this.showApp = false;
        },
        h5Preview() {
            this.pic_dia_show = true;
            this.showH5 = true;
            this.showApp = false;
            this.showPc = false;
        },
        initForm() {
            this.form = {
                title: "",
                content: "",
                dates: [],
                status: ""
            };
        },
        add() {
            this.dia_title = "添加公告";
            this.dia_status = "add";
            this.dia_show = true;
            this.initForm();
        },

        edit(row) {
            this.dia_title = "编辑";
            this.dia_status = "edit";
            this.dia_show = true;
            // this.initForm()
            this.form = {
                id: row.id,
                title: row.title,
                app_pic_path: row.app_pic,
                pc_pic_path: row.pc_pic,
                h5_pic_path: row.h5_pic,
                dates: [row.start_time,row.end_time],
                status: String(row.status)
            };
        },
        editCfm() {
            let data = {
                id: this.form.id,
                title: this.form.title,
                h5_pic: this.form.h5_pic_path,
                pc_pic: this.form.pc_pic_path,
                app_pic: this.form.app_pic_path,
                start_time: this.form.dates[0],
                end_time: this.form.dates[1],
                status: this.form.status
            };
            let { url, method } = this.$api.announce_systemannounce_edit;
            this.$http({ method, url, data }).then(res => {
                // console.log('返回数据',res )
                if (res && res.code == "200") {
                    this.$toast.success(res && res.message);
                    this.dia_show = false;
                    this.getList();
                }
            });
        },
        diaCfm() {
            if (this.dia_status === "add") {
                this.addCfm();
            }
            if (this.dia_status === "edit") {
                this.editCfm();
            }
        },
        addCfm() {
            let data = {
                title: this.form.title,
                h5_pic: this.form.h5_pic_path,
                pc_pic: this.form.pc_pic_path,
                app_pic: this.form.app_pic_path,
                start_time: this.form.dates[0],
                end_time: this.form.dates[1],
                status: this.form.status
            };
            // console.log('请求数据',data)
            let { url, method } = this.$api.announce_systemannounce_add;
            this.$http({ method, url, data }).then(res => {
                // console.log('返回数据',res)
                if (res && res.code == "200") {
                    this.$toast.success(res && res.message);
                    this.dia_show = false;
                    this.getList();
                }
            });
        },
        getList() {
            let datas = {
                title: this.filter.header,
                page: this.pageNo,
                pageSize: this.pageSize
            };
            let data = window.all.tool.rmEmpty(datas);
            let { url, method } = this.$api.announce_systemannounce_list;
            this.$http({ url, method, data }).then(res => {
                // console.log('返回数据',res)
                if (res && res.code == "200") {
                    this.list = res.data.data;
                    this.total = res.data.total;
                }
            });
        },
        switchStatus(val, row) {
            let data = {
                id: row.id,
                status: val ? 1 : 0
            };
            let {
                url,
                method
            } = this.$api.announce_systemannounce_change_status;
            this.$http({ method, url, data }).then(res => {
                if (res && res.code == "200") {
                    this.$toast.success(res && res.message);
                    this.getList();
                }
            });
        },
        del(row) {
            this.mod_show = true;
            this.curr_row = row;
        },
        modConf() {
            let data = {
                id: this.curr_row.id
            };
            let { url, method } = this.$api.announce_systemannounce_del;
            this.$http({ method, url, data }).then(res => {
                if (res && res.code == "200") {
                    this.$toast.success(res && res.message);
                    this.mod_show = false;
                    this.getList();

                    
                }
            });
        }
    },
    mounted() {
        this.head_path=this.protocol+'//pic.397017.com/'
        this.getList();
    }
};
</script>

<style scoped>
/* .modal-mask ---在 App.vue公共区 */
/* .filter ---在 App.vue公共区 */
.p10 {
    padding: 10px;
}
.iconjinggao1- {
    color: #4c8bfd;
    font-size: 24px;
}
.iconjinggao1-:hover {
    color: #6d9efa;
}
.filter .right {
    position: relative;
}
.filter .iconjinggao1-:hover + .pic {
    display: block;
    /* max-height: 400px; */
    /* transition: all .3s; */
}
.filter .right .pic {
    display: none;
    /* max-height: 0; */
    position: absolute;
    top: 40px;
    right: 10px;
    z-index: 3;
    /* border: 1px solid #000; */
    background: #4c8bfd;
    overflow: hidden;
    box-shadow: 0 0 10px 3px rgb(112, 119, 124);
}
.pic .head-2 {
    display: inline-block;
    height: 40px;
    width: 100%;
    line-height: 40px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    background: #4c8bfd;
    /* padding: 10px; */
    /* background: #fff; */
}
.pic .image {
    position: relative;
    bottom: -4px;
}
table {
    border-collapse: collapse;
    width: 100%;
}
.table {
    margin-top: 8px;
    width: 100%;
    overflow-x: auto;
}
.table .v-table {
    min-height: 0;
    width: 2000px;
}
/* .modal-mask ---在 App.vue公共区 */
/* .dia-inner {
    width: 660px;
    min-height: 450px;
    display: flex;
    justify-content: center;
} */
.form > li {
    display: flex;
    align-items: baseline;
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
.form .upload-btn > div {
    display: flex;
    margin-top: 10px;
}
.w250 {
    width: 300px;
}
.radio-right {
    margin-left: 100px;
}
.form-buttons {
    display: flex;
    justify-content: center;
    /* width: 250px; */

    margin-top: 20px;
}
.ml50 {
    margin-left: 50px;
}
.max-w800 {
    max-width: 300px;
}
</style>