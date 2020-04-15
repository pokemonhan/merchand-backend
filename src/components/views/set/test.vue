<template>
    <div>
        <ul v-if="curr_set_btn==3" class="form">
            <li>
                <div class="li-left">
                    <span>登录密码错误限制次数:</span>
                    <Input v-model="login_set.aa" />
                    <i class="orange iconfont iconjinggao1- ml5"></i>
                    <i class="green iconfont iconchenggong- ml5"></i>
                    <button class="ml5 btns-blue">保存</button>
                </div>
            </li>
        </ul>

        <!----------- 游戏设定 ---------->
        <ul v-if="curr_set_btn==6" class="form">
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
        <ul v-if="curr_set_btn==16" class="form">
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
        <ul v-if="curr_set_btn==23" class="form">
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
    </div>
</template>