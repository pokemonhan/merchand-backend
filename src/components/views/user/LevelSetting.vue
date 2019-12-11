<template>
    <div class="container">
        <!-- 会员列表 -->

        <div>
            <button class="btn-blue" @click="levModShow('add')">添加等级</button>
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
                        <span class="a" @click="levModShow('edit')">编辑</span>
                        <span class="a" @click="showDeleteModal(row)">删除</span>
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
        <div class="modal-mask" v-if="show_lev_modal">
            <div class="v-modal lev-mod">
                <div class="mod-head">
                    <span>{{lev_modal_name}}</span>
                    <i class="iconfont iconcuowuguanbi-" @click="show_lev_modal=false"></i>
                </div>
                <div class="mod-body center-box">
                    <ul class="form">
                        <li>
                            <span>等级名称</span>
                            <Input class="w200" v-model="lev.lev_name" />
                        </li>

                        <li>
                            <span>晋级经验:</span>
                            <Input class="w88" v-model="lev.up_experience[0]" />
                            <span style="margin:0 7px;">~</span>
                            <Input class="w88" v-model="lev.up_experience[1]" />
                        </li>
                        <li>
                            <span>晋升奖励:</span>
                            <Input class="w200" v-model="lev.up_bonus" />
                        </li>
                        <li>
                            <span>周奖励:</span>
                            <Input class="w200" v-model="lev.week_bonus" />
                        </li>
                        <li style="margin-top:30px;">
                            <button
                                style="margin-right:80px;"
                                class="btn-plain-large"
                                @click="show_lev_modal=false"
                            >取消</button>
                            <button class="btn-blue-large" @click="editModalSave">保存</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 晋级规则_模态框 -->
        <div class="modal-mask" v-if="show_rule_modal">
            <div class="v-modal rule-mod">
                <div class="mod-head">
                    <span>添加账号 详情</span>
                    <i class="iconfont iconcuowuguanbi-" @click="show_rule_modal=false"></i>
                </div>
                <div class="mod-body center-box">
                    <ul class="rule">
                        <li class="flex">
                            <span>晋级方式:</span>

                            <span style="margin-left:10px;" class="flex">
                                <Checkbox label="会员充值" v-model="rule.up_method[0]" @update="UpMethodHandle(0)" />
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
                                    dot
                                    label="充值+打码"
                                    v-model="rule.up_method[2]"
                                    @update="UpMethodHandle(2)"
                                />
                            </span>
                        </li>

                        <li>
                            <span>充值:</span>
                            <Input class="re-code" v-model="rule.recharge_code[0]" />
                            <span class="ml-10">+</span>
                            <span>打码</span>
                            <Input class="re-code" v-model="rule.recharge_code[1]" />
                            <span class="ml-10">=</span>
                            <span>1经验</span>
                        </li>
                        <li>
                            <span>充值金额:</span>
                            <Input class="w200 ml-10" v-model="rule.recharge" />
                            <span class="ml-10">=</span>
                            <span>1经验</span>
                        </li>
                        <li>
                            <span>充值金额:</span>
                            <Input class="w200 ml-10" v-model="rule.code" />
                            <span class="ml-10">=</span>
                            <span>1经验</span>
                        </li>
                    </ul>
                    <div style="margin-top:50px;text-align:center;">
                        <button class="btn-plain-large mr100" @click="show_rule_modal=false">取消</button>
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
            @close="show_del_modal=false"
            @confirm="delConfirm"
        ></Modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            game_plant: '2',
            game_plant_option: [
                { label: '全部', value: '2' },
                { label: '甲', value: '3' }
            ],
            user_id: '',
            headers: [
                { label: '编号' },
                { label: '等级称号' },
                { label: '晋级条件' },
                { label: '晋级彩金' },
                { label: '周奖励' },
                { label: '修改时间' },
                { label: '操作' }
            ],
            list: [
                {
                    a: '1',
                    b: 'VIP1',
                    c: '0 ~ 1000',
                    d: '----',
                    e: '2019/12/15 12:12:00'
                },
                {
                    a: '1',
                    b: 'VIP1',
                    c: '0 ~ 1000',
                    d: '----',
                    e: '2019/12/15 12:12:00'
                },
                {
                    a: '1',
                    b: 'VIP1',
                    c: '0 ~ 1000',
                    d: '----',
                    e: '2019/12/15 12:12:00'
                },
                {
                    a: '1',
                    b: 'VIP1',
                    c: '0 ~ 1000',
                    d: '----',
                    e: '2019/12/15 12:12:00'
                },
                {
                    a: '1',
                    b: 'VIP1',
                    c: '0 ~ 1000',
                    d: '----',
                    e: '2019/12/15 12:12:00'
                },
                {
                    a: '1',
                    b: 'VIP1',
                    c: '0 ~ 1000',
                    d: '----',
                    e: '2019/12/15 12:12:00'
                },
                {
                    a: '1',
                    b: 'VIP1',
                    c: '0 ~ 1000',
                    d: '----',
                    e: '2019/12/15 12:12:00'
                },
                {
                    a: '1',
                    b: 'VIP1',
                    c: '0 ~ 1000',
                    d: '----',
                    e: '2019/12/15 12:12:00'
                },
                {
                    a: '1',
                    b: 'VIP1',
                    c: '0 ~ 1000',
                    d: '----',
                    e: '2019/12/15 12:12:00'
                },
                {
                    a: '1',
                    b: 'VIP1',
                    c: '0 ~ 1000',
                    d: '----',
                    e: '2019/12/15 12:12:00'
                }
            ],
            total: 0,
            pageNo: 1,
            pageSize: 25,
            //晋级方式

            up_method: '',
            up_method_opt: [
                { label: '充值', value: 1 },
                { label: '打码量', value: 2 }
            ],
            show_lev_modal: false, // 添加编辑等级 _模态框
            lev_modal_name: '', // 添加编辑等级 _模态框
            show_rule_modal: false, // 晋级规则_模态框
            /* ----------  form ------------ */
            lev: {
                lev_name: '', // 等级名称
                up_experience: [], // 晋级经验
                up_bonus: '', // 晋升奖励
                week_bonus: '' // 周奖励
            },
            rule: {
                up_method: [0, 0, 0],
                recharge_code: [],
                recharge: '',
                code: ''
            },
            /* 删除 */
            show_del_modal: false
        }
    },
    methods: {
        updateNo(val) {},
        updateSize(val) {},
        levModShow(status) {
            this.show_lev_modal = true
            this.lev_modal_name = status === 'add' ? '添加等级' : '编辑等级'
            if (status === 'add') {
                this.lev = {
                    lev_name: '', // 等级名称
                    up_experience: '', // 晋级经验
                    up_bonus: '', // 晋升奖励
                    week_bonus: '' // 周奖励
                }
            }
        },
        UpMethodHandle(val) {
            // 0.充值会员, 1.会员打码 2.充值+打码
            switch (val) {
                case 0:
                    this.rule.up_method[2] = false
                    break
                case 1:
                    this.rule.up_method[2] = false
                    break
                case 2:
                    this.rule.up_method[0] = false
                    this.rule.up_method[1] = false
                default:
                    console.log('val: ', val)
                    break
            }
            this.rule.up_method = this.rule.up_method
            this.rule = Object.assign({}, this.rule)
        },
        showDeleteModal(row) {
            // console.log(row);
            this.show_del_modal = true
        },
        editModalSave() {},
        delConfirm() {
            // console.log("我删除了.");
        }
    },
    mounted() {}
}
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
/* 公共区 .v-modal 在App.vue 区域中 */

.lev-mod {
    width: 700px;
    height: 380px;
}
.rule-mod {
    width: 700px;
    height: 380px;
}
/* .modal-mask .iconcuowuguanbi- {
    position: absolute;
    right: 12px;
    top: 12px;
    font-size: 35px;
    color: #4c8bfd;
}

.modal-mask .iconcuowuguanbi-:hover {
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