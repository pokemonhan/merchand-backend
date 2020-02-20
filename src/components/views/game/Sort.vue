<template>
    <div class="container">
        <!-- 分类管理 -->

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
                    <span>分类名称</span>
                    <Input v-model="filter.sort" />
                </li>
                <li>
                    <span>启用状态</span>
                    <Select v-model="filter.status" :options="status_opt" ></Select>
                </li>
                <li>
                    <button class="btn-blue" @click="getList" >查询</button>
                    <button class="btn-blue">确定</button>
                </li>
            </ul>
        </div>
        <div class="table mt20">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row,idx}">
                    <td>{{(pageNo-1)*pageSize+idx+1}}</td>
                    <td>{{row.a1}}</td>
                    <td>
                        <Switchbox class="switch-select" v-model="row.a1" />
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
    data() {
        return {
            buttons: [
                { label: 'H5分类管理', value: '1' },
                { label: 'PC分类管理', value: '2' },
                { label: 'APP分类管理', value: '3' }
            ],
            curr_btn: '1',
            status_opt: [
                { label: '全部', value: '' },
                { label: '开启', value: '1' },
                { label: '关闭', value: '0' }
            ],
            filter: {
                sort: '',
                status: ''
            },
            headers: ['编号','分类名称','是否启用'],
            list: [],
            total: 0,
            pageNo: 1,
            pageSize: 25
        }
    },
    methods: {
        selectBtn(item) {
            this.curr_btn = item.value
        },

        updateNo(val) {},
        updateSize(val) {},
        getList(){
            let para = {
                status:this.filter.status,
                device:this.curr_btn,
                name:this.filter.sort,
            }
            console.log('查询条件：',para)
            let params=window.all.tool.rmEmpty(para);
            let {url,method}=this.$api.game_type_list;
            this.$http({method,url,params}).then(res=>{
                console.log('返回数据：',res)
            })
        },
        
    },
    mounted() {
        
    }
}
</script> <style scoped>

/* .p10 全局样式 */
.switch-select {
    transform: scale(0.8);
}
</style>