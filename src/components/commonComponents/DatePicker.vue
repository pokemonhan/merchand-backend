<template>
    <div class="v-date-picker" v-clickoutside="closePanel">
        <!-- 已选 -->
        <div 
            @click="chooseDate"
            @mouseover="changeClearState(true)"
            @mouseout="changeClearState(false)"
            class="date-current">
            <input v-model="date" type="hidden"/>
            <span>{{dateStr}}
                <!-- <i 
                    v-if="clearable && isClear"
                    @click.stop="clear"
                    class="iconfont icon-icon-test"></i>
                <i v-else class="iconfont icon-rili"></i> -->
            </span>
        </div>
        <!-- 已选 -->
        <div
            v-if="showPanel"
            :class="['date-box', pickerClassName]"
            ref="date-box">
            <!-- 当前选中 -->
            <div class="date-info">
                <span>
                    <i @click="changeYear('-')"
                        class="iconfont iconzuofanyezuohua"></i>
                    <i
                        v-show="step===1"
                        @click="changeMonth('-')"
                        class="iconfont iconshangyiye"></i>
                </span>
                <span>
                    <!-- <span @click="changeStep(2)" class="change-btn change-year">{{year}}年</span>&nbsp; -->
                    <span>{{year}}年</span>
                    <!-- <span @click="changeStep(3)" v-if="step==1" class="change-btn change-month">{{month}}月</span> -->
                    <span>{{month}}</span>
                </span>
                <span>
                    <i
                        v-show="step===1"
                        @click="changeMonth('+')"
                        class="iconfont iconxiayiye"></i>
                    <i 
                        @click="changeYear('+')"
                        class="iconfont iconyoufanyeyouhua"></i>
                </span>
            </div>
            <!-- 当前选中 -->
            <div class="list-box">
                <!-- 日期 -->
                <div class="date-list" v-if="step===1">
                    <ul class="week-list">
                        <li v-for="(day, index) in weekList" :key="index">{{day}}</li>
                    </ul>
                    <ul class="days-list">
                        <li 
                            @click="changeDate(preMonthLastDate-preMonthDays+n, -1)"
                            class="pre-month-day"
                            v-for="n in preMonthDays"
                            :key="'0'+n">{{preMonthLastDate-preMonthDays+n}}</li>
                        <li 
                            @click="changeDate(n, 0)"
                            :class="{'cur-month-day': true, today: year===todayYear && month===todayMonth && n===todayDate, active: year===curYear && month===curMonth && n===curDate}"
                            v-for="n in curMonthDays" :key="'1'+n">{{n}}</li>
                        <li 
                            @click="changeDate(n, 1)"
                            class="next-month-day"
                            v-for="n in nextMonthDays"
                            :key="'2'+n">{{n}}</li>
                    </ul>
                </div>
                <!-- 日期 -->
                <!-- 年份 -->
                <div v-else-if="step===2" class="year-list">
                    <ul>
                        <li v-for="n in 10" :key="n">
                            <span 
                                @click="changeYear(startYear+n)"
                                :class="{'today-year': startYear+n===todayYear, 'active': startYear+n===curYear}">{{startYear+n}}</span>
                        </li>
                    </ul>
                </div>
                <!-- 年份 -->
                <!-- 月份 -->
                <div v-else class="month-list">
                    <ul>
                        <li v-for="n in 12" :key="n">
                            <span
                                @click="changeMonth(n)"
                                :class="{'today-month': year===todayYear && n===todayMonth, 'active': year===curYear && n===curMonth}">{{n}}月</span>
                        </li>
                    </ul>
                </div>
                <!-- 月份 -->
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'DatePicker',
        props: {
            clearable: {
                type: Boolean,
                default: () => true
            }
        },
        model: {
            prop: 'value',
            event: 'update'
        },
        data() {
            return {
                dateStr: '',
                isClear: false,
                year: undefined, // 当前选中未确定
                month: undefined,
                date: undefined,
                curYear: undefined, // 当前确认选中
                curMonth: undefined,
                curDate: undefined,
                todayYear: undefined, // 今日日期
                todayMonth: undefined,
                todayDate: undefined,
                preMonthDays: 0, // 上月补全天数
                preMonthLastDate: 0, // 上月最后一天的日期
                curMonthDays: 0, // 当月天数
                nextMonthDays: 0, // 下月补全天数
                weekList: ['日', '一', '二', '三', '四', '五', '六'],
                step: 1,
                showPanel: false,
                pickerClassName: 'bottom-expand',
                startYear: 0
            }
        },
        methods: {
            changeClearState(bool) {
                this.isClear = bool
            },
            chooseDate(e) {
                this.showPanel = !this.showPanel
                if(this.showPanel) {
                    let y = document.body.scrollHeight - e.target.getBoundingClientRect().bottom
                    this.pickerClassName = y < 250 ? 'top-expand' : 'bottom-expand'
                }
            },
            closePanel() {
                this.showPanel = false
            },
            clear() {
                this.dateStr = ''
                this.curYear = this.curMonth = this.curDate = undefined
                this.step = 1
                this.showPanel = false
                this.$emit('update', this.dateStr)
            },
            changeDate(date, type) {
                this.date = date
                if(type===-1){
                    if(this.month===1) {
                        this.month = 12
                        this.year --
                        return
                    }
                    this.month--
                }else if(type===1){
                    if(this.month===12){
                        this.month = 1
                        this.year ++
                        return
                    }
                    this.month ++
                }
                this.curYear = this.year
                this.curMonth = this.month
                this.curDate = this.date
                this.dateStr = `${this.curYear}-${this.curMonth}-${this.curDate}`
                this.showPanel = false
                this.$emit('update', this.dateStr)
            },
            changeMonth(num) {
                if(num === '-') {
                    if(this.month === 1) {
                        this.month = 12
                        this.year --
                    }else{
                        this.month --
                    }
                }else if(num === '+'){
                    if(this.month === 12) {
                        this.month = 1
                        this.year ++
                    }else{
                        this.month ++
                    }
                }else{
                    this.month = num
                    this.step = 1
                }
                this.initDays()
            },
            changeYear(num) {
                if(num === '-') {
                    this.step === 2 ? this.startYear -=10 : this.year--
                }else if(num === '+'){
                    this.step === 2 ? this.startYear +=10 : this.year++
                }else {
                    this.year = num
                    this.step = 3
                }
                this.initDays()
            },
            changeStep(num) {
                this.step = num
            },
            initDays() {
                let curMonthDays = this.curMonthDays = this.getDaysInOneMonth(this.year, this.month)
                this.preMonthLastDate = this.month === 1 ? this.getDaysInOneMonth(this.year-1, 11) : this.getDaysInOneMonth(this.year, this.month - 1)
                this.preMonthDays = new Date(`${this.year}-${this.month}-1`).getDay()
                this.nextMonthDays = 42 - curMonthDays - this.preMonthDays
            },
            getDaysInOneMonth(year, month){
                month = parseInt(month, 10)
                let d= new Date(year, month, 0)
                    return d.getDate();
                }
            },
        mounted() {
            let time = new Date()
            this.year = this.todayYear = time.getFullYear()
            this.month = this.todayMonth = time.getMonth() + 1
            this.date = this.todayDate = time.getDate()
            this.startYear = this.year - 9
            this.initDays()
        }
    }
