<template>
    <div class="container quick-query">
        <span>快捷查询</span>
        <button
            class="btn-blue"
            v-for="(item, index) in list"
            :key="index"
            @click="btnClick(item,index)"
        >{{item.label}}</button>
    </div>
</template>


<script>
export default {
    // props: {

    // },
    data() {
        return {
            list: [
                { label: "今日", value: "today" },
                { label: "昨日", value: "yesterday" },
                { label: "上周", value: "lastweek" },
                { label: "本周", value: "thisweek" },
                { label: "上月", value: "lastmonth" },
                { label: "本月", value: "thismonth" }
            ]
        };
    },
    methods: {
        btnClick(item, index) {
            let start
            let end
            let formatDate = window.all.tool.formatDate;
            var now = new Date();                   //当前日期

            // now.setMonth(1)     //----------------------------------------
            // console.log('现在', formatDate(now))
            var nowYear = now.getFullYear();        // 当前年
            var nowMonth = now.getMonth();          // 当前月
            var nowDay = now.getDate();             // 当前日

            var nowDayOfWeek = now.getDay();    // 今天是本周的第几天
            // (周日获取的是第0天,设置为7天)
            if (nowDayOfWeek === 0) { nowDayOfWeek = 7; } 

            //  获得某月的天数
            function getMonthDays(myMonth) {
                var monthStartDate = new Date(nowYear, myMonth, 1);
                var monthEndDate = new Date(nowYear, myMonth + 1, 1);
                var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
                return days;
            }

            switch (item.value) {
                case "today":
                    start = end = new Date();
                    break;
                case "yesterday":
                    let date = new Date().valueOf();
                    let yesterday = date - 1000 * 60 * 60 * 24;
                    start = end = new Date(yesterday);
                    break;
                case "lastweek":
                    //  上周开始
                    var thisWeekStart = new Date( nowYear, nowMonth, nowDay - nowDayOfWeek - 6 );
                    start = thisWeekStart;
                    // 上周结束
                    var thisWeekend = new Date( nowYear, nowMonth, nowDay - nowDayOfWeek );
                    end = thisWeekend;
                    break;
                case "thisweek":
                    //本周开始
                    var weekStart = new Date( nowYear, nowMonth, nowDay - nowDayOfWeek + 1 );
                    start = weekStart;
                    // 本周结束
                    var weekend = new Date( nowYear, nowMonth, nowDay + (7 - nowDayOfWeek) );
                    end = weekend;
                    break;
                case "lastmonth":
                    start = new Date(nowYear, nowMonth - 1, 1);
                    end = new Date( nowYear, nowMonth - 1, getMonthDays(nowMonth - 1) );
                    break;
                case "thismonth":
                    start = new Date(nowYear, nowMonth, 1);
                    end = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
                    break;
            }
            // console.log("开始", formatDate(start));
            // console.log("结束", formatDate(end));
            this.$emit("update", [formatDate(start), formatDate(end)]);
        }
    },
    mounted() {}
};
</script>

<style scoped>
.container {
    padding: 10px;
}

.btn-blue {
    /* height: 26px; */
    padding-left: 15px;
    padding-right: 15px;
    outline: none;
    border: none;
    /* box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2); */
    cursor: pointer;
    box-sizing: border-box;
    border-radius: 3px;
    color: #fff;
    border: 1px solid #4c8bfd;
    background: #4c8bfd;
}

.btn-blue:hover {
    box-shadow: none;
    background: #6397f7;
}
.btn-blue:active {
    box-shadow: none;
    background: #3f7beb;
}
</style>
