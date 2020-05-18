<template>
    <div class="container">
        <!-----------------------  轮播公告  ----------------------->
        <div class="bg-gray equip-sel">
            <button
                v-for="(item, index) in buttons"
                :key="index"
                :class="curr_btn===item.value?'btn-blue':'btn-plain'"
                @click="selectBtn(item)"
            >{{item.label}}</button>
        </div>
        <div class="car-cont">
            <div class="left">
                <ul class="form">
                    <li>
                        <span>活动名称：</span>
                        <Input class="w250" v-model="form.name" />
                    </li>
                    <li>
                        <span>活动图片：</span>
                        <div
                            style="width:310px;height:150px;border:1px solid #ddd;text-align:center"
                        >
                            <img v-if="pic_data" style="max-width:300px;max-height:140px;" :src="pic_data" />
                        </div>
                    </li>
                    <li>
                        <Upload
                            style="width:100px;margin:0 auto"
                            title="选择图片"
                            @change="upPicChange($event)"
                            type="file"
                        />
                    </li>
                    <li>
                        <span>轮播类型：</span>
                        <Radio label="内部" :value="form.status" val="1" v-model="form.status" />
                        <Radio
                            style="margin-left:50px;"
                            label="外部活动"
                            :value="form.status"
                            val="2"
                            v-model="form.status"
                        />
                    </li>
                    <li>
                        <span>跳转地址：</span>
                        <Input class="w250" v-model="form.link" />
                    </li>
                    <li>
                        <span>时间范围：</span>
                        <Date type="datetimerange" style="width:300px;" v-model="form.dates" />
                    </li>
                    <li>
                        <span>活动开关：</span>
                        <Radio label="开" :value="form.active" val="1" v-model="form.active" />
                        <Radio
                            style="margin-left:50px;"
                            label="关"
                            :value="form.status"
                            val="0"
                            v-model="form.active"
                        />
                    </li>
                    <li v-if="is_edit" class="conf-btn">
                        <button class="btn-plain-large" @click="editCancel">取消修改</button>
                        <button class="btn-blue-large ml20" @click="editConf">确定修改</button>
                    </li>
                    <li v-else class="conf-btn">
                        <button class="btn-blue-large" @click="addCfm">确定添加</button>
                    </li>
                </ul>
            </div>
            <!-- <div class="right"> -->
            <ul class="right">
                <li v-for="(item, index) in list" :key="index">
                    <div class="pic-cont-left">
                        <ul>
                            <li class="row1">
                                <span class="pic-title">热门活动</span>
                                <div>
                                    <span style="font-size:12px;">创建时间：{{item.created_at}}</span>
                                    <br />
                                    <span style="font-size:12px;">结束时间：{{item.end_time}}</span>
                                </div>
                            </li>
                            <li class="row2">
                                <img class="pic-pic" :src="head_path+item.pic" alt="图片加载失败。" />
                            </li>
                            <li class="row3">
                                <Switchbox
                                    class="pic-stwich"
                                    :value="item.status"
                                    @update="switchStatus($event,item)"
                                />
                                <i class="iconfont iconwrite" @click="edit(item)"></i>
                                <i class="iconfont iconicon-test" @click="del(item)"></i>
                                <span>进行中</span>
                            </li>
                        </ul>
                    </div>
                    <div class="inf-right">
                        <ul>
                            <li>
                                <span>添加时间：</span>
                                <span>{{item.created_at}}</span>
                            </li>
                            <li>
                                <span>跳转URL:</span>
                                <span>{{item.link}}</span>
                            </li>
                            <li>
                                <span>添加人：</span>
                                <span>{{item.author && item.author.name}}</span>
                            </li>
                            <li>
                                <span>最后更新时间：</span>
                                <span>{{item.updated_at}}</span>
                            </li>
                            <li>
                                <span>最后更新人：</span>
                                <span>{{item.last_editor && item.last_editor.name}}</span>
                            </li>
                            <li>
                                <span>轮播类型：</span>
                                <span>{{item.type==1 ? '内部' : '外部活动' }}</span>
                            </li>
                        </ul>
                    </div>
                </li>
                <li v-if="list.length<1" class="emptyPic">
                    <img src="../../../assets/image/empty.png" />
                </li>
            </ul>
            <!-- </div> -->
        </div>
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
    name: "Carousel",
    data() {
        return {
            buttons: [
                { label: "PC网页", value: "1" },
                { label: "手机H5", value: "2" },
                { label: "手机APP", value: "3 " }
            ],
            curr_btn: "1",
            // 是否是编辑模式
            is_edit: false,
            list: [],
            form: {
                name: "",
                status: "1",
                link: "",
                dates: [],
                active: "1"
            },
            is_pc_show: true,
            protocol: window.location.protocol,
            head_path: "",
            mod_show: false,
            curr_item: {},
            pic_data: "",
            picFile: {},
            pic_id: ""
        };
    },
    methods: {
        selectBtn(item) {
            this.curr_btn = item.value;
            this.getList();
        },
        pcShow() {
            this.initForm();
            this.is_pc_show = true;
        },
        h5Show() {
            this.initForm();
            this.is_pc_show = false;
        },
        edit(item) {
            console.log("item内容:😀 ", item);
            // let start_time=''
            // if(item.start_time){
            //     start_time=JSON.stringify([item.start_time])
            // }
            // let end_time=''
            // if(item.end_time){
            //     end_time=JSON.stringify([item.end_time])
            // }
            this.initForm();
            this.is_edit = true;
            this.form = {
                id: item.id,
                name: item.title,
                status: String(item.type),
                link: item.link,
                dates: [item.start_time, item.end_time],
                active: String(item.status)
            };
            this.curr_btn = String(item.device);
            this.pic_data = this.head_path + item.pic;
            this.pic_id = item.pic_id;
        },
        editConf() {
            // let start_time=''
            // if(this.form.dates[0]){
            //     start_time=JSON.stringify([this.form.dates[0]])
            // }
            // let end_time=''
            // if(this.form.dates[1]){
            //     end_time=JSON.stringify([this.form.dates[1]])
            // }
            let data = {
                id: this.form.id,
                device: this.curr_btn,
                title: this.form.name,
                pic_id: this.pic_id,
                type: this.form.status,
                link: this.form.link,
                start_time: this.form.dates[0],
                end_time: this.form.dates[1],
                status: this.form.active
            };
            // console.log('请求数据',data)
            let { url, method } = this.$api.announce_carousel_edit;
            this.$http({ method, url, data }).then(res => {
                // console.log('返回数据',res)
                if (res && res.code == "200") {
                    this.$toast.success(res && res.message);
                    this.is_edit = false;
                    this.getList();
                    this.initForm();
                }
            });
        },
        del(item) {
            this.mod_show = true;
            this.curr_item = item;
        },
        modConf() {
            let data = {
                id: this.curr_item.id
            };
            let { url, method } = this.$api.announce_carousel_del;
            this.$http({ method, url, data }).then(res => {
                if (res && res.code == "200") {
                    this.$toast.success(res && res.message);
                    this.mod_show = false;
                    this.getList();
                }
            });
        },
        initForm() {
            this.form = {
                name: "",
                status: "1",
                link: "",
                dates: [],
                active: "1"
            };
            this.pic_data = "";
        },
        editCancel() {
            this.is_edit = false;
            this.initForm();
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
        },
        //上传图片
        upLoadPic(callback) {
            let e = this.picFile;
            let pic = e.target.files[0];
            let basket = "announce/carousel/uploads";
            let formList = new FormData();
            formList.append("file", pic, pic.name);
            formList.append("basket", basket);
            let data = formList;
            let { url, method } = this.$api.update_picture_database;
            let headers = { "Content-Type": "multipart/form-data" };
            this.$http({ method, url, data, headers }).then(res => {
                console.log("图片返回数据", res);
                if (res && res.code == "200") {
                    this.pic_data = res.data.id;
                    callback();
                }
            });
        },
        addCfm() {
            let addConfirm = () => {
                // let start_time=''
                // if(this.form.dates[0]){
                //     start_time=JSON.stringify([this.form.dates[0]])
                // }
                // let end_time=''
                // if(this.form.dates[1]){
                //     end_time=JSON.stringify([this.form.dates[1]])
                // }
                // console.log('图片文件',this.picFile)
                let data = {
                    device: this.curr_btn,
                    title: this.form.name,
                    pic_id: this.pic_data,
                    type: this.form.status,
                    link: this.form.link,
                    start_time: this.form.dates[0],
                    end_time: this.form.dates[1],
                    status: this.form.active
                };
                console.log("请求数据", data);
                let { url, method } = this.$api.announce_carousel_add;
                this.$http({ method, url, data }).then(res => {
                    console.log("返回数据", res);
                    if (res && res.code == "200") {
                        this.$toast.success(res && res.message);
                        this.getList();
                        this.initForm();
                    }
                });
            };
            //上传图片之后确认
            this.upLoadPic(addConfirm);
        },

        switchStatus(val, item) {
            let data = {
                id: item.id,
                status: val ? 1 : 0
            };
            let { url, method } = this.$api.announce_carousel_change_status;
            this.$http({ method, url, data }).then(res => {
                if (res && res.code == "200") {
                    this.$toast.success(res && res.message);
                    this.getList();
                }
            });
        },
        getList() {
            this.initForm();
            let datas = {
                device: this.curr_btn
            };
            let data = window.all.tool.rmEmpty(datas);
            let { url, method } = this.$api.announce_carousel_list;
            this.$http({ method, url, data }).then(res => {
                console.log("返回数据", res);
                if (res && res.code == "200") {
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
.equip-sel {
    padding: 10px;
}
.car-cont {
    display: flex;
    margin-top: 25px;
}
.left {
    /* margin-top: 20px; */
    border-right: 1px solid #bfbfbf;
}

.form .w250 {
    width: 300px;
}
.form {
    width: 400px;
    /* border: 1px solid #000; */
}
.form > li {
    display: flex;
    align-items: center;
}
.form > li:not(:first-child) {
    margin-top: 20px;
}
.max-w800 {
    max-width: 300px;
}
.left .form .conf-btn {
    display: flex;
    justify-content: center;
    margin-top: 50px;
}
.mt50 {
    margin-top: 50px;
}
.ml20 {
    margin-left: 20px;
}
.right {
    width: 100%;
    margin-left: 4%;
}
.right > li {
    display: flex;
    width: 685px;
    height: 260px;
    padding-left: 25px;
    /* border: 1px solid #000; */
}
.pic-cont-left {
    width: 300px;
    height: 235px;
    padding: 10px 10px 0 10px;
    border-radius: 5px;
    border: 1px solid #4c8bfd;
}
.pic-cont-left > ul .row1 {
    display: flex;
    justify-content: space-between;
    padding-bottom: 5px;
    border-bottom: 1px solid #f2f2f2;
}
.pic-cont-left .row1 .pic-title {
    /* font-size: 14px;
    font-weight: 400; */
    color: #4c8bfd;
}
.row2 {
    /* border: 1px solid #000; */
    padding: 5px 10px 0 10px;
    display: flex;
    justify-content: center;
}
.pic-pic {
    max-width: 270px;
    height: 140px;
}
.row3 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
}
.row3 .pic-stwich {
    transform: scale(0.9);
}
.row3 .iconfont {
    cursor: pointer;
}
.row3 .iconwrite {
    font-size: 22px;
    color: #4c8bfd;
}
.row3 .iconicon-test {
    font-size: 30px;
    color: #f26359;
}
.inf-right {
    max-width: 365px;
    font-size: 12px;
}
.right > li .inf-right {
    padding-left: 10px;
    /* border: 1px solid #000; */
}
.inf-right > ul > li {
    margin-top: 15px;
}
.emptyPic {
    text-align: center;
}
.emptyPic img {
    width: 350px;
    height: 100%;
}
</style>
