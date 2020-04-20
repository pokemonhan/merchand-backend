<template>
    <div class="container">
        <div class="filter p10">
            <ul class="left">
                <li>
                    <span>管理员</span>
                    <Input v-model="filter.vendor"/>
                </li>
                <li>
                    <span>IP搜索</span>
                    <Input v-model="filter.dataIP"/>
                </li>
                <li>
                    <span>日期选择</span>
                    <Date type="daterange" v-model="filter.dates" />
                    <!-- <span style="margin:0 5px;">~</span>
                    <Date v-model="filter.dates[1]" /> -->
                </li>
                <li>
                    <button class="btn-blue" @click="getList" >查询</button>
                </li>
                
            </ul>
        </div>
        <div>
            <ul class="opera-list">
                <li v-for="(item, index) in list" :key="index">
                    <span>{{'2分钟前'}}</span>
                    <div class="pic-cont">
                        <img
                            class="img"
                            src="../../../assets/image/set/operatRecord01.jpg"
                            alt="图片丢失"
                        />
                        <div :class="index!==4?'vertical-bar':''"></div>
                    </div>
                    <div class="opera-cont">
                        <div class="cont-left">
                            <div class="cont-title">{{'admin操作活动管理-抢红包'}}</div>
                            <div class="mt8">
                                <span>操作时间:</span>
                                <span>{{'2019/11/11 14:30:15'}}</span>
                            </div>
                        </div>
                        <div class="cont-right">
                            <button class="btn-blue" @click="detail">查看详情</button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <Dialog :show.sync="dia_show" title="操作详情">
            <div class="dia-inner">
                <ul>
                    <li>
                        <div class="bold-blue">操作设置</div>
                        <div class="mt8">修改抢红包金额</div>
                        <div class="mt8">修改抢红包VIP7特权倍数</div>
                    </li>
                    <li class="mt30">
                        <div class="bold-blue mt8">删除内容</div>
                        <div class="mt8">删除14:30抢红包活动</div>
                    </li>
                </ul>
            </div>
        </Dialog>
    </div>
</template>

<script>
export default {
    name: 'OperatRecord',
    // props: {
    //     id: {
    //         require: true,
    //         type: [String, Number]
    //     }
    // },
    data() {
        return {
            filter: {
                vendor: '',
                dataIP:'',
                dates: []
            },
            dia_show: false,
            list:{},
        }
    },
    methods: {
        detail() {
            this.dia_show = true
        },
        getList() {
            let createdAt='';
            if (this.filter.dates[0] && this.filter.dates[1]) {
                createdAt =JSON.stringify([
                    String(this.filter.dates[0]),
                    String(this.filter.dates[1])
                ]);
            }
            let datas={
                data_ip:this.filter.dataIP,
                admin_name:this.filter.vendor,
                created_at:createdAt,
            }
            console.log('请求数据',datas)
            let data=window.all.tool.rmEmpty(datas)
            let {method,url}=this.$api.operation_record_list
            this.$http({method,url,data}).then(res=>{
                console.log('返回数据',res)
                if(res && res.code=='200'){
                    this.list=res.data.data
                }
            })
        },
        // 计算时间间隔, 即显示 多久以前
        pastTime(val) {
            let past = new Date('2020-02-19 12:00:00')

            var time_interval = new Date() - past //计算时间间隔毫秒数
            var days = parseInt(time_interval / 1000 / 60 / 60 / 24, 10) //计算剩余的天数
            var hours = parseInt((time_interval / 1000 / 60 / 60) % 24, 10) //计算剩余的小时
            var minutes = parseInt((time_interval / 1000 / 60) % 60, 10) //计算剩余的分钟
            var seconds = parseInt((time_interval / 1000) % 60, 10) //计算剩余的秒数
            // days = checkTime(days)
            // hours = checkTime(hours)
            // minutes = checkTime(minutes)
            // seconds = checkTime(seconds)
            let past_time =
                days + '天' + hours + '小时' + minutes + '分' + seconds + '秒'
            console.log('pastTime: ', past_time)
        }
    },
    mounted() {
        this.getList()
        // this.pastTime()
    }
}
</script>

<style scoped>
.cont {
    width: 800px;
    max-height: 80vh;
    overflow: auto;
}

.opera-list {
    margin-top: 20px;
    margin-left: 50px;
    overflow: hidden;
}
.opera-list > li {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    /* overflow: hidden; */
}
.opera-list > li .pic-cont {
    position: relative;
    width: 40px;
    height: 40px;
    margin-left: 10px;
}
.opera-list > li .img {
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    z-index: 2;
}
/* 竖线 */
.opera-list > li .vertical-bar {
    position: absolute;
    top: 40px;
    left: 50%;
    bottom: 0;
    width: 2px;
    height: 45px;
    background: #eee;
}

.opera-list > li .opera-cont {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 500px;
    /* height: 60px; */
    padding: 10px;
    margin-left: 10px;
    background: #f2f2f2;
    border-radius: 5px;
}
.opera-list > li .cont-title {
    font-weight: bold;
    color: #4c8bfd;
}
.mt8 {
    margin-top: 8px;
}
.bold-blue {
    font-weight: bold;
    color: #4c8bfd;
}
.mt30 {
    margin-top: 30px;
}
</style>