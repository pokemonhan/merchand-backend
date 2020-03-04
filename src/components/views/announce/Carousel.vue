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
            <div class="left"  >
                <ul class="form"  >
                    <li>
                        <span>活动名称：</span>
                        <Input class="w250" v-model="form.name" />
                    </li>
                    <li>
                        <span>活动图片：</span>
                        <Input style="width:100px;" v-model="form.pic_path" />
                        <Upload
                            style="width:100px;"
                            title="选择图片"
                            @change="upPicChange($event)"
                            type="file"
                        />
                        <button
                            style="width:60px;margin-left:4px;"
                            class="btn-blue"
                            @click="dia_show=true"
                        >预览</button>
                    </li>
                    <li>
                        <span>轮播类型：</span>
                        <Radio label="内部" :value="form.status" val="in" v-model="form.status" />
                        <Radio
                            style="margin-left:50px;"
                            label="外部活动"
                            :value="form.status"
                            val="out"
                            v-model="form.status"
                        />
                    </li>
                    <li>
                        <span>跳转地址：</span>
                        <Input class="w250" v-model="form.link" />
                    </li>
                    <li>
                        <span>开始时间：</span>
                        <Date class="w250" v-model="form.dates[0]" />
                    </li>
                    <li>
                        <span>结束时间：</span>
                        <Date class="w250" v-model="form.dates[1]" />
                    </li>
                    <li>
                        <span>活动开关：</span>
                        <Radio label="开" :value="form.status" val="on" v-model="form.active" />
                        <Radio
                            style="margin-left:50px;"
                            label="关"
                            :value="form.status"
                            val="off"
                            v-model="form.active"
                        />
                    </li>
                    <li v-if="is_edit" class="conf-btn">
                        <button class="btn-plain-large" @click="editCancel">取消修改</button>
                        <button class="btn-blue-large ml20" @click="editConf">确定修改</button>
                    </li>
                    <li v-else class="conf-btn">
                        <button class="btn-blue-large">确定添加</button>
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
                                <span style="font-size:12px;">结束时间：{{'2019/11/14 14:30'}}</span>
                            </li>
                            <li class="row2">
                                <img
                                    class="pic-pic"
                                    src="../../../assets/image/announce/sysAnnounce.png"
                                    alt="图片加载中。。。"
                                />
                            </li>
                            <li class="row3">
                                <Switchbox class="pic-stwich" v-model="item.a1" />
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
                                <span>{{'2019/11/14 14:30'}}</span>
                            </li>
                            <li>
                                <span>跳转URL:</span>
                                <span>{{'www.baidu.com'}}</span>
                            </li>
                            <li>
                                <span>添加人：</span>
                                <span>{{'admin'}}</span>
                            </li>
                            <li>
                                <span>最后更新时间：</span>
                                <span>{{'2019/11/14 14：30'}}</span>
                            </li>
                            <li>
                                <span>最后更新人：</span>
                                <span>{{'admin'}}</span>
                            </li>
                            <li>
                                <span>轮播类型：</span>
                                <span>{{'外部活动'}}</span>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
            <!-- </div> -->
        </div>
        <Dialog :show.sync="dia_show" title="预览图片">
            <div class="dia-inner">
                <img
                class="max-w800"
                :src="protocol+'//pic.jianghu.local/'+form.pic_path"
                alt
            />
            </div>
        </Dialog>
    </div>
</template>


<script>
export default {
    data() {
        return {
            buttons: [
                { label: "PC网页", value: "1" },
                { label: "手机H5", value: "2" },
            ],
            curr_btn:"1",
            // 是否是编辑模式
            is_edit: false,
            list: [
                { a1: true, a2: '1', a3: '4561234', a4: '13256689796', a5: '1', a6: '微信充值', a7: '100', a8: '99.9', a9: '已支付', a10: '2019/09/20 12:25:20', a11: '2019/09/20 12:25:20', a12: '2019/09/20 12:25:20' },
                { a1: true, a2: '2', a3: '4561234', a4: '13256689796', a5: '1', a6: '微信充值', a7: '100', a8: '99.9', a9: '已支付', a10: '2019/09/20 12:25:20', a11: '2019/09/20 12:25:20', a12: '2019/09/20 12:25:20' },
                { a1: true, a2: 'h1L', a3: '4561234', a4: '13256689796', a5: '1', a6: '微信充值', a7: '100', a8: '99.9', a9: '已支付', a10: '2019/09/20 12:25:20', a11: '2019/09/20 12:25:20', a12: '2019/09/20 12:25:20' },
                { a1: true, a2: 'ht1L', a3: '4561234', a4: '13256689796', a5: '1', a6: '微信充值', a7: '100', a8: '99.9', a9: '已支付', a10: '2019/09/20 12:25:20', a11: '2019/09/20 12:25:20', a12: '2019/09/20 12:25:20' },
            ],
            form: {
                name: '',
                pic_src: '',
                status: 'in',
                link: '',
                dates: [],
                active: 'on'
            },
            pic_src: [],
            dia_show: false,
            is_pc_show: true,
            protocol: window.location.protocol,
        }
    },
    methods: {
        selectBtn(item){
            this.curr_btn = item.value;
            this.getList();
        },
        pcShow() {
            this.initForm()
            this.is_pc_show = true
        },
        h5Show() {
            this.initForm()
            this.is_pc_show = false
        },
        edit(item){
            console.log('item内容:😀 ', item);
            this.initForm()
            this.is_edit = true
            this.form.name =item.a2;
        },
        del(item){

        },
        initForm(){
            this.form={
                name: '',
                pic_src: '',
                status: 'in',
                link: '',
                dates: [],
                active: 'on'
            }
        },
        editCancel(){
            this.is_edit= false
            this.initForm()
        },
        editConf() {

        },
        upPicChange(e) {
            let pic = e.target.files[0];
            let basket = "announce/carousel/uploads";
            let formList = new FormData();
            formList.append("file", pic, pic.name);
            formList.append("basket", basket);
            let { url, method } = this.$api.update_picture_database;
            let data = formList;
            let headers = { "Content-Type": "multipart/form-data" };
            this.$http({ method, url, data, headers }).then(res => {
                // console.log(res)
                if (res && res.code == "200") {
                    this.$set(this.form,'pic_path',res.data.path)
                }
            });
        },
        getList(){

        },
    },
    mounted() {

    }
}
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
    width: 264px;
}
.form {
    width: 370px;
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
    max-width: 800px;
}
.left .form .conf-btn {
    display: flex;
    justify-content: center;
    margin-top: 50px;
}
.mt50 {
    margin-top: 50px;
}
.ml20{
    margin-left: 20px;
}
.right{
    margin-left: 100px;
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
    height: 220px;
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
    max-width: 240px;
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
}
.right > li .inf-right {
    padding-left: 10px;
    /* border: 1px solid #000; */
}
.inf-right > ul > li {
    margin-top: 15px;
}
</style>
