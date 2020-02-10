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
                    <button class="btn-blue">查询</button>
                </li>
            </ul>
        </div>
        <div class="table mt20">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row,idx}">
                    <td>{{(pageNo-1)*pageSize+idx+1}}</td>
                    <td>
                        <img
                            class="td-img"
                            src="../../../assets/image/announce/sysAnnounce.png"
                            alt
                        />
                    </td>
                    <td>
                        <img
                            class="td-img"
                            src="../../../assets/image/announce/sysAnnounce.png"
                            alt
                        />
                    </td>
                    <td>
                        <img
                            class="td-img"
                            src="../../../assets/image/announce/sysAnnounce.png"
                            alt
                        />
                    </td>

                    <td>{{row.a1}}</td>
                    <td>{{row.a1}}</td>
                    <td>{{row.a1}}</td>
                    <td>
                        <Switchbox class="switch-select" v-model="row.a1" />
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
                                <Upload
                                    style="width:170px;"
                                    title="选择上传图片"
                                    v-model="form.pic"
                                    @change="upPicChange"
                                />
                            </li>
                            <li>
                                <span>H5标题图片:</span>
                                <Upload
                                    style="width:170px;"
                                    title="选择上传图片"
                                    v-model="form.pic"
                                    @change="upPicChange"
                                />
                            </li>
                            <li>
                                <span>APP标题图片:</span>
                                <!-- <button class="btn-blue">选择上次图片</button> -->
                                <Upload
                                    style="width:170px;"
                                    title="选择上传图片"
                                    v-model="form.pic"
                                    @change="upPicChange"
                                />
                            </li>
                            <li>
                                <button class="btn-plain mr50" @click="dia_show=false">取消</button>
                                <button class="btn-blue">确认</button>
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
import Detail from './dynamicDetail/DynamicDetail.vue';
export default {
    components: {
        Detail: Detail
    },
    data() {
        return {
            filter: {
                name: ''
            },
            headers: [
                '活动名称',
                'PC标题图片',
                'H5标题图片',
                'APP标题图片',
                '最后跟新人',
                '最后跟新时间',
                '结束时间',
                '状态',
                '操作'
            ],
            list: [
                {
                    a1: true,
                    a2: 'sdfsdfdsf',
                    a3: '充支好礼',
                    a4: '1',
                    a5: '2019-02-02 21:30'
                },
                {
                    a1: false,
                    a2: 'sdfsdfdsf',
                    a3: '充支好礼',
                    a4: '1',
                    a5: '2019-02-02 21:30'
                }
            ],
            total: 0,
            pageNo: 1,
            pageSize: 25,

            // dialog
            curr_row: {},
            dia_show: false,
            dia_status: '',
            dia_title: '',
            form: {
                title: '',
                pic: '',
                dates: [],
                status: true
            }
        }
    },
    methods: {
        initForm() {
            this.form = {
                title: '',
                pic: '',
                dates: [],
                status: false
            }
        },

        edit() {
            this.dia_status = 'edit'
            this.dia_title = '编辑'
            this.dia_show = true
        },
        upPic(row) {
            this.dia_status = 'upPic'
            this.dia_title = '上传图片'
            this.dia_show = true
        },
        upPicChange (e) {
            let file = e.targe.files[0]
            // console.log('e: ', e);

        },
        selectBtn(item) {
            this.curr_btn = item.value
        },

        updateNo(val) {},
        updateSize(val) {}
    },
    mounted() {}
}
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