<template>
    <div class="cont">
        <!-- 热门游戏内容 -->

        <div class="filter p10 mt10">
            <ul class="left">
                <li>
                    <span>游戏平台</span>
                    <Select v-model="filter.vendor_id" :options="plant_opt"></Select>
                </li>
                <li>
                    <span>游戏名称</span>
                    <Input v-model="filter.name" />
                </li>
                <li>
                    <button class="btn-blue" @click="getList">查询</button>
                    <button class="btn-blue" @click="sortCfm" >确定</button>
                </li>
            </ul>
        </div>
        <div class="table mt20">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row,idx}">
                    <td>{{(pageNo-1)*pageSize+idx+1}}</td>
                    <td>{{row.vendor&&row.vendor.name}}</td>
                    <td>{{row.games&&row.games.name}}</td>
                    <td>
                        {{row.sort}}
                        <button class="btns-blue" @click="move(row,idx,'moveUp')">上移</button>
                        <button class="btns-blue" @click="move(row,idx,'moveDown')">下移</button>
                    </td>
                    <td>
                        <Switchbox
                            class="switch-select"
                            :value="row.is_hot"
                            @update="switchUpd($event,row)"
                        />
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
        // type_id: [String, Number]
    },
    data() {
        return {
            plant_opt: [{ label: "全部", value: "" }],
            filter: {
                vendor_id: "",
                name: ""
            },
            headers: ["编号", "游戏平台", "游戏名称", "排序", "是否热门"],
            list: [],
            total: 0,
            pageNo: 1,
            pageSize: 25
        };
    },

    methods: {
        getSelectOpt() {
            let { url, method } = this.$api.game_search_condition_list;
            this.$http({ url, method }).then(res => {
                // console.log('下拉数据',res)
                if (res && res.code == "200") {
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
        switchUpd(val, row) {
            let data = {
                id: row.id,
                hot_new: val ? 1 : 0
            };

            let { url, method } = this.$api.game_hot_set;
            this.$http({ method, url, data }).then(res => {
                if (res && res.code === "200") {
                    this.$toast.success(res && res.message);
                    this.getList();
                }
            });
        },
        /**
         * @param {string} row 后端的排序
         * @param {string} index 前端的排序
         * @param {stirng} moveUp ,moveDown 上移或者下移
         * @param {stirng} moveUp ,moveDown 上移或者下移
         */

        move(row, index, moving) {
            if (index === 0 && moving === "moveUp") return;
            if (index === this.list.length - 1 && moving === "moveDown") return;
            let mov = moving == "moveUp" ? -1 : 1;
            if (moving === "moveUp") {
                this.list.splice(index, 1);
                this.list.splice(index + mov, 0, row);
            } else {
                this.list.splice(index, 1);
                this.list.splice(index + mov, 0, row);
            }
            this.list = this.list.slice();
        },
        sortCfm(){
            let length=this.list && this.list.length;
            if(!length) return;
            let param=this.list.map((item,index)=>{
                return {
                    id:item.id,
                    sort:length-index
                };
            });
            param=JSON.stringify(param);
            let data={
                sorts:param
            };
            this.$http({
                method:this.$api.game_order.method,
                url:this.$api.game_order.url,
                data:data
            }).then(res=>{
                if(res && res.code=='200'){
                    alert("执行成功")
                    this.getList();
                }
            })
        },
        getList() {
            let para = {
                hot_new: 1,
                vendor_id: this.filter.vendor_id,
                name: this.filter.name
            };
            let params = window.all.tool.rmEmpty(para);
            this.$http({
                method: this.$api.game_app_list.method,
                url: this.$api.game_app_list.url,
                params: params
            }).then(res => {
                console.log("res", res);
                if (res && res.code === "200") {
                    this.list = res.data || [];
                    this.total = this.list.length;
                }
            });
        },
        updateNo(val) {},
        updateSize(val) {}
    },
    // watch: {
    //     'type_id'(to, from){
    //         console.log('from: ', from);
    //         console.log('to: ', to);
    //         if(to){
    //             this.getList()
    //         }
    //     }
    // },
    mounted() {
        this.getList();
        this.getSelectOpt();
    }
};
</script>

<style scoped>
/* .p10 全局样式 */
.switch-select {
    transform: scale(0.8);
}
</style>
