<template>
    <div class="container">
        <!-- 全域设置 -->
        <div class="head-set">
            <div class="set-label">设置选项:</div>
            <button
                :class="['mt20',curr_set_btn===item.id?'btn-blue':'btn-plain']"
                v-for="(item, index) in set_btns"
                :key="index"
                @click="setChange(item)"
            >{{item.name}}</button>
        </div>
        <div>
            <div class="set-cont">
                <span>设置内容:</span>
                <button class="btn-blue-large mr20">重置</button>
            </div>
            <div class="set_conment">
                <ul v-for="(item,index) in childs" :key="index" class="form">
                    <li>
                        <div class="li-left">
                            <span>{{item.name}}:</span>
                            <Input v-model="form.content" v-if="item.editable_type.indexOf('1')!=-1" />
                            <div  v-if="item.editable_type.indexOf('1')!=-1" >
                                <i class="orange iconfont iconjinggao1- ml5"></i>
                                <i class="green iconfont iconchenggong- ml5"></i>
                            </div>
                            <button v-if="item.editable_type.indexOf('1')!=-1" class="btn-blue">保存</button>
                            <span v-if="item.editable_type.indexOf('2')!=-1" class="textCfm">是否开启:</span>
                            <Switchbox
                                v-model="form.status"
                                v-if="item.editable_type.indexOf('2')!=-1"
                                class="switchchoose"
                            />
                            <!-- <div  v-if="item.editable_type.indexOf('2')!=-1" >
                                <i class="orange iconfont iconjinggao1- ml5"></i>
                                <i class="green iconfont iconchenggong- ml5"></i>
                            </div> -->
                            <Select v-model="form.select_type" :options="type_opt" v-if="item.editable_type.indexOf('3')!=-1" />
                            <div  v-if="item.editable_type.indexOf('3')!=-1" >
                                <i class="orange iconfont iconjinggao1- ml5"></i>
                                <i class="green iconfont iconchenggong- ml5"></i>
                            </div>
                            <button v-if="item.editable_type.indexOf('3')!=-1" class="btn-blue">保存</button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "AllAreaSet",
    data() {
        return {
            set_btns: [],
            curr_set_btn: 3,
            type_opt: [
                { label: "全部", value: "" },
                { label: "VIP1", value: 0 },
                { label: "VIP2", value: 1 },
                { label: "VIP3", value: 2 }
            ],
            form:{
                content:'',
                status:'',
                select_type:'',
            },
            list: [],
            childs: []
        };
    },
    methods: {
        setChange(item) {
            if (!item) return;
            console.log("item", item);
            this.curr_set_btn = item.id;
            this.childs = item.childs;
            // console.log("childs", this.childs);
            
        },
        getTitleList() {
            let { method, url } = this.$api.allarea_set_list;
            this.$http({ method, url }).then(res => {
                console.log("返回数据", res);
                if (res && res.code == "200") {
                    this.set_btns = res.data || [];
                    let firstBtn = this.set_btns[0];
                    this.setChange(firstBtn);
                }
            });
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