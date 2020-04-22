<template>
    <div class="container">
        <div class="filter p10">
            <ul class="left">
                <li>
                    <span>管理员</span>
                    <Input v-model="filter.vendor" />
                </li>
                <li>
                    <span>IP搜索</span>
                    <Input v-model="filter.dataIP" />
                </li>
                <li>
                    <span>日期选择</span>
                    <Date style="width:300px" type="datetimerange" v-model="filter.dates" />
                    <!-- <span style="margin:0 5px;">~</span>
                    <Date v-model="filter.dates[1]" />-->
                </li>
                <li>
                    <button class="btn-blue" @click="getList">查询</button>
                    <button class="btn-blue" @click="clearAll">清空</button>
                </li>
            </ul>
        </div>
        <div>
            <ul class="opera-list">
                <li v-for="(item, index) in list" :key="index">
                    <span style="min-width:150px;text-align:right;">{{timeAgo(item.created_at)}}</span>
                    <div class="pic-cont">
                        <img class="img" src="../../../assets/image/head.jpg" alt="图片丢失" />
                        <div :class="[index!==list.length-1?'vertical-bar':'']"></div>
                    </div>
                    <div class="opera-cont">
                        <div class="cont-left">
                            <div class="cont-title">{{item.title}}</div>
                            <div class="mt8">
                                <span>操作时间:</span>
                                <span>{{item.created_at}}</span>
                            </div>
                        </div>
                        <div class="cont-right">
                            <button class="btn-blue" @click="detail(item)">查看详情</button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div>
            <Page
                class="table-page"
                :total="total"
                :pageNo.sync="pageNo"
                :pageSize.sync="pageSize"
                @updateNo="updateNo"
                @updateSize="updateSize"
            />
        </div>
        <Dialog :show.sync="dia_show" title="操作详情">
            <div class="dia-inner">
                <ul>
                    <li>
                        <div class="bold-blue">{{curr_row.title}}</div>
                    </li>
                    <li class="detail">
                        <div>
                            <span>管理员:</span>
                            <span>{{curr_row.admin_name}}</span>
                        </div>
                        <div>
                            <span>时间:</span>
                            <span>{{curr_row.created_at}}</span>
                        </div>
                        <div>
                            <span class>来源:</span>
                            <span>{{curr_row.origin}}</span>
                        </div>
                        <div>
                            <span>IP:</span>
                            <span>{{curr_row.ip}}</span>
                        </div>
                        <div>
                            <span>代理:</span>
                            <span>{{curr_row.user_agent}}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </Dialog>
    </div>
</template>

<script>
export default {
    name: "OperatRecord",
    // props: {
    //     id: {
    //         require: true,
    //         type: [String, Number]
    //     }
    // },
    data() {
        return {
            filter: {
                vendor: "",
                dataIP: "",
                dates: []
            },
            dia_show: false,
            list: {},
            total: 0,
            pageNo: 1,
            pageSize: 25,
            curr_row: {}
        };
    },
    methods: {
        detail(item) {
            this.dia_show = true;
            this.curr_row = item;
        },
        getList() {
            let createdAt = "";
            if (this.filter.dates[0] && this.filter.dates[1]) {
                createdAt = JSON.stringify([
                    String(this.filter.dates[0]),
                    String(this.filter.dates[1])
                ]);
            }
            let datas = {
                data_ip: this.filter.dataIP,
                admin_name: this.filter.vendor,
                created_at: createdAt,
                page: this.pageNo,
                pageSize: this.pageSize
            };
            //data为空则不传data
            // if (JSON.stringify(data) === "{}") {
            //     return false; // 如果为空,返回false
            // }
            // Object.keys(datas);
            // if (Object.keys(datas).length === 0) {
            //     return false;
            // }
            let data = window.all.tool.rmEmpty(datas);
            let { method, url } = this.$api.operation_record_list;
            this.$http({ method, url }).then(res => {
                console.log("返回数据", res);
                if (res && res.code == "200") {
                    this.list = res.data.data;
                    this.total=res.data.total
                }
            });
        },
        clearAll() {
            this.filter = {
                vendor: "",
                dataIP: "",
                dates: []
            };
        },
        updateNo(val) {
            this.getList()
        },
        updateSize(val) {
            this.pageNo = 1
            this.getList()
        },

        // 计算时间间隔, 即显示 多久以前
        timeAgo(time) {
            let reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/
            if (!reg.test(time)) return
            let dateTimeStamp = new Date(time)

            //dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
            var minute = 1000 * 60 //把分，时，天，周，半个月，一个月用毫秒表示
            var hour = minute * 60
            var day = hour * 24
            var week = day * 7
            var halfamonth = day * 15
            var month = day * 30
            var now = new Date().getTime() //获取当前时间毫秒
            var diffValue = now - dateTimeStamp //时间差

            if (diffValue < 0) {
                return
            }
            var minC = diffValue / minute //计算时间差的分，时，天，周，月
            var hourC = diffValue / hour
            var dayC = diffValue / day
            var weekC = diffValue / week
            var monthC = diffValue / month
            let result = '--'
            if (monthC >= 1 && monthC <= 3) {
                result = ' ' + parseInt(monthC) + '月前'
            } else if (weekC >= 1 && weekC <= 3) {
                result = ' ' + parseInt(weekC) + '周前'
            } else if (dayC >= 1 && dayC <= 6) {
                result = ' ' + parseInt(dayC) + '天前'
            } else if (hourC >= 1 && hourC <= 23) {
                result = ' ' + parseInt(hourC) + '小时前'
            } else if (minC >= 1 && minC <= 59) {
                result = ' ' + parseInt(minC) + '分钟前'
            } else if (diffValue >= 0 && diffValue <= minute) {
                result = '刚刚'
            } else {
                var datetime = new Date()
                datetime.setTime(dateTimeStamp)
                var Nyear = datetime.getFullYear()
                var Nmonth =
                    datetime.getMonth() + 1 < 10
                        ? '0' + (datetime.getMonth() + 1)
                        : datetime.getMonth() + 1
                var Ndate =
                    datetime.getDate() < 10
                        ? '0' + datetime.getDate()
                        : datetime.getDate()
                var Nhour =
                    datetime.getHours() < 10
                        ? '0' + datetime.getHours()
                        : datetime.getHours()
                var Nminute =
                    datetime.getMinutes() < 10
                        ? '0' + datetime.getMinutes()
                        : datetime.getMinutes()
                var Nsecond =
                    datetime.getSeconds() < 10
                        ? '0' + datetime.getSeconds()
                        : datetime.getSeconds()
                result = Nyear + '-' + Nmonth + '-' + Ndate
            }
            return result
        }

    },
    mounted() {
        this.getList();
        // this.pastTime()
    }
};
</script>

<style scoped>
.cont {
    width: 1000px;
    max-height: 80vh;
    overflow: auto;
}

.opera-list {
    /* margin-left: 100px; */
    width: 730px;
    margin: 20px auto 0 auto;
    /* border: 1px solid #000; */
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
    z-index: 1;
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
.detail div > span:first-child {
    display: inline-block;
    min-width: 5em;
    margin-top: 20px;
    margin-right: 10px;
    /* text-align: right; */
    text-align-last: justify; /* ie9*/
    /* font-weight: bold; */
    font-size: 1.1em;
    color: #444;
}
.mt8 {
    margin-top: 8px;
}
.bold-blue {
    /* font-weight: bold; */
    font-size: 1.3em;
    color: #4c8bfd;
}
.mt30 {
    margin-top: 30px;
}
.dia-inner {
    display: flex;
    justify-content: center;
}

</style>