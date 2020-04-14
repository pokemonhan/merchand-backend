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
            <div class="set_conment" >
                <ul>
                    <li >

                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'AllAreaSet',
    data() {
        return {
            set_btns: [],
            curr_set_btn: 3,
            set_name:[],
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
                { label: 'VIP2', value: 1 },
                { label: 'VIP3', value: 2 }
            ],
            list:[],
        }
    },
    methods: {
        setChange(item) {
            this.curr_set_btn = item.id;
            console.log(item.id)
        },
        getTitleList(){
            let {method,url}=this.$api.allarea_set_list;
            this.$http({method,url}).then(res=>{
                console.log('返回数据',res)
                if(res && res.code=='200'){
                    this.set_btns=res.data
                }
            })
        },
    },
    mounted() {
        this.getTitleList();
    }
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