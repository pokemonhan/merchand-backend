<template>
    <div class="container">
        <div class="sort">
            <span
                v-for="(game, index) in games"
                :key="index"
                :class="[active_game===index?'actived':'']"
                @click="actSort(index)"
            >{{game}}</span>
        </div>
        <div class="game-plant">
            <span>选择游戏平台:</span>
            <button
                v-for="(game_plant, index) in plants"
                :key="index"
                :class="[active_plant===index?'btn-blue':'btn-plain']"
                @click="choose_platform(index)"
            >{{game_plant}}</button>
            <button style="margin-left:40px;" class="btn-blue" @click="addWash">添加洗码规则</button>
        </div>
        <div class="table">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row,idx}">
                    <td style="height:30px">{{idx+1}}</td>
                    <td>{{row.bet}}</td>

                    <td v-for="(item,index) in row.percent_data" :key="index">{{item.percent}}%</td>
                    <td>
                        <button class="btn-blue" @click="editWashModal(row)">编辑</button>
                        <button class="btn-red" @click="delWashModal(row)">删除</button>
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
        <div class="modal-mask" v-if="show_modal">
            <div class="v-modal edit-modal">
                <div class="mod-head">
                    <span v-if="add_title">添加洗码规则</span>
                    <span v-if="is_edit">编辑</span>
                    <i class="iconfont iconcuowuguanbi-" @click="show_modal=false"></i>
                </div>
                <div class="mod-body center-box">
                    <table :class="['form-table', !is_edit?'ml-210':'']">
                        <tr class="row1">
                            <td>前一列对比数据</td>
                            <td>编辑数据</td>
                            <td v-if="is_edit">后一列对比数据</td>
                        </tr>
                        <tr class="code-amount row2">
                            <td>
                                <div>
                                    <span>打码额度:</span>
                                    <Input class="w100 ml-10" v-model="wash_form.code_numbers[0]" />
                                    <i class="iconfont iconsousuo ml-10"></i>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <span>打码额度:</span>
                                    <Input class="w100 ml-10" v-model="wash_form.code_numbers[1]" />
                                    <i class="iconfont iconsousuo ml-10"></i>
                                </div>
                            </td>
                            <td>
                                <div v-if="is_edit">
                                    <span>打码额度:</span>
                                    <Input class="w100 ml-10" v-model="wash_form.code_numbers[2]" />
                                    <i class="iconfont iconsousuo ml-10"></i>
                                </div>
                            </td>
                        </tr>
                        <tr class="vip-data" v-for="(item,index) in lev_list" :key="index">
                            <td>
                                <span>{{item.name}}:</span>
                                <span
                                    class="ml-10"
                                >{{wash_list[index] && wash_list[index].percent}}%</span>
                            </td>
                            <td>
                                <div class="edit-form">
                                    <span>{{item.name}}:</span>
                                    <Input
                                        class="w100 ml-10"
                                        limit="number"
                                        v-model="wash_form.rate[index]"
                                    />
                                    <span class="ml-10">%</span>
                                </div>
                            </td>
                            <td v-if="is_edit">
                                <div class="edit-form">
                                    <span>{{item.name}}:</span>
                                    <span class="ml-10">{{aaaaaa}}</span>
                                    <span></span>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <div style="margin-top:50px;text-align:center;">
                        <button class="btn-plain-large mr" @click="show_modal=false">取消</button>
                        <button class="btn-blue-large" @click="diaCfm">保存</button>
                    </div>
                </div>
            </div>
        </div>

        <Modal
            :show="show_del_modal"
            title="删除等级"
            content="是否删除该打码记录"
            @cancel="show_del_modal=false"
            @close="show_del_modal=false"
            @confirm="delConfirm"
        ></Modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            games: ["刺激棋牌", "经典棋牌", "电子游艺", "趣味竞猜"],
            active_game: 0,

            // game_plant: 0,
            active_plant: 0,
            plants: ["开元棋牌", "龙城棋牌", "财神棋牌", "欢乐棋牌"],
            game_plant_option: [
                { label: "全部", value: "2" },
                { label: "甲", value: "3" }
            ],
            user_id: "",
            headers: ["编号", "打码量", "操作"],
            list: [],
            total: 0,
            pageNo: 1,
            pageSize: 25,
            //晋级方式
            up_method: "",
            up_method_opt: [
                { label: "充值", value: 1 },
                { label: "打码量", value: 2 }
            ],
            show_modal: false,
            /* ----------  wash_form ------------ */
            wash_form: {
                code_numbers: [],
                rate: []
            },
            /* 删除 */
            show_del_modal: false,
            // modal_status: '',
            is_edit: true,
            add_title: true,
            aaaaaa: {},
            lev_list: [],
            wash_list: [],
            dia_status: "",
            curr_row: {},
            bbbb: "0.8%"
        };
    },
    methods: {
        getLevList() {
            let { method, url } = this.$api.grade_list;
            this.$http({ method, url }).then(res => {
                console.log("等级数据", res);
                if (res && res.code == "200") {
                    this.lev_list = res.data.data;
                }
            });
        },
        actSort(index) {
            this.active_game = index;
            this.getList();
        },
        choose_platform(index) {
            this.active_plant = index;
            this.getList();
        },
        initWash() {
            this.wash_form = {
                code_numbers: [],
                rate: []
            };
        },
        diaCfm() {
            if (this.dia_status === "add") {
                this.addCfm();
            }
            if (this.dia_status === "edit") {
                this.editCfm();
            }
        },
        addWash() {
            this.initWash();
            this.add_title = true;
            this.show_modal = true;
            this.is_edit = false;
            this.dia_status = "add";
            let last = {};
            if (this.list.length === 0) {
                last = {};
            } else {
                last = (this.list || [])[this.list.length - 1];
            }
            if (last && last.percent_data) {
                this.wash_list = last.percent_data;
            }
        },
        addCfm() {
            let percent = {};
            for (let i = 0; i < this.lev_list.length; i++) {
                let item = this.lev_list[i];
                percent[item.experience_max] = this.wash_form.rate[i];
            }
            let data = {
                game_type_id: this.active_game + 1,
                game_vendor_id: this.active_plant + 1,
                bet: String(this.wash_form.code_numbers[1]),
                percent: JSON.stringify(percent)
            };
            console.log('请求数据',data)
            let { method, url } = this.$api.wash_code_add;
            this.$http({ method, url, data }).then(res => {
                console.log('返回数据',res)
                if (res && res.code == "200") {
                    this.show_modal = false;
                    this.$toast.success(res && res.message);
                    this.getList();
                }
            });
        },
        editWashModal(row) {
            this.add_title = false;
            this.show_modal = true;
            this.is_edit = true;
            this.dia_status = "edit";
        },
        editCfm() {},
        delWashModal(row) {
            // console.log(row);
            this.show_del_modal = true;
            this.curr_row = row;
        },

        delConfirm() {
            let data = {
                id: this.curr_row.id
            };
            console.log('请求数据',data)
            let { method, url } = this.$api.bank_cards_del;
            this.$http({ method, url, data }).then(res => {
                if (res && res.code == "200") {
                    this.show_del_modal = false;
                    this.$toast.success(res && res.message);
                    this.getList();
                }
            });
        },
        getList() {
            let para = {
                game_type: this.active_game + 1,
                game_vendor: this.active_plant + 1,
                page:this.pageNo,
                pageSize:this.pageSize
            };
            // console.log("请求数据", para);
            let params = window.all.tool.rmEmpty(para);
            let { method, url } = this.$api.wash_code_list;
            this.$http({ method: method, url: url, params: params }).then(
                res => {
                    console.log("res", res);
                    if (res && res.code == "200") {
                        this.list = res.data;
                        this.total = res.data.total;
                        // { label: '编号' }
                        let vip_list = [];
                        vip_list = (res.data && res.data[0] && res.data[0].percent_data) || [];
                        let vip_head = vip_list.map(item => {
                            return item.grade_name;
                        });
                        this.headers = Array.concat(
                            ["编号", "打码量"],
                            vip_head,
                            "操作"
                        );
                    }
                }
            );
        },
        updateNo(val) {
            this.getList();
        },
        updateSize(val) {
            this.pageNo=1;
            this.getList();
        },
    },
    mounted() {
        this.getList();
        this.getLevList();
    }
};
</script>

