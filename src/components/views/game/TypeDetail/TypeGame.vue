<template>
    <div class="cont">
        <!-- 热门游戏内容 -->

        <div class="filter p10 mt10">
            <ul class="left">
                <li>
                    <span>游戏平台</span>
                    <Select v-model="filter.plant" :options="plant_opt"></Select>
                </li>
                <li>
                    <span>游戏名称</span>
                    <Input v-model="filter.name" />
                </li>
                <li>
                    <span>启用状态</span>
                    <Select v-model="filter.status" :options="status_opt"></Select>
                </li>
                <li>
                    <button class="btn-blue">查询</button>
                    <button class="btn-blue">确定</button>
                </li>
            </ul>
        </div>
        <div class="table mt20">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row,idx}">
                    <td>{{(pageNo-1)*pageSize+idx+1}}</td>
                    <td
                        :class="row.status?'green':'red'"
                    >{{row.status===1?'开启':row.status===0?'关闭':'???'}}</td>
                    <td>{{row.a1}}</td>
                    <td>
                        <button class="btns-blue">上移</button>
                        <button class="btns-blue">下移</button>
                    </td>
                    <td>
                        <Switchbox class="switch-select" value="row.a1" />
                    </td>
                    <td>
                        <Switchbox class="switch-select" value="row.a1" />
                    </td>
                    <td>
                        <Switchbox class="switch-select" value="row.a1" />
                    </td>
                    <td>
                        <Switchbox class="switch-select" value="row.a1" />
                    </td>
                    <td>
                        <Upload style="width:100px;margin:0 auto;" title="上传图片" @change="upPicChange" />
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
    </div>
</template> <script>
export default {
    props: {
        // isHot: Boolean,
        type_id: [String, Number]
    },
    data() {
        return {
            plant_opt: [
                { label: '全部', value: '' },
                { label: '测试', value: '1' }
            ],
            status_opt: [
                { label: '全部', value: '' },
                { label: '启用', value: '1' },
                { label: '禁用', value: '0' }
            ],
            filter: {
                plant: '',
                name: '',
                status: ''
            },
            headers: [
                '游戏平台',
                '游戏名称',
                '游戏ICON',
                '排序',
                '是否维护',
                '是否启用',
                '是否热门',
                '是否推荐',
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
                    a1: true,
                    a2: 'sdfsdfdsf',
                    a3: '充支好礼',
                    a4: '1',
                    a5: '2019-02-02 21:30'
                }
            ],
            total: 0,
            pageNo: 1,
            pageSize: 25
        }
    },

    methods: {
        selectBtn(item) {
            this.curr_btn = item.value
        },
        getList() {
            let para = {
                // is_hot
                type_id: this.type_id,              // 分类游戏,(上面的按钮,不包括热门游戏)
                vendor_id: this.filter.vendor_id,   // 游戏平台(厂商id)
                name: this.filter.name,             // 游戏名称
                status: this.filter.status          // 启用状态
            }
            let params = window.all.tool.rmEmpty(para)
        
            let { url, method } = this.$api.game_h5_list
            this.$http({ method, url, params }).then(res => {
        console.log('列表👌👌👌👌: ', res)
                if (res && res.code === '200') {
                    this.total = res.data && res.data.data&&res.data.data.length
                    this.list = res.data.data

                } else {
                    if (res && res.message !== '') {
                        this.$toast.error(res.message)
                    }
                }
            })
        },
        updateNo(val) {},
        updateSize(val) {}
    },
    watch: {
        type_id(to, from) {
            if (to) {
                this.getList()
            }
        }
    },
    mounted() {
        if (this.type_id) {
            this.getList()
        }
    }
}
</script>

<style scoped>

/* .p10 全局样式 */
.switch-select {
    transform: scale(0.8);
}
</style>