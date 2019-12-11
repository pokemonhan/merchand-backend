<template>
    <div class="container">
        <!---------------------   短信推送   ------------------>
        <QuickQuery :date="quick_query" @update="qqUpd" />
        <div class="filter p10">
            <ul class="left">
                <li>
                    <span>发送时间</span>
                    <Input class="w100" v-model="filter.dates[0]" />
                    <span style="margin: 0 5px;">~</span>
                    <Input class="w100" v-model="filter.dates[1]" />
                </li>
                <li>
                    <button class="btn-blue">查询</button>
                    <button class="btn-red" @click="clearFilter">清空</button>
                    <button class="btn-blue" @click="add_show=true">添加</button>
                </li>
            </ul>
            <div class="right">
                <span class="remaining-sms">剩余短信: {{'1000'}}条</span>
            </div>
        </div>
        <div class="table">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row}">
                    <td>{{row.a1}}</td>
                    <td>{{row.a2}}</td>
                    <td>{{row.a3}}</td>
                    <td>
                        <span class="a" @click="detail(row)">发送详情</span>
                        <span class="a" @click="del(row)">删除</span>
                    </td>
                </template>
            </Table>
        </div>

        <!--  添加  -->
        <Dialog :show.sync="add_show" title="添加邮件">
            <div class="dia-inner">
                <div>
                    <ul class="form">
                        <li>
                            <span>发送用户</span>
                            <div>
                                <div class="radio-1">
                                    <Radio
                                        class="radio-left"
                                        label="VIP等级"
                                        :value="form.user"
                                        val="lev"
                                        v-model="form.user"
                                        @update="radioUpdate"
                                    />
                                    <Radio
                                        class="radio-center"
                                        label="指定会员"
                                        :value="form.user"
                                        val="point"
                                        v-model="form.user"
                                        @update="radioUpdate"
                                    />
                                    <Radio
                                        class="radio-right"
                                        label="全部会员"
                                        :value="form.user"
                                        val="all"
                                        v-model="form.user"
                                        @update="radioUpdate"
                                    />
                                </div>
                                <div class="radio-2">
                                    <Radio
                                        class="radio-left"
                                        label="会员活跃"
                                        :value="form.user"
                                        val="active"
                                        v-model="form.user"
                                        @update="radioUpdate"
                                    />
                                    <Radio
                                        class="radio-center"
                                        label="标签选择"
                                        :value="form.user"
                                        val="tab"
                                        v-model="form.user"
                                        @update="radioUpdate"
                                    />
                                </div>
                            </div>
                        </li>
                        <!-- VIP等级 radio -->
                        <li v-if="form.user==='lev'">
                            <span>等级选择</span>
                            <div>
                                <div
                                    :class="[tab_box_show?'lev-input-active':'lev-input']"
                                    v-clickoutside="closeTabbox"
                                    @click="showTabBox"
                                >
                                    <span style="color:#fff">:</span>
                                    <span v-for="(item, index) in form.lev" :key="index">
                                        <span v-if="item" class="lit-tab" >{{['VIP1','VIP2','VIP3', 'VIP4','VIP5','VIP6','VIP7'][index]}}</span>
                                    </span>
                                    <div v-if="tab_box_show" class="tab-checkbox">
                                       <div class="flex">
                                            <Checkbox label="VIP1" v-model="form.lev[0]" />
                                            <Checkbox label="VIP2" v-model="form.lev[1]" />
                                            <Checkbox label="VIP3" v-model="form.lev[2]" />
                                            <Checkbox label="VIP4" v-model="form.lev[3]" />
                                       </div>
                                       <div class="flex mt10">
                                            <Checkbox label="VIP5" v-model="form.lev[4]" />
                                            <Checkbox label="VIP6" v-model="form.lev[5]" />
                                            <Checkbox label="VIP7" v-model="form.lev[6]" />
                                       </div>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <!-- 指定会员 radio -->
                        <li v-if="form.user==='point'">
                            <span>账号ID</span>
                            <textarea class="acc-id textarea" v-model="form.point"></textarea>
                        </li>
                        <!-- 活跃会员 radio-->
                        <li v-if="form.user==='active'">
                            <span></span>
                            <Select
                                style="width:250px;"
                                v-model="form.active"
                                :options="active_opt"
                            ></Select>
                        </li>
                        <!-- 标签选择 radio -->
                        <li v-if="form.user==='tab'">
                            <span>标签选择</span>
                            <div>
                                <div
                                    :class="[tab_box_show?'tab-input-active':'tab-input']"
                                    v-clickoutside="closeTabbox"
                                    @click="showTabBox"
                                >
                                    <span style="color:#fff">:</span>
                                    <span class="tabs" v-for="(item, index) in form.tab" :key="index">
                                        <span v-if="item" class="lit-tab" >{{['一般会员','黄金会员','钻石会员'][index]}}</span>
                                    </span>
                                    <div v-if="tab_box_show" class="tab-checkbox flex">
                                        <Checkbox label="一般会员" v-model="form.tab[0]" />
                                        <Checkbox label="黄金会员" v-model="form.tab[1]" />
                                        <Checkbox label="钻石会员" v-model="form.tab[2]" />
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li>
                            <span>短信内容</span>
                            <textarea class="sms-cont textarea"></textarea>
                        </li>
                        <li>
                            <span>发送方式</span>
                            <div>
                                <div class="send-radio">
                                    <Radio
                                        label="定时发送"
                                        :value="form.send_method"
                                        val="time"
                                        v-model="form.send_method"
                                    />
                                    <Radio
                                        class="ml25"
                                        label="立即发送"
                                        :value="form.send_method"
                                        val="now"
                                        v-model="form.send_method"
                                    />
                                </div>
                                <div v-if="form.send_method==='time'" class="send-date">
                                    <Date
                                        style="width:250px;"
                                        type="datetime"
                                        v-model="form.date"
                                        @update="dateUpd"
                                    />
                                </div>
                            </div>
                        </li>
                        <li style="margin-top:50px;">
                            <div class="center-box">
                                <button class="btn-blue-large">确定</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </Dialog>

        <!-- dialog 详情 -->
        <Dialog :show.sync="detail_show" title="发送详情">
            <div class="dia-inner">
                <SmsPushDetail />
            </div>
        </Dialog>

        <!--------  删除确认 -------->
        <Modal
            :show.sync="mod_show"
            title="删除短信"
            content="是否删除该短信推送"
            @cancel="mod_show=false"
            @confirm="modConf"
        ></Modal>
    </div>
