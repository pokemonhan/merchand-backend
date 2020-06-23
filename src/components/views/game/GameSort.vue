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
                    <Select v-model="filter.status" :options="status_opt"></Select>
                </li>
                <li>
                    <button class="btn-blue" @click="getList">查询</button>
                    <!-- <button class="btn-blue">确定</button> -->
                </li>
            </ul>
        </div>
        <div class="table mt20">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row,idx}">
                    <td>{{(pageNo-1)*pageSize+idx+1}}</td>
                    <td>{{row.game_type && row.game_type.name }}</td>
                    <td>
                        <Switchbox :value="row.status" @update="switchStatus($event,row)"></Switchbox>
                    </td>
                </template>
            </Table>
        </div>
        <Page
            class="table-page"
            :total="total"
            :pageNo.sync="pageNo"
            :pageSize.sync="pageSize"
            @updateNo="updateNo"
            @updateSize="updateSize"
        />
        <!-- <div class="cont"> -->
        <!-- <div class="left-inner"> -->
        <!-- <ul class="lev1"> -->
        <!-- <li v-for="(lv1, lv1_idx) in list" :key="lv1_idx"> -->
        <!-- <div class="title" style="padding-bottom:5px;">
                            <i
                                v-if="lv1.children"
                                :class="['iconfont iconup',lv1.isMenuOpen?'iconopen':'']"
                            ></i>
                            <span @click="expand(lv1_idx,lv1)">{{lv1.name}}</span>
                            <Switchbox
                                class="switch"
                                v-model="lv1.status"
                                @update="switchUpd(lv1)"
                            />
        </div>-->
        <!-- 二级 子内容 -->
        <!-- <ul v-if="lv1.children" class="lev2 list_lv2" :ref="lv1_idx">
                            <li v-for="(lv2, lv2_idx) in lv1.children" :key="lv2_idx">
                                <div class="title">
                                    <i
                                        v-if="lv2.children"
                                        :class="['iconfont iconup',lv2.isMenuOpen?'iconopen':'']"
                                    ></i>
                                    <span>{{lv2.name}}</span>
                                    <Switchbox
                                        class="switch"
                                        v-model="lv2.status"
                                        @update="switchUpd(lv1)"
                                    />
                                </div>
                            </li>
        </ul>-->
        <!-- </li> -->
        <!-- </ul> -->
        <!-- </div> -->
        <!-- <div class="right-inner">123</div> -->
        <!-- </div> -->
    </div>
</template> <script>
export default {
    name: "GameSort",
    data() {
        return {
            buttons: [
                { label: "PC分类管理", value: "1" },
                { label: "H5分类管理", value: "2" },
                { label: "APP分类管理", value: "3" }
            ],
            curr_btn: "1",
            status_opt: [
                { label: "全部", value: "" },
                { label: "开启", value: "1" },
                { label: "关闭", value: "0" }
            ],
            filter: {
                sort: "",
                status: ""
            },
            list: [
                // {
                //     name: "棋盘游戏",
                //     status: 1,
                //     isMenuOpen: true,
                //     children: [
                //         {
                //             name: "斗地主",
                //             isMenuOpen: true,
                //             status: 1
                //         },
                //         {
                //             name: "斗地主",
                //             isMenuOpen: true,
                //             status: 1
                //         }
                //     ]
                // },
                // {
                //     name: "真人视讯",
                //     status: 1,
                //     isMenuOpen: true,
                //     children: [
                //         {
                //             name: "炸金花",
                //             isMenuOpen: true,
                //             status: 1
                //         }
                //     ]
                // }
            ],
            headers: ["编号", "分类名称", "是否启用"],
            total: 0,
            pageNo: 1,
            pageSize: 25
        };
    },
    methods: {
        expand(index, item) {
            // console.log(item);
            let ele = this.$refs[index];
            // console.log('ele',ele)
            item.isMenuOpen = !ele[0].offsetHeight;
            let slideToggle = window.all.tool.slideToggle(ele);
            this.$forceUpdate();
        },
        selectBtn(item) {
            this.curr_btn = item.value;
            this.getList();
        },
        switchUpd(val, row) {
            let data = {
                id: row.id,
                status: val ? 1 : 0
            };
            // console.log(data)
            let { url, method } = this.$api.game_type_status_set;
            this.$http({ method, url, data }).then(res => {
                // console.log(res)
                if (res && res.code == "200") {
                    this.$toast.success(res && res.message);
                    this.getList();
                }
            });
        },
        getList() {
            let datas = {
                status: this.filter.status,
                device: this.curr_btn,
                name: this.filter.sort,
                page: this.pageNo,
                pageSize: this.pageSize
            };
            // console.log('查询条件：',datas)
            let data = window.all.tool.rmEmpty(datas);
            let { url, method } = this.$api.game_type_list;
            this.$http({ method, url, data }).then(res => {
                // console.log("返回数据：", res);
                if (res && res.code == "200") {
                    this.total = res.data.total;
                    this.list = res.data && res.data.data;
                }
            });
        },
        updateNo(val) {
            this.getList();
        },
        updateSize(val) {
            this.pageNo = 1;
            this.getList();
        },
        switchStatus(val, row) {
            let data = {
                id: row.id,
                status: val ? 1 : 0
            };
            let { url, method } = this.$api.game_type_status_set;
            this.$http({ method, url, data }).then(res => {
                if (res && res.code === "200") {
                    this.$toast.success(res && res.message);
                    this.getList();
                }
            });
        }
    },
    mounted() {
        this.getList();
    }
};
</script> <style scoped>
/* .p10 全局样式 */
.switch-select {
    transform: scale(0.8);
}
.cont {
    width: 100%;
    height: 1000px;
    border: 1px solid #4c8bfd;
    margin-top: 10px;
    display: flex;
}
.left-inner {
    display: flex;
    border: 1px solid #4c8bfd;
    border-radius: 5px;
    width: 50%;
    margin: 50px;
    padding-top: 20xp;
}

.right-inner {
    display: flex;
    border: 1px solid #4c8bfd;
    border-radius: 5px;
    width: 50%;
    margin: 50px;
    padding-top: 20xp;
}
.lev1 ul {
    /* display: none; */
    overflow: hidden;
    transition: max-height 0.4s;
}

.iconfont {
    height: 1em;
    transform: rotate(180deg);
    transition: all 0.2s;
    transform-origin: center;
}
.iconopen {
    transform: rotate(0deg);
}
li > .title {
    display: flex;
    align-items: center;
    height: 26px;
}
.list_lv2 li {
    margin-left: 15px;
    padding-bottom: 5px;
}
.switch {
    transform: scale(0.5);
}
</style>