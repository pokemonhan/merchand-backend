<template>
    <div class="container">
        <!-- 动态活动 -->

        <div class="filter p10 mt10">
            <ul class="left">
                <li>
                    <span>活动名称</span>
                    <Input v-model="filter.name" />
                </li>

                <li>
                    <button class="btn-blue" @click="getList" >查询</button>
                </li>
            </ul>
        </div>
        <div class="table mt20">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row}">
                    <td>{{row.activity && row.activity.name}}</td>
                    <td>
                        <img style="max-width:200px;max-height:200px;"  :src="protocol+'//pic.jianghu.local/'+row.pc_pic" alt />
                    </td>
                    <td>
                        <img style="max-width:200px;max-height:200px;"  :src="protocol+'//pic.jianghu.local/'+row.h5_pic" alt />
                    </td>
                    <td>
                        <img style="max-width:200px;max-height:200px;"  :src="protocol+'//pic.jianghu.local/'+row.app_pic" alt />
                    </td>

                    <td>{{row.last_editor && rowm.last_editor.name}}</td>
                    <td>{{row.updated_at}}</td>
                    <td>{{row.end_time}}</td>
                    <td>
                        <Switchbox class="switch-select" :value="row.status" @update="switchStatus($event,row)" />
                    </td>
                    <td>
                        <button class="btns-blue" @click="upPic(row)">上传图片</button>
                        <button class="btns-red" @click="edit(row)">编辑</button>
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
                <div v-if="dia_status==='upPic'">
                    <div>
                        <ul class="form">
                            <li>
                                <span>PC标题图片:</span>
                                <Input style="width:123px;" v-model="form.pc_pic_path" />
                                <Upload
                                    style="width:125px;"
                                    title="上传图片"
                                    @change="upPcPicChange($event)"
                                    type="file"
                                />
                            </li>
                            <li>
                                <span>H5标题图片:</span>
                                <Input style="width:123px;" v-model="form.h5_pic_path" />
                                <Upload
                                    style="width:125px;"
                                    title="上传图片"
                                    @change="upH5PicChange($event)"
                                    type="file"
                                />
                            </li>
                            <li>
                                <span>APP标题图片:</span>
                                <Input style="width:123px;" v-model="form.app_pic_path" />
                                <Upload
                                    style="width:125px;"
                                    title="上传图片"
                                    @change="upAppPicChange($event)"
                                    type="file"
                                />
                            </li>
                            <li>
                                <button class="btn-plain mr50" @click="dia_show=false">取消</button>
                                <button class="btn-blue" @click="uploadCfm()">确认</button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="dia-edit" v-if="dia_status==='edit'">
                    <Detail />
                </div>
            </div>
        </Dialog>
    </div>
</template>

<script>
import Detail from "./dynamicDetail/DynamicDetail.vue";
export default {
    components: {
        Detail: Detail
    },
    data() {
        return {
            filter: {
                name: ""
            },
            headers: [
                "活动名称",
                "PC标题图片",
                "H5标题图片",
                "APP标题图片",
                "最后更新人",
                "最后更新时间",
                "结束时间",
                "状态",
                "操作"
            ],
            list: [],
            total: 0,
            pageNo: 1,
            pageSize: 25,

            // dialog
            curr_row: {},
            dia_show: false, //TODO
            dia_status: "", //TODO
            dia_title: "", //TODO
            form: {
                pc_pic_path: "",
                h5_pic_path: "",
                app_pic_path: ""
            },
            protocol: window.location.protocol,
        };
    },
    methods: {
        switchStatus(val,row){
            let data={
                id:row.id,
                status:val ? 1 : 0
            }
            let {url,method}=this.$api.dynamic_active_change_status;
            this.$http({method,url,data}).then(res=>{
                if(res && res.code=='200'){
                    this.$toast.success(res && res.message);
                    this.getList();
                }
            })
        },
        edit() {
            this.dia_status = "edit";
            this.dia_title = "编辑";
            this.dia_show = true;
        },
        upPic(row) {
            this.dia_status = "upPic";
            this.dia_title = "上传图片";
            this.dia_show = true;
            this.curr_row = row;
        },
        upPcPicChange(e) {
            let pic = e.target.files[0];
            let basket = "active/dynamic/uploads/pc";
            let formList = new FormData();
            formList.append("file", pic, pic.name);
            formList.append("basket", basket);
            let { url, method } = this.$api.update_picture_database;
            let data = formList;
            let headers = { "Content-Type": "multipart/form-data" };
            this.$http({ method, url, data, headers }).then(res => {
                // console.log(res)
                if (res && res.code == "200") {
                    this.form.pc_pic_path = res.data.path;
                }
            });
        },
        upH5PicChange(e) {
            let pic = e.target.files[0];
            let basket = "active/dynamic/uploads/h5";
            let formList = new FormData();
            formList.append("file", pic, pic.name);
            formList.append("basket", basket);
            let { url, method } = this.$api.update_picture_database;
            let data = formList;
            let headers = { "Content-Type": "multipart/form-data" };
            this.$http({ method, url, data, headers }).then(res => {
                // console.log(res)
                if (res && res.code == "200") {
                    this.form.h5_pic_path = res.data.path;
                }
            });
        },
        upAppPicChange(e) {
            let pic = e.target.files[0];
            let basket = "active/dynamic/uploads/app";
            let formList = new FormData();
            formList.append("file", pic, pic.name);
            formList.append("basket", basket);
            let { url, method } = this.$api.update_picture_database;
            let data = formList;
            let headers = { "Content-Type": "multipart/form-data" };
            this.$http({ method, url, data, headers }).then(res => {
                // console.log(res)
                if (res && res.code == "200") {
                    this.form.app_pic_path = res.data.path;
                }
            });
        },
        uploadCfm() {
            let data = {
                id: this.curr_row.id,
                pc_pic: this.form.pc_pic_path,
                h5_pic: this.form.h5_pic_path,
                app_pic: this.form.app_pic_path
            };
            let {url,method}=this.$api.dynamic_active_upload_pic;
            this.$http({method,url,data}).then(res=>{
                if(res && res.code=='200'){
                    this.$toast.success(res && res.message);
                    this.dia_show=false;
                    this.getList();
                }
            })
        },
        updateNo(val) {
            this.getList();
        },
        updateSize(val) {
            this.pageNo=1;
            this.getList();
        },
        getList(){
            let para={
                name:this.filter.name,
                page:this.pageNo,
                pageSize:this.pageSize
            }
            let params=window.all.tool.rmEmpty(para);
            let {method,url}=this.$api.dynamic_active_list;
            this.$http({method,url,params}).then(res=>{
                // console.log(res)
                if(res && res.code=='200'){
                    this.list=res.data.data;
                    this.total=res.data.length;
                }
            })
        },
    },
    mounted() {
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
.form li {
    display: flex;
    align-items: center;
    justify-content: center;
}
.form li:not(:first-child) {
    margin-top: 20px;
}
.form li > span:first-child {
    width: 7em;
    margin-right: 10px;
    text-align: right;
}
.form .upload-pic {
    width: 250px;
}
.conf-btn {
    display: flex;
    justify-content: center;
}
.dia-edit {
    width: 1000px;
    max-height: 80vh;
    overflow: auto;
}
</style>