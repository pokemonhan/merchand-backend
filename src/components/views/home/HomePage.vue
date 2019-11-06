<template>
    <div class="container">
        <ul class="row1">
            <li>
                <div class="row1-1">
                    <span>今日盈利</span>
                    <i class="iconfont iconwenhao right"></i>
                </div>
                <div class="row1-2">
                    <span class="number">{{'0.00'}}</span>
                </div>
                <div id="todayProfit" class="row1-3"></div>
                <div class="row1-4">
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
                </div>
                <div class="row1-5">
                    <span>今日注册充值人数: </span>
                    <span>{{'0'}}</span>
                    <span>人</span>
                </div>
            </li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
        </ul>
        <div class="row2 game">

        </div>
        <div class="row3 preferential">
            <div></div>
            <div></div>
        </div>
        <div class="row4">

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    created() {},
    mounted(){
        let echarts = window.all.echarts
        let myChart = echarts.init(document.getElementById('todayProfit'))
        myChart.setOption({
            xAxis: {
                type: 'category',
                // data: ['', '', '', '', '', '', ''],
                splitLine:{ //去掉网格
            　　　　show:false
            　　}
            },
            yAxis: {
                type: 'value',
                    axisTick: { // 去掉刻度线
                        show: false
                },
                splitLine:{ // 去掉网格
            　　　　show:false
            　　}
            },
            series: [{
                type: 'line',
                smooth: true,
                symbol: "none",  //去掉折点
                // itemStyle : {
                //     color:'#67b5fd'
                // },
                lineStyle:{
                            color:'#67b5fd'
                        },
             
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#accfef'
                        }, {
                            offset: 1,
                            color: '#fff'
                        }])
                    }
                },
                data: [820, 932, 901, 934, 1290, 1330, 1320],
            }]
        })
     

    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
    width: 951px;
}
.row1 {
    width: 100%;
    height: 150px;
    display: flex;
    justify-content: space-between;
}
.row1 li {
    width: 220px;
    height: 100%;
    padding: 10px;
    /* border: 1px solid #000; */
    margin-left: 20px;
    border-radius: 5px;
    background: #fff;
    overflow: hidden;   /* 超出隐藏 */
}

.row1 li:first-child{
    margin-left: 0;
}
.row1 #todayProfit{
    width: 280px;
    height: 200px;
    position: relative;
    left: -42px;
    top: -70px;
}
.row1 .right{
    float: right;
    margin-right: 10px;
}
.row1 .number{
    font-size: 20px;
    position: relative;
}
.drop-down{
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #4c8bfd;
    position: relative;
    top: 8px
}
.row2,
.row4{
    width: 100%;
    height: 270px;
    margin-top: 20px;
    background: #fff;
    border-radius: 5px;
}
.row4{
    margin-top: 10px;
}
.row1 .row1-4,
.row1 .row1-5{
    font-size: 12px;
    position: relative;
    top: -148px
}
.row1 .row1-4{
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
}
.preferential{
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}
.preferential>div{
    width: 49%;
    height: 300px;
    background: #fff;
    border-radius: 5px;
}
</style>
