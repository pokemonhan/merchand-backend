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
                    <td>{{row.vendor && row.vendor.name}}</td>
                    <td>{{row.games && row.games.name}}</td>
                    <td>{{row.icon}}</td>
                    <td>
                        {{row.sort}}
                        <button class="btns-blue">上移</button>
                        <button class="btns-blue">下移</button>
                    </td>
                    <td>
                        <Switchbox class="switch-select" :value="row.is_maintain"  @update="switchMaintain($event,row)" />
                    </td>
                    <td>
                        <Switchbox class="switch-select" :value="row.status" @update="switchStatus($event,row)" />
                    </td>
                    <td>
                        <Switchbox class="switch-select" :value="row.is_hot" @update="switchHot($event,row)" />
                    </td>
                    <td>
                        <Switchbox class="switch-select" :value="row.is_recommend" @update="switchRecommend($event,row)" />
                    </td>
                    <td>
                        <Upload
                            style="width:100px;margin:0 auto;"
                            title="上传图片"
                            @change="upPicChange"
                            type='file'
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
        type_id: [String, Number]
    },
    data() {
        return {
            select: {},
            plant_opt: [],
            status_opt: [
                { label: "全部", value: "" },
                { label: "启用", value: "1" },
                { label: "禁用", value: "0" }
            ],
            filter: {
                vendor_id: "", //
                name: "", //
                status: "" //
            },
            headers: [
                "游戏平台",
                "游戏名称",
                "游戏ICON",
                "排序",
                "是否维护",
                "是否启用",
                "是否热门",
                "是否推荐",
                "操作"
            ],
            list: [],
            total: 0,
            pageNo: 1,
            pageSize: 25,
            basket:[],//图片路径
        };
    },

    methods: {
        selectBtn(item) {
            this.curr_btn = item.value;
        },
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
        switchMaintain(val,row){
            let data={
               id:row. id,
               is_maintain:val ? 1 : 0
            }
            let{url,method}=this.$api.game_maintain_list
            this.$http({method,url,data}).then(res=>{
                if(res && res.code==='200'){
                    this.$toast.success(res && res.message)
                    this.getList()
                }
            })
        },
        switchStatus(val,row){
            let data={
                id:row.id,
                status:val ? 1 : 0
            }
            let{url,method}=this.$api.game_status
            this.$http({method,url,data}).then(res=>{
                if(res && res.code==='200'){
                    this.$toast.success(res && res.message)
                    this.getList()
                }
            })
        },
        switchHot(val,row){
            let data={
                id:row.id,
                is_hot:val ? 1 : 0
            }
            let{url,method}=this.$api.game_hot_set
            this.$http({method,url,data}).then(res=>{
                if(res && res.code==='200'){
                    this.$toast.success(res && res.message)
                    this.getList()
                }
            })
        },
        switchRecommend(val,row){
            let data={
                id:row.id,
                is_recommend:val ? 1 : 0
            }
            let{url,method}=this.$api.game_recommend
            this.$http({method,url,data}).then(res=>{
                if(res && res.code==='200'){
                    this.$toast.success(res && res.message)
                    this.getList()
                }
            })
        },
        getList() {
            let para = {
                // is_hot
                // TODO
                type_id: this.type_id, // 分类游戏,(上面的按钮,不包括热门游戏)
                vendor_id: this.filter.vendor_id, // 游戏平台(厂商id)
                name: this.filter.name, // 游戏名称
                status: this.filter.status // 启用状态
            };
            // console.log(para);
            let params = window.all.tool.rmEmpty(para);

            let { url, method } = this.$api.game_h5_list;
            this.$http({ method, url, params }).then(res => {
                // console.log('列表👌👌👌👌: ', res)
                if (res && res.code === "200") {
                    this.total = res.data.length;
                    this.list = res.data;
                } else {
                    if (res && res.message !== "") {
                        this.$toast.error(res.message);
                    }
                }
            });
        },
        getPicPath(){
            
        },
        upPicChange() {
            let data={
                id:this.row.id,
                icon
            }
            let{url,method}=this.$api.picture_update
            this.$http({method,url,data}).then(res=>{
                if(res && res.code=='200'){
                    console.log(res)
                    this.$toast.success(res && res.message)
                    this.getList()
                }
            })
        },
        updateNo(val) {},
        updateSize(val) {}
    },
    watch: {
        type_id(to, from) {
            if (to) {
                this.getList();
            }
        }
    },
    mounted() {
        if (this.type_id) {
            this.getList();
        }
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