</script>

<style scoped>
    .v-date-picker{
        width: 90px;
        height: 30px;
        line-height: 28px;
        position: relative;
        text-align: center;
        /* display: inline-block; */
    }
    .date-current{
        width: 100%;
        height: 100%;
        position: relative;
        box-sizing: border-box;
        padding: 0 8px;
        border: 1px solid #dcdee2;
        border-radius: 4px;
        cursor: pointer;
        background: #fff;
    }
    .date-current span{
        display: inline-block;
        width: 100%;
        height: 100%;
        text-align: left;
    }
    .date-current:hover{
        border-color: #57a3f3;
    }
    .date-current i{
        position: absolute;
        right: 8px;
    }
    .date-box{
        position: absolute;
        left: 0;
        box-shadow: 0 1px 6px rgba(0,0,0,.2);
        border-radius: 4px;
        background: #fff;
        z-index: 1;
    }
    .top-expand{
        top: -5px;
        transform: translateY(-100%);
    }
    .bottom-expand{
        bottom: -5px;
        transform: translateY(100%);
    }
    .top-upfold{
        top: -5px;
        transform: translateY(-100%);
    }
    .date-box .date-info{
        width: 100%;
        height: 26px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #e8eaec;
        box-sizing: border-box;
        padding: 0 10px;
    }
    .date-box .date-info i{
        font-size: 20px;
        cursor: pointer;
        color: #c5c8ce;
    }
    .date-box .date-info i:hover{
        color: #19a9d5;
    }
    .date-box .date-info i:first-child{
        margin-right: 10px;
    }
    .date-box .date-info .change-btn{
        cursor: pointer;
    }
    .date-box .date-info .change-btn:hover{
        color: #19a9d5;
    }
    .date-box .list-box{
        padding: 10px;
    }
    .date-box ul{
        width: 196px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        flex-wrap: wrap;
    }
    .date-box .week-list{
        color: #c5c8ce;
    }
    .date-box .date-list li{
        width: 28px;
        height: 28px;
        border-radius: 4px;
        line-height: 28px;
    }
    .date-box .year-list li,
    .date-box .month-list li{
        width: 33.333%;
        height: 49px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .days-list li {
        cursor: pointer;
        color: #c5c8ce;
    }
    .days-list .cur-month-day{
        box-sizing: border-box;
        color: #2c3e50;
    }
    .days-list .cur-month-day:hover{
        background-color: #D0F0Ff;
    }
    .date-box .year-list span,
    .date-box .month-list span{
        display: inline-block;
        width: 40px;
        height: 28px;
        line-height: 28px;
        border-radius: 4px;
        cursor: pointer;
    }
    .date-box .year-list span:hover,
    .date-box .month-list span:hover{
        background-color: #D0F0Ff;
    }
    .date-box .year-list span.active,
    .date-box .month-list span.active,
    .date-box .date-list li.active{
        background-color: #2d8cf0;
        color: #fff;
    }
    .date-box .year-list .today-year,
    .date-box .month-list .today-month{
        background-color: #E1F0FE;
    }
    .date-box .days-list .today{
        border: 1px solid #2d8cf0;
    }
</style>


