<template>
    <div class="container">
        <!-- 会员列表 -->

        <div>
            <button class="btn-blue" @click="addLev">添加等级</button>
            <button class="btn-blue" @click="levRule">晋级规则</button>
        </div>

        <div class="table">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row,idx}">
                    <td style="height:30px">{{idx+1}}</td>
                    <td>{{row.name}}</td>
                    <td>{{row.experience_min}}~{{row.experience_max}}</td>
                    <td>{{row.promotion_gift}}</td>
                    <td>{{row.weekly_gift}}</td>
                    <td>{{row.updated_at}}</td>
                    <td>
                        <button class="btn-blue" @click="editLev(row)">编辑</button>
                        <button class="btn-red" @click="delLev(row)">删除</button>
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
        <!-- <div class="g-modal-mask" v-if="show_lev_modal">
            <div class="g-v-modal lev-mod">
                <div class="mod-head">
                    <span>{{lev_modal_name}}</span>
                    <i class="iconfont iconcuowuguanbi-" @click="show_lev_modal=false"></i>
                </div>
                
            </div>
        </div>-->
        <Dialog :show.sync="show_lev_modal" :title="lev_modal_name">
            <div class="lev-mod">
                <div class="mod-body center-box">
                    <ul class="form">
                        <li>
                            <span>等级名称</span>
                            <Input
                                class="w200"
                                v-model="lev.name"
                                errmsg="等级名称已存在"
                                :showerr="errNameShow(lev.name)"
                            />
                        </li>

                        <li>
                            <span>晋级经验:</span>
                            <Input
                                class="w88"
                                v-model="lev.experience_min"
                                :errmsg="dia_err"
                                :showerr="errExpShow(lev.experience_min,lev.experience_max)"
                                limit="number"
                            />
                            <span style="margin:0 7px;">~</span>
                            <Input class="w88" v-model="lev.experience_max" limit="number" />
                        </li>
                        <li>
                            <span>晋级奖励:</span>
                            <Input class="w200" v-model="lev.promotion_gift" limit="number" />
                        </li>
                        <li>
                            <span>周奖励:</span>
                            <Input class="w200" v-model="lev.weekly_gift" limit="number" />
                        </li>
                        <li style="margin-top:30px;">
                            <button
                                style="margin-right:80px;"
                                class="btn-plain-large"
                                @click="show_lev_modal=false"
                            >取消</button>
                            <button class="btn-blue-large" @click="diaCfm">保存</button>
                        </li>
                    </ul>
                </div>
            </div>
        </Dialog>
        <Dialog :show.sync="show_lev_rule" title="晋级规则">
            <div class="inner rule-mod">
                <div class="mod-body center-box">
                    <ul class="rule">
                        <li class="flex">
                            <span>晋级方式:</span>
                            <span style="margin-left:10px;" class="flex">
                                <Checkbox
                                    label="会员充值"
                                    v-model="rule.up_method[0]"
                                    @update="UpMethodHandle(0)"
                                />
                            </span>
                            <span style="margin-left:10px;" class="flex">
                                <Checkbox
                                    label="会员打码"
                                    v-model="rule.up_method[1]"
                                    @update="UpMethodHandle(1)"
                                />
                            </span>
                            <span style="margin-left:10px;" class="flex">
                                <Checkbox
                                    label="充值+打码"
                                    v-model="rule.up_method[2]"
                                    @update="UpMethodHandle(2)"
                                />
                            </span>
                        </li>
                        <li v-if="this.rule.up_method[2]==true">
                            <span>充值:</span>
                            <Input class="re-code" v-model="rule.recharge" />
                            <span class="ml-10">+</span>
                            <span>打码</span>
                            <Input class="re-code" v-model="rule.code" />
                            <span class="ml-10">=</span>
                            <span>1经验</span>
                        </li>
                        <li v-if="this.rule.up_method[0]==true">
                            <span>充值金额:</span>
                            <Input class="w200 ml-10" v-model="rule.recharge" />
                            <span class="ml-10">=</span>
                            <span>1经验</span>
                        </li>
                        <li v-if="this.rule.up_method[1]==true">
                            <span>会员打码:</span>
                            <Input class="w200 ml-10" v-model="rule.code" />
                            <span class="ml-10">=</span>
                            <span>1经验</span>
                        </li>
                    </ul>
                    <div style="margin-top:50px;text-align:center;">
                        <button class="btn-plain-large mr100" @click="show_lev_rule=false">取消</button>
                        <button class="btn-blue-large" @click="levRuleCfm">保存</button>
                    </div>
                </div>
            </div>
        </Dialog>
        <Modal
            :show="show_del_modal"
            title="删除等级"
            content="是否删除该玩家等级"
            @cancel="show_del_modal=false"
            @close="show_del_modal=false"
            @confirm="delConfirm"
        ></Modal>
    </div>
