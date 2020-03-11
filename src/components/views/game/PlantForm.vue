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
                    <button class="btn-blue" @click="sortCfm">确定</button>
                </li>
            </ul>
        </div>
        <div class="table mt20">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row,idx}">
                    <td>
                        <img
                            v-if="row.icon"
                            :src="protocol+'//pic.jianghu.local/'+row.icon"
                            style="max-width:100px;min-height:100px"
                        />
                    </td>
                    <td>{{row.game_vendor && row.game_vendor.name}}</td>
                    <td>
                        <button class="btns-blue" @click="move(row,idx,'moveUp')">上移</button>
                        <button class="btns-blue" @click="move(row,idx,'moveDown')">下移</button>
                    </td>
                    <td>
                        <Switchbox
                            class="switch-select"
                            :value="row.is_maintain"
                            @update="switchChange($event,row,1)"
                        />
                    </td>
                    <td>
                        <Switchbox
                            class="switch-select"
                            :value="row.status"
                            @update="switchChange($event,row,0)"
                        />
                    </td>
                    <td>
                        <Upload
                            style="width:100px;margin:0 auto;"
                            title="上传图片"
                            @change="upPicChange($event, row)"
                            type="file"
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
            select: {},
            protocol: window.location.protocol
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
            this.getList();
        },

        updateNo(val) {},
        updateSize(val) {},

        switchChange(val, row, type) {
            let data = {
                id: row.id,
                type: type,
                status: val ? 1 : 0
            };
            let { url, method } = this.$api.game_vendor_status_set;
            this.$http({ method, url, data }).then(res => {
                if (res && res.code == "200") {
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
            if (index === this.list.length - 1 && moving === "mmoveDown")
                return;
            let mov = moving === "moveUp" ? -1 : 1;

            if (moving === "moveUp") {
                this.list.splice(index, 1);
                this.list.splice(index + mov, 0, row);
            } else {
                this.list.splice(index, 1);
                this.list.splice(index + mov, 0, row);
            }
            this.list = this.list.slice();
        },
        sortCfm() {
            let length = this.list && this.list.length;
            if (!length) return;
            let param = this.list.map((item, index) => {
                return {
                    id: item.id,
                    sort: length - index
                };
            });
            param = JSON.stringify(param);
            let data = {
                sorts: param
            };
            this.$http({
                method: this.$api.game_vendor_sort_set.method,
                url: this.$api.game_vendor_sort_set.url,
                data: data
            }).then(res => {
                if (res && res.code == "200") {
                    this.$toast.success(res && res.message);
                    this.getList();
                }
            });
        },
        upPicChange(e, row) {
            // console.log("row:",row)
            // console.log("event:",e);
            let reader = new FileReader();
            let pic = e.target.files[0];
            let basket = "GameManagement/PlantFormPicture";
            var icon = "";
            let form = new FormData();
            form.append("file", pic, pic.name);
            form.append("basket", basket);
            let { url, method } = this.$api.update_picture_database;
            let data = form;
            let headers = { "Content-Type": "multipart/form-data" };
            this.$http({ method, url, data, headers }).then(res => {
                if (res && res.code == "200") {
                    this.updatePicture(res.data, row.id);
                }
            });
        },
        updatePicture(data, id) {
            console.log("id:", id);
            if (!data) return;
            console.log(data);
            let para = {
                id: id,
                icon: data.path
            };
            console.log(para);
            let { url, method } = this.$api.game_plant_picture_update;
            this.$http({ method, url, data: para }).then(res => {
                if (res && res.code == "200") {
                    console.log("res", res);
                    this.getList();
                }
            });
        },
        getList() {
            let para = {
                device: this.curr_btn,
                name: this.filter.plant,
                status: this.filter.status
            };
            // console.log('查询数据',para)
            let params = window.all.tool.rmEmpty(para);
            let { url, method } = this.$api.game_vendor;
            this.$http({ method, url, params }).then(res => {
                // console.log("返回数据", res);
                if (res && res.code == "200") {
                    this.total = res.data.length;
                    this.list = res.data;
                }
            });
        }
    },
    mounted() {
        this.getSelect();
        this.getList();
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