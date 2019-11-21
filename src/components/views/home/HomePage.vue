<template>
    <div class="container">
        <ul class="row1">
            <!-- 今日盈利 -->
            <li>
                <div class="row1-1">
                    <span>今日盈利</span>
                    <!-- <i class="iconfont iconwenhao right"></i> -->
                </div>
                <div class="row1-2">
                    <span class="number">{{'0.00'}}</span>
                </div>
                <!-- <div id="first_recharge" class="row1-3"></div> -->
                <!-- <div class="row1-4">
                    <span>
                        <span>新增人数</span>
                        <span>{{'0'}}</span>
                        <span>人</span>
                    </span>
                    <span>
                        <span>日环比</span>
                        <span>{{'0.00'}}%</span>
                        <span class="drop-down"></span>
                    </span>
                </div>-->
                <div class="row1-5">
                    <span>日环比:</span>
                    <span>{{'0.00%'}}</span>
                    <span>人</span>
                </div>
            </li>
            <!-- 今日首充 -->
            <li>
                <div class="row1-1">
                    <span>今日首充</span>
                    <!-- <i class="iconfont iconwenhao right"></i> -->
                </div>
                <div class="row1-2">
                    <span class="number">{{'0.00'}}</span>
                </div>
                <div id="first_recharge" class="row1-3"></div>
                <!-- <div class="row1-4">
                    <span>
                        <span>新增人数</span>
                        <span>{{'0'}}</span>
                        <span>人</span>
                    </span>
                    <span>
                        <span>日环比</span>
                        <span>{{'0.00'}}%</span>
                        <span class="drop-down"></span>
                    </span>
                </div>-->
                <div class="row1-55">
                    <span>充值人数:</span>
                    <span>{{'0'}}</span>
                    <span>人</span>
                </div>
            </li>
            <!-- 今日提现 -->
            <li>
                <div class="row1-1">
                    <span>今日提现</span>
                    <!-- <i class="iconfont iconwenhao right"></i> -->
                </div>
                <div class="row1-2">
                    <span class="number">{{'0.00'}}</span>
                </div>
                <!-- <div id="first_recharge" class="row1-3"></div> -->
                <!-- <div class="row1-4">
                    <span>
                        <span>新增人数</span>
                        <span>{{'0'}}</span>
                        <span>人</span>
                    </span>
                    <span>
                        <span>日环比</span>
                        <span>{{'0.00'}}%</span>
                        <span class="drop-down"></span>
                    </span>
                </div>-->
                <div class="row1-5">
                    <span>提现人数:</span>
                    <span>{{'0'}}</span>
                    <span>人</span>
                </div>
            </li>
            <!-- 今日彩金优惠 -->
            <li>
                <div class="row1-1">
                    <span>今日彩金优惠</span>
                    <!-- <i class="iconfont iconwenhao right"></i> -->
                </div>
                <div class="row1-2">
                    <span class="number">{{'0.00'}}</span>
                </div>
                <!-- <div id="first_recharge" class="row1-3"></div> -->
                <!-- <div class="row1-4">
                    <span>
                        <span>新增人数</span>
                        <span>{{'0'}}</span>
                        <span>人</span>
                    </span>
                    <span>
                        <span>日环比</span>
                        <span>{{'0.00'}}%</span>
                        <span class="drop-down"></span>
                    </span>
                </div>-->
                <div class="row1-5">
                    <span>领取人数:</span>
                    <span>{{'0'}}</span>
                    <span>人</span>
                </div>
            </li>
        </ul>
        <div class="row2 game">
            <div class="header">
                <button class="btn">昨日</button>
                <button class="btn">本周</button>
                <button class="btn">本月</button>
                <button class="btn">全年</button>
                <!-- <Date style="width:200px;" /> -->
            </div>
            <div class="contain">
                <div class="game-data">
                    <div class="title">
                        <span>游戏数据</span>
                    </div>
                    <Table :headers="game_data_headers" :column="game_data_list">
                        <template v-slot:item="{row}">
                            <td>{{row.plant_form}}</td>
                            <td>{{row.value}}</td>
                        </template>
                    </Table>
                </div>
                <!-- 平台排名 -->
                <div class="plant-rank">
                    <div>
                        <div class="title">平台排名</div>
                    </div>
                    <div>
                        <Table :headers="game_plant_headers" :column="game_plant_list">
                            <template v-slot:item="{row}">
                                <td>{{row.plant_form}}</td>
                                <td>{{row.rank}}</td>
                                <td>{{row.number}}</td>
                            </template>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
        <!-- 优惠活动数据 -->
        <div class="row3">
            <div class="data">
                <div class="header">
                    <span>优惠活动数据</span>
                </div>
                <div class="row3-number">
                    <div clss="act-people-number">
                        <div class="number-title">参与活动人数</div>
                        <div class="number">{{'0'}}</div>
                    </div>
                    <div clss="today-active-bonus">
                        <div class="number-title">参与活动人数</div>
                        <div class="number">{{'0'}}</div>
                    </div>
                </div>
                <div>
                    <Table :headers="promotion_headers" :column="promotion_list">
                        <template v-slot:item="{row}">
                            <td>{{row.plant_form}}</td>
                            <td>{{row.rank}}</td>
                            <td>{{row.rank}}</td>
                            <td>{{row.rank}}</td>
                        </template>
                    </Table>
                    <!-- <Page></Page> -->
                </div>
            </div>
            <div class="graph">
                <div class="graph-head header">
                    <button
                        style="margin:0;"
                        :class="[is_show_login?'btn-active':'btn-plain']"
                        @click="is_show_login=true"
                    >登录统计</button>
                    <button
                        :class="[is_show_login?'btn-plain':'btn-active']"
                        @click="is_show_login=false"
                    >注册统计</button>
                </div>
                <div class="contain">
                    <div class="login" v-show="is_show_login">
                        <div>人数统计</div>
                        <div id="login_num"></div>
                        <div class="data">
                            <ul>
                                <li>
                                    <span class="dot blue"></span>
                                    <span>安卓</span>
                                    <span>12%</span>
                                    <span>3人</span>
                                </li>
                                <li>
                                    <span class="dot green"></span>
                                    <span>苹果</span>
                                    <span>12%</span>
                                    <span>3人</span>
                                </li>
                                <li>
                                    <span class="dot orange"></span>
                                    <span>H5</span>
                                    <span>12%</span>
                                    <span>3人</span>
                                </li>
                                <li>
                                    <span class="dot red"></span>
                                    <span>PC</span>
                                    <span>12%</span>
                                    <span>3人</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="regist" v-show="!is_show_login">
                        <div>注册统计</div>
                        <div id="regist_num"></div>
                        <div class="data">
                            <ul>
                                <li>
                                    <span class="dot blue"></span>
                                    <span>安卓</span>
                                    <span>22%</span>
                                    <span>3人</span>
                                </li>
                                <li>
                                    <span class="dot green"></span>
                                    <span>苹果</span>
                                    <span>32%</span>
                                    <span>6人</span>
                                </li>
                                <li>
                                    <span class="dot orange"></span>
                                    <span>H5</span>
                                    <span>12%</span>
                                    <span>3人</span>
                                </li>
                                <li>
                                    <span class="dot red"></span>
                                    <span>PC</span>
                                    <span>12%</span>
                                    <span>3人</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 充提统计 -->
        <div class="row4">
            <div id="recharge"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "HomePage",
    data() {
        return {
            is_show_login: true,
            // 游戏数据
            game_data_headers: [{ label: "游戏平台" }, { label: "今日盈亏" }],
            game_data_list: [
                { plant_form: "开元棋牌", value: "+520.12" },
                { plant_form: "龙城棋牌", value: "-630.32" }
            ],
            // 游戏平台
            game_plant_headers: [
                { label: "平台名称" },
                { label: "平台排行" },
                { label: "游戏人数" }
            ],
            game_plant_list: [
                { plant_form: "开元棋牌", rank: "1", number: "100" },
                { plant_form: "龙城棋牌", rank: "2", number: "60" }
            ],
            // 优惠活动数据
            promotion_headers: [
                { label: "排名" },
                { label: "热门活动" },
                { label: "参与人数" },
                { label: "彩金" }
            ],
            promotion_list: [
                { plant_form: "开元棋牌", rank: "1", number: "100" },
                { plant_form: "龙城棋牌", rank: "2", number: "60" }
            ]
        };
    },
    created() {},
    methods: {},
    mounted() {
        let echarts = window.all.echarts;

        // 今日曲线图
        let first_recharge_chart = echarts.init(
            document.getElementById("first_recharge")
        );
        first_recharge_chart.setOption({
            xAxis: {
                type: "category",
                // data: ['', '', '', '', '', '', ''],
                splitLine: {
                    //去掉网格
                    show: false
                }
            },
            yAxis: {
                type: "value",
                axisTick: {
                    // 去掉刻度线
                    show: false
                },
                splitLine: {
                    // 去掉网格
                    show: false
                }
            },
            series: [
                {
                    type: "line",
                    smooth: true,
                    symbol: "none", //去掉折点
                    // itemStyle : {
                    //     color:'#67b5fd'
                    // },
                    lineStyle: {
                        color: "#67b5fd"
                    },

                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [
                                    { offset: 0, color: "#accfef" },
                                    { offset: 1, color: "#fff" }
                                ]
                            )
                        }
                    },
                    data: [820, 932, 901, 934, 1290, 1330, 1320]
                }
            ]
        });

        // 登录统计 --人数统计
        let login_chart = echarts.init(document.getElementById("login_num"));
        login_chart.setOption({
            tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: "vertical",
                x: "left",
                data: [
                    "直接访问",
                    "邮件营销",
                    "联盟广告",
                    "视频广告",
                    "搜索引擎"
                ]
            },
            series: [
                {
                    name: "登录人数",
                    type: "pie",
                    radius: ["50%", "70%"],
                    avoidLabelOverlap: true,
                    label: {
                        normal: {
                            show: false,
                            position: "center"
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: "30",
                                fontWeight: "bold"
                            }
                        }
                    },
                    //  右侧图标
                    legend: {
                        type: "scroll",
                        orient: "vertical",
                        right: 30,
                        top: 20,
                        bottom: 20,
                        data: ['安卓','苹果','H5','PC'
                     
                    ],

                        selected: [true, true ,true, true]
                    },
                    itemStyle: {
                        normal: {
                            color: function(params) {
                                var colors = [
                                    "#4c8bfd",
                                    "#4cc013",
                                    "#faab08",
                                    "#fc4c4c"
                                ];
                                return colors[params.dataIndex];
                            }
                        }
                    },
                    data: [
                        { value: 335, name: "安卓" },
                        { value: 310, name: "苹果" },
                        { value: 234, name: "H5" },
                        { value: 135, name: "PC" }
                    ]
                }
            ]
        });
        // 注册统计
        let regist_chart = echarts.init(document.getElementById("regist_num"));
        regist_chart.setOption({
            // title: {
            //     text: "某站点用户访问来源",
            //     subtext: "纯属虚构",
            //     x: "center"
            // },
            // tooltip: {
            //     trigger: "item",
            //     formatter: "{a} <br/>{b} : {c} ({d}%)"
            // },
            // legend: {
            //     orient: "vertical",
            //     left: "left",
            //     data: [
            //         "直接访问",
            //         "邮件营销",
            //         "联盟广告",
            //         "视频广告",
            //         "搜索引擎"
            //     ]
            // },
            series: [
                {
                    name: "访问来源",
                    type: "pie",
                    radius: "55%",
                    center: ["50%", "60%"],
                    data: [
                        { value: 335, name: "安卓" },
                        { value: 310, name: "苹果" },
                        { value: 234, name: "H5" },
                        { value: 135, name: "Pc" }
                    ],
                    itemStyle: {
                        normal: {
                            color: function(params) {
                                var colors = [
                                    "#4c8bfd",
                                    "#4cc013",
                                    "#faab08",
                                    "#fc4c4c"
                                ];
                                return colors[params.dataIndex];
                            }
                        }
                    }
                }
            ]
        });
        // 充提统计
        let recharge_chart = echarts.init(document.getElementById("recharge"));
        recharge_chart.setOption({
            title: {
                text: "充提统计"
            },
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "shadow"
                }
            },
            legend: {
                data: ["前日充值", "前日提款"]
            },
            grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true
            },
            xAxis: {
                type: "category",
                data: ["前日", "昨日", "今日"]
            },
            yAxis: {
                type: "value",
                // boundaryGap: [0, 0.01],
                axisTick: {
                    // 去掉刻度线
                    show: false
                },
                splitLine: {
                    // 去掉网格
                    show: false
                }
            },
            series: [
                {
                    name: "充值",
                    type: "bar",
                    itemStyle: {
                        normal: {
                            color: "#4c8bfd"
                        }
                    },
                    label: {
                        normal: {
                            position: "top",
                            show: true
                        }
                    },
                    data: [18203, 23489, 29034]
                },
                {
                    name: "提款",
                    type: "bar",
                    itemStyle: {
                        normal: {
                            color: "#faaa0b"
                        }
                    },
                    label: {
                        normal: {
                            position: "top",
                            show: true
                        }
                    },
                    data: [19325, 23438, 31000]
                }
            ]
        });
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
    width: 1040px;
}
.row1 {
    width: 100%;
    height: 150px;
    display: flex;
    justify-content: space-between;
}
.row1 li {
    width: 246px;
    height: 100%;
    padding: 10px;
    /* border: 1px solid #000; */
    margin-left: 20px;
    border-radius: 5px;
    background: #fff;
    overflow: hidden; /* 超出隐藏 */
}

