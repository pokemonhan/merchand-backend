<template>
    <div class="container">
        <!-- 会员列表 -->

        <div>
            <button class="btn-blue" @click="show_lev_modal=true">添加等级</button>
            <button class="btn-blue" @click="show_rule_modal=true">晋级规则</button>
        </div>

        <div class="table">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row}">
                    <td style="height:30px">{{row.b}}</td>
                    <td>{{row.a}}</td>
                    <td>{{row.b}}</td>
                    <td>{{row.c}}</td>
                    <td>{{row.d}}</td>
                    <td>{{row.e}}</td>
                    <td>
                        <span class="a" @click="showLevelEdit">编辑</span>
                        <span class="a" @click="showDeleteModal(row)">删除</span>
                    </td>
                </template>
            </Table>
            <Page
                class="page"
                :total="total"
                :pagerCount="pagerCount"
                @updateNo="updateNo"
                @updateSize="updateSize"
            />
        </div>
        <div class="modal-mask" v-if="show_lev_modal">
            <div class="v-modal">
                <div @click="show_lev_modal=false">
                    <i class="iconfont iconcuowuguanbi-"></i>
                </div>
                <div class="center-box">
                    <ul class="form">
                        <li>
                            <span>等级名称</span>
                            <Input class="w226" v-model="lev_name" />
                        </li>

                        <li>
                            <span>晋级经验:</span>
                            <Input class="w226" v-model="up_experience" />
                        </li>
                        <li>
                            <span>晋升奖励:</span>
                            <Input class="w226" v-model="up_bonus" />
                        </li>
                        <li>
                            <span>周奖励:</span>
                            <Input class="w226" v-model="week_bonus" />
                        </li>
                    </ul>
                    <div style="margin-top:50px;text-align:center;">
                        <button class="btn-plain-large mr100" @click="show_lev_modal=false">取消</button>
                        <button class="btn-blue-large" @click="editModalSave">保存</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-mask" v-if="show_rule_modal">
            <div class="v-modal">
                <div @click="show_rule_modal=false">
                    <i class="iconfont iconcuowuguanbi-"></i>
                </div>
                <div class="center-box">
                    <ul class="form rule">
                        <li class="flex">
                            <span>晋级方式</span>

                            <span class="flex">
                                <Checkbox label="会员充值" />
                            </span>
                            <span style="margin-left:30px;" class="flex">
                                <Checkbox label="会员打码" />
                            </span>
                        </li>

                        <li>
                            <span>经验值设定:</span>
                            <div class="experience flex">
                                <div class="col1">
                                    <div>
                                        <div> <input class="input" /> </div>
                                        <div>充值金额</div>
                                    </div>

                                    <div style="margin-top:30px;">
                                        <div> <input class="input" /> </div>
                                        <div>打码量</div>
                                    </div>
                                </div>
                                <div class="col2">
                                    <img src="../../../assets/image/user/arrow.png">
                                    <img src="../../../assets/image/user/arrow.png">
                                </div>
                                <div class="col3 experience-set">
                                    <div>
                                        <div>
                                            <input class="input" />
                                        </div>
                                        <div>经验值</div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div style="margin-top:50px;text-align:center;">
                        <button class="btn-plain-large mr100" @click="show_lev_modal=false">取消</button>
                        <button class="btn-blue-large" @click="editModalSave">保存</button>
                    </div>
                </div>
            </div>
        </div>
        <Modal
            :show="show_del_modal"
            title="删除等级"
            content="是否删除该玩家等级"
            @cancel="show_del_modal=false"
            @confirm="delConfirm"
        ></Modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            game_plant: "2",
            game_plant_option: [
                { label: "全部", value: "2" },
                { label: "甲", value: "3" }
            ],
            user_id: "",
            headers: [
                { label: "编号" },
                { label: "等级称号" },
                { label: "晋级条件" },
                { label: "晋级彩金" },
                { label: "周奖励" },
                { label: "修改时间" },
                { label: "操作" }
            ],
            list: [
                {
                    a: "1",
                    b: "VIP1",
                    c: "0 ~ 1000",
                    d: "----",
                    e: "2019/12/15 12:12:00"
                },
                {
                    a: "1",
                    b: "VIP1",
                    c: "0 ~ 1000",
                    d: "----",
                    e: "2019/12/15 12:12:00"
                },
                {
                    a: "1",
                    b: "VIP1",
                    c: "0 ~ 1000",
                    d: "----",
                    e: "2019/12/15 12:12:00"
                },
                {
                    a: "1",
                    b: "VIP1",
                    c: "0 ~ 1000",
                    d: "----",
                    e: "2019/12/15 12:12:00"
                },
                {
                    a: "1",
                    b: "VIP1",
                    c: "0 ~ 1000",
                    d: "----",
                    e: "2019/12/15 12:12:00"
                },
                {
                    a: "1",
                    b: "VIP1",
                    c: "0 ~ 1000",
                    d: "----",
                    e: "2019/12/15 12:12:00"
                },
                {
                    a: "1",
                    b: "VIP1",
                    c: "0 ~ 1000",
                    d: "----",
                    e: "2019/12/15 12:12:00"
                },
                {
                    a: "1",
                    b: "VIP1",
                    c: "0 ~ 1000",
                    d: "----",
                    e: "2019/12/15 12:12:00"
                },
                {
                    a: "1",
                    b: "VIP1",
                    c: "0 ~ 1000",
                    d: "----",
                    e: "2019/12/15 12:12:00"
                },
                {
                    a: "1",
                    b: "VIP1",
                    c: "0 ~ 1000",
                    d: "----",
                    e: "2019/12/15 12:12:00"
                }
            ],
            total: 0,
            pagerCount: 0,
            //晋级方式
            up_method: "",
            up_method_opt: [
                { label: "充值", value: 1 },
                { label: "打码量", value: 2 }
            ],
            show_lev_modal: false, // 添加编辑等级 _模态框
            show_rule_modal: true, // 晋级规则_模态框
            /* ----------  form ------------ */
            lev_name: "", // 等级名称
            exchange_a: "", // 额度转换a
            exchange_b: "", // 额度转换b
            up_experience: "", // 晋级经验
            up_bonus: "", // 晋升奖励
            week_bonus: "", // 周奖励
            /* 删除 */
            show_del_modal: false
        };
    },
    methods: {
        updateNo(val) {},
        updateSize(val) {},
        showLevelEdit() {
            this.show_lev_modal = true;
        },
        showDeleteModal(row) {
            console.log(row);
            this.show_del_modal = true;
        },
        editModalSave() {},
        delConfirm() {
            console.log("我删除了.");
        }
    },
    mounted() {}
};
</script>

