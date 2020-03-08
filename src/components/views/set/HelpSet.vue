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
                    <button class="btn-blue">查询</button>
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
                        <img :src="protocol+'//pic.jianghu.local/'+row.pic" alt="图片加载失败..." />
                    </td>
                    <td>{{row.author&&row.author.name}}</td>
                    <td>{{row.created_at}}</td>
                    <td>
                        <Switchbox :value="row.status" @update="switchUpd($event,row)" />
                    </td>
                    <td>{{row.newer&&row.newer.name}}</td>
                    <td>{{row.updated_at}}</td>
                    <td>
                        <button class="btn-blue" @click="editPicClick(row)">更换图片</button>
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
                            <Upload style="width:100px;" title="选择图片"   @change="AddPicChange($event)" type="file" />
                        </li>
                        <li>
                            <span>是否启用:</span>
                            <Switchbox v-model="form.status" />
                        </li>
                        <li class="form-btn">
                            <button class="btn-plain-large" @click="dia_show=false">取消</button>
                            <button class="btn-blue-large ml50" @click="addCfm" >确认</button>
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
                { label: 'H5帮助管理', value: 1 },
                { label: 'PC帮助管理', value: 2 },
                { label: 'APP帮助管理', value: 3 }
            ],
            status_opt: [
                { label: '全部', value: '' },
                { label: '启用', value: '1' },
                { label: '关闭', value: '0' }
            ],
            filter: {
                title: '',
                status: ''
            },
            protocol: window.location.protocol,
            headers: [
                '编号',
                '标题',
                '图片',
                '添加人',
                '添加时间',
                '是否启用',
                '最后更新人',
                '最后跟新时间',
                '操作'
            ],
            list: [
                {
                    a1: '64646466',
                    a2: 'sdfsdfdsf',
                    a3: '充支好礼',
                    a4: '1',
                    a5: '2019-02-02 21:30',
                    status: false
                },
                {
                    a1: '64646466',
                    a2: 'sdfsdfdsf',
                    a3: '充支好礼',
                    a4: '1',
                    a5: '2019-02-02 21:30',
                    status: false
                }
            ],
            total: 0,
            pageNo: 1,
            pageSize: 25,
            // dialog
            curr_row: {},
            dia_show: false,
            dia_status: '',
            form: {
                title:'',
                pic_path:'',
                status:''
            }
        }
    },
    methods: {
        initForm(){
            this.form={
               title:'',
               pic_path:'',
               status:0, 
            }
        },
        plantSelect(item) {
            this.curr_btn = item.value
        },
        addClick() {
            this.dia_show = true;
            this.initForm();
        },
        addCfm(){
            let data={
               type:this.curr_btn,
               title:this.form.title,
               pic:this.form.pic_path,
               status:this.form.status, 
            }
            console.log('请求数据',data)
            let {url,method}=this.$api.help_center_add;
            this.$http({method,url,data}).then(res=>{
                // console.log('返回数据',res)
                if(res && res.code=='200'){
                    this.$toast.success(res && res.message)
                    this.dia_show=false;
                    this.getList();
                }
            })
        },
        setPicChange() {},
        AddPicChange(e) {
            if (!e.target.files.length) return

            let files = e.target.files[0]
            let data = new FormData()
            data.append('file', files, files.name)
            data.append('basket', 'set/helpset/uploads')

            let { url, method } = this.$api.update_picture_database
            let headers = { 'Content-Type': 'multipart/form-data' }
            this.$http({ method, url, data, headers }).then(res => {
                console.log('列表👌👌👌👌: ', res)
                if (res && res.code === '200') {
                    this.$set(this.form, 'pic', res.data.path)
                    console.log(this.form)
                    this.$toast.success(res && res.message)
                }
            })
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
                // console.log(res)
                if (res && res.code == "200") {
                    this.form.pic_path = res.data.path;
                }
            });
        },
        updateNo(val) {},
        updateSize(val) {},
        getList(){

        },
    },
    mounted() {
        this.getList()
    }
}
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