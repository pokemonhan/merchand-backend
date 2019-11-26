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
                :class="active_plant===index?'btn-blue':'btn-plain'"
                v-for="(game_plant, index) in plants"
                :key="index"
                @click="active_plant=index"
            >{{game_plant}}</button>
            <button style="margin-left:40px;" class="btn-blue" @click="addWash">添加洗码规则</button>
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
                    <td>{{row.f}}</td>
                    <td>{{row.g}}</td>
                    <td>{{row.h}}</td>
                    <td>
                        <span class="a" @click="showWashModal(row)">编辑</span>
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
        <div class="modal-mask" v-if="edit_modal">
            <div class="v-modal">
                <div @click="edit_modal=false">
                    <i class="iconfont iconcuowuguanbi-"></i>
                </div>
                <div class="center-box">
                    <ul class="form">
                        <li>
                            <span class="title1">打码额度</span>
                            <span class="title2">奖励比例</span>
                        </li>
                        <li>
                            <span>VIP1:</span>
                            <Input class="w100" limit="number" v-model="wash_form.vip1.num" />
                            <Input class="w100" limit="number" v-model="wash_form.vip1.bonust" />
                        </li>
                        <li>
                            <span>VIP2:</span>
                            <Input class="w100" limit="number" v-model="wash_form.vip2.num" />
                            <Input class="w100" limit="number" v-model="wash_form.vip2.bonus" />
                        </li>
                        <li>
                            <span>VIP3:</span>
                            <Input class="w100" limit="number" v-model="wash_form.vip3.num" />
                            <Input class="w100" limit="number" v-model="wash_form.vip3.bonus" />
                        </li>
                        <li>
                            <span>VIP4:</span>
                            <Input class="w100" limit="number" v-model="wash_form.vip4.num" />
                            <Input class="w100" limit="number" v-model="wash_form.vip4.bonus" />
                        </li>
                        <li>
                            <span>VIP5:</span>
                            <Input class="w100" limit="number" v-model="wash_form.vip5.num" />
                            <Input class="w100" limit="number" v-model="wash_form.vip5.bonus" />
                        </li>
                        <li>
                            <span>VIP6:</span>
                            <Input class="w100" limit="number" v-model="wash_form.vip6.num" />
                            <Input class="w100" limit="number" v-model="wash_form.vip6.bonus" />
                        </li>
                        <li>
                            <span>VIP7:</span>
                            <Input class="w100" limit="number" v-model="wash_form.vip7.num" />
                            <Input class="w100" limit="number" v-model="wash_form.vip7.bonus" />
                        </li>
                       
                    </ul>
                    <div style="margin-top:50px;text-align:center;">
                        <button class="btn-plain-large mr" @click="edit_modal=false">取消</button>
                        <button class="btn-blue-large" @click="editModalSave">保存</button>
                    </div>
                </div>
            </div>
        </div>
        <Modal
            :show="show_del_modal"
            title="删除等级"
            content="是否删除该打码记录"
            @cancel="show_del_modal=false"
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

            game_plant: 0,
            active_plant: 0,
            plants: ["开元棋牌", "龙城棋牌", "财神棋牌", "欢乐棋牌"],
            game_plant_option: [
                { label: "全部", value: "2" },
                { label: "甲", value: "3" }
            ],
            user_id: "",
            headers: [
                { label: "编号" },
                { label: "打码量范围" },
                { label: "VIP1" },
                { label: "VIP2" },
                { label: "VIP3" },
                { label: "VIP4" },
                { label: "VIP5" },
                { label: "VIP6" },
                { label: "VIP7" },
                { label: "操作" },
            ],
            list: [
                { a: "1", b: "1000", c: "0.8%", d: "0.8%", e: "0.8%", f: "0.8%", g: "0.8%", h: "0.8%", i: "0.8%", },
              
            ],
            total: 0,
            pagerCount: 0,
            //晋级方式
            up_method: "",
            up_method_opt: [
                { label: "充值", value: 1 },
                { label: "打码量", value: 2 }
            ],
            edit_modal: false,
            /* ----------  wash_form ------------ */
            wash_form:{
                'vip1':{ num: '', bonus: '' },
                'vip2':{ num: '', bonus: '' },
                'vip3':{ num: '', bonus: '' },
                'vip4':{ num: '', bonus: '' },
                'vip5':{ num: '', bonus: '' },
                'vip6':{ num: '', bonus: '' },
                'vip7':{ num: '', bonus: '' },
            },
            /* 删除 */
            show_del_modal: false
        };
    },
    methods: {
        actSort(index) {
            this.active_game = index;
        },
        addWash(){
            this.edit_modal = true;
        },
        updateNo(val) {},
        updateSize(val) {},
        showWashModal(row) {
            this.edit_modal = true;
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
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}
.sort > span {
    padding: 4px 12px;
    cursor:pointer;
    /* border: 1px solid #000; */
    transition: all .3s;
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
    border: none;
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
.v-modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 800px;
    height: 550px;
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
.form .title1,
.form .title2{
    color: #48f;
    padding: 0 10px;
}
.form .title1{
    margin-left: 60px;
    margin-right: 65px;
}
.form >li:not(:first-child) >span:first-child{
    margin-right: 10px;
}
.form > li > .w100 {
    margin-right: 52px;
}
.w100 {
    width: 100px;
}
.center-box {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}
.mr {
    margin-right: 100px;
}
</style>