<style scoped>
.container {
    padding: 20px 8px 20px 8px;
    background: #fff;
    border-radius: 5px;
    border-top-left-radius: 0;
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
.v-modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 700px;
    height: 400px;
    padding: 30px 50px;
    border-radius: 7px;
    background: #fff;
}
.modal-mask .iconcuowuguanbi- {
    position: absolute;
    right: 12px;
    top: 12px;
    font-size: 35px;
    color: #4c8bfd;
}

.modal-mask .iconcuowuguanbi-:hover {
    color: #749ff0;
    cursor: pointer;
}

.form > li {
    display: flex;
    align-items: center;
    margin-top: 20px;
}
.form > li > span:first-child {
    min-width: 6em;
    font-weight: bolder;
    /* margin-right: 8px; */
}

.center-box {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}
.mr100 {
    margin-right: 100px;
}
.flex {
    display: flex;
}
.rule .input {
    width: 100px;
    border-radius: 5px;
    border: 1px solid #888;
    padding: 6px 8px;
}
.rule .t-center {
    text-align: center;
}
.rule .experience {
    position: relative;
    text-align: center;
    margin-top: 30px;
}
.rule .experience .col2{
    margin-top: 22px;
}
.rule  .col2 img:first-child{
    transform: rotate(15deg)
}
.rule  .col2 img:nth-child(2){
    transform: rotate(-15deg)
}
.rule .experience .col3{
    position: absolute;
    top: 40px;
    left: 250px;
}
</style>