</template>

<script>
export default {
    name: "LevelSetting",
    data() {
        return {
            game_plant: "2",
            game_plant_option: [
                { label: "全部", value: "2" },
                { label: "甲", value: "3" }
            ],
            user_id: "",
            headers: [
                "编号",
                "等级称号",
                "晋级经验",
                "晋级彩金",
                "周奖励",
                "修改时间",
                "操作"
            ],
            list: [],
            exList: [],
            total: 0,
            pageNo: 1,
            pageSize: 25,
            dia_err: "",
            //晋级方式

            up_method: "",
            up_method_opt: [
                { label: "充值", value: 1 },
                { label: "打码量", value: 2 }
            ],
            show_lev_modal: false, // 添加编辑等级 _模态框
            lev_modal_name: "", // 添加编辑等级 _模态框
            show_lev_rule: false, // 晋级规则_模态框
            /* ----------  form ------------ */
            lev: {
                name: "", // 等级名称
                experience_min: "",
                experience_max: "",
                promotion_gift: "", // 晋升奖励
                weekly_gift: "" // 周奖励
            },
            rule: {
                up_method: [],
                recharge: "",
                code: ""
            },
            /* 删除 */
            show_del_modal: false,
            curr_row: {},
            rise_type: "",
            testList: []
        };
    },
    methods: {
        getLevName(list = []) {
            let levName = [];
            for (var i = 0; i < list.length; i++) {
                levName.push(list[i].name);
            }
            // console.log("名字", levName);
            this.exList = levName;
        },
        errNameShow(val) {
            if (this.dia_status === "addLev") {
                if (!val) return false;
                for (var i = 0; i < this.exList.length; i++) {
                    if (val == this.exList[i]) {
                        return true;
                    }
                }
            }
            //如果是编辑 判断除本条以外的名字是否重复
            if (this.dia_status === "editLev") {
                if (!val) return false;
                let thisName = this.curr_row.name;
                let nameIndex = -1;
                for (var j = 0; j < this.exList.length; j++) {
                    if (this.exList[j] === thisName) {
                        nameIndex = j;
                    }
                }
                if (nameIndex > -1) {
                    this.exList.splice(nameIndex, 1);
                }
                for (var k = 0; k < this.exList.length; k++) {
                    if (val == this.exList[k]) {
                        return true;
                    }
                }
            }
        },
        errExpShow(min, max) {
            if (this.dia_status === "addLev") {
                if (
                    parseInt(min) <
                    parseInt(
                        this.testList[this.testList.length - 1].experience_max
                    )
                ) {
                    this.dia_err = "区间已存在";
                    return true;
                }
            }
            if (!min && !max) return false;
            if (parseInt(min) > parseInt(max)) {
                this.dia_err = "数据错误";
                return true;
            }
        },
        updateNo(val) {
            this.getList();
        },
        updateSize(val) {
            this.pageNo = 1;
            this.getList();
        },
        diaCfm() {
            if (this.dia_status === "addLev") {
                this.addCfm();
            }
            if (this.dia_status === "editLev") {
                this.editCfm();
            }
        },
        initLev() {
            // console.log("initial");
            this.lev = {
                name: "", // 等级名称
                experience_min: "",
                experience_max: "",
                promotion_gift: "", // 晋升奖励
                weekly_gift: "" // 周奖励
            };
        },
        checkLev() {
            if (this.dia_status !== "editLev") {
                for (var i = 0; i < this.exList.length; i++) {
                    if (this.exList[i] == this.lev.name) {
                        this.$toast.warning("等级名称已存在");
                        return false;
                    }
                }
            }
            if (this.lev.name === "") {
                this.$toast.warning("等级名称不可为空");
                return false;
            }
            if (this.lev.experience_min === "") {
                this.$toast.warning("最小晋级经验不能为空");
                return false;
            }
            if (this.lev.experience_max === "") {
                this.$toast.warning("最大晋级经验不能为空");
                return false;
            }
            if (this.lev.promotion_gift === "") {
                this.$toast.warning("晋级奖励不能为空");
                return false;
            }
            if (this.lev.weekly_gift == "") {
                this.$toast.warning("周奖励不能为空");
                return false;
            }
            if (this.lev.experience_min > this.lev.experience_max) {
                this.$toast.warning("最小晋级经验不能大于最大晋级经验");
                return false;
            }
            return true;
        },

        addLev() {
            this.initLev();
            this.lev_modal_name = "添加等级";
            this.dia_status = "addLev";
            this.show_lev_modal = true;
        },
        addCfm() {
            if (!this.checkLev()) return;
            // console.log("lev", this.lev);
            let data = {
                name: this.lev.name,
                experience_min: this.lev.experience_min,
                experience_max: this.lev.experience_max,
                promotion_gift: this.lev.promotion_gift,
                weekly_gift: this.lev.weekly_gift
            };
            let { url, method } = this.$api.grade_add;
            this.$http({ method, url, data }).then(res => {
                if (res && res.code) {
                    this.$toast.success(res && res.message);
                    this.show_lev_modal = false;
                    this.getList();
                } else {
                    if (res && res.message !== "") {
                    }
                }
            });
        },
        editLev(row) {
            this.lev_modal_name = "编辑详情";
            this.dia_status = "editLev";
            this.show_lev_modal = true;
            this.curr_row = row;
            this.lev = {
                id: row.id,
                name: row.name,
                experience_min: String(row.experience_min),
                experience_max: String(row.experience_max),
                promotion_gift: row.promotion_gift,
                weekly_gift: row.weekly_gift
            };
        },
        editCfm() {
            let data = {
                id: this.lev.id,
                name: this.lev.name,
                experience_min: this.lev.experience_min,
                experience_max: this.lev.experience_max,
                promotion_gift: this.lev.promotion_gift,
                weekly_gift: this.lev.weekly_gift
            };
            let { url, method } = this.$api.grade_set;
            this.$http({ method, url, data }).then(res => {
                if (res && res.code === "200") {
                    this.$toast.success(res && res.message);
                    this.show_lev_modal = false;
                    this.getList();
                } else {
                    if (res && res.message !== "") {
                        this.$toast.error(res.message);
                    }
                }
            });
        },
        UpMethodHandle(val) {
            // 0.充值会员, 1.会员打码 2.充值+打码
            switch (val) {
                case 0:
                    this.rule.up_method[2] = false;
                    break;
                case 1:
                    this.rule.up_method[2] = false;
                    break;
                case 2:
                    this.rule.up_method[0] = false;
                    this.rule.up_method[1] = false;
                default:
                    // console.log('val: ', val)
                    break;
            }
            this.rule.up_method = this.rule.up_method;
            this.rule = Object.assign({}, this.rule);
        },
        delLev(row) {
            // console.log(row);
            this.show_del_modal = true;
            this.curr_row = row;
        },
        delConfirm() {
            let data = {
                id: this.curr_row.id
            };
            // console.log(data);
            let { url, method } = this.$api.grade_del;
            this.$http({ method, url, data }).then(res => {
                if (res && res.code === "200") {
                    this.$toast.success(res && res.message);
                    this.show_del_modal = false;
                    this.getList();
                }
            });
        },
        levRule() {
            this.show_lev_rule = true;
            this.clearRule();
        },
        // 1.充值  2.打码  3.充值或打码任一满足  4.充值和打码同时满足
        clearRule() {
            this.rule = {
                up_method: [],
                recharge: "",
                code: ""
            };
        },
        levRuleCfm() {
            if (this.rule.up_method[0] && this.rule.up_method[1]) {
                this.rise_type = 3;
            } else if (this.rule.up_method[0]) {
                this.rise_type = 1;
            } else if (this.rule.up_method[1]) {
                this.rise_type = 2;
            } else if (this.rule.up_method[2]) {
                this.rise_type = 4;
            } else {
                this.rise_type = 0;
            }
            let datas = {
                recharge: this.rule.recharge,
                bet: this.rule.code,
                type: this.rise_type
            };
            let data = window.all.tool.rmEmpty(datas);
            let { method, url } = this.$api.grade_config_list;
            this.$http({ method, url, data }).then(res => {
                if (res && res.code == "200") {
                    this.$toast.success(res && res.message);
                    this.show_lev_rule = false;
                    this.getList();
                }
            });
        },
        getList() {
            let datas = {
                page: this.pageNo,
                pageSize: this.pageSize
            };
            let data = window.all.tool.rmEmpty(datas);
            let { method, url } = this.$api.grade_list;
            this.$http({ method, url, data }).then(res => {
                // console.log("返回数据", res);
                if (res && res.code == "200") {
                    this.list = res.data.data;
                    this.total = res.data.total;
                    this.testList = res.data.data;
                    this.getLevName(res.data.data);
                }
            });
        }
    },
    mounted() {
        this.getList();
    }
};
</script>

