<template>
    <div class="container">
        <!-- 静态活动 -->

        <div>
            <button
                v-for="(item, index) in buttons"
                :key="index"
                :class="curr_btn===item.value?'btn-blue':'btn-plain'"
                @click="selectBtn(item)"
            >{{item.label}}</button>
        </div>
        <div class="filter p10 mt10">
            <ul class="left">
                <li>
                    <span>活动标题</span>
                    <Input v-model="filter.title" />
                </li>

                <li>
                    <button class="btn-blue" @click="getList">查询</button>
                    <button class="btn-blue" @click="add">添加活动</button>
                </li>
            </ul>
        </div>
        <div class="table mt20">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row}">
                    <td>{{row.title || '--'}}</td>
                    <td>
                        <img style="max-width:200px;max-height:200px;" :src="row.picture" alt="图片加载失败"/>
                    </td>
                    <td>{{row.author || '--'}}</td>
                    <td>{{row.created_at || '--'}}</td>
                    <td>{{row.end_time || '--'}}</td>
                    <td>{{row.last_editor || '--'}}</td>
                    <td>{{row.updated_at || '--'}}</td>
                    <td>
                        <Switchbox
                            class="switch-select"
                            :value="row.status"
                            @update="switchStatus($event,row)"
                        />
                    </td>
                    <td>
                        <button class="btns-blue" @click="edit(row)">编辑</button>
                        <button class="btns-red" @click="del(row)">删除</button>
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
        <Dialog :show.sync="dia_show" :title="dia_title">
            <div class="dia-inner">
                <ul class="form">
                    <li>
                        <span>活动标题:</span>
                        <Input style="width:300px;" v-model="form.title" />
                    </li>
                    <li>
                        <span>活动图片:</span>
                        <div class="img-area">
                            <img style="max-width:290px;max-height:140px;" :src="pic_data" alt />
                        </div>
                    </li>
                    <li>
                        <Upload
                            style="width:125px;margin:0 auto"
                            title="上传图片"
                            @change="upPicChange($event)"
                            type="file"
                        />
                    </li>
                    <li>
                        <span>时间范围:</span>
                        <Date type="datetimerange" style="width:300px;" v-model="form.dates" />
                    </li>
                    <li>
                        <span>是否开启:</span>
                        <Switchbox v-model="form.status" />
                    </li>
                    <li class="conf-btn">
                        <button class="btn-blue-large" @click="diaCfm">确认</button>
                    </li>
                </ul>
            </div>
        </Dialog>
        <Modal
            :show.sync="mod_show"
            title="删除"
            content="是否删除该活动"
            @cancel="mod_show=false"
            @confirm="modConf"
        ></Modal>
    </div>