.row1 li:first-child {
    margin-left: 0;
}
.row1 #first_recharge {
    width: 280px;
    height: 200px;
    position: relative;
    left: -42px;
    bottom: 75px;
}
.row1 .right {
    float: right;
    margin-right: 10px;
}
.row1 .number {
    font-size: 20px;
    position: relative;
}
.drop-down {
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #4c8bfd;
    position: relative;
    top: 8px;
}
.row2,
.row4 {
    /* width: 100%; */
    /* height: 270px; */
    padding: 10px;
    margin-top: 20px;
    background: #fff;
    border-radius: 5px;
}
.row2 .header {
    border-bottom: 1px solid #eee;
}

.row2 .contain {
    display: flex;
    /* justify-content: space-between; */
    margin-top: 15px;
}
.row2 .game-data {
    width: 450px;
    padding-right: 20px;
    margin-right: 80px;
}
.row2 .contain .title {
    width: 4em;
    padding-bottom: 5px;
    margin-bottom: 10px;
    border-bottom: 3px solid #4c8bfd;
}
.row2 .plant-rank {
    width: 450px;
    /* margin-right: 40px; */
}
.row2 .header {
    display: flex;
}
/* .row2 .header button {
   
    border-right: 1px solid rgb(250, 249, 249);
    border-radius: 0;
} */
.btn {
    height: 26px;
    padding-left: 15px;
    padding-right: 15px;
    /* padding: 3px 15px; */
    box-sizing: border-box;
    /* border-radius: 3px; */
    outline: none;
    border: none;
    cursor: pointer;
    color: #4d4d4d;
    border-right: 1px solid #e9e8e8;
    background-color: #fff;
    /* box-shadow:  */
}
.btn-active {
    background: #4c8bfd;
    color: #fff;
}
.btn:hover {
    /* box-shadow: none; */
    background: #4c8bfd;
    color: #fff;
    /* border: none; */
}
/* 优惠活动 */
/* .row3 { */
/* padding: 10px; */
/* background: #fff; */
/* } */
.row3 .data,
.row3 .graph {
    width: 510px;
    padding: 10px;
    background: #fff;
}
.row3 .header {
    padding-bottom: 10px;
    height: 4 0px;
    border-bottom: 1px solid #eee;
}
.number-title {
    color: #4c8bfd;
}
.row3-number .number {
    font-size: 24px;
}

