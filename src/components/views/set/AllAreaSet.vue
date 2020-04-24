<template>
    <div class="container">
        <!-- 全域设置 -->
        <div class="head-set">
            <div class="set-label">设置选项:</div>
            <button
                :class="['mt20',curr_row.id===item.id?'btn-blue':'btn-plain']"
                v-for="(item, index) in set_btns"
                :key="index"
                @click="setChange(item)"
            >{{item.name}}</button>
        </div>
        <div>
            <div class="set-cont">
                <span>设置内容:</span>
                <button
                    v-if="button_show==37"
                    class="btn-blue-large mr20"
                    @click="cashBackShow"
                >返利说明</button>
                <button class="btn-blue-large mr20" @click="reset(res_set)">重置</button>
            </div>
            <div class="set_conment">
                <ul v-for="(item,index) in childs" :key="index" class="form">
                    <li>
                        <div class="li-left">
                            <!-- 名称 -->
                            <span>{{item.name}}:</span>
                            <!-- 输入框 -->
                            <Input v-model="item.value" v-if="item.editable_type.indexOf('1')!=-1" />
                            <div v-if="item.editable_type.indexOf('1')!=-1">
                                <i class="orange iconfont iconjinggao1- ml5"></i>
                                <i
                                    v-show="iconSaved[isTrue]"
                                    class="green iconfont iconchenggong- ml5"
                                ></i>
                            </div>
                            <button
                                v-if="item.editable_type.indexOf('1')!=-1"
                                class="btn-blue"
                                @click="save(item)"
                            >保存</button>
                            <!-- 开关按钮 -->
                            <span v-if="item.editable_type.indexOf('2')!=-1" class="textCfm">是否开启:</span>
                            <Switchbox
                                v-model="item.status"
                                v-if="item.editable_type.indexOf('2')!=-1"
                                class="switchchoose"
                            />
                            <div v-if="item.editable_type.indexOf('2')!=-1">
                                <i class="orange iconfont iconjinggao1- ml5"></i>
                                <i class="green iconfont iconchenggong- ml5"></i>
                            </div>
                            <button
                                v-if="item.editable_type.indexOf('2')!=-1"
                                class="btn-blue"
                                @click="saveSwitch(item)"
                            >保存</button>
                            <!-- 下拉框 -->
                            <Select
                                v-model="item.value"
                                :options="type_opt"
                                v-if="item.editable_type.indexOf('3')!=-1"
                            />
                            <div v-if="item.editable_type.indexOf('3')!=-1">
                                <i class="orange iconfont iconjinggao1- ml5"></i>
                                <i class="green iconfont iconchenggong- ml5"></i>
                            </div>
                            <button
                                v-if="item.editable_type.indexOf('3')!=-1"
                                class="btn-blue"
                                @click="seleSave(item)"
                            >保存</button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <Dialog :show.sync="cash_show" :title="cash_title">
            <div style="width:500px">
                <ul>
                    <li>1、本平台的推广采用的是三级返利模式，每个推广员最多获得下线三级的返利。</li>
                    <li>2、推广员的收益是下线玩家每天总输的额度。</li>
                    <li>3、玩家总输额度的计算：玩家每天凌晨00：00点金额-玩家当天00：59点的金额总数；为负数就是玩家当天输的总额，为正数则是玩家当天赢的金额；在计算当天的金额时中途充值、活动获得金额、或者其他金额不计算在内，这些金额在第二天才计算在内。</li>
                    <li>4、推广员获得返利计算：输的总额*（一级返利百分比+二级返利百分比+三级返利百分比）=推广员获得佣金。</li>
                    <li>5、三级返利总和百分比不超过5%，二级返利不能大于一级返利，三级返利不能大于一级和二级的返利。</li>
                </ul>
            </div>
        </Dialog>
    </div>
