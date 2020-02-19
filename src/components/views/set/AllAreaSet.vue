<template>
    <div class="container">
        <!-- 全域设置 -->
        <div class="head-set">
            <div class="set-label">设置选项:</div>
            <button
                :class="['mt20',item.value===curr_set_btn?'btn-blue':'btn-plain']"
                v-for="(item, index) in set_btns"
                :key="index"
                @click="setChange(item)"
            >{{item.label}}</button>
        </div>
        <div>
            <div class="set-cont">
                <span>设置内容:</span>
                <button class="btn-blue-large mr20">重置</button>
            </div>

            <!------------ 注册登录设定 ---------->
            <ul v-if="curr_set_btn===1" class="form">
                <li>
                    <div class="li-left">
                        <span>登录密码错误限制次数:</span>
                        <Input v-model="login_set.aa" />
                        <i class="orange iconfont iconjinggao1- ml5"></i>
                        <i class="green iconfont iconchenggong- ml5"></i>
                        <button class="ml5 btns-blue">保存</button>
                    </div>
                    <div class="li-right">
                        <span>注册邀请邀请码:</span>
                        <Switchbox v-model="login_set.status" />
                        <i class="orange iconfont iconjinggao1- ml5"></i>
                        <i class="green iconfont iconchenggong- ml5"></i>
                        <button class="ml5 btns-blue">保存</button>
                    </div>
                </li>
            </ul>

            <!----------- 游戏设定 ---------->
            <ul v-if="curr_set_btn===2" class="form">
                <li>
                    <div class="li-left">
                        <span>系统维护总开关:</span>
                        <span style="width:200px;">
                            <Switchbox v-model="game_set.status" />
                        </span>
                        <i class="orange iconfont iconjinggao1- ml5"></i>
                        <i class="green iconfont iconchenggong- ml5"></i>
                        <button class="ml5 btns-blue">保存</button>
                    </div>
                    <div class="li-right">
                        <span>是否开启洗码:</span>
                        <Switchbox style="width:200px;" v-model="game_set.status" />
                        <i class="orange iconfont iconjinggao1- ml5"></i>
                        <i class="green iconfont iconchenggong- ml5"></i>
                        <button class="ml5 btns-blue">保存</button>
                    </div>
                </li>
                <li>
                    <div class="li-left">
                        <span>聊天室用户等级:</span>
                        <Select v-model="game_set.aa" :options="chat_lev_opt"></Select>
                        <i class="orange iconfont iconjinggao1- ml5"></i>
                        <i class="green iconfont iconchenggong- ml5"></i>
                        <button class="ml5 btns-blue">保存</button>
                    </div>
                    <div class="li-right">
                        <span>最低充值多少才能游戏:</span>
                        <Switchbox style="width:200px;" v-model="game_set.status" />
                        <i class="orange iconfont iconjinggao1- ml5"></i>
                        <i class="green iconfont iconchenggong- ml5"></i>
                        <button class="ml5 btns-blue">保存</button>
                    </div>
                </li>
                <li>
                    <div class="li-left">
                        <span>取款密码错误限制次数:</span>
                        <Input v-model="game_set.aa" />
                        <i class="orange iconfont iconjinggao1- ml5"></i>
                        <i class="green iconfont iconchenggong- ml5"></i>
                        <button class="ml5 btns-blue">保存</button>
                    </div>
                    <div class="li-right">
                        <span>推广分享地址:</span>
                        <Input v-model="game_set.aa" />
                        <i class="orange iconfont iconjinggao1- ml5"></i>
                        <i class="green iconfont iconchenggong- ml5"></i>
                        <button class="ml5 btns-blue">保存</button>
                    </div>
                </li>
                <li>
                    <div class="li-left">
                        <span>下载域名地址:</span>
                        <Input v-model="game_set.aa" />
                        <i class="orange iconfont iconjinggao1- ml5"></i>
                        <i class="green iconfont iconchenggong- ml5"></i>
                        <button class="ml5 btns-blue">保存</button>
                    </div>
                    <div class="li-right">
                        <span>APP大厅顶部域名配置:</span>
                        <Input v-model="game_set.aa" />
                        <i class="orange iconfont iconjinggao1- ml5"></i>
                        <i class="green iconfont iconchenggong- ml5"></i>
                        <button class="ml5 btns-blue">保存</button>
                    </div>
                </li>
                <li>
                    <div class="li-left">
                        <span>输金额:</span>
                        <Input class="mr10" v-model="game_set.aa" />
                        <span>=1 积分</span>
                        <i class="orange iconfont iconjinggao1- ml5"></i>
                        <i class="green iconfont iconchenggong- ml5"></i>
                        <button class="ml5 btns-blue">保存</button>
                    </div>
                </li>
            </ul>

            <!---------- 活动金额限制设定---------->
            <ul v-if="curr_set_btn===3" class="form">
                <li>
                    <div class="li-left">
                        <span>注册送活动最高金额限制:</span>
                        <Input v-model="active_limit_set.aa" />
                        <i class="orange iconfont iconjinggao1- ml5"></i>
                        <i class="green iconfont iconchenggong- ml5"></i>
                        <button class="ml5 btns-blue">保存</button>
                    </div>
                    <div class="li-right">
                        <span class="mr10">是否开启:</span>
                        <Switchbox v-model="active_limit_set.status" />
                        <i class="orange iconfont iconjinggao1- ml5"></i>
                        <i class="green iconfont iconchenggong- ml5"></i>
                        <button class="ml5 btns-blue">保存</button>
                    </div>
                </li>
                <li>
                    <div class="li-left">
                        <span>签到活动最高金额限制:</span>
                        <Input v-model="active_limit_set.aa" />
                        <i class="orange iconfont iconjinggao1- ml5"></i>
                        <i class="green iconfont iconchenggong- ml5"></i>
                        <button class="ml5 btns-blue">保存</button>
                    </div>
                    <div class="li-right">
                        <span class="mr10">是否开启:</span>
                        <Switchbox v-model="active_limit_set.status" />
                        <i class="orange iconfont iconjinggao1- ml5"></i>
                        <i class="green iconfont iconchenggong- ml5"></i>
                        <button class="ml5 btns-blue">保存</button>
                    </div>
                </li>
                <li>
                    <div class="li-left">
                        <span>首充送最高金额限制:</span>
                        <Input v-model="active_limit_set.aa" />
                        <i class="orange iconfont iconjinggao1- ml5"></i>
                        <i class="green iconfont iconchenggong- ml5"></i>
                        <button class="ml5 btns-blue">保存</button>
                    </div>
                    <div class="li-right">
                        <span class="mr10">是否开启:</span>
                        <Switchbox v-model="active_limit_set.status" />
                        <i class="orange iconfont iconjinggao1- ml5"></i>
                        <i class="green iconfont iconchenggong- ml5"></i>
                        <button class="ml5 btns-blue">保存</button>
                    </div>
                </li>
                <li>
                    <div class="li-left">
                        <span>抢红包最高金额限制:</span>
                        <Input v-model="active_limit_set.aa" />
                        <i class="orange iconfont iconjinggao1- ml5"></i>
                        <i class="green iconfont iconchenggong- ml5"></i>
                        <button class="ml5 btns-blue">保存</button>
                    </div>
                    <div class="li-right">
                        <span class="mr10">是否开启:</span>
                        <Switchbox v-model="active_limit_set.status" />
                        <i class="orange iconfont iconjinggao1- ml5"></i>
                        <i class="green iconfont iconchenggong- ml5"></i>
                        <button class="ml5 btns-blue">保存</button>
                    </div>
                </li>
                <li>
                    <div class="li-left">
                        <span>有奖竞猜最高金额限制:</span>
                        <Input v-model="active_limit_set.aa" />
                        <i class="orange iconfont iconjinggao1- ml5"></i>
                        <i class="green iconfont iconchenggong- ml5"></i>
                        <button class="ml5 btns-blue">保存</button>
                    </div>
                    <div class="li-right">
                        <span class="mr10">是否开启:</span>
                        <Switchbox v-model="active_limit_set.status" />
                        <i class="orange iconfont iconjinggao1- ml5"></i>
                        <i class="green iconfont iconchenggong- ml5"></i>
                        <button class="ml5 btns-blue">保存</button>
                    </div>
                </li>
                <li>
                    <div class="li-left">
                        <span>转盘活动最高金额限制:</span>
                        <Input v-model="active_limit_set.aa" />
                        <i class="orange iconfont iconjinggao1- ml5"></i>
                        <i class="green iconfont iconchenggong- ml5"></i>
                        <button class="ml5 btns-blue">保存</button>
                    </div>
                    <div class="li-right">
                        <span class="mr10">是否开启:</span>
                        <Switchbox v-model="active_limit_set.status" />
                        <i class="orange iconfont iconjinggao1- ml5"></i>
                        <i class="green iconfont iconchenggong- ml5"></i>
                        <button class="ml5 btns-blue">保存</button>
                    </div>
                </li>
            </ul>

            <!---------- 出入款设定---------->
            <ul v-if="curr_set_btn===4" class="form">
                <li>
                    <div class="li-left">
                        <span>出款手续费 (%):</span>
                        <Input v-model="payment_form.aa" />
                        <i class="orange iconfont iconjinggao1- ml5"></i>
                        <i class="green iconfont iconchenggong- ml5"></i>
                        <button class="ml5 btns-blue">保存</button>
                    </div>
                    <div class="li-right">
                        <span>每次出款免手续费笔数:</span>
                        <Input v-model="payment_form.aaa" />
                        <i class="orange iconfont iconjinggao1- ml5"></i>
                        <i class="green iconfont iconchenggong- ml5"></i>
                        <button class="ml5 btns-blue">保存</button>
                    </div>
                </li>
                <li>
                    <div class="li-left">
                        <span>每次出款最低金额:</span>
                        <Input v-model="payment_form.aa" />
                        <i class="orange iconfont iconjinggao1- ml5"></i>
                        <i class="green iconfont iconchenggong- ml5"></i>
                        <button class="ml5 btns-blue">保存</button>
                    </div>
                    <div class="li-right">
                        <span>每次出款最高金额:</span>
                        <Input v-model="payment_form.aaa" />
                        <i class="orange iconfont iconjinggao1- ml5"></i>
                        <i class="green iconfont iconchenggong- ml5"></i>
                        <button class="ml5 btns-blue">保存</button>
                    </div>
                </li>
                <li>
                    <div class="li-left">
                        <span>每日出款金额限制:</span>
                        <Input v-model="payment_form.aa" />
                        <i class="orange iconfont iconjinggao1- ml5"></i>
                        <i class="green iconfont iconchenggong- ml5"></i>
                        <button class="ml5 btns-blue">保存</button>
                    </div>
                    <div class="li-right">
                        <span>每日出款次数限制:</span>
                        <Input v-model="payment_form.aaa" />
                        <i class="orange iconfont iconjinggao1- ml5"></i>
                        <i class="green iconfont iconchenggong- ml5"></i>
                        <button class="ml5 btns-blue">保存</button>
                    </div>
                </li>
                <li>
                    <div class="li-left">
                        <span>出款手续费最大金额:</span>
                        <Input v-model="payment_form.aa" />
                        <i class="orange iconfont iconjinggao1- ml5"></i>
                        <i class="green iconfont iconchenggong- ml5"></i>
                        <button class="ml5 btns-blue">保存</button>
                    </div>
                    <div class="li-right">
                        <span>入款稽核倍数:</span>
                        <Input v-model="payment_form.aaa" />
                        <i class="orange iconfont iconjinggao1- ml5"></i>
                        <i class="green iconfont iconchenggong- ml5"></i>
                        <button class="ml5 btns-blue">保存</button>
                    </div>
                </li>
                <li>
                    <div class="li-left">
                        <span>活动稽核倍数:</span>
                        <Input v-model="payment_form.aa" />
                        <i class="orange iconfont iconjinggao1- ml5"></i>
                        <i class="green iconfont iconchenggong- ml5"></i>
                        <button class="ml5 btns-blue">保存</button>
                    </div>
                    <div class="li-right">
                        <span>稽核不足出款手续费（%）:</span>
                        <Input v-model="payment_form.aaa" />
                        <i class="orange iconfont iconjinggao1- ml5"></i>
                        <i class="green iconfont iconchenggong- ml5"></i>
                        <button class="ml5 btns-blue">保存</button>
                    </div>
                </li>
                <li>
                    <div class="li-left">
                        <span>稽核不足限制出款:</span>
                        <Checkbox style="width:200px;margin:0;" v-model="payment_form.status" />
                        <i class="orange iconfont iconjinggao1- ml5"></i>
                        <i class="green iconfont iconchenggong- ml5"></i>
                        <button class="ml5 btns-blue">保存</button>
                    </div>
                    <div class="li-right">
                        <span>人工充值最高金额限制:</span>
                        <Input v-model="payment_form.aaa" />
                        <i class="orange iconfont iconjinggao1- ml5"></i>
                        <i class="green iconfont iconchenggong- ml5"></i>
                        <button class="ml5 btns-blue">保存</button>
                    </div>
                </li>
                <li>
                    <div class="li-left">
                        <span>新绑银行卡多少小时能出款:</span>
                        <Input v-model="payment_form.aa" />
                        <i class="orange iconfont iconjinggao1- ml5"></i>
                        <i class="green iconfont iconchenggong- ml5"></i>
                        <button class="ml5 btns-blue">保存</button>
                    </div>
                    <!-- <div class="li-right">
                        <span>出款密码错误限制:??</span>
                        <Input v-model="payment_form.aaa" />
                    </div>-->
                </li>
            </ul>
            <!-- <div class="flex-center mt20">
                <button class="btn-plain-large">重置</button>
                <button class="btn-blue-large ml50">保存</button>
            </div> -->
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            set_btns: [
                { label: '注册登录设定', value: 1 },
                { label: '游戏设定', value: 2 },
                { label: '金额限制设定', value: 3 },
                { label: '出入款设定', value: 4 }
            ],
            curr_set_btn: 1,

            // 注册登录设定
            login_set: {
                aa: '',
                status: true
            },
            // 游戏设定
            game_set: {
                aa: '', // 临时这样, 建议后台数据一致
                status: true
            },
            // 活动金额限制设定
            active_limit_set: {
                aa: '',
                status: true,
            },
            // 出入款设定
            payment_form: {
                aa: '',
                status: false
            },

            //
            chat_lev_opt: [
                { label: '全部', value: '' },
                { label: 'VIP1', value: 0 },
                { label: 'VIP2', value: 0 },
                { label: 'VIP3', value: 0 }
            ]
        }
    },
    methods: {
        setChange(item) {
            this.curr_set_btn = item.value
        }
    },
    mounted() {}
}
</script>

<style scoped>
.head-set {
    background: #f2f2f2;
    padding: 20px 10px 20px 10px;
}
.set-label {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 800;
}
.set-cont {
    margin-top: 20px;
    margin-left: 10px;
    display: flex;
    justify-content: space-between;
}
.form > li {
    display: flex;
    margin-top: 20px;
    /* border: 1px solid #000; */
}
.form > li > div {
    display: flex;
    align-items: center;
}
.form > li > div .v-input,
.form > li > div .v-select {
    /* width: 150px; */
    width: 200px;
}
.form > li .li-left {
    /* border: 1px solid #000; */
    min-width: 450px;
}
.form .li-left > span:first-child,
.form .li-right > span:first-child {
    min-width: 200px;
    margin-right: 10px;
    text-align: right;
}
.flex-center {
    display: flex;
    justify-content: center;
}
</style>