.row3 .graph .contain {
    /* width: 100%; */
    padding-top: 10px;
    position: relative;
}

.row3 .graph .contain .login #login_num {
    /* width: 300px; */
    height: 230px;
    transform: translateX(-90px);
    /* border: 1px solid #000; */
}
.row3 .graph .contain .regist #regist_num {
    width: 370px;
    height: 240px;
    position: relative;
    left: -30px;
    top: -30px;
    /* border: 2px solid #000; */
}
.row3 .graph .data {
    width: 180px;
    /* border: 1px solid rgb(240, 70, 70); */
    position: absolute;
    right: 0;
    top: 30px;
}
.row3 .graph .data ul li {
    padding: 8px 0;
}
/* 小圆点 */
.row3 .graph .data ul li .dot {
    display: inline-block;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    /* background: #000; */
}
/* 平台 */
.row3 .graph .data ul li span:nth-child(2) {
    display: inline-block;
    width: 50px;
    white-space: nowrap;
}
.row3 .graph .data ul li span:nth-child(3) {
    display: inline-block;
    width: 60px;
    white-space: nowrap;
}
.blue {
    background: #4c8bfd;
}
.green {
    background: #4cc013;
}
.orange {
    background: #faab08;
}
.red {
    background: #fc4c4c;
}
.row4 {
    margin-top: 20px;
}
.row1 > li {
    position: relative;
}
/* .row1 .row1-4, */
.row1 .row1-5 {
    position: relative;
    bottom: -65px;
    border-top: 1px solid #4d4d4d;
    font-size: 14px;
}
.row1 .row1-55 {
    position: absolute;
    bottom: 13px;
    /* border-top:1px solid #4d4d4d; */
    font-size: 14px;
}
.row1 .row1-4 {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
}

.row3 {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}
.row3 > div {
    width: 49%;
    height: 300px;
    background: #fff;
    border-radius: 5px;
}
.row3 .row3-number {
    display: flex;
    justify-content: space-between;
    padding: 20px 30px;
}
.graph-head .btn-active {
    /* border: 1px solid #000; */
    /* height: fit-content; */
    border-radius: 3px;
    padding: 6px 10px;
}
.graph-head .btn-active:hover {
    /* border: 1px solid #000; */
    /* height: fit-content; */
    background: #76a4f8;
    border-radius: 3px;
    padding: 6px 10px;
}
.graph-head .btn-active {
    /* border: 1px solid #000; */
    /* height: fit-content; */
    border-radius: 3px;
    padding: 6px 10px;
}
.graph-head .btn-plain {
    /* border: 1px solid #000; */
    height: fit-content;
    padding: 6px 10px;
}
/* .row2 td {
    padding: 6px;
} */
.row2 tr:hover {
    background: rgb(184, 98, 98);
}
.row4 {
    display: flex;
    justify-content: center;
}
.row4 #recharge {
    height: 250px;
    width: 500px;
    /* border: 1px solid #000; */
}
</style>
