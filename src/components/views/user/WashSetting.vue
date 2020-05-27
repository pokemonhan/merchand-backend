<template>
    <div class="container">
        <div class="sort">
            <span
                v-for="(game, index) in games"
                :key="index"
                :class="[active_game===game.value?'actived':'']"
                @click="actSort(game.value)"
            >{{game.label}}</span>
        </div>
        <div class="game-plant">
            <span>选择游戏平台:</span>
            <button
                v-for="(game_plant, index) in plants"
                :key="index"
                :class="[active_plant===game_plant.value?'btn-blue':'btn-plain']"
                @click="choose_platform(game_plant.value)"
            >{{game_plant.label}}</button>
            <button style="margin-left:40px;" class="btn-blue" @click="addWash">添加洗码规则</button>
        </div>
        <div class="table">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row,idx}">
                    <td style="height:30px">{{idx+1}}</td>
                    <td>{{row.bet}}</td>

                    <td v-for="(item,index) in row.percent_data" :key="index">{{item.percent}}%</td>
                    <td>
                        <button class="btn-blue" @click="editWashModal(row,idx)">编辑</button>
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
        <Dialog :show.sync="show_modal" :title="dia_title">
            <div class="dia-inner">
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
                                    <i @click="getBetListFirst" class="iconfont iconsousuo ml-10"></i>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <span>打码额度:</span>
                                    <Input class="w100 ml-10" v-model="wash_form.code_numbers[1]" />
                                </div>
                            </td>
                            <td>
                                <div v-if="is_edit">
                                    <span>打码额度:</span>
                                    <Input class="w100 ml-10" v-model="wash_form.code_numbers[2]" />
                                    <i @click="getBetListLast" class="iconfont iconsousuo ml-10"></i>
                                </div>
                            </td>
                        </tr>
                        <tr class="vip-data" v-for="(item,index) in lev_list" :key="index">
                            <td  >
                                <span>{{item.name}}:</span>
                                <span
                                    class="ml-10"
                                >{{wash_list[index] && wash_list[index].percent}}%</span>
                            </td>
                            <td class="table-data">
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
                            <td class="table-data" v-if="is_edit">
                                <div class="edit-form">
                                    <span>{{item.name}}:</span>
                                    <span
                                        class="ml-10"
                                    >{{wash_list_back[index] && wash_list_back[index].percent }}%</span>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <div style="margin-top:50px;text-align:center;">
                        <button class="btn-plain-large mr" @click="show_modal=false">取消</button>
                        <button class="btn-blue-large" @click="diaCfm()">保存</button>
                    </div>
                </div>
            </div>
        </Dialog>
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
    name: "WashSetting",
    data() {
        return {
            games: [],
            active_game: "tarot",
            // game_plant: 0,
            active_plant: "KY",
            plants: [],
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
            lev_list: [],
            wash_list: [],
            wash_list_back: [],
            dia_status: "",
            curr_row: {},
            row_id: {},
            gameTypeData: [],
            dia_title:'',
        };
    },

    methods: {
        gameVendorData() {
            let gameVendors = [];
            let { url, method } = this.$api.game_search_condition_list;
            this.$http({ url, method }).then(res => {
                // console.log('厂商数据',res)
                if (res && res.code == "200") {
                    for (var j = 0; j < res.data.gameVendors.length; j++) {
                        gameVendors.push(res.data.gameVendors[j]);
                    }
                }
                this.plants = this.backToVendorData(gameVendors);
            });
        },
        backToVendorData(list = []) {
            let all = [];
            let back_list = list.map(item => {
                return { label: item.name, value: item.sign };
            });
            return all.concat(back_list);
        },
        getTypeData() {
            let gameTypes = [];
            let { url, method } = this.$api.game_search_condition_list;
            this.$http({ method, url }).then(res => {
                // console.log("返回数据：", res);
                if (res && res.code == "200") {
                    for (var i = 0; i < res.data.gameTypes.length; i++) {
                        gameTypes.push(res.data.gameTypes[i]);
                    }
                    this.games = this.backToTypeData(gameTypes);
                }
            });
        },
        backToTypeData(list = []) {
            let all = [];
            let back_list = list.map(item => {
                return { label: item.name, value: item.sign };
            });
            return all.concat(back_list);
        },
        getLevList() {
            let { method, url } = this.$api.grade_list;
            this.$http({ method, url }).then(res => {
                // console.log("等级数据", res);
                if (res && res.code == "200") {
                    this.lev_list = res.data.data;
                }
            });
        },
        actSort(sign) {
            console.log("类型标识", sign);
            this.active_game = sign;
            this.getList();
        },
        choose_platform(sign) {
            console.log("平台标识", sign);
            this.active_plant = sign;
            this.getList();
        },
        initWash() {
            this.wash_form = {
                code_numbers: [],
                rate: []
            };
            this.wash_list = [];
            this.wash_list_back = [];
        },
        //放大镜功能 查找  第一个
        getBetListFirst() {
            let firstBetList = [];
            let search = this.wash_form.code_numbers[0];
            if (search == "") {
                this.wash_list = [];
            }
            for (let i = 0; i < this.list.length; i++) {
                if (search == this.list[i].bet) {
                    firstBetList = this.list[i].percent_data;
                }
            }
            if (firstBetList) {
                this.wash_list = firstBetList;
            }
        },
        //最后一个
        getBetListLast() {
            let lastBetList = [];
            let search = this.wash_form.code_numbers[2];
            if (search == "") {
                this.wash_list_back = [];
            }
            for (let i = 0; i < this.list.length; i++) {
                if (search == this.list[i].bet) {
                    lastBetList = this.list[i].percent_data;
                }
            }
            if (lastBetList) {
                this.wash_list_back = lastBetList;
            }
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
            this.dia_title='添加洗码规则'
            this.show_modal = true;
            this.is_edit = false;
            this.dia_status = "add";
            let last = {};
            if (this.list.length === 0) {
                last = {};
                this.wash_form.code_numbers[0] = "";
            } else {
                last = (this.list || [])[this.list.length - 1];
                this.wash_form.code_numbers[0] = this.list[
                    this.list.length - 1
                ].bet;
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
                game_type_sign: this.active_game,
                game_vendor_sign: this.active_plant,
                bet: String(this.wash_form.code_numbers[1]),
                percent: JSON.stringify(percent)
            };
            // console.log('请求数据',data)
            let { method, url } = this.$api.wash_code_add;
            this.$http({ method, url, data }).then(res => {
                // console.log('返回数据',res)
                if (res && res.code == "200") {
                    this.show_modal = false;
                    this.$toast.success(res && res.message);
                    this.getList();
                }
            });
        },
        editWashModal(row, idx) {
            // console.log('row',row)
            this.initWash();
            this.dia_title='编辑';
            this.show_modal = true;
            this.is_edit = true;
            this.dia_status = "edit";
            this.row_id = row;
            //获取列表本条洗码率
            let editPercent = row.percent_data;
            let editWash = [];
            for (let i = 0; i < editPercent.length; i++) {
                editWash = editPercent[i].percent;
                this.wash_form.rate.push(editWash);
            }
            //获取本条打码量
            this.wash_form.code_numbers[1] = row.bet;

            //获取上一条打码数据
            let frontWash = {};
            if (idx < 1) {
                this.wash_form.code_numbers[0] = "";
                frontWash = [];
            } else {
                this.wash_form.code_numbers[0] = this.list[idx - 1].bet;
                frontWash = (this.list || [])[idx - 1];
            }
            if (frontWash && frontWash.percent_data) {
                this.wash_list = frontWash.percent_data;
            }
            //获取下一条数据
            let lastWash = {};
            if (idx == this.list.length - 1) {
                this.wash_form.code_numbers[2] = "";
                lastWash = [];
            } else {
                this.wash_form.code_numbers[2] = this.list[idx + 1].bet;
                lastWash = (this.list || [])[idx + 1];
            }
            if (lastWash && lastWash.percent_data) {
                this.wash_list_back = lastWash.percent_data;
            }
        },
        editCfm() {
            let percent = {};
            for (let i = 0; i < this.lev_list.length; i++) {
                let item = this.lev_list[i];
                percent[item.experience_max] = this.wash_form.rate[i];
            }
            let data = {
                id: this.row_id.id,
                game_type_id: this.active_game,
                game_vendor_id: this.active_plant,
                bet: String(this.wash_form.code_numbers[1]),
                percent: JSON.stringify(percent)
            };
            // console.log('请求数据',data)
            let { method, url } = this.$api.wash_code_set;
            this.$http({ method, url, data }).then(res => {
                if (res && res.code == "200") {
                    this.show_modal = false;
                    this.$toast.success(res.message);
                    this.getList();
                }
            });
        },
        delWashModal(row) {
            // console.log(row);
            this.show_del_modal = true;
            this.curr_row = row;
        },

        delConfirm() {
            let data = {
                id: this.curr_row.id
            };
            // console.log('请求数据',data)
            let { method, url } = this.$api.wash_code_del;
            this.$http({ method, url, data }).then(res => {
                // console.log('返回数据',res)
                if (res && res.code == "200") {
                    this.show_del_modal = false;
                    this.$toast.success(res && res.message);
                    this.getList();
                }
            });
        },
        getList() {
            let datas = {
                game_type: this.active_game,
                game_vendor: this.active_plant,
                page: this.pageNo,
                pageSize: this.pageSize
            };
            console.log("请求数据", datas);
            let data = window.all.tool.rmEmpty(datas);
            let { method, url } = this.$api.wash_code_list;
            this.$http({ method: method, url: url, data: data }).then(res => {
                console.log("res", res);
                if (res && res.code == "200") {
                    this.list = res.data;
                    this.total = res.data.length;
                    // { label: '编号' }
                    let vip_list = [];
                    vip_list =
                        (res.data && res.data[0] && res.data[0].percent_data) ||
                        [];
                    let vip_head = vip_list.map(item => {
                        return item.grade_name;
                    });
                    this.headers = Array.concat(
                        ["编号", "打码量"],
                        vip_head,
                        "操作"
                    );
                }
            });
        },
        updateNo(val) {
            this.getList();
        },
        updateSize(val) {
            this.pageNo = 1;
            this.getList();
        }
    },
    mounted() {
        this.getList();
        this.getLevList();
        this.getTypeData();
        this.gameVendorData();
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
/* g-modal-mask  --在index.html区域中 */
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
    text-align: unset;
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
.table-data div{
    margin-left: 10px;
}

</style>