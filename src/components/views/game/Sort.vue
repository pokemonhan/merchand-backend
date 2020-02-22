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
                    <!-- <button class="btn-blue">确定</button> -->
                </li>
            </ul>
        </div>
        <div class="table mt20">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row,idx}">
                    <td>{{(pageNo-1)*pageSize+idx+1}}</td>
                    <td>{{row.game_type && row.game_type.name}}</td>
                    <td>
                        <Switchbox class="switch-select" :value="row.status" @update="switchStatus($event,row)" />
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
            this.getList();
        },

        updateNo(val) {},
        updateSize(val) {},
        switchStatus(val,row){
            let data={
                id:row.id,
                status:val ? 1 : 0
            }
            // console.log(data)
            let {url,method} = this.$api.game_type_status_set;
            this.$http({method,url,data}).then(res=>{
                // console.log(res)
                if(res && res.code=='200'){
                    this.$toast.success(res && res.message);
                    this.getList();
                }
            })
        },
        getList(){
            let para = {
                status:this.filter.status,
                device:this.curr_btn,
                name:this.filter.sort,
            }
            // console.log('查询条件：',para)
            let params=window.all.tool.rmEmpty(para);
            let {url,method}=this.$api.game_type_list;
            this.$http({method,url,params}).then(res=>{
                // console.log('返回数据：',res)
                if(res && res.code=='200'){
                    this.total=res.data.total;
                    this.list=res.data && res.data.data
                }else{
                    if(res && res.message !== ""){
                        this.$toast.error(res.message)
                    }
                }
            })
        },
        
    },
    mounted() {
        this.getList();
    }
}
</script> <style scoped>

/* .p10 全局样式 */
.switch-select {
    transform: scale(0.8);
}
</style>