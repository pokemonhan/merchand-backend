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
                    <button class="btn-blue" >查询</button>
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
                            src="../../../assets/image/announce/sysAnnounce.png"
                            alt
                        />
                    </td>
                    <td>{{row.a1}}</td>
                    <td>
                        <Switchbox v-model="row.status" />
                    </td>

                    <td>{{row.a1}}</td>
                    <td>{{row.a2}}</td>
                    <td>{{row.a2}}</td>
                    <td>
                        <button class="btn-blue" @click="changePic(row)">更换图片</button>
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
        <Dialog :show.sync="dia_show" title="更换图?片">
            <div class="dia-inner">
                <div>
                    <ul class="form">
                        <li>
                            <span>更换图片:</span>
                            <img
                                class="dia-img ml20"
                                src="../../../assets/image/announce/sysAnnounce.png"
                                alt="图片刷新"
                            />
                            <Upload
                                class="ml20"
                                title="选择图片"
                                accept="image/png, image/jpg, image/gif"
                                v-model="form.pic"
                                @change="upPicChange"
                            />
                        </li>
                        <li class="mt20">
                            <span>是否启用:</span>
                            <Switchbox class="ml20" v-model="form.status" />
                        </li>
                    </ul>
                    <div class="conf-btns">
                        <button class="btn-plain-large" @click="dia_show=false">取消</button>
                        <button class="btn-blue-large ml20">确认</button>
                    </div>
                </div>
            </div>
        </Dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            btns_opt: [
                { label: 'H5推广管理', value: 'h5' },
                { label: 'PC推广管理', value: 'pc' },
                { label: 'APP推广管理', value: 'app' }
            ],
            curr_btn: 'h5',
            filter: {
                acc: ''
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
            list: [
                {
                    a1: '64646466',
                    a2: 'sdfsdfdsf',
                    a3: '充支好礼',
                    a4: '1',
                    a5: '2019-02-02 21:30'
                },
                {
                    a1: '64646466',
                    a2: 'sdfsdfdsf',
                    a3: '充支好礼',
                    a4: '1',
                    a5: '2019-02-02 21:30'
                }
            ],
            total: 0,
            pageNo: 1,
            pageSize: 25,

            table_pic: '',
            // dialog
            dia_show: false,
            form: {
                pic: '',
                status: true
            }
        }
    },
    methods: {
        plantSelect(item) {
            this.curr_btn = item.value
        },
        changePic() {
            this.dia_show = true
        },
        upPicChange() {},
        updateNo(val) {},
        updateSize(val) {}
    },
    mounted() {}
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