<style scoped>
/* container 公共区 */
/* .container {
    padding: 20px 8px 20px 8px;
    background: #fff;
    border-radius: 5px;
    border-top-left-radius: 0;
} */

.table {
    margin-top: 15px;
}
.page {
    margin-top: 30px;
    display: flex;
    justify-content: center;
}
/* 公共区 .g-v-modal 在App.vue 区域中 */

.lev-mod {
    width: 700px;
    height: 380px;
}
.rule-mod {
    width: 700px;
    height: 380px;
}
/* .g-modal-mask .iconcuowuguanbi- {
    position: absolute;
    right: 12px;
    top: 12px;
    font-size: 35px;
    color: #4c8bfd;
}

.g-modal-mask .iconcuowuguanbi-:hover {
    color: #749ff0;
    cursor: pointer;
} */

.form > li {
    display: flex;
    align-items: center;
    margin-top: 20px;
}
.form > li > span:first-child {
    min-width: 6em;
    /* font-weight: bolder; */
    /* margin-right: 8px; */
}
.w88 {
    width: 88px;
}
.w200 {
    width: 200px;
}
.center-box {
    /* height: 450px; */
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}
.mr100 {
    margin-right: 100px;
}
.ml-10 {
    margin-left: 10px;
}
.flex {
    display: flex;
}
/* .rule .input {
    width: 100px;
    border-radius: 5px;
    border: 1px solid #888;
    padding: 6px 8px;
} */
.rule {
    width: 360px;
    height: 100px;
}
.rule > li {
    display: flex;
    align-items: center;
    margin-top: 20px;
}
.rule > li:not(:first-child) > span:not(:first-child) {
    margin-left: 10px;
}
.rule > li .re-code {
    width: 80px;
    margin-left: 10px;
}
</style>