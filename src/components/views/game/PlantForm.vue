<template>
    <div class="container">
        <!-- 平台管理 -->

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
                    <span>游戏平台</span>
                    <Select v-model="filter.plant" :options="plant_opt"></Select>
                </li>
                <li>
                    <span>启用状态</span>
                    <Select v-model="filter.status" :options="status_opt"></Select>
                </li>
                <li>
                    <button class="btn-blue" @click="getList">查询</button>
                    <button class="btn-blue">确定</button>
                </li>
            </ul>
        </div>
        <div class="table mt20">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row}">
                    <td>{{row.icon}}</td>
                    <td>{{row.game_vendor && row.game_vendor.name}}</td>
                    <td>
                        <button class="btns-blue">上移</button>
                        <button class="btns-blue">下移</button>
                    </td>
                    <td>
                        <Switchbox class="switch-select" :value="row.is_maintain" @update="switchMaintain($event,row)" />
                    </td>   
                    <td>
                        <Switchbox class="switch-select" :value="row.is_status" @update="switchStatus($event,row)" />
                    </td>
                    <td>
                        <button class="btns-blue">上传图片</button>
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
                { label: "H5平台管理", value: "1" },
                { label: "PC平台管理", value: "2" },
                { label: "APP平台管理", value: "3" }
            ],
            curr_btn: "1",
            plant_opt: [],
            status_opt: [
                { label: "全部", value: "" },
                { label: "开启", value: "1" },
                { label: "关闭", value: "0" }
            ],
            filter: {
                plant: "",
                status: ""
            },
            headers: [
                "ICON",
                "游戏平台",
                "排序",
                "是否维护",
                "是否启用",
                "操作"
            ],
            list: [],
            total: 0,
            pageNo: 1,
            pageSize: 25,
            select: {}
        };
    },
    methods: {
        getSelect() {
            let { method, url } = this.$api.game_search_condition_list;
            this.$http({ method, url }).then(res => {
                if (res && res.code == "200") {
                    // console.log('请求数据',res)
                    this.select = res.data;
                    this.plant_opt = this.backToSelOpt(
                        res.data && res.data.gameVendors
                    );
                }
            });
        },
        backToSelOpt(list = []) {
            let all = [
                {
                    label: "全部",
                    value: ""
                }
            ];
            let back_list = list.map(item => {
                return { label: item.name, value: item.id };
            });
            return all.concat(back_list);
        },
        selectBtn(item) {
            this.curr_btn = item.value;
        },

        updateNo(val) {},
        updateSize(val) {},
        switchMaintain(val,row){
            let data={
                id:row.id,
                type:val ? 1 : 0,
                status:''
            };
            let{url,method}=this.$api.game_vendor_status_set;
            this.$http({method,url,data}).then(res=>{
                if(res && res.code=='200'){
                    this.$toast.success(res && res.message);
                    this.getList();
                }
            })
        },
        getList() {
            let para = {
                device: this.curr_btn,
                name: this.filter.plant,
                status: this.filter.status
            };
            let params = window.all.tool.rmEmpty(para);
            let { url, method } = this.$api.game_vendor;
            this.$http({ method, url, params }).then(res => {
                console.log("返回数据", res);
                if (res && res.code == "200") {
                    this.total = res.data.length;
                    this.list = res.data;
                } else {
                    if (res && res.message !== "") {
                        this.$toast.error(res.message);
                    }
                }
            });
        }
    },
    mounted() {
        this.getSelect();
        // this.getList()
    }
};
</script> <style scoped>
.w100 {
    width: 100px;
}
/* .p10 全局样式 */
.switch-select {
    transform: scale(0.8);
}
</style>