</template>


<script>
import SmsPushDetail from './SmsPushDetail'
export default {
    components: {
        SmsPushDetail: SmsPushDetail
    },
    data() {
        return {
            quick_query: [],
            filter: {
                dates: []
            },
            headers: ['内容', '发送状态', '发送时间', '操作'],
            list: [
                { a1: 'sdfdssd fds ', a2: '1', a3: '2019-02-03' },
                { a1: 'sdfdssd fds ', a2: '1', a3: '2019-02-03' }
            ],
            add_show: true,

            tab_box_show: false,
            // 详情
            detail_show: false,
            form: {
                user: 'lev',
                lev: [],
                point: '',
                active: '1',
                tab: [],
                send_method: 'time',
                date: ''
            },
            active_opt: [
                { label: '近一天登录会员', value: '1' },
                { label: '近三天登录会员', value: '2' },
                { label: '近一周登录会员', value: '3' },
                { label: '近一月登录会员', value: '4' },
                { label: '近半年登录会员', value: '5' }
            ],
            del_row: {},
            mod_show: false
        }
    },
    methods: {
        qqUpd(dates) {
            //同步时间筛选值
            this.filter.dates = dates
            this.filter = Object.assign(this.filter)
        },
        timeUpdate() {
            //同步快捷查询按钮状态
            this.quick_query = this.filter.dates
        },
        clearFilter() {
            this.filter = { dates: [] }
        },
        detail() {
            this.detail_show = true
        },
        del(row) {
            this.del_row = row
            this.mod_show = true
        },
        closeTabbox() {
            this.tab_box_show = false
        },
        showTabBox() {
            this.tab_box_show = true
        },
        // 发送用户改变
        radioUpdate() {},
        modConf() {},
        dateUpd(val) {
            // console.log('val: ', val);
            // console.log('form', this.form)
        }
    },
    mounted() {}
}
</script>

<style scoped>
.p10 {
    padding: 10px;
}
.remaining-sms {
    padding: 4px 8px;
    color: #4c8bfd;
    background: #fff;
    border-radius: 5px;
}
.table {
    margin-top: 20px;
}
.dia-inner {
    position: relative;
    left: 170px;
    width: 700px;
    min-height: 400px;
    /* display: flex; */
    /* justify-content: center; */
    /* align-items: center; */
}
.form > li {
    display: flex;
    align-items: baseline;
    margin-top: 20px;
}
.form > li span:first-child {
    width: 80px;
}

.radio-1,
.radio-2 {
    display: flex;
}
.radio-1 .v-radio:not(:first-child),
.radio-2 .v-radio:not(:first-child) {
    margin-left: 20px;
}
.radio-2 {
    margin-top: 20px;
}

.w250 {
    width: 250px;
}
.acc-id,
.sms-cont {
    width: 250px;
    height: 110px;
}
.lev-input,
.tab-input {
    position: relative;
    padding: 4px;
    min-width: 250px;
    /* height: 30px; */
    line-height: 30px;
    padding-left: 10px;
    font-size: 12px;
    border-radius: 5px;
    border: 1px solid #ddd;
    cursor: pointer;
}
.lev-input-active,
.tab-input-active {
    position: relative;
    min-width: 250px;
    /* height: 30px; */
    line-height: 30px;
    padding: 4px;
    padding-left: 10px;
    margin-bottom: 30px;
    font-size: 12px;
    border-radius: 5px;
    border: 1px solid #4c8bfd;
}
.lit-tab {
    padding: 2px 6px;
    margin-right: 10px;
    border-radius: 5px;
    color: #666;
    background: #eef1f7;
}

.tab-checkbox {
    position: absolute;
    left: 0;
    top: 38px;
    width: 250px;
    padding: 12px 6px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background: #fff;
}
.ml25 {
    margin-left: 25px;
}
.send-radio {
    display: flex;
}
.send-date {
    margin-top: 20px;
}
.center-box {
    margin-left: 130px;
    /* width: 100%; */
    /* display: flex;
    justify-content: center; */
}
.flex {
    display: flex;
}
.mt10 {
    margin-top: 10px;
}
</style>
