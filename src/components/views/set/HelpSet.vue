<template>
    <div class="container">
        <!-- 帮助设置 -->
        <div>
            <button
                v-for="(item, index) in plant_opt"
                :key="index"
                :class="item.value===curr_plant?'btn-blue-large':'btn-plain-large'"
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
                    <button class="btn-blue" @click="addClick">添加</button>
                </li>
            </ul>
        </div>
        <div class="table mt20">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row,idx}">
                    <!-- '编号','标题','图片','添加人','添加时间','是否启用','最后更新人','最后跟新时间','操作' -->
                    <td>{{(pageNo-1)*pageSize+idx+1}}</td>
                    <td ></td>
                    <td>{{row.a1}}</td>
                    <td>
                        <img class="tab-img" src="../../../assets/image/announce/sysAnnounce.png" alt="获取到此图片">
                    </td>
                    <td>{{row.a2}}</td>
                    <td>
                        <Switchbox :value="row.status" />
                    </td>
                    <td>{{row.a2}}</td>
                    <td>{{row.a2}}</td>
                    <td>
                        <Upload style="width:100px;margin:0 auto;" title="更换图片" @change="setPicChange" />
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
                            <span>添加图片</span>
                            <Upload style="width:200px;" title="选择图片"  v-model="form.pic" @change="AddPicChange" />
                        </li>
                        <li>
                            <span>是否启用:</span>
                            <Switchbox v-model="form.status" />
                        </li>
                        <li class="form-btn">
                            <button class="btn-plain-large" @click="dia_show=false">取消</button>
                            <button class="btn-blue-large ml50">确认</button>
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
            curr_plant: 0,
            plant_opt: [
                { label: 'H5帮助管理', value: 0 },
                { label: 'PC帮助管理', value: 1 },
                { label: 'APP帮助管理', value: 2 }
            ],
            status_opt: [
                { label: '全部', value: '' },
                { label: '启用', value: 1 },
                { label: '关闭', value: 0 }
            ],
            filter: {
                title: '',
                status: ''
            },
            headers: ['编号','标题','图片','添加人','添加时间','是否启用','最后更新人','最后跟新时间','操作'],
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
            //
            dia_show: false,
            form: {

            }
        }
    },
    methods: {
        plantSelect(item) {
            this.curr_plant = item.value
        },
        addClick() {
            this.dia_show = true
        },
        setPicChange() {

        },
        AddPicChange() {

        },
        updateNo(val) {},
        updateSize(val) {}
    },
    mounted() {}
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