</template>
<script>
export default {
    name: "AllAreaSet",
    data() {
        return {
            set_btns: [],
            curr_row: {},
            type_opt: [
                { label: "全部", value: "" },
                { label: "VIP1", value: "0" },
                { label: "VIP2", value: "1" },
                { label: "VIP3", value: "2" }
            ],
            form: {
                content: "",
                status: "",
                select_type: ""
            },
            list: [],
            childs: [],
            isFirst: true,
            iconSaved: {},
            isSaved: "",
            //保存图片显示变量
            isTrue: "",
            button_show: "",
            cash_show: false,
            cash_title: "",
            res_set: []
        };
    },
    methods: {
        //重置功能
        reset(res_set) {
            this.getTitleList();
        },
        //点击设置选项按钮  item为最大所有列表
        setChange(item) {
            if (!item) return;
            // console.log("item", item);
            this.curr_row = item;
            this.childs = item.childs;
            this.button_show = item.id;
            // console.log("childs", this.childs);
        },
        //获取列表
        getTitleList() {
            let { method, url } = this.$api.allarea_set_list;
            this.$http({ method, url }).then(res => {
                console.log("返回数据", res);
                if (res && res.code == "200") {
                    this.set_btns = res.data || [];
                    this.res_set = res.data || [];
                    //判断第一次进入
                    if (this.isFirst) {
                        let firstBtn = this.set_btns[0];
                        this.setChange(firstBtn);
                        this.isFirst = false;
                    } else {
                        // let  curr_item=res.data.find(item=>this.curr_row.id===item.id)
                        let curr_item = {};
                        for (var i = 0; i < res.data.length; i++) {
                            // curr_item=res.data[i].id
                            let item = res.data[i];
                            if (this.curr_row.id === item.id) {
                                curr_item = item;
                            }
                        }
                        // console.log('发音',curr_item)
                        this.setChange(curr_item);
                    }
                }
            });
        },
        //input保存  item为列表下的childs
        save(item) {
            let datas = {
                sign: item.sign,
                key: "value",
                value: item.value
            };

            // console.log('item1111',item)
            // console.log('请求数据',datas)
            let data = window.all.tool.rmEmpty(datas);
            let { method, url } = this.$api.allarea_set_save;
            this.$http({ method, url, data }).then(res => {
                if (res && res.code == "200") {
                    this.$toast.success(res.message);
                    this.getTitleList();
                    //显示已保存图标
                    this.iconSaved = item;
                    this.iconSaved.sign = true;
                    this.isTrue = "sign";
                    this.iconSaved[this.isTrue] = true;
                    console.log("11111", this.iconSaved[this.isTrue]);
                }
            });
        },
        //按钮保存
        saveSwitch(item) {
            let datas = {
                sign: item.sign,
                key: "status",
                value: String(item.status ? 1 : 0)
            };
            let data = window.all.tool.rmEmpty(datas);
            let { method, url } = this.$api.allarea_set_save;
            this.$http({ method, url, data }).then(res => {
                // console.log('返回数据',res)
                if (res && res.code == "200") {
                    this.$toast.success(res.message);
                    this.getTitleList();
                }
            });
        },
        //下拉框保存  item为列表下的childs
        seleSave(item) {
            let datas = {
                sign: item.sign,
                key: "value",
                value: item.value
            };
            // console.log('item1111',item)
            // console.log('请求数据',datas)
            let data = window.all.tool.rmEmpty(datas);
            let { method, url } = this.$api.allarea_set_save;
            this.$http({ method, url, data }).then(res => {
                if (res && res.code == "200") {
                    this.$toast.success(res.message);
                    this.getTitleList();
                }
            });
        },
        //返利说明
        cashBackShow() {
            this.cash_show = true;
            this.cash_title = "返利说明";
        }
    },
    mounted() {
        this.getTitleList();
    }
};
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
    font-weight: bold;
    font-size: 14px;
    margin-top: 20px;
    margin-left: 10px;
    display: flex;
    justify-content: space-between;
}

.form {
    display: inline-block;
    text-align: center;
    min-width: 500px;
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
    width: 180px;
}
.form > li > div .v-switch {
    width: 100px;
}
.form > li .li-left {
    /* border: 1px solid #000; */
    min-width: 450px;
}
.form .li-left > span:first-child {
    font-size: 12px;
    font-weight: bold;
    min-width: 170px;
    margin-right: 10px;
    text-align: right;
}
.textCfm {
    width: 60px;
    font-weight: bold;
    margin-left: 20px;
}
.switchchoose {
    width: 30px;
    transform: scale(0.7);
}
</style>