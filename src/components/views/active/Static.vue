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
                    <Input class="w100" v-model="filter.title" />
                </li>
               
                <li>
                    <button class="btn-blue">查询</button>
                    <button class="btn-blue" @click="add">添加活动</button>
                </li>
            </ul>
        </div>
        <div class="table mt20">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row,idx}">
                    <td>{{(pageNo-1)*pageSize+idx+1}}</td>
                    <td>
                        <img class="td-img" src="../../../assets/image/announce/sysAnnounce.png" alt="">
                    </td>
                    <td>{{row.a1}}</td>
                    <td>{{row.a1}}</td>
                    <td>{{row.a1}}</td>
                    <td>{{row.a1}}</td>
                    <td>{{row.a1}}</td>
                    <td>
                        <Switchbox class="switch-select" v-model="row.a1" />
                    </td>
                    <td>
                        <button class="btns-blue" @click="edit(row)">编辑</button>
                        <button class="btns-red">删除</button>
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
        <Dialog :show.sync="dia_show" title="标题标题">
            <div class="dia-inner">
                <ul class="form">
                    <li>
                        <span>活动标题:</span>
                        <Input class="w250" v-model="form.title" />
                    </li>
                    <li>
                        <span>活动图片:</span>
                        <!-- <Input class="w250" v-model="form.pic" /> -->
                        <button class="btn upload-pic">选择图片</button>
                    </li>
                    <li>
                        <span>开始时间:</span>
                        <Date style="width:250px;" v-model="form.dates[0]" />
                    </li>
                    <li>
                        <span>结束时间:</span>
                        <Date style="width:250px;" v-model="form.dates[0]" />
                    </li>
                    <li>
                        <span>是否开启:</span>
                        <Switchbox v-model="form.status" />
                    </li>
                    <li class="conf-btn">
                        <button class="btn-blue-large">确认</button>
                    </li>
                </ul>
            </div>
        </Dialog>
    </div>
</template> <script>
export default {
    data() {
        return {
            buttons: [
                { label: 'PC电脑', value: '1' },
                { label: '手机H5', value: '2' },
                { label: '手机APP', value: '3' }
            ],
            curr_btn: '1',
           
            filter: {
                title: '',
                status: ''
            },
            headers: ['活动标题','活动图片','添加人','添加时间','结束时间','最后跟新人','最后跟新时间','状态','操作'],
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
            dia_show: false,
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
        add() {
            this.initForm()
            this.dia_status = 'add'
            this.dia_title = '添加活动'
            this.dia_show = true
        },
        edit() {
            this.dia_status = 'edit'
            this.dia_title = '编辑'
            this.dia_show = true
        },

        selectBtn(item) {
            this.curr_btn = item.value
        },

        updateNo(val) {},
        updateSize(val) {}
    },
    mounted() {
        
    }
}
</script> <style scoped>
.w100 {
    width: 100px;
}
/* .p10 全局样式 */
.switch-select {
    transform: scale(0.8);
}
.td-img {
    max-width: 150px;
    max-height: 100px;
}
.form li{
    display: flex;
    align-items: center;
}
.form li:not(:first-child) {
    margin-top: 20px;
}
.form li > span:first-child {
    margin-right: 10px;
}
.form .upload-pic {
    width: 250px;
}
.conf-btn {
    display: flex;
    justify-content: center;
}
</style>