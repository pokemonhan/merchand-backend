<template>
    <div class="container">
        <!-- 图片推广配置 -->
        <div>
            <button
                :class="curr_btn===item.value?'btn-blue':'btn-plain'"
                v-for="(item, index) in btns_opt"
                :key="index"
                @click="plantSelect(item)"
            >{{item.label}}</button>
        </div>
        <div class="filter p10 mt10">
            <ul class="left">
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
                    <td>{{(pageNo-1)*pageSize+idx+1}}</td>
                    <td>
                        <img
                            class="table-img"
                            :src="head_path+row.pic"
                            style="max-width:100px;min-height:100px"
                        />
                    </td>
                    <td>{{row.author}}</td>
                    <td>{{row.created_at}}</td>
                    <td>
                        <Switchbox v-model="row.status" :value="row.status" @update="switchStatus($event,row)" />
                    </td>

                    <td>{{row.last_editor}}</td>
                    <td>{{row.updated_at}}</td>
                    <td>
                        <button class="btn-blue" @click="edit(row)">编辑</button>
                        <button class="btn-red" @click="del(row)" >删除</button>
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
                <div>
                    <ul class="form">
                        <li>
                            <span v-if="dia_status=='edit'" >更换图片:</span>
                            <span v-if="dia_status=='add'">选择图片:</span>
                            <Input class="ml20" v-model="form.pic" />
                            <Upload
                                title="选择图片"
                                accept="image/png, image/jpg, image/gif"
                                v-model="form.pic"
                                @change="upPicChange($event)"
                            />
                        </li>
                        <li class="mt20">
                            <span>是否启用:</span>
                            <Switchbox class="ml20" v-model="form.status" />
                        </li>
                    </ul>
                    <div class="conf-btns">
                        <button class="btn-plain-large" @click="dia_show=false">取消</button>
                        <button class="btn-blue-large ml20" @click="diaCfm" >确认</button>
                    </div>
                </div>
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
</template>
<script>
export default {
    data() {
        return {
            btns_opt: [
                { label: 'PC推广管理', value: '1' },
                { label: 'H5推广管理', value: '2' },
                { label: 'APP推广管理', value: '3' }
            ],
            curr_btn: '1',
            filter: {
                status: ''
            },
            status_opt: [
                { label: '全部', value: '' },
                { label: '启用', value: '1' },
                { label: '禁用', value: '0' }
            ],
            headers: [
                '编号',
                '图片',
                '添加人',
                '添加时间',
                '是否启用',
                '最后更新人',
                '最后跟新时间',
                '操作'
            ],
            list: [],
            total: 0,
            pageNo: 1,
            pageSize: 25,

            table_pic: '',
            // dialog
            dia_show: false,
            form: {
                pic: '',
                status: true
            },
            dia_title:'',
            dia_status:'',
            head_path:'',
            protocol: window.location.protocol,
            curr_row:{},
            mod_show:false,
        }
    },
    methods: {
        switchStatus(val,row){
            let datas={
                id:row.id,
                pic:row.pic,
                status:val ? 1 : 0
            }
            let data=window.all.tool.rmEmpty(datas)
            let{method,url}=this.$api.promotion_configuration_edit
            this.$http({method,url,data}).then(res=>{
                if(res && res.code=='200'){
                    this.$toast.success(res.message)
                    this.getList()
                }
            })
        },
        clearForm(){
            this.form={
                pic: '',
                status: true
            }
        },
        diaCfm(){
            if(this.dia_status=='add'){
                this.addCfm()
            }
            if(this.dia_status=='edit'){
                this.editCfm()
            }
        },
        add(){
            this.dia_show=true
            this.clearForm()
            this.dia_status='add'
            this.dia_title='添加'
        },
        addCfm(){
            let data={
                device:this.curr_btn,
                pic:this.form.pic,
                status:this.form.status,
            }
            console.log('请求数据',data)
            let {method,url}=this.$api.promotion_configuration_add
            this.$http({method,url,data}).then(res=>{
                console.log('添加返回数据',res)
                if(res && res.code=='200'){
                    this.dia_show=false
                    this.$toast.success(res.message)
                    this.getList()
                }
            })
        },
        plantSelect(item) {
            this.curr_btn = item.value
            this.getList()
        },
        edit(row) {
            this.dia_show = true
            this.clearForm()
            this.dia_status='edit'
            this.dia_title='编辑'
            this.form={
                id:row.id,
                pic:row.pic,
                status:row.status,
            }
        },
        editCfm(){
            let data={
                id:this.form.id,
                pic:this.form.pic,
                status:this.form.status ? 1 : 0
            }
            console.log('请求数据',data)
            let {method,url}=this.$api.promotion_configuration_edit
            this.$http({method,url,data}).then(res=>{
                if(res && res.code=='200'){
                    this.dia_show=false;
                    this.$toast.success(res.message)
                    this.getList();
                }
            })
        },
        del(row){
            this.mod_show=true
            this.curr_row=row
        },
        modConf(){
            let data={
                id:this.curr_row.id
            }
            // console.log('删除请求数据',data)
            let {method,url}=this.$api.promotion_configuration_del;
            this.$http({method,url,data}).then(res=>{
                if(res && res.code=='200'){
                    this.mod_show=false
                    this.$toast.success(res.message)
                    this.getList()
                }
            })
        },
        upPicChange(e) {
            let pic = e.target.files[0];
            let basket = "set/picconfig/uploads";
            let formList = new FormData();
            formList.append("file", pic, pic.name);
            formList.append("basket", basket);
            let { url, method } = this.$api.update_picture_database;
            let data = formList;
            let headers = { "Content-Type": "multipart/form-data" };
            this.$http({ method, url, data, headers }).then(res => {
                // console.log(res)
                if (res && res.code == "200") {
                    this.form.pic = res.data.path;
                }
            });
        },
        updateNo(val) {},
        updateSize(val) {},
        getList(){
            let datas={
                device:this.curr_btn,
                status:this.filter.status,
                pageNo:this.pageNo,
                pageSize:this.pageSize,
            }
            let data=window.all.tool.rmEmpty(datas);
            let {method,url}=this.$api.promotion_configuration_list
            this.$http({method,url,data}).then(res=>{
                console.log('res',res)
                if(res && res.code=='200'){
                    this.list=res.data.data
                    this.total=res.data.total
                }
            })
        },
    },
    mounted() {
        this.head_path=this.protocol+'//pic.397017.com/'
        this.getList();
    }
}
</script>

<style scoped>
.table-img {
    max-width: 150px;
    max-height: 110px;
}
.form li {
    display: flex;
    align-items: center;
}
.dia-img {
    max-width: 150px;
    max-height: 130px;
}
.conf-btns {
    margin-top: 20px;
    text-align: center;
}
</style>