</template> <script>
export default {
    name: "Static",
    data() {
        return {
            pic_data: "",
            picFile: {},
            isLoad: false,
            buttons: [
                { label: "PC电脑", value: "1" },
                { label: "手机H5", value: "2" },
                { label: "手机APP", value: "3" }
            ],
            curr_btn: "1",

            filter: {
                title: ""
            },
            headers: [
                "活动标题",
                "活动图片",
                "添加人",
                "添加时间",
                "结束时间",
                "最后更新人",
                "最后更新时间",
                "状态",
                "操作"
            ],
            list: [],
            total: 0,
            pageNo: 1,
            pageSize: 25,

            // dialog
            dia_show: false,
            dia_title: "",
            dia_status: "",
            mod_show: false,
            curr_row: {},
            form: {
                title: "",
                dates: [],
                status: true,
                pic_path: ""
            },
            protocol: window.location.protocol,
            head_path: "",
            pic_id:""
        };
    },
    methods: {
        initForm() {
            this.form = {
                title: "",
                dates: [],
                status: false
            };
            this.pic_data = "";
        },
        diaCfm() {
            if (this.dia_status === "add") {
                this.addConfCfm();
            }
            if (this.dia_status === "edit") {
                if(this.isLoad==false){
                    this.editCfm();
                }
                if(this.isLoad==true){
                    this.editConfCfm();
                }

            }
        },
        async addConfCfm() {
            await this.upLoadPic();
            this.addCfm();
        },
        add() {
            this.initForm();
            this.dia_status = "add";
            this.dia_title = "添加活动";
            this.dia_show = true;
        },
        //展示图片
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
            this.isLoad = true;
        },
        //上传图片
        upLoadPic() {
            return new Promise(resolve => {
                let e = this.picFile;
                let pic = e.target.files[0];
                let basket = "active/static/uploads";
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
                        resolve(res.data.path);
                    }
                });
            });
        },
        addCfm() {
            // let start_time=''
            // if(this.form.dates[0]){
            //     start_time=JSON.stringify([this.form.dates[0]])
            // }
            // let end_time=''
            // if(this.form.dates[1]){
            //     end_time=JSON.stringify([this.form.dates[1]])
            // }
            let data = {
                device: this.curr_btn,
                title: this.form.title,
                pic_id: this.pic_data,
                start_time: this.form.dates[0],
                end_time: this.form.dates[1],
                status: this.form.status
            };
            // console.log('请求数据',data)
            let { url, method } = this.$api.static_active_add;
            this.$http({ method, url, data }).then(res => {
                // console.log('返回数据',res)
                if (res && res.code == "200") {
                    this.$toast.success(res && res.message);
                    this.dia_show = false;
                    this.getList();
                }
            });
        },
        switchStatus(val, row) {
            let data = {
                id: row.id,
                status: val ? 1 : 0
            };
            let { url, method } = this.$api.static_active_change_status;
            this.$http({ method, url, data }).then(res => {
                if (res && res.code == "200") {
                    this.$toast.success(res && res.message);
                    this.getList();
                }
            });
        },
        async editConfCfm(){
            await this.upLoadPic();
            this.editCfm();
        },
        edit(row) {
            this.initForm();
            this.dia_status = "edit";
            this.dia_title = "编辑";
            this.dia_show = true;
            this.form = {
                id: row.id,
                title: row.title,
                dates: [row.created_at, row.end_time],
                status: row.status
            };
            this.pic_data = row.picture;
            this.pic_id=row.pic_id;
        },
        editCfm() {
            // let start_time=''
            // if(this.form.dates[0]){
            //     start_time=JSON.stringify([this.form.dates[0]])
            // }
            // let end_time=''
            // if(this.form.dates[1]){
            //     end_time=JSON.stringify([this.form.dates[1]])
            // }
            let pic_id=""
            if(this.isLoad==false){
                pic_id=this.pic_id
            }
            if(this.isLoad==true){
                pic_id=this.pic_data
            }
            let data = {
                device: this.curr_btn,
                id: this.form.id,
                title: this.form.title,
                pic_id: pic_id,
                start_time: this.form.dates[0],
                end_time: this.form.dates[1],
                status: this.form.status
            };
            // console.log(data)
            let { url, method } = this.$api.static_active_edit;
            this.$http({ method, url, data }).then(res => {
                if (res && res.code == "200") {
                    this.$toast.success(res && res.message);
                    this.dia_show = false;
                    this.getList();
                }
            });
        },
        del(row) {
            this.curr_row = row;
            this.mod_show = true;
        },
        modConf() {
            let data = {
                id: this.curr_row.id
            };
            let { url, method } = this.$api.static_active_delte;
            this.$http({ method, url, data }).then(res => {
                // console.log('res: ', res);

                if (res && res.code == "200") {
                    this.$toast.success(res && res.message);
                    this.mod_show = false;
                    this.getList();
                }
            });
        },
        selectBtn(item) {
            this.curr_btn = item.value;
            this.getList();
        },
        updateNo(val) {
            this.getList();
        },
        updateSize(val) {
            this.pageNo = 1;
            this.getList();
        },
        getList() {
            let datas = {
                device: this.curr_btn,
                title: this.filter.title,
                page: this.pageNo,
                pageSize: this.pageSize
            };
            let data = window.all.tool.rmEmpty(datas);
            let { method, url } = this.$api.static_active_list;
            this.$http({ method, url, data }).then(res => {
                // console.log("返回数据", res);
                if (res && res.code == "200") {
                    this.total = res.data.total;
                    this.list = res.data.data;
                }
            });
        }
    },
    mounted() {
        this.head_path = this.protocol + "//pic.397017.com/";
        this.getList();
    }
};
</script>

<style scoped>
/* .p10 全局样式 */
.switch-select {
    transform: scale(0.8);
}
.td-img {
    max-width: 150px;
    max-height: 100px;
}
.form {
    width: 390px;
    margin: 0 auto;
}
.form > li {
    display: flex;
    align-items: center;
}
.form li:not(:first-child) {
    margin-top: 20px;
}
.form li > span:first-child {
    margin-right: 10px;
}
.conf-btn {
    display: flex;
    justify-content: center;
}
.dia-inner {
    width: 550px;
    height: 40-0px;
}
.img-area {
    width: 300px;
    height: 140px;
    border: 1px solid #ddd;
    text-align: center;
    border-radius: 5px;
}
</style>