<style scoped>
/* .container 公共区 */

.sort > span {
    padding: 4px 12px;
    cursor: pointer;
    /* border: 1px solid #000; */
    transition: all 0.3s;
}
.sort .actived {
    color: #4c8bfc;
    border-bottom: 2px solid #48f;
}
.game-plant {
    margin-top: 20px;
}
.btn {
    /* height: 26px; */
    padding-left: 15px;
    padding-right: 15px;
    /* padding: 3px 15px; */
    box-sizing: border-box;
    border-radius: 3px;
    outline: none;
    /* border: none; */
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    color: #333;
    border: 1px solid #333;
    background-color: #fff;
}

.btn:hover {
    box-shadow: none;
    /* color: #246aeb;
    border: 1px solid #48f; */
}

.table {
    margin-top: 15px;
}
.page {
    margin-top: 30px;
    display: flex;
    justify-content: center;
}
/* modal-mask  --在index.html区域中 */
.edit-modal {
    width: 900px;
    background: #fff;
}
.mr {
    margin-right: 100px;
}
.ml-10 {
    margin-left: 10px;
}
.bold {
    font-weight: 800;
}
/* 洗码编辑 */
.form-table {
    width: 700px;
    table-layout: fixed;
}
.ml-210 {
    margin-left: 210px;
}
.form-table tr td {
    height: 50px;
}
.form-table .row1 {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: #4c8bfd;
}
.code-amount td div {
    display: flex;
    justify-content: center;
    align-items: center;
}
.code-amount td div {
    font-weight: 800;
}
.edit-form {
    display: flex;
    align-items: center;
}
.vip-data td span:first-child {
    margin-left: 40